# CodeHelper AI - Architecture & Data Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│                   (React + TypeScript)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Landing Page                               │  │
│  │  (Hero, Features, Pricing, Testimonials)           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         AI Code Helper Page                         │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  Sidebar (Chat History)                     │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │  Code Editor | Chat Interface               │   │  │
│  │  │  Language:    Messages:                      │   │  │
│  │  │  - Python     - User inputs                  │   │  │
│  │  │  - JavaScript - AI responses                 │   │  │
│  │  │  - C/C++      - Animations                   │   │  │
│  │  ├──────────────────────────────────────────────┤   │  │
│  │  │  Mode Selector                              │   │  │
│  │  │  [Generate][Debug][Explain][Optimize][Refactor] │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Pages (Login, Signup, Profile)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                     STATE MANAGEMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ AuthContext  │  │ AIContext    │  │ SubscriptionCtx  │
│  │              │  │              │  │              │    │
│  │ - user       │  │ - conversations
│  │ - session    │  │ - messages   │  │ - plan       │    │
│  │ - token      │  │ - projects   │  │ - usage      │    │
│  │ - login()    │  │ - addMessage │  │ - features   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐    │
│  │   OpenAI Service    │      │   Auth Service      │    │
│  │                     │      │                     │    │
│  │ - generateCode()    │      │ - login()           │    │
│  │ - debugCode()       │      │ - signup()          │    │
│  │ - explainCode()     │      │ - logout()          │    │
│  │ - optimizeCode()    │      │ - validateToken()   │    │
│  │ - refactorCode()    │      │ - refreshToken()    │    │
│  └─────────────────────┘      └─────────────────────┘    │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐    │
│  │  Chat Service       │      │ Project Service     │    │
│  │                     │      │                     │    │
│  │ - getHistory()      │      │ - getProjects()     │    │
│  │ - createConversation│      │ - createProject()   │    │
│  │ - saveMessage()     │      │ - addFiles()        │    │
│  │ - deleteConversation│      │ - shareProject()    │    │
│  └─────────────────────┘      └─────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│            (REST endpoints + JSON responses)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  POST /api/auth/login                                       │
│  POST /api/auth/signup                                      │
│  GET  /api/auth/me                                          │
│                                                             │
│  POST /api/ai/generate      { prompt, language, context }   │
│  POST /api/ai/debug         { code, language }              │
│  POST /api/ai/explain       { code, language }              │
│  POST /api/ai/optimize      { code, language }              │
│  POST /api/ai/refactor      { code, language }              │
│                                                             │
│  GET  /api/chat/conversations                               │
│  POST /api/chat/conversations                               │
│  GET  /api/chat/conversations/:id                           │
│  POST /api/chat/messages                                    │
│  DELETE /api/chat/conversations/:id                         │
│                                                             │
│  GET  /api/projects                                         │
│  POST /api/projects                                         │
│  GET  /api/projects/:id                                     │
│  PUT  /api/projects/:id                                     │
│  DELETE /api/projects/:id                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVER LAYER                             │
│                 (Node.js + Express)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │    Middleware Stack                               │   │
│  │  - Authentication (JWT)                           │   │
│  │  - Rate Limiting                                  │   │
│  │  - Error Handling                                 │   │
│  │  - Input Validation                               │   │
│  │  - Logging                                        │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │    Route Handlers (Controllers)                    │   │
│  │  - authController                                 │   │
│  │  - aiController                                   │   │
│  │  - chatController                                 │   │
│  │  - projectController                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │    Business Logic (Services)                       │   │
│  │  - aiService (calls OpenAI API)                    │   │
│  │  - authService (token management)                 │   │
│  │  - emailService (notifications)                   │   │
│  │  - analyticsService (tracking)                    │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │     Users    │  │ Conversations│  │   Projects   │    │
│  │              │  │              │  │              │    │
│  │ - id         │  │ - id         │  │ - id         │    │
│  │ - email      │  │ - userId     │  │ - userId     │    │
│  │ - password   │  │ - messages[]│  │ - files[]    │    │
│  │ - apiKeys    │  │ - language  │  │ - tags       │    │
│  │ - settings   │  │ - isPublic  │  │ - isPublic   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ UsageStats   │  │   Files      │                        │
│  │              │  │              │                        │
│  │ - userId     │  │ - projectId  │                        │
│  │ - tokens     │  │ - name       │                        │
│  │ - requests   │  │ - language   │                        │
│  │ - date       │  │ - content    │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│  MongoDB Atlas / Supabase Database                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           OpenAI API                               │  │
│  │         4 requests/minute limit                    │  │
│  │  - gpt-3.5-turbo (default)                         │  │
│  │  - gpt-4 (premium)                                 │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           Monitoring Services                      │  │
│  │  - Sentry (error tracking)                         │  │
│  │  - Datadog (performance)                           │  │
│  │  - Mixpanel (analytics)                            │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           Infrastructure                           │  │
│  │  - Redis (caching)                                 │  │
│  │  - Bull (job queue)                                │  │
│  │  - S3 (file storage)                               │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### User Request Flow

```
1. USER INTERACTION
   └─> Click "Generate Code" → Input prompt → Click send

2. CLIENT PROCESSING
   └─> useAIHelper hook validates input
       └─> addMessage() to AIContext
       └─> Display user message in chat

3. API REQUEST
   └─> POST /api/ai/generate
       Headers: Authorization: Bearer {token}
       Body: {
         prompt: string,
         language: string,
         code?: string
       }

4. SERVER PROCESSING
   └─> authMiddleware validates JWT
   └─> rateLimitMiddleware checks limit
   └─> validationMiddleware checks input
   └─> aiController.generateCode()
       └─> aiService calls OpenAI API
           └─> Parse response
           └─> Save to chat history
           └─> Track token usage

5. RESPONSE
   └─> Return: {
         code: string,
         explanation: string,
         tokens: number,
         metadata: {}
       }

6. CLIENT UPDATE
   └─> addMessage() with AI response
   └─> Update UI with animated text
   └─> Display code with syntax highlighting

7. DATABASE UPDATE
   └─> Save message to MongoDB.conversations
   └─> Update usage stats
   └─> Clear cache for user
```

### Authentication Flow

```
1. USER REGISTRATION
   └─> POST /api/auth/signup
       └─> Hash password (bcrypt)
       └─> Create user document
       └─> Send verification email

2. EMAIL VERIFICATION
   └─> Click verification link
   └─> Verify token
   └─> Mark user as verified

3. LOGIN
   └─> POST /api/auth/login
       └─> Find user by email
       └─> Compare password with hash
       └─> Generate JWT token
       └─> Return token + user data

4. TOKEN STORAGE
   └─> Store JWT in secure httpOnly cookie
   └─> Store refresh token in DB

5. AUTHENTICATED REQUESTS
   └─> Authorization: Bearer {JWT}
       └─> Verify signature
       └─> Check expiration
       └─> Extract user ID
       └─> Proceed with request

6. TOKEN REFRESH
   └─> POST /api/auth/refresh
       └─> Verify refresh token
       └─> Generate new access token
       └─> Update cookie
```

---

## 🎯 Component Hierarchy

```
App
├── Navbar
├── BrowserRouter
│   └── Routes
│       ├── Route "/" → LandingPage
│       │   ├── Hero
│       │   ├── Features
│       │   ├── Testimonials
│       │   ├── Pricing
│       │   └── Footer
│       │
│       ├── Route "/auth" → AuthPage
│       │   ├── LoginForm
│       │   └── SignupForm
│       │
│       ├── Route "/helper" → AIHelperPage
│       │   ├── Sidebar
│       │   │   ├── NewChatButton
│       │   │   └── ConversationList
│       │   └── MainContent
│       │       ├── TopBar
│       │       ├── ChatArea
│       │       │   ├── MessageList
│       │       │   ├── Message (User)
│       │       │   └── Message (AI)
│       │       └── CodePanel
│       │           ├── ModeSelector
│       │           ├── LanguageSelector
│       │           ├── CodeEditor
│       │           └── InputArea
│       │
│       └── Route "/profile" → UserProfilePage
│           ├── ProfileHeader
│           ├── APIKeyManager
│           ├── Settings
│           └── UsageStats
│
├── AuthProvider
├── AIProvider
└── SubscriptionProvider
```

---

## 🔄 State Management Flow

```
GlobalState (Contexts)
│
├── AuthContext
│   ├── user: User | null
│   ├── session: AuthSession | null
│   ├── isAuthenticated: boolean
│   ├── login()
│   ├── signup()
│   └── logout()
│
├── AIContext
│   ├── conversations: Conversation[]
│   ├── currentConversation: Conversation | null
│   ├── projects: Project[]
│   ├── isLoading: boolean
│   ├── error: string | null
│   ├── addMessage()
│   ├── createConversation()
│   └── createProject()
│
└── SubscriptionContext
    ├── plan: 'free' | 'pro' | 'enterprise'
    ├── usage: UsageStats
    ├── isActive: boolean
    └── upgrade()

Local Component State (useState)
├── Code editor content
├── Chat messages (derived from context)
├── UI mode (generate/debug/etc)
├── Selected language
├── Form inputs
├── Loading states
└── UI toggles (sidebar, etc)
```

---

## 🚀 Performance Considerations

### Caching Strategy

```
Level 1: Browser Cache
├── LocalStorage
│   ├── Chat history (recent 100)
│   ├── User preferences
│   └── Theme setting
└── SessionStorage
    └── Temporary UI state

Level 2: Redis Cache (Server)
├── User profile (1 hour TTL)
├── Conversation list (5 min TTL)
├── Public projects (1 hour TTL)
└── API response cache (varies)

Level 3: Database Queries
├── Indexed fields
├── Aggregation pipelines
└── Connection pooling (10 connections)
```

### Request Optimization

```
Batching
├── Multiple AI requests → Queue (using Bull)
├── Database updates → Batch writes
└── Analytics events → Buffer

Pagination
├── Conversations: 20 per page
├── Projects: 15 per page
├── Chat messages: 50 per load
└── Search results: 30 per page

Code Splitting
├── Landing page (lazy loaded)
├── AI Helper (main bundle)
├── Admin panel (separate chunk)
└── Settings (lazy loaded)
```

---

## 🔐 Security Layers

```
1. Transport Security
   ├── HTTPS/TLS
   ├── Certificate pinning
   └── CORS policies

2. Authentication
   ├── JWT tokens (15 min expiry)
   ├── Refresh tokens (7 days)
   ├── Password hashing (bcrypt)
   └── MFA (optional)

3. Authorization
   ├── Role-based access control
   ├── Resource-level permissions
   └── API key scoping

4. Input Validation
   ├── Schema validation (Joi)
   ├── Type checking (TypeScript)
   ├── Sanitization (DOMPurify for UI)
   └── SQL injection prevention (parameterized queries)

5. Rate Limiting
   ├── IP-based: 100 req/min
   ├── User-based: 50 req/min (free tier)
   └── Auth endpoints: 5 attempts/15min

6. Data protection
   ├── Encryption at rest
   ├── Encryption in transit
   ├── API key encryption
   └── PII masking in logs
```

---

**Architecture designed for scalability, maintainability, and security. Ready for production deployment!** 🚀

