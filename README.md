## Phase 2 Project

## Authors
Tedd James,
Roy Mbui,
Fidel Koech,
Kelvina Wambui,
Samuel Karobia.

## Drive Up

A single-page application built with React and Vite that displays featured cars and an inventory list and allows users to manage their garage. The project uses a JSON Server as a mock backend to serve car data and demonstrates routing, state management, and basic authentication context in React.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

---

## Features
- **Homepage**: Browse a carousel of featured cars fetched from a mock API.
- **Inventory**: View a complete list of available cars, with details like make, model, year, and price.
- **Garage Management**: Add or remove cars to your personal garage (persisted in mock backend).
- **Routing**: Client-side navigation using React Router (Homepage, Inventory, Garage, About, Login).
- **Authentication Context**: Basic login/logout flow managed via React Context.
- **Responsive Design**: Mobile-friendly layout with CSS styling.
- **Linting**: ESLint integrated for code quality.

## Tech Stack
- **Framework**: React 19 with Vite build tool.
- **Bundler**: Vite 4.x for fast development and optimized production builds.
- **Routing**: React Router DOM v6.
- **Mock API**: JSON Server serving `carData.json`.
- **Linting**: ESLint with React Hooks rules.

## Getting Started

### Prerequisites
- Node.js v14+ and npm installed on your machine.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tobit-4/phase-2-project.git
   cd phase-2-project
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the mock API server**:
   ```bash
   npm run server
   ```
4. **Run in development mode**:
   ```bash
   npm run dev
   ```
5. **Open** `http://localhost:5173` in your browser.

### Available Scripts
| Command           | Description                                  | Source                                 |
| ----------------- | -------------------------------------------- | -------------------------------------- |
| `npm run dev`     | Start Vite development server                | `package.json`                         |
| `npm run build`   | Create optimized production build in `/dist` | `package.json`                         |
| `npm run preview` | Preview production build locally             | `package.json`                         |
| `npm run server`  | Launch JSON Server on port 3000              | `package.json`                         |
| `npm run lint`    | Lint all source files                        | `package.json`                         |

## Project Structure
```
phase-2-project/
├── public/                # Static assets (favicon, index.html, images)
│   ├── images/            # Car images for featured and inventory
│   └── index.html         # HTML template
├── src/                   # React source codeciteturn3view0
│   ├── assets/            # Logo and SVG assets
│   ├── components/        # React components (App, NavBar, CarCard, etc.)
│   ├── routes.jsx         # Route definitions using React Router
│   └── main.jsx           # Entry point for React
├── carData.json           # Mock data for JSON Server
├── package.json           # Project metadata & scripts
├── vite.config.js         # Vite configuration with React plugin
└── eslint.config.js       # ESLint configuration
```

## API Endpoints
JSON Server exposes the following endpoints based on `carData.json`:
| Route           | Description                       |
| --------------- | --------------------------------- |
| `/featured`     | List of featured cars             |
| `/inventory`    | Full car inventory                |
| `/garage`       | User's personal garage (initially empty) |

Interact with these endpoints using `fetch` or any HTTP client.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request and request a review.

Please adhere to the existing code style and include meaningful commit messages.

## License
This project is licensed under the MIT License. Please look at the [LICENSE](LICENSE) file for details.

## Contributors
- **Tobit-4**(Fidel Kipkoech) (Project setup, Vite configuration, routing)citeturn11view0
- **mbxisbankai (Roy Mbui)** (Components, JSON Server integration)citeturn11view0
- **Samuel & Kelvina** (CSS and styling)
- **Tedd James** (Hosting and Deployment)
