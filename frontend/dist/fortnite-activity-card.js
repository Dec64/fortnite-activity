var Be=Object.defineProperty;var je=Object.getOwnPropertyDescriptor;var f=(o,a,e,t)=>{for(var i=t>1?void 0:t?je(a,e):a,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(t?r(a,e,i):r(i))||i);return t&&i&&Be(a,e,i),i};var Y=globalThis,Q=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),xe=new WeakMap,N=class{constructor(a,e,t){if(this._$cssResult$=!0,t!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=a,this.t=e}get styleSheet(){let a=this.o,e=this.t;if(Q&&a===void 0){let t=e!==void 0&&e.length===1;t&&(a=xe.get(e)),a===void 0&&((this.o=a=new CSSStyleSheet).replaceSync(this.cssText),t&&xe.set(e,a))}return a}toString(){return this.cssText}},ye=o=>new N(typeof o=="string"?o:o+"",void 0,se),B=(o,...a)=>{let e=o.length===1?o[0]:a.reduce((t,i,s)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new N(e,o,se)},$e=(o,a)=>{if(Q)o.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of a){let t=document.createElement("style"),i=Y.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,o.appendChild(t)}},re=Q?o=>o:o=>o instanceof CSSStyleSheet?(a=>{let e="";for(let t of a.cssRules)e+=t.cssText;return ye(e)})(o):o;var{is:He,defineProperty:Ie,getOwnPropertyDescriptor:Ve,getOwnPropertyNames:We,getOwnPropertySymbols:qe,getPrototypeOf:Ke}=Object,J=globalThis,we=J.trustedTypes,Ge=we?we.emptyScript:"",Ze=J.reactiveElementPolyfillSupport,j=(o,a)=>o,H={toAttribute(o,a){switch(a){case Boolean:o=o?Ge:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,a){let e=o;switch(a){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},X=(o,a)=>!He(o,a),ke={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(a){this._$Ei(),(this.l??=[]).push(a)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(a,e=ke){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(a)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(a,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(a,t,e);i!==void 0&&Ie(this.prototype,a,i)}}static getPropertyDescriptor(a,e,t){let{get:i,set:s}=Ve(this.prototype,a)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let c=i?.call(this);s?.call(this,r),this.requestUpdate(a,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(a){return this.elementProperties.get(a)??ke}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;let a=Ke(this);a.finalize(),a.l!==void 0&&(this.l=[...a.l]),this.elementProperties=new Map(a.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){let e=this.properties,t=[...We(e),...qe(e)];for(let i of t)this.createProperty(i,e[i])}let a=this[Symbol.metadata];if(a!==null){let e=litPropertyMetadata.get(a);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(a){let e=[];if(Array.isArray(a)){let t=new Set(a.flat(1/0).reverse());for(let i of t)e.unshift(re(i))}else a!==void 0&&e.push(re(a));return e}static _$Eu(a,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof a=="string"?a.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(a=>a(this))}addController(a){(this._$EO??=new Set).add(a),this.renderRoot!==void 0&&this.isConnected&&a.hostConnected?.()}removeController(a){this._$EO?.delete(a)}_$E_(){let a=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(a.set(t,this[t]),delete this[t]);a.size>0&&(this._$Ep=a)}createRenderRoot(){let a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(a=>a.hostConnected?.())}enableUpdating(a){}disconnectedCallback(){this._$EO?.forEach(a=>a.hostDisconnected?.())}attributeChangedCallback(a,e,t){this._$AK(a,t)}_$ET(a,e){let t=this.constructor.elementProperties.get(a),i=this.constructor._$Eu(a,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:H).toAttribute(e,t.type);this._$Em=a,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(a,e){let t=this.constructor,i=t._$Eh.get(a);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:H;this._$Em=i;let c=r.fromAttribute(e,s.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(a,e,t,i=!1,s){if(a!==void 0){let r=this.constructor;if(i===!1&&(s=this[a]),t??=r.getPropertyOptions(a),!((t.hasChanged??X)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(a)&&!this.hasAttribute(r._$Eu(a,t))))return;this.C(a,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(a,e,{useDefault:t,reflect:i,wrapped:s},r){t&&!(this._$Ej??=new Map).has(a)&&(this._$Ej.set(a,r??e??this[a]),s!==!0||r!==void 0)||(this._$AL.has(a)||(this.hasUpdated||t||(e=void 0),this._$AL.set(a,e)),i===!0&&this._$Em!==a&&(this._$Eq??=new Set).add(a))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let a=this.scheduleUpdate();return a!=null&&await a,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:r}=s,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,s,c)}}let a=!1,e=this._$AL;try{a=this.shouldUpdate(e),a?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw a=!1,this._$EM(),t}a&&this._$AE(e)}willUpdate(a){}_$AE(a){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(a)),this.updated(a)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(a){return!0}update(a){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(a){}firstUpdated(a){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[j("elementProperties")]=new Map,A[j("finalized")]=new Map,Ze?.({ReactiveElement:A}),(J.reactiveElementVersions??=[]).push("2.1.2");var he=globalThis,Se=o=>o,ee=he.trustedTypes,Ee=ee?ee.createPolicy("lit-html",{createHTML:o=>o}):void 0,ze="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+M,Ye=`<${Le}>`,z=document,V=()=>z.createComment(""),W=o=>o===null||typeof o!="object"&&typeof o!="function",ue=Array.isArray,Qe=o=>ue(o)||typeof o?.[Symbol.iterator]=="function",ne=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ce=/>/g,F=RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Fe=/"/g,Pe=/^(?:script|style|textarea|title)$/i,me=o=>(a,...e)=>({_$litType$:o,strings:a,values:e}),n=me(1),te=me(2),ht=me(3),L=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Re=new WeakMap,R=z.createTreeWalker(z,129);function De(o,a){if(!ue(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(a):a}var Je=(o,a)=>{let e=o.length-1,t=[],i,s=a===2?"<svg>":a===3?"<math>":"",r=I;for(let c=0;c<e;c++){let l=o[c],h,m,u=-1,b=0;for(;b<l.length&&(r.lastIndex=b,m=r.exec(l),m!==null);)b=r.lastIndex,r===I?m[1]==="!--"?r=Ae:m[1]!==void 0?r=Ce:m[2]!==void 0?(Pe.test(m[2])&&(i=RegExp("</"+m[2],"g")),r=F):m[3]!==void 0&&(r=F):r===F?m[0]===">"?(r=i??I,u=-1):m[1]===void 0?u=-2:(u=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?F:m[3]==='"'?Fe:Me):r===Fe||r===Me?r=F:r===Ae||r===Ce?r=I:(r=F,i=void 0);let p=r===F&&o[c+1].startsWith("/>")?" ":"";s+=r===I?l+Ye:u>=0?(t.push(h),l.slice(0,u)+ze+l.slice(u)+M+p):l+M+(u===-2?c:p)}return[De(o,s+(o[e]||"<?>")+(a===2?"</svg>":a===3?"</math>":"")),t]},q=class o{constructor({strings:a,_$litType$:e},t){let i;this.parts=[];let s=0,r=0,c=a.length-1,l=this.parts,[h,m]=Je(a,e);if(this.el=o.createElement(h,t),R.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=R.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(ze)){let b=m[r++],p=i.getAttribute(u).split(M),g=/([.?@])?(.*)/.exec(b);l.push({type:1,index:s,name:g[2],strings:p,ctor:g[1]==="."?le:g[1]==="?"?ce:g[1]==="@"?de:T}),i.removeAttribute(u)}else u.startsWith(M)&&(l.push({type:6,index:s}),i.removeAttribute(u));if(Pe.test(i.tagName)){let u=i.textContent.split(M),b=u.length-1;if(b>0){i.textContent=ee?ee.emptyScript:"";for(let p=0;p<b;p++)i.append(u[p],V()),R.nextNode(),l.push({type:2,index:++s});i.append(u[b],V())}}}else if(i.nodeType===8)if(i.data===Le)l.push({type:2,index:s});else{let u=-1;for(;(u=i.data.indexOf(M,u+1))!==-1;)l.push({type:7,index:s}),u+=M.length-1}s++}}static createElement(a,e){let t=z.createElement("template");return t.innerHTML=a,t}};function D(o,a,e=o,t){if(a===L)return a;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=W(a)?void 0:a._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(a=D(o,i._$AS(o,a.values),i,t)),a}var oe=class{constructor(a,e){this._$AV=[],this._$AN=void 0,this._$AD=a,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(a){let{el:{content:e},parts:t}=this._$AD,i=(a?.creationScope??z).importNode(e,!0);R.currentNode=i;let s=R.nextNode(),r=0,c=0,l=t[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new K(s,s.nextSibling,this,a):l.type===1?h=new l.ctor(s,l.name,l.strings,this,a):l.type===6&&(h=new pe(s,this,a)),this._$AV.push(h),l=t[++c]}r!==l?.index&&(s=R.nextNode(),r++)}return R.currentNode=z,i}p(a){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(a,t,e),e+=t.strings.length-2):t._$AI(a[e])),e++}},K=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(a,e,t,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=a,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let a=this._$AA.parentNode,e=this._$AM;return e!==void 0&&a?.nodeType===11&&(a=e.parentNode),a}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(a,e=this){a=D(this,a,e),W(a)?a===d||a==null||a===""?(this._$AH!==d&&this._$AR(),this._$AH=d):a!==this._$AH&&a!==L&&this._(a):a._$litType$!==void 0?this.$(a):a.nodeType!==void 0?this.T(a):Qe(a)?this.k(a):this._(a)}O(a){return this._$AA.parentNode.insertBefore(a,this._$AB)}T(a){this._$AH!==a&&(this._$AR(),this._$AH=this.O(a))}_(a){this._$AH!==d&&W(this._$AH)?this._$AA.nextSibling.data=a:this.T(z.createTextNode(a)),this._$AH=a}$(a){let{values:e,_$litType$:t}=a,i=typeof t=="number"?this._$AC(a):(t.el===void 0&&(t.el=q.createElement(De(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new oe(i,this),r=s.u(this.options);s.p(e),this.T(r),this._$AH=s}}_$AC(a){let e=Re.get(a.strings);return e===void 0&&Re.set(a.strings,e=new q(a)),e}k(a){ue(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of a)i===e.length?e.push(t=new o(this.O(V()),this.O(V()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(a=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);a!==this._$AB;){let t=Se(a).nextSibling;Se(a).remove(),a=t}}setConnected(a){this._$AM===void 0&&(this._$Cv=a,this._$AP?.(a))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(a,e,t,i,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=a,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(a,e=this,t,i){let s=this.strings,r=!1;if(s===void 0)a=D(this,a,e,0),r=!W(a)||a!==this._$AH&&a!==L,r&&(this._$AH=a);else{let c=a,l,h;for(a=s[0],l=0;l<s.length-1;l++)h=D(this,c[t+l],e,l),h===L&&(h=this._$AH[l]),r||=!W(h)||h!==this._$AH[l],h===d?a=d:a!==d&&(a+=(h??"")+s[l+1]),this._$AH[l]=h}r&&!i&&this.j(a)}j(a){a===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,a??"")}},le=class extends T{constructor(){super(...arguments),this.type=3}j(a){this.element[this.name]=a===d?void 0:a}},ce=class extends T{constructor(){super(...arguments),this.type=4}j(a){this.element.toggleAttribute(this.name,!!a&&a!==d)}},de=class extends T{constructor(a,e,t,i,s){super(a,e,t,i,s),this.type=5}_$AI(a,e=this){if((a=D(this,a,e,0)??d)===L)return;let t=this._$AH,i=a===d&&t!==d||a.capture!==t.capture||a.once!==t.once||a.passive!==t.passive,s=a!==d&&(t===d||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,a),this._$AH=a}handleEvent(a){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,a):this._$AH.handleEvent(a)}},pe=class{constructor(a,e,t){this.element=a,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(a){D(this,a)}};var Xe=he.litHtmlPolyfillSupport;Xe?.(q,K),(he.litHtmlVersions??=[]).push("3.3.3");var Te=(o,a,e)=>{let t=e?.renderBefore??a,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new K(a.insertBefore(V(),s),s,void 0,e??{})}return i._$AI(o),i};var ge=globalThis,S=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let a=super.createRenderRoot();return this.renderOptions.renderBefore??=a.firstChild,a}update(a){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(a),this._$Do=Te(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};S._$litElement$=!0,S.finalized=!0,ge.litElementHydrateSupport?.({LitElement:S});var et=ge.litElementPolyfillSupport;et?.({LitElement:S});(ge.litElementVersions??=[]).push("4.2.2");var tt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:X},at=(o=tt,a,e)=>{let{kind:t,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),t==="accessor"){let{name:r}=e;return{set(c){let l=a.get.call(this);a.set.call(this,c),this.requestUpdate(r,l,o,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,o,c),c}}}if(t==="setter"){let{name:r}=e;return function(c){let l=this[r];a.call(this,c),this.requestUpdate(r,l,o,!0,c)}}throw Error("Unsupported decorator location: "+t)};function U(o){return(a,e)=>typeof e=="object"?at(o,a,e):((t,i,s)=>{let r=i.hasOwnProperty(s);return i.constructor.createProperty(s,t),r?Object.getOwnPropertyDescriptor(i,s):void 0})(o,a,e)}function x(o){return U({...o,state:!0,attribute:!1})}var Ue=B`
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
`;var it=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (e.g. Peely) \u2014 looked up in the cosmetics catalogue",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Stats when idle, Events tab)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"},{value:"events_only",label:"Tournaments / Events Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"show_tournaments",label:"Show Events (tournament schedule) tab",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],G=class extends S{setConfig(a){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...a}}_valueChanged(a){if(!this._config||!this.hass)return;let e=a.target,t=a.detail?a.detail.value:e.value;this._config={...this._config,...t};let i=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return!this.hass||!this._config?d:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${it}
          .computeLabel=${a=>a.label||a.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=B`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};f([U({attribute:!1})],G.prototype,"hass",2),f([x()],G.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",G);var st="1.4.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var rt={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},ie={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},be={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},nt={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},fe={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},E=o=>{o.target.hidden=!0},Oe=o=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:o}),Z={at:0},P={at:0},ve=new Map,v=class extends S{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...fe};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Ue}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...fe,...e},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...fe}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-P.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _eventsEnabled(){return this._config.show_tournaments!==!1||this._config.layout==="events_only"}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this._entityCache.size)return!0;for(let i of this._entityCache.values())if(t.states[i]!==this.hass.states[i])return!0;return!1}updated(e){if(super.updated(e),!this.hass)return;let t=e.has("hass")&&!e.get("hass");t&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(e.has("_config")||t)&&this._scheduleAvatar()}async _loadCatalog(){(!Z.promise||Date.now()-Z.at>36e5)&&(Z.at=Date.now(),Z.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let e=await Z.promise;this._catalog={season:e?.season,playlists:e?.playlists||{}}}async _loadEvents(e=!1){if(this.hass){(e||!P.promise||Date.now()-P.at>10*6e4)&&(P.at=Date.now(),P.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let t=await P.promise;this._events={list:t?.tournaments??null,defaultRegion:t?.default_region_group}}catch(t){P.promise=void 0,this._events={error:t?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let e=(this._config.avatar||"").trim();if(e!==this._avatarQuery){if(this._avatarQuery=e,window.clearTimeout(this._avatarTimer),e.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let t=e.toLowerCase();ve.has(t)||ve.set(t,this.hass.callWS({type:"fortnite_activity/cosmetic",query:e}).then(s=>s?.cosmetic||null).catch(()=>null));let i=await ve.get(t);this._avatarQuery===e&&(this._avatar=i)},800)}}async _loadLeaderboard(e,t){let i=`${e}|${t}`;if(!this._leaderboards[i]?.loading){this._leaderboards={...this._leaderboards,[i]:{...this._leaderboards[i],loading:!0,error:void 0}};try{let s=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:e,window_id:t,player_id:this._player});this._leaderboards={...this._leaderboards,[i]:s?.leaderboard?{data:s.leaderboard}:{error:s?.unavailable||"Leaderboard unavailable"}}}catch(s){this._leaderboards={...this._leaderboards,[i]:{error:s?.message||"Leaderboard unavailable"}}}}}_ensureMatches(e,t){!this.hass||this._matchLists[e]||(this._matchLists={...this._matchLists,[e]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...t}).then(i=>{this._matchLists={...this._matchLists,[e]:{matches:i?.matches||[],tracked:i?.tracked_matches||0}}}).catch(i=>{this._matchLists={...this._matchLists,[e]:{error:i?.message||"Could not load matches"}}}))}_isRanked(e){return!!e.rank_delta_pct||!!e.unreal_rank_change||/habanero/i.test(e.playlist_id||"")}_findEntity(e,t){let i=this.hass?.states;if(!i)return;let s=this._player,r=`${s}:${e}:${t}`,c=this._entityCache.get(r);if(c&&i[c])return i[c];let l;for(let[h,m]of Object.entries(i))if(h.startsWith(`${e}.`)&&m.attributes?.fortnite_player_id===s&&m.attributes?.fortnite_entity_key===t){l=h;break}if(l||(l=[t,...rt[t]||[]].flatMap(u=>[`${e}.fortnite_${s}_${u}`,`${e}.fortnite_${s}_${s}_${u}`]).find(u=>i[u])),!!l)return this._entityCache.set(r,l),i[l]}async _callService(e,t={}){if(this.hass){this._loadingAction=e;try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t}),e==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(i){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${e}:`,i)}}}_setView(e){this._view=e,e==="events"&&this._loadEvents()}_toggleEvent(e){if(this._expandedEvent===e.key){this._expandedEvent=null;return}this._expandedEvent=e.key;let t=e.windows.find(i=>this._windowState(i)==="live")||[...e.windows].reverse().find(i=>this._windowState(i)==="finished");t&&!this._leaderboards[`${e.event_id}|${t.window_id}`]&&this._loadLeaderboard(e.event_id,t.window_id)}_formatRelativeTime(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return"";let i=Math.max(1,Math.round((this._now-t.getTime())/6e4));if(i<60)return`${i}m ago`;let s=Math.round(i/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),i=Math.round(e%60);return t>0?`${t}h ${i}m`:`${i}m`}_formatSpan(e){let t=Math.max(0,Math.round(e/6e4)),i=Math.floor(t/1440),s=Math.floor(t%1440/60),r=t%60;return i>0?`${i}d ${s}h`:s>0?`${s}h ${r}m`:`${r}m`}_formatWhen(e){try{return Oe(this.hass?.config?.time_zone).format(new Date(e)).replace(/\b(am|pm)\b/i,t=>t.toLowerCase())}catch{return Oe().format(new Date(e))}}_num(e,t=0){return Number(e||0).toLocaleString("en-GB",{maximumFractionDigits:t,minimumFractionDigits:0})}_playlist(e){return e?this._catalog.playlists[e.toLowerCase()]:void 0}_windowState(e){let t=Date.parse(e.begin),i=Date.parse(e.end);return this._now>=i?"finished":this._now>=t?"live":"upcoming"}_rankBadge(e,t=30){let i=e||"Unranked",s=Object.keys(ie).find(u=>i.startsWith(u));if(!s)return n`<span class="rank-badge unranked" style="width:${t}px;height:${t}px">–</span>`;let[r,c]=ie[s],l=(i.match(/\b(I{1,3})$/)||[])[1]||"",h=`g-${s}-${t}`;return n`<span class="rank-badge" title=${i} style="width:${t}px;height:${t}px">
      ${te`<svg viewBox="0 0 40 44" width=${t} height=${t} aria-hidden="true">
        <defs><linearGradient id=${h} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${c}></stop>
        </linearGradient></defs>
        ${s==="Unreal"?te`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:te`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${l}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let e=this._player,t=this._findEntity("sensor","current_session"),i=this._findEntity("sensor","overall_stats"),s=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),c=this._findEntity("sensor","level"),l=this._findEntity("binary_sensor","playing"),h=this._findEntity("sensor","profile"),m=this._findEntity("sensor","sprites"),u=this._findEntity("sensor","power_ranking"),b=!!m&&!["unavailable","unknown"].includes(m.state);if(!t&&!i&&!l)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${e}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let p=l?.state==="on"||t?.state==="active",g=t?.attributes||{},w=i?.attributes||{},y=h?.attributes||{},k={...s?.attributes||{},current_rank:s?.state},C={...r?.attributes||{},current_rank:r?.state},$=this._config.layout||"auto",_=this._view??(p?"session":"stats");$==="session_only"?_="session":$==="career_only"?_="stats":$==="events_only"&&(_="events"),_==="events"&&!this._eventsEnabled&&(_="stats"),_==="sprites"&&!b&&(_="stats");let O="",_e={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};_e[this._config.theme_accent||""]&&(O+=`--accent: ${_e[this._config.theme_accent]};`),this._config.custom_background&&(O+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let Ne=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return n`
      <ha-card class=${Ne} style="${O}">
        ${this._renderHeader(e,p,g,w,y,c,k,C)}
        ${this._config.show_sub_buttons!==!1&&$!=="events_only"?this._renderButtons(_,p,b):d}
        ${_==="session"?this._renderSessionView(p,g,k):_==="events"?this._renderEventsView():_==="sprites"?this._renderSpritesView(m):this._renderStatsView(w,y,k,C,u)}
      </ha-card>
    `}_renderHeader(e,t,i,s,r,c,l,h){let m=r.display_name||e.charAt(0).toUpperCase()+e.slice(1),u=r.season||this._catalog.season,b=this._config.show_platforms!==!1?r.platforms||[]:[],p=s.metrics?.last_played,g=c?.attributes||{},w=Number(c?.state)||0,y=Number(g.account_level||0),k=this._avatar?.icon,C=this._config.compact?20:24;return n`
      <div class="fa-header">
        <div class="player-avatar ${k?"has-image":""}">
          ${k?n`<img src=${k} alt=${this._avatar?.name||""} @error=${E} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${m}</h2>
            <span class="header-ranks">
              ${l.current_rank&&l.current_rank!=="Unranked"?this._rankBadge(l.current_rank,C):d}
              ${h.current_rank&&h.current_rank!=="Unranked"?this._rankBadge(h.current_rank,C):d}
            </span>
          </div>
          <div class="player-meta">
            ${u?.number?n`<span class="level-badge">S${u.number} · ${u.days_left}d left</span>`:d}
            ${!this._config.hide_season_level&&w>0?n`<span class="level-badge">Lvl ${w}</span>`:d}
            ${!this._config.hide_account_level&&y>0?n`<span>Acct ${y.toLocaleString()}</span>`:d}
            ${p?.time&&!t?n`<span title=${p.name||""}>Played ${this._formatRelativeTime(p.time)}</span>`:d}
          </div>
          ${b.length?n`<div class="platforms">
                ${b.map($=>n`<span class="platform-chip" title=${$.name||$.label}>${$.label}${$.name?n` · ${$.name}`:d}</span>`)}
              </div>`:d}
        </div>
        <div class="status-pill ${t?"live":"idle"}">
          ${t?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(i.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
      ${u?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${u.number}: ${u.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,u.progress_pct)}%"></div>
          </div>`:d}
    `}_liveEventCount(){let e=this._currentFilters();return(this._events.list||[]).filter(t=>this._matchesFilters(t,e)&&t.windows.some(i=>this._windowState(i)==="live")).length}_renderButtons(e,t,i=!1){let s=this._config.layout||"auto",r=this._eventsEnabled?this._liveEventCount():0,c=(l,h,m,u=0)=>n`
      <button class="bubble-sub-button ${e===l?"active":""}" @click=${()=>this._setView(l)} title=${m}>
        <ha-icon icon=${h}></ha-icon><span class="btn-label">${m}</span>
        ${u>0?n`<span class="notify-badge" title="${u} live">${u}</span>`:d}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${s!=="career_only"?c("session","mdi:lightning-bolt",t?"Live Session":"Last Session"):d}
        ${s!=="session_only"?c("stats","mdi:trophy-outline","Stats"):d}
        ${this._eventsEnabled&&s==="auto"?c("events","mdi:tournament","Events",r):d}
        ${i&&s==="auto"?c("sprites","mdi:ghost-outline","Sprites"):d}
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
    `}_renderKpis(e){if(this._config.compact){let t=[];for(let i=0;i<e.length;i+=2)t.push(e.slice(i,i+2));return n`<table class="stat-table"><tbody>
        ${t.map(i=>n`<tr>
          ${i.map(([s,r,c])=>n`<th>${s}</th><td class="kpi-value ${c||""}">${r}</td>`)}
          ${i.length<2?n`<th></th><td></td>`:d}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${e.map(([t,i,s])=>n`<div class="kpi-chip"><span class="kpi-label">${t}</span><span class="kpi-value ${s||""}">${i}</span></div>`)}
    </div>`}_renderRank(e,t,i,s){let r=t.current_rank||"Unranked",c=Number(t.progress_pct||0),l=r.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${e}</span></span>
          <span class="rank-name" style="color: ${(ie[Object.keys(ie).find(h=>r.startsWith(h))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${l?n`<div class="unreal-position">
              <span class="unreal-number">${t.unreal_rank?`#${this._num(t.unreal_rank)}`:"Unreal"}</span>
              ${s?n`<span class="rank-delta-badge ${s>0?"pos":"neg"}">${s>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(s))} places</span>`:d}
            </div>`:this._config.hide_rank_progress?d:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,c))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${l?"Unreal leaderboard position":`${c}% to promotion`}</span>
          <span>${i}</span>
        </div>
      </div>
    `}_renderSessionView(e,t,i){let s=Number(t.net_rank_delta_pct||0),r=p=>p>=0?`+${p}%`:`${p}%`,c=t.session_id,l=c?`session:${c}:${t.matches_played||0}`:"";l&&this._config.show_match_feed!==!1&&this._ensureMatches(l,{session_id:c});let m=(l?this._matchLists[l]?.matches:void 0)||t.recent_matches||[],u=m.filter(p=>this._isRanked(p)),b=u.filter(p=>p.rank_track===i.game_mode&&typeof p.unreal_rank_change=="number").reduce((p,g)=>p+(g.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",t.matches_played||0,"cyan"],["Wins",`${t.wins||0} \u{1F3C6}`,"gold"],["Kills",t.kills||0],["K/D",t.kd_ratio||0],...u.length?[["Rank Net",r(s),s>=0?"positive":"negative"]]:[]])}

      ${u.length?this._renderRank("Battle Royale Ranked",i,`${s>=0?"\u25B2":"\u25BC"} ${r(s)} this session`,b||null):d}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${t.matches_played||m.length} ${(t.matches_played||m.length)===1?"match":"matches"})</span>
              ${e?n`<span class="tracking-live">Tracking Live</span>`:d}
            </div>
            ${this._renderMatchList(l||"session",m,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:d}
    `}_renderMatchList(e,t,i){let s=this._config.max_feed_matches||10,r=this._showAllMatches[e],c=r?t:t.slice(0,s);return n`
      <div class="match-list">
        ${c.length?c.map(l=>this._renderMatch(l)):n`<div class="empty">${i}</div>`}
        ${t.length>s?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[e]:!r}}>
              ${r?"Show fewer":`Show all ${t.length}`}
            </button>`:d}
      </div>
    `}_renderMatch(e){let t=this._playlist(e.playlist_id),i=t?.image,s=`${e.timestamp}|${e.playlist_id}`,r=this._expandedMatch===s,c=(e.match_count||1)>1,l=this._isRanked(e),h=(m,u)=>u==null||u===""?d:n`<div class="detail"><span>${m}</span><b>${u}</b></div>`;return n`
      <div class="match-card ${e.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:s}>
        <div class="match-row">
          ${i?n`<img class="match-art" src=${i} alt="" loading="lazy" @error=${E} />`:d}
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
                </span>`:d}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?n`<div class="match-details" @click=${m=>m.stopPropagation()}>
              ${i?n`<img class="detail-art" src=${i} alt="" @error=${E} />`:d}
              ${t?.description?n`<p class="detail-desc">${t.description}</p>`:d}
              <div class="detail-grid">
                ${h("Finished",this._formatWhen(e.timestamp))}
                ${h("Mode",e.mode_name)}
                ${h("Placement",e.placement_text)}
                ${h("Kills",e.kills)}
                ${c?h("Games",e.match_count):d}
                ${c&&e.wins?h("Victories",e.wins):d}
                ${h("Time played",e.minutes?this._formatDuration(e.minutes):void 0)}
                ${h("Score",e.score?this._num(e.score):void 0)}
                ${h("Players outlived",e.players_outlived?this._num(e.players_outlived):void 0)}
                ${l?n`
                      ${h("Ranked track",e.rank_track)}
                      ${h("Rank after",e.unreal_rank?`${e.current_rank} #${this._num(e.unreal_rank)}`:e.current_rank)}
                      ${h("Rank change",e.rank_delta_pct?`${e.rank_delta_pct>0?"+":""}${e.rank_delta_pct}%`:void 0)}
                      ${h("Unreal places",e.unreal_rank_change?`${e.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(e.unreal_rank_change))}`:void 0)}`:d}
              </div>
              ${(e.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:d}
            </div>`:d}
      </div>
    `}_renderStatsView(e,t,i,s,r){let c=t.windows||{},l=t.window_labels||{},h=["lifetime",...["season","week","today"].filter(_=>c[_])],m=h.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},b=e.metrics||{},p={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0,players_outlived:e.players_outlived||0,hours_played:b.hours_played,favourite_mode:b.favourite_mode,modes:e.modes||{}},g=m==="lifetime"?p:c[m],w=this._selectedMode!=="all"?g.modes?.[this._selectedMode]:null,y=w&&w.matches!==void 0?w:g,k=y.minutes!==void 0?Math.round(y.minutes/60*10)/10:g.hours_played,C=g.favourite_mode,$=(_,O)=>n`
      <button class="mode-tab ${this._selectedMode===_?"active":""}" @click=${()=>this._selectedMode=_}>${O}</button>
    `;return n`
      <div class="tab-rows">
        ${h.length>1?n`<div class="mode-tabs">
              ${h.map(_=>n`<button class="mode-tab ${m===_?"active":""}" title=${l[_]||""}
                  @click=${()=>this._window=_}>${u[_]}</button>`)}
            </div>`:d}
        <div class="mode-tabs">
          ${$("all","Overall")} ${$("zero_build","Zero Build")} ${$("build","Build")} ${$("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${y.win_rate||0}%`,"cyan"],["K/D",y.kd||0],["Wins",n`${this._num(y.wins)} 🏆`,"gold"],["Matches",this._num(y.matches)],["Kills",this._num(y.kills)],["Outlived",this._num(y.players_outlived)],["Kills/Match",y.matches?this._num(y.kills/y.matches,2):0],...k!==void 0?[["Hours",this._num(k,1)]]:[]])}

      ${m==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(e):d}
      ${C?this._renderFavourite(C,m!=="lifetime"?u[m]:""):d}
      ${m!=="lifetime"&&g?.since?this._renderWindowMatches(m,u[m],g):d}

      ${this._renderRank("Battle Royale",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",s,`Peak: ${s.highest_rank||s.current_rank||"Unranked"}`)}
      ${r&&!["unavailable","unknown"].includes(r.state)?n`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(r.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(r.attributes?.points)} points${r.attributes?.counting_events!=null?` \xB7 ${r.attributes.counting_events} counting events`:""}</span>
              <span>${r.attributes?.peak_pr!=null?`Peak PR ${this._num(r.attributes.peak_pr)}`:"Competitive (tournaments)"}${r.attributes?.delta_pr?` \xB7 ${r.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(r.attributes.delta_pr))}`:""}</span></div>
          </div>`:d}
      ${t.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:d}
    `}_renderSpritesView(e){let t=e?.attributes||{},i=t.families||[],s=Number(e?.state||0),r=Number(t.owned_variants||0),c=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],h=[...i.filter(p=>this._spriteFilter==="missing"?p.owned_variants<p.total_variants:this._spriteFilter==="unmastered"?p.variants.some(g=>g.owned&&!g.mastered):this._spriteFilter==="complete"?p.complete:!0)].sort((p,g)=>this._spriteSort==="rarity"?c.indexOf(g.rarity)-c.indexOf(p.rarity)||(p.dex??0)-(g.dex??0):this._spriteSort==="progress"&&g.owned_variants/g.total_variants-p.owned_variants/p.total_variants||(p.dex??0)-(g.dex??0)),m=i.flatMap(p=>p.variants.filter(g=>!g.owned&&g.drop_chance_pct).map(g=>({f:p,v:g}))).sort((p,g)=>g.v.drop_chance_pct-p.v.drop_chance_pct||c.indexOf(p.f.rarity)-c.indexOf(g.f.rarity)).slice(0,6),u=(p,g)=>n`
      <button class="mode-tab ${this._spriteFilter===p?"active":""}" @click=${()=>this._spriteFilter=p}>${g}</button>`,b=(p,g)=>n`
      <button class="mode-tab ${this._spriteSort===p?"active":""}" @click=${()=>this._spriteSort=p}>${g}</button>`;return n`
      <div class="rank-section sprite-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,s)}">
          <span>${Math.round(s)}%</span>
        </div>
        <div class="sprite-summary-main">
          <div class="rank-header">
            <span class="rank-title"><span>Sprite collection</span></span>
            <span class="muted">Game update ${t.version||"?"}</span>
          </div>
          <div class="sprite-stats">
            <span><b>${r}</b>/${t.total_variants} variants</span>
            <span><b>${t.owned_families}</b>/${t.total_families} sprites</span>
            <span><b>${t.complete_families??0}</b> full sets</span>
            <span>★ <b>${t.mastered_variants||0}</b>/${r} mastered</span>
          </div>
          ${t.equipped?n`<div class="rank-meta"><span>Equipped: <b>${t.equipped.variant}</b></span></div>`:d}
        </div>
      </div>

      ${(t.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">By game update${t.cumulative?n` · all-time ${t.cumulative.owned_variants}/${t.cumulative.total_variants}`:d}</div>
            ${t.versions.map(p=>n`
              <div class="version-row ${p.current?"current":""}">
                <span>${p.version}${p.current?" (now)":""}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,p.completion_pct)}%"></div></div>
                <span>${p.owned_variants}/${p.total_variants}</span>
              </div>`)}
          </div>`:d}

      ${m.length?n`<div class="split-section">
            <div class="section-title">Next to hunt (highest drop chance)</div>
            <div class="hunt-row">
              ${m.map(({f:p,v:g})=>n`
                <div class="hunt-item" style="--rarity:${be[p.rarity]||"#9CA3AF"}" title="${g.name}" @click=${()=>this._expandedSprite=p.id}>
                  ${g.icon?n`<img src=${g.icon} alt="" loading="lazy" @error=${E} />`:d}
                  <span>${g.label==="Base"?p.name.replace(/ Sprite$/,""):`${g.label}`}</span>
                  <small>${g.drop_chance_pct}%</small>
                </div>`)}
            </div>
          </div>`:d}

      <div class="tab-rows">
        <div class="mode-tabs">${u("all","All")} ${u("missing","Missing")} ${u("unmastered","To master")} ${u("complete","Full sets")}</div>
        <div class="mode-tabs">${b("dex","Dex")} ${b("rarity","Rarity")} ${b("progress","Progress")}</div>
      </div>

      <div class="sprite-grid">
        ${h.length?h.map(p=>{let g=this._expandedSprite===p.id;return n`
                <div class="sprite-card ${p.owned?"":"missing"} ${g?"open":""} ${p.complete?"complete":""}"
                  style="--rarity:${be[p.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=g?null:p.id}>
                  ${p.icon?n`<img src=${p.icon} alt="" loading="lazy" @error=${E} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  <span class="sprite-name">${p.name.replace(/ Sprite$/,"")}</span>
                  <span class="sprite-count">${p.owned_variants}/${p.total_variants}${p.mastered?n` · ★${p.mastered}`:d}</span>
                  <span class="sprite-dots">
                    ${(p.variants||[]).map(w=>n`<i class="dot ${w.owned?"owned":""} ${w.mastered?"mastered":""}" title=${w.label}></i>`)}
                  </span>
                </div>
                ${g?this._renderSpriteDetail(p):d}`}):n`<div class="empty">Nothing matches this filter.</div>`}
      </div>
    `}_renderSpriteDetail(e){return n`
      <div class="sprite-detail" style="--rarity:${be[e.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${e.icon_large||e.icon?n`<img src=${e.icon_large||e.icon} alt="" @error=${E} />`:d}
          <div>
            <b>${e.name}</b> <span class="tag rarity-tag">${e.rarity||""}</span>
            ${e.description?n`<p class="detail-desc">${e.description}</p>`:d}
            ${e.hint?n`<p class="detail-desc hint">📍 ${e.hint}</p>`:d}
            ${e.boons?.length?n`<div class="boon-list">${e.boons.map(t=>n`<span class="tag" title=${t.description||""}>${t.name}${t.chance!=null?` \xB7 ${t.chance}%`:""}</span>`)}</div>`:d}
          </div>
        </div>
        <div class="variant-tiles">
          ${(e.variants||[]).map(t=>n`
            <div class="variant-tile ${t.owned?"":"missing"} ${t.mastered?"mastered":""}" title=${t.name}>
              ${t.icon?n`<img src=${t.icon} alt="" loading="lazy" @error=${E} />`:d}
              <span class="variant-name">${t.label}</span>
              <span class="variant-status">
                ${t.owned?n`${t.mastered?"\u2605 Mastered":t.xp?`${this._num(t.xp)} XP`:"Owned"}${t.count>1?` \xB7 \xD7${t.count}`:""}`:t.drop_chance_pct!=null?`Missing \xB7 ${t.drop_chance_pct}%`:"Missing \xB7 special"}
              </span>
            </div>`)}
        </div>
      </div>
    `}_renderWindowMatches(e,t,i){let s=`window:${e}:${i.since}:${i.matches}`;this._ensureMatches(s,{since:i.since});let r=this._matchLists[s],c=r?.matches||[],l=r?.tracked??0,h=i.matches||0;return n`
      <div class="match-feed-header">
        <span>${t} matches (${l}${h>l?` of ${h}`:""})</span>
        ${h>l?n`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>`:d}
      </div>
      ${r?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(s,c,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(e,t){let i=this._playlist(e.playlist_id),s=i?.image,r=/ropesmile|reload/i.test(e.playlist_id+e.name)?"reload":/nobuild|zero build/i.test(e.playlist_id+e.name)?"zero_build":"build";return n`
      <div class="feature-card ${s?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${t?` \xB7 ${t}`:""}</span>
          <span class="feature-value">${i?.name||e.name}</span>
          <span class="feature-sub">${this._num(e.matches)} matches</span>
        </div>
        ${s?n`<img class="feature-art" src=${s} alt="" @error=${E} />`:n`<ha-icon class="feature-icon" icon=${nt[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(e){let t=e.metrics||{},i=Object.values(e.inputs||{}).filter(r=>r.share_pct>=1),s=e.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",t.kills_per_minute??0],["Avg Match",`${t.avg_match_minutes??0}m`],["Score/Match",this._num(t.score_per_match)],["Solo Top 10",`${t.solo_top10_rate??0}%`],["Solo Top 25",`${t.solo_top25_rate??0}%`]])}
      </div>

      ${i.length>1?n`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${i.map((r,c)=>n`<div class="split-seg seg-${c}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${i.map((r,c)=>n`<span><i class="dot seg-${c}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
            </div>
          </div>`:d}

      ${Object.keys(s).length?n`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(r=>s[r]).map(r=>n`<div class="size-row">
                <span class="size-name">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
                <span>${this._num(s[r].matches)} m</span>
                <span>${s[r].win_rate}% win</span>
                <span>${s[r].kd} K/D</span>
              </div>`)}
          </div>`:d}
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(e,t){return!(t.region!=="all"&&e.region_group!==t.region||(t.mode==="Ranked"?!e.ranked:t.mode!=="all"&&e.mode!==t.mode)||t.team!=="all"&&e.team!==t.team||t.platform!=="all"&&!(e.platform_groups||[]).includes(t.platform))}_setFilter(e,t){this._filters={...this._currentFilters(),[e]:t}}_renderEventsView(){let e=this._events;if(e.loading&&!e.list)return n`<div class="empty">Loading tournaments…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(e.list===null)return n`<div class="empty">Tournament schedule is not available right now.</div>`;let t=e.list||[],i=this._currentFilters(),s=[...new Set(t.map(l=>l.region_group))].sort(),r=t.filter(l=>this._matchesFilters(l,i)).filter(l=>l.windows.some(h=>this._windowState(h)!=="finished")||this._expandedEvent===l.key),c=(l,h)=>n`
      <select class="filter-select" .value=${i[l]} @change=${m=>this._setFilter(l,m.target.value)}>
        ${h.map(([m,u])=>n`<option value=${m} ?selected=${i[l]===m}>${u}</option>`)}
      </select>
    `;return n`
      <div class="event-filters">
        ${c("region",[["all","All regions"],...s.map(l=>[l,l])])}
        ${c("mode",[["all","Mode"],["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked cups"]])}
        ${c("team",[["all","Team"],["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]])}
        ${c("platform",[["all","Platform"],["PC","PC"],["Console","Console"],["Mobile","Mobile"]])}
        ${this._filters&&JSON.stringify(this._filters)!==JSON.stringify({...this._filters,...this._defaultFilters()})?n`<button class="filter-reset" @click=${()=>this._filters=null} title="Clear all filters">
              <ha-icon icon="mdi:filter-remove-outline"></ha-icon><span>Reset</span>
            </button>`:d}
      </div>
      <div class="match-feed-header">
        <span>Tournaments (${r.length})</span>
        <span class="muted">UK time · schedule only</span>
      </div>
      <div class="match-list events">
        ${r.length?r.map(l=>this._renderEvent(l)):n`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(e){let t=e.windows.find(c=>this._windowState(c)==="live");if(t)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(t.end)-this._now)}`,live:!0,soon:!1};let i=e.windows.find(c=>this._windowState(c)==="upcoming");if(!i)return{text:"Finished",live:!1,soon:!1};let s=Date.parse(i.begin)-this._now,r=s<7*864e5;return{text:`${this._formatWhen(i.begin)}${i.label?` \xB7 ${i.label}`:""}${r?` \xB7 in ${this._formatSpan(s)}`:""}`,live:!1,soon:r}}_renderEvent(e){let t=this._eventTiming(e),i=this._expandedEvent===e.key,s=[e.mode,e.team,e.ranked?"Ranked":null,...e.platform_groups||[],e.region].filter(Boolean);return n`
      <div class="event-card ${t.live?"live":""} ${i?"expanded":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(e)}>
          ${e.poster?n`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${E} />`:d}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${t.live?n`<span class="placement-badge win">LIVE</span>`:d}
            </div>
            <span class="match-mode ${t.soon?"soon":""}">${t.text}</span>
            <div class="tag-row">${s.map(r=>n`<span class="tag">${r}</span>`)}</div>
          </div>
          <ha-icon class="chevron" icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${i?this._renderEventDetails(e):d}
      </div>
    `}_renderEventDetails(e){let t=e.loading_screen||e.poster;return n`
      <div class="event-details">
        ${t?n`<img class="event-hero" src=${t} alt="" @error=${E} />`:d}
        ${e.subtitle&&e.subtitle!==e.name?n`<div class="detail-sub">${e.subtitle}</div>`:d}
        ${e.description?n`<p class="detail-desc">${e.description}</p>`:d}
        ${e.schedule_info?n`<p class="detail-desc muted">${e.schedule_info}</p>`:d}
        ${e.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>`:d}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map(i=>{let s=this._windowState(i),r=`${e.event_id}|${i.window_id}`,c=this._leaderboards[r],l=Date.parse(i.begin)-this._now;return n`
              <div class="window-row ${s}">
                <div class="window-main">
                  <span class="window-label">${i.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(i.begin)} – ${this._formatWhen(i.end).split(", ").pop()}</span>
                  <span class="window-status ${s}">
                    ${s==="live"?`Live \xB7 ${this._formatSpan(Date.parse(i.end)-this._now)} left`:s==="finished"?"Finished":l<7*864e5?`in ${this._formatSpan(l)}`:"Upcoming"}
                  </span>
                  ${s!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(e.event_id,i.window_id)}>
                        ${c?.loading?"Loading\u2026":c?.data?"Refresh":"Leaderboard"}
                      </button>`:d}
                </div>
                ${c?this._renderLeaderboard(c):d}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(e){if(e.error)return n`<div class="lb-note">${e.error}</div>`;if(!e.data)return e.loading?n`<div class="lb-note">Loading leaderboard…</div>`:d;let t=e.data,i=(s,r=!1)=>n`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(s.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(s.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(s.points)} pts</span>
        <span class="lb-extra">${s.matches}m · ${s.wins}W · ${s.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${t.player&&!t.entries.some(s=>s.is_player)?i(t.player,!0):d}
        ${t.entries.length?t.entries.map(s=>i(s,s.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${t.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(t.updated)}${t.total_pages?` \xB7 ${t.total_pages} pages`:""}</div>`:d}
      </div>
    `}};f([U({attribute:!1})],v.prototype,"hass",2),f([x()],v.prototype,"_config",2),f([x()],v.prototype,"_view",2),f([x()],v.prototype,"_window",2),f([x()],v.prototype,"_selectedMode",2),f([x()],v.prototype,"_loadingAction",2),f([x()],v.prototype,"_catalog",2),f([x()],v.prototype,"_avatar",2),f([x()],v.prototype,"_events",2),f([x()],v.prototype,"_filters",2),f([x()],v.prototype,"_expandedEvent",2),f([x()],v.prototype,"_expandedMatch",2),f([x()],v.prototype,"_leaderboards",2),f([x()],v.prototype,"_now",2),f([x()],v.prototype,"_matchLists",2),f([x()],v.prototype,"_showAllMatches",2),f([x()],v.prototype,"_expandedSprite",2),f([x()],v.prototype,"_spriteFilter",2),f([x()],v.prototype,"_spriteSort",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",v);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${st} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{v as FortniteActivityCard};
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
