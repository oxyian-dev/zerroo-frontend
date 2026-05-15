"use strict";(self.webpackChunkzerroo=self.webpackChunkzerroo||[]).push([[4112],{64112:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var i=n(39709),a=n(16029),r=n(61889),o=n(57621),s=n(39504),l=n(20890),d=n(68096),h=n(30829),c=n(77196),u=n(47071),m=n(47047),g=n(58956),p=n(92506),x=n(98246),v=n(72791),Z=n(57689),j=n(81724),b=n(84268),f=n(80348),y=n(48221),C=n(94659),w=n(80184);const S=()=>{const{id:e}=(0,Z.UO)(),{enqueueSnackbar:t}=(0,x.Ds)(),[n,S]=(0,v.useState)({}),[k,P]=(0,v.useState)(!0),R=(0,Z.s0)();return(0,v.useEffect)((()=>{(0,y.Z)(`/api/categories/${e}`).then((e=>e.json())).then((e=>{S(e),P(!1)}))}),[e]),k?(0,w.jsxs)(a.Z,{sx:{width:"100%"},children:[(0,w.jsx)(m.Z,{height:100}),(0,w.jsx)(m.Z,{animation:"wave",height:150}),(0,w.jsx)(m.Z,{animation:!1,height:300})]}):(0,w.jsx)(p.J9,{validationSchema:j.Ry().shape({category:j.Z_().max(100).required("Category is required")}),onSubmit:async(n,i)=>{let{setSubmitting:a}=i;return a(!0),await(0,y.Z)(`/api/categories/${e}`,{method:"PUT",body:(0,C.WL)(n)}).then((e=>e.json())).then((e=>{"success"===e.status?(t("Category Edited Successfully",{variant:"success"}),R("/admin/categories/view")):(t("Exception occurred",{variant:"error"}),a(!1))})).catch((()=>{t("Error occurred",{variant:"error"}),a(!1)}))},initialValues:{...(0,C.jX)(n),removed:!1},children:e=>{let{errors:t,handleBlur:m,handleChange:p,handleSubmit:x,isSubmitting:v,touched:Z,values:j}=e;return(0,w.jsxs)("form",{noValidate:!0,onSubmit:x,children:[(0,w.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,w.jsx)(r.ZP,{item:!0,xs:12,children:(0,w.jsx)(o.Z,{variant:"outlined",children:(0,w.jsx)(s.Z,{children:(0,w.jsx)(l.Z,{variant:"h2",textAlign:"center",children:"Edit Category"})})})}),(0,w.jsx)(r.ZP,{item:!0,xs:6,children:(0,w.jsxs)(d.Z,{fullWidth:!0,error:Boolean(Z.category&&t.category),children:[(0,w.jsx)(h.Z,{htmlFor:"category",children:"Category Name"}),(0,w.jsx)(c.Z,{id:"category",type:"text",value:j.category,name:"category",onBlur:m,onChange:p,label:"Category Name",inputProps:{}}),Z.category&&t.category&&(0,w.jsx)(u.Z,{error:!0,id:"category-error",children:t.category})]})}),(0,w.jsx)(r.ZP,{item:!0,xs:6,children:(0,w.jsx)(d.Z,{fullWidth:!0,children:(0,w.jsx)(f.Z,{id:"parent",name:"parent",select:"category",value:j.parent,label:"Parent Category",onBlur:m,onChange:p})})}),(0,w.jsx)(r.ZP,{item:!0,xs:12,children:(0,w.jsx)(b.Z,{defaultImages:n.image?[(0,C.Np)(n.image)]:[],name:"image",handleChange:p,handleRemove:()=>{j.removed=!0}})})]}),t.submit&&(0,w.jsx)(a.Z,{sx:{mt:3},children:(0,w.jsx)(u.Z,{id:"error-submit",error:!0,children:t.submit})}),(0,w.jsx)(a.Z,{sx:{mt:2},children:(0,w.jsx)(i.Z,{fullWidth:!0,size:"large",type:"submit",loading:v,loadingPosition:"start",startIcon:(0,w.jsx)(g.e11,{}),variant:"contained",children:"Edit"})})]})}})}},84268:(e,t,n)=>{n.d(t,{Z:()=>x});var i=n(57621),a=n(39504),r=n(16029),o=n(61889),s=n(13400),l=n(20890),d=n(24518),h=n(5519),c=n(58956),u=n(72791),m=n(63264),g=n.n(m),p=n(80184);function x(e){let{multiple:t=!1,maxNumber:n=1,acceptType:m=["jpg","jpeg","png","webp"],handleChange:x,handleRemove:v,name:Z="images",maxFileSize:j=5242880,buttonText:b="Upload Image",paperElevation:f=2,defaultImages:y=[]}=e;const[C,w]=(0,u.useState)([]),[S,k]=(0,u.useState)(y);return(0,p.jsx)(g(),{multiple:t,value:C,onChange:e=>{if(w(e),x){const n=e.map((e=>{let{file:t}=e;return new Blob([t],{type:t.type})})),i=t?n:null===n||void 0===n?void 0:n[0];x({target:{name:Z,value:i}},i)}},maxNumber:n,acceptType:m,maxFileSize:j,children:e=>{let{imageList:u,onImageUpload:g,onImageRemove:x,isDragging:Z,dragProps:y}=e;return(0,p.jsx)(i.Z,{variant:Z?"outlined":"elevation",elevation:f,sx:{textAlign:"center",border:Z?"2px solid #054192":"none"},children:(0,p.jsx)(a.Z,{children:(0,p.jsxs)(r.Z,{...y,children:[(0,p.jsx)(r.Z,{mb:2,children:(0,p.jsx)(c.alN,{size:80})}),(0,p.jsxs)(o.ZP,{container:!0,spacing:2,mb:2,children:[S.map(((e,t)=>(0,p.jsx)(o.ZP,{item:!0,md:4,xs:12,mx:"auto",children:(0,p.jsxs)(r.Z,{position:"relative",children:[(0,p.jsx)("img",{style:{maxWidth:"100%",height:"auto"},src:e,alt:""}),(0,p.jsx)(r.Z,{position:"absolute",top:0,left:0,children:(0,p.jsx)(s.Z,{sx:{bgcolor:h.Z[300]},onClick:()=>{k((e=>e.splice(0,t))),v&&v(t)},children:(0,p.jsx)(c.kLi,{})})})]})},t))),u.map(((e,t)=>{let{dataURL:n}=e;return(0,p.jsx)(o.ZP,{item:!0,md:4,xs:12,mx:"auto",children:(0,p.jsxs)(r.Z,{position:"relative",children:[(0,p.jsx)("img",{style:{maxWidth:"100%",height:"auto"},src:n,alt:""}),(0,p.jsx)(r.Z,{position:"absolute",top:0,left:0,children:(0,p.jsx)(s.Z,{sx:{bgcolor:h.Z[300]},onClick:()=>(v&&v(t),x(t)),children:(0,p.jsx)(c.kLi,{})})})]})},t)}))]}),(0,p.jsxs)(l.Z,{mb:1,children:["Accepted: ",m.join(", ")]}),j&&(0,p.jsxs)(l.Z,{mb:1,children:["Max Size: ",j/1024/1024," MB"]}),(0,p.jsx)(r.Z,{children:(0,p.jsx)(d.Z,{disabled:!t&&1===C.length||t&&C.length===n,variant:"contained",onClick:g,children:b})})]})})})}})}},80348:(e,t,n)=>{n.d(t,{Z:()=>h});var i=n(84648),a=n(48550),r=n(16029),o=n(13239),s=n(72791),l=n(48221),d=n(80184);const h=e=>{let{name:t,required:n,select:h,id:c,label:u,onChange:m,onBlur:g,value:p,multiple:x,filterSelectedOptions:v,disabled:Z,helperText:j,server:b}=e;const[f,y]=(0,s.useState)(!1),[C,w]=(0,s.useState)([]),S=f&&0===C.length,[k,P]=(0,s.useState)(x?[]:null);(0,s.useEffect)((()=>{(0,l.Z)(`/api/select/${h}`).then((e=>e.json())).then((e=>{var t,n;p&&P(x?null===(t=e.options)||void 0===t?void 0:t.filter((e=>{let{id:t}=e;return p.indexOf(t)>-1})):null===(n=e.options)||void 0===n?void 0:n.filter((e=>{let{id:t}=e;return t===p}))[0]);w(e.options)})).catch(console.log)}),[]);const R={};return b&&(R.filterOptions=e=>e),(0,d.jsx)(i.Z,{name:t,multiple:x,disabled:Z,filterSelectedOptions:v,id:c,open:f,onOpen:()=>y(!0),onClose:()=>y(!1),getOptionLabel:e=>null===e||void 0===e?void 0:e.label,options:C,loading:S,onBlur:()=>{const e=x?k&&k.map((e=>{let{id:t}=e;return t})):null===k||void 0===k?void 0:k.id;g&&g({target:{name:t,value:e}})},value:k,onChange:(e,n)=>{P(n);const i=x?null===n||void 0===n?void 0:n.map((e=>{let{id:t}=e;return t})):null===n||void 0===n?void 0:n.id;m&&m({target:{name:t,value:i}},i)},renderInput:e=>(0,d.jsx)(a.Z,{required:n,id:`input-${c}`,name:`input-${c}`,...e,label:u,helperText:j,InputProps:{...e.InputProps,endAdornment:(0,d.jsxs)(r.Z,{children:[S?(0,d.jsx)(o.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})}}),...R})}},47047:(e,t,n)=>{n.d(t,{Z:()=>P});var i=n(63366),a=n(87462),r=n(72791),o=n(59278),s=n(52554),l=n(94419);function d(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function h(e){return parseFloat(e)}var c=n(12065),u=n(66934),m=n(61020),g=n(75878),p=n(21217);function x(e){return(0,p.ZP)("MuiSkeleton",e)}(0,g.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var v=n(80184);const Z=["animation","className","component","height","style","variant","width"];let j,b,f,y,C=e=>e;const w=(0,s.F4)(j||(j=C`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),S=(0,s.F4)(b||(b=C`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),k=(0,u.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!1!==n.animation&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})((e=>{let{theme:t,ownerState:n}=e;const i=d(t.shape.borderRadius)||"px",r=h(t.shape.borderRadius);return(0,a.Z)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,c.Fq)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===n.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${i}/${Math.round(r/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===n.variant&&{borderRadius:"50%"},"rounded"===n.variant&&{borderRadius:(t.vars||t).shape.borderRadius},n.hasChildren&&{"& > *":{visibility:"hidden"}},n.hasChildren&&!n.width&&{maxWidth:"fit-content"},n.hasChildren&&!n.height&&{height:"auto"})}),(e=>{let{ownerState:t}=e;return"pulse"===t.animation&&(0,s.iv)(f||(f=C`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),w)}),(e=>{let{ownerState:t,theme:n}=e;return"wave"===t.animation&&(0,s.iv)(y||(y=C`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),S,(n.vars||n).palette.action.hover)})),P=r.forwardRef((function(e,t){const n=(0,m.i)({props:e,name:"MuiSkeleton"}),{animation:r="pulse",className:s,component:d="span",height:h,style:c,variant:u="text",width:g}=n,p=(0,i.Z)(n,Z),j=(0,a.Z)({},n,{animation:r,component:d,variant:u,hasChildren:Boolean(p.children)}),b=(e=>{const{classes:t,variant:n,animation:i,hasChildren:a,width:r,height:o}=e,s={root:["root",n,i,a&&"withChildren",a&&!r&&"fitContent",a&&!o&&"heightAuto"]};return(0,l.Z)(s,x,t)})(j);return(0,v.jsx)(k,(0,a.Z)({as:d,ref:t,className:(0,o.Z)(b.root,s),ownerState:j},p,{style:(0,a.Z)({width:g,height:h},c)}))}))}}]);
//# sourceMappingURL=4112.974c6138.chunk.js.map