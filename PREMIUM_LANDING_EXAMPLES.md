# Premium Landing Page - Implementation Examples

## 🎨 Customization Examples

### 1. Change Color Scheme

#### Example: From Emerald/Cyan to Purple/Blue
```typescript
// In PremiumNavbar.tsx
// Before
className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500"

// After
className="w-8 h-8 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-500"
```

#### Update all components:
```typescript
// HeroSection.tsx - Button
from-emerald-500 to-cyan-400 → from-purple-500 to-blue-400

// StatsSection.tsx - Icons
from-emerald-500 to-cyan-500 → from-purple-500 to-blue-500

// MockAIChatUI.tsx - Send button
from-emerald-500 to-cyan-400 → from-purple-500 to-blue-400
```

### 2. Add a New Feature Card

```typescript
// In PremiumLandingPage.tsx - add to features array
{
  icon: Cpu,  // Import Cpu from lucide-react
  title: "Real-time Collaboration",
  desc: "Work with team members instantly with live code sharing.",
  color: "from-green-500 to-teal-500",
},
```

### 3. Add a New Testimonial

```typescript
// In PremiumLandingPage.tsx - add to testimonials array
{
  quote: "The best AI coding assistant I've used. Saved me days of work!",
  author: "Emily Rodriguez",
  role: "CTO at StartupXYZ",
  avatar: "ER",
},
```

### 4. Add a New Pricing Plan

```typescript
// In PremiumLandingPage.tsx - add to pricingPlans array
{
  name: "Team",
  price: 49,
  desc: "For development teams",
  popular: false,
  features: [
    "Everything in Pro",
    "Team workspace",
    "Advanced permissions",
    "Shared libraries",
    "Team analytics",
  ],
},
```

### 5. Change Hero Section Content

```typescript
// In HeroSection.tsx - update the text
// Hero Heading
<h1>Build Your Next App<br /><span>10x Faster</span></h1>

// Subtitle
<p>AI-powered development tools for modern teams...</p>

// Features List
{[
  "🚀 Type-safe code generation",
  "🔍 Instant bug detection",
  "⚡ Real-time suggestions",
]}

// CTA Text
Try It Today → Start Building Now
```

### 6. Customize Stats

```typescript
// In StatsSection.tsx - update stats
const stats: StatItem[] = [
  {
    icon: <Code2 className="w-6 h-6" />,
    value: 50000,  // Changed from 10000
    label: "Lines of Code Generated",
    suffix: "+",
    color: "from-emerald-500 to-cyan-500",
  },
  // ... more stats
];
```

### 7. Update Navigation Links

```typescript
// In PremiumNavbar.tsx
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },  // Changed from "Learn"
  { label: "IDE", href: "/ide" },    // Changed from "CodeHelper AI"
];

const resources = [
  { label: "GitHub", href: "https://github.com/..." },
  { label: "Twitter", href: "https://twitter.com/..." },
  { label: "Discord", href: "https://discord.gg/..." },
];
```

### 8. Modify "How It Works" Section

```typescript
// In PremiumLandingPage.tsx - replace the steps
{[
  {
    number: "01",
    title: "Connect Your Repo",
    description: "Link your GitHub repository in seconds.",
  },
  {
    number: "02",
    title: "AI Analyzes Your Code",
    description: "Our AI engine reviews and understands your codebase.",
  },
  {
    number: "03",
    title: "Get Instant Improvements",
    description: "Receive suggestions, fixes, and optimizations.",
  },
]}
```

### 9. Add Newsletter Signup to CTA Section

```typescript
// In PremiumLandingPage.tsx - update CTA section
<section>
  <div className="relative...">
    <h2>Stay Updated</h2>
    <p>Get tips and updates delivered to your inbox</p>
    
    <form className="flex gap-2 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="your@email.com"
        className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
      />
      <button className="px-6 py-2 rounded-lg bg-white text-gray-900 font-bold">
        Subscribe
      </button>
    </form>
  </div>
</section>
```

### 10. Add Dark/Light Mode Toggle (Optional)

```typescript
// In PremiumNavbar.tsx
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function PremiumNavbar() {
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <nav className={darkMode ? "bg-black" : "bg-white"}>
      {/* ... navbar content ... */}
      
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
}
```

