// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import * as React from 'react';




// const ChatComponent = () => {
//   const [message, setMessage] = React.useState('');
//   const [userMessages, setUserMessages] = React.useState([]);
//   const [aiMessages, setAiMessages] = React.useState([]);

 
//   const handleSendChatMessage = async () => {
//     userMessages((prev) => [...prev, message]);
//     const res = await fetch(`http://localhost:3000/chat?message=${message}`);
//     const data = await res.json();
//     console.log(data);
//     setAiMessages((prev) => [...prev, data.message]);
//     setMessage('');
//   };

//   return (
//     <div className="p-4 ">
//       <div>
//         {userMessages.map((message, index) => (
//           <pre className='text-white' key={index}>{message}</pre>
//         ))}
//       </div>
//       <div className="fixed bottom-4 w-100 flex gap-3">
//         <Input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message here"
//           className="bg-gray-100 w-full"
//         />
//         <Button onClick={handleSendChatMessage} disabled={!message.trim()} className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };
// export default ChatComponent;


function convertMarkdownToH1(input) {
  return input.replace(/\*\*(.*?)\*\*/g, '$1');
}



import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to state
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setMessage('');
    
    try {
      // Call your API
      const res = await fetch(`${ process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://pdf-rag-backend.vercel.app"}/chat?message=${encodeURIComponent(message)}`);
      const data = await res.json();
      
      // Add AI response to state
      const aiMessage = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-900">
      {/* Chat header */}
      <div className="bg-gray-800 p-4 text-white text-center border-b border-gray-700">
        <h1 className="poppins text-xl font-bold">AI Chat Assistant</h1>
      </div>
      
      {/* Messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="poppins text-gray-400 text-center">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 rounded-lg p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="poppins whitespace-pre-wrap">{convertMarkdownToH1(msg.content)}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:poppins"
            rows="2"
          />
          <button
            onClick={handleSendChatMessage}
            disabled={!message.trim() || isLoading}
            className={`p-3  ${
              message.trim() && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-600 cursor-not-allowed'
            } text-white flex items-center justify-center rounded-full w-[70px]`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}