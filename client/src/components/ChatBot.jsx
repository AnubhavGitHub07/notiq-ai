import React, { useState, useEffect, useRef } from 'react';
import {
    HiOutlineChat,
    HiOutlineX,
    HiOutlinePaperAirplane,
    HiOutlineSparkles,
    HiOutlineBookOpen,
    HiOutlineChevronDown,
    HiOutlineChip
} from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import API from '../api/axios';

const ChatBot = ({ notes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! Select a note and ask me anything about it. ✨' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [showNoteSelector, setShowNoteSelector] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Show tooltip after a delay
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 2000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        if (!selectedNote) {
            setMessages(prev => [...prev,
            { role: 'user', content: input },
            { role: 'assistant', content: 'Please select a note first so I have context to help you! 📚' }
            ]);
            setInput('');
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const chatHistory = messages.filter(m => m.role !== 'system').slice(-6); // Last 6 messages for context
            const res = await API.post('/ai/chat', {
                title: selectedNote.title,
                content: selectedNote.content,
                messages: [...chatHistory, userMessage]
            });

            setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
        } catch (err) {
            console.error("ChatBot AI Error:", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message
            });
            const statusSuffix = err.response ? ` (Status: ${err.response.status})` : "";
            setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I hit a snag: ${err.response?.data?.message || err.message}${statusSuffix}. Please try again! 😅` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper">
            {/* Attraction Tooltip */}
            {showTooltip && !isOpen && (
                <div className="chat-tooltip">
                    <span>Need a hand, Human? 🤖</span>
                    <div className="tooltip-arrow"></div>
                </div>
            )}

            {/* Chat Bubble */}
            <button
                className={`chat-bubble ai-enhanced ${isOpen ? 'active' : ''}`}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowTooltip(false);
                }}
            >
                {isOpen ? <HiOutlineX /> : <HiOutlineChip />}
                {!isOpen && <span className="chat-badge">AI</span>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <HiOutlineSparkles className="sparkle-icon" />
                            <div>
                                <h3>AI Assistant</h3>
                                <p>Online & thinking</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)}><HiOutlineX /></button>
                    </div>

                    <div className="chat-note-selector">
                        <button
                            className="selector-toggle"
                            onClick={() => setShowNoteSelector(!showNoteSelector)}
                        >
                            <HiOutlineBookOpen />
                            <span>{selectedNote ? selectedNote.title : 'Select a Note Context'}</span>
                            <HiOutlineChevronDown className={showNoteSelector ? 'rotate' : ''} />
                        </button>

                        {showNoteSelector && (
                            <div className="note-dropdown">
                                {notes.length === 0 ? (
                                    <div className="no-notes">No notes found</div>
                                ) : (
                                    notes.map(note => (
                                        <div
                                            key={note._id}
                                            className={`note-option ${selectedNote?._id === note._id ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedNote(note);
                                                setShowNoteSelector(false);
                                                setMessages(prev => [...prev, {
                                                    role: 'assistant',
                                                    content: `Great! I'm now focused on "${note.title}". What would you like to know?`
                                                }]);
                                            }}
                                        >
                                            {note.title}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role}`}>
                                <div className="message-content">
                                    {m.role === 'assistant' ? (
                                        <ReactMarkdown>{m.content}</ReactMarkdown>
                                    ) : (
                                        m.content
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message assistant loading">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask about your note..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim() || loading}>
                            <HiOutlinePaperAirplane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
