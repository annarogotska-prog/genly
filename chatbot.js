// ChatGPT-4 Like Functionality for AI Chatbot

class ChatBot {
    constructor() {
        this.currentChatId = 'chat-1';
        this.chats = {
            'chat-1': {
                id: 'chat-1',
                title: 'History chat 1 with some',
                messages: [
                    {
                        id: 'msg-1',
                        type: 'user',
                        content: 'Please write me how to make a chatbot?',
                        timestamp: new Date('2024-01-15T10:30:00')
                    },
                    {
                        id: 'msg-2',
                        type: 'assistant',
                        content: `🧠 **How to Make a Chatbot (Step-by-Step)**

✅ **1. Define Your Goal**
Ask yourself:
• What will the chatbot do? (e.g., answer FAQs, take orders, schedule appointments)
• Who is the target audience?

⚙️ **2. Choose a Platform or Tool**
Pick based on your skills and needs:

**No-code / Low-code tools (easiest):**
• Chatfuel (great for Messenger bots)
• Tidio or ManyChat
• Landbot (for website chat)
• Dialogflow by Google (natural language understanding)

**Code-based (for developers):**
• Python with libraries like ChatterBot, NLTK, or Rasa
• Node.js with Botpress or Microsoft Bot Framework
• OpenAI GPT APIs (for natural and smart conversations)

🎯 **3. Design the Conversation Flow**
• Map out user journeys
• Create decision trees
• Plan fallback responses

💻 **4. Build and Test**
• Start with simple Q&A
• Test with real users
• Iterate based on feedback

🚀 **5. Deploy and Monitor**
• Launch on your chosen platform
• Monitor performance metrics
• Continuously improve responses`,
                        timestamp: new Date('2024-01-15T10:31:00')
                    }
                ]
            },
            'chat-2': {
                id: 'chat-2',
                title: 'How to build a website',
                messages: []
            },
            'chat-3': {
                id: 'chat-3',
                title: 'Python programming help',
                messages: []
            },
            'chat-4': {
                id: 'chat-4',
                title: 'Marketing strategies',
                messages: []
            }
        };
        
        this.isTyping = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadChat(this.currentChatId);
        this.updateHistoryList();
    }

    bindEvents() {
        // Send button
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        messageInput.addEventListener('input', () => {
            this.autoResizeTextarea(messageInput);
        });

        // New chat button
        const newChatBtn = document.getElementById('newChatBtn');
        newChatBtn.addEventListener('click', () => this.createNewChat());

        // History items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const chatId = item.dataset.chatId;
                this.switchChat(chatId);
            });
        });

        // File attachment
        const attachBtn = document.querySelector('.tool-btn');
        attachBtn.addEventListener('click', () => this.handleFileAttachment());

        // AI Tools dropdown
        this.bindAIToolsDropdown();
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage('user', message);
        messageInput.value = '';
        this.autoResizeTextarea(messageInput);

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
    }

    addMessage(type, content, timestamp = new Date()) {
        const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const message = {
            id: messageId,
            type,
            content,
            timestamp
        };

        this.chats[this.currentChatId].messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
        this.updateChatTitle();
    }

    renderMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${message.type}`;
        messageElement.dataset.messageId = message.id;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (message.type === 'user') {
            avatar.innerHTML = '<div class="avatar-text">U</div>';
        } else {
            avatar.innerHTML = '<div class="avatar-text">AI</div>';
        }

        const content = document.createElement('div');
        content.className = 'message-content';

        const text = document.createElement('div');
        text.className = 'message-text';
        
        if (message.type === 'assistant') {
            text.innerHTML = this.formatMarkdown(message.content);
        } else {
            text.textContent = message.content;
        }

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp);

        content.appendChild(text);
        content.appendChild(time);
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        chatMessages.appendChild(messageElement);
    }

    formatMarkdown(text) {
        // Simple markdown formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n/g, '<br>');
    }

    formatTime(timestamp) {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatMessages = document.getElementById('chatMessages');
        
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message assistant typing-message';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-text">AI</div>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    generateAIResponse(userMessage) {
        const responses = this.getAIResponses(userMessage);
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage('assistant', response);
    }

    getAIResponses(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('chatbot') || message.includes('bot')) {
            return [
                `🧠 **Chatbot Development Guide**

Creating a chatbot involves several key steps:

**1. Planning Phase**
• Define your chatbot's purpose and goals
• Identify your target audience
• Map out conversation flows

**2. Technology Selection**
• Choose between no-code platforms (Chatfuel, ManyChat)
• Or code-based solutions (Python, Node.js)
• Consider AI capabilities (OpenAI GPT, Dialogflow)

**3. Design & Development**
• Create conversation scripts
• Implement natural language processing
• Test with real users

**4. Deployment & Optimization**
• Launch on your chosen platform
• Monitor performance metrics
• Continuously improve based on user feedback

Would you like me to elaborate on any specific aspect of chatbot development?`
            ];
        }
        
        if (message.includes('website') || message.includes('web')) {
            return [
                `🌐 **Website Development Guide**

Building a website involves several key components:

**Frontend Development:**
• HTML for structure
• CSS for styling
• JavaScript for interactivity
• Frameworks like React, Vue, or Angular

**Backend Development:**
• Server-side languages (Node.js, Python, PHP)
• Databases (MySQL, PostgreSQL, MongoDB)
• APIs and web services

**Deployment & Hosting:**
• Choose a hosting provider
• Set up domain and SSL
• Configure CDN for performance

**Best Practices:**
• Responsive design for mobile
• SEO optimization
• Security considerations
• Performance optimization

