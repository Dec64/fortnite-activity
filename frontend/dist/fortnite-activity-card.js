var ie=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var y=(h,n,t,e)=>{for(var a=e>1?void 0:e?se(n,t):n,i=h.length-1,r;i>=0;i--)(r=h[i])&&(a=(e?r(n,t,a):r(a))||a);return e&&a&&ie(n,t,a),a};var ot=globalThis,lt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol(),Pt=new WeakMap,Z=class{constructor(n,t,e){if(this._$cssResult$=!0,e!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=t}get styleSheet(){let n=this.o,t=this.t;if(lt&&n===void 0){let e=t!==void 0&&t.length===1;e&&(n=Pt.get(t)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),e&&Pt.set(t,n))}return n}toString(){return this.cssText}},Rt=h=>new Z(typeof h=="string"?h:h+"",void 0,bt),O=(h,...n)=>{let t=h.length===1?h[0]:n.reduce((e,a,i)=>e+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+h[i+1],h[0]);return new Z(t,h,bt)},Ft=(h,n)=>{if(lt)h.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of n){let e=document.createElement("style"),a=ot.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,h.appendChild(e)}},ft=lt?h=>h:h=>h instanceof CSSStyleSheet?(n=>{let t="";for(let e of n.cssRules)t+=e.cssText;return Rt(t)})(h):h;var{is:re,defineProperty:ne,getOwnPropertyDescriptor:oe,getOwnPropertyNames:le,getOwnPropertySymbols:pe,getPrototypeOf:ce}=Object,pt=globalThis,Dt=pt.trustedTypes,de=Dt?Dt.emptyScript:"",he=pt.reactiveElementPolyfillSupport,Q=(h,n)=>h,X={toAttribute(h,n){switch(n){case Boolean:h=h?de:null;break;case Object:case Array:h=h==null?h:JSON.stringify(h)}return h},fromAttribute(h,n){let t=h;switch(n){case Boolean:t=h!==null;break;case Number:t=h===null?null:Number(h);break;case Object:case Array:try{t=JSON.parse(h)}catch{t=null}}return t}},ct=(h,n)=>!re(h,n),Tt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),pt.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,t=Tt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(n,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(n,e,t);a!==void 0&&ne(this.prototype,n,a)}}static getPropertyDescriptor(n,t,e){let{get:a,set:i}=oe(this.prototype,n)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let o=a?.call(this);i?.call(this,r),this.requestUpdate(n,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Tt}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let n=ce(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let t=this.properties,e=[...le(t),...pe(t)];for(let a of e)this.createProperty(a,t[a])}let n=this[Symbol.metadata];if(n!==null){let t=litPropertyMetadata.get(n);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let t=[];if(Array.isArray(n)){let e=new Set(n.flat(1/0).reverse());for(let a of e)t.unshift(ft(a))}else n!==void 0&&t.push(ft(n));return t}static _$Eu(n,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(n.set(e,this[e]),delete this[e]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,t,e){this._$AK(n,e)}_$ET(n,t){let e=this.constructor.elementProperties.get(n),a=this.constructor._$Eu(n,e);if(a!==void 0&&e.reflect===!0){let i=(e.converter?.toAttribute!==void 0?e.converter:X).toAttribute(t,e.type);this._$Em=n,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(n,t){let e=this.constructor,a=e._$Eh.get(n);if(a!==void 0&&this._$Em!==a){let i=e.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:X;this._$Em=a;let o=r.fromAttribute(t,i.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(n,t,e,a=!1,i){if(n!==void 0){let r=this.constructor;if(a===!1&&(i=this[n]),e??=r.getPropertyOptions(n),!((e.hasChanged??ct)(i,t)||e.useDefault&&e.reflect&&i===this._$Ej?.get(n)&&!this.hasAttribute(r._$Eu(n,e))))return;this.C(n,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,t,{useDefault:e,reflect:a,wrapped:i},r){e&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,r??t??this[n]),i!==!0||r!==void 0)||(this._$AL.has(n)||(this.hasUpdated||e||(t=void 0),this._$AL.set(n,t)),a===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,i]of e){let{wrapped:r}=i,o=this[a];r!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,i,o)}}let n=!1,t=this._$AL;try{n=this.shouldUpdate(t),n?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw n=!1,this._$EM(),e}n&&this._$AE(t)}willUpdate(n){}_$AE(n){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(n){}firstUpdated(n){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[Q("elementProperties")]=new Map,D[Q("finalized")]=new Map,he?.({ReactiveElement:D}),(pt.reactiveElementVersions??=[]).push("2.1.2");var kt=globalThis,Bt=h=>h,dt=kt.trustedTypes,Nt=dt?dt.createPolicy("lit-html",{createHTML:h=>h}):void 0,Ht="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+B,me=`<${Wt}>`,V=document,tt=()=>V.createComment(""),et=h=>h===null||typeof h!="object"&&typeof h!="function",St=Array.isArray,ue=h=>St(h)||typeof h?.[Symbol.iterator]=="function",vt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ot=/-->/g,Ut=/>/g,U=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jt=/'/g,Vt=/"/g,qt=/^(?:script|style|textarea|title)$/i,Et=h=>(n,...t)=>({_$litType$:h,strings:n,values:t}),s=Et(1),T=Et(2),Pe=Et(3),I=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),It=new WeakMap,j=V.createTreeWalker(V,129);function Kt(h,n){if(!St(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nt!==void 0?Nt.createHTML(n):n}var ge=(h,n)=>{let t=h.length-1,e=[],a,i=n===2?"<svg>":n===3?"<math>":"",r=J;for(let o=0;o<t;o++){let c=h[o],m,g,p=-1,u=0;for(;u<c.length&&(r.lastIndex=u,g=r.exec(c),g!==null);)u=r.lastIndex,r===J?g[1]==="!--"?r=Ot:g[1]!==void 0?r=Ut:g[2]!==void 0?(qt.test(g[2])&&(a=RegExp("</"+g[2],"g")),r=U):g[3]!==void 0&&(r=U):r===U?g[0]===">"?(r=a??J,p=-1):g[1]===void 0?p=-2:(p=r.lastIndex-g[2].length,m=g[1],r=g[3]===void 0?U:g[3]==='"'?Vt:jt):r===Vt||r===jt?r=U:r===Ot||r===Ut?r=J:(r=U,a=void 0);let f=r===U&&h[o+1].startsWith("/>")?" ":"";i+=r===J?c+me:p>=0?(e.push(m),c.slice(0,p)+Ht+c.slice(p)+B+f):c+B+(p===-2?o:f)}return[Kt(h,i+(h[t]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),e]},at=class h{constructor({strings:n,_$litType$:t},e){let a;this.parts=[];let i=0,r=0,o=n.length-1,c=this.parts,[m,g]=ge(n,t);if(this.el=h.createElement(m,e),j.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=j.nextNode())!==null&&c.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(Ht)){let u=g[r++],f=a.getAttribute(p).split(B),w=/([.?@])?(.*)/.exec(u);c.push({type:1,index:i,name:w[2],strings:f,ctor:w[1]==="."?_t:w[1]==="?"?yt:w[1]==="@"?$t:q}),a.removeAttribute(p)}else p.startsWith(B)&&(c.push({type:6,index:i}),a.removeAttribute(p));if(qt.test(a.tagName)){let p=a.textContent.split(B),u=p.length-1;if(u>0){a.textContent=dt?dt.emptyScript:"";for(let f=0;f<u;f++)a.append(p[f],tt()),j.nextNode(),c.push({type:2,index:++i});a.append(p[u],tt())}}}else if(a.nodeType===8)if(a.data===Wt)c.push({type:2,index:i});else{let p=-1;for(;(p=a.data.indexOf(B,p+1))!==-1;)c.push({type:7,index:i}),p+=B.length-1}i++}}static createElement(n,t){let e=V.createElement("template");return e.innerHTML=n,e}};function W(h,n,t=h,e){if(n===I)return n;let a=e!==void 0?t._$Co?.[e]:t._$Cl,i=et(n)?void 0:n._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(h),a._$AT(h,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(n=W(h,a._$AS(h,n.values),a,e)),n}var xt=class{constructor(n,t){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:t},parts:e}=this._$AD,a=(n?.creationScope??V).importNode(t,!0);j.currentNode=a;let i=j.nextNode(),r=0,o=0,c=e[0];for(;c!==void 0;){if(r===c.index){let m;c.type===2?m=new it(i,i.nextSibling,this,n):c.type===1?m=new c.ctor(i,c.name,c.strings,this,n):c.type===6&&(m=new wt(i,this,n)),this._$AV.push(m),c=e[++o]}r!==c?.index&&(i=j.nextNode(),r++)}return j.currentNode=V,a}p(n){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(n,e,t),t+=e.strings.length-2):e._$AI(n[t])),t++}},it=class h{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,t,e,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=n,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,t=this._$AM;return t!==void 0&&n?.nodeType===11&&(n=t.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,t=this){n=W(this,n,t),et(n)?n===l||n==null||n===""?(this._$AH!==l&&this._$AR(),this._$AH=l):n!==this._$AH&&n!==I&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):ue(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==l&&et(this._$AH)?this._$AA.nextSibling.data=n:this.T(V.createTextNode(n)),this._$AH=n}$(n){let{values:t,_$litType$:e}=n,a=typeof e=="number"?this._$AC(n):(e.el===void 0&&(e.el=at.createElement(Kt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let i=new xt(a,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(n){let t=It.get(n.strings);return t===void 0&&It.set(n.strings,t=new at(n)),t}k(n){St(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let i of n)a===t.length?t.push(e=new h(this.O(tt()),this.O(tt()),this,this.options)):e=t[a],e._$AI(i),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(n=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);n!==this._$AB;){let e=Bt(n).nextSibling;Bt(n).remove(),n=e}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,t,e,a,i){this.type=1,this._$AH=l,this._$AN=void 0,this.element=n,this.name=t,this._$AM=a,this.options=i,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=l}_$AI(n,t=this,e,a){let i=this.strings,r=!1;if(i===void 0)n=W(this,n,t,0),r=!et(n)||n!==this._$AH&&n!==I,r&&(this._$AH=n);else{let o=n,c,m;for(n=i[0],c=0;c<i.length-1;c++)m=W(this,o[e+c],t,c),m===I&&(m=this._$AH[c]),r||=!et(m)||m!==this._$AH[c],m===l?n=l:n!==l&&(n+=(m??"")+i[c+1]),this._$AH[c]=m}r&&!a&&this.j(n)}j(n){n===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},_t=class extends q{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===l?void 0:n}},yt=class extends q{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==l)}},$t=class extends q{constructor(n,t,e,a,i){super(n,t,e,a,i),this.type=5}_$AI(n,t=this){if((n=W(this,n,t,0)??l)===I)return;let e=this._$AH,a=n===l&&e!==l||n.capture!==e.capture||n.once!==e.once||n.passive!==e.passive,i=n!==l&&(e===l||a);a&&this.element.removeEventListener(this.name,this,e),i&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},wt=class{constructor(n,t,e){this.element=n,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(n){W(this,n)}};var be=kt.litHtmlPolyfillSupport;be?.(at,it),(kt.litHtmlVersions??=[]).push("3.3.3");var Yt=(h,n,t)=>{let e=t?.renderBefore??n,a=e._$litPart$;if(a===void 0){let i=t?.renderBefore??null;e._$litPart$=a=new it(n.insertBefore(tt(),i),i,void 0,t??{})}return a._$AI(h),a};var Mt=globalThis,R=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Yt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};R._$litElement$=!0,R.finalized=!0,Mt.litElementHydrateSupport?.({LitElement:R});var fe=Mt.litElementPolyfillSupport;fe?.({LitElement:R});(Mt.litElementVersions??=[]).push("4.2.2");var ve={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:ct},xe=(h=ve,n,t)=>{let{kind:e,metadata:a}=t,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),e==="setter"&&((h=Object.create(h)).wrapped=!0),i.set(t.name,h),e==="accessor"){let{name:r}=t;return{set(o){let c=n.get.call(this);n.set.call(this,o),this.requestUpdate(r,c,h,!0,o)},init(o){return o!==void 0&&this.C(r,void 0,h,o),o}}}if(e==="setter"){let{name:r}=t;return function(o){let c=this[r];n.call(this,o),this.requestUpdate(r,c,h,!0,o)}}throw Error("Unsupported decorator location: "+e)};function N(h){return(n,t)=>typeof t=="object"?xe(h,n,t):((e,a,i)=>{let r=a.hasOwnProperty(i);return a.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(a,i):void 0})(h,n,t)}function $(h){return N({...h,state:!0,attribute:!1})}var Gt=O`
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
`;var Ct=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"},{value:"shop",label:"Item Shop & wishlist"},{value:"news",label:"News & updates"},{value:"map",label:"Map"}],_e=h=>h.layout==="session_only"?["session"]:h.layout==="career_only"?["stats"]:h.layout==="events_only"?["events"]:Ct.map(n=>n.value).filter(n=>n!=="events"||h.show_tournaments!==!1),ye=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; overrides the avatar chosen in the Locker section)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:Ct}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...Ct]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"kid_mode",label:"Kid mode (bigger, simpler layout)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],st=class extends R{setConfig(n){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,max_feed_matches:10,...n},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=_e(this._config))}_valueChanged(n){if(!this._config||!this.hass)return;let t=n.target,e=n.detail?n.detail.value:t.value;this._config={...this._config,...e},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?l:s`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ye}
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
  `}};y([N({attribute:!1})],st.prototype,"hass",2),y([$()],st.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",st);var Zt=[{sections:["session","stats","trends"],header:"full"},{sections:["pass","sprites","locker"],header:"none",default_section:"pass"},{sections:["events","shop","news","map"],header:"none",default_section:"events"}],K=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-family-panel"};this._index=0;this._cards=[]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t},this._cards=[]}getCardSize(){return 12}static getStubConfig(){return{type:"custom:fortnite-family-panel",players:["player1"]}}get _players(){let t=(this._config.players||[]).map(e=>String(e).toLowerCase()).filter(Boolean);return t.length?t:["player1"]}_kid(t){let e=this._config.kid_mode;return Array.isArray(e)?e.map(a=>String(a).toLowerCase()).includes(t):!!e}_buildCards(){let t=this._config.columns?.length?this._config.columns:Zt;this._cards=[];for(let e of this._players)for(let a of t){let i=document.createElement("fortnite-activity-card");i.setConfig({type:"custom:fortnite-activity-card",player:e,sections:a.sections,header:a.header||"none",default_section:a.default_section||"auto",show_sub_buttons:a.sections.includes("session"),compact:this._config.compact??!1,card_style:this._config.card_style||"bubble",kid_mode:this._kid(e)}),i.dataset.player=e,this._cards.push(i)}}updated(t){(t.has("_config")||!this._cards.length)&&(this._buildCards(),this.requestUpdate());for(let e of this._cards)e.hass=this.hass}_displayName(t){return Object.values(this.hass?.states||{}).find(a=>a.attributes?.fortnite_player_id===t&&a.attributes?.fortnite_entity_key==="profile")?.attributes?.display_name||t.charAt(0).toUpperCase()+t.slice(1)}_scrollTo(t){let e=this.shadowRoot?.querySelector(".track");e&&(e.scrollTo({left:t*e.clientWidth,behavior:"smooth"}),this._index=t)}_onScroll(t){let e=t.target,a=Math.round(e.scrollLeft/Math.max(1,e.clientWidth));a!==this._index&&(this._index=a)}render(){if(!this.hass)return l;let t=(this._config.columns?.length?this._config.columns:Zt).length,e=this._players;return s`
      <div class="panel" style="--panel-height:${this._config.height||"calc(100vh - var(--header-height, 56px) - 16px)"}">
        ${e.length>1?s`<div class="nav">
              ${e.map((a,i)=>s`<button class=${i===this._index?"on":""} @click=${()=>this._scrollTo(i)}>${this._displayName(a)}</button>`)}
            </div>`:l}
        <div class="track" @scroll=${this._onScroll}>
          ${e.map(a=>s`
            <section class="page" style="--cols:${t}">
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
  `}};y([N({attribute:!1})],K.prototype,"hass",2),y([$()],K.prototype,"_config",2),y([$()],K.prototype,"_index",2);customElements.get("fortnite-family-panel")||(customElements.define("fortnite-family-panel",K),window.customCards=window.customCards||[],window.customCards.push({type:"fortnite-family-panel",name:"Fortnite Family Panel",description:"Full-screen landscape page per player; swipe between players."}));var $e="1.13.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var we={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},Y={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},F={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},ke={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Qt=(h,n)=>{let t=h&&ke[h]||h||"";return n===1||!t?t:`${t}s`},Xt={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Jt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],Se={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},zt={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},te=["session","stats","events","sprites","trends","pass","locker","shop","news","map"],Ee={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},gt=h=>String(h?.icon||"").split("/").pop()||"",nt=h=>h?.type==="Currency"&&(/MTX/i.test(gt(h))||/v-?bucks/i.test(h?.name||"")),mt=h=>h?.type==="AthenaCharacter"||/^T_Soldier_/i.test(gt(h)),ut=h=>{if(mt(h))return"Outfit";if(nt(h))return"V-Bucks";let n=gt(h);return h?.type==="AthenaDance"&&/Spray/i.test(n)?"Spray":h?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(n)?"Emoticon":Ee[h?.type]||"Cosmetic"},ee=h=>h?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(h.name)?h.name:ut(h),z=h=>{h.target.hidden=!0},ae=h=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:h}),rt={at:0},H={at:0},At=new Map,k=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...zt};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._selectedOutfit=null;this._lockerFilter="all";this._shop={};this._shopTab="today";this._shopQuery="";this._shopLimit=36;this._shopKind="all";this._searchQuery="";this._searchType="outfit";this._searchResults=null;this._searchLoading=!1;this._news={};this._maps={};this._mapMode="br";this._mapPoi=null;this._mapZoom=1;this._mapPan={x:0,y:0};this._mapFull=!1;this._mapGrid=!1;this._mapLabels="auto";this._mapShowLandmarks=!0;this._mapMenu=!1;this._mapQuery="";this._mapSort="name";this._mapDrop=null;this._gesture=null;this._pointers=new Map;this._filtersOpen=!1;this._renderedView=null;this._entityCache=new Map;this._avatarQuery="";this._onFullscreenChange=()=>{!document.fullscreenElement&&this._mapFull&&(this._mapFull=!1)};this._onKeyDown=t=>{t.key==="Escape"&&this._mapFull&&this._toggleMapFull()}}static get styles(){return Gt}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...zt,...t},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...zt}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),document.addEventListener("fullscreenchange",this._onFullscreenChange),document.addEventListener("keydown",this._onKeyDown),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-H.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this._onFullscreenChange),document.removeEventListener("keydown",this._onKeyDown),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let t=this._config;if(Array.isArray(t.sections)&&t.sections.length){let e=t.sections.filter(a=>te.includes(a));if(e.length)return[...new Set(e)]}switch(t.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return te.filter(e=>e!=="events"||t.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(e.states[a]!==this.hass.states[a])return!0;return!1}updated(t){if(super.updated(t),!this.hass)return;let e=t.has("hass")&&!t.get("hass");e&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(t.has("_config")||e)&&this._scheduleAvatar(),this._renderedView==="pass"&&(this._loadPass(),this._loadOutfits()),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="shop"&&this._loadShop(),this._renderedView==="news"&&(this._loadNews(),this._events.list===void 0&&!this._events.loading&&!this._events.error&&this._loadEvents()),this._renderedView==="map"&&(this._loadMap("br"),this._loadMap(this._mapMode)),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!rt.promise||Date.now()-rt.at>36e5)&&(rt.at=Date.now(),rt.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await rt.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}async _loadEvents(t=!1){if(this.hass){(t||!H.promise||Date.now()-H.at>10*6e4)&&(H.at=Date.now(),H.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),!this._events.list&&!this._events.loading&&(this._events={...this._events,loading:!0});try{let e=await H.promise;this._events={list:e?.tournaments??null,defaultRegion:e?.default_region_group}}catch(e){H.promise=void 0,this._events={error:e?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let e=t.toLowerCase();At.has(e)||At.set(e,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await At.get(e);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadLeaderboard(t,e){let a=`${t}|${e}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:t,window_id:e,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(t){this._outfits={error:t?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let t=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:t?.battlepass??null}}catch(t){this._pass={error:t?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let t=Jt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!t.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let e=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:t,period:i,types:["mean","min","max","state"]});try{let a=await e(30,"day"),i="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await e(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(t,e){!this.hass||this._matchLists[t]||(this._matchLists={...this._matchLists,[t]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...e}).then(a=>{this._matchLists={...this._matchLists,[t]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[t]:{error:a?.message||"Could not load matches"}}}))}_isRanked(t){return!!t.rank_delta_pct||!!t.unreal_rank_change||/habanero/i.test(t.playlist_id||"")}_findEntity(t,e){let a=this.hass?.states;if(!a)return;let i=this._player,r=`${i}:${t}:${e}`,o=this._entityCache.get(r);if(o&&a[o])return a[o];let c;for(let[m,g]of Object.entries(a))if(m.startsWith(`${t}.`)&&g.attributes?.fortnite_player_id===i&&g.attributes?.fortnite_entity_key===e){c=m;break}if(c||(c=[e,...we[e]||[]].flatMap(p=>[`${t}.fortnite_${i}_${p}`,`${t}.fortnite_${i}_${i}_${p}`]).find(p=>a[p])),!!c)return this._entityCache.set(r,c),a[c]}async _callService(t,e={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...e}),t==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadEvents(),t==="trends"&&this._loadTrends(),t==="pass"&&(this._loadPass(),this._loadOutfits()),t==="locker"&&this._loadOutfits(),t==="shop"&&this._loadShop(),t==="news"&&this._loadNews(),t==="map"&&this._loadMap(this._mapMode)}_entityId(t,e){return this._findEntity(t,e)?.entity_id}_toggleEvent(t){if(this._expandedEvent===t.key){this._expandedEvent=null;return}this._expandedEvent=t.key;let e=t.windows.find(a=>this._windowState(a)==="live")||[...t.windows].reverse().find(a=>this._windowState(a)==="finished");e&&!this._leaderboards[`${t.event_id}|${e.window_id}`]&&this._loadLeaderboard(t.event_id,e.window_id)}_formatRelativeTime(t){if(!t)return"";let e=new Date(t);if(isNaN(e.getTime()))return"";let a=Math.max(1,Math.round((this._now-e.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let e=Math.floor(t/60),a=Math.round(t%60);return e>0?`${e}h ${a}m`:`${a}m`}_formatSpan(t){let e=Math.max(0,Math.round(t/6e4)),a=Math.floor(e/1440),i=Math.floor(e%1440/60),r=e%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}_formatWhen(t){try{return ae(this.hass?.config?.time_zone).format(new Date(t)).replace(/\b(am|pm)\b/i,e=>e.toLowerCase())}catch{return ae().format(new Date(t))}}_num(t,e=0){return Number(t||0).toLocaleString("en-GB",{maximumFractionDigits:e,minimumFractionDigits:0})}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}_windowState(t){let e=Date.parse(t.begin),a=Date.parse(t.end);return this._now>=a?"finished":this._now>=e?"live":"upcoming"}_rankBadge(t,e=30){let a=t||"Unranked",i=Object.keys(Y).find(p=>a.startsWith(p));if(!i)return s`<span class="rank-badge unranked" style="width:${e}px;height:${e}px">–</span>`;let[r,o]=Y[i],c=(a.match(/\b(I{1,3})$/)||[])[1]||"",m=`g-${i}-${e}`;return s`<span class="rank-badge" title=${a} style="width:${e}px;height:${e}px">
      ${T`<svg viewBox="0 0 40 44" width=${e} height=${e} aria-hidden="true">
        <defs><linearGradient id=${m} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${o}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?T`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${m})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:T`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${m})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${c}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return s`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,e=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),o=this._findEntity("sensor","level"),c=this._findEntity("binary_sensor","playing"),m=this._findEntity("sensor","profile"),g=this._findEntity("sensor","sprites"),p=this._findEntity("sensor","power_ranking"),u=!!g&&!["unavailable","unknown"].includes(g.state);if(!e&&!a&&!c)return s`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let f=c?.state==="on"||e?.state==="active",w=e?.attributes||{},E=a?.attributes||{},d=m?.attributes||{},v={...i?.attributes||{},current_rank:i?.state},x={...r?.attributes||{},current_rank:r?.state},M=!!m?.attributes?.outfits?.owned_count,S=this._sections.filter(Lt=>this._sections.length===1||(Lt!=="sprites"||u)&&(Lt!=="locker"||M)),C=this._config.default_section,_=f&&S.includes("session")?"session":S.includes("stats")?"stats":S[0],b=this._view??(C&&C!=="auto"&&S.includes(C)?C:_);S.includes(b)||(b=_),this._renderedView=b;let A=this._config.header||"full",L="",P={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};P[this._config.theme_accent||""]&&(L+=`--accent: ${P[this._config.theme_accent]};`),this._config.custom_background&&(L+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let G=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}${this._config.kid_mode?" kid":""}${this._mapFull?" map-full":""}`;return s`
      <ha-card class=${G} style="${L}">
        ${A==="none"?l:A==="slim"?this._renderSlimHeader(t,f,w,d):this._renderHeader(t,f,w,E,d,o,v,x)}
        ${this._renderButtons(b,f,S)}
        ${b==="session"?this._renderSessionView(f,w,v):b==="events"?this._renderEventsView():b==="sprites"?this._renderSpritesView(g):b==="trends"?this._renderTrendsView():b==="pass"?this._renderPassView(o):b==="locker"?this._renderLockerView(d):b==="shop"?this._renderShopView():b==="news"?this._renderNewsView():b==="map"?this._renderMapView():this._renderStatsView(E,d,v,x,p)}
      </ha-card>
    `}_renderHeader(t,e,a,i,r,o,c,m){let g=r.display_name||t.charAt(0).toUpperCase()+t.slice(1),p=r.season||this._catalog.season,u=i.metrics?.last_played,f=o?.attributes||{},w=Number(o?.state)||0,E=Number(f.account_level||0),d=this._avatarImage(r),v=this._config.compact?20:24,x=this._findEntity("sensor","vbucks"),M=!this._config.hide_vbucks&&x&&!isNaN(Number(x.state)),S=x?.attributes?.crew;return s`
      <div class="fa-header">
        <div class="player-avatar ${d?"has-image":""}">
          ${d?s`<img src=${d} alt=${this._avatarName(r)} @error=${z} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${g}</h2>
            <span class="header-ranks">
              ${c.current_rank&&c.current_rank!=="Unranked"?this._rankBadge(c.current_rank,v):l}
              ${m.current_rank&&m.current_rank!=="Unranked"?this._rankBadge(m.current_rank,v):l}
            </span>
          </div>
          <div class="player-meta">
            ${p?.number?s`<span class="level-badge">S${p.number} · ${p.days_left}d left</span>`:l}
            ${!this._config.hide_season_level&&w>0?s`<span class="level-badge">Lvl ${w}</span>`:l}
            ${!this._config.hide_account_level&&E>0?s`<span>Acct ${E.toLocaleString()}</span>`:l}
            ${M?s`<span class="vbucks-chip" title=${Object.entries(x.attributes?.by_kind||{}).map(([C,_])=>`${C}: ${this._num(_)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(x.state)}</span>`:l}
            ${S?.active&&!this._config.hide_vbucks?s`<span class="crew-chip" title="Fortnite Crew${S.end_date?` \xB7 renews ${this._formatWhen(S.end_date)}`:""}">Crew</span>`:l}
            ${u?.time&&!e?s`<span title=${u.name||""}>Played ${this._formatRelativeTime(u.time)}</span>`:l}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?s`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:s`<span>IDLE</span>`}
        </div>
      </div>
      ${p?.progress_pct!==void 0&&!this._config.compact?s`<div class="season-bar" title="Season ${p.number}: ${p.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,p.progress_pct)}%"></div>
          </div>`:l}
    `}_liveEventCount(){let t=this._currentFilters();return(this._events.list||[]).filter(e=>this._matchesFilters(e,t)&&e.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(t){return(this._config.avatar||"").trim()?this._avatar?.icon:t?.outfits?.avatar?.icon||void 0}_avatarName(t){return(this._config.avatar||"").trim()?this._avatar?.name||"":t?.outfits?.avatar?.name||""}async _setFavorite(t,e){try{await this.hass.callService("fortnite_activity","set_favorite",{player_id:this._player,outfit_id:t,favorite:e});let a=(this._outfits.data?.outfits||[]).map(i=>String(i.key||i.id).toLowerCase()===t?{...i,favorite:e}:i);this._outfits={data:{...this._outfits.data||{},outfits:a}}}catch(a){console.error("Favourite update failed:",a)}finally{this._selectedOutfit=null}}async _setAvatar(t){this._loadingAction="set_avatar";try{await this.hass.callService("fortnite_activity","set_avatar",{player_id:this._player,outfit_id:t||""}),this._outfits={data:{...this._outfits.data||{},avatar_id:t}}}catch(e){console.error("Error setting Fortnite avatar:",e)}finally{this._loadingAction=null,this._selectedOutfit=null}}_renderSlimHeader(t,e,a,i){let r=i.display_name||t.charAt(0).toUpperCase()+t.slice(1),o=this._avatarImage(i),c=this._findEntity("sensor","vbucks"),m=!this._config.hide_vbucks&&c&&!isNaN(Number(c.state));return s`
      <div class="fa-header slim">
        <div class="player-avatar ${o?"has-image":""}">
          ${o?s`<img src=${o} alt="" @error=${z} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${r}</h2>
            ${m?s`<span class="vbucks-chip">Ⓥ ${this._num(c.state)}</span>`:l}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?s`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:s`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(t,e,a){let i=a.length>1,r=!this._config.sections?.length&&this._config.layout==="events_only",o=this._config.show_sub_buttons!==!1&&!r;if(!i&&!o)return l;let c=this._eventsEnabled?this._liveEventCount():0,m=Number(this._findEntity("sensor","wishlist")?.state)||0,g={session:["mdi:lightning-bolt",e?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",c],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"],shop:["mdi:shopping-outline","Shop",m],news:["mdi:newspaper-variant-outline","News"],map:["mdi:map-outline","Map"]},p=(u,f,w,E=0)=>s`
      <button class="bubble-sub-button ${t===u?"active":""}" @click=${()=>this._setView(u)} title=${w}>
        <ha-icon icon=${f}></ha-icon><span class="btn-label">${w}</span>
        ${E>0?s`<span class="notify-badge" title="${E} live">${E}</span>`:l}
      </button>
    `;return s`
      <div class="sub-button-row">
        ${i?a.map(u=>p(u,g[u][0],g[u][1],g[u][2]||0)):l}
        ${o?e?s`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
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
    `}_renderKpis(t){if(this._config.compact){let e=[];for(let a=0;a<t.length;a+=2)e.push(t.slice(a,a+2));return s`<table class="stat-table"><tbody>
        ${e.map(a=>s`<tr>
          ${a.map(([i,r,o])=>s`<th>${i}</th><td class="kpi-value ${o||""}">${r}</td>`)}
          ${a.length<2?s`<th></th><td></td>`:l}
        </tr>`)}
      </tbody></table>`}return s`<div class="kpi-row">
      ${t.map(([e,a,i])=>s`<div class="kpi-chip"><span class="kpi-label">${e}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(t,e,a,i){let r=e.current_rank||"Unranked",o=Number(e.progress_pct||0),c=r.startsWith("Unreal");return s`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${t}</span></span>
          <span class="rank-name" style="color: ${(Y[Object.keys(Y).find(m=>r.startsWith(m))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${c?s`<div class="unreal-position">
              <span class="unreal-number">${e.unreal_rank?`#${this._num(e.unreal_rank)}`:"Unreal"}</span>
              ${i?s`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:l}
            </div>`:this._config.hide_rank_progress?l:s`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${c?"Unreal leaderboard position":`${o}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,e,a){let i=Number(e.net_rank_delta_pct||0),r=f=>f>=0?`+${f}%`:`${f}%`,o=e.session_id,c=o?`session:${o}:${e.matches_played||0}`:"";c&&this._config.show_match_feed!==!1&&this._ensureMatches(c,{session_id:o});let g=(c?this._matchLists[c]?.matches:void 0)||e.recent_matches||[],p=g.filter(f=>this._isRanked(f)),u=p.filter(f=>f.rank_track===a.game_mode&&typeof f.unreal_rank_change=="number").reduce((f,w)=>f+(w.unreal_rank_change||0),0);return s`
      ${this._renderKpis([["Matches",e.matches_played||0,"cyan"],["Wins",`${e.wins||0} \u{1F3C6}`,"gold"],["Kills",e.kills||0],["K/D",e.kd_ratio||0],...p.length?[["Rank Net",r(i),i>=0?"positive":"negative"]]:[]])}

      ${p.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${r(i)} this session`,u||null):l}

      ${this._config.show_match_feed!==!1?s`
            <div class="match-feed-header">
              <span>Match Feed (${e.matches_played||g.length} ${(e.matches_played||g.length)===1?"match":"matches"})</span>
              ${t?s`<span class="tracking-live">Tracking Live</span>`:l}
            </div>
            ${this._renderMatchList(c||"session",g,s`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:l}
    `}_renderMatchList(t,e,a){let i=this._config.max_feed_matches||10,r=this._showAllMatches[t],o=r?e:e.slice(0,i);return s`
      <div class="match-list">
        ${o.length?o.map(c=>this._renderMatch(c)):s`<div class="empty">${a}</div>`}
        ${e.length>i?s`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[t]:!r}}>
              ${r?"Show fewer":`Show all ${e.length}`}
            </button>`:l}
      </div>
    `}_progressChip(t){let e=t.icon?s`<img src=${t.icon} alt="" @error=${z} />`:l;switch(t.type){case"quests":return s`<span class="pchip quest">📜 ${t.count} quest${t.count>1?"s":""} done</span>`;case"level_up":return s`<span class="pchip level">⬆️ Level ${t.to}</span>`;case"sprite_new":return s`<span class="pchip sprite">${e}New sprite: ${t.name}</span>`;case"sprite_mastered":return s`<span class="pchip gold">${e}⭐ Mastered ${t.name}</span>`;case"sprite_level":return s`<span class="pchip sprite">${e}${t.name} → Lv ${t.level}</span>`;default:return l}}_renderMatch(t){let e=this._playlist(t.playlist_id),a=e?.image,i=`${t.timestamp}|${t.playlist_id}`,r=this._expandedMatch===i,o=(t.match_count||1)>1,c=this._isRanked(t),m=t.progress||[],g=r?this._matchMap(t):null,p=(u,f)=>f==null||f===""?l:s`<div class="detail"><span>${u}</span><b>${f}</b></div>`;return s`
      <div class="match-card ${t.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>{this._expandedMatch=r?null:i,r||(this._loadMap("br"),this._loadMatchMap(t.playlist_id))}}>
        <div class="match-row">
          ${a?s`<img class="match-art" src=${a} alt="" loading="lazy" @error=${z} />`:l}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${t.match_number}${(t.match_count||1)>1?` \xD7${t.match_count}`:""}</span>
              <span class="placement-badge ${t.is_victory?"win":""}">${t.placement_text}</span>
            </div>
            <span class="match-mode">${t.mode_name} • ${this._formatRelativeTime(t.timestamp)}</span>
            ${m.length?s`<div class="progress-chips">${m.map(u=>this._progressChip(u))}</div>`:l}
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${t.kills}</span>
            ${t.rank_delta_pct&&this._isRanked(t)?s`<span class="rank-delta-badge ${t.rank_delta_pct>=0?"pos":"neg"}">
                  ${t.rank_delta_pct>=0?`+${t.rank_delta_pct}%`:`${t.rank_delta_pct}%`}
                </span>`:l}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?s`<div class="match-details" @click=${u=>u.stopPropagation()}>
              ${g?s`<div class="match-map">
                    ${this._renderMapImage(g,!0)}
                    <span>🗺️ ${g.name||"Battle Royale island"}</span>
                  </div>`:a?s`<img class="detail-art" src=${a} alt="" @error=${z} />`:l}
              ${e?.description?s`<p class="detail-desc">${e.description}</p>`:l}
              <div class="detail-grid">
                ${p("Finished",this._formatWhen(t.timestamp))}
                ${p("Mode",t.mode_name)}
                ${p("Placement",t.placement_text)}
                ${p("Kills",t.kills)}
                ${o?p("Games",t.match_count):l}
                ${o&&t.wins?p("Victories",t.wins):l}
                ${p("Time played",t.minutes?this._formatDuration(t.minutes):void 0)}
                ${p("Score",t.score?this._num(t.score):void 0)}
                ${p("Players outlived",t.players_outlived?this._num(t.players_outlived):void 0)}
                ${c?s`
                      ${p("Ranked track",t.rank_track)}
                      ${p("Rank after",t.unreal_rank?`${t.current_rank} #${this._num(t.unreal_rank)}`:t.current_rank)}
                      ${p("Rank change",t.rank_delta_pct?`${t.rank_delta_pct>0?"+":""}${t.rank_delta_pct}%`:void 0)}
                      ${p("Unreal places",t.unreal_rank_change?`${t.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(t.unreal_rank_change))}`:void 0)}`:l}
              </div>
              ${(t.match_count||1)>1?s`<small class="muted">Several games finished between polls; totals are combined.</small>`:l}
            </div>`:l}
      </div>
    `}_renderStatsView(t,e,a,i,r){let o=e.windows||{},c=e.window_labels||{},m=["lifetime",...["season","week","today"].filter(S=>o[S])],g=m.includes(this._window)?this._window:"lifetime",p={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},u=t.metrics||{},f={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:u.hours_played,favourite_mode:u.favourite_mode,modes:t.modes||{}},w=g==="lifetime"?f:o[g],E=this._selectedMode!=="all"?w.modes?.[this._selectedMode]:null,d=E&&E.matches!==void 0?E:w,v=d.minutes!==void 0?Math.round(d.minutes/60*10)/10:w.hours_played,x=w.favourite_mode,M=(S,C)=>s`
      <button class="mode-tab ${this._selectedMode===S?"active":""}" @click=${()=>this._selectedMode=S}>${C}</button>
    `;return s`
      <div class="tab-rows">
        ${m.length>1?s`<div class="mode-tabs">
              ${m.map(S=>s`<button class="mode-tab ${g===S?"active":""}" title=${c[S]||""}
                  @click=${()=>this._window=S}>${p[S]}</button>`)}
            </div>`:l}
        <div class="mode-tabs">
          ${M("all","Overall")} ${M("zero_build","Zero Build")} ${M("build","Build")} ${M("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${d.win_rate||0}%`,"cyan"],["K/D",d.kd||0],["Wins",s`${this._num(d.wins)} 🏆`,"gold"],["Matches",this._num(d.matches)],["Kills",this._num(d.kills)],["Outlived",this._num(d.players_outlived)],["Kills/Match",d.matches?this._num(d.kills/d.matches,2):0],...v!==void 0?[["Hours",this._num(v,1)]]:[]])}

      ${g==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):l}
      ${x?this._renderFavourite(x,g!=="lifetime"?p[g]:""):l}
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
      ${e.epic_link==="relink_required"?s`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:l}
    `}_renderOtherTracks(t){let e=(t.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return e.length?s`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${e.map(a=>s`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(Y[Object.keys(Y).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:l}_lineChart(t,e,a){let c=t.map(x=>x.v),m=Math.min(...c),g=Math.max(...c),p=g-m||Math.abs(g)||1,u=t[0].t,f=t[t.length-1].t||u+1,w=x=>6+(x-u)/(f-u||1)*308,E=x=>84-(x-m)/p*78,d=t.map((x,M)=>`${M?"L":"M"}${w(x.t).toFixed(1)},${E(x.v).toFixed(1)}`).join(" "),v=x=>new Date(x).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return s`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${T`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${d}" class="trend-line"></path>
        ${t.map(x=>T`<g class="trend-pt"><circle cx="${w(x.t)}" cy="${E(x.v)}" r="7" class="trend-hit"></circle><circle cx="${w(x.t)}" cy="${E(x.v)}" r="2.5" class="trend-dot"></circle><title>${v(x.t)}: ${e(x.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let e=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!e.length)return s`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,r=4,o=Math.max(4,...e.map(m=>m.kills||0)),c=(a-2*r)/e.length;return s`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${T`${e.map((m,g)=>{let p=Math.max(2,(m.kills||0)/o*(i-14)),u=r+g*c+1;return T`<g><rect x="${u}" y="${i-p}" width="${Math.max(2,c-2)}" height="${p}" rx="2" class="kill-bar"></rect>
          ${m.is_victory?T`<text x="${u+(c-2)/2}" y="${i-p-3}" text-anchor="middle" class="win-mark">★</text>`:l}
          <rect x="${u-1}" y="0" width="${c}" height="${i}" fill="transparent"><title>${this._formatWhen(m.timestamp)} · ${m.mode_name}: ${m.kills} kills · ${m.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${o} kills</span></div>`}_renderTrendsView(){let t=this._trends,e=Jt.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return l;let r=((t.stats||{})[i]||[]).map(f=>({t:typeof f.start=="number"?f.start:Date.parse(f.start),v:f.mean??f.state??f.max})).filter(f=>typeof f.v=="number"),o=this.hass.states[i];if(!r.length&&(!o||["unavailable","unknown"].includes(o.state)))return l;let c=f=>`${this._num(f,a.digits||0)}${a.unit||""}`,m=r[0]?.v,g=r[r.length-1]?.v,p=r.length>1?g-m:null,u=p==null||p===0?"":p>0!=!!a.lowerBetter?"positive":"negative";return s`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${u}">${o&&!isNaN(Number(o.state))?c(Number(o.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,c,t.period||"day"):s`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${p>=0?"\u25B2":"\u25BC"} ${c(Math.abs(p))} over ${r.length} ${t.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return s`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${t.loading&&!t.stats?s`<div class="empty">Loading history…</div>`:l}
      ${t.error?s`<div class="empty">${t.error}</div>`:l}
      <div class="trend-grid">${e}</div>
    `}_passSets(t){let e=[],a=new Map;for(let i of t.pages||[]){let r=String(i.track||"").replace(/Bonus$/,"")||"Pass";a.has(r)||(a.set(r,[]),e.push(r)),a.get(r).push(i)}return e.map((i,r)=>{let o=a.get(i),c=o.flatMap(x=>x.rewards||[]),m=c.find(mt)||null,g=m?.icon||c.find(x=>x.icon&&!nt(x)&&x.type!=="HomebaseBannerIcon")?.icon||null,p={},u={},f=new Map,w=0;for(let x of o){let M=/Bonus$/.test(x.track||"");for(let S of x.rewards||[]){if(typeof S.cost=="number"&&S.cost>0&&S.price_row!=="Included"){let _=M?u:p;_[S.currency||""]=(_[S.currency||""]||0)+S.cost}nt(S)&&(w+=Number(S.quantity)||0);let C=ut(S);C!=="V-Bucks"&&f.set(C,(f.get(C)||0)+1)}}let E=c.filter(x=>x.owned===!0||x.owned===!1),d=E.filter(x=>x.owned===!0).length,v=c.filter(x=>x.type!=="Currency").length;return{key:i,unlocked:d,known:E.length,complete:E.length>0&&E.length===v&&d===E.length,title:m?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(m.name)?m.name:`Set ${r+1}`,outfit:m,hero:g,pages:o.map(x=>{let M=/Bonus$/.test(x.track||""),S=x.rewards||[],C=S.filter(b=>b.owned===!0||b.owned===!1),_=C.length>0&&C.length===S.filter(b=>b.type!=="Currency").length&&C.every(b=>b.owned);return{label:`${M?"Bonus":"Page"} ${x.page}`,bonus:M,rewards:S,done:_}}),rewardCount:c.length,baseCost:p,bonusCost:u,vbucks:w,types:[...f.entries()].sort((x,M)=>M[1]-x[1])}})}_costText(t){return Object.entries(t).map(([e,a])=>`${this._num(a)} ${Qt(e,a)}`).join(" + ")}_passCostBadge(t){if(t.price_row==="Included"||t.cost===0)return s`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof t.cost!="number")return l;let e=t.currency==="AthenaCategoryStar";return s`<span class="bp-cost ${e?"character":""}" title="${t.cost} ${Qt(t.currency,t.cost)}">
      <ha-icon icon=${e?"mdi:account-star":"mdi:star"}></ha-icon>${t.cost}</span>`}_goPassSet(t,e){this._passSet=(t+e)%e,this._passPage=0}_withOwnedOutfits(t){let e=new Set((this._outfits.data?.outfits||[]).map(o=>String(o.id||"").toLowerCase()));if(!e.size||t.known==null)return t;let a=t.unlocked||0,i=t.known||0,r=(t.pages||[]).map(o=>({...o,rewards:(o.rewards||[]).map(c=>{if(c.owned!=null||!mt(c))return c;let m=/^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(gt(c));return!m||!e.has(`character_${m[1].toLowerCase()}`)?c:(a+=1,i+=1,{...c,owned:!0})})}));return{...t,pages:r,unlocked:a,known:i}}_renderPassView(t){let e=this._pass;if(e.loading||e.data===void 0&&!e.error)return s`<div class="empty">Loading Battle Pass…</div>`;if(e.error)return s`<div class="empty">${e.error}</div>`;if(!e.data||!e.data.pages?.length)return s`<div class="empty">The Battle Pass will show here soon.</div>`;let a=this._withOwnedOutfits(e.data),i=this._passSets(a),r=Math.min(this._passSet,i.length-1),o=i[r],c=Math.min(this._passPage,o.pages.length-1),m=o.pages[c],g=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,p=Number(t?.state)||null,u=i.reduce((d,v)=>d+v.vbucks,0),f=i.filter(d=>d.outfit).length,w={};for(let d of i)for(let[v,x]of Object.entries(d.baseCost))w[v]=(w[v]||0)+x;let E=(d,v)=>v>1&&!/s$/.test(d)?`${d}s`:d;return s`
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
            <div><b>${a.reward_count??i.reduce((d,v)=>d+v.rewardCount,0)}</b><span>rewards</span></div>
            ${u?s`<div class="gold"><b>${this._num(u)}</b><span>V-Bucks</span></div>`:l}
            ${p?s`<div><b>${p}</b><span>level</span></div>`:l}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${i.map((d,v)=>s`
            <button class="bp-thumb ${v===r?"active":""} ${d.complete?"done":""}" role="tab" aria-selected=${v===r?"true":"false"}
              title="${d.title}${d.known?` \xB7 ${d.unlocked} of ${d.known} unlocked`:""}"
              @click=${()=>this._goPassSet(v,i.length)}>
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
              <div class="bp-hero-types">${o.types.map(([d,v])=>`${v} ${E(d,v)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(r+1,i.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${o.pages.length>1?s`<div class="bp-pages">
                ${o.pages.map((d,v)=>s`
                  <button class="mini-button ${v===c?"active":""} ${d.bonus?"bonus":""}" @click=${()=>this._passPage=v}>
                    ${d.done?"\u2713 ":""}${d.label}<span class="bp-page-count">${d.rewards.length}</span>
                  </button>`)}
              </div>`:l}

          <div class="bp-rewards">
            ${m.rewards.map(d=>s`
              <div class="bp-reward ${nt(d)?"vbucks":""} ${mt(d)?"outfit":""} ${d.owned===!0?"unlocked":d.owned===!1?"locked":""}"
                title="${ee(d)} · ${ut(d)}${d.owned===!0?" \xB7 unlocked":d.owned===!1?" \xB7 locked":""}">
                <div class="bp-reward-img">
                  ${d.icon?s`<img src=${d.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${d.owned===!0?s`<span class="bp-state unlocked">✓</span>`:d.owned===!1?s`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`:l}
                  ${d.owned===!0?l:this._passCostBadge(d)}
                </div>
                <span class="bp-reward-name">${nt(d)&&d.quantity?`${this._num(d.quantity)} V-Bucks`:ee(d)}</span>
                <span class="bp-reward-type">${ut(d)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(w).length?s`<span>All base pages: ${this._costText(w)}</span>`:l}

        </div>
      </div>
    `}_outfitRarity(t){let e=String(t?.rarity||"");return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}_renderLockerView(t){let a=(t.outfits||{}).avatar,i=a?.id||null,r=!!(this._config.avatar||"").trim(),o=this._outfits;if(o.loading||o.data===void 0&&!o.error)return s`<div class="empty">Loading locker…</div>`;if(o.error)return s`<div class="empty">${o.error}</div>`;let c=o.data?.outfits||[];if(!c.length)return s`<div class="empty">Your outfits will show up here soon.</div>`;let m=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],g=14,p=b=>!!b.first_seen&&this._now-Date.parse(b.first_seen)<g*864e5,u=c.filter(b=>b.name),f=u.filter(b=>b.favorite).length,w=u.filter(p).length,E=this._outfitQuery.trim().toLowerCase(),v=[...u.filter(b=>this._lockerFilter!=="favorites"||b.favorite).filter(b=>this._lockerFilter!=="new"||p(b)).filter(b=>!E||String(b.name).toLowerCase().includes(E)||String(b.set||"").toLowerCase().includes(E))].sort((b,A)=>{if(b.id?.toLowerCase()===i)return-1;if(A.id?.toLowerCase()===i)return 1;if(this._outfitSort==="rarity"){let L=m.indexOf(this._outfitRarity(b)),P=m.indexOf(this._outfitRarity(A));return(L<0?99:L)-(P<0?99:P)||String(b.name).localeCompare(String(A.name))}return String(b.name).localeCompare(String(A.name))}),x=this._config.compact?18:24,M=Math.max(1,Math.ceil(v.length/x)),S=Math.min(this._outfitPage,M-1),C=v.slice(S*x,S*x+x),_=new Map;for(let b of u)_.set(this._outfitRarity(b)||"Other",(_.get(this._outfitRarity(b)||"Other")||0)+1);return s`
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
              <b>${this._num(u.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${m.filter(b=>_.get(b)).map(b=>s`<span class="rarity-dot" style="--rarity:${F[b]}" title=${b}>${_.get(b)}</span>`)}
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

        ${C.length?s`<div class="bp-rewards locker-grid">
              ${C.map(b=>{let A=String(b.id||"").toLowerCase(),L=A===i,P=this._selectedOutfit===A;return s`
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

        ${M>1?s`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${S===0} @click=${()=>this._outfitPage=S-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${S+1} of ${M} · ${v.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${S>=M-1} @click=${()=>this._outfitPage=S+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:l}
      </div>
    `}async _loadShop(t=!1){if(!(!this.hass||this._shop.loading||!t&&(this._shop.data!==void 0||this._shop.error))){this._shop={...this._shop,loading:!0};try{this._shop={data:await this.hass.callWS({type:"fortnite_activity/shop",player_id:this._player})}}catch(e){this._shop={error:e?.message||"Item Shop unavailable"}}}}async _toggleWishlist(t,e){let a=String(t.key||t.id||"").toLowerCase();if(a){this._loadingAction=`wish:${a}`;try{await this.hass.callService("fortnite_activity",e?"wishlist_add":"wishlist_remove",{player_id:this._player,cosmetic_id:a,...e?Object.fromEntries(Object.entries({name:t.name,icon:t.icon,type:t.type,rarity:t.rarity}).filter(([,i])=>typeof i=="string"&&i)):{}}),this._searchResults=(this._searchResults||[]).map(i=>String(i.key).toLowerCase()===a?{...i,wishlisted:e}:i),await this._loadShop(!0)}catch(i){console.error("Wishlist update failed:",i)}finally{this._loadingAction=null}}}async _searchCosmetics(){let t=this._searchQuery.trim();if(t.length<2){this._searchResults=null;return}this._searchLoading=!0;try{let e=await this.hass.callWS({type:"fortnite_activity/cosmetic_search",query:t,player_id:this._player,...this._searchType!=="all"?{cosmetic_type:this._searchType}:{}});this._searchQuery.trim()===t&&(this._searchResults=e?.results||[])}catch{this._searchResults=[]}finally{this._searchLoading=!1}}_wishButton(t,e){let a=String(t.key||t.id||"").toLowerCase();return s`<button class="wish-btn ${e?"on":""}" title=${e?"Remove from wishlist":"Add to wishlist"}
      ?disabled=${this._loadingAction===`wish:${a}`}
      @click=${i=>{i.stopPropagation(),this._toggleWishlist(t,!e)}}>
      <ha-icon icon=${e?"mdi:heart":"mdi:heart-outline"}></ha-icon></button>`}_renderShopView(){let t=this._shop;if(t.loading&&t.data===void 0)return s`<div class="empty">Loading the Item Shop…</div>`;if(t.error)return s`<div class="empty">${t.error}</div>`;let e=t.data?.shop,a=t.data?.wishlist||[],i=t.data?.in_shop||[],r=(o,c)=>s`
      <button class="mode-tab ${this._shopTab===o?"active":""}" @click=${()=>this._shopTab=o}>${c}</button>`;return s`
      ${i.length?s`<div class="shop-alert">
            <ha-icon icon="mdi:heart"></ha-icon>
            <span><b>${i.length===1?i[0].name:`${i.length} wishlist items`}</b> ${i.length===1?"is":"are"} in the shop today!</span>
          </div>`:l}
      <div class="mode-tabs shop-tabs">
        ${r("today","Today's shop")}
        ${r("wishlist",s`♥ Wishlist${a.length?` (${a.length})`:""}`)}
      </div>
      ${this._shopTab==="wishlist"?this._renderWishlist(a,i):this._renderShopToday(e)}
    `}_renderShopToday(t){if(!t)return s`<div class="empty">The Item Shop will show here soon.</div>`;let e=this._shopQuery.trim().toLowerCase(),a=p=>p.bundle?"bundle":String(p.items[0]?.type||"other").toLowerCase(),i=[["all","All"],["outfit","Outfits"],["emote","Emotes"],["pickaxe","Pickaxes"],["bundle","Bundles"]],r=(t.sections||[]).map(p=>({...p,offers:p.offers.filter(u=>(this._shopKind==="all"||a(u)===this._shopKind)&&(!e||String(u.title).toLowerCase().includes(e)||u.items.some(f=>String(f.name||"").toLowerCase().includes(e))))})).filter(p=>p.offers.length),o=this._shopLimit,c=r.reduce((p,u)=>p+u.offers.length,0),m=[];for(let p of r){if(o<=0)break;m.push({...p,offers:p.offers.slice(0,o)}),o-=p.offers.length}let g=t.expiration?Date.parse(t.expiration)-this._now:null;return s`
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Search today's shop" .value=${this._shopQuery}
          @input=${p=>this._shopQuery=p.target.value} />
        ${g&&g>0?s`<span class="muted">New shop in ${this._formatSpan(g)}</span>`:l}
      </div>
      <div class="mode-tabs">
        ${i.map(([p,u])=>s`<button class="mode-tab ${this._shopKind===p?"active":""}" @click=${()=>{this._shopKind=p,this._shopLimit=36}}>${u}</button>`)}
      </div>
      ${m.length?m.map(p=>s`
            <div class="section-title">${p.name}</div>
            <div class="shop-grid">
              ${p.offers.map(u=>{let f=u.items[0]||{};return s`
                  <div class="shop-tile ${u.owned?"owned":""} ${u.wishlisted?"wish":""}" style="--rarity:${F[this._outfitRarity(f)]||"#9CA3AF"}"
                    title="${u.title}${u.items.length>1?` \xB7 ${u.items.map(w=>w.name).join(", ")}`:""}">
                    <div class="shop-img">
                      ${u.image?s`<img src=${u.image} alt="" loading="lazy" @error=${z} />`:s`<ha-icon icon="mdi:shopping-outline"></ha-icon>`}
                      ${u.owned?s`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(f,!!f.wishlisted)}
                      ${u.bundle?s`<span class="shop-bundle">Bundle · ${u.items.length}</span>`:l}
                    </div>
                    <span class="bp-reward-name">${u.title}</span>
                    <span class="shop-price">Ⓥ ${this._num(u.price)}${u.regular_price&&u.regular_price>u.price?s` <s>${this._num(u.regular_price)}</s>`:l}</span>
                  </div>`})}
            </div>`):s`<div class="empty">Nothing in today's shop matches.</div>`}
      ${c>this._shopLimit?s`<button class="mini-button show-more" @click=${()=>this._shopLimit+=36}>Show more (${c-this._shopLimit} left)</button>`:l}
    `}_renderWishlist(t,e){let a=new Set(e.map(r=>r.id)),i=(r,o)=>s`
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
      ${t.length?s`<div class="bp-rewards locker-grid">
            ${t.map(r=>s`
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
    `}async _loadNews(){if(!(!this.hass||this._news.loading||this._news.data!==void 0||this._news.error)){this._news={loading:!0};try{this._news={data:await this.hass.callWS({type:"fortnite_activity/news",player_id:this._player})}}catch(t){this._news={error:t?.message||"News unavailable"}}}}_renderNewsView(){let t=this._news;if(t.loading||t.data===void 0&&!t.error)return s`<div class="empty">Loading news…</div>`;if(t.error)return s`<div class="empty">${t.error}</div>`;let e=t.data?.news||[],a=t.data?.update,i=t.data?.season||this._catalog.season;return s`
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
      ${e.length?s`<div class="news-list">
            ${e.map(r=>s`
              <div class="news-card">
                ${r.image||r.tile?s`<img src=${r.image||r.tile} alt="" loading="lazy" @error=${z} />`:l}
                <div class="news-body">
                  ${r.tag?s`<span class="tag">${r.tag}</span>`:l}
                  <b>${r.title}</b>
                  ${r.body?s`<p>${r.body}</p>`:l}
                </div>
              </div>`)}
          </div>`:s`<div class="empty">No news right now.</div>`}
    `}_sectionsHas(t){return this._sections.includes(t)}_renderNextEventTeaser(){let e=(this._events.list||[]).filter(i=>this._matchesFilters(i,this._currentFilters())).find(i=>i.windows.some(r=>this._windowState(r)!=="finished"));if(!e)return l;let a=this._eventTiming(e);return s`<div class="news-update event">
      ${e.poster?s`<img src=${e.poster} alt="" @error=${z} />`:s`<ha-icon icon="mdi:tournament"></ha-icon>`}
      <div><b>${e.name}</b><span>${a.text}</span></div>
    </div>`}async _loadMap(t=this._mapMode){let e=this._maps[t];if(!(!this.hass||e?.loading||e?.error||e?.data!==void 0)){this._maps={...this._maps,[t]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,mode:t});this._maps={...this._maps,[t]:{data:a?.map??null}}}catch(a){this._maps={...this._maps,[t]:{error:a?.message||"Map unavailable"}}}}}async _loadMatchMap(t){let e=`playlist:${t}`;if(!(!this.hass||this._maps[e])){this._maps={...this._maps,[e]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,playlist_id:t});this._maps={...this._maps,[e]:{data:a?.map??null}}}catch{this._maps={...this._maps,[e]:{data:null}}}}}_matchMap(t){let e=this._maps[`playlist:${t.playlist_id}`]?.data;return e||(t.mode_category==="build"||t.mode_category==="zero_build")&&this._maps.br?.data||null}_poiPos(t,e){let a=t?.bounds;if(!a||a.maxX===a.minX||a.maxY===a.minY)return null;let i=(e.x-a.minX)/(a.maxX-a.minX)-.5,r=(e.y-a.minY)/(a.maxY-a.minY)-.5,o=(Number(t?.camera?.rotation)||0)*Math.PI/180,c=Math.round(Math.cos(o)*1e6)/1e6,m=Math.round(Math.sin(o)*1e6)/1e6,g=(i*c-r*m+.5)*100,p=(i*m+r*c+.5)*100;return g<0||g>100||p<0||p>100?null:{left:g,top:p}}_gridRef(t){return`${"ABCDEFGHIJ"[Math.min(9,Math.max(0,Math.floor(t.left/10)))]}${Math.min(10,Math.max(1,Math.floor(t.top/10)+1))}`}_mapModeLabel(t){let e=this._maps[t]?.data?.name;if(e)return e;if(t==="br")return"Battle Royale";if(t==="og")return"OG";if(!t.startsWith("rotating:"))return t;let a=t.split(":")[1].replace(/(forbidden|blast|berry|ranch|smile|spawn|stake)/g," $1").replace(/\s+/g," ").trim();return this._titleCase(a)}async _loadAllMaps(){for(let t of this._maps.br?.data?.modes||[])await this._loadMap(t)}_mapPlaces(t){return(t?.pois||[]).map((e,a)=>{let i=this._poiPos(t,e);return i?{key:`${e.name}#${a}`,name:this._titleCase(e.name),type:e.type==="landmark"?"landmark":"named",...i,grid:this._gridRef(i)}:null}).filter(Boolean)}_titleCase(t){return String(t||"").toLowerCase().replace(/(^|[\s(-])([a-z])/g,(e,a,i)=>a+i.toUpperCase()).replace(/'([a-z])([a-z]{2,})/g,(e,a,i)=>"'"+a.toUpperCase()+i)}_clampPan(t,e,a){let i=1-t;return{x:Math.min(0,Math.max(i,e)),y:Math.min(0,Math.max(i,a))}}_setMapView(t,e,a){let i=Math.min(8,Math.max(1,t));this._mapZoom=i,this._mapPan=this._clampPan(i,e,a)}_zoomAt(t,e=.5,a=.5){let i=this._mapZoom,r=Math.min(8,Math.max(1,i*t)),{x:o,y:c}=this._mapPan;this._setMapView(r,e-(e-o)*(r/i),a-(a-c)*(r/i))}_focusPlace(t,e=Math.max(this._mapZoom,3)){this._mapPoi=t.key;let a=Math.min(8,Math.max(1,e));this._setMapView(a,.5-a*(t.left/100),.5-a*(t.top/100))}_resetMapView(){this._setMapView(1,0,0)}_mapFrameEl(){return this.shadowRoot?.querySelector(".mapx-frame")}_applyLayer(t,e,a){let i=this.shadowRoot?.querySelector(".mapx-layer");i&&(i.style.transform=`translate(${e*100}%, ${a*100}%) scale(${t})`,i.style.setProperty("--iz",String(1/t)))}_onMapWheel(t){let e=this._mapFrameEl();if(!e)return;t.preventDefault();let a=e.getBoundingClientRect();this._zoomAt(t.deltaY<0?1.25:.8,(t.clientX-a.left)/a.width,(t.clientY-a.top)/a.height)}_onMapPointerDown(t){let e=this._mapFrameEl();this._mapMenu&&(this._mapMenu=!1),!(!e||t.target.closest(".mapx-tools, .mapx-pin, .mapx-info"))&&(e.setPointerCapture(t.pointerId),this._pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this._gesture={z:this._mapZoom,x:this._mapPan.x,y:this._mapPan.y,moved:!1,start:new Map(this._pointers)})}_onMapPointerMove(t){let e=this._mapFrameEl(),a=this._gesture;if(!e||!a||!this._pointers.has(t.pointerId))return;this._pointers.set(t.pointerId,{x:t.clientX,y:t.clientY});let i=e.getBoundingClientRect(),r=[...this._pointers.values()],o=[...a.start.values()],c=a.z,m=a.x,g=a.y;if(r.length>=2&&o.length>=2){let u=Math.hypot(o[0].x-o[1].x,o[0].y-o[1].y)||1,f=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y);c=Math.min(8,Math.max(1,a.z*(f/u)));let w=((o[0].x+o[1].x)/2-i.left)/i.width,E=((o[0].y+o[1].y)/2-i.top)/i.height;m=w-(w-a.x)*(c/a.z)+(r[0].x+r[1].x-o[0].x-o[1].x)/2/i.width,g=E-(E-a.y)*(c/a.z)+(r[0].y+r[1].y-o[0].y-o[1].y)/2/i.height}else{let u=o[0]||r[0];m=a.x+(r[0].x-u.x)/i.width,g=a.y+(r[0].y-u.y)/i.height}(Math.abs(m-a.x)+Math.abs(g-a.y)>.005||c!==a.z)&&(a.moved=!0);let p=this._clampPan(c,m,g);a.last={z:c,x:p.x,y:p.y},this._applyLayer(c,p.x,p.y)}_onMapPointerUp(t){let e=this._gesture;this._pointers.delete(t.pointerId),e&&(this._pointers.size===0?(e.last&&this._setMapView(e.last.z,e.last.x,e.last.y),this._gesture=null):this._gesture={...e.last||e,moved:e.moved,start:new Map(this._pointers)})}_onMapDblClick(t){let e=this._mapFrameEl();if(!e||t.target.closest(".mapx-tools, .mapx-info"))return;let a=e.getBoundingClientRect();this._zoomAt(2,(t.clientX-a.left)/a.width,(t.clientY-a.top)/a.height)}async _toggleMapFull(){let t=this.shadowRoot?.querySelector(".mapx"),e=document;if(this._mapFull){e.fullscreenElement&&await e.exitFullscreen().catch(()=>{}),this._mapFull=!1;return}this._mapFull=!0;try{await t?.requestFullscreen?.({navigationUI:"hide"})}catch{}}_randomDrop(t){let e=t.filter(i=>i.type==="named");if(!e.length)return;let a=e[Math.floor(Math.random()*e.length)];e.length>1&&a.key===this._mapPoi&&(a=e[(e.indexOf(a)+1)%e.length]),this._mapDrop=a.key,this._focusPlace(a,2.5)}_renderMapImage(t,e=!1){return s`
      <div class="map-frame ${e?"compact":""}">
        <img src=${t.image} alt=${t.name||"Map"} loading="lazy" @error=${z} />
      </div>
    `}_renderMapPicker(){let t=this._maps.br?.data?.modes||["br"],e=this._mapMode,a=[["Battle Royale","mdi:island",t.filter(o=>o==="br")],["OG","mdi:gamepad-classic",t.filter(o=>o==="og")],["Reload & rotating","mdi:autorenew",t.filter(o=>o.startsWith("rotating:"))]],i=e==="br"?"mdi:island":e==="og"?"mdi:gamepad-classic":"mdi:autorenew",r=o=>{let c=this._maps[o];if(c?.loading)return"loading\u2026";let m=(c?.data?.pois||[]).filter(g=>g.type!=="landmark").length;return c?.data?`${m} places`:""};return s`
      <div class="mapx-picker">
        <button class="mapx-current" aria-haspopup="listbox" aria-expanded=${this._mapMenu?"true":"false"}
          @click=${()=>{this._mapMenu=!this._mapMenu,this._mapMenu&&this._loadAllMaps()}}>
          <ha-icon icon=${i}></ha-icon>
          <span><b>${this._mapModeLabel(e)}</b><small>${t.length>1?`${t.length} maps \xB7 tap to change`:"Map"}</small></span>
          <ha-icon icon=${this._mapMenu?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._mapMenu?s`<div class="mapx-menu" role="listbox">
              ${a.filter(([,,o])=>o.length).map(([o,c,m])=>s`
                <div class="mapx-group"><ha-icon icon=${c}></ha-icon>${o}</div>
                ${m.map(g=>s`
                  <button class="mapx-option ${g===e?"on":""}" role="option" aria-selected=${g===e?"true":"false"}
                    @click=${()=>{this._mapMode=g,this._mapMenu=!1,this._mapPoi=null,this._mapDrop=null,this._resetMapView(),this._loadMap(g)}}>
                    <span>${this._mapModeLabel(g)}</span><small>${r(g)}</small>
                    ${g===e?s`<ha-icon icon="mdi:check"></ha-icon>`:l}
                  </button>`)}`)}
            </div>`:l}
      </div>
    `}_renderMapView(){let t=this._maps[this._mapMode]||{};if(t.loading||t.data===void 0&&!t.error)return s`${this._renderMapPicker()}<div class="empty">Loading map…</div>`;if(t.error)return s`${this._renderMapPicker()}<div class="empty">${t.error}</div>`;let e=t.data;if(!e)return s`${this._renderMapPicker()}<div class="empty">This map will show here soon.</div>`;let a=this._mapPlaces(e),i=a.filter(_=>_.type==="named"),r=a.filter(_=>_.type==="landmark"),o=this._mapZoom,{x:c,y:m}=this._mapPan,g=this._mapFull||(this.offsetWidth||0)>=560,p=this._mapLabels==="all"||this._mapLabels==="auto"&&(g||o>=1.6),u=this._mapLabels==="all"?o>=1.6:this._mapLabels==="auto"&&o>=3,f=a.find(_=>_.key===this._mapPoi)||null,w=f?a.filter(_=>_.name===f.name):[],E=this._mapQuery.trim().toLowerCase(),d=_=>!E||_.name.toLowerCase().includes(E)||_.grid.toLowerCase()===E,v=(_,b)=>this._mapSort==="grid"&&_.grid.localeCompare(b.grid,void 0,{numeric:!0})||_.name.localeCompare(b.name),x=i.filter(d).sort(v),M=[...r.filter(d).reduce((_,b)=>_.set(b.name,[..._.get(b.name)||[],b]),new Map)].sort((_,b)=>this._mapSort==="grid"?_[1][0].grid.localeCompare(b[1][0].grid,void 0,{numeric:!0}):_[0].localeCompare(b[0])),S=(_,b,A,L=!1,P=!1)=>s`
      <button class="mapx-tool ${L?"on":""}" title=${b} aria-label=${b} ?disabled=${P} @click=${A}><ha-icon icon=${_}></ha-icon></button>`,C=this._mapLabels==="off"?"mdi:label-off-outline":this._mapLabels==="all"?"mdi:label-multiple":"mdi:label-outline";return s`
      <div class="mapx ${this._mapFull?"full":""}">
        <div class="mapx-main">
          <div class="mapx-top">
            ${this._renderMapPicker()}
            <div class="mapx-meta">
              ${e.chapter&&e.season?s`<span>Chapter ${e.chapter} · Season ${e.season}</span>`:l}
              ${e.patch?s`<span>Update ${e.patch}</span>`:l}
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
            <div class="mapx-layer" style="transform: translate(${c*100}%, ${m*100}%) scale(${o}); --iz:${1/o}">
              <img src=${e.image} alt=${e.name||"Map"} draggable="false" @error=${z} />
              ${this._mapGrid?s`<div class="mapx-grid">
                    ${[...Array(10).keys()].map(_=>s`<span class="gcol" style="left:${_*10+5}%">${"ABCDEFGHIJ"[_]}</span>
                      <span class="grow" style="top:${_*10+5}%">${_+1}</span>`)}
                  </div>`:l}
              ${a.filter(_=>_.type==="named"||this._mapShowLandmarks||_.key===this._mapPoi).map(_=>{let b=_.key===this._mapPoi,A=b||(_.type==="named"?p:u);return s`
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
              ${S(C,`Labels: ${this._mapLabels==="auto"?"automatic":this._mapLabels}`,()=>{this._mapLabels=this._mapLabels==="auto"?"all":this._mapLabels==="all"?"off":"auto"},this._mapLabels!=="auto")}
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

          ${x.length?s`<div class="section-title">Named places (${x.length})</div>
                <div class="mapx-list">
                  ${x.map(_=>s`
                    <button class="mapx-row ${_.key===this._mapPoi?"on":""}" @click=${()=>this._focusPlace(_)}>
                      <span class="mapx-grid-badge">${_.grid}</span><span>${_.name}</span>
                    </button>`)}
                </div>`:l}
          ${M.length?s`<div class="section-title">Landmarks (${r.length})</div>
                <div class="mapx-list">
                  ${M.map(([_,b])=>{let A=b.some(L=>L.key===this._mapPoi);return s`
                      <button class="mapx-row landmark ${A?"on":""}" @click=${()=>{this._mapShowLandmarks||(this._mapShowLandmarks=!0);let L=b.findIndex(P=>P.key===this._mapPoi);this._focusPlace(b[(L+1)%b.length])}}>
                        <span class="mapx-grid-badge">${b.length>1?`\xD7${b.length}`:b[0].grid}</span><span>${_}</span>
                      </button>`})}
                </div>`:l}
          ${!x.length&&!M.length?s`<div class="empty">No places match.</div>`:l}
        </div>
      </div>
    `}_spriteCurve(t){let e=[...t.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,r)=>i.level-r.level),a=[];for(let i of e){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(t,e){if(typeof t!="number"||!e.length)return null;let a=0;e.forEach(([,c],m)=>{t>=c&&(a=m)});let[i]=e[a],r=e[e.length-1],o=e[a+1];return{level:i,maxLevel:r[0],maxXp:r[1],next:o?o[1]:null,toMax:Math.max(0,r[1]-t),atMax:a===e.length-1}}_spriteInfo(t,e){let a=t.variants||[],i=a.filter(m=>m.owned),r=a.filter(m=>m.mastered).length,o=null;for(let m of i){let g=this._spriteLevel(m.xp,e);g&&(!o||g.level>o.level)&&(o=g)}let c=i.reduce((m,g)=>m+Math.max(1,Number(g.count)||0),0);return{owned:i.length,total:a.length,mastered:r,best:o,copies:c}}_spriteName(t){return String(t.name||"").replace(/ Sprite$/,"")}_renderSpritesView(t){let e=t?.attributes||{},a=this._spriteCurve(e),i=e.families||[],r=Number(t?.state||0),o=Number(e.owned_variants||0),c=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],m=i.filter(d=>d.mastered>0).length,p=[...i.filter(d=>this._spriteFilter==="missing"?!d.owned:this._spriteFilter==="unmastered"?d.owned&&!d.mastered:this._spriteFilter==="mastered"?d.mastered>0:!0)].sort((d,v)=>this._spriteSort==="rarity"?c.indexOf(v.rarity)-c.indexOf(d.rarity)||(d.dex??0)-(v.dex??0):this._spriteSort==="progress"&&v.owned_variants/v.total_variants-d.owned_variants/d.total_variants||(d.dex??0)-(v.dex??0)),u=i.flatMap(d=>d.variants.filter(v=>!v.owned&&v.drop_chance_pct).map(v=>({f:d,v}))).sort((d,v)=>v.v.drop_chance_pct-d.v.drop_chance_pct||c.indexOf(d.f.rarity)-c.indexOf(v.f.rarity)).slice(0,6),f=a.length?i.flatMap(d=>d.variants.filter(v=>v.owned&&typeof v.xp=="number"&&v.xp>0).map(v=>({f:d,v,lv:this._spriteLevel(v.xp,a)}))).filter(d=>d.lv&&!d.lv.atMax).sort((d,v)=>d.lv.toMax-v.lv.toMax).slice(0,5):[],w=(d,v)=>s`
      <button class="mode-tab ${this._spriteFilter===d?"active":""}" @click=${()=>this._spriteFilter=d}>${v}</button>`,E=(d,v)=>s`
      <button class="mode-tab ${this._spriteSort===d?"active":""}" @click=${()=>this._spriteSort=d}>${v}</button>`;return s`
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,r)}"><span>${Math.round(r)}%</span></div>
        <div class="sp-stat">
          <b>${e.owned_families??0}<small>/${e.total_families??i.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${m}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${o}<small>/${e.total_variants??0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${f.length?s`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${f.map(({f:d,v,lv:x})=>s`
                <div class="master-row" style="--rarity:${F[d.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=d.id}>
                  ${v.icon?s`<img src=${v.icon} alt="" @error=${z} />`:l}
                  <span class="variant-name">${v.label==="Base"?this._spriteName(d):`${v.label} ${this._spriteName(d)}`}</span>
                  <span class="sp-level-pill">Level ${x.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,v.xp/x.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(x.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:l}

      ${u.length?s`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${u.map(({f:d,v})=>s`
                <div class="hunt-item" style="--rarity:${F[d.rarity]||"#9CA3AF"}" title="${v.name}" @click=${()=>this._expandedSprite=d.id}>
                  ${v.icon?s`<img src=${v.icon} alt="" @error=${z} />`:l}
                  <span>${v.label==="Base"?this._spriteName(d):`${v.label} ${this._spriteName(d)}`}</span>
                  <small>${v.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`:l}

      <div class="tab-rows">
        <div class="mode-tabs">${w("all","All")} ${w("mastered","\u2B50 Mastered")} ${w("unmastered","Not mastered")} ${w("missing","Not found")}</div>
        <div class="mode-tabs">${E("dex","Number")} ${E("rarity","Rarity")} ${E("progress","Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${p.length?p.map(d=>{let v=this._expandedSprite===d.id,x=this._spriteInfo(d,a),M=x.mastered?s`<span class="sp-status gold">⭐ Mastered</span>`:d.owned?s`<span class="sp-status">Not mastered</span>`:s`<span class="sp-status dim">Not found yet</span>`,S=d.owned?s`<span class="sp-have">Have ${x.copies}${x.best?s` · <span class=${x.best.atMax?"sp-max":""} title=${x.best.atMax?"Top level":""}>Lv ${x.best.level}</span>`:l}</span>`:l;return s`
                <div class="sp-card ${d.owned?"":"missing"} ${x.mastered?"mastered":""} ${v?"open":""}"
                  style="--rarity:${F[d.rarity]||"#9CA3AF"}" role="button" tabindex="0"
                  @click=${()=>this._expandedSprite=v?null:d.id}>
                  <div class="sp-img">
                    ${d.icon?s`<img src=${d.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${x.mastered?s`<span class="sp-badge star" title="Mastered">⭐</span>`:l}
                    ${d.owned?l:s`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                  </div>
                  <span class="sp-name">${this._spriteName(d)}</span>
                  ${M}
                  ${S}
                  <div class="sp-kinds" title="${x.owned} of ${x.total} kinds">
                    ${(d.variants||[]).map(C=>s`
                      <span class="sp-kind ${C.owned?"owned":""} ${C.mastered?"mastered":""}" title="${C.label}${C.owned?"":" (not found yet)"}">
                        ${C.icon?s`<img src=${C.icon} alt="" @error=${z} />`:l}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${x.owned} of ${x.total} kinds</span>
                </div>
                ${v?this._renderSpriteDetail(d):l}`}):s`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${(e.versions||[]).length>1?s`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${e.versions.map(d=>s`
              <div class="version-row ${d.current?"current":""}">
                <span>${d.current?"This season":d.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,d.completion_pct)}%"></div></div>
                <span>${d.owned_variants}/${d.total_variants}</span>
              </div>`)}
          </div>`:l}
    `}_renderSpriteDetail(t){let e=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{}),a=t.name;return s`
      <div class="sprite-detail sp-detail" style="--rarity:${F[t.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${t.icon_large||t.icon?s`<img src=${t.icon_large||t.icon} alt="" @error=${z} />`:l}
          <div>
            <b>${t.name}</b> <span class="tag rarity-tag">${t.rarity||""}</span>
            ${t.description?s`<p class="detail-desc">${t.description}</p>`:l}
            ${t.hint?s`<p class="detail-desc hint">📍 ${t.hint}</p>`:l}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(t.variants||[]).map(i=>{let r=i.owned?this._spriteLevel(i.xp,e):null,o=(i.boons||[]).find(m=>m.name&&m.name!==a),c=Math.max(1,Number(i.count)||0);return s`
              <div class="sp-kind-row ${i.owned?"":"missing"} ${i.mastered?"mastered":""}">
                <div class="sp-kind-icon">
                  ${i.icon?s`<img src=${i.icon} alt="" @error=${z} />`:s`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${i.owned?l:s`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${i.label}</b>
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
    `}_renderWindowMatches(t,e,a){let i=`window:${t}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let r=this._matchLists[i],o=r?.matches||[],c=r?.tracked??0,m=a.matches||0;return s`
      <div class="match-feed-header">
        <span>${e} matches (${c}${m>c?` of ${m}`:""})</span>

      </div>
      ${r?.loading?s`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,o,s`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(t,e){let a=this._playlist(t.playlist_id),i=a?.image,r=/ropesmile|reload/i.test(t.playlist_id+t.name)?"reload":/nobuild|zero build/i.test(t.playlist_id+t.name)?"zero_build":"build";return s`
      <div class="feature-card ${i?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${e?` \xB7 ${e}`:""}</span>
          <span class="feature-value">${a?.name||t.name}</span>
          <span class="feature-sub">${this._num(t.matches)} matches</span>
        </div>
        ${i?s`<img class="feature-art" src=${i} alt="" @error=${z} />`:s`<ha-icon class="feature-icon" icon=${Se[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(t){let e=t.metrics||{},a=Object.values(t.inputs||{}).filter(r=>r.share_pct>=1),i=t.team_sizes||{};return s`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",e.kills_per_minute??0],["Avg Match",`${e.avg_match_minutes??0}m`],["Score/Match",this._num(e.score_per_match)],["Solo Top 10",`${e.solo_top10_rate??0}%`],["Solo Top 25",`${e.solo_top25_rate??0}%`]])}
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
    `}_defaultFilters(){let t=this._config.events_region||this._events.defaultRegion||"EU";return{region:t==="all"?[]:[t],type:[],mode:[],team:[],platform:[]}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(t,e){return!(e.region.length&&!e.region.includes(t.region_group)||e.type.length&&!e.type.includes(t.tournament_type)||e.mode.length&&!e.mode.some(a=>a==="Ranked"?t.ranked:t.mode===a)||e.team.length&&!e.team.includes(t.team)||e.platform.length&&!e.platform.some(a=>(t.platform_groups||[]).includes(a)))}_toggleFilter(t,e){let a=this._currentFilters(),i=a[t].includes(e)?a[t].filter(r=>r!==e):[...a[t],e];this._filters={...a,[t]:i}}_renderEventsView(){let t=this._events;if(t.loading&&!t.list)return s`<div class="empty">Loading tournaments…</div>`;if(t.error)return s`<div class="empty">${t.error}</div>`;if(t.list===null)return s`<div class="empty">Tournaments will show here soon.</div>`;let e=t.list||[],a=this._currentFilters(),i=[...new Set(e.map(p=>p.region_group))].sort(),r=e.filter(p=>this._matchesFilters(p,a)).filter(p=>p.windows.some(u=>this._windowState(u)!=="finished")||this._expandedEvent===p.key),o=[["region","Region",i.map(p=>[p,p])],["type","Type",[...new Set(e.map(p=>p.tournament_type).filter(Boolean))].map(p=>[p,Xt[p]||p])],["mode","Mode",[["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked"]]],["team","Team",[["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]]],["platform","Platform",[["PC","PC"],["Console","Console"],["Mobile","Mobile"]]]],c=(p,u)=>o.find(f=>f[0]===p)?.[2].find(f=>f[0]===u)?.[1]||u,m=o.flatMap(([p])=>a[p].map(u=>[p,u])),g=JSON.stringify(a)!==JSON.stringify(this._defaultFilters());return s`
      <div class="filter-bar">
        <button class="filter-toggle ${this._filtersOpen?"open":""}" @click=${()=>this._filtersOpen=!this._filtersOpen}>
          <ha-icon icon="mdi:filter-variant"></ha-icon><span>Filters</span>${m.length?s`<b>${m.length}</b>`:l}
        </button>
        <div class="filter-active">
          ${m.length?m.map(([p,u])=>s`<button class="fchip on" title="Remove" @click=${()=>this._toggleFilter(p,u)}>${c(p,u)} ✕</button>`):s`<span class="muted">All tournaments</span>`}
        </div>
        ${g?s`<button class="filter-reset" @click=${()=>this._filters=null} title="Reset filters"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button>`:l}
      </div>
      ${this._filtersOpen?s`<div class="filter-panel">
            ${o.map(([p,u,f])=>f.length?s`<div class="fgroup"><span>${u}</span><div>
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
    `}_eventTiming(t){let e=t.windows.find(o=>this._windowState(o)==="live");if(e)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(e.end)-this._now)}`,live:!0,soon:!1};let a=t.windows.find(o=>this._windowState(o)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,r=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:r}}_renderEvent(t){let e=this._eventTiming(t),a=this._expandedEvent===t.key,i=t.tournament_type?Xt[t.tournament_type]||t.tournament_type:null,r=[t.mode,t.team,t.ranked&&t.tournament_type!=="RankedCup"?"Ranked":null,...t.platform_groups||[],t.region].filter(Boolean);return s`
      <div class="event-card ${e.live?"live":""} ${a?"expanded":""} ${t.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(t)}>
          ${t.poster?s`<img class="event-art" src=${t.poster} alt="" loading="lazy" @error=${z} />`:l}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${t.name}</span>
              ${e.live?s`<span class="placement-badge win">LIVE</span>`:l}
            </div>
            <span class="match-mode ${e.soon?"soon":""}">${e.text}</span>
            <div class="tag-row">
              ${i?s`<span class="tag type-tag ${t.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:l}
              ${t.can_spectate?s`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>`:l}
              ${r.map(o=>s`<span class="tag">${o}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(t):l}
      </div>
    `}_renderEventDetails(t){let e=t.loading_screen||t.poster;return s`
      <div class="event-details">
        ${e?s`<img class="event-hero" src=${e} alt="" @error=${z} />`:l}
        ${t.subtitle&&t.subtitle!==t.name?s`<div class="detail-sub">${t.subtitle}</div>`:l}
        ${t.description?s`<p class="detail-desc">${t.description}</p>`:l}
        ${t.schedule_info?s`<p class="detail-desc muted">${t.schedule_info}</p>`:l}
        ${t.platform_groups?.length?s`<div class="detail-line"><span>Platforms</span><b>${t.platform_groups.join(", ")}</b></div>`:l}
        <div class="detail-line"><span>Region</span><b>${t.region}</b></div>
        ${t.min_account_level?s`<div class="detail-line"><span>Minimum account level</span><b>${t.min_account_level}</b></div>`:l}
        ${t.tournament_type==="FNCS"?s`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`:l}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${t.windows.map(a=>{let i=this._windowState(a),r=`${t.event_id}|${a.window_id}`,o=this._leaderboards[r],c=Date.parse(a.begin)-this._now;return s`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":c<7*864e5?`in ${this._formatSpan(c)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?s`<button class="mini-button" @click=${()=>this._loadLeaderboard(t.event_id,a.window_id)}>
                        ${o?.loading?"Loading\u2026":o?.data?"Refresh":"Leaderboard"}
                      </button>`:l}
                </div>
                ${o?this._renderLeaderboard(o):l}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(t){if(t.error)return s`<div class="lb-note">${t.error}</div>`;if(!t.data)return t.loading?s`<div class="lb-note">Loading leaderboard…</div>`:l;let e=t.data,a=(i,r=!1)=>s`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return s`
      <div class="leaderboard">
        ${e.player&&!e.entries.some(i=>i.is_player)?a(e.player,!0):l}
        ${e.entries.length?e.entries.map(i=>a(i,i.is_player)):s`<div class="lb-note">No scores yet.</div>`}
        ${e.updated?s`<div class="lb-note">Updated ${this._formatRelativeTime(e.updated)}${e.total_pages?` \xB7 ${e.total_pages} pages`:""}</div>`:l}
      </div>
    `}};y([N({attribute:!1})],k.prototype,"hass",2),y([$()],k.prototype,"_config",2),y([$()],k.prototype,"_view",2),y([$()],k.prototype,"_window",2),y([$()],k.prototype,"_selectedMode",2),y([$()],k.prototype,"_loadingAction",2),y([$()],k.prototype,"_catalog",2),y([$()],k.prototype,"_avatar",2),y([$()],k.prototype,"_events",2),y([$()],k.prototype,"_filters",2),y([$()],k.prototype,"_expandedEvent",2),y([$()],k.prototype,"_expandedMatch",2),y([$()],k.prototype,"_leaderboards",2),y([$()],k.prototype,"_now",2),y([$()],k.prototype,"_matchLists",2),y([$()],k.prototype,"_showAllMatches",2),y([$()],k.prototype,"_expandedSprite",2),y([$()],k.prototype,"_spriteFilter",2),y([$()],k.prototype,"_spriteSort",2),y([$()],k.prototype,"_trends",2),y([$()],k.prototype,"_pass",2),y([$()],k.prototype,"_passSet",2),y([$()],k.prototype,"_passPage",2),y([$()],k.prototype,"_outfits",2),y([$()],k.prototype,"_outfitQuery",2),y([$()],k.prototype,"_outfitSort",2),y([$()],k.prototype,"_outfitPage",2),y([$()],k.prototype,"_selectedOutfit",2),y([$()],k.prototype,"_lockerFilter",2),y([$()],k.prototype,"_shop",2),y([$()],k.prototype,"_shopTab",2),y([$()],k.prototype,"_shopQuery",2),y([$()],k.prototype,"_shopLimit",2),y([$()],k.prototype,"_shopKind",2),y([$()],k.prototype,"_searchQuery",2),y([$()],k.prototype,"_searchType",2),y([$()],k.prototype,"_searchResults",2),y([$()],k.prototype,"_searchLoading",2),y([$()],k.prototype,"_news",2),y([$()],k.prototype,"_maps",2),y([$()],k.prototype,"_mapMode",2),y([$()],k.prototype,"_mapPoi",2),y([$()],k.prototype,"_mapZoom",2),y([$()],k.prototype,"_mapPan",2),y([$()],k.prototype,"_mapFull",2),y([$()],k.prototype,"_mapGrid",2),y([$()],k.prototype,"_mapLabels",2),y([$()],k.prototype,"_mapShowLandmarks",2),y([$()],k.prototype,"_mapMenu",2),y([$()],k.prototype,"_mapQuery",2),y([$()],k.prototype,"_mapSort",2),y([$()],k.prototype,"_mapDrop",2),y([$()],k.prototype,"_gesture",2),y([$()],k.prototype,"_filtersOpen",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",k);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${$e} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{k as FortniteActivityCard};
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
