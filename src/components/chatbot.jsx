"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const ease = [0.16, 1, 0.3, 1];

const mdComponents = {
  p:      ({ children }) => <p className="mb-1.5 last:mb-0 leading-snug">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
  em:     ({ children }) => <em className="italic text-zinc-600">{children}</em>,
  ul:     ({ children }) => <ul className="list-disc list-outside pl-4 space-y-0.5 my-1">{children}</ul>,
  ol:     ({ children }) => <ol className="list-decimal list-outside pl-4 space-y-0.5 my-1">{children}</ol>,
  li:     ({ children }) => <li className="leading-snug">{children}</li>,
  code:   ({ children }) => <code className="break-words bg-zinc-100 rounded px-1 py-0.5 text-[13px]">{children}</code>,
  pre:    ({ children }) => <pre className="whitespace-pre-wrap break-words bg-zinc-100 rounded-lg p-2 my-1 text-[13px] overflow-x-auto">{children}</pre>,
  a:      ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline break-words">
      {children}
    </a>
  ),
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
      <motion.button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-zinc-900 flex items-center justify-center shadow-lg"
        aria-label={open ? "Close chat" : "Ask Angelica's Assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2, ease }}
            className="flex items-center justify-center"
          >
            {open ? <X size={20} className="text-white" /> : <MessageCircle size={20} className="text-white" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease }}
            className="fixed bottom-24 right-6 w-[340px] rounded-[28px] overflow-hidden z-50
                       bg-white border border-zinc-200 shadow-2xl
                       flex flex-col"
            style={{ height: "480px" }}
          >
            <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0 border-b border-zinc-100">
              <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">A</span>
              </div>
              <div>
                <div className="text-zinc-900 text-sm font-medium leading-tight">Angelica&apos;s Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                  Portfolio Q&amp;A
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-zinc-50 min-h-0">
              {messages.length === 0 && (
                <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-600 leading-relaxed max-w-[88%] break-words">
                  Hi! Ask me anything about Angelica: her skills, projects, or experience.
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`px-4 py-2.5 rounded-2xl max-w-[88%] text-sm break-words ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white ml-auto rounded-tr-sm leading-snug"
                      : "bg-white border border-zinc-200 text-zinc-700 mr-auto rounded-tl-sm"
                  }`}
                >
                  {m.role === "bot"
                    ? <ReactMarkdown components={mdComponents}>{m.text}</ReactMarkdown>
                    : m.text
                  }
                </div>
              ))}
              {isTyping && (
                <div className="bg-white border border-zinc-200 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[88%] mr-auto">
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-2.5 border-t border-zinc-200 bg-white flex-shrink-0">
              <div className="relative flex items-center bg-zinc-50 rounded-full overflow-hidden min-w-0 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-shadow">
                <Input
                  className="flex-grow border-none shadow-none bg-transparent rounded-full pl-4 pr-11 py-2 text-sm focus:ring-0 focus-visible:ring-0 placeholder:text-zinc-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="absolute right-1.5 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center"
                >
                  <Send size={13} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RAGChat;
