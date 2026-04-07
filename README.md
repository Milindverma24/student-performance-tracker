<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=30&pause=1000&color=F7B731&center=true&vCenter=true&width=600&lines=🎓+Student+Performance+Tracker;Built+with+Java+%2B+Swing;Manage+%7C+Analyze+%7C+Track" alt="Typing SVG" />

<br/>

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Swing GUI](https://img.shields.io/badge/Swing-GUI-0078D7?style=for-the-badge&logo=java&logoColor=white)
![OOP](https://img.shields.io/badge/OOP-Design-27ae60?style=for-the-badge)
![File Handling](https://img.shields.io/badge/File-Handling-e74c3c?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

<br/>

> 🖥️ A clean, lightweight **Java Swing desktop application** to manage, track, and analyze student academic performance — all without any database or internet connection.

<br/>

[📥 Installation](#-how-to-run) • [✨ Features](#-features) • [📸 Screenshots](#️-screenshots) • [🛠️ Tech Stack](#️-technologies-used) • [🤝 Contributing](#-contributing)

</div>

---

## 📌 About The Project

**Student Performance Tracker** is a desktop-based Java application designed for teachers, students, and small institutions to manage student records with ease.

Instead of using complex software or spreadsheets, this app provides a simple **Graphical User Interface (GUI)** built using **Java Swing** where you can:

- 🗂️ Maintain a list of students and their marks
- 📈 Analyze class performance in real-time
- 💾 Save data locally using **File Handling** (no database needed)
- 🔍 Quickly find the class topper or average score

This project is ideal for **beginners learning Java**, covering key concepts like OOP, Swing GUI, and file I/O in a real-world mini project.

---

## ✨ Features

Here is a detailed breakdown of every feature available in the application:

<br/>

### ➕ Add a Student
> Register a new student into the system by entering their **Roll Number**, **Name**, and **Marks**.  
> The data is immediately saved to a file so it persists even after closing the app.

---

### 👁️ View All Students
> Displays the **complete list** of all registered students in a table format.  
> You can see Roll Number, Name, and Marks for every student at a glance.

---

### 🔄 Update Student Details
> Made a mistake or need to update marks? Simply enter the **Roll Number** of the student  
> and provide the new details — the record gets updated instantly.

---

### ❌ Delete a Student
> Remove any student record permanently from the system using their unique **Roll Number**.  
> Useful for keeping the data clean and up to date.

---

### 🏆 Show Topper
> Automatically scans through all student records and displays the student  
> with the **highest marks** — perfect for quick recognition!

---

### 📊 Show Average Marks
> Calculates and displays the **average marks** of the entire class.  
> Helps teachers understand overall class performance in one click.

---

## 🖥️ Screenshots

<div align="center">

| Main Dashboard |
|:--------------:|
| ![App Screenshot](Screenshot.png) |

> 📷 _Add more screenshots of different screens (Add Student, View Students, Analytics) for better presentation._

</div>

---

## 🛠️ Technologies Used

| Technology | Purpose | Why Used |
|------------|---------|----------|
| ☕ **Java** | Core programming language | Platform-independent, widely used for desktop apps |
| 🖼️ **Java Swing** | GUI framework | Built-in Java library for creating windows, buttons, tables |
| 📁 **File Handling** | Data persistence | Saves student data locally without needing a database |
| 🧱 **OOP (Object-Oriented Programming)** | Code structure | Makes code modular, reusable, and easy to maintain |

---

## 📂 How to Run

Follow these steps carefully to get the project running on your local machine:

<br/>

### ✅ Prerequisites

Before running, make sure you have the following installed:

- **Java JDK 8 or above** → [Download Here](https://www.oracle.com/java/technologies/downloads/)
- **Any Java IDE** (Recommended: [IntelliJ IDEA](https://www.jetbrains.com/idea/) / [Eclipse](https://www.eclipse.org/) / [NetBeans](https://netbeans.apache.org/))
- **Git** (to clone the repo) → [Download Here](https://git-scm.com/)

<br/>

### 🔧 Step-by-Step Setup

**Step 1 — Clone the repository**
```bash
git clone https://github.com/yourusername/StudentPerformanceTracker.git
```

**Step 2 — Navigate into the project folder**
```bash
cd StudentPerformanceTracker
```

**Step 3 — Compile the Java files**
```bash
javac -d out src/*.java
```

**Step 4 — Run the application**
```bash
java -cp out Main
```

<br/>

> 💡 **Using an IDE?**  
> Just open the project folder → Right-click `Main.java` → Click **Run**. That's it!

---

## 📁 Project Structure

```
StudentPerformanceTracker/
│
├-─ 📂 src/                        # All Java source code files
│   ├── Main.java                  # Entry point — launches the application
│   ├── Student.java               # Student model (Roll No, Name, Marks)
│   ├── StudentManager.java        # Core logic — add, update, delete, analyze
│   └── FileHandler.java           # Handles reading/writing data to file
│
├── 📂 web-trcker/
│   └── students.dat               # Auto-generated file storing student records
│
├── Screenshot.png                 # App screenshot for README
├── README.md                      # Project documentation (this file)
└── LICENSE                        # MIT License
```


---

## 🧠 Concepts Covered (For Learners)

This project is a great hands-on exercise for the following Java concepts:

| Concept | Where It's Used |
|--------|----------------|
| **Classes & Objects** | `Student.java` — a class representing each student |
| **Encapsulation** | Private fields with getters/setters in `Student.java` |
| **File I/O** | `FileHandler.java` — saving and loading data |
| **ArrayList / Collections** | Storing list of students in memory |
| **Swing Components** | `JFrame`, `JTable`, `JButton`, `JTextField` for the UI |
| **Event Handling** | Button click listeners for all actions |

---

## 🐛 Known Issues & Future Improvements

- [ ] 🔍 Search student by name
- [ ] 📤 Export records to CSV or PDF
- [ ] 🎨 Add grade classification (A, B, C, D, F)
- [ ] 📊 Bar/Pie chart for visual performance analytics
- [ ] 🔐 Admin login system for security
- [ ] 🌙 Dark mode UI theme

---

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are always welcome!

1. **Fork** the project
2. **Create** your branch → `git checkout -b feature/AmazingFeature`
3. **Commit** your changes → `git commit -m "Add: AmazingFeature"`
4. **Push** to the branch → `git push origin feature/AmazingFeature`
5. **Open a Pull Request** and describe your changes

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project for personal or educational purposes.  
See the [LICENSE](LICENSE) file for full details.

---

## 👤 Author

**Your Name**  
GitHub: [@yourusername](https://github.com/yourusername)

<div align="center">

**Your Name**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

</div>

---

<div align="center">

### ⭐ If this project helped you, please give it a star — it means a lot! ⭐

<br/>

_Made with ❤️ and ☕ Java_

</div>
