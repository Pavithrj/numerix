# 🗂️ Table of Contents

- [🧮 Basic Calculator Application](#-basic-calculator-application)
- [🌐 Live Demo](#-live-demo)
- [⚙️ Key Features](#️-key-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🧪 Testing \& Coverage](#-testing--coverage)
- [🚀 Getting Started](#-getting-started)
- [🧾 Available Scripts](#-available-scripts)
- [🗃️ Project Structure](#️-project-structure)
- [🖼️ Screenshots](#️-screenshots)
  - [🌞 Light Mode](#-light-mode)
  - [🌙 Dark Mode](#-dark-mode)
  - [🧮 Calculation History](#-calculation-history)

---

## 🧮 Basic Calculator Application

A sleek, modern calculator built with **ReactJS** and **Tailwind CSS**, offering a responsive and accessible interface across devices. This application features both light and dark modes, animated calculation history, and seamless support for both keyboard and mouse inputs.

Crafted as a **frontend-only** solution, the project emphasizes clean design, smooth user interactions, and practical functionality—all wrapped in a professional UI experience.

---

## 🌐 Live Demo

🔗 [Crunch Some Numbers!](https://pavithrj.github.io/numerix)

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
Numerix/
├── src/
│   ├── assets/
│   │   └── numerixLogo.png
│   ├── components/
│   │   ├── Calculator.jsx
│   │   ├── HistoryButtons.jsx
│   │   └── WarningMessage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
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