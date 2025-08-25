# BTF5965 Tax Law Tutorial Presence System - Project Plan

## Requirements Analysis

### Core Features
1. Student ID input and name display
2. Presence confirmation
3. Feedback question: "The thing that I need to understand more from this class/previous class is about..."
4. Display weekly slide link after submission
5. Funny GIF upload capability
6. Device/IP tracking for duplicate entry detection
7. Data persistence (student_id, name, timestamp, feedback)

### Technical Constraints
- Must work on GitHub Pages (static hosting only)
- No server-side database available
- Need client-side data storage solution

### Proposed Architecture

#### Frontend
- Single Page Application (SPA) with multiple screens
- HTML5 + CSS3 + Vanilla JavaScript
- Alfa Slab One font from Google Fonts
- Responsive design for mobile/desktop

#### Data Storage Options
Since GitHub Pages doesn't support server-side databases, we have several options:
1. **localStorage** - Simple but data stays on device only
2. **GitHub API** - Store data in repository files (requires authentication)
3. **External service** - Firebase, Supabase, or similar
4. **Form submission to external service** - Google Forms, Formspree, etc.

**Recommended**: Use localStorage for demo + external service integration for production

#### File Structure
```
btf5965-presence-system/
├── index.html
├── styles.css
├── script.js
├── students.json (mock student database)
├── assets/
│   ├── fonts/
│   └── images/
└── README.md
```

#### User Flow
1. Landing page with course info
2. Student ID input screen
3. Name confirmation screen
4. Presence confirmation screen
5. Feedback question + GIF upload screen
6. Thank you + slide link screen

#### Data Schema
```json
{
  "entries": [
    {
      "id": "unique_id",
      "student_id": "12345678",
      "student_name": "John Doe",
      "timestamp": "2025-01-XX 10:30:00",
      "feedback": "tax calculation methods",
      "device_info": {
        "user_agent": "...",
        "ip_hash": "...",
        "screen_resolution": "1920x1080",
        "timezone": "UTC+7"
      },
      "gif_uploaded": true
    }
  ]
}
```

## Next Steps
1. Create HTML structure with multiple screens
2. Implement CSS styling with Alfa Slab One font
3. Build JavaScript functionality for navigation and data handling
4. Add device tracking and duplicate detection
5. Integrate external storage solution
6. Test and package for GitHub Pages deployment

