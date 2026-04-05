"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  User,
  Phone,
  Mail,
  HardHat,
  AlertTriangle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin" | "system";
  created_at: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"info" | "chat">("info");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // User info form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);
  const hasLeftRef = useRef(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("chat_session_id");
    const savedName = localStorage.getItem("chat_user_name");
    if (savedSession) {
      setSessionId(savedSession);
      if (savedName) setName(savedName);
      setStep("chat");
    }
  }, []);

  // Poll for new messages when in chat mode
  useEffect(() => {
    if (sessionId && step === "chat") {
      fetchMessages();

      pollInterval.current = setInterval(fetchMessages, 3000);
    }

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [sessionId, step]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle page unload (user closes tab or navigates away)
  useEffect(() => {
    if (!sessionId || step !== "chat") return;

    const handleBeforeUnload = () => {
      if (sessionId && !hasLeftRef.current) {
        // Use sendBeacon for reliable delivery on page unload
        const data = JSON.stringify({
          sessionId,
          message: `${name || "User"} has left the chat`,
          sender: "system",
        });
        navigator.sendBeacon("/api/chat/messages", data);
        hasLeftRef.current = true;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionId, step, name]);

  const fetchMessages = async () => {
    if (!sessionId) return;

    try {
      const res = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();

      if (!data.error) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setFormError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      const data = await res.json();

      if (data.error) {
        setFormError(data.error);
        return;
      }

      setSessionId(data.id);
      localStorage.setItem("chat_session_id", data.id);
      localStorage.setItem("chat_user_name", name);
      setStep("chat");
      // Welcome message is now stored in the database and will be fetched automatically
    } catch (error) {
      setFormError("Failed to start chat. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: newMessage,
          sender: "user",
        }),
      });

      const data = await res.json();

      if (!data.error) {
        setMessages((prev) => [...prev, data]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Send "user left" message to admin and reset chat
  const endChat = async () => {
    if (!sessionId || hasLeftRef.current) return;
    hasLeftRef.current = true;

    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: `${name || "User"} has left the chat`,
          sender: "system",
        }),
      });
    } catch (error) {
      console.error("Failed to send leave message:", error);
    }

    // Reset chat state
    localStorage.removeItem("chat_session_id");
    localStorage.removeItem("chat_user_name");
    setSessionId(null);
    setStep("info");
    setMessages([]);
    setName("");
    setPhone("");
    setEmail("");
    setIsOpen(false);
    setShowEndConfirm(false);
    hasLeftRef.current = false;
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div data-chat-widget>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[10000] w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-white/90 backdrop-blur rotate-90"
            : "bg-[#0055A5] hover:bg-[#0055A5]/90"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#0055A5]" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-[10000] w-[360px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0055A5] to-[#003d7a] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FBB62E] rounded-full flex items-center justify-center">
                <HardHat className="w-5 h-5 text-[#0055A5]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Bonardi Construction</h3>
                <p className="text-xs text-blue-200">
                  {step === "chat" ? "We typically reply in minutes" : "Start a conversation"}
                </p>
              </div>
            </div>
          </div>

          {step === "info" ? (
            /* Info Form */
            <form onSubmit={startChat} className="p-4 space-y-4">
              <p className="text-gray-600 text-sm">
                Enter your details to start chatting with our team.
              </p>

              {formError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] focus:ring-1 focus:ring-[#0055A5]"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] focus:ring-1 focus:ring-[#0055A5]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] focus:ring-1 focus:ring-[#0055A5]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0055A5] hover:bg-[#0055A5]/90 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    Start Chat
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Chat Interface */
            <>
              {/* Messages */}
              <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-[#0055A5] text-white rounded-br-sm"
                          : msg.sender === "system"
                          ? "bg-[#FBB62E]/20 text-gray-700 text-sm"
                          : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "user"
                            ? "text-white/60"
                            : "text-gray-400"
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
              <div className="p-4 border-t border-gray-200 bg-white relative">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && sendMessage()
                    }
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] focus:ring-1 focus:ring-[#0055A5]"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isSending || !newMessage.trim()}
                    className="bg-[#0055A5] hover:bg-[#0055A5]/90 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setShowEndConfirm(true)}
                  className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  End chat
                </button>

                {/* End Conversation Confirmation Modal */}
                {showEndConfirm && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-10 rounded-b-2xl">
                    <div className="bg-white rounded-xl p-5 max-w-sm w-full shadow-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h4 className="text-gray-900 font-semibold">End Conversation?</h4>
                      </div>
                      <p className="text-gray-500 text-sm mb-5">
                        Are you sure you want to end this conversation? Your chat history will be cleared.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowEndConfirm(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={endChat}
                          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          End Chat
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
