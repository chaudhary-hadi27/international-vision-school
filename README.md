# 🎓 IVS - International Vision School Management System

A comprehensive, full-stack school management system built with Next.js 15, TypeScript, Prisma, and PostgreSQL. This system handles everything from public-facing website to admission management, parent portal, and admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [API Routes](#api-routes)
- [Email Configuration](#email-configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Public Website
- 🏠 Modern landing page with hero section
- 📚 Academic programs (Playgroup to Grade 10)
- ℹ️ About us, contact, and admissions information
- 📱 Fully responsive design
- 💬 WhatsApp integration for inquiries

### Admission Portal
- 📝 Multi-step online admission form
- 📤 Document upload (photos, certificates, CNICs)
- ✅ Real-time form validation
- 📧 Email notifications (admin & applicant)
- 🔍 Application status tracking

### Admin Dashboard
- 📊 Comprehensive analytics dashboard
- 👥 Application management with status updates
- 🎓 Student records management
- 📅 Attendance tracking system
- 💰 Fee management and payment records
- 📢 Announcements system
- 📈 Reports and statistics

### Parent Portal
- 👨‍👩‍👧 Multi-child support
- 📊 Student dashboard with key metrics
- 📅 Attendance history and statistics
- 💵 Fee status and payment history
- 📢 School announcements
- 📄 Academic results (when published)

### Security Features
- 🔐 NextAuth.js authentication
- 🛡️ Role-based access control (RBAC)
- 🔒 Protected API routes
- 🚫 CSRF protection
- ✅ Input validation with Zod

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: React Hooks

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Password Hashing**: bcryptjs

### Email
- **Service**: Resend
- **Templates**: Custom HTML emails

### Deployment
- **Platform**: Vercel (recommended)
- **Database**: Supabase, Neon, or Railway

## 📦 Prerequisites

Before installation, ensure you have:

- Node.js 18.x or higher
- pnpm (or npm/yarn)
- PostgreSQL database
- Git

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ivs-school-management.git
cd ivs-school-management
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your `.env` file** (see [Environment Variables](#environment-variables))

5. **Set up the database**
```bash
pnpm db:push
pnpm db:seed
```

6. **Run the development server**
```bash
pnpm dev
```

7. **Open your browser**
```
http://localhost:3000
```

## 🗄️ Database Setup

### Using Prisma

1. **Initialize Prisma** (already done in project)
```bash
npx prisma init
```

2. **Update your DATABASE_URL** in `.env`

3. **Push schema to database**
```bash
pnpm db:push
```

4. **Seed the database**
```bash
pnpm db:seed
```

### Database Schema

The system includes these main models:
- **User**: Base authentication and user info
- **Admin**: Admin-specific details
- **Parent**: Parent/guardian information
- **Student**: Student records
- **Admission**: Admission applications
- **Attendance**: Attendance tracking
- **FeeRecord**: Fee management
- **Result**: Academic results
- **Announcement**: School announcements
- **Timetable**: Class schedules

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ivs_school"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="IVS Admissions <admissions@ivs.edu.pk>"
RESEND_ADMIN_EMAIL="admin@ivs.edu.pk"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP="+923001234567"

# Node Environment
NODE_ENV="development"
```

### Getting API Keys

**Resend (Email Service)**
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create an API key
4. Add to `.env`

**Database (Multiple Options)**

**Supabase:**
```bash
# Free tier available
# Get connection string from Supabase dashboard
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

**Neon:**
```bash
# Serverless Postgres
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb"
```

**Railway:**
```bash
# Provision PostgreSQL addon
DATABASE_URL="postgresql://user:pass@containers-us-west-xxx.railway.app:5432/railway"
```

## 🎮 Running the Application

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Production
```bash
pnpm start
```

### Database Commands
```bash
# Push schema changes
pnpm db:push

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (GUI)
pnpm db:studio

# Generate Prisma Client
pnpm db:generate
```

### Linting
```bash
pnpm lint
```

## 📁 Project Structure

```
ivs-school-management/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── public/
│   ├── images/                # Static images
│   └── uploads/               # User uploads
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication routes
│   │   │   └── login/
│   │   ├── (portal)/         # Portal routes
│   │   │   ├── (admin)/
│   │   │   │   └── admin/   # Admin dashboard
│   │   │   ├── (parent)/
│   │   │   │   └── parent-portal/  # Parent portal
│   │   │   └── admission-portal/   # Admission form
│   │   ├── (public)/         # Public pages
│   │   │   ├── about/
│   │   │   ├── academics/
│   │   │   ├── admissions/
│   │   │   └── contact/
│   │   ├── api/              # API routes
│   │   │   ├── admin/
│   │   │   ├── parent/
│   │   │   ├── admission/
│   │   │   └── auth/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── home/             # Home page components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # Reusable UI components
│   ├── lib/
│   │   ├── actions/          # Server actions
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── auth.ts           # NextAuth config
│   │   ├── constants.ts      # App constants
│   │   ├── email.ts          # Email functions
│   │   ├── prisma.ts         # Prisma client
│   │   ├── validations.ts    # Zod schemas
│   │   └── whatsapp.ts       # WhatsApp integration
│   └── types/
│       ├── index.ts          # Type definitions
│       └── next-auth.d.ts    # NextAuth types
├── .env.example              # Environment template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 👥 User Roles

### Demo Accounts (after seeding)

**Admin**
- Email: `admin@ivs.edu.pk`
- Password: `admin123`
- Access: Full system control

**Parent**
- Email: `parent@ivs.edu.pk`
- Password: `parent123`
- Access: View children's data

### Role Permissions

| Feature | Admin | Parent |
|---------|-------|--------|
| Dashboard | ✅ | ✅ |
| Applications | ✅ | ❌ |
| Students | ✅ | ❌ |
| Attendance | ✅ (manage) | ✅ (view) |
| Fees | ✅ (manage) | ✅ (view) |
| Results | ✅ (manage) | ✅ (view) |
| Announcements | ✅ (create) | ✅ (view) |
| Reports | ✅ | ❌ |

## 🛣️ API Routes

### Public
- `POST /api/admission` - Submit admission application
- `GET /api/admission?id={id}` - Get application status

### Admin (Protected)
- `GET /api/admin/applications` - List applications
- `GET /api/admin/applications/[id]` - Get application details
- `PUT /api/admin/applications/[id]/status` - Update status
- `GET /api/admin/students` - List students
- `GET /api/admin/attendance` - Get attendance
- `POST /api/admin/attendance` - Mark attendance
- `GET /api/admin/fees` - List fee records
- `PUT /api/admin/fees/[id]` - Update payment
- `GET /api/admin/announcements` - List announcements
- `POST /api/admin/announcements` - Create announcement

### Parent (Protected)
- `GET /api/parent/children` - Get children list
- `GET /api/parent/attendance/[studentId]` - Get attendance
- `GET /api/parent/fees/[studentId]` - Get fee status
- `GET /api/parent/announcements` - Get announcements

## 📧 Email Configuration

The system uses Resend for email notifications:

### Email Types
1. **Admin Notifications** - New application alerts
2. **Confirmation Emails** - Application received
3. **Status Updates** - Approved/Rejected notifications

### Template Customization

Edit email templates in `src/lib/email.ts`:
```typescript
export async function sendConfirmationEmail(
  email: string,
  applicationId: string,
  studentName: string
) {
  // Customize HTML template here
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your repository
- Add environment variables
- Deploy!

3. **Configure Domain**
- Add custom domain in Vercel settings
- Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`

### Environment Variables on Vercel
Add all variables from `.env` to Vercel:
- Go to Project Settings → Environment Variables
- Add each variable
- Redeploy

### Database Options

**For Production:**
- Supabase (Free tier: 500MB)
- Neon (Serverless Postgres)
- Railway (Postgres with free tier)
- Vercel Postgres

## 🔧 Configuration

### School Information

Update in `src/lib/constants.ts`:
```typescript
export const SCHOOL_INFO = {
  name: 'International Vision School',
  shortName: 'IVS',
  tagline: 'Building Tomorrow\'s Leaders Today',
  phone: '+92 300 1234567',
  whatsapp: '923001234567',
  address: 'Lahore, Pakistan',
  email: 'info@ivschool.edu.pk',
}
```

### Customizing Grades

Edit in relevant files:
```typescript
const grades = [
  'Playgroup', 'Nursery', 'Prep',
  'Class 1', 'Class 2', ..., 'Class 10'
]
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check DATABASE_URL format
# Run migrations
pnpm db:push
```

**NextAuth Error**
```bash
# Generate new NEXTAUTH_SECRET
openssl rand -base64 32
```

**Email Not Sending**
- Verify RESEND_API_KEY
- Check domain verification
- Review email logs in Resend dashboard

**Build Errors**
```bash
# Clear cache
rm -rf .next
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

**Built with ❤️ for International Vision School**