"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const mdComponents = {
  p:      ({ children }) => <p className="mb-1.5 last:mb-0 leading-snug">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
  em:     ({ children }) => <em className="italic text-zinc-600">{children}</em>,
  ul:     ({ children }) => <ul className="list-disc list-outside pl-4 space-y-0.5 my-1">{children}</ul>,
  ol:     ({ children }) => <ol className="list-decimal list-outside pl-4 space-y-0.5 my-1">{children}</ol>,
  li:     ({ children }) => <li className="leading-snug">{children}</li>,
};

const RAGChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (message, priorMessages) => {
    const history = [
      ...priorMessages.map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const FALLBACK = "This feature is not available right now. Please contact Angelica directly if you have any questions!";

    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });

      const result = await res.json();
      const text = res.ok && result.text ? result.text : FALLBACK;
      setMessages(prev => [...prev, { role: "bot", text }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: FALLBACK }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const message = input.trim();
    const snapshot = messages;
    setMessages(prev => [...prev, { role: "user", text: message }]);
    setInput("");
    sendMessage(message, snapshot);
  };

  return (
    <div>
      {/* editorial stamp button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-white border-2 border-pink-hot
                   flex flex-col items-center justify-center
                   shadow-lg hover:bg-pink-hot group transition-all duration-200"
        title="Ask Angelica's Assistant"
      >
        <span className="font-playfair italic font-black text-xl text-pink-hot group-hover:text-white transition-colors leading-none">
          A
        </span>
        <span className="font-bebas text-[7px] tracking-[2px] text-pink-hot group-hover:text-white transition-colors mt-0.5">
          Chat
        </span>
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 w-[340px] rounded-2xl overflow-hidden z-50
                     bg-white border border-pink-hot/30 shadow-2xl shadow-pink-hot/10
                     flex flex-col"
          style={{ height: "480px" }}
        >
          {/* header, pink editorial strip */}
          <div className="bg-pink-deep px-5 py-3 flex items-center gap-3 flex-shrink-0">
            <object
              data="/angel-logo.svg"
              type="image/svg+xml"
              className="h-6 brightness-0 invert flex-shrink-0"
            />
            <div>
              <div className="font-playfair italic text-white text-sm leading-tight">Angelica's</div>
              <div className="font-bebas text-[8px] tracking-[3px] text-pink-candy">Portfolio Assistant</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/50 hover:text-white text-lg leading-none transition-colors"
            >
              ×
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-pink-pale/40 min-h-0">
            {messages.length === 0 && (
              <div className="bg-white border border-pink-hot/20 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-600 leading-relaxed max-w-[88%]">
                Hi! Ask me anything about Angelica: her skills, projects, or experience.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-4 py-2.5 rounded-2xl max-w-[88%] text-sm ${
                  m.role === "user"
                    ? "bg-pink-hot text-white ml-auto rounded-tr-sm leading-snug"
                    : "bg-white border border-pink-hot/20 text-zinc-700 mr-auto rounded-tl-sm"
                }`}
              >
                {m.role === "bot"
                  ? <ReactMarkdown components={mdComponents}>{m.text}</ReactMarkdown>
                  : m.text
                }
              </div>
            ))}
            {isTyping && (
              <div className="bg-white border border-pink-hot/20 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[88%] mr-auto">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-pink-hot rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-pink-hot rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-pink-hot rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div className="px-3 py-2.5 border-t border-pink-hot/15 bg-white flex-shrink-0">
            <div className="relative flex items-center bg-pink-pale rounded-full">
              <Input
                className="flex-grow border-none shadow-none bg-transparent rounded-full px-4 py-2 text-sm focus:ring-0 placeholder:text-zinc-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="absolute right-1.5 w-7 h-7 rounded-full bg-pink-hot hover:bg-pink-deep text-white flex items-center justify-center transition-colors"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RAGChat;
