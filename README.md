# BTF5965 Tax Law Tutorial Presence System

A modern, responsive web application for tracking student attendance in Tax Law tutorial classes. Built specifically for GitHub Pages deployment with comprehensive analytics and data tracking capabilities.

## 🎯 Features

### Core Functionality
- **Student ID Verification**: 8-digit student ID validation against database
- **Name Confirmation**: Display and confirm student full name
- **Attendance Marking**: Simple one-click presence confirmation
- **Feedback Collection**: Structured feedback question with text input
- **GIF Upload**: Optional funny GIF upload for engagement
- **Weekly Materials**: Automatic display of current week's slide links

### Analytics & Security
- **Duplicate Detection**: Prevents multiple entries per day per student
- **Device Tracking**: Comprehensive device and browser analytics
- **Session Management**: Unique session IDs for each entry
- **Data Export**: JSON export functionality for analysis
- **Admin Dashboard**: Real-time statistics and data management

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Progressive Web App**: Smooth single-page application experience
- **Local Storage**: Client-side data persistence
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Option 1: GitHub Pages Deployment (Recommended)

1. **Fork or Download** this repository
2. **Upload to GitHub** as a new repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your site** at `https://yourusername.github.io/repository-name`

### Option 2: Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd btf5965-presence-system
   ```

2. **Serve locally** (choose one method):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have it)
   npx serve .
   
   # Using PHP (if you have it)
   php -S localhost:8000
   ```

3. **Open in browser**: `http://localhost:8000`

## 📁 File Structure

```
btf5965-presence-system/
├── index.html          # Main application interface
├── admin.html          # Admin dashboard for data analysis
├── styles.css          # Complete styling with Alfa Slab One font
├── script.js           # Core JavaScript functionality
├── students.json       # Student database (customize this)
├── README.md           # This documentation
└── project_plan.md     # Technical planning document
```

## ⚙️ Configuration

### Student Database Setup

Edit `students.json` to add your students:

```json
{
  "students": {
    "12345678": "John Doe",
    "87654321": "Jane Smith",
    "11223344": "Michael Johnson"
  },
  "course_info": {
    "code": "BTF5965",
    "name": "Tax Law Tutorial",
    "current_week": 8,
    "slide_link": "https://your-slides-url.com/week8.pdf"
  }
}
```

### Customization Options

1. **Course Information**: Update course code, name, and slide links in `students.json`
2. **Styling**: Modify colors and fonts in `styles.css`
3. **Questions**: Change feedback questions in `index.html`
4. **Validation**: Adjust student ID format in `script.js`

## 📊 Data Management

### Accessing Data

The system stores data in browser localStorage. Access via:

1. **Admin Dashboard**: Visit `/admin.html` for visual analytics
2. **Browser Console**: Use built-in admin functions:
   ```javascript
   adminFunctions.getEntries()    // Get all entries
   adminFunctions.exportData()    // Download JSON file
   adminFunctions.getStats()      // View statistics
   adminFunctions.clearData()     // Clear all data
   ```

### Data Structure

Each entry contains:
```json
{
  "id": "entry_1234567890_abc123",
  "studentId": "12345678",
  "studentName": "John Doe",
  "feedback": "tax calculation methods",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "deviceInfo": {
    "userAgent": "Mozilla/5.0...",
    "screenResolution": "1920x1080",
    "timezone": "Asia/Jakarta",
    "sessionId": "session_1234567890_xyz789"
  },
  "gifUploaded": true,
  "gifInfo": {
    "name": "funny.gif",
    "size": 1024000
  }
}
```

### Analytics Available

- Total entries and unique students
- Entries with GIFs and feedback
- Device type distribution (Desktop/Mobile/Tablet)
- Browser usage statistics
- Timestamp analysis for peak usage times
- Duplicate entry attempts tracking

## 🔒 Security Features

### Duplicate Prevention
- Checks localStorage for same-day entries
- Prevents multiple submissions per student per day
- Tracks session IDs for analysis

### Data Privacy
- All data stored locally in browser
- No external server communication required
- Students control their own data
- Admin can export/clear data as needed

### Device Fingerprinting
- User agent tracking
- Screen resolution logging
- Timezone detection
- Session ID generation

## 🎨 Design Features

### Typography
- **Primary Font**: Alfa Slab One (Google Fonts)
- **Body Font**: Inter (Google Fonts)
- **Responsive**: Scales from mobile to desktop

### Color Scheme
- **Primary**: Blue gradient (#2563eb to #1d4ed8)
- **Background**: Purple gradient (#667eea to #764ba2)
- **Surface**: Clean white with subtle shadows
- **Text**: High contrast for accessibility

### Animations
- Smooth screen transitions
- Button hover effects
- Loading animations
- Progress indicators

## 📱 Browser Support

### Fully Supported
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Features Used
- ES6+ JavaScript
- CSS Grid and Flexbox
- Local Storage API
- File API for GIF uploads
- Fetch API for JSON loading

## 🛠️ Troubleshooting

### Common Issues

1. **Student not found**: Check `students.json` format and student ID
2. **Data not saving**: Ensure localStorage is enabled in browser
3. **GIF upload fails**: Check file size (5MB limit) and format (.gif only)
4. **Styles not loading**: Verify Google Fonts connection

### Browser Console Errors

Enable browser developer tools (F12) to see detailed error messages.

### Data Recovery

If data appears lost:
1. Check browser localStorage in Developer Tools
2. Look for keys starting with `btf5965_`
3. Use admin functions to export data before clearing

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Update student database** before each semester
2. **Update slide links** weekly
3. **Export data** regularly for backup
4. **Clear old data** at semester end

### Version Updates
- Backup data before updating files
- Test locally before deploying
- Update README if features change

## 📞 Support

### For Technical Issues
- Check browser console for errors
- Verify all files are uploaded correctly
- Test with different browsers
- Check GitHub Pages deployment status

### For Customization
- Modify `students.json` for student data
- Edit `styles.css` for appearance changes
- Update `script.js` for functionality changes
- Refer to code comments for guidance

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for BTF5965 Tax Law Tutorial**

*Last updated: January 2025*

