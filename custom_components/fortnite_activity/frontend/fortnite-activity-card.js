var De=Object.defineProperty;var Ue=Object.getOwnPropertyDescriptor;var g=(n,a,e,t)=>{for(var s=t>1?void 0:t?Ue(a,e):a,i=n.length-1,r;i>=0;i--)(r=n[i])&&(s=(t?r(a,e,s):r(s))||s);return t&&s&&De(a,e,s),s};var G=globalThis,Z=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),be=new WeakMap,U=class{constructor(a,e,t){if(this._$cssResult$=!0,t!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=a,this.t=e}get styleSheet(){let a=this.o,e=this.t;if(Z&&a===void 0){let t=e!==void 0&&e.length===1;t&&(a=be.get(e)),a===void 0&&((this.o=a=new CSSStyleSheet).replaceSync(this.cssText),t&&be.set(e,a))}return a}toString(){return this.cssText}},_e=n=>new U(typeof n=="string"?n:n+"",void 0,se),O=(n,...a)=>{let e=n.length===1?n[0]:a.reduce((t,s,i)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new U(e,n,se)},ve=(n,a)=>{if(Z)n.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of a){let t=document.createElement("style"),s=G.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,n.appendChild(t)}},ie=Z?n=>n:n=>n instanceof CSSStyleSheet?(a=>{let e="";for(let t of a.cssRules)e+=t.cssText;return _e(e)})(n):n;var{is:Oe,defineProperty:Ne,getOwnPropertyDescriptor:Be,getOwnPropertyNames:He,getOwnPropertySymbols:je,getPrototypeOf:Ie}=Object,Y=globalThis,ye=Y.trustedTypes,We=ye?ye.emptyScript:"",Ve=Y.reactiveElementPolyfillSupport,N=(n,a)=>n,B={toAttribute(n,a){switch(a){case Boolean:n=n?We:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,a){let e=n;switch(a){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Q=(n,a)=>!Oe(n,a),$e={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:Q};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(a){this._$Ei(),(this.l??=[]).push(a)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(a,e=$e){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(a)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(a,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(a,t,e);s!==void 0&&Ne(this.prototype,a,s)}}static getPropertyDescriptor(a,e,t){let{get:s,set:i}=Be(this.prototype,a)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let c=s?.call(this);i?.call(this,r),this.requestUpdate(a,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(a){return this.elementProperties.get(a)??$e}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let a=Ie(this);a.finalize(),a.l!==void 0&&(this.l=[...a.l]),this.elementProperties=new Map(a.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,t=[...He(e),...je(e)];for(let s of t)this.createProperty(s,e[s])}let a=this[Symbol.metadata];if(a!==null){let e=litPropertyMetadata.get(a);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(a){let e=[];if(Array.isArray(a)){let t=new Set(a.flat(1/0).reverse());for(let s of t)e.unshift(ie(s))}else a!==void 0&&e.push(ie(a));return e}static _$Eu(a,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof a=="string"?a.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(a=>a(this))}addController(a){(this._$EO??=new Set).add(a),this.renderRoot!==void 0&&this.isConnected&&a.hostConnected?.()}removeController(a){this._$EO?.delete(a)}_$E_(){let a=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(a.set(t,this[t]),delete this[t]);a.size>0&&(this._$Ep=a)}createRenderRoot(){let a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(a=>a.hostConnected?.())}enableUpdating(a){}disconnectedCallback(){this._$EO?.forEach(a=>a.hostDisconnected?.())}attributeChangedCallback(a,e,t){this._$AK(a,t)}_$ET(a,e){let t=this.constructor.elementProperties.get(a),s=this.constructor._$Eu(a,t);if(s!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:B).toAttribute(e,t.type);this._$Em=a,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(a,e){let t=this.constructor,s=t._$Eh.get(a);if(s!==void 0&&this._$Em!==s){let i=t.getPropertyOptions(s),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:B;this._$Em=s;let c=r.fromAttribute(e,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(a,e,t,s=!1,i){if(a!==void 0){let r=this.constructor;if(s===!1&&(i=this[a]),t??=r.getPropertyOptions(a),!((t.hasChanged??Q)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(a)&&!this.hasAttribute(r._$Eu(a,t))))return;this.C(a,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(a,e,{useDefault:t,reflect:s,wrapped:i},r){t&&!(this._$Ej??=new Map).has(a)&&(this._$Ej.set(a,r??e??this[a]),i!==!0||r!==void 0)||(this._$AL.has(a)||(this.hasUpdated||t||(e=void 0),this._$AL.set(a,e)),s===!0&&this._$Em!==a&&(this._$Eq??=new Set).add(a))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let a=this.scheduleUpdate();return a!=null&&await a,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[s,i]of t){let{wrapped:r}=i,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let a=!1,e=this._$AL;try{a=this.shouldUpdate(e),a?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw a=!1,this._$EM(),t}a&&this._$AE(e)}willUpdate(a){}_$AE(a){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(a)),this.updated(a)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(a){return!0}update(a){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(a){}firstUpdated(a){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[N("elementProperties")]=new Map,S[N("finalized")]=new Map,Ve?.({ReactiveElement:S}),(Y.reactiveElementVersions??=[]).push("2.1.2");var pe=globalThis,xe=n=>n,J=pe.trustedTypes,we=J?J.createPolicy("lit-html",{createHTML:n=>n}):void 0,Me="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Re="?"+A,Ke=`<${Re}>`,R=document,j=()=>R.createComment(""),I=n=>n===null||typeof n!="object"&&typeof n!="function",he=Array.isArray,qe=n=>he(n)||typeof n?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Ee=/>/g,C=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ae=/"/g,Fe=/^(?:script|style|textarea|title)$/i,ue=n=>(a,...e)=>({_$litType$:n,strings:a,values:e}),l=ue(1),X=ue(2),lt=ue(3),F=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ce=new WeakMap,M=R.createTreeWalker(R,129);function Le(n,a){if(!he(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(a):a}var Ge=(n,a)=>{let e=n.length-1,t=[],s,i=a===2?"<svg>":a===3?"<math>":"",r=H;for(let c=0;c<e;c++){let o=n[c],p,u,h=-1,f=0;for(;f<o.length&&(r.lastIndex=f,u=r.exec(o),u!==null);)f=r.lastIndex,r===H?u[1]==="!--"?r=ke:u[1]!==void 0?r=Ee:u[2]!==void 0?(Fe.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=C):u[3]!==void 0&&(r=C):r===C?u[0]===">"?(r=s??H,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?C:u[3]==='"'?Ae:Se):r===Ae||r===Se?r=C:r===ke||r===Ee?r=H:(r=C,s=void 0);let m=r===C&&n[c+1].startsWith("/>")?" ":"";i+=r===H?o+Ke:h>=0?(t.push(p),o.slice(0,h)+Me+o.slice(h)+A+m):o+A+(h===-2?c:m)}return[Le(n,i+(n[e]||"<?>")+(a===2?"</svg>":a===3?"</math>":"")),t]},W=class n{constructor({strings:a,_$litType$:e},t){let s;this.parts=[];let i=0,r=0,c=a.length-1,o=this.parts,[p,u]=Ge(a,e);if(this.el=n.createElement(p,t),M.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=M.nextNode())!==null&&o.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Me)){let f=u[r++],m=s.getAttribute(h).split(A),$=/([.?@])?(.*)/.exec(f);o.push({type:1,index:i,name:$[2],strings:m,ctor:$[1]==="."?oe:$[1]==="?"?le:$[1]==="@"?ce:P}),s.removeAttribute(h)}else h.startsWith(A)&&(o.push({type:6,index:i}),s.removeAttribute(h));if(Fe.test(s.tagName)){let h=s.textContent.split(A),f=h.length-1;if(f>0){s.textContent=J?J.emptyScript:"";for(let m=0;m<f;m++)s.append(h[m],j()),M.nextNode(),o.push({type:2,index:++i});s.append(h[f],j())}}}else if(s.nodeType===8)if(s.data===Re)o.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(A,h+1))!==-1;)o.push({type:7,index:i}),h+=A.length-1}i++}}static createElement(a,e){let t=R.createElement("template");return t.innerHTML=a,t}};function z(n,a,e=n,t){if(a===F)return a;let s=t!==void 0?e._$Co?.[t]:e._$Cl,i=I(a)?void 0:a._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(a=z(n,s._$AS(n,a.values),s,t)),a}var ne=class{constructor(a,e){this._$AV=[],this._$AN=void 0,this._$AD=a,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(a){let{el:{content:e},parts:t}=this._$AD,s=(a?.creationScope??R).importNode(e,!0);M.currentNode=s;let i=M.nextNode(),r=0,c=0,o=t[0];for(;o!==void 0;){if(r===o.index){let p;o.type===2?p=new V(i,i.nextSibling,this,a):o.type===1?p=new o.ctor(i,o.name,o.strings,this,a):o.type===6&&(p=new de(i,this,a)),this._$AV.push(p),o=t[++c]}r!==o?.index&&(i=M.nextNode(),r++)}return M.currentNode=R,s}p(a){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(a,t,e),e+=t.strings.length-2):t._$AI(a[e])),e++}},V=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(a,e,t,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=a,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let a=this._$AA.parentNode,e=this._$AM;return e!==void 0&&a?.nodeType===11&&(a=e.parentNode),a}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(a,e=this){a=z(this,a,e),I(a)?a===d||a==null||a===""?(this._$AH!==d&&this._$AR(),this._$AH=d):a!==this._$AH&&a!==F&&this._(a):a._$litType$!==void 0?this.$(a):a.nodeType!==void 0?this.T(a):qe(a)?this.k(a):this._(a)}O(a){return this._$AA.parentNode.insertBefore(a,this._$AB)}T(a){this._$AH!==a&&(this._$AR(),this._$AH=this.O(a))}_(a){this._$AH!==d&&I(this._$AH)?this._$AA.nextSibling.data=a:this.T(R.createTextNode(a)),this._$AH=a}$(a){let{values:e,_$litType$:t}=a,s=typeof t=="number"?this._$AC(a):(t.el===void 0&&(t.el=W.createElement(Le(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new ne(s,this),r=i.u(this.options);i.p(e),this.T(r),this._$AH=i}}_$AC(a){let e=Ce.get(a.strings);return e===void 0&&Ce.set(a.strings,e=new W(a)),e}k(a){he(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let i of a)s===e.length?e.push(t=new n(this.O(j()),this.O(j()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(a=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);a!==this._$AB;){let t=xe(a).nextSibling;xe(a).remove(),a=t}}setConnected(a){this._$AM===void 0&&(this._$Cv=a,this._$AP?.(a))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(a,e,t,s,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=a,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(a,e=this,t,s){let i=this.strings,r=!1;if(i===void 0)a=z(this,a,e,0),r=!I(a)||a!==this._$AH&&a!==F,r&&(this._$AH=a);else{let c=a,o,p;for(a=i[0],o=0;o<i.length-1;o++)p=z(this,c[t+o],e,o),p===F&&(p=this._$AH[o]),r||=!I(p)||p!==this._$AH[o],p===d?a=d:a!==d&&(a+=(p??"")+i[o+1]),this._$AH[o]=p}r&&!s&&this.j(a)}j(a){a===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,a??"")}},oe=class extends P{constructor(){super(...arguments),this.type=3}j(a){this.element[this.name]=a===d?void 0:a}},le=class extends P{constructor(){super(...arguments),this.type=4}j(a){this.element.toggleAttribute(this.name,!!a&&a!==d)}},ce=class extends P{constructor(a,e,t,s,i){super(a,e,t,s,i),this.type=5}_$AI(a,e=this){if((a=z(this,a,e,0)??d)===F)return;let t=this._$AH,s=a===d&&t!==d||a.capture!==t.capture||a.once!==t.once||a.passive!==t.passive,i=a!==d&&(t===d||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,a),this._$AH=a}handleEvent(a){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,a):this._$AH.handleEvent(a)}},de=class{constructor(a,e,t){this.element=a,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(a){z(this,a)}};var Ze=pe.litHtmlPolyfillSupport;Ze?.(W,V),(pe.litHtmlVersions??=[]).push("3.3.3");var ze=(n,a,e)=>{let t=e?.renderBefore??a,s=t._$litPart$;if(s===void 0){let i=e?.renderBefore??null;t._$litPart$=s=new V(a.insertBefore(j(),i),i,void 0,e??{})}return s._$AI(n),s};var me=globalThis,E=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let a=super.createRenderRoot();return this.renderOptions.renderBefore??=a.firstChild,a}update(a){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(a),this._$Do=ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};E._$litElement$=!0,E.finalized=!0,me.litElementHydrateSupport?.({LitElement:E});var Ye=me.litElementPolyfillSupport;Ye?.({LitElement:E});(me.litElementVersions??=[]).push("4.2.2");var Qe={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:Q},Je=(n=Qe,a,e)=>{let{kind:t,metadata:s}=e,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),t==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(e.name,n),t==="accessor"){let{name:r}=e;return{set(c){let o=a.get.call(this);a.set.call(this,c),this.requestUpdate(r,o,n,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,n,c),c}}}if(t==="setter"){let{name:r}=e;return function(c){let o=this[r];a.call(this,c),this.requestUpdate(r,o,n,!0,c)}}throw Error("Unsupported decorator location: "+t)};function T(n){return(a,e)=>typeof e=="object"?Je(n,a,e):((t,s,i)=>{let r=s.hasOwnProperty(i);return s.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(s,i):void 0})(n,a,e)}function v(n){return T({...n,state:!0,attribute:!1})}var Pe=O`
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
`;var Xe=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (e.g. Peely) \u2014 looked up in the cosmetics catalogue",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Stats when idle, Events tab)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"},{value:"events_only",label:"Tournaments / Events Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"show_tournaments",label:"Show Events (tournament schedule) tab",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],K=class extends E{setConfig(a){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...a}}_valueChanged(a){if(!this._config||!this.hass)return;let e=a.target,t=a.detail?a.detail.value:e.value;this._config={...this._config,...t};let s=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){return!this.hass||!this._config?d:l`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Xe}
          .computeLabel=${a=>a.label||a.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=O`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};g([T({attribute:!1})],K.prototype,"hass",2),g([v()],K.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",K);var et="1.2.1";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var tt={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},te={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},at={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},ge={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},D=n=>{n.target.hidden=!0},Te=n=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:n}),q={at:0},L={at:0},fe=new Map,b=class extends E{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...ge};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Pe}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...ge,...e},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...ge}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-L.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _eventsEnabled(){return this._config.show_tournaments!==!1||this._config.layout==="events_only"}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this._entityCache.size)return!0;for(let s of this._entityCache.values())if(t.states[s]!==this.hass.states[s])return!0;return!1}updated(e){if(super.updated(e),!this.hass)return;let t=e.has("hass")&&!e.get("hass");t&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(e.has("_config")||t)&&this._scheduleAvatar()}async _loadCatalog(){(!q.promise||Date.now()-q.at>36e5)&&(q.at=Date.now(),q.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let e=await q.promise;this._catalog={season:e?.season,playlists:e?.playlists||{}}}async _loadEvents(e=!1){if(this.hass){(e||!L.promise||Date.now()-L.at>10*6e4)&&(L.at=Date.now(),L.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let t=await L.promise;this._events={list:t?.tournaments??null,defaultRegion:t?.default_region_group}}catch(t){L.promise=void 0,this._events={error:t?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let e=(this._config.avatar||"").trim();if(e!==this._avatarQuery){if(this._avatarQuery=e,window.clearTimeout(this._avatarTimer),e.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let t=e.toLowerCase();fe.has(t)||fe.set(t,this.hass.callWS({type:"fortnite_activity/cosmetic",query:e}).then(i=>i?.cosmetic||null).catch(()=>null));let s=await fe.get(t);this._avatarQuery===e&&(this._avatar=s)},800)}}async _loadLeaderboard(e,t){let s=`${e}|${t}`;if(!this._leaderboards[s]?.loading){this._leaderboards={...this._leaderboards,[s]:{...this._leaderboards[s],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:e,window_id:t,player_id:this._player});this._leaderboards={...this._leaderboards,[s]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[s]:{error:i?.message||"Leaderboard unavailable"}}}}}_ensureMatches(e,t){!this.hass||this._matchLists[e]||(this._matchLists={...this._matchLists,[e]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...t}).then(s=>{this._matchLists={...this._matchLists,[e]:{matches:s?.matches||[],tracked:s?.tracked_matches||0}}}).catch(s=>{this._matchLists={...this._matchLists,[e]:{error:s?.message||"Could not load matches"}}}))}_isRanked(e){return!!e.rank_delta_pct||!!e.unreal_rank_change||/habanero/i.test(e.playlist_id||"")}_findEntity(e,t){let s=this.hass?.states;if(!s)return;let i=this._player,r=`${i}:${e}:${t}`,c=this._entityCache.get(r);if(c&&s[c])return s[c];let o;for(let[p,u]of Object.entries(s))if(p.startsWith(`${e}.`)&&u.attributes?.fortnite_player_id===i&&u.attributes?.fortnite_entity_key===t){o=p;break}if(o||(o=[t,...tt[t]||[]].flatMap(h=>[`${e}.fortnite_${i}_${h}`,`${e}.fortnite_${i}_${i}_${h}`]).find(h=>s[h])),!!o)return this._entityCache.set(r,o),s[o]}async _callService(e,t={}){if(this.hass){this._loadingAction=e;try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t}),e==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(s){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${e}:`,s)}}}_setView(e){this._view=e,e==="events"&&this._loadEvents()}_toggleEvent(e){if(this._expandedEvent===e.key){this._expandedEvent=null;return}this._expandedEvent=e.key;let t=e.windows.find(s=>this._windowState(s)==="live")||[...e.windows].reverse().find(s=>this._windowState(s)==="finished");t&&!this._leaderboards[`${e.event_id}|${t.window_id}`]&&this._loadLeaderboard(e.event_id,t.window_id)}_formatRelativeTime(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return"";let s=Math.max(1,Math.round((this._now-t.getTime())/6e4));if(s<60)return`${s}m ago`;let i=Math.round(s/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),s=Math.round(e%60);return t>0?`${t}h ${s}m`:`${s}m`}_formatSpan(e){let t=Math.max(0,Math.round(e/6e4)),s=Math.floor(t/1440),i=Math.floor(t%1440/60),r=t%60;return s>0?`${s}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}_formatWhen(e){try{return Te(this.hass?.config?.time_zone).format(new Date(e)).replace(/\b(am|pm)\b/i,t=>t.toLowerCase())}catch{return Te().format(new Date(e))}}_num(e,t=0){return Number(e||0).toLocaleString("en-GB",{maximumFractionDigits:t,minimumFractionDigits:0})}_playlist(e){return e?this._catalog.playlists[e.toLowerCase()]:void 0}_windowState(e){let t=Date.parse(e.begin),s=Date.parse(e.end);return this._now>=s?"finished":this._now>=t?"live":"upcoming"}_rankBadge(e,t=30){let s=e||"Unranked",i=Object.keys(te).find(h=>s.startsWith(h));if(!i)return l`<span class="rank-badge unranked" style="width:${t}px;height:${t}px">–</span>`;let[r,c]=te[i],o=(s.match(/\b(I{1,3})$/)||[])[1]||"",p=`g-${i}-${t}`;return l`<span class="rank-badge" title=${s} style="width:${t}px;height:${t}px">
      ${X`<svg viewBox="0 0 40 44" width=${t} height=${t} aria-hidden="true">
        <defs><linearGradient id=${p} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${c}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?X`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:X`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${o}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return l`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let e=this._player,t=this._findEntity("sensor","current_session"),s=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),c=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing"),p=this._findEntity("sensor","profile");if(!t&&!s&&!o)return l`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${e}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let u=o?.state==="on"||t?.state==="active",h=t?.attributes||{},f=s?.attributes||{},m=p?.attributes||{},$={...i?.attributes||{},current_rank:i?.state},y={...r?.attributes||{},current_rank:r?.state},k=this._config.layout||"auto",x=this._view??(u?"session":"stats");k==="session_only"?x="session":k==="career_only"?x="stats":k==="events_only"&&(x="events"),x==="events"&&!this._eventsEnabled&&(x="stats");let w="",_={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};_[this._config.theme_accent||""]&&(w+=`--accent: ${_[this._config.theme_accent]};`),this._config.custom_background&&(w+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let ae=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return l`
      <ha-card class=${ae} style="${w}">
        ${this._renderHeader(e,u,h,f,m,c,$,y)}
        ${this._config.show_sub_buttons!==!1&&k!=="events_only"?this._renderButtons(x,u):d}
        ${x==="session"?this._renderSessionView(u,h,$):x==="events"?this._renderEventsView():this._renderStatsView(f,m,$,y)}
      </ha-card>
    `}_renderHeader(e,t,s,i,r,c,o,p){let u=r.display_name||e.charAt(0).toUpperCase()+e.slice(1),h=r.season||this._catalog.season,f=this._config.show_platforms!==!1?r.platforms||[]:[],m=i.metrics?.last_played,$=c?.attributes||{},y=Number(c?.state),k=Number($.account_level||0),x=this._avatar?.icon,w=this._config.compact?20:24;return l`
      <div class="fa-header">
        <div class="player-avatar ${x?"has-image":""}">
          ${x?l`<img src=${x} alt=${this._avatar?.name||""} @error=${D} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${u}</h2>
            <span class="header-ranks">
              ${o.current_rank&&o.current_rank!=="Unranked"?this._rankBadge(o.current_rank,w):d}
              ${p.current_rank&&p.current_rank!=="Unranked"?this._rankBadge(p.current_rank,w):d}
            </span>
          </div>
          <div class="player-meta">
            ${h?.number?l`<span class="level-badge">S${h.number} · ${h.days_left}d left</span>`:d}
            ${!this._config.hide_season_level&&y>0?l`<span class="level-badge">Lvl ${y}</span>`:d}
            ${!this._config.hide_account_level&&k>0?l`<span>Acct ${k.toLocaleString()}</span>`:d}
            ${m?.time&&!t?l`<span title=${m.name||""}>Played ${this._formatRelativeTime(m.time)}</span>`:d}
          </div>
          ${f.length?l`<div class="platforms">
                ${f.map(_=>l`<span class="platform-chip" title=${_.name||_.label}>${_.label}${_.name?l` · ${_.name}`:d}</span>`)}
              </div>`:d}
        </div>
        <div class="status-pill ${t?"live":"idle"}">
          ${t?l`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(s.duration_minutes||0)}</span>`:l`<span>IDLE</span>`}
        </div>
      </div>
      ${h?.progress_pct!==void 0&&!this._config.compact?l`<div class="season-bar" title="Season ${h.number}: ${h.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,h.progress_pct)}%"></div>
          </div>`:d}
    `}_liveEventCount(){let e=this._currentFilters();return(this._events.list||[]).filter(t=>this._matchesFilters(t,e)&&t.windows.some(s=>this._windowState(s)==="live")).length}_renderButtons(e,t){let s=this._config.layout||"auto",i=this._eventsEnabled?this._liveEventCount():0,r=(c,o,p,u=0)=>l`
      <button class="bubble-sub-button ${e===c?"active":""}" @click=${()=>this._setView(c)} title=${p}>
        <ha-icon icon=${o}></ha-icon><span class="btn-label">${p}</span>
        ${u>0?l`<span class="notify-badge" title="${u} live">${u}</span>`:d}
      </button>
    `;return l`
      <div class="sub-button-row">
        ${s!=="career_only"?r("session","mdi:lightning-bolt",t?"Live Session":"Last Session"):d}
        ${s!=="session_only"?r("stats","mdi:trophy-outline","Stats"):d}
        ${this._eventsEnabled&&s==="auto"?r("events","mdi:tournament","Events",i):d}
        ${t?l`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:l`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`}
        <button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
          <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
          <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
        </button>
      </div>
    `}_renderKpis(e){if(this._config.compact){let t=[];for(let s=0;s<e.length;s+=2)t.push(e.slice(s,s+2));return l`<table class="stat-table"><tbody>
        ${t.map(s=>l`<tr>
          ${s.map(([i,r,c])=>l`<th>${i}</th><td class="kpi-value ${c||""}">${r}</td>`)}
          ${s.length<2?l`<th></th><td></td>`:d}
        </tr>`)}
      </tbody></table>`}return l`<div class="kpi-row">
      ${e.map(([t,s,i])=>l`<div class="kpi-chip"><span class="kpi-label">${t}</span><span class="kpi-value ${i||""}">${s}</span></div>`)}
    </div>`}_renderRank(e,t,s,i){let r=t.current_rank||"Unranked",c=Number(t.progress_pct||0),o=r.startsWith("Unreal");return l`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${e}</span></span>
          <span class="rank-name" style="color: ${(te[Object.keys(te).find(p=>r.startsWith(p))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${o?l`<div class="unreal-position">
              <span class="unreal-number">${t.unreal_rank?`#${this._num(t.unreal_rank)}`:"Unreal"}</span>
              ${i?l`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:d}
            </div>`:this._config.hide_rank_progress?d:l`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,c))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${o?"Unreal leaderboard position":`${c}% to promotion`}</span>
          <span>${s}</span>
        </div>
      </div>
    `}_renderSessionView(e,t,s){let i=Number(t.net_rank_delta_pct||0),r=m=>m>=0?`+${m}%`:`${m}%`,c=t.session_id,o=c?`session:${c}:${t.matches_played||0}`:"";o&&this._config.show_match_feed!==!1&&this._ensureMatches(o,{session_id:c});let u=(o?this._matchLists[o]?.matches:void 0)||t.recent_matches||[],h=u.filter(m=>this._isRanked(m)),f=h.filter(m=>m.rank_track===s.game_mode&&typeof m.unreal_rank_change=="number").reduce((m,$)=>m+($.unreal_rank_change||0),0);return l`
      ${this._renderKpis([["Matches",t.matches_played||0,"cyan"],["Wins",`${t.wins||0} \u{1F3C6}`,"gold"],["Kills",t.kills||0],["K/D",t.kd_ratio||0],...h.length?[["Rank Net",r(i),i>=0?"positive":"negative"]]:[]])}

      ${h.length?this._renderRank("Battle Royale Ranked",s,`${i>=0?"\u25B2":"\u25BC"} ${r(i)} this session`,f||null):d}

      ${this._config.show_match_feed!==!1?l`
            <div class="match-feed-header">
              <span>Match Feed (${t.matches_played||u.length} ${(t.matches_played||u.length)===1?"match":"matches"})</span>
              ${e?l`<span class="tracking-live">Tracking Live</span>`:d}
            </div>
            ${this._renderMatchList(o||"session",u,l`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:d}
    `}_renderMatchList(e,t,s){let i=this._config.max_feed_matches||10,r=this._showAllMatches[e],c=r?t:t.slice(0,i);return l`
      <div class="match-list">
        ${c.length?c.map(o=>this._renderMatch(o)):l`<div class="empty">${s}</div>`}
        ${t.length>i?l`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[e]:!r}}>
              ${r?"Show fewer":`Show all ${t.length}`}
            </button>`:d}
      </div>
    `}_renderMatch(e){let t=this._playlist(e.playlist_id),s=t?.image,i=`${e.timestamp}|${e.playlist_id}`,r=this._expandedMatch===i,c=(e.match_count||1)>1,o=this._isRanked(e),p=(u,h)=>h==null||h===""?d:l`<div class="detail"><span>${u}</span><b>${h}</b></div>`;return l`
      <div class="match-card ${e.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:i}>
        <div class="match-row">
          ${s?l`<img class="match-art" src=${s} alt="" loading="lazy" @error=${D} />`:d}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${e.match_number}${(e.match_count||1)>1?` \xD7${e.match_count}`:""}</span>
              <span class="placement-badge ${e.is_victory?"win":""}">${e.placement_text}</span>
            </div>
            <span class="match-mode">${e.mode_name} • ${this._formatRelativeTime(e.timestamp)}</span>
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${e.kills}</span>
            ${e.rank_delta_pct&&this._isRanked(e)?l`<span class="rank-delta-badge ${e.rank_delta_pct>=0?"pos":"neg"}">
                  ${e.rank_delta_pct>=0?`+${e.rank_delta_pct}%`:`${e.rank_delta_pct}%`}
                </span>`:d}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?l`<div class="match-details" @click=${u=>u.stopPropagation()}>
              ${s?l`<img class="detail-art" src=${s} alt="" @error=${D} />`:d}
              ${t?.description?l`<p class="detail-desc">${t.description}</p>`:d}
              <div class="detail-grid">
                ${p("Finished",this._formatWhen(e.timestamp))}
                ${p("Mode",e.mode_name)}
                ${p("Placement",e.placement_text)}
                ${p("Kills",e.kills)}
                ${c?p("Games",e.match_count):d}
                ${c&&e.wins?p("Victories",e.wins):d}
                ${p("Time played",e.minutes?this._formatDuration(e.minutes):void 0)}
                ${p("Score",e.score?this._num(e.score):void 0)}
                ${p("Players outlived",e.players_outlived?this._num(e.players_outlived):void 0)}
                ${o?l`
                      ${p("Ranked track",e.rank_track)}
                      ${p("Rank after",e.unreal_rank?`${e.current_rank} #${this._num(e.unreal_rank)}`:e.current_rank)}
                      ${p("Rank change",e.rank_delta_pct?`${e.rank_delta_pct>0?"+":""}${e.rank_delta_pct}%`:void 0)}
                      ${p("Unreal places",e.unreal_rank_change?`${e.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(e.unreal_rank_change))}`:void 0)}`:d}
              </div>
              ${(e.match_count||1)>1?l`<small class="muted">Several games finished between polls; totals are combined.</small>`:d}
            </div>`:d}
      </div>
    `}_renderStatsView(e,t,s,i){let r=t.windows||{},c=t.window_labels||{},o=["lifetime",...["season","week","today"].filter(_=>r[_])],p=o.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},h=e.metrics||{},f={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0,players_outlived:e.players_outlived||0,hours_played:h.hours_played,favourite_mode:h.favourite_mode,modes:e.modes||{}},m=p==="lifetime"?f:r[p],$=this._selectedMode!=="all"?m.modes?.[this._selectedMode]:null,y=$&&$.matches!==void 0?$:m,k=y.minutes!==void 0?Math.round(y.minutes/60*10)/10:m.hours_played,x=m.favourite_mode,w=(_,ae)=>l`
      <button class="mode-tab ${this._selectedMode===_?"active":""}" @click=${()=>this._selectedMode=_}>${ae}</button>
    `;return l`
      <div class="tab-rows">
        ${o.length>1?l`<div class="mode-tabs">
              ${o.map(_=>l`<button class="mode-tab ${p===_?"active":""}" title=${c[_]||""}
                  @click=${()=>this._window=_}>${u[_]}</button>`)}
            </div>`:d}
        <div class="mode-tabs">
          ${w("all","Overall")} ${w("zero_build","Zero Build")} ${w("build","Build")} ${w("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${y.win_rate||0}%`,"cyan"],["K/D",y.kd||0],["Wins",l`${this._num(y.wins)} 🏆`,"gold"],["Matches",this._num(y.matches)],["Kills",this._num(y.kills)],["Outlived",this._num(y.players_outlived)],["Kills/Match",y.matches?this._num(y.kills/y.matches,2):0],...k!==void 0?[["Hours",this._num(k,1)]]:[]])}

      ${p==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(e):d}
      ${x?this._renderFavourite(x,p!=="lifetime"?u[p]:""):d}
      ${p!=="lifetime"&&m?.since?this._renderWindowMatches(p,u[p],m):d}

      ${this._renderRank("Battle Royale",s,`Peak: ${s.highest_rank||s.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
    `}_renderWindowMatches(e,t,s){let i=`window:${e}:${s.since}:${s.matches}`;this._ensureMatches(i,{since:s.since});let r=this._matchLists[i],c=r?.matches||[],o=r?.tracked??0,p=s.matches||0;return l`
      <div class="match-feed-header">
        <span>${t} matches (${o}${p>o?` of ${p}`:""})</span>
        ${p>o?l`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>`:d}
      </div>
      ${r?.loading?l`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,c,l`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(e,t){let s=this._playlist(e.playlist_id),i=s?.image,r=/ropesmile|reload/i.test(e.playlist_id+e.name)?"reload":/nobuild|zero build/i.test(e.playlist_id+e.name)?"zero_build":"build";return l`
      <div class="feature-card ${i?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${t?` \xB7 ${t}`:""}</span>
          <span class="feature-value">${s?.name||e.name}</span>
          <span class="feature-sub">${this._num(e.matches)} matches</span>
        </div>
        ${i?l`<img class="feature-art" src=${i} alt="" @error=${D} />`:l`<ha-icon class="feature-icon" icon=${at[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(e){let t=e.metrics||{},s=Object.values(e.inputs||{}).filter(r=>r.matches>0),i=e.team_sizes||{};return l`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",t.kills_per_minute??0],["Avg Match",`${t.avg_match_minutes??0}m`],["Score/Match",this._num(t.score_per_match)],["Solo Top 10",`${t.solo_top10_rate??0}%`],["Solo Top 25",`${t.solo_top25_rate??0}%`]])}
      </div>

      ${s.length>1?l`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${s.map((r,c)=>l`<div class="split-seg seg-${c}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${s.map((r,c)=>l`<span><i class="dot seg-${c}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
            </div>
          </div>`:d}

      ${Object.keys(i).length?l`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(r=>i[r]).map(r=>l`<div class="size-row">
                <span class="size-name">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
                <span>${this._num(i[r].matches)} m</span>
                <span>${i[r].win_rate}% win</span>
                <span>${i[r].kd} K/D</span>
              </div>`)}
          </div>`:d}
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(e,t){return!(t.region!=="all"&&e.region_group!==t.region||(t.mode==="Ranked"?!e.ranked:t.mode!=="all"&&e.mode!==t.mode)||t.team!=="all"&&e.team!==t.team||t.platform!=="all"&&!(e.platform_groups||[]).includes(t.platform))}_setFilter(e,t){this._filters={...this._currentFilters(),[e]:t}}_renderEventsView(){let e=this._events;if(e.loading&&!e.list)return l`<div class="empty">Loading tournaments…</div>`;if(e.error)return l`<div class="empty">${e.error}</div>`;if(e.list===null)return l`<div class="empty">Tournament schedule is not available right now.</div>`;let t=e.list||[],s=this._currentFilters(),i=[...new Set(t.map(o=>o.region_group))].sort(),r=t.filter(o=>this._matchesFilters(o,s)).filter(o=>o.windows.some(p=>this._windowState(p)!=="finished")||this._expandedEvent===o.key),c=(o,p)=>l`
      <select class="filter-select" .value=${s[o]} @change=${u=>this._setFilter(o,u.target.value)}>
        ${p.map(([u,h])=>l`<option value=${u} ?selected=${s[o]===u}>${h}</option>`)}
      </select>
    `;return l`
      <div class="event-filters">
        ${c("region",[["all","All regions"],...i.map(o=>[o,o])])}
        ${c("mode",[["all","Mode"],["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked cups"]])}
        ${c("team",[["all","Team"],["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]])}
        ${c("platform",[["all","Platform"],["PC","PC"],["Console","Console"],["Mobile","Mobile"]])}
        ${this._filters&&JSON.stringify(this._filters)!==JSON.stringify({...this._filters,...this._defaultFilters()})?l`<button class="filter-reset" @click=${()=>this._filters=null} title="Clear all filters">
              <ha-icon icon="mdi:filter-remove-outline"></ha-icon><span>Reset</span>
            </button>`:d}
      </div>
      <div class="match-feed-header">
        <span>Tournaments (${r.length})</span>
        <span class="muted">UK time · schedule only</span>
      </div>
      <div class="match-list events">
        ${r.length?r.map(o=>this._renderEvent(o)):l`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(e){let t=e.windows.find(c=>this._windowState(c)==="live");if(t)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(t.end)-this._now)}`,live:!0,soon:!1};let s=e.windows.find(c=>this._windowState(c)==="upcoming");if(!s)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(s.begin)-this._now,r=i<7*864e5;return{text:`${this._formatWhen(s.begin)}${s.label?` \xB7 ${s.label}`:""}${r?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:r}}_renderEvent(e){let t=this._eventTiming(e),s=this._expandedEvent===e.key,i=[e.mode,e.team,e.ranked?"Ranked":null,...e.platform_groups||[],e.region].filter(Boolean);return l`
      <div class="event-card ${t.live?"live":""} ${s?"expanded":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(e)}>
          ${e.poster?l`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${D} />`:d}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${t.live?l`<span class="placement-badge win">LIVE</span>`:d}
            </div>
            <span class="match-mode ${t.soon?"soon":""}">${t.text}</span>
            <div class="tag-row">${i.map(r=>l`<span class="tag">${r}</span>`)}</div>
          </div>
          <ha-icon class="chevron" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${s?this._renderEventDetails(e):d}
      </div>
    `}_renderEventDetails(e){let t=e.loading_screen||e.poster;return l`
      <div class="event-details">
        ${t?l`<img class="event-hero" src=${t} alt="" @error=${D} />`:d}
        ${e.subtitle&&e.subtitle!==e.name?l`<div class="detail-sub">${e.subtitle}</div>`:d}
        ${e.description?l`<p class="detail-desc">${e.description}</p>`:d}
        ${e.schedule_info?l`<p class="detail-desc muted">${e.schedule_info}</p>`:d}
        ${e.platform_groups?.length?l`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>`:d}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map(s=>{let i=this._windowState(s),r=`${e.event_id}|${s.window_id}`,c=this._leaderboards[r],o=Date.parse(s.begin)-this._now;return l`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${s.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(s.begin)} – ${this._formatWhen(s.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(s.end)-this._now)} left`:i==="finished"?"Finished":o<7*864e5?`in ${this._formatSpan(o)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?l`<button class="mini-button" @click=${()=>this._loadLeaderboard(e.event_id,s.window_id)}>
                        ${c?.loading?"Loading\u2026":c?.data?"Refresh":"Leaderboard"}
                      </button>`:d}
                </div>
                ${c?this._renderLeaderboard(c):d}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(e){if(e.error)return l`<div class="lb-note">${e.error}</div>`;if(!e.data)return e.loading?l`<div class="lb-note">Loading leaderboard…</div>`:d;let t=e.data,s=(i,r=!1)=>l`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return l`
      <div class="leaderboard">
        ${t.player&&!t.entries.some(i=>i.is_player)?s(t.player,!0):d}
        ${t.entries.length?t.entries.map(i=>s(i,i.is_player)):l`<div class="lb-note">No scores yet.</div>`}
        ${t.updated?l`<div class="lb-note">Updated ${this._formatRelativeTime(t.updated)}${t.total_pages?` \xB7 ${t.total_pages} pages`:""}</div>`:d}
      </div>
    `}};g([T({attribute:!1})],b.prototype,"hass",2),g([v()],b.prototype,"_config",2),g([v()],b.prototype,"_view",2),g([v()],b.prototype,"_window",2),g([v()],b.prototype,"_selectedMode",2),g([v()],b.prototype,"_loadingAction",2),g([v()],b.prototype,"_catalog",2),g([v()],b.prototype,"_avatar",2),g([v()],b.prototype,"_events",2),g([v()],b.prototype,"_filters",2),g([v()],b.prototype,"_expandedEvent",2),g([v()],b.prototype,"_expandedMatch",2),g([v()],b.prototype,"_leaderboards",2),g([v()],b.prototype,"_now",2),g([v()],b.prototype,"_matchLists",2),g([v()],b.prototype,"_showAllMatches",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",b);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${et} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{b as FortniteActivityCard};
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
