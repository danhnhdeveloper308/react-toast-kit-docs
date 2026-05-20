(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68330,t=>{"use strict";let e,i,r,s;var a,o,n,l,u,d,c=t.i(17978),h=t.i(58296),p=t.i(87243),m=t.i(98055);let f=()=>{},g=()=>{};function y(t,e){-1===t.indexOf(e)&&t.push(e)}function v(t,e){let i=t.indexOf(e);i>-1&&t.splice(i,1)}class x{constructor(){this.subscriptions=[]}add(t){return y(this.subscriptions,t),()=>v(this.subscriptions,t)}notify(t,e,i){let r=this.subscriptions.length;if(r)if(1===r)this.subscriptions[0](t,e,i);else for(let s=0;s<r;s++){let r=this.subscriptions[s];r&&r(t,e,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}let b={},w=t=>t,k=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function T(t,e){let i=!1,r=!0,s={delta:0,timestamp:0,isProcessing:!1},a=()=>i=!0,o=k.reduce((t,i)=>(t[i]=function(t,e){let i=new Set,r=new Set,s=!1,a=!1,o=new WeakSet,n={delta:0,timestamp:0,isProcessing:!1},l=0;function u(e){o.has(e)&&(d.schedule(e),t()),l++,e(n)}let d={schedule:(t,e=!1,a=!1)=>{let n=a&&s?i:r;return e&&o.add(t),n.has(t)||n.add(t),t},cancel:t=>{r.delete(t),o.delete(t)},process:t=>{if(n=t,s){a=!0;return}s=!0,[i,r]=[r,i],i.forEach(u),e,l=0,i.clear(),s=!1,a&&(a=!1,d.process(t))}};return d}(a,e?i:void 0),t),{}),{setup:n,read:l,resolveKeyframes:u,preUpdate:d,update:c,preRender:h,render:p,postRender:m}=o,f=()=>{let a=b.useManualTiming?s.timestamp:performance.now();i=!1,b.useManualTiming||(s.delta=r?1e3/60:Math.max(Math.min(a-s.timestamp,40),1)),s.timestamp=a,s.isProcessing=!0,n.process(s),l.process(s),u.process(s),d.process(s),c.process(s),h.process(s),p.process(s),m.process(s),s.isProcessing=!1,i&&e&&(r=!1,t(f))};return{schedule:k.reduce((e,a)=>{let n=o[a];return e[a]=(e,a=!1,o=!1)=>(!i&&(i=!0,r=!0,s.isProcessing||t(f)),n.schedule(e,a,o)),e},{}),cancel:t=>{for(let e=0;e<k.length;e++)o[k[e]].cancel(t)},state:s,steps:o}}let{schedule:S,cancel:P,state:j,steps:C}=T("u">typeof requestAnimationFrame?requestAnimationFrame:w,!0);function A(){e=void 0}let M={now:()=>(void 0===e&&M.set(j.isProcessing||b.useManualTiming?j.timestamp:performance.now()),e),set:t=>{e=t,queueMicrotask(A)}},E;class D{constructor(t,e={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=(t,e=!0)=>{let i=M.now();if(this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(t),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let t of this.dependents)t.dirty();e&&this.events.renderRequest?.notify(this.current)},this.hasAnimated=!1,this.setCurrent(t),this.owner=e.owner}setCurrent(t){this.current=t,this.updatedAt=M.now(),null===this.canTrackVelocity&&void 0!==t&&(this.canTrackVelocity=!isNaN(parseFloat(this.current)))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,e){this.events[t]||(this.events[t]=new x);let i=this.events[t].add(e);return"change"===t?()=>{i(),S.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(let t in this.events)this.events[t].clear()}attach(t,e){this.passiveEffect=t,this.stopPassiveEffect=e}set(t,e=!0){e&&this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t,e)}setWithVelocity(t,e,i){this.set(e),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-i}jump(t,e=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,e&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return E&&E.push(this),this.current}getPrevious(){return this.prev}getVelocity(){var t;let e=M.now();if(!this.canTrackVelocity||void 0===this.prevFrameValue||e-this.updatedAt>30)return 0;let i=Math.min(this.updatedAt-this.prevUpdatedAt,30);return t=parseFloat(this.current)-parseFloat(this.prevFrameValue),i?1e3/i*t:0}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.animation=t(e),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function V(t,e){return new D(t,e)}let R=t=>Array.isArray(t);function B(t){let e=[{},{}];return t?.values.forEach((t,i)=>{e[0][i]=t.get(),e[1][i]=t.getVelocity()}),e}function L(t,e,i,r){if("function"==typeof e){let[s,a]=B(r);e=e(void 0!==i?i:t.custom,s,a)}if("string"==typeof e&&(e=t.variants&&t.variants[e]),"function"==typeof e){let[s,a]=B(r);e=e(void 0!==i?i:t.custom,s,a)}return e}function O(t,e,i){let r=t.getProps();return L(r,e,void 0!==i?i:r.custom,t)}function F(t,e){let{transitionEnd:i={},transition:r={},...s}=O(t,e)||{};for(let e in s={...s,...i}){var a;let i=R(a=s[e])?a[a.length-1]||0:a;t.hasValue(e)?t.getValue(e).set(i):t.addValue(e,V(i))}}function I(t,e){return t?.[e]??t?.default??t}let N=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],z=new Set(N),$=new Set(["width","height","top","left","right","bottom",...N]),U=t=>!!(t&&t.getVelocity);function W(t,e){let i=t.getValue("willChange");if(U(i)&&i.add)return i.add(e);if(!i&&b.WillChange){let i=new b.WillChange("auto");t.addValue("willChange",i),i.add(e)}}let H=t=>t.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),Y="data-"+H("framerAppearId"),X=(t,e)=>i=>e(t(i)),G=(...t)=>t.reduce(X),K=(t,e,i)=>i>e?e:i<t?t:i,q=t=>1e3*t,Z={layout:0,mainThread:0,waapi:0},_=t=>e=>"string"==typeof e&&e.startsWith(t),Q=_("--"),J=_("var(--"),tt=t=>!!J(t)&&te.test(t.split("/*")[0].trim()),te=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,ti={test:t=>"number"==typeof t,parse:parseFloat,transform:t=>t},tr={...ti,transform:t=>K(0,1,t)},ts={...ti,default:1},ta=t=>Math.round(1e5*t)/1e5,to=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu,tn=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,tl=(t,e)=>i=>!!("string"==typeof i&&tn.test(i)&&i.startsWith(t)||e&&null!=i&&Object.prototype.hasOwnProperty.call(i,e)),tu=(t,e,i)=>r=>{if("string"!=typeof r)return r;let[s,a,o,n]=r.match(to);return{[t]:parseFloat(s),[e]:parseFloat(a),[i]:parseFloat(o),alpha:void 0!==n?parseFloat(n):1}},td={...ti,transform:t=>Math.round(K(0,255,t))},tc={test:tl("rgb","red"),parse:tu("red","green","blue"),transform:({red:t,green:e,blue:i,alpha:r=1})=>"rgba("+td.transform(t)+", "+td.transform(e)+", "+td.transform(i)+", "+ta(tr.transform(r))+")"},th={test:tl("#"),parse:function(t){let e="",i="",r="",s="";return t.length>5?(e=t.substring(1,3),i=t.substring(3,5),r=t.substring(5,7),s=t.substring(7,9)):(e=t.substring(1,2),i=t.substring(2,3),r=t.substring(3,4),s=t.substring(4,5),e+=e,i+=i,r+=r,s+=s),{red:parseInt(e,16),green:parseInt(i,16),blue:parseInt(r,16),alpha:s?parseInt(s,16)/255:1}},transform:tc.transform},tp=t=>({test:e=>"string"==typeof e&&e.endsWith(t)&&1===e.split(" ").length,parse:parseFloat,transform:e=>`${e}${t}`}),tm=tp("deg"),tf=tp("%"),tg=tp("px"),ty=tp("vh"),tv=tp("vw"),tx={...tf,parse:t=>tf.parse(t)/100,transform:t=>tf.transform(100*t)},tb={test:tl("hsl","hue"),parse:tu("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:i,alpha:r=1})=>"hsla("+Math.round(t)+", "+tf.transform(ta(e))+", "+tf.transform(ta(i))+", "+ta(tr.transform(r))+")"},tw={test:t=>tc.test(t)||th.test(t)||tb.test(t),parse:t=>tc.test(t)?tc.parse(t):tb.test(t)?tb.parse(t):th.parse(t),transform:t=>"string"==typeof t?t:t.hasOwnProperty("red")?tc.transform(t):tb.transform(t)},tk=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,tT="number",tS="color",tP=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function tj(t){let e=t.toString(),i=[],r={color:[],number:[],var:[]},s=[],a=0,o=e.replace(tP,t=>(tw.test(t)?(r.color.push(a),s.push(tS),i.push(tw.parse(t))):t.startsWith("var(")?(r.var.push(a),s.push("var"),i.push(t)):(r.number.push(a),s.push(tT),i.push(parseFloat(t))),++a,"${}")).split("${}");return{values:i,split:o,indexes:r,types:s}}function tC(t){return tj(t).values}function tA(t){let{split:e,types:i}=tj(t),r=e.length;return t=>{let s="";for(let a=0;a<r;a++)if(s+=e[a],void 0!==t[a]){let e=i[a];e===tT?s+=ta(t[a]):e===tS?s+=tw.transform(t[a]):s+=t[a]}return s}}let tM=t=>"number"==typeof t?0:t,tE={test:function(t){return isNaN(t)&&"string"==typeof t&&(t.match(to)?.length||0)+(t.match(tk)?.length||0)>0},parse:tC,createTransformer:tA,getAnimatableNone:function(t){let e=tC(t);return tA(t)(e.map(tM))}};function tD(t,e,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?t+(e-t)*6*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function tV(t,e){return i=>i>0?e:t}let tR=(t,e,i)=>t+(e-t)*i,tB=(t,e,i)=>{let r=t*t,s=i*(e*e-r)+r;return s<0?0:Math.sqrt(s)},tL=[th,tc,tb];function tO(t){let e=tL.find(e=>e.test(t));if(f(!!e,`'${t}' is not an animatable color. Use the equivalent color code instead.`),!e)return!1;let i=e.parse(t);return e===tb&&(i=function({hue:t,saturation:e,lightness:i,alpha:r}){t/=360,i/=100;let s=0,a=0,o=0;if(e/=100){let r=i<.5?i*(1+e):i+e-i*e,n=2*i-r;s=tD(n,r,t+1/3),a=tD(n,r,t),o=tD(n,r,t-1/3)}else s=a=o=i;return{red:Math.round(255*s),green:Math.round(255*a),blue:Math.round(255*o),alpha:r}}(i)),i}let tF=(t,e)=>{let i=tO(t),r=tO(e);if(!i||!r)return tV(t,e);let s={...i};return t=>(s.red=tB(i.red,r.red,t),s.green=tB(i.green,r.green,t),s.blue=tB(i.blue,r.blue,t),s.alpha=tR(i.alpha,r.alpha,t),tc.transform(s))},tI=new Set(["none","hidden"]);function tN(t,e){return i=>tR(t,e,i)}function tz(t){return"number"==typeof t?tN:"string"==typeof t?tt(t)?tV:tw.test(t)?tF:tW:Array.isArray(t)?t$:"object"==typeof t?tw.test(t)?tF:tU:tV}function t$(t,e){let i=[...t],r=i.length,s=t.map((t,i)=>tz(t)(t,e[i]));return t=>{for(let e=0;e<r;e++)i[e]=s[e](t);return i}}function tU(t,e){let i={...t,...e},r={};for(let s in i)void 0!==t[s]&&void 0!==e[s]&&(r[s]=tz(t[s])(t[s],e[s]));return t=>{for(let e in r)i[e]=r[e](t);return i}}let tW=(t,e)=>{let i=tE.createTransformer(e),r=tj(t),s=tj(e);if(!(r.indexes.var.length===s.indexes.var.length&&r.indexes.color.length===s.indexes.color.length&&r.indexes.number.length>=s.indexes.number.length))return f(!0,`Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),tV(t,e);if(tI.has(t)&&!s.values.length||tI.has(e)&&!r.values.length)return tI.has(t)?i=>i<=0?t:e:i=>i>=1?e:t;return G(t$(function(t,e){let i=[],r={color:0,var:0,number:0};for(let s=0;s<e.values.length;s++){let a=e.types[s],o=t.indexes[a][r[a]],n=t.values[o]??0;i[s]=n,r[a]++}return i}(r,s),s.values),i)};function tH(t,e,i){return"number"==typeof t&&"number"==typeof e&&"number"==typeof i?tR(t,e,i):tz(t)(t,e)}let tY=t=>{let e=({timestamp:e})=>t(e);return{start:(t=!0)=>S.update(e,t),stop:()=>P(e),now:()=>j.isProcessing?j.timestamp:M.now()}},tX=(t,e,i=10)=>{let r="",s=Math.max(Math.round(e/i),2);for(let e=0;e<s;e++)r+=t(e/(s-1))+", ";return`linear(${r.substring(0,r.length-2)})`};function tG(t){let e=0,i=t.next(e);for(;!i.done&&e<2e4;)e+=50,i=t.next(e);return e>=2e4?1/0:e}function tK(t,e,i){var r,s;let a=Math.max(e-5,0);return r=i-t(a),(s=e-a)?1e3/s*r:0}let tq=.01,tZ=2,t_=.005,tQ=.5;function tJ(t,e){return t*Math.sqrt(1-e*e)}let t0=["duration","bounce"],t5=["stiffness","damping","mass"];function t2(t,e){return e.some(e=>void 0!==t[e])}function t1(t=.3,e=.3){let i,r="object"!=typeof t?{visualDuration:t,keyframes:[0,1],bounce:e}:t,{restSpeed:s,restDelta:a}=r,o=r.keyframes[0],n=r.keyframes[r.keyframes.length-1],l={done:!1,value:o},{stiffness:u,damping:d,mass:c,duration:h,velocity:p,isResolvedFromDuration:m}=function(t){let e={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...t};if(!t2(t,t5)&&t2(t,t0))if(t.visualDuration){let i=2*Math.PI/(1.2*t.visualDuration),r=i*i,s=2*K(.05,1,1-(t.bounce||0))*Math.sqrt(r);e={...e,mass:1,stiffness:r,damping:s}}else{let i=function({duration:t=800,bounce:e=.3,velocity:i=0,mass:r=1}){let s,a;f(t<=q(10),"Spring duration must be 10 seconds or less");let o=1-e;o=K(.05,1,o),t=K(.01,10,t/1e3),o<1?(s=e=>{let r=e*o,s=r*t;return .001-(r-i)/tJ(e,o)*Math.exp(-s)},a=e=>{let r=e*o*t,a=Math.pow(o,2)*Math.pow(e,2)*t,n=Math.exp(-r),l=tJ(Math.pow(e,2),o);return(r*i+i-a)*n*(-s(e)+.001>0?-1:1)/l}):(s=e=>-.001+Math.exp(-e*t)*((e-i)*t+1),a=e=>t*t*(i-e)*Math.exp(-e*t));let n=function(t,e,i){let r=i;for(let i=1;i<12;i++)r-=t(r)/e(r);return r}(s,a,5/t);if(t=q(t),isNaN(n))return{stiffness:100,damping:10,duration:t};{let e=Math.pow(n,2)*r;return{stiffness:e,damping:2*o*Math.sqrt(r*e),duration:t}}}(t);(e={...e,...i,mass:1}).isResolvedFromDuration=!0}return e}({...r,velocity:-((r.velocity||0)/1e3)}),g=p||0,y=d/(2*Math.sqrt(u*c)),v=n-o,x=Math.sqrt(u/c)/1e3,b=5>Math.abs(v);if(s||(s=b?tq:tZ),a||(a=b?t_:tQ),y<1){let t=tJ(x,y);i=e=>n-Math.exp(-y*x*e)*((g+y*x*v)/t*Math.sin(t*e)+v*Math.cos(t*e))}else if(1===y)i=t=>n-Math.exp(-x*t)*(v+(g+x*v)*t);else{let t=x*Math.sqrt(y*y-1);i=e=>{let i=Math.exp(-y*x*e),r=Math.min(t*e,300);return n-i*((g+y*x*v)*Math.sinh(r)+t*v*Math.cosh(r))/t}}let w={calculatedDuration:m&&h||null,next:t=>{let e=i(t);if(m)l.done=t>=h;else{let r=0===t?g:0;y<1&&(r=0===t?q(g):tK(i,t,e));let o=Math.abs(n-e)<=a;l.done=Math.abs(r)<=s&&o}return l.value=l.done?n:e,l},toString:()=>{let t=Math.min(tG(w),2e4),e=tX(e=>w.next(t*e).value,t,30);return t+"ms "+e},toTransition:()=>{}};return w}function t3({keyframes:t,velocity:e=0,power:i=.8,timeConstant:r=325,bounceDamping:s=10,bounceStiffness:a=500,modifyTarget:o,min:n,max:l,restDelta:u=.5,restSpeed:d}){let c,h,p=t[0],m={done:!1,value:p},f=i*e,g=p+f,y=void 0===o?g:o(g);y!==g&&(f=y-p);let v=t=>-f*Math.exp(-t/r),x=t=>y+v(t),b=t=>{let e=v(t),i=x(t);m.done=Math.abs(e)<=u,m.value=m.done?y:i},w=t=>{let e;if(e=m.value,void 0!==n&&e<n||void 0!==l&&e>l){var i;c=t,h=t1({keyframes:[m.value,(i=m.value,void 0===n?l:void 0===l||Math.abs(n-i)<Math.abs(l-i)?n:l)],velocity:tK(x,t,m.value),damping:s,stiffness:a,restDelta:u,restSpeed:d})}};return w(0),{calculatedDuration:null,next:t=>{let e=!1;return(h||void 0!==c||(e=!0,b(t),w(t)),void 0!==c&&t>=c)?h.next(t-c):(e||b(t),m)}}}t1.applyToOptions=t=>{let e=function(t,e=100,i){let r=i({...t,keyframes:[0,e]}),s=Math.min(tG(r),2e4);return{type:"keyframes",ease:t=>r.next(s*t).value/e,duration:s/1e3}}(t,100,t1);return t.ease=e.ease,t.duration=q(e.duration),t.type="keyframes",t};let t4=(t,e,i)=>(((1-3*i+3*e)*t+(3*i-6*e))*t+3*e)*t;function t6(t,e,i,r){return t===e&&i===r?w:s=>0===s||1===s?s:t4(function(t,e,i,r,s){let a,o,n=0;do(a=t4(o=e+(i-e)/2,r,s)-t)>0?i=o:e=o;while(Math.abs(a)>1e-7&&++n<12)return o}(s,0,1,t,i),e,r)}let t8=t6(.42,0,1,1),t9=t6(0,0,.58,1),t7=t6(.42,0,.58,1),et=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,ee=t=>e=>1-t(1-e),ei=t6(.33,1.53,.69,.99),er=ee(ei),es=et(er),ea=t=>(t*=2)<1?.5*er(t):.5*(2-Math.pow(2,-10*(t-1))),eo=t=>1-Math.sin(Math.acos(t)),en=ee(eo),el=et(eo),eu=t=>Array.isArray(t)&&"number"==typeof t[0],ed={linear:w,easeIn:t8,easeInOut:t7,easeOut:t9,circIn:eo,circInOut:el,circOut:en,backIn:er,backInOut:es,backOut:ei,anticipate:ea},ec=t=>{if(eu(t)){g(4===t.length,"Cubic bezier arrays must contain four numerical values.");let[e,i,r,s]=t;return t6(e,i,r,s)}return"string"==typeof t?(g(void 0!==ed[t],`Invalid easing type '${t}'`),ed[t]):t},eh=(t,e,i)=>{let r=e-t;return 0===r?1:(i-t)/r};function ep({duration:t=300,keyframes:e,times:i,ease:r="easeInOut"}){var s;let a,o=Array.isArray(r)&&"number"!=typeof r[0]?r.map(ec):ec(r),n={done:!1,value:e[0]},l=function(t,e,{clamp:i=!0,ease:r,mixer:s}={}){let a=t.length;if(g(a===e.length,"Both input and output ranges must be the same length"),1===a)return()=>e[0];if(2===a&&e[0]===e[1])return()=>e[1];let o=t[0]===t[1];t[0]>t[a-1]&&(t=[...t].reverse(),e=[...e].reverse());let n=function(t,e,i){let r=[],s=i||b.mix||tH,a=t.length-1;for(let i=0;i<a;i++){let a=s(t[i],t[i+1]);e&&(a=G(Array.isArray(e)?e[i]||w:e,a)),r.push(a)}return r}(e,r,s),l=n.length,u=i=>{if(o&&i<t[0])return e[0];let r=0;if(l>1)for(;r<t.length-2&&!(i<t[r+1]);r++);let s=eh(t[r],t[r+1],i);return n[r](s)};return i?e=>u(K(t[0],t[a-1],e)):u}((s=i&&i.length===e.length?i:(!function(t,e){let i=t[t.length-1];for(let r=1;r<=e;r++){let s=eh(0,e,r);t.push(tR(i,1,s))}}(a=[0],e.length-1),a),s.map(e=>e*t)),e,{ease:Array.isArray(o)?o:e.map(()=>o||t7).splice(0,e.length-1)});return{calculatedDuration:t,next:e=>(n.value=l(e),n.done=e>=t,n)}}let em=t=>null!==t;function ef(t,{repeat:e,repeatType:i="loop"},r,s=1){let a=t.filter(em),o=s<0||e&&"loop"!==i&&e%2==1?0:a.length-1;return o&&void 0!==r?r:a[o]}let eg={decay:t3,inertia:t3,tween:ep,keyframes:ep,spring:t1};function ey(t){"string"==typeof t.type&&(t.type=eg[t.type])}class ev{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,e){return this.finished.then(t,e)}}let ex=t=>t/100;class eb extends ev{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=(t=!0)=>{if(t){let{motionValue:t}=this.options;t&&t.updatedAt!==M.now()&&this.tick(M.now())}this.isStopped=!0,"idle"!==this.state&&(this.teardown(),this.options.onStop?.())},Z.mainThread++,this.options=t,this.initAnimation(),this.play(),!1===t.autoplay&&this.pause()}initAnimation(){let{options:t}=this;ey(t);let{type:e=ep,repeat:i=0,repeatDelay:r=0,repeatType:s,velocity:a=0}=t,{keyframes:o}=t,n=e||ep;n!==ep&&"number"!=typeof o[0]&&(this.mixKeyframes=G(ex,tH(o[0],o[1])),o=[0,100]);let l=n({...t,keyframes:o});"mirror"===s&&(this.mirroredGenerator=n({...t,keyframes:[...o].reverse(),velocity:-a})),null===l.calculatedDuration&&(l.calculatedDuration=tG(l));let{calculatedDuration:u}=l;this.calculatedDuration=u,this.resolvedDuration=u+r,this.totalDuration=this.resolvedDuration*(i+1)-r,this.generator=l}updateTime(t){let e=Math.round(t-this.startTime)*this.playbackSpeed;null!==this.holdTime?this.currentTime=this.holdTime:this.currentTime=e}tick(t,e=!1){let{generator:i,totalDuration:r,mixKeyframes:s,mirroredGenerator:a,resolvedDuration:o,calculatedDuration:n}=this;if(null===this.startTime)return i.next(0);let{delay:l=0,keyframes:u,repeat:d,repeatType:c,repeatDelay:h,type:p,onUpdate:m,finalKeyframe:f}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-r/this.speed,this.startTime)),e?this.currentTime=t:this.updateTime(t);let g=this.currentTime-l*(this.playbackSpeed>=0?1:-1),y=this.playbackSpeed>=0?g<0:g>r;this.currentTime=Math.max(g,0),"finished"===this.state&&null===this.holdTime&&(this.currentTime=r);let v=this.currentTime,x=i;if(d){let t=Math.min(this.currentTime,r)/o,e=Math.floor(t),i=t%1;!i&&t>=1&&(i=1),1===i&&e--,(e=Math.min(e,d+1))%2&&("reverse"===c?(i=1-i,h&&(i-=h/o)):"mirror"===c&&(x=a)),v=K(0,1,i)*o}let b=y?{done:!1,value:u[0]}:x.next(v);s&&(b.value=s(b.value));let{done:w}=b;y||null===n||(w=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let k=null===this.holdTime&&("finished"===this.state||"running"===this.state&&w);return k&&p!==t3&&(b.value=ef(u,this.options,f,this.speed)),m&&m(b.value),k&&this.finish(),b}then(t,e){return this.finished.then(t,e)}get duration(){return this.calculatedDuration/1e3}get time(){return this.currentTime/1e3}set time(t){t=q(t),this.currentTime=t,null===this.startTime||null!==this.holdTime||0===this.playbackSpeed?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),this.driver?.start(!1)}get speed(){return this.playbackSpeed}set speed(t){this.updateTime(M.now());let e=this.playbackSpeed!==t;this.playbackSpeed=t,e&&(this.time=this.currentTime/1e3)}play(){if(this.isStopped)return;let{driver:t=tY,startTime:e}=this.options;this.driver||(this.driver=t(t=>this.tick(t))),this.options.onPlay?.();let i=this.driver.now();"finished"===this.state?(this.updateFinished(),this.startTime=i):null!==this.holdTime?this.startTime=i-this.holdTime:this.startTime||(this.startTime=e??i),"finished"===this.state&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(M.now()),this.holdTime=this.currentTime}complete(){"running"!==this.state&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null,Z.mainThread--}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),t.observe(this)}}let ew=t=>180*t/Math.PI,ek=t=>eS(ew(Math.atan2(t[1],t[0]))),eT={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:ek,rotateZ:ek,skewX:t=>ew(Math.atan(t[1])),skewY:t=>ew(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},eS=t=>((t%=360)<0&&(t+=360),t),eP=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),ej=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),eC={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:eP,scaleY:ej,scale:t=>(eP(t)+ej(t))/2,rotateX:t=>eS(ew(Math.atan2(t[6],t[5]))),rotateY:t=>eS(ew(Math.atan2(-t[2],t[0]))),rotateZ:ek,rotate:ek,skewX:t=>ew(Math.atan(t[4])),skewY:t=>ew(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function eA(t){return+!!t.includes("scale")}function eM(t,e){let i,r;if(!t||"none"===t)return eA(e);let s=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);if(s)i=eC,r=s;else{let e=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);i=eT,r=e}if(!r)return eA(e);let a=i[e],o=r[1].split(",").map(eE);return"function"==typeof a?a(o):o[a]}function eE(t){return parseFloat(t.trim())}let eD=t=>t===ti||t===tg,eV=new Set(["x","y","z"]),eR=N.filter(t=>!eV.has(t)),eB={width:({x:t},{paddingLeft:e="0",paddingRight:i="0"})=>t.max-t.min-parseFloat(e)-parseFloat(i),height:({y:t},{paddingTop:e="0",paddingBottom:i="0"})=>t.max-t.min-parseFloat(e)-parseFloat(i),top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:(t,{transform:e})=>eM(e,"x"),y:(t,{transform:e})=>eM(e,"y")};eB.translateX=eB.x,eB.translateY=eB.y;let eL=new Set,eO=!1,eF=!1,eI=!1;function eN(){if(eF){let t=Array.from(eL).filter(t=>t.needsMeasurement),e=new Set(t.map(t=>t.element)),i=new Map;e.forEach(t=>{let e,r=(e=[],eR.forEach(i=>{let r=t.getValue(i);void 0!==r&&(e.push([i,r.get()]),r.set(+!!i.startsWith("scale")))}),e);r.length&&(i.set(t,r),t.render())}),t.forEach(t=>t.measureInitialState()),e.forEach(t=>{t.render();let e=i.get(t);e&&e.forEach(([e,i])=>{t.getValue(e)?.set(i)})}),t.forEach(t=>t.measureEndState()),t.forEach(t=>{void 0!==t.suspendedScrollY&&window.scrollTo(0,t.suspendedScrollY)})}eF=!1,eO=!1,eL.forEach(t=>t.complete(eI)),eL.clear()}function ez(){eL.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(eF=!0)})}class e${constructor(t,e,i,r,s,a=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...t],this.onComplete=e,this.name=i,this.motionValue=r,this.element=s,this.isAsync=a}scheduleResolve(){this.state="scheduled",this.isAsync?(eL.add(this),eO||(eO=!0,S.read(ez),S.resolveKeyframes(eN))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:t,name:e,element:i,motionValue:r}=this;if(null===t[0]){let s=r?.get(),a=t[t.length-1];if(void 0!==s)t[0]=s;else if(i&&e){let r=i.readValue(e,a);null!=r&&(t[0]=r)}void 0===t[0]&&(t[0]=a),r&&void 0===s&&r.set(t[0])}for(let e=1;e<t.length;e++)t[e]??(t[e]=t[e-1])}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(t=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,t),eL.delete(this)}cancel(){"scheduled"===this.state&&(eL.delete(this),this.state="pending")}resume(){"pending"===this.state&&this.scheduleResolve()}}function eU(t){let e;return()=>(void 0===e&&(e=t()),e)}let eW=eU(()=>void 0!==window.ScrollTimeline),eH={},eY=(i=eU(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch(t){return!1}return!0}),()=>eH.linearEasing??i()),eX=([t,e,i,r])=>`cubic-bezier(${t}, ${e}, ${i}, ${r})`,eG={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:eX([0,.65,.55,1]),circOut:eX([.55,0,1,.45]),backIn:eX([.31,.01,.66,-.59]),backOut:eX([.33,1.53,.69,.99])};function eK(t){return"function"==typeof t&&"applyToOptions"in t}class eq extends ev{constructor(t){if(super(),this.finishedTime=null,this.isStopped=!1,!t)return;const{element:e,name:i,keyframes:r,pseudoElement:s,allowFlatten:a=!1,finalKeyframe:o,onComplete:n}=t;this.isPseudoElement=!!s,this.allowFlatten=a,this.options=t,g("string"!=typeof t.type,'animateMini doesn\'t support "type" as a string. Did you mean to import { spring } from "motion"?');const l=function({type:t,...e}){return eK(t)&&eY()?t.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}(t);this.animation=function(t,e,i,{delay:r=0,duration:s=300,repeat:a=0,repeatType:o="loop",ease:n="easeOut",times:l}={},u){let d={[e]:i};l&&(d.offset=l);let c=function t(e,i){if(e)return"function"==typeof e?eY()?tX(e,i):"ease-out":eu(e)?eX(e):Array.isArray(e)?e.map(e=>t(e,i)||eG.easeOut):eG[e]}(n,s);Array.isArray(c)&&(d.easing=c);let h={delay:r,duration:s,easing:Array.isArray(c)?"linear":c,fill:"both",iterations:a+1,direction:"reverse"===o?"alternate":"normal"};u&&(h.pseudoElement=u);let p=t.animate(d,h);return p}(e,i,r,l,s),!1===l.autoplay&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!s){let t=ef(r,this.options,o,this.speed);this.updateMotionValue?this.updateMotionValue(t):i.startsWith("--")?e.style.setProperty(i,t):e.style[i]=t,this.animation.cancel()}n?.(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),"finished"===this.state&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch(t){}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:t}=this;"idle"!==t&&"finished"!==t&&(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){this.isPseudoElement||this.animation.commitStyles?.()}get duration(){return Number(this.animation.effect?.getComputedTiming?.().duration||0)/1e3}get time(){return(Number(this.animation.currentTime)||0)/1e3}set time(t){this.finishedTime=null,this.animation.currentTime=q(t)}get speed(){return this.animation.playbackRate}set speed(t){t<0&&(this.finishedTime=null),this.animation.playbackRate=t}get state(){return null!==this.finishedTime?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(t){this.animation.startTime=t}attachTimeline({timeline:t,observe:e}){return(this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,t&&eW())?(this.animation.timeline=t,w):e(this)}}let eZ={anticipate:ea,backInOut:es,circInOut:el};class e_ extends eq{constructor(t){!function(t){"string"==typeof t.ease&&t.ease in eZ&&(t.ease=eZ[t.ease])}(t),ey(t),super(t),t.startTime&&(this.startTime=t.startTime),this.options=t}updateMotionValue(t){let{motionValue:e,onUpdate:i,onComplete:r,element:s,...a}=this.options;if(!e)return;if(void 0!==t)return void e.set(t);let o=new eb({...a,autoplay:!1}),n=q(this.finishedTime??this.time);e.setWithVelocity(o.sample(n-10).value,o.sample(n).value,10),o.stop()}}let eQ=(t,e)=>"zIndex"!==e&&!!("number"==typeof t||Array.isArray(t)||"string"==typeof t&&(tE.test(t)||"0"===t)&&!t.startsWith("url("));function eJ(t){return"object"==typeof t&&null!==t}function e0(t){return eJ(t)&&"offsetHeight"in t}let e5=new Set(["opacity","clipPath","filter","transform"]),e2=eU(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));class e1 extends ev{constructor({autoplay:t=!0,delay:e=0,type:i="keyframes",repeat:r=0,repeatDelay:s=0,repeatType:a="loop",keyframes:o,name:n,motionValue:l,element:u,...d}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=M.now();const c={autoplay:t,delay:e,type:i,repeat:r,repeatDelay:s,repeatType:a,name:n,motionValue:l,element:u,...d},h=u?.KeyframeResolver||e$;this.keyframeResolver=new h(o,(t,e,i)=>this.onKeyframesResolved(t,e,c,!i),n,l,u),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(t,e,i,r){this.keyframeResolver=void 0;let{name:s,type:a,velocity:o,delay:n,isHandoff:l,onUpdate:u}=i;this.resolvedAt=M.now(),!function(t,e,i,r){let s=t[0];if(null===s)return!1;if("display"===e||"visibility"===e)return!0;let a=t[t.length-1],o=eQ(s,e),n=eQ(a,e);return f(o===n,`You are trying to animate ${e} from "${s}" to "${a}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${a} via the \`style\` property.`),!!o&&!!n&&(function(t){let e=t[0];if(1===t.length)return!0;for(let i=0;i<t.length;i++)if(t[i]!==e)return!0}(t)||("spring"===i||eK(i))&&r)}(t,s,a,o)&&((b.instantAnimations||!n)&&u?.(ef(t,i,e)),t[0]=t[t.length-1],i.duration=0,i.repeat=0);let d={startTime:r?this.resolvedAt&&this.resolvedAt-this.createdAt>40?this.resolvedAt:this.createdAt:void 0,finalKeyframe:e,...i,keyframes:t},c=!l&&function(t){let{motionValue:e,name:i,repeatDelay:r,repeatType:s,damping:a,type:o}=t;if(!e0(e?.owner?.current))return!1;let{onUpdate:n,transformTemplate:l}=e.owner.getProps();return e2()&&i&&e5.has(i)&&("transform"!==i||!l)&&!n&&!r&&"mirror"!==s&&0!==a&&"inertia"!==o}(d)?new e_({...d,element:d.motionValue.owner.current}):new eb(d);c.finished.then(()=>this.notifyFinished()).catch(w),this.pendingTimeline&&(this.stopTimeline=c.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=c}get finished(){return this._animation?this.animation.finished:this._finished}then(t,e){return this.finished.finally(t).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),eI=!0,ez(),eN(),eI=!1),this._animation}get duration(){return this.animation.duration}get time(){return this.animation.time}set time(t){this.animation.time=t}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(t){this.animation.speed=t}get startTime(){return this.animation.startTime}attachTimeline(t){return this._animation?this.stopTimeline=this.animation.attachTimeline(t):this.pendingTimeline=t,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}let e3=t=>null!==t,e4={type:"spring",stiffness:500,damping:25,restSpeed:10},e6={type:"keyframes",duration:.8},e8={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},e9=(t,e,i,r={},s,a)=>o=>{let n=I(r,t)||{},l=n.delay||r.delay||0,{elapsed:u=0}=r;u-=q(l);let d={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:e.getVelocity(),...n,delay:-u,onUpdate:t=>{e.set(t),n.onUpdate&&n.onUpdate(t)},onComplete:()=>{o(),n.onComplete&&n.onComplete()},name:t,motionValue:e,element:a?void 0:s};!function({when:t,delay:e,delayChildren:i,staggerChildren:r,staggerDirection:s,repeat:a,repeatType:o,repeatDelay:n,from:l,elapsed:u,...d}){return!!Object.keys(d).length}(n)&&Object.assign(d,((t,{keyframes:e})=>e.length>2?e6:z.has(t)?t.startsWith("scale")?{type:"spring",stiffness:550,damping:0===e[1]?2*Math.sqrt(550):30,restSpeed:10}:e4:e8)(t,d)),d.duration&&(d.duration=q(d.duration)),d.repeatDelay&&(d.repeatDelay=q(d.repeatDelay)),void 0!==d.from&&(d.keyframes[0]=d.from);let c=!1;if(!1!==d.type&&(0!==d.duration||d.repeatDelay)||(d.duration=0,0===d.delay&&(c=!0)),(b.instantAnimations||b.skipAnimations)&&(c=!0,d.duration=0,d.delay=0),d.allowFlatten=!n.type&&!n.ease,c&&!a&&void 0!==e.get()){let t=function(t,{repeat:e,repeatType:i="loop"}){let r=t.filter(e3),s=e&&"loop"!==i&&e%2==1?0:r.length-1;return r[s]}(d.keyframes,n);if(void 0!==t)return void S.update(()=>{d.onUpdate(t),d.onComplete()})}return n.isSync?new eb(d):new e1(d)};function e7(t,e,{delay:i=0,transitionOverride:r,type:s}={}){let{transition:a=t.getDefaultTransition(),transitionEnd:o,...n}=e;r&&(a=r);let l=[],u=s&&t.animationState&&t.animationState.getState()[s];for(let e in n){let r=t.getValue(e,t.latestValues[e]??null),s=n[e];if(void 0===s||u&&function({protectedKeys:t,needsAnimating:e},i){let r=t.hasOwnProperty(i)&&!0!==e[i];return e[i]=!1,r}(u,e))continue;let o={delay:i,...I(a||{},e)},d=r.get();if(void 0!==d&&!r.isAnimating&&!Array.isArray(s)&&s===d&&!o.velocity)continue;let c=!1;if(window.MotionHandoffAnimation){let i=t.props[Y];if(i){let t=window.MotionHandoffAnimation(i,e,S);null!==t&&(o.startTime=t,c=!0)}}W(t,e),r.start(e9(e,r,s,t.shouldReduceMotion&&$.has(e)?{type:!1}:o,t,c));let h=r.animation;h&&l.push(h)}return o&&Promise.all(l).then(()=>{S.update(()=>{o&&F(t,o)})}),l}function it(t,e,i={}){let r=O(t,e,"exit"===i.type?t.presenceContext?.custom:void 0),{transition:s=t.getDefaultTransition()||{}}=r||{};i.transitionOverride&&(s=i.transitionOverride);let a=r?()=>Promise.all(e7(t,r,i)):()=>Promise.resolve(),o=t.variantChildren&&t.variantChildren.size?(r=0)=>{let{delayChildren:a=0,staggerChildren:o,staggerDirection:n}=s;return function(t,e,i=0,r=0,s=1,a){let o=[],n=(t.variantChildren.size-1)*r,l=1===s?(t=0)=>t*r:(t=0)=>n-t*r;return Array.from(t.variantChildren).sort(ie).forEach((t,r)=>{t.notify("AnimationStart",e),o.push(it(t,e,{...a,delay:i+l(r)}).then(()=>t.notify("AnimationComplete",e)))}),Promise.all(o)}(t,e,a+r,o,n,i)}:()=>Promise.resolve(),{when:n}=s;if(!n)return Promise.all([a(),o(i.delay)]);{let[t,e]="beforeChildren"===n?[a,o]:[o,a];return t().then(()=>e())}}function ie(t,e){return t.sortNodePosition(e)}function ii(t,e,i={}){let r;if(t.notify("AnimationStart",e),Array.isArray(e))r=Promise.all(e.map(e=>it(t,e,i)));else if("string"==typeof e)r=it(t,e,i);else{let s="function"==typeof e?O(t,e,i.custom):e;r=Promise.all(e7(t,s,i))}return r.then(()=>{t.notify("AnimationComplete",e)})}function ir(t,e){[...e].reverse().forEach(i=>{let r=t.getVariant(i);r&&F(t,r),t.variantChildren&&t.variantChildren.forEach(t=>{ir(t,e)})})}function is(){let t=!1,e=new Set,i={subscribe:t=>(e.add(t),()=>void e.delete(t)),start(i,r){g(t,"controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");let s=[];return e.forEach(t=>{s.push(ii(t,i,{transitionOverride:r}))}),Promise.all(s)},set:i=>(g(t,"controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook."),e.forEach(t=>{var e,r;e=t,Array.isArray(r=i)?ir(e,r):"string"==typeof r?ir(e,[r]):F(e,r)})),stop(){e.forEach(t=>{t.values.forEach(t=>t.stop())})},mount:()=>(t=!0,()=>{t=!1,i.stop()})};return i}function ia(t){let e=(0,h.useRef)(null);return null===e.current&&(e.current=t()),e.current}let io="u">typeof window,il=io?h.useLayoutEffect:h.useEffect,iu=function(){let t=ia(is);return il(t.mount,[]),t};function id(t){return null!==t&&"object"==typeof t&&"function"==typeof t.start}function ic(t,e){if(!Array.isArray(e))return!1;let i=e.length;if(i!==t.length)return!1;for(let r=0;r<i;r++)if(e[r]!==t[r])return!1;return!0}function ih(t){return"string"==typeof t||Array.isArray(t)}let ip=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],im=["initial",...ip],ig=im.length,iy=[...ip].reverse(),iv=ip.length;function ix(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function ib(){return{animate:ix(!0),whileInView:ix(),whileHover:ix(),whileTap:ix(),whileDrag:ix(),whileFocus:ix(),exit:ix()}}class iw{constructor(t){this.isMounted=!1,this.node=t}update(){}}let ik=0,iT={x:!1,y:!1};function iS(t,e,i,r={passive:!0}){return t.addEventListener(e,i,r),()=>t.removeEventListener(e,i)}let iP=t=>"mouse"===t.pointerType?"number"!=typeof t.button||t.button<=0:!1!==t.isPrimary;function ij(t){return{point:{x:t.pageX,y:t.pageY}}}function iC(t,e,i,r){return iS(t,e,t=>iP(t)&&i(t,ij(t)),r)}function iA({top:t,left:e,right:i,bottom:r}){return{x:{min:e,max:i},y:{min:t,max:r}}}function iM(t){return t.max-t.min}function iE(t,e,i,r=.5){t.origin=r,t.originPoint=tR(e.min,e.max,t.origin),t.scale=iM(i)/iM(e),t.translate=tR(i.min,i.max,t.origin)-t.originPoint,(t.scale>=.9999&&t.scale<=1.0001||isNaN(t.scale))&&(t.scale=1),(t.translate>=-.01&&t.translate<=.01||isNaN(t.translate))&&(t.translate=0)}function iD(t,e,i,r){iE(t.x,e.x,i.x,r?r.originX:void 0),iE(t.y,e.y,i.y,r?r.originY:void 0)}function iV(t,e,i){t.min=i.min+e.min,t.max=t.min+iM(e)}function iR(t,e,i){t.min=e.min-i.min,t.max=t.min+iM(e)}function iB(t,e,i){iR(t.x,e.x,i.x),iR(t.y,e.y,i.y)}let iL=()=>({translate:0,scale:1,origin:0,originPoint:0}),iO=()=>({x:iL(),y:iL()}),iF=()=>({min:0,max:0}),iI=()=>({x:iF(),y:iF()});function iN(t){return[t("x"),t("y")]}function iz(t){return void 0===t||1===t}function i$({scale:t,scaleX:e,scaleY:i}){return!iz(t)||!iz(e)||!iz(i)}function iU(t){return i$(t)||iW(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function iW(t){var e,i;return(e=t.x)&&"0%"!==e||(i=t.y)&&"0%"!==i}function iH(t,e,i,r,s){return void 0!==s&&(t=r+s*(t-r)),r+i*(t-r)+e}function iY(t,e=0,i=1,r,s){t.min=iH(t.min,e,i,r,s),t.max=iH(t.max,e,i,r,s)}function iX(t,{x:e,y:i}){iY(t.x,e.translate,e.scale,e.originPoint),iY(t.y,i.translate,i.scale,i.originPoint)}function iG(t,e){t.min=t.min+e,t.max=t.max+e}function iK(t,e,i,r,s=.5){let a=tR(t.min,t.max,s);iY(t,e,i,a,r)}function iq(t,e){iK(t.x,e.x,e.scaleX,e.scale,e.originX),iK(t.y,e.y,e.scaleY,e.scale,e.originY)}function iZ(t,e){return iA(function(t,e){if(!e)return t;let i=e({x:t.left,y:t.top}),r=e({x:t.right,y:t.bottom});return{top:i.y,left:i.x,bottom:r.y,right:r.x}}(t.getBoundingClientRect(),e))}let i_=({current:t})=>t?t.ownerDocument.defaultView:null;function iQ(t){return t&&"object"==typeof t&&Object.prototype.hasOwnProperty.call(t,"current")}let iJ=(t,e)=>Math.abs(t-e);class i0{constructor(t,e,{transformPagePoint:i,contextWindow:r,dragSnapToOrigin:s=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{var t,e;if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let i=i1(this.lastMoveEventInfo,this.history),r=null!==this.startEvent,s=(t=i.offset,e={x:0,y:0},Math.sqrt(iJ(t.x,e.x)**2+iJ(t.y,e.y)**2)>=3);if(!r&&!s)return;let{point:a}=i,{timestamp:o}=j;this.history.push({...a,timestamp:o});let{onStart:n,onMove:l}=this.handlers;r||(n&&n(this.lastMoveEvent,i),this.startEvent=this.lastMoveEvent),l&&l(this.lastMoveEvent,i)},this.handlePointerMove=(t,e)=>{this.lastMoveEvent=t,this.lastMoveEventInfo=i5(e,this.transformPagePoint),S.update(this.updatePoint,!0)},this.handlePointerUp=(t,e)=>{this.end();let{onEnd:i,onSessionEnd:r,resumeAnimation:s}=this.handlers;if(this.dragSnapToOrigin&&s&&s(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let a=i1("pointercancel"===t.type?this.lastMoveEventInfo:i5(e,this.transformPagePoint),this.history);this.startEvent&&i&&i(t,a),r&&r(t,a)},!iP(t))return;this.dragSnapToOrigin=s,this.handlers=e,this.transformPagePoint=i,this.contextWindow=r||window;const a=i5(ij(t),this.transformPagePoint),{point:o}=a,{timestamp:n}=j;this.history=[{...o,timestamp:n}];const{onSessionStart:l}=e;l&&l(t,i1(a,this.history)),this.removeListeners=G(iC(this.contextWindow,"pointermove",this.handlePointerMove),iC(this.contextWindow,"pointerup",this.handlePointerUp),iC(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),P(this.updatePoint)}}function i5(t,e){return e?{point:e(t.point)}:t}function i2(t,e){return{x:t.x-e.x,y:t.y-e.y}}function i1({point:t},e){return{point:t,delta:i2(t,i3(e)),offset:i2(t,e[0]),velocity:function(t){if(t.length<2)return{x:0,y:0};let e=t.length-1,i=null,r=i3(t);for(;e>=0&&(i=t[e],!(r.timestamp-i.timestamp>q(.1)));)e--;if(!i)return{x:0,y:0};let s=(r.timestamp-i.timestamp)/1e3;if(0===s)return{x:0,y:0};let a={x:(r.x-i.x)/s,y:(r.y-i.y)/s};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}(e)}}function i3(t){return t[t.length-1]}function i4(t,e,i){return{min:void 0!==e?t.min+e:void 0,max:void 0!==i?t.max+i-(t.max-t.min):void 0}}function i6(t,e){let i=e.min-t.min,r=e.max-t.max;return e.max-e.min<t.max-t.min&&([i,r]=[r,i]),{min:i,max:r}}function i8(t,e,i){return{min:i9(t,e),max:i9(t,i)}}function i9(t,e){return"number"==typeof t?t:t[e]||0}let i7=new WeakMap;class rt{constructor(t){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=iI(),this.visualElement=t}start(t,{snapToCursor:e=!1}={}){let{presenceContext:i}=this.visualElement;if(i&&!1===i.isPresent)return;let r=t=>{let{dragSnapToOrigin:i}=this.getProps();i?this.pauseAnimation():this.stopAnimation(),e&&this.snapToCursor(ij(t).point)},s=(t,e)=>{let{drag:i,dragPropagation:r,onDragStart:s}=this.getProps();if(i&&!r&&(this.openDragLock&&this.openDragLock(),this.openDragLock=function(t){if("x"===t||"y"===t)if(iT[t])return null;else return iT[t]=!0,()=>{iT[t]=!1};return iT.x||iT.y?null:(iT.x=iT.y=!0,()=>{iT.x=iT.y=!1})}(i),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),iN(t=>{let e=this.getAxisMotionValue(t).get()||0;if(tf.test(e)){let{projection:i}=this.visualElement;if(i&&i.layout){let r=i.layout.layoutBox[t];r&&(e=iM(r)*(parseFloat(e)/100))}}this.originPoint[t]=e}),s&&S.postRender(()=>s(t,e)),W(this.visualElement,"transform");let{animationState:a}=this.visualElement;a&&a.setActive("whileDrag",!0)},a=(t,e)=>{let{dragPropagation:i,dragDirectionLock:r,onDirectionLock:s,onDrag:a}=this.getProps();if(!i&&!this.openDragLock)return;let{offset:o}=e;if(r&&null===this.currentDirection){this.currentDirection=function(t,e=10){let i=null;return Math.abs(t.y)>e?i="y":Math.abs(t.x)>e&&(i="x"),i}(o),null!==this.currentDirection&&s&&s(this.currentDirection);return}this.updateAxis("x",e.point,o),this.updateAxis("y",e.point,o),this.visualElement.render(),a&&a(t,e)},o=(t,e)=>this.stop(t,e),n=()=>iN(t=>"paused"===this.getAnimationState(t)&&this.getAxisMotionValue(t).animation?.play()),{dragSnapToOrigin:l}=this.getProps();this.panSession=new i0(t,{onSessionStart:r,onStart:s,onMove:a,onSessionEnd:o,resumeAnimation:n},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:l,contextWindow:i_(this.visualElement)})}stop(t,e){let i=this.isDragging;if(this.cancel(),!i)return;let{velocity:r}=e;this.startAnimation(r);let{onDragEnd:s}=this.getProps();s&&S.postRender(()=>s(t,e))}cancel(){this.isDragging=!1;let{projection:t,animationState:e}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;let{dragPropagation:i}=this.getProps();!i&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),e&&e.setActive("whileDrag",!1)}updateAxis(t,e,i){let{drag:r}=this.getProps();if(!i||!re(t,r,this.currentDirection))return;let s=this.getAxisMotionValue(t),a=this.originPoint[t]+i[t];this.constraints&&this.constraints[t]&&(a=function(t,{min:e,max:i},r){return void 0!==e&&t<e?t=r?tR(e,t,r.min):Math.max(t,e):void 0!==i&&t>i&&(t=r?tR(i,t,r.max):Math.min(t,i)),t}(a,this.constraints[t],this.elastic[t])),s.set(a)}resolveConstraints(){let{dragConstraints:t,dragElastic:e}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,r=this.constraints;t&&iQ(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&i?this.constraints=function(t,{top:e,left:i,bottom:r,right:s}){return{x:i4(t.x,i,s),y:i4(t.y,e,r)}}(i.layoutBox,t):this.constraints=!1,this.elastic=function(t=.35){return!1===t?t=0:!0===t&&(t=.35),{x:i8(t,"left","right"),y:i8(t,"top","bottom")}}(e),r!==this.constraints&&i&&this.constraints&&!this.hasMutatedConstraints&&iN(t=>{var e,r;let s;!1!==this.constraints&&this.getAxisMotionValue(t)&&(this.constraints[t]=(e=i.layoutBox[t],r=this.constraints[t],s={},void 0!==r.min&&(s.min=r.min-e.min),void 0!==r.max&&(s.max=r.max-e.min),s))})}resolveRefConstraints(){var t;let{dragConstraints:e,onMeasureDragConstraints:i}=this.getProps();if(!e||!iQ(e))return!1;let r=e.current;g(null!==r,"If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");let{projection:s}=this.visualElement;if(!s||!s.layout)return!1;let a=function(t,e,i){let r=iZ(t,i),{scroll:s}=e;return s&&(iG(r.x,s.offset.x),iG(r.y,s.offset.y)),r}(r,s.root,this.visualElement.getTransformPagePoint()),o=(t=s.layout.layoutBox,{x:i6(t.x,a.x),y:i6(t.y,a.y)});if(i){let t=i(function({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}(o));this.hasMutatedConstraints=!!t,t&&(o=iA(t))}return o}startAnimation(t){let{drag:e,dragMomentum:i,dragElastic:r,dragTransition:s,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),n=this.constraints||{};return Promise.all(iN(o=>{if(!re(o,e,this.currentDirection))return;let l=n&&n[o]||{};a&&(l={min:0,max:0});let u={type:"inertia",velocity:i?t[o]:0,bounceStiffness:r?200:1e6,bounceDamping:r?40:1e7,timeConstant:750,restDelta:1,restSpeed:10,...s,...l};return this.startAxisValueAnimation(o,u)})).then(o)}startAxisValueAnimation(t,e){let i=this.getAxisMotionValue(t);return W(this.visualElement,t),i.start(e9(t,i,0,e,this.visualElement,!1))}stopAnimation(){iN(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){iN(t=>this.getAxisMotionValue(t).animation?.pause())}getAnimationState(t){return this.getAxisMotionValue(t).animation?.state}getAxisMotionValue(t){let e=`_drag${t.toUpperCase()}`,i=this.visualElement.getProps();return i[e]||this.visualElement.getValue(t,(i.initial?i.initial[t]:void 0)||0)}snapToCursor(t){iN(e=>{let{drag:i}=this.getProps();if(!re(e,i,this.currentDirection))return;let{projection:r}=this.visualElement,s=this.getAxisMotionValue(e);if(r&&r.layout){let{min:i,max:a}=r.layout.layoutBox[e];s.set(t[e]-tR(i,a,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:t,dragConstraints:e}=this.getProps(),{projection:i}=this.visualElement;if(!iQ(e)||!i||!this.constraints)return;this.stopAnimation();let r={x:0,y:0};iN(t=>{let e=this.getAxisMotionValue(t);if(e&&!1!==this.constraints){var i,s;let a,o,n,l=e.get();r[t]=(i={min:l,max:l},s=this.constraints[t],a=.5,o=iM(i),(n=iM(s))>o?a=eh(s.min,s.max-o,i.min):o>n&&(a=eh(i.min,i.max-n,s.min)),K(0,1,a))}});let{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",i.root&&i.root.updateScroll(),i.updateLayout(),this.resolveConstraints(),iN(e=>{if(!re(e,t,null))return;let i=this.getAxisMotionValue(e),{min:s,max:a}=this.constraints[e];i.set(tR(s,a,r[e]))})}addListeners(){if(!this.visualElement.current)return;i7.set(this.visualElement,this);let t=iC(this.visualElement.current,"pointerdown",t=>{let{drag:e,dragListener:i=!0}=this.getProps();e&&i&&this.start(t)}),e=()=>{let{dragConstraints:t}=this.getProps();iQ(t)&&t.current&&(this.constraints=this.resolveRefConstraints())},{projection:i}=this.visualElement,r=i.addEventListener("measure",e);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),S.read(e);let s=iS(window,"resize",()=>this.scalePositionWithinConstraints()),a=i.addEventListener("didUpdate",({delta:t,hasLayoutChanged:e})=>{this.isDragging&&e&&(iN(e=>{let i=this.getAxisMotionValue(e);i&&(this.originPoint[e]+=t[e].translate,i.set(i.get()+t[e].translate))}),this.visualElement.render())});return()=>{s(),t(),r(),a&&a()}}getProps(){let t=this.visualElement.getProps(),{drag:e=!1,dragDirectionLock:i=!1,dragPropagation:r=!1,dragConstraints:s=!1,dragElastic:a=.35,dragMomentum:o=!0}=t;return{...t,drag:e,dragDirectionLock:i,dragPropagation:r,dragConstraints:s,dragElastic:a,dragMomentum:o}}}function re(t,e,i){return(!0===e||e===t)&&(null===i||i===t)}let ri=t=>(e,i)=>{t&&S.postRender(()=>t(e,i))},{schedule:rr}=T(queueMicrotask,!1);var rs=h;let ra=(0,h.createContext)(null);function ro(t=!0){let e=(0,h.useContext)(ra);if(null===e)return[!0,null];let{isPresent:i,onExitComplete:r,register:s}=e,a=(0,h.useId)();(0,h.useEffect)(()=>{if(t)return s(a)},[t]);let o=(0,h.useCallback)(()=>t&&r&&r(a),[a,r,t]);return!i&&r?[!1,o]:[!0]}let rn=(0,h.createContext)({}),rl=(0,h.createContext)({}),ru={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function rd(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}let rc={correct:(t,e)=>{if(!e.target)return t;if("string"==typeof t)if(!tg.test(t))return t;else t=parseFloat(t);let i=rd(t,e.target.x),r=rd(t,e.target.y);return`${i}% ${r}%`}},rh={};class rp extends rs.Component{componentDidMount(){let{visualElement:t,layoutGroup:e,switchLayoutGroup:i,layoutId:r}=this.props,{projection:s}=t;for(let t in rf)rh[t]=rf[t],Q(t)&&(rh[t].isCSSVariable=!0);s&&(e.group&&e.group.add(s),i&&i.register&&r&&i.register(s),s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,onExitComplete:()=>this.safeToRemove()})),ru.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){let{layoutDependency:e,visualElement:i,drag:r,isPresent:s}=this.props,{projection:a}=i;return a&&(a.isPresent=s,r||t.layoutDependency!==e||void 0===e||t.isPresent!==s?a.willUpdate():this.safeToRemove(),t.isPresent!==s&&(s?a.promote():a.relegate()||S.postRender(()=>{let t=a.getStack();t&&t.members.length||this.safeToRemove()}))),null}componentDidUpdate(){let{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),rr.postRender(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:t,layoutGroup:e,switchLayoutGroup:i}=this.props,{projection:r}=t;r&&(r.scheduleCheckAfterUnmount(),e&&e.group&&e.group.remove(r),i&&i.deregister&&i.deregister(r))}safeToRemove(){let{safeToRemove:t}=this.props;t&&t()}render(){return null}}function rm(t){let[e,i]=ro(),r=(0,rs.useContext)(rn);return(0,p.jsx)(rp,{...t,layoutGroup:r,switchLayoutGroup:(0,rs.useContext)(rl),isPresent:e,safeToRemove:i})}let rf={borderRadius:{...rc,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:rc,borderTopRightRadius:rc,borderBottomLeftRadius:rc,borderBottomRightRadius:rc,boxShadow:{correct:(t,{treeScale:e,projectionDelta:i})=>{let r=tE.parse(t);if(r.length>5)return t;let s=tE.createTransformer(t),a=+("number"!=typeof r[0]),o=i.x.scale*e.x,n=i.y.scale*e.y;r[0+a]/=o,r[1+a]/=n;let l=tR(o,n,.5);return"number"==typeof r[2+a]&&(r[2+a]/=l),"number"==typeof r[3+a]&&(r[3+a]/=l),s(r)}}};function rg(t){return eJ(t)&&"ownerSVGElement"in t}let ry=(t,e)=>t.depth-e.depth;class rv{constructor(){this.children=[],this.isDirty=!1}add(t){y(this.children,t),this.isDirty=!0}remove(t){v(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(ry),this.isDirty=!1,this.children.forEach(t)}}function rx(t){return U(t)?t.get():t}let rb=["TopLeft","TopRight","BottomLeft","BottomRight"],rw=rb.length,rk=t=>"string"==typeof t?parseFloat(t):t,rT=t=>"number"==typeof t||tg.test(t);function rS(t,e){return void 0!==t[e]?t[e]:t.borderRadius}let rP=rC(0,.5,en),rj=rC(.5,.95,w);function rC(t,e,i){return r=>r<t?0:r>e?1:i(eh(t,e,r))}function rA(t,e){t.min=e.min,t.max=e.max}function rM(t,e){rA(t.x,e.x),rA(t.y,e.y)}function rE(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}function rD(t,e,i,r,s){return t-=e,t=r+1/i*(t-r),void 0!==s&&(t=r+1/s*(t-r)),t}function rV(t,e,[i,r,s],a,o){!function(t,e=0,i=1,r=.5,s,a=t,o=t){if(tf.test(e)&&(e=parseFloat(e),e=tR(o.min,o.max,e/100)-o.min),"number"!=typeof e)return;let n=tR(a.min,a.max,r);t===a&&(n-=e),t.min=rD(t.min,e,i,n,s),t.max=rD(t.max,e,i,n,s)}(t,e[i],e[r],e[s],e.scale,a,o)}let rR=["x","scaleX","originX"],rB=["y","scaleY","originY"];function rL(t,e,i,r){rV(t.x,e,rR,i?i.x:void 0,r?r.x:void 0),rV(t.y,e,rB,i?i.y:void 0,r?r.y:void 0)}function rO(t){return 0===t.translate&&1===t.scale}function rF(t){return rO(t.x)&&rO(t.y)}function rI(t,e){return t.min===e.min&&t.max===e.max}function rN(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function rz(t,e){return rN(t.x,e.x)&&rN(t.y,e.y)}function r$(t){return iM(t.x)/iM(t.y)}function rU(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}class rW{constructor(){this.members=[]}add(t){y(this.members,t),t.scheduleRender()}remove(t){if(v(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){let t=this.members[this.members.length-1];t&&this.promote(t)}}relegate(t){let e,i=this.members.findIndex(e=>t===e);if(0===i)return!1;for(let t=i;t>=0;t--){let i=this.members[t];if(!1!==i.isPresent){e=i;break}}return!!e&&(this.promote(e),!0)}promote(t,e){let i=this.lead;if(t!==i&&(this.prevLead=i,this.lead=t,t.show(),i)){i.instance&&i.scheduleRender(),t.scheduleRender(),t.resumeFrom=i,e&&(t.resumeFrom.preserveOpacity=!0),i.snapshot&&(t.snapshot=i.snapshot,t.snapshot.latestValues=i.animationValues||i.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);let{crossfade:r}=t.options;!1===r&&i.hide()}}exitAnimationComplete(){this.members.forEach(t=>{let{options:e,resumingFrom:i}=t;e.onExitComplete&&e.onExitComplete(),i&&i.options.onExitComplete&&i.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}let rH=["","X","Y","Z"],rY={visibility:"hidden"},rX=0;function rG(t,e,i,r){let{latestValues:s}=e;s[t]&&(i[t]=s[t],e.setStaticValue(t,0),r&&(r[t]=0))}function rK({attachResizeListener:t,defaultParent:e,measureScroll:i,checkIsScrollRoot:r,resetTransform:s}){return class{constructor(t={},i=e?.()){this.id=rX++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(r_),this.nodes.forEach(r3),this.nodes.forEach(r4),this.nodes.forEach(rQ)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=t,this.root=i?i.root||i:this,this.path=i?[...i.path,i]:[],this.parent=i,this.depth=i?i.depth+1:0;for(let t=0;t<this.path.length;t++)this.path[t].shouldResetTransform=!0;this.root===this&&(this.nodes=new rv)}addEventListener(t,e){return this.eventHandlers.has(t)||this.eventHandlers.set(t,new x),this.eventHandlers.get(t).add(e)}notifyListeners(t,...e){let i=this.eventHandlers.get(t);i&&i.notify(...e)}hasListeners(t){return this.eventHandlers.has(t)}mount(e){if(this.instance)return;this.isSVG=rg(e)&&!(rg(e)&&"svg"===e.tagName),this.instance=e;let{layoutId:i,layout:r,visualElement:s}=this.options;if(s&&!s.current&&s.mount(e),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(r||i)&&(this.isLayoutDirty=!0),t){let i,r=()=>this.root.updateBlockedByResize=!1;t(e,()=>{let t,e;this.root.updateBlockedByResize=!0,i&&i(),t=M.now(),e=({timestamp:i})=>{let s=i-t;s>=250&&(P(e),r(s-250))},S.setup(e,!0),i=()=>P(e),ru.hasAnimatedSinceResize&&(ru.hasAnimatedSinceResize=!1,this.nodes.forEach(r1))})}i&&this.root.registerSharedNode(i,this),!1!==this.options.animate&&s&&(i||r)&&this.addEventListener("didUpdate",({delta:t,hasLayoutChanged:e,hasRelativeLayoutChanged:i,layout:r})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}let a=this.options.transition||s.getDefaultTransition()||se,{onLayoutAnimationStart:o,onLayoutAnimationComplete:n}=s.getProps(),l=!this.targetLayout||!rz(this.targetLayout,r),u=!e&&i;if(this.options.layoutRoot||this.resumeFrom||u||e&&(l||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(t,u);let e={...I(a,"layout"),onPlay:o,onComplete:n};(s.shouldReduceMotion||this.options.layoutRoot)&&(e.delay=0,e.type=!1),this.startAnimation(e)}else e||r1(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=r})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);let t=this.getStack();t&&t.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),P(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){!this.isUpdateBlocked()&&(this.isUpdating=!0,this.nodes&&this.nodes.forEach(r6),this.animationId++)}getTransformTemplate(){let{visualElement:t}=this.options;return t&&t.getProps().transformTemplate}willUpdate(t=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&function t(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;let{visualElement:i}=e.options;if(!i)return;let r=i.props[Y];if(window.MotionHasOptimisedAnimation(r,"transform")){let{layout:t,layoutId:i}=e.options;window.MotionCancelOptimisedAnimation(r,"transform",S,!(t||i))}let{parent:s}=e;s&&!s.hasCheckedOptimisedAppear&&t(s)}(this),this.root.isUpdating||this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let t=0;t<this.path.length;t++){let e=this.path[t];e.shouldResetTransform=!0,e.updateScroll("snapshot"),e.options.layoutRoot&&e.willUpdate(!1)}let{layoutId:e,layout:i}=this.options;if(void 0===e&&!i)return;let r=this.getTransformTemplate();this.prevTransformTemplateValue=r?r(this.latestValues,""):void 0,this.updateSnapshot(),t&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(r0);return}this.isUpdating||this.nodes.forEach(r5),this.isUpdating=!1,this.nodes.forEach(r2),this.nodes.forEach(rq),this.nodes.forEach(rZ),this.clearAllSnapshots();let t=M.now();j.delta=K(0,1e3/60,t-j.timestamp),j.timestamp=t,j.isProcessing=!0,C.update.process(j),C.preRender.process(j),C.render.process(j),j.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,rr.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(rJ),this.sharedNodes.forEach(r8)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,S.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){S.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){!this.snapshot&&this.instance&&(this.snapshot=this.measure(),!this.snapshot||iM(this.snapshot.measuredBox.x)||iM(this.snapshot.measuredBox.y)||(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let t=0;t<this.path.length;t++)this.path[t].updateScroll();let t=this.layout;this.layout=this.measure(!1),this.layoutCorrected=iI(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);let{visualElement:e}=this.options;e&&e.notify("LayoutMeasure",this.layout.layoutBox,t?t.layoutBox:void 0)}updateScroll(t="measure"){let e=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===t&&(e=!1),e&&this.instance){let e=r(this.instance);this.scroll={animationId:this.root.animationId,phase:t,isRoot:e,offset:i(this.instance),wasRoot:this.scroll?this.scroll.isRoot:e}}}resetTransform(){if(!s)return;let t=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,e=this.projectionDelta&&!rF(this.projectionDelta),i=this.getTransformTemplate(),r=i?i(this.latestValues,""):void 0,a=r!==this.prevTransformTemplateValue;t&&this.instance&&(e||iU(this.latestValues)||a)&&(s(this.instance,r),this.shouldResetTransform=!1,this.scheduleRender())}measure(t=!0){var e;let i=this.measurePageBox(),r=this.removeElementScroll(i);return t&&(r=this.removeTransform(r)),ss((e=r).x),ss(e.y),{animationId:this.root.animationId,measuredBox:i,layoutBox:r,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:t}=this.options;if(!t)return iI();let e=t.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(so))){let{scroll:t}=this.root;t&&(iG(e.x,t.offset.x),iG(e.y,t.offset.y))}return e}removeElementScroll(t){let e=iI();if(rM(e,t),this.scroll?.wasRoot)return e;for(let i=0;i<this.path.length;i++){let r=this.path[i],{scroll:s,options:a}=r;r!==this.root&&s&&a.layoutScroll&&(s.wasRoot&&rM(e,t),iG(e.x,s.offset.x),iG(e.y,s.offset.y))}return e}applyTransform(t,e=!1){let i=iI();rM(i,t);for(let t=0;t<this.path.length;t++){let r=this.path[t];!e&&r.options.layoutScroll&&r.scroll&&r!==r.root&&iq(i,{x:-r.scroll.offset.x,y:-r.scroll.offset.y}),iU(r.latestValues)&&iq(i,r.latestValues)}return iU(this.latestValues)&&iq(i,this.latestValues),i}removeTransform(t){let e=iI();rM(e,t);for(let t=0;t<this.path.length;t++){let i=this.path[t];if(!i.instance||!iU(i.latestValues))continue;i$(i.latestValues)&&i.updateSnapshot();let r=iI();rM(r,i.measurePageBox()),rL(e,i.latestValues,i.snapshot?i.snapshot.layoutBox:void 0,r)}return iU(this.latestValues)&&rL(e,this.latestValues),e}setTargetDelta(t){this.targetDelta=t,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(t){this.options={...this.options,...t,crossfade:void 0===t.crossfade||t.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==j.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(t=!1){let e=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=e.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=e.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=e.isSharedProjectionDirty);let i=!!this.resumingFrom||this!==e;if(!(t||i&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:r,layoutId:s}=this.options;if(this.layout&&(r||s)){if(this.resolvedRelativeTargetAt=j.timestamp,!this.targetDelta&&!this.relativeTarget){let t=this.getClosestProjectingParent();t&&t.layout&&1!==this.animationProgress?(this.relativeParent=t,this.forceRelativeParentToResolveTarget(),this.relativeTarget=iI(),this.relativeTargetOrigin=iI(),iB(this.relativeTargetOrigin,this.layout.layoutBox,t.layout.layoutBox),rM(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(this.relativeTarget||this.targetDelta){if(this.target||(this.target=iI(),this.targetWithTransforms=iI()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target){var a,o,n;this.forceRelativeParentToResolveTarget(),a=this.target,o=this.relativeTarget,n=this.relativeParent.target,iV(a.x,o.x,n.x),iV(a.y,o.y,n.y)}else this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):rM(this.target,this.layout.layoutBox),iX(this.target,this.targetDelta)):rM(this.target,this.layout.layoutBox);if(this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;let t=this.getClosestProjectingParent();t&&!!t.resumingFrom==!!this.resumingFrom&&!t.options.layoutScroll&&t.target&&1!==this.animationProgress?(this.relativeParent=t,this.forceRelativeParentToResolveTarget(),this.relativeTarget=iI(),this.relativeTargetOrigin=iI(),iB(this.relativeTargetOrigin,this.target,t.target),rM(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}}getClosestProjectingParent(){if(!(!this.parent||i$(this.parent.latestValues)||iW(this.parent.latestValues)))if(this.parent.isProjecting())return this.parent;else return this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){let t=this.getLead(),e=!!this.resumingFrom||this!==t,i=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(i=!1),e&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(i=!1),this.resolvedRelativeTargetAt===j.timestamp&&(i=!1),i)return;let{layout:r,layoutId:s}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(r||s))return;rM(this.layoutCorrected,this.layout.layoutBox);let a=this.treeScale.x,o=this.treeScale.y;!function(t,e,i,r=!1){let s,a,o=i.length;if(o){e.x=e.y=1;for(let n=0;n<o;n++){a=(s=i[n]).projectionDelta;let{visualElement:o}=s.options;(!o||!o.props.style||"contents"!==o.props.style.display)&&(r&&s.options.layoutScroll&&s.scroll&&s!==s.root&&iq(t,{x:-s.scroll.offset.x,y:-s.scroll.offset.y}),a&&(e.x*=a.x.scale,e.y*=a.y.scale,iX(t,a)),r&&iU(s.latestValues)&&iq(t,s.latestValues))}e.x<1.0000000000001&&e.x>.999999999999&&(e.x=1),e.y<1.0000000000001&&e.y>.999999999999&&(e.y=1)}}(this.layoutCorrected,this.treeScale,this.path,e),t.layout&&!t.target&&(1!==this.treeScale.x||1!==this.treeScale.y)&&(t.target=t.layout.layoutBox,t.targetWithTransforms=iI());let{target:n}=t;if(!n){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}this.projectionDelta&&this.prevProjectionDelta?(rE(this.prevProjectionDelta.x,this.projectionDelta.x),rE(this.prevProjectionDelta.y,this.projectionDelta.y)):this.createProjectionDeltas(),iD(this.projectionDelta,this.layoutCorrected,n,this.latestValues),this.treeScale.x===a&&this.treeScale.y===o&&rU(this.projectionDelta.x,this.prevProjectionDelta.x)&&rU(this.projectionDelta.y,this.prevProjectionDelta.y)||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",n))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(t=!0){if(this.options.visualElement?.scheduleRender(),t){let t=this.getStack();t&&t.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=iO(),this.projectionDelta=iO(),this.projectionDeltaWithTransform=iO()}setAnimationOrigin(t,e=!1){let i,r=this.snapshot,s=r?r.latestValues:{},a={...this.latestValues},o=iO();this.relativeParent&&this.relativeParent.options.layoutRoot||(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!e;let n=iI(),l=(r?r.source:void 0)!==(this.layout?this.layout.source:void 0),u=this.getStack(),d=!u||u.members.length<=1,c=!!(l&&!d&&!0===this.options.crossfade&&!this.path.some(st));this.animationProgress=0,this.mixTargetDelta=e=>{let r=e/1e3;if(r9(o.x,t.x,r),r9(o.y,t.y,r),this.setTargetDelta(o),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout){var u,h,p,m,f,g;iB(n,this.layout.layoutBox,this.relativeParent.layout.layoutBox),p=this.relativeTarget,m=this.relativeTargetOrigin,f=n,g=r,r7(p.x,m.x,f.x,g),r7(p.y,m.y,f.y,g),i&&(u=this.relativeTarget,h=i,rI(u.x,h.x)&&rI(u.y,h.y))&&(this.isProjectionDirty=!1),i||(i=iI()),rM(i,this.relativeTarget)}l&&(this.animationValues=a,function(t,e,i,r,s,a){s?(t.opacity=tR(0,i.opacity??1,rP(r)),t.opacityExit=tR(e.opacity??1,0,rj(r))):a&&(t.opacity=tR(e.opacity??1,i.opacity??1,r));for(let s=0;s<rw;s++){let a=`border${rb[s]}Radius`,o=rS(e,a),n=rS(i,a);(void 0!==o||void 0!==n)&&(o||(o=0),n||(n=0),0===o||0===n||rT(o)===rT(n)?(t[a]=Math.max(tR(rk(o),rk(n),r),0),(tf.test(n)||tf.test(o))&&(t[a]+="%")):t[a]=n)}(e.rotate||i.rotate)&&(t.rotate=tR(e.rotate||0,i.rotate||0,r))}(a,s,this.latestValues,r,c,d)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=r},this.mixTargetDelta(1e3*!!this.options.layoutRoot)}startAnimation(t){this.notifyListeners("animationStart"),this.currentAnimation?.stop(!1),this.resumingFrom?.currentAnimation?.stop(!1),this.pendingAnimation&&(P(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=S.update(()=>{var e,i,r;let s;ru.hasAnimatedSinceResize=!0,Z.layout++,this.motionValue||(this.motionValue=V(0)),this.currentAnimation=(e=this.motionValue,i=[0,1e3],r={...t,isSync:!0,onUpdate:e=>{this.mixTargetDelta(e),t.onUpdate&&t.onUpdate(e)},onStop:()=>{Z.layout--},onComplete:()=>{Z.layout--,t.onComplete&&t.onComplete(),this.completeAnimation()}},(s=U(e)?e:V(e)).start(e9("",s,i,r)),s.animation),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let t=this.getStack();t&&t.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(1e3),this.currentAnimation.stop(!1)),this.completeAnimation()}applyTransformsToTarget(){let t=this.getLead(),{targetWithTransforms:e,target:i,layout:r,latestValues:s}=t;if(e&&i&&r){if(this!==t&&this.layout&&r&&sa(this.options.animationType,this.layout.layoutBox,r.layoutBox)){i=this.target||iI();let e=iM(this.layout.layoutBox.x);i.x.min=t.target.x.min,i.x.max=i.x.min+e;let r=iM(this.layout.layoutBox.y);i.y.min=t.target.y.min,i.y.max=i.y.min+r}rM(e,i),iq(e,s),iD(this.projectionDeltaWithTransform,this.layoutCorrected,e,s)}}registerSharedNode(t,e){this.sharedNodes.has(t)||this.sharedNodes.set(t,new rW),this.sharedNodes.get(t).add(e);let i=e.options.initialPromotionConfig;e.promote({transition:i?i.transition:void 0,preserveFollowOpacity:i&&i.shouldPreserveFollowOpacity?i.shouldPreserveFollowOpacity(e):void 0})}isLead(){let t=this.getStack();return!t||t.lead===this}getLead(){let{layoutId:t}=this.options;return t&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:t}=this.options;return t?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:t}=this.options;if(t)return this.root.sharedNodes.get(t)}promote({needsReset:t,transition:e,preserveFollowOpacity:i}={}){let r=this.getStack();r&&r.promote(this,i),t&&(this.projectionDelta=void 0,this.needsReset=!0),e&&this.setOptions({transition:e})}relegate(){let t=this.getStack();return!!t&&t.relegate(this)}resetSkewAndRotation(){let{visualElement:t}=this.options;if(!t)return;let e=!1,{latestValues:i}=t;if((i.z||i.rotate||i.rotateX||i.rotateY||i.rotateZ||i.skewX||i.skewY)&&(e=!0),!e)return;let r={};i.z&&rG("z",t,r,this.animationValues);for(let e=0;e<rH.length;e++)rG(`rotate${rH[e]}`,t,r,this.animationValues),rG(`skew${rH[e]}`,t,r,this.animationValues);for(let e in t.render(),r)t.setStaticValue(e,r[e]),this.animationValues&&(this.animationValues[e]=r[e]);t.scheduleRender()}getProjectionStyles(t){if(!this.instance||this.isSVG)return;if(!this.isVisible)return rY;let e={visibility:""},i=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,e.opacity="",e.pointerEvents=rx(t?.pointerEvents)||"",e.transform=i?i(this.latestValues,""):"none",e;let r=this.getLead();if(!this.projectionDelta||!this.layout||!r.target){let e={};return this.options.layoutId&&(e.opacity=void 0!==this.latestValues.opacity?this.latestValues.opacity:1,e.pointerEvents=rx(t?.pointerEvents)||""),this.hasProjected&&!iU(this.latestValues)&&(e.transform=i?i({},""):"none",this.hasProjected=!1),e}let s=r.animationValues||r.latestValues;this.applyTransformsToTarget(),e.transform=function(t,e,i){let r="",s=t.x.translate/e.x,a=t.y.translate/e.y,o=i?.z||0;if((s||a||o)&&(r=`translate3d(${s}px, ${a}px, ${o}px) `),(1!==e.x||1!==e.y)&&(r+=`scale(${1/e.x}, ${1/e.y}) `),i){let{transformPerspective:t,rotate:e,rotateX:s,rotateY:a,skewX:o,skewY:n}=i;t&&(r=`perspective(${t}px) ${r}`),e&&(r+=`rotate(${e}deg) `),s&&(r+=`rotateX(${s}deg) `),a&&(r+=`rotateY(${a}deg) `),o&&(r+=`skewX(${o}deg) `),n&&(r+=`skewY(${n}deg) `)}let n=t.x.scale*e.x,l=t.y.scale*e.y;return(1!==n||1!==l)&&(r+=`scale(${n}, ${l})`),r||"none"}(this.projectionDeltaWithTransform,this.treeScale,s),i&&(e.transform=i(s,e.transform));let{x:a,y:o}=this.projectionDelta;for(let t in e.transformOrigin=`${100*a.origin}% ${100*o.origin}% 0`,r.animationValues?e.opacity=r===this?s.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:s.opacityExit:e.opacity=r===this?void 0!==s.opacity?s.opacity:"":void 0!==s.opacityExit?s.opacityExit:0,rh){if(void 0===s[t])continue;let{correct:i,applyTo:a,isCSSVariable:o}=rh[t],n="none"===e.transform?s[t]:i(s[t],r);if(a){let t=a.length;for(let i=0;i<t;i++)e[a[i]]=n}else o?this.options.visualElement.renderState.vars[t]=n:e[t]=n}return this.options.layoutId&&(e.pointerEvents=r===this?rx(t?.pointerEvents)||"":"none"),e}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(t=>t.currentAnimation?.stop(!1)),this.root.nodes.forEach(r0),this.root.sharedNodes.clear()}}}function rq(t){t.updateLayout()}function rZ(t){let e=t.resumeFrom?.snapshot||t.snapshot;if(t.isLead()&&t.layout&&e&&t.hasListeners("didUpdate")){let{layoutBox:i,measuredBox:r}=t.layout,{animationType:s}=t.options,a=e.source!==t.layout.source;"size"===s?iN(t=>{let r=a?e.measuredBox[t]:e.layoutBox[t],s=iM(r);r.min=i[t].min,r.max=r.min+s}):sa(s,e.layoutBox,i)&&iN(r=>{let s=a?e.measuredBox[r]:e.layoutBox[r],o=iM(i[r]);s.max=s.min+o,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[r].max=t.relativeTarget[r].min+o)});let o=iO();iD(o,i,e.layoutBox);let n=iO();a?iD(n,t.applyTransform(r,!0),e.measuredBox):iD(n,i,e.layoutBox);let l=!rF(o),u=!1;if(!t.resumeFrom){let r=t.getClosestProjectingParent();if(r&&!r.resumeFrom){let{snapshot:s,layout:a}=r;if(s&&a){let o=iI();iB(o,e.layoutBox,s.layoutBox);let n=iI();iB(n,i,a.layoutBox),rz(o,n)||(u=!0),r.options.layoutRoot&&(t.relativeTarget=n,t.relativeTargetOrigin=o,t.relativeParent=r)}}}t.notifyListeners("didUpdate",{layout:i,snapshot:e,delta:n,layoutDelta:o,hasLayoutChanged:l,hasRelativeLayoutChanged:u})}else if(t.isLead()){let{onExitComplete:e}=t.options;e&&e()}t.options.transition=void 0}function r_(t){t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function rQ(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function rJ(t){t.clearSnapshot()}function r0(t){t.clearMeasurements()}function r5(t){t.isLayoutDirty=!1}function r2(t){let{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function r1(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function r3(t){t.resolveTargetDelta()}function r4(t){t.calcProjection()}function r6(t){t.resetSkewAndRotation()}function r8(t){t.removeLeadSnapshot()}function r9(t,e,i){t.translate=tR(e.translate,0,i),t.scale=tR(e.scale,1,i),t.origin=e.origin,t.originPoint=e.originPoint}function r7(t,e,i,r){t.min=tR(e.min,i.min,r),t.max=tR(e.max,i.max,r)}function st(t){return t.animationValues&&void 0!==t.animationValues.opacityExit}let se={duration:.45,ease:[.4,0,.1,1]},si=t=>"u">typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),sr=si("applewebkit/")&&!si("chrome/")?Math.round:w;function ss(t){t.min=sr(t.min),t.max=sr(t.max)}function sa(t,e,i){return"position"===t||"preserve-aspect"===t&&!(.2>=Math.abs(r$(e)-r$(i)))}function so(t){return t!==t.root&&t.scroll?.wasRoot}let sn=rK({attachResizeListener:(t,e)=>iS(t,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),sl={current:void 0},su=rK({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!sl.current){let t=new sn({});t.mount(window),t.setOptions({layoutScroll:!0}),sl.current=t}return sl.current},resetTransform:(t,e)=>{t.style.transform=void 0!==e?e:"none"},checkIsScrollRoot:t=>"fixed"===window.getComputedStyle(t).position});function sd(t,e){let i=function(t){if(t instanceof EventTarget)return[t];if("string"==typeof t){let e=document,i=(void 0)??e.querySelectorAll(t);return i?Array.from(i):[]}return Array.from(t)}(t),r=new AbortController;return[i,{passive:!0,...e,signal:r.signal},()=>r.abort()]}function sc(t){return!("touch"===t.pointerType||iT.x||iT.y)}function sh(t,e,i){let{props:r}=t;t.animationState&&r.whileHover&&t.animationState.setActive("whileHover","Start"===i);let s=r["onHover"+i];s&&S.postRender(()=>s(e,ij(e)))}let sp=(t,e)=>!!e&&(t===e||sp(t,e.parentElement)),sm=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]),sf=new WeakSet;function sg(t){return e=>{"Enter"===e.key&&t(e)}}function sy(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}function sv(t){return iP(t)&&!(iT.x||iT.y)}function sx(t,e,i){let{props:r}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&r.whileTap&&t.animationState.setActive("whileTap","Start"===i);let s=r["onTap"+("End"===i?"":i)];s&&S.postRender(()=>s(e,ij(e)))}let sb=new WeakMap,sw=new WeakMap,sk=t=>{let e=sb.get(t.target);e&&e(t)},sT=t=>{t.forEach(sk)},sS={some:0,all:1},sP=(0,h.createContext)({strict:!1}),sj=(0,h.createContext)({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"}),sC=(0,h.createContext)({});function sA(t){return id(t.animate)||im.some(e=>ih(t[e]))}function sM(t){return!!(sA(t)||t.variants)}function sE(t){return Array.isArray(t)?t.join(" "):t}let sD={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},sV={};for(let t in sD)sV[t]={isEnabled:e=>sD[t].some(t=>!!e[t])};let sR=Symbol.for("motionComponentSymbol");function sB(t,{layout:e,layoutId:i}){return z.has(t)||t.startsWith("origin")||(e||void 0!==i)&&(!!rh[t]||"opacity"===t)}let sL=(t,e)=>e&&"number"==typeof t?e.transform(t):t,sO={...ti,transform:Math.round},sF={borderWidth:tg,borderTopWidth:tg,borderRightWidth:tg,borderBottomWidth:tg,borderLeftWidth:tg,borderRadius:tg,radius:tg,borderTopLeftRadius:tg,borderTopRightRadius:tg,borderBottomRightRadius:tg,borderBottomLeftRadius:tg,width:tg,maxWidth:tg,height:tg,maxHeight:tg,top:tg,right:tg,bottom:tg,left:tg,padding:tg,paddingTop:tg,paddingRight:tg,paddingBottom:tg,paddingLeft:tg,margin:tg,marginTop:tg,marginRight:tg,marginBottom:tg,marginLeft:tg,backgroundPositionX:tg,backgroundPositionY:tg,rotate:tm,rotateX:tm,rotateY:tm,rotateZ:tm,scale:ts,scaleX:ts,scaleY:ts,scaleZ:ts,skew:tm,skewX:tm,skewY:tm,distance:tg,translateX:tg,translateY:tg,translateZ:tg,x:tg,y:tg,z:tg,perspective:tg,transformPerspective:tg,opacity:tr,originX:tx,originY:tx,originZ:tg,zIndex:sO,fillOpacity:tr,strokeOpacity:tr,numOctaves:sO},sI={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},sN=N.length;function sz(t,e,i){let{style:r,vars:s,transformOrigin:a}=t,o=!1,n=!1;for(let t in e){let i=e[t];if(z.has(t)){o=!0;continue}if(Q(t)){s[t]=i;continue}{let e=sL(i,sF[t]);t.startsWith("origin")?(n=!0,a[t]=e):r[t]=e}}if(!e.transform&&(o||i?r.transform=function(t,e,i){let r="",s=!0;for(let a=0;a<sN;a++){let o=N[a],n=t[o];if(void 0===n)continue;let l=!0;if(!(l="number"==typeof n?n===+!!o.startsWith("scale"):0===parseFloat(n))||i){let t=sL(n,sF[o]);if(!l){s=!1;let e=sI[o]||o;r+=`${e}(${t}) `}i&&(e[o]=t)}}return r=r.trim(),i?r=i(e,s?"":r):s&&(r="none"),r}(e,t.transform,i):r.transform&&(r.transform="none")),n){let{originX:t="50%",originY:e="50%",originZ:i=0}=a;r.transformOrigin=`${t} ${e} ${i}`}}let s$=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function sU(t,e,i){for(let r in e)U(e[r])||sB(r,i)||(t[r]=e[r])}let sW={offset:"stroke-dashoffset",array:"stroke-dasharray"},sH={offset:"strokeDashoffset",array:"strokeDasharray"};function sY(t,{attrX:e,attrY:i,attrScale:r,pathLength:s,pathSpacing:a=1,pathOffset:o=0,...n},l,u,d){if(sz(t,n,u),l){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};let{attrs:c,style:h}=t;c.transform&&(h.transform=c.transform,delete c.transform),(h.transform||c.transformOrigin)&&(h.transformOrigin=c.transformOrigin??"50% 50%",delete c.transformOrigin),h.transform&&(h.transformBox=d?.transformBox??"fill-box",delete c.transformBox),void 0!==e&&(c.x=e),void 0!==i&&(c.y=i),void 0!==r&&(c.scale=r),void 0!==s&&function(t,e,i=1,r=0,s=!0){t.pathLength=1;let a=s?sW:sH;t[a.offset]=tg.transform(-r);let o=tg.transform(e),n=tg.transform(i);t[a.array]=`${o} ${n}`}(c,s,a,o,!1)}let sX=()=>({...s$(),attrs:{}}),sG=t=>"string"==typeof t&&"svg"===t.toLowerCase(),sK=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function sq(t){return t.startsWith("while")||t.startsWith("drag")&&"draggable"!==t||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||sK.has(t)}let sZ=t=>!sq(t);try{(aA=(()=>{let t=Error("Cannot find module '@emotion/is-prop-valid'");throw t.code="MODULE_NOT_FOUND",t})().default)&&(sZ=t=>t.startsWith("on")?!sq(t):aA(t))}catch{}let s_=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function sQ(t){if("string"!=typeof t||t.includes("-"));else if(s_.indexOf(t)>-1||/[A-Z]/u.test(t))return!0;return!1}let sJ=t=>(e,i)=>{let r=(0,h.useContext)(sC),s=(0,h.useContext)(ra),a=()=>(function({scrapeMotionValuesFromProps:t,createRenderState:e},i,r,s){return{latestValues:function(t,e,i,r){let s={},a=r(t,{});for(let t in a)s[t]=rx(a[t]);let{initial:o,animate:n}=t,l=sA(t),u=sM(t);e&&u&&!l&&!1!==t.inherit&&(void 0===o&&(o=e.initial),void 0===n&&(n=e.animate));let d=!!i&&!1===i.initial,c=(d=d||!1===o)?n:o;if(c&&"boolean"!=typeof c&&!id(c)){let e=Array.isArray(c)?c:[c];for(let i=0;i<e.length;i++){let r=L(t,e[i]);if(r){let{transitionEnd:t,transition:e,...i}=r;for(let t in i){let e=i[t];if(Array.isArray(e)){let t=d?e.length-1:0;e=e[t]}null!==e&&(s[t]=e)}for(let e in t)s[e]=t[e]}}}return s}(i,r,s,t),renderState:e()}})(t,e,r,s);return i?a():ia(a)};function s0(t,e,i){let{style:r}=t,s={};for(let a in r)(U(r[a])||e.style&&U(e.style[a])||sB(a,t)||i?.getValue(a)?.liveStyle!==void 0)&&(s[a]=r[a]);return s}let s5={useVisualState:sJ({scrapeMotionValuesFromProps:s0,createRenderState:s$})};function s2(t,e,i){let r=s0(t,e,i);for(let i in t)(U(t[i])||U(e[i]))&&(r[-1!==N.indexOf(i)?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i]=t[i]);return r}let s1={useVisualState:sJ({scrapeMotionValuesFromProps:s2,createRenderState:sX})},s3=t=>e=>e.test(t),s4=[ti,tg,tf,tm,tv,ty,{test:t=>"auto"===t,parse:t=>t}],s6=t=>s4.find(s3(t)),s8=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,s9=new Set(["brightness","contrast","saturate","opacity"]);function s7(t){let[e,i]=t.slice(0,-1).split("(");if("drop-shadow"===e)return t;let[r]=i.match(to)||[];if(!r)return t;let s=i.replace(r,""),a=+!!s9.has(e);return r!==i&&(a*=100),e+"("+a+s+")"}let at=/\b([a-z-]*)\(.*?\)/gu,ae={...tE,getAnimatableNone:t=>{let e=t.match(at);return e?e.map(s7).join(" "):t}},ai={...sF,color:tw,backgroundColor:tw,outlineColor:tw,fill:tw,stroke:tw,borderColor:tw,borderTopColor:tw,borderRightColor:tw,borderBottomColor:tw,borderLeftColor:tw,filter:ae,WebkitFilter:ae},ar=t=>ai[t];function as(t,e){let i=ar(t);return i!==ae&&(i=tE),i.getAnimatableNone?i.getAnimatableNone(e):void 0}let aa=new Set(["auto","none","0"]);class ao extends e${constructor(t,e,i,r,s){super(t,e,i,r,s,!0)}readKeyframes(){let{unresolvedKeyframes:t,element:e,name:i}=this;if(!e||!e.current)return;super.readKeyframes();for(let i=0;i<t.length;i++){let r=t[i];if("string"==typeof r&&tt(r=r.trim())){let s=function t(e,i,r=1){g(r<=4,`Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`);let[s,a]=function(t){let e=s8.exec(t);if(!e)return[,];let[,i,r,s]=e;return[`--${i??r}`,s]}(e);if(!s)return;let o=window.getComputedStyle(i).getPropertyValue(s);if(o){let t=o.trim();return/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)?parseFloat(t):t}return tt(a)?t(a,i,r+1):a}(r,e.current);void 0!==s&&(t[i]=s),i===t.length-1&&(this.finalKeyframe=r)}}if(this.resolveNoneKeyframes(),!$.has(i)||2!==t.length)return;let[r,s]=t,a=s6(r),o=s6(s);if(a!==o)if(eD(a)&&eD(o))for(let e=0;e<t.length;e++){let i=t[e];"string"==typeof i&&(t[e]=parseFloat(i))}else eB[i]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:t,name:e}=this,i=[];for(let e=0;e<t.length;e++)(null===t[e]||function(t){if("number"==typeof t)return 0===t;if(null===t)return!0;return"none"===t||"0"===t||/^0[^.\s]+$/u.test(t)}(t[e]))&&i.push(e);i.length&&function(t,e,i){let r,s=0;for(;s<t.length&&!r;){let e=t[s];"string"==typeof e&&!aa.has(e)&&tj(e).values.length&&(r=t[s]),s++}if(r&&i)for(let s of e)t[s]=as(i,r)}(t,i,e)}measureInitialState(){let{element:t,unresolvedKeyframes:e,name:i}=this;if(!t||!t.current)return;"height"===i&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=eB[i](t.measureViewportBox(),window.getComputedStyle(t.current)),e[0]=this.measuredOrigin;let r=e[e.length-1];void 0!==r&&t.getValue(i,r).jump(r,!1)}measureEndState(){let{element:t,name:e,unresolvedKeyframes:i}=this;if(!t||!t.current)return;let r=t.getValue(e);r&&r.jump(this.measuredOrigin,!1);let s=i.length-1,a=i[s];i[s]=eB[e](t.measureViewportBox(),window.getComputedStyle(t.current)),null!==a&&void 0===this.finalKeyframe&&(this.finalKeyframe=a),this.removedTransforms?.length&&this.removedTransforms.forEach(([e,i])=>{t.getValue(e).set(i)}),this.resolveNoneKeyframes()}}let an=[...s4,tw,tE],al={current:null},au={current:!1},ad=new WeakMap,ac=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class ah{scrapeMotionValuesFromProps(t,e,i){return{}}constructor({parent:t,props:e,presenceContext:i,reducedMotionConfig:r,blockInitialAnimation:s,visualState:a},o={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=e$,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let t=M.now();this.renderScheduledAt<t&&(this.renderScheduledAt=t,S.render(this.render,!1,!0))};const{latestValues:n,renderState:l}=a;this.latestValues=n,this.baseTarget={...n},this.initialValues=e.initial?{...n}:{},this.renderState=l,this.parent=t,this.props=e,this.presenceContext=i,this.depth=t?t.depth+1:0,this.reducedMotionConfig=r,this.options=o,this.blockInitialAnimation=!!s,this.isControllingVariants=sA(e),this.isVariantNode=sM(e),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:u,...d}=this.scrapeMotionValuesFromProps(e,{},this);for(const t in d){const e=d[t];void 0!==n[t]&&U(e)&&e.set(n[t],!1)}}mount(t){this.current=t,ad.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,e)=>this.bindToMotionValue(e,t)),au.current||function(){if(au.current=!0,io)if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion)"),e=()=>al.current=t.matches;t.addListener(e),e()}else al.current=!1}(),this.shouldReduceMotion="never"!==this.reducedMotionConfig&&("always"===this.reducedMotionConfig||al.current),this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){for(let t in this.projection&&this.projection.unmount(),P(this.notifyUpdate),P(this.render),this.valueSubscriptions.forEach(t=>t()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this),this.events)this.events[t].clear();for(let t in this.features){let e=this.features[t];e&&(e.unmount(),e.isMounted=!1)}this.current=null}bindToMotionValue(t,e){let i;this.valueSubscriptions.has(t)&&this.valueSubscriptions.get(t)();let r=z.has(t);r&&this.onBindTransform&&this.onBindTransform();let s=e.on("change",e=>{this.latestValues[t]=e,this.props.onUpdate&&S.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0)}),a=e.on("renderRequest",this.scheduleRender);window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,t,e)),this.valueSubscriptions.set(t,()=>{s(),a(),i&&i(),e.owner&&e.stop()})}sortNodePosition(t){return this.current&&this.sortInstanceNodePosition&&this.type===t.type?this.sortInstanceNodePosition(this.current,t.current):0}updateFeatures(){let t="animation";for(t in sV){let e=sV[t];if(!e)continue;let{isEnabled:i,Feature:r}=e;if(!this.features[t]&&r&&i(this.props)&&(this.features[t]=new r(this)),this.features[t]){let e=this.features[t];e.isMounted?e.update():(e.mount(),e.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):iI()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,e){this.latestValues[t]=e}update(t,e){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=e;for(let e=0;e<ac.length;e++){let i=ac[e];this.propEventSubscriptions[i]&&(this.propEventSubscriptions[i](),delete this.propEventSubscriptions[i]);let r=t["on"+i];r&&(this.propEventSubscriptions[i]=this.on(i,r))}this.prevMotionValues=function(t,e,i){for(let r in e){let s=e[r],a=i[r];if(U(s))t.addValue(r,s);else if(U(a))t.addValue(r,V(s,{owner:t}));else if(a!==s)if(t.hasValue(r)){let e=t.getValue(r);!0===e.liveStyle?e.jump(s):e.hasAnimated||e.set(s)}else{let e=t.getStaticValue(r);t.addValue(r,V(void 0!==e?e:s,{owner:t}))}}for(let r in i)void 0===e[r]&&t.removeValue(r);return e}(this,this.scrapeMotionValuesFromProps(t,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(t){let e=this.getClosestVariantNode();if(e)return e.variantChildren&&e.variantChildren.add(t),()=>e.variantChildren.delete(t)}addValue(t,e){let i=this.values.get(t);e!==i&&(i&&this.removeValue(t),this.bindToMotionValue(t,e),this.values.set(t,e),this.latestValues[t]=e.get())}removeValue(t){this.values.delete(t);let e=this.valueSubscriptions.get(t);e&&(e(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,e){if(this.props.values&&this.props.values[t])return this.props.values[t];let i=this.values.get(t);return void 0===i&&void 0!==e&&(i=V(null===e?void 0:e,{owner:this}),this.addValue(t,i)),i}readValue(t,e){let i=void 0===this.latestValues[t]&&this.current?this.getBaseTargetFromProps(this.props,t)??this.readValueFromInstance(this.current,t,this.options):this.latestValues[t];if(null!=i){let r,s;if("string"==typeof i&&(r=i,/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(r)||(s=i,/^0[^.\s]+$/u.test(s))))i=parseFloat(i);else{let r;r=i,!an.find(s3(r))&&tE.test(e)&&(i=as(t,e))}this.setBaseTarget(t,U(i)?i.get():i)}return U(i)?i.get():i}setBaseTarget(t,e){this.baseTarget[t]=e}getBaseTarget(t){let e,{initial:i}=this.props;if("string"==typeof i||"object"==typeof i){let r=L(this.props,i,this.presenceContext?.custom);r&&(e=r[t])}if(i&&void 0!==e)return e;let r=this.getBaseTargetFromProps(this.props,t);return void 0===r||U(r)?void 0!==this.initialValues[t]&&void 0===e?void 0:this.baseTarget[t]:r}on(t,e){return this.events[t]||(this.events[t]=new x),this.events[t].add(e)}notify(t,...e){this.events[t]&&this.events[t].notify(...e)}}class ap extends ah{constructor(){super(...arguments),this.KeyframeResolver=ao}sortInstanceNodePosition(t,e){return 2&t.compareDocumentPosition(e)?1:-1}getBaseTargetFromProps(t,e){return t.style?t.style[e]:void 0}removeValueFromRenderState(t,{vars:e,style:i}){delete e[t],delete i[t]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:t}=this.props;U(t)&&(this.childSubscription=t.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}}function am(t,{style:e,vars:i},r,s){for(let a in Object.assign(t.style,e,s&&s.getProjectionStyles(r)),i)t.style.setProperty(a,i[a])}class af extends ap{constructor(){super(...arguments),this.type="html",this.renderInstance=am}readValueFromInstance(t,e){if(z.has(e))return this.projection?.isProjecting?eA(e):((t,e)=>{let{transform:i="none"}=getComputedStyle(t);return eM(i,e)})(t,e);{let i=window.getComputedStyle(t),r=(Q(e)?i.getPropertyValue(e):i[e])||0;return"string"==typeof r?r.trim():r}}measureInstanceViewportBox(t,{transformPagePoint:e}){return iZ(t,e)}build(t,e,i){sz(t,e,i.transformTemplate)}scrapeMotionValuesFromProps(t,e,i){return s0(t,e,i)}}let ag=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);class ay extends ap{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=iI}getBaseTargetFromProps(t,e){return t[e]}readValueFromInstance(t,e){if(z.has(e)){let t=ar(e);return t&&t.default||0}return e=ag.has(e)?e:H(e),t.getAttribute(e)}scrapeMotionValuesFromProps(t,e,i){return s2(t,e,i)}build(t,e,i){sY(t,e,this.isSVGTag,i.transformTemplate,i.style)}renderInstance(t,e,i,r){for(let i in am(t,e,void 0,r),e.attrs)t.setAttribute(ag.has(i)?i:H(i),e.attrs[i])}mount(t){this.isSVGTag=sG(t.tagName),super.mount(t)}}let av=function(t){if("u"<typeof Proxy)return t;let e=new Map;return new Proxy((...e)=>t(...e),{get:(i,r)=>"create"===r?t:(e.has(r)||e.set(r,t(r)),e.get(r))})}((aM={animation:{Feature:class extends iw{constructor(t){super(t),t.animationState||(t.animationState=function(t){let e=e=>Promise.all(e.map(({animation:e,options:i})=>ii(t,e,i))),i=ib(),r=!0,s=e=>(i,r)=>{let s=O(t,r,"exit"===e?t.presenceContext?.custom:void 0);if(s){let{transition:t,transitionEnd:e,...r}=s;i={...i,...r,...e}}return i};function a(a){let{props:o}=t,n=function t(e){if(!e)return;if(!e.isControllingVariants){let i=e.parent&&t(e.parent)||{};return void 0!==e.props.initial&&(i.initial=e.props.initial),i}let i={};for(let t=0;t<ig;t++){let r=im[t],s=e.props[r];(ih(s)||!1===s)&&(i[r]=s)}return i}(t.parent)||{},l=[],u=new Set,d={},c=1/0;for(let e=0;e<iv;e++){var h,p;let m=iy[e],f=i[m],g=void 0!==o[m]?o[m]:n[m],y=ih(g),v=m===a?f.isActive:null;!1===v&&(c=e);let x=g===n[m]&&g!==o[m]&&y;if(x&&r&&t.manuallyAnimateOnMount&&(x=!1),f.protectedKeys={...d},!f.isActive&&null===v||!g&&!f.prevProp||id(g)||"boolean"==typeof g)continue;let b=(h=f.prevProp,"string"==typeof(p=g)?p!==h:!!Array.isArray(p)&&!ic(p,h)),w=b||m===a&&f.isActive&&!x&&y||e>c&&y,k=!1,T=Array.isArray(g)?g:[g],S=T.reduce(s(m),{});!1===v&&(S={});let{prevResolvedValues:P={}}=f,j={...P,...S},C=e=>{w=!0,u.has(e)&&(k=!0,u.delete(e)),f.needsAnimating[e]=!0;let i=t.getValue(e);i&&(i.liveStyle=!1)};for(let t in j){let e=S[t],i=P[t];if(!d.hasOwnProperty(t))(R(e)&&R(i)?ic(e,i):e===i)?void 0!==e&&u.has(t)?C(t):f.protectedKeys[t]=!0:null!=e?C(t):u.add(t)}f.prevProp=g,f.prevResolvedValues=S,f.isActive&&(d={...d,...S}),r&&t.blockInitialAnimation&&(w=!1);let A=!(x&&b)||k;w&&A&&l.push(...T.map(t=>({animation:t,options:{type:m}})))}if(u.size){let e={};if("boolean"!=typeof o.initial){let i=O(t,Array.isArray(o.initial)?o.initial[0]:o.initial);i&&i.transition&&(e.transition=i.transition)}u.forEach(i=>{let r=t.getBaseTarget(i),s=t.getValue(i);s&&(s.liveStyle=!0),e[i]=r??null}),l.push({animation:e})}let m=!!l.length;return r&&(!1===o.initial||o.initial===o.animate)&&!t.manuallyAnimateOnMount&&(m=!1),r=!1,m?e(l):Promise.resolve()}return{animateChanges:a,setActive:function(e,r){if(i[e].isActive===r)return Promise.resolve();t.variantChildren?.forEach(t=>t.animationState?.setActive(e,r)),i[e].isActive=r;let s=a(e);for(let t in i)i[t].protectedKeys={};return s},setAnimateFunction:function(i){e=i(t)},getState:()=>i,reset:()=>{i=ib(),r=!0}}}(t))}updateAnimationControlsSubscription(){let{animate:t}=this.node.getProps();id(t)&&(this.unmountControls=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:t}=this.node.getProps(),{animate:e}=this.node.prevProps||{};t!==e&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}},exit:{Feature:class extends iw{constructor(){super(...arguments),this.id=ik++}update(){if(!this.node.presenceContext)return;let{isPresent:t,onExitComplete:e}=this.node.presenceContext,{isPresent:i}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===i)return;let r=this.node.animationState.setActive("exit",!t);e&&!t&&r.then(()=>{e(this.id)})}mount(){let{register:t,onExitComplete:e}=this.node.presenceContext||{};e&&e(this.id),t&&(this.unmount=t(this.id))}unmount(){}}},inView:{Feature:class extends iw{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var t;let e;this.unmount();let{viewport:i={}}=this.node.getProps(),{root:r,margin:s,amount:a="some",once:o}=i,n={root:r?r.current:void 0,rootMargin:s,threshold:"number"==typeof a?a:sS[a]},l=t=>{let{isIntersecting:e}=t;if(this.isInView===e||(this.isInView=e,o&&!e&&this.hasEnteredView))return;e&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",e);let{onViewportEnter:i,onViewportLeave:r}=this.node.getProps(),s=e?i:r;s&&s(t)};return t=this.node.current,e=function({root:t,...e}){let i=t||document;sw.has(i)||sw.set(i,{});let r=sw.get(i),s=JSON.stringify(e);return r[s]||(r[s]=new IntersectionObserver(sT,{root:t,...e})),r[s]}(n),sb.set(t,l),e.observe(t),()=>{sb.delete(t),e.unobserve(t)}}mount(){this.startObserver()}update(){if("u"<typeof IntersectionObserver)return;let{props:t,prevProps:e}=this.node;["amount","margin","root"].some(function({viewport:t={}},{viewport:e={}}={}){return i=>t[i]!==e[i]}(t,e))&&this.startObserver()}unmount(){}}},tap:{Feature:class extends iw{mount(){let{current:t}=this.node;t&&(this.unmount=function(t,e,i={}){let[r,s,a]=sd(t,i),o=t=>{let r=t.currentTarget;if(!sv(t))return;sf.add(r);let a=e(r,t),o=(t,e)=>{window.removeEventListener("pointerup",n),window.removeEventListener("pointercancel",l),sf.has(r)&&sf.delete(r),sv(t)&&"function"==typeof a&&a(t,{success:e})},n=t=>{o(t,r===window||r===document||i.useGlobalTarget||sp(r,t.target))},l=t=>{o(t,!1)};window.addEventListener("pointerup",n,s),window.addEventListener("pointercancel",l,s)};return r.forEach(t=>{((i.useGlobalTarget?window:t).addEventListener("pointerdown",o,s),e0(t))&&(t.addEventListener("focus",t=>((t,e)=>{let i=t.currentTarget;if(!i)return;let r=sg(()=>{if(sf.has(i))return;sy(i,"down");let t=sg(()=>{sy(i,"up")});i.addEventListener("keyup",t,e),i.addEventListener("blur",()=>sy(i,"cancel"),e)});i.addEventListener("keydown",r,e),i.addEventListener("blur",()=>i.removeEventListener("keydown",r),e)})(t,s)),sm.has(t.tagName)||-1!==t.tabIndex||t.hasAttribute("tabindex")||(t.tabIndex=0))}),a}(t,(t,e)=>(sx(this.node,e,"Start"),(t,{success:e})=>sx(this.node,t,e?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}},focus:{Feature:class extends iw{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch(e){t=!0}t&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=G(iS(this.node.current,"focus",()=>this.onFocus()),iS(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}},hover:{Feature:class extends iw{mount(){let{current:t}=this.node;t&&(this.unmount=function(t,e,i={}){let[r,s,a]=sd(t,i),o=t=>{if(!sc(t))return;let{target:i}=t,r=e(i,t);if("function"!=typeof r||!i)return;let a=t=>{sc(t)&&(r(t),i.removeEventListener("pointerleave",a))};i.addEventListener("pointerleave",a,s)};return r.forEach(t=>{t.addEventListener("pointerenter",o,s)}),a}(t,(t,e)=>(sh(this.node,e,"Start"),t=>sh(this.node,t,"End"))))}unmount(){}}},pan:{Feature:class extends iw{constructor(){super(...arguments),this.removePointerDownListener=w}onPointerDown(t){this.session=new i0(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:i_(this.node)})}createPanHandlers(){let{onPanSessionStart:t,onPanStart:e,onPan:i,onPanEnd:r}=this.node.getProps();return{onSessionStart:ri(t),onStart:ri(e),onMove:i,onEnd:(t,e)=>{delete this.session,r&&S.postRender(()=>r(t,e))}}}mount(){this.removePointerDownListener=iC(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}},drag:{Feature:class extends iw{constructor(t){super(t),this.removeGroupControls=w,this.removeListeners=w,this.controls=new rt(t)}mount(){let{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||w}unmount(){this.removeGroupControls(),this.removeListeners()}},ProjectionNode:su,MeasureLayout:rm},layout:{ProjectionNode:su,MeasureLayout:rm}},aE=(t,e)=>sQ(t)?new ay(e):new af(e,{allowProjection:t!==h.Fragment}),function(t,{forwardMotionProps:e}={forwardMotionProps:!1}){return function({preloadedFeatures:t,createVisualElement:e,useRender:i,useVisualState:r,Component:s}){function a(t,a){var o;let n,l={...(0,h.useContext)(sj),...t,layoutId:function({layoutId:t}){let e=(0,h.useContext)(rn).id;return e&&void 0!==t?e+"-"+t:t}(t)},{isStatic:u}=l,d=function(t){let{initial:e,animate:i}=function(t,e){if(sA(t)){let{initial:e,animate:i}=t;return{initial:!1===e||ih(e)?e:void 0,animate:ih(i)?i:void 0}}return!1!==t.inherit?e:{}}(t,(0,h.useContext)(sC));return(0,h.useMemo)(()=>({initial:e,animate:i}),[sE(e),sE(i)])}(t),c=r(t,u);if(!u&&io){(0,h.useContext)(sP).strict;let t=function(t){let{drag:e,layout:i}=sV;if(!e&&!i)return{};let r={...e,...i};return{MeasureLayout:e?.isEnabled(t)||i?.isEnabled(t)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}(l);n=t.MeasureLayout,d.visualElement=function(t,e,i,r,s){let{visualElement:a}=(0,h.useContext)(sC),o=(0,h.useContext)(sP),n=(0,h.useContext)(ra),l=(0,h.useContext)(sj).reducedMotion,u=(0,h.useRef)(null);r=r||o.renderer,!u.current&&r&&(u.current=r(t,{visualState:e,parent:a,props:i,presenceContext:n,blockInitialAnimation:!!n&&!1===n.initial,reducedMotionConfig:l}));let d=u.current,c=(0,h.useContext)(rl);d&&!d.projection&&s&&("html"===d.type||"svg"===d.type)&&function(t,e,i,r){let{layoutId:s,layout:a,drag:o,dragConstraints:n,layoutScroll:l,layoutRoot:u,layoutCrossfade:d}=e;t.projection=new i(t.latestValues,e["data-framer-portal-id"]?void 0:function t(e){if(e)return!1!==e.options.allowProjection?e.projection:t(e.parent)}(t.parent)),t.projection.setOptions({layoutId:s,layout:a,alwaysMeasureLayout:!!o||n&&iQ(n),visualElement:t,animationType:"string"==typeof a?a:"both",initialPromotionConfig:r,crossfade:d,layoutScroll:l,layoutRoot:u})}(u.current,i,s,c);let p=(0,h.useRef)(!1);(0,h.useInsertionEffect)(()=>{d&&p.current&&d.update(i,n)});let m=i[Y],f=(0,h.useRef)(!!m&&!window.MotionHandoffIsComplete?.(m)&&window.MotionHasOptimisedAnimation?.(m));return il(()=>{d&&(p.current=!0,window.MotionIsMounted=!0,d.updateFeatures(),rr.render(d.render),f.current&&d.animationState&&d.animationState.animateChanges())}),(0,h.useEffect)(()=>{d&&(!f.current&&d.animationState&&d.animationState.animateChanges(),f.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(m)}),f.current=!1))}),d}(s,c,l,e,t.ProjectionNode)}return(0,p.jsxs)(sC.Provider,{value:d,children:[n&&d.visualElement?(0,p.jsx)(n,{visualElement:d.visualElement,...l}):null,i(s,t,(o=d.visualElement,(0,h.useCallback)(t=>{t&&c.onMount&&c.onMount(t),o&&(t?o.mount(t):o.unmount()),a&&("function"==typeof a?a(t):iQ(a)&&(a.current=t))},[o])),c,u,d.visualElement)]})}t&&function(t){for(let e in t)sV[e]={...sV[e],...t[e]}}(t),a.displayName=`motion.${"string"==typeof s?s:`create(${s.displayName??s.name??""})`}`;let o=(0,h.forwardRef)(a);return o[sR]=s,o}({...sQ(t)?s1:s5,preloadedFeatures:aM,useRender:function(t=!1){return(e,i,r,{latestValues:s},a)=>{let o=(sQ(e)?function(t,e,i,r){let s=(0,h.useMemo)(()=>{let i=sX();return sY(i,e,sG(r),t.transformTemplate,t.style),{...i.attrs,style:{...i.style}}},[e]);if(t.style){let e={};sU(e,t.style,t),s.style={...e,...s.style}}return s}:function(t,e){let i,r,s={},a=(i=t.style||{},sU(r={},i,t),Object.assign(r,function({transformTemplate:t},e){return(0,h.useMemo)(()=>{let i=s$();return sz(i,e,t),Object.assign({},i.vars,i.style)},[e])}(t,e)),r);return t.drag&&!1!==t.dragListener&&(s.draggable=!1,a.userSelect=a.WebkitUserSelect=a.WebkitTouchCallout="none",a.touchAction=!0===t.drag?"none":`pan-${"x"===t.drag?"y":"x"}`),void 0===t.tabIndex&&(t.onTap||t.onTapStart||t.whileTap)&&(s.tabIndex=0),s.style=a,s})(i,s,a,e),n=function(t,e,i){let r={};for(let s in t)("values"!==s||"object"!=typeof t.values)&&(sZ(s)||!0===i&&sq(s)||!e&&!sq(s)||t.draggable&&s.startsWith("onDrag"))&&(r[s]=t[s]);return r}(i,"string"==typeof e,t),l=e!==h.Fragment?{...n,...o,ref:r}:{},{children:u}=i,d=(0,h.useMemo)(()=>U(u)?u.get():u,[u]);return(0,h.createElement)(e,{...l,children:d})}}(e),createVisualElement:aE,Component:t})}));var ax=h;class ab extends ax.Component{getSnapshotBeforeUpdate(t){let e=this.props.childRef.current;if(e&&t.isPresent&&!this.props.isPresent){let t=e.offsetParent,i=e0(t)&&t.offsetWidth||0,r=this.props.sizeRef.current;r.height=e.offsetHeight||0,r.width=e.offsetWidth||0,r.top=e.offsetTop,r.left=e.offsetLeft,r.right=i-r.width-r.left}return null}componentDidUpdate(){}render(){return this.props.children}}function aw({children:t,isPresent:e,anchorX:i}){let r=(0,ax.useId)(),s=(0,ax.useRef)(null),a=(0,ax.useRef)({width:0,height:0,top:0,left:0,right:0}),{nonce:o}=(0,ax.useContext)(sj);return(0,ax.useInsertionEffect)(()=>{let{width:t,height:n,top:l,left:u,right:d}=a.current;if(e||!s.current||!t||!n)return;let c="left"===i?`left: ${u}`:`right: ${d}`;s.current.dataset.motionPopId=r;let h=document.createElement("style");return o&&(h.nonce=o),document.head.appendChild(h),h.sheet&&h.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${n}px !important;
            ${c}px !important;
            top: ${l}px !important;
          }
        `),()=>{document.head.contains(h)&&document.head.removeChild(h)}},[e]),(0,p.jsx)(ab,{isPresent:e,childRef:s,sizeRef:a,children:ax.cloneElement(t,{ref:s})})}let ak=({children:t,initial:e,isPresent:i,onExitComplete:r,custom:s,presenceAffectsLayout:a,mode:o,anchorX:n})=>{let l=ia(aT),u=(0,h.useId)(),d=!0,c=(0,h.useMemo)(()=>(d=!1,{id:u,initial:e,isPresent:i,custom:s,onExitComplete:t=>{for(let e of(l.set(t,!0),l.values()))if(!e)return;r&&r()},register:t=>(l.set(t,!1),()=>l.delete(t))}),[i,l,r]);return a&&d&&(c={...c}),(0,h.useMemo)(()=>{l.forEach((t,e)=>l.set(e,!1))},[i]),h.useEffect(()=>{i||l.size||!r||r()},[i]),"popLayout"===o&&(t=(0,p.jsx)(aw,{isPresent:i,anchorX:n,children:t})),(0,p.jsx)(ra.Provider,{value:c,children:t})};function aT(){return new Map}let aS=t=>t.key||"";function aP(t){let e=[];return h.Children.forEach(t,t=>{(0,h.isValidElement)(t)&&e.push(t)}),e}let aj=({children:t,custom:e,initial:i=!0,onExitComplete:r,presenceAffectsLayout:s=!0,mode:a="sync",propagate:o=!1,anchorX:n="left"})=>{let[l,u]=ro(o),d=(0,h.useMemo)(()=>aP(t),[t]),c=o&&!l?[]:d.map(aS),m=(0,h.useRef)(!0),f=(0,h.useRef)(d),g=ia(()=>new Map),[y,v]=(0,h.useState)(d),[x,b]=(0,h.useState)(d);il(()=>{m.current=!1,f.current=d;for(let t=0;t<x.length;t++){let e=aS(x[t]);c.includes(e)?g.delete(e):!0!==g.get(e)&&g.set(e,!1)}},[x,c.length,c.join("-")]);let w=[];if(d!==y){let t=[...d];for(let e=0;e<x.length;e++){let i=x[e],r=aS(i);c.includes(r)||(t.splice(e,0,i),w.push(i))}return"wait"===a&&w.length&&(t=w),b(aP(t)),v(d),null}let{forceRender:k}=(0,h.useContext)(rn);return(0,p.jsx)(p.Fragment,{children:x.map(t=>{let h=aS(t),y=(!o||!!l)&&(d===x||c.includes(h));return(0,p.jsx)(ak,{isPresent:y,initial:(!m.current||!!i)&&void 0,custom:e,presenceAffectsLayout:s,mode:a,onExitComplete:y?void 0:()=>{if(!g.has(h))return;g.set(h,!0);let t=!0;g.forEach(e=>{e||(t=!1)}),t&&(k?.(),b(f.current),o&&u?.(),r&&r())},anchorX:n,children:t},h)})})};var aC=Object.defineProperty;Object.prototype.hasOwnProperty;var aA,aM,aE,aD,aV,aR,aB,aL,aO,aF,aI,aN,az,a$,aU=(t,e)=>()=>(t&&(e=t(t=0)),e),aW=aU(()=>{aD=t=>{let e,i=new Set,r=(t,r)=>{let s="function"==typeof t?t(e):t;if(!Object.is(s,e)){let t=e;e=r??("object"!=typeof s||null===s)?s:Object.assign({},e,s),i.forEach(i=>i(e,t))}},s=()=>e,a={setState:r,getState:s,getInitialState:()=>o,subscribe:t=>(i.add(t),()=>i.delete(t))},o=e=t(r,s,a);return a},aV=t=>t?aD(t):aD}),aH=aU(()=>{aW(),aR=t=>{let e=aV(t),i=t=>(function(t,e=t=>t){let i=h.default.useSyncExternalStore(t.subscribe,()=>e(t.getState()),()=>e(t.getInitialState()));return h.default.useDebugValue(i),i})(e,t);return Object.assign(i,e),i},aB=t=>t?aR(t):aR}),aY=aU(()=>{aW(),aH()}),aX=aU(()=>{if(aY(),aL={defaultDuration:4e3,defaultDismissible:!0,defaultPauseOnHover:!0,defaultDismissOnClick:!1,defaultAnimation:"slide",defaultStyle:"solid",defaultProgressBarPosition:"bottom",defaultProgressBarThickness:3,defaultProgressAnimation:"linear",defaultFloating:!1,defaultRippleEffect:!1,defaultSwipeToDismiss:!1,defaultPriority:"normal",defaultStagger:0},aO=()=>{if(typeof window>"u"||"function"!=typeof window.matchMedia)return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}},aF=aB((t,e)=>({toasts:[],maxToasts:3,theme:"system",effectiveTheme:aO(),pausedToasts:new Set,activeTimers:new Map,timerStartedAt:new Map,remainingTime:new Map,plugins:[],config:aL,setConfig:e=>{t(t=>({config:{...t.config,...e}}))},addToast:i=>{try{let{plugins:r,activeTimers:s,pausedToasts:a}=e(),o=i;for(let t of r)if(t.beforeCreate){let e=t.beforeCreate(o),i;(e.style||o.style)&&(i={...o.style||{},...e.style||{}}),o={...o,...e,id:e.id||o.id,variant:e.variant||o.variant,position:e.position||o.position,duration:void 0!==e.duration?e.duration:o.duration,pauseOnHover:void 0!==e.pauseOnHover?e.pauseOnHover:o.pauseOnHover,dismissible:void 0!==e.dismissible?e.dismissible:o.dismissible,dismissOnClick:void 0!==e.dismissOnClick?e.dismissOnClick:o.dismissOnClick,theme:e.theme||o.theme,createdAt:o.createdAt,style:i,iconString:o.iconString,updating:o.updating}}let n=e().toasts;if(n.length>=e().maxToasts){let t=[...n].sort((t,e)=>t.createdAt-e.createdAt).find(t=>t.id!==o.id);t&&e().removeToast(t.id)}let l=e().toasts,u=l.length;if("high"===o.priority)u=0;else if("normal"===o.priority){let t=l.findIndex(t=>"low"===t.priority);-1!==t&&(u=t)}let d=[...l];if(d.splice(u,0,o),t({toasts:d}),o.duration>0&&!a.has(o.id)){let i=s.get(o.id);i&&clearTimeout(i);let r=Date.now(),a=window.setTimeout(()=>{e().removeToast(o.id)},o.duration);t(t=>({activeTimers:new Map(t.activeTimers).set(o.id,a),timerStartedAt:new Map(t.timerStartedAt).set(o.id,r)}))}for(let t of r)t.afterCreate?.(o);return o.id}catch(t){return console.error("React Toast Kit: Failed to add toast",t),""}},removeToast:i=>{try{let{toasts:r,plugins:s,activeTimers:a}=e(),o=r.find(t=>t.id===i);if(!o)return;let n=!0;for(let t of s)t.beforeRemove?.(o)===!1&&(n=!1);if(!n)return;let l=a.get(i);for(let e of(l&&clearTimeout(l),o.onDismiss?.(i),t(t=>{let e=new Map(t.activeTimers);e.delete(i);let r=new Map(t.timerStartedAt);r.delete(i);let s=new Map(t.remainingTime);s.delete(i);let a=new Set(t.pausedToasts);return a.delete(i),{toasts:t.toasts.filter(t=>t.id!==i),pausedToasts:a,activeTimers:e,timerStartedAt:r,remainingTime:s}}),s))e.afterRemove?.(o)}catch(t){console.error("React Toast Kit: Failed to remove toast",t)}},updateToast:(i,r)=>{try{if(t(t=>({toasts:t.toasts.map(t=>t.id===i?{...t,...r,updating:!0}:t)})),void 0!==r.duration){let{activeTimers:r,pausedToasts:s}=e(),a=r.get(i);a&&clearTimeout(a);let o=e().toasts.find(t=>t.id===i);if(o&&o.duration>0&&!s.has(i)){let r=Date.now(),s=window.setTimeout(()=>{e().removeToast(i)},o.duration);t(t=>{let e;return{activeTimers:new Map(t.activeTimers).set(i,s),timerStartedAt:new Map(t.timerStartedAt).set(i,r),remainingTime:((e=new Map(t.remainingTime)).delete(i),e)}})}}setTimeout(()=>{t(t=>({toasts:t.toasts.map(t=>t.id===i?{...t,updating:!1}:t)}))},100)}catch(t){console.error("React Toast Kit: Failed to update toast",t)}},pauseToast:i=>{let{activeTimers:r,timerStartedAt:s}=e(),a=r.get(i);if(a){clearTimeout(a);let r=s.get(i),o=e().toasts.find(t=>t.id===i);if(void 0!==r&&o){let e=Date.now()-r,s=Math.max(0,o.duration-e);t(t=>{let e=new Map(t.activeTimers);e.delete(i);let r=new Map(t.timerStartedAt);return r.delete(i),{activeTimers:e,timerStartedAt:r,remainingTime:new Map(t.remainingTime).set(i,s)}})}else t(t=>{let e=new Map(t.activeTimers);return e.delete(i),{activeTimers:e}})}t(t=>({pausedToasts:new Set(t.pausedToasts).add(i)}))},resumeToast:i=>{let{remainingTime:r,toasts:s}=e();t(t=>{let e=new Set(t.pausedToasts);return e.delete(i),{pausedToasts:e}});let a=s.find(t=>t.id===i);if(!a||a.duration<=0)return;let o=r.get(i)??Math.max(0,a.duration-(Date.now()-a.createdAt));if(o>0){let r=Date.now(),s=window.setTimeout(()=>{e().removeToast(i)},o);t(t=>{let e=new Map(t.remainingTime);return e.delete(i),{activeTimers:new Map(t.activeTimers).set(i,s),timerStartedAt:new Map(t.timerStartedAt).set(i,r),remainingTime:e}})}},clearAllToasts:()=>{try{let{toasts:i,activeTimers:r}=e();r.forEach(t=>clearTimeout(t)),i.forEach(t=>t.onDismiss?.(t.id)),t({toasts:[],pausedToasts:new Set,activeTimers:new Map,timerStartedAt:new Map,remainingTime:new Map})}catch(t){console.error("React Toast Kit: Failed to clear all toasts",t)}},setTheme:i=>{t({theme:i}),e().updateEffectiveTheme()},setMaxToasts:e=>{t({maxToasts:Math.max(1,e)})},updateEffectiveTheme:()=>{let{theme:i}=e();t({effectiveTheme:"system"===i?aO():i})},cleanup:()=>{try{let{activeTimers:i,toasts:r}=e();i.forEach(t=>clearTimeout(t)),r.forEach(t=>t.onDismiss?.(t.id)),t({toasts:[],pausedToasts:new Set,activeTimers:new Map,timerStartedAt:new Map,remainingTime:new Map})}catch(t){console.error("React Toast Kit: Failed to cleanup",t)}},registerPlugin:e=>{t(t=>({plugins:[...t.plugins.filter(t=>t.name!==e.name),e]}))},unregisterPlugin:e=>{t(t=>({plugins:t.plugins.filter(t=>t.name!==e)}))}})),"u">typeof window&&"function"==typeof window.matchMedia)try{let t=window.matchMedia("(prefers-color-scheme: dark)"),e=()=>{"system"===aF.getState().theme&&aF.getState().updateEffectiveTheme()};"function"==typeof t.addEventListener?t.addEventListener("change",e):t.addListener?.(e),aF.getState().updateEffectiveTheme()}catch{}aI={success:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Success"><path d="M10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6024 1.66663 10 1.66663C5.39765 1.66663 1.66669 5.39759 1.66669 9.99996C1.66669 14.6023 5.39765 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.66669 10L9.16669 12.5L13.3334 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Error"><path d="M10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6024 1.66663 10 1.66663C5.39765 1.66663 1.66669 5.39759 1.66669 9.99996C1.66669 14.6023 5.39765 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 7.5L7.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 7.5L12.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Warning"><path d="M8.57465 3.21667L1.51632 15C1.37079 15.2589 1.29379 15.5503 1.29298 15.8469C1.29216 16.1434 1.36756 16.4353 1.51175 16.6951C1.65593 16.9548 1.86359 17.1738 2.11656 17.3309C2.36954 17.4879 2.65908 17.5778 2.95548 17.5917H17.0721C17.3685 17.5778 17.6581 17.4879 17.9111 17.3309C18.164 17.1738 18.3717 16.9548 18.5159 16.6951C18.6601 16.4353 18.7355 16.1434 18.7347 15.8469C18.7339 15.5503 18.6569 15.2589 18.5113 15L11.453 3.21667C11.3018 2.96735 11.0893 2.7609 10.8353 2.61224C10.5813 2.46357 10.294 2.3779 10.0005 2.3646C9.7069 2.37798 9.41956 2.46374 9.16556 2.61247C8.91156 2.76121 8.69907 2.96773 8.54798 3.21708L8.57465 3.21667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 7.5V10.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14.1667H10.0083" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Info"><path d="M10 18.3333C14.6024 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6024 1.66663 10 1.66663C5.39765 1.66663 1.66669 5.39759 1.66669 9.99996C1.66669 14.6023 5.39765 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 13.3333V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6.66663H10.0083" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',default:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Notification"><path d="M18.3334 10C18.3334 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66669 14.6024 1.66669 10C1.66669 5.39763 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3334 5.39763 18.3334 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6.66667V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 13.3333H10.0083" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',loading:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin" role="img" aria-label="Loading"><path d="M10 3.33337V5.00004" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 15V16.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.1084 4.1084L5.2834 5.28257" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.7166 14.7167L15.8916 15.8917" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33337 10H5.00004" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10H16.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.1084 15.8917L5.2834 14.7167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.7166 5.28257L15.8916 4.1084" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},aN=t=>{try{let e=aF.getState().config,i={duration:e.defaultDuration,dismissible:e.defaultDismissible,pauseOnHover:e.defaultPauseOnHover,dismissOnClick:e.defaultDismissOnClick,animation:e.defaultAnimation,visualStyle:e.defaultStyle,progressBarStyle:e.defaultProgressBarStyle,progressBarColor:e.defaultProgressBarColor,progressBarPosition:e.defaultProgressBarPosition,progressBarThickness:e.defaultProgressBarThickness,progressAnimation:e.defaultProgressAnimation,floating:e.defaultFloating,rippleEffect:e.defaultRippleEffect,swipeToDismiss:e.defaultSwipeToDismiss,priority:e.defaultPriority,stagger:e.defaultStagger},r="string"==typeof t?{...i,description:t}:{...i,...t};e.globalClassName&&(r.className=r.className?`${e.globalClassName} ${r.className}`:e.globalClassName),e.globalStyle&&(r.style={...e.globalStyle,...r.style||{}});let s={id:r.id||Math.random().toString(36).substring(2,9),variant:r.variant||"default",position:r.position||"top-right",duration:r.duration??e.defaultDuration,pauseOnHover:r.pauseOnHover??!0,dismissible:r.dismissible??!0,dismissOnClick:r.dismissOnClick??!1,theme:r.theme||"system",title:r.title,description:r.description,icon:r.icon,component:r.component,createdAt:Date.now(),onDismiss:r.onDismiss,className:r.className,style:r.style,animation:r.animation,customAnimation:r.customAnimation,visualStyle:r.visualStyle,progressBarStyle:r.progressBarStyle,progressBarColor:r.progressBarColor,progressBarPosition:r.progressBarPosition,progressBarThickness:r.progressBarThickness,floating:r.floating,emoji:r.emoji,rippleEffect:r.rippleEffect,stagger:r.stagger,swipeToDismiss:r.swipeToDismiss,priority:r.priority,progressAnimation:r.progressAnimation,actions:r.actions};return!s.icon&&!s.emoji&&s.variant&&s.variant in aI&&(s.iconString=aI[s.variant]),aF.getState().addToast(s)}catch(t){return console.error("React Toast Kit: Failed to create toast",t),""}},az=t=>e=>aN({..."string"==typeof e?{description:e}:e,variant:t}),(a$=t=>aN(t)).success=az("success"),a$.error=az("error"),a$.warning=az("warning"),a$.info=az("info"),a$.loading=az("loading"),a$.custom=(t,e={})=>aN({...e,component:t,variant:"custom"}),a$.promise=async(t,e)=>{let i=aN({..."string"==typeof e.loading?{description:e.loading}:e.loading,variant:"loading",duration:0}),r=aF.getState().config.defaultDuration;try{let s=await t,a="function"==typeof e.success?e.success(s):e.success;return a$.update(i,"string"==typeof a?{description:a,variant:"success",duration:r}:{...a,variant:"success",duration:a.duration??r}),s}catch(s){let t="function"==typeof e.error?e.error(s):e.error;throw a$.update(i,"string"==typeof t?{description:t,variant:"error",duration:r}:{...t,variant:"error",duration:t.duration??r}),s}},a$.update=(t,e)=>{try{aF.getState().toasts.find(e=>e.id===t)?.variant==="loading"&&e.variant&&"loading"!==e.variant&&!e.duration&&(e.duration=aF.getState().config.defaultDuration),aF.getState().updateToast(t,e)}catch(t){console.error("React Toast Kit: Failed to update toast",t)}},a$.dismiss=t=>{t?aF.getState().removeToast(t):aF.getState().clearAllToasts()},a$.clearAll=()=>{aF.getState().clearAllToasts()},c.default}),aG={},aK={ToastDevTools:()=>u,default:()=>d};for(var aq in aK)aC(aG,aq,{get:aK[aq],enumerable:!0});aU(()=>{aX(),({useState:a,useEffect:o,useCallback:n,useMemo:l}=h),d=u=()=>{let[t,e]=a(!1),[i,r]=a("monitor"),[s,u]=a(!1),{toasts:d,theme:h,effectiveTheme:m,maxToasts:f,pausedToasts:g,activeTimers:y,plugins:v,clearAllToasts:x,removeToast:b,pauseToast:w,resumeToast:k,setTheme:T,setMaxToasts:S}=aF(),[P,j]=a({title:"Test Toast",description:"This is a test toast for debugging",variant:"info",position:"top-right",animation:"slide",visualStyle:"solid",duration:4e3,pauseOnHover:!0,dismissible:!0}),C=l(()=>{let t=d.reduce((t,e)=>(t[e.variant]=(t[e.variant]||0)+1,t),{}),e=d.reduce((t,e)=>(t[e.position]=(t[e.position]||0)+1,t),{});return{total:d.length,paused:g.size,timers:y.size,byVariant:t,byPosition:e}},[d,g,y]),A=n(()=>{a$(P)},[P]);o(()=>{let t=t=>{t.altKey&&t.shiftKey&&"D"===t.key&&e(t=>!t)};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[]);let M=l(()=>({devToolsButton:{position:"fixed",bottom:"16px",right:"16px",zIndex:1e4,width:"48px",height:"48px",borderRadius:"24px",background:"linear-gradient(135deg, #3b82f6, #8b5cf6)",color:"white",boxShadow:"0 4px 12px rgba(59, 130, 246, 0.5)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.2s"},devToolsPanel:{position:"fixed",bottom:"16px",right:"16px",zIndex:1e4,width:s?"320px":"380px",height:s?"48px":"600px",background:"dark"===m?"#1f2937":"white",borderRadius:"8px",boxShadow:"0 10px 25px rgba(0, 0, 0, 0.2)",border:`1px solid ${"dark"===m?"#374151":"#e5e7eb"}`,overflow:"hidden",fontFamily:"system-ui, sans-serif",display:"flex",flexDirection:"column"},panelHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"dark"===m?"#111827":"#f0f9ff",borderBottom:`1px solid ${"dark"===m?"#374151":"#e5e7eb"}`},headerTitle:{display:"flex",alignItems:"center",gap:"8px",fontWeight:600,fontSize:"14px",color:"dark"===m?"#f3f4f6":"#1f2937"},statusIndicator:{width:"8px",height:"8px",borderRadius:"4px",background:"#22c55e"},tabsContainer:{display:"flex",borderBottom:`1px solid ${"dark"===m?"#374151":"#e5e7eb"}`},tab:t=>({flex:1,padding:"10px",textAlign:"center",fontSize:"13px",color:t?"dark"===m?"#60a5fa":"#3b82f6":"dark"===m?"#9ca3af":"#64748b",background:t?"dark"===m?"#111827":"white":"dark"===m?"#1f2937":"#f8fafc",cursor:"pointer",borderBottom:t?`2px solid ${"dark"===m?"#60a5fa":"#3b82f6"}`:"2px solid transparent"}),contentContainer:{padding:"16px",overflowY:"auto",flex:1,fontSize:"14px"},statsGrid:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",marginBottom:"16px"},statCard:(t=!1)=>({padding:"12px",borderRadius:"6px",background:"dark"===m?t?"#422006":"#082f49":t?"#fef3c7":"#f0f9ff",display:"flex",flexDirection:"column"}),statTitle:(t=!1)=>({fontSize:"12px",fontWeight:500,color:"dark"===m?t?"#fcd34d":"#93c5fd":t?"#b45309":"#0369a1",marginBottom:"4px"}),statValue:(t=!1)=>({fontSize:"20px",fontWeight:700,color:"dark"===m?t?"#fbbf24":"#bfdbfe":t?"#92400e":"#0c4a6e"}),sectionTitle:{fontWeight:600,color:"dark"===m?"#e2e8f0":"#334155",margin:"16px 0 8px"},quickTestsGrid:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",marginBottom:"16px"},quickTestButton:{padding:"8px",borderRadius:"6px",background:"dark"===m?"#1f2937":"#f1f5f9",border:"none",color:"dark"===m?"#d1d5db":"#334155",fontSize:"12px",cursor:"pointer",textAlign:"left"},toastsList:{display:"flex",flexDirection:"column",gap:"8px",maxHeight:"240px",overflowY:"auto"},toastItem:{padding:"10px",borderRadius:"6px",background:"dark"===m?"#1f2937":"#f8fafc",border:`1px solid ${"dark"===m?"#374151":"#e2e8f0"}`},toastHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},variantBadge:(t="default")=>{let e=((t="default")=>{switch(t){case"success":return{background:"#dcfce7",color:"#166534"};case"error":return{background:"#fee2e2",color:"#b91c1c"};case"warning":return{background:"#fef3c7",color:"#92400e"};case"info":return{background:"#dbeafe",color:"#1e40af"};case"loading":return{background:"#f3f4f6",color:"#4b5563"};default:return{background:"#f1f5f9",color:"#334155"}}})(t);return{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",fontWeight:500,background:e.background,color:e.color}},toastActions:{display:"flex",gap:"4px"},actionButton:t=>({background:"none",border:"none",fontSize:"11px",cursor:"pointer",padding:"2px 4px",borderRadius:"4px",color:t}),toastContent:{fontSize:"12px",color:"dark"===m?"#cbd5e1":"#475569"},toastTitle:{fontWeight:500,color:"dark"===m?"#e2e8f0":"#334155",marginBottom:"2px"},toastDescription:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},toastMeta:{marginTop:"4px",fontSize:"11px",color:"dark"===m?"#64748b":"#94a3b8"},inputGroup:{marginBottom:"12px"},inputLabel:{display:"block",fontSize:"12px",fontWeight:500,color:"dark"===m?"#e2e8f0":"#334155",marginBottom:"4px"},textInput:{width:"100%",padding:"8px",border:`1px solid ${"dark"===m?"#374151":"#cbd5e1"}`,borderRadius:"4px",fontSize:"12px",background:"dark"===m?"#1f2937":"white",color:"dark"===m?"#f1f5f9":"inherit"},selectInput:{width:"100%",padding:"8px",border:`1px solid ${"dark"===m?"#374151":"#cbd5e1"}`,borderRadius:"4px",fontSize:"12px",background:"dark"===m?"#1f2937":"white",color:"dark"===m?"#f1f5f9":"inherit"},createButton:{width:"100%",padding:"8px",background:"#3b82f6",color:"white",border:"none",borderRadius:"4px",fontSize:"13px",fontWeight:500,cursor:"pointer"},formGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}),[m,s]);return"u">typeof c.default?null:(0,p.jsxs)(p.Fragment,{children:[!t&&(0,p.jsx)("button",{onClick:()=>e(!0),style:M.devToolsButton,title:"Open Toast DevTools (Alt+Shift+D)",children:(0,p.jsxs)("svg",{width:"24",height:"24",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]})}),t&&(0,p.jsxs)("div",{style:M.devToolsPanel,children:[(0,p.jsxs)("div",{style:M.panelHeader,children:[(0,p.jsxs)("div",{style:M.headerTitle,children:[(0,p.jsx)("div",{style:M.statusIndicator}),(0,p.jsx)("span",{children:"React Toast Kit DevTools"}),(0,p.jsxs)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"dark"===m?"#0c4a6e":"#dbeafe",color:"dark"===m?"#bfdbfe":"#1e40af"},children:[C.total," active"]})]}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,p.jsx)("button",{onClick:()=>u(!s),style:{padding:"4px",background:"transparent",border:"none",cursor:"pointer",color:"dark"===m?"#9ca3af":"#64748b"},title:s?"Expand":"Minimize",children:(0,p.jsx)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:s?"M7 14l5-5 5 5":"M17 10l-5 5-5-5"})})}),(0,p.jsx)("button",{onClick:()=>e(!1),style:{padding:"4px",background:"transparent",border:"none",cursor:"pointer",color:"#ef4444"},title:"Close DevTools",children:(0,p.jsx)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})]}),!s&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:M.tabsContainer,children:[{key:"monitor",label:"Monitor",icon:"📊"},{key:"create",label:"Create",icon:"➕"},{key:"settings",label:"Settings",icon:"⚙️"}].map(t=>(0,p.jsxs)("button",{onClick:()=>r(t.key),style:M.tab(i===t.key),children:[(0,p.jsx)("span",{style:{marginRight:"4px"},children:t.icon}),t.label]},t.key))}),(0,p.jsxs)("div",{style:M.contentContainer,children:["monitor"===i&&(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:M.statsGrid,children:[(0,p.jsxs)("div",{style:M.statCard(),children:[(0,p.jsx)("div",{style:M.statTitle(),children:"Total"}),(0,p.jsx)("div",{style:M.statValue(),children:C.total})]}),(0,p.jsxs)("div",{style:M.statCard(!0),children:[(0,p.jsx)("div",{style:M.statTitle(!0),children:"Paused"}),(0,p.jsx)("div",{style:M.statValue(!0),children:C.paused})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h3",{style:M.sectionTitle,children:"Quick Tests"}),(0,p.jsx)("div",{style:M.quickTestsGrid,children:Object.entries({success:()=>a$.success("✅ Success toast test"),error:()=>a$.error("❌ Error toast test"),warning:()=>a$.warning("⚠️ Warning toast test"),info:()=>a$.info("ℹ️ Info toast test"),loading:()=>a$.loading("⏳ Loading toast test"),custom:()=>a$.custom((0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("span",{style:{fontSize:"24px"},children:"🎉"}),(0,p.jsx)("span",{children:"Custom component toast!"})]})),promise:()=>{let t=new Promise((t,e)=>{setTimeout(()=>Math.random()>.5?t("Success!"):e("Failed!"),2e3)});a$.promise(t,{loading:"Loading...",success:"Promise resolved!",error:"Promise rejected!"})},stress:()=>{for(let t=0;t<5;t++)setTimeout(()=>{a$({title:`Stress test toast #${t+1}`,description:"Testing multiple toasts at once",variant:["success","error","warning","info"][t%4],position:["top-left","top-right","bottom-left","bottom-right"][t%4],duration:2e3})},200*t)}}).map(([t,e])=>(0,p.jsx)("button",{onClick:e,style:M.quickTestButton,children:t.charAt(0).toUpperCase()+t.slice(1)},t))})]}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("h3",{style:M.sectionTitle,children:"Active Toasts"}),d.length>0&&(0,p.jsx)("button",{onClick:x,style:{fontSize:"12px",color:"#ef4444",background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline"},children:"Clear All"})]}),(0,p.jsx)("div",{style:M.toastsList,children:0===d.length?(0,p.jsx)("div",{style:{textAlign:"center",padding:"16px",color:"dark"===m?"#9ca3af":"#64748b"},children:"No active toasts"}):d.map(t=>(0,p.jsxs)("div",{style:M.toastItem,children:[(0,p.jsxs)("div",{style:M.toastHeader,children:[(0,p.jsx)("span",{style:M.variantBadge(t.variant),children:t.variant||"default"}),(0,p.jsxs)("div",{style:M.toastActions,children:[(0,p.jsx)("button",{onClick:()=>g.has(t.id)?k(t.id):w(t.id),style:M.actionButton("#2563eb"),children:g.has(t.id)?"▶️":"⏸️"}),(0,p.jsx)("button",{onClick:()=>b(t.id),style:M.actionButton("#ef4444"),children:"❌"})]})]}),(0,p.jsxs)("div",{style:M.toastContent,children:[(0,p.jsx)("div",{style:M.toastTitle,children:t.title||"No title"}),t.description&&(0,p.jsx)("div",{style:M.toastDescription,children:t.description}),(0,p.jsxs)("div",{style:M.toastMeta,children:[t.position," • ",t.animation||"slide"," • ",t.duration,"ms"]})]})]},t.id))})]})]}),"create"===i&&(0,p.jsxs)("div",{children:[(0,p.jsx)("h3",{style:M.sectionTitle,children:"Create Test Toast"}),(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Title"}),(0,p.jsx)("input",{type:"text",value:P.title||"",onChange:t=>j(e=>({...e,title:t.target.value})),style:M.textInput})]}),(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Description"}),(0,p.jsx)("textarea",{value:P.description||"",onChange:t=>j(e=>({...e,description:t.target.value})),style:{...M.textInput,minHeight:"60px",resize:"vertical"},rows:2})]}),(0,p.jsxs)("div",{style:M.formGrid,children:[(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Variant"}),(0,p.jsxs)("select",{value:P.variant||"default",onChange:t=>j(e=>({...e,variant:t.target.value})),style:M.selectInput,children:[(0,p.jsx)("option",{value:"default",children:"Default"}),(0,p.jsx)("option",{value:"success",children:"Success"}),(0,p.jsx)("option",{value:"error",children:"Error"}),(0,p.jsx)("option",{value:"warning",children:"Warning"}),(0,p.jsx)("option",{value:"info",children:"Info"}),(0,p.jsx)("option",{value:"loading",children:"Loading"})]})]}),(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Position"}),(0,p.jsxs)("select",{value:P.position||"top-right",onChange:t=>j(e=>({...e,position:t.target.value})),style:M.selectInput,children:[(0,p.jsx)("option",{value:"top-left",children:"Top Left"}),(0,p.jsx)("option",{value:"top-center",children:"Top Center"}),(0,p.jsx)("option",{value:"top-right",children:"Top Right"}),(0,p.jsx)("option",{value:"bottom-left",children:"Bottom Left"}),(0,p.jsx)("option",{value:"bottom-center",children:"Bottom Center"}),(0,p.jsx)("option",{value:"bottom-right",children:"Bottom Right"})]})]})]}),(0,p.jsxs)("div",{style:M.formGrid,children:[(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Animation"}),(0,p.jsxs)("select",{value:P.animation||"slide",onChange:t=>j(e=>({...e,animation:t.target.value})),style:M.selectInput,children:[(0,p.jsx)("option",{value:"slide",children:"Slide"}),(0,p.jsx)("option",{value:"fade",children:"Fade"}),(0,p.jsx)("option",{value:"bounce",children:"Bounce"}),(0,p.jsx)("option",{value:"flip",children:"Flip"}),(0,p.jsx)("option",{value:"zoom",children:"Zoom"}),(0,p.jsx)("option",{value:"elastic",children:"Elastic"}),(0,p.jsx)("option",{value:"none",children:"None"})]})]}),(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Style"}),(0,p.jsxs)("select",{value:P.visualStyle||"solid",onChange:t=>j(e=>({...e,visualStyle:t.target.value})),style:M.selectInput,children:[(0,p.jsx)("option",{value:"solid",children:"Solid"}),(0,p.jsx)("option",{value:"minimal",children:"Minimal"}),(0,p.jsx)("option",{value:"outlined",children:"Outlined"}),(0,p.jsx)("option",{value:"glass",children:"Glass"}),(0,p.jsx)("option",{value:"gradient",children:"Gradient"}),(0,p.jsx)("option",{value:"shimmer",children:"Shimmer"}),(0,p.jsx)("option",{value:"pill",children:"Pill"}),(0,p.jsx)("option",{value:"neon",children:"Neon"}),(0,p.jsx)("option",{value:"retro",children:"Retro"}),(0,p.jsx)("option",{value:"confetti",children:"Confetti"})]})]})]}),(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Duration (ms)"}),(0,p.jsx)("input",{type:"number",value:P.duration||4e3,onChange:t=>j(e=>({...e,duration:parseInt(t.target.value)})),style:M.textInput})]}),(0,p.jsx)("button",{onClick:A,style:M.createButton,children:"Create Toast"})]})]}),"settings"===i&&(0,p.jsxs)("div",{children:[(0,p.jsx)("h3",{style:M.sectionTitle,children:"Global Settings"}),(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Theme"}),(0,p.jsxs)("select",{value:h,onChange:t=>T(t.target.value),style:M.selectInput,children:[(0,p.jsx)("option",{value:"light",children:"Light"}),(0,p.jsx)("option",{value:"dark",children:"Dark"}),(0,p.jsx)("option",{value:"system",children:"System"})]}),(0,p.jsxs)("div",{style:{fontSize:"11px",color:"dark"===m?"#64748b":"#94a3b8",marginTop:"4px"},children:["Current: ",m]})]}),(0,p.jsxs)("div",{style:M.inputGroup,children:[(0,p.jsx)("label",{style:M.inputLabel,children:"Max Toasts"}),(0,p.jsx)("input",{type:"number",value:f,onChange:t=>S(parseInt(t.target.value)),min:"1",max:"10",style:M.textInput})]}),(0,p.jsxs)("div",{style:{marginTop:"16px",paddingTop:"16px",borderTop:`1px solid ${"dark"===m?"#374151":"#e5e7eb"}`},children:[(0,p.jsx)("h4",{style:{...M.sectionTitle,fontSize:"13px"},children:"Keyboard Shortcuts"}),(0,p.jsx)("div",{style:{fontSize:"12px",background:"dark"===m?"#1f2937":"#f1f5f9",padding:"8px",borderRadius:"4px",marginTop:"8px"},children:(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:"Alt + Shift + D"}),": Toggle DevTools"]})})]}),(0,p.jsxs)("div",{style:{marginTop:"8px",paddingTop:"16px",borderTop:`1px solid ${"dark"===m?"#374151":"#e5e7eb"}`},children:[(0,p.jsx)("h4",{style:{...M.sectionTitle,fontSize:"13px"},children:"Plugin Info"}),0===v.length?(0,p.jsx)("div",{style:{fontSize:"12px",color:"dark"===m?"#9ca3af":"#64748b"},children:"No plugins registered"}):(0,p.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:v.map(t=>(0,p.jsxs)("div",{style:{fontSize:"12px",background:"dark"===m?"#1f2937":"#f1f5f9",padding:"8px",borderRadius:"4px"},children:[(0,p.jsx)("div",{style:{fontWeight:500},children:t.name}),(0,p.jsx)("div",{style:{color:"dark"===m?"#9ca3af":"#64748b"},children:t.description})]},t.name))})]})]})]})]})]})]})]})}}),aX(),aX(),aX();var{useEffect:aZ,useState:a_,memo:aQ,useRef:aJ,useCallback:a0,useMemo:a5}=h,a2=(r=null,s=0,()=>{let t=Date.now();if(null!==r&&t-s<5e3)return r;let e=9e3;if("u">typeof window)try{let t=document.getElementsByTagName("*");for(let i=0;i<t.length;i++){let r=parseInt(window.getComputedStyle(t[i]).zIndex,10);r&&r>e&&(e=r)}}catch{}return r=e+1,s=t,r}),a1={mobile:320,tablet:360,desktop:380},a3=aQ(({svgString:t,className:e=""})=>{let i=a5(()=>({__html:t}),[t]);return(0,p.jsx)("div",{className:e,dangerouslySetInnerHTML:i})});a3.displayName="SVGIcon";var a4=aQ(({toasts:t})=>{let[e,i]=a_(""),r=aJ(""),s=aJ(null);return aZ(()=>{if(0===t.length)return;let e=t[0];if(e.id===s.current)return;let a=e.variant?`${e.variant} notification: `:"";e.title&&(a+=e.title+(e.description?". ":"")),e.description&&(a+=e.description),a&&a!==r.current&&(r.current=a,s.current=e.id,i(a),setTimeout(()=>i(""),1e3))},[t]),e?(0,p.jsx)("div",{"aria-live":"polite","aria-atomic":"true",className:"sr-only",role:"status",children:e}):null});a4.displayName="AccessibilityAnnouncer";var a6=aQ(({duration:t,isPaused:e,progressBarStyle:i,progressBarColor:r,progressBarThickness:s,progressBarPosition:a,progressAnimation:o})=>{let n=iu(),l=aJ(0),u=aJ(null),d=aJ(Date.now()),c=o||"linear",h="left"===a||"right"===a;aZ(()=>{d.current=Date.now(),h?n.start({scaleY:0,transition:{duration:t/1e3,ease:c}}):n.start({scaleX:0,transition:{duration:t/1e3,ease:c}})},[]),aZ(()=>{if(e)n.stop(),u.current=Date.now();else if(null!==u.current){l.current+=Date.now()-u.current,u.current=null;let e=Math.max(0,t/1e3-(Date.now()-d.current-l.current)/1e3);h?n.start({scaleY:0,transition:{duration:e,ease:"linear"}}):n.start({scaleX:0,transition:{duration:e,ease:"linear"}})}},[e]);let m=`react-toast-progress${i?` ${i}`:""}`;return(0,p.jsx)("div",{className:m,children:(0,p.jsx)(av.div,{animate:n,initial:h?{scaleY:1}:{scaleX:1},className:"react-toast-progress-fill",style:{backgroundColor:r||void 0,transformOrigin:h?"top center":"left center",...h?{width:s?`${s}px`:void 0}:{height:s?`${s}px`:void 0}}})})});a6.displayName="ProgressBar";var a8=aQ(({toast:t,onDismiss:e,onPause:i,onResume:r,animation:s,position:a,toastTheme:o,defaultStyle:n})=>{let l=aJ(null),u=aF(e=>e.pausedToasts.has(t.id)),d=a0(()=>e(t.id),[e,t.id]),c=a0(()=>{t.pauseOnHover&&i(t.id)},[i,t.id,t.pauseOnHover]),h=a0(()=>r(t.id),[r,t.id]),m=a0(e=>{if(t.rippleEffect&&l.current){let t=l.current.getBoundingClientRect(),i=document.createElement("div");i.className="toast-ripple-element",i.style.left=`${e.clientX-t.left}px`,i.style.top=`${e.clientY-t.top}px`,l.current.appendChild(i),setTimeout(()=>{l.current?.contains(i)&&l.current.removeChild(i)},700)}t.dismissOnClick&&d()},[t.rippleEffect,t.dismissOnClick,d]),f=a5(()=>{if("gradient"!==(t.visualStyle||n))return{};let e="dark"===o,[i,r]={success:[e?"rgba(5,95,70,.9)":"rgba(16,185,129,.8)",e?"rgba(4,120,87,.8)":"rgba(5,150,105,.7)"],error:[e?"rgba(153,27,27,.9)":"rgba(239,68,68,.8)",e?"rgba(185,28,28,.8)":"rgba(220,38,38,.7)"],warning:[e?"rgba(146,64,14,.9)":"rgba(245,158,11,.8)",e?"rgba(180,83,9,.8)":"rgba(217,119,6,.7)"],info:[e?"rgba(30,64,175,.9)":"rgba(59,130,246,.8)",e?"rgba(29,78,216,.8)":"rgba(37,99,235,.7)"]}[t.variant]??[e?"rgba(55,65,81,.9)":"rgba(229,231,235,.8)",e?"rgba(75,85,99,.8)":"rgba(209,213,219,.7)"];return{"--toast-gradient-from":i,"--toast-gradient-to":r}},[t.variant,t.visualStyle,o,n]),g=a5(()=>{if(t.customAnimation)return{initial:t.customAnimation.initial,animate:t.customAnimation.animate,exit:t.customAnimation.exit};let e=t.animation||s,i=t.position||a,r=i.startsWith("top"),o=i.endsWith("left"),n=i.endsWith("right");if("none"===e)return{initial:{opacity:1},animate:{opacity:1},exit:{opacity:1}};if("fade"===e)return{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}};if("bounce"===e){let t={opacity:0,scale:.9};return r?Object.assign(t,{y:-80}):o?Object.assign(t,{x:-80}):n?Object.assign(t,{x:80}):Object.assign(t,{y:80}),{initial:t,animate:{opacity:1,y:0,x:0,scale:1,transition:{type:"spring",stiffness:350,damping:25}},exit:{opacity:0,scale:.9,transition:{duration:.2}}}}if("flip"===e)return{initial:{opacity:0,rotateX:90,perspective:400},animate:{opacity:1,rotateX:0,perspective:400,transition:{type:"spring",stiffness:300,damping:25}},exit:{opacity:0,rotateX:90,perspective:400,transition:{duration:.3}}};if("zoom"===e)return{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1,transition:{type:"spring",stiffness:400,damping:30}},exit:{opacity:0,scale:.5,transition:{duration:.2}}};if("elastic"===e){let t={opacity:0,scale:.8};return r?Object.assign(t,{y:-30}):o?Object.assign(t,{x:-30}):n?Object.assign(t,{x:30}):Object.assign(t,{y:30}),{initial:t,animate:{opacity:1,y:0,x:0,scale:1,transition:{type:"spring",stiffness:500,damping:20,mass:.8}},exit:{opacity:0,scale:.85,transition:{type:"spring",stiffness:600,damping:35}}}}let l={opacity:0},u={opacity:0};return r?(Object.assign(l,{y:-20}),Object.assign(u,{y:-20})):o?(Object.assign(l,{x:-20}),Object.assign(u,{x:-20})):n?(Object.assign(l,{x:20}),Object.assign(u,{x:20})):(Object.assign(l,{y:20}),Object.assign(u,{y:20})),{initial:l,animate:{opacity:1,y:0,x:0},exit:u}},[t.customAnimation,t.animation,s,t.position,a]),y=a5(()=>{let e=[];t.floating&&e.push("react-toast-floating"),t.rippleEffect&&e.push("toast-ripple");let i=t.visualStyle||n;return("glass"===i||"gradient"===i)&&e.push("toast-soft-shadow"),e.join(" ")},[t.floating,t.rippleEffect,t.visualStyle,n]),v=a5(()=>"custom"===t.variant?"":t.variant&&"default"!==t.variant?"text-white":"dark"===o?"text-gray-300":"text-gray-500",[t.variant,o]),x=a5(()=>t.progressBarStyle?t.progressBarStyle:"custom"===t.variant?"bg-white/20":t.variant&&"default"!==t.variant?"bg-white/30":"dark"===o?"bg-gray-600":"bg-gray-300",[t.progressBarStyle,t.variant,o]),b=((t,e,i=100)=>{let r=aJ(0),s=aJ(0),a=aJ(!1);return{handleTouchStart:a0(e=>{t&&(r.current=e.touches[0].clientX,s.current=e.touches[0].clientY,a.current=!1)},[t]),handleTouchMove:a0(e=>{if(!t)return;let i=Math.abs(e.touches[0].clientX-r.current);i>Math.abs(e.touches[0].clientY-s.current)&&i>10&&(a.current=!0,e.preventDefault())},[t]),handleTouchEnd:a0(s=>{t&&a.current&&(Math.abs(s.changedTouches[0].clientX-r.current)>i&&e(),a.current=!1)},[t,e,i])}})(t.swipeToDismiss||!1,d);return(0,p.jsx)(av.div,{className:"react-toast-item w-full",initial:g.initial,animate:g.animate,exit:g.exit,transition:{duration:t.updating?.1:.2},layout:!0,children:(0,p.jsxs)("div",{ref:l,role:"error"===t.variant?"alert":"status","aria-live":"error"===t.variant?"assertive":"polite",className:`relative overflow-hidden shadow-lg rounded-lg react-toast w-full ${t.className||""} ${y}`,style:{...t.style||{},...f},onMouseEnter:c,onMouseLeave:h,onClick:m,onTouchStart:b.handleTouchStart,onTouchMove:b.handleTouchMove,onTouchEnd:b.handleTouchEnd,"data-variant":t.variant,"data-theme":o,"data-style":t.visualStyle||n,"data-progress-position":t.progressBarPosition||"bottom","data-testid":`toast-${t.id}`,tabIndex:0,children:[t.duration>0&&(0,p.jsx)(a6,{duration:t.duration,isPaused:u,progressBarStyle:x,progressBarColor:t.progressBarColor,progressBarThickness:t.progressBarThickness,progressBarPosition:t.progressBarPosition,progressAnimation:t.progressAnimation}),(0,p.jsx)("div",{className:"p-4 toast-content",children:"custom"===t.variant&&t.component?t.component:(0,p.jsxs)("div",{className:"flex items-start",children:[t.emoji?(0,p.jsx)("div",{className:"flex-shrink-0 mr-3 toast-emoji",children:t.emoji}):t.icon?(0,p.jsx)("div",{className:`flex-shrink-0 mr-3 ${v} toast-icon-container toast-icon-animated`,children:t.icon}):t.iconString?(0,p.jsx)("div",{className:`flex-shrink-0 mr-3 ${v} toast-icon-container toast-icon-animated`,children:(0,p.jsx)(a3,{svgString:t.iconString,className:v})}):null,(0,p.jsxs)("div",{className:"flex-1",children:[t.title&&(0,p.jsx)("h4",{className:"font-medium mb-1",children:t.title}),t.description&&(0,p.jsx)("div",{className:"toast-description",children:t.description}),t.actions&&t.actions.length>0&&(0,p.jsx)("div",{className:"toast-actions",children:t.actions.map((i,r)=>(0,p.jsx)("button",{"data-variant":i.variant||"primary",className:"toast-action-btn",onClick:r=>{r.stopPropagation(),i.onClick(t.id),!1!==i.closeOnClick&&e(t.id)},children:i.label},r))})]}),t.dismissible&&(0,p.jsx)("button",{onClick:t=>{t.stopPropagation(),d()},className:"react-toast-close","aria-label":"Close notification","data-dismiss":"toast",children:(0,p.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})]})},t.id)});a8.displayName="ToastItem";var a9=aQ(({position:t,toasts:e,positionStyle:i,onDismiss:r,onPause:s,onResume:a,defaultAnimation:o,toastTheme:n,defaultStyle:l,containerClassName:u})=>(0,p.jsx)("div",{className:`fixed flex flex-col z-50 react-toast-container ${u||""}`,"data-position":t,"data-theme":n,style:i,children:(0,p.jsx)(aj,{mode:"sync",children:e.map(e=>(0,p.jsx)(a8,{toast:e,onDismiss:r,onPause:s,onResume:a,animation:e.animation||o,position:t,toastTheme:n,defaultStyle:l},e.id))})}));a9.displayName="ToastContainer";var a7=({containerClassName:t="",topOffset:e=16,bottomOffset:i=16,leftOffset:r=16,rightOffset:s=16,defaultAnimation:a="slide",defaultStyle:o="solid",enableAccessibleAnnouncements:n=!0,suppressHydrationWarning:l=!1})=>{let[u,d]=a_(!1),[c,h]=a_(null),[f,g]=a_("desktop"),y=aJ(1024),v=aF(t=>t.toasts),x=aF(t=>t.removeToast),b=aF(t=>t.pauseToast),w=aF(t=>t.resumeToast),k=aF(t=>t.effectiveTheme),T=a0(()=>{if(typeof window>"u")return;let t=window.innerWidth;y.current=t;let e=t<640?"mobile":t<1024?"tablet":"desktop";g(t=>t!==e?e:t)},[]);aZ(()=>{if(typeof window>"u")return;T(),d(!0);let t=document.getElementById("react-toast-kit-portal");t||((t=document.createElement("div")).id="react-toast-kit-portal",t.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;z-index:${a2()}`,l&&t.setAttribute("data-suppress-hydration-warning","true"),document.body.appendChild(t)),h(t);let e,i=()=>{clearTimeout(e),e=window.setTimeout(T,100)};return window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i),clearTimeout(e),t?.parentNode&&!document.getElementById("react-toast-kit-portal-static")&&document.body.removeChild(t)}},[T,l]);let S=a0(()=>a1[f],[f]),P=a0(t=>{let a=S(),o={position:"fixed",width:`${a}px`,display:"flex",flexDirection:"column",gap:"0.5rem"};if("mobile"===f){let t=Math.min(a,y.current-r-s);o.width=`${t}px`,o.maxWidth=`calc(100vw - ${r+s}px)`}switch(t){case"top-left":return{...o,top:`${e}px`,left:`${r}px`,alignItems:"flex-start"};case"top-center":return{...o,top:`${e}px`,left:"50%",transform:"translateX(-50%)",alignItems:"center"};case"top-right":default:return{...o,top:`${e}px`,right:`${s}px`,alignItems:"flex-end"};case"bottom-left":return{...o,bottom:`${i}px`,left:`${r}px`,alignItems:"flex-start"};case"bottom-center":return{...o,bottom:`${i}px`,left:"50%",transform:"translateX(-50%)",alignItems:"center"};case"bottom-right":return{...o,bottom:`${i}px`,right:`${s}px`,alignItems:"flex-end"}}},[S,f,r,s,e,i]),j=a5(()=>v.reduce((t,e)=>{let i=e.position||"top-right";return t[i]||(t[i]=[]),t[i].push(e),t},{}),[v]);if(!u||!c)return null;let C=(0,p.jsxs)(p.Fragment,{children:[n&&(0,p.jsx)(a4,{toasts:v}),Object.entries(j).map(([e,i])=>(0,p.jsx)(a9,{position:e,toasts:i,positionStyle:P(e),onDismiss:x,onPause:b,onResume:w,defaultAnimation:a,toastTheme:k,defaultStyle:o,containerClassName:t},e))]});return(0,m.createPortal)(l?(0,p.jsx)("div",{suppressHydrationWarning:!0,children:C}):C,c)};a7.displayName="ToastPortal";var ot=aQ(a7),{createContext:oe,useContext:oi,useEffect:or,useMemo:os}=h,oa=oe(null);aX();var oo=(t,e)=>{let i=t instanceof Map?t:new Map(t.entries()),r=e instanceof Map?e:new Map(e.entries());if(i.size!==r.size)return!1;for(let[t,e]of i)if(!Object.is(e,r.get(t)))return!1;return!0},{useCallback:on,useMemo:ol}=h;aX(),aX();var ou=!1,od=()=>{if(!(typeof document>"u"||ou)){if(document.getElementById("react-toast-kit-styles")){ou=!0;return}try{let t=document.createElement("style");t.id="react-toast-kit-styles",t.textContent=`/* \u2500\u2500\u2500 React Toast Kit \u2014 index.css \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* Container */
.react-toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.react-toast-container[data-position="top-right"]    { top: 1rem; right: 1rem; align-items: flex-end; }
.react-toast-container[data-position="top-center"]   { top: 1rem; left: 50%; transform: translateX(-50%); align-items: center; }
.react-toast-container[data-position="top-left"]     { top: 1rem; left: 1rem; align-items: flex-start; }
.react-toast-container[data-position="bottom-right"] { bottom: 1rem; right: 1rem; align-items: flex-end; }
.react-toast-container[data-position="bottom-center"]{ bottom: 1rem; left: 50%; transform: translateX(-50%); align-items: center; }
.react-toast-container[data-position="bottom-left"]  { bottom: 1rem; left: 1rem; align-items: flex-start; }

/* Item */
.react-toast-item {
  width: 100%;
  pointer-events: auto;
  max-width: 380px;
}

@media (max-width: 640px) {
  .react-toast-item { max-width: 92vw; }
}

/* \u2500\u2500\u2500 Base toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast {
  position: relative;
  overflow: hidden;
  border-radius: 0.625rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9375rem;
  word-break: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  /* GPU layer promotion */
  transform: translateZ(0);
  will-change: transform, opacity;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.react-toast:hover {
  transform: translateZ(0) scale(1.015);
}

/* \u2500\u2500\u2500 Solid variant colours (light) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-variant="success"] {
  background-color: #10b981;
  color: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(16, 185, 129, 0.45), 0 4px 8px -2px rgba(16, 185, 129, 0.2);
}

.react-toast[data-variant="error"] {
  background-color: #ef4444;
  color: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(239, 68, 68, 0.45), 0 4px 8px -2px rgba(239, 68, 68, 0.2);
}

.react-toast[data-variant="warning"] {
  background-color: #f59e0b;
  color: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(245, 158, 11, 0.45), 0 4px 8px -2px rgba(245, 158, 11, 0.2);
}

.react-toast[data-variant="info"] {
  background-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(59, 130, 246, 0.45), 0 4px 8px -2px rgba(59, 130, 246, 0.2);
}

.react-toast[data-variant="loading"] {
  background-color: #6b7280;
  color: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(107, 114, 128, 0.35), 0 4px 8px -2px rgba(107, 114, 128, 0.15);
}

.react-toast[data-variant="default"] {
  background-color: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
}

/* Dark mode \u2014 solid */
.react-toast[data-theme="dark"][data-variant="success"] {
  background-color: #065f46;
  color: #ffffff;
  border: 1px solid #047857;
  box-shadow: 0 8px 24px -4px rgba(16, 185, 129, 0.3), 0 4px 8px -2px rgba(16, 185, 129, 0.12);
}

.react-toast[data-theme="dark"][data-variant="error"] {
  background-color: #991b1b;
  color: #ffffff;
  border: 1px solid #b91c1c;
  box-shadow: 0 8px 24px -4px rgba(239, 68, 68, 0.3), 0 4px 8px -2px rgba(239, 68, 68, 0.12);
}

.react-toast[data-theme="dark"][data-variant="warning"] {
  background-color: #92400e;
  color: #ffffff;
  border: 1px solid #b45309;
  box-shadow: 0 8px 24px -4px rgba(245, 158, 11, 0.3), 0 4px 8px -2px rgba(245, 158, 11, 0.12);
}

.react-toast[data-theme="dark"][data-variant="info"] {
  background-color: #1e40af;
  color: #ffffff;
  border: 1px solid #1d4ed8;
  box-shadow: 0 8px 24px -4px rgba(59, 130, 246, 0.3), 0 4px 8px -2px rgba(59, 130, 246, 0.12);
}

.react-toast[data-theme="dark"][data-variant="loading"] {
  background-color: #374151;
  color: #ffffff;
  border: 1px solid #4b5563;
}

.react-toast[data-theme="dark"][data-variant="default"] {
  background-color: #1f2937;
  color: #f9fafb;
  border: 1px solid #374151;
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.2);
}

/* \u2500\u2500\u2500 Gradient style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="gradient"] {
  background-image: linear-gradient(
    135deg,
    var(--toast-gradient-from, rgba(59, 130, 246, 0.85)),
    var(--toast-gradient-to, rgba(37, 99, 235, 0.9))
  );
  border: none;
}

/* \u2500\u2500\u2500 Glass style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="glass"] {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  color: #1f2937;
}

.react-toast[data-theme="dark"][data-style="glass"] {
  background: rgba(17, 24, 39, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: #f9fafb;
}

/* \u2500\u2500\u2500 Shimmer style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="shimmer"] {
  position: relative;
  overflow: hidden;
}

.react-toast[data-style="shimmer"]::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.28) 50%, transparent 60%);
  background-size: 200% 100%;
  animation: shimmer 2.2s linear infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* \u2500\u2500\u2500 Pill style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="pill"] {
  border-radius: 9999px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

/* \u2500\u2500\u2500 Neon style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="neon"][data-variant="success"] {
  background-color: #022c22;
  color: #34d399;
  border: 1px solid #10b981;
  animation: neon-pulse-green 2s ease-in-out infinite;
}

.react-toast[data-style="neon"][data-variant="error"] {
  background-color: #2d0a0a;
  color: #f87171;
  border: 1px solid #ef4444;
  animation: neon-pulse-red 2s ease-in-out infinite;
}

.react-toast[data-style="neon"][data-variant="warning"] {
  background-color: #2d1a00;
  color: #fbbf24;
  border: 1px solid #f59e0b;
  animation: neon-pulse-amber 2s ease-in-out infinite;
}

.react-toast[data-style="neon"][data-variant="info"] {
  background-color: #0a1628;
  color: #60a5fa;
  border: 1px solid #3b82f6;
  animation: neon-pulse-blue 2s ease-in-out infinite;
}

.react-toast[data-style="neon"][data-variant="loading"],
.react-toast[data-style="neon"][data-variant="default"] {
  background-color: #0f1117;
  color: #a78bfa;
  border: 1px solid #7c3aed;
  animation: neon-pulse-violet 2s ease-in-out infinite;
}

@keyframes neon-pulse-green {
  0%, 100% { box-shadow: 0 0 6px rgba(16, 185, 129, 0.5), 0 0 18px rgba(16, 185, 129, 0.25); }
  50%       { box-shadow: 0 0 14px rgba(16, 185, 129, 0.8), 0 0 36px rgba(16, 185, 129, 0.4); }
}

@keyframes neon-pulse-red {
  0%, 100% { box-shadow: 0 0 6px rgba(239, 68, 68, 0.5), 0 0 18px rgba(239, 68, 68, 0.25); }
  50%       { box-shadow: 0 0 14px rgba(239, 68, 68, 0.8), 0 0 36px rgba(239, 68, 68, 0.4); }
}

@keyframes neon-pulse-amber {
  0%, 100% { box-shadow: 0 0 6px rgba(245, 158, 11, 0.5), 0 0 18px rgba(245, 158, 11, 0.25); }
  50%       { box-shadow: 0 0 14px rgba(245, 158, 11, 0.8), 0 0 36px rgba(245, 158, 11, 0.4); }
}

@keyframes neon-pulse-blue {
  0%, 100% { box-shadow: 0 0 6px rgba(59, 130, 246, 0.5), 0 0 18px rgba(59, 130, 246, 0.25); }
  50%       { box-shadow: 0 0 14px rgba(59, 130, 246, 0.8), 0 0 36px rgba(59, 130, 246, 0.4); }
}

@keyframes neon-pulse-violet {
  0%, 100% { box-shadow: 0 0 6px rgba(124, 58, 237, 0.5), 0 0 18px rgba(124, 58, 237, 0.25); }
  50%       { box-shadow: 0 0 14px rgba(124, 58, 237, 0.8), 0 0 36px rgba(124, 58, 237, 0.4); }
}

/* \u2500\u2500\u2500 Retro style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="retro"] {
  border: 2px solid #000;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

.react-toast[data-theme="dark"][data-style="retro"] {
  border: 2px solid #fff;
  box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.7);
}

/* \u2500\u2500\u2500 Confetti style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="confetti"] {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
}

/* \u2500\u2500\u2500 Minimal style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="minimal"] {
  background-color: #ffffff;
  color: #1f2937;
  border: 1px solid #f3f4f6;
  border-left: 4px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.react-toast[data-theme="dark"][data-style="minimal"] {
  background-color: #111827;
  color: #f9fafb;
  border: 1px solid #1f2937;
  border-left: 4px solid #374151;
}

.react-toast[data-style="minimal"][data-variant="success"] { border-left-color: #10b981; }
.react-toast[data-style="minimal"][data-variant="error"]   { border-left-color: #ef4444; }
.react-toast[data-style="minimal"][data-variant="warning"] { border-left-color: #f59e0b; }
.react-toast[data-style="minimal"][data-variant="info"]    { border-left-color: #3b82f6; }
.react-toast[data-style="minimal"][data-variant="loading"] { border-left-color: #6b7280; }

.react-toast[data-style="minimal"] .toast-icon-container {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.react-toast[data-style="minimal"][data-variant="success"] .toast-icon-container {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.react-toast[data-style="minimal"][data-variant="error"] .toast-icon-container {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.react-toast[data-style="minimal"][data-variant="warning"] .toast-icon-container {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
}

.react-toast[data-style="minimal"][data-variant="info"] .toast-icon-container {
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
}

.react-toast[data-style="minimal"][data-variant="loading"] .toast-icon-container {
  background: rgba(107, 114, 128, 0.12);
  color: #4b5563;
}

/* \u2500\u2500\u2500 Outlined style \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast[data-style="outlined"] {
  background-color: transparent;
  border: 2px solid currentColor;
  box-shadow: none;
}

.react-toast[data-style="outlined"][data-variant="success"] {
  color: #059669;
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.04);
}

.react-toast[data-style="outlined"][data-variant="error"] {
  color: #dc2626;
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.04);
}

.react-toast[data-style="outlined"][data-variant="warning"] {
  color: #d97706;
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.04);
}

.react-toast[data-style="outlined"][data-variant="info"] {
  color: #2563eb;
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.04);
}

.react-toast[data-style="outlined"][data-variant="loading"],
.react-toast[data-style="outlined"][data-variant="default"] {
  color: #4b5563;
  border-color: #9ca3af;
  background: rgba(107, 114, 128, 0.04);
}

.react-toast[data-theme="dark"][data-style="outlined"][data-variant="success"] {
  color: #34d399;
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}

.react-toast[data-theme="dark"][data-style="outlined"][data-variant="error"] {
  color: #f87171;
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.react-toast[data-theme="dark"][data-style="outlined"][data-variant="warning"] {
  color: #fbbf24;
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}

.react-toast[data-theme="dark"][data-style="outlined"][data-variant="info"] {
  color: #60a5fa;
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
}

.react-toast[data-theme="dark"][data-style="outlined"][data-variant="loading"],
.react-toast[data-theme="dark"][data-style="outlined"][data-variant="default"] {
  color: #9ca3af;
  border-color: #4b5563;
  background: rgba(107, 114, 128, 0.08);
}

/* \u2500\u2500\u2500 Toast content \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.toast-content {
  display: flex;
  flex-direction: column;
  padding: 0.875rem 1rem;
}

.react-toast h4 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
}

.toast-description {
  margin-top: 0.2rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  opacity: 0.85;
}

/* \u2500\u2500\u2500 Icon container \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.toast-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
}

.toast-icon-animated {
  animation: toast-icon-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes toast-icon-pop {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

/* Loading spinner via pseudo-element */
.react-toast[data-variant="loading"] .toast-icon-container {
  position: relative;
}

.react-toast[data-variant="loading"] .toast-icon-container svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Emoji */
.toast-emoji {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 1.25rem;
  margin-right: 0.625rem;
  line-height: 1;
}

/* \u2500\u2500\u2500 Action buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.toast-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.625rem;
}

.toast-action-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s ease, opacity 0.15s ease, transform 0.1s ease;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
}

.toast-action-btn:hover {
  background: rgba(255, 255, 255, 0.32);
  transform: translateY(-1px);
}

.toast-action-btn:active { transform: translateY(0); }

.toast-action-btn[data-variant="secondary"] {
  background: rgba(0, 0, 0, 0.08);
  color: inherit;
}

.toast-action-btn[data-variant="secondary"]:hover {
  background: rgba(0, 0, 0, 0.16);
}

.toast-action-btn[data-variant="danger"] {
  background: rgba(239, 68, 68, 0.18);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.35);
}

.toast-action-btn[data-variant="danger"]:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* Dark-safe action buttons on minimal/outlined */
.react-toast[data-style="minimal"] .toast-action-btn,
.react-toast[data-style="outlined"] .toast-action-btn {
  background: rgba(0, 0, 0, 0.06);
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.react-toast[data-style="minimal"] .toast-action-btn:hover,
.react-toast[data-style="outlined"] .toast-action-btn:hover {
  background: rgba(0, 0, 0, 0.12);
}

.react-toast[data-theme="dark"][data-style="minimal"] .toast-action-btn,
.react-toast[data-theme="dark"][data-style="outlined"] .toast-action-btn {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.16);
}

.react-toast[data-theme="dark"][data-style="minimal"] .toast-action-btn:hover,
.react-toast[data-theme="dark"][data-style="outlined"] .toast-action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* \u2500\u2500\u2500 Close button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast-close {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.0);
  color: currentColor;
  opacity: 0.45;
  cursor: pointer;
  transition: opacity 0.18s ease, background 0.18s ease, transform 0.12s ease;
  flex-shrink: 0;
  padding: 0;
}

.react-toast-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.react-toast[data-style="minimal"] .react-toast-close:hover,
.react-toast[data-style="outlined"] .react-toast-close:hover {
  background: rgba(0, 0, 0, 0.08);
}

.react-toast[data-theme="dark"][data-style="minimal"] .react-toast-close:hover,
.react-toast[data-theme="dark"][data-style="outlined"] .react-toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* \u2500\u2500\u2500 Progress bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
}

.react-toast[data-progress-position="top"] .react-toast-progress {
  top: 0;
  bottom: auto;
}

.react-toast[data-progress-position="left"] .react-toast-progress {
  top: 0;
  bottom: 0;
  right: auto;
  width: 3px;
  height: 100%;
}

.react-toast[data-progress-position="right"] .react-toast-progress {
  top: 0;
  bottom: 0;
  left: auto;
  width: 3px;
  height: 100%;
}

.react-toast-progress-fill {
  height: 100%;
  width: 100%;
  will-change: transform;
  transform-origin: left center;
  background: rgba(255, 255, 255, 0.5);
}

/* Variant-matched progress fill for minimal & outlined */
.react-toast[data-style="minimal"][data-variant="success"] .react-toast-progress-fill,
.react-toast[data-style="outlined"][data-variant="success"] .react-toast-progress-fill {
  background: #10b981;
}

.react-toast[data-style="minimal"][data-variant="error"] .react-toast-progress-fill,
.react-toast[data-style="outlined"][data-variant="error"] .react-toast-progress-fill {
  background: #ef4444;
}

.react-toast[data-style="minimal"][data-variant="warning"] .react-toast-progress-fill,
.react-toast[data-style="outlined"][data-variant="warning"] .react-toast-progress-fill {
  background: #f59e0b;
}

.react-toast[data-style="minimal"][data-variant="info"] .react-toast-progress-fill,
.react-toast[data-style="outlined"][data-variant="info"] .react-toast-progress-fill {
  background: #3b82f6;
}

.react-toast[data-style="minimal"][data-variant="default"] .react-toast-progress-fill,
.react-toast[data-style="outlined"][data-variant="default"] .react-toast-progress-fill {
  background: #9ca3af;
}

/* Vertical progress \u2014 override transform-origin */
.react-toast[data-progress-position="left"] .react-toast-progress-fill,
.react-toast[data-progress-position="right"] .react-toast-progress-fill {
  transform-origin: top center;
}

/* Enhanced progress styles */
.react-toast-progress.fancy {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.18));
  backdrop-filter: blur(4px);
}

.react-toast-progress.gradient-wave .react-toast-progress-fill {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
  background-size: 300% 100%;
  animation: gradient-wave 2s linear infinite;
}

@keyframes gradient-wave {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.react-toast-progress.pulse .react-toast-progress-fill {
  animation: progress-pulse 1.6s ease-in-out infinite;
}

@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.react-toast-progress.three-d .react-toast-progress-fill {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.react-toast-progress.glow .react-toast-progress-fill {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.react-toast-progress.rainbow .react-toast-progress-fill {
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  background-size: 700% 100%;
  animation: rainbow 4s linear infinite;
}

@keyframes rainbow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.react-toast-progress.dashed .react-toast-progress-fill {
  background-image: linear-gradient(to right, currentColor 50%, transparent 50%);
  background-size: 20px 100%;
}

/* \u2500\u2500\u2500 Ripple \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.toast-ripple { position: relative; overflow: hidden; }

.toast-ripple-element {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple 0.7s linear;
  transform: scale(0);
  opacity: 0.5;
  pointer-events: none;
}

@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}

/* \u2500\u2500\u2500 Floating \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.react-toast-floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateZ(0) translateY(0); }
  50%       { transform: translateZ(0) translateY(-5px); }
}

/* \u2500\u2500\u2500 Soft shadow helper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.toast-soft-shadow {
  box-shadow: 0 12px 40px -8px rgba(0, 0, 0, 0.18), 0 4px 12px -4px rgba(0, 0, 0, 0.1);
}

/* \u2500\u2500\u2500 Accessibility \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* \u2500\u2500\u2500 Reduced motion \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (prefers-reduced-motion: reduce) {
  .react-toast,
  .react-toast::after,
  .react-toast-floating,
  .toast-icon-animated,
  .react-toast[data-style="neon"] {
    animation: none !important;
    transition: none !important;
  }

  .react-toast:hover {
    transform: translateZ(0) !important;
  }

  .react-toast-progress-fill {
    transition: none !important;
  }
}

/* \u2500\u2500\u2500 Mobile \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 640px) {
  .react-toast-container {
    width: calc(100% - 2rem);
    max-width: 100%;
  }

  .react-toast-item {
    width: 100%;
  }

  .react-toast {
    font-size: 0.875rem;
  }

  .react-toast-close {
    width: 2rem;
    height: 2rem;
  }
}

/* Progress Bar Styles for React Toast Kit */

/* Base progress container */
.react-toast-progress {
  position: absolute;
  background-color: var(--toast-progress-bg);
  overflow: hidden;
}

/* Default positions */
.react-toast-progress {
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
}

/* Position variations */
.react-toast[data-progress-position="top"] .react-toast-progress {
  top: 0;
  bottom: auto;
}

.react-toast[data-progress-position="left"] .react-toast-progress {
  top: 0;
  bottom: 0;
  right: auto;
  width: 3px;
  height: auto;
}

.react-toast[data-progress-position="right"] .react-toast-progress {
  top: 0;
  bottom: 0;
  left: auto;
  width: 3px;
  height: auto;
}

/* Base progress fill */
.react-toast-progress-fill {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  transition-property: width, height;
}

/* Style: DEFAULT */
.react-toast-progress.default .react-toast-progress-fill {
  background: var(--progress-default);
}

/* Style: FANCY */
.react-toast-progress.fancy .react-toast-progress-fill {
  background: linear-gradient(90deg, #f59e0b, #ef4444, #3b82f6, #10b981);
  background-size: 300% 100%;
  animation: shimmer 2s linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Style: GRADIENT-WAVE */
.react-toast-progress.gradient-wave .react-toast-progress-fill {
  background: linear-gradient(90deg, 
    rgba(79, 70, 229, 1) 0%, 
    rgba(168, 85, 247, 0.8) 50%, 
    rgba(236, 72, 153, 1) 100%);
  background-size: 200% 100%;
  animation: wave-shift 2s linear infinite;
}

/* Style: PULSE */
.react-toast-progress.pulse .react-toast-progress-fill {
  background: var(--progress-default);
  animation: pulse-effect 1s ease-in-out infinite alternate;
}

/* Style: PARTICLES */
.react-toast-progress.particles .react-toast-progress-fill {
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.react-toast-progress.particles .react-toast-progress-fill::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px),
    radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px),
    radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
  background-size: 4px 4px, 6px 6px, 8px 8px;
  background-position: 0 0, 2px 2px, 4px 0;
  animation: particle-move 1s linear infinite;
}

/* Style: LIQUID - with wavy liquid motion */
.react-toast-progress.liquid .react-toast-progress-fill {
  background: var(--progress-default);
  height: 6px;
  margin-bottom: -3px;
  border-radius: 0 3px 3px 0;
  position: relative;
}

.react-toast-progress.liquid .react-toast-progress-fill::before {
  content: "";
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 10px;
  background: var(--progress-default);
  border-radius: 3px;
  animation: liquid-drip 2s ease-in-out infinite;
}

/* Style: 3D - renamed to three-d for CSS compliance */
.react-toast-progress.three-d .react-toast-progress-fill {
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0.8),
    var(--progress-default) 30%, 
    rgba(0, 0, 0, 0.2) 100%);
  height: 6px;
  margin-bottom: -3px;
  box-shadow: 
    0 2px 3px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.5);
  border-radius: 0 2px 2px 0;
}

/* Style: DASHED */
.react-toast-progress.dashed .react-toast-progress-fill {
  background-image: repeating-linear-gradient(
    90deg,
    var(--progress-default) 0px,
    var(--progress-default) 6px,
    transparent 6px,
    transparent 12px
  );
  background-size: 12px 100%;
  animation: dash-move 1s linear infinite;
}

/* Style: GLOW */
.react-toast-progress.glow .react-toast-progress-fill {
  background: var(--progress-default);
  box-shadow: 
    0 0 5px var(--progress-default),
    0 0 10px var(--progress-default),
    0 0 15px var(--progress-default);
  animation: glow-pulse 1.5s ease-in-out infinite alternate;
}

/* Style: RAINBOW */
.react-toast-progress.rainbow .react-toast-progress-fill {
  background-image: linear-gradient(
    90deg, 
    #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3
  );
  background-size: 200% 100%;
  animation: rainbow-shift 2s linear infinite;
}

/* Style: DATA-FLOW */
.react-toast-progress.data-flow .react-toast-progress-fill {
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--progress-default) 20%,
    var(--progress-default) 80%,
    transparent 100%
  );
  position: relative;
  overflow: hidden;
}

.react-toast-progress.data-flow .react-toast-progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(
      90deg,
      transparent, transparent 30%,
      rgba(255, 255, 255, 0.6) 50%,
      transparent 70%, transparent
    );
  background-size: 50% 100%;
  animation: data-pulse 1.5s linear infinite;
}

/* Style: STEP-PROGRESS */
.react-toast-progress.step-progress .react-toast-progress-fill {
  background-color: transparent;
  background-image: 
    linear-gradient(90deg, var(--progress-default) 70%, transparent 0),
    linear-gradient(90deg, var(--progress-default) 70%, transparent 0),
    linear-gradient(90deg, var(--progress-default) 70%, transparent 0);
  background-size: 16.6% 100%;
  background-repeat: repeat-x;
  animation: step-move 3s linear infinite;
}

/* Animations */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes wave-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse-effect {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes particle-move {
  from { background-position: 0 0, 2px 2px, 4px 0; }
  to { background-position: -12px 0, -10px 2px, -8px 0; }
}

@keyframes liquid-drip {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px) scale(1.2, 0.8); }
}

@keyframes dash-move {
  0% { background-position: 0 0; }
  100% { background-position: 12px 0; }
}

@keyframes glow-pulse {
  0% { opacity: 0.7; filter: brightness(1); }
  100% { opacity: 1; filter: brightness(1.5); }
}

@keyframes rainbow-shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes data-pulse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes step-move {
  0% { background-position: 0 0, 33.3% 0, 66.6% 0; }
  100% { background-position: 16.6% 0, 50% 0, 83.3% 0; }
}

/* Variant-specific adjustments */
.react-toast[data-variant="success"] .react-toast-progress-fill {
  background-color: var(--progress-success);
}

.react-toast[data-variant="error"] .react-toast-progress-fill {
  background-color: var(--progress-error);
}

.react-toast[data-variant="warning"] .react-toast-progress-fill {
  background-color: var(--progress-warning);
}

.react-toast[data-variant="info"] .react-toast-progress-fill {
  background-color: var(--progress-info);
}

.react-toast[data-variant="loading"] .react-toast-progress-fill {
  background-color: var(--progress-loading);
}

/* Custom progress position adjustments for vertical bars */
.react-toast[data-progress-position="left"] .react-toast-progress.fancy .react-toast-progress-fill,
.react-toast[data-progress-position="right"] .react-toast-progress.fancy .react-toast-progress-fill {
  background: linear-gradient(180deg, #f59e0b, #ef4444, #3b82f6, #10b981);
  background-size: 100% 300%;
}

.react-toast[data-progress-position="left"] .react-toast-progress.gradient-wave .react-toast-progress-fill,
.react-toast[data-progress-position="right"] .react-toast-progress.gradient-wave .react-toast-progress-fill {
  background: linear-gradient(180deg, 
    rgba(79, 70, 229, 1) 0%, 
    rgba(168, 85, 247, 0.8) 50%, 
    rgba(236, 72, 153, 1) 100%);
  background-size: 100% 200%;
}

.react-toast[data-progress-position="left"] .react-toast-progress.rainbow .react-toast-progress-fill,
.react-toast[data-progress-position="right"] .react-toast-progress.rainbow .react-toast-progress-fill {
  background-image: linear-gradient(
    180deg, 
    #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3
  );
  background-size: 100% 200%;
}

/* Media queries for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .react-toast-progress-fill {
    transition: none !important;
  }
  
  .react-toast-progress-fill,
  .react-toast-progress.fancy .react-toast-progress-fill,
  .react-toast-progress.gradient-wave .react-toast-progress-fill,
  .react-toast-progress.pulse .react-toast-progress-fill,
  .react-toast-progress.particles .react-toast-progress-fill::before,
  .react-toast-progress.liquid .react-toast-progress-fill::before,
  .react-toast-progress.glow .react-toast-progress-fill,
  .react-toast-progress.rainbow .react-toast-progress-fill,
  .react-toast-progress.data-flow .react-toast-progress-fill::after,
  .react-toast-progress.step-progress .react-toast-progress-fill {
    animation: none !important;
  }
}
`,document.head.insertBefore(t,document.head.firstChild??null),ou=!0}catch(t){console.warn("[react-toast-kit] Could not inject CSS:",t)}}};"u">typeof window&&("loading"===document.readyState?document.addEventListener("DOMContentLoaded",od):od()),t.s(["ToastProvider",0,({children:t,theme:e="system",position:i="top-right",maxToasts:r=3,defaultAnimation:s="slide",defaultStyle:a="solid",defaultDuration:o=4e3,defaultDismissible:n=!0,defaultPauseOnHover:l=!0,defaultDismissOnClick:u=!1,defaultProgressBarStyle:d,defaultProgressBarColor:c,defaultProgressBarPosition:h="bottom",defaultProgressBarThickness:m=3,defaultProgressAnimation:f="linear",defaultFloating:g=!1,defaultRippleEffect:y=!1,defaultSwipeToDismiss:v=!1,defaultPriority:x="normal",defaultStagger:b=0,containerClassName:w,topOffset:k,bottomOffset:T,leftOffset:S,rightOffset:P,enableAccessibleAnnouncements:j=!0,enableDevMode:C=!1,enableDevTools:A=!1,suppressHydrationWarning:M=!1,globalClassName:E,globalStyle:D})=>{let{setTheme:V,setMaxToasts:R,setConfig:B,effectiveTheme:L}=aF();or(()=>{V(e)},[e,V]),or(()=>{R(r)},[r,R]),or(()=>{B({defaultDuration:o,defaultDismissible:n,defaultPauseOnHover:l,defaultDismissOnClick:u,defaultAnimation:s,defaultStyle:a,defaultProgressBarStyle:d,defaultProgressBarColor:c,defaultProgressBarPosition:h,defaultProgressBarThickness:m,defaultProgressAnimation:f,defaultFloating:g,defaultRippleEffect:y,defaultSwipeToDismiss:v,defaultPriority:x,defaultStagger:b,globalClassName:E,globalStyle:D})},[B,o,n,l,u,s,a,d,c,h,m,f,g,y,v,x,b,E,D]),or(()=>()=>{"u">typeof window&&delete window.__TOAST_DEV_MODE__},[C]);let O=os(()=>({theme:e,effectiveTheme:L,position:i,maxToasts:r,defaultAnimation:s,defaultStyle:a,defaultDuration:o,defaultDismissible:n,defaultPauseOnHover:l,defaultDismissOnClick:u,defaultProgressBarStyle:d,defaultProgressBarColor:c,defaultProgressBarPosition:h,defaultProgressBarThickness:m,defaultProgressAnimation:f,defaultFloating:g,defaultRippleEffect:y,defaultSwipeToDismiss:v,defaultPriority:x,defaultStagger:b,globalClassName:E,globalStyle:D}),[e,L,i,r,s,a,o,n,l,u,d,c,h,m,f,g,y,v,x,b,E,D]),F=os(()=>null,[A]);return(0,p.jsxs)(oa.Provider,{value:O,children:[t,(0,p.jsx)(ot,{containerClassName:w,topOffset:k,bottomOffset:T,leftOffset:S,rightOffset:P,defaultAnimation:s,defaultStyle:a,enableAccessibleAnnouncements:j,suppressHydrationWarning:M}),F&&(0,p.jsx)(F,{})]})},"toast",()=>a$,"useToast",0,()=>{var t;let e,{toasts:i,theme:r,effectiveTheme:s,maxToasts:a,plugins:o,addToast:n,removeToast:l,updateToast:u,clearAllToasts:d,pauseToast:c,resumeToast:p,setTheme:m,setMaxToasts:f,registerPlugin:g,unregisterPlugin:y}=aF((t=t=>({toasts:t.toasts,theme:t.theme,effectiveTheme:t.effectiveTheme,maxToasts:t.maxToasts,plugins:t.plugins,addToast:t.addToast,removeToast:t.removeToast,updateToast:t.updateToast,clearAllToasts:t.clearAllToasts,pauseToast:t.pauseToast,resumeToast:t.resumeToast,setTheme:t.setTheme,setMaxToasts:t.setMaxToasts,registerPlugin:t.registerPlugin,unregisterPlugin:t.unregisterPlugin}),e=h.default.useRef(void 0),i=>{var r,s;let a=t(i);return(r=e.current,Object.is(r,s=a)||"object"==typeof r&&null!==r&&"object"==typeof s&&null!==s&&(Symbol.iterator in r&&Symbol.iterator in s?"entries"in r&&"entries"in s?oo(r,s):((t,e)=>{let i=t[Symbol.iterator](),r=e[Symbol.iterator](),s=i.next(),a=r.next();for(;!s.done&&!a.done;){if(!Object.is(s.value,a.value))return!1;s=i.next(),a=r.next()}return!!s.done&&!!a.done})(r,s):oo({entries:()=>Object.entries(r)},{entries:()=>Object.entries(s)})))?e.current:e.current=a})),v=ol(()=>({total:i.length,byVariant:i.reduce((t,e)=>(t[e.variant]=(t[e.variant]||0)+1,t),{}),byPosition:i.reduce((t,e)=>(t[e.position]=(t[e.position]||0)+1,t),{})}),[i]),x=on(t=>i.find(e=>e.id===t),[i]),b=on(()=>i.length>0,[i]);return{toasts:i,theme:r,effectiveTheme:s,maxToasts:a,plugins:o,addToast:n,removeToast:l,updateToast:u,clearAllToasts:d,pauseToast:c,resumeToast:p,setTheme:m,setMaxToasts:f,registerPlugin:g,unregisterPlugin:y,getToastById:x,hasToasts:b,stats:v}},"useToastStore",()=>aF],68330)}]);