# Orange Oregano Fashion Website

A modern, responsive fashion e‑commerce site for the **Orange Oregano** brand.

## Features

- **Admin portal** – add, edit, and remove products; manage stock; view orders.
- **Buyer experience** – account creation, Google Sign‑In, wishlist, order history, and tracking.
- **Guest browsing** – view products and add to cart without logging in.
- **Google authentication** – one‑click sign‑in with Google accounts (demo accounts provided).
- **User avatars** – pulled from Google profiles and displayed in the navbar.
- **Responsive UI** – built with Vite + React + TypeScript + Tailwind CSS.

## Tech Stack

- **Framework:** React (TypeScript) with Vite
- **Styling:** Tailwind CSS
- **State management:** Context API
- **Authentication:** Custom local storage + Google Sign‑In mock
- **Build tooling:** Vite, ESLint, Prettier

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/pihu2005/orange-oregano.git
   cd orange-oregano
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/`.

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure (high‑level)

```
src/
│   App.tsx                – root component
│   main.tsx               – entry point
│   index.css              – global styles
│   types/index.ts         – shared TypeScript types (User now includes optional avatar)
│
├─ components/
│   ├─ auth/AuthModal.tsx – login/signup + Google Sign‑In UI
│   ├─ Navbar.tsx         – navigation bar with avatar display
│   ├─ admin/…            – admin dashboard and product management
│   └─ buyer/…            – buyer dashboard, order tracker, etc.
│
├─ context/
│   AuthContext.tsx       – authentication context (includes googleSignIn)
│   ProductContext.tsx    – product data handling
│   OrderContext.tsx      – order state management
│
└─ data/
    products.ts           – sample product list (replace with real data)
```

## Contributing

Feel free to open issues or submit pull requests. When contributing:
- Follow the existing code style (Prettier + ESLint).
- Keep the `README` up‑to‑date.
- Run `npm run lint` before committing.

## License

This project is provided as a learning/demo example and is **unlicensed** – you may use it freely.

---
