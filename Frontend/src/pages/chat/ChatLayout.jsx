import { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { conversationService, userService } from "../../services/conversation.service";
import { Avatar } from "../../components/ui/Avatar";
import { Modal } from "../../components/ui/Modal";
import { formatTime } from "../../utils/formatTime";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { cn } from "../../utils/cn";

export default function ChatLayout() {
  const { user }   = useAuth();
  const { socket } = useSocket();
  const navigate   = useNavigate();
  const params     = useParams();
  const activeId   = params.conversationId;

  const [convs, setConvs]       = useState([]);
  const [search, setSearch]     = useState("");       // filter existing convs
  const [showDMSearch, setShowDMSearch] = useState(false);
  const [dmQuery, setDmQuery]   = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [startingDM, setStartingDM] = useState(false);

  const loadConvs = useCallback(() =>
    conversationService.getAll().then((d) => setConvs(d.conversations)), []);

  useEffect(() => { loadConvs(); }, [loadConvs]);

  // load users when DM search opens
  useEffect(() => {
    if (showDMSearch && allUsers.length === 0)
      userService.getAll().then((d) => setAllUsers(d.users));
  }, [showDMSearch]);

  // socket: update lastMessage + unreadCount for incoming messages
  useEffect(() => {
    if (!socket) return;
    const handler = ({ message }) => {
      setConvs((prev) =>
        prev.map((c) => {
          if (c._id !== message.conversationId) return c;
          const isActive = c._id === activeId;
          return {
            ...c,
            lastMessage: { text: message.text, senderId: message.senderId, createdAt: message.createdAt },
            unreadCount: isActive ? 0 : (c.unreadCount || 0) + 1,
          };
        })
      );
    };
    socket.on("message_received", handler);
    return () => socket.off("message_received", handler);
  }, [socket, activeId]);

  const markConvRead = useCallback((convId) => {
    setConvs((prev) => prev.map((c) => (c._id === convId ? { ...c, unreadCount: 0 } : c)));
  }, []);

  const getDisplayName = (conv) => {
    if (conv.isGroup) return conv.name;
    const other = conv.members.find((m) => m._id !== user._id);
    return other?.name || "Unknown";
  };

  // start or open an existing DM with a user
  const startDM = async (targetUserId) => {
    setStartingDM(true);
    const res = await conversationService.create({ isGroup: false, memberIds: [targetUserId] });
    setShowDMSearch(false);
    setDmQuery("");
    await loadConvs();
    navigate(`/chat/dm/${res.conversation._id}`);
    setStartingDM(false);
  };

  // filter conversations by search
  const filtered = convs.filter((c) => {
    if (!search.trim()) return true;
    const name = getDisplayName(c).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  // filter users in DM search (exclude self)
  const filteredUsers = allUsers.filter(
    (u) => u._id !== user._id && u.name.toLowerCase().includes(dmQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Conversation list ──────────────────────────────── */}
      <aside className="w-72 border-r border-neutral-200 bg-white flex flex-col shrink-0">

        {/* header + new DM button */}
        <div className="px-3 pt-3 pb-2 border-b border-neutral-100 flex items-center gap-2">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest flex-1">Messages</p>
          <button
            onClick={() => setShowDMSearch(true)}
            className="text-xs font-semibold text-secondary hover:text-secondary-dark transition-colors flex items-center gap-1"
            title="New Direct Message"
          >
            ✏️ New DM
          </button>
        </div>

        {/* search existing conversations */}
        <div className="px-3 py-2 border-b border-neutral-100">
          <input
            className="w-full text-xs px-3 py-1.5 rounded-lg bg-neutral border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary/30 placeholder-neutral-400"
            placeholder="Search conversations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-xs text-neutral-400 text-center py-8 px-4">
              {search ? "No conversations match your search." : "No conversations yet."}
            </p>
          )}
          {filtered.map((conv) => {
            const name   = getDisplayName(conv);
            const path   = conv.isGroup ? `/chat/g/${conv._id}` : `/chat/dm/${conv._id}`;
            const unread = conv.unreadCount || 0;

            return (
              <NavLink
                key={conv._id}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors",
                    isActive ? "bg-primary/5 border-r-2 border-primary" : ""
                  )
                }
              >
                <div className="relative shrink-0">
                  <Avatar name={name} size="md" />
                  {unread > 0 && unread <= 3 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={cn("text-sm truncate", unread > 0 ? "font-semibold text-neutral-900" : "font-medium text-neutral-700")}>
                      {name}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                      {conv.lastMessage?.createdAt && (
                        <span className={cn("text-[10px]", unread > 0 ? "text-secondary font-medium" : "text-neutral-400")}>
                          {formatTime(conv.lastMessage.createdAt)}
                        </span>
                      )}
                      {unread > 3 && (
                        <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center">
                          {unread > 99 ? "99+" : unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {conv.isGroup && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-primary/60 bg-primary-50 px-1.5 py-0.5 rounded">
                        Group
                      </span>
                    )}
                    <p className={cn("text-xs truncate", unread > 0 ? "text-neutral-600 font-medium" : "text-neutral-400")}>
                      {conv.lastMessage?.text || "No messages yet"}
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* ── Chat view ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet context={{ reload: loadConvs, markConvRead }} />
      </div>

      {/* ── New DM search modal ───────────────────────────── */}
      <Modal open={showDMSearch} onClose={() => { setShowDMSearch(false); setDmQuery(""); }} title="New Direct Message" size="sm">
        <div className="flex flex-col gap-3">
          <input
            autoFocus
            className="input-base"
            placeholder="Search people by name…"
            value={dmQuery}
            onChange={(e) => setDmQuery(e.target.value)}
          />
          <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
            {filteredUsers.length === 0 && (
              <p className="text-sm text-neutral-400 text-center py-4">
                {dmQuery ? "No users found." : "Start typing to search…"}
              </p>
            )}
            {filteredUsers.map((u) => (
              <button
                key={u._id}
                disabled={startingDM}
                onClick={() => startDM(u._id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors text-left w-full"
              >
                <Avatar name={u.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{u.name}</p>
                  <p className="text-xs text-neutral-400 truncate">{u.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
