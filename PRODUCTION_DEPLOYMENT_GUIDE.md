# Production Deployment & Optimization Guide

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] API keys secured and stored
- [ ] Database backups scheduled
- [ ] Monitoring setup complete
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Mixpanel, Amplitude)
- [ ] SSL certificates prepared
- [ ] CDN configured
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] Performance benchmarks run

### Infrastructure Setup

#### Frontend Deployment (Vercel/Netlify)
```bash
# 1. Connect repository
# 2. Set environment variables
VITE_API_URL=https://api.codehelper.ai
VITE_APP_URL=https://codehelper.ai

# 3. Build command
npm run build

# 4. Output directory
dist

# 5. Enable edge functions for auth
# 6. Configure redirects and rewrites
```

#### Backend Deployment (Railway/AWS EC2/DigitalOcean)
```bash
# 1. Set environment variables
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
OPENAI_API_KEY=sk-...

# 2. Build and start
npm run build
npm start

# 3. Setup process manager (PM2)
pm2 start dist/app.js --name "codehelper-api"
pm2 save
pm2 startup
```

#### Database (MongoDB Atlas)
```bash
# 1. Create cluster in production tier
# 2. Set IP whitelist
# 3. Enable backup
# 4. Configure alerting
# 5. Index important fields:
#    - users: { email: 1 (unique) }
#    - conversations: { userId: 1, createdAt: -1 }
#    - projects: { userId: 1, createdAt: -1 }
#    - usageStats: { userId: 1, date: -1 }
```

---

## ⚡ Performance Optimization

### Frontend Performance

#### Code Splitting
```typescript
// Use React.lazy for route-based splitting
const AIHelperPage = React.lazy(() => import('./pages/AIHelperPage'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/helper" element={<AIHelperPage />} />
  </Routes>
</Suspense>
```

#### Image Optimization
```typescript
// Use Next.js Image component or webp
import { Img } from 'react-image';

<Img
  placeholder="blur"
  src="/hero.jpg"
  alt="Hero"
  priority
  sizes="(max-width: 640px) 100vw, 640px"
/>
```

#### Bundle Analysis
```bash
npm install -D webpack-bundle-analyzer
npm run analyze

# Target: < 200KB (gzipped)
```

#### Core Web Vitals Optimization
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Backend Performance

#### Database Optimization
```typescript
// Use projection to return only needed fields
db.conversations.find(
  { userId },
  { messages: 0 }  // Exclude messages for list
);

// Use pagination
const PAGE_SIZE = 20;
const skip = (page - 1) * PAGE_SIZE;
db.conversations.find().skip(skip).limit(PAGE_SIZE);

// Aggregate for complex queries
db.usageStats.aggregate([
  { $match: { userId: ObjectId(userId) } },
  { $group: { _id: null, total: { $sum: "$tokens.used" } } }
]);
```

#### Caching Strategy
```typescript
// Redis cache for frequently accessed data
// User profile: 1 hour
cache.set(`user:${userId}`, userData, 3600);

// Conversation list: 5 minutes
cache.set(`conversations:${userId}`, convs, 300);

// Cache invalidation on updates
cache.del(`conversations:${userId}`);
```

#### Database Connection Pooling
```typescript
// Connection pool in mongoose
mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
});
```

---

## 🔐 Security Best Practices

### Environment Variables
```env
# Never commit .env to git
# Use .env.example for reference
# Store secrets in provider's secret manager

# Frontend (.env)
VITE_API_URL=...

# Backend (.env)
NODE_ENV=production
DATABASE_URL=...
JWT_SECRET=... (32+ characters)
API_KEY_ENCRYPTION_KEY=...
```

### API Security Headers
```typescript
// helmet middleware
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Input Validation & Sanitization
```typescript
import Joi from 'joi';

const codeSchema = Joi.object({
  code: Joi.string().required().max(100000),
  language: Joi.string().required().valid('python', 'javascript', 'cpp'),
  prompt: Joi.string().required().max(5000),
});

app.post('/api/ai/generate', async (req, res) => {
  const { error, value } = codeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  // Process validated data
});
```

### SQL Injection Prevention
```typescript
// Use parameterized queries (mongoose handles this)
User.findOne({ email: userInput }); // Safe

// Never use string concatenation
User.findOne({ email: `${userInput}` }); // Unsafe!
```

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.post('/api/auth/login', authLimiter, ...);
```

---

## 📊 Monitoring & Analytics

### Performance Monitoring
```typescript
// Use Datadog, New Relic, or similar
import { datadog } from '@datadog/react';

datadog.init({
  applicationId: 'xxx',
  clientToken: 'xxx',
});
```

### Error Tracking
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### Custom Metrics
```typescript
// Track usage
analytics.track('Code Generated', {
  language: 'python',
  mode: 'generate',
  tokensUsed: 150,
});

// Track errors
analytics.track('API Error', {
  endpoint: '/api/ai/generate',
  status: 500,
  error: 'OpenAI API timeout',
});
```

### Health Checks
```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

app.get('/health/deep', async (req, res) => {
  const mongoHealth = await checkMongoDBHealth();
  const redisHealth = await checkRedisHealth();
  
  res.json({
    mongo: mongoHealth,
    redis: redisHealth,
    overall: mongoHealth && redisHealth ? 'ok' : 'down',
  });
});
```

---

## 🌍 CDN & Static Asset Optimization

### CloudFront Configuration
```bash
# CloudFront Distribution
Origin: api.codehelper.ai (backend)
Behavior: /api/* -> Backend
Behavior: /* -> S3 (frontend)

Caching:
- HTML: 1 hour (no cache)
- CSS/JS: 1 year (with versioning)
- Images: 1 month

Compression: Enable gzip and brotli
Viewer protocol: Redirect HTTP to HTTPS
```

### Asset Versioning
```typescript
// Build script adds hash to filenames
// webpack/vite config
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].chunk.js',
}
```

---

## 📋 Staging & Testing

### Staging Environment
```bash
# Separate staging URL: https://staging-api.codehelper.ai
# Deploy to staging on PR
# Run full test suite
# Manual QA testing
# Performance testing

# Promote to production after approval
```

### Blue-Green Deployment
```bash
# Keep old version running (Green)
# Deploy new version (Blue)
# Test new version
# Switch traffic to Blue
# Keep Green running for rollback
```

---

## 📈 Scaling Strategy

### Horizontal Scaling
```typescript
// Multiple API instances behind load balancer
// Use nginx/HAProxy for load balancing
// Session persistence via Redis
```

### Vertical Scaling
```typescript
// Increase instance size for CPU/memory
// Database scaling (sharding for MongoDB)
```

### Auto-scaling
```yaml
# AWS Auto Scaling Group
min_size: 2
max_size: 10
target_cpu: 70%
scale_up: +1 instance when > 70% CPU
scale_down: -1 instance when < 30% CPU
```

---

## 🔄 Backup & Disaster Recovery

### Database Backups
```bash
# Automated daily backups
# 30-day retention
# Test restore procedures monthly
# Cross-region backup for MongoDB Atlas
```

### Code Backups
```bash
# Version control (GitHub Enterprise)
# Automated snapshots
# Tag releases
```

### Disaster Recovery Plan
```
RTO (Recovery Time Objective): 1 hour
RPO (Recovery Point Objective): 15 minutes

Procedures:
1. Detect issue (monitoring alert)
2. Notify team
3. Investigate & assess impact
4. Execute recovery (DB restore, code rollback)
5. Test recovery
6. Public communication
7. Post-mortem
```

---

## ✅ Maintenance & Monitoring

### Regular Tasks
- [ ] Weekly: Review error logs
- [ ] Daily: Check performance metrics
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Security audit
- [ ] Yearly: Full system review

### Dependencies Management
```bash
npm update # Update within ranges
npm outdated # Check outdated packages
npm audit # Check for vulnerabilities
npm audit fix # Auto-fix vulnerabilities
```

### Log Management
```typescript
// Centralize logs to ELK Stack or similar
// Set retention: 30 days
// Alert on ERROR level

// Example log format:
{
  timestamp: "2024-01-15T10:30:45Z",
  level: "error",
  service: "api",
  userId: "user123",
  message: "Generate code failed",
  error: "OpenAI timeout",
  trace: "..."
}
```

---

## 🎯 Success Metrics

### Target KPIs
- **Uptime**: > 99.9%
- **Response Time**: < 500ms (p95)
- **Error Rate**: < 0.1%
- **Page Load Time**: < 2s (LCP)
- **API Availability**: > 99.99%

### Monthly Review
- Traffic trends
- Error patterns
- Performance degradation
- User feedback
- Cost analysis

