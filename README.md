# Personal Portfolio Website

A modern, responsive portfolio website built with React, Three.js, and GSAP animations. This portfolio showcases my projects, skills, and experience in an interactive and engaging way.

## 🚀 Features

- Interactive 3D elements using Three.js
- Smooth animations with GSAP
- Responsive design for all devices
- Contact form with EmailJS integration
- Interactive globe visualization
- Modern UI with NextUI components
- Dark/Light mode support

## 🛠️ Technologies Used

- React 18
- Three.js
- GSAP
- Framer Motion
- NextUI
- TailwindCSS
- Vite
- EmailJS
- React Router DOM
- TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/AlexCDowsett/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in the `.env` file (see Environment Setup section below)

5. Start the development server:
```bash
npm run dev
```

## 🔧 Environment Setup

This project uses environment variables to keep sensitive information secure. Create a `.env` file in the root directory with the following variables:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Contact Information
VITE_CONTACT_EMAIL=your_email@example.com
VITE_CONTACT_NAME=Your Name

# Personal Information
VITE_PERSONAL_NAME=Your Name
VITE_PORTFOLIO_TITLE=Your Portfolio
```

### Setting up EmailJS:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your public key from the EmailJS dashboard
5. Add these credentials to your `.env` file

**Note:** The `.env` file is already added to `.gitignore` to prevent sensitive information from being committed to version control.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Live Demo

Visit the live site at: [dowsett.dev](https://dowsett.dev)

## 📝 Project Structure

```
portfolio/
├── src/
│   ├── components/     # React components
│   ├── constants/      # Project constants and data
│   ├── assets/         # Static assets
│   └── App.jsx         # Main application component
├── public/            # Public assets
└── index.html         # Entry HTML file
```

## 🤝 Contributing

Feel free to fork this project and make your own changes. Pull requests are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Alex Dowsett
- GitHub: [@AlexCDowsett](https://github.com/AlexCDowsett)
- LinkedIn: [Alex Dowsett](https://www.linkedin.com/in/alex-dowsett-27266b151/)
