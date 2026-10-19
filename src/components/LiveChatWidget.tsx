import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/initialData';

export const LiveChatWidget: React.FC = () => {
  const { chatOpen, setChatOpen, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickChip = (prompt: string) => {
    sendChatMessage(prompt);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white shadow-xl shadow-[#7130cf]/30 transition hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open live chat"
      >
        {chatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[var(--page-bg)] bg-emerald-400" />
          </>
        )}
      </button>

      {/* Floating chat panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 flex w-[calc(100vw-2rem)] sm:w-96 flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-solid)] shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--line)] bg-gradient-to-r from-[#7130cf] to-[#c026d3] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#7130cf] bg-emerald-300" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold">{PROFILE_INFO.name}</h3>
                <p className="text-[11px] text-white/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live chat &bull; Online now
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex max-h-80 min-h-64 flex-col gap-3 overflow-y-auto bg-[var(--surface-soft)] p-4 text-sm">
            {chatMessages.map(msg => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAdmin ? 'items-start mr-8' : 'items-end ml-8'}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isAdmin
                        ? 'bg-[var(--surface-solid)] text-[var(--text)] border border-[var(--line)] rounded-bl-xs'
                        : 'bg-gradient-to-r from-[#7130cf] to-[#903df2] text-white rounded-br-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 px-1 text-[10px] text-[var(--text-soft)]">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-[var(--line)] bg-[var(--surface-solid)] px-3 py-2 no-scrollbar">
            <button
              type="button"
              onClick={() => handleQuickChip('Tell me about your available projects')}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-soft)] whitespace-nowrap hover:border-[#7130cf]/40 hover:text-[#7130cf] transition"
            >
              🚀 Featured Projects
            </button>
            <button
              type="button"
              onClick={() => handleQuickChip('Are you available for client work?')}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-soft)] whitespace-nowrap hover:border-[#7130cf]/40 hover:text-[#7130cf] transition"
            >
              💼 Hire for Work
            </button>
            <button
              type="button"
              onClick={() => handleQuickChip('What is your main technology stack?')}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-soft)] whitespace-nowrap hover:border-[#7130cf]/40 hover:text-[#7130cf] transition"
            >
              ⚡ Tech Stack
            </button>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSubmit} className="border-t border-[var(--line)] bg-[var(--surface-solid)] p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Write your message..."
                className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-3.5 py-2 text-sm text-[var(--text)] outline-none focus:border-[#7130cf] transition placeholder:text-[var(--text-soft)]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7130cf] to-[#c026d3] text-white shadow-md transition hover:opacity-90 disabled:opacity-40 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--text-soft)] px-1">
              <span>Direct messages logged to portfolio inbox</span>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="hover:text-[#7130cf] underline"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
