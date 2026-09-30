var je=Object.defineProperty;var We=Object.getOwnPropertyDescriptor;var y=(d,s,e,t)=>{for(var a=t>1?void 0:t?We(s,e):s,i=d.length-1,r;i>=0;i--)(r=d[i])&&(a=(t?r(s,e,a):r(a))||a);return t&&a&&je(s,e,a),a};var J=globalThis,ee=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),ye=new WeakMap,H=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(ee&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=ye.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&ye.set(e,s))}return s}toString(){return this.cssText}},$e=d=>new H(typeof d=="string"?d:d+"",void 0,re),j=(d,...s)=>{let e=d.length===1?d[0]:s.reduce((t,a,i)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+d[i+1],d[0]);return new H(e,d,re)},xe=(d,s)=>{if(ee)d.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),a=J.litNonce;a!==void 0&&t.setAttribute("nonce",a),t.textContent=e.cssText,d.appendChild(t)}},ne=ee?d=>d:d=>d instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return $e(e)})(d):d;var{is:Ie,defineProperty:Ve,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:qe,getOwnPropertySymbols:Ge,getPrototypeOf:Ye}=Object,te=globalThis,we=te.trustedTypes,Ze=we?we.emptyScript:"",Xe=te.reactiveElementPolyfillSupport,W=(d,s)=>d,I={toAttribute(d,s){switch(s){case Boolean:d=d?Ze:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,s){let e=d;switch(s){case Boolean:e=d!==null;break;case Number:e=d===null?null:Number(d);break;case Object:case Array:try{e=JSON.parse(d)}catch{e=null}}return e}},ae=(d,s)=>!Ie(d,s),ke={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=ke){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),a=this.getPropertyDescriptor(s,t,e);a!==void 0&&Ve(this.prototype,s,a)}}static getPropertyDescriptor(s,e,t){let{get:a,set:i}=Ke(this.prototype,s)??{get(){return this[e]},set(r){this[e]=r}};return{get:a,set(r){let l=a?.call(this);i?.call(this,r),this.requestUpdate(s,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??ke}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let s=Ye(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,t=[...qe(e),...Ge(e)];for(let a of t)this.createProperty(a,e[a])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let a=this._$Eu(e,t);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let a of t)e.unshift(ne(a))}else s!==void 0&&e.push(ne(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),a=this.constructor._$Eu(s,t);if(a!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:I).toAttribute(e,t.type);this._$Em=s,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(s,e){let t=this.constructor,a=t._$Eh.get(s);if(a!==void 0&&this._$Em!==a){let i=t.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:I;this._$Em=a;let l=r.fromAttribute(e,i.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(s,e,t,a=!1,i){if(s!==void 0){let r=this.constructor;if(a===!1&&(i=this[s]),t??=r.getPropertyOptions(s),!((t.hasChanged??ae)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(s)&&!this.hasAttribute(r._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:a,wrapped:i},r){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,r??e??this[s]),i!==!0||r!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),a===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[a,i]of t){let{wrapped:r}=i,l=this[a];r!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,i,l)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[W("elementProperties")]=new Map,C[W("finalized")]=new Map,Xe?.({ReactiveElement:C}),(te.reactiveElementVersions??=[]).push("2.1.2");var ue=globalThis,Se=d=>d,se=ue.trustedTypes,Ee=se?se.createPolicy("lit-html",{createHTML:d=>d}):void 0,Pe="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,ze="?"+F,Qe=`<${ze}>`,z=document,K=()=>z.createComment(""),q=d=>d===null||typeof d!="object"&&typeof d!="function",me=Array.isArray,Je=d=>me(d)||typeof d?.[Symbol.iterator]=="function",oe=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ce=/>/g,R=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Fe=/"/g,Le=/^(?:script|style|textarea|title)$/i,ge=d=>(s,...e)=>({_$litType$:d,strings:s,values:e}),n=ge(1),M=ge(2),mt=ge(3),L=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Re=new WeakMap,P=z.createTreeWalker(z,129);function Te(d,s){if(!me(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(s):s}var et=(d,s)=>{let e=d.length-1,t=[],a,i=s===2?"<svg>":s===3?"<math>":"",r=V;for(let l=0;l<e;l++){let o=d[l],p,g,u=-1,f=0;for(;f<o.length&&(r.lastIndex=f,g=r.exec(o),g!==null);)f=r.lastIndex,r===V?g[1]==="!--"?r=Ae:g[1]!==void 0?r=Ce:g[2]!==void 0?(Le.test(g[2])&&(a=RegExp("</"+g[2],"g")),r=R):g[3]!==void 0&&(r=R):r===R?g[0]===">"?(r=a??V,u=-1):g[1]===void 0?u=-2:(u=r.lastIndex-g[2].length,p=g[1],r=g[3]===void 0?R:g[3]==='"'?Fe:Me):r===Fe||r===Me?r=R:r===Ae||r===Ce?r=V:(r=R,a=void 0);let b=r===R&&d[l+1].startsWith("/>")?" ":"";i+=r===V?o+Qe:u>=0?(t.push(p),o.slice(0,u)+Pe+o.slice(u)+F+b):o+F+(u===-2?l:b)}return[Te(d,i+(d[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},G=class d{constructor({strings:s,_$litType$:e},t){let a;this.parts=[];let i=0,r=0,l=s.length-1,o=this.parts,[p,g]=et(s,e);if(this.el=d.createElement(p,t),P.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=P.nextNode())!==null&&o.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Pe)){let f=g[r++],b=a.getAttribute(u).split(F),v=/([.?@])?(.*)/.exec(f);o.push({type:1,index:i,name:v[2],strings:b,ctor:v[1]==="."?ce:v[1]==="?"?de:v[1]==="@"?pe:B}),a.removeAttribute(u)}else u.startsWith(F)&&(o.push({type:6,index:i}),a.removeAttribute(u));if(Le.test(a.tagName)){let u=a.textContent.split(F),f=u.length-1;if(f>0){a.textContent=se?se.emptyScript:"";for(let b=0;b<f;b++)a.append(u[b],K()),P.nextNode(),o.push({type:2,index:++i});a.append(u[f],K())}}}else if(a.nodeType===8)if(a.data===ze)o.push({type:2,index:i});else{let u=-1;for(;(u=a.data.indexOf(F,u+1))!==-1;)o.push({type:7,index:i}),u+=F.length-1}i++}}static createElement(s,e){let t=z.createElement("template");return t.innerHTML=s,t}};function D(d,s,e=d,t){if(s===L)return s;let a=t!==void 0?e._$Co?.[t]:e._$Cl,i=q(s)?void 0:s._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(d),a._$AT(d,e,t)),t!==void 0?(e._$Co??=[])[t]=a:e._$Cl=a),a!==void 0&&(s=D(d,a._$AS(d,s.values),a,t)),s}var le=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,a=(s?.creationScope??z).importNode(e,!0);P.currentNode=a;let i=P.nextNode(),r=0,l=0,o=t[0];for(;o!==void 0;){if(r===o.index){let p;o.type===2?p=new Y(i,i.nextSibling,this,s):o.type===1?p=new o.ctor(i,o.name,o.strings,this,s):o.type===6&&(p=new he(i,this,s)),this._$AV.push(p),o=t[++l]}r!==o?.index&&(i=P.nextNode(),r++)}return P.currentNode=z,a}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},Y=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,a){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=D(this,s,e),q(s)?s===c||s==null||s===""?(this._$AH!==c&&this._$AR(),this._$AH=c):s!==this._$AH&&s!==L&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Je(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==c&&q(this._$AH)?this._$AA.nextSibling.data=s:this.T(z.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,a=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=G.createElement(Te(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===a)this._$AH.p(e);else{let i=new le(a,this),r=i.u(this.options);i.p(e),this.T(r),this._$AH=i}}_$AC(s){let e=Re.get(s.strings);return e===void 0&&Re.set(s.strings,e=new G(s)),e}k(s){me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,a=0;for(let i of s)a===e.length?e.push(t=new d(this.O(K()),this.O(K()),this,this.options)):t=e[a],t._$AI(i),a++;a<e.length&&(this._$AR(t&&t._$AB.nextSibling,a),e.length=a)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=Se(s).nextSibling;Se(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,a,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=s,this.name=e,this._$AM=a,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=c}_$AI(s,e=this,t,a){let i=this.strings,r=!1;if(i===void 0)s=D(this,s,e,0),r=!q(s)||s!==this._$AH&&s!==L,r&&(this._$AH=s);else{let l=s,o,p;for(s=i[0],o=0;o<i.length-1;o++)p=D(this,l[t+o],e,o),p===L&&(p=this._$AH[o]),r||=!q(p)||p!==this._$AH[o],p===c?s=c:s!==c&&(s+=(p??"")+i[o+1]),this._$AH[o]=p}r&&!a&&this.j(s)}j(s){s===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},ce=class extends B{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===c?void 0:s}},de=class extends B{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==c)}},pe=class extends B{constructor(s,e,t,a,i){super(s,e,t,a,i),this.type=5}_$AI(s,e=this){if((s=D(this,s,e,0)??c)===L)return;let t=this._$AH,a=s===c&&t!==c||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,i=s!==c&&(t===c||a);a&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},he=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){D(this,s)}};var tt=ue.litHtmlPolyfillSupport;tt?.(G,Y),(ue.litHtmlVersions??=[]).push("3.3.3");var De=(d,s,e)=>{let t=e?.renderBefore??s,a=t._$litPart$;if(a===void 0){let i=e?.renderBefore??null;t._$litPart$=a=new Y(s.insertBefore(K(),i),i,void 0,e??{})}return a._$AI(d),a};var be=globalThis,A=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};A._$litElement$=!0,A.finalized=!0,be.litElementHydrateSupport?.({LitElement:A});var at=be.litElementPolyfillSupport;at?.({LitElement:A});(be.litElementVersions??=[]).push("4.2.2");var st={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:ae},it=(d=st,s,e)=>{let{kind:t,metadata:a}=e,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),t==="setter"&&((d=Object.create(d)).wrapped=!0),i.set(e.name,d),t==="accessor"){let{name:r}=e;return{set(l){let o=s.get.call(this);s.set.call(this,l),this.requestUpdate(r,o,d,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,d,l),l}}}if(t==="setter"){let{name:r}=e;return function(l){let o=this[r];s.call(this,l),this.requestUpdate(r,o,d,!0,l)}}throw Error("Unsupported decorator location: "+t)};function O(d){return(s,e)=>typeof e=="object"?it(d,s,e):((t,a,i)=>{let r=a.hasOwnProperty(i);return a.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(a,i):void 0})(d,s,e)}function x(d){return O({...d,state:!0,attribute:!1})}var Be=j`
  :host {
    display: block;
    box-sizing: border-box;
    --card-radius: var(--bubble-border-radius, var(--ha-card-border-radius, 16px));
    --card-bg: var(--bubble-main-background-color, var(--ha-card-background, var(--card-background-color, #131926)));
    --card-border: var(--bubble-border, var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.12))));
    --accent: var(--bubble-accent-color, var(--accent-color, var(--primary-color, #00E5FF)));
    --sub-btn-bg: var(--bubble-icon-background-color, rgba(255, 255, 255, 0.08));
    --pill-radius: 32px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  ha-card {
    display: block;
    background: var(--card-bg);
    border-radius: var(--card-radius);
    border: var(--card-border);
    padding: 16px;
    box-shadow: var(--ha-card-box-shadow, none);
    color: var(--primary-text-color, #ffffff);
    font-family: var(--ha-card-font-family, var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif));
    position: relative;
    overflow: hidden;
    backdrop-filter: var(--ha-card-backdrop-filter, blur(8px));
  }

  /* Header Section */
  .fa-header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 12px;
    margin: 0 0 12px;
    padding: 0;
  }

  .player-info { min-width: 0; }

  .name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .name-row h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-ranks { display: inline-flex; gap: 4px; flex-shrink: 0; }

  .season-bar {
    height: 3px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    margin: -4px 0 14px;
    overflow: hidden;
  }

  .season-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #7928CA);
  }

  .player-avatar {
    width: 44px;
    height: 44px;
    border-radius: var(--pill-radius);
    background: linear-gradient(135deg, var(--accent) 0%, #7928CA 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .player-info h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .player-meta {
    font-size: 12px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.65));
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .level-badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    font-weight: 600;
    color: var(--accent);
  }

  /* Status Pills */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: var(--pill-radius);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.4px;
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-pill.live {
    background: rgba(0, 229, 255, 0.15);
    border-color: rgba(0, 229, 255, 0.4);
    color: var(--accent);
  }

  .status-pill.idle {
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00E5FF;
    box-shadow: 0 0 10px #00E5FF;
    animation: pulse 1.8s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7); }
    70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(0, 229, 255, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
  }

  /* Bubble Sub-Buttons Bar */
  .sub-button-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    padding-bottom: 4px;
  }

  .bubble-sub-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 36px;
    padding: 0 14px;
    border-radius: var(--pill-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--primary-text-color, #ffffff);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    white-space: nowrap;
  }

  .bubble-sub-button:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
  }

  .bubble-sub-button.active {
    background: rgba(0, 229, 255, 0.2);
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Metric KPI Chips Row */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .kpi-chip {
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.2s ease;
  }

  .kpi-chip:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
  }

  .kpi-label {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    font-weight: 600;
    margin-bottom: 4px;
  }

  .kpi-value {
    font-size: 18px;
    font-weight: 800;
    color: var(--primary-text-color, #ffffff);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .kpi-value.gold {
    color: #FFD700;
  }

  .kpi-value.cyan {
    color: var(--accent);
  }

  .kpi-value.positive {
    color: #10B981;
  }

  .kpi-value.negative {
    color: #EF4444;
  }

  /* Rank Progression Card */
  .rank-section {
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 14px 16px;
    margin-bottom: 16px;
  }

  .rank-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .rank-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .rank-name {
    font-size: 14px;
    font-weight: 700;
    color: #FFD700;
  }

  .progress-bar-bg {
    width: 100%;
    height: 8px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: var(--pill-radius);
    background: linear-gradient(90deg, var(--accent) 0%, #FFD700 100%);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rank-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  /* Match Timeline Feed */
  .match-feed-header {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .match-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .match-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 10px 14px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .match-row,
  .event-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .match-card:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .match-card.victory {
    background: rgba(255, 215, 0, 0.08);
    border-color: rgba(255, 215, 0, 0.35);
  }

  .match-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .match-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .match-num {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
  }

  .placement-badge {
    font-size: 12px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.1);
  }

  .placement-badge.win {
    background: #FFD700;
    color: #000000;
  }

  .match-mode {
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  .match-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .kills-badge {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .rank-delta-badge {
    font-size: 11px;
    font-weight: 600;
  }

  .rank-delta-badge.pos { color: #10B981; }
  .rank-delta-badge.neg { color: #EF4444; }

  /* Mode Filter Tabs */
  .mode-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
  }

  .mode-tab {
    padding: 4px 12px;
    border-radius: var(--pill-radius);
    font-size: 12px;
    font-weight: 600;
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .mode-tab.active {
    background: rgba(0, 229, 255, 0.2);
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Responsive Multi-Column for Tablets (Fire HD 10 Landscape) */
  @media (min-width: 768px) {
    .tablet-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }


  .empty {
    padding: 20px 12px;
    text-align: center;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.65));
  }

  .empty small { opacity: 0.7; }
  .muted { font-size: 11px; font-weight: 500; text-transform: none; opacity: 0.7; }
  .tracking-live { color: var(--accent); font-size: 11px; }

  .player-avatar.has-image {
    background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.25), transparent 70%),
      linear-gradient(135deg, var(--accent) 0%, #7928CA 100%);
    overflow: hidden;
  }

  [hidden] { display: none !important; }

  .player-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .player-meta { flex-wrap: wrap; }

  .platforms {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }

  .platform-chip {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .tab-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
  .tab-rows .mode-tabs { margin-bottom: 0; }
  .mode-tabs { flex-wrap: wrap; }
  .kpi-row.secondary .kpi-value { font-size: 15px; }

  .feature-card {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    border-radius: var(--card-radius);
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: var(--sub-btn-bg);
    overflow: hidden;
    min-height: 76px;
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    padding: 12px 0 12px 16px;
    min-width: 0;
  }

  /* 16:9 artwork shown whole on the right, anchored to the top so heads are never cropped */
  .feature-art {
    width: 42%;
    max-width: 180px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center top;
    align-self: center;
    flex-shrink: 0;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22%);
    mask-image: linear-gradient(90deg, transparent 0, #000 22%);
  }

  .feature-icon {
    --mdc-icon-size: 40px;
    align-self: center;
    margin-right: 18px;
    opacity: 0.85;
  }

  .feature-card.no-art.art-reload { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(255, 94, 58, 0.35)); }
  .feature-card.no-art.art-zero_build { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(0, 229, 255, 0.3)); }
  .feature-card.no-art.art-build { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(168, 85, 247, 0.35)); }

  .feature-label { font-size: 11px; text-transform: uppercase; font-weight: 600; opacity: 0.75; }
  .feature-value { font-size: 17px; font-weight: 800; }
  .feature-sub { font-size: 12px; opacity: 0.8; }

  .split-section { margin-bottom: 16px; }

  .section-title {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    margin-bottom: 6px;
  }

  .split-bar {
    display: flex;
    height: 8px;
    border-radius: var(--pill-radius);
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
  }

  .seg-0 { background: var(--accent); }
  .seg-1 { background: #A855F7; }
  .seg-2 { background: #F59E0B; }

  .split-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    margin-top: 6px;
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .size-table {
    display: grid;
    gap: 4px;
    margin-bottom: 16px;
    font-size: 12px;
  }

  .size-row {
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr 1fr;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  .size-name { font-weight: 700; }

  .match-art,
  .event-art {
    width: 56px;
    height: 36px;
    border-radius: 8px;
    object-fit: cover;
    object-position: center top;
    flex-shrink: 0;
  }

  .event-art { width: 44px; height: 44px; }

  .match-card .match-left,
  .event-card .match-left { flex: 1; min-width: 0; }

  .event-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 10px 14px;
    cursor: pointer;
  }

  .chevron { --mdc-icon-size: 18px; opacity: 0.5; flex-shrink: 0; }

  /* ---- Tier badges ---- */
  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  }

  .rank-badge.unranked {
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .rank-title { display: inline-flex; align-items: center; gap: 8px; }

  .unreal-position {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin: 2px 0;
  }

  .unreal-number {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.5px;
    background: linear-gradient(90deg, #FF9BD2, #A855F7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ---- Buttons: live badge ---- */
  .bubble-sub-button { position: relative; }

  .notify-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    box-sizing: border-box;
    border-radius: 9px;
    background: #EF4444;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    line-height: 18px;
    text-align: center;
    box-shadow: 0 0 0 2px var(--card-bg, #131926);
  }

  /* ---- Expanded match / event details ---- */
  .match-details,
  .event-details {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    cursor: default;
  }

  .detail-art,
  .event-hero {
    width: 100%;
    max-height: 170px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center top;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .detail-desc { font-size: 12px; line-height: 1.45; margin: 4px 0 8px; opacity: 0.85; }
  .detail-sub { font-weight: 700; font-size: 13px; }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 6px;
  }

  .detail,
  .detail-line {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
  }

  .detail span,
  .detail-line span { opacity: 0.7; }

  .detail-line { margin-bottom: 4px; }

  /* ---- Events ---- */
  .event-filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;
    margin-bottom: 12px;
  }

  .filter-select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 6px 26px 6px 12px;
    border-radius: var(--pill-radius);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--sub-btn-bg) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E") no-repeat right 10px center;
    color: var(--primary-text-color, #fff);
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .filter-select option { color: #000; }

  .match-list.events { max-height: 520px; }

  .tag-row { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }

  .tag {
    font-size: 10px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.07);
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .match-mode.soon { color: var(--accent); }

  .window-list { display: grid; gap: 6px; margin-top: 4px; }

  .window-row {
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  .window-row.live { box-shadow: inset 3px 0 0 #FFD700; }
  .window-row.finished { opacity: 0.8; }

  .window-main {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }

  .window-label { font-weight: 700; }
  .window-time { opacity: 0.8; }
  .window-status.live { color: #FFD700; font-weight: 700; }
  .window-status.upcoming { color: var(--accent); }

  .mini-button {
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: var(--pill-radius);
    border: 1px solid var(--accent);
    background: transparent;
    color: var(--accent);
    cursor: pointer;
  }

  .leaderboard { margin-top: 8px; display: grid; gap: 3px; }

  .lb-row {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) auto;
    grid-template-areas: "rank names points" "rank extra extra";
    column-gap: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.03);
  }

  .lb-row.you { background: rgba(0, 229, 255, 0.14); border: 1px solid var(--accent); }
  .lb-rank { grid-area: rank; font-weight: 800; align-self: center; }
  .lb-names { grid-area: names; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-points { grid-area: points; font-weight: 700; color: #FFD700; }
  .lb-extra { grid-area: extra; font-size: 10px; opacity: 0.65; }
  .lb-note { font-size: 11px; opacity: 0.7; padding: 4px 2px; }

  .event-card.live { border-color: rgba(255, 215, 0, 0.45); }
  .event-card.expanded,
  .match-card.expanded { background: rgba(255, 255, 255, 0.07); }
  .event-name { font-weight: 700; font-size: 13px; }

  /* ---- Theme: Cyber Fortnite (neon, high energy) ---- */
  ha-card.theme-cyber_fortnite {
    --accent: #00E5FF;
    --sub-btn-bg: rgba(121, 40, 202, 0.18);
    background: radial-gradient(120% 80% at 0% 0%, rgba(121, 40, 202, 0.55), transparent 60%),
      radial-gradient(120% 80% at 100% 100%, rgba(0, 229, 255, 0.28), transparent 60%),
      #0b0f1f;
    border: 1px solid rgba(0, 229, 255, 0.35);
    box-shadow: 0 0 24px rgba(121, 40, 202, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    color: #ffffff;
  }

  ha-card.theme-cyber_fortnite .player-info h2 {
    font-style: italic;
    letter-spacing: 1px;
    text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
  }

  ha-card.theme-cyber_fortnite .kpi-chip,
  ha-card.theme-cyber_fortnite .rank-section,
  ha-card.theme-cyber_fortnite .match-card,
  ha-card.theme-cyber_fortnite .event-card {
    border-color: rgba(0, 229, 255, 0.18);
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  ha-card.theme-cyber_fortnite .kpi-value { text-shadow: 0 0 10px rgba(0, 229, 255, 0.35); }

  ha-card.theme-cyber_fortnite .progress-bar-fill {
    background: linear-gradient(90deg, #7928CA 0%, #00E5FF 60%, #FFD700 100%);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
  }

  /* ---- Theme: Minimal (flat, quiet) ---- */
  ha-card.theme-minimal {
    --sub-btn-bg: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }

  ha-card.theme-minimal .kpi-chip,
  ha-card.theme-minimal .rank-section,
  ha-card.theme-minimal .match-card,
  ha-card.theme-minimal .event-card,
  ha-card.theme-minimal .feature-card {
    border: none;
    border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  ha-card.theme-minimal .kpi-chip:hover,
  ha-card.theme-minimal .bubble-sub-button:hover { transform: none; }

  ha-card.theme-minimal .player-avatar { box-shadow: none; }
  ha-card.theme-minimal .kpi-value.gold,
  ha-card.theme-minimal .rank-name { color: var(--primary-text-color) !important; }
  ha-card.theme-minimal .progress-bar-fill { background: var(--accent); }

  /* ---- Compact mode: small buttons, inline stat strip ---- */
  ha-card.compact { padding: 12px; }
  ha-card.compact .fa-header { margin-bottom: 10px; }
  ha-card.compact .player-avatar { width: 34px; height: 34px; font-size: 14px; }
  ha-card.compact .player-info h2 { font-size: 15px; }
  ha-card.compact .platforms { display: none; }

  ha-card.compact .sub-button-row { gap: 6px; margin-bottom: 10px; }

  ha-card.compact .bubble-sub-button {
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    gap: 4px;
    --mdc-icon-size: 18px;
  }

  ha-card.compact .bubble-sub-button:not(.active) .btn-label { display: none; }

  ha-card.compact .kpi-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 6px;
    margin-bottom: 10px;
  }

  ha-card.compact .kpi-chip {
    flex-direction: row;
    align-items: baseline;
    gap: 5px;
    padding: 4px 10px;
    border-radius: var(--pill-radius);
  }

  ha-card.compact .kpi-label { margin: 0; font-size: 10px; }
  ha-card.compact .kpi-value,
  ha-card.compact .kpi-row.secondary .kpi-value { font-size: 13px; }
  ha-card.compact .rank-section { padding: 8px 12px; margin-bottom: 10px; }
  ha-card.compact .feature-card { min-height: 56px; margin-bottom: 10px; }
  ha-card.compact .feature-value { font-size: 14px; }
  ha-card.compact .size-table,
  ha-card.compact .split-section { margin-bottom: 10px; }
  ha-card.compact .match-card,
  ha-card.compact .event-card { padding: 7px 10px; }
  ha-card.compact .mode-tab { padding: 3px 10px; font-size: 11px; }
  ha-card.compact .unreal-number { font-size: 18px; }

  /* ---- Compact stats table ---- */
  .stat-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 12px;
    table-layout: fixed;
  }

  .stat-table tr + tr th,
  .stat-table tr + tr td { border-top: 1px solid rgba(255, 255, 255, 0.06); }

  .stat-table th {
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    padding: 5px 6px 5px 0;
    width: 28%;
  }

  .stat-table td.kpi-value {
    display: table-cell;
    text-align: right;
    font-size: 13px;
    padding: 5px 12px 5px 0;
    width: 22%;
  }

  .secondary .stat-table { margin-top: -4px; }

  /* ---- Filters reset & show more ---- */
  .filter-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: var(--pill-radius);
    border: 1px solid rgba(239, 68, 68, 0.5);
    background: rgba(239, 68, 68, 0.12);
    color: #FCA5A5;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    --mdc-icon-size: 16px;
  }

  .show-more { align-self: center; margin: 4px auto 0; }

  /* ---- Sprites ---- */
  .sprite-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
    gap: 8px;
    margin-top: 10px;
  }

  .sprite-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 6px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
    box-shadow: inset 0 -18px 24px -18px color-mix(in srgb, var(--rarity) 60%, transparent);
    text-align: center;
  }

  .sprite-card.missing { opacity: 0.4; filter: grayscale(0.8); }
  .sprite-card img { width: 56px; height: 56px; object-fit: contain; }
  .sprite-card ha-icon { --mdc-icon-size: 40px; color: var(--rarity); }
  .sprite-name { font-size: 11px; font-weight: 700; line-height: 1.2; }
  .sprite-dots { display: flex; gap: 3px; }
  .sprite-dots .dot { width: 6px; height: 6px; margin: 0; background: rgba(255, 255, 255, 0.2); }
  .sprite-dots .dot.owned { background: var(--rarity); }
  .sprite-dots .dot.mastered { box-shadow: 0 0 0 1.5px #FFD700; }

  .power-ranking .rank-title ha-icon { --mdc-icon-size: 22px; color: #FFD700; }
  .power-ranking .unreal-number { font-size: 18px; }

  .notice {
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    margin-bottom: 12px;
  }

  .sprite-summary { display: flex; gap: 12px; align-items: center; }
  .sprite-summary-main { flex: 1; min-width: 0; }
  .equipped-icon { width: 64px; height: 64px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5)); }
  .currency { margin: 6px 0 4px; }
  .sprite-card { cursor: pointer; }
  .sprite-card.open { outline: 2px solid var(--rarity); }

  .sprite-detail {
    grid-column: 1 / -1;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid color-mix(in srgb, var(--rarity) 45%, transparent);
  }

  .sprite-detail-head { display: flex; gap: 12px; align-items: flex-start; }
  .sprite-detail-head img { width: 72px; height: 72px; object-fit: contain; flex-shrink: 0; }
  .hint { color: var(--accent); }
  .variant-list { display: grid; gap: 4px; margin-top: 8px; }

  .variant-row {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) auto auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
  }

  .variant-row img { width: 32px; height: 32px; object-fit: contain; }
  .variant-row.missing { opacity: 0.5; }
  .variant-name { font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ---- Sprites v2 ---- */
  .sprite-ring {
    --size: 64px;
    width: var(--size);
    height: var(--size);
    flex-shrink: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: conic-gradient(var(--accent) calc(var(--pct) * 1%), rgba(255, 255, 255, 0.1) 0);
    position: relative;
  }

  .sprite-ring::before {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: var(--card-bg, #131926);
  }

  .sprite-ring span { position: relative; font-weight: 800; font-size: 15px; }

  .sprite-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: 12px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .sprite-stats b { color: var(--primary-text-color, #fff); }

  .version-row {
    display: grid;
    grid-template-columns: 78px 1fr 58px;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    margin-top: 4px;
    opacity: 0.75;
  }

  .version-row.current { opacity: 1; font-weight: 700; }
  .version-row .progress-bar-bg { height: 6px; }
  .version-row span:last-child { text-align: right; }

  .hunt-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }

  .hunt-item {
    flex: 0 0 auto;
    width: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 4px;
    border-radius: 10px;
    border: 1px dashed color-mix(in srgb, var(--rarity) 60%, transparent);
    background: rgba(255, 255, 255, 0.03);
    font-size: 10px;
    text-align: center;
    cursor: pointer;
  }

  .hunt-item img { width: 40px; height: 40px; object-fit: contain; filter: grayscale(0.6) brightness(0.8); }
  .hunt-item small { color: var(--accent); font-weight: 700; }
  .sprite-count { font-size: 10px; opacity: 0.8; }
  .sprite-card.complete { box-shadow: inset 0 -18px 24px -18px color-mix(in srgb, var(--rarity) 60%, transparent), 0 0 0 1px #FFD700; }

  .variant-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 6px;
    margin-top: 10px;
  }

  .variant-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 4px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    text-align: center;
    font-size: 11px;
  }

  .variant-tile img { width: 48px; height: 48px; object-fit: contain; }
  .variant-tile.missing { opacity: 0.45; }
  .variant-tile.missing img { filter: grayscale(1); }
  .variant-tile.mastered { box-shadow: inset 0 0 0 1px #FFD700; }
  .variant-status { font-size: 10px; opacity: 0.85; }
  .boon-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  .rarity-tag { background: color-mix(in srgb, var(--rarity) 35%, transparent); color: #fff; }
  .perk-list { margin-top: 8px; }
  .perk-desc { font-size: 11px; opacity: 0.75; margin: -2px 0 6px 8px; }

  /* ---- Sprite mastery ---- */
  .master-list { display: grid; gap: 4px; }

  .master-row {
    display: grid;
    grid-template-columns: 28px minmax(0, 1.4fr) auto minmax(50px, 1fr) auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    border-left: 3px solid var(--rarity);
    cursor: pointer;
  }

  .master-row img { width: 28px; height: 28px; object-fit: contain; }
  .master-row .progress-bar-bg { height: 6px; }

  /* ---- Tournament badges ---- */
  .type-tag { background: rgba(0, 229, 255, 0.15); color: var(--accent); }
  .type-tag.fncs { background: linear-gradient(90deg, #7B2FF7, #F107A3); color: #fff; }
  .spectate-tag { background: rgba(16, 185, 129, 0.15); color: #6EE7B7; }
  .event-card.featured { border-color: rgba(241, 7, 163, 0.5); box-shadow: 0 0 0 1px rgba(123, 47, 247, 0.25); }
  .detail-line a { color: var(--accent); font-weight: 700; text-decoration: none; }

  /* ---- Other ranked tracks ---- */
  .track-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    margin-bottom: 3px;
  }

  /* ---- Trends ---- */
  .trend-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin-top: 12px; }

  .trend-card {
    padding: 10px 12px;
    border-radius: var(--card-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .trend-card .kpi-value { font-size: 16px; }
  .trend-svg { width: 100%; height: 90px; display: block; overflow: visible; }
  .trend-line { fill: none; stroke: var(--accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
  .trend-dot { fill: var(--accent); }
  .trend-hit { fill: transparent; }
  .trend-pt:hover .trend-dot { r: 4; }
  .trend-base { stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; vector-effect: non-scaling-stroke; }
  .kill-bar { fill: var(--accent); opacity: 0.85; }
  .win-mark { fill: #FFD700; font-size: 10px; }
  .collecting { font-size: 12px; opacity: 0.7; padding: 18px 0; text-align: center; }
`;var rt=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (e.g. Peely) \u2014 looked up in the cosmetics catalogue",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Stats when idle, Events tab)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"},{value:"events_only",label:"Tournaments / Events Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"show_tournaments",label:"Show Events (tournament schedule) tab",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],Z=class extends A{setConfig(s){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...s}}_valueChanged(s){if(!this._config||!this.hass)return;let e=s.target,t=s.detail?s.detail.value:e.value;this._config={...this._config,...t};let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?c:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${rt}
          .computeLabel=${s=>s.label||s.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=j`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};y([O({attribute:!1})],Z.prototype,"hass",2),y([x()],Z.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",Z);var nt="1.6.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var ot={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},U={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},X={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},Oe={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Ue=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],lt={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},fe={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},E=d=>{d.target.hidden=!0},Ne=d=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:d}),Q={at:0},T={at:0},ve=new Map,$=class extends A{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...fe};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._showAllPages=!1;this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Be}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...fe,...e},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...fe}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-T.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _eventsEnabled(){return this._config.show_tournaments!==!1||this._config.layout==="events_only"}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(t.states[a]!==this.hass.states[a])return!0;return!1}updated(e){if(super.updated(e),!this.hass)return;let t=e.has("hass")&&!e.get("hass");t&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(e.has("_config")||t)&&this._scheduleAvatar()}async _loadCatalog(){(!Q.promise||Date.now()-Q.at>36e5)&&(Q.at=Date.now(),Q.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let e=await Q.promise;this._catalog={season:e?.season,playlists:e?.playlists||{}}}async _loadEvents(e=!1){if(this.hass){(e||!T.promise||Date.now()-T.at>10*6e4)&&(T.at=Date.now(),T.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let t=await T.promise;this._events={list:t?.tournaments??null,defaultRegion:t?.default_region_group}}catch(t){T.promise=void 0,this._events={error:t?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let e=(this._config.avatar||"").trim();if(e!==this._avatarQuery){if(this._avatarQuery=e,window.clearTimeout(this._avatarTimer),e.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let t=e.toLowerCase();ve.has(t)||ve.set(t,this.hass.callWS({type:"fortnite_activity/cosmetic",query:e}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await ve.get(t);this._avatarQuery===e&&(this._avatar=a)},800)}}async _loadLeaderboard(e,t){let a=`${e}|${t}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:e,window_id:t,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.data!==void 0)){this._pass={loading:!0};try{let e=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:e?.battlepass??null}}catch(e){this._pass={error:e?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let e=Ue.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!e.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let t=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:e,period:i,types:["mean","min","max","state"]});try{let a=await t(30,"day"),i="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await t(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(e,t){!this.hass||this._matchLists[e]||(this._matchLists={...this._matchLists,[e]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...t}).then(a=>{this._matchLists={...this._matchLists,[e]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[e]:{error:a?.message||"Could not load matches"}}}))}_isRanked(e){return!!e.rank_delta_pct||!!e.unreal_rank_change||/habanero/i.test(e.playlist_id||"")}_findEntity(e,t){let a=this.hass?.states;if(!a)return;let i=this._player,r=`${i}:${e}:${t}`,l=this._entityCache.get(r);if(l&&a[l])return a[l];let o;for(let[p,g]of Object.entries(a))if(p.startsWith(`${e}.`)&&g.attributes?.fortnite_player_id===i&&g.attributes?.fortnite_entity_key===t){o=p;break}if(o||(o=[t,...ot[t]||[]].flatMap(u=>[`${e}.fortnite_${i}_${u}`,`${e}.fortnite_${i}_${i}_${u}`]).find(u=>a[u])),!!o)return this._entityCache.set(r,o),a[o]}async _callService(e,t={}){if(this.hass){this._loadingAction=e;try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t}),e==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${e}:`,a)}}}_setView(e){this._view=e,e==="events"&&this._loadEvents(),e==="trends"&&this._loadTrends(),e==="pass"&&this._loadPass()}_entityId(e,t){return this._findEntity(e,t)?.entity_id}_toggleEvent(e){if(this._expandedEvent===e.key){this._expandedEvent=null;return}this._expandedEvent=e.key;let t=e.windows.find(a=>this._windowState(a)==="live")||[...e.windows].reverse().find(a=>this._windowState(a)==="finished");t&&!this._leaderboards[`${e.event_id}|${t.window_id}`]&&this._loadLeaderboard(e.event_id,t.window_id)}_formatRelativeTime(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return"";let a=Math.max(1,Math.round((this._now-t.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),a=Math.round(e%60);return t>0?`${t}h ${a}m`:`${a}m`}_formatSpan(e){let t=Math.max(0,Math.round(e/6e4)),a=Math.floor(t/1440),i=Math.floor(t%1440/60),r=t%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}_formatWhen(e){try{return Ne(this.hass?.config?.time_zone).format(new Date(e)).replace(/\b(am|pm)\b/i,t=>t.toLowerCase())}catch{return Ne().format(new Date(e))}}_num(e,t=0){return Number(e||0).toLocaleString("en-GB",{maximumFractionDigits:t,minimumFractionDigits:0})}_playlist(e){return e?this._catalog.playlists[e.toLowerCase()]:void 0}_windowState(e){let t=Date.parse(e.begin),a=Date.parse(e.end);return this._now>=a?"finished":this._now>=t?"live":"upcoming"}_rankBadge(e,t=30){let a=e||"Unranked",i=Object.keys(U).find(u=>a.startsWith(u));if(!i)return n`<span class="rank-badge unranked" style="width:${t}px;height:${t}px">–</span>`;let[r,l]=U[i],o=(a.match(/\b(I{1,3})$/)||[])[1]||"",p=`g-${i}-${t}`;return n`<span class="rank-badge" title=${a} style="width:${t}px;height:${t}px">
      ${M`<svg viewBox="0 0 40 44" width=${t} height=${t} aria-hidden="true">
        <defs><linearGradient id=${p} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${l}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?M`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:M`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${o}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let e=this._player,t=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),l=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing"),p=this._findEntity("sensor","profile"),g=this._findEntity("sensor","sprites"),u=this._findEntity("sensor","power_ranking"),f=!!g&&!["unavailable","unknown"].includes(g.state);if(!t&&!a&&!o)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${e}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let b=o?.state==="on"||t?.state==="active",v=t?.attributes||{},h=a?.attributes||{},m=p?.attributes||{},k={...i?.attributes||{},current_rank:i?.state},_={...r?.attributes||{},current_rank:r?.state},S=this._config.layout||"auto",w=this._view??(b?"session":"stats");S==="session_only"?w="session":S==="career_only"?w="stats":S==="events_only"&&(w="events"),w==="events"&&!this._eventsEnabled&&(w="stats"),w==="sprites"&&!f&&(w="stats");let N="",_e={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};_e[this._config.theme_accent||""]&&(N+=`--accent: ${_e[this._config.theme_accent]};`),this._config.custom_background&&(N+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let He=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return n`
      <ha-card class=${He} style="${N}">
        ${this._renderHeader(e,b,v,h,m,l,k,_)}
        ${this._config.show_sub_buttons!==!1&&S!=="events_only"?this._renderButtons(w,b,f):c}
        ${w==="session"?this._renderSessionView(b,v,k):w==="events"?this._renderEventsView():w==="sprites"?this._renderSpritesView(g):w==="trends"?this._renderTrendsView():w==="pass"?this._renderPassView(l):this._renderStatsView(h,m,k,_,u)}
      </ha-card>
    `}_renderHeader(e,t,a,i,r,l,o,p){let g=r.display_name||e.charAt(0).toUpperCase()+e.slice(1),u=r.season||this._catalog.season,f=this._config.show_platforms!==!1?r.platforms||[]:[],b=i.metrics?.last_played,v=l?.attributes||{},h=Number(l?.state)||0,m=Number(v.account_level||0),k=this._avatar?.icon,_=this._config.compact?20:24;return n`
      <div class="fa-header">
        <div class="player-avatar ${k?"has-image":""}">
          ${k?n`<img src=${k} alt=${this._avatar?.name||""} @error=${E} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${g}</h2>
            <span class="header-ranks">
              ${o.current_rank&&o.current_rank!=="Unranked"?this._rankBadge(o.current_rank,_):c}
              ${p.current_rank&&p.current_rank!=="Unranked"?this._rankBadge(p.current_rank,_):c}
            </span>
          </div>
          <div class="player-meta">
            ${u?.number?n`<span class="level-badge">S${u.number} · ${u.days_left}d left</span>`:c}
            ${!this._config.hide_season_level&&h>0?n`<span class="level-badge">Lvl ${h}</span>`:c}
            ${!this._config.hide_account_level&&m>0?n`<span>Acct ${m.toLocaleString()}</span>`:c}
            ${b?.time&&!t?n`<span title=${b.name||""}>Played ${this._formatRelativeTime(b.time)}</span>`:c}
          </div>
          ${f.length?n`<div class="platforms">
                ${f.map(S=>n`<span class="platform-chip" title=${S.name||S.label}>${S.label}${S.name?n` · ${S.name}`:c}</span>`)}
              </div>`:c}
        </div>
        <div class="status-pill ${t?"live":"idle"}">
          ${t?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
      ${u?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${u.number}: ${u.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,u.progress_pct)}%"></div>
          </div>`:c}
    `}_liveEventCount(){let e=this._currentFilters();return(this._events.list||[]).filter(t=>this._matchesFilters(t,e)&&t.windows.some(a=>this._windowState(a)==="live")).length}_renderButtons(e,t,a=!1){let i=this._config.layout||"auto",r=this._eventsEnabled?this._liveEventCount():0,l=(o,p,g,u=0)=>n`
      <button class="bubble-sub-button ${e===o?"active":""}" @click=${()=>this._setView(o)} title=${g}>
        <ha-icon icon=${p}></ha-icon><span class="btn-label">${g}</span>
        ${u>0?n`<span class="notify-badge" title="${u} live">${u}</span>`:c}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${i!=="career_only"?l("session","mdi:lightning-bolt",t?"Live Session":"Last Session"):c}
        ${i!=="session_only"?l("stats","mdi:trophy-outline","Stats"):c}
        ${this._eventsEnabled&&i==="auto"?l("events","mdi:tournament","Events",r):c}
        ${a&&i==="auto"?l("sprites","mdi:ghost-outline","Sprites"):c}
        ${i==="auto"?l("trends","mdi:chart-line","Trends"):c}
        ${i==="auto"?l("pass","mdi:ticket-confirmation-outline","Pass"):c}
        ${t?n`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:n`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`}
        <button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
          <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
          <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
        </button>
      </div>
    `}_renderKpis(e){if(this._config.compact){let t=[];for(let a=0;a<e.length;a+=2)t.push(e.slice(a,a+2));return n`<table class="stat-table"><tbody>
        ${t.map(a=>n`<tr>
          ${a.map(([i,r,l])=>n`<th>${i}</th><td class="kpi-value ${l||""}">${r}</td>`)}
          ${a.length<2?n`<th></th><td></td>`:c}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${e.map(([t,a,i])=>n`<div class="kpi-chip"><span class="kpi-label">${t}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(e,t,a,i){let r=t.current_rank||"Unranked",l=Number(t.progress_pct||0),o=r.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${e}</span></span>
          <span class="rank-name" style="color: ${(U[Object.keys(U).find(p=>r.startsWith(p))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${o?n`<div class="unreal-position">
              <span class="unreal-number">${t.unreal_rank?`#${this._num(t.unreal_rank)}`:"Unreal"}</span>
              ${i?n`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:c}
            </div>`:this._config.hide_rank_progress?c:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,l))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${o?"Unreal leaderboard position":`${l}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(e,t,a){let i=Number(t.net_rank_delta_pct||0),r=b=>b>=0?`+${b}%`:`${b}%`,l=t.session_id,o=l?`session:${l}:${t.matches_played||0}`:"";o&&this._config.show_match_feed!==!1&&this._ensureMatches(o,{session_id:l});let g=(o?this._matchLists[o]?.matches:void 0)||t.recent_matches||[],u=g.filter(b=>this._isRanked(b)),f=u.filter(b=>b.rank_track===a.game_mode&&typeof b.unreal_rank_change=="number").reduce((b,v)=>b+(v.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",t.matches_played||0,"cyan"],["Wins",`${t.wins||0} \u{1F3C6}`,"gold"],["Kills",t.kills||0],["K/D",t.kd_ratio||0],...u.length?[["Rank Net",r(i),i>=0?"positive":"negative"]]:[]])}

      ${u.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${r(i)} this session`,f||null):c}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${t.matches_played||g.length} ${(t.matches_played||g.length)===1?"match":"matches"})</span>
              ${e?n`<span class="tracking-live">Tracking Live</span>`:c}
            </div>
            ${this._renderMatchList(o||"session",g,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:c}
    `}_renderMatchList(e,t,a){let i=this._config.max_feed_matches||10,r=this._showAllMatches[e],l=r?t:t.slice(0,i);return n`
      <div class="match-list">
        ${l.length?l.map(o=>this._renderMatch(o)):n`<div class="empty">${a}</div>`}
        ${t.length>i?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[e]:!r}}>
              ${r?"Show fewer":`Show all ${t.length}`}
            </button>`:c}
      </div>
    `}_renderMatch(e){let t=this._playlist(e.playlist_id),a=t?.image,i=`${e.timestamp}|${e.playlist_id}`,r=this._expandedMatch===i,l=(e.match_count||1)>1,o=this._isRanked(e),p=(g,u)=>u==null||u===""?c:n`<div class="detail"><span>${g}</span><b>${u}</b></div>`;return n`
      <div class="match-card ${e.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:i}>
        <div class="match-row">
          ${a?n`<img class="match-art" src=${a} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${e.match_number}${(e.match_count||1)>1?` \xD7${e.match_count}`:""}</span>
              <span class="placement-badge ${e.is_victory?"win":""}">${e.placement_text}</span>
            </div>
            <span class="match-mode">${e.mode_name} • ${this._formatRelativeTime(e.timestamp)}</span>
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${e.kills}</span>
            ${e.rank_delta_pct&&this._isRanked(e)?n`<span class="rank-delta-badge ${e.rank_delta_pct>=0?"pos":"neg"}">
                  ${e.rank_delta_pct>=0?`+${e.rank_delta_pct}%`:`${e.rank_delta_pct}%`}
                </span>`:c}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?n`<div class="match-details" @click=${g=>g.stopPropagation()}>
              ${a?n`<img class="detail-art" src=${a} alt="" @error=${E} />`:c}
              ${t?.description?n`<p class="detail-desc">${t.description}</p>`:c}
              <div class="detail-grid">
                ${p("Finished",this._formatWhen(e.timestamp))}
                ${p("Mode",e.mode_name)}
                ${p("Placement",e.placement_text)}
                ${p("Kills",e.kills)}
                ${l?p("Games",e.match_count):c}
                ${l&&e.wins?p("Victories",e.wins):c}
                ${p("Time played",e.minutes?this._formatDuration(e.minutes):void 0)}
                ${p("Score",e.score?this._num(e.score):void 0)}
                ${p("Players outlived",e.players_outlived?this._num(e.players_outlived):void 0)}
                ${o?n`
                      ${p("Ranked track",e.rank_track)}
                      ${p("Rank after",e.unreal_rank?`${e.current_rank} #${this._num(e.unreal_rank)}`:e.current_rank)}
                      ${p("Rank change",e.rank_delta_pct?`${e.rank_delta_pct>0?"+":""}${e.rank_delta_pct}%`:void 0)}
                      ${p("Unreal places",e.unreal_rank_change?`${e.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(e.unreal_rank_change))}`:void 0)}`:c}
              </div>
              ${(e.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:c}
            </div>`:c}
      </div>
    `}_renderStatsView(e,t,a,i,r){let l=t.windows||{},o=t.window_labels||{},p=["lifetime",...["season","week","today"].filter(w=>l[w])],g=p.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},f=e.metrics||{},b={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0,players_outlived:e.players_outlived||0,hours_played:f.hours_played,favourite_mode:f.favourite_mode,modes:e.modes||{}},v=g==="lifetime"?b:l[g],h=this._selectedMode!=="all"?v.modes?.[this._selectedMode]:null,m=h&&h.matches!==void 0?h:v,k=m.minutes!==void 0?Math.round(m.minutes/60*10)/10:v.hours_played,_=v.favourite_mode,S=(w,N)=>n`
      <button class="mode-tab ${this._selectedMode===w?"active":""}" @click=${()=>this._selectedMode=w}>${N}</button>
    `;return n`
      <div class="tab-rows">
        ${p.length>1?n`<div class="mode-tabs">
              ${p.map(w=>n`<button class="mode-tab ${g===w?"active":""}" title=${o[w]||""}
                  @click=${()=>this._window=w}>${u[w]}</button>`)}
            </div>`:c}
        <div class="mode-tabs">
          ${S("all","Overall")} ${S("zero_build","Zero Build")} ${S("build","Build")} ${S("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${m.win_rate||0}%`,"cyan"],["K/D",m.kd||0],["Wins",n`${this._num(m.wins)} 🏆`,"gold"],["Matches",this._num(m.matches)],["Kills",this._num(m.kills)],["Outlived",this._num(m.players_outlived)],["Kills/Match",m.matches?this._num(m.kills/m.matches,2):0],...k!==void 0?[["Hours",this._num(k,1)]]:[]])}

      ${g==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(e):c}
      ${_?this._renderFavourite(_,g!=="lifetime"?u[g]:""):c}
      ${g!=="lifetime"&&v?.since?this._renderWindowMatches(g,u[g],v):c}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
      ${this._renderOtherTracks(a)}
      ${r&&!["unavailable","unknown"].includes(r.state)?n`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(r.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(r.attributes?.points)} points${r.attributes?.counting_events!=null?` \xB7 ${r.attributes.counting_events} counting events`:""}</span>
              <span>${r.attributes?.peak_pr!=null?`Peak PR ${this._num(r.attributes.peak_pr)}`:"Competitive (tournaments)"}${r.attributes?.delta_pr?` \xB7 ${r.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(r.attributes.delta_pr))}`:""}</span></div>
          </div>`:c}
      ${t.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:c}
    `}_renderOtherTracks(e){let t=(e.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return t.length?n`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${t.map(a=>n`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(U[Object.keys(U).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:c}_lineChart(e,t,a){let o=e.map(_=>_.v),p=Math.min(...o),g=Math.max(...o),u=g-p||Math.abs(g)||1,f=e[0].t,b=e[e.length-1].t||f+1,v=_=>6+(_-f)/(b-f||1)*308,h=_=>84-(_-p)/u*78,m=e.map((_,S)=>`${S?"L":"M"}${v(_.t).toFixed(1)},${h(_.v).toFixed(1)}`).join(" "),k=_=>new Date(_).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return n`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${M`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${m}" class="trend-line"></path>
        ${e.map(_=>M`<g class="trend-pt"><circle cx="${v(_.t)}" cy="${h(_.v)}" r="7" class="trend-hit"></circle><circle cx="${v(_.t)}" cy="${h(_.v)}" r="2.5" class="trend-dot"></circle><title>${k(_.t)}: ${t(_.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let t=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!t.length)return n`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,r=4,l=Math.max(4,...t.map(p=>p.kills||0)),o=(a-2*r)/t.length;return n`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${M`${t.map((p,g)=>{let u=Math.max(2,(p.kills||0)/l*(i-14)),f=r+g*o+1;return M`<g><rect x="${f}" y="${i-u}" width="${Math.max(2,o-2)}" height="${u}" rx="2" class="kill-bar"></rect>
          ${p.is_victory?M`<text x="${f+(o-2)/2}" y="${i-u-3}" text-anchor="middle" class="win-mark">★</text>`:c}
          <rect x="${f-1}" y="0" width="${o}" height="${i}" fill="transparent"><title>${this._formatWhen(p.timestamp)} · ${p.mode_name}: ${p.kills} kills · ${p.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${l} kills</span></div>`}_renderTrendsView(){let e=this._trends,t=Ue.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return c;let r=((e.stats||{})[i]||[]).map(b=>({t:typeof b.start=="number"?b.start:Date.parse(b.start),v:b.mean??b.state??b.max})).filter(b=>typeof b.v=="number"),l=this.hass.states[i];if(!r.length&&(!l||["unavailable","unknown"].includes(l.state)))return c;let o=b=>`${this._num(b,a.digits||0)}${a.unit||""}`,p=r[0]?.v,g=r[r.length-1]?.v,u=r.length>1?g-p:null,f=u==null||u===0?"":u>0!=!!a.lowerBetter?"positive":"negative";return n`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${f}">${l&&!isNaN(Number(l.state))?o(Number(l.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,o,e.period||"day"):n`<div class="collecting">Collecting history — the chart fills in as Home Assistant records it.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${u>=0?"\u25B2":"\u25BC"} ${o(Math.abs(u))} over ${r.length} ${e.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return n`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${e.loading&&!e.stats?n`<div class="empty">Loading history…</div>`:c}
      ${e.error?n`<div class="empty">${e.error}</div>`:c}
      <div class="trend-grid">${t}</div>
    `}_renderPassView(e){let t=this._pass;if(t.loading||t.data===void 0)return n`<div class="empty">Loading Battle Pass…</div>`;if(t.error)return n`<div class="empty">${t.error}</div>`;if(!t.data)return n`<div class="empty">The Battle Pass catalogue is not available right now.</div>`;let a=t.data,i=Number(e?.state)||null,r=this._showAllPages?a.pages:a.pages.slice(0,3);return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title"><ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon><span>Season ${a.season} Battle Pass</span></span>
          ${i?n`<span class="rank-name">Level ${i}</span>`:c}
        </div>
        <div class="sprite-stats">
          <span><b>${a.reward_count}</b> rewards</span><span><b>${a.pages.length}</b> pages</span>
          ${a.prices.map(l=>n`<span>${l.name}: <b>${this._num(l.cost)}</b> ${l.currency==="MtxCurrency"?"V-Bucks":l.currency||""}</span>`)}
        </div>
        <div class="perk-desc">Which rewards you have claimed is not available from this data source.</div>
      </div>
      ${r.map(l=>n`
        <div class="section-title">Page ${l.page}${l.track?` \xB7 ${l.track}`:""}</div>
        <div class="variant-tiles">
          ${l.rewards.map(o=>n`
            <div class="variant-tile" style="--rarity:${X[o.rarity]||"#9CA3AF"}" title="${o.name}${o.type?` (${o.type})`:""}">
              ${o.icon?n`<img src=${o.icon} alt="" loading="lazy" @error=${E} />`:n`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
              <span class="variant-name">${o.name}</span>
              <span class="variant-status">${o.price_row==="Included"||o.cost===0?"Included":o.cost!=null?`${o.cost} ${o.currency||""}`:o.type||""}</span>
            </div>`)}
        </div>`)}
      ${a.pages.length>3?n`<button class="mini-button show-more" @click=${()=>this._showAllPages=!this._showAllPages}>
            ${this._showAllPages?"Show fewer pages":`Show all ${a.pages.length} pages`}</button>`:c}
    `}_spriteCurve(e){let t=[...e.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,r)=>i.level-r.level),a=[];for(let i of t){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(e,t){if(typeof e!="number"||!t.length)return null;let a=0;t.forEach(([,o],p)=>{e>=o&&(a=p)});let[i]=t[a],r=t[t.length-1],l=t[a+1];return{level:i,maxLevel:r[0],maxXp:r[1],next:l?l[1]:null,toMax:Math.max(0,r[1]-e),atMax:a===t.length-1}}_renderSpritesView(e){let t=e?.attributes||{},a=this._spriteCurve(t),i=t.families||[],r=Number(e?.state||0),l=Number(t.owned_variants||0),o=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],g=[...i.filter(h=>this._spriteFilter==="missing"?h.owned_variants<h.total_variants:this._spriteFilter==="unmastered"?h.variants.some(m=>m.owned&&!m.mastered):this._spriteFilter==="complete"?h.complete:!0)].sort((h,m)=>this._spriteSort==="rarity"?o.indexOf(m.rarity)-o.indexOf(h.rarity)||(h.dex??0)-(m.dex??0):this._spriteSort==="progress"&&m.owned_variants/m.total_variants-h.owned_variants/h.total_variants||(h.dex??0)-(m.dex??0)),u=i.flatMap(h=>h.variants.filter(m=>!m.owned&&m.drop_chance_pct).map(m=>({f:h,v:m}))).sort((h,m)=>m.v.drop_chance_pct-h.v.drop_chance_pct||o.indexOf(h.f.rarity)-o.indexOf(m.f.rarity)).slice(0,6),f=a.length?i.flatMap(h=>h.variants.filter(m=>m.owned&&typeof m.xp=="number"&&m.xp>0).map(m=>({f:h,v:m,lv:this._spriteLevel(m.xp,a)}))).filter(h=>h.lv&&!h.lv.atMax).sort((h,m)=>h.lv.toMax-m.lv.toMax).slice(0,6):[],b=(h,m)=>n`
      <button class="mode-tab ${this._spriteFilter===h?"active":""}" @click=${()=>this._spriteFilter=h}>${m}</button>`,v=(h,m)=>n`
      <button class="mode-tab ${this._spriteSort===h?"active":""}" @click=${()=>this._spriteSort=h}>${m}</button>`;return n`
      <div class="rank-section sprite-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,r)}">
          <span>${Math.round(r)}%</span>
        </div>
        <div class="sprite-summary-main">
          <div class="rank-header">
            <span class="rank-title"><span>Sprite collection</span></span>
            <span class="muted">Game update ${t.version||"?"}</span>
          </div>
          <div class="sprite-stats">
            <span><b>${l}</b>/${t.total_variants} variants</span>
            <span><b>${t.owned_families}</b>/${t.total_families} sprites</span>
            <span><b>${t.complete_families??0}</b> full sets</span>
            <span>★ <b>${t.mastered_variants||0}</b>/${l} mastered</span>
          </div>
          ${t.equipped?n`<div class="rank-meta"><span>Equipped: <b>${t.equipped.variant}</b></span></div>`:c}
        </div>
      </div>

      ${(t.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">By game update${t.cumulative?n` · all-time ${t.cumulative.owned_variants}/${t.cumulative.total_variants}`:c}</div>
            ${t.versions.map(h=>n`
              <div class="version-row ${h.current?"current":""}">
                <span>${h.version}${h.current?" (now)":""}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,h.completion_pct)}%"></div></div>
                <span>${h.owned_variants}/${h.total_variants}</span>
              </div>`)}
          </div>`:c}

      ${f.length?n`<div class="split-section">
            <div class="section-title">Closest to mastering (current copy, level ${a[a.length-1][0]} = ${this._num(a[a.length-1][1])} XP)</div>
            <div class="master-list">
              ${f.map(({f:h,v:m,lv:k})=>n`
                <div class="master-row" style="--rarity:${X[h.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=h.id}>
                  ${m.icon?n`<img src=${m.icon} alt="" @error=${E} />`:c}
                  <span class="variant-name">${h.name.replace(/ Sprite$/,"")}${m.label!=="Base"?` \xB7 ${m.label}`:""}</span>
                  <span>Lv ${k.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,m.xp/k.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(k.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:c}

      ${u.length?n`<div class="split-section">
            <div class="section-title">Next to hunt (highest drop chance)</div>
            <div class="hunt-row">
              ${u.map(({f:h,v:m})=>n`
                <div class="hunt-item" style="--rarity:${X[h.rarity]||"#9CA3AF"}" title="${m.name}" @click=${()=>this._expandedSprite=h.id}>
                  ${m.icon?n`<img src=${m.icon} alt="" @error=${E} />`:c}
                  <span>${m.label==="Base"?h.name.replace(/ Sprite$/,""):`${m.label} ${h.name.replace(/ Sprite$/,"")}`}</span>
                  <small>${m.drop_chance_pct}%</small>
                </div>`)}
            </div>
          </div>`:c}

      <div class="tab-rows">
        <div class="mode-tabs">${b("all","All")} ${b("missing","Missing")} ${b("unmastered","To master")} ${b("complete","Full sets")}</div>
        <div class="mode-tabs">${v("dex","Dex")} ${v("rarity","Rarity")} ${v("progress","Progress")}</div>
      </div>

      <div class="sprite-grid">
        ${g.length?g.map(h=>{let m=this._expandedSprite===h.id;return n`
                <div class="sprite-card ${h.owned?"":"missing"} ${m?"open":""} ${h.complete?"complete":""}"
                  style="--rarity:${X[h.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=m?null:h.id}>
                  ${h.icon?n`<img src=${h.icon} alt="" @error=${E} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  <span class="sprite-name">${h.name.replace(/ Sprite$/,"")}</span>
                  <span class="sprite-count">${h.owned_variants}/${h.total_variants}${h.mastered?n` · ★${h.mastered}`:c}</span>
                  <span class="sprite-dots">
                    ${(h.variants||[]).map(k=>n`<i class="dot ${k.owned?"owned":""} ${k.mastered?"mastered":""}" title=${k.label}></i>`)}
                  </span>
                </div>
                ${m?this._renderSpriteDetail(h):c}`}):n`<div class="empty">Nothing matches this filter.</div>`}
      </div>
    `}_variantPerks(e){let t=new Set,a=(e.variants||[]).flatMap(i=>(i.boons||[]).filter(r=>r.name&&r.name!==e.name&&!t.has(r.name)&&t.add(r.name)).map(r=>({variant:i.label,...r})));return a.length?n`<div class="perk-list">
      <div class="section-title">Variant perks</div>
      ${a.map(i=>n`<div class="detail-line"><b>${i.variant}</b>${i.name!==i.variant?n`<span>${i.name}</span>`:c}</div>
        ${i.description?n`<div class="perk-desc">${i.description}</div>`:c}`)}
    </div>`:c}_renderSpriteDetail(e){let t=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{});return n`
      <div class="sprite-detail" style="--rarity:${X[e.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${e.icon_large||e.icon?n`<img src=${e.icon_large||e.icon} alt="" @error=${E} />`:c}
          <div>
            <b>${e.name}</b> <span class="tag rarity-tag">${e.rarity||""}</span>
            ${e.description?n`<p class="detail-desc">${e.description}</p>`:c}
            ${e.hint?n`<p class="detail-desc hint">📍 ${e.hint}</p>`:c}

          </div>
        </div>
        ${this._variantPerks(e)}
        <div class="variant-tiles">
          ${(e.variants||[]).map(a=>n`
            <div class="variant-tile ${a.owned?"":"missing"} ${a.mastered?"mastered":""}" title=${a.name}>
              ${a.icon?n`<img src=${a.icon} alt="" @error=${E} />`:c}
              <span class="variant-name">${a.label}</span>
              <span class="variant-status">
                ${a.owned?(()=>{let i=this._spriteLevel(a.xp,t),r=i?i.atMax?`Lv ${i.level}${a.xp>i.maxXp?"+":""}`:`Lv ${i.level} \xB7 ${this._num(a.xp)}/${this._num(i.next)}`:a.xp?`${this._num(a.xp)} XP`:"Owned";return n`${r}${a.count>1?` \xB7 \xD7${a.count}`:""}${a.mastered?n` <span title="Mastered at some point (collection record)">★</span>`:c}`})():a.drop_chance_pct!=null?`Missing \xB7 ${a.drop_chance_pct}%`:"Missing \xB7 special"}
              </span>
            </div>`)}
        </div>
      </div>
    `}_renderWindowMatches(e,t,a){let i=`window:${e}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let r=this._matchLists[i],l=r?.matches||[],o=r?.tracked??0,p=a.matches||0;return n`
      <div class="match-feed-header">
        <span>${t} matches (${o}${p>o?` of ${p}`:""})</span>
        ${p>o?n`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>`:c}
      </div>
      ${r?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,l,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(e,t){let a=this._playlist(e.playlist_id),i=a?.image,r=/ropesmile|reload/i.test(e.playlist_id+e.name)?"reload":/nobuild|zero build/i.test(e.playlist_id+e.name)?"zero_build":"build";return n`
      <div class="feature-card ${i?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${t?` \xB7 ${t}`:""}</span>
          <span class="feature-value">${a?.name||e.name}</span>
          <span class="feature-sub">${this._num(e.matches)} matches</span>
        </div>
        ${i?n`<img class="feature-art" src=${i} alt="" @error=${E} />`:n`<ha-icon class="feature-icon" icon=${lt[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(e){let t=e.metrics||{},a=Object.values(e.inputs||{}).filter(r=>r.share_pct>=1),i=e.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",t.kills_per_minute??0],["Avg Match",`${t.avg_match_minutes??0}m`],["Score/Match",this._num(t.score_per_match)],["Solo Top 10",`${t.solo_top10_rate??0}%`],["Solo Top 25",`${t.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?n`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((r,l)=>n`<div class="split-seg seg-${l}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((r,l)=>n`<span><i class="dot seg-${l}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
            </div>
          </div>`:c}

      ${Object.keys(i).length?n`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(r=>i[r]).map(r=>n`<div class="size-row">
                <span class="size-name">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
                <span>${this._num(i[r].matches)} m</span>
                <span>${i[r].win_rate}% win</span>
                <span>${i[r].kd} K/D</span>
              </div>`)}
          </div>`:c}
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",type:"all",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(e,t){return!(t.region!=="all"&&e.region_group!==t.region||t.type!=="all"&&e.tournament_type!==t.type||(t.mode==="Ranked"?!e.ranked:t.mode!=="all"&&e.mode!==t.mode)||t.team!=="all"&&e.team!==t.team||t.platform!=="all"&&!(e.platform_groups||[]).includes(t.platform))}_setFilter(e,t){this._filters={...this._currentFilters(),[e]:t}}_renderEventsView(){let e=this._events;if(e.loading&&!e.list)return n`<div class="empty">Loading tournaments…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(e.list===null)return n`<div class="empty">Tournament schedule is not available right now.</div>`;let t=e.list||[],a=this._currentFilters(),i=[...new Set(t.map(o=>o.region_group))].sort(),r=t.filter(o=>this._matchesFilters(o,a)).filter(o=>o.windows.some(p=>this._windowState(p)!=="finished")||this._expandedEvent===o.key),l=(o,p)=>n`
      <select class="filter-select" .value=${a[o]} @change=${g=>this._setFilter(o,g.target.value)}>
        ${p.map(([g,u])=>n`<option value=${g} ?selected=${a[o]===g}>${u}</option>`)}
      </select>
    `;return n`
      <div class="event-filters">
        ${l("region",[["all","All regions"],...i.map(o=>[o,o])])}
        ${l("type",[["all","Type"],...[...new Set(t.map(o=>o.tournament_type).filter(Boolean))].map(o=>[o,Oe[o]||o])])}
        ${l("mode",[["all","Mode"],["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked cups"]])}
        ${l("team",[["all","Team"],["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]])}
        ${l("platform",[["all","Platform"],["PC","PC"],["Console","Console"],["Mobile","Mobile"]])}
        ${this._filters&&JSON.stringify(this._filters)!==JSON.stringify({...this._filters,...this._defaultFilters()})?n`<button class="filter-reset" @click=${()=>this._filters=null} title="Clear all filters">
              <ha-icon icon="mdi:filter-remove-outline"></ha-icon><span>Reset</span>
            </button>`:c}
      </div>
      <div class="match-feed-header">
        <span>Tournaments (${r.length})</span>
        <span class="muted">UK time · schedule only</span>
      </div>
      <div class="match-list events">
        ${r.length?r.map(o=>this._renderEvent(o)):n`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(e){let t=e.windows.find(l=>this._windowState(l)==="live");if(t)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(t.end)-this._now)}`,live:!0,soon:!1};let a=e.windows.find(l=>this._windowState(l)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,r=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:r}}_renderEvent(e){let t=this._eventTiming(e),a=this._expandedEvent===e.key,i=e.tournament_type?Oe[e.tournament_type]||e.tournament_type:null,r=[e.mode,e.team,e.ranked&&e.tournament_type!=="RankedCup"?"Ranked":null,...e.platform_groups||[],e.region].filter(Boolean);return n`
      <div class="event-card ${t.live?"live":""} ${a?"expanded":""} ${e.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(e)}>
          ${e.poster?n`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${t.live?n`<span class="placement-badge win">LIVE</span>`:c}
            </div>
            <span class="match-mode ${t.soon?"soon":""}">${t.text}</span>
            <div class="tag-row">
              ${i?n`<span class="tag type-tag ${e.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:c}
              ${e.can_spectate?n`<span class="tag spectate-tag" title="Epic allows spectating this session inside Fortnite">👁 Spectate in-game</span>`:c}
              ${r.map(l=>n`<span class="tag">${l}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(e):c}
      </div>
    `}_renderEventDetails(e){let t=e.loading_screen||e.poster;return n`
      <div class="event-details">
        ${t?n`<img class="event-hero" src=${t} alt="" @error=${E} />`:c}
        ${e.subtitle&&e.subtitle!==e.name?n`<div class="detail-sub">${e.subtitle}</div>`:c}
        ${e.description?n`<p class="detail-desc">${e.description}</p>`:c}
        ${e.schedule_info?n`<p class="detail-desc muted">${e.schedule_info}</p>`:c}
        ${e.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>`:c}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>
        ${e.min_account_level?n`<div class="detail-line"><span>Minimum account level</span><b>${e.min_account_level}</b></div>`:c}
        ${e.tournament_type==="FNCS"?n`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Epic streams major FNCS rounds on its official channels; this schedule does not say which sessions are broadcast.</div>`:c}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map(a=>{let i=this._windowState(a),r=`${e.event_id}|${a.window_id}`,l=this._leaderboards[r],o=Date.parse(a.begin)-this._now;return n`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":o<7*864e5?`in ${this._formatSpan(o)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(e.event_id,a.window_id)}>
                        ${l?.loading?"Loading\u2026":l?.data?"Refresh":"Leaderboard"}
                      </button>`:c}
                </div>
                ${l?this._renderLeaderboard(l):c}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(e){if(e.error)return n`<div class="lb-note">${e.error}</div>`;if(!e.data)return e.loading?n`<div class="lb-note">Loading leaderboard…</div>`:c;let t=e.data,a=(i,r=!1)=>n`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${t.player&&!t.entries.some(i=>i.is_player)?a(t.player,!0):c}
        ${t.entries.length?t.entries.map(i=>a(i,i.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${t.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(t.updated)}${t.total_pages?` \xB7 ${t.total_pages} pages`:""}</div>`:c}
      </div>
    `}};y([O({attribute:!1})],$.prototype,"hass",2),y([x()],$.prototype,"_config",2),y([x()],$.prototype,"_view",2),y([x()],$.prototype,"_window",2),y([x()],$.prototype,"_selectedMode",2),y([x()],$.prototype,"_loadingAction",2),y([x()],$.prototype,"_catalog",2),y([x()],$.prototype,"_avatar",2),y([x()],$.prototype,"_events",2),y([x()],$.prototype,"_filters",2),y([x()],$.prototype,"_expandedEvent",2),y([x()],$.prototype,"_expandedMatch",2),y([x()],$.prototype,"_leaderboards",2),y([x()],$.prototype,"_now",2),y([x()],$.prototype,"_matchLists",2),y([x()],$.prototype,"_showAllMatches",2),y([x()],$.prototype,"_expandedSprite",2),y([x()],$.prototype,"_spriteFilter",2),y([x()],$.prototype,"_spriteSort",2),y([x()],$.prototype,"_trends",2),y([x()],$.prototype,"_pass",2),y([x()],$.prototype,"_showAllPages",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",$);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${nt} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{$ as FortniteActivityCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
