// BTF5965 Tax Law Tutorial Presence System
// Main JavaScript functionality

class PresenceSystem {
    constructor() {
        this.currentScreen = 'loading-screen';
        this.studentData = null;
        this.sessionData = {
            studentId: '',
            studentName: '',
            feedback: '',
            gifFile: null,
            timestamp: null,
            deviceInfo: {}
        };
        
        this.init();
    }

    async init() {
        // Load student database
        await this.loadStudentDatabase();
        
        // Collect device information
        this.collectDeviceInfo();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start the application
        setTimeout(() => {
            this.showScreen('welcome-screen');
        }, 2000);
    }

    async loadStudentDatabase() {
        try {
            const response = await fetch('students.json');
            this.studentData = await response.json();
        } catch (error) {
            console.error('Failed to load student database:', error);
            // Fallback data
            this.studentData = {
                students: {
                    "12345678": "John Doe",
                    "87654321": "Jane Smith"
                },
                course_info: {
                    code: "BTF5965",
                    name: "Tax Law Tutorial",
                    current_week: 5,
                    slide_link: "http://bit.ly/4oR8clE"
                }
            };
        }
    }

    collectDeviceInfo() {
        this.sessionData.deviceInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString(),
            cookiesEnabled: navigator.cookieEnabled,
            onlineStatus: navigator.onLine,
            referrer: document.referrer || 'direct',
            sessionId: this.generateSessionId()
        };
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    setupEventListeners() {
        // Welcome screen
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('student-id-screen');
        });

        // Student ID input
        const studentIdInput = document.getElementById('student-id-input');
        const verifyIdBtn = document.getElementById('verify-id-btn');
        
        studentIdInput.addEventListener('input', (e) => {
            this.handleStudentIdInput(e);
        });
        
        studentIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !verifyIdBtn.disabled) {
                this.verifyStudentId();
            }
        });
        
        verifyIdBtn.addEventListener('click', () => {
            this.verifyStudentId();
        });

        // Name confirmation
        document.getElementById('name-correct-btn').addEventListener('click', () => {
            this.confirmName();
        });
        
        document.getElementById('name-incorrect-btn').addEventListener('click', () => {
            this.showScreen('student-id-screen');
            this.clearStudentIdInput();
        });

        // Presence confirmation
        document.getElementById('mark-present-btn').addEventListener('click', () => {
            this.markPresent();
        });

        // Feedback screen
        const feedbackInput = document.getElementById('feedback-input');
        const form = document.getElementById('attendance-form');
        
        feedbackInput.addEventListener('input', () => {
            this.handleFeedbackInput();
        });
        
        // Handle form submission properly
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            this.submitFeedback();
        });

        // GIF upload
        this.setupAdminGifUpload();

        // Thank you screen : deleted        document.getElementById('new-entry-btn').addEventListener('click', () => { this.resetSystem();        });

        // Error modal
        document.getElementById('close-error-modal').addEventListener('click', () => {
            this.hideErrorModal();
        });
        
        document.getElementById('error-modal-ok').addEventListener('click', () => {
            this.hideErrorModal();
        });

        // Update time displays
        this.updateTimeDisplays();
        setInterval(() => this.updateTimeDisplays(), 1000);
    }

    setupAdminGifUpload() {
        // Admin access button
        document.getElementById('admin-access-btn').addEventListener('click', () => {
            this.toggleAdminPanel();
        });

        // Admin panel toggle
        document.getElementById('toggle-admin-btn').addEventListener('click', () => {
            this.toggleAdminPanel();
        });

        // Admin GIF upload
        const adminUploadArea = document.getElementById('admin-gif-upload-area');
        const adminGifInput = document.getElementById('admin-gif-input');
        const adminGifPreview = document.getElementById('admin-gif-preview');
        const adminGifPreviewImg = document.getElementById('admin-gif-preview-img');
        const removeAdminGifBtn = document.getElementById('remove-admin-gif-btn');
        const saveAdminGifBtn = document.getElementById('save-admin-gif-btn');

        // Click to upload
        adminUploadArea.addEventListener('click', () => {
            adminGifInput.click();
        });

        // File input change
        adminGifInput.addEventListener('change', (e) => {
            this.handleAdminGifUpload(e.target.files[0]);
        });

        // Drag and drop
        adminUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            adminUploadArea.classList.add('dragover');
        });

        adminUploadArea.addEventListener('dragleave', () => {
            adminUploadArea.classList.remove('dragover');
        });

        adminUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            adminUploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'image/gif') {
                this.handleAdminGifUpload(file);
            }
        });

        // Remove admin GIF
        removeAdminGifBtn.addEventListener('click', () => {
            this.removeAdminGif();
        });

        // Save admin GIF
        saveAdminGifBtn.addEventListener('click', () => {
            this.saveAdminGif();
        });

        // Load existing admin GIF on startup
        this.loadAdminGif();
    }

    toggleAdminPanel() {
        const adminControls = document.getElementById('admin-controls');
        const toggleBtn = document.getElementById('toggle-admin-btn');
        
        if (adminControls.classList.contains('hidden')) {
            adminControls.classList.remove('hidden');
            adminControls.classList.add('active');
            toggleBtn.querySelector('span').textContent = 'Hide Admin Panel';
        } else {
            adminControls.classList.add('hidden');
            adminControls.classList.remove('active');
            toggleBtn.querySelector('span').textContent = 'Show Admin Panel';
        }
    }

    handleAdminGifUpload(file) {
        if (!file) return;

        if (file.type !== 'image/gif') {
            this.showErrorModal('Please upload a GIF file only.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            this.showErrorModal('GIF file size must be less than 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const adminGifPreview = document.getElementById('admin-gif-preview');
            const adminGifPreviewImg = document.getElementById('admin-gif-preview-img');
            const adminUploadArea = document.getElementById('admin-gif-upload-area');
            const saveBtn = document.getElementById('save-admin-gif-btn');
            
            adminGifPreviewImg.src = e.target.result;
            adminGifPreview.classList.remove('hidden');
            adminUploadArea.style.display = 'none';
            saveBtn.disabled = false;
            
            this.tempAdminGif = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: e.target.result
            };
        };
        
        reader.readAsDataURL(file);
    }

    removeAdminGif() {
        const adminGifPreview = document.getElementById('admin-gif-preview');
        const adminUploadArea = document.getElementById('admin-gif-upload-area');
        const adminGifInput = document.getElementById('admin-gif-input');
        const saveBtn = document.getElementById('save-admin-gif-btn');
        
        adminGifPreview.classList.add('hidden');
        adminUploadArea.style.display = 'block';
        adminGifInput.value = '';
        saveBtn.disabled = true;
        this.tempAdminGif = null;
    }

    async saveAdminGif() {
        if (this.tempAdminGif) {
            // Save locally only
            localStorage.setItem('btf5965_admin_gif', this.tempAdminGif.data);
            this.displayAdminGif(this.tempAdminGif.data);
            this.toggleAdminPanel();
            alert('GIF saved and will be displayed to students!');
        }
    }

    loadAdminGif() {
        const savedGif = localStorage.getItem('btf5965_admin_gif');
        if (savedGif) {
            this.displayAdminGif(savedGif);
        }
    }

    displayAdminGif(gifData) {
        const adminGifDisplay = document.getElementById('admin-gif-display');
        const adminGifImg = document.getElementById('admin-gif-img');
        
        adminGifImg.src = gifData;
        adminGifDisplay.classList.remove('hidden');
    }

    showScreen(screenId) {
        // Hide current screen
        const currentScreenEl = document.getElementById(this.currentScreen);
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
        }

        // Show new screen
        const newScreenEl = document.getElementById(screenId);
        if (newScreenEl) {
            setTimeout(() => {
                newScreenEl.classList.add('active');
            }, 100);
        }

        this.currentScreen = screenId;
    }

    handleStudentIdInput(e) {
        const input = e.target;
        const value = input.value.replace(/\D/g, ''); // Only digits
        input.value = value;

        const verifyBtn = document.getElementById('verify-id-btn');
        const errorDiv = document.getElementById('student-id-error');
        
        errorDiv.textContent = '';
        
        if (value.length === 8) {
            verifyBtn.disabled = false;
        } else {
            verifyBtn.disabled = true;
        }
    }

    verifyStudentId() {
        const studentId = document.getElementById('student-id-input').value;
        const errorDiv = document.getElementById('student-id-error');
        
        if (!this.studentData.students[studentId]) {
            errorDiv.textContent = 'Student ID not found. Please check your ID and try again.';
            return;
        }

        // Check for duplicate entries
        if (this.checkDuplicateEntry(studentId)) {
            this.showErrorModal('You have already marked your attendance for this session. Multiple entries are not allowed.');
            return;
        }

        // Store student information
        this.sessionData.studentId = studentId;
        this.sessionData.studentName = this.studentData.students[studentId].name;
        this.sessionData.studentSchedule = this.studentData.students[studentId].schedule;

        // Update confirmation screen
        document.getElementById('student-name-display').textContent = this.sessionData.studentName;
        document.getElementById('confirmed-student-id').textContent = studentId;
        document.getElementById('confirmed-student-name').textContent = this.sessionData.studentName;

        this.showScreen('name-confirmation-screen');
    }

    checkDuplicateEntry(studentId) {
        // Check localStorage for existing entries
        const existingEntries = JSON.parse(localStorage.getItem('btf5965_entries') || '[]');
        const today = new Date().toDateString();
        
        return existingEntries.some(entry => 
            entry.studentId === studentId && 
            new Date(entry.timestamp).toDateString() === today
        );
    }

    confirmName() {
        this.showScreen('presence-screen');
    }

    markPresent() {
        this.sessionData.timestamp = new Date().toISOString();
        this.showScreen('feedback-screen');
    }

    handleFeedbackInput() {
        const feedbackInput = document.getElementById('feedback-input');
        const submitBtn = document.getElementById('submit-feedback-btn');
        
        if (feedbackInput.value.trim().length > 0) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    submitFeedback() {
    const feedbackInput = document.getElementById('feedback-input');
    this.sessionData.feedback = feedbackInput.value.trim();
    
    // Populate hidden fields for Netlify
    document.getElementById('hidden-student-id').value = this.sessionData.studentId;
    document.getElementById('hidden-student-name').value = this.sessionData.studentName;
    document.getElementById('hidden-student-schedule').value = this.sessionData.studentSchedule;
    document.getElementById('hidden-timestamp').value = this.sessionData.timestamp;
    document.getElementById('hidden-device-info').value = JSON.stringify(this.sessionData.deviceInfo);
    
    // Save entry to localStorage and Netlify
    this.saveEntry();
    
    // Update thank you screen
    this.updateThankYouScreen();
    
    // Show thank you screen
    this.showScreen('thank-you-screen');
    }

async saveEntry() {
    const entry = {
        id: this.generateEntryId(),
        studentId: this.sessionData.studentId,
        studentName: this.sessionData.studentName,
        studentSchedule: this.sessionData.studentSchedule,
        feedback: this.sessionData.feedback,
        timestamp: this.sessionData.timestamp,
        deviceInfo: this.sessionData.deviceInfo
    };

    // Save to localStorage as backup
    const localEntries = JSON.parse(localStorage.getItem('btf5965_entries') || '[]');
    localEntries.push(entry);
    localStorage.setItem('btf5965_entries', JSON.stringify(localEntries));

    // Submit to Netlify Forms in the background
    try {
        const formData = new FormData();
        formData.append('form-name', 'attendance');
        formData.append('studentId', entry.studentId);
        formData.append('studentName', entry.studentName);
        formData.append('studentSchedule', entry.studentSchedule);
        formData.append('feedback', entry.feedback);
        formData.append('timestamp', entry.timestamp);
        formData.append('deviceInfo', JSON.stringify(entry.deviceInfo));

        // Fire and forget - don't wait for response
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        }).catch(error => {
            console.log('Background submission to Netlify:', error);
        });

        console.log('Entry saved locally:', entry);
    } catch (error) {
        console.error('Failed to prepare Netlify submission:', error);
    }
    }

    generateEntryId() {
        return 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    updateThankYouScreen() {
        document.getElementById('final-student-name').textContent = this.sessionData.studentName;
        document.getElementById('final-timestamp').textContent = new Date(this.sessionData.timestamp).toLocaleString();
        
        const slideLink = document.getElementById('slide-link');
        slideLink.href = this.studentData.course_info.slide_link;
    }

    updateTimeDisplays() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const currentDateEl = document.getElementById('current-date');
        const currentTimeEl = document.getElementById('current-time');
        
        if (currentDateEl) currentDateEl.textContent = dateStr;
        if (currentTimeEl) currentTimeEl.textContent = timeStr;
    }

    clearStudentIdInput() {
        const input = document.getElementById('student-id-input');
        const errorDiv = document.getElementById('student-id-error');
        const verifyBtn = document.getElementById('verify-id-btn');
        
        input.value = '';
        errorDiv.textContent = '';
        verifyBtn.disabled = true;
    }

    showErrorModal(message) {
        const modal = document.getElementById('error-modal');
        const messageEl = document.getElementById('error-modal-message');
        
        messageEl.textContent = message;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    hideErrorModal() {
        const modal = document.getElementById('error-modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    resetSystem() {
        // Clear session data
        this.sessionData = {
            studentId: '',
            studentName: '',
            studentSchedule: '',
            feedback: '',
            timestamp: null,
            deviceInfo: {}
        };

        // Collect new device info
        this.collectDeviceInfo();

        // Clear form inputs
        this.clearStudentIdInput();
        document.getElementById('feedback-input').value = '';
        document.getElementById('submit-feedback-btn').disabled = true;

        // Return to welcome screen
        this.showScreen('welcome-screen');
    }

    // Admin functions for data analysis
    getStoredEntries() {
        return JSON.parse(localStorage.getItem('btf5965_entries') || '[]');
    }

    exportData() {
        const entries = this.getStoredEntries();
        const dataStr = JSON.stringify(entries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `btf5965_entries_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
            localStorage.removeItem('btf5965_entries');
            // Clear all GIF data
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('btf5965_gif_')) {
                    localStorage.removeItem(key);
                }
            });
            alert('All data cleared successfully.');
        }
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presenceSystem = new PresenceSystem();
});

// Admin console functions (accessible via browser console)
window.adminFunctions = {
    getEntries: () => window.presenceSystem.getStoredEntries(),
    exportData: () => window.presenceSystem.exportData(),
    clearData: () => window.presenceSystem.clearAllData(),
    getStats: () => {
        const entries = window.presenceSystem.getStoredEntries();
        return {
            totalEntries: entries.length,
            uniqueStudents: new Set(entries.map(e => e.studentId)).size,
            entriesWithGifs: entries.filter(e => e.gifUploaded).length,
            entriesWithFeedback: entries.filter(e => e.feedback.length > 0).length,
            deviceTypes: entries.reduce((acc, e) => {
                const ua = e.deviceInfo.userAgent || '';
                let device = 'Unknown';
                if (ua.includes('Mobile')) device = 'Mobile';
                else if (ua.includes('Tablet')) device = 'Tablet';
                else device = 'Desktop';
                acc[device] = (acc[device] || 0) + 1;
                return acc;
            }, {}),
            browsers: entries.reduce((acc, e) => {
                const ua = e.deviceInfo.userAgent || '';
                let browser = 'Unknown';
                if (ua.includes('Chrome')) browser = 'Chrome';
                else if (ua.includes('Firefox')) browser = 'Firefox';
                else if (ua.includes('Safari')) browser = 'Safari';
                else if (ua.includes('Edge')) browser = 'Edge';
                acc[browser] = (acc[browser] || 0) + 1;
                return acc;
            }, {})
        };
    }
};

// Console welcome message
console.log('%c🎓 BTF5965 Tax Law Tutorial Presence System', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cAdmin functions available:', 'color: #059669; font-weight: bold;');
console.log('• adminFunctions.getEntries() - Get all stored entries');
console.log('• adminFunctions.exportData() - Export data as JSON file');
console.log('• adminFunctions.clearData() - Clear all stored data');
console.log('• adminFunctions.getStats() - Get usage statistics');

