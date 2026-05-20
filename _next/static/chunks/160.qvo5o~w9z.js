(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40601,e=>{"use strict";var t=e.i(87243),s=e.i(58296),r=e.i(11735),a=e.i(68330);e.s(["default",0,function(){let[e,i]=(0,s.useState)({name:"",email:""}),o=async()=>{try{let e=await a.toast.promise(new Promise((e,t)=>{setTimeout(()=>{Math.random()>.3?e({status:"success",message:"Operation completed successfully"}):t(Error("Operation failed"))},2e3)}),{loading:{title:"Processing",description:"Your request is being processed..."},success:e=>({title:"Success",description:e.message}),error:e=>({title:"Error",description:e instanceof Error?e.message:"Something went wrong"})});console.log("Operation result:",e)}catch(e){console.error("Error caught:",e)}},n=e=>{let s={success:{variant:"success",title:"Success",description:"Operation completed successfully",icon:(0,t.jsx)("span",{role:"img","aria-label":"success",children:"✓"})},warning:{variant:"warning",title:"Warning",description:"Proceed with caution",icon:(0,t.jsx)("span",{role:"img","aria-label":"warning",children:"⚠️"})},error:{variant:"error",title:"Error",description:"Something went wrong",icon:(0,t.jsx)("span",{role:"img","aria-label":"error",children:"✗"})}};(0,a.toast)(s[e])},l=`// Form submission pattern with toast
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  if (!isValid) {
    toast.error({
      title: 'Validation Error',
      description: 'Please check your inputs'
    });
    return;
  }
  
  // Show loading state
  const loadingId = toast.loading({
    title: 'Submitting',
    description: 'Processing your request...'
  });
  
  try {
    // Call API
    const response = await submitFormData(formData);
    
    // Update toast on success
    toast.update(loadingId, {
      variant: 'success',
      title: 'Success',
      description: 'Your form was submitted successfully',
      duration: 3000
    });
    
    // Reset form
    resetForm();
  } catch (error) {
    // Update toast on error
    toast.update(loadingId, {
      variant: 'error',
      title: 'Error',
      description: error.message || 'Something went wrong',
      duration: 5000
    });
  }
};`,d=`// Promise-based toast pattern
const fetchData = async () => {
  try {
    const result = await toast.promise(
      // Your async operation
      api.fetchUserData(userId),
      // Toast configurations for each state
      {
        loading: {
          title: 'Loading',
          description: 'Fetching user data...'
        },
        success: (data) => ({
          title: 'Success',
          description: \`Loaded profile for \${data.name}\`
        }),
        error: (err) => ({
          title: 'Error',
          description: err.message
        })
      }
    );
    
    // Work with the result
    setUserData(result);
  } catch (error) {
    // Additional error handling if needed
    console.error(error);
  }
};`,c=`// Multi-step toast pattern
const startProcess = () => {
  // Create initial toast
  const id = toast.loading({
    title: 'Step 1/3',
    description: 'Initializing process...'
  });
  
  // Update for each step
  processStep1()
    .then(() => {
      toast.update(id, {
        title: 'Step 2/3',
        description: 'Processing data...'
      });
      return processStep2();
    })
    .then(() => {
      toast.update(id, {
        title: 'Step 3/3',
        description: 'Finalizing...'
      });
      return processStep3();
    })
    .then(() => {
      toast.update(id, {
        variant: 'success',
        title: 'Complete',
        description: 'All steps completed successfully',
        duration: 3000
      });
    })
    .catch((error) => {
      toast.update(id, {
        variant: 'error',
        title: 'Process Failed',
        description: error.message,
        duration: 3000
      });
    });
};`,m=`// Custom interactive component pattern
const notifyUser = (userId, message) => {
  toast.custom(
    <div className="p-4 bg-blue-600 rounded-lg">
      <h3 className="font-medium text-white">{message.title}</h3>
      <p className="text-blue-100 text-sm">{message.content}</p>
      <div className="mt-3 flex space-x-2">
        <button 
          className="px-3 py-1 bg-white text-blue-600 rounded"
          onClick={() => {
            toast.dismiss();
            navigateToChat(userId);
          }}
        >
          Reply
        </button>
        <button 
          className="px-3 py-1 bg-transparent border border-white text-white rounded"
          onClick={() => toast.dismiss()}
        >
          Dismiss
        </button>
      </div>
    </div>,
    {
      duration: 0, // No auto-dismiss
      position: 'bottom-right'
    }
  );
};`;return(0,t.jsxs)("div",{className:"max-w-3xl",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6",children:[(0,t.jsx)(r.default,{href:"/",className:"hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Home"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)(r.default,{href:"/docs",className:"hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Docs"}),(0,t.jsx)("span",{children:"/"}),(0,t.jsx)("span",{children:"Patterns"})]}),(0,t.jsxs)("div",{className:"mb-10",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold mb-2 text-gray-900 dark:text-white",children:"Patterns"}),(0,t.jsx)("p",{className:"text-lg text-gray-600 dark:text-gray-300",children:"Common patterns and best practices for using toast notifications effectively."})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Form Submission Pattern"}),(0,t.jsx)("p",{className:"mb-6 text-gray-600 dark:text-gray-300",children:"Using toast notifications to provide feedback during form submissions is one of the most common patterns."}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Live Example"}),(0,t.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),!e.name||!e.email)return void a.toast.error({title:"Validation Error",description:"Please fill in all fields"});let s=a.toast.loading({title:"Submitting",description:"Processing your information..."});setTimeout(()=>{a.toast.update(s,{variant:"success",title:"Success",description:"Your information has been submitted",duration:3e3}),i({name:"",email:""})},2e3)},className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium mb-1",children:"Name"}),(0,t.jsx)("input",{type:"text",value:e.name,onChange:t=>i({...e,name:t.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700",placeholder:"Enter your name"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium mb-1",children:"Email"}),(0,t.jsx)("input",{type:"email",value:e.email,onChange:t=>i({...e,email:t.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700",placeholder:"Enter your email"})]}),(0,t.jsx)("button",{type:"submit",className:"w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition",children:"Submit Form"})]}),(0,t.jsx)("div",{className:"mt-4 text-sm text-gray-500 dark:text-gray-400",children:(0,t.jsx)("p",{children:"Try submitting the form with empty fields to see validation toast."})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Implementation"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64",children:(0,t.jsx)("code",{className:"text-xs",children:l})})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Promise-based Pattern"}),(0,t.jsxs)("p",{className:"mb-6 text-gray-600 dark:text-gray-300",children:["Using ",(0,t.jsx)("code",{className:"text-sm bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded",children:"toast.promise()"})," to handle async operations elegantly."]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Live Example"}),(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("button",{onClick:o,className:"w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition",children:"Start Async Operation"})}),(0,t.jsxs)("div",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg",children:[(0,t.jsx)("h4",{className:"font-medium mb-2",children:"How it works:"}),(0,t.jsxs)("ol",{className:"list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400",children:[(0,t.jsx)("li",{children:"Click the button to start an async operation"}),(0,t.jsx)("li",{children:"A loading toast appears immediately"}),(0,t.jsx)("li",{children:"When the promise resolves or rejects (randomly in this demo), the toast updates accordingly"}),(0,t.jsx)("li",{children:"The promise result is still available to use in your code"})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Implementation"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64",children:(0,t.jsx)("code",{className:"text-xs",children:d})})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Multi-step Process Pattern"}),(0,t.jsx)("p",{className:"mb-6 text-gray-600 dark:text-gray-300",children:"Using toast updates to show progress through a multi-step operation."}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Live Example"}),(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("button",{onClick:()=>{let e=a.toast.loading({title:"Starting Process",description:"Step 1 of 4: Initializing..."});setTimeout(()=>{a.toast.update(e,{title:"Processing",description:"Step 2 of 4: Processing data..."})},2e3),setTimeout(()=>{a.toast.update(e,{title:"Almost Done",description:"Step 3 of 4: Finalizing..."})},4e3),setTimeout(()=>{a.toast.update(e,{variant:"success",title:"Complete",description:"Step 4 of 4: Process completed successfully!",duration:3e3})},6e3)},className:"w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded transition",children:"Start Multi-step Process"})}),(0,t.jsxs)("div",{className:"mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800",children:[(0,t.jsx)("h4",{className:"font-medium text-green-800 dark:text-green-300 mb-1",children:"Tip:"}),(0,t.jsx)("p",{className:"text-green-700 dark:text-green-400 text-sm",children:"This pattern is great for complex operations like file uploads, multi-stage form submissions, or wizard-like processes where you want to keep the user informed without blocking the UI."})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Implementation"}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto h-64",children:(0,t.jsx)("code",{className:"text-xs",children:c})})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"More Usage Patterns"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Sequential Toasts"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Show multiple toasts in sequence to guide users through a process."}),(0,t.jsx)("button",{onClick:()=>{a.toast.info({title:"Sequential Toast 1",description:"This is the first toast",duration:3e3}),setTimeout(()=>{a.toast.info({title:"Sequential Toast 2",description:"This is the second toast",duration:3e3})},1e3),setTimeout(()=>{a.toast.success({title:"Sequential Toast 3",description:"All toasts have been displayed!",duration:3e3})},2e3)},className:"w-full p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition",children:"Show Sequential Toasts"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Conditional Toast Variations"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Use different toast types based on conditions."}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)("button",{onClick:()=>n("success"),className:"flex-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded transition",children:"Success"}),(0,t.jsx)("button",{onClick:()=>n("warning"),className:"flex-1 p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition",children:"Warning"}),(0,t.jsx)("button",{onClick:()=>n("error"),className:"flex-1 p-2 bg-red-600 hover:bg-red-700 text-white rounded transition",children:"Error"})]})]})]}),(0,t.jsxs)("div",{className:"mt-8",children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-3",children:"Interactive Component Pattern"}),(0,t.jsx)("p",{className:"mb-3 text-gray-600 dark:text-gray-300",children:"Create rich, interactive notifications with custom components."}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsx)("div",{children:(0,t.jsx)("button",{onClick:()=>{a.toast.custom((0,t.jsxs)("div",{className:"p-4 bg-indigo-600 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)("div",{className:"mr-3 text-white text-xl font-bold",children:"📨"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium text-white",children:"New Message"}),(0,t.jsx)("p",{className:"text-indigo-100 text-sm",children:"You have a new message from John"})]})]}),(0,t.jsxs)("div",{className:"mt-3 flex space-x-2",children:[(0,t.jsx)("button",{className:"px-3 py-1 bg-white text-indigo-600 rounded hover:bg-indigo-50 text-sm",onClick:()=>{a.toast.dismiss(),a.toast.info("Opening messages...")},children:"Read now"}),(0,t.jsx)("button",{className:"px-3 py-1 bg-transparent border border-white text-white rounded hover:bg-indigo-500 text-sm",onClick:()=>a.toast.dismiss(),children:"Later"})]})]}),{duration:0,position:"bottom-right"})},className:"w-full p-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded transition",children:"Show Interactive Notification"})}),(0,t.jsx)("pre",{className:"p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto",children:(0,t.jsx)("code",{className:"text-xs",children:m})})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Toast Notification Best Practices"}),(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Keep It Brief"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Toast notifications should be concise and focused on a single piece of information. Use clear, actionable language."})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Use Appropriate Variants"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Match the toast variant to the message type: success for confirmations, error for problems, warning for cautions, and info for general updates."})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Consider Duration"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Adjust duration based on importance and content length. Critical errors might need longer display times, while simple confirmations can be brief."})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Avoid Toast Overload"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Don't spam users with too many notifications. Group related messages when possible and prioritize important information."})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Accessible Notifications"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Ensure your toasts are accessible to all users, including those using screen readers. React Toast Kit handles this automatically with proper ARIA attributes."})]})]})]}),(0,t.jsxs)("div",{className:"flex justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-8",children:[(0,t.jsxs)(r.default,{href:"/docs/accessibility",className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:[(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 19l-7-7 7-7"})}),"Accessibility"]}),(0,t.jsxs)(r.default,{href:"/docs",className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:["Back to docs",(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5l7 7-7 7"})})]})]})]})}])}]);