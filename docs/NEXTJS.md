# Using React Toast Kit with Next.js

React Toast Kit is designed to work seamlessly with Next.js applications, supporting both the Pages Router and App Router architectures.

## Installation

```bash
npm install react-toast-kit
# or
yarn add react-toast-kit
# or
pnpm add react-toast-kit
```

## App Router (Next.js 13+)

For Next.js applications using the App Router, you need to use the `ClientToastProvider` component to ensure proper client-side rendering:

### Step 1: Create a client component for the toast provider

Create a file called `toast-provider.tsx` in your components directory:

```tsx
'use client';
import { ClientToastProvider } from 'react-toast-kit';
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientToastProvider
      // Your configuration options here
      defaultPosition="top-right"
      defaultDuration={4000}
      defaultTheme="system"
      // For sticky headers/footers
      topOffset={64}
      bottomOffset={16}
    >
      {children}
    </ClientToastProvider>
  );
}
```

### Step 2: Add the provider to your layout

In your root layout file:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/toast-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### Step 3: Use toast in client components

Create a client component to use the toast functionality:

```tsx
'use client';
import { toast } from 'react-toast-kit';

export default function MyClientComponent() {
  const handleClick = () => {
    toast.success('This is a success message!');
  };
  
  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}
```

### Step 4: Use the useToast hook in more complex components

For more control and access to theme settings:

```tsx
'use client';
import { useToast } from 'react-toast-kit';

export default function AdvancedClientComponent() {
  const { toast, theme, setTheme } = useToast();
  
  return (
    <div>
      <button onClick={() => toast.success('Success!')}>
        Show Success
      </button>
      
      <div>
        <span>Theme: {theme}</span>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('system')}>System</button>
      </div>
    </div>
  );
}
```

## Pages Router (Traditional Next.js)

For Next.js applications using the traditional Pages Router:

### Step 1: Add the provider to your App component

```tsx
// pages/_app.tsx
import { ToastProvider } from 'react-toast-kit';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider
      defaultPosition="top-right"
      defaultTheme="system"
    >
      <Component {...pageProps} />
    </ToastProvider>
  );
}
```

### Step 2: Use toast in your components

```tsx
import { toast } from 'react-toast-kit';

export default function HomePage() {
  return (
    <div>
      <button onClick={() => toast.success('Success message')}>
        Show Success Toast
      </button>
      <button onClick={() => toast.error('Error message')}>
        Show Error Toast
      </button>
    </div>
  );
}
```

## Advanced Usage with Next.js

### Working with Server Actions

When using Server Actions in Next.js App Router, you can't directly call toast functions in the server action. Instead, you should return a status or result from the server action and show the toast on the client side:

```tsx
'use client';
import { toast } from 'react-toast-kit';
import { saveData } from './actions'; // This is a Server Action

export default function ServerActionForm() {
  async function handleSubmit(formData: FormData) {
    const result = await saveData(formData);
    
    if (result.success) {
      toast.success(result.message || 'Successfully saved!');
    } else {
      toast.error(result.error || 'Failed to save data');
    }
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Intercepting Routes

For intercepting routes in Next.js App Router, you can set up toast notifications that persist between route changes:

```tsx
'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toast-kit';

export default function InterceptingRouteDemo() {
  const router = useRouter();
  
  const handleNavigate = () => {
    toast.info({
      title: 'Loading new page',
      description: 'Please wait...',
      duration: 5000, // Will persist during navigation
    });
    
    router.push('/new-page');
  };
  
  return <button onClick={handleNavigate}>Navigate with Toast</button>;
}
```

### Sticky Headers and Footers

Next.js applications often have sticky headers or navigation bars. React Toast Kit provides configuration options to ensure toasts don't overlap with your layout elements:

```tsx
'use client';
import { ClientToastProvider } from 'react-toast-kit';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientToastProvider
      // Adjust these values based on your header/footer heights
      topOffset={64}  // Height of your sticky header
      bottomOffset={48}  // Height of your sticky footer
      leftOffset={16}
      rightOffset={16}
    >
      {children}
    </ClientToastProvider>
  );
}
```

### Dark Mode Support

React Toast Kit integrates well with Next.js dark mode solutions:

```tsx
// 1. With next-themes
'use client';
import { ThemeProvider } from 'next-themes';
import { ClientToastProvider } from 'react-toast-kit';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <ClientToastProvider defaultTheme="system">
        {children}
      </ClientToastProvider>
    </ThemeProvider>
  );
}

// 2. With manual theme switching
'use client';
import { useState, useEffect } from 'react';
import { ClientToastProvider } from 'react-toast-kit';

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  useEffect(() => {
    // Apply theme class to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [theme]);
  
  return (
    <ClientToastProvider defaultTheme={theme}>
      {children}
      
      {/* Theme toggle controls */}
      <div className="fixed bottom-4 right-4">
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={() => setTheme('system')}>System</button>
      </div>
    </ClientToastProvider>
  );
}
```

## API Routes & Server Components

Remember that toast notifications are client-side only. For API routes or Server Components, you cannot directly call `toast` functions. Instead:

### For API Routes:

Return the appropriate responses and handle toast display on the client side.

### For Server Components in App Router:

Use a client component boundary to handle toast notifications.

```tsx
// ServerComponent.tsx
import ToastButton from './ToastButton'; // This is a client component

export default function ServerComponent() {
  return (
    <div>
      <h1>This is a server component</h1>
      <ToastButton /> {/* Client component that handles toast */}
    </div>
  );
}
```

```tsx
// ToastButton.tsx - client component
'use client';
import { toast } from 'react-toast-kit';

export default function ToastButton() {
  return (
    <button onClick={() => toast.success('Success')}>
      Show Toast
    </button>
  );
}
```

## Performance Optimization

### Static and Dynamic Rendering

React Toast Kit is designed to work efficiently with Next.js's static and dynamic rendering modes. For static pages, the toast functionality will hydrate correctly after the page loads on the client.

### Preloading Components

Consider preloading the toast components for better user experience:

```tsx
// app/layout.tsx
import { Suspense } from 'react';
import { ToastProvider } from '@/components/toast-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <ToastProvider>{children}</ToastProvider>
        </Suspense>
      </body>
    </html>
  );
}
```

## TypeScript Support

React Toast Kit is written in TypeScript and provides full type definitions. You can import types as needed:

```tsx
import { toast, type ToastOptions, type ToastPosition } from 'react-toast-kit';

// Example of using the types
const position: ToastPosition = 'bottom-center';
const options: ToastOptions = {
  title: "Hello TypeScript",
  position,
  duration: 5000
};

toast(options);
```

## Debugging

If you're experiencing issues with React Toast Kit in your Next.js application:

1. Ensure you're using `ClientToastProvider` with App Router
2. Check for React hydration errors in the console
3. Verify that toast calls are only happening in client components
4. Test with minimal configuration to isolate the issue

## Advanced Usage Examples

Check out the main [README.md](../README.md) file for more advanced usage examples and configuration options.