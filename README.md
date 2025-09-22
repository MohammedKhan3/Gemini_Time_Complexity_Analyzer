🚀 Gemini Time Complexity Analyzer
==================================

The **Gemini Time Complexity Analyzer** is a full-stack application that uses **Google’s Gemini AI** to evaluate the **time and space complexity** of code snippets. It provides a seamless way for developers and students to quickly understand algorithm efficiency without manual analysis.

📌 Features
-----------

*   ✨ Paste code snippets directly in the UI and get **instant analysis**.
    
*   📊 Returns both **time complexity (Big-O)** and **space complexity** with explanations.
    
*   ⚙️ **Spring Boot backend** with clean APIs for processing code snippets.
    
*   💻 **React frontend** for intuitive code submission and formatted results.
    
*   🔒 Input sanitization for safe request handling (escapes quotes, backslashes, newlines).
    
*   🌍 Supports **CORS** to enable frontend-backend communication.
    
*   🧩 Extensible design for future enhancements (multi-language support, caching, multiple AI models).
    


    

⚙️ Tech Stack
-------------

*   **Backend**: Java 21, Spring Boot, Lombok
    
*   **Frontend**: React, Axios
    
*   **AI**: Google Gemini API
    
*   **Other**: REST APIs, JSON
    

🔧 Setup & Installation
-----------------------

### 1\. Clone the repository

`  git clone https://github.com/yourusername/gemini-time-complexity-analyzer.git  cd gemini-time-complexity-analyzer   `

### 2\. Backend (Spring Boot)

`  cd src  ./mvnw spring-boot:run   `

The backend runs on [**http://localhost:8080**](http://localhost:8080).

### 3\. Frontend (React)

`cd Gemini Time Complexity  npm install  npm start   `

The frontend runs on [**http://localhost:3000**](http://localhost:3000).

▶️ Usage
--------

1.  Open the React app.
    
2.  Paste your code snippet in the input box.
    
3.  Click **Analyze**.
    
4.  View **time and space complexity** results with explanations.
    
Contribution
---------------

Contributions are welcome! Feel free to fork the repo, create a feature branch, and submit a pull request.
