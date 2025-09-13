
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/api';
import { ChatIcon } from '../components/icons/ChatIcon';

const LegalGuidance: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'bot', text: 'Hello! I am your legal assistant. How can I help you today regarding POCSO, BNS, or other related laws?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage: ChatMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const botResponse = await getChatbotResponse(input);
        setMessages(prev => [...prev, botResponse]);
    } catch(error) {
        const errorResponse: ChatMessage = { id: Date.now() + 1, sender: 'bot', text: "Sorry, I encountered an error. Please try again."};
        setMessages(prev => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)] bg-card-light dark:bg-card-dark rounded-lg shadow-2xl">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-bold text-center">Legal Guidance Chat</h1>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-text-light-primary dark:text-dark-primary'}`}>
                <p className="text-sm">{msg.text}</p>
                {msg.source && (
                   <button className="mt-2 text-xs font-semibold text-blue-200 dark:text-blue-300 hover:underline">
                       Show Source: {msg.source}
                   </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-md p-3 rounded-lg bg-gray-200 dark:bg-slate-700">
                <span className="animate-pulse">...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a legal question..."
          className="flex-grow px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 disabled:bg-primary-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LegalGuidance;
