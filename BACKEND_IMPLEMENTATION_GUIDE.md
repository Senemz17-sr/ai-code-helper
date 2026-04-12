# Backend Implementation Guide - Node.js/Express + MongoDB

## 📋 Project Structure

```
backend/
├── src/
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   ├── rateLimit.ts         # Rate limiting
│   │   ├── errorHandler.ts      # Global error handler
│   │   └── validation.ts        # Input validation
│   ├── routes/
│   │   ├── auth.ts              # Auth endpoints
│   │   ├── ai.ts                # AI endpoints
│   │   ├── chat.ts              # Chat history endpoints
│   │   ├── projects.ts          # Projects endpoints
│   │   └── user.ts              # User endpoints
│   ├── controllers/
│   │   ├── authController.ts    # Auth logic
│   │   ├── aiController.ts      # AI request handling
│   │   ├── chatController.ts    # Chat management
│   │   ├── projectController.ts # Project management
│   │   └── userController.ts    # User management
│   ├── services/
│   │   ├── aiService.ts         # AI API wrapper
│   │   ├── authService.ts       # Auth business logic
│   │   ├── emailService.ts      # Email notifications
│   │   └── storageService.ts    # File storage
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── Conversation.ts      # Chat schema
│   │   ├── Project.ts           # Project schema
│   │   └── UsageStats.ts        # Usage tracking
│   ├── utils/
│   │   ├── logger.ts            # Logging utility
│   │   ├── errorHandler.ts      # Error handling
│   │   └── validators.ts        # Validation utilities
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   ├── constants.ts         # App constants
│   │   └── env.ts               # Environment variables
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   └── app.ts                   # Express app setup
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Key API Endpoints

### Authentication
```typescript
POST /api/auth/register
  {
    email: string,
    username: string,
    password: string
  }

POST /api/auth/login
  {
    email: string,
    password: string
  }
  Response: { token, user }

POST /api/auth/refresh
  Headers: { Authorization: Bearer <token> }
  Response: { token }

GET /api/auth/me
  Headers: { Authorization: Bearer <token> }
  Response: { user }
```

### AI Helper
```typescript
POST /api/ai/generate
  {
    prompt: string,
    language: string,
    context?: string
  }
  Response: { code, explanation, metadata }

POST /api/ai/debug
  {
    code: string,
    language: string,
    description?: string
  }
  Response: { issues, suggestions }

POST /api/ai/explain
  {
    code: string,
    language: string
  }
  Response: { explanation, lineByLine }

POST /api/ai/optimize
  {
    code: string,
    language: string
  }
  Response: { optimizedCode, improvements }

POST /api/ai/refactor
  {
    code: string,
    language: string
  }
  Response: { refactoredCode, changes }
```

### Chat History
```typescript
GET /api/chat/conversations
  Headers: { Authorization: Bearer <token> }
  Response: { conversations: [] }

POST /api/chat/conversations
  {
    title: string,
    language: string
  }
  Response: { conversation }

GET /api/chat/conversations/:id
  Response: { conversation: { id, title, messages[] } }

POST /api/chat/conversations/:id/messages
  {
    content: string,
    code?: string,
    language?: string
  }
  Response: { message }

DELETE /api/chat/conversations/:id
  Response: { success: true }
```

### Projects
```typescript
GET /api/projects
  Headers: { Authorization: Bearer <token> }
  Response: { projects: [] }

POST /api/projects
  {
    title: string,
    description?: string,
    tags?: string[]
  }
  Response: { project }

GET /api/projects/:id
  Response: { project }

PUT /api/projects/:id
  {
    title?: string,
    description?: string,
    tags?: string[]
  }
  Response: { project }

DELETE /api/projects/:id
  Response: { success: true }

POST /api/projects/:id/files
  {
    name: string,
    language: string,
    content: string
  }
  Response: { file }

DELETE /api/projects/:id/files/:fileId
  Response: { success: true }
```

## 🗄️ MongoDB Schemas

### User
```typescript
{
  _id: ObjectId,
  email: string,
  username: string,
  passwordHash: string,
  avatar?: string,
  subscription: 'free' | 'pro' | 'enterprise',
  apiKeys: [{ _id, name, provider, keyHash, createdAt }],
  preferences: {
    theme: 'light' | 'dark',
    language: string,
    notifications: boolean
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt?: Date
}
```

### Conversation
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  title: string,
  language: string,
  messages: [{
    _id: ObjectId,
    role: 'user' | 'assistant',
    content: string,
    code?: string,
    mode?: string,
    timestamp: Date
  }],
  isPublic: boolean,
  tags: [string],
  starredAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  title: string,
  description?: string,
  files: [{
    _id: ObjectId,
    name: string,
    language: string,
    content: string,
    updatedAt: Date
  }],
  tags: [string],
  isPublic: boolean,
  collaborators?: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### UsageStats
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  requests: {
    total: number,
    byMode: { generate, debug, explain, optimize, refactor },
    byLanguage: { python, javascript, cpp, c, java, go, rust }
  },
  tokens: {
    used: number,
    limit: number
  }
}
```

## 🔐 Authentication & Security

### JWT Implementation
```typescript
// Token payload
{
  userId: string,
  email: string,
  subscription: string,
  iat: number,
  exp: number
}

// Token expiry
ACCESS_TOKEN: 15 minutes
REFRESH_TOKEN: 7 days
```

### Password Security
- Hash: bcrypt with 12 rounds
- Validation: Minimum 8 chars, letters + numbers
- Reset: Email link with 1-hour expiry token

### Rate Limiting
- Free: 50 requests/month
- Pro: Unlimited
- Endpoint: 100 requests/minute per user

## 📊 Monitoring & Analytics

### Tracked Metrics
- API usage by user and endpoint
- Token usage (calculate costs)
- Error rates and types
- Response times
- Active users

### Logging
```typescript
// Use Winston or Pino
logger.info(message, metadata)
logger.error(message, error, metadata)
logger.warn(message, metadata)
```

## 🚀 Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
OPENAI_API_KEY=sk-...
REDIS_URL=redis://...
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### CI/CD
- GitHub Actions for testing on push
- Automated deployment on main branch
- Staging environment for testing
- Production deployment with blue-green strategy

## 🧪 Testing

### Test Structure
```
tests/
├── unit/
│   ├── auth.test.ts
│   ├── ai.test.ts
│   └── validation.test.ts
├── integration/
│   ├── auth.integration.test.ts
│   └── api.integration.test.ts
└── e2e/
    └── user.flow.test.ts
```

### Coverage Target
- Minimum 80% code coverage
- All critical paths tested
- Integration tests for API endpoints

## 📦 Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.0",
    "express-rate-limit": "^6.7.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "joi": "^17.9.0",
    "axios": "^1.4.0",
    "redis": "^4.6.0",
    "winston": "^3.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "jest": "^29.5.0",
    "@testing-library/node": "^20.0.0"
  }
}
```

## 🔄 Workflow

1. **User registers** → Email verification → Profile creation
2. **User adds API key** → Stores encrypted in DB
3. **User sends request** → Validated → Rate limited → AI service call
4. **Response processing** → Saved to chat history → Token usage tracked
5. **Analytics updated** → User notified

## 📈 Scaling Considerations

- **Caching**: Redis for frequently accessed data
- **Queue**: Bull/RabbitMQ for async processing
- **Load balancing**: Nginx/HAProxy
- **CDN**: CloudFront for static assets
- **Database**: MongoDB Atlas with auto-scaling
- **Monitoring**: Datadog/New Relic for performance tracking

