<h1 align="center"># Startupathon Platform 🚀</h1>


## Screenshots

![Platform Home Page](/frontend/public/homepage.png)
![Platform ](/frontend/public/admindashboard.png)


## 🎉 Live Demo
Check out the live applications:

Startupathon Platform : https://startupathon.onrender.com
A full-stack platform connecting aspiring founders with startup challenges, resources, and mentorship opportunities.


## Features ✨

### Landing Page
- **Dynamic Hero Section** - Animated welcome section with parallax effect
- **Challenge Showcase** - Interactive cards with hover animations
- **Rewards System** - Spring-animated reward cards
- **Process Timeline** - Vertical timeline with step-by-step guidance
- **Founder Network** - Animated founder profiles
- **Social Integration** - Mock social feed component

### Admin Dashboard 🛠️
- **CRUD Operations** for:
  - Challenges (`/admin/challenges`)
  - Completers (`/admin/completers`)
  - Founders (`/admin/founders`)
  - Subscribers (`/admin/subscribers`)
- **Unified Data Management**:
  - Pagination support
  - Search functionality
  - Responsive tables
- **Secure Routing** with nested layouts

## Tech Stack 💻

### Frontend
| Technology | Purpose |
|------------|---------|
| React + Vite | Core framework |
| Tailwind CSS | Styling system |
| Framer Motion | Advanced animations |
| React Icons | Icon library |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js/Express | API server |
| MongoDB | Database |
| Mongoose | ODM |
| REST API | Data operations |

## Project Structure 🗂️

frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── contexts/ # Global state management
│ ├── pages/ # Main views and routes
│ ├── utils/ # Animation configurations
│ └── ... # Core application files



## Key Components 🧩

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `Navigation` | Main navbar | Hover animations, Responsive design |
| `Hero` | Landing section | Parallax effect, Motion transitions |
| `AdminDashboard` | Control panel | Nested routing, Data management |
| `Challenges` | Challenge display | Spring animations, Card layout |
| `DataContext` | State manager | Centralized data handling |

## API Reference 📡

### Models

```
// Challenge Model
{
  title: String,
  funding: String,
  deadline: Date,
  description: String,
  status: String
}

// Founder Model
{
  profile: String,
  position: String,
  expertise: [String],
  socialLinks: String
}

```

## Endpoints
Endpoint	Method	Description
/api/challenges	GET	List all challenges
/api/founders	POST	Create new founder
/api/subscribers/:id	DELETE	Remove subscriber

##
Installation ⚙️

Clone repository:

```
git clone https://github.com/KAZI-AZAHAR-UDDIN/startupathon.git

````
Install dependencies:
```
cd frontend && npm install
```

Start development server:
```
npm run dev
```
```
`
## UI Guidelines 🎨
Maintained Styles
Glassmorphism effects

Consistent purple (#7E22CE) and yellow (#FACC15) accent colors

Shadow-3D class for depth effects

Responsive grid layouts

Animation Updates
Removed rotating animations

Preserved spring-based motions

Simplified hover transitions


## License 📄
MIT License - See LICENSE.md for details


## 👨‍💻 Author
**Kazi Azahar Uddin**  
*Software Engineer | Open to work*  

- **GitHub**: [KAZI-AZAHAR-UDDIN](https://github.com/KAZI-AZAHAR-UDDIN)  
- **LinkedIn**: [Kazi Azahar Uddin](https://www.linkedin.com/in/kazi-azahar-uddin-8b879b205/)  


