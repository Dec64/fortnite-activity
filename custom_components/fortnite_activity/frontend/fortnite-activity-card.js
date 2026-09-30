var Ue=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var v=(n,e,t,s)=>{for(var a=s>1?void 0:s?ze(e,t):e,i=n.length-1,r;i>=0;i--)(r=n[i])&&(a=(s?r(e,t,a):r(a))||a);return s&&a&&Ue(e,t,a),a};var K=globalThis,Q=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),me=new WeakMap,z=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Q&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=me.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&me.set(t,e))}return e}toString(){return this.cssText}},ge=n=>new z(typeof n=="string"?n:n+"",void 0,X),L=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((s,a,i)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[i+1],n[0]);return new z(t,n,X)},fe=(n,e)=>{if(Q)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=K.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,n.appendChild(s)}},ee=Q?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ge(t)})(n):n;var{is:Le,defineProperty:Oe,getOwnPropertyDescriptor:Ne,getOwnPropertyNames:De,getOwnPropertySymbols:He,getPrototypeOf:Be}=Object,Y=globalThis,be=Y.trustedTypes,je=be?be.emptyScript:"",Ve=Y.reactiveElementPolyfillSupport,O=(n,e)=>n,N={toAttribute(n,e){switch(e){case Boolean:n=n?je:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},G=(n,e)=>!Le(n,e),_e={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Oe(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:i}=Ne(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let c=a?.call(this);i?.call(this,r),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let e=Be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let t=this.properties,s=[...De(t),...He(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(ee(a))}else e!==void 0&&t.push(ee(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){let i=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(t,s.type);this._$Em=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,t){let s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let i=s.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:N;this._$Em=a;let c=r.fromAttribute(t,i.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(e,t,s,a=!1,i){if(e!==void 0){let r=this.constructor;if(a===!1&&(i=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??G)(i,t)||s.useDefault&&s.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:i},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),i!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,i]of s){let{wrapped:r}=i,c=this[a];r!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,i,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[O("elementProperties")]=new Map,S[O("finalized")]=new Map,Ve?.({ReactiveElement:S}),(Y.reactiveElementVersions??=[]).push("2.1.2");var oe=globalThis,ve=n=>n,J=oe.trustedTypes,ye=J?J.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ae="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+A,Ie=`<${Ee}>`,M=document,H=()=>M.createComment(""),B=n=>n===null||typeof n!="object"&&typeof n!="function",le=Array.isArray,We=n=>le(n)||typeof n?.[Symbol.iterator]=="function",te=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,xe=/>/g,E=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,ke=/"/g,Ce=/^(?:script|style|textarea|title)$/i,ce=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=ce(1),rt=ce(2),nt=ce(3),R=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Se=new WeakMap,C=M.createTreeWalker(M,129);function Me(n,e){if(!le(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(e):e}var qe=(n,e)=>{let t=n.length-1,s=[],a,i=e===2?"<svg>":e===3?"<math>":"",r=D;for(let c=0;c<t;c++){let o=n[c],p,u,h=-1,f=0;for(;f<o.length&&(r.lastIndex=f,u=r.exec(o),u!==null);)f=r.lastIndex,r===D?u[1]==="!--"?r=$e:u[1]!==void 0?r=xe:u[2]!==void 0?(Ce.test(u[2])&&(a=RegExp("</"+u[2],"g")),r=E):u[3]!==void 0&&(r=E):r===E?u[0]===">"?(r=a??D,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?E:u[3]==='"'?ke:we):r===ke||r===we?r=E:r===$e||r===xe?r=D:(r=E,a=void 0);let m=r===E&&n[c+1].startsWith("/>")?" ":"";i+=r===D?o+Ie:h>=0?(s.push(p),o.slice(0,h)+Ae+o.slice(h)+A+m):o+A+(h===-2?c:m)}return[Me(n,i+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},j=class n{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let i=0,r=0,c=e.length-1,o=this.parts,[p,u]=qe(e,t);if(this.el=n.createElement(p,s),C.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=C.nextNode())!==null&&o.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(Ae)){let f=u[r++],m=a.getAttribute(h).split(A),_=/([.?@])?(.*)/.exec(f);o.push({type:1,index:i,name:_[2],strings:m,ctor:_[1]==="."?ae:_[1]==="?"?ie:_[1]==="@"?re:T}),a.removeAttribute(h)}else h.startsWith(A)&&(o.push({type:6,index:i}),a.removeAttribute(h));if(Ce.test(a.tagName)){let h=a.textContent.split(A),f=h.length-1;if(f>0){a.textContent=J?J.emptyScript:"";for(let m=0;m<f;m++)a.append(h[m],H()),C.nextNode(),o.push({type:2,index:++i});a.append(h[f],H())}}}else if(a.nodeType===8)if(a.data===Ee)o.push({type:2,index:i});else{let h=-1;for(;(h=a.data.indexOf(A,h+1))!==-1;)o.push({type:7,index:i}),h+=A.length-1}i++}}static createElement(e,t){let s=M.createElement("template");return s.innerHTML=e,s}};function P(n,e,t=n,s){if(e===R)return e;let a=s!==void 0?t._$Co?.[s]:t._$Cl,i=B(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(n),a._$AT(n,t,s)),s!==void 0?(t._$Co??=[])[s]=a:t._$Cl=a),a!==void 0&&(e=P(n,a._$AS(n,e.values),a,s)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??M).importNode(t,!0);C.currentNode=a;let i=C.nextNode(),r=0,c=0,o=s[0];for(;o!==void 0;){if(r===o.index){let p;o.type===2?p=new V(i,i.nextSibling,this,e):o.type===1?p=new o.ctor(i,o.name,o.strings,this,e):o.type===6&&(p=new ne(i,this,e)),this._$AV.push(p),o=s[++c]}r!==o?.index&&(i=C.nextNode(),r++)}return C.currentNode=M,a}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},V=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),B(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&B(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=j.createElement(Me(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(t);else{let i=new se(a,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new j(e)),t}k(e){le(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let i of e)a===t.length?t.push(s=new n(this.O(H()),this.O(H()),this,this.options)):s=t[a],s._$AI(i),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ve(e).nextSibling;ve(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,a){let i=this.strings,r=!1;if(i===void 0)e=P(this,e,t,0),r=!B(e)||e!==this._$AH&&e!==R,r&&(this._$AH=e);else{let c=e,o,p;for(e=i[0],o=0;o<i.length-1;o++)p=P(this,c[s+o],t,o),p===R&&(p=this._$AH[o]),r||=!B(p)||p!==this._$AH[o],p===d?e=d:e!==d&&(e+=(p??"")+i[o+1]),this._$AH[o]=p}r&&!a&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ae=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},ie=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},re=class extends T{constructor(e,t,s,a,i){super(e,t,s,a,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??d)===R)return;let s=this._$AH,a=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==d&&(s===d||a);a&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ne=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var Ke=oe.litHtmlPolyfillSupport;Ke?.(j,V),(oe.litHtmlVersions??=[]).push("3.3.3");var Re=(n,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let i=t?.renderBefore??null;s._$litPart$=a=new V(e.insertBefore(H(),i),i,void 0,t??{})}return a._$AI(n),a};var de=globalThis,x=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};x._$litElement$=!0,x.finalized=!0,de.litElementHydrateSupport?.({LitElement:x});var Qe=de.litElementPolyfillSupport;Qe?.({LitElement:x});(de.litElementVersions??=[]).push("4.2.2");var Ye={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:G},Ge=(n=Ye,e,t)=>{let{kind:s,metadata:a}=t,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),i.set(t.name,n),s==="accessor"){let{name:r}=t;return{set(c){let o=e.get.call(this);e.set.call(this,c),this.requestUpdate(r,o,n,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,n,c),c}}}if(s==="setter"){let{name:r}=t;return function(c){let o=this[r];e.call(this,c),this.requestUpdate(r,o,n,!0,c)}}throw Error("Unsupported decorator location: "+s)};function F(n){return(e,t)=>typeof t=="object"?Ge(n,e,t):((s,a,i)=>{let r=a.hasOwnProperty(i);return a.constructor.createProperty(i,s),r?Object.getOwnPropertyDescriptor(a,i):void 0})(n,e,t)}function $(n){return F({...n,state:!0,attribute:!1})}var Pe=L`
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
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .player-identity {
    display: flex;
    align-items: center;
    gap: 12px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
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

  .window-tabs { margin-bottom: 8px; }
  .mode-tabs { flex-wrap: wrap; }
  .kpi-row.compact .kpi-value { font-size: 15px; }

  .feature-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 14px 16px;
    margin-bottom: 16px;
    border-radius: var(--card-radius);
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.75) 35%, rgba(0, 0, 0, 0.15)),
      var(--feature-art, none) center / cover no-repeat, var(--sub-btn-bg);
    color: #ffffff;
    overflow: hidden;
  }

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
    margin-right: 10px;
    flex-shrink: 0;
  }

  .match-card .match-left,
  .event-card .match-left { flex: 1; min-width: 0; }

  .event-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 10px 14px;
  }

  .event-card.live { border-color: rgba(255, 215, 0, 0.45); }
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
`;var Je=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (e.g. Peely) \u2014 looked up in the cosmetics catalogue",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Stats when idle, Events tab)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"show_tournaments",label:"Show Events (tournament schedule) tab",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],I=class extends x{setConfig(e){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...e}}_valueChanged(e){if(!this._config||!this.hass)return;let t=e.target,s=e.detail?e.detail.value:t.value;this._config={...this._config,...s};let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?d:l`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Je}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=L`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};v([F({attribute:!1})],I.prototype,"hass",2),v([$()],I.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",I);var Ze="1.0.9";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var Xe={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},Te={Bronze:"#CD7F32",Silver:"#C0C0C0",Gold:"#FFD700",Platinum:"#00E5FF",Diamond:"#3B82F6",Elite:"#A855F7",Champion:"#F59E0B",Unreal:"#EF4444"},pe={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10},he=n=>{n.target.hidden=!0},W={at:0},ue=new Map,y=class extends x{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...pe};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._tournaments={};this._entityCache=new Map;this._avatarQuery="";this._tournamentsAt=0}static get styles(){return Pe}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...pe,...t},this._entityCache.clear()}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...pe}}getCardSize(){return 6}get _player(){return(this._config.player||"player1").toLowerCase()}updated(t){super.updated(t),this.hass&&(t.has("hass")&&!t.get("hass")&&this._loadCatalog(),(t.has("_config")||t.has("hass")&&!t.get("hass"))&&this._scheduleAvatar())}async _loadCatalog(){(!W.promise||Date.now()-W.at>36e5)&&(W.at=Date.now(),W.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await W.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let s=t.toLowerCase();ue.has(s)||ue.set(s,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await ue.get(s);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadTournaments(t=!1){if(!(!this.hass||this._tournaments.loading)&&!(!t&&Date.now()-this._tournamentsAt<30*6e4&&this._tournaments.tournaments!==void 0)){this._tournaments={...this._tournaments,loading:!0,error:void 0};try{let s=await this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player});this._tournaments={region:s?.region,tournaments:s?.tournaments??null},this._tournamentsAt=Date.now()}catch(s){this._tournaments={error:s?.message||"Could not load tournaments"}}}}_findEntity(t,s){let a=this.hass?.states;if(!a)return;let i=this._player,r=`${i}:${t}:${s}`,c=this._entityCache.get(r);if(c&&a[c])return a[c];let o;for(let[p,u]of Object.entries(a))if(p.startsWith(`${t}.`)&&u.attributes?.fortnite_player_id===i&&u.attributes?.fortnite_entity_key===s){o=p;break}if(o||(o=[s,...Xe[s]||[]].flatMap(h=>[`${t}.fortnite_${i}_${h}`,`${t}.fortnite_${i}_${i}_${h}`]).find(h=>a[h])),!!o)return this._entityCache.set(r,o),a[o]}async _callService(t,s={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...s}),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadTournaments()}_formatRelativeTime(t){if(!t)return"";let s=new Date(t);if(isNaN(s.getTime()))return"";let a=Math.max(1,Math.round((Date.now()-s.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let s=Math.floor(t/60),a=t%60;return s>0?`${s}h ${a}m`:`${a}m`}_formatWhen(t){let s=new Date(t),a=this.hass?.locale?.language||void 0;return s.toLocaleString(a,{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}_num(t,s=0){return Number(t||0).toLocaleString(this.hass?.locale?.language||void 0,{maximumFractionDigits:s,minimumFractionDigits:0})}_rankLabel(t){let s=t.current_rank||"Unranked";return t.unreal_rank?`${s} #${Number(t.unreal_rank).toLocaleString()}`:s}_rankColor(t){let s=Object.keys(Te).find(a=>(t||"").startsWith(a));return s?Te[s]:"var(--secondary-text-color)"}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}render(){if(!this.hass)return l`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,s=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),c=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing"),p=this._findEntity("sensor","profile");if(!s&&!a&&!o)return l`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let u=o?.state==="on"||s?.state==="active",h=s?.attributes||{},f=a?.attributes||{},m=p?.attributes||{},_={...i?.attributes||{},current_rank:i?.state},g={...r?.attributes||{},current_rank:r?.state},b=this._view??(u?"session":"stats");this._config.layout==="session_only"?b="session":this._config.layout==="career_only"&&(b="stats"),b==="events"&&this._config.show_tournaments===!1&&(b="stats");let w="",U={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};return U[this._config.theme_accent||""]&&(w+=`--accent: ${U[this._config.theme_accent]};`),this._config.custom_background&&(w+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`),l`
      <ha-card class="theme-${this._config.card_style||"bubble"}" style="${w}">
        ${this._renderHeader(t,u,h,f,m,c)}
        ${this._config.show_sub_buttons!==!1?this._renderButtons(b,u):d}
        ${b==="session"?this._renderSessionView(u,h,_):b==="events"?this._renderEventsView():this._renderStatsView(f,m,_,g)}
      </ha-card>
    `}_renderHeader(t,s,a,i,r,c){let o=r.display_name||t.charAt(0).toUpperCase()+t.slice(1),p=r.season||this._catalog.season,u=this._config.show_platforms!==!1?r.platforms||[]:[],h=i.metrics?.last_played,f=c?.attributes||{},m=Number(c?.state),_=Number(f.account_level||0),g=this._avatar?.icon;return l`
      <div class="card-header">
        <div class="player-identity">
          <div class="player-avatar ${g?"has-image":""}">
            ${g?l`<img src=${g} alt=${this._avatar?.name||""} @error=${he} />`:t.slice(0,2).toUpperCase()}
          </div>
          <div class="player-info">
            <h2>${o}</h2>
            <div class="player-meta">
              ${p?.number?l`<span class="level-badge">S${p.number} · ${p.days_left}d left</span>`:d}
              ${!this._config.hide_season_level&&m>0?l`<span class="level-badge">Lvl ${m}</span>`:d}
              ${!this._config.hide_account_level&&_>0?l`<span>Acct ${_.toLocaleString()}</span>`:d}
              ${h?.time&&!s?l`<span title=${h.name||""}>Played ${this._formatRelativeTime(h.time)}</span>`:d}
            </div>
            ${u.length?l`<div class="platforms">
                  ${u.map(b=>l`<span class="platform-chip" title=${b.name||b.label}>${b.label}${b.name?l` · ${b.name}`:d}</span>`)}
                </div>`:d}
          </div>
        </div>
        <div class="status-pill ${s?"live":"idle"}">
          ${s?l`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:l`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(t,s){let a=(i,r,c)=>l`
      <button class="bubble-sub-button ${t===i?"active":""}" @click=${()=>this._setView(i)}>
        <ha-icon icon=${r}></ha-icon><span>${c}</span>
      </button>
    `;return l`
      <div class="sub-button-row">
        ${this._config.layout!=="career_only"?a("session","mdi:lightning-bolt",s?"Live Session":"Last Session"):d}
        ${this._config.layout!=="session_only"?a("stats","mdi:trophy-outline","Stats"):d}
        ${this._config.show_tournaments!==!1&&this._config.layout==="auto"?a("events","mdi:tournament","Events"):d}
        ${s?l`<button class="bubble-sub-button" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span>${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:l`<button class="bubble-sub-button" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span>${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`}
        <button class="bubble-sub-button" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
          <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
          <span>${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
        </button>
      </div>
    `}_renderRank(t,s,a){let i=this._rankLabel(s),r=Number(s.progress_pct||0);return l`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${t}</span>
          <span class="rank-name" style="color: ${this._rankColor(s.current_rank)}">${i}</span>
        </div>
        ${this._config.hide_rank_progress||(s.current_rank||"").startsWith("Unreal")?d:l`<div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,r))}%;"></div>
            </div>`}
        <div class="rank-meta">
          <span>${(s.current_rank||"").startsWith("Unreal")?"Top rank":`${r}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,s,a){let i=Number(s.net_rank_delta_pct||0),r=s.recent_matches||[],c=r.slice(0,this._config.max_feed_matches||10),o=p=>p>=0?`+${p}%`:`${p}%`;return l`
      <div class="kpi-row">
        <div class="kpi-chip"><span class="kpi-label">Matches</span><span class="kpi-value cyan">${s.matches_played||0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Victories</span><span class="kpi-value gold">${s.wins||0} 🏆</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills</span><span class="kpi-value">${s.kills||0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Session K/D</span><span class="kpi-value">${s.kd_ratio||0}</span></div>
        <div class="kpi-chip">
          <span class="kpi-label">Rank Net</span>
          <span class="kpi-value ${i>=0?"positive":"negative"}">${o(i)}</span>
        </div>
      </div>

      ${this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${o(i)} this session`)}

      ${this._config.show_match_feed!==!1?l`
            <div class="match-feed-header">
              <span>Match Feed (${r.length} ${r.length===1?"entry":"entries"})</span>
              ${t?l`<span class="tracking-live">Tracking Live</span>`:d}
            </div>
            <div class="match-list">
              ${c.length>0?c.map(p=>this._renderMatch(p)):l`<div class="empty">
                    No matches recorded in this session yet.<br />
                    <small>Matches appear here once Fortnite publishes the finished game's stats.</small>
                  </div>`}
            </div>
          `:d}
    `}_renderMatch(t){let s=this._playlist(t.playlist_id)?.image;return l`
      <div class="match-card ${t.is_victory?"victory":""}">
        ${s?l`<img class="match-art" src=${s} alt="" loading="lazy" @error=${he} />`:d}
        <div class="match-left">
          <div class="match-headline">
            <span class="match-num">#${t.match_number}${(t.match_count||1)>1?` \xD7${t.match_count}`:""}</span>
            <span class="placement-badge ${t.is_victory?"win":""}">${t.placement_text}</span>
          </div>
          <span class="match-mode">${t.mode_name} • ${this._formatRelativeTime(t.timestamp)}</span>
        </div>
        <div class="match-right">
          <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${t.kills}</span>
          ${t.rank_delta_pct?l`<span class="rank-delta-badge ${t.rank_delta_pct>=0?"pos":"neg"}">
                ${t.rank_delta_pct>=0?`+${t.rank_delta_pct}%`:`${t.rank_delta_pct}%`}
              </span>`:d}
        </div>
      </div>
    `}_renderStatsView(t,s,a,i){let r=s.windows||{},c=s.window_labels||{},o=["lifetime",...["season","week","today"].filter(k=>r[k])],p=o.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},h=t.metrics||{},f={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:h.hours_played,kills_per_match:h.kills_per_match,avg_match_minutes:h.avg_match_minutes,favourite_mode:h.favourite_mode,modes:t.modes||{}},m=p==="lifetime"?f:r[p],_=this._selectedMode!=="all"?m.modes?.[this._selectedMode]:null,g=_&&_.matches!==void 0?_:m,b=g.minutes!==void 0?Math.round(g.minutes/60*10)/10:m.hours_played,w=m.favourite_mode,U=this._playlist(w?.playlist_id)?.image,q=(k,Fe)=>l`
      <button class="mode-tab ${this._selectedMode===k?"active":""}" @click=${()=>this._selectedMode=k}>${Fe}</button>
    `;return l`
      ${o.length>1?l`<div class="mode-tabs window-tabs">
            ${o.map(k=>l`<button class="mode-tab ${p===k?"active":""}" title=${c[k]||""}
                @click=${()=>this._window=k}>${u[k]}</button>`)}
          </div>`:d}

      <div class="mode-tabs">
        ${q("all","Overall")} ${q("zero_build","Zero Build")} ${q("build","Build")} ${q("reload","Reload")}
      </div>

      <div class="kpi-row">
        <div class="kpi-chip"><span class="kpi-label">Win Rate</span><span class="kpi-value cyan">${g.win_rate||0}%</span></div>
        <div class="kpi-chip"><span class="kpi-label">K/D</span><span class="kpi-value">${g.kd||0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Wins</span><span class="kpi-value gold">${this._num(g.wins)} 🏆</span></div>
        <div class="kpi-chip"><span class="kpi-label">Matches</span><span class="kpi-value">${this._num(g.matches)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills</span><span class="kpi-value">${this._num(g.kills)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Outlived</span><span class="kpi-value">${this._num(g.players_outlived)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills / Match</span><span class="kpi-value">${g.matches?this._num(g.kills/g.matches,2):0}</span></div>
        ${b!==void 0?l`<div class="kpi-chip"><span class="kpi-label">Hours</span><span class="kpi-value">${this._num(b,1)}</span></div>`:d}
      </div>

      ${p==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):d}

      ${w?l`<div class="feature-card" style=${U?`--feature-art: url('${U}')`:""}>
            <span class="feature-label">Favourite mode${p!=="lifetime"?` \xB7 ${u[p]}`:""}</span>
            <span class="feature-value">${this._playlist(w.playlist_id)?.name||w.name}</span>
            <span class="feature-sub">${this._num(w.matches)} matches</span>
          </div>`:d}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
    `}_renderLifetimeExtras(t){let s=t.metrics||{},a=Object.values(t.inputs||{}).filter(r=>r.matches>0),i=t.team_sizes||{};return l`
      <div class="kpi-row compact">
        <div class="kpi-chip"><span class="kpi-label">Kills / Min</span><span class="kpi-value">${s.kills_per_minute??0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Avg Match</span><span class="kpi-value">${s.avg_match_minutes??0}m</span></div>
        <div class="kpi-chip"><span class="kpi-label">Score / Match</span><span class="kpi-value">${this._num(s.score_per_match)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Solo Top 10</span><span class="kpi-value">${s.solo_top10_rate??0}%</span></div>
        <div class="kpi-chip"><span class="kpi-label">Solo Top 25</span><span class="kpi-value">${s.solo_top25_rate??0}%</span></div>
      </div>

      ${a.length>1?l`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((r,c)=>l`<div class="split-seg seg-${c}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((r,c)=>l`<span><i class="dot seg-${c}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
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
    `}_renderEventsView(){let t=this._tournaments;if(t.loading&&!t.tournaments)return l`<div class="empty">Loading tournaments…</div>`;if(t.error)return l`<div class="empty">${t.error}</div>`;if(t.tournaments===null)return l`<div class="empty">Tournament schedule is not available right now.</div>`;let s=t.tournaments||[];return l`
      <div class="match-feed-header">
        <span>Tournaments${t.region?` \xB7 ${t.region}`:""}</span>
        <span class="muted">Schedule only — check eligibility in game</span>
      </div>
      <div class="match-list">
        ${s.length?s.map(a=>l`<div class="event-card ${a.is_live?"live":""}">
                ${a.poster?l`<img class="event-art" src=${a.poster} alt="" loading="lazy" @error=${he} />`:d}
                <div class="match-left">
                  <div class="match-headline">
                    <span class="event-name">${a.name}</span>
                    ${a.is_live?l`<span class="placement-badge win">LIVE</span>`:d}
                  </div>
                  <span class="match-mode">${a.is_live?`Ends ${this._formatWhen(a.end)}`:this._formatWhen(a.begin)}${a.round?` \xB7 Round ${Number(a.round)+1}`:""}</span>
                </div>
              </div>`):l`<div class="empty">No upcoming tournaments listed for this region.</div>`}
      </div>
    `}};v([F({attribute:!1})],y.prototype,"hass",2),v([$()],y.prototype,"_config",2),v([$()],y.prototype,"_view",2),v([$()],y.prototype,"_window",2),v([$()],y.prototype,"_selectedMode",2),v([$()],y.prototype,"_loadingAction",2),v([$()],y.prototype,"_catalog",2),v([$()],y.prototype,"_avatar",2),v([$()],y.prototype,"_tournaments",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",y);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${Ze} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{y as FortniteActivityCard};
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
