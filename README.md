# Rockify - Spotify device controller

## Introduction

This web app serves to teach myself more about:

- React
- Next.js
- Spotify API
- Recoil state management
- Next/Auth
- Custom middleware protection
- Tailwind CSS

Due to the nature of the Spotify API, this app doesn't act as a replacement for Spotify, but rather a controller for an active Spotify device. Therefore, it is necessary to have spotify active on your device first and then control it via this web app.

This app is styled after the Spotify player, however I have taken a few liberties with colors and responsiveness using TailwindCSS.

## Getting Started - Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
