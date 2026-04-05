"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Loader2,
  Trash2,
  Phone,
  Mail,
  User,
  Clock,
  RefreshCw,
  Bell,
  BellOff,
} from "lucide-react";

interface ChatSession {
  id: string;
  name: string;
  phone: string;
  email: string;
  user_agent: string;
  created_at: string;
  messageCount: number;
}

interface ChatMessage {
  id: string;
  session_id: string;
  text: string;
  sender: "user" | "admin" | "system";
  created_at: string;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUserMessageCountRef = useRef(0);

  // Initialize audio on mount
  useEffect(() => {
    // Base64 encoded short beep sound
    audioRef.current = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2eleQ0DWKrx5qVjBwNGq+bfmVMAAEOs4dCDPQAAQa7f0IY/AAA4rtvMgjsAADut2MmAOQAAOKzXx343AAAzq9XFfDUAADCp08N6MwAALajRwXgxAAArp8++di8AACqmzr10LQAAKKXMu3IsAAAmpMq5cCoAACOjyLdvKQAAIqLGtW4nAAAgocS0bSYAAB+gw7JrJAAAHp/BsGokAAAcnsCvaSIAABudv61nIQAAGpy9q2YgAAAZm7yqZR4AABeavKlkHQAAF5m6p2McAAAWmLmmYhsAABWXuKVhGgAAFJa3pGAZAAATlbalXxgAABKVtKReGAAAEZSzoV0XAAAQk7KgXBYAAA+SsZ9bFQAADpGwnloVAAANkK+dWRQAAAyPrpxYEwAAC46tm1cTAAAKjayaVhIAAAqMq5lVEQAACYuqmFQRAAAIiqmXUxAAAAmJqJZSEAAAB4inlFEPAAAHh6aUUA8AAAaGpZNPDgAABoWkkkz"
    );
  }, []);

  useEffect(() => {
    fetchSessions();

    // Poll for new sessions every 10 seconds
    const sessionPoll = setInterval(fetchSessions, 10000);

    return () => {
      clearInterval(sessionPoll);
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id);

      // Poll for new messages every 3 seconds
      if (pollInterval.current) clearInterval(pollInterval.current);
      pollInterval.current = setInterval(() => {
        fetchMessages(selectedSession.id, true);
      }, 3000);
    }

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/session");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSessions(data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string, silent = false) => {
    try {
      const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Count user messages to detect new ones
      const userMessageCount = data.filter(
        (m: ChatMessage) => m.sender === "user"
      ).length;

      // Play notification sound only when new user messages arrive (not admin messages)
      if (
        notificationsEnabled &&
        userMessageCount > lastUserMessageCountRef.current &&
        lastUserMessageCountRef.current > 0
      ) {
        audioRef.current?.play().catch(() => {});
      }
      lastUserMessageCountRef.current = userMessageCount;

      // Only update if there are new messages
      if (!silent || data.length !== messages.length) {
        setMessages(data);
      }
    } catch (err) {
      if (!silent) {
        setError(err instanceof Error ? err.message : "Failed to fetch messages");
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedSession) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          message: newMessage,
          sender: "admin",
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to delete this chat session?")) return;

    try {
      const res = await fetch(`/api/chat/session?sessionId=${sessionId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (selectedSession?.id === sessionId) {
        setSelectedSession(null);
        setMessages([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete session");
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString();
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4">
      {/* Sessions List */}
      <div className="w-80 bg-white/5 border border-white/10 rounded-xl flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Chat Sessions</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  notificationsEnabled
                    ? "bg-[#FBB62E]/20 text-[#FBB62E]"
                    : "text-white/40 hover:text-white/60"
                }`}
                title={notificationsEnabled ? "Disable sound notifications" : "Enable sound notifications"}
              >
                {notificationsEnabled ? (
                  <Bell className="w-4 h-4" />
                ) : (
                  <BellOff className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={fetchSessions}
                className="p-2 text-white/60 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-[#FBB62E] animate-spin" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-center text-white/40">
              <MessageSquare className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No chat sessions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full p-4 text-left hover:bg-white/5 transition-colors ${
                    selectedSession?.id === session.id ? "bg-white/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#0055A5]/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#0055A5]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{session.name}</p>
                        <p className="text-xs text-white/40">
                          {formatDate(session.created_at)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                      className="p-1 text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-white/60 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {session.messageCount}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-white">{selectedSession.name}</h2>
                  <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedSession.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {selectedSession.email}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Started {formatDate(selectedSession.created_at)}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === "admin"
                        ? "bg-[#0055A5] text-white rounded-br-sm"
                        : msg.sender === "system"
                        ? "bg-[#FBB62E]/20 text-white/60 text-sm italic"
                        : "bg-white/10 text-white rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "admin" ? "text-white/60" : "text-white/40"
                      }`}
                    >
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              {error && (
                <div className="mb-2 text-red-400 text-sm">{error}</div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBB62E]"
                />
                <button
                  onClick={sendMessage}
                  disabled={isSending || !newMessage.trim()}
                  className="bg-[#FBB62E] hover:bg-[#FBB62E]/90 text-[#0055A5] font-medium px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p>Select a chat session to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
