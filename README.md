# 🗂️ Table of Contents

- [🗂️ Table of Contents](#️-table-of-contents)
- [🧮 Basic Calculator Application](#-basic-calculator-application)
- [🌐 Live Demo](#-live-demo)
- [⚙️ Key Features](#️-key-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🧪 Testing \& Coverage](#-testing--coverage)
- [🚀 Getting Started](#-getting-started)
  - [📦 Prerequisites](#-prerequisites)
  - [🧰 Installation Steps](#-installation-steps)
- [🧾 Available Scripts](#-available-scripts)
- [🗃️ Project Structure](#️-project-structure)
- [🎞️ Custom Animations with Tailwind](#️-custom-animations-with-tailwind)
- [🖼️ Screenshots](#️-screenshots)
  - [🌞 Light Mode](#-light-mode)
  - [🌙 Dark Mode](#-dark-mode)
  - [🧮 Calculation History](#-calculation-history)
- [🌍 Deployment](#-deployment)

---

## 🧮 Basic Calculator Application

A sleek, modern calculator built with **ReactJS** and **Tailwind CSS**, offering a responsive and accessible interface across devices. This application features both light and dark modes, animated calculation history, and seamless support for both keyboard and mouse inputs.

Crafted as a **frontend-only** solution, the project emphasizes clean design, smooth user interactions, and practical functionality—all wrapped in a professional UI experience.

---

## 🌐 Live Demo

🔗 [Crunch Some Numbers!](https://pavithrj.github.io/numerix/)

---

## ⚙️ Key Features

- ➕ Perform basic arithmetic operations (`+`, `-`, `*`, `/`, `%`)
- 🌗 Toggle between light and dark modes
- 🧾 View calculation history (up to 10 previous entries)
- 🔁 Clickable history items for quick reuse
- 🧹 Option to clear history
- ⌨️ Full keyboard support (Enter, Delete, Backspace, numbers/operators)
- 🌀 Smooth, responsive animations powered by Tailwind CSS

---

## 🛠️ Technologies Used

- ⚛️ **ReactJS** – Frontend framework
- 🌬️ **Tailwind CSS** – Utility-first CSS framework
- 📐 **MathJS** – For accurate and safe expression evaluation
- ⚡ **Vite** – Lightning-fast build and development tool

---

## 🧪 Testing & Coverage

Basic unit tests can be written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).  
View the sample test coverage report here: [Coverage Report](./coverage/lcov-report/index.html)  
(Generated locally using `npm test -- --coverage`, not pushed to GitHub but available for demo purposes.)

---

## 🚀 Getting Started

### 📦 Prerequisites

- Ensure Node.js and npm are installed on your machine

```bash
git clone https://github.com/your-username/basic-calculator-react.git
cd basic-calculator-react
npm install
npm run dev
```

---

## 🧾 Available Scripts

In the project directory, you can run:

- `npm run dev` – Runs the app in development mode
- `npm run build` – Builds the app for production
- `npm run preview` – Previews the production build

---

## 🗃️ Project Structure

```
src/
├── assets/
│   └── NumerixLogo.png
├── components/
│   └── Calculator.jsx
├── App.jsx
├── index.css
├── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## 🎞️ Custom Animations with Tailwind

Tailwind animations used for UI feedback and smooth transitions:

```js
extend: {
  animation: {
    fadeInOut: "fadeInOut 2s ease-in-out",
    fadeInUp: "fadeInUp 0.4s ease-out",
    fadeIn: "fadeIn 1s ease-in-out",
    fadeInDelayed: "fadeIn 1s ease-in-out 0.3s backwards",
    bounceSlow: "bounce 3s infinite"
  },
  keyframes: {
    fadeInOut: {
      "0%, 100%": { opacity: "0" },
      "10%, 90%": { opacity: "1" }
    },
    fadeInUp: {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    },
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(-10px)" },
      "100%": { opacity: 1, transform: "translateY(0)" }
    }
  }
}
```

---

## 🖼️ Screenshots

### 🌞 Light Mode  
![Light Mode](./screenshots/light-mode.png)  
A bright, clean interface optimized for daytime use. Includes a simple layout with clear, responsive buttons.

### 🌙 Dark Mode  
![Dark Mode](./screenshots/dark-mode.png)  
A sleek dark theme suitable for low-light environments, easily toggled via the interface.

### 🧮 Calculation History  
![History](./screenshots/history-demo.gif)  
Displays an animated, interactive list of recent calculations. Users can click on an entry to reuse it instantly.

---

## 🌍 Deployment

Deployed via **GitHub Pages** for easy access and sharing.

---

> 🧠 Designed and built using React and Tailwind CSS — because even math deserves a modern, stylish vibe.