var it=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var y=(h,n,e,t)=>{for(var a=t>1?void 0:t?st(n,e):n,i=h.length-1,r;i>=0;i--)(r=h[i])&&(a=(t?r(n,e,a):r(a))||a);return t&&a&&it(n,e,a),a};var oe=globalThis,le=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,be=Symbol(),Pe=new WeakMap,Z=class{constructor(n,e,t){if(this._$cssResult$=!0,t!==be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(le&&n===void 0){let t=e!==void 0&&e.length===1;t&&(n=Pe.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),t&&Pe.set(e,n))}return n}toString(){return this.cssText}},Re=h=>new Z(typeof h=="string"?h:h+"",void 0,be),O=(h,...n)=>{let e=h.length===1?h[0]:n.reduce((t,a,i)=>t+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+h[i+1],h[0]);return new Z(e,h,be)},Fe=(h,n)=>{if(le)h.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let t=document.createElement("style"),a=oe.litNonce;a!==void 0&&t.setAttribute("nonce",a),t.textContent=e.cssText,h.appendChild(t)}},fe=le?h=>h:h=>h instanceof CSSStyleSheet?(n=>{let e="";for(let t of n.cssRules)e+=t.cssText;return Re(e)})(h):h;var{is:rt,defineProperty:nt,getOwnPropertyDescriptor:ot,getOwnPropertyNames:lt,getOwnPropertySymbols:pt,getPrototypeOf:ct}=Object,pe=globalThis,De=pe.trustedTypes,dt=De?De.emptyScript:"",ht=pe.reactiveElementPolyfillSupport,Q=(h,n)=>h,X={toAttribute(h,n){switch(n){case Boolean:h=h?dt:null;break;case Object:case Array:h=h==null?h:JSON.stringify(h)}return h},fromAttribute(h,n){let e=h;switch(n){case Boolean:e=h!==null;break;case Number:e=h===null?null:Number(h);break;case Object:case Array:try{e=JSON.parse(h)}catch{e=null}}return e}},ce=(h,n)=>!rt(h,n),Te={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),pe.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=Te){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let t=Symbol(),a=this.getPropertyDescriptor(n,t,e);a!==void 0&&nt(this.prototype,n,a)}}static getPropertyDescriptor(n,e,t){let{get:a,set:i}=ot(this.prototype,n)??{get(){return this[e]},set(r){this[e]=r}};return{get:a,set(r){let o=a?.call(this);i?.call(this,r),this.requestUpdate(n,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Te}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let n=ct(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let e=this.properties,t=[...lt(e),...pt(e)];for(let a of t)this.createProperty(a,e[a])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let a=this._$Eu(e,t);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let t=new Set(n.flat(1/0).reverse());for(let a of t)e.unshift(fe(a))}else n!==void 0&&e.push(fe(n));return e}static _$Eu(n,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(n.set(t,this[t]),delete this[t]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fe(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,t){this._$AK(n,t)}_$ET(n,e){let t=this.constructor.elementProperties.get(n),a=this.constructor._$Eu(n,t);if(a!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:X).toAttribute(e,t.type);this._$Em=n,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(n,e){let t=this.constructor,a=t._$Eh.get(n);if(a!==void 0&&this._$Em!==a){let i=t.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:X;this._$Em=a;let o=r.fromAttribute(e,i.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(n,e,t,a=!1,i){if(n!==void 0){let r=this.constructor;if(a===!1&&(i=this[n]),t??=r.getPropertyOptions(n),!((t.hasChanged??ce)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(n)&&!this.hasAttribute(r._$Eu(n,t))))return;this.C(n,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:t,reflect:a,wrapped:i},r){t&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,r??e??this[n]),i!==!0||r!==void 0)||(this._$AL.has(n)||(this.hasUpdated||t||(e=void 0),this._$AL.set(n,e)),a===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[a,i]of t){let{wrapped:r}=i,o=this[a];r!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,i,o)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw n=!1,this._$EM(),t}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[Q("elementProperties")]=new Map,D[Q("finalized")]=new Map,ht?.({ReactiveElement:D}),(pe.reactiveElementVersions??=[]).push("2.1.2");var ke=globalThis,Ne=h=>h,de=ke.trustedTypes,Be=de?de.createPolicy("lit-html",{createHTML:h=>h}):void 0,We="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+N,ut=`<${He}>`,V=document,ee=()=>V.createComment(""),te=h=>h===null||typeof h!="object"&&typeof h!="function",Se=Array.isArray,mt=h=>Se(h)||typeof h?.[Symbol.iterator]=="function",xe=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oe=/-->/g,Ue=/>/g,U=RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),je=/'/g,Ve=/"/g,qe=/^(?:script|style|textarea|title)$/i,Ee=h=>(n,...e)=>({_$litType$:h,strings:n,values:e}),s=Ee(1),T=Ee(2),Pt=Ee(3),I=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Ie=new WeakMap,j=V.createTreeWalker(V,129);function Ke(h,n){if(!Se(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return Be!==void 0?Be.createHTML(n):n}var gt=(h,n)=>{let e=h.length-1,t=[],a,i=n===2?"<svg>":n===3?"<math>":"",r=J;for(let o=0;o<e;o++){let c=h[o],u,g,p=-1,m=0;for(;m<c.length&&(r.lastIndex=m,g=r.exec(c),g!==null);)m=r.lastIndex,r===J?g[1]==="!--"?r=Oe:g[1]!==void 0?r=Ue:g[2]!==void 0?(qe.test(g[2])&&(a=RegExp("</"+g[2],"g")),r=U):g[3]!==void 0&&(r=U):r===U?g[0]===">"?(r=a??J,p=-1):g[1]===void 0?p=-2:(p=r.lastIndex-g[2].length,u=g[1],r=g[3]===void 0?U:g[3]==='"'?Ve:je):r===Ve||r===je?r=U:r===Oe||r===Ue?r=J:(r=U,a=void 0);let f=r===U&&h[o+1].startsWith("/>")?" ":"";i+=r===J?c+ut:p>=0?(t.push(u),c.slice(0,p)+We+c.slice(p)+N+f):c+N+(p===-2?o:f)}return[Ke(h,i+(h[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]},ae=class h{constructor({strings:n,_$litType$:e},t){let a;this.parts=[];let i=0,r=0,o=n.length-1,c=this.parts,[u,g]=gt(n,e);if(this.el=h.createElement(u,t),j.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=j.nextNode())!==null&&c.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(We)){let m=g[r++],f=a.getAttribute(p).split(N),w=/([.?@])?(.*)/.exec(m);c.push({type:1,index:i,name:w[2],strings:f,ctor:w[1]==="."?_e:w[1]==="?"?ye:w[1]==="@"?we:q}),a.removeAttribute(p)}else p.startsWith(N)&&(c.push({type:6,index:i}),a.removeAttribute(p));if(qe.test(a.tagName)){let p=a.textContent.split(N),m=p.length-1;if(m>0){a.textContent=de?de.emptyScript:"";for(let f=0;f<m;f++)a.append(p[f],ee()),j.nextNode(),c.push({type:2,index:++i});a.append(p[m],ee())}}}else if(a.nodeType===8)if(a.data===He)c.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(N,p+1))!==-1;)c.push({type:7,index:i}),p+=N.length-1}i++}}static createElement(n,e){let t=V.createElement("template");return t.innerHTML=n,t}};function H(h,n,e=h,t){if(n===I)return n;let a=t!==void 0?e._$Co?.[t]:e._$Cl,i=te(n)?void 0:n._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(h),a._$AT(h,e,t)),t!==void 0?(e._$Co??=[])[t]=a:e._$Cl=a),a!==void 0&&(n=H(h,a._$AS(h,n.values),a,t)),n}var ve=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:t}=this._$AD,a=(n?.creationScope??V).importNode(e,!0);j.currentNode=a;let i=j.nextNode(),r=0,o=0,c=t[0];for(;c!==void 0;){if(r===c.index){let u;c.type===2?u=new ie(i,i.nextSibling,this,n):c.type===1?u=new c.ctor(i,c.name,c.strings,this,n):c.type===6&&(u=new $e(i,this,n)),this._$AV.push(u),c=t[++o]}r!==c?.index&&(i=j.nextNode(),r++)}return j.currentNode=V,a}p(n){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}},ie=class h{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=H(this,n,e),te(n)?n===l||n==null||n===""?(this._$AH!==l&&this._$AR(),this._$AH=l):n!==this._$AH&&n!==I&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):mt(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==l&&te(this._$AH)?this._$AA.nextSibling.data=n:this.T(V.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:t}=n,a=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=ae.createElement(Ke(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===a)this._$AH.p(e);else{let i=new ve(a,this),r=i.u(this.options);i.p(e),this.T(r),this._$AH=i}}_$AC(n){let e=Ie.get(n.strings);return e===void 0&&Ie.set(n.strings,e=new ae(n)),e}k(n){Se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,a=0;for(let i of n)a===e.length?e.push(t=new h(this.O(ee()),this.O(ee()),this,this.options)):t=e[a],t._$AI(i),a++;a<e.length&&(this._$AR(t&&t._$AB.nextSibling,a),e.length=a)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let t=Ne(n).nextSibling;Ne(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,a,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=n,this.name=e,this._$AM=a,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=l}_$AI(n,e=this,t,a){let i=this.strings,r=!1;if(i===void 0)n=H(this,n,e,0),r=!te(n)||n!==this._$AH&&n!==I,r&&(this._$AH=n);else{let o=n,c,u;for(n=i[0],c=0;c<i.length-1;c++)u=H(this,o[t+c],e,c),u===I&&(u=this._$AH[c]),r||=!te(u)||u!==this._$AH[c],u===l?n=l:n!==l&&(n+=(u??"")+i[c+1]),this._$AH[c]=u}r&&!a&&this.j(n)}j(n){n===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},_e=class extends q{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===l?void 0:n}},ye=class extends q{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==l)}},we=class extends q{constructor(n,e,t,a,i){super(n,e,t,a,i),this.type=5}_$AI(n,e=this){if((n=H(this,n,e,0)??l)===I)return;let t=this._$AH,a=n===l&&t!==l||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,i=n!==l&&(t===l||a);a&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},$e=class{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){H(this,n)}};var bt=ke.litHtmlPolyfillSupport;bt?.(ae,ie),(ke.litHtmlVersions??=[]).push("3.3.3");var Ye=(h,n,e)=>{let t=e?.renderBefore??n,a=t._$litPart$;if(a===void 0){let i=e?.renderBefore??null;t._$litPart$=a=new ie(n.insertBefore(ee(),i),i,void 0,e??{})}return a._$AI(h),a};var Me=globalThis,R=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};R._$litElement$=!0,R.finalized=!0,Me.litElementHydrateSupport?.({LitElement:R});var ft=Me.litElementPolyfillSupport;ft?.({LitElement:R});(Me.litElementVersions??=[]).push("4.2.2");var xt={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:ce},vt=(h=xt,n,e)=>{let{kind:t,metadata:a}=e,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),t==="setter"&&((h=Object.create(h)).wrapped=!0),i.set(e.name,h),t==="accessor"){let{name:r}=e;return{set(o){let c=n.get.call(this);n.set.call(this,o),this.requestUpdate(r,c,h,!0,o)},init(o){return o!==void 0&&this.C(r,void 0,h,o),o}}}if(t==="setter"){let{name:r}=e;return function(o){let c=this[r];n.call(this,o),this.requestUpdate(r,c,h,!0,o)}}throw Error("Unsupported decorator location: "+t)};function B(h){return(n,e)=>typeof e=="object"?vt(h,n,e):((t,a,i)=>{let r=a.hasOwnProperty(i);return a.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(a,i):void 0})(h,n,e)}function $(h){return B({...h,state:!0,attribute:!1})}var Ge=O`
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
    container-type: inline-size;
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
  .vbucks-chip {
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: rgba(59, 130, 246, 0.18);
    color: #93C5FD;
    font-weight: 700;
  }
  .crew-chip {
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: linear-gradient(90deg, rgba(245, 158, 11, 0.3), rgba(168, 85, 247, 0.3));
    color: #FDE68A;
    font-weight: 700;
  }

  /* ---- Slim header (single-section cards) ---- */
  .fa-header.slim { margin-bottom: 10px; }
  .fa-header.slim .player-avatar { width: 32px; height: 32px; font-size: 13px; }
  .fa-header.slim .player-info h2 { font-size: 15px; }
  .fa-header.slim .name-row { gap: 8px; flex-wrap: nowrap; min-width: 0; }
  .fa-header.slim .name-row h2 { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fa-header.slim .vbucks-chip { white-space: nowrap; flex-shrink: 0; }

  /* ---- Battle Pass ---- */
  .bp { display: grid; gap: 10px; container-type: inline-size; }
  .bp-summary {
    padding: 12px 14px;
    border-radius: 14px;
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), rgba(121, 40, 202, 0.22)),
      rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .bp-summary-title { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; }
  .bp-summary-title ha-icon { --mdc-icon-size: 20px; color: var(--accent); }
  .bp-days { margin-left: auto; font-size: 11px; font-weight: 700; opacity: 0.8; }
  .bp-stats { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 4px; margin-top: 10px; }
  .bp-stats > div { display: flex; flex-direction: column; align-items: center; padding: 4px 2px; border-radius: 10px; background: rgba(0, 0, 0, 0.18); }
  .bp-stats b { font-size: 16px; line-height: 1.2; }
  .bp-stats span { font-size: 9px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; }
  .bp .gold, .bp .gold b { color: #FCD34D; }

  .bp-strip { display: flex; gap: 6px; overflow-x: auto; padding: 2px; scrollbar-width: thin; }
  .bp-thumb {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 0.06);
    overflow: hidden;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s, border-color 0.15s, transform 0.15s;
    color: inherit;
  }
  .bp-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-thumb:hover { opacity: 0.9; }
  .bp-thumb.active { opacity: 1; border-color: var(--accent); transform: scale(1.05); }

  .bp-set {
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    padding: 10px;
    display: grid;
    gap: 10px;
  }
  .bp-hero { display: grid; grid-template-columns: auto 84px minmax(0, 1fr) auto; align-items: center; gap: 10px; }
  .bp-hero-img {
    width: 84px;
    height: 84px;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 45%, transparent), rgba(121, 40, 202, 0.35));
  }
  .bp-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-hero-img ha-icon { --mdc-icon-size: 40px; opacity: 0.6; }
  .bp-hero-count { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.65; }
  .bp-hero-name { font-size: 18px; font-weight: 800; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bp-hero-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 12px; font-weight: 600; margin-top: 2px; }
  .bp-hero-types { font-size: 11px; opacity: 0.7; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .bp-nav {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    display: grid;
    place-items: center;
    padding: 0;
    cursor: pointer;
  }
  .bp-nav:hover { border-color: var(--accent); color: var(--accent); }
  .bp-nav ha-icon { --mdc-icon-size: 20px; }

  .bp-pages { display: flex; flex-wrap: wrap; gap: 6px; }
  .bp-pages .mini-button { display: inline-flex; align-items: center; gap: 6px; opacity: 0.75; border-color: rgba(255, 255, 255, 0.2); color: inherit; }
  .bp-pages .mini-button.bonus { border-style: dashed; }
  .bp-pages .mini-button.active { opacity: 1; border-color: var(--accent); background: color-mix(in srgb, var(--accent) 18%, transparent); color: var(--accent); }
  .bp-page-count { font-size: 10px; opacity: 0.7; }

  .bp-rewards { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
  .bp-reward { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .bp-reward-img {
    position: relative;
    aspect-ratio: 1;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: linear-gradient(160deg, rgba(96, 165, 250, 0.28), rgba(30, 41, 59, 0.6));
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .bp-reward.outfit .bp-reward-img { background: linear-gradient(160deg, rgba(168, 85, 247, 0.45), rgba(30, 41, 59, 0.6)); border-color: rgba(168, 85, 247, 0.6); }
  .bp-reward.vbucks .bp-reward-img { background: linear-gradient(160deg, rgba(252, 211, 77, 0.35), rgba(30, 41, 59, 0.6)); border-color: rgba(252, 211, 77, 0.6); }
  .bp-reward-img img { width: 86%; height: 86%; object-fit: contain; }
  .bp-reward.outfit .bp-reward-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-reward-img > ha-icon { --mdc-icon-size: 34px; opacity: 0.5; }
  .bp-cost {
    position: absolute;
    top: 4px;
    right: 4px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px 6px 1px 4px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    background: rgba(0, 0, 0, 0.6);
    color: #FDE68A;
  }
  .bp-cost ha-icon { --mdc-icon-size: 12px; }
  .bp-cost.character { color: #C4B5FD; }
  .bp-cost.included { color: #6EE7B7; padding: 1px 6px; font-size: 10px; }
  .bp-reward-name { font-size: 12px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bp-reward-type { font-size: 10px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.04em; }
  .bp-note { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11px; opacity: 0.6; }

  ha-card.compact .bp-rewards { grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); gap: 6px; }
  ha-card.compact .bp-hero { grid-template-columns: auto 64px minmax(0, 1fr) auto; }
  ha-card.compact .bp-hero-img { width: 64px; height: 64px; }
  ha-card.compact .bp-hero-name { font-size: 16px; }
  /* Narrow cards (dashboard columns, phones): the portrait strip handles navigation */
  @container (max-width: 400px) {
    .bp-hero { grid-template-columns: 64px minmax(0, 1fr); }
    .bp-hero-img { width: 64px; height: 64px; }
    .bp-nav { display: none; }
    .bp-hero-name { font-size: 16px; }
    .bp-rewards { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .bp-stats b { font-size: 14px; }
  }

  /* ---- Locker ---- */
  .locker { display: grid; gap: 10px; container-type: inline-size; }
  .locker-hero {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid color-mix(in srgb, var(--rarity) 45%, transparent);
    background: linear-gradient(135deg, color-mix(in srgb, var(--rarity) 25%, transparent), rgba(255, 255, 255, 0.03));
  }
  .locker-hero-img {
    width: 96px;
    height: 96px;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--rarity) 55%, transparent), rgba(15, 23, 42, 0.6));
  }
  .locker-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .locker-hero-img ha-icon { --mdc-icon-size: 44px; opacity: 0.6; }
  .locker-rarities { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .rarity-dot {
    font-size: 10px;
    font-weight: 800;
    padding: 1px 7px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rarity) 30%, transparent);
    border: 1px solid color-mix(in srgb, var(--rarity) 70%, transparent);
  }
  .locker-controls { display: flex; gap: 6px; align-items: center; }
  .locker-search {
    flex: 1;
    min-width: 0;
    font: inherit;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.2);
    color: inherit;
  }
  .locker-controls .mini-button { opacity: 0.75; border-color: rgba(255, 255, 255, 0.2); color: inherit; }
  .locker-controls .mini-button.active { opacity: 1; border-color: var(--accent); color: var(--accent); }
  .locker-img { background: linear-gradient(160deg, color-mix(in srgb, var(--rarity) 45%, transparent), rgba(30, 41, 59, 0.6)); border-color: color-mix(in srgb, var(--rarity) 50%, transparent); }
  .locker-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-reward.equipped .bp-reward-img { box-shadow: 0 0 0 2px var(--accent); }
  .locker-pager { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 12px; opacity: 0.85; }
  .locker-pager .bp-nav[disabled] { opacity: 0.3; cursor: default; }
  @container (max-width: 400px) {
    .locker-hero { grid-template-columns: 72px minmax(0, 1fr); }
    .locker-hero-img { width: 72px; height: 72px; }
    .locker-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  }

  .locker-tile { cursor: pointer; }
  .locker-tile.selected .bp-reward-img { box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6); }
  .locker-use {
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 4px;
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 2px;
    border-radius: 8px;
    border: none;
    background: var(--accent);
    color: #0b0f19;
    cursor: pointer;
  }
  .link-button { font: inherit; font-size: 11px; background: none; border: none; padding: 0; color: var(--accent); cursor: pointer; text-decoration: underline; }
  .muted { opacity: 0.6; }

  /* ---- Sprites (v1.11) ---- */
  .sp-summary { display: grid; grid-template-columns: auto repeat(3, minmax(0, 1fr)); gap: 8px; align-items: center; margin-bottom: 12px; }
  .sp-stat { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px 4px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); text-align: center; }
  .sp-stat b { font-size: 20px; line-height: 1.15; }
  .sp-stat b small { font-size: 12px; opacity: 0.6; font-weight: 700; }
  .sp-stat span { font-size: 11px; opacity: 0.75; font-weight: 600; }
  .sp-stat.gold b { color: #FCD34D; }
  .sp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; }
  .sp-grid .sp-detail { grid-column: 1 / -1; }
  .sp-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 6px;
    border-radius: 14px;
    cursor: pointer;
    background: linear-gradient(170deg, color-mix(in srgb, var(--rarity) 22%, transparent), rgba(255, 255, 255, 0.03));
    border: 1px solid color-mix(in srgb, var(--rarity) 35%, transparent);
    text-align: center;
  }
  .sp-card.mastered { border-color: #FCD34D; box-shadow: 0 0 0 1px #FCD34D inset; }
  .sp-card.missing { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); }
  .sp-card.missing .sp-img img { filter: grayscale(1) brightness(0.5); }
  .sp-card.open { outline: 2px solid var(--accent); }
  .sp-img { position: relative; width: 64px; height: 64px; display: grid; place-items: center; }
  .sp-img img { width: 64px; height: 64px; object-fit: contain; }
  .sp-img > ha-icon { --mdc-icon-size: 44px; color: var(--rarity); }
  .sp-badge { position: absolute; display: grid; place-items: center; font-size: 11px; font-weight: 800; border-radius: 999px; }
  .sp-badge.star { top: -4px; right: -6px; font-size: 16px; }
  .sp-badge.lock { bottom: -2px; right: -4px; width: 20px; height: 20px; background: rgba(0, 0, 0, 0.7); }
  .sp-badge.lock ha-icon { --mdc-icon-size: 12px; }
  .sp-badge.count { bottom: -2px; left: -6px; padding: 1px 5px; background: rgba(0, 0, 0, 0.7); color: #fff; }
  .sp-name { font-size: 13px; font-weight: 800; line-height: 1.2; }
  .sp-status { font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); white-space: nowrap; }
  .sp-have { font-size: 12px; font-weight: 700; white-space: nowrap; }
  .sp-max { color: #FCD34D; }
  .sp-status.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .sp-status.dim { opacity: 0.65; }
  .sp-kinds { display: flex; flex-wrap: wrap; justify-content: center; gap: 3px; margin-top: 2px; }
  .sp-kind { width: 20px; height: 20px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); overflow: hidden; display: grid; place-items: center; }
  .sp-kind img { width: 100%; height: 100%; object-fit: contain; filter: grayscale(1) brightness(0.45); opacity: 0.6; }
  .sp-kind.owned { background: color-mix(in srgb, var(--rarity) 40%, transparent); }
  .sp-kind.owned img { filter: none; opacity: 1; }
  .sp-kind.mastered { box-shadow: 0 0 0 2px #FCD34D; }
  .sp-kinds-text { font-size: 10px; opacity: 0.7; font-weight: 600; }
  .sp-level-pill { font-size: 11px; font-weight: 800; white-space: nowrap; }
  .sp-kind-list { display: grid; gap: 8px; margin-top: 10px; }
  .sp-kind-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 10px; align-items: start; padding: 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.04); }
  .sp-kind-row.mastered { box-shadow: inset 0 0 0 1px #FCD34D; }
  .sp-kind-row.missing .sp-kind-icon img { filter: grayscale(1) brightness(0.5); }
  .sp-kind-icon { position: relative; width: 48px; height: 48px; }
  .sp-kind-icon img { width: 48px; height: 48px; object-fit: contain; }
  .sp-kind-title { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
  .sp-kind-title b { font-size: 14px; margin-right: 2px; }
  .sp-chip { font-size: 11px; font-weight: 700; padding: 1px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); white-space: nowrap; }
  .sp-chip.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .sp-chip.dim { opacity: 0.65; }
  .sp-xp { display: grid; gap: 2px; margin-top: 6px; font-size: 11px; opacity: 0.85; }
  .sp-xp .progress-bar-bg { height: 6px; }
  .sp-perk { font-size: 11px; opacity: 0.8; margin-top: 4px; }
  @container (max-width: 400px) {
    .sp-summary { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .sp-summary .sprite-ring { display: none; }
    .sp-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  }

  /* ---- Battle Pass unlocks ---- */
  .bp-unlock { margin-top: 10px; display: grid; gap: 4px; }
  .bp-unlock-top { display: flex; justify-content: space-between; align-items: baseline; font-weight: 800; }
  .bp-unlock-top b { font-size: 18px; color: #6EE7B7; }
  .bp-unlock-top span:first-child { color: #6EE7B7; }
  .bp-locked-count { font-size: 12px; opacity: 0.85; }
  .bp-unlock .progress-bar-bg, .bp-set-progress .progress-bar-bg { height: 8px; }
  .bp-unlock .progress-bar-fill, .bp-set-progress .progress-bar-fill { background: linear-gradient(90deg, #10B981, #6EE7B7); }
  .bp-set-progress { display: grid; gap: 3px; margin-top: 6px; font-size: 12px; font-weight: 800; color: #6EE7B7; }
  .bp-thumb { position: relative; }
  .bp-thumb.done { border-color: #10B981; opacity: 0.85; }
  .bp-thumb.done.active { border-color: var(--accent); }
  .bp-thumb-check {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #10B981;
    color: #fff;
    font-size: 10px;
    font-weight: 900;
    display: grid;
    place-items: center;
  }
  .bp-reward.unlocked .bp-reward-img { border-color: #10B981; box-shadow: inset 0 0 0 1px #10B981; }
  .bp-reward.locked .bp-reward-img img { filter: grayscale(0.9) brightness(0.55); }
  .bp-reward.locked .bp-reward-name { opacity: 0.7; }
  .bp-state {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 13px;
    font-weight: 900;
  }
  .bp-state.unlocked { background: #10B981; color: #fff; }
  .bp-state.locked { background: rgba(0, 0, 0, 0.7); }
  .bp-state.locked ha-icon { --mdc-icon-size: 13px; }

  /* ---- Match progress chips + match map ---- */
  .progress-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  .pchip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 7px 1px 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }
  .pchip img { width: 16px; height: 16px; object-fit: contain; }
  .pchip.quest { background: rgba(96, 165, 250, 0.2); color: #BFDBFE; }
  .pchip.level { background: rgba(16, 185, 129, 0.2); color: #6EE7B7; }
  .pchip.sprite { background: rgba(168, 85, 247, 0.2); color: #E9D5FF; }
  .pchip.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .match-map { display: grid; gap: 4px; margin-bottom: 8px; font-size: 12px; font-weight: 700; }

  /* ---- Map ---- */
  .map-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin: 6px 0; }
  .map-frame { position: relative; width: 100%; aspect-ratio: 1; border-radius: 14px; overflow: hidden; background: rgba(0, 0, 0, 0.3); }
  .map-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .map-frame.compact { aspect-ratio: 16 / 9; }
  .map-frame.compact img { object-fit: cover; }
  .map-poi { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: 1; }
  .map-poi i { width: 9px; height: 9px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.6); }
  .map-poi b {
    font-size: 9px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 2px #000, 0 0 3px #000;
    white-space: nowrap;
    margin-top: 1px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .map-frame:hover .map-poi b, .map-poi.on b { opacity: 1; }
  .map-poi.on { z-index: 2; }
  .map-poi.landmark i { width: 6px; height: 6px; background: rgba(255, 255, 255, 0.75); }
  .map-poi.landmark b { font-weight: 600; }
  .map-poi.on i { background: var(--accent); transform: scale(1.4); }
  .poi-list { display: flex; flex-wrap: wrap; gap: 4px; }
  .poi-chip { cursor: pointer; border: none; font: inherit; font-size: 11px; color: inherit; }
  .poi-chip.on { background: var(--accent); color: #0b0f19; }

  /* ---- News ---- */
  .news-update {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    margin-bottom: 10px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), rgba(121, 40, 202, 0.2));
  }
  .news-update ha-icon { --mdc-icon-size: 28px; color: var(--accent); }
  .news-update img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; }
  .news-update div { display: grid; gap: 2px; }
  .news-update span { font-size: 12px; opacity: 0.85; }
  .news-update.event { background: rgba(255, 255, 255, 0.05); }
  .news-list { display: grid; gap: 10px; }
  .news-card { border-radius: 14px; overflow: hidden; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); }
  .news-card img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
  .news-body { display: grid; gap: 4px; padding: 10px 12px; }
  .news-body b { font-size: 15px; }
  .news-body p { margin: 0; font-size: 12px; opacity: 0.85; line-height: 1.4; }
  .news-body .tag { justify-self: start; }

  /* ---- Shop ---- */
  .shop-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    margin-bottom: 8px;
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.35), rgba(168, 85, 247, 0.25));
    font-size: 13px;
  }
  .shop-alert ha-icon { color: #F9A8D4; }
  .shop-tabs { margin-bottom: 8px; }
  .shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; margin-bottom: 6px; }
  .shop-tile { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .shop-img {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(160deg, color-mix(in srgb, var(--rarity) 50%, transparent), rgba(15, 23, 42, 0.7));
    border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
    display: grid;
    place-items: center;
  }
  .shop-img img { width: 100%; height: 100%; object-fit: cover; }
  .shop-img > ha-icon { --mdc-icon-size: 36px; opacity: 0.5; }
  .shop-tile.wish .shop-img { box-shadow: 0 0 0 2px #F472B6; }
  .shop-tile.owned .shop-img img { opacity: 0.75; }
  .shop-price { font-size: 12px; font-weight: 800; color: #FCD34D; }
  .shop-price s { opacity: 0.6; font-weight: 600; color: inherit; }
  .shop-bundle {
    position: absolute;
    left: 4px;
    bottom: 4px;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.65);
  }
  .shop-bundle.in { background: #EC4899; color: #fff; }
  .wish-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    padding: 0;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: pointer;
  }
  .wish-btn ha-icon { --mdc-icon-size: 16px; }
  .wish-btn.on { background: #EC4899; }
  .bp-reward.in-shop .bp-reward-img { box-shadow: 0 0 0 2px #EC4899; }

  /* ---- Locker extras ---- */
  .locker-fav { position: absolute; top: 4px; left: 6px; color: #FCD34D; font-size: 16px; text-shadow: 0 1px 2px #000; }
  .locker-new {
    position: absolute;
    left: 4px;
    bottom: 4px;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 999px;
    background: #10B981;
    color: #fff;
  }
  .locker-actions { position: absolute; left: 4px; right: 4px; bottom: 4px; display: grid; gap: 3px; }
  .locker-actions .locker-use { position: static; }
  .locker-use.fav { background: rgba(0, 0, 0, 0.75); color: #FCD34D; }

  /* ---- Tournament filters ---- */
  .filter-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; min-width: 0; }
  .filter-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex: 0 0 auto;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    cursor: pointer;
  }
  .filter-toggle ha-icon { --mdc-icon-size: 16px; }
  .filter-toggle b { background: var(--accent); color: #0b0f19; border-radius: 999px; padding: 0 6px; font-size: 11px; }
  .filter-toggle.open { border-color: var(--accent); }
  .filter-active { display: flex; gap: 4px; overflow-x: auto; flex: 1; min-width: 0; scrollbar-width: none; }
  .filter-panel { display: grid; gap: 6px; padding: 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.04); margin-bottom: 8px; }
  .fgroup { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 6px; align-items: start; }
  .fgroup > span { font-size: 11px; font-weight: 700; opacity: 0.7; padding-top: 3px; }
  .fgroup > div { display: flex; flex-wrap: wrap; gap: 4px; }
  .fchip {
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: transparent;
    color: inherit;
    cursor: pointer;
    white-space: nowrap;
  }
  .fchip.on { background: color-mix(in srgb, var(--accent) 25%, transparent); border-color: var(--accent); color: var(--accent); }

  /* ---- Kid mode: bigger, simpler ---- */
  ha-card.kid { font-size: 15px; }
  ha-card.kid .bubble-sub-button { height: 44px; font-size: 15px; }
  ha-card.kid .sp-grid, ha-card.kid .bp-rewards, ha-card.kid .shop-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
  ha-card.kid .sp-img, ha-card.kid .sp-img img { width: 80px; height: 80px; }
  ha-card.kid .sp-name, ha-card.kid .bp-reward-name { font-size: 15px; }
  ha-card.kid .sp-status, ha-card.kid .sp-have, ha-card.kid .shop-price { font-size: 13px; }
  ha-card.kid .sp-kind { width: 26px; height: 26px; }
  ha-card.kid .bp-hero-name { font-size: 22px; }
  ha-card.kid .pchip { font-size: 12px; }
  ha-card.kid .muted, ha-card.kid .bp-note, ha-card.kid .version-row, ha-card.kid .detail-grid { display: none; }

  /* ---- Map (v1.13) ---- */
  ha-card.map-full { container-type: normal; }
  .mapx { display: grid; gap: 10px; container-type: inline-size; }
  .mapx-main { display: grid; gap: 8px; min-width: 0; }
  .mapx-top { display: grid; gap: 6px; }
  .mapx-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 11px; opacity: 0.75; }
  .mapx-picker { position: relative; }
  .mapx-current {
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), rgba(255, 255, 255, 0.04));
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }
  .mapx-current > ha-icon:first-child { --mdc-icon-size: 26px; color: var(--accent); }
  .mapx-current span { display: grid; min-width: 0; }
  .mapx-current b { font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-current small { font-size: 11px; opacity: 0.7; }
  .mapx-menu {
    position: absolute;
    z-index: 20;
    left: 0;
    right: 0;
    top: calc(100% + 4px);
    max-height: 360px;
    overflow-y: auto;
    padding: 6px;
    border-radius: 14px;
    background: var(--card-background-color, #1c2230);
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  }
  .mapx-group { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; padding: 8px 8px 4px; }
  .mapx-group ha-icon { --mdc-icon-size: 14px; }
  .mapx-option {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
  }
  .mapx-option:hover { background: rgba(255, 255, 255, 0.06); }
  .mapx-option.on { background: color-mix(in srgb, var(--accent) 20%, transparent); font-weight: 800; }
  .mapx-option small { font-size: 11px; opacity: 0.65; }
  .mapx-option ha-icon { --mdc-icon-size: 18px; color: var(--accent); }

  .mapx-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 14px;
    overflow: hidden;
    background: #0d2a4a;
    touch-action: none;
    cursor: grab;
    user-select: none;
  }
  .mapx-frame.dragging { cursor: grabbing; }
  .mapx-layer { position: absolute; inset: 0; transform-origin: 0 0; transition: transform 0.25s ease; will-change: transform; }
  .mapx-frame.dragging .mapx-layer { transition: none; }
  .mapx-layer > img { width: 100%; height: 100%; display: block; pointer-events: none; }
  .mapx-pin {
    position: absolute;
    transform: translate(-50%, -50%) scale(var(--iz, 1));
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    z-index: 1;
  }
  .mapx-pin i { width: 10px; height: 10px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.7); }
  .mapx-pin.landmark i { width: 7px; height: 7px; background: #FCD34D; }
  .mapx-pin b {
    font-size: 10px;
    font-weight: 800;
    line-height: 1.2;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(10, 15, 25, 0.82);
    color: #fff;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }
  .mapx-pin.landmark b { font-weight: 600; color: #FDE68A; }
  .mapx-pin.on { z-index: 3; }
  .mapx-pin.on i { width: 14px; height: 14px; background: var(--accent); box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7), 0 0 12px var(--accent); }
  .mapx-pin.on b { background: var(--accent); color: #0b0f19; font-size: 12px; }
  .mapx-pin.drop i { animation: mapx-pulse 1s ease-in-out infinite; }
  @keyframes mapx-pulse { 50% { transform: scale(1.6); } }
  .mapx-grid { position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 1px);
    background-size: 10% 10%; }
  .mapx-grid span { position: absolute; font-size: 10px; font-weight: 900; color: #fff; text-shadow: 0 1px 2px #000; transform: translate(-50%, 0) scale(var(--iz, 1)); }
  .mapx-grid .gcol { top: 2px; }
  .mapx-grid .grow { left: 4px; transform: translate(0, -50%) scale(var(--iz, 1)); }

  .mapx-tools {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
    border-radius: 12px;
    background: rgba(10, 15, 25, 0.7);
    backdrop-filter: blur(6px);
    z-index: 5;
  }
  .mapx-tool {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    padding: 0;
    border: none;
    border-radius: 9px;
    background: transparent;
    color: #fff;
    cursor: pointer;
  }
  .mapx-tool:hover { background: rgba(255, 255, 255, 0.12); }
  .mapx-tool.on { background: var(--accent); color: #0b0f19; }
  .mapx-tool[disabled] { opacity: 0.35; cursor: default; }
  .mapx-tool ha-icon { --mdc-icon-size: 20px; }
  .mapx-sep { height: 1px; margin: 2px 4px; background: rgba(255, 255, 255, 0.2); }
  .mapx-zoom { position: absolute; left: 8px; top: 8px; z-index: 5; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: rgba(10, 15, 25, 0.7); color: #fff; }
  .mapx-info {
    position: absolute;
    left: 8px;
    right: 56px;
    bottom: 8px;
    z-index: 6;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 6px 6px 8px;
    border-radius: 12px;
    background: rgba(10, 15, 25, 0.85);
    backdrop-filter: blur(6px);
    color: #fff;
  }
  .mapx-info > div { flex: 1; min-width: 0; display: grid; }
  .mapx-info b { font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-info small { font-size: 11px; opacity: 0.75; }
  .mapx-grid-badge {
    flex: 0 0 auto;
    min-width: 30px;
    text-align: center;
    font-size: 11px;
    font-weight: 900;
    padding: 2px 6px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.12);
    font-variant-numeric: tabular-nums;
  }

  .mapx-side { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .mapx-search { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(0, 0, 0, 0.2); }
  .mapx-search ha-icon { --mdc-icon-size: 18px; opacity: 0.7; }
  .mapx-search input { flex: 1; min-width: 0; border: none; background: transparent; color: inherit; font: inherit; font-size: 13px; outline: none; }
  .mapx-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 4px; }
  .mapx-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 6px 8px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: inherit;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }
  .mapx-row span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-row.landmark .mapx-grid-badge { background: rgba(252, 211, 77, 0.2); color: #FDE68A; }
  .mapx-row:hover { background: rgba(255, 255, 255, 0.08); }
  .mapx-row.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 18%, transparent); }

  /* Full screen: map fills the height, places list alongside (or below in portrait) */
  .mapx.full {
    position: fixed;
    inset: 0;
    z-index: 9999;
    padding: 12px;
    box-sizing: border-box;
    background: var(--card-background-color, #111827);
    grid-template-columns: minmax(0, auto) minmax(240px, 360px);
    align-items: start;
    overflow: auto;
  }
  .mapx.full .mapx-main { height: calc(100vh - 24px); grid-template-rows: auto minmax(0, 1fr); }
  .mapx.full .mapx-frame { height: 100%; width: auto; max-width: calc(100vw - 400px); justify-self: center; }
  .mapx.full .mapx-side { max-height: calc(100vh - 24px); overflow-y: auto; }
  .mapx.full .mapx-pin b { font-size: 12px; }
  .mapx:fullscreen { background: var(--card-background-color, #111827); }
  @media (orientation: portrait) {
    .mapx.full { grid-template-columns: minmax(0, 1fr); }
    .mapx.full .mapx-main { height: auto; }
    .mapx.full .mapx-frame { height: auto; width: 100%; max-width: none; }
    .mapx.full .mapx-side { max-height: none; }
  }
  /* Wide cards: places list beside the map */
  @container (min-width: 760px) {
    .mapx:not(.full) { grid-template-columns: minmax(0, 1.6fr) minmax(220px, 1fr); align-items: start; }
    .mapx:not(.full) .mapx-side { max-height: 640px; overflow-y: auto; }
  }
  ha-card.kid .mapx-pin b { font-size: 13px; }
  ha-card.kid .mapx-tool { width: 42px; height: 42px; }
  ha-card.kid .mapx-row { font-size: 14px; padding: 8px 10px; }

  /* ---- Sprite releases ---- */
  .sp-release {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(52, 211, 153, 0.5);
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.28), rgba(59, 130, 246, 0.18));
    color: inherit;
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
  }
  .sp-release span:nth-child(2) { flex: 1; }
  .sp-release small { font-size: 11px; font-weight: 800; opacity: 0.85; text-decoration: underline; }
  .sp-release.on { box-shadow: 0 0 0 2px #34D399 inset; }
  .sp-release-badge, .sp-badge.new {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.04em;
    padding: 2px 7px;
    border-radius: 999px;
    background: linear-gradient(90deg, #10B981, #3B82F6);
    color: #fff;
    white-space: nowrap;
  }
  .sp-badge.new { top: -6px; left: -10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); animation: sp-new-glow 2.4s ease-in-out infinite; }
  .sp-badge.new.kind { font-size: 9px; }
  @keyframes sp-new-glow { 50% { filter: brightness(1.3); } }
  .sp-card.is-new { border-color: #34D399; }
  .sp-kind.new { box-shadow: 0 0 0 2px #34D399; position: relative; }
  .sp-kind.new::after { content: "✦"; position: absolute; top: -7px; right: -5px; font-size: 10px; color: #34D399; text-shadow: 0 0 3px #000; }
  .sp-kind { position: relative; overflow: visible; }
  .sp-kind img { border-radius: 50%; }
  .sp-chip.new { background: rgba(16, 185, 129, 0.25); color: #6EE7B7; }
`;var Ce=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"},{value:"shop",label:"Item Shop & wishlist"},{value:"news",label:"News & updates"},{value:"map",label:"Map"}],_t=h=>h.layout==="session_only"?["session"]:h.layout==="career_only"?["stats"]:h.layout==="events_only"?["events"]:Ce.map(n=>n.value).filter(n=>n!=="events"||h.show_tournaments!==!1),yt=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; overrides the avatar chosen in the Locker section)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:Ce}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...Ce]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"kid_mode",label:"Kid mode (bigger, simpler layout)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],se=class extends R{setConfig(n){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,max_feed_matches:10,...n},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=_t(this._config))}_valueChanged(n){if(!this._config||!this.hass)return;let e=n.target,t=n.detail?n.detail.value:e.value;this._config={...this._config,...t},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?l:s`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${yt}
          .computeLabel=${n=>n.label||n.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=O`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};y([B({attribute:!1})],se.prototype,"hass",2),y([$()],se.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",se);var Ze=[{sections:["session","stats","trends"],header:"full"},{sections:["pass","sprites","locker"],header:"none",default_section:"pass"},{sections:["events","shop","news","map"],header:"none",default_section:"events"}],K=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-family-panel"};this._index=0;this._cards=[]}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e},this._cards=[]}getCardSize(){return 12}static getStubConfig(){return{type:"custom:fortnite-family-panel",players:["player1"]}}get _players(){let e=(this._config.players||[]).map(t=>String(t).toLowerCase()).filter(Boolean);return e.length?e:["player1"]}_kid(e){let t=this._config.kid_mode;return Array.isArray(t)?t.map(a=>String(a).toLowerCase()).includes(e):!!t}_buildCards(){let e=this._config.columns?.length?this._config.columns:Ze;this._cards=[];for(let t of this._players)for(let a of e){let i=document.createElement("fortnite-activity-card");i.setConfig({type:"custom:fortnite-activity-card",player:t,sections:a.sections,header:a.header||"none",default_section:a.default_section||"auto",show_sub_buttons:a.sections.includes("session"),compact:this._config.compact??!1,card_style:this._config.card_style||"bubble",kid_mode:this._kid(t)}),i.dataset.player=t,this._cards.push(i)}}updated(e){(e.has("_config")||!this._cards.length)&&(this._buildCards(),this.requestUpdate());for(let t of this._cards)t.hass=this.hass}_displayName(e){return Object.values(this.hass?.states||{}).find(a=>a.attributes?.fortnite_player_id===e&&a.attributes?.fortnite_entity_key==="profile")?.attributes?.display_name||e.charAt(0).toUpperCase()+e.slice(1)}_scrollTo(e){let t=this.shadowRoot?.querySelector(".track");t&&(t.scrollTo({left:e*t.clientWidth,behavior:"smooth"}),this._index=e)}_onScroll(e){let t=e.target,a=Math.round(t.scrollLeft/Math.max(1,t.clientWidth));a!==this._index&&(this._index=a)}render(){if(!this.hass)return l;let e=(this._config.columns?.length?this._config.columns:Ze).length,t=this._players;return s`
      <div class="panel" style="--panel-height:${this._config.height||"calc(100vh - var(--header-height, 56px) - 16px)"}">
        ${t.length>1?s`<div class="nav">
              ${t.map((a,i)=>s`<button class=${i===this._index?"on":""} @click=${()=>this._scrollTo(i)}>${this._displayName(a)}</button>`)}
            </div>`:l}
        <div class="track" @scroll=${this._onScroll}>
          ${t.map(a=>s`
            <section class="page" style="--cols:${e}">
              ${this._cards.filter(i=>i.dataset.player===a).map(i=>s`<div class="col">${i}</div>`)}
            </section>`)}
        </div>
      </div>
    `}static{this.styles=O`
    :host { display: block; }
    .panel { height: var(--panel-height); display: flex; flex-direction: column; gap: 8px; }
    .nav { display: flex; justify-content: center; gap: 8px; flex: 0 0 auto; }
    .nav button {
      font: inherit;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: var(--primary-text-color, #fff);
      cursor: pointer;
    }
    .nav button.on { background: var(--accent-color, #00e5ff); color: #0b0f19; border-color: transparent; }
    .track {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .track::-webkit-scrollbar { display: none; }
    .page {
      flex: 0 0 100%;
      scroll-snap-align: start;
      display: grid;
      grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
      gap: 12px;
      padding: 0 8px;
      box-sizing: border-box;
      min-height: 0;
    }
    .col { min-height: 0; overflow-y: auto; scrollbar-width: thin; }
    @media (orientation: portrait), (max-width: 900px) {
      .page { grid-template-columns: minmax(0, 1fr); overflow-y: auto; }
      .col { overflow: visible; }
    }
  `}};y([B({attribute:!1})],K.prototype,"hass",2),y([$()],K.prototype,"_config",2),y([$()],K.prototype,"_index",2);customElements.get("fortnite-family-panel")||(customElements.define("fortnite-family-panel",K),window.customCards=window.customCards||[],window.customCards.push({type:"fortnite-family-panel",name:"Fortnite Family Panel",description:"Full-screen landscape page per player; swipe between players."}));var wt="1.14.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var $t={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},Y={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},F={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},kt={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Qe=(h,n)=>{let e=h&&kt[h]||h||"";return n===1||!e?e:`${e}s`},Xe={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Je=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],St={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},ze={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},et=["session","stats","events","sprites","trends","pass","locker","shop","news","map"],Et={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},ge=h=>String(h?.icon||"").split("/").pop()||"",ne=h=>h?.type==="Currency"&&(/MTX/i.test(ge(h))||/v-?bucks/i.test(h?.name||"")),ue=h=>h?.type==="AthenaCharacter"||/^T_Soldier_/i.test(ge(h)),me=h=>{if(ue(h))return"Outfit";if(ne(h))return"V-Bucks";let n=ge(h);return h?.type==="AthenaDance"&&/Spray/i.test(n)?"Spray":h?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(n)?"Emoticon":Et[h?.type]||"Cosmetic"},tt=h=>h?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(h.name)?h.name:me(h),z=h=>{h.target.hidden=!0},at=h=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:h}),re={at:0},W={at:0},Ae=new Map,k=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...ze};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._selectedOutfit=null;this._lockerFilter="all";this._shop={};this._shopTab="today";this._shopQuery="";this._shopLimit=36;this._shopKind="all";this._searchQuery="";this._searchType="outfit";this._searchResults=null;this._searchLoading=!1;this._news={};this._maps={};this._mapMode="br";this._mapPoi=null;this._mapZoom=1;this._mapPan={x:0,y:0};this._mapFull=!1;this._mapGrid=!1;this._mapLabels="auto";this._mapShowLandmarks=!0;this._mapMenu=!1;this._mapQuery="";this._mapSort="name";this._mapDrop=null;this._gesture=null;this._pointers=new Map;this._filtersOpen=!1;this._renderedView=null;this._entityCache=new Map;this._avatarQuery="";this._onFullscreenChange=()=>{!document.fullscreenElement&&this._mapFull&&(this._mapFull=!1)};this._onKeyDown=e=>{e.key==="Escape"&&this._mapFull&&this._toggleMapFull()}}static get styles(){return Ge}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...ze,...e},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...ze}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),document.addEventListener("fullscreenchange",this._onFullscreenChange),document.addEventListener("keydown",this._onKeyDown),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-W.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this._onFullscreenChange),document.removeEventListener("keydown",this._onKeyDown),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let e=this._config;if(Array.isArray(e.sections)&&e.sections.length){let t=e.sections.filter(a=>et.includes(a));if(t.length)return[...new Set(t)]}switch(e.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return et.filter(t=>t!=="events"||e.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(t.states[a]!==this.hass.states[a])return!0;return!1}updated(e){if(super.updated(e),!this.hass)return;let t=e.has("hass")&&!e.get("hass");t&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(e.has("_config")||t)&&this._scheduleAvatar(),this._renderedView==="pass"&&(this._loadPass(),this._loadOutfits()),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="shop"&&this._loadShop(),this._renderedView==="news"&&(this._loadNews(),this._events.list===void 0&&!this._events.loading&&!this._events.error&&this._loadEvents()),this._renderedView==="map"&&(this._loadMap("br"),this._loadMap(this._mapMode)),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!re.promise||Date.now()-re.at>36e5)&&(re.at=Date.now(),re.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let e=await re.promise;this._catalog={season:e?.season,playlists:e?.playlists||{}}}async _loadEvents(e=!1){if(this.hass){(e||!W.promise||Date.now()-W.at>10*6e4)&&(W.at=Date.now(),W.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),!this._events.list&&!this._events.loading&&(this._events={...this._events,loading:!0});try{let t=await W.promise;this._events={list:t?.tournaments??null,defaultRegion:t?.default_region_group}}catch(t){W.promise=void 0,this._events={error:t?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let e=(this._config.avatar||"").trim();if(e!==this._avatarQuery){if(this._avatarQuery=e,window.clearTimeout(this._avatarTimer),e.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let t=e.toLowerCase();Ae.has(t)||Ae.set(t,this.hass.callWS({type:"fortnite_activity/cosmetic",query:e}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await Ae.get(t);this._avatarQuery===e&&(this._avatar=a)},800)}}async _loadLeaderboard(e,t){let a=`${e}|${t}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:e,window_id:t,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(e){this._outfits={error:e?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let e=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:e?.battlepass??null}}catch(e){this._pass={error:e?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let e=Je.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!e.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let t=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:e,period:i,types:["mean","min","max","state"]});try{let a=await t(30,"day"),i="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await t(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(e,t){!this.hass||this._matchLists[e]||(this._matchLists={...this._matchLists,[e]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...t}).then(a=>{this._matchLists={...this._matchLists,[e]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[e]:{error:a?.message||"Could not load matches"}}}))}_isRanked(e){return!!e.rank_delta_pct||!!e.unreal_rank_change||/habanero/i.test(e.playlist_id||"")}_findEntity(e,t){let a=this.hass?.states;if(!a)return;let i=this._player,r=`${i}:${e}:${t}`,o=this._entityCache.get(r);if(o&&a[o])return a[o];let c;for(let[u,g]of Object.entries(a))if(u.startsWith(`${e}.`)&&g.attributes?.fortnite_player_id===i&&g.attributes?.fortnite_entity_key===t){c=u;break}if(c||(c=[t,...$t[t]||[]].flatMap(p=>[`${e}.fortnite_${i}_${p}`,`${e}.fortnite_${i}_${i}_${p}`]).find(p=>a[p])),!!c)return this._entityCache.set(r,c),a[c]}async _callService(e,t={}){if(this.hass){this._loadingAction=e;try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t}),e==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${e}:`,a)}}}_setView(e){this._view=e,e==="events"&&this._loadEvents(),e==="trends"&&this._loadTrends(),e==="pass"&&(this._loadPass(),this._loadOutfits()),e==="locker"&&this._loadOutfits(),e==="shop"&&this._loadShop(),e==="news"&&this._loadNews(),e==="map"&&this._loadMap(this._mapMode)}_entityId(e,t){return this._findEntity(e,t)?.entity_id}_toggleEvent(e){if(this._expandedEvent===e.key){this._expandedEvent=null;return}this._expandedEvent=e.key;let t=e.windows.find(a=>this._windowState(a)==="live")||[...e.windows].reverse().find(a=>this._windowState(a)==="finished");t&&!this._leaderboards[`${e.event_id}|${t.window_id}`]&&this._loadLeaderboard(e.event_id,t.window_id)}_formatRelativeTime(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return"";let a=Math.max(1,Math.round((this._now-t.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),a=Math.round(e%60);return t>0?`${t}h ${a}m`:`${a}m`}_formatSpan(e){let t=Math.max(0,Math.round(e/6e4)),a=Math.floor(t/1440),i=Math.floor(t%1440/60),r=t%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}_formatWhen(e){try{return at(this.hass?.config?.time_zone).format(new Date(e)).replace(/\b(am|pm)\b/i,t=>t.toLowerCase())}catch{return at().format(new Date(e))}}_num(e,t=0){return Number(e||0).toLocaleString("en-GB",{maximumFractionDigits:t,minimumFractionDigits:0})}_playlist(e){return e?this._catalog.playlists[e.toLowerCase()]:void 0}_windowState(e){let t=Date.parse(e.begin),a=Date.parse(e.end);return this._now>=a?"finished":this._now>=t?"live":"upcoming"}_rankBadge(e,t=30){let a=e||"Unranked",i=Object.keys(Y).find(p=>a.startsWith(p));if(!i)return s`<span class="rank-badge unranked" style="width:${t}px;height:${t}px">–</span>`;let[r,o]=Y[i],c=(a.match(/\b(I{1,3})$/)||[])[1]||"",u=`g-${i}-${t}`;return s`<span class="rank-badge" title=${a} style="width:${t}px;height:${t}px">
      ${T`<svg viewBox="0 0 40 44" width=${t} height=${t} aria-hidden="true">
        <defs><linearGradient id=${u} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${o}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?T`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${u})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:T`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${u})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${c}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return s`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let e=this._player,t=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),o=this._findEntity("sensor","level"),c=this._findEntity("binary_sensor","playing"),u=this._findEntity("sensor","profile"),g=this._findEntity("sensor","sprites"),p=this._findEntity("sensor","power_ranking"),m=!!g&&!["unavailable","unknown"].includes(g.state);if(!t&&!a&&!c)return s`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${e}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let f=c?.state==="on"||t?.state==="active",w=t?.attributes||{},E=a?.attributes||{},d=u?.attributes||{},x={...i?.attributes||{},current_rank:i?.state},v={...r?.attributes||{},current_rank:r?.state},C=!!u?.attributes?.outfits?.owned_count,S=this._sections.filter(Le=>this._sections.length===1||(Le!=="sprites"||m)&&(Le!=="locker"||C)),M=this._config.default_section,_=f&&S.includes("session")?"session":S.includes("stats")?"stats":S[0],b=this._view??(M&&M!=="auto"&&S.includes(M)?M:_);S.includes(b)||(b=_),this._renderedView=b;let A=this._config.header||"full",L="",P={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};P[this._config.theme_accent||""]&&(L+=`--accent: ${P[this._config.theme_accent]};`),this._config.custom_background&&(L+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let G=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}${this._config.kid_mode?" kid":""}${this._mapFull?" map-full":""}`;return s`
      <ha-card class=${G} style="${L}">
        ${A==="none"?l:A==="slim"?this._renderSlimHeader(e,f,w,d):this._renderHeader(e,f,w,E,d,o,x,v)}
        ${this._renderButtons(b,f,S)}
        ${b==="session"?this._renderSessionView(f,w,x):b==="events"?this._renderEventsView():b==="sprites"?this._renderSpritesView(g):b==="trends"?this._renderTrendsView():b==="pass"?this._renderPassView(o):b==="locker"?this._renderLockerView(d):b==="shop"?this._renderShopView():b==="news"?this._renderNewsView():b==="map"?this._renderMapView():this._renderStatsView(E,d,x,v,p)}
      </ha-card>
    `}_renderHeader(e,t,a,i,r,o,c,u){let g=r.display_name||e.charAt(0).toUpperCase()+e.slice(1),p=r.season||this._catalog.season,m=i.metrics?.last_played,f=o?.attributes||{},w=Number(o?.state)||0,E=Number(f.account_level||0),d=this._avatarImage(r),x=this._config.compact?20:24,v=this._findEntity("sensor","vbucks"),C=!this._config.hide_vbucks&&v&&!isNaN(Number(v.state)),S=v?.attributes?.crew;return s`
      <div class="fa-header">
        <div class="player-avatar ${d?"has-image":""}">
          ${d?s`<img src=${d} alt=${this._avatarName(r)} @error=${z} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${g}</h2>
            <span class="header-ranks">
              ${c.current_rank&&c.current_rank!=="Unranked"?this._rankBadge(c.current_rank,x):l}
              ${u.current_rank&&u.current_rank!=="Unranked"?this._rankBadge(u.current_rank,x):l}
            </span>
          </div>
          <div class="player-meta">
            ${p?.number?s`<span class="level-badge">S${p.number} · ${p.days_left}d left</span>`:l}
            ${!this._config.hide_season_level&&w>0?s`<span class="level-badge">Lvl ${w}</span>`:l}
            ${!this._config.hide_account_level&&E>0?s`<span>Acct ${E.toLocaleString()}</span>`:l}
            ${C?s`<span class="vbucks-chip" title=${Object.entries(v.attributes?.by_kind||{}).map(([M,_])=>`${M}: ${this._num(_)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(v.state)}</span>`:l}
            ${S?.active&&!this._config.hide_vbucks?s`<span class="crew-chip" title="Fortnite Crew${S.end_date?` \xB7 renews ${this._formatWhen(S.end_date)}`:""}">Crew</span>`:l}
            ${m?.time&&!t?s`<span title=${m.name||""}>Played ${this._formatRelativeTime(m.time)}</span>`:l}
          </div>
        </div>
        <div class="status-pill ${t?"live":"idle"}">
          ${t?s`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:s`<span>IDLE</span>`}
        </div>
      </div>
      ${p?.progress_pct!==void 0&&!this._config.compact?s`<div class="season-bar" title="Season ${p.number}: ${p.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,p.progress_pct)}%"></div>
          </div>`:l}
    `}_liveEventCount(){let e=this._currentFilters();return(this._events.list||[]).filter(t=>this._matchesFilters(t,e)&&t.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(e){return(this._config.avatar||"").trim()?this._avatar?.icon:e?.outfits?.avatar?.icon||void 0}_avatarName(e){return(this._config.avatar||"").trim()?this._avatar?.name||"":e?.outfits?.avatar?.name||""}async _setFavorite(e,t){try{await this.hass.callService("fortnite_activity","set_favorite",{player_id:this._player,outfit_id:e,favorite:t});let a=(this._outfits.data?.outfits||[]).map(i=>String(i.key||i.id).toLowerCase()===e?{...i,favorite:t}:i);this._outfits={data:{...this._outfits.data||{},outfits:a}}}catch(a){console.error("Favourite update failed:",a)}finally{this._selectedOutfit=null}}async _setAvatar(e){this._loadingAction="set_avatar";try{await this.hass.callService("fortnite_activity","set_avatar",{player_id:this._player,outfit_id:e||""}),this._outfits={data:{...this._outfits.data||{},avatar_id:e}}}catch(t){console.error("Error setting Fortnite avatar:",t)}finally{this._loadingAction=null,this._selectedOutfit=null}}_renderSlimHeader(e,t,a,i){let r=i.display_name||e.charAt(0).toUpperCase()+e.slice(1),o=this._avatarImage(i),c=this._findEntity("sensor","vbucks"),u=!this._config.hide_vbucks&&c&&!isNaN(Number(c.state));return s`
      <div class="fa-header slim">
        <div class="player-avatar ${o?"has-image":""}">
          ${o?s`<img src=${o} alt="" @error=${z} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${r}</h2>
            ${u?s`<span class="vbucks-chip">Ⓥ ${this._num(c.state)}</span>`:l}
          </div>
        </div>
        <div class="status-pill ${t?"live":"idle"}">
          ${t?s`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:s`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(e,t,a){let i=a.length>1,r=!this._config.sections?.length&&this._config.layout==="events_only",o=this._config.show_sub_buttons!==!1&&!r;if(!i&&!o)return l;let c=this._eventsEnabled?this._liveEventCount():0,u=Number(this._findEntity("sensor","wishlist")?.state)||0,g={session:["mdi:lightning-bolt",t?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",c],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"],shop:["mdi:shopping-outline","Shop",u],news:["mdi:newspaper-variant-outline","News"],map:["mdi:map-outline","Map"]},p=(m,f,w,E=0)=>s`
      <button class="bubble-sub-button ${e===m?"active":""}" @click=${()=>this._setView(m)} title=${w}>
        <ha-icon icon=${f}></ha-icon><span class="btn-label">${w}</span>
        ${E>0?s`<span class="notify-badge" title="${E} live">${E}</span>`:l}
      </button>
    `;return s`
      <div class="sub-button-row">
        ${i?a.map(m=>p(m,g[m][0],g[m][1],g[m][2]||0)):l}
        ${o?t?s`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:s`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`:l}
        ${o?s`<button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
              <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
              <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
            </button>`:l}
      </div>
    `}_renderKpis(e){if(this._config.compact){let t=[];for(let a=0;a<e.length;a+=2)t.push(e.slice(a,a+2));return s`<table class="stat-table"><tbody>
        ${t.map(a=>s`<tr>
          ${a.map(([i,r,o])=>s`<th>${i}</th><td class="kpi-value ${o||""}">${r}</td>`)}
          ${a.length<2?s`<th></th><td></td>`:l}
        </tr>`)}
      </tbody></table>`}return s`<div class="kpi-row">
      ${e.map(([t,a,i])=>s`<div class="kpi-chip"><span class="kpi-label">${t}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(e,t,a,i){let r=t.current_rank||"Unranked",o=Number(t.progress_pct||0),c=r.startsWith("Unreal");return s`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${e}</span></span>
          <span class="rank-name" style="color: ${(Y[Object.keys(Y).find(u=>r.startsWith(u))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${c?s`<div class="unreal-position">
              <span class="unreal-number">${t.unreal_rank?`#${this._num(t.unreal_rank)}`:"Unreal"}</span>
              ${i?s`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:l}
            </div>`:this._config.hide_rank_progress?l:s`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${c?"Unreal leaderboard position":`${o}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(e,t,a){let i=Number(t.net_rank_delta_pct||0),r=f=>f>=0?`+${f}%`:`${f}%`,o=t.session_id,c=o?`session:${o}:${t.matches_played||0}`:"";c&&this._config.show_match_feed!==!1&&this._ensureMatches(c,{session_id:o});let g=(c?this._matchLists[c]?.matches:void 0)||t.recent_matches||[],p=g.filter(f=>this._isRanked(f)),m=p.filter(f=>f.rank_track===a.game_mode&&typeof f.unreal_rank_change=="number").reduce((f,w)=>f+(w.unreal_rank_change||0),0);return s`
      ${this._renderKpis([["Matches",t.matches_played||0,"cyan"],["Wins",`${t.wins||0} \u{1F3C6}`,"gold"],["Kills",t.kills||0],["K/D",t.kd_ratio||0],...p.length?[["Rank Net",r(i),i>=0?"positive":"negative"]]:[]])}

      ${p.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${r(i)} this session`,m||null):l}

      ${this._config.show_match_feed!==!1?s`
            <div class="match-feed-header">
              <span>Match Feed (${t.matches_played||g.length} ${(t.matches_played||g.length)===1?"match":"matches"})</span>
              ${e?s`<span class="tracking-live">Tracking Live</span>`:l}
            </div>
            ${this._renderMatchList(c||"session",g,s`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:l}
    `}_renderMatchList(e,t,a){let i=this._config.max_feed_matches||10,r=this._showAllMatches[e],o=r?t:t.slice(0,i);return s`
      <div class="match-list">
        ${o.length?o.map(c=>this._renderMatch(c)):s`<div class="empty">${a}</div>`}
        ${t.length>i?s`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[e]:!r}}>
              ${r?"Show fewer":`Show all ${t.length}`}
            </button>`:l}
      </div>
    `}_progressChip(e){let t=e.icon?s`<img src=${e.icon} alt="" @error=${z} />`:l;switch(e.type){case"quests":return s`<span class="pchip quest">📜 ${e.count} quest${e.count>1?"s":""} done</span>`;case"level_up":return s`<span class="pchip level">⬆️ Level ${e.to}</span>`;case"sprite_new":return s`<span class="pchip sprite">${t}New sprite: ${e.name}</span>`;case"sprite_mastered":return s`<span class="pchip gold">${t}⭐ Mastered ${e.name}</span>`;case"sprite_level":return s`<span class="pchip sprite">${t}${e.name} → Lv ${e.level}</span>`;default:return l}}_renderMatch(e){let t=this._playlist(e.playlist_id),a=t?.image,i=`${e.timestamp}|${e.playlist_id}`,r=this._expandedMatch===i,o=(e.match_count||1)>1,c=this._isRanked(e),u=e.progress||[],g=r?this._matchMap(e):null,p=(m,f)=>f==null||f===""?l:s`<div class="detail"><span>${m}</span><b>${f}</b></div>`;return s`
      <div class="match-card ${e.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>{this._expandedMatch=r?null:i,r||(this._loadMap("br"),this._loadMatchMap(e.playlist_id))}}>
        <div class="match-row">
          ${a?s`<img class="match-art" src=${a} alt="" loading="lazy" @error=${z} />`:l}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${e.match_number}${(e.match_count||1)>1?` \xD7${e.match_count}`:""}</span>
              <span class="placement-badge ${e.is_victory?"win":""}">${e.placement_text}</span>
            </div>
            <span class="match-mode">${e.mode_name} • ${this._formatRelativeTime(e.timestamp)}</span>
            ${u.length?s`<div class="progress-chips">${u.map(m=>this._progressChip(m))}</div>`:l}
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${e.kills}</span>
            ${e.rank_delta_pct&&this._isRanked(e)?s`<span class="rank-delta-badge ${e.rank_delta_pct>=0?"pos":"neg"}">
                  ${e.rank_delta_pct>=0?`+${e.rank_delta_pct}%`:`${e.rank_delta_pct}%`}
                </span>`:l}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?s`<div class="match-details" @click=${m=>m.stopPropagation()}>
              ${g?s`<div class="match-map">
                    ${this._renderMapImage(g,!0)}
                    <span>🗺️ ${g.name||"Battle Royale island"}</span>
                  </div>`:a?s`<img class="detail-art" src=${a} alt="" @error=${z} />`:l}
              ${t?.description?s`<p class="detail-desc">${t.description}</p>`:l}
              <div class="detail-grid">
                ${p("Finished",this._formatWhen(e.timestamp))}
                ${p("Mode",e.mode_name)}
                ${p("Placement",e.placement_text)}
                ${p("Kills",e.kills)}
                ${o?p("Games",e.match_count):l}
                ${o&&e.wins?p("Victories",e.wins):l}
                ${p("Time played",e.minutes?this._formatDuration(e.minutes):void 0)}
                ${p("Score",e.score?this._num(e.score):void 0)}
                ${p("Players outlived",e.players_outlived?this._num(e.players_outlived):void 0)}
                ${c?s`
                      ${p("Ranked track",e.rank_track)}
                      ${p("Rank after",e.unreal_rank?`${e.current_rank} #${this._num(e.unreal_rank)}`:e.current_rank)}
                      ${p("Rank change",e.rank_delta_pct?`${e.rank_delta_pct>0?"+":""}${e.rank_delta_pct}%`:void 0)}
                      ${p("Unreal places",e.unreal_rank_change?`${e.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(e.unreal_rank_change))}`:void 0)}`:l}
              </div>
              ${(e.match_count||1)>1?s`<small class="muted">Several games finished between polls; totals are combined.</small>`:l}
            </div>`:l}
      </div>
    `}_renderStatsView(e,t,a,i,r){let o=t.windows||{},c=t.window_labels||{},u=["lifetime",...["season","week","today"].filter(S=>o[S])],g=u.includes(this._window)?this._window:"lifetime",p={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},m=e.metrics||{},f={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0,players_outlived:e.players_outlived||0,hours_played:m.hours_played,favourite_mode:m.favourite_mode,modes:e.modes||{}},w=g==="lifetime"?f:o[g],E=this._selectedMode!=="all"?w.modes?.[this._selectedMode]:null,d=E&&E.matches!==void 0?E:w,x=d.minutes!==void 0?Math.round(d.minutes/60*10)/10:w.hours_played,v=w.favourite_mode,C=(S,M)=>s`
      <button class="mode-tab ${this._selectedMode===S?"active":""}" @click=${()=>this._selectedMode=S}>${M}</button>
    `;return s`
      <div class="tab-rows">
        ${u.length>1?s`<div class="mode-tabs">
              ${u.map(S=>s`<button class="mode-tab ${g===S?"active":""}" title=${c[S]||""}
                  @click=${()=>this._window=S}>${p[S]}</button>`)}
            </div>`:l}
        <div class="mode-tabs">
          ${C("all","Overall")} ${C("zero_build","Zero Build")} ${C("build","Build")} ${C("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${d.win_rate||0}%`,"cyan"],["K/D",d.kd||0],["Wins",s`${this._num(d.wins)} 🏆`,"gold"],["Matches",this._num(d.matches)],["Kills",this._num(d.kills)],["Outlived",this._num(d.players_outlived)],["Kills/Match",d.matches?this._num(d.kills/d.matches,2):0],...x!==void 0?[["Hours",this._num(x,1)]]:[]])}

      ${g==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(e):l}
      ${v?this._renderFavourite(v,g!=="lifetime"?p[g]:""):l}
      ${g!=="lifetime"&&w?.since?this._renderWindowMatches(g,p[g],w):l}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
      ${this._renderOtherTracks(a)}
      ${r&&!["unavailable","unknown"].includes(r.state)?s`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(r.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(r.attributes?.points)} points${r.attributes?.counting_events!=null?` \xB7 ${r.attributes.counting_events} counting events`:""}</span>
              <span>${r.attributes?.peak_pr!=null?`Peak PR ${this._num(r.attributes.peak_pr)}`:"Competitive (tournaments)"}${r.attributes?.delta_pr?` \xB7 ${r.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(r.attributes.delta_pr))}`:""}</span></div>
          </div>`:l}
      ${t.epic_link==="relink_required"?s`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:l}
    `}_renderOtherTracks(e){let t=(e.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return t.length?s`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${t.map(a=>s`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(Y[Object.keys(Y).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:l}_lineChart(e,t,a){let c=e.map(v=>v.v),u=Math.min(...c),g=Math.max(...c),p=g-u||Math.abs(g)||1,m=e[0].t,f=e[e.length-1].t||m+1,w=v=>6+(v-m)/(f-m||1)*308,E=v=>84-(v-u)/p*78,d=e.map((v,C)=>`${C?"L":"M"}${w(v.t).toFixed(1)},${E(v.v).toFixed(1)}`).join(" "),x=v=>new Date(v).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return s`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${T`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${d}" class="trend-line"></path>
        ${e.map(v=>T`<g class="trend-pt"><circle cx="${w(v.t)}" cy="${E(v.v)}" r="7" class="trend-hit"></circle><circle cx="${w(v.t)}" cy="${E(v.v)}" r="2.5" class="trend-dot"></circle><title>${x(v.t)}: ${t(v.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let t=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!t.length)return s`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,r=4,o=Math.max(4,...t.map(u=>u.kills||0)),c=(a-2*r)/t.length;return s`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${T`${t.map((u,g)=>{let p=Math.max(2,(u.kills||0)/o*(i-14)),m=r+g*c+1;return T`<g><rect x="${m}" y="${i-p}" width="${Math.max(2,c-2)}" height="${p}" rx="2" class="kill-bar"></rect>
          ${u.is_victory?T`<text x="${m+(c-2)/2}" y="${i-p-3}" text-anchor="middle" class="win-mark">★</text>`:l}
          <rect x="${m-1}" y="0" width="${c}" height="${i}" fill="transparent"><title>${this._formatWhen(u.timestamp)} · ${u.mode_name}: ${u.kills} kills · ${u.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${o} kills</span></div>`}_renderTrendsView(){let e=this._trends,t=Je.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return l;let r=((e.stats||{})[i]||[]).map(f=>({t:typeof f.start=="number"?f.start:Date.parse(f.start),v:f.mean??f.state??f.max})).filter(f=>typeof f.v=="number"),o=this.hass.states[i];if(!r.length&&(!o||["unavailable","unknown"].includes(o.state)))return l;let c=f=>`${this._num(f,a.digits||0)}${a.unit||""}`,u=r[0]?.v,g=r[r.length-1]?.v,p=r.length>1?g-u:null,m=p==null||p===0?"":p>0!=!!a.lowerBetter?"positive":"negative";return s`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${m}">${o&&!isNaN(Number(o.state))?c(Number(o.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,c,e.period||"day"):s`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${p>=0?"\u25B2":"\u25BC"} ${c(Math.abs(p))} over ${r.length} ${e.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return s`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${e.loading&&!e.stats?s`<div class="empty">Loading history…</div>`:l}
      ${e.error?s`<div class="empty">${e.error}</div>`:l}
      <div class="trend-grid">${t}</div>
    `}_passSets(e){let t=[],a=new Map;for(let i of e.pages||[]){let r=String(i.track||"").replace(/Bonus$/,"")||"Pass";a.has(r)||(a.set(r,[]),t.push(r)),a.get(r).push(i)}return t.map((i,r)=>{let o=a.get(i),c=o.flatMap(v=>v.rewards||[]),u=c.find(ue)||null,g=u?.icon||c.find(v=>v.icon&&!ne(v)&&v.type!=="HomebaseBannerIcon")?.icon||null,p={},m={},f=new Map,w=0;for(let v of o){let C=/Bonus$/.test(v.track||"");for(let S of v.rewards||[]){if(typeof S.cost=="number"&&S.cost>0&&S.price_row!=="Included"){let _=C?m:p;_[S.currency||""]=(_[S.currency||""]||0)+S.cost}ne(S)&&(w+=Number(S.quantity)||0);let M=me(S);M!=="V-Bucks"&&f.set(M,(f.get(M)||0)+1)}}let E=c.filter(v=>v.owned===!0||v.owned===!1),d=E.filter(v=>v.owned===!0).length,x=c.filter(v=>v.type!=="Currency").length;return{key:i,unlocked:d,known:E.length,complete:E.length>0&&E.length===x&&d===E.length,title:u?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(u.name)?u.name:`Set ${r+1}`,outfit:u,hero:g,pages:o.map(v=>{let C=/Bonus$/.test(v.track||""),S=v.rewards||[],M=S.filter(b=>b.owned===!0||b.owned===!1),_=M.length>0&&M.length===S.filter(b=>b.type!=="Currency").length&&M.every(b=>b.owned);return{label:`${C?"Bonus":"Page"} ${v.page}`,bonus:C,rewards:S,done:_}}),rewardCount:c.length,baseCost:p,bonusCost:m,vbucks:w,types:[...f.entries()].sort((v,C)=>C[1]-v[1])}})}_costText(e){return Object.entries(e).map(([t,a])=>`${this._num(a)} ${Qe(t,a)}`).join(" + ")}_passCostBadge(e){if(e.price_row==="Included"||e.cost===0)return s`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof e.cost!="number")return l;let t=e.currency==="AthenaCategoryStar";return s`<span class="bp-cost ${t?"character":""}" title="${e.cost} ${Qe(e.currency,e.cost)}">
      <ha-icon icon=${t?"mdi:account-star":"mdi:star"}></ha-icon>${e.cost}</span>`}_goPassSet(e,t){this._passSet=(e+t)%t,this._passPage=0}_withOwnedOutfits(e){let t=new Set((this._outfits.data?.outfits||[]).map(o=>String(o.id||"").toLowerCase()));if(!t.size||e.known==null)return e;let a=e.unlocked||0,i=e.known||0,r=(e.pages||[]).map(o=>({...o,rewards:(o.rewards||[]).map(c=>{if(c.owned!=null||!ue(c))return c;let u=/^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(ge(c));return!u||!t.has(`character_${u[1].toLowerCase()}`)?c:(a+=1,i+=1,{...c,owned:!0})})}));return{...e,pages:r,unlocked:a,known:i}}_renderPassView(e){let t=this._pass;if(t.loading||t.data===void 0&&!t.error)return s`<div class="empty">Loading Battle Pass…</div>`;if(t.error)return s`<div class="empty">${t.error}</div>`;if(!t.data||!t.data.pages?.length)return s`<div class="empty">The Battle Pass will show here soon.</div>`;let a=this._withOwnedOutfits(t.data),i=this._passSets(a),r=Math.min(this._passSet,i.length-1),o=i[r],c=Math.min(this._passPage,o.pages.length-1),u=o.pages[c],g=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,p=Number(e?.state)||null,m=i.reduce((d,x)=>d+x.vbucks,0),f=i.filter(d=>d.outfit).length,w={};for(let d of i)for(let[x,v]of Object.entries(d.baseCost))w[x]=(w[x]||0)+v;let E=(d,x)=>x>1&&!/s$/.test(d)?`${d}s`:d;return s`
      <div class="bp">
        <div class="bp-summary">
          <div class="bp-summary-title">
            <ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon>
            <span>Season ${a.season} Battle Pass</span>
            ${g?.days_left!=null?s`<span class="bp-days">${g.days_left}d left</span>`:l}
          </div>
          ${a.known?s`<div class="bp-unlock">
                <div class="bp-unlock-top">
                  <span>✓ <b>${a.unlocked}</b> unlocked</span>
                  ${a.known>a.unlocked?s`<span class="bp-locked-count">🔒 ${a.known-a.unlocked} still locked</span>`:l}
                </div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(a.unlocked/a.known*100)}%"></div></div>
              </div>`:l}
          <div class="bp-stats">
            <div><b>${i.length}</b><span>sets</span></div>
            <div><b>${f}</b><span>outfits</span></div>
            <div><b>${a.reward_count??i.reduce((d,x)=>d+x.rewardCount,0)}</b><span>rewards</span></div>
            ${m?s`<div class="gold"><b>${this._num(m)}</b><span>V-Bucks</span></div>`:l}
            ${p?s`<div><b>${p}</b><span>level</span></div>`:l}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${i.map((d,x)=>s`
            <button class="bp-thumb ${x===r?"active":""} ${d.complete?"done":""}" role="tab" aria-selected=${x===r?"true":"false"}
              title="${d.title}${d.known?` \xB7 ${d.unlocked} of ${d.known} unlocked`:""}"
              @click=${()=>this._goPassSet(x,i.length)}>
              ${d.hero?s`<img src=${d.hero} alt="" @error=${z} />`:s`<ha-icon icon="mdi:account"></ha-icon>`}
              ${d.complete?s`<span class="bp-thumb-check">✓</span>`:l}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${()=>this._goPassSet(r-1,i.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${o.hero?s`<img src=${o.hero} alt="" @error=${z} />`:s`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${r+1} of ${i.length}</div>
              <div class="bp-hero-name">${o.title}</div>
              <div class="bp-hero-meta">
                ${Object.keys(o.baseCost).length?s`<span title="Stars for every reward on the main pages">${this._costText(o.baseCost)}</span>`:l}
                ${Object.keys(o.bonusCost).length?s`<span title="Bonus pages">Bonus: ${this._costText(o.bonusCost)}</span>`:l}
                ${o.vbucks?s`<span class="gold">Ⓥ ${this._num(o.vbucks)}</span>`:l}
              </div>
              ${o.known?s`<div class="bp-set-progress">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(o.unlocked/o.known*100)}%"></div></div>
                    <span>${o.complete?"\u2713 All unlocked":o.unlocked===o.known?`\u2713 ${o.unlocked} unlocked`:`\u2713 ${o.unlocked} unlocked \xB7 \u{1F512} ${o.known-o.unlocked} still locked`}</span>
                  </div>`:l}
              <div class="bp-hero-types">${o.types.map(([d,x])=>`${x} ${E(d,x)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(r+1,i.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${o.pages.length>1?s`<div class="bp-pages">
                ${o.pages.map((d,x)=>s`
                  <button class="mini-button ${x===c?"active":""} ${d.bonus?"bonus":""}" @click=${()=>this._passPage=x}>
                    ${d.done?"\u2713 ":""}${d.label}<span class="bp-page-count">${d.rewards.length}</span>
                  </button>`)}
              </div>`:l}

          <div class="bp-rewards">
            ${u.rewards.map(d=>s`
              <div class="bp-reward ${ne(d)?"vbucks":""} ${ue(d)?"outfit":""} ${d.owned===!0?"unlocked":d.owned===!1?"locked":""}"
                title="${tt(d)} · ${me(d)}${d.owned===!0?" \xB7 unlocked":d.owned===!1?" \xB7 locked":""}">
                <div class="bp-reward-img">
                  ${d.icon?s`<img src=${d.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${d.owned===!0?s`<span class="bp-state unlocked">✓</span>`:d.owned===!1?s`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`:l}
                  ${d.owned===!0?l:this._passCostBadge(d)}
                </div>
                <span class="bp-reward-name">${ne(d)&&d.quantity?`${this._num(d.quantity)} V-Bucks`:tt(d)}</span>
                <span class="bp-reward-type">${me(d)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(w).length?s`<span>All base pages: ${this._costText(w)}</span>`:l}

        </div>
      </div>
    `}_outfitRarity(e){let t=String(e?.rarity||"");return t?t.charAt(0).toUpperCase()+t.slice(1).toLowerCase():""}_renderLockerView(e){let a=(e.outfits||{}).avatar,i=a?.id||null,r=!!(this._config.avatar||"").trim(),o=this._outfits;if(o.loading||o.data===void 0&&!o.error)return s`<div class="empty">Loading locker…</div>`;if(o.error)return s`<div class="empty">${o.error}</div>`;let c=o.data?.outfits||[];if(!c.length)return s`<div class="empty">Your outfits will show up here soon.</div>`;let u=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],g=14,p=b=>!!b.first_seen&&this._now-Date.parse(b.first_seen)<g*864e5,m=c.filter(b=>b.name),f=m.filter(b=>b.favorite).length,w=m.filter(p).length,E=this._outfitQuery.trim().toLowerCase(),x=[...m.filter(b=>this._lockerFilter!=="favorites"||b.favorite).filter(b=>this._lockerFilter!=="new"||p(b)).filter(b=>!E||String(b.name).toLowerCase().includes(E)||String(b.set||"").toLowerCase().includes(E))].sort((b,A)=>{if(b.id?.toLowerCase()===i)return-1;if(A.id?.toLowerCase()===i)return 1;if(this._outfitSort==="rarity"){let L=u.indexOf(this._outfitRarity(b)),P=u.indexOf(this._outfitRarity(A));return(L<0?99:L)-(P<0?99:P)||String(b.name).localeCompare(String(A.name))}return String(b.name).localeCompare(String(A.name))}),v=this._config.compact?18:24,C=Math.max(1,Math.ceil(x.length/v)),S=Math.min(this._outfitPage,C-1),M=x.slice(S*v,S*v+v),_=new Map;for(let b of m)_.set(this._outfitRarity(b)||"Other",(_.get(this._outfitRarity(b)||"Other")||0)+1);return s`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${F[this._outfitRarity(a)]||"var(--accent)"}">
          <div class="locker-hero-img">
            ${a?.icon?s`<img src=${a.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Avatar${r?" \xB7 this card uses its own skin setting":""}</div>
            <div class="bp-hero-name">${a?.name||(i?"Unknown outfit":"Not chosen")}</div>
            <div class="bp-hero-meta">
              ${a?.rarity?s`<span>${this._outfitRarity(a)}</span>`:l}
              ${i?s`<button class="link-button" ?disabled=${this._loadingAction==="set_avatar"} @click=${()=>this._setAvatar(null)}>Clear</button>`:s`<span class="muted">Tap an outfit below to use it</span>`}
            </div>
            <div class="bp-hero-types">
              <b>${this._num(m.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${u.filter(b=>_.get(b)).map(b=>s`<span class="rarity-dot" style="--rarity:${F[b]}" title=${b}>${_.get(b)}</span>`)}
            </div>
          </div>
        </div>

        <div class="locker-controls">
          <input class="locker-search" type="search" placeholder="Search outfits or sets" .value=${this._outfitQuery}
            @input=${b=>{this._outfitQuery=b.target.value,this._outfitPage=0}} />
          <button class="mini-button ${this._outfitSort==="rarity"?"active":""}" @click=${()=>{this._outfitSort="rarity",this._outfitPage=0}}>Rarity</button>
          <button class="mini-button ${this._outfitSort==="name"?"active":""}" @click=${()=>{this._outfitSort="name",this._outfitPage=0}}>A–Z</button>
        </div>
        <div class="mode-tabs">
          ${["all","favorites","new"].map(b=>s`
            <button class="mode-tab ${this._lockerFilter===b?"active":""}" @click=${()=>{this._lockerFilter=b,this._outfitPage=0}}>
              ${b==="all"?"All":b==="favorites"?`\u2605 Favourites (${f})`:`\u2728 New (${w})`}</button>`)}
        </div>

        ${M.length?s`<div class="bp-rewards locker-grid">
              ${M.map(b=>{let A=String(b.id||"").toLowerCase(),L=A===i,P=this._selectedOutfit===A;return s`
                  <div class="bp-reward locker-tile ${L?"equipped":""} ${P?"selected":""}" style="--rarity:${F[this._outfitRarity(b)]||"#9CA3AF"}"
                    title="${b.name}${b.set?` \xB7 ${b.set}`:""}" role="button" tabindex="0"
                    @click=${()=>this._selectedOutfit=P?null:A}>
                    <div class="bp-reward-img locker-img">
                      ${b.small||b.icon?s`<img src=${b.small||b.icon} alt="" loading="lazy" @error=${z} />`:s`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${L?s`<span class="bp-cost included">Avatar</span>`:l}
                      ${b.favorite?s`<span class="locker-fav">★</span>`:l}
                      ${p(b)?s`<span class="locker-new">✨ New</span>`:l}
                      ${P?s`<div class="locker-actions">
                            ${L?l:s`<button class="locker-use" ?disabled=${this._loadingAction==="set_avatar"}
                                  @click=${G=>{G.stopPropagation(),this._setAvatar(A)}}>
                                  ${this._loadingAction==="set_avatar"?"Saving\u2026":"Use as avatar"}</button>`}
                            <button class="locker-use fav" @click=${G=>{G.stopPropagation(),this._setFavorite(A,!b.favorite)}}>
                              ${b.favorite?"\u2606 Unfavourite":"\u2605 Favourite"}</button>
                          </div>`:l}
                    </div>
                    <span class="bp-reward-name">${b.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(b)||"Outfit"}</span>
                  </div>`})}
            </div>`:s`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${C>1?s`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${S===0} @click=${()=>this._outfitPage=S-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${S+1} of ${C} · ${x.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${S>=C-1} @click=${()=>this._outfitPage=S+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:l}
      </div>
    `}async _loadShop(e=!1){if(!(!this.hass||this._shop.loading||!e&&(this._shop.data!==void 0||this._shop.error))){this._shop={...this._shop,loading:!0};try{this._shop={data:await this.hass.callWS({type:"fortnite_activity/shop",player_id:this._player})}}catch(t){this._shop={error:t?.message||"Item Shop unavailable"}}}}async _toggleWishlist(e,t){let a=String(e.key||e.id||"").toLowerCase();if(a){this._loadingAction=`wish:${a}`;try{await this.hass.callService("fortnite_activity",t?"wishlist_add":"wishlist_remove",{player_id:this._player,cosmetic_id:a,...t?Object.fromEntries(Object.entries({name:e.name,icon:e.icon,type:e.type,rarity:e.rarity}).filter(([,i])=>typeof i=="string"&&i)):{}}),this._searchResults=(this._searchResults||[]).map(i=>String(i.key).toLowerCase()===a?{...i,wishlisted:t}:i),await this._loadShop(!0)}catch(i){console.error("Wishlist update failed:",i)}finally{this._loadingAction=null}}}async _searchCosmetics(){let e=this._searchQuery.trim();if(e.length<2){this._searchResults=null;return}this._searchLoading=!0;try{let t=await this.hass.callWS({type:"fortnite_activity/cosmetic_search",query:e,player_id:this._player,...this._searchType!=="all"?{cosmetic_type:this._searchType}:{}});this._searchQuery.trim()===e&&(this._searchResults=t?.results||[])}catch{this._searchResults=[]}finally{this._searchLoading=!1}}_wishButton(e,t){let a=String(e.key||e.id||"").toLowerCase();return s`<button class="wish-btn ${t?"on":""}" title=${t?"Remove from wishlist":"Add to wishlist"}
      ?disabled=${this._loadingAction===`wish:${a}`}
      @click=${i=>{i.stopPropagation(),this._toggleWishlist(e,!t)}}>
      <ha-icon icon=${t?"mdi:heart":"mdi:heart-outline"}></ha-icon></button>`}_renderShopView(){let e=this._shop;if(e.loading&&e.data===void 0)return s`<div class="empty">Loading the Item Shop…</div>`;if(e.error)return s`<div class="empty">${e.error}</div>`;let t=e.data?.shop,a=e.data?.wishlist||[],i=e.data?.in_shop||[],r=(o,c)=>s`
      <button class="mode-tab ${this._shopTab===o?"active":""}" @click=${()=>this._shopTab=o}>${c}</button>`;return s`
      ${i.length?s`<div class="shop-alert">
            <ha-icon icon="mdi:heart"></ha-icon>
            <span><b>${i.length===1?i[0].name:`${i.length} wishlist items`}</b> ${i.length===1?"is":"are"} in the shop today!</span>
          </div>`:l}
      <div class="mode-tabs shop-tabs">
        ${r("today","Today's shop")}
        ${r("wishlist",s`♥ Wishlist${a.length?` (${a.length})`:""}`)}
      </div>
      ${this._shopTab==="wishlist"?this._renderWishlist(a,i):this._renderShopToday(t)}
    `}_renderShopToday(e){if(!e)return s`<div class="empty">The Item Shop will show here soon.</div>`;let t=this._shopQuery.trim().toLowerCase(),a=p=>p.bundle?"bundle":String(p.items[0]?.type||"other").toLowerCase(),i=[["all","All"],["outfit","Outfits"],["emote","Emotes"],["pickaxe","Pickaxes"],["bundle","Bundles"]],r=(e.sections||[]).map(p=>({...p,offers:p.offers.filter(m=>(this._shopKind==="all"||a(m)===this._shopKind)&&(!t||String(m.title).toLowerCase().includes(t)||m.items.some(f=>String(f.name||"").toLowerCase().includes(t))))})).filter(p=>p.offers.length),o=this._shopLimit,c=r.reduce((p,m)=>p+m.offers.length,0),u=[];for(let p of r){if(o<=0)break;u.push({...p,offers:p.offers.slice(0,o)}),o-=p.offers.length}let g=e.expiration?Date.parse(e.expiration)-this._now:null;return s`
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Search today's shop" .value=${this._shopQuery}
          @input=${p=>this._shopQuery=p.target.value} />
        ${g&&g>0?s`<span class="muted">New shop in ${this._formatSpan(g)}</span>`:l}
      </div>
      <div class="mode-tabs">
        ${i.map(([p,m])=>s`<button class="mode-tab ${this._shopKind===p?"active":""}" @click=${()=>{this._shopKind=p,this._shopLimit=36}}>${m}</button>`)}
      </div>
      ${u.length?u.map(p=>s`
            <div class="section-title">${p.name}</div>
            <div class="shop-grid">
              ${p.offers.map(m=>{let f=m.items[0]||{};return s`
                  <div class="shop-tile ${m.owned?"owned":""} ${m.wishlisted?"wish":""}" style="--rarity:${F[this._outfitRarity(f)]||"#9CA3AF"}"
                    title="${m.title}${m.items.length>1?` \xB7 ${m.items.map(w=>w.name).join(", ")}`:""}">
                    <div class="shop-img">
                      ${m.image?s`<img src=${m.image} alt="" loading="lazy" @error=${z} />`:s`<ha-icon icon="mdi:shopping-outline"></ha-icon>`}
                      ${m.owned?s`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(f,!!f.wishlisted)}
                      ${m.bundle?s`<span class="shop-bundle">Bundle · ${m.items.length}</span>`:l}
                    </div>
                    <span class="bp-reward-name">${m.title}</span>
                    <span class="shop-price">Ⓥ ${this._num(m.price)}${m.regular_price&&m.regular_price>m.price?s` <s>${this._num(m.regular_price)}</s>`:l}</span>
                  </div>`})}
            </div>`):s`<div class="empty">Nothing in today's shop matches.</div>`}
      ${c>this._shopLimit?s`<button class="mini-button show-more" @click=${()=>this._shopLimit+=36}>Show more (${c-this._shopLimit} left)</button>`:l}
    `}_renderWishlist(e,t){let a=new Set(t.map(r=>r.id)),i=(r,o)=>s`
      <button class="mode-tab ${this._searchType===r?"active":""}" @click=${()=>{this._searchType=r,this._searchCosmetics()}}>${o}</button>`;return s`
      <div class="section-title">Find any skin or item</div>
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Type a name, e.g. Peely" .value=${this._searchQuery}
          @input=${r=>{this._searchQuery=r.target.value,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>this._searchCosmetics(),400)}} />
      </div>
      <div class="mode-tabs">${i("outfit","Outfits")} ${i("all","Everything")}</div>
      ${this._searchLoading?s`<div class="empty">Searching…</div>`:l}
      ${this._searchResults?this._searchResults.length?s`<div class="bp-rewards locker-grid">
              ${this._searchResults.map(r=>s`
                <div class="bp-reward" style="--rarity:${F[this._outfitRarity(r)]||"#9CA3AF"}" title=${r.name}>
                  <div class="bp-reward-img locker-img">
                    ${r.icon?s`<img src=${r.icon} alt="" loading="lazy" @error=${z} />`:s`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                    ${r.owned?s`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(r,!!r.wishlisted)}
                  </div>
                  <span class="bp-reward-name">${r.name}</span>
                  <span class="bp-reward-type">${r.owned?"Owned":r.type||this._outfitRarity(r)}</span>
                </div>`)}
            </div>`:s`<div class="empty">No matches.</div>`:l}

      <div class="section-title">Your wishlist</div>
      ${e.length?s`<div class="bp-rewards locker-grid">
            ${e.map(r=>s`
              <div class="bp-reward ${a.has(r.id)?"in-shop":""}" style="--rarity:${F[this._outfitRarity(r)]||"#9CA3AF"}" title=${r.name||r.id}>
                <div class="bp-reward-img locker-img">
                  ${r.icon?s`<img src=${r.icon} alt="" loading="lazy" @error=${z} />`:s`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                  ${this._wishButton(r,!0)}
                  ${a.has(r.id)?s`<span class="shop-bundle in">In shop!</span>`:l}
                </div>
                <span class="bp-reward-name">${r.name||r.id}</span>
                <span class="bp-reward-type">${a.has(r.id)?"Available now":r.type||"Waiting"}</span>
              </div>`)}
          </div>`:s`<div class="empty">Tap ♡ on any skin to get told when it is in the shop.</div>`}
    `}async _loadNews(){if(!(!this.hass||this._news.loading||this._news.data!==void 0||this._news.error)){this._news={loading:!0};try{this._news={data:await this.hass.callWS({type:"fortnite_activity/news",player_id:this._player})}}catch(e){this._news={error:e?.message||"News unavailable"}}}}_renderNewsView(){let e=this._news;if(e.loading||e.data===void 0&&!e.error)return s`<div class="empty">Loading news…</div>`;if(e.error)return s`<div class="empty">${e.error}</div>`;let t=e.data?.news||[],a=e.data?.update,i=e.data?.season||this._catalog.season;return s`
      ${a||i?s`<div class="news-update">
            <ha-icon icon="mdi:update"></ha-icon>
            <div>
              <b>${a?.chapter&&a?.season?`Chapter ${a.chapter} \xB7 Season ${a.season}`:i?.number?`Season ${i.number}`:"Current update"}</b>
              <span>
                ${a?.patch||a?.version?`Update ${a.patch||a.version}`:""}${a?.release_date?` \xB7 out ${this._formatWhen(a.release_date)}`:""}
                ${i?.days_left!=null?` \xB7 season ends in ${i.days_left} days`:""}
              </span>
            </div>
          </div>`:l}
      ${this._sectionsHas("events")?l:this._renderNextEventTeaser()}
      ${t.length?s`<div class="news-list">
            ${t.map(r=>s`
              <div class="news-card">
                ${r.image||r.tile?s`<img src=${r.image||r.tile} alt="" loading="lazy" @error=${z} />`:l}
                <div class="news-body">
                  ${r.tag?s`<span class="tag">${r.tag}</span>`:l}
                  <b>${r.title}</b>
                  ${r.body?s`<p>${r.body}</p>`:l}
                </div>
              </div>`)}
          </div>`:s`<div class="empty">No news right now.</div>`}
    `}_sectionsHas(e){return this._sections.includes(e)}_renderNextEventTeaser(){let t=(this._events.list||[]).filter(i=>this._matchesFilters(i,this._currentFilters())).find(i=>i.windows.some(r=>this._windowState(r)!=="finished"));if(!t)return l;let a=this._eventTiming(t);return s`<div class="news-update event">
      ${t.poster?s`<img src=${t.poster} alt="" @error=${z} />`:s`<ha-icon icon="mdi:tournament"></ha-icon>`}
      <div><b>${t.name}</b><span>${a.text}</span></div>
    </div>`}async _loadMap(e=this._mapMode){let t=this._maps[e];if(!(!this.hass||t?.loading||t?.error||t?.data!==void 0)){this._maps={...this._maps,[e]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,mode:e});this._maps={...this._maps,[e]:{data:a?.map??null}}}catch(a){this._maps={...this._maps,[e]:{error:a?.message||"Map unavailable"}}}}}async _loadMatchMap(e){let t=`playlist:${e}`;if(!(!this.hass||this._maps[t])){this._maps={...this._maps,[t]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,playlist_id:e});this._maps={...this._maps,[t]:{data:a?.map??null}}}catch{this._maps={...this._maps,[t]:{data:null}}}}}_matchMap(e){let t=this._maps[`playlist:${e.playlist_id}`]?.data;return t||(e.mode_category==="build"||e.mode_category==="zero_build")&&this._maps.br?.data||null}_poiPos(e,t){let a=e?.bounds;if(!a||a.maxX===a.minX||a.maxY===a.minY)return null;let i=(t.x-a.minX)/(a.maxX-a.minX)-.5,r=(t.y-a.minY)/(a.maxY-a.minY)-.5,o=(Number(e?.camera?.rotation)||0)*Math.PI/180,c=Math.round(Math.cos(o)*1e6)/1e6,u=Math.round(Math.sin(o)*1e6)/1e6,g=(i*c-r*u+.5)*100,p=(i*u+r*c+.5)*100;return g<0||g>100||p<0||p>100?null:{left:g,top:p}}_gridRef(e){return`${"ABCDEFGHIJ"[Math.min(9,Math.max(0,Math.floor(e.left/10)))]}${Math.min(10,Math.max(1,Math.floor(e.top/10)+1))}`}_mapModeLabel(e){let t=this._maps[e]?.data?.name;if(t)return t;if(e==="br")return"Battle Royale";if(e==="og")return"OG";if(!e.startsWith("rotating:"))return e;let a=e.split(":")[1].replace(/(forbidden|blast|berry|ranch|smile|spawn|stake)/g," $1").replace(/\s+/g," ").trim();return this._titleCase(a)}async _loadAllMaps(){for(let e of this._maps.br?.data?.modes||[])await this._loadMap(e)}_mapPlaces(e){return(e?.pois||[]).map((t,a)=>{let i=this._poiPos(e,t);return i?{key:`${t.name}#${a}`,name:this._titleCase(t.name),type:t.type==="landmark"?"landmark":"named",...i,grid:this._gridRef(i)}:null}).filter(Boolean)}_titleCase(e){return String(e||"").toLowerCase().replace(/(^|[\s(-])([a-z])/g,(t,a,i)=>a+i.toUpperCase()).replace(/'([a-z])([a-z]{2,})/g,(t,a,i)=>"'"+a.toUpperCase()+i)}_clampPan(e,t,a){let i=1-e;return{x:Math.min(0,Math.max(i,t)),y:Math.min(0,Math.max(i,a))}}_setMapView(e,t,a){let i=Math.min(8,Math.max(1,e));this._mapZoom=i,this._mapPan=this._clampPan(i,t,a)}_zoomAt(e,t=.5,a=.5){let i=this._mapZoom,r=Math.min(8,Math.max(1,i*e)),{x:o,y:c}=this._mapPan;this._setMapView(r,t-(t-o)*(r/i),a-(a-c)*(r/i))}_focusPlace(e,t=Math.max(this._mapZoom,3)){this._mapPoi=e.key;let a=Math.min(8,Math.max(1,t));this._setMapView(a,.5-a*(e.left/100),.5-a*(e.top/100))}_resetMapView(){this._setMapView(1,0,0)}_mapFrameEl(){return this.shadowRoot?.querySelector(".mapx-frame")}_applyLayer(e,t,a){let i=this.shadowRoot?.querySelector(".mapx-layer");i&&(i.style.transform=`translate(${t*100}%, ${a*100}%) scale(${e})`,i.style.setProperty("--iz",String(1/e)))}_onMapWheel(e){let t=this._mapFrameEl();if(!t)return;e.preventDefault();let a=t.getBoundingClientRect();this._zoomAt(e.deltaY<0?1.25:.8,(e.clientX-a.left)/a.width,(e.clientY-a.top)/a.height)}_onMapPointerDown(e){let t=this._mapFrameEl();this._mapMenu&&(this._mapMenu=!1),!(!t||e.target.closest(".mapx-tools, .mapx-pin, .mapx-info"))&&(t.setPointerCapture(e.pointerId),this._pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._gesture={z:this._mapZoom,x:this._mapPan.x,y:this._mapPan.y,moved:!1,start:new Map(this._pointers)})}_onMapPointerMove(e){let t=this._mapFrameEl(),a=this._gesture;if(!t||!a||!this._pointers.has(e.pointerId))return;this._pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});let i=t.getBoundingClientRect(),r=[...this._pointers.values()],o=[...a.start.values()],c=a.z,u=a.x,g=a.y;if(r.length>=2&&o.length>=2){let m=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y)||1,f=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y);c=Math.min(8,Math.max(1,a.z*(f/m)));let w=((o[0].x+o[1].x)/2-i.left)/i.width,E=((o[0].y+o[1].y)/2-i.top)/i.height;u=w-(w-a.x)*(c/a.z)+(r[0].x+r[1].x-o[0].x-o[1].x)/2/i.width,g=E-(E-a.y)*(c/a.z)+(r[0].y+r[1].y-o[0].y-o[1].y)/2/i.height}else{let m=o[0]||r[0];u=a.x+(r[0].x-m.x)/i.width,g=a.y+(r[0].y-m.y)/i.height}(Math.abs(u-a.x)+Math.abs(g-a.y)>.005||c!==a.z)&&(a.moved=!0);let p=this._clampPan(c,u,g);a.last={z:c,x:p.x,y:p.y},this._applyLayer(c,p.x,p.y)}_onMapPointerUp(e){let t=this._gesture;this._pointers.delete(e.pointerId),t&&(this._pointers.size===0?(t.last&&this._setMapView(t.last.z,t.last.x,t.last.y),this._gesture=null):this._gesture={...t.last||t,moved:t.moved,start:new Map(this._pointers)})}_onMapDblClick(e){let t=this._mapFrameEl();if(!t||e.target.closest(".mapx-tools, .mapx-info"))return;let a=t.getBoundingClientRect();this._zoomAt(2,(e.clientX-a.left)/a.width,(e.clientY-a.top)/a.height)}async _toggleMapFull(){let e=this.shadowRoot?.querySelector(".mapx"),t=document;if(this._mapFull){t.fullscreenElement&&await t.exitFullscreen().catch(()=>{}),this._mapFull=!1;return}this._mapFull=!0;try{await e?.requestFullscreen?.({navigationUI:"hide"})}catch{}}_randomDrop(e){let t=e.filter(i=>i.type==="named");if(!t.length)return;let a=t[Math.floor(Math.random()*t.length)];t.length>1&&a.key===this._mapPoi&&(a=t[(t.indexOf(a)+1)%t.length]),this._mapDrop=a.key,this._focusPlace(a,2.5)}_renderMapImage(e,t=!1){return s`
      <div class="map-frame ${t?"compact":""}">
        <img src=${e.image} alt=${e.name||"Map"} loading="lazy" @error=${z} />
      </div>
    `}_renderMapPicker(){let e=this._maps.br?.data?.modes||["br"],t=this._mapMode,a=[["Battle Royale","mdi:island",e.filter(o=>o==="br")],["OG","mdi:gamepad-classic",e.filter(o=>o==="og")],["Reload & rotating","mdi:autorenew",e.filter(o=>o.startsWith("rotating:"))]],i=t==="br"?"mdi:island":t==="og"?"mdi:gamepad-classic":"mdi:autorenew",r=o=>{let c=this._maps[o];if(c?.loading)return"loading\u2026";let u=(c?.data?.pois||[]).filter(g=>g.type!=="landmark").length;return c?.data?`${u} places`:""};return s`
      <div class="mapx-picker">
        <button class="mapx-current" aria-haspopup="listbox" aria-expanded=${this._mapMenu?"true":"false"}
          @click=${()=>{this._mapMenu=!this._mapMenu,this._mapMenu&&this._loadAllMaps()}}>
          <ha-icon icon=${i}></ha-icon>
          <span><b>${this._mapModeLabel(t)}</b><small>${e.length>1?`${e.length} maps \xB7 tap to change`:"Map"}</small></span>
          <ha-icon icon=${this._mapMenu?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._mapMenu?s`<div class="mapx-menu" role="listbox">
              ${a.filter(([,,o])=>o.length).map(([o,c,u])=>s`
                <div class="mapx-group"><ha-icon icon=${c}></ha-icon>${o}</div>
                ${u.map(g=>s`
                  <button class="mapx-option ${g===t?"on":""}" role="option" aria-selected=${g===t?"true":"false"}
                    @click=${()=>{this._mapMode=g,this._mapMenu=!1,this._mapPoi=null,this._mapDrop=null,this._resetMapView(),this._loadMap(g)}}>
                    <span>${this._mapModeLabel(g)}</span><small>${r(g)}</small>
                    ${g===t?s`<ha-icon icon="mdi:check"></ha-icon>`:l}
                  </button>`)}`)}
            </div>`:l}
      </div>
    `}_renderMapView(){let e=this._maps[this._mapMode]||{};if(e.loading||e.data===void 0&&!e.error)return s`${this._renderMapPicker()}<div class="empty">Loading map…</div>`;if(e.error)return s`${this._renderMapPicker()}<div class="empty">${e.error}</div>`;let t=e.data;if(!t)return s`${this._renderMapPicker()}<div class="empty">This map will show here soon.</div>`;let a=this._mapPlaces(t),i=a.filter(_=>_.type==="named"),r=a.filter(_=>_.type==="landmark"),o=this._mapZoom,{x:c,y:u}=this._mapPan,g=this._mapFull||(this.offsetWidth||0)>=560,p=this._mapLabels==="all"||this._mapLabels==="auto"&&(g||o>=1.6),m=this._mapLabels==="all"?o>=1.6:this._mapLabels==="auto"&&o>=3,f=a.find(_=>_.key===this._mapPoi)||null,w=f?a.filter(_=>_.name===f.name):[],E=this._mapQuery.trim().toLowerCase(),d=_=>!E||_.name.toLowerCase().includes(E)||_.grid.toLowerCase()===E,x=(_,b)=>this._mapSort==="grid"&&_.grid.localeCompare(b.grid,void 0,{numeric:!0})||_.name.localeCompare(b.name),v=i.filter(d).sort(x),C=[...r.filter(d).reduce((_,b)=>_.set(b.name,[..._.get(b.name)||[],b]),new Map)].sort((_,b)=>this._mapSort==="grid"?_[1][0].grid.localeCompare(b[1][0].grid,void 0,{numeric:!0}):_[0].localeCompare(b[0])),S=(_,b,A,L=!1,P=!1)=>s`
      <button class="mapx-tool ${L?"on":""}" title=${b} aria-label=${b} ?disabled=${P} @click=${A}><ha-icon icon=${_}></ha-icon></button>`,M=this._mapLabels==="off"?"mdi:label-off-outline":this._mapLabels==="all"?"mdi:label-multiple":"mdi:label-outline";return s`
      <div class="mapx ${this._mapFull?"full":""}">
        <div class="mapx-main">
          <div class="mapx-top">
            ${this._renderMapPicker()}
            <div class="mapx-meta">
              ${t.chapter&&t.season?s`<span>Chapter ${t.chapter} · Season ${t.season}</span>`:l}
              ${t.patch?s`<span>Update ${t.patch}</span>`:l}
              <span>${i.length} places${r.length?` \xB7 ${r.length} landmarks`:""}</span>
            </div>
          </div>

          <div class="mapx-frame ${this._gesture?"dragging":""}"
            @wheel=${_=>this._onMapWheel(_)}
            @pointerdown=${_=>this._onMapPointerDown(_)}
            @pointermove=${_=>this._onMapPointerMove(_)}
            @pointerup=${_=>this._onMapPointerUp(_)}
            @pointercancel=${_=>this._onMapPointerUp(_)}
            @dblclick=${_=>this._onMapDblClick(_)}>
            <div class="mapx-layer" style="transform: translate(${c*100}%, ${u*100}%) scale(${o}); --iz:${1/o}">
              <img src=${t.image} alt=${t.name||"Map"} draggable="false" @error=${z} />
              ${this._mapGrid?s`<div class="mapx-grid">
                    ${[...Array(10).keys()].map(_=>s`<span class="gcol" style="left:${_*10+5}%">${"ABCDEFGHIJ"[_]}</span>
                      <span class="grow" style="top:${_*10+5}%">${_+1}</span>`)}
                  </div>`:l}
              ${a.filter(_=>_.type==="named"||this._mapShowLandmarks||_.key===this._mapPoi).map(_=>{let b=_.key===this._mapPoi,A=b||(_.type==="named"?p:m);return s`
                    <button class="mapx-pin ${_.type} ${b?"on":""} ${_.key===this._mapDrop?"drop":""}"
                      style="left:${_.left}%;top:${_.top}%" title="${_.name} · ${_.grid}" aria-label="${_.name}, grid ${_.grid}"
                      @click=${L=>{L.stopPropagation(),this._mapPoi=b?null:_.key}}>
                      <i></i>${A?s`<b>${_.key===this._mapDrop?"\u{1F3B2} ":""}${_.name}</b>`:l}
                    </button>`})}
            </div>

            <div class="mapx-tools">
              ${S("mdi:plus","Zoom in",()=>this._zoomAt(1.6),!1,o>=8)}
              ${S("mdi:minus","Zoom out",()=>this._zoomAt(1/1.6),!1,o<=1)}
              ${S("mdi:fit-to-screen-outline","Show whole map",()=>this._resetMapView(),!1,o===1)}
              ${S(this._mapFull?"mdi:fullscreen-exit":"mdi:fullscreen",this._mapFull?"Exit full screen":"Full screen",()=>this._toggleMapFull())}
              <span class="mapx-sep"></span>
              ${S("mdi:grid","Grid",()=>this._mapGrid=!this._mapGrid,this._mapGrid)}
              ${S(M,`Labels: ${this._mapLabels==="auto"?"automatic":this._mapLabels}`,()=>{this._mapLabels=this._mapLabels==="auto"?"all":this._mapLabels==="all"?"off":"auto"},this._mapLabels!=="auto")}
              ${r.length?S("mdi:map-marker-star-outline","Landmarks",()=>this._mapShowLandmarks=!this._mapShowLandmarks,this._mapShowLandmarks):l}
              ${i.length?S("mdi:dice-5-outline","Pick a drop spot for me",()=>this._randomDrop(a)):l}
            </div>

            ${o>1?s`<span class="mapx-zoom">${o.toFixed(1)}×</span>`:l}

            ${f?s`<div class="mapx-info">
                  <span class="mapx-grid-badge">${f.grid}</span>
                  <div>
                    <b>${f.key===this._mapDrop?"\u{1F3B2} Drop here: ":""}${f.name}</b>
                    <small>${f.type==="landmark"?"Landmark":"Named place"}${w.length>1?` \xB7 ${w.indexOf(f)+1} of ${w.length}`:""}</small>
                  </div>
                  ${w.length>1?s`<button class="mapx-tool" title="Next one" @click=${()=>this._focusPlace(w[(w.indexOf(f)+1)%w.length])}><ha-icon icon="mdi:chevron-right"></ha-icon></button>`:l}
                  <button class="mapx-tool" title="Zoom to" @click=${()=>this._focusPlace(f)}><ha-icon icon="mdi:crosshairs-gps"></ha-icon></button>
                  <button class="mapx-tool" title="Close" @click=${()=>{this._mapPoi=null,this._mapDrop=null}}><ha-icon icon="mdi:close"></ha-icon></button>
                </div>`:l}
          </div>
        </div>

        <div class="mapx-side">
          <div class="mapx-search">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input type="search" placeholder="Find a place or grid (e.g. D4)" .value=${this._mapQuery}
              @input=${_=>this._mapQuery=_.target.value} />
          </div>
          <div class="mode-tabs">
            <button class="mode-tab ${this._mapSort==="name"?"active":""}" @click=${()=>this._mapSort="name"}>A–Z</button>
            <button class="mode-tab ${this._mapSort==="grid"?"active":""}" @click=${()=>this._mapSort="grid"}>By grid</button>
          </div>

          ${v.length?s`<div class="section-title">Named places (${v.length})</div>
                <div class="mapx-list">
                  ${v.map(_=>s`
                    <button class="mapx-row ${_.key===this._mapPoi?"on":""}" @click=${()=>this._focusPlace(_)}>
                      <span class="mapx-grid-badge">${_.grid}</span><span>${_.name}</span>
                    </button>`)}
                </div>`:l}
          ${C.length?s`<div class="section-title">Landmarks (${r.length})</div>
                <div class="mapx-list">
                  ${C.map(([_,b])=>{let A=b.some(L=>L.key===this._mapPoi);return s`
                      <button class="mapx-row landmark ${A?"on":""}" @click=${()=>{this._mapShowLandmarks||(this._mapShowLandmarks=!0);let L=b.findIndex(P=>P.key===this._mapPoi);this._focusPlace(b[(L+1)%b.length])}}>
                        <span class="mapx-grid-badge">${b.length>1?`\xD7${b.length}`:b[0].grid}</span><span>${_}</span>
                      </button>`})}
                </div>`:l}
          ${!v.length&&!C.length?s`<div class="empty">No places match.</div>`:l}
        </div>
      </div>
    `}_spriteCurve(e){let t=[...e.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,r)=>i.level-r.level),a=[];for(let i of t){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(e,t){if(typeof e!="number"||!t.length)return null;let a=0;t.forEach(([,c],u)=>{e>=c&&(a=u)});let[i]=t[a],r=t[t.length-1],o=t[a+1];return{level:i,maxLevel:r[0],maxXp:r[1],next:o?o[1]:null,toMax:Math.max(0,r[1]-e),atMax:a===t.length-1}}_spriteInfo(e,t){let a=e.variants||[],i=a.filter(u=>u.owned),r=a.filter(u=>u.mastered).length,o=null;for(let u of i){let g=this._spriteLevel(u.xp,t);g&&(!o||g.level>o.level)&&(o=g)}let c=i.reduce((u,g)=>u+Math.max(1,Number(g.count)||0),0);return{owned:i.length,total:a.length,mastered:r,best:o,copies:c}}_spriteName(e){return String(e.name||"").replace(/ Sprite$/,"")}_renderSpritesView(e){let t=e?.attributes||{},a=this._spriteCurve(t),i=t.families||[],r=Number(e?.state||0),o=Number(t.owned_variants||0),c=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],u=i.filter(d=>d.mastered>0).length,p=[...i.filter(d=>this._spriteFilter==="missing"?!d.owned:this._spriteFilter==="unmastered"?d.owned&&!d.mastered:this._spriteFilter==="mastered"?d.mastered>0:this._spriteFilter==="new"?d.new||d.new_kinds>0:!0)].sort((d,x)=>this._spriteSort==="rarity"?c.indexOf(x.rarity)-c.indexOf(d.rarity)||(d.dex??0)-(x.dex??0):this._spriteSort==="progress"&&x.owned_variants/x.total_variants-d.owned_variants/d.total_variants||(d.dex??0)-(x.dex??0)),m=i.flatMap(d=>d.variants.filter(x=>!x.owned&&x.drop_chance_pct).map(x=>({f:d,v:x}))).sort((d,x)=>x.v.drop_chance_pct-d.v.drop_chance_pct||c.indexOf(d.f.rarity)-c.indexOf(x.f.rarity)).slice(0,6),f=a.length?i.flatMap(d=>d.variants.filter(x=>x.owned&&typeof x.xp=="number"&&x.xp>0).map(x=>({f:d,v:x,lv:this._spriteLevel(x.xp,a)}))).filter(d=>d.lv&&!d.lv.atMax).sort((d,x)=>d.lv.toMax-x.lv.toMax).slice(0,5):[],w=(d,x)=>s`
      <button class="mode-tab ${this._spriteFilter===d?"active":""}" @click=${()=>this._spriteFilter=d}>${x}</button>`,E=(d,x)=>s`
      <button class="mode-tab ${this._spriteSort===d?"active":""}" @click=${()=>this._spriteSort=d}>${x}</button>`;return s`
      ${t.new_sprites||t.new_kinds?s`<button class="sp-release ${this._spriteFilter==="new"?"on":""}" @click=${()=>this._spriteFilter=this._spriteFilter==="new"?"all":"new"}>
            <span class="sp-release-badge">✨ NEW</span>
            <span><b>Update ${t.version}</b> added ${[t.new_sprites?`${t.new_sprites} new sprite${t.new_sprites>1?"s":""}`:"",t.new_kinds?`${t.new_kinds} new kind${t.new_kinds>1?"s":""}`:""].filter(Boolean).join(" and ")}</span>
            <small>${this._spriteFilter==="new"?"Show all":"Show them"}</small>
          </button>`:l}
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,r)}"><span>${Math.round(r)}%</span></div>
        <div class="sp-stat">
          <b>${t.owned_families??0}<small>/${t.total_families??i.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${u}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${o}<small>/${t.total_variants??0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${f.length?s`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${f.map(({f:d,v:x,lv:v})=>s`
                <div class="master-row" style="--rarity:${F[d.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=d.id}>
                  ${x.icon?s`<img src=${x.icon} alt="" @error=${z} />`:l}
                  <span class="variant-name">${x.label==="Base"?this._spriteName(d):`${x.label} ${this._spriteName(d)}`}</span>
                  <span class="sp-level-pill">Level ${v.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,x.xp/v.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(v.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:l}

      ${m.length?s`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${m.map(({f:d,v:x})=>s`
                <div class="hunt-item" style="--rarity:${F[d.rarity]||"#9CA3AF"}" title="${x.name}" @click=${()=>this._expandedSprite=d.id}>
                  ${x.icon?s`<img src=${x.icon} alt="" @error=${z} />`:l}
                  <span>${x.label==="Base"?this._spriteName(d):`${x.label} ${this._spriteName(d)}`}</span>
                  <small>${x.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`:l}

      <div class="tab-rows">
        <div class="mode-tabs">${w("all","All")} ${w("mastered","\u2B50 Mastered")} ${w("unmastered","Not mastered")} ${w("missing","Not found")} ${t.new_sprites||t.new_kinds?w("new","\u2728 New"):l}</div>
        <div class="mode-tabs">${E("dex","Number")} ${E("rarity","Rarity")} ${E("progress","Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${p.length?p.map(d=>{let x=this._expandedSprite===d.id,v=this._spriteInfo(d,a),C=v.mastered?s`<span class="sp-status gold">⭐ Mastered</span>`:d.owned?s`<span class="sp-status">Not mastered</span>`:s`<span class="sp-status dim">Not found yet</span>`,S=d.owned?s`<span class="sp-have">Have ${v.copies}${v.best?s` · <span class=${v.best.atMax?"sp-max":""} title=${v.best.atMax?"Top level":""}>Lv ${v.best.level}</span>`:l}</span>`:l;return s`
                <div class="sp-card ${d.owned?"":"missing"} ${v.mastered?"mastered":""} ${x?"open":""} ${d.new||d.new_kinds?"is-new":""}"
                  style="--rarity:${F[d.rarity]||"#9CA3AF"}" role="button" tabindex="0"
                  @click=${()=>this._expandedSprite=x?null:d.id}>
                  <div class="sp-img">
                    ${d.icon?s`<img src=${d.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${v.mastered?s`<span class="sp-badge star" title="Mastered">⭐</span>`:l}
                    ${d.owned?l:s`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                    ${d.new?s`<span class="sp-badge new" title="New this update">NEW</span>`:d.new_kinds?s`<span class="sp-badge new kind" title="${d.new_kinds} new kind${d.new_kinds>1?"s":""} this update">NEW KIND</span>`:l}
                  </div>
                  <span class="sp-name">${this._spriteName(d)}</span>
                  ${C}
                  ${S}
                  <div class="sp-kinds" title="${v.owned} of ${v.total} kinds">
                    ${(d.variants||[]).map(M=>s`
                      <span class="sp-kind ${M.owned?"owned":""} ${M.mastered?"mastered":""} ${M.new&&!d.new?"new":""}" title="${M.label}${M.new?" \xB7 new this update":""}${M.owned?"":" (not found yet)"}">
                        ${M.icon?s`<img src=${M.icon} alt="" @error=${z} />`:l}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${v.owned} of ${v.total} kinds</span>
                </div>
                ${x?this._renderSpriteDetail(d):l}`}):s`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${(t.versions||[]).length>1?s`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${t.versions.map(d=>s`
              <div class="version-row ${d.current?"current":""}">
                <span>${d.current?"This season":d.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,d.completion_pct)}%"></div></div>
                <span>${d.owned_variants}/${d.total_variants}</span>
              </div>`)}
          </div>`:l}
    `}_renderSpriteDetail(e){let t=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{}),a=e.name;return s`
      <div class="sprite-detail sp-detail" style="--rarity:${F[e.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${e.icon_large||e.icon?s`<img src=${e.icon_large||e.icon} alt="" @error=${z} />`:l}
          <div>
            <b>${e.name}</b> <span class="tag rarity-tag">${e.rarity||""}</span>
            ${e.new?s`<span class="sp-chip new">✨ New this update</span>`:e.added_in?s`<span class="sp-chip dim">Added in update ${e.added_in}</span>`:l}
            ${e.description?s`<p class="detail-desc">${e.description}</p>`:l}
            ${e.hint?s`<p class="detail-desc hint">📍 ${e.hint}</p>`:l}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(e.variants||[]).map(i=>{let r=i.owned?this._spriteLevel(i.xp,t):null,o=(i.boons||[]).find(u=>u.name&&u.name!==a),c=Math.max(1,Number(i.count)||0);return s`
              <div class="sp-kind-row ${i.owned?"":"missing"} ${i.mastered?"mastered":""}">
                <div class="sp-kind-icon">
                  ${i.icon?s`<img src=${i.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${i.owned?l:s`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${i.label}</b>
                    ${i.new&&!e.new?s`<span class="sp-chip new">✨ New kind</span>`:l}
                    ${i.mastered?s`<span class="sp-chip gold">⭐ Mastered</span>`:l}
                    ${i.owned?s`<span class="sp-chip">You have ${c}</span>`:s`<span class="sp-chip dim">Not found yet</span>`}
                    ${r?s`<span class="sp-chip">Level ${r.level}${r.atMax?" \xB7 max":""}</span>`:l}
                    ${!i.owned&&i.drop_chance_pct!=null?s`<span class="sp-chip dim">${i.drop_chance_pct}% chance</span>`:l}
                  </div>
                  ${r&&!r.atMax&&r.next?s`<div class="sp-xp">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,i.xp/r.next*100)}%"></div></div>
                        <span>${this._num(i.xp)} / ${this._num(r.next)} XP to level ${r.level+1}</span>
                      </div>`:l}
                  ${o?s`<div class="sp-perk">✨ ${o.description||o.name}</div>`:l}
                </div>
              </div>`})}
        </div>
      </div>
    `}_renderWindowMatches(e,t,a){let i=`window:${e}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let r=this._matchLists[i],o=r?.matches||[],c=r?.tracked??0,u=a.matches||0;return s`
      <div class="match-feed-header">
        <span>${t} matches (${c}${u>c?` of ${u}`:""})</span>

      </div>
      ${r?.loading?s`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,o,s`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(e,t){let a=this._playlist(e.playlist_id),i=a?.image,r=/ropesmile|reload/i.test(e.playlist_id+e.name)?"reload":/nobuild|zero build/i.test(e.playlist_id+e.name)?"zero_build":"build";return s`
      <div class="feature-card ${i?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${t?` \xB7 ${t}`:""}</span>
          <span class="feature-value">${a?.name||e.name}</span>
          <span class="feature-sub">${this._num(e.matches)} matches</span>
        </div>
        ${i?s`<img class="feature-art" src=${i} alt="" @error=${z} />`:s`<ha-icon class="feature-icon" icon=${St[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(e){let t=e.metrics||{},a=Object.values(e.inputs||{}).filter(r=>r.share_pct>=1),i=e.team_sizes||{};return s`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",t.kills_per_minute??0],["Avg Match",`${t.avg_match_minutes??0}m`],["Score/Match",this._num(t.score_per_match)],["Solo Top 10",`${t.solo_top10_rate??0}%`],["Solo Top 25",`${t.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?s`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((r,o)=>s`<div class="split-seg seg-${o}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((r,o)=>s`<span><i class="dot seg-${o}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
            </div>
          </div>`:l}

      ${Object.keys(i).length?s`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(r=>i[r]).map(r=>s`<div class="size-row">
                <span class="size-name">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
                <span>${this._num(i[r].matches)} m</span>
                <span>${i[r].win_rate}% win</span>
                <span>${i[r].kd} K/D</span>
              </div>`)}
          </div>`:l}
    `}_defaultFilters(){let e=this._config.events_region||this._events.defaultRegion||"EU";return{region:e==="all"?[]:[e],type:[],mode:[],team:[],platform:[]}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(e,t){return!(t.region.length&&!t.region.includes(e.region_group)||t.type.length&&!t.type.includes(e.tournament_type)||t.mode.length&&!t.mode.some(a=>a==="Ranked"?e.ranked:e.mode===a)||t.team.length&&!t.team.includes(e.team)||t.platform.length&&!t.platform.some(a=>(e.platform_groups||[]).includes(a)))}_toggleFilter(e,t){let a=this._currentFilters(),i=a[e].includes(t)?a[e].filter(r=>r!==t):[...a[e],t];this._filters={...a,[e]:i}}_renderEventsView(){let e=this._events;if(e.loading&&!e.list)return s`<div class="empty">Loading tournaments…</div>`;if(e.error)return s`<div class="empty">${e.error}</div>`;if(e.list===null)return s`<div class="empty">Tournaments will show here soon.</div>`;let t=e.list||[],a=this._currentFilters(),i=[...new Set(t.map(p=>p.region_group))].sort(),r=t.filter(p=>this._matchesFilters(p,a)).filter(p=>p.windows.some(m=>this._windowState(m)!=="finished")||this._expandedEvent===p.key),o=[["region","Region",i.map(p=>[p,p])],["type","Type",[...new Set(t.map(p=>p.tournament_type).filter(Boolean))].map(p=>[p,Xe[p]||p])],["mode","Mode",[["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked"]]],["team","Team",[["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]]],["platform","Platform",[["PC","PC"],["Console","Console"],["Mobile","Mobile"]]]],c=(p,m)=>o.find(f=>f[0]===p)?.[2].find(f=>f[0]===m)?.[1]||m,u=o.flatMap(([p])=>a[p].map(m=>[p,m])),g=JSON.stringify(a)!==JSON.stringify(this._defaultFilters());return s`
      <div class="filter-bar">
        <button class="filter-toggle ${this._filtersOpen?"open":""}" @click=${()=>this._filtersOpen=!this._filtersOpen}>
          <ha-icon icon="mdi:filter-variant"></ha-icon><span>Filters</span>${u.length?s`<b>${u.length}</b>`:l}
        </button>
        <div class="filter-active">
          ${u.length?u.map(([p,m])=>s`<button class="fchip on" title="Remove" @click=${()=>this._toggleFilter(p,m)}>${c(p,m)} ✕</button>`):s`<span class="muted">All tournaments</span>`}
        </div>
        ${g?s`<button class="filter-reset" @click=${()=>this._filters=null} title="Reset filters"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button>`:l}
      </div>
      ${this._filtersOpen?s`<div class="filter-panel">
            ${o.map(([p,m,f])=>f.length?s`<div class="fgroup"><span>${m}</span><div>
                  ${f.map(([w,E])=>s`<button class="fchip ${a[p].includes(w)?"on":""}" @click=${()=>this._toggleFilter(p,w)}>${E}</button>`)}
                </div></div>`:l)}
          </div>`:l}
      <div class="match-feed-header">
        <span>Tournaments (${r.length})</span>
        <span class="muted">UK time</span>
      </div>
      <div class="match-list events">
        ${r.length?r.map(p=>this._renderEvent(p)):s`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(e){let t=e.windows.find(o=>this._windowState(o)==="live");if(t)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(t.end)-this._now)}`,live:!0,soon:!1};let a=e.windows.find(o=>this._windowState(o)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,r=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:r}}_renderEvent(e){let t=this._eventTiming(e),a=this._expandedEvent===e.key,i=e.tournament_type?Xe[e.tournament_type]||e.tournament_type:null,r=[e.mode,e.team,e.ranked&&e.tournament_type!=="RankedCup"?"Ranked":null,...e.platform_groups||[],e.region].filter(Boolean);return s`
      <div class="event-card ${t.live?"live":""} ${a?"expanded":""} ${e.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(e)}>
          ${e.poster?s`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${z} />`:l}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${t.live?s`<span class="placement-badge win">LIVE</span>`:l}
            </div>
            <span class="match-mode ${t.soon?"soon":""}">${t.text}</span>
            <div class="tag-row">
              ${i?s`<span class="tag type-tag ${e.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:l}
              ${e.can_spectate?s`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>`:l}
              ${r.map(o=>s`<span class="tag">${o}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(e):l}
      </div>
    `}_renderEventDetails(e){let t=e.loading_screen||e.poster;return s`
      <div class="event-details">
        ${t?s`<img class="event-hero" src=${t} alt="" @error=${z} />`:l}
        ${e.subtitle&&e.subtitle!==e.name?s`<div class="detail-sub">${e.subtitle}</div>`:l}
        ${e.description?s`<p class="detail-desc">${e.description}</p>`:l}
        ${e.schedule_info?s`<p class="detail-desc muted">${e.schedule_info}</p>`:l}
        ${e.platform_groups?.length?s`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>`:l}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>
        ${e.min_account_level?s`<div class="detail-line"><span>Minimum account level</span><b>${e.min_account_level}</b></div>`:l}
        ${e.tournament_type==="FNCS"?s`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`:l}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map(a=>{let i=this._windowState(a),r=`${e.event_id}|${a.window_id}`,o=this._leaderboards[r],c=Date.parse(a.begin)-this._now;return s`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":c<7*864e5?`in ${this._formatSpan(c)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?s`<button class="mini-button" @click=${()=>this._loadLeaderboard(e.event_id,a.window_id)}>
                        ${o?.loading?"Loading\u2026":o?.data?"Refresh":"Leaderboard"}
                      </button>`:l}
                </div>
                ${o?this._renderLeaderboard(o):l}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(e){if(e.error)return s`<div class="lb-note">${e.error}</div>`;if(!e.data)return e.loading?s`<div class="lb-note">Loading leaderboard…</div>`:l;let t=e.data,a=(i,r=!1)=>s`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return s`
      <div class="leaderboard">
        ${t.player&&!t.entries.some(i=>i.is_player)?a(t.player,!0):l}
        ${t.entries.length?t.entries.map(i=>a(i,i.is_player)):s`<div class="lb-note">No scores yet.</div>`}
        ${t.updated?s`<div class="lb-note">Updated ${this._formatRelativeTime(t.updated)}${t.total_pages?` \xB7 ${t.total_pages} pages`:""}</div>`:l}
      </div>
    `}};y([B({attribute:!1})],k.prototype,"hass",2),y([$()],k.prototype,"_config",2),y([$()],k.prototype,"_view",2),y([$()],k.prototype,"_window",2),y([$()],k.prototype,"_selectedMode",2),y([$()],k.prototype,"_loadingAction",2),y([$()],k.prototype,"_catalog",2),y([$()],k.prototype,"_avatar",2),y([$()],k.prototype,"_events",2),y([$()],k.prototype,"_filters",2),y([$()],k.prototype,"_expandedEvent",2),y([$()],k.prototype,"_expandedMatch",2),y([$()],k.prototype,"_leaderboards",2),y([$()],k.prototype,"_now",2),y([$()],k.prototype,"_matchLists",2),y([$()],k.prototype,"_showAllMatches",2),y([$()],k.prototype,"_expandedSprite",2),y([$()],k.prototype,"_spriteFilter",2),y([$()],k.prototype,"_spriteSort",2),y([$()],k.prototype,"_trends",2),y([$()],k.prototype,"_pass",2),y([$()],k.prototype,"_passSet",2),y([$()],k.prototype,"_passPage",2),y([$()],k.prototype,"_outfits",2),y([$()],k.prototype,"_outfitQuery",2),y([$()],k.prototype,"_outfitSort",2),y([$()],k.prototype,"_outfitPage",2),y([$()],k.prototype,"_selectedOutfit",2),y([$()],k.prototype,"_lockerFilter",2),y([$()],k.prototype,"_shop",2),y([$()],k.prototype,"_shopTab",2),y([$()],k.prototype,"_shopQuery",2),y([$()],k.prototype,"_shopLimit",2),y([$()],k.prototype,"_shopKind",2),y([$()],k.prototype,"_searchQuery",2),y([$()],k.prototype,"_searchType",2),y([$()],k.prototype,"_searchResults",2),y([$()],k.prototype,"_searchLoading",2),y([$()],k.prototype,"_news",2),y([$()],k.prototype,"_maps",2),y([$()],k.prototype,"_mapMode",2),y([$()],k.prototype,"_mapPoi",2),y([$()],k.prototype,"_mapZoom",2),y([$()],k.prototype,"_mapPan",2),y([$()],k.prototype,"_mapFull",2),y([$()],k.prototype,"_mapGrid",2),y([$()],k.prototype,"_mapLabels",2),y([$()],k.prototype,"_mapShowLandmarks",2),y([$()],k.prototype,"_mapMenu",2),y([$()],k.prototype,"_mapQuery",2),y([$()],k.prototype,"_mapSort",2),y([$()],k.prototype,"_mapDrop",2),y([$()],k.prototype,"_gesture",2),y([$()],k.prototype,"_filtersOpen",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",k);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${wt} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{k as FortniteActivityCard};
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
