# 🕒 Timesheet App (Next.js + NextAuth)

A simple **Timesheet Management Dashboard** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**,**AntDesign** and **NextAuth.js** for authentication.

This project demonstrates a secure login flow using mock user data (no real database), server-side route protection with middleware, and a clean, modern dashboard for managing timesheets.

---

## 🚀 Features

✅ **Next.js 16 App Router** — modern file-based routing with `app/` directory  
✅ **NextAuth.js (Credentials Provider)** — dummy login using mock data  
✅ **Middleware Authentication Guard** — locks all pages if user not logged in  
✅ **Protected Dashboard** — accessible only to authenticated users  
✅ **Ant Design Table** — elegant timesheet display component  
✅ **Tailwind CSS** — responsive UI design  
✅ **TypeScript** — fully typed and scalable codebase

---

## 🧱 Project Structure

timesheet-app/
├── app/
│ ├── layout.tsx # Root layout (global styles, metadata)
│ ├── globals.css # Tailwind global styles
│ ├── login/
│ │ ├── page.tsx # Login page with NextAuth credentials sign-in
│ ├── dashboard/
│ │ ├── page.tsx # Protected dashboard page
│ │ ├── components/
│ │ │ ├── TimeSheetTable.tsx
│ │ │ ├── TimeSheetModal.tsx
│ │ │ ├── TimeSheetForm.tsx
│ │ └── hooks/
│ │ └── useTimesheets.ts # Custom hook for timesheet data fetching
│ ├── api/
│ │ ├── auth/
│ │ │ └── [...nextauth]/route.ts # NextAuth configuration
│ │ ├── timesheets/
│ │ │ ├── route.ts # GET/POST timesheets API
│ │ │ └── [id]/route.ts # PUT/DELETE timesheet by ID
│
├── lib/
│ └── mockData.ts # Contains mock users and dummy timesheet data
│
├── middleware.ts # Authentication guard for protected routes
├── .env.local # Environment variables (secret keys, etc.)
├── package.json
├── README.md
└── tsconfig.json

---

## 🔑 Authentication Flow

Authentication is handled with **NextAuth.js** using the **Credentials Provider** and mock user data from `lib/mockData.ts`.

1. User logs in via `/login`.
2. Credentials are validated in `authorize()` inside `app/api/auth/[...nextauth]/route.ts`.
3. On success, a JWT session is created (no database required).
4. Middleware (`middleware.ts`) checks for a valid token on every request.
5. If no token → redirect to `/login?callbackUrl=/requested-page`.
6. If valid → user is granted access to the protected route (e.g. `/dashboard`).

---

## 🔐 Middleware Protection

`middleware.ts` intercepts all requests and verifies authentication:

```ts
// Redirects unauthenticated users to /login
export const config = {
  matcher: ["/((?!api/auth|_next|favicon.ico|login).*)"],
};
```

Email: test@tentwenty.com
Password: 123456
