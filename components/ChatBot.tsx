import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
        if (!chatSessionRef.current) {
            chatSessionRef.current = createChatSession();
        }
        
        const response = await chatSessionRef.current.sendMessage({ message: userMessage });
        const text = response.text;
        
        if (text) {
             setMessages((prev) => [...prev, { role: 'model', text }]);
        }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'I apologize, but I am unable to connect right now. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full shadow-xl transition-all active:scale-95 border border-slate-700 flex items-center justify-center
            ${isOpen ? 'bg-teal-600 text-white border-teal-500' : 'bg-slate-900 text-white hover:bg-slate-800'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute top-14 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col origin-top-right animate-in fade-in zoom-in-95 duration-200" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3">
             <div className="p-2 bg-teal-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-teal-400" />
             </div>
             <div>
                <h3 className="text-white font-bold text-sm">Synapse AI Assistant</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                    Online • Gemini 3.0 Pro
                </p>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
                <div className="text-center py-8 px-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bot className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">How can I help you today?</p>
                    <p className="text-slate-400 text-xs mt-1">Ask about products, orders, or analytics.</p>
                </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-teal-600 text-white p-2 rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;