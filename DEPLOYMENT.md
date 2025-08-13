# Deployment Guide - Ford E-Series Configurator

This guide covers deployment options for the Ford E-Series Configurator application.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Deploy automatically on push

### Option 2: Netlify
1. Build the project: `pnpm run build`
2. Drag and drop `dist/` folder to Netlify
3. Or connect GitHub repo for automatic deployments
4. Set environment variables in Netlify dashboard

### Option 3: GitHub Pages
1. Install gh-pages: `pnpm add -D gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/ford-configurator",
   "predeploy": "pnpm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `pnpm run deploy`

## 🔧 Environment Variables

Required environment variables for production:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Supabase database populated with Ford E-Series data
- [ ] Build process completes without errors
- [ ] All components render correctly in production build
- [ ] Database connections work in production environment
- [ ] Responsive design tested on multiple devices

## 🗄️ Database Setup

Ensure your Supabase database has the following tables with data:

### Required Tables:
1. **base_vehicles** - Ford E-Series vehicle configurations
2. **vehicle_options** - Available options and packages  
3. **option_categories** - Option categories for organization
4. **base_vehicle_pricing** - Base vehicle pricing information
5. **vehicle_option_pricing** - Option pricing information
6. **option_compatibility** - Compatibility rules between options and vehicles

### Sample SQL for table creation:
```sql
-- Enable Row Level Security if needed
ALTER TABLE base_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_options ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON base_vehicles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON vehicle_options FOR SELECT USING (true);
```

## 🔒 Security Considerations

- Use Supabase Row Level Security (RLS) policies
- Environment variables should never be committed to version control
- Use Supabase anon key (not service role key) for client-side access
- Consider implementing rate limiting for production use

## 📊 Performance Optimization

- Enable gzip compression on your hosting platform
- Use CDN for static assets
- Implement caching headers for better performance
- Consider lazy loading for option categories

## 🔍 Monitoring & Analytics

Consider adding:
- Google Analytics or similar for usage tracking
- Error monitoring (Sentry, LogRocket)
- Performance monitoring
- User feedback collection

## 🆘 Troubleshooting

### Common Issues:

**Build Fails:**
- Check Node.js version (18+ required)
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check for TypeScript errors

**Database Connection Issues:**
- Verify Supabase URL and key
- Check network connectivity
- Ensure database tables exist and have data

**Styling Issues:**
- Verify Tailwind CSS is properly configured
- Check for CSS conflicts
- Ensure all custom CSS variables are defined

### Debug Commands:
```bash
# Check build locally
pnpm run build && pnpm run preview

# Check for linting issues
pnpm run lint

# Clear cache and rebuild
rm -rf node_modules dist && pnpm install && pnpm run build
```

## 📞 Support

For deployment issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Test database connectivity
4. Review this deployment guide
5. Contact the development team if issues persist

---

**Last Updated:** January 2025
**Version:** 1.0.0

