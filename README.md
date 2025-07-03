# BudgetMate Web

A comprehensive personal finance management application built with Next.js, TypeScript, and Supabase. BudgetMate helps users track expenses, manage budgets, and gain insights into their financial habits with an intuitive and modern interface.

## 🚀 Features

- **User Authentication** - Secure sign-up and login with Supabase Auth
- **Expense Tracking** - Add, edit, and categorize expenses
- **Budget Management** - Set and monitor budget limits
- **Financial Analytics** - Visual insights and spending patterns
- **Admin Dashboard** - Administrative controls and user management
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Live data synchronization across devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Netlify
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- A Supabase account and project
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Umaradigun/BudgetMateWeb.git
   cd BudgetMateWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up the database**
   
   Run the SQL migrations in your Supabase dashboard or use the Supabase CLI to set up the required tables and policies.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗄️ Database Schema

The application uses the following main tables:

- **users** - User profiles and authentication data
- **profiles** - Extended user information and roles
- **expenses** - User expense records
- **categories** - Expense categories
- **budgets** - Budget limits and settings
- **enrollments** - Course enrollments (if applicable)
- **courses** - Available courses
- **activities** - User activity logs
- **payments** - Payment records

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify dashboard

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy the `out` folder** to your preferred hosting service

## 📁 Project Structure

```
BudgetMateWeb/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── admin/         # Admin API endpoints
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   └── globals.css       # Global styles
├── public/               # Static assets
├── supabase/            # Database migrations and types
├── .env.local           # Environment variables (not in repo)
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Umar Adigun**
- GitHub: [@Umaradigun](https://github.com/Umaradigun)

## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/Umaradigun/BudgetMateWeb/issues) on GitHub.

## 📞 Support

For support and questions, please reach out through:
- GitHub Issues
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Netlify](https://netlify.com/) for seamless deployment

---

⭐ If you found this project helpful, please give it a star on GitHub!
