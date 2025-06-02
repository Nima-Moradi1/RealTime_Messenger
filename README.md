# RealTime_Messenger

A full-stack, real-time messaging web application built with modern technologies, including Next.js 15, TypeScript, MongoDB, Prisma, and Pusher.

## 🚀 Features

- **Real-Time Messaging**: Instant communication powered by Pusher.
- **Full-Stack Architecture**: Robust backend with Prisma and MongoDB, and dynamic frontend with Next.js.
- **Type Safety**: End-to-end type safety using TypeScript.
- **Scalable Design**: Modular and maintainable codebase suitable for scaling.
- **Modern UI/UX**: Responsive and intuitive user interface.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: Next.js API routes, Prisma ORM, MongoDB
- **Real-Time Communication**: Pusher
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📁 Folder Structure

```
RealTime_Messenger/
├── pages/
│   ├── api/
│   │   └── pusher/           # API routes for Pusher events
├── prisma/
│   └── schema.prisma         # Prisma schema definition
├── public/
│   └── images/               # Static image assets
├── src/
│   ├── app/                  # Application components and logic
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and libraries
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Global styles and Tailwind configurations
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nima-Moradi1/RealTime_Messenger.git
   cd RealTime_Messenger
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```env
   DATABASE_URL=your_mongodb_connection_string
   NEXTAUTH_URL=your_nextauth_url
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📸 Demo

Check out the live demo: [chatino.vercel.app](https://chatino.vercel.app)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.


