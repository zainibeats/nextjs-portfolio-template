# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and interactive components.

## Features

- 🌓 Dark/Light mode with system preference detection
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design
- 🎵 Spotify and SoundCloud integration
- 📧 Contact form with SendGrid integration
- 🎮 Project showcase with live demos
- 🔍 SEO optimized
- 🚀 Optimized for performance

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons
- SendGrid API

## Prerequisites

- Node.js 18+ 
- Windows OS
- npm (comes with Node.js)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/zainibeats/nodejs-portfolio-template
cd tailwind_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=your_email@example.com
SENDER_EMAIL=verified_sender@example.com
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
tailwind_portfolio/
├── public/              # Static files
│   ├── assets/         # Images, videos, and other media
│   └── files/          # Downloadable files
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── data/          # Static data files
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Key Components

- `Header`: Navigation and theme toggle
- `Hero`: Landing section with profile
- `About`: Skills and resume section
- `Projects`: Portfolio showcase
- `Music`: Spotify and SoundCloud integration
- `Contact`: Contact form with SendGrid

## Deployment

The project is configured for deployment on Vercel with the following optimizations:
- Static asset optimization
- Content Security Policy headers
- Standalone output
- Cross-origin resource sharing

## Environment Variables

Required environment variables for production:
```env
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=your_email@example.com
SENDER_EMAIL=verified_sender@example.com
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

- SendGrid requires verified sender emails
- Some browsers may require enabling JavaScript for full functionality
- Local development requires Node.js 18 or higher

## License

MIT License - feel free to use this project as a template for your own portfolio!
