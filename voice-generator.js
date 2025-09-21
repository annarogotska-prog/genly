// Voice Generator Functionality

class VoiceGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.bindAIToolsDropdown();
        this.closeDropdownOnLoad();
    }

    bindEvents() {
        // Generate button
        const generateBtn = document.getElementById('generateBtn');
        const scriptInput = document.getElementById('scriptInput');
        
        generateBtn.addEventListener('click', () => this.generateVoice());
        
        // Auto-resize textarea
        scriptInput.addEventListener('input', () => {
            this.autoResizeTextarea(scriptInput);
        });

        // Option items
        document.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', () => {
                this.handleOptionClick(item);
            });
        });
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 198) + 'px';
    }

    async generateVoice() {
        const scriptInput = document.getElementById('scriptInput');
        const generateBtn = document.getElementById('generateBtn');
        const script = scriptInput.value.trim();
        
        if (!script) {
            alert('Please enter some text to generate voice.');
            return;
        }

        // Disable button and show loading
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        // Simulate voice generation
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate';
            
            // Show success message
            this.showSuccessMessage();
            
            // Add to collection (simulate)
            this.addToCollection(script);
        }, 3000);
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎵</div>
                <div class="notification-text">
                    <h4>Voice Generated Successfully!</h4>
                    <p>Your voice clip has been added to your collection.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    addToCollection(script) {
        // This would normally add the generated voice to the collection
        console.log('Added voice to collection:', script.substring(0, 50) + '...');
    }

    handleOptionClick(item) {
        // Handle option item clicks (attach file, language, voice)
        const img = item.querySelector('img');
        const span = item.querySelector('span');
        
        if (img && img.alt === 'Attach') {
            this.handleFileAttachment();
        } else if (span && span.textContent === 'Language') {
            this.showLanguageOptions();
        } else if (span && span.textContent === 'Voice') {
            this.showVoiceOptions();
        }
    }

    handleFileAttachment() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt,.doc,.docx';
        
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
        const scriptInput = document.getElementById('scriptInput');
        scriptInput.value = `📎 Attached file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    }

    showLanguageOptions() {
        // Show language selection dropdown
        const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
        this.showDropdown('Language', languages);
    }

    showVoiceOptions() {
        // Show voice selection dropdown
        const voices = ['Male Voice', 'Female Voice', 'Child Voice', 'Elderly Voice'];
        this.showDropdown('Voice', voices);
    }

    showDropdown(title, options) {
        // Create dropdown overlay
        const overlay = document.createElement('div');
        overlay.className = 'dropdown-overlay';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'voice-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <h3>Select ${title}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="dropdown-options">
                ${options.map(option => `
                    <div class="dropdown-option" data-value="${option}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
        
        overlay.appendChild(dropdown);
        document.body.appendChild(overlay);
        
        // Show dropdown
        setTimeout(() => {
            overlay.classList.add('show');
        }, 100);
        
        // Handle option selection
        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                this.selectOption(title, value);
                this.hideDropdown(overlay);
            });
        });
        
        // Handle close
        dropdown.querySelector('.close-btn').addEventListener('click', () => {
            this.hideDropdown(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideDropdown(overlay);
            }
        });
    }

    selectOption(title, value) {
        // Update the option display
        const optionItems = document.querySelectorAll('.option-item');
        optionItems.forEach(item => {
            const span = item.querySelector('span');
            if (span && span.textContent === title) {
                span.textContent = value;
            }
        });
    }

    hideDropdown(overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
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
                if (toolType === 'chatbot') {
                    window.location.href = 'chatbot.html';
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

    closeDropdownOnLoad() {
        // Ensure dropdown is closed when page loads
        const aiToolsDropdown = document.getElementById('aiToolsDropdown');
        if (aiToolsDropdown) {
            aiToolsDropdown.classList.remove('show');
        }
    }
}

// Initialize voice generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceGenerator();
});

// Export for potential use in other modules
window.VoiceGenerator = VoiceGenerator;
