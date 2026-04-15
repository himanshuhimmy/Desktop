import { useEffect, useRef, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { messageService } from "../../services/message.service";
import { conversationService } from "../../services/conversation.service";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { Avatar } from "../../components/ui/Avatar";
import { formatMessageTime } from "../../utils/formatTime";
import { PageSpinner } from "../../components/ui/Spinner";

export default function DMChat() {
  const { conversationId } = useParams();
  const { user }  = useAuth();
  const { socket } = useSocket();
  const { reload, markConvRead } = useOutletContext();

  const [conv, setConv]     = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText]     = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

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

  const otherUser = conv?.members?.find((m) => m._id !== user._id);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await messageService.send(conversationId, text.trim());
    setText("");
    reload();
  };

  if (loading) return <PageSpinner />;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center gap-3">
        <Avatar name={otherUser?.name} />
        <p className="font-semibold text-gray-800">{otherUser?.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => {
          const isMe = msg.senderId?._id === user._id || msg.senderId === user._id;
          const senderName = msg.senderId?.name || "Unknown";
          return (
            <div key={msg._id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
              <Avatar name={senderName} size="sm" />
              <div className={`max-w-[65%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                <div className={`px-3 py-2 rounded-2xl text-sm ${isMe ? "bg-primary text-white rounded-tr-sm" : "bg-gray-100 text-gray-800 rounded-tl-sm"}`}>
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 px-1">{formatMessageTime(msg.createdAt)}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="px-4 py-3 border-t border-gray-100 bg-white flex gap-2">
        <input className="flex-1 input-base" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="btn-primary px-5" disabled={!text.trim()}>Send</button>
      </form>
    </div>
  );
}
