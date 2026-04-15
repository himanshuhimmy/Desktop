import { useEffect, useRef, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { messageService } from "../../services/message.service";
import { conversationService, userService } from "../../services/conversation.service";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { formatMessageTime } from "../../utils/formatTime";
import { PageSpinner } from "../../components/ui/Spinner";
import { cn } from "../../utils/cn";

export default function GroupChat() {
  const { conversationId }       = useParams();
  const { user }                 = useAuth();
  const { socket }               = useSocket();
  const { reload, markConvRead } = useOutletContext();

  const [conv, setConv]           = useState(null);
  const [messages, setMessages]   = useState([]);
  const [text, setText]           = useState("");
  const [loading, setLoading]     = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const [allUsers, setAllUsers]   = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState("");
  const [saving, setSaving]       = useState(false);
  const bottomRef = useRef(null);

  const loadConv = () =>
    conversationService.getById(conversationId).then((r) => setConv(r.conversation));

  useEffect(() => {
    setLoading(true);
    Promise.all([
      conversationService.getById(conversationId),
      messageService.getAll(conversationId),
    ]).then(([convRes, msgRes]) => {
      setConv(convRes.conversation);
      setMessages(msgRes.messages);
      setLoading(false);
      messageService.markRead(conversationId);
      markConvRead?.(conversationId);
    });
  }, [conversationId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join_conversation", conversationId);
    const handler = ({ message }) => {
      setMessages((m) => [...m, message]);
      messageService.markRead(conversationId);
      markConvRead?.(conversationId);
    };
    socket.on("message_received", handler);
    return () => { socket.off("message_received", handler); socket.emit("leave_conversation", conversationId); };
  }, [socket, conversationId]);

  // load all users when members panel is opened (for add picker)
  useEffect(() => {
    if (showMembers && allUsers.length === 0) {
      userService.getAll().then((d) => setAllUsers(d.users));
    }
  }, [showMembers]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await messageService.send(conversationId, text.trim());
    setText("");
    reload();
  };

  const handleRemove = async (userId) => {
    setSaving(true);
    await conversationService.updateMembers(conversationId, "remove", userId);
    await loadConv();
    reload();
    setSaving(false);
  };

  const handleAdd = async () => {
    if (!selectedToAdd) return;
    setSaving(true);
    await conversationService.updateMembers(conversationId, "add", selectedToAdd);
    await loadConv();
    setShowAddModal(false);
    setSelectedToAdd("");
    reload();
    setSaving(false);
  };

  const isManager = conv?.groupManagers?.some((m) => m._id === user._id);
  const managerIds = conv?.groupManagers?.map((m) => m._id) || [];

  // users not already in the group (for add picker)
  const memberIds = conv?.members?.map((m) => m._id) || [];
  const nonMembers = allUsers.filter((u) => !memberIds.includes(u._id));

  if (loading) return <PageSpinner />;

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Main chat area ───────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* header */}
        <div className="px-5 py-3 border-b border-neutral-200 bg-white flex items-center gap-3 shrink-0">
          <Avatar name={conv?.name} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-neutral-800">{conv?.name}</p>
            <p className="text-xs text-neutral-400">
              {conv?.members?.length} members
              {isManager && <span className="text-secondary font-medium"> · You are a manager</span>}
            </p>
          </div>
          {/* members toggle button */}
          <button
            onClick={() => setShowMembers((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
              showMembers
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-primary/10 hover:text-primary"
            )}
          >
            <span>👥</span>
            Members ({conv?.members?.length})
          </button>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-neutral">
          {messages.map((msg) => {
            // ── system message ──────────────────────────
            if (msg.type === "system") {
              return (
                <div key={msg._id} className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <p className="text-[11px] text-neutral-400 font-medium whitespace-nowrap px-2">{msg.text}</p>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
              );
            }

            // ── user message ─────────────────────────────
            const isMe = msg.senderId?._id === user._id || msg.senderId === user._id;
            const senderName = msg.senderId?.name || "Unknown";
            return (
              <div key={msg._id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                <Avatar name={senderName} size="sm" />
                <div className={`max-w-[65%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                  {!isMe && <span className="text-xs text-neutral-400 px-1">{senderName}</span>}
                  <div className={cn(
                    "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                    isMe ? "bg-primary text-white rounded-tr-sm" : "bg-white text-neutral-800 rounded-tl-sm shadow-sm border border-neutral-100"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-neutral-400 px-1">{formatMessageTime(msg.createdAt)}</span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <form onSubmit={send} className="px-4 py-3 border-t border-neutral-200 bg-white flex gap-2 shrink-0">
          <input
            className="flex-1 input-base"
            placeholder={`Message ${conv?.name}...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn-primary px-5" disabled={!text.trim()}>Send</button>
        </form>
      </div>

      {/* ── Members panel ───────────────────────────────── */}
      {showMembers && (
        <aside className="w-64 border-l border-neutral-200 bg-white flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
            <p className="text-xs font-semibold text-neutral-600 uppercase tracking-widest">Members</p>
            {isManager && (
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-semibold text-secondary hover:text-secondary-dark transition-colors"
              >
                + Add
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {conv?.members?.map((member) => {
              const isMgr     = managerIds.includes(member._id);
              const isMe      = member._id === user._id;
              const canRemove = isManager && !isMgr && !isMe;

              return (
                <div key={member._id} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-neutral-50 group">
                  <Avatar name={member.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {member.name}{isMe && <span className="text-neutral-400 font-normal"> (you)</span>}
                    </p>
                    {isMgr && (
                      <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Manager</span>
                    )}
                  </div>
                  {canRemove && (
                    <button
                      onClick={() => handleRemove(member._id)}
                      disabled={saving}
                      className="opacity-0 group-hover:opacity-100 text-xs text-tertiary hover:text-tertiary-dark transition-all font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* manager badges at bottom */}
          <div className="px-4 py-3 border-t border-neutral-100">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1.5">Managers</p>
            <div className="flex flex-col gap-1">
              {conv?.groupManagers?.map((m) => (
                <div key={m._id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <p className="text-xs text-neutral-600 truncate">{m.name}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* ── Add member modal ──────────────────────────────── */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Member" size="sm">
        <div className="flex flex-col gap-3">
          <select
            className="input-base"
            value={selectedToAdd}
            onChange={(e) => setSelectedToAdd(e.target.value)}
          >
            <option value="">Select a user to add…</option>
            {nonMembers.map((u) => (
              <option key={u._id} value={u._id}>{u.name} — {u.email}</option>
            ))}
          </select>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd} loading={saving} disabled={!selectedToAdd}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
