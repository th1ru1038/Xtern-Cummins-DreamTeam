(function(){const T=document.createElement("link").relList;if(T&&T.supports&&T.supports("modulepreload"))return;for(const A of document.querySelectorAll('link[rel="modulepreload"]'))K(A);new MutationObserver(A=>{for(const H of A)if(H.type==="childList")for(const ue of H.addedNodes)ue.tagName==="LINK"&&ue.rel==="modulepreload"&&K(ue)}).observe(document,{childList:!0,subtree:!0});function g(A){const H={};return A.integrity&&(H.integrity=A.integrity),A.referrerPolicy&&(H.referrerPolicy=A.referrerPolicy),A.crossOrigin==="use-credentials"?H.credentials="include":A.crossOrigin==="anonymous"?H.credentials="omit":H.credentials="same-origin",H}function K(A){if(A.ep)return;A.ep=!0;const H=g(A);fetch(A.href,H)}})();function Cd(k){return k&&k.__esModule&&Object.prototype.hasOwnProperty.call(k,"default")?k.default:k}var So={exports:{}},P={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ks;function Ld(){if(ks)return P;ks=1;var k=Symbol.for("react.element"),T=Symbol.for("react.portal"),g=Symbol.for("react.fragment"),K=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),H=Symbol.for("react.provider"),ue=Symbol.for("react.context"),he=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),Le=Symbol.for("react.memo"),xt=Symbol.for("react.lazy"),de=Symbol.iterator;function J(d){return d===null||typeof d!="object"?null:(d=de&&d[de]||d["@@iterator"],typeof d=="function"?d:null)}var et={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ie=Object.assign,G={};function W(d,v,O){this.props=d,this.context=v,this.refs=G,this.updater=O||et}W.prototype.isReactComponent={},W.prototype.setState=function(d,v){if(typeof d!="object"&&typeof d!="function"&&d!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,d,v,"setState")},W.prototype.forceUpdate=function(d){this.updater.enqueueForceUpdate(this,d,"forceUpdate")};function tt(){}tt.prototype=W.prototype;function nt(d,v,O){this.props=d,this.context=v,this.refs=G,this.updater=O||et}var ze=nt.prototype=new tt;ze.constructor=nt,Ie(ze,W.prototype),ze.isPureReactComponent=!0;var fe=Array.isArray,$e=Object.prototype.hasOwnProperty,we={current:null},le={key:!0,ref:!0,__self:!0,__source:!0};function De(d,v,O){var R,F={},Q=null,X=null;if(v!=null)for(R in v.ref!==void 0&&(X=v.ref),v.key!==void 0&&(Q=""+v.key),v)$e.call(v,R)&&!le.hasOwnProperty(R)&&(F[R]=v[R]);var Y=arguments.length-2;if(Y===1)F.children=O;else if(1<Y){for(var ee=Array(Y),Ve=0;Ve<Y;Ve++)ee[Ve]=arguments[Ve+2];F.children=ee}if(d&&d.defaultProps)for(R in Y=d.defaultProps,Y)F[R]===void 0&&(F[R]=Y[R]);return{$$typeof:k,type:d,key:Q,ref:X,props:F,_owner:we.current}}function ie(d,v){return{$$typeof:k,type:d.type,key:v,ref:d.ref,props:d.props,_owner:d._owner}}function Ke(d){return typeof d=="object"&&d!==null&&d.$$typeof===k}function wt(d){var v={"=":"=0",":":"=2"};return"$"+d.replace(/[=:]/g,function(O){return v[O]})}var ft=/\/+/g;function Qe(d,v){return typeof d=="object"&&d!==null&&d.key!=null?wt(""+d.key):v.toString(36)}function rt(d,v,O,R,F){var Q=typeof d;(Q==="undefined"||Q==="boolean")&&(d=null);var X=!1;if(d===null)X=!0;else switch(Q){case"string":case"number":X=!0;break;case"object":switch(d.$$typeof){case k:case T:X=!0}}if(X)return X=d,F=F(X),d=R===""?"."+Qe(X,0):R,fe(F)?(O="",d!=null&&(O=d.replace(ft,"$&/")+"/"),rt(F,v,O,"",function(Ve){return Ve})):F!=null&&(Ke(F)&&(F=ie(F,O+(!F.key||X&&X.key===F.key?"":(""+F.key).replace(ft,"$&/")+"/")+d)),v.push(F)),1;if(X=0,R=R===""?".":R+":",fe(d))for(var Y=0;Y<d.length;Y++){Q=d[Y];var ee=R+Qe(Q,Y);X+=rt(Q,v,O,ee,F)}else if(ee=J(d),typeof ee=="function")for(d=ee.call(d),Y=0;!(Q=d.next()).done;)Q=Q.value,ee=R+Qe(Q,Y++),X+=rt(Q,v,O,ee,F);else if(Q==="object")throw v=String(d),Error("Objects are not valid as a React child (found: "+(v==="[object Object]"?"object with keys {"+Object.keys(d).join(", ")+"}":v)+"). If you meant to render a collection of children, use an array instead.");return X}function pt(d,v,O){if(d==null)return d;var R=[],F=0;return rt(d,R,"","",function(Q){return v.call(O,Q,F++)}),R}function _e(d){if(d._status===-1){var v=d._result;v=v(),v.then(function(O){(d._status===0||d._status===-1)&&(d._status=1,d._result=O)},function(O){(d._status===0||d._status===-1)&&(d._status=2,d._result=O)}),d._status===-1&&(d._status=0,d._result=v)}if(d._status===1)return d._result.default;throw d._result}var oe={current:null},E={transition:null},D={ReactCurrentDispatcher:oe,ReactCurrentBatchConfig:E,ReactCurrentOwner:we};function M(){throw Error("act(...) is not supported in production builds of React.")}return P.Children={map:pt,forEach:function(d,v,O){pt(d,function(){v.apply(this,arguments)},O)},count:function(d){var v=0;return pt(d,function(){v++}),v},toArray:function(d){return pt(d,function(v){return v})||[]},only:function(d){if(!Ke(d))throw Error("React.Children.only expected to receive a single React element child.");return d}},P.Component=W,P.Fragment=g,P.Profiler=A,P.PureComponent=nt,P.StrictMode=K,P.Suspense=B,P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,P.act=M,P.cloneElement=function(d,v,O){if(d==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+d+".");var R=Ie({},d.props),F=d.key,Q=d.ref,X=d._owner;if(v!=null){if(v.ref!==void 0&&(Q=v.ref,X=we.current),v.key!==void 0&&(F=""+v.key),d.type&&d.type.defaultProps)var Y=d.type.defaultProps;for(ee in v)$e.call(v,ee)&&!le.hasOwnProperty(ee)&&(R[ee]=v[ee]===void 0&&Y!==void 0?Y[ee]:v[ee])}var ee=arguments.length-2;if(ee===1)R.children=O;else if(1<ee){Y=Array(ee);for(var Ve=0;Ve<ee;Ve++)Y[Ve]=arguments[Ve+2];R.children=Y}return{$$typeof:k,type:d.type,key:F,ref:Q,props:R,_owner:X}},P.createContext=function(d){return d={$$typeof:ue,_currentValue:d,_currentValue2:d,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},d.Provider={$$typeof:H,_context:d},d.Consumer=d},P.createElement=De,P.createFactory=function(d){var v=De.bind(null,d);return v.type=d,v},P.createRef=function(){return{current:null}},P.forwardRef=function(d){return{$$typeof:he,render:d}},P.isValidElement=Ke,P.lazy=function(d){return{$$typeof:xt,_payload:{_status:-1,_result:d},_init:_e}},P.memo=function(d,v){return{$$typeof:Le,type:d,compare:v===void 0?null:v}},P.startTransition=function(d){var v=E.transition;E.transition={};try{d()}finally{E.transition=v}},P.unstable_act=M,P.useCallback=function(d,v){return oe.current.useCallback(d,v)},P.useContext=function(d){return oe.current.useContext(d)},P.useDebugValue=function(){},P.useDeferredValue=function(d){return oe.current.useDeferredValue(d)},P.useEffect=function(d,v){return oe.current.useEffect(d,v)},P.useId=function(){return oe.current.useId()},P.useImperativeHandle=function(d,v,O){return oe.current.useImperativeHandle(d,v,O)},P.useInsertionEffect=function(d,v){return oe.current.useInsertionEffect(d,v)},P.useLayoutEffect=function(d,v){return oe.current.useLayoutEffect(d,v)},P.useMemo=function(d,v){return oe.current.useMemo(d,v)},P.useReducer=function(d,v,O){return oe.current.useReducer(d,v,O)},P.useRef=function(d){return oe.current.useRef(d)},P.useState=function(d){return oe.current.useState(d)},P.useSyncExternalStore=function(d,v,O){return oe.current.useSyncExternalStore(d,v,O)},P.useTransition=function(){return oe.current.useTransition()},P.version="18.3.1",P}var Es;function Ts(){return Es||(Es=1,So.exports=Ld()),So.exports}var dt=Ts();const u=Cd(dt);var zl={},No={exports:{}},Fe={},Mo={exports:{}},Co={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ss;function zd(){return Ss||(Ss=1,(function(k){function T(E,D){var M=E.length;E.push(D);e:for(;0<M;){var d=M-1>>>1,v=E[d];if(0<A(v,D))E[d]=D,E[M]=v,M=d;else break e}}function g(E){return E.length===0?null:E[0]}function K(E){if(E.length===0)return null;var D=E[0],M=E.pop();if(M!==D){E[0]=M;e:for(var d=0,v=E.length,O=v>>>1;d<O;){var R=2*(d+1)-1,F=E[R],Q=R+1,X=E[Q];if(0>A(F,M))Q<v&&0>A(X,F)?(E[d]=X,E[Q]=M,d=Q):(E[d]=F,E[R]=M,d=R);else if(Q<v&&0>A(X,M))E[d]=X,E[Q]=M,d=Q;else break e}}return D}function A(E,D){var M=E.sortIndex-D.sortIndex;return M!==0?M:E.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var H=performance;k.unstable_now=function(){return H.now()}}else{var ue=Date,he=ue.now();k.unstable_now=function(){return ue.now()-he}}var B=[],Le=[],xt=1,de=null,J=3,et=!1,Ie=!1,G=!1,W=typeof setTimeout=="function"?setTimeout:null,tt=typeof clearTimeout=="function"?clearTimeout:null,nt=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ze(E){for(var D=g(Le);D!==null;){if(D.callback===null)K(Le);else if(D.startTime<=E)K(Le),D.sortIndex=D.expirationTime,T(B,D);else break;D=g(Le)}}function fe(E){if(G=!1,ze(E),!Ie)if(g(B)!==null)Ie=!0,_e($e);else{var D=g(Le);D!==null&&oe(fe,D.startTime-E)}}function $e(E,D){Ie=!1,G&&(G=!1,tt(De),De=-1),et=!0;var M=J;try{for(ze(D),de=g(B);de!==null&&(!(de.expirationTime>D)||E&&!wt());){var d=de.callback;if(typeof d=="function"){de.callback=null,J=de.priorityLevel;var v=d(de.expirationTime<=D);D=k.unstable_now(),typeof v=="function"?de.callback=v:de===g(B)&&K(B),ze(D)}else K(B);de=g(B)}if(de!==null)var O=!0;else{var R=g(Le);R!==null&&oe(fe,R.startTime-D),O=!1}return O}finally{de=null,J=M,et=!1}}var we=!1,le=null,De=-1,ie=5,Ke=-1;function wt(){return!(k.unstable_now()-Ke<ie)}function ft(){if(le!==null){var E=k.unstable_now();Ke=E;var D=!0;try{D=le(!0,E)}finally{D?Qe():(we=!1,le=null)}}else we=!1}var Qe;if(typeof nt=="function")Qe=function(){nt(ft)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,pt=rt.port2;rt.port1.onmessage=ft,Qe=function(){pt.postMessage(null)}}else Qe=function(){W(ft,0)};function _e(E){le=E,we||(we=!0,Qe())}function oe(E,D){De=W(function(){E(k.unstable_now())},D)}k.unstable_IdlePriority=5,k.unstable_ImmediatePriority=1,k.unstable_LowPriority=4,k.unstable_NormalPriority=3,k.unstable_Profiling=null,k.unstable_UserBlockingPriority=2,k.unstable_cancelCallback=function(E){E.callback=null},k.unstable_continueExecution=function(){Ie||et||(Ie=!0,_e($e))},k.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ie=0<E?Math.floor(1e3/E):5},k.unstable_getCurrentPriorityLevel=function(){return J},k.unstable_getFirstCallbackNode=function(){return g(B)},k.unstable_next=function(E){switch(J){case 1:case 2:case 3:var D=3;break;default:D=J}var M=J;J=D;try{return E()}finally{J=M}},k.unstable_pauseExecution=function(){},k.unstable_requestPaint=function(){},k.unstable_runWithPriority=function(E,D){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=J;J=E;try{return D()}finally{J=M}},k.unstable_scheduleCallback=function(E,D,M){var d=k.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?d+M:d):M=d,E){case 1:var v=-1;break;case 2:v=250;break;case 5:v=1073741823;break;case 4:v=1e4;break;default:v=5e3}return v=M+v,E={id:xt++,callback:D,priorityLevel:E,startTime:M,expirationTime:v,sortIndex:-1},M>d?(E.sortIndex=M,T(Le,E),g(B)===null&&E===g(Le)&&(G?(tt(De),De=-1):G=!0,oe(fe,M-d))):(E.sortIndex=v,T(B,E),Ie||et||(Ie=!0,_e($e))),E},k.unstable_shouldYield=wt,k.unstable_wrapCallback=function(E){var D=J;return function(){var M=J;J=D;try{return E.apply(this,arguments)}finally{J=M}}}})(Co)),Co}var Ns;function Td(){return Ns||(Ns=1,Mo.exports=zd()),Mo.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ms;function jd(){if(Ms)return Fe;Ms=1;var k=Ts(),T=Td();function g(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var K=new Set,A={};function H(e,t){ue(e,t),ue(e+"Capture",t)}function ue(e,t){for(A[e]=t,e=0;e<t.length;e++)K.add(t[e])}var he=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),B=Object.prototype.hasOwnProperty,Le=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xt={},de={};function J(e){return B.call(de,e)?!0:B.call(xt,e)?!1:Le.test(e)?de[e]=!0:(xt[e]=!0,!1)}function et(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ie(e,t,n,r){if(t===null||typeof t>"u"||et(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function G(e,t,n,r,l,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var W={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){W[e]=new G(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];W[t]=new G(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){W[e]=new G(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){W[e]=new G(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){W[e]=new G(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){W[e]=new G(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){W[e]=new G(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){W[e]=new G(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){W[e]=new G(e,5,!1,e.toLowerCase(),null,!1,!1)});var tt=/[\-:]([a-z])/g;function nt(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(tt,nt);W[t]=new G(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(tt,nt);W[t]=new G(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(tt,nt);W[t]=new G(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){W[e]=new G(e,1,!1,e.toLowerCase(),null,!1,!1)}),W.xlinkHref=new G("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){W[e]=new G(e,1,!1,e.toLowerCase(),null,!0,!0)});function ze(e,t,n,r){var l=W.hasOwnProperty(t)?W[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ie(t,n,l,r)&&(n=null),r||l===null?J(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var fe=k.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,$e=Symbol.for("react.element"),we=Symbol.for("react.portal"),le=Symbol.for("react.fragment"),De=Symbol.for("react.strict_mode"),ie=Symbol.for("react.profiler"),Ke=Symbol.for("react.provider"),wt=Symbol.for("react.context"),ft=Symbol.for("react.forward_ref"),Qe=Symbol.for("react.suspense"),rt=Symbol.for("react.suspense_list"),pt=Symbol.for("react.memo"),_e=Symbol.for("react.lazy"),oe=Symbol.for("react.offscreen"),E=Symbol.iterator;function D(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var M=Object.assign,d;function v(e){if(d===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);d=t&&t[1]||""}return`
`+d+e}var O=!1;function R(e,t){if(!e||O)return"";O=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(m){var r=m}Reflect.construct(e,[],t)}else{try{t.call()}catch(m){r=m}e.call(t.prototype)}else{try{throw Error()}catch(m){r=m}e()}}catch(m){if(m&&r&&typeof m.stack=="string"){for(var l=m.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,a=i.length-1;1<=o&&0<=a&&l[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(l[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||l[o]!==i[a]){var s=`
`+l[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=a);break}}}finally{O=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?v(e):""}function F(e){switch(e.tag){case 5:return v(e.type);case 16:return v("Lazy");case 13:return v("Suspense");case 19:return v("SuspenseList");case 0:case 2:case 15:return e=R(e.type,!1),e;case 11:return e=R(e.type.render,!1),e;case 1:return e=R(e.type,!0),e;default:return""}}function Q(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case le:return"Fragment";case we:return"Portal";case ie:return"Profiler";case De:return"StrictMode";case Qe:return"Suspense";case rt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case wt:return(e.displayName||"Context")+".Consumer";case Ke:return(e._context.displayName||"Context")+".Provider";case ft:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pt:return t=e.displayName||null,t!==null?t:Q(e.type)||"Memo";case _e:t=e._payload,e=e._init;try{return Q(e(t))}catch{}}return null}function X(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Q(t);case 8:return t===De?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Y(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ee(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ve(e){var t=ee(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yr(e){e._valueTracker||(e._valueTracker=Ve(e))}function Lo(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ee(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function xr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Tl(e,t){var n=t.checked;return M({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function zo(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Y(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function To(e,t){t=t.checked,t!=null&&ze(e,"checked",t,!1)}function jl(e,t){To(e,t);var n=Y(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Il(e,t.type,n):t.hasOwnProperty("defaultValue")&&Il(e,t.type,Y(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function jo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Il(e,t,n){(t!=="number"||xr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var _n=Array.isArray;function un(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Y(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Dl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(g(91));return M({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Io(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(g(92));if(_n(n)){if(1<n.length)throw Error(g(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Y(n)}}function Do(e,t){var n=Y(t.value),r=Y(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function _o(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Oo(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _l(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Oo(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var wr,Po=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(wr=wr||document.createElement("div"),wr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=wr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function On(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Pn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},js=["Webkit","ms","Moz","O"];Object.keys(Pn).forEach(function(e){js.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Pn[t]=Pn[e]})});function Ro(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Pn.hasOwnProperty(e)&&Pn[e]?(""+t).trim():t+"px"}function Ao(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=Ro(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Is=M({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ol(e,t){if(t){if(Is[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(g(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(g(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(g(61))}if(t.style!=null&&typeof t.style!="object")throw Error(g(62))}}function Pl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Rl=null;function Al(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ul=null,sn=null,cn=null;function Uo(e){if(e=rr(e)){if(typeof Ul!="function")throw Error(g(280));var t=e.stateNode;t&&(t=Br(t),Ul(e.stateNode,e.type,t))}}function Fo(e){sn?cn?cn.push(e):cn=[e]:sn=e}function Qo(){if(sn){var e=sn,t=cn;if(cn=sn=null,Uo(e),t)for(e=0;e<t.length;e++)Uo(t[e])}}function Vo(e,t){return e(t)}function Ho(){}var Fl=!1;function Bo(e,t,n){if(Fl)return e(t,n);Fl=!0;try{return Vo(e,t,n)}finally{Fl=!1,(sn!==null||cn!==null)&&(Ho(),Qo())}}function Rn(e,t){var n=e.stateNode;if(n===null)return null;var r=Br(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(g(231,t,typeof n));return n}var Ql=!1;if(he)try{var An={};Object.defineProperty(An,"passive",{get:function(){Ql=!0}}),window.addEventListener("test",An,An),window.removeEventListener("test",An,An)}catch{Ql=!1}function Ds(e,t,n,r,l,i,o,a,s){var m=Array.prototype.slice.call(arguments,3);try{t.apply(n,m)}catch(y){this.onError(y)}}var Un=!1,kr=null,Er=!1,Vl=null,_s={onError:function(e){Un=!0,kr=e}};function Os(e,t,n,r,l,i,o,a,s){Un=!1,kr=null,Ds.apply(_s,arguments)}function Ps(e,t,n,r,l,i,o,a,s){if(Os.apply(this,arguments),Un){if(Un){var m=kr;Un=!1,kr=null}else throw Error(g(198));Er||(Er=!0,Vl=m)}}function Gt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Wo(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Yo(e){if(Gt(e)!==e)throw Error(g(188))}function Rs(e){var t=e.alternate;if(!t){if(t=Gt(e),t===null)throw Error(g(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Yo(l),e;if(i===r)return Yo(l),t;i=i.sibling}throw Error(g(188))}if(n.return!==r.return)n=l,r=i;else{for(var o=!1,a=l.child;a;){if(a===n){o=!0,n=l,r=i;break}if(a===r){o=!0,r=l,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=l;break}if(a===r){o=!0,r=i,n=l;break}a=a.sibling}if(!o)throw Error(g(189))}}if(n.alternate!==r)throw Error(g(190))}if(n.tag!==3)throw Error(g(188));return n.stateNode.current===n?e:t}function $o(e){return e=Rs(e),e!==null?Ko(e):null}function Ko(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ko(e);if(t!==null)return t;e=e.sibling}return null}var Go=T.unstable_scheduleCallback,Xo=T.unstable_cancelCallback,As=T.unstable_shouldYield,Us=T.unstable_requestPaint,se=T.unstable_now,Fs=T.unstable_getCurrentPriorityLevel,Hl=T.unstable_ImmediatePriority,Zo=T.unstable_UserBlockingPriority,Sr=T.unstable_NormalPriority,Qs=T.unstable_LowPriority,Jo=T.unstable_IdlePriority,Nr=null,mt=null;function Vs(e){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Nr,e,void 0,(e.current.flags&128)===128)}catch{}}var lt=Math.clz32?Math.clz32:Ws,Hs=Math.log,Bs=Math.LN2;function Ws(e){return e>>>=0,e===0?32:31-(Hs(e)/Bs|0)|0}var Mr=64,Cr=4194304;function Fn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Lr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~l;a!==0?r=Fn(a):(i&=o,i!==0&&(r=Fn(i)))}else o=n&~l,o!==0?r=Fn(o):i!==0&&(r=Fn(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-lt(t),l=1<<n,r|=e[n],t&=~l;return r}function Ys(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $s(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-lt(i),a=1<<o,s=l[o];s===-1?((a&n)===0||(a&r)!==0)&&(l[o]=Ys(a,t)):s<=t&&(e.expiredLanes|=a),i&=~a}}function Bl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function qo(){var e=Mr;return Mr<<=1,(Mr&4194240)===0&&(Mr=64),e}function Wl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Qn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-lt(t),e[t]=n}function Ks(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-lt(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function Yl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-lt(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var $=0;function bo(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ea,$l,ta,na,ra,Kl=!1,zr=[],Tt=null,jt=null,It=null,Vn=new Map,Hn=new Map,Dt=[],Gs="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function la(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":jt=null;break;case"mouseover":case"mouseout":It=null;break;case"pointerover":case"pointerout":Vn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hn.delete(t.pointerId)}}function Bn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=rr(t),t!==null&&$l(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Xs(e,t,n,r,l){switch(t){case"focusin":return Tt=Bn(Tt,e,t,n,r,l),!0;case"dragenter":return jt=Bn(jt,e,t,n,r,l),!0;case"mouseover":return It=Bn(It,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return Vn.set(i,Bn(Vn.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,Hn.set(i,Bn(Hn.get(i)||null,e,t,n,r,l)),!0}return!1}function ia(e){var t=Xt(e.target);if(t!==null){var n=Gt(t);if(n!==null){if(t=n.tag,t===13){if(t=Wo(n),t!==null){e.blockedOn=t,ra(e.priority,function(){ta(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Tr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Xl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Rl=r,n.target.dispatchEvent(r),Rl=null}else return t=rr(n),t!==null&&$l(t),e.blockedOn=n,!1;t.shift()}return!0}function oa(e,t,n){Tr(e)&&n.delete(t)}function Zs(){Kl=!1,Tt!==null&&Tr(Tt)&&(Tt=null),jt!==null&&Tr(jt)&&(jt=null),It!==null&&Tr(It)&&(It=null),Vn.forEach(oa),Hn.forEach(oa)}function Wn(e,t){e.blockedOn===t&&(e.blockedOn=null,Kl||(Kl=!0,T.unstable_scheduleCallback(T.unstable_NormalPriority,Zs)))}function Yn(e){function t(l){return Wn(l,e)}if(0<zr.length){Wn(zr[0],e);for(var n=1;n<zr.length;n++){var r=zr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Tt!==null&&Wn(Tt,e),jt!==null&&Wn(jt,e),It!==null&&Wn(It,e),Vn.forEach(t),Hn.forEach(t),n=0;n<Dt.length;n++)r=Dt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Dt.length&&(n=Dt[0],n.blockedOn===null);)ia(n),n.blockedOn===null&&Dt.shift()}var dn=fe.ReactCurrentBatchConfig,jr=!0;function Js(e,t,n,r){var l=$,i=dn.transition;dn.transition=null;try{$=1,Gl(e,t,n,r)}finally{$=l,dn.transition=i}}function qs(e,t,n,r){var l=$,i=dn.transition;dn.transition=null;try{$=4,Gl(e,t,n,r)}finally{$=l,dn.transition=i}}function Gl(e,t,n,r){if(jr){var l=Xl(e,t,n,r);if(l===null)fi(e,t,r,Ir,n),la(e,r);else if(Xs(l,e,t,n,r))r.stopPropagation();else if(la(e,r),t&4&&-1<Gs.indexOf(e)){for(;l!==null;){var i=rr(l);if(i!==null&&ea(i),i=Xl(e,t,n,r),i===null&&fi(e,t,r,Ir,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else fi(e,t,r,null,n)}}var Ir=null;function Xl(e,t,n,r){if(Ir=null,e=Al(r),e=Xt(e),e!==null)if(t=Gt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Wo(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ir=e,null}function aa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Fs()){case Hl:return 1;case Zo:return 4;case Sr:case Qs:return 16;case Jo:return 536870912;default:return 16}default:return 16}}var _t=null,Zl=null,Dr=null;function ua(){if(Dr)return Dr;var e,t=Zl,n=t.length,r,l="value"in _t?_t.value:_t.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===l[i-r];r++);return Dr=l.slice(e,1<r?1-r:void 0)}function _r(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Or(){return!0}function sa(){return!1}function He(e){function t(n,r,l,i,o){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Or:sa,this.isPropagationStopped=sa,this}return M(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Or)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Or)},persist:function(){},isPersistent:Or}),t}var fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=He(fn),$n=M({},fn,{view:0,detail:0}),bs=He($n),ql,bl,Kn,Pr=M({},$n,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ti,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Kn&&(Kn&&e.type==="mousemove"?(ql=e.screenX-Kn.screenX,bl=e.screenY-Kn.screenY):bl=ql=0,Kn=e),ql)},movementY:function(e){return"movementY"in e?e.movementY:bl}}),ca=He(Pr),ec=M({},Pr,{dataTransfer:0}),tc=He(ec),nc=M({},$n,{relatedTarget:0}),ei=He(nc),rc=M({},fn,{animationName:0,elapsedTime:0,pseudoElement:0}),lc=He(rc),ic=M({},fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),oc=He(ic),ac=M({},fn,{data:0}),da=He(ac),uc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cc[e])?!!t[e]:!1}function ti(){return dc}var fc=M({},$n,{key:function(e){if(e.key){var t=uc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=_r(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ti,charCode:function(e){return e.type==="keypress"?_r(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_r(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),pc=He(fc),mc=M({},Pr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fa=He(mc),gc=M({},$n,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ti}),hc=He(gc),vc=M({},fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),yc=He(vc),xc=M({},Pr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wc=He(xc),kc=[9,13,27,32],ni=he&&"CompositionEvent"in window,Gn=null;he&&"documentMode"in document&&(Gn=document.documentMode);var Ec=he&&"TextEvent"in window&&!Gn,pa=he&&(!ni||Gn&&8<Gn&&11>=Gn),ma=" ",ga=!1;function ha(e,t){switch(e){case"keyup":return kc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function va(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pn=!1;function Sc(e,t){switch(e){case"compositionend":return va(t);case"keypress":return t.which!==32?null:(ga=!0,ma);case"textInput":return e=t.data,e===ma&&ga?null:e;default:return null}}function Nc(e,t){if(pn)return e==="compositionend"||!ni&&ha(e,t)?(e=ua(),Dr=Zl=_t=null,pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return pa&&t.locale!=="ko"?null:t.data;default:return null}}var Mc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ya(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Mc[e.type]:t==="textarea"}function xa(e,t,n,r){Fo(r),t=Qr(t,"onChange"),0<t.length&&(n=new Jl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Xn=null,Zn=null;function Cc(e){Aa(e,0)}function Rr(e){var t=yn(e);if(Lo(t))return e}function Lc(e,t){if(e==="change")return t}var wa=!1;if(he){var ri;if(he){var li="oninput"in document;if(!li){var ka=document.createElement("div");ka.setAttribute("oninput","return;"),li=typeof ka.oninput=="function"}ri=li}else ri=!1;wa=ri&&(!document.documentMode||9<document.documentMode)}function Ea(){Xn&&(Xn.detachEvent("onpropertychange",Sa),Zn=Xn=null)}function Sa(e){if(e.propertyName==="value"&&Rr(Zn)){var t=[];xa(t,Zn,e,Al(e)),Bo(Cc,t)}}function zc(e,t,n){e==="focusin"?(Ea(),Xn=t,Zn=n,Xn.attachEvent("onpropertychange",Sa)):e==="focusout"&&Ea()}function Tc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Rr(Zn)}function jc(e,t){if(e==="click")return Rr(t)}function Ic(e,t){if(e==="input"||e==="change")return Rr(t)}function Dc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var it=typeof Object.is=="function"?Object.is:Dc;function Jn(e,t){if(it(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!B.call(t,l)||!it(e[l],t[l]))return!1}return!0}function Na(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ma(e,t){var n=Na(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Na(n)}}function Ca(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ca(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function La(){for(var e=window,t=xr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=xr(e.document)}return t}function ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function _c(e){var t=La(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ca(n.ownerDocument.documentElement,n)){if(r!==null&&ii(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=Ma(n,i);var o=Ma(n,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Oc=he&&"documentMode"in document&&11>=document.documentMode,mn=null,oi=null,qn=null,ai=!1;function za(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ai||mn==null||mn!==xr(r)||(r=mn,"selectionStart"in r&&ii(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),qn&&Jn(qn,r)||(qn=r,r=Qr(oi,"onSelect"),0<r.length&&(t=new Jl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=mn)))}function Ar(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var gn={animationend:Ar("Animation","AnimationEnd"),animationiteration:Ar("Animation","AnimationIteration"),animationstart:Ar("Animation","AnimationStart"),transitionend:Ar("Transition","TransitionEnd")},ui={},Ta={};he&&(Ta=document.createElement("div").style,"AnimationEvent"in window||(delete gn.animationend.animation,delete gn.animationiteration.animation,delete gn.animationstart.animation),"TransitionEvent"in window||delete gn.transitionend.transition);function Ur(e){if(ui[e])return ui[e];if(!gn[e])return e;var t=gn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ta)return ui[e]=t[n];return e}var ja=Ur("animationend"),Ia=Ur("animationiteration"),Da=Ur("animationstart"),_a=Ur("transitionend"),Oa=new Map,Pa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ot(e,t){Oa.set(e,t),H(t,[e])}for(var si=0;si<Pa.length;si++){var ci=Pa[si],Pc=ci.toLowerCase(),Rc=ci[0].toUpperCase()+ci.slice(1);Ot(Pc,"on"+Rc)}Ot(ja,"onAnimationEnd"),Ot(Ia,"onAnimationIteration"),Ot(Da,"onAnimationStart"),Ot("dblclick","onDoubleClick"),Ot("focusin","onFocus"),Ot("focusout","onBlur"),Ot(_a,"onTransitionEnd"),ue("onMouseEnter",["mouseout","mouseover"]),ue("onMouseLeave",["mouseout","mouseover"]),ue("onPointerEnter",["pointerout","pointerover"]),ue("onPointerLeave",["pointerout","pointerover"]),H("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),H("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),H("onBeforeInput",["compositionend","keypress","textInput","paste"]),H("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),H("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),H("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ac=new Set("cancel close invalid load scroll toggle".split(" ").concat(bn));function Ra(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ps(r,t,void 0,e),e.currentTarget=null}function Aa(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],s=a.instance,m=a.currentTarget;if(a=a.listener,s!==i&&l.isPropagationStopped())break e;Ra(l,a,m),i=s}else for(o=0;o<r.length;o++){if(a=r[o],s=a.instance,m=a.currentTarget,a=a.listener,s!==i&&l.isPropagationStopped())break e;Ra(l,a,m),i=s}}}if(Er)throw e=Vl,Er=!1,Vl=null,e}function q(e,t){var n=t[yi];n===void 0&&(n=t[yi]=new Set);var r=e+"__bubble";n.has(r)||(Ua(t,e,2,!1),n.add(r))}function di(e,t,n){var r=0;t&&(r|=4),Ua(n,e,r,t)}var Fr="_reactListening"+Math.random().toString(36).slice(2);function er(e){if(!e[Fr]){e[Fr]=!0,K.forEach(function(n){n!=="selectionchange"&&(Ac.has(n)||di(n,!1,e),di(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Fr]||(t[Fr]=!0,di("selectionchange",!1,t))}}function Ua(e,t,n,r){switch(aa(t)){case 1:var l=Js;break;case 4:l=qs;break;default:l=Gl}n=l.bind(null,t,n,e),l=void 0,!Ql||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function fi(e,t,n,r,l){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;o=o.return}for(;a!==null;){if(o=Xt(a),o===null)return;if(s=o.tag,s===5||s===6){r=i=o;continue e}a=a.parentNode}}r=r.return}Bo(function(){var m=i,y=Al(n),x=[];e:{var h=Oa.get(e);if(h!==void 0){var S=Jl,C=e;switch(e){case"keypress":if(_r(n)===0)break e;case"keydown":case"keyup":S=pc;break;case"focusin":C="focus",S=ei;break;case"focusout":C="blur",S=ei;break;case"beforeblur":case"afterblur":S=ei;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=ca;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=tc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=hc;break;case ja:case Ia:case Da:S=lc;break;case _a:S=yc;break;case"scroll":S=bs;break;case"wheel":S=wc;break;case"copy":case"cut":case"paste":S=oc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=fa}var L=(t&4)!==0,ce=!L&&e==="scroll",f=L?h!==null?h+"Capture":null:h;L=[];for(var c=m,p;c!==null;){p=c;var w=p.stateNode;if(p.tag===5&&w!==null&&(p=w,f!==null&&(w=Rn(c,f),w!=null&&L.push(tr(c,w,p)))),ce)break;c=c.return}0<L.length&&(h=new S(h,C,null,n,y),x.push({event:h,listeners:L}))}}if((t&7)===0){e:{if(h=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",h&&n!==Rl&&(C=n.relatedTarget||n.fromElement)&&(Xt(C)||C[kt]))break e;if((S||h)&&(h=y.window===y?y:(h=y.ownerDocument)?h.defaultView||h.parentWindow:window,S?(C=n.relatedTarget||n.toElement,S=m,C=C?Xt(C):null,C!==null&&(ce=Gt(C),C!==ce||C.tag!==5&&C.tag!==6)&&(C=null)):(S=null,C=m),S!==C)){if(L=ca,w="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(L=fa,w="onPointerLeave",f="onPointerEnter",c="pointer"),ce=S==null?h:yn(S),p=C==null?h:yn(C),h=new L(w,c+"leave",S,n,y),h.target=ce,h.relatedTarget=p,w=null,Xt(y)===m&&(L=new L(f,c+"enter",C,n,y),L.target=p,L.relatedTarget=ce,w=L),ce=w,S&&C)t:{for(L=S,f=C,c=0,p=L;p;p=hn(p))c++;for(p=0,w=f;w;w=hn(w))p++;for(;0<c-p;)L=hn(L),c--;for(;0<p-c;)f=hn(f),p--;for(;c--;){if(L===f||f!==null&&L===f.alternate)break t;L=hn(L),f=hn(f)}L=null}else L=null;S!==null&&Fa(x,h,S,L,!1),C!==null&&ce!==null&&Fa(x,ce,C,L,!0)}}e:{if(h=m?yn(m):window,S=h.nodeName&&h.nodeName.toLowerCase(),S==="select"||S==="input"&&h.type==="file")var z=Lc;else if(ya(h))if(wa)z=Ic;else{z=Tc;var j=zc}else(S=h.nodeName)&&S.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(z=jc);if(z&&(z=z(e,m))){xa(x,z,n,y);break e}j&&j(e,h,m),e==="focusout"&&(j=h._wrapperState)&&j.controlled&&h.type==="number"&&Il(h,"number",h.value)}switch(j=m?yn(m):window,e){case"focusin":(ya(j)||j.contentEditable==="true")&&(mn=j,oi=m,qn=null);break;case"focusout":qn=oi=mn=null;break;case"mousedown":ai=!0;break;case"contextmenu":case"mouseup":case"dragend":ai=!1,za(x,n,y);break;case"selectionchange":if(Oc)break;case"keydown":case"keyup":za(x,n,y)}var I;if(ni)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else pn?ha(e,n)&&(_="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(pa&&n.locale!=="ko"&&(pn||_!=="onCompositionStart"?_==="onCompositionEnd"&&pn&&(I=ua()):(_t=y,Zl="value"in _t?_t.value:_t.textContent,pn=!0)),j=Qr(m,_),0<j.length&&(_=new da(_,e,null,n,y),x.push({event:_,listeners:j}),I?_.data=I:(I=va(n),I!==null&&(_.data=I)))),(I=Ec?Sc(e,n):Nc(e,n))&&(m=Qr(m,"onBeforeInput"),0<m.length&&(y=new da("onBeforeInput","beforeinput",null,n,y),x.push({event:y,listeners:m}),y.data=I))}Aa(x,t)})}function tr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Rn(e,n),i!=null&&r.unshift(tr(e,i,l)),i=Rn(e,t),i!=null&&r.push(tr(e,i,l))),e=e.return}return r}function hn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Fa(e,t,n,r,l){for(var i=t._reactName,o=[];n!==null&&n!==r;){var a=n,s=a.alternate,m=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&m!==null&&(a=m,l?(s=Rn(n,i),s!=null&&o.unshift(tr(n,s,a))):l||(s=Rn(n,i),s!=null&&o.push(tr(n,s,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Uc=/\r\n?/g,Fc=/\u0000|\uFFFD/g;function Qa(e){return(typeof e=="string"?e:""+e).replace(Uc,`
`).replace(Fc,"")}function Vr(e,t,n){if(t=Qa(t),Qa(e)!==t&&n)throw Error(g(425))}function Hr(){}var pi=null,mi=null;function gi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var hi=typeof setTimeout=="function"?setTimeout:void 0,Qc=typeof clearTimeout=="function"?clearTimeout:void 0,Va=typeof Promise=="function"?Promise:void 0,Vc=typeof queueMicrotask=="function"?queueMicrotask:typeof Va<"u"?function(e){return Va.resolve(null).then(e).catch(Hc)}:hi;function Hc(e){setTimeout(function(){throw e})}function vi(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),Yn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);Yn(t)}function Pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ha(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var vn=Math.random().toString(36).slice(2),gt="__reactFiber$"+vn,nr="__reactProps$"+vn,kt="__reactContainer$"+vn,yi="__reactEvents$"+vn,Bc="__reactListeners$"+vn,Wc="__reactHandles$"+vn;function Xt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ha(e);e!==null;){if(n=e[gt])return n;e=Ha(e)}return t}e=n,n=e.parentNode}return null}function rr(e){return e=e[gt]||e[kt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function yn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(g(33))}function Br(e){return e[nr]||null}var xi=[],xn=-1;function Rt(e){return{current:e}}function b(e){0>xn||(e.current=xi[xn],xi[xn]=null,xn--)}function Z(e,t){xn++,xi[xn]=e.current,e.current=t}var At={},Se=Rt(At),Oe=Rt(!1),Zt=At;function wn(e,t){var n=e.type.contextTypes;if(!n)return At;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Pe(e){return e=e.childContextTypes,e!=null}function Wr(){b(Oe),b(Se)}function Ba(e,t,n){if(Se.current!==At)throw Error(g(168));Z(Se,t),Z(Oe,n)}function Wa(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(g(108,X(e)||"Unknown",l));return M({},n,r)}function Yr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||At,Zt=Se.current,Z(Se,e),Z(Oe,Oe.current),!0}function Ya(e,t,n){var r=e.stateNode;if(!r)throw Error(g(169));n?(e=Wa(e,t,Zt),r.__reactInternalMemoizedMergedChildContext=e,b(Oe),b(Se),Z(Se,e)):b(Oe),Z(Oe,n)}var Et=null,$r=!1,wi=!1;function $a(e){Et===null?Et=[e]:Et.push(e)}function Yc(e){$r=!0,$a(e)}function Ut(){if(!wi&&Et!==null){wi=!0;var e=0,t=$;try{var n=Et;for($=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Et=null,$r=!1}catch(l){throw Et!==null&&(Et=Et.slice(e+1)),Go(Hl,Ut),l}finally{$=t,wi=!1}}return null}var kn=[],En=0,Kr=null,Gr=0,Ge=[],Xe=0,Jt=null,St=1,Nt="";function qt(e,t){kn[En++]=Gr,kn[En++]=Kr,Kr=e,Gr=t}function Ka(e,t,n){Ge[Xe++]=St,Ge[Xe++]=Nt,Ge[Xe++]=Jt,Jt=e;var r=St;e=Nt;var l=32-lt(r)-1;r&=~(1<<l),n+=1;var i=32-lt(t)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,St=1<<32-lt(t)+l|n<<l|r,Nt=i+e}else St=1<<i|n<<l|r,Nt=e}function ki(e){e.return!==null&&(qt(e,1),Ka(e,1,0))}function Ei(e){for(;e===Kr;)Kr=kn[--En],kn[En]=null,Gr=kn[--En],kn[En]=null;for(;e===Jt;)Jt=Ge[--Xe],Ge[Xe]=null,Nt=Ge[--Xe],Ge[Xe]=null,St=Ge[--Xe],Ge[Xe]=null}var Be=null,We=null,te=!1,ot=null;function Ga(e,t){var n=be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Xa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Be=e,We=Pt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Be=e,We=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:St,overflow:Nt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Be=e,We=null,!0):!1;default:return!1}}function Si(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ni(e){if(te){var t=We;if(t){var n=t;if(!Xa(e,t)){if(Si(e))throw Error(g(418));t=Pt(n.nextSibling);var r=Be;t&&Xa(e,t)?Ga(r,n):(e.flags=e.flags&-4097|2,te=!1,Be=e)}}else{if(Si(e))throw Error(g(418));e.flags=e.flags&-4097|2,te=!1,Be=e}}}function Za(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Be=e}function Xr(e){if(e!==Be)return!1;if(!te)return Za(e),te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!gi(e.type,e.memoizedProps)),t&&(t=We)){if(Si(e))throw Ja(),Error(g(418));for(;t;)Ga(e,t),t=Pt(t.nextSibling)}if(Za(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(g(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){We=Pt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}We=null}}else We=Be?Pt(e.stateNode.nextSibling):null;return!0}function Ja(){for(var e=We;e;)e=Pt(e.nextSibling)}function Sn(){We=Be=null,te=!1}function Mi(e){ot===null?ot=[e]:ot.push(e)}var $c=fe.ReactCurrentBatchConfig;function lr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(g(309));var r=n.stateNode}if(!r)throw Error(g(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var a=l.refs;o===null?delete a[i]:a[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(g(284));if(!n._owner)throw Error(g(290,e))}return e}function Zr(e,t){throw e=Object.prototype.toString.call(t),Error(g(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function qa(e){var t=e._init;return t(e._payload)}function ba(e){function t(f,c){if(e){var p=f.deletions;p===null?(f.deletions=[c],f.flags|=16):p.push(c)}}function n(f,c){if(!e)return null;for(;c!==null;)t(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function l(f,c){return f=$t(f,c),f.index=0,f.sibling=null,f}function i(f,c,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<c?(f.flags|=2,c):p):(f.flags|=2,c)):(f.flags|=1048576,c)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function a(f,c,p,w){return c===null||c.tag!==6?(c=vo(p,f.mode,w),c.return=f,c):(c=l(c,p),c.return=f,c)}function s(f,c,p,w){var z=p.type;return z===le?y(f,c,p.props.children,w,p.key):c!==null&&(c.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===_e&&qa(z)===c.type)?(w=l(c,p.props),w.ref=lr(f,c,p),w.return=f,w):(w=wl(p.type,p.key,p.props,null,f.mode,w),w.ref=lr(f,c,p),w.return=f,w)}function m(f,c,p,w){return c===null||c.tag!==4||c.stateNode.containerInfo!==p.containerInfo||c.stateNode.implementation!==p.implementation?(c=yo(p,f.mode,w),c.return=f,c):(c=l(c,p.children||[]),c.return=f,c)}function y(f,c,p,w,z){return c===null||c.tag!==7?(c=an(p,f.mode,w,z),c.return=f,c):(c=l(c,p),c.return=f,c)}function x(f,c,p){if(typeof c=="string"&&c!==""||typeof c=="number")return c=vo(""+c,f.mode,p),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case $e:return p=wl(c.type,c.key,c.props,null,f.mode,p),p.ref=lr(f,null,c),p.return=f,p;case we:return c=yo(c,f.mode,p),c.return=f,c;case _e:var w=c._init;return x(f,w(c._payload),p)}if(_n(c)||D(c))return c=an(c,f.mode,p,null),c.return=f,c;Zr(f,c)}return null}function h(f,c,p,w){var z=c!==null?c.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return z!==null?null:a(f,c,""+p,w);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case $e:return p.key===z?s(f,c,p,w):null;case we:return p.key===z?m(f,c,p,w):null;case _e:return z=p._init,h(f,c,z(p._payload),w)}if(_n(p)||D(p))return z!==null?null:y(f,c,p,w,null);Zr(f,p)}return null}function S(f,c,p,w,z){if(typeof w=="string"&&w!==""||typeof w=="number")return f=f.get(p)||null,a(c,f,""+w,z);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case $e:return f=f.get(w.key===null?p:w.key)||null,s(c,f,w,z);case we:return f=f.get(w.key===null?p:w.key)||null,m(c,f,w,z);case _e:var j=w._init;return S(f,c,p,j(w._payload),z)}if(_n(w)||D(w))return f=f.get(p)||null,y(c,f,w,z,null);Zr(c,w)}return null}function C(f,c,p,w){for(var z=null,j=null,I=c,_=c=0,xe=null;I!==null&&_<p.length;_++){I.index>_?(xe=I,I=null):xe=I.sibling;var V=h(f,I,p[_],w);if(V===null){I===null&&(I=xe);break}e&&I&&V.alternate===null&&t(f,I),c=i(V,c,_),j===null?z=V:j.sibling=V,j=V,I=xe}if(_===p.length)return n(f,I),te&&qt(f,_),z;if(I===null){for(;_<p.length;_++)I=x(f,p[_],w),I!==null&&(c=i(I,c,_),j===null?z=I:j.sibling=I,j=I);return te&&qt(f,_),z}for(I=r(f,I);_<p.length;_++)xe=S(I,f,_,p[_],w),xe!==null&&(e&&xe.alternate!==null&&I.delete(xe.key===null?_:xe.key),c=i(xe,c,_),j===null?z=xe:j.sibling=xe,j=xe);return e&&I.forEach(function(Kt){return t(f,Kt)}),te&&qt(f,_),z}function L(f,c,p,w){var z=D(p);if(typeof z!="function")throw Error(g(150));if(p=z.call(p),p==null)throw Error(g(151));for(var j=z=null,I=c,_=c=0,xe=null,V=p.next();I!==null&&!V.done;_++,V=p.next()){I.index>_?(xe=I,I=null):xe=I.sibling;var Kt=h(f,I,V.value,w);if(Kt===null){I===null&&(I=xe);break}e&&I&&Kt.alternate===null&&t(f,I),c=i(Kt,c,_),j===null?z=Kt:j.sibling=Kt,j=Kt,I=xe}if(V.done)return n(f,I),te&&qt(f,_),z;if(I===null){for(;!V.done;_++,V=p.next())V=x(f,V.value,w),V!==null&&(c=i(V,c,_),j===null?z=V:j.sibling=V,j=V);return te&&qt(f,_),z}for(I=r(f,I);!V.done;_++,V=p.next())V=S(I,f,_,V.value,w),V!==null&&(e&&V.alternate!==null&&I.delete(V.key===null?_:V.key),c=i(V,c,_),j===null?z=V:j.sibling=V,j=V);return e&&I.forEach(function(Md){return t(f,Md)}),te&&qt(f,_),z}function ce(f,c,p,w){if(typeof p=="object"&&p!==null&&p.type===le&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case $e:e:{for(var z=p.key,j=c;j!==null;){if(j.key===z){if(z=p.type,z===le){if(j.tag===7){n(f,j.sibling),c=l(j,p.props.children),c.return=f,f=c;break e}}else if(j.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===_e&&qa(z)===j.type){n(f,j.sibling),c=l(j,p.props),c.ref=lr(f,j,p),c.return=f,f=c;break e}n(f,j);break}else t(f,j);j=j.sibling}p.type===le?(c=an(p.props.children,f.mode,w,p.key),c.return=f,f=c):(w=wl(p.type,p.key,p.props,null,f.mode,w),w.ref=lr(f,c,p),w.return=f,f=w)}return o(f);case we:e:{for(j=p.key;c!==null;){if(c.key===j)if(c.tag===4&&c.stateNode.containerInfo===p.containerInfo&&c.stateNode.implementation===p.implementation){n(f,c.sibling),c=l(c,p.children||[]),c.return=f,f=c;break e}else{n(f,c);break}else t(f,c);c=c.sibling}c=yo(p,f.mode,w),c.return=f,f=c}return o(f);case _e:return j=p._init,ce(f,c,j(p._payload),w)}if(_n(p))return C(f,c,p,w);if(D(p))return L(f,c,p,w);Zr(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,c!==null&&c.tag===6?(n(f,c.sibling),c=l(c,p),c.return=f,f=c):(n(f,c),c=vo(p,f.mode,w),c.return=f,f=c),o(f)):n(f,c)}return ce}var Nn=ba(!0),eu=ba(!1),Jr=Rt(null),qr=null,Mn=null,Ci=null;function Li(){Ci=Mn=qr=null}function zi(e){var t=Jr.current;b(Jr),e._currentValue=t}function Ti(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Cn(e,t){qr=e,Ci=Mn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Re=!0),e.firstContext=null)}function Ze(e){var t=e._currentValue;if(Ci!==e)if(e={context:e,memoizedValue:t,next:null},Mn===null){if(qr===null)throw Error(g(308));Mn=e,qr.dependencies={lanes:0,firstContext:e}}else Mn=Mn.next=e;return t}var bt=null;function ji(e){bt===null?bt=[e]:bt.push(e)}function tu(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,ji(t)):(n.next=l.next,l.next=n),t.interleaved=n,Mt(e,r)}function Mt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ft=!1;function Ii(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function nu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ct(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Qt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(U&2)!==0){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,Mt(e,n)}return l=r.interleaved,l===null?(t.next=t,ji(r)):(t.next=l.next,l.next=t),r.interleaved=t,Mt(e,n)}function br(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Yl(e,n)}}function ru(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function el(e,t,n,r){var l=e.updateQueue;Ft=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var s=a,m=s.next;s.next=null,o===null?i=m:o.next=m,o=s;var y=e.alternate;y!==null&&(y=y.updateQueue,a=y.lastBaseUpdate,a!==o&&(a===null?y.firstBaseUpdate=m:a.next=m,y.lastBaseUpdate=s))}if(i!==null){var x=l.baseState;o=0,y=m=s=null,a=i;do{var h=a.lane,S=a.eventTime;if((r&h)===h){y!==null&&(y=y.next={eventTime:S,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var C=e,L=a;switch(h=t,S=n,L.tag){case 1:if(C=L.payload,typeof C=="function"){x=C.call(S,x,h);break e}x=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=L.payload,h=typeof C=="function"?C.call(S,x,h):C,h==null)break e;x=M({},x,h);break e;case 2:Ft=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,h=l.effects,h===null?l.effects=[a]:h.push(a))}else S={eventTime:S,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},y===null?(m=y=S,s=x):y=y.next=S,o|=h;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;h=a,a=h.next,h.next=null,l.lastBaseUpdate=h,l.shared.pending=null}}while(!0);if(y===null&&(s=x),l.baseState=s,l.firstBaseUpdate=m,l.lastBaseUpdate=y,t=l.shared.interleaved,t!==null){l=t;do o|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);nn|=o,e.lanes=o,e.memoizedState=x}}function lu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(g(191,l));l.call(r)}}}var ir={},ht=Rt(ir),or=Rt(ir),ar=Rt(ir);function en(e){if(e===ir)throw Error(g(174));return e}function Di(e,t){switch(Z(ar,t),Z(or,e),Z(ht,ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_l(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_l(t,e)}b(ht),Z(ht,t)}function Ln(){b(ht),b(or),b(ar)}function iu(e){en(ar.current);var t=en(ht.current),n=_l(t,e.type);t!==n&&(Z(or,e),Z(ht,n))}function _i(e){or.current===e&&(b(ht),b(or))}var ne=Rt(0);function tl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Oi=[];function Pi(){for(var e=0;e<Oi.length;e++)Oi[e]._workInProgressVersionPrimary=null;Oi.length=0}var nl=fe.ReactCurrentDispatcher,Ri=fe.ReactCurrentBatchConfig,tn=0,re=null,me=null,ve=null,rl=!1,ur=!1,sr=0,Kc=0;function Ne(){throw Error(g(321))}function Ai(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!it(e[n],t[n]))return!1;return!0}function Ui(e,t,n,r,l,i){if(tn=i,re=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,nl.current=e===null||e.memoizedState===null?Jc:qc,e=n(r,l),ur){i=0;do{if(ur=!1,sr=0,25<=i)throw Error(g(301));i+=1,ve=me=null,t.updateQueue=null,nl.current=bc,e=n(r,l)}while(ur)}if(nl.current=ol,t=me!==null&&me.next!==null,tn=0,ve=me=re=null,rl=!1,t)throw Error(g(300));return e}function Fi(){var e=sr!==0;return sr=0,e}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ve===null?re.memoizedState=ve=e:ve=ve.next=e,ve}function Je(){if(me===null){var e=re.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=ve===null?re.memoizedState:ve.next;if(t!==null)ve=t,me=e;else{if(e===null)throw Error(g(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},ve===null?re.memoizedState=ve=e:ve=ve.next=e}return ve}function cr(e,t){return typeof t=="function"?t(e):t}function Qi(e){var t=Je(),n=t.queue;if(n===null)throw Error(g(311));n.lastRenderedReducer=e;var r=me,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var a=o=null,s=null,m=i;do{var y=m.lane;if((tn&y)===y)s!==null&&(s=s.next={lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),r=m.hasEagerState?m.eagerState:e(r,m.action);else{var x={lane:y,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};s===null?(a=s=x,o=r):s=s.next=x,re.lanes|=y,nn|=y}m=m.next}while(m!==null&&m!==i);s===null?o=r:s.next=a,it(r,t.memoizedState)||(Re=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,re.lanes|=i,nn|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Vi(e){var t=Je(),n=t.queue;if(n===null)throw Error(g(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);it(i,t.memoizedState)||(Re=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function ou(){}function au(e,t){var n=re,r=Je(),l=t(),i=!it(r.memoizedState,l);if(i&&(r.memoizedState=l,Re=!0),r=r.queue,Hi(cu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ve!==null&&ve.memoizedState.tag&1){if(n.flags|=2048,dr(9,su.bind(null,n,r,l,t),void 0,null),ye===null)throw Error(g(349));(tn&30)!==0||uu(n,t,l)}return l}function uu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=re.updateQueue,t===null?(t={lastEffect:null,stores:null},re.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function su(e,t,n,r){t.value=n,t.getSnapshot=r,du(t)&&fu(e)}function cu(e,t,n){return n(function(){du(t)&&fu(e)})}function du(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!it(e,n)}catch{return!0}}function fu(e){var t=Mt(e,1);t!==null&&ct(t,e,1,-1)}function pu(e){var t=vt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cr,lastRenderedState:e},t.queue=e,e=e.dispatch=Zc.bind(null,re,e),[t.memoizedState,e]}function dr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=re.updateQueue,t===null?(t={lastEffect:null,stores:null},re.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function mu(){return Je().memoizedState}function ll(e,t,n,r){var l=vt();re.flags|=e,l.memoizedState=dr(1|t,n,void 0,r===void 0?null:r)}function il(e,t,n,r){var l=Je();r=r===void 0?null:r;var i=void 0;if(me!==null){var o=me.memoizedState;if(i=o.destroy,r!==null&&Ai(r,o.deps)){l.memoizedState=dr(t,n,i,r);return}}re.flags|=e,l.memoizedState=dr(1|t,n,i,r)}function gu(e,t){return ll(8390656,8,e,t)}function Hi(e,t){return il(2048,8,e,t)}function hu(e,t){return il(4,2,e,t)}function vu(e,t){return il(4,4,e,t)}function yu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xu(e,t,n){return n=n!=null?n.concat([e]):null,il(4,4,yu.bind(null,t,e),n)}function Bi(){}function wu(e,t){var n=Je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ai(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ku(e,t){var n=Je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ai(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Eu(e,t,n){return(tn&21)===0?(e.baseState&&(e.baseState=!1,Re=!0),e.memoizedState=n):(it(n,t)||(n=qo(),re.lanes|=n,nn|=n,e.baseState=!0),t)}function Gc(e,t){var n=$;$=n!==0&&4>n?n:4,e(!0);var r=Ri.transition;Ri.transition={};try{e(!1),t()}finally{$=n,Ri.transition=r}}function Su(){return Je().memoizedState}function Xc(e,t,n){var r=Wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Nu(e))Mu(t,n);else if(n=tu(e,t,n,r),n!==null){var l=je();ct(n,e,r,l),Cu(n,t,r)}}function Zc(e,t,n){var r=Wt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Nu(e))Mu(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,a=i(o,n);if(l.hasEagerState=!0,l.eagerState=a,it(a,o)){var s=t.interleaved;s===null?(l.next=l,ji(t)):(l.next=s.next,s.next=l),t.interleaved=l;return}}catch{}finally{}n=tu(e,t,l,r),n!==null&&(l=je(),ct(n,e,r,l),Cu(n,t,r))}}function Nu(e){var t=e.alternate;return e===re||t!==null&&t===re}function Mu(e,t){ur=rl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cu(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Yl(e,n)}}var ol={readContext:Ze,useCallback:Ne,useContext:Ne,useEffect:Ne,useImperativeHandle:Ne,useInsertionEffect:Ne,useLayoutEffect:Ne,useMemo:Ne,useReducer:Ne,useRef:Ne,useState:Ne,useDebugValue:Ne,useDeferredValue:Ne,useTransition:Ne,useMutableSource:Ne,useSyncExternalStore:Ne,useId:Ne,unstable_isNewReconciler:!1},Jc={readContext:Ze,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:Ze,useEffect:gu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ll(4194308,4,yu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ll(4194308,4,e,t)},useInsertionEffect:function(e,t){return ll(4,2,e,t)},useMemo:function(e,t){var n=vt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=vt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Xc.bind(null,re,e),[r.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:pu,useDebugValue:Bi,useDeferredValue:function(e){return vt().memoizedState=e},useTransition:function(){var e=pu(!1),t=e[0];return e=Gc.bind(null,e[1]),vt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=re,l=vt();if(te){if(n===void 0)throw Error(g(407));n=n()}else{if(n=t(),ye===null)throw Error(g(349));(tn&30)!==0||uu(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,gu(cu.bind(null,r,i,e),[e]),r.flags|=2048,dr(9,su.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=vt(),t=ye.identifierPrefix;if(te){var n=Nt,r=St;n=(r&~(1<<32-lt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=sr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Kc++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},qc={readContext:Ze,useCallback:wu,useContext:Ze,useEffect:Hi,useImperativeHandle:xu,useInsertionEffect:hu,useLayoutEffect:vu,useMemo:ku,useReducer:Qi,useRef:mu,useState:function(){return Qi(cr)},useDebugValue:Bi,useDeferredValue:function(e){var t=Je();return Eu(t,me.memoizedState,e)},useTransition:function(){var e=Qi(cr)[0],t=Je().memoizedState;return[e,t]},useMutableSource:ou,useSyncExternalStore:au,useId:Su,unstable_isNewReconciler:!1},bc={readContext:Ze,useCallback:wu,useContext:Ze,useEffect:Hi,useImperativeHandle:xu,useInsertionEffect:hu,useLayoutEffect:vu,useMemo:ku,useReducer:Vi,useRef:mu,useState:function(){return Vi(cr)},useDebugValue:Bi,useDeferredValue:function(e){var t=Je();return me===null?t.memoizedState=e:Eu(t,me.memoizedState,e)},useTransition:function(){var e=Vi(cr)[0],t=Je().memoizedState;return[e,t]},useMutableSource:ou,useSyncExternalStore:au,useId:Su,unstable_isNewReconciler:!1};function at(e,t){if(e&&e.defaultProps){t=M({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Wi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:M({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var al={isMounted:function(e){return(e=e._reactInternals)?Gt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=je(),l=Wt(e),i=Ct(r,l);i.payload=t,n!=null&&(i.callback=n),t=Qt(e,i,l),t!==null&&(ct(t,e,l,r),br(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=je(),l=Wt(e),i=Ct(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Qt(e,i,l),t!==null&&(ct(t,e,l,r),br(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=je(),r=Wt(e),l=Ct(n,r);l.tag=2,t!=null&&(l.callback=t),t=Qt(e,l,r),t!==null&&(ct(t,e,r,n),br(t,e,r))}};function Lu(e,t,n,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!Jn(n,r)||!Jn(l,i):!0}function zu(e,t,n){var r=!1,l=At,i=t.contextType;return typeof i=="object"&&i!==null?i=Ze(i):(l=Pe(t)?Zt:Se.current,r=t.contextTypes,i=(r=r!=null)?wn(e,l):At),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=al,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function Tu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&al.enqueueReplaceState(t,t.state,null)}function Yi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Ii(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Ze(i):(i=Pe(t)?Zt:Se.current,l.context=wn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Wi(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&al.enqueueReplaceState(l,l.state,null),el(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function zn(e,t){try{var n="",r=t;do n+=F(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function $i(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ki(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ed=typeof WeakMap=="function"?WeakMap:Map;function ju(e,t,n){n=Ct(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ml||(ml=!0,uo=r),Ki(e,t)},n}function Iu(e,t,n){n=Ct(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){Ki(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ki(e,t),typeof r!="function"&&(Ht===null?Ht=new Set([this]):Ht.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Du(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ed;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=md.bind(null,e,t,n),t.then(e,e))}function _u(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ou(e,t,n,r,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ct(-1,1),t.tag=2,Qt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var td=fe.ReactCurrentOwner,Re=!1;function Te(e,t,n,r){t.child=e===null?eu(t,null,n,r):Nn(t,e.child,n,r)}function Pu(e,t,n,r,l){n=n.render;var i=t.ref;return Cn(t,l),r=Ui(e,t,n,r,i,l),n=Fi(),e!==null&&!Re?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Lt(e,t,l)):(te&&n&&ki(t),t.flags|=1,Te(e,t,r,l),t.child)}function Ru(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!ho(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Au(e,t,i,r,l)):(e=wl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&l)===0){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Jn,n(o,r)&&e.ref===t.ref)return Lt(e,t,l)}return t.flags|=1,e=$t(i,r),e.ref=t.ref,e.return=t,t.child=e}function Au(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(Jn(i,r)&&e.ref===t.ref)if(Re=!1,t.pendingProps=r=i,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Re=!0);else return t.lanes=e.lanes,Lt(e,t,l)}return Gi(e,t,n,r,l)}function Uu(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Z(jn,Ye),Ye|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Z(jn,Ye),Ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Z(jn,Ye),Ye|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Z(jn,Ye),Ye|=r;return Te(e,t,l,n),t.child}function Fu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Gi(e,t,n,r,l){var i=Pe(n)?Zt:Se.current;return i=wn(t,i),Cn(t,l),n=Ui(e,t,n,r,i,l),r=Fi(),e!==null&&!Re?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,Lt(e,t,l)):(te&&r&&ki(t),t.flags|=1,Te(e,t,n,l),t.child)}function Qu(e,t,n,r,l){if(Pe(n)){var i=!0;Yr(t)}else i=!1;if(Cn(t,l),t.stateNode===null)sl(e,t),zu(t,n,r),Yi(t,n,r,l),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var s=o.context,m=n.contextType;typeof m=="object"&&m!==null?m=Ze(m):(m=Pe(n)?Zt:Se.current,m=wn(t,m));var y=n.getDerivedStateFromProps,x=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function";x||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||s!==m)&&Tu(t,o,r,m),Ft=!1;var h=t.memoizedState;o.state=h,el(t,r,o,l),s=t.memoizedState,a!==r||h!==s||Oe.current||Ft?(typeof y=="function"&&(Wi(t,n,y,r),s=t.memoizedState),(a=Ft||Lu(t,n,a,r,h,s,m))?(x||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=m,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,nu(e,t),a=t.memoizedProps,m=t.type===t.elementType?a:at(t.type,a),o.props=m,x=t.pendingProps,h=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=Ze(s):(s=Pe(n)?Zt:Se.current,s=wn(t,s));var S=n.getDerivedStateFromProps;(y=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==x||h!==s)&&Tu(t,o,r,s),Ft=!1,h=t.memoizedState,o.state=h,el(t,r,o,l);var C=t.memoizedState;a!==x||h!==C||Oe.current||Ft?(typeof S=="function"&&(Wi(t,n,S,r),C=t.memoizedState),(m=Ft||Lu(t,n,m,r,h,C,s)||!1)?(y||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=C),o.props=r,o.state=C,o.context=s,r=m):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return Xi(e,t,n,r,i,l)}function Xi(e,t,n,r,l,i){Fu(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return l&&Ya(t,n,!1),Lt(e,t,i);r=t.stateNode,td.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Nn(t,e.child,null,i),t.child=Nn(t,null,a,i)):Te(e,t,a,i),t.memoizedState=r.state,l&&Ya(t,n,!0),t.child}function Vu(e){var t=e.stateNode;t.pendingContext?Ba(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ba(e,t.context,!1),Di(e,t.containerInfo)}function Hu(e,t,n,r,l){return Sn(),Mi(l),t.flags|=256,Te(e,t,n,r),t.child}var Zi={dehydrated:null,treeContext:null,retryLane:0};function Ji(e){return{baseLanes:e,cachePool:null,transitions:null}}function Bu(e,t,n){var r=t.pendingProps,l=ne.current,i=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),Z(ne,l&1),e===null)return Ni(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=o):i=kl(o,r,0,null),e=an(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ji(n),t.memoizedState=Zi,e):qi(t,o));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return nd(e,t,o,r,a,l,n);if(i){i=r.fallback,o=t.mode,l=e.child,a=l.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=$t(l,s),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?i=$t(a,i):(i=an(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Ji(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Zi,r}return i=e.child,e=i.sibling,r=$t(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function qi(e,t){return t=kl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ul(e,t,n,r){return r!==null&&Mi(r),Nn(t,e.child,null,n),e=qi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function nd(e,t,n,r,l,i,o){if(n)return t.flags&256?(t.flags&=-257,r=$i(Error(g(422))),ul(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=kl({mode:"visible",children:r.children},l,0,null),i=an(i,l,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&Nn(t,e.child,null,o),t.child.memoizedState=Ji(o),t.memoizedState=Zi,i);if((t.mode&1)===0)return ul(e,t,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(g(419)),r=$i(i,r,void 0),ul(e,t,o,r)}if(a=(o&e.childLanes)!==0,Re||a){if(r=ye,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(r.suspendedLanes|o))!==0?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,Mt(e,l),ct(r,e,l,-1))}return go(),r=$i(Error(g(421))),ul(e,t,o,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=gd.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,We=Pt(l.nextSibling),Be=t,te=!0,ot=null,e!==null&&(Ge[Xe++]=St,Ge[Xe++]=Nt,Ge[Xe++]=Jt,St=e.id,Nt=e.overflow,Jt=t),t=qi(t,r.children),t.flags|=4096,t)}function Wu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ti(e.return,t,n)}function bi(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function Yu(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(Te(e,t,r.children,n),r=ne.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Wu(e,n,t);else if(e.tag===19)Wu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Z(ne,r),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&tl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),bi(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&tl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}bi(t,!0,n,null,i);break;case"together":bi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function sl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),nn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(g(153));if(t.child!==null){for(e=t.child,n=$t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=$t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function rd(e,t,n){switch(t.tag){case 3:Vu(t),Sn();break;case 5:iu(t);break;case 1:Pe(t.type)&&Yr(t);break;case 4:Di(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;Z(Jr,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Z(ne,ne.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Bu(e,t,n):(Z(ne,ne.current&1),e=Lt(e,t,n),e!==null?e.sibling:null);Z(ne,ne.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Yu(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Z(ne,ne.current),r)break;return null;case 22:case 23:return t.lanes=0,Uu(e,t,n)}return Lt(e,t,n)}var $u,eo,Ku,Gu;$u=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},eo=function(){},Ku=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,en(ht.current);var i=null;switch(n){case"input":l=Tl(e,l),r=Tl(e,r),i=[];break;case"select":l=M({},l,{value:void 0}),r=M({},r,{value:void 0}),i=[];break;case"textarea":l=Dl(e,l),r=Dl(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Hr)}Ol(n,r);var o;n=null;for(m in l)if(!r.hasOwnProperty(m)&&l.hasOwnProperty(m)&&l[m]!=null)if(m==="style"){var a=l[m];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else m!=="dangerouslySetInnerHTML"&&m!=="children"&&m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(A.hasOwnProperty(m)?i||(i=[]):(i=i||[]).push(m,null));for(m in r){var s=r[m];if(a=l!=null?l[m]:void 0,r.hasOwnProperty(m)&&s!==a&&(s!=null||a!=null))if(m==="style")if(a){for(o in a)!a.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&a[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(i||(i=[]),i.push(m,n)),n=s;else m==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(i=i||[]).push(m,s)):m==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(m,""+s):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&(A.hasOwnProperty(m)?(s!=null&&m==="onScroll"&&q("scroll",e),i||a===s||(i=[])):(i=i||[]).push(m,s))}n&&(i=i||[]).push("style",n);var m=i;(t.updateQueue=m)&&(t.flags|=4)}},Gu=function(e,t,n,r){n!==r&&(t.flags|=4)};function fr(e,t){if(!te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ld(e,t,n){var r=t.pendingProps;switch(Ei(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return Pe(t.type)&&Wr(),Me(t),null;case 3:return r=t.stateNode,Ln(),b(Oe),b(Se),Pi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Xr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ot!==null&&(fo(ot),ot=null))),eo(e,t),Me(t),null;case 5:_i(t);var l=en(ar.current);if(n=t.type,e!==null&&t.stateNode!=null)Ku(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(g(166));return Me(t),null}if(e=en(ht.current),Xr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[gt]=t,r[nr]=i,e=(t.mode&1)!==0,n){case"dialog":q("cancel",r),q("close",r);break;case"iframe":case"object":case"embed":q("load",r);break;case"video":case"audio":for(l=0;l<bn.length;l++)q(bn[l],r);break;case"source":q("error",r);break;case"img":case"image":case"link":q("error",r),q("load",r);break;case"details":q("toggle",r);break;case"input":zo(r,i),q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},q("invalid",r);break;case"textarea":Io(r,i),q("invalid",r)}Ol(n,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Vr(r.textContent,a,e),l=["children",""+a]):A.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&q("scroll",r)}switch(n){case"input":yr(r),jo(r,i,!0);break;case"textarea":yr(r),_o(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Hr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Oo(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[gt]=t,e[nr]=r,$u(e,t,!1,!1),t.stateNode=e;e:{switch(o=Pl(n,r),n){case"dialog":q("cancel",e),q("close",e),l=r;break;case"iframe":case"object":case"embed":q("load",e),l=r;break;case"video":case"audio":for(l=0;l<bn.length;l++)q(bn[l],e);l=r;break;case"source":q("error",e),l=r;break;case"img":case"image":case"link":q("error",e),q("load",e),l=r;break;case"details":q("toggle",e),l=r;break;case"input":zo(e,r),l=Tl(e,r),q("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=M({},r,{value:void 0}),q("invalid",e);break;case"textarea":Io(e,r),l=Dl(e,r),q("invalid",e);break;default:l=r}Ol(n,l),a=l;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];i==="style"?Ao(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Po(e,s)):i==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&On(e,s):typeof s=="number"&&On(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(A.hasOwnProperty(i)?s!=null&&i==="onScroll"&&q("scroll",e):s!=null&&ze(e,i,s,o))}switch(n){case"input":yr(e),jo(e,r,!1);break;case"textarea":yr(e),_o(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Y(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?un(e,!!r.multiple,i,!1):r.defaultValue!=null&&un(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Hr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Me(t),null;case 6:if(e&&t.stateNode!=null)Gu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(g(166));if(n=en(ar.current),en(ht.current),Xr(t)){if(r=t.stateNode,n=t.memoizedProps,r[gt]=t,(i=r.nodeValue!==n)&&(e=Be,e!==null))switch(e.tag){case 3:Vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Vr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[gt]=t,t.stateNode=r}return Me(t),null;case 13:if(b(ne),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(te&&We!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Ja(),Sn(),t.flags|=98560,i=!1;else if(i=Xr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(g(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(g(317));i[gt]=t}else Sn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),i=!1}else ot!==null&&(fo(ot),ot=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ne.current&1)!==0?ge===0&&(ge=3):go())),t.updateQueue!==null&&(t.flags|=4),Me(t),null);case 4:return Ln(),eo(e,t),e===null&&er(t.stateNode.containerInfo),Me(t),null;case 10:return zi(t.type._context),Me(t),null;case 17:return Pe(t.type)&&Wr(),Me(t),null;case 19:if(b(ne),i=t.memoizedState,i===null)return Me(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)fr(i,!1);else{if(ge!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=tl(e),o!==null){for(t.flags|=128,fr(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Z(ne,ne.current&1|2),t.child}e=e.sibling}i.tail!==null&&se()>In&&(t.flags|=128,r=!0,fr(i,!1),t.lanes=4194304)}else{if(!r)if(e=tl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),fr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!te)return Me(t),null}else 2*se()-i.renderingStartTime>In&&n!==1073741824&&(t.flags|=128,r=!0,fr(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=se(),t.sibling=null,n=ne.current,Z(ne,r?n&1|2:n&1),t):(Me(t),null);case 22:case 23:return mo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Ye&1073741824)!==0&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),null;case 24:return null;case 25:return null}throw Error(g(156,t.tag))}function id(e,t){switch(Ei(t),t.tag){case 1:return Pe(t.type)&&Wr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ln(),b(Oe),b(Se),Pi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return _i(t),null;case 13:if(b(ne),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(g(340));Sn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return b(ne),null;case 4:return Ln(),null;case 10:return zi(t.type._context),null;case 22:case 23:return mo(),null;case 24:return null;default:return null}}var cl=!1,Ce=!1,od=typeof WeakSet=="function"?WeakSet:Set,N=null;function Tn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ae(e,t,r)}else n.current=null}function to(e,t,n){try{n()}catch(r){ae(e,t,r)}}var Xu=!1;function ad(e,t){if(pi=jr,e=La(),ii(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,s=-1,m=0,y=0,x=e,h=null;t:for(;;){for(var S;x!==n||l!==0&&x.nodeType!==3||(a=o+l),x!==i||r!==0&&x.nodeType!==3||(s=o+r),x.nodeType===3&&(o+=x.nodeValue.length),(S=x.firstChild)!==null;)h=x,x=S;for(;;){if(x===e)break t;if(h===n&&++m===l&&(a=o),h===i&&++y===r&&(s=o),(S=x.nextSibling)!==null)break;x=h,h=x.parentNode}x=S}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(mi={focusedElem:e,selectionRange:n},jr=!1,N=t;N!==null;)if(t=N,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,N=e;else for(;N!==null;){t=N;try{var C=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var L=C.memoizedProps,ce=C.memoizedState,f=t.stateNode,c=f.getSnapshotBeforeUpdate(t.elementType===t.type?L:at(t.type,L),ce);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(g(163))}}catch(w){ae(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,N=e;break}N=t.return}return C=Xu,Xu=!1,C}function pr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&to(t,n,i)}l=l.next}while(l!==r)}}function dl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function no(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Zu(e){var t=e.alternate;t!==null&&(e.alternate=null,Zu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[gt],delete t[nr],delete t[yi],delete t[Bc],delete t[Wc])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ju(e){return e.tag===5||e.tag===3||e.tag===4}function qu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ju(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ro(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Hr));else if(r!==4&&(e=e.child,e!==null))for(ro(e,t,n),e=e.sibling;e!==null;)ro(e,t,n),e=e.sibling}function lo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(lo(e,t,n),e=e.sibling;e!==null;)lo(e,t,n),e=e.sibling}var ke=null,ut=!1;function Vt(e,t,n){for(n=n.child;n!==null;)bu(e,t,n),n=n.sibling}function bu(e,t,n){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Nr,n)}catch{}switch(n.tag){case 5:Ce||Tn(n,t);case 6:var r=ke,l=ut;ke=null,Vt(e,t,n),ke=r,ut=l,ke!==null&&(ut?(e=ke,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ke.removeChild(n.stateNode));break;case 18:ke!==null&&(ut?(e=ke,n=n.stateNode,e.nodeType===8?vi(e.parentNode,n):e.nodeType===1&&vi(e,n),Yn(e)):vi(ke,n.stateNode));break;case 4:r=ke,l=ut,ke=n.stateNode.containerInfo,ut=!0,Vt(e,t,n),ke=r,ut=l;break;case 0:case 11:case 14:case 15:if(!Ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&((i&2)!==0||(i&4)!==0)&&to(n,t,o),l=l.next}while(l!==r)}Vt(e,t,n);break;case 1:if(!Ce&&(Tn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){ae(n,t,a)}Vt(e,t,n);break;case 21:Vt(e,t,n);break;case 22:n.mode&1?(Ce=(r=Ce)||n.memoizedState!==null,Vt(e,t,n),Ce=r):Vt(e,t,n);break;default:Vt(e,t,n)}}function es(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new od),t.forEach(function(r){var l=hd.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function st(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:ke=a.stateNode,ut=!1;break e;case 3:ke=a.stateNode.containerInfo,ut=!0;break e;case 4:ke=a.stateNode.containerInfo,ut=!0;break e}a=a.return}if(ke===null)throw Error(g(160));bu(i,o,l),ke=null,ut=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(m){ae(l,t,m)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)ts(t,e),t=t.sibling}function ts(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(st(t,e),yt(e),r&4){try{pr(3,e,e.return),dl(3,e)}catch(L){ae(e,e.return,L)}try{pr(5,e,e.return)}catch(L){ae(e,e.return,L)}}break;case 1:st(t,e),yt(e),r&512&&n!==null&&Tn(n,n.return);break;case 5:if(st(t,e),yt(e),r&512&&n!==null&&Tn(n,n.return),e.flags&32){var l=e.stateNode;try{On(l,"")}catch(L){ae(e,e.return,L)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&To(l,i),Pl(a,o);var m=Pl(a,i);for(o=0;o<s.length;o+=2){var y=s[o],x=s[o+1];y==="style"?Ao(l,x):y==="dangerouslySetInnerHTML"?Po(l,x):y==="children"?On(l,x):ze(l,y,x,m)}switch(a){case"input":jl(l,i);break;case"textarea":Do(l,i);break;case"select":var h=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var S=i.value;S!=null?un(l,!!i.multiple,S,!1):h!==!!i.multiple&&(i.defaultValue!=null?un(l,!!i.multiple,i.defaultValue,!0):un(l,!!i.multiple,i.multiple?[]:"",!1))}l[nr]=i}catch(L){ae(e,e.return,L)}}break;case 6:if(st(t,e),yt(e),r&4){if(e.stateNode===null)throw Error(g(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(L){ae(e,e.return,L)}}break;case 3:if(st(t,e),yt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Yn(t.containerInfo)}catch(L){ae(e,e.return,L)}break;case 4:st(t,e),yt(e);break;case 13:st(t,e),yt(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(ao=se())),r&4&&es(e);break;case 22:if(y=n!==null&&n.memoizedState!==null,e.mode&1?(Ce=(m=Ce)||y,st(t,e),Ce=m):st(t,e),yt(e),r&8192){if(m=e.memoizedState!==null,(e.stateNode.isHidden=m)&&!y&&(e.mode&1)!==0)for(N=e,y=e.child;y!==null;){for(x=N=y;N!==null;){switch(h=N,S=h.child,h.tag){case 0:case 11:case 14:case 15:pr(4,h,h.return);break;case 1:Tn(h,h.return);var C=h.stateNode;if(typeof C.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,C.props=t.memoizedProps,C.state=t.memoizedState,C.componentWillUnmount()}catch(L){ae(r,n,L)}}break;case 5:Tn(h,h.return);break;case 22:if(h.memoizedState!==null){ls(x);continue}}S!==null?(S.return=h,N=S):ls(x)}y=y.sibling}e:for(y=null,x=e;;){if(x.tag===5){if(y===null){y=x;try{l=x.stateNode,m?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=x.stateNode,s=x.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=Ro("display",o))}catch(L){ae(e,e.return,L)}}}else if(x.tag===6){if(y===null)try{x.stateNode.nodeValue=m?"":x.memoizedProps}catch(L){ae(e,e.return,L)}}else if((x.tag!==22&&x.tag!==23||x.memoizedState===null||x===e)&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===e)break e;for(;x.sibling===null;){if(x.return===null||x.return===e)break e;y===x&&(y=null),x=x.return}y===x&&(y=null),x.sibling.return=x.return,x=x.sibling}}break;case 19:st(t,e),yt(e),r&4&&es(e);break;case 21:break;default:st(t,e),yt(e)}}function yt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ju(n)){var r=n;break e}n=n.return}throw Error(g(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(On(l,""),r.flags&=-33);var i=qu(e);lo(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,a=qu(e);ro(e,a,o);break;default:throw Error(g(161))}}catch(s){ae(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ud(e,t,n){N=e,ns(e)}function ns(e,t,n){for(var r=(e.mode&1)!==0;N!==null;){var l=N,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||cl;if(!o){var a=l.alternate,s=a!==null&&a.memoizedState!==null||Ce;a=cl;var m=Ce;if(cl=o,(Ce=s)&&!m)for(N=l;N!==null;)o=N,s=o.child,o.tag===22&&o.memoizedState!==null?is(l):s!==null?(s.return=o,N=s):is(l);for(;i!==null;)N=i,ns(i),i=i.sibling;N=l,cl=a,Ce=m}rs(e)}else(l.subtreeFlags&8772)!==0&&i!==null?(i.return=l,N=i):rs(e)}}function rs(e){for(;N!==null;){var t=N;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ce||dl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ce)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:at(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&lu(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}lu(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var m=t.alternate;if(m!==null){var y=m.memoizedState;if(y!==null){var x=y.dehydrated;x!==null&&Yn(x)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(g(163))}Ce||t.flags&512&&no(t)}catch(h){ae(t,t.return,h)}}if(t===e){N=null;break}if(n=t.sibling,n!==null){n.return=t.return,N=n;break}N=t.return}}function ls(e){for(;N!==null;){var t=N;if(t===e){N=null;break}var n=t.sibling;if(n!==null){n.return=t.return,N=n;break}N=t.return}}function is(e){for(;N!==null;){var t=N;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{dl(4,t)}catch(s){ae(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(s){ae(t,l,s)}}var i=t.return;try{no(t)}catch(s){ae(t,i,s)}break;case 5:var o=t.return;try{no(t)}catch(s){ae(t,o,s)}}}catch(s){ae(t,t.return,s)}if(t===e){N=null;break}var a=t.sibling;if(a!==null){a.return=t.return,N=a;break}N=t.return}}var sd=Math.ceil,fl=fe.ReactCurrentDispatcher,io=fe.ReactCurrentOwner,qe=fe.ReactCurrentBatchConfig,U=0,ye=null,pe=null,Ee=0,Ye=0,jn=Rt(0),ge=0,mr=null,nn=0,pl=0,oo=0,gr=null,Ae=null,ao=0,In=1/0,zt=null,ml=!1,uo=null,Ht=null,gl=!1,Bt=null,hl=0,hr=0,so=null,vl=-1,yl=0;function je(){return(U&6)!==0?se():vl!==-1?vl:vl=se()}function Wt(e){return(e.mode&1)===0?1:(U&2)!==0&&Ee!==0?Ee&-Ee:$c.transition!==null?(yl===0&&(yl=qo()),yl):(e=$,e!==0||(e=window.event,e=e===void 0?16:aa(e.type)),e)}function ct(e,t,n,r){if(50<hr)throw hr=0,so=null,Error(g(185));Qn(e,n,r),((U&2)===0||e!==ye)&&(e===ye&&((U&2)===0&&(pl|=n),ge===4&&Yt(e,Ee)),Ue(e,r),n===1&&U===0&&(t.mode&1)===0&&(In=se()+500,$r&&Ut()))}function Ue(e,t){var n=e.callbackNode;$s(e,t);var r=Lr(e,e===ye?Ee:0);if(r===0)n!==null&&Xo(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Xo(n),t===1)e.tag===0?Yc(as.bind(null,e)):$a(as.bind(null,e)),Vc(function(){(U&6)===0&&Ut()}),n=null;else{switch(bo(r)){case 1:n=Hl;break;case 4:n=Zo;break;case 16:n=Sr;break;case 536870912:n=Jo;break;default:n=Sr}n=gs(n,os.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function os(e,t){if(vl=-1,yl=0,(U&6)!==0)throw Error(g(327));var n=e.callbackNode;if(Dn()&&e.callbackNode!==n)return null;var r=Lr(e,e===ye?Ee:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=xl(e,r);else{t=r;var l=U;U|=2;var i=ss();(ye!==e||Ee!==t)&&(zt=null,In=se()+500,ln(e,t));do try{fd();break}catch(a){us(e,a)}while(!0);Li(),fl.current=i,U=l,pe!==null?t=0:(ye=null,Ee=0,t=ge)}if(t!==0){if(t===2&&(l=Bl(e),l!==0&&(r=l,t=co(e,l))),t===1)throw n=mr,ln(e,0),Yt(e,r),Ue(e,se()),n;if(t===6)Yt(e,r);else{if(l=e.current.alternate,(r&30)===0&&!cd(l)&&(t=xl(e,r),t===2&&(i=Bl(e),i!==0&&(r=i,t=co(e,i))),t===1))throw n=mr,ln(e,0),Yt(e,r),Ue(e,se()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(g(345));case 2:on(e,Ae,zt);break;case 3:if(Yt(e,r),(r&130023424)===r&&(t=ao+500-se(),10<t)){if(Lr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){je(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=hi(on.bind(null,e,Ae,zt),t);break}on(e,Ae,zt);break;case 4:if(Yt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var o=31-lt(r);i=1<<o,o=t[o],o>l&&(l=o),r&=~i}if(r=l,r=se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*sd(r/1960))-r,10<r){e.timeoutHandle=hi(on.bind(null,e,Ae,zt),r);break}on(e,Ae,zt);break;case 5:on(e,Ae,zt);break;default:throw Error(g(329))}}}return Ue(e,se()),e.callbackNode===n?os.bind(null,e):null}function co(e,t){var n=gr;return e.current.memoizedState.isDehydrated&&(ln(e,t).flags|=256),e=xl(e,t),e!==2&&(t=Ae,Ae=n,t!==null&&fo(t)),e}function fo(e){Ae===null?Ae=e:Ae.push.apply(Ae,e)}function cd(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!it(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Yt(e,t){for(t&=~oo,t&=~pl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-lt(t),r=1<<n;e[n]=-1,t&=~r}}function as(e){if((U&6)!==0)throw Error(g(327));Dn();var t=Lr(e,0);if((t&1)===0)return Ue(e,se()),null;var n=xl(e,t);if(e.tag!==0&&n===2){var r=Bl(e);r!==0&&(t=r,n=co(e,r))}if(n===1)throw n=mr,ln(e,0),Yt(e,t),Ue(e,se()),n;if(n===6)throw Error(g(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,on(e,Ae,zt),Ue(e,se()),null}function po(e,t){var n=U;U|=1;try{return e(t)}finally{U=n,U===0&&(In=se()+500,$r&&Ut())}}function rn(e){Bt!==null&&Bt.tag===0&&(U&6)===0&&Dn();var t=U;U|=1;var n=qe.transition,r=$;try{if(qe.transition=null,$=1,e)return e()}finally{$=r,qe.transition=n,U=t,(U&6)===0&&Ut()}}function mo(){Ye=jn.current,b(jn)}function ln(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Qc(n)),pe!==null)for(n=pe.return;n!==null;){var r=n;switch(Ei(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Wr();break;case 3:Ln(),b(Oe),b(Se),Pi();break;case 5:_i(r);break;case 4:Ln();break;case 13:b(ne);break;case 19:b(ne);break;case 10:zi(r.type._context);break;case 22:case 23:mo()}n=n.return}if(ye=e,pe=e=$t(e.current,null),Ee=Ye=t,ge=0,mr=null,oo=pl=nn=0,Ae=gr=null,bt!==null){for(t=0;t<bt.length;t++)if(n=bt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}n.pending=r}bt=null}return e}function us(e,t){do{var n=pe;try{if(Li(),nl.current=ol,rl){for(var r=re.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}rl=!1}if(tn=0,ve=me=re=null,ur=!1,sr=0,io.current=null,n===null||n.return===null){ge=1,mr=t,pe=null;break}e:{var i=e,o=n.return,a=n,s=t;if(t=Ee,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var m=s,y=a,x=y.tag;if((y.mode&1)===0&&(x===0||x===11||x===15)){var h=y.alternate;h?(y.updateQueue=h.updateQueue,y.memoizedState=h.memoizedState,y.lanes=h.lanes):(y.updateQueue=null,y.memoizedState=null)}var S=_u(o);if(S!==null){S.flags&=-257,Ou(S,o,a,i,t),S.mode&1&&Du(i,m,t),t=S,s=m;var C=t.updateQueue;if(C===null){var L=new Set;L.add(s),t.updateQueue=L}else C.add(s);break e}else{if((t&1)===0){Du(i,m,t),go();break e}s=Error(g(426))}}else if(te&&a.mode&1){var ce=_u(o);if(ce!==null){(ce.flags&65536)===0&&(ce.flags|=256),Ou(ce,o,a,i,t),Mi(zn(s,a));break e}}i=s=zn(s,a),ge!==4&&(ge=2),gr===null?gr=[i]:gr.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var f=ju(i,s,t);ru(i,f);break e;case 1:a=s;var c=i.type,p=i.stateNode;if((i.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Ht===null||!Ht.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=Iu(i,a,t);ru(i,w);break e}}i=i.return}while(i!==null)}ds(n)}catch(z){t=z,pe===n&&n!==null&&(pe=n=n.return);continue}break}while(!0)}function ss(){var e=fl.current;return fl.current=ol,e===null?ol:e}function go(){(ge===0||ge===3||ge===2)&&(ge=4),ye===null||(nn&268435455)===0&&(pl&268435455)===0||Yt(ye,Ee)}function xl(e,t){var n=U;U|=2;var r=ss();(ye!==e||Ee!==t)&&(zt=null,ln(e,t));do try{dd();break}catch(l){us(e,l)}while(!0);if(Li(),U=n,fl.current=r,pe!==null)throw Error(g(261));return ye=null,Ee=0,ge}function dd(){for(;pe!==null;)cs(pe)}function fd(){for(;pe!==null&&!As();)cs(pe)}function cs(e){var t=ms(e.alternate,e,Ye);e.memoizedProps=e.pendingProps,t===null?ds(e):pe=t,io.current=null}function ds(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=ld(n,t,Ye),n!==null){pe=n;return}}else{if(n=id(n,t),n!==null){n.flags&=32767,pe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ge=6,pe=null;return}}if(t=t.sibling,t!==null){pe=t;return}pe=t=e}while(t!==null);ge===0&&(ge=5)}function on(e,t,n){var r=$,l=qe.transition;try{qe.transition=null,$=1,pd(e,t,n,r)}finally{qe.transition=l,$=r}return null}function pd(e,t,n,r){do Dn();while(Bt!==null);if((U&6)!==0)throw Error(g(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(g(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Ks(e,i),e===ye&&(pe=ye=null,Ee=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||gl||(gl=!0,gs(Sr,function(){return Dn(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=qe.transition,qe.transition=null;var o=$;$=1;var a=U;U|=4,io.current=null,ad(e,n),ts(n,e),_c(mi),jr=!!pi,mi=pi=null,e.current=n,ud(n),Us(),U=a,$=o,qe.transition=i}else e.current=n;if(gl&&(gl=!1,Bt=e,hl=l),i=e.pendingLanes,i===0&&(Ht=null),Vs(n.stateNode),Ue(e,se()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(ml)throw ml=!1,e=uo,uo=null,e;return(hl&1)!==0&&e.tag!==0&&Dn(),i=e.pendingLanes,(i&1)!==0?e===so?hr++:(hr=0,so=e):hr=0,Ut(),null}function Dn(){if(Bt!==null){var e=bo(hl),t=qe.transition,n=$;try{if(qe.transition=null,$=16>e?16:e,Bt===null)var r=!1;else{if(e=Bt,Bt=null,hl=0,(U&6)!==0)throw Error(g(331));var l=U;for(U|=4,N=e.current;N!==null;){var i=N,o=i.child;if((N.flags&16)!==0){var a=i.deletions;if(a!==null){for(var s=0;s<a.length;s++){var m=a[s];for(N=m;N!==null;){var y=N;switch(y.tag){case 0:case 11:case 15:pr(8,y,i)}var x=y.child;if(x!==null)x.return=y,N=x;else for(;N!==null;){y=N;var h=y.sibling,S=y.return;if(Zu(y),y===m){N=null;break}if(h!==null){h.return=S,N=h;break}N=S}}}var C=i.alternate;if(C!==null){var L=C.child;if(L!==null){C.child=null;do{var ce=L.sibling;L.sibling=null,L=ce}while(L!==null)}}N=i}}if((i.subtreeFlags&2064)!==0&&o!==null)o.return=i,N=o;else e:for(;N!==null;){if(i=N,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:pr(9,i,i.return)}var f=i.sibling;if(f!==null){f.return=i.return,N=f;break e}N=i.return}}var c=e.current;for(N=c;N!==null;){o=N;var p=o.child;if((o.subtreeFlags&2064)!==0&&p!==null)p.return=o,N=p;else e:for(o=c;N!==null;){if(a=N,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:dl(9,a)}}catch(z){ae(a,a.return,z)}if(a===o){N=null;break e}var w=a.sibling;if(w!==null){w.return=a.return,N=w;break e}N=a.return}}if(U=l,Ut(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Nr,e)}catch{}r=!0}return r}finally{$=n,qe.transition=t}}return!1}function fs(e,t,n){t=zn(n,t),t=ju(e,t,1),e=Qt(e,t,1),t=je(),e!==null&&(Qn(e,1,t),Ue(e,t))}function ae(e,t,n){if(e.tag===3)fs(e,e,n);else for(;t!==null;){if(t.tag===3){fs(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ht===null||!Ht.has(r))){e=zn(n,e),e=Iu(t,e,1),t=Qt(t,e,1),e=je(),t!==null&&(Qn(t,1,e),Ue(t,e));break}}t=t.return}}function md(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=je(),e.pingedLanes|=e.suspendedLanes&n,ye===e&&(Ee&n)===n&&(ge===4||ge===3&&(Ee&130023424)===Ee&&500>se()-ao?ln(e,0):oo|=n),Ue(e,t)}function ps(e,t){t===0&&((e.mode&1)===0?t=1:(t=Cr,Cr<<=1,(Cr&130023424)===0&&(Cr=4194304)));var n=je();e=Mt(e,t),e!==null&&(Qn(e,t,n),Ue(e,n))}function gd(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ps(e,n)}function hd(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(g(314))}r!==null&&r.delete(t),ps(e,n)}var ms;ms=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Oe.current)Re=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Re=!1,rd(e,t,n);Re=(e.flags&131072)!==0}else Re=!1,te&&(t.flags&1048576)!==0&&Ka(t,Gr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;sl(e,t),e=t.pendingProps;var l=wn(t,Se.current);Cn(t,n),l=Ui(null,t,r,e,l,n);var i=Fi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Pe(r)?(i=!0,Yr(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ii(t),l.updater=al,t.stateNode=l,l._reactInternals=t,Yi(t,r,e,n),t=Xi(null,t,r,!0,i,n)):(t.tag=0,te&&i&&ki(t),Te(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(sl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=yd(r),e=at(r,e),l){case 0:t=Gi(null,t,r,e,n);break e;case 1:t=Qu(null,t,r,e,n);break e;case 11:t=Pu(null,t,r,e,n);break e;case 14:t=Ru(null,t,r,at(r.type,e),n);break e}throw Error(g(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),Gi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),Qu(e,t,r,l,n);case 3:e:{if(Vu(t),e===null)throw Error(g(387));r=t.pendingProps,i=t.memoizedState,l=i.element,nu(e,t),el(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=zn(Error(g(423)),t),t=Hu(e,t,r,n,l);break e}else if(r!==l){l=zn(Error(g(424)),t),t=Hu(e,t,r,n,l);break e}else for(We=Pt(t.stateNode.containerInfo.firstChild),Be=t,te=!0,ot=null,n=eu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Sn(),r===l){t=Lt(e,t,n);break e}Te(e,t,r,n)}t=t.child}return t;case 5:return iu(t),e===null&&Ni(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,gi(r,l)?o=null:i!==null&&gi(r,i)&&(t.flags|=32),Fu(e,t),Te(e,t,o,n),t.child;case 6:return e===null&&Ni(t),null;case 13:return Bu(e,t,n);case 4:return Di(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Nn(t,null,r,n):Te(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),Pu(e,t,r,l,n);case 7:return Te(e,t,t.pendingProps,n),t.child;case 8:return Te(e,t,t.pendingProps.children,n),t.child;case 12:return Te(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,o=l.value,Z(Jr,r._currentValue),r._currentValue=o,i!==null)if(it(i.value,o)){if(i.children===l.children&&!Oe.current){t=Lt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=Ct(-1,n&-n),s.tag=2;var m=i.updateQueue;if(m!==null){m=m.shared;var y=m.pending;y===null?s.next=s:(s.next=y.next,y.next=s),m.pending=s}}i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Ti(i.return,n,t),a.lanes|=n;break}s=s.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(g(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Ti(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Te(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,Cn(t,n),l=Ze(l),r=r(l),t.flags|=1,Te(e,t,r,n),t.child;case 14:return r=t.type,l=at(r,t.pendingProps),l=at(r.type,l),Ru(e,t,r,l,n);case 15:return Au(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:at(r,l),sl(e,t),t.tag=1,Pe(r)?(e=!0,Yr(t)):e=!1,Cn(t,n),zu(t,r,l),Yi(t,r,l,n),Xi(null,t,r,!0,e,n);case 19:return Yu(e,t,n);case 22:return Uu(e,t,n)}throw Error(g(156,t.tag))};function gs(e,t){return Go(e,t)}function vd(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function be(e,t,n,r){return new vd(e,t,n,r)}function ho(e){return e=e.prototype,!(!e||!e.isReactComponent)}function yd(e){if(typeof e=="function")return ho(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ft)return 11;if(e===pt)return 14}return 2}function $t(e,t){var n=e.alternate;return n===null?(n=be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function wl(e,t,n,r,l,i){var o=2;if(r=e,typeof e=="function")ho(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case le:return an(n.children,l,i,t);case De:o=8,l|=8;break;case ie:return e=be(12,n,t,l|2),e.elementType=ie,e.lanes=i,e;case Qe:return e=be(13,n,t,l),e.elementType=Qe,e.lanes=i,e;case rt:return e=be(19,n,t,l),e.elementType=rt,e.lanes=i,e;case oe:return kl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ke:o=10;break e;case wt:o=9;break e;case ft:o=11;break e;case pt:o=14;break e;case _e:o=16,r=null;break e}throw Error(g(130,e==null?e:typeof e,""))}return t=be(o,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function an(e,t,n,r){return e=be(7,e,r,t),e.lanes=n,e}function kl(e,t,n,r){return e=be(22,e,r,t),e.elementType=oe,e.lanes=n,e.stateNode={isHidden:!1},e}function vo(e,t,n){return e=be(6,e,null,t),e.lanes=n,e}function yo(e,t,n){return t=be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function xd(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Wl(0),this.expirationTimes=Wl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function xo(e,t,n,r,l,i,o,a,s){return e=new xd(e,t,n,a,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=be(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ii(i),e}function wd(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:we,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function hs(e){if(!e)return At;e=e._reactInternals;e:{if(Gt(e)!==e||e.tag!==1)throw Error(g(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Pe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(g(171))}if(e.tag===1){var n=e.type;if(Pe(n))return Wa(e,n,t)}return t}function vs(e,t,n,r,l,i,o,a,s){return e=xo(n,r,!0,e,l,i,o,a,s),e.context=hs(null),n=e.current,r=je(),l=Wt(n),i=Ct(r,l),i.callback=t??null,Qt(n,i,l),e.current.lanes=l,Qn(e,l,r),Ue(e,r),e}function El(e,t,n,r){var l=t.current,i=je(),o=Wt(l);return n=hs(n),t.context===null?t.context=n:t.pendingContext=n,t=Ct(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Qt(l,t,o),e!==null&&(ct(e,l,o,i),br(e,l,o)),o}function Sl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ys(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function wo(e,t){ys(e,t),(e=e.alternate)&&ys(e,t)}function kd(){return null}var xs=typeof reportError=="function"?reportError:function(e){console.error(e)};function ko(e){this._internalRoot=e}Nl.prototype.render=ko.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(g(409));El(e,t,null,null)},Nl.prototype.unmount=ko.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;rn(function(){El(null,e,null,null)}),t[kt]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=na();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Dt.length&&t!==0&&t<Dt[n].priority;n++);Dt.splice(n,0,e),n===0&&ia(e)}};function Eo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ml(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ws(){}function Ed(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var m=Sl(o);i.call(m)}}var o=vs(t,r,e,0,null,!1,!1,"",ws);return e._reactRootContainer=o,e[kt]=o.current,er(e.nodeType===8?e.parentNode:e),rn(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var m=Sl(s);a.call(m)}}var s=xo(e,0,!1,null,null,!1,!1,"",ws);return e._reactRootContainer=s,e[kt]=s.current,er(e.nodeType===8?e.parentNode:e),rn(function(){El(t,s,n,r)}),s}function Cl(e,t,n,r,l){var i=n._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var a=l;l=function(){var s=Sl(o);a.call(s)}}El(t,o,e,l)}else o=Ed(n,t,e,l,r);return Sl(o)}ea=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Fn(t.pendingLanes);n!==0&&(Yl(t,n|1),Ue(t,se()),(U&6)===0&&(In=se()+500,Ut()))}break;case 13:rn(function(){var r=Mt(e,1);if(r!==null){var l=je();ct(r,e,1,l)}}),wo(e,1)}},$l=function(e){if(e.tag===13){var t=Mt(e,134217728);if(t!==null){var n=je();ct(t,e,134217728,n)}wo(e,134217728)}},ta=function(e){if(e.tag===13){var t=Wt(e),n=Mt(e,t);if(n!==null){var r=je();ct(n,e,t,r)}wo(e,t)}},na=function(){return $},ra=function(e,t){var n=$;try{return $=e,t()}finally{$=n}},Ul=function(e,t,n){switch(t){case"input":if(jl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Br(r);if(!l)throw Error(g(90));Lo(r),jl(r,l)}}}break;case"textarea":Do(e,n);break;case"select":t=n.value,t!=null&&un(e,!!n.multiple,t,!1)}},Vo=po,Ho=rn;var Sd={usingClientEntryPoint:!1,Events:[rr,yn,Br,Fo,Qo,po]},vr={findFiberByHostInstance:Xt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Nd={bundleType:vr.bundleType,version:vr.version,rendererPackageName:vr.rendererPackageName,rendererConfig:vr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=$o(e),e===null?null:e.stateNode},findFiberByHostInstance:vr.findFiberByHostInstance||kd,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ll=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ll.isDisabled&&Ll.supportsFiber)try{Nr=Ll.inject(Nd),mt=Ll}catch{}}return Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sd,Fe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eo(t))throw Error(g(200));return wd(e,t,null,n)},Fe.createRoot=function(e,t){if(!Eo(e))throw Error(g(299));var n=!1,r="",l=xs;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=xo(e,1,!1,null,null,n,!1,r,l),e[kt]=t.current,er(e.nodeType===8?e.parentNode:e),new ko(t)},Fe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(g(188)):(e=Object.keys(e).join(","),Error(g(268,e)));return e=$o(t),e=e===null?null:e.stateNode,e},Fe.flushSync=function(e){return rn(e)},Fe.hydrate=function(e,t,n){if(!Ml(t))throw Error(g(200));return Cl(null,e,t,!0,n)},Fe.hydrateRoot=function(e,t,n){if(!Eo(e))throw Error(g(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",o=xs;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=vs(t,null,e,1,n??null,l,!1,i,o),e[kt]=t.current,er(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Nl(t)},Fe.render=function(e,t,n){if(!Ml(t))throw Error(g(200));return Cl(null,e,t,!1,n)},Fe.unmountComponentAtNode=function(e){if(!Ml(e))throw Error(g(40));return e._reactRootContainer?(rn(function(){Cl(null,null,e,!1,function(){e._reactRootContainer=null,e[kt]=null})}),!0):!1},Fe.unstable_batchedUpdates=po,Fe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ml(n))throw Error(g(200));if(e==null||e._reactInternals===void 0)throw Error(g(38));return Cl(e,t,n,!1,r)},Fe.version="18.3.1-next-f1338f8080-20240426",Fe}var Cs;function Id(){if(Cs)return No.exports;Cs=1;function k(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(k)}catch(T){console.error(T)}}return k(),No.exports=jd(),No.exports}var Ls;function Dd(){if(Ls)return zl;Ls=1;var k=Id();return zl.createRoot=k.createRoot,zl.hydrateRoot=k.hydrateRoot,zl}var _d=Dd();const Od="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI5NTAiIGhlaWdodD0iOTU5LjU1NCIgdmlld0JveD0iMCAwIDI1MS4zNTQgMjUzLjg4MiI+PHBhdGggZD0iTTEzNy41NjcgMEM5MSAwIDU5LjEzOSAxNC45MzYgMzQuNDI2IDQwLjQ2NyAxMy45MTQgNjEuNjU2IDAgOTMuOTY4IDAgMTI2Ljk0MWMwIDMyLjk3MyAxMy45MTQgNjUuMjg1IDM0LjQyNiA4Ni40NzUgMjQuNzEzIDI1LjUzMSA1Ni41NzUgNDAuNDY2IDEwMy4xNCA0MC40NjZoMTEzLjc4OHYtOTQuMDQzSDE1Mi4yYy0xMi4yOTEgMC0yNi4wMDctLjE2NS0zNS42Ny03LjE0LTcuMDUyLTUuMDktMTMuNDQ0LTE0LjE0My0xMy40NDQtMjUuNzU4IDAtMTEuNjE0IDYuMzkyLTIwLjY2NyAxMy40NDQtMjUuNzU4IDkuNjYzLTYuOTc1IDIzLjM3OS03LjEzOSAzNS42Ny03LjEzOWg5OS4xNTRWLjAwMXoiIHBhaW50LW9yZGVyPSJzdHJva2UgZmlsbCBtYXJrZXJzIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI2OC4xMTQgODkuMmgtMTQuOTUxYy01LjMxOCAxLjg0Ni03LjU2NyA1LjQzOS04LjM4NiA4LjY5NC0uNzY4IDMuMDU0LjI5NCA1LjU0MiAxLjA5OSA2LjgwMiAxLjEzOSAxLjc4NCAyLjcyOCAzLjQyMiA0Ljc3MiAzLjg3MyA0Ljc5IDEuMDU4IDkuMDc2LTIuMzU2IDEyLjkyOC0zLjk3IDEuODk5LS43OTUgMy42OS0uODQgNC41NjcuNTM1LjkwNCAxLjQxNi41NjYgMy41NzMtMS41NTggNC45MjgtMi4zNDUgMS40OTctNC45NTUgMS4xLTYuMDc4LS40NzdsLTguNTQgNS40NTJjNC40MDMgNS45NjQgMTEuNjIyIDQuMDU1IDE3LjM0My40MDMgMy45LTIuNDg4IDYuNDc0LTUuMjkzIDcuNzUzLTguNCAxLjExLTIuNjk1IDEuMTctNS43My0uNzM4LTguNzItMS45MDYtMi45ODUtNC4yODUtMy41ODYtNi45ODItMy40NjYtNC43NDEuMjExLTcuMjk0IDIuNDMtMTAuNzIgNC4wNzgtMS44NTUuODkyLTQuMzEzIDEuMTc0LTUuMjYzLS4zMTUtLjUwNi0uNzkyLS44NjItMi45NDcgMS44MTQtNC42NTUgMi45MDMtMS44NTMgNS4wMi4yOTQgNS4wMi4yOTR6bS0zOS43ODkgMTUuNDUyYy0zLjQ5MyAyLjIzLTQuNiA1LjcwMi00Ljc2MiA5bC0yLjI3LTMuNDE1LTguOTY2IDUuNzIyIDE1Ljg1MyAyNC44MzcgOS4zNC01Ljk2My04LjA0Ny0xMi42MDdjLTIuMTE2LTMuMzE1LTIuOTM5LTYuMDU0LjItNy45MzMgMy4xNDEtMS44ODEgNS4xODIgMS4yMjQgNi42NjYgMy41NWw4LjA0NyAxMi42MDcgOS4yMi01Ljg4NC05LjA2OC0xNC42MTljLTEuMjkxLTIuMDgyLTIuNTUtMy43NjctMy43MjMtNC44NzktMy43NzUtMy41OC04Ljk0Ni0yLjY3OC0xMi40OS0uNDE2em0tMjYuNTg0IDIuMzQ0LTkuMjIgNS44ODQgNC42NjYgNy4zMDggOS4yMTgtNS44ODR6bTcuMTUxIDExLjIwMy05LjIyIDUuODg0IDE1Ljc1IDI0LjY3NCA5LjIxOC01Ljg4NXptLTE2LjAwNSAxMS40N2MtMi4zOTQtLjA3LTQuNjcyLjczLTYuMzg5IDEuOTEzLTMuOTE2IDIuNS00LjU3NyA1LjczNy01LjA5NSA4LjkwNi0zLjA3My0xLjMyLTYuMjQxLTEuNjctOS43OTMuNTk2LTMuMzcgMi4xNTItNC4xNzMgNS4xLTQuNzg4IDguOTlsLTIuMjc4LTMuNTY4LTguODg3IDUuNjczIDE1LjgzMSAyNC44MDEgOS4yMi01Ljg4NC05LjkwMy0xNS41MjhjLS45NzktMS41MzYtLjUyMi0zLjcyNyAxLjEyOC00Ljc4IDIuNzY1LTEuNzY1IDQuMzc1LjI0MyA0Ljg0MS45NzNsOS45MDggMTUuNTIyIDkuNTE5LTYuMDc2LTkuMTEtMTQuMjcyYy0uNjUyLTEuMDIxLTIuMjcyLTQuMjA1LjQ5LTUuOTY4IDIuMjg1LTEuNDU5IDMuOTYyLS4yOSA1LjEgMS40OTNsOS41MiAxNC45MTcgOS41Ni02LjEwMi0xMC4wMDMtMTUuOTZjLTIuNTE5LTQuMDItNS43OTEtNS41NTQtOC44Ny01LjY0NXptLTQ0LjM2NyAyOC4zMmMtMi4zOTUtLjA3MS00LjY3My43My02LjM5IDEuOTEyLTMuOTE2IDIuNS00LjU3NiA1LjczOS01LjA5NCA4LjkwOC0zLjA3My0xLjMyLTYuMjQxLTEuNjcyLTkuNzkzLjU5Ni0zLjM3IDIuMTUtNC4xNzMgNS4wOTktNC43ODggOC45ODlsLTIuMjc4LTMuNTY5LTguODg4IDUuNjc0IDE1LjgzMiAyNC44MDEgOS4yMTgtNS44ODQtOS45LTE1LjUyOWMtLjk4LTEuNTM2LS41MjQtMy43MjYgMS4xMjYtNC43NzkgMi43NjUtMS43NjUgNC4zNzUuMjQyIDQuODQxLjk3Mmw5LjkwOCAxNS41MjIgOS41MTktNi4wNzUtOS4xMS0xNC4yNzJjLS42NTItMS4wMjEtMi4yNzItNC4yMDYuNDktNS45NjkgMi4yODUtMS40NTkgMy45NjItLjI5IDUuMSAxLjQ5NGw5LjUyMSAxNC45MTcgOS41Ni02LjEwMy0xMC4wMDQtMTUuOTZjLTIuNTItNC4wMi01Ljc5LTUuNTU0LTguODctNS42NDV6bS00MS4wMjQgMjUuMzI0LTkuMzQgNS45NjIgNy44NTMgMTIuMzA0YzIuMjgzIDMuNTc3IDMuMDMgNi4xOTYtLjA1MiA4LjE2NGEzLjI3MyAzLjI3MyAwIDAgMS0zLjE4OC4yMTNjLTEuMzQ2LS42NjgtMi41MS0yLjI0Ni0zLjgxNi00LjI5bC03LjY2NS0xMi4wMDgtOS4yMTggNS44ODQgOS4wNjYgMTQuNjJjMS4yOTIgMi4wODEgMi41NSAzLjc2NiAzLjcyMyA0Ljg3OCAzLjg0OSAzLjY1IDkuMzgxIDIuNjk4IDEyLjcyNi4zMTMgMy4zNzQtMi40MDYgNC4zODgtNS42MjggNC40NzgtOC45ODhsMi4yNjIgMy41NDMgOS4wMjQtNS43NTl6bS0zNS4yNCA4LjkxNi0xMi40ODMgNy45NjhjLTQuNzk5IDMuMDYzLTcuNjk3IDYuNzk2LTkuMjcxIDEzLjkyNi0xLjAxMyA0LjU4Ny0uMzc4IDEwLjUzOSAyLjUwOSAxNS4wNjIgMy4yNjUgNS4xMTUgNy41NzUgOC4wNzIgMTIuMTYyIDkuMDg0IDcuMTMgMS41NzQgMTIuMTc5LjA1IDE2Ljk3Ny0zLjAxNGwxMi40ODMtNy45NjgtNi4xNjctOS42NjItOC44ODQgNS42N2MtNS40OCAzLjQ5OC0xMS4xOSA0LjEwMy0xNC44MzMtMS42MDQtMS4zNTQtMi4xMi0xLjYzMy00LjIzNy0xLjIzLTYuMi45MS00LjQxOCAzLjMyMi02LjIwNiA2LjAyLTcuOTI4bDguODg0LTUuNjd6IiBmb250LWZhbWlseT0iTmltYnVzIFNhbnMgQmVja2VyIERCbGEiIGZvbnQtc2l6ZT0iMjguNjYiIGxldHRlci1zcGFjaW5nPSItMS4wNzUiIHBhaW50LW9yZGVyPSJzdHJva2UgZmlsbCBtYXJrZXJzIiBzdHlsZT0ibGluZS1oZWlnaHQ6Ljg7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonTmltYnVzIFNhbnMgQmVja2VyIERCbGEnIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDMuMjQ5IC04OS4yKSIgd29yZC1zcGFjaW5nPSIwIi8+PC9zdmc+",Pd=`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

:root {
  --bg: #0b0b0d;
  --panel: #ffffff;
  --ink: #15181d;
  --muted: #697887;
  --line: #d8e0e8;
  --brand: #da291c;
  --brand-soft: #ffe7e5;
  --good: #16a34a;
  --warn: #d08700;
  --danger: #c0352b;
  --elev: 0 18px 50px rgba(21, 51, 87, 0.14);
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Manrope, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(1100px 500px at -8% 100%, rgba(218, 41, 28, 0.5) 0%, rgba(218, 41, 28, 0) 62%),
    radial-gradient(980px 460px at 102% -10%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 58%),
    radial-gradient(860px 360px at 102% 94%, rgba(218, 41, 28, 0.4) 0%, rgba(218, 41, 28, 0) 66%),
    linear-gradient(165deg, #040404 0%, #0c0c0f 46%, #16161a 100%),
    var(--bg);
  background-attachment: fixed;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(620px 230px at 22% 22%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0)),
    radial-gradient(720px 260px at 72% 72%, rgba(218, 41, 28, 0.1), rgba(218, 41, 28, 0)),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.015) 0px,
      rgba(255, 255, 255, 0.015) 1px,
      rgba(0, 0, 0, 0) 2px,
      rgba(0, 0, 0, 0) 4px
    );
  mix-blend-mode: screen;
  opacity: 0.62;
  z-index: 0;
}

body::after {
  content: "";
  position: fixed;
  inset: -10%;
  pointer-events: none;
  background:
    radial-gradient(360px 130px at 20% 72%, rgba(218, 41, 28, 0.25), rgba(218, 41, 28, 0)),
    radial-gradient(420px 170px at 78% 26%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  filter: blur(18px);
  animation: drift 16s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes drift {
  0% { transform: translate3d(-2%, 0, 0); }
  100% { transform: translate3d(2%, -1.5%, 0); }
}
h1, h2, h3, h4 { margin: 0; font-family: "Space Grotesk", sans-serif; }
p { margin: 0; }

.app-shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 22px 26px;
  position: relative;
  z-index: 1;
}

.site-masthead {
  position: relative;
  z-index: 8;
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.94), rgba(9, 9, 10, 0.9));
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  color: #eef3f7;
}

.utility-bar {
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  font-size: 11px;
}

.utility-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 6px 22px;
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.primary-header {
  background: transparent;
}

.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 8px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
}

.brand-logo {
  height: 40px;
  width: auto;
  display: block;
}

.primary-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #eef3f7;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.nav-link, .utility-link, .footer-link, .brand-link {
  text-decoration: none;
}

.utility-link {
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-input {
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  width: 220px;
  background: rgba(255, 255, 255, 0.09);
  color: #f1f5f8;
}
.search-input::placeholder {
  color: #d4dde7;
}

.search-pill {
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.12);
  text-decoration: none;
  color: #eef3f7;
}

.role-strip {
  max-width: 1240px;
  margin: 0 auto;
  padding: 8px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.title { font-size: 20px; }
.subtitle { color: var(--muted); font-size: 12px; }

.role-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.role-tabs button {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: #edf3f8;
  font-weight: 700;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s ease;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.role-tabs button.active {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
  box-shadow: none;
}

.panel {
  background: var(--panel);
  border-radius: 24px;
  border: 1px solid #e3ebf4;
  box-shadow: var(--elev);
}

.section { padding: 18px; }
.grid { display: grid; gap: 14px; }

.hero {
  padding: 22px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr auto;
  align-items: center;
  transition: 0.25s ease;
}
.hero:hover { transform: translateY(-2px); }

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #bae0ff, #86b6ff);
  font-weight: 800;
}

.status {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-size: 13px;
}

.pulse {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
}

.pulse::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  opacity: 0.35;
  animation: pulse 1.6s infinite;
}

.pulse.good { background: var(--good); }
.pulse.good::after { background: var(--good); }
.pulse.off { background: #94a3b8; }
.pulse.off::after { background: #94a3b8; }

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}

.ai-orb {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: none;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.2px;
  background: radial-gradient(circle at 30% 20%, #3bc8ff, #0069cf 72%);
  box-shadow: 0 16px 36px rgba(0, 105, 207, 0.4);
  position: relative;
  cursor: pointer;
}

.ai-orb::after {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 2px solid rgba(0, 105, 207, 0.25);
  opacity: 0;
}

.ai-orb.ripple::after {
  animation: ripple 0.75s ease;
}

@keyframes ripple {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 0; }
}

.quick-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat {
  background: #f5f9ff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #dce8f5;
}

.label { font-size: 12px; color: var(--muted); }
.value { font-size: 24px; font-weight: 800; margin-top: 4px; }

.banner {
  border-radius: 14px;
  background: #e7edf4;
  border: 1px solid #d1dae5;
  color: #415466;
  font-weight: 700;
  padding: 10px 14px;
}

.diag-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.fault-card {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  display: grid;
  gap: 6px;
}

.tag {
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 800;
}

.tag.med { background: #fff7de; color: #8f6400; }
.tag.high { background: #ffe3e1; color: #9c1e17; }

.recommend {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #d7dde5;
  background: #fcfcfc;
}

.model-workspace {
  min-height: 392px;
  display: grid;
  grid-template-columns: 180px 1fr;
}

.model-sidebar {
  border-right: 1px solid #e0e6ee;
  background: linear-gradient(180deg, #f6f7f9 0%, #f0f2f5 100%);
  padding: 14px 12px;
  display: grid;
  align-content: start;
  gap: 8px;
}

.model-item {
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px;
  font-size: 13px;
  color: #33475b;
  font-weight: 700;
}

.model-item.active {
  border-color: #d1dbe7;
  background: #fff;
  color: #121a22;
}

.model-main {
  background:
    radial-gradient(420px 150px at 80% 10%, rgba(218, 41, 28, 0.07), rgba(218, 41, 28, 0)),
    radial-gradient(460px 180px at 40% 100%, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0)),
    #f8f9fb;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.model-pill {
  margin: 0 auto;
  border: 1px solid #d9e0e9;
  border-radius: 999px;
  padding: 8px 14px;
  background: #ffffffc7;
  font-size: 13px;
  font-weight: 700;
  color: #365068;
}

.model-summary {
  width: min(680px, 100%);
  margin: 0 auto;
  border: 1px solid #d7dde5;
  border-radius: 16px;
  background: #fff;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(20, 35, 56, 0.08);
}

.model-title {
  font-weight: 800;
  margin-bottom: 8px;
}

.model-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.model-tag {
  border-radius: 999px;
  border: 1px solid #d8dfe8;
  background: #f8fafc;
  color: #42566b;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
}

.prompt-dock {
  width: min(780px, 100%);
  margin: 0 auto;
  border: 1px solid #d2dae4;
  border-radius: 18px;
  background: #fff;
  padding: 12px 12px 10px;
  box-shadow: 0 8px 26px rgba(12, 24, 39, 0.08);
}

.prompt-input {
  color: #9ba6b3;
  font-size: 30px;
  line-height: 1;
}

.prompt-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.model-actions-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.model-chip {
  border: 1px solid #d5dde8;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 700;
  color: #455a70;
  background: #fafcfe;
}

.send-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0;
  background: #101316;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}

.role-shell {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  padding: 12px;
}

.role-shell .panel,
.role-shell .stat,
.role-shell .kpi,
.role-shell .chart,
.role-shell .metric,
.role-shell .role-line {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.18);
  color: #f1f5f8;
  box-shadow: none;
}

.role-shell .label,
.role-shell .subtitle,
.role-shell .table th,
.role-shell .table td,
.role-shell .trend {
  color: #d2dde8;
}

.role-shell .alert-item {
  background: rgba(218, 41, 28, 0.2);
  border-color: rgba(218, 41, 28, 0.45);
  color: #ffe8e5;
}

.junior-page {
  display: grid;
  gap: 14px;
}

.agent-layout {
  min-height: 620px;
  display: grid;
  grid-template-columns: 248px 1fr;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
}

.agent-sidebar {
  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.11);
  padding: 14px 10px;
  color: #f1f5f8;
  display: grid;
  align-content: start;
  gap: 10px;
}

.agent-brand {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
}

.agent-link {
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  color: #d4dde5;
  border: 1px solid transparent;
}

.agent-link.active {
  color: #fff;
  border-color: rgba(218, 41, 28, 0.4);
  background: rgba(218, 41, 28, 0.18);
}

.agent-main {
  position: relative;
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
}

.agent-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e6edf3;
  font-size: 13px;
}

.agent-badge {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f8;
  font-weight: 700;
}

.agent-canvas {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(420px 180px at 80% 8%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)),
    radial-gradient(450px 220px at 8% 88%, rgba(218, 41, 28, 0.28), rgba(218, 41, 28, 0)),
    linear-gradient(165deg, rgba(22, 22, 25, 0.92), rgba(10, 10, 12, 0.88));
  padding: 24px;
  color: #f5f7fa;
  display: grid;
  align-content: center;
  gap: 12px;
}

.agent-canvas h2 {
  max-width: 620px;
  font-size: clamp(30px, 4.8vw, 52px);
  line-height: 1.08;
}

.agent-canvas p {
  max-width: 560px;
  color: #d8e0e8;
}

.agent-prompt {
  width: min(860px, 100%);
  margin: 0 auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.94);
  padding: 12px;
}

.agent-prompt-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.prompt-placeholder {
  color: #8d98a6;
  font-size: clamp(16px, 2.1vw, 32px);
  line-height: 1.1;
  flex: 1;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #d2d9e3;
  background: #fff;
  color: #19222b;
  font-weight: 800;
}

.agent-controls {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.chip-dark {
  border-radius: 999px;
  border: 1px solid #d0d8e3;
  background: #fff;
  color: #334658;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
}

.page-footer {
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 8, 10, 0.76);
  color: #dce3ea;
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 22px 18px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
}

.footer-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-link {
  color: #ffffff;
  opacity: 0.9;
}

.info-page {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  color: #f0f4f8;
  padding: 24px;
  min-height: 420px;
}

.search-page {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  color: #f0f4f8;
  padding: 24px;
  min-height: 420px;
}

.search-results {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.search-result {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 12px;
  color: #f0f4f8;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
}

.bar {
  height: 12px;
  border-radius: 999px;
  background: #dfe8f3;
  overflow: hidden;
  margin-top: 8px;
}

.fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #cb2e2e, #f59e0b, #22c55e);
  transform-origin: left;
  animation: grow 0.9s ease;
}

@keyframes grow {
  from { transform: scaleX(0.1); }
  to { transform: scaleX(1); }
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.btn {
  border: 0;
  border-radius: 11px;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;
}
.btn.green { background: #dbf4e5; color: #0f6a39; }
.btn.yellow { background: #fff3d8; color: #8f6400; }
.btn.red { background: #ffe3e1; color: #8f1f18; }
.btn.blue { background: #d9edff; color: #005ea8; }

.btn.shake {
  animation: shake 1.1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-2px); }
  35% { transform: translateX(2px); }
  55% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ebf1f7;
}
.table th { color: var(--muted); font-size: 12px; }

.risk {
  border-left: 3px solid transparent;
}
.risk.low-conf { border-left-color: #c0352b; }
.risk.safe-flag { border-left-color: #d08700; }
.risk.aging { border-left-color: #0f80e8; }

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.kpi {
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #dce8f5;
  background: linear-gradient(160deg, #ffffff 0%, #f5faff 100%);
}
.kpi .trend { color: #0f6a39; font-size: 13px; font-weight: 700; }

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.chart {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  background: #fcfdff;
}

.spark {
  height: 70px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: end;
  gap: 5px;
}

.spark span {
  border-radius: 8px 8px 4px 4px;
  background: linear-gradient(180deg, #8bc8ff, #2787e5);
}

.alerts {
  display: grid;
  gap: 8px;
}

.alert-item {
  border-radius: 11px;
  border: 1px solid #f1dccf;
  background: #fff5ef;
  color: #744a2f;
  padding: 10px 12px;
  font-size: 13px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  background: #f8fbff;
}

.role-list {
  display: grid;
  gap: 9px;
}

.role-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dce8f5;
  border-radius: 12px;
  padding: 10px;
}

.toggle {
  width: 46px;
  height: 24px;
  border-radius: 999px;
  background: #b8c5d3;
  position: relative;
}
.toggle::after {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 4px;
  top: 3px;
}
.toggle.on { background: #55b37a; }
.toggle.on::after { left: 24px; }

.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #0f6a39;
  color: #fff;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: var(--elev);
  font-weight: 700;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 30, 42, 0.56);
  display: grid;
  place-items: center;
  padding: 20px;
  z-index: 10;
}

.modal {
  width: min(480px, 100%);
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid #dce8f5;
}

.input, .select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cfdbea;
  margin-top: 6px;
  margin-bottom: 10px;
  font: inherit;
}

.offline-tint {
  filter: grayscale(0.25);
}

@media (max-width: 1100px) {
  .diag-grid, .chart-grid, .admin-grid { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .model-workspace { grid-template-columns: 1fr; }
  .model-sidebar { grid-auto-flow: column; overflow-x: auto; border-right: 0; border-bottom: 1px solid #e0e6ee; }
  .agent-layout { grid-template-columns: 1fr; min-height: 560px; }
  .agent-sidebar { grid-auto-flow: column; overflow-x: auto; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.11); }
  .agent-main { min-height: 460px; }
}

@media (max-width: 760px) {
  .header-inner { flex-wrap: wrap; }
  .primary-nav { overflow-x: auto; flex-wrap: nowrap; max-width: 100%; }
  .search-input { width: 160px; }
  .role-strip { align-items: flex-start; }
  .app-shell { padding: 12px 14px 20px; }
  .hero { grid-template-columns: 1fr; text-align: left; }
  .quick-cards { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: 1fr; }
  .agent-canvas { padding: 16px; }
  .agent-canvas h2 { font-size: clamp(22px, 9vw, 34px); }
  .agent-prompt { padding: 10px; }
  .agent-controls { gap: 8px; }
}

@media (max-width: 480px) {
  .role-tabs { width: 100%; }
  .role-tabs button { flex: 1; min-width: 0; padding: 9px 8px; }
  .prompt-placeholder { font-size: 20px; }
  .agent-top { flex-wrap: wrap; }
}
`;function Rd({role:k,setRole:T,onSearch:g}){const K=["Junior","Senior","Manager","Admin"],[A,H]=dt.useState(""),ue=B=>{T(B),window.location.hash="#/home"},he=B=>{B.preventDefault(),g(A)};return u.createElement("header",{className:"site-masthead"},u.createElement("div",{className:"utility-bar"},u.createElement("div",{className:"utility-inner"},u.createElement("a",{className:"utility-link",href:"#/about"},"About"),u.createElement("a",{className:"utility-link",href:"#/support"},"Support"),u.createElement("a",{className:"utility-link",href:"#/contact"},"Contact"))),u.createElement("div",{className:"primary-header"},u.createElement("div",{className:"header-inner"},u.createElement("a",{className:"brand-link",href:"#/home","aria-label":"Cummins"},u.createElement("img",{className:"brand-logo",src:Od,alt:"Cummins logo"})),u.createElement("nav",{className:"primary-nav","aria-label":"Primary"},u.createElement("a",{className:"nav-link",href:"#/products"},"Products"),u.createElement("a",{className:"nav-link",href:"#/parts-service"},"Parts & Service"),u.createElement("a",{className:"nav-link",href:"#/technology"},"Technology"),u.createElement("a",{className:"nav-link",href:"#/sustainability"},"Sustainability")),u.createElement("div",{className:"header-actions"},u.createElement("form",{className:"search-form",onSubmit:he},u.createElement("input",{className:"search-input",placeholder:"Search chats, pages, diagnostics...",value:A,onChange:B=>H(B.target.value)}),u.createElement("button",{className:"search-pill",type:"submit"},"Search"))))),u.createElement("div",{className:"role-strip"},u.createElement("div",null,u.createElement("h1",{className:"title"},"ServiceSync AI"),u.createElement("p",{className:"subtitle"},"Role-focused workflows with AI-guided diagnostics and governance")),u.createElement("div",{className:"role-tabs"},K.map(B=>u.createElement("button",{key:B,className:k===B?"active":"",onClick:()=>ue(B)},B)))))}function Ad({toast:k,setToast:T}){const[g,K]=dt.useState(!1);return u.createElement("div",{className:`junior-page ${g?"offline-tint":""}`},g&&u.createElement("div",{className:"banner"},"Offline Mode - Using Cached AI Model | 2 Pending Sync"),u.createElement("section",{className:"agent-layout"},u.createElement("aside",{className:"agent-sidebar"},u.createElement("div",{className:"agent-brand"},"ServiceSync Agent"),u.createElement("div",{className:"agent-link active"},"AI Mentor"),u.createElement("div",{className:"agent-link"},"Fault Code Retrieval"),u.createElement("div",{className:"agent-link"},"Service History"),u.createElement("div",{className:"agent-link"},"Escalation Queue"),u.createElement("div",{className:"agent-link"},"Offline Cache")),u.createElement("div",{className:"agent-main"},u.createElement("div",{className:"agent-top"},u.createElement("span",null,"Engine: QSK60 | Signal: ████░"),u.createElement("div",{style:{display:"flex",gap:8,alignItems:"center"}},u.createElement("span",{className:`pulse ${g?"off":"good"}`}),u.createElement("span",null,g?"Offline":"Online"),u.createElement("button",{className:"chip-dark",onClick:()=>K(H=>!H)},g?"Go Online":"Simulate Offline"))),u.createElement("div",{className:"agent-canvas"},u.createElement("div",{className:"agent-badge"},82,"% confidence recommendation ready"),u.createElement("h2",null,"AI Mentor for Fast, Confident Cummins Diagnostics"),u.createElement("p",null,"Diagnosis: Fuel Pressure Sensor Failure. Similar case cluster: 64%. Wear threshold reached.")),u.createElement("div",{className:"agent-prompt"},u.createElement("div",{className:"agent-prompt-row"},u.createElement("button",{className:"icon-btn"},"+"),u.createElement("div",{className:"prompt-placeholder"},"Ask AI for next diagnostic action..."),u.createElement("button",{className:"icon-btn"},"🎤"),u.createElement("button",{className:"send-btn",onClick:()=>T("AI mentor prompt sent.")},"→")),u.createElement("div",{className:"agent-controls"},u.createElement("span",{className:"chip-dark"},"Model ▾"),u.createElement("div",{style:{display:"flex",gap:8}},u.createElement("button",{className:"btn green",onClick:()=>T("Proceed action accepted and logged.")},"Proceed"),u.createElement("button",{className:"btn yellow",onClick:()=>T("Guided checklist launched.")},"Guidance"),u.createElement("button",{className:"btn red shake",onClick:()=>T("Escalation queued with full diagnostic context + optional voice note.")},"Escalate")))))),u.createElement("div",{className:"quick-cards"},u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"Recent Diagnoses"),u.createElement("div",{className:"value"},"3")),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"Pending Escalations"),u.createElement("div",{className:"value"},"2")),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"Offline Cached Engines"),u.createElement("div",{className:"value"},"6"))),k&&u.createElement("div",{className:"toast"},k))}function Ud({setToast:k,setShowOverride:T}){return u.createElement("div",{className:"role-shell"},u.createElement("div",{className:"grid",style:{gridTemplateColumns:"280px 1fr",alignItems:"start"}},u.createElement("div",{className:"panel section grid"},u.createElement("h3",null,"Senior Dashboard"),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"Pending Escalations"),u.createElement("div",{className:"value"},"14")),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"High Risk Cases"),u.createElement("div",{className:"value"},"5")),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"AI Overrides"),u.createElement("div",{className:"value"},"8")),u.createElement("div",{className:"stat"},u.createElement("div",{className:"label"},"AI Performance"),u.createElement("div",{className:"value"},"89%"))),u.createElement("div",{className:"grid"},u.createElement("div",{className:"panel section"},u.createElement("h3",{style:{marginBottom:10}},"Escalation Queue"),u.createElement("table",{className:"table"},u.createElement("thead",null,u.createElement("tr",null,u.createElement("th",null,"Priority"),u.createElement("th",null,"Engine"),u.createElement("th",null,"AI Confidence"),u.createElement("th",null,"Fault"),u.createElement("th",null,"Wait"))),u.createElement("tbody",null,u.createElement("tr",{className:"risk low-conf"},u.createElement("td",null,"High"),u.createElement("td",null,"QSK60"),u.createElement("td",null,"34%"),u.createElement("td",null,"Fuel Rail Pressure"),u.createElement("td",null,"17m")),u.createElement("tr",{className:"risk safe-flag"},u.createElement("td",null,"Critical"),u.createElement("td",null,"X15"),u.createElement("td",null,"61%"),u.createElement("td",null,"Coolant Temp Spike"),u.createElement("td",null,"39m")),u.createElement("tr",{className:"risk aging"},u.createElement("td",null,"Medium"),u.createElement("td",null,"B6.7"),u.createElement("td",null,"78%"),u.createElement("td",null,"NOx Sensor Drift"),u.createElement("td",null,"1h 24m"))))),u.createElement("div",{className:"diag-grid"},u.createElement("div",{className:"panel section grid"},u.createElement("h3",null,"Escalation Detail"),u.createElement("div",{className:"metric"},"Engine Data: QSK60 | 2,420 hrs | Unit #A49"),u.createElement("div",{className:"metric"},"Service History: Fuel filter replaced 3 months ago"),u.createElement("div",{className:"metric"},'Junior Notes: "Intermittent power drop under load."'),u.createElement("div",{className:"metric"},"Photos: 3 attachments present")),u.createElement("div",{className:"panel section grid"},u.createElement("h3",null,"AI Context"),u.createElement("div",{className:"metric"},"Recommendation: Replace fuel pressure sensor + inspect harness"),u.createElement("div",{className:"metric"},"Confidence: 82%"),u.createElement("div",{className:"metric"},"Reasoning: Similar pattern in last 12 cases"),u.createElement("div",{className:"metric"},"Similar Cases: 8 resolved, 1 overridden"),u.createElement("div",{className:"actions"},u.createElement("button",{className:"btn green",onClick:()=>k("Escalation approved. Response timestamped.")},"Approve"),u.createElement("button",{className:"btn red",onClick:()=>k("Escalation rejected with notes.")},"Reject"),u.createElement("button",{className:"btn blue",onClick:()=>k("Requested more information from junior technician.")},"Request More Info"),u.createElement("button",{className:"btn yellow",onClick:()=>T(!0)},"Override AI")))))))}function Fd(){const k=dt.useMemo(()=>[22,34,28,44,51,58,62],[]);return u.createElement("div",{className:"role-shell"},u.createElement("div",{className:"grid"},u.createElement("div",{className:"kpi-grid"},[{k:"MTTR",v:"↓ 18%"},{k:"FTFR",v:"↑ 12%"},{k:"Escalation Rate",v:"↓ 22%"},{k:"AI Accuracy",v:"89%"}].map(T=>u.createElement("div",{className:"kpi",key:T.k},u.createElement("div",{className:"label"},T.k),u.createElement("div",{className:"value"},T.v),u.createElement("div",{className:"trend"},"Improving trend")))),u.createElement("div",{className:"chart-grid"},u.createElement("div",{className:"chart"},u.createElement("h4",null,"AI Accuracy Trend (30/60/90)"),u.createElement("div",{className:"spark"},k.map((T,g)=>u.createElement("span",{key:g,style:{height:`${T+10}px`}})))),u.createElement("div",{className:"chart"},u.createElement("h4",null,"Escalation by Technician"),u.createElement("div",{className:"spark"},[30,52,20,66,41,57,25].map((T,g)=>u.createElement("span",{key:g,style:{height:`${T}px`}})))),u.createElement("div",{className:"chart"},u.createElement("h4",null,"Repeat Fault Heatmap"),u.createElement("p",{className:"subtitle",style:{marginTop:8}},"Cluster concentration highest on fuel and sensor-related fault families.")),u.createElement("div",{className:"chart"},u.createElement("h4",null,"Warranty Cost Reduction"),u.createElement("p",{className:"subtitle",style:{marginTop:8}},"Projected quarterly savings trend remains above target by 9%."))),u.createElement("div",{className:"panel section"},u.createElement("h3",{style:{marginBottom:10}},"Risk Alerts"),u.createElement("div",{className:"alerts"},u.createElement("div",{className:"alert-item"},"Technicians with high override rate detected in East region (3 users)"),u.createElement("div",{className:"alert-item"},"AI confidence drift detected in DEF subsystem diagnostics"),u.createElement("div",{className:"alert-item"},"Repeat part replacement cluster detected: Fuel pressure sensors")))))}function Qd({setToast:k}){return u.createElement("div",{className:"role-shell"},u.createElement("div",{className:"admin-grid"},u.createElement("div",{className:"panel section grid"},u.createElement("h3",null,"System Health"),u.createElement("div",{className:"metric"},u.createElement("strong",null,"API Uptime:")," 99.97%"),u.createElement("div",{className:"metric"},u.createElement("strong",null,"Offline Device Count:")," 23"),u.createElement("div",{className:"metric"},u.createElement("strong",null,"Sync Latency:")," 1.8s avg")),u.createElement("div",{className:"panel section grid"},u.createElement("h3",null,"AI Management"),u.createElement("div",{className:"metric"},u.createElement("strong",null,"Model Version:")," v3.8.2"),u.createElement("div",{className:"actions"},u.createElement("button",{className:"btn blue",onClick:()=>k("New model deployment started.")},"Deploy New Model"),u.createElement("button",{className:"btn yellow",onClick:()=>k("Rollback initiated to previous stable model.")},"Rollback")),u.createElement("div",{className:"metric"},u.createElement("strong",null,"Audit Logs:")," Performance and override records available")),u.createElement("div",{className:"panel section",style:{gridColumn:"1 / -1"}},u.createElement("h3",{style:{marginBottom:10}},"Role-Based Access Control"),u.createElement("div",{className:"role-list"},[["Junior",!0],["Senior",!0],["Manager",!0],["Admin",!0]].map(([T,g])=>u.createElement("div",{className:"role-line",key:T},u.createElement("span",null,T),u.createElement("span",{className:`toggle ${g?"on":""}`})))))))}function Vd(){return u.createElement("footer",{className:"page-footer"},u.createElement("div",{className:"footer-inner"},u.createElement("span",null,"© ",new Date().getFullYear()," Cummins ServiceSync AI"),u.createElement("div",{className:"footer-links"},u.createElement("a",{className:"footer-link",href:"#/privacy"},"Privacy"),u.createElement("a",{className:"footer-link",href:"#/terms"},"Terms"),u.createElement("a",{className:"footer-link",href:"#/contact"},"Contact"))))}function Hd({title:k,description:T}){return u.createElement("section",{className:"info-page"},u.createElement("h2",{style:{color:"#fff",marginBottom:8}},k),u.createElement("p",{style:{color:"#d3dce6",maxWidth:760}},T),u.createElement("div",{style:{marginTop:16}},u.createElement("a",{className:"chip-dark",href:"#/home"},"Return to ServiceSync Dashboard")))}function Bd({query:k,results:T,onPickRole:g}){return u.createElement("section",{className:"search-page"},u.createElement("h2",{style:{color:"#fff",marginBottom:8}},"Search"),u.createElement("p",{style:{color:"#d3dce6",maxWidth:760}},k?`Results for "${k}"`:"Search chats, dashboards, diagnostics, and support pages."),u.createElement("div",{className:"search-results"},T.length===0&&u.createElement("div",{className:"model-tag"},"No results found. Try another keyword."),T.map(K=>u.createElement("a",{key:K.title,className:"search-result",href:K.href,onClick:()=>K.role&&g(K.role)},u.createElement("strong",null,K.title),u.createElement("div",{className:"subtitle",style:{color:"#d3dce6",marginTop:4}},K.type)))))}function Wd(){const[k,T]=dt.useState("Junior"),[g,K]=dt.useState(""),[A,H]=dt.useState(!1),[ue,he]=dt.useState(""),[B,Le]=dt.useState(""),[xt,de]=dt.useState(()=>window.location.hash||"#/home");dt.useEffect(()=>{const ie=()=>de(window.location.hash||"#/home");return window.addEventListener("hashchange",ie),()=>window.removeEventListener("hashchange",ie)},[]);const J=ie=>{K(ie),setTimeout(()=>K(""),2400)},et=ie=>{const Ke=ie.trim(),wt=Ke?`?query=${encodeURIComponent(Ke)}`:"";window.location.hash=`#/search${wt}`},Ie={about:{title:"About",description:"ServiceSync AI delivers guided diagnostics, escalation intelligence, and role-based reliability tooling for field operations."},support:{title:"Support",description:"Support resources include troubleshooting guides, model diagnostics, and escalation response workflows."},contact:{title:"Contact",description:"Contact the ServiceSync operations team for platform access, issue response, and enterprise onboarding."},products:{title:"Products",description:"Explore Cummins power solutions integrated with ServiceSync diagnostics and predictive maintenance tooling."},"parts-service":{title:"Parts & Service",description:"Find service workflows, replacement planning, and maintenance guidance linked to field diagnostics."},technology:{title:"Technology",description:"View AI model capabilities, confidence monitoring, and production support architecture for technicians."},sustainability:{title:"Sustainability",description:"Track operational efficiency and sustainability outcomes through reliable diagnostics and reduced repeat repairs."},search:{title:"Search",description:"Use global search to locate cases, engines, fault clusters, and support resources across ServiceSync AI."},privacy:{title:"Privacy",description:"Privacy controls include audit-safe data handling, role-based access, and secure escalation context management."},terms:{title:"Terms",description:"Review operational terms for platform usage, escalation governance, and model override accountability."}},G=xt.startsWith("#/")?xt.slice(2):"home",[W,tt=""]=G.split("?"),ze=new URLSearchParams(tt).get("query")||"",fe=Ie[W],we=[{title:"Junior Technician Dashboard",type:"Dashboard",href:"#/home",role:"Junior"},{title:"Senior Escalation Queue",type:"Dashboard",href:"#/home",role:"Senior"},{title:"Manager Analytics Overview",type:"Dashboard",href:"#/home",role:"Manager"},{title:"Admin System Health",type:"Dashboard",href:"#/home",role:"Admin"},{title:"Chat: QSK60 Fuel Pressure Case",type:"Chat",href:"#/home",role:"Junior"},{title:"Chat: DEF Sensor Escalation",type:"Chat",href:"#/home",role:"Senior"},{title:"About",type:"Page",href:"#/about"},{title:"Support",type:"Page",href:"#/support"},{title:"Contact",type:"Page",href:"#/contact"},{title:"Products",type:"Page",href:"#/products"},{title:"Parts & Service",type:"Page",href:"#/parts-service"},{title:"Technology",type:"Page",href:"#/technology"},{title:"Sustainability",type:"Page",href:"#/sustainability"},{title:"Privacy",type:"Page",href:"#/privacy"},{title:"Terms",type:"Page",href:"#/terms"}].filter(ie=>ze?`${ie.title} ${ie.type}`.toLowerCase().includes(ze.toLowerCase()):!0);let le=null;W==="search"?le=u.createElement(Bd,{query:ze,results:we,onPickRole:T}):fe?le=u.createElement(Hd,{title:fe.title,description:fe.description}):(k==="Junior"&&(le=u.createElement(Ad,{toast:g,setToast:J})),k==="Senior"&&(le=u.createElement(Ud,{setToast:J,setShowOverride:H})),k==="Manager"&&(le=u.createElement(Fd,null)),k==="Admin"&&(le=u.createElement(Qd,{setToast:J})));const De=()=>{J("Override confirmed, audit trail logged with timestamp."),H(!1),he(""),Le("")};return u.createElement(u.Fragment,null,u.createElement("style",null,Pd),u.createElement(Rd,{role:k,setRole:T,onSearch:et}),u.createElement("div",{className:"app-shell"},le),u.createElement(Vd,null),A&&u.createElement("div",{className:"overlay"},u.createElement("div",{className:"modal"},u.createElement("h3",null,"Override AI Recommendation"),u.createElement("p",{className:"subtitle",style:{marginTop:6,marginBottom:10}},"Mandatory comment and AI error tag are required for audit quality."),u.createElement("label",null,"Justification Comment",u.createElement("textarea",{className:"input",rows:3,placeholder:"Explain why this recommendation is being overridden...",value:ue,onChange:ie=>he(ie.target.value)})),u.createElement("label",null,"AI Error Category",u.createElement("select",{className:"select",value:B,onChange:ie=>Le(ie.target.value)},u.createElement("option",{value:""},"Select category"),u.createElement("option",{value:"insufficient_context"},"Insufficient Context"),u.createElement("option",{value:"fault_misclassification"},"Fault Misclassification"),u.createElement("option",{value:"unsafe_recommendation"},"Unsafe Recommendation"))),u.createElement("div",{className:"actions",style:{justifyContent:"flex-end"}},u.createElement("button",{className:"btn blue",onClick:()=>H(!1)},"Cancel"),u.createElement("button",{className:"btn red",disabled:!ue.trim()||!B,onClick:De,style:{opacity:!ue.trim()||!B?.55:1}},"Confirm Override")))),g&&k!=="Junior"&&u.createElement("div",{className:"toast"},g))}const zs=document.getElementById("root");zs&&_d.createRoot(zs).render(u.createElement(Wd,null));
