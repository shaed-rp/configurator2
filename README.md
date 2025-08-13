# Ford E-Series Configurator

A comprehensive vehicle configuration and pricing tool built for Ford E-Series commercial vehicles, featuring both customer-facing and dealer-specific views with real-time Supabase database integration.

![Ford E-Series Configurator](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Integrated-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.7-blue)

## 🚀 Live Demo

**Production URL:** [https://dwfgwtxb.manus.space](https://dwfgwtxb.manus.space)

## ✨ Features

### Customer View
- **Interactive Vehicle Selection**: Browse 11 Ford E-Series models with detailed specifications
- **Real-time Pricing**: Dynamic pricing calculations with MSRP and destination charges
- **Comprehensive Options**: 79+ vehicle options across 13 categories
- **Modern UI/UX**: Responsive design with professional Endera branding
- **Quote Generation**: Generate and share vehicle configurations

### Dealer View
- **Business Intelligence Dashboard**: KPIs including sales tracking and margin analysis
- **Profit Analysis**: Real-time dealer invoice vs. customer MSRP calculations
- **Sales Recommendations**: AI-powered suggestions for optimizing configurations
- **Popular Options Analytics**: Data-driven insights on frequently selected options
- **Margin Tracking**: Current and historical margin performance

### Technical Features
- **Direct Database Integration**: Real-time data from Supabase
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern Architecture**: Built with React 19, TypeScript, and Tailwind CSS
- **Performance Optimized**: Fast loading with efficient data fetching
- **Professional UI Components**: Shadcn/ui component library

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0, TypeScript, Tailwind CSS 4.1.7
- **UI Components**: Shadcn/ui, Radix UI primitives
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite 6.3.5
- **Package Manager**: PNPM
- **Deployment**: Production-ready static build

## 📋 Prerequisites

- Node.js 18+ 
- PNPM (recommended) or npm
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ford-configurator
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The application expects the following Supabase tables:
- `base_vehicles` - Ford E-Series base vehicle configurations
- `vehicle_options` - Available options and packages
- `option_categories` - Option category organization
- `base_vehicle_pricing` - Vehicle pricing information
- `vehicle_option_pricing` - Option pricing information
- `option_compatibility` - Option compatibility rules

### 5. Development Server
```bash
pnpm run dev
# or
npm run dev
```

Visit `http://localhost:5173` to view the application.

### 6. Production Build
```bash
pnpm run build
# or
npm run build
```

## 📁 Project Structure

```
ford-configurator/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── VehicleSelector.jsx
│   │   ├── OptionsSelector.jsx
│   │   ├── PricingSummary.jsx
│   │   ├── DealerDashboard.jsx
│   │   └── Header.jsx
│   ├── contexts/         # React contexts
│   │   └── ConfigurationContext.jsx
│   ├── lib/              # Utilities and services
│   │   ├── supabase.js   # Supabase client
│   │   ├── vehicleService.js # Data services
│   │   └── utils.js      # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles with Endera branding
│   └── main.jsx          # Application entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Branding & Design

The application features custom Endera branding with:
- **Primary Color**: Endera Blue (`oklch(0.45 0.15 240)`)
- **Accent Color**: Endera Accent (`oklch(0.65 0.2 200)`)
- **Typography**: Modern, professional font stack
- **Components**: Consistent design system with hover states and animations

## 📊 Database Schema

### Key Tables
- **base_vehicles**: Vehicle configurations with series, wheelbase, drivetrain
- **vehicle_options**: Available options with codes, descriptions, and flags
- **pricing tables**: Dealer invoice and suggested retail pricing
- **compatibility**: Rules for option availability by vehicle

### Sample Data
The application includes comprehensive Ford E-Series data:
- 11 base vehicle configurations (E-350, E-450 variants)
- 79+ vehicle options across 13 categories
- Complete pricing information with dealer and retail prices

## 🔧 Configuration

### Supabase Integration
Update `src/lib/supabase.js` with your Supabase credentials:
```javascript
const supabaseUrl = 'your_supabase_url'
const supabaseAnonKey = 'your_supabase_anon_key'
```

### Customization
- **Branding**: Modify `src/App.css` for custom colors and styling
- **Data**: Update `src/lib/vehicleService.js` for different data sources
- **Components**: Extend components in `src/components/` for additional features

## 🚀 Deployment

### Static Hosting (Recommended)
The application builds to static files and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Build Command
```bash
pnpm run build
```

### Environment Variables
Ensure production environment variables are set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software developed for Endera. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Review the documentation in `/docs` (if available)

## 🔄 Version History

- **v1.0.0** - Initial release with full customer and dealer functionality
- Complete Ford E-Series vehicle lineup
- Real-time Supabase integration
- Professional Endera branding
- Responsive design for all devices

---

**Built with ❤️ by the Endera Development Team**

*Powered by React, Supabase, and modern web technologies*

