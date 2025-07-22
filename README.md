# 🛍️ Summer of Making Shop Rewards

A simple React + Vite app to browse and filter products from the Hack Club’s Summer of Making shop.

---

## 📦 Get Product Names from Hack Club Shop

Use this one-liner to extract product names from the official shop page:

```bash
curl -s https://summer.hackclub.com/shop \
  | grep -oP '<h3 class="text-xl font-bold mb-2">.*?<\/h3>' \
  | sed -E 's/<h3 class="text-xl font-bold mb-2">(.*?)<\/h3>/\1/'
```

---

## 🚀 Deployment

### 1. Setup

Clone the repository, install dependencies, and build the project:

```bash
git clone https://github.com/BilalSwl6/summer-of-making-shop-rewards.git
cd summer-of-making-shop-rewards
npm install
npm run build
```

### 2. Before Deployment or Local Development

Edit `vite.config.ts` and **remove or comment out** the following lines if you're not deploying to GitHub Pages or using ngrok:

```ts
base: '/summer-of-making-shop-rewards/',
allowedHosts: ['.ngrok-free.app'],
```

---

## 🌐 Live Demo

Once deployed via GitHub Actions, your app will be live at:

👉 **https://bilalswl6.github.io/summer-of-making-shop-rewards/**

---

## ⚙️ Tech Stack

- ⚛️ React
- ⚡ Vite
- 🌀 Tailwind CSS
- 🔒 TypeScript
- 📦 GitHub Pages (for deployment)

---
