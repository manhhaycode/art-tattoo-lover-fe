import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') {
      return;
    }
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    // You can simulate a response from another user or system herenpm
    setTimeout(() => {
      setMessages([...messages, { text: 'I got your message!', sender: 'bot' }]);
    }, 500);
  };

  return (
    <div className="chat-box">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
