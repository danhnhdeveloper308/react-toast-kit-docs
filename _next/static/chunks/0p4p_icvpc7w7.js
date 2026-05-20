(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,54146,e=>{"use strict";var t=e.i(87243),s=e.i(58296),a=e.i(11735),r=e.i(68330);e.s(["default",0,function(){let{theme:e,setTheme:o}=(0,r.useToast)(),[l,i]=(0,s.useState)("system"),[d,n]=(0,s.useState)("#3b82f6"),[c,m]=(0,s.useState)("#ffffff"),[h,x]=(0,s.useState)("0.375"),g=e=>{o(e),i(e),setTimeout(()=>{r.toast.success({title:`${e.charAt(0).toUpperCase()+e.slice(1)} Theme`,description:`This toast uses the ${e} theme`})},100)},b=`// Setting theme at the provider level
<ToastProvider
  defaultTheme="dark" // 'light', 'dark', or 'system'
>
  <App />
</ToastProvider>`,u=`// Dynamic theme changes
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
}`,p=`// Per-toast theme override
toast.success({
  title: 'Success',
  description: 'This toast has a specific theme',
  theme: 'dark' // Override global theme for this toast
});`,f=`// Tailwind configuration for dark mode
// tailwind.config.js
module.exports = {
  // ...
  darkMode: 'class', // Enable dark mode with class strategy
  // ...
}`;return(0,t.jsxs)("div",{className:"max-w-3xl",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6",children:[(0,t.jsx)(a.default,{href:"/",className:"hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Home"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)(a.default,{href:"/docs",className:"hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Docs"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)("span",{children:"Theming"})]}),(0,t.jsxs)("div",{className:"mb-10",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold mb-2 text-gray-900 dark:text-white",children:"Theming"}),(0,t.jsx)("p",{className:"text-lg text-gray-600 dark:text-gray-300",children:"Customize toast notifications with different themes, styles, and animations."})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Theme Selector"}),(0,t.jsx)("p",{className:"mb-6 text-gray-600 dark:text-gray-300",children:"React Toast Kit supports light, dark and system themes out of the box. Try them below:"}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-4",children:[(0,t.jsx)("button",{onClick:()=>g("light"),className:`px-6 py-3 rounded-lg transition ${"light"===l?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`,children:"Light Theme"}),(0,t.jsx)("button",{onClick:()=>g("dark"),className:`px-6 py-3 rounded-lg transition ${"dark"===l?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`,children:"Dark Theme"}),(0,t.jsx)("button",{onClick:()=>g("system"),className:`px-6 py-3 rounded-lg transition ${"system"===l?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`,children:"System Theme"})]}),(0,t.jsx)("div",{className:"mt-6",children:(0,t.jsxs)("button",{onClick:()=>{[{method:r.toast.success,title:"Success"},{method:r.toast.error,title:"Error"},{method:r.toast.warning,title:"Warning"},{method:r.toast.info,title:"Info"},{method:r.toast.loading,title:"Loading"},{method:r.toast,title:"Default"}].forEach((e,t)=>{setTimeout(()=>{e.method({title:e.title,description:`${e.title} notification in ${l} theme`})},800*t)})},className:"w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition",children:["Show All Variants with ",l.charAt(0).toUpperCase()+l.slice(1)," Theme"]})})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Theme Implementation"}),(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Provider-Level Theming"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Set the default theme for all toast notifications using the ToastProvider:"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:b})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Dynamic Theme Switching"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Change the theme based on user preference:"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:u})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Individual Toast Theme Override"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Override the global theme for specific toast notifications:"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:p})})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Tailwind CSS Integration"}),(0,t.jsx)("p",{className:"mb-4 text-gray-600 dark:text-gray-300",children:"React Toast Kit is built with Tailwind CSS and integrates seamlessly with your Tailwind setup."}),(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Tailwind Dark Mode Configuration"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Ensure your Tailwind config is set up for dark mode:"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:f})}),(0,t.jsxs)("div",{className:"mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800",children:[(0,t.jsx)("h4",{className:"font-medium text-amber-800 dark:text-amber-300 mb-1",children:"Note:"}),(0,t.jsx)("p",{className:"text-amber-700 dark:text-amber-400 text-sm",children:"When using the system theme, React Toast Kit will automatically detect the user's preferred color scheme and apply it to toast notifications."})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Custom Styling"}),(0,t.jsx)("p",{className:"mb-4 text-gray-600 dark:text-gray-300",children:"In addition to theme support, you can customize individual toast styles:"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"CSS Classes"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-full",children:(0,t.jsx)("code",{className:"text-sm",children:`toast.success({
  title: 'Success',
  description: 'Custom styled toast',
  className: 'my-custom-toast-class'
});`})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Inline Styles"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-full",children:(0,t.jsx)("code",{className:"text-sm",children:`toast.info({
  title: 'Info',
  description: 'Inline styled toast',
  style: { 
    borderLeft: '4px solid #3b82f6' 
  }
});`})})]})]}),(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Custom Component Example"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:`toast.custom(
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className="text-white">
        <h3 className="font-bold">Custom Theme</h3>
        <p className="text-sm opacity-80">This is a fully customized toast component</p>
      </div>
    </div>
  </div>
);`})}),(0,t.jsx)("div",{className:"mt-6",children:(0,t.jsx)("button",{onClick:()=>{r.toast.custom((0,t.jsx)("div",{className:"bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg shadow-lg",children:(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsxs)("div",{className:"text-white",children:[(0,t.jsx)("h3",{className:"font-bold",children:"Custom Theme"}),(0,t.jsx)("p",{className:"text-sm opacity-80",children:"This is a fully customized toast component"})]})})}))},className:"w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition",children:"Show Custom Component Toast"})})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Advanced Customization"}),(0,t.jsx)("p",{className:"mb-4 text-gray-600 dark:text-gray-300",children:"For more advanced customization, React Toast Kit provides options for styling at different levels:"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Container Styling"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:`<ToastProvider
  containerClassName="my-container-class"
  topOffset={80} // Adjusts for header height
  bottomOffset={60} // Adjusts for footer height
>
  <App />
</ToastProvider>`})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Global Toast Styling"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:`<ToastProvider
  toastClassName="my-global-toast-class"
>
  <App />
</ToastProvider>`})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"CSS Variables"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"You can also override the default styles using CSS variables in your global stylesheet:"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-sm",children:`/* In your global CSS file */
:root {
  --toast-bg-success: #10b981;
  --toast-bg-error: #ef4444;
  --toast-bg-warning: #f59e0b;
  --toast-bg-info: #3b82f6;
  --toast-text-color: white;
  --toast-border-radius: 0.5rem;
  --toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Dark mode overrides */
.dark {
  --toast-bg-success: #059669;
  --toast-bg-error: #dc2626;
  --toast-bg-warning: #d97706;
  --toast-bg-info: #2563eb;
}`})})]})]})]}),(0,t.jsxs)("div",{className:"flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-8",children:[(0,t.jsxs)(a.default,{href:"/docs/features",className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:[(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 19l-7-7 7-7"})}),"Features"]}),(0,t.jsxs)(a.default,{href:"/docs/nextjs",className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:["Next.js Integration",(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5l7 7-7 7"})})]})]})]})}])}]);