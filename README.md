# Captionary 🚀  
AI-Powered Image Captioning Platform (MERN Stack)

**Captionary** is a full-stack web application that allows users to upload images and receive AI-generated captions.  
The project is designed to handle real-world production challenges such as authentication, cross-origin cookies, API limits, and cloud deployment.

🔗 **Live Website:**  
👉 https://captionary-gamma.vercel.app  

💻 **GitHub Repository:**  
👉 https://github.com/Abi-390/socialMediaproject  

---

## ✨ Features

- User authentication (Register / Login)
- Secure JWT authentication using HTTP-only cookies
- Protected routes
- Image upload with cloud storage
- AI-generated captions using Gemini API
- Post creation and deletion (user-owned posts only)
- Responsive UI (mobile & desktop)
- Graceful handling of:
  - Backend cold starts (Render free tier)
  - AI free-tier rate limits

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- HTTP-only Cookies
- Multer (image upload)
- Deployed on Render

### AI
- Google Gemini API (free tier)

---

## 🔐 Authentication Flow

- JWT stored in HTTP-only cookies
- Cross-origin authentication handled using:
  - `sameSite: "none"`
  - `secure: true`
  - Proper CORS configuration
- `/api/auth/me` endpoint verifies active sessions
- Frontend protected routes wait for authentication before rendering

---
## 🌐 Deployment Architecture
Frontend (Vercel)
|
| HTTPS + Cookies
|
Backend (Render)
|
|
MongoDB Atlas


---

## ⚠️ Free-Tier Considerations

This project intentionally handles free-tier limitations:

- **Render cold start:**  
  Users see a friendly message:  
  _“Please wait, our backend servers are starting…”_

- **Gemini API rate limits:**  
  Users are informed when the free AI quota is exhausted instead of seeing silent failures.

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Abi-390/socialMediaproject.git
cd socialMediaproject
---
 
(.env variables)
-DB_URL=
-JWT_SECRET
-GEMINI_API_KEY
-IMAGE_KIT_PRIVATE_KEY
-IMAGE_KIT_PUBLIC_KEY
-IMAGE_KIT_URL_ENDPOINT




