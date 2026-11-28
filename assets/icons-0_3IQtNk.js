import{b as c}from"./react-vendor-CRLdCD3-.js";/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=e=>(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase();/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function P(e,t,n=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:I(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=e=>{let t="",n=!1;for(const o of e){if(o==="-"||o==="_"||o<=" "){n=t.length>0;continue}t.length===0?t+=o.toLowerCase():t+=n?o.toUpperCase():o,n=!1}return t};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=e=>{const t=_(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(...e)=>{const t=new Set;for(const n of e)if(typeof n=="string")for(const o of n.split(/\s+/))o&&t.add(o);return[...t].join(" ")};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function m(e){return e!=null}function p(e,t={}){var g,w;const n=t.attributeNames??{},o=s=>n[s]??s,l=e.size??e.width??r.width,u=e.size??e.height??r.height,h=((g=e.aliases)==null?void 0:g.filter(s=>typeof s=="string"&&s.trim()!=="").map(s=>`lucide-${s}`))??[],f=[...e.name?[`lucide-${e.name}`]:[],...h],i=((w=t.className)==null?void 0:w.split(" ").filter(Boolean))??[],k=t.includeDefaultClasses===!1?y(...i):y("lucide",...f,...i),C=t.absoluteStrokeWidth?Number(t.strokeWidth??r["stroke-width"])*Number(e.size??e.width??r.width)/Number(t.size??t.width??r.width):t.strokeWidth??r["stroke-width"];return["svg",{...Object.entries(r).reduce((s,[a,d])=>(s[o(a)]=d,s),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&m(t.size)&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&m(t.width)&&{[o("width")]:t.width},..."height"in t&&m(t.height)&&{[o("height")]:t.height},[o("stroke-width")]:C,...k&&{[o("class")]:k},[o("viewBox")]:`0 0 ${l} ${u}`,...t.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(s=>{const[a,d,b]=s,x=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...d}:d;return b?[a,x,b]:[a,x]})]}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function D(e,t={}){return p(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=e=>{if(e==null||typeof e!="object")return!1;for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||t==="role"||t==="title")&&e[t]!=null)return!0;return!1},q=c.createContext({}),F=()=>c.useContext(q),H=c.forwardRef(({color:e,size:t,width:n,height:o,strokeWidth:l,absoluteStrokeWidth:u,nonScalingStroke:h,className:f="",children:i,iconNode:k=[],icon:C={node:k,aliases:[],size:24},...N},g)=>{const{size:w=24,strokeWidth:s=2,absoluteStrokeWidth:a=!1,nonScalingStroke:d=!1,color:b="currentColor",className:x=""}=F()??{},W=!!i||R(N),[L,v,j=[]]=D(C,{color:e??b,width:n??t??w,height:o??t??w,strokeWidth:l??s,absoluteStrokeWidth:u??a,nonScalingStroke:h??d,className:y(x,f),hasA11yProp:W,attributes:N});return c.createElement(L,{ref:g,...v},[...j.map(([B,E])=>c.createElement(B,E)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function A(e,t=[],n=[]){const o=typeof e=="string"?P(e,t,n):e,l=c.forwardRef(({className:u,...h},f)=>c.createElement(H,{ref:f,icon:o,className:u,...h}));return o.name&&(l.displayName=$(o.name)),l}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};z.node;const U=A(z);/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};S.node;const Z=A(S);export{U as A,Z as a};
