# 🔗 BlockLearn - Web3 Education Platform

<div align="center">
  <img src="https://placehold.co/800x200/4F46E5/FFFFFF/png?text=BlockLearn" alt="BlockLearn" width="800" />
  
  [![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

  <p><em>Empowering the next generation of blockchain developers through interactive learning and expert mentorship</em></p>
</div>

<hr>

## ✨ Overview

**BlockLearn** is a revolutionary blockchain education platform that bridges the gap between theoretical learning and practical industry experience. Our platform combines:

- 🎓 **Structured interactive courses** taught by industry experts
- 👨‍🏫 **Free 1:1 mentorship** from verified blockchain professionals
- 📊 **Real-time market insights** to guide your career decisions
- 🖥️ **Hands-on practice** with real-world blockchain applications

Whether you're a complete beginner or looking to enhance your existing blockchain skills, BlockLearn provides a personalized learning path tailored to your goals.

<div align="center">
  <img src="https://placehold.co/800x400/111827/FFFFFF/png?text=BlockLearn+Dashboard" alt="BlockLearn Dashboard Example" width="800" />
</div>

## 🚀 Key Features

### 📊 Interactive Dashboard
- **Learning Progress Tracker:** Visualize your journey with intuitive progress charts
- **Upcoming Sessions:** Never miss a mentorship session with calendar integration
- **Quick Links:** Access your favorite courses and resources with one click
- **Personalized Recommendations:** Receive course suggestions based on your learning history

### 👨‍🏫 Free Mentorship System
- **Expert Blockchain Mentors:** Connect with industry professionals like Rohit Shahi
- **Scheduling System:** Book free sessions with our verified mentors
- **Profile Reviews:** Read testimonials from other students before choosing your mentor
- **Direct Messaging:** Communicate with mentors before booking sessions

### 📚 Comprehensive Learning Center
- **Video-Based Courses:** Learn at your own pace with our structured curriculum
- **Verification System:** Our custom video player ensures genuine course completion
- **Interactive Quizzes:** Test your knowledge with practical challenges
- **Coding Exercises:** Apply your learning with guided coding assignments

### 📈 Market Insights
- **Job Market Trends:** Stay updated with the latest career opportunities
- **Industry Growth Analysis:** Understand the evolving blockchain landscape
- **Salary Information:** Make informed career decisions with transparent data
- **Skill Demand Tracker:** Focus on learning the most in-demand technologies

### 💼 Wallet Integration
- **Connect Your Wallet:** Experience Web3 features with your blockchain wallet
- **Secure Authentication:** Login securely using your Web3 identity
- **Future Credential NFTs:** Earn verifiable credentials (coming soon)
- **On-Chain Achievements:** Showcase your blockchain skills with transparent verification

<div align="center">
  <img src="https://placehold.co/800x400/111827/FFFFFF/png?text=BlockLearn+Learning+Experience" alt="BlockLearn Learning Experience" width="800" />
</div>

## 🛠️ Tech Stack

<table align="center">
  <tr>
    <td align="center"><strong>Frontend</strong></td>
    <td>Next.js 14, React, TypeScript, TailwindCSS</td>
  </tr>
  <tr>
    <td align="center"><strong>UI Components</strong></td>
    <td>Custom-built components using ShadcnUI</td>
  </tr>
  <tr>
    <td align="center"><strong>State Management</strong></td>
    <td>React Context API for efficient state handling</td>
  </tr>
  <tr>
    <td align="center"><strong>Authentication</strong></td>
    <td>NextAuth.js with wallet connection support</td>
  </tr>
  <tr>
    <td align="center"><strong>Video Player</strong></td>
    <td>Custom YouTube player with anti-cheat verification</td>
  </tr>
</table>

## 🏁 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blocklearn.git
cd blocklearn
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🚢 Deployment

### Easy Deployment to Vercel

<div align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fblocklearn&project-name=blocklearn&repository-name=blocklearn">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</div>

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and sign up/login with your GitHub account
3. Click "Import Project" and select your BlockLearn repository
4. Configure your environment variables in the Vercel dashboard
5. Click "Deploy" and Vercel will automatically detect and optimize your Next.js application
6. Once deployed, Vercel will provide you with a deployment URL to share your project

## 📁 Project Structure

```
blocklearn/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App router pages and layouts
│   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── mentors/     # Mentor listings and profiles
│   │   │   ├── market-trends/ # Market insights pages
│   │   │   └── certificates/  # User achievements
│   │   ├── learning-center/ # Learning center and courses
│   │   │   └── course/      # Individual course pages
│   │   └── auth/           # Authentication pages
│   ├── components/          # Reusable components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── ui/              # UI components
│   │   └── videos/          # Video player components
│   ├── lib/                 # Utility functions and hooks
│   └── styles/              # Global styles
├── prisma/                  # Database schema (if applicable)
└── package.json            # Project dependencies and scripts
```

## 🌟 Platform Highlights

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h3>🎯 Personalized Learning Journey</h3>
        <p>BlockLearn adapts to your skill level and learning pace, providing a customized experience that evolves as you progress through the curriculum. From blockchain fundamentals to advanced smart contract development, our platform scales with your growth.</p>
      </td>
      <td align="center">
        <h3>🤝 Community-Driven Knowledge</h3>
        <p>Connect with fellow learners and industry professionals to share insights, collaborate on projects, and build your network within the blockchain ecosystem. Our mentorship system fosters meaningful connections that extend beyond the platform.</p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <h3>🚀 Future-Ready Skills</h3>
        <p>Our curriculum is continuously updated to reflect the latest blockchain technologies, ensuring you're always learning relevant and in-demand skills. Combined with real-time market trends data, BlockLearn prepares you for the future of blockchain technology.</p>
      </td>
      <td align="center">
        <h3>🔒 Verified Learning</h3>
        <p>Our advanced verification system ensures that your achievements represent genuine knowledge and skills. Soon, you'll be able to showcase your credentials as verifiable NFTs that employers can trust.</p>
      </td>
    </tr>
  </table>
</div>

## 💻 Demo

Visit our [live demo](https://blocklearn-demo.vercel.app) to experience BlockLearn firsthand and explore all its features.

## 🤝 Contributing

We welcome contributions to improve BlockLearn! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<div align="center">
  <img src="https://placehold.co/800x200/111827/FFFFFF/png?text=Join+The+BlockLearn+Community" alt="Join The BlockLearn Community" width="800" />
</div>

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- All our mentors who generously share their knowledge
- The Next.js and Vercel teams for their amazing tools
- The open-source community for their invaluable contributions

---

<div align="center">
  <p>Built with ❤️ for the blockchain community</p>
  
  <a href="https://twitter.com/blocklearn">
    <img src="https://img.shields.io/badge/Twitter-follow-1DA1F2?style=for-the-badge&logo=twitter" alt="Twitter" />
  </a>
  <a href="https://discord.gg/blocklearn">
    <img src="https://img.shields.io/badge/Discord-join-7289DA?style=for-the-badge&logo=discord" alt="Discord" />
  </a>
</div>
