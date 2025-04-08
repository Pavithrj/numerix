# 🧼 Basic Calculator App

A responsive and stylish calculator built using **ReactJS** and **Tailwind CSS**.  
Supports light/dark mode, input history with animations, and keyboard/mouse input.  
Built as a **frontend-only** project, designed for smooth user experience with minimal UI.

---

## 🔗 Live Demo 🌐

🔗 [Go Ahead](https://pavithrj.github.io/numerix/)

---

## ✨ Features 🚀

- ✅ Basic arithmetic operations (`+`, `-`, `*`, `/`, `%`)
- 💡 Light/Dark theme toggle
- 💬 History of previous calculations (up to 10 entries)
- ↻ Clickable history to re-use past expressions
- ❌ Clear history button
- ⌨️ Full keyboard support (Enter, Delete, Backspace, numbers/operators)
- 🎮 Smooth animations using Tailwind CSS (no external libraries)

---

## 🛠️ Tech Stack 💻

- ⚛️ **ReactJS**
- 💨 **Tailwind CSS**
- 📊 **MathJS** (for safe expression evaluation)
- ⚡ **Vite** (for fast development)

---

## 📦 Getting Started 🚧

### 📋 Prerequisites

- Node.js and npm installed

### 🧩 Installation

```bash
git clone https://github.com/your-username/basic-calculator-react.git
cd basic-calculator-react
npm install
npm run dev
```

---

## 🗂️ Folder Structure 🧾

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

## 🎨 Custom Tailwind Animations 🌈

Used for input warnings and history entry animations:

```js
extend: {
  animation: {
    'fade-in-out': 'fadeInOut 2s ease-in-out',
    'fadeInUp': 'fadeInUp 0.4s ease-out',
  },
  keyframes: {
    fadeInOut: {
      '0%, 100%': { opacity: '0' },
      '10%, 90%': { opacity: '1' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(10px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
}
```

---

## 📷 Screenshots 🖼️

Add a screenshot or screen recording of your app in action:

### Light Mode
![Light Mode](./screenshots/light-mode.png)
A clean and bright interface for daytime usage. Shows basic calculator layout with responsive buttons and soft UI shadows.

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)
Elegant dark theme perfect for night-time usage, activated with a single toggle switch.

### History in Action
![History](./screenshots/history-demo.gif)
Shows animated list of recent calculations. Users can click on any history entry to re-use it instantly.

> _You can save your screenshots inside a `/screenshots` folder in the root directory._

---

> Crafted with 🧠 + ❤️ using React and Tailwind – because math should look good too!