Would you like me to dive deeper into any specific aspect of web development?`
            ];
        }
        
        if (message.includes('python') || message.includes('programming')) {
            return [
                `🐍 **Python Programming Guide**

Python is an excellent language for beginners and experts alike:

**Core Concepts:**
• Variables and data types
• Control structures (if/else, loops)
• Functions and classes
• Error handling

**Popular Libraries:**
• NumPy for numerical computing
• Pandas for data analysis
• Django/Flask for web development
• TensorFlow/PyTorch for machine learning

**Best Practices:**
• Follow PEP 8 style guide
• Use virtual environments
• Write clean, readable code
• Implement proper testing

**Learning Path:**
1. Basic syntax and concepts
2. Data structures and algorithms
3. Object-oriented programming
4. Specialized libraries based on your interests

What specific area of Python programming interests you most?`
            ];
        }
        
        if (message.includes('marketing') || message.includes('strategy')) {
            return [
                `📈 **Marketing Strategy Guide**

Effective marketing requires a comprehensive approach:

**Digital Marketing Channels:**
• Social media marketing
• Content marketing
• Email campaigns
• SEO and SEM
• Influencer partnerships

**Strategy Development:**
• Define target audience
• Set clear objectives and KPIs
• Choose appropriate channels
• Create compelling content
• Measure and optimize results

**Tools & Platforms:**
• Google Analytics for web analytics
• Social media management tools
• Email marketing platforms
• CRM systems for customer management

**Key Metrics to Track:**
• Conversion rates
• Customer acquisition cost
• Return on investment
• Engagement rates

Would you like me to elaborate on any specific marketing channel or strategy?`
            ];
        }
        
        // Default responses
        return [
            `I understand you're asking about "${userMessage}". Let me provide you with some helpful information:

This is a complex topic that involves several key aspects. Here are some important points to consider:

1. **Understanding the Basics**: Start with fundamental concepts
2. **Practical Application**: Look for real-world examples
3. **Best Practices**: Follow industry standards
4. **Continuous Learning**: Stay updated with latest developments

Would you like me to elaborate on any specific aspect of this topic? I'm here to help you dive deeper into any area that interests you.`
        ];
    }

    createNewChat() {
        const chatId = `chat-${Date.now()}`;
        const title = 'New conversation';
        
        this.chats[chatId] = {
            id: chatId,
            title,
            messages: []
        };
        
        this.currentChatId = chatId;
        this.loadChat(chatId);
        this.updateHistoryList();
    }

    switchChat(chatId) {
        this.currentChatId = chatId;
        this.loadChat(chatId);
        this.updateHistoryList();
    }

    loadChat(chatId) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        const chat = this.chats[chatId];
        if (chat && chat.messages.length > 0) {
            chat.messages.forEach(message => this.renderMessage(message));
            this.scrollToBottom();
        } else {
            // Show welcome message for empty chats
            this.showWelcomeMessage();
        }
    }

    showWelcomeMessage() {
        const chatMessages = document.getElementById('chatMessages');
        const welcomeElement = document.createElement('div');
        welcomeElement.className = 'welcome-chat-message';
        welcomeElement.innerHTML = `
            <div class="welcome-content">
                <h3>👋 Welcome to AI Chatbot!</h3>
                <p>I'm here to help you with various topics including:</p>
                <ul>
                    <li>🤖 Chatbot development</li>
                    <li>🌐 Website building</li>
                    <li>🐍 Python programming</li>
                    <li>📈 Marketing strategies</li>
                </ul>
                <p>Just type your question below and I'll do my best to help!</p>
            </div>
        `;
        chatMessages.appendChild(welcomeElement);
    }

    updateHistoryList() {
        const historyItems = document.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.chatId === this.currentChatId) {
                item.classList.add('active');
            }
        });
    }

    updateChatTitle() {
        const chat = this.chats[this.currentChatId];
        if (chat.messages.length > 0) {
            const firstUserMessage = chat.messages.find(msg => msg.type === 'user');
            if (firstUserMessage) {
                chat.title = firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '');
                this.updateHistoryList();
            }
        }
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    handleFileAttachment() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt,.pdf,.doc,.docx,.jpg,.png,.gif';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        });
        
        fileInput.click();
    }

    handleFileUpload(file) {
        // Simulate file processing
        const messageInput = document.getElementById('messageInput');
        messageInput.value = `📎 Attached file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        
        // Auto-send the message
        setTimeout(() => {
            this.sendMessage();
        }, 500);
    }

    bindAIToolsDropdown() {
        const aiToolsButton = document.querySelector('[data-dropdown="ai-tools"]');
        const aiToolsDropdown = document.getElementById('aiToolsDropdown');
        const dropdownItems = document.querySelectorAll('.dropdown-item');

        // Toggle dropdown on button click
        aiToolsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            aiToolsDropdown.classList.toggle('show');
        });

        // Handle dropdown item clicks
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const toolType = item.dataset.tool;
                
                // Handle navigation for specific tools
                if (toolType === 'audio') {
                    window.location.href = 'voice-generator.html';
                    return;
                }
                
                // Remove active class from all items
                dropdownItems.forEach(dropdownItem => {
                    dropdownItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update button text based on selected tool
                const toolTitle = item.querySelector('.item-title').textContent;
                // Update the button text (the text node before the chevron span)
                const textNode = Array.from(aiToolsButton.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.textContent = toolTitle;
                }
                
                // Close dropdown
                aiToolsDropdown.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!aiToolsButton.contains(e.target) && !aiToolsDropdown.contains(e.target)) {
                aiToolsDropdown.classList.remove('show');
            }
        });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

// Export for potential use in other modules
window.ChatBot = ChatBot;
