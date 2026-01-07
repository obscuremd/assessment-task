# Project Name

A professional, generic dashboard and authentication platform built as part of an assessment task. Features include user registration, login with OTP verification, and a dashboard showing user information.

---

## Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**
   For the backend:

   ```bash
   cd backend
   npm install
   ```

   For the frontend:

   ```bash
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend folder with:

   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   ```

4. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend (Expo React Native)**

   ```bash
   cd frontend
   npx expo start
   ```

6. **Access the app**

   - Use Expo Go on mobile or an emulator.
   - Register a new user or login with existing credentials.

---

## Tech Stack Used

- **Frontend:** React Native, Expo, NativeWind, ShadCN UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** OTP-based login/registration, JWT tokens
- **Email Service:** Nodemailer
- **State Management & Routing:** React hooks, Expo Router

---

## Assumptions & Trade-offs

- OTP is sent via email; no SMS integration.
- User email is **converted to lowercase** for consistency.
- Dashboard shows dummy data for metrics (Sessions, Activities, Role) to keep focus on authentication flow.
- Passwords are hashed using bcrypt before saving.
- JWT stored securely in Expo SecureStore.
- Trade-off: No pagination or advanced dashboard analytics – the focus is on authentication and basic user management.
