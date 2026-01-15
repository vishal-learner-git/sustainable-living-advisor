# 🌱 Sustainable Living Advisor

> An AI-powered web application that helps users analyze their lifestyle habits and reduce their carbon footprint.

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge&logo=netlify)](https://tourmaline-piroshki-25075d.netlify.app/)

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Supabase%20%7C%20Groq%20AI-green)

## 📖 Overview

The **Sustainable Living Advisor** is a modern, responsive web application designed to guide users toward a more eco-friendly lifestyle. By collecting data on daily habits—Electricity, Water, Food, and Transportation—the app uses a smart analysis engine (powered by **Groq Llama 3**) to calculate a sustainability score and provide personalized, actionable recommendations.

## ✨ Features

- **📊 Interactive Assessment Grid**: A beautiful, single-view dashboard to easily input lifestyle metrics using sliders and options.
- **🧠 AI-Powered Insights**: Integrates with **Groq (Llama 3)** to generate a unique "Sustainability Manifesto" and deep, contextual advice for every user.
- **⚡ Instant Feedback**: Real-time scoring system (0-100) with visual indicators (Low/Medium/High).
- **🚗 EV Support**: Specifically rewards and recognizes Electric Vehicle usage in transport analysis.
- **🔐 User Authentication**: Secure Login and Signup powered by **Supabase**.
- **📜 History Tracking**: Saves every assessment to the cloud so users can track their progress over time.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop using **Tailwind CSS**.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Artificial Intelligence**: [Groq SDK](https://groq.com/) (Llama 3 Model)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Supabase Account
- A Groq API Key (Free)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/sustainable-living-advisor.git
    cd sustainable-living-advisor
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_GROQ_API_KEY=your_groq_api_key
    ```

4.  **Run the Database Migration**
    Run the following SQL in your Supabase SQL Editor to set up the history table:
    ```sql
    create table history (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references auth.users not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      sustainability_score integer not null,
      sustainability_level text not null,
      user_data jsonb not null,
      results_data jsonb not null
    );

    alter table history enable row level security;

    create policy "Users can insert their own history" on history for insert with check (auth.uid() = user_id);
    create policy "Users can view their own history" on history for select using (auth.uid() = user_id);
    ```

5.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

## 🤖 AI Integration

This project uses **Groq** for ultra-fast AI inference.
- The `generateSustainabilityInsight` function sends user inputs to the Llama 3 model.
- It returns a structured JSON response containing:
    - Sustainability Score
    - Level (High/Medium/Low)
    - Specific Observations
    - Personalized Recommendations
    - Impact Explanation
    - A Motivational Manifesto

**Fallback Mechanism**: If the AI API fails (or no key is provided), the app automatically switches to a robust local logic engine (`analyzer.js`) so the user experience is never interrupted.

## 🌍 Deployment

This app is optimized for deployment on **Netlify** or **Vercel**.

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Deploy the `dist` folder.
    *   See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

### Live Demo
Check out the live version here: [https://tourmaline-piroshki-25075d.netlify.app/](https://tourmaline-piroshki-25075d.netlify.app/)
---
*Built with 💚 for a greener planet.*
