# Gift Finder App

A modern, feature-rich gift suggestion app built with **React**, **Vite**, and **TypeScript**. The app helps users discover gift ideas for various occasions, review gifts, and save favorites. It’s designed to strengthen advanced React concepts and improve development skills.

## Features

- 🎁 **Gift Suggestions:** Browse a collection of predefined gift ideas with title, description, images, price range, and preferred occasions.
- ⭐ **Reviews & Ratings:** Add reviews and ratings to gifts to help others choose the perfect present.
- ❤️ **Favorite List:** Save gifts to your favorites for easy access later.
- 🔍 **Search & Filter:** Find gifts by keywords, price range, or occasion.

## Tech Stack

- **Frontend:** React, Vite, TypeScript
- **State Management:** Redux Toolkit
- **Server State Management:** React Query
- **Forms & Validation:** React Hook Form, Zod
- **Animations:** Framer Motion
- **Reducers & Context:** useReducer, React Context API
- **Styling:** Tailwind CSS

## Project Structure

```
├── public
├── src
│   ├── assets
│   ├── components
│   ├── features
│   │   ├── favorites
│   │   ├── giftList
│   │   ├── reviews
│   │   └── search
│   ├── hooks
│   ├── pages
│   ├── store
│   ├── utils
│   └── App.tsx
├── .env
├── .eslintrc.js
├── .prettierrc
├── index.html
└── vite.config.ts
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/gift-finder-app.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file and define necessary environment variables (if any).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Key Concepts & Implementation

### 🎯 Redux Toolkit
Used for global state management, handling favorites, and gift data.

### ⚡ React Query
Efficiently fetch, cache, and sync server data for gifts and reviews.

### 📝 React Hook Form & Zod
Create and validate review forms with ease.

### 🎬 Framer Motion
Add smooth animations to enhance UI interactions.

### 🧠 useReducer & Context API
Manage complex component state and share data across components.

## Contributing

1. **Fork the repository**
2. **Create a branch:** `git checkout -b feature-name`
3. **Commit your changes:** `git commit -m 'Add feature'`
4. **Push to the branch:** `git push origin feature-name`
5. **Create a Pull Request**

## License

This project is licensed under the MIT License.

---

Let me know if you’d like me to tweak anything or expand on a particular section! 🚀

