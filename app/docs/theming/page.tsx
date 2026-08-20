'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast, useToast, ToastTheme } from 'react-toast-kit';

export default function ThemingPage() {
  const { theme, setTheme } = useToast();
  const [currentTheme, setCurrentTheme] = useState<ToastTheme>('system');

  // State for custom theme colors
  const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Default blue
  const [textColor, setTextColor] = useState('#ffffff'); // Default white
  const [borderRadius, setBorderRadius] = useState('0.375'); // Default rounded-md (0.375rem)

  // Apply system theme
  const applySystemTheme = () => {
    setTheme('system');
    toast.info('Using system theme preference');
  };

  // Apply light theme
  const applyLightTheme = () => {
    setTheme('light');
    toast.info('Light theme applied');
  };

  // Apply dark theme
  const applyDarkTheme = () => {
    setTheme('dark');
    toast.info('Dark theme applied');
  };

  // Show example toast with current theme
  const showThemeExample = () => {
    toast.success({
      title: 'Theme Example',
      description: `Current theme: ${theme}`,
    });
  };

  // Show custom styled toast
  const showCustomStyledToast = () => {
    toast({
      title: 'Custom Styling',
      description: 'This toast has custom styling applied',
      className: 'custom-toast-example',
      style: {
        background: primaryColor,
        color: textColor,
        borderRadius: `${borderRadius}rem`,
      },
    });
  };

  // Custom animation example
  const showCustomAnimationToast = (animation: 'slide' | 'fade' | 'bounce' | 'none') => {
    toast.info({
      title: `${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`,
      description: `This toast uses the ${animation} animation style`,
      animation: animation,
      position:
        animation === 'slide'
          ? 'top-right'
          : animation === 'fade'
            ? 'top-center'
            : animation === 'bounce'
              ? 'bottom-center'
              : 'bottom-right',
    });
  };

  // Demo toasts with different themes
  const showThemedToast = (toastTheme: ToastTheme) => {
    // First set the theme
    setTheme(toastTheme);
    setCurrentTheme(toastTheme);

    // Then show example toasts
    setTimeout(() => {
      toast.success({
        title: `${toastTheme.charAt(0).toUpperCase() + toastTheme.slice(1)} Theme`,
        description: `This toast uses the ${toastTheme} theme`,
      });
    }, 100);
  };

  // Show all variants with current theme
  const showAllVariants = () => {
    const variants = [
      { method: toast.success, title: 'Success' },
      { method: toast.error, title: 'Error' },
      { method: toast.warning, title: 'Warning' },
      { method: toast.info, title: 'Info' },
      { method: toast.loading, title: 'Loading' },
      { method: toast, title: 'Default' },
    ];

    variants.forEach((variant, index) => {
      setTimeout(() => {
        variant.method({
          title: variant.title,
          description: `${variant.title} notification in ${currentTheme} theme`,
        });
      }, index * 800);
    });
  };

  // Sample code for various theme implementations
  const providerThemeCode = `// Setting theme at the provider level
<ToastProvider
  defaultTheme="dark" // 'light', 'dark', or 'system'
>
  <App />
</ToastProvider>`;

  const dynamicThemeCode = `// Dynamic theme changes
import { useToast } from 'react-toast-kit';

function ThemeController() {
  const { setTheme } = useToast();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('system')}>System Preference</button>
    </div>
  );
}`;

  const individualToastCode = `// Per-toast theme override
toast.success({
  title: 'Success',
  description: 'This toast has a specific theme',
  theme: 'dark' // Override global theme for this toast
});`;

  const tailwindThemeCode = `// Tailwind configuration for dark mode
// tailwind.config.js
module.exports = {
  // ...
  darkMode: 'class', // Enable dark mode with class strategy
  // ...
}`;

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/docs"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Docs
        </Link>
        <span>/</span>
        <span>Theming</span>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Theming</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Customize toast notifications with different themes, styles, and animations.
        </p>
      </div>

      {/* Theme Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Theme Selector</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          React Toast Kit supports light, dark and system themes out of the box. Try them below:
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => showThemedToast('light')}
            className={`px-6 py-3 rounded-lg transition ${
              currentTheme === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Light Theme
          </button>

          <button
            onClick={() => showThemedToast('dark')}
            className={`px-6 py-3 rounded-lg transition ${
              currentTheme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            Dark Theme
          </button>

          <button
            onClick={() => showThemedToast('system')}
            className={`px-6 py-3 rounded-lg transition ${
              currentTheme === 'system'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            System Theme
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={showAllVariants}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition"
          >
            Show All Variants with {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}{' '}
            Theme
          </button>
        </div>
      </div>

      {/* Theme Implementation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Theme Implementation</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Provider-Level Theming</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Set the default theme for all toast notifications using the ToastProvider:
            </p>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{providerThemeCode}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Dynamic Theme Switching</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Change the theme based on user preference:
            </p>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{dynamicThemeCode}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Individual Toast Theme Override</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Override the global theme for specific toast notifications:
            </p>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{individualToastCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Tailwind Integration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Tailwind CSS Integration</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          React Toast Kit is built with Tailwind CSS and integrates seamlessly with your Tailwind
          setup.
        </p>

        <h3 className="text-lg font-semibold mb-2">Tailwind Dark Mode Configuration</h3>
        <p className="mb-3 text-gray-600 dark:text-gray-300">
          Ensure your Tailwind config is set up for dark mode:
        </p>
        <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
          <code className="text-sm">{tailwindThemeCode}</code>
        </pre>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
          <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Note:</h4>
          <p className="text-amber-700 dark:text-amber-400 text-sm">
            When using the system theme, React Toast Kit will automatically detect the user's
            preferred color scheme and apply it to toast notifications.
          </p>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Custom Styling</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          In addition to theme support, you can customize individual toast styles:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">CSS Classes</h3>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-full">
              <code className="text-sm">{`toast.success({
  title: 'Success',
  description: 'Custom styled toast',
  className: 'my-custom-toast-class'
});`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Inline Styles</h3>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-full">
              <code className="text-sm">{`toast.info({
  title: 'Info',
  description: 'Inline styled toast',
  style: { 
    borderLeft: '4px solid #3b82f6' 
  }
});`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Custom Component Example</h3>
        <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
          <code className="text-sm">{`toast.custom(
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className="text-white">
        <h3 className="font-bold">Custom Theme</h3>
        <p className="text-sm opacity-80">This is a fully customized toast component</p>
      </div>
    </div>
  </div>
);`}</code>
        </pre>

        <div className="mt-6">
          <button
            onClick={() => {
              toast.custom(
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="text-white">
                      <h3 className="font-bold">Custom Theme</h3>
                      <p className="text-sm opacity-80">
                        This is a fully customized toast component
                      </p>
                    </div>
                  </div>
                </div>
              );
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition"
          >
            Show Custom Component Toast
          </button>
        </div>
      </div>

      {/* Advanced Customization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Advanced Customization</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          For more advanced customization, React Toast Kit provides options for styling at different
          levels:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Container Styling</h3>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{`<ToastProvider
  containerClassName="my-container-class"
  topOffset={80} // Adjusts for header height
  bottomOffset={60} // Adjusts for footer height
>
  <App />
</ToastProvider>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Global Toast Styling</h3>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{`<ToastProvider
  toastClassName="my-global-toast-class"
>
  <App />
</ToastProvider>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">CSS Variables</h3>
            <p className="mb-3 text-gray-600 dark:text-gray-300">
              Add a class to an individual toast and override its design tokens from your global
              stylesheet:
            </p>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <code className="text-sm">{`toast.success({
  title: 'Branded toast',
  className: 'brand-toast',
});

/* Loaded after react-toast-kit/styles.css */
.react-toast.brand-toast {
  --rtk-accent: #7c3aed;
  --rtk-soft: rgb(124 58 237 / 14%);
  --rtk-surface: #ffffff;
  --rtk-text: #18181b;
  --rtk-muted: #71717a;
  --rtk-border: rgb(124 58 237 / 24%);
}

.react-toast.brand-toast[data-theme='dark'] {
  --rtk-surface: #18181b;
  --rtk-text: #fafafa;
  --rtk-muted: #a1a1aa;
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-8">
        <Link
          href="/docs/features"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Features
        </Link>
        <Link
          href="/docs/nextjs"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Next.js Integration
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