## 🎬 Animation Examples

### 1. Slow Down All Animations (Accessibility)

```typescript
// Add to all duration props
transition={{ duration: 0.6 }}  → transition={{ duration: 1.2 }}
```

### 2. Add Parallax Effect

```typescript
import { useScroll, useTransform } from "framer-motion";

export function ParallaxSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  
  return (
    <motion.div style={{ y }}>
      {/* Content shifts as user scrolls */}
    </motion.div>
  );
}
```

### 3. Add Page Transition Animation

```typescript
// In PremiumLandingPage.tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Page content */}
</motion.div>
```

### 4. Add Scroll-Triggered Button Animation

```typescript
<motion.button
  whileInView={{ scale: 1.05 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  Click Me
</motion.button>
```

## 🔧 Advanced Customizations

### 1. Integration with Form Service (Formspree)

```typescript
// In PremiumLandingPage.tsx CTA section
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required />
  <button type="submit">Subscribe</button>
</form>
```

### 2. Add Google Analytics

```typescript
// In src/main.tsx
import { useEffect } from "react";

useEffect(() => {
  window.gtag = window.gtag || function() {
    (window.dataLayer = window.dataLayer || []).push(arguments);
  };
  gtag('config', 'GA_MEASUREMENT_ID');
}, []);
```

### 3. Add Live Chat Widget

```typescript
// In src/main.tsx
<script>
  window.dataLayer = window.dataLayer || [];
  // Add your chat widget script here
</script>
```

### 4. SEO Meta Tags

```tsx
// Create SEO component
function SEOHead() {
  return (
    <>
      <meta name="description" content="Master coding with AI..." />
      <meta name="og:title" content="CodeTutor - AI Code Assistant" />
      <meta name="og:description" content="..." />
      <meta name="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
```

## 📊 Performance Optimization

### 1. Lazy Load Components

```typescript
import { lazy, Suspense } from "react";

const StatsSection = lazy(() => import("./components/StatsSection"));
const PricingSection = lazy(() => import("./components/PricingSection"));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <StatsSection />
</Suspense>
```

### 2. Image Optimization

```typescript
// Replace placeholder images with optimized versions
<img 
  src="/images/feature.webp"  // Use WebP
  alt="Feature description"
  loading="lazy"  // Lazy load
  width="400"     // Specify dimensions
  height="300"
/>
```

### 3. Code Splitting

```typescript
// Split pricing section to separate bundle
const PricingPage = lazy(() => import("./sections/Pricing"));
```

## 🎯 A/B Testing Examples

### Test 1: CTA Button Text
```typescript
// Variant A
"Try For Free"

// Variant B
"Start Building Now"

// Track which converts better
```

### Test 2: Hero Layout
```typescript
// Variant A: Text on left, UI on right
// Variant B: Full-width text, UI below

// Track scroll depth and clicks
```

### Test 3: Testimonial Count
```typescript
// Variant A: 3 testimonials
// Variant B: 6 testimonials

// Track engagement
```

## 📱 Mobile-Specific Features

### Add Mobile-Only Navigation

```typescript
// In PremiumNavbar.tsx
<div className="hidden sm:flex">
  {/* Desktop navigation */}
</div>

<div className="flex sm:hidden">
  {/* Mobile navigation */}
</div>
```

### Add Mobile Tap Feedback

```typescript
<motion.button
  whileTap={{ scale: 0.95 }}
  className="active:bg-opacity-80"
>
  Tap Me
</motion.button>
```

## 🔐 Security Best Practices

### 1. Sanitize User Input

```typescript
import DOMPurify from "dompurify";

const cleanText = DOMPurify.sanitize(userInput);
```

### 2. Secure Environment Variables

```bash
# .env.local
VITE_API_URL=https://api.example.com
VITE_PUBLIC_KEY=pk_live_xxxxx
```

### 3. CSP Headers (in vercel.json)
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Content-Security-Policy",
      "value": "default-src 'self'"
    }]
  }]
}
```

---

**More Examples Available**: See PREMIUM_LANDING_PAGE_GUIDE.md for complete documentation
