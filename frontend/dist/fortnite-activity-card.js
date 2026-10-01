var ie=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var x=(p,n,t,e)=>{for(var a=e>1?void 0:e?se(n,t):n,i=p.length-1,s;i>=0;i--)(s=p[i])&&(a=(e?s(n,t,a):s(a))||a);return e&&a&&ie(n,t,a),a};var ot=globalThis,lt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol(),Pt=new WeakMap,G=class{constructor(n,t,e){if(this._$cssResult$=!0,e!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=t}get styleSheet(){let n=this.o,t=this.t;if(lt&&n===void 0){let e=t!==void 0&&t.length===1;e&&(n=Pt.get(t)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),e&&Pt.set(t,n))}return n}toString(){return this.cssText}},Lt=p=>new G(typeof p=="string"?p:p+"",void 0,bt),O=(p,...n)=>{let t=p.length===1?p[0]:n.reduce((e,a,i)=>e+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+p[i+1],p[0]);return new G(t,p,bt)},Ft=(p,n)=>{if(lt)p.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of n){let e=document.createElement("style"),a=ot.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,p.appendChild(e)}},ft=lt?p=>p:p=>p instanceof CSSStyleSheet?(n=>{let t="";for(let e of n.cssRules)t+=e.cssText;return Lt(t)})(p):p;var{is:re,defineProperty:ne,getOwnPropertyDescriptor:oe,getOwnPropertyNames:le,getOwnPropertySymbols:ce,getPrototypeOf:de}=Object,ct=globalThis,Tt=ct.trustedTypes,pe=Tt?Tt.emptyScript:"",he=ct.reactiveElementPolyfillSupport,Z=(p,n)=>p,X={toAttribute(p,n){switch(n){case Boolean:p=p?pe:null;break;case Object:case Array:p=p==null?p:JSON.stringify(p)}return p},fromAttribute(p,n){let t=p;switch(n){case Boolean:t=p!==null;break;case Number:t=p===null?null:Number(p);break;case Object:case Array:try{t=JSON.parse(p)}catch{t=null}}return t}},dt=(p,n)=>!re(p,n),Dt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,t=Dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(n,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(n,e,t);a!==void 0&&ne(this.prototype,n,a)}}static getPropertyDescriptor(n,t,e){let{get:a,set:i}=oe(this.prototype,n)??{get(){return this[t]},set(s){this[t]=s}};return{get:a,set(s){let o=a?.call(this);i?.call(this,s),this.requestUpdate(n,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??Dt}static _$Ei(){if(this.hasOwnProperty(Z("elementProperties")))return;let n=de(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(Z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Z("properties"))){let t=this.properties,e=[...le(t),...ce(t)];for(let a of e)this.createProperty(a,t[a])}let n=this[Symbol.metadata];if(n!==null){let t=litPropertyMetadata.get(n);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let t=[];if(Array.isArray(n)){let e=new Set(n.flat(1/0).reverse());for(let a of e)t.unshift(ft(a))}else n!==void 0&&t.push(ft(n));return t}static _$Eu(n,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(n.set(e,this[e]),delete this[e]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,t,e){this._$AK(n,e)}_$ET(n,t){let e=this.constructor.elementProperties.get(n),a=this.constructor._$Eu(n,e);if(a!==void 0&&e.reflect===!0){let i=(e.converter?.toAttribute!==void 0?e.converter:X).toAttribute(t,e.type);this._$Em=n,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(n,t){let e=this.constructor,a=e._$Eh.get(n);if(a!==void 0&&this._$Em!==a){let i=e.getPropertyOptions(a),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:X;this._$Em=a;let o=s.fromAttribute(t,i.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(n,t,e,a=!1,i){if(n!==void 0){let s=this.constructor;if(a===!1&&(i=this[n]),e??=s.getPropertyOptions(n),!((e.hasChanged??dt)(i,t)||e.useDefault&&e.reflect&&i===this._$Ej?.get(n)&&!this.hasAttribute(s._$Eu(n,e))))return;this.C(n,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,t,{useDefault:e,reflect:a,wrapped:i},s){e&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,s??t??this[n]),i!==!0||s!==void 0)||(this._$AL.has(n)||(this.hasUpdated||e||(t=void 0),this._$AL.set(n,t)),a===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,i]of e){let{wrapped:s}=i,o=this[a];s!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,i,o)}}let n=!1,t=this._$AL;try{n=this.shouldUpdate(t),n?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw n=!1,this._$EM(),e}n&&this._$AE(t)}willUpdate(n){}_$AE(n){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(n){}firstUpdated(n){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[Z("elementProperties")]=new Map,T[Z("finalized")]=new Map,he?.({ReactiveElement:T}),(ct.reactiveElementVersions??=[]).push("2.1.2");var kt=globalThis,Bt=p=>p,pt=kt.trustedTypes,Nt=pt?pt.createPolicy("lit-html",{createHTML:p=>p}):void 0,Ht="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+B,ue=`<${Wt}>`,V=document,tt=()=>V.createComment(""),et=p=>p===null||typeof p!="object"&&typeof p!="function",St=Array.isArray,ge=p=>St(p)||typeof p?.[Symbol.iterator]=="function",vt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ot=/-->/g,jt=/>/g,j=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ut=/'/g,Vt=/"/g,qt=/^(?:script|style|textarea|title)$/i,Ct=p=>(n,...t)=>({_$litType$:p,strings:n,values:t}),r=Ct(1),D=Ct(2),Pe=Ct(3),I=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),It=new WeakMap,U=V.createTreeWalker(V,129);function Kt(p,n){if(!St(p)||!p.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nt!==void 0?Nt.createHTML(n):n}var me=(p,n)=>{let t=p.length-1,e=[],a,i=n===2?"<svg>":n===3?"<math>":"",s=J;for(let o=0;o<t;o++){let l=p[o],u,b,h=-1,f=0;for(;f<l.length&&(s.lastIndex=f,b=s.exec(l),b!==null);)f=s.lastIndex,s===J?b[1]==="!--"?s=Ot:b[1]!==void 0?s=jt:b[2]!==void 0?(qt.test(b[2])&&(a=RegExp("</"+b[2],"g")),s=j):b[3]!==void 0&&(s=j):s===j?b[0]===">"?(s=a??J,h=-1):b[1]===void 0?h=-2:(h=s.lastIndex-b[2].length,u=b[1],s=b[3]===void 0?j:b[3]==='"'?Vt:Ut):s===Vt||s===Ut?s=j:s===Ot||s===jt?s=J:(s=j,a=void 0);let _=s===j&&p[o+1].startsWith("/>")?" ":"";i+=s===J?l+ue:h>=0?(e.push(u),l.slice(0,h)+Ht+l.slice(h)+B+_):l+B+(h===-2?o:_)}return[Kt(p,i+(p[t]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),e]},at=class p{constructor({strings:n,_$litType$:t},e){let a;this.parts=[];let i=0,s=0,o=n.length-1,l=this.parts,[u,b]=me(n,t);if(this.el=p.createElement(u,e),U.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=U.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(Ht)){let f=b[s++],_=a.getAttribute(h).split(B),$=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:$[2],strings:_,ctor:$[1]==="."?xt:$[1]==="?"?yt:$[1]==="@"?$t:q}),a.removeAttribute(h)}else h.startsWith(B)&&(l.push({type:6,index:i}),a.removeAttribute(h));if(qt.test(a.tagName)){let h=a.textContent.split(B),f=h.length-1;if(f>0){a.textContent=pt?pt.emptyScript:"";for(let _=0;_<f;_++)a.append(h[_],tt()),U.nextNode(),l.push({type:2,index:++i});a.append(h[f],tt())}}}else if(a.nodeType===8)if(a.data===Wt)l.push({type:2,index:i});else{let h=-1;for(;(h=a.data.indexOf(B,h+1))!==-1;)l.push({type:7,index:i}),h+=B.length-1}i++}}static createElement(n,t){let e=V.createElement("template");return e.innerHTML=n,e}};function W(p,n,t=p,e){if(n===I)return n;let a=e!==void 0?t._$Co?.[e]:t._$Cl,i=et(n)?void 0:n._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(p),a._$AT(p,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(n=W(p,a._$AS(p,n.values),a,e)),n}var _t=class{constructor(n,t){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:t},parts:e}=this._$AD,a=(n?.creationScope??V).importNode(t,!0);U.currentNode=a;let i=U.nextNode(),s=0,o=0,l=e[0];for(;l!==void 0;){if(s===l.index){let u;l.type===2?u=new it(i,i.nextSibling,this,n):l.type===1?u=new l.ctor(i,l.name,l.strings,this,n):l.type===6&&(u=new wt(i,this,n)),this._$AV.push(u),l=e[++o]}s!==l?.index&&(i=U.nextNode(),s++)}return U.currentNode=V,a}p(n){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(n,e,t),t+=e.strings.length-2):e._$AI(n[t])),t++}},it=class p{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,t,e,a){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=n,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,t=this._$AM;return t!==void 0&&n?.nodeType===11&&(n=t.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,t=this){n=W(this,n,t),et(n)?n===c||n==null||n===""?(this._$AH!==c&&this._$AR(),this._$AH=c):n!==this._$AH&&n!==I&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):ge(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==c&&et(this._$AH)?this._$AA.nextSibling.data=n:this.T(V.createTextNode(n)),this._$AH=n}$(n){let{values:t,_$litType$:e}=n,a=typeof e=="number"?this._$AC(n):(e.el===void 0&&(e.el=at.createElement(Kt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let i=new _t(a,this),s=i.u(this.options);i.p(t),this.T(s),this._$AH=i}}_$AC(n){let t=It.get(n.strings);return t===void 0&&It.set(n.strings,t=new at(n)),t}k(n){St(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let i of n)a===t.length?t.push(e=new p(this.O(tt()),this.O(tt()),this,this.options)):e=t[a],e._$AI(i),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(n=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);n!==this._$AB;){let e=Bt(n).nextSibling;Bt(n).remove(),n=e}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,t,e,a,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=n,this.name=t,this._$AM=a,this.options=i,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=c}_$AI(n,t=this,e,a){let i=this.strings,s=!1;if(i===void 0)n=W(this,n,t,0),s=!et(n)||n!==this._$AH&&n!==I,s&&(this._$AH=n);else{let o=n,l,u;for(n=i[0],l=0;l<i.length-1;l++)u=W(this,o[e+l],t,l),u===I&&(u=this._$AH[l]),s||=!et(u)||u!==this._$AH[l],u===c?n=c:n!==c&&(n+=(u??"")+i[l+1]),this._$AH[l]=u}s&&!a&&this.j(n)}j(n){n===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},xt=class extends q{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===c?void 0:n}},yt=class extends q{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==c)}},$t=class extends q{constructor(n,t,e,a,i){super(n,t,e,a,i),this.type=5}_$AI(n,t=this){if((n=W(this,n,t,0)??c)===I)return;let e=this._$AH,a=n===c&&e!==c||n.capture!==e.capture||n.once!==e.once||n.passive!==e.passive,i=n!==c&&(e===c||a);a&&this.element.removeEventListener(this.name,this,e),i&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},wt=class{constructor(n,t,e){this.element=n,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(n){W(this,n)}};var be=kt.litHtmlPolyfillSupport;be?.(at,it),(kt.litHtmlVersions??=[]).push("3.3.3");var Yt=(p,n,t)=>{let e=t?.renderBefore??n,a=e._$litPart$;if(a===void 0){let i=t?.renderBefore??null;e._$litPart$=a=new it(n.insertBefore(tt(),i),i,void 0,t??{})}return a._$AI(p),a};var Et=globalThis,R=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Yt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};R._$litElement$=!0,R.finalized=!0,Et.litElementHydrateSupport?.({LitElement:R});var fe=Et.litElementPolyfillSupport;fe?.({LitElement:R});(Et.litElementVersions??=[]).push("4.2.2");var ve={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:dt},_e=(p=ve,n,t)=>{let{kind:e,metadata:a}=t,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),e==="setter"&&((p=Object.create(p)).wrapped=!0),i.set(t.name,p),e==="accessor"){let{name:s}=t;return{set(o){let l=n.get.call(this);n.set.call(this,o),this.requestUpdate(s,l,p,!0,o)},init(o){return o!==void 0&&this.C(s,void 0,p,o),o}}}if(e==="setter"){let{name:s}=t;return function(o){let l=this[s];n.call(this,o),this.requestUpdate(s,l,p,!0,o)}}throw Error("Unsupported decorator location: "+e)};function N(p){return(n,t)=>typeof t=="object"?_e(p,n,t):((e,a,i)=>{let s=a.hasOwnProperty(i);return a.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(a,i):void 0})(p,n,t)}function y(p){return N({...p,state:!0,attribute:!1})}var Qt=O`
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
`;var At=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"},{value:"shop",label:"Item Shop & wishlist"},{value:"news",label:"News & updates"},{value:"map",label:"Map"}],xe=p=>p.layout==="session_only"?["session"]:p.layout==="career_only"?["stats"]:p.layout==="events_only"?["events"]:At.map(n=>n.value).filter(n=>n!=="events"||p.show_tournaments!==!1),ye=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; overrides the avatar chosen in the Locker section)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:At}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...At]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"kid_mode",label:"Kid mode (bigger, simpler layout)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],st=class extends R{setConfig(n){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,max_feed_matches:10,...n},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=xe(this._config))}_valueChanged(n){if(!this._config||!this.hass)return;let t=n.target,e=n.detail?n.detail.value:t.value;this._config={...this._config,...e},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?c:r`
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
  `}};x([N({attribute:!1})],st.prototype,"hass",2),x([y()],st.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",st);var Gt=[{sections:["session","stats","trends"],header:"full"},{sections:["pass","sprites","locker"],header:"none",default_section:"pass"},{sections:["events","shop","news","map"],header:"none",default_section:"events"}],K=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-family-panel"};this._index=0;this._cards=[]}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t},this._cards=[]}getCardSize(){return 12}static getStubConfig(){return{type:"custom:fortnite-family-panel",players:["player1"]}}get _players(){let t=(this._config.players||[]).map(e=>String(e).toLowerCase()).filter(Boolean);return t.length?t:["player1"]}_kid(t){let e=this._config.kid_mode;return Array.isArray(e)?e.map(a=>String(a).toLowerCase()).includes(t):!!e}_buildCards(){let t=this._config.columns?.length?this._config.columns:Gt;this._cards=[];for(let e of this._players)for(let a of t){let i=document.createElement("fortnite-activity-card");i.setConfig({type:"custom:fortnite-activity-card",player:e,sections:a.sections,header:a.header||"none",default_section:a.default_section||"auto",show_sub_buttons:a.sections.includes("session"),compact:this._config.compact??!1,card_style:this._config.card_style||"bubble",kid_mode:this._kid(e)}),i.dataset.player=e,this._cards.push(i)}}updated(t){(t.has("_config")||!this._cards.length)&&(this._buildCards(),this.requestUpdate());for(let e of this._cards)e.hass=this.hass}_displayName(t){return Object.values(this.hass?.states||{}).find(a=>a.attributes?.fortnite_player_id===t&&a.attributes?.fortnite_entity_key==="profile")?.attributes?.display_name||t.charAt(0).toUpperCase()+t.slice(1)}_scrollTo(t){let e=this.shadowRoot?.querySelector(".track");e&&(e.scrollTo({left:t*e.clientWidth,behavior:"smooth"}),this._index=t)}_onScroll(t){let e=t.target,a=Math.round(e.scrollLeft/Math.max(1,e.clientWidth));a!==this._index&&(this._index=a)}render(){if(!this.hass)return c;let t=(this._config.columns?.length?this._config.columns:Gt).length,e=this._players;return r`
      <div class="panel" style="--panel-height:${this._config.height||"calc(100vh - var(--header-height, 56px) - 16px)"}">
        ${e.length>1?r`<div class="nav">
              ${e.map((a,i)=>r`<button class=${i===this._index?"on":""} @click=${()=>this._scrollTo(i)}>${this._displayName(a)}</button>`)}
            </div>`:c}
        <div class="track" @scroll=${this._onScroll}>
          ${e.map(a=>r`
            <section class="page" style="--cols:${t}">
              ${this._cards.filter(i=>i.dataset.player===a).map(i=>r`<div class="col">${i}</div>`)}
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
  `}};x([N({attribute:!1})],K.prototype,"hass",2),x([y()],K.prototype,"_config",2),x([y()],K.prototype,"_index",2);customElements.get("fortnite-family-panel")||(customElements.define("fortnite-family-panel",K),window.customCards=window.customCards||[],window.customCards.push({type:"fortnite-family-panel",name:"Fortnite Family Panel",description:"Full-screen landscape page per player; swipe between players."}));var $e="1.12.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var we={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},Y={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},L={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},ke={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Zt=(p,n)=>{let t=p&&ke[p]||p||"";return n===1||!t?t:`${t}s`},Xt={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Jt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],Se={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},Mt={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},te=["session","stats","events","sprites","trends","pass","locker","shop","news","map"],Ce={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},mt=p=>String(p?.icon||"").split("/").pop()||"",nt=p=>p?.type==="Currency"&&(/MTX/i.test(mt(p))||/v-?bucks/i.test(p?.name||"")),ut=p=>p?.type==="AthenaCharacter"||/^T_Soldier_/i.test(mt(p)),gt=p=>{if(ut(p))return"Outfit";if(nt(p))return"V-Bucks";let n=mt(p);return p?.type==="AthenaDance"&&/Spray/i.test(n)?"Spray":p?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(n)?"Emoticon":Ce[p?.type]||"Cosmetic"},ee=p=>p?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(p.name)?p.name:gt(p),E=p=>{p.target.hidden=!0},ae=p=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:p}),rt={at:0},H={at:0},zt=new Map,k=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...Mt};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._selectedOutfit=null;this._lockerFilter="all";this._shop={};this._shopTab="today";this._shopQuery="";this._searchQuery="";this._searchType="outfit";this._searchResults=null;this._searchLoading=!1;this._news={};this._maps={};this._mapMode="br";this._mapPoi=null;this._filtersOpen=!1;this._renderedView=null;this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Qt}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...Mt,...t},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...Mt}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-H.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let t=this._config;if(Array.isArray(t.sections)&&t.sections.length){let e=t.sections.filter(a=>te.includes(a));if(e.length)return[...new Set(e)]}switch(t.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return te.filter(e=>e!=="events"||t.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(e.states[a]!==this.hass.states[a])return!0;return!1}updated(t){if(super.updated(t),!this.hass)return;let e=t.has("hass")&&!t.get("hass");e&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(t.has("_config")||e)&&this._scheduleAvatar(),this._renderedView==="pass"&&(this._loadPass(),this._loadOutfits()),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="shop"&&this._loadShop(),this._renderedView==="news"&&(this._loadNews(),(this._eventsEnabled||this._sections.includes("news"))&&this._loadEvents()),this._renderedView==="map"&&(this._loadMap("br"),this._loadMap(this._mapMode)),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!rt.promise||Date.now()-rt.at>36e5)&&(rt.at=Date.now(),rt.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await rt.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}async _loadEvents(t=!1){if(this.hass){(t||!H.promise||Date.now()-H.at>10*6e4)&&(H.at=Date.now(),H.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let e=await H.promise;this._events={list:e?.tournaments??null,defaultRegion:e?.default_region_group}}catch(e){H.promise=void 0,this._events={error:e?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let e=t.toLowerCase();zt.has(e)||zt.set(e,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await zt.get(e);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadLeaderboard(t,e){let a=`${t}|${e}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:t,window_id:e,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(t){this._outfits={error:t?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let t=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:t?.battlepass??null}}catch(t){this._pass={error:t?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let t=Jt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!t.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let e=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:t,period:i,types:["mean","min","max","state"]});try{let a=await e(30,"day"),i="day";Object.values(a||{}).every(s=>(s||[]).length<3)&&(a=await e(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(t,e){!this.hass||this._matchLists[t]||(this._matchLists={...this._matchLists,[t]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...e}).then(a=>{this._matchLists={...this._matchLists,[t]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[t]:{error:a?.message||"Could not load matches"}}}))}_isRanked(t){return!!t.rank_delta_pct||!!t.unreal_rank_change||/habanero/i.test(t.playlist_id||"")}_findEntity(t,e){let a=this.hass?.states;if(!a)return;let i=this._player,s=`${i}:${t}:${e}`,o=this._entityCache.get(s);if(o&&a[o])return a[o];let l;for(let[u,b]of Object.entries(a))if(u.startsWith(`${t}.`)&&b.attributes?.fortnite_player_id===i&&b.attributes?.fortnite_entity_key===e){l=u;break}if(l||(l=[e,...we[e]||[]].flatMap(h=>[`${t}.fortnite_${i}_${h}`,`${t}.fortnite_${i}_${i}_${h}`]).find(h=>a[h])),!!l)return this._entityCache.set(s,l),a[l]}async _callService(t,e={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...e}),t==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadEvents(),t==="trends"&&this._loadTrends(),t==="pass"&&(this._loadPass(),this._loadOutfits()),t==="locker"&&this._loadOutfits(),t==="shop"&&this._loadShop(),t==="news"&&this._loadNews(),t==="map"&&this._loadMap(this._mapMode)}_entityId(t,e){return this._findEntity(t,e)?.entity_id}_toggleEvent(t){if(this._expandedEvent===t.key){this._expandedEvent=null;return}this._expandedEvent=t.key;let e=t.windows.find(a=>this._windowState(a)==="live")||[...t.windows].reverse().find(a=>this._windowState(a)==="finished");e&&!this._leaderboards[`${t.event_id}|${e.window_id}`]&&this._loadLeaderboard(t.event_id,e.window_id)}_formatRelativeTime(t){if(!t)return"";let e=new Date(t);if(isNaN(e.getTime()))return"";let a=Math.max(1,Math.round((this._now-e.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let e=Math.floor(t/60),a=Math.round(t%60);return e>0?`${e}h ${a}m`:`${a}m`}_formatSpan(t){let e=Math.max(0,Math.round(t/6e4)),a=Math.floor(e/1440),i=Math.floor(e%1440/60),s=e%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${s}m`:`${s}m`}_formatWhen(t){try{return ae(this.hass?.config?.time_zone).format(new Date(t)).replace(/\b(am|pm)\b/i,e=>e.toLowerCase())}catch{return ae().format(new Date(t))}}_num(t,e=0){return Number(t||0).toLocaleString("en-GB",{maximumFractionDigits:e,minimumFractionDigits:0})}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}_windowState(t){let e=Date.parse(t.begin),a=Date.parse(t.end);return this._now>=a?"finished":this._now>=e?"live":"upcoming"}_rankBadge(t,e=30){let a=t||"Unranked",i=Object.keys(Y).find(h=>a.startsWith(h));if(!i)return r`<span class="rank-badge unranked" style="width:${e}px;height:${e}px">–</span>`;let[s,o]=Y[i],l=(a.match(/\b(I{1,3})$/)||[])[1]||"",u=`g-${i}-${e}`;return r`<span class="rank-badge" title=${a} style="width:${e}px;height:${e}px">
      ${D`<svg viewBox="0 0 40 44" width=${e} height=${e} aria-hidden="true">
        <defs><linearGradient id=${u} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${s}></stop><stop offset="1" stop-color=${o}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?D`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${u})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:D`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${u})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${l}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return r`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,e=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),s=this._findEntity("sensor","rank_reload"),o=this._findEntity("sensor","level"),l=this._findEntity("binary_sensor","playing"),u=this._findEntity("sensor","profile"),b=this._findEntity("sensor","sprites"),h=this._findEntity("sensor","power_ranking"),f=!!b&&!["unavailable","unknown"].includes(b.state);if(!e&&!a&&!l)return r`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let _=l?.state==="on"||e?.state==="active",$=e?.attributes||{},S=a?.attributes||{},d=u?.attributes||{},g={...i?.attributes||{},current_rank:i?.state},m={...s?.attributes||{},current_rank:s?.state},A=!!u?.attributes?.outfits?.owned_count,w=this._sections.filter(Rt=>this._sections.length===1||(Rt!=="sprites"||f)&&(Rt!=="locker"||A)),C=this._config.default_section,M=_&&w.includes("session")?"session":w.includes("stats")?"stats":w[0],v=this._view??(C&&C!=="auto"&&w.includes(C)?C:M);w.includes(v)||(v=M),this._renderedView=v;let z=this._config.header||"full",P="",F={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};F[this._config.theme_accent||""]&&(P+=`--accent: ${F[this._config.theme_accent]};`),this._config.custom_background&&(P+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let Q=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}${this._config.kid_mode?" kid":""}`;return r`
      <ha-card class=${Q} style="${P}">
        ${z==="none"?c:z==="slim"?this._renderSlimHeader(t,_,$,d):this._renderHeader(t,_,$,S,d,o,g,m)}
        ${this._renderButtons(v,_,w)}
        ${v==="session"?this._renderSessionView(_,$,g):v==="events"?this._renderEventsView():v==="sprites"?this._renderSpritesView(b):v==="trends"?this._renderTrendsView():v==="pass"?this._renderPassView(o):v==="locker"?this._renderLockerView(d):v==="shop"?this._renderShopView():v==="news"?this._renderNewsView():v==="map"?this._renderMapView():this._renderStatsView(S,d,g,m,h)}
      </ha-card>
    `}_renderHeader(t,e,a,i,s,o,l,u){let b=s.display_name||t.charAt(0).toUpperCase()+t.slice(1),h=s.season||this._catalog.season,f=i.metrics?.last_played,_=o?.attributes||{},$=Number(o?.state)||0,S=Number(_.account_level||0),d=this._avatarImage(s),g=this._config.compact?20:24,m=this._findEntity("sensor","vbucks"),A=!this._config.hide_vbucks&&m&&!isNaN(Number(m.state)),w=m?.attributes?.crew;return r`
      <div class="fa-header">
        <div class="player-avatar ${d?"has-image":""}">
          ${d?r`<img src=${d} alt=${this._avatarName(s)} @error=${E} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${b}</h2>
            <span class="header-ranks">
              ${l.current_rank&&l.current_rank!=="Unranked"?this._rankBadge(l.current_rank,g):c}
              ${u.current_rank&&u.current_rank!=="Unranked"?this._rankBadge(u.current_rank,g):c}
            </span>
          </div>
          <div class="player-meta">
            ${h?.number?r`<span class="level-badge">S${h.number} · ${h.days_left}d left</span>`:c}
            ${!this._config.hide_season_level&&$>0?r`<span class="level-badge">Lvl ${$}</span>`:c}
            ${!this._config.hide_account_level&&S>0?r`<span>Acct ${S.toLocaleString()}</span>`:c}
            ${A?r`<span class="vbucks-chip" title=${Object.entries(m.attributes?.by_kind||{}).map(([C,M])=>`${C}: ${this._num(M)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(m.state)}</span>`:c}
            ${w?.active&&!this._config.hide_vbucks?r`<span class="crew-chip" title="Fortnite Crew${w.end_date?` \xB7 renews ${this._formatWhen(w.end_date)}`:""}">Crew</span>`:c}
            ${f?.time&&!e?r`<span title=${f.name||""}>Played ${this._formatRelativeTime(f.time)}</span>`:c}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?r`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:r`<span>IDLE</span>`}
        </div>
      </div>
      ${h?.progress_pct!==void 0&&!this._config.compact?r`<div class="season-bar" title="Season ${h.number}: ${h.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,h.progress_pct)}%"></div>
          </div>`:c}
    `}_liveEventCount(){let t=this._currentFilters();return(this._events.list||[]).filter(e=>this._matchesFilters(e,t)&&e.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(t){return(this._config.avatar||"").trim()?this._avatar?.icon:t?.outfits?.avatar?.icon||void 0}_avatarName(t){return(this._config.avatar||"").trim()?this._avatar?.name||"":t?.outfits?.avatar?.name||""}async _setFavorite(t,e){try{await this.hass.callService("fortnite_activity","set_favorite",{player_id:this._player,outfit_id:t,favorite:e});let a=(this._outfits.data?.outfits||[]).map(i=>String(i.key||i.id).toLowerCase()===t?{...i,favorite:e}:i);this._outfits={data:{...this._outfits.data||{},outfits:a}}}catch(a){console.error("Favourite update failed:",a)}finally{this._selectedOutfit=null}}async _setAvatar(t){this._loadingAction="set_avatar";try{await this.hass.callService("fortnite_activity","set_avatar",{player_id:this._player,outfit_id:t||""}),this._outfits={data:{...this._outfits.data||{},avatar_id:t}}}catch(e){console.error("Error setting Fortnite avatar:",e)}finally{this._loadingAction=null,this._selectedOutfit=null}}_renderSlimHeader(t,e,a,i){let s=i.display_name||t.charAt(0).toUpperCase()+t.slice(1),o=this._avatarImage(i),l=this._findEntity("sensor","vbucks"),u=!this._config.hide_vbucks&&l&&!isNaN(Number(l.state));return r`
      <div class="fa-header slim">
        <div class="player-avatar ${o?"has-image":""}">
          ${o?r`<img src=${o} alt="" @error=${E} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${s}</h2>
            ${u?r`<span class="vbucks-chip">Ⓥ ${this._num(l.state)}</span>`:c}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?r`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:r`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(t,e,a){let i=a.length>1,s=!this._config.sections?.length&&this._config.layout==="events_only",o=this._config.show_sub_buttons!==!1&&!s;if(!i&&!o)return c;let l=this._eventsEnabled?this._liveEventCount():0,u=Number(this._findEntity("sensor","wishlist")?.state)||0,b={session:["mdi:lightning-bolt",e?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",l],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"],shop:["mdi:shopping-outline","Shop",u],news:["mdi:newspaper-variant-outline","News"],map:["mdi:map-outline","Map"]},h=(f,_,$,S=0)=>r`
      <button class="bubble-sub-button ${t===f?"active":""}" @click=${()=>this._setView(f)} title=${$}>
        <ha-icon icon=${_}></ha-icon><span class="btn-label">${$}</span>
        ${S>0?r`<span class="notify-badge" title="${S} live">${S}</span>`:c}
      </button>
    `;return r`
      <div class="sub-button-row">
        ${i?a.map(f=>h(f,b[f][0],b[f][1],b[f][2]||0)):c}
        ${o?e?r`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:r`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`:c}
        ${o?r`<button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
              <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
              <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
            </button>`:c}
      </div>
    `}_renderKpis(t){if(this._config.compact){let e=[];for(let a=0;a<t.length;a+=2)e.push(t.slice(a,a+2));return r`<table class="stat-table"><tbody>
        ${e.map(a=>r`<tr>
          ${a.map(([i,s,o])=>r`<th>${i}</th><td class="kpi-value ${o||""}">${s}</td>`)}
          ${a.length<2?r`<th></th><td></td>`:c}
        </tr>`)}
      </tbody></table>`}return r`<div class="kpi-row">
      ${t.map(([e,a,i])=>r`<div class="kpi-chip"><span class="kpi-label">${e}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(t,e,a,i){let s=e.current_rank||"Unranked",o=Number(e.progress_pct||0),l=s.startsWith("Unreal");return r`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(s,this._config.compact?26:34)}<span>${t}</span></span>
          <span class="rank-name" style="color: ${(Y[Object.keys(Y).find(u=>s.startsWith(u))||""]||["var(--secondary-text-color)"])[0]}">${s}</span>
        </div>
        ${l?r`<div class="unreal-position">
              <span class="unreal-number">${e.unreal_rank?`#${this._num(e.unreal_rank)}`:"Unreal"}</span>
              ${i?r`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:c}
            </div>`:this._config.hide_rank_progress?c:r`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${l?"Unreal leaderboard position":`${o}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,e,a){let i=Number(e.net_rank_delta_pct||0),s=_=>_>=0?`+${_}%`:`${_}%`,o=e.session_id,l=o?`session:${o}:${e.matches_played||0}`:"";l&&this._config.show_match_feed!==!1&&this._ensureMatches(l,{session_id:o});let b=(l?this._matchLists[l]?.matches:void 0)||e.recent_matches||[],h=b.filter(_=>this._isRanked(_)),f=h.filter(_=>_.rank_track===a.game_mode&&typeof _.unreal_rank_change=="number").reduce((_,$)=>_+($.unreal_rank_change||0),0);return r`
      ${this._renderKpis([["Matches",e.matches_played||0,"cyan"],["Wins",`${e.wins||0} \u{1F3C6}`,"gold"],["Kills",e.kills||0],["K/D",e.kd_ratio||0],...h.length?[["Rank Net",s(i),i>=0?"positive":"negative"]]:[]])}

      ${h.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${s(i)} this session`,f||null):c}

      ${this._config.show_match_feed!==!1?r`
            <div class="match-feed-header">
              <span>Match Feed (${e.matches_played||b.length} ${(e.matches_played||b.length)===1?"match":"matches"})</span>
              ${t?r`<span class="tracking-live">Tracking Live</span>`:c}
            </div>
            ${this._renderMatchList(l||"session",b,r`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:c}
    `}_renderMatchList(t,e,a){let i=this._config.max_feed_matches||10,s=this._showAllMatches[t],o=s?e:e.slice(0,i);return r`
      <div class="match-list">
        ${o.length?o.map(l=>this._renderMatch(l)):r`<div class="empty">${a}</div>`}
        ${e.length>i?r`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[t]:!s}}>
              ${s?"Show fewer":`Show all ${e.length}`}
            </button>`:c}
      </div>
    `}_progressChip(t){let e=t.icon?r`<img src=${t.icon} alt="" @error=${E} />`:c;switch(t.type){case"quests":return r`<span class="pchip quest">📜 ${t.count} quest${t.count>1?"s":""} done</span>`;case"level_up":return r`<span class="pchip level">⬆️ Level ${t.to}</span>`;case"sprite_new":return r`<span class="pchip sprite">${e}New sprite: ${t.name}</span>`;case"sprite_mastered":return r`<span class="pchip gold">${e}⭐ Mastered ${t.name}</span>`;case"sprite_level":return r`<span class="pchip sprite">${e}${t.name} → Lv ${t.level}</span>`;default:return c}}_renderMatch(t){let e=this._playlist(t.playlist_id),a=e?.image,i=`${t.timestamp}|${t.playlist_id}`,s=this._expandedMatch===i,o=(t.match_count||1)>1,l=this._isRanked(t),u=t.progress||[],b=s?this._matchMap(t):null,h=(f,_)=>_==null||_===""?c:r`<div class="detail"><span>${f}</span><b>${_}</b></div>`;return r`
      <div class="match-card ${t.is_victory?"victory":""} ${s?"expanded":""}"
        @click=${()=>{this._expandedMatch=s?null:i,s||(this._loadMap("br"),this._loadMatchMap(t.playlist_id))}}>
        <div class="match-row">
          ${a?r`<img class="match-art" src=${a} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${t.match_number}${(t.match_count||1)>1?` \xD7${t.match_count}`:""}</span>
              <span class="placement-badge ${t.is_victory?"win":""}">${t.placement_text}</span>
            </div>
            <span class="match-mode">${t.mode_name} • ${this._formatRelativeTime(t.timestamp)}</span>
            ${u.length?r`<div class="progress-chips">${u.map(f=>this._progressChip(f))}</div>`:c}
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${t.kills}</span>
            ${t.rank_delta_pct&&this._isRanked(t)?r`<span class="rank-delta-badge ${t.rank_delta_pct>=0?"pos":"neg"}">
                  ${t.rank_delta_pct>=0?`+${t.rank_delta_pct}%`:`${t.rank_delta_pct}%`}
                </span>`:c}
          </div>
          <ha-icon class="chevron" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${s?r`<div class="match-details" @click=${f=>f.stopPropagation()}>
              ${b?r`<div class="match-map">
                    ${this._renderMapImage(b,!0)}
                    <span>🗺️ ${b.name||"Battle Royale island"}</span>
                  </div>`:a?r`<img class="detail-art" src=${a} alt="" @error=${E} />`:c}
              ${e?.description?r`<p class="detail-desc">${e.description}</p>`:c}
              <div class="detail-grid">
                ${h("Finished",this._formatWhen(t.timestamp))}
                ${h("Mode",t.mode_name)}
                ${h("Placement",t.placement_text)}
                ${h("Kills",t.kills)}
                ${o?h("Games",t.match_count):c}
                ${o&&t.wins?h("Victories",t.wins):c}
                ${h("Time played",t.minutes?this._formatDuration(t.minutes):void 0)}
                ${h("Score",t.score?this._num(t.score):void 0)}
                ${h("Players outlived",t.players_outlived?this._num(t.players_outlived):void 0)}
                ${l?r`
                      ${h("Ranked track",t.rank_track)}
                      ${h("Rank after",t.unreal_rank?`${t.current_rank} #${this._num(t.unreal_rank)}`:t.current_rank)}
                      ${h("Rank change",t.rank_delta_pct?`${t.rank_delta_pct>0?"+":""}${t.rank_delta_pct}%`:void 0)}
                      ${h("Unreal places",t.unreal_rank_change?`${t.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(t.unreal_rank_change))}`:void 0)}`:c}
              </div>
              ${(t.match_count||1)>1?r`<small class="muted">Several games finished between polls; totals are combined.</small>`:c}
            </div>`:c}
      </div>
    `}_renderStatsView(t,e,a,i,s){let o=e.windows||{},l=e.window_labels||{},u=["lifetime",...["season","week","today"].filter(w=>o[w])],b=u.includes(this._window)?this._window:"lifetime",h={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},f=t.metrics||{},_={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:f.hours_played,favourite_mode:f.favourite_mode,modes:t.modes||{}},$=b==="lifetime"?_:o[b],S=this._selectedMode!=="all"?$.modes?.[this._selectedMode]:null,d=S&&S.matches!==void 0?S:$,g=d.minutes!==void 0?Math.round(d.minutes/60*10)/10:$.hours_played,m=$.favourite_mode,A=(w,C)=>r`
      <button class="mode-tab ${this._selectedMode===w?"active":""}" @click=${()=>this._selectedMode=w}>${C}</button>
    `;return r`
      <div class="tab-rows">
        ${u.length>1?r`<div class="mode-tabs">
              ${u.map(w=>r`<button class="mode-tab ${b===w?"active":""}" title=${l[w]||""}
                  @click=${()=>this._window=w}>${h[w]}</button>`)}
            </div>`:c}
        <div class="mode-tabs">
          ${A("all","Overall")} ${A("zero_build","Zero Build")} ${A("build","Build")} ${A("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${d.win_rate||0}%`,"cyan"],["K/D",d.kd||0],["Wins",r`${this._num(d.wins)} 🏆`,"gold"],["Matches",this._num(d.matches)],["Kills",this._num(d.kills)],["Outlived",this._num(d.players_outlived)],["Kills/Match",d.matches?this._num(d.kills/d.matches,2):0],...g!==void 0?[["Hours",this._num(g,1)]]:[]])}

      ${b==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):c}
      ${m?this._renderFavourite(m,b!=="lifetime"?h[b]:""):c}
      ${b!=="lifetime"&&$?.since?this._renderWindowMatches(b,h[b],$):c}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
      ${this._renderOtherTracks(a)}
      ${s&&!["unavailable","unknown"].includes(s.state)?r`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(s.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(s.attributes?.points)} points${s.attributes?.counting_events!=null?` \xB7 ${s.attributes.counting_events} counting events`:""}</span>
              <span>${s.attributes?.peak_pr!=null?`Peak PR ${this._num(s.attributes.peak_pr)}`:"Competitive (tournaments)"}${s.attributes?.delta_pr?` \xB7 ${s.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(s.attributes.delta_pr))}`:""}</span></div>
          </div>`:c}
      ${e.epic_link==="relink_required"?r`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:c}
    `}_renderOtherTracks(t){let e=(t.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return e.length?r`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${e.map(a=>r`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(Y[Object.keys(Y).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:c}_lineChart(t,e,a){let l=t.map(m=>m.v),u=Math.min(...l),b=Math.max(...l),h=b-u||Math.abs(b)||1,f=t[0].t,_=t[t.length-1].t||f+1,$=m=>6+(m-f)/(_-f||1)*308,S=m=>84-(m-u)/h*78,d=t.map((m,A)=>`${A?"L":"M"}${$(m.t).toFixed(1)},${S(m.v).toFixed(1)}`).join(" "),g=m=>new Date(m).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return r`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${D`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${d}" class="trend-line"></path>
        ${t.map(m=>D`<g class="trend-pt"><circle cx="${$(m.t)}" cy="${S(m.v)}" r="7" class="trend-hit"></circle><circle cx="${$(m.t)}" cy="${S(m.v)}" r="2.5" class="trend-dot"></circle><title>${g(m.t)}: ${e(m.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let e=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!e.length)return r`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,s=4,o=Math.max(4,...e.map(u=>u.kills||0)),l=(a-2*s)/e.length;return r`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${D`${e.map((u,b)=>{let h=Math.max(2,(u.kills||0)/o*(i-14)),f=s+b*l+1;return D`<g><rect x="${f}" y="${i-h}" width="${Math.max(2,l-2)}" height="${h}" rx="2" class="kill-bar"></rect>
          ${u.is_victory?D`<text x="${f+(l-2)/2}" y="${i-h-3}" text-anchor="middle" class="win-mark">★</text>`:c}
          <rect x="${f-1}" y="0" width="${l}" height="${i}" fill="transparent"><title>${this._formatWhen(u.timestamp)} · ${u.mode_name}: ${u.kills} kills · ${u.placement_text}</title></rect></g>`})}
      <line x1="${s}" x2="${a-s}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${o} kills</span></div>`}_renderTrendsView(){let t=this._trends,e=Jt.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return c;let s=((t.stats||{})[i]||[]).map(_=>({t:typeof _.start=="number"?_.start:Date.parse(_.start),v:_.mean??_.state??_.max})).filter(_=>typeof _.v=="number"),o=this.hass.states[i];if(!s.length&&(!o||["unavailable","unknown"].includes(o.state)))return c;let l=_=>`${this._num(_,a.digits||0)}${a.unit||""}`,u=s[0]?.v,b=s[s.length-1]?.v,h=s.length>1?b-u:null,f=h==null||h===0?"":h>0!=!!a.lowerBetter?"positive":"negative";return r`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${f}">${o&&!isNaN(Number(o.state))?l(Number(o.state)):"\u2014"}</span>
        </div>
        ${s.length>1?this._lineChart(s,l,t.period||"day"):r`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${s.length>1?`${h>=0?"\u25B2":"\u25BC"} ${l(Math.abs(h))} over ${s.length} ${t.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return r`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${t.loading&&!t.stats?r`<div class="empty">Loading history…</div>`:c}
      ${t.error?r`<div class="empty">${t.error}</div>`:c}
      <div class="trend-grid">${e}</div>
    `}_passSets(t){let e=[],a=new Map;for(let i of t.pages||[]){let s=String(i.track||"").replace(/Bonus$/,"")||"Pass";a.has(s)||(a.set(s,[]),e.push(s)),a.get(s).push(i)}return e.map((i,s)=>{let o=a.get(i),l=o.flatMap(m=>m.rewards||[]),u=l.find(ut)||null,b=u?.icon||l.find(m=>m.icon&&!nt(m)&&m.type!=="HomebaseBannerIcon")?.icon||null,h={},f={},_=new Map,$=0;for(let m of o){let A=/Bonus$/.test(m.track||"");for(let w of m.rewards||[]){if(typeof w.cost=="number"&&w.cost>0&&w.price_row!=="Included"){let M=A?f:h;M[w.currency||""]=(M[w.currency||""]||0)+w.cost}nt(w)&&($+=Number(w.quantity)||0);let C=gt(w);C!=="V-Bucks"&&_.set(C,(_.get(C)||0)+1)}}let S=l.filter(m=>m.owned===!0||m.owned===!1),d=S.filter(m=>m.owned===!0).length,g=l.filter(m=>m.type!=="Currency").length;return{key:i,unlocked:d,known:S.length,complete:S.length>0&&S.length===g&&d===S.length,title:u?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(u.name)?u.name:`Set ${s+1}`,outfit:u,hero:b,pages:o.map(m=>{let A=/Bonus$/.test(m.track||""),w=m.rewards||[],C=w.filter(v=>v.owned===!0||v.owned===!1),M=C.length>0&&C.length===w.filter(v=>v.type!=="Currency").length&&C.every(v=>v.owned);return{label:`${A?"Bonus":"Page"} ${m.page}`,bonus:A,rewards:w,done:M}}),rewardCount:l.length,baseCost:h,bonusCost:f,vbucks:$,types:[..._.entries()].sort((m,A)=>A[1]-m[1])}})}_costText(t){return Object.entries(t).map(([e,a])=>`${this._num(a)} ${Zt(e,a)}`).join(" + ")}_passCostBadge(t){if(t.price_row==="Included"||t.cost===0)return r`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof t.cost!="number")return c;let e=t.currency==="AthenaCategoryStar";return r`<span class="bp-cost ${e?"character":""}" title="${t.cost} ${Zt(t.currency,t.cost)}">
      <ha-icon icon=${e?"mdi:account-star":"mdi:star"}></ha-icon>${t.cost}</span>`}_goPassSet(t,e){this._passSet=(t+e)%e,this._passPage=0}_withOwnedOutfits(t){let e=new Set((this._outfits.data?.outfits||[]).map(o=>String(o.id||"").toLowerCase()));if(!e.size||t.known==null)return t;let a=t.unlocked||0,i=t.known||0,s=(t.pages||[]).map(o=>({...o,rewards:(o.rewards||[]).map(l=>{if(l.owned!=null||!ut(l))return l;let u=/^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(mt(l));return!u||!e.has(`character_${u[1].toLowerCase()}`)?l:(a+=1,i+=1,{...l,owned:!0})})}));return{...t,pages:s,unlocked:a,known:i}}_renderPassView(t){let e=this._pass;if(e.loading||e.data===void 0&&!e.error)return r`<div class="empty">Loading Battle Pass…</div>`;if(e.error)return r`<div class="empty">${e.error}</div>`;if(!e.data||!e.data.pages?.length)return r`<div class="empty">The Battle Pass will show here soon.</div>`;let a=this._withOwnedOutfits(e.data),i=this._passSets(a),s=Math.min(this._passSet,i.length-1),o=i[s],l=Math.min(this._passPage,o.pages.length-1),u=o.pages[l],b=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,h=Number(t?.state)||null,f=i.reduce((d,g)=>d+g.vbucks,0),_=i.filter(d=>d.outfit).length,$={};for(let d of i)for(let[g,m]of Object.entries(d.baseCost))$[g]=($[g]||0)+m;let S=(d,g)=>g>1&&!/s$/.test(d)?`${d}s`:d;return r`
      <div class="bp">
        <div class="bp-summary">
          <div class="bp-summary-title">
            <ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon>
            <span>Season ${a.season} Battle Pass</span>
            ${b?.days_left!=null?r`<span class="bp-days">${b.days_left}d left</span>`:c}
          </div>
          ${a.known?r`<div class="bp-unlock">
                <div class="bp-unlock-top">
                  <span>✓ <b>${a.unlocked}</b> unlocked</span>
                  ${a.known>a.unlocked?r`<span class="bp-locked-count">🔒 ${a.known-a.unlocked} still locked</span>`:c}
                </div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(a.unlocked/a.known*100)}%"></div></div>
              </div>`:c}
          <div class="bp-stats">
            <div><b>${i.length}</b><span>sets</span></div>
            <div><b>${_}</b><span>outfits</span></div>
            <div><b>${a.reward_count??i.reduce((d,g)=>d+g.rewardCount,0)}</b><span>rewards</span></div>
            ${f?r`<div class="gold"><b>${this._num(f)}</b><span>V-Bucks</span></div>`:c}
            ${h?r`<div><b>${h}</b><span>level</span></div>`:c}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${i.map((d,g)=>r`
            <button class="bp-thumb ${g===s?"active":""} ${d.complete?"done":""}" role="tab" aria-selected=${g===s?"true":"false"}
              title="${d.title}${d.known?` \xB7 ${d.unlocked} of ${d.known} unlocked`:""}"
              @click=${()=>this._goPassSet(g,i.length)}>
              ${d.hero?r`<img src=${d.hero} alt="" @error=${E} />`:r`<ha-icon icon="mdi:account"></ha-icon>`}
              ${d.complete?r`<span class="bp-thumb-check">✓</span>`:c}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${()=>this._goPassSet(s-1,i.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${o.hero?r`<img src=${o.hero} alt="" @error=${E} />`:r`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${s+1} of ${i.length}</div>
              <div class="bp-hero-name">${o.title}</div>
              <div class="bp-hero-meta">
                ${Object.keys(o.baseCost).length?r`<span title="Stars for every reward on the main pages">${this._costText(o.baseCost)}</span>`:c}
                ${Object.keys(o.bonusCost).length?r`<span title="Bonus pages">Bonus: ${this._costText(o.bonusCost)}</span>`:c}
                ${o.vbucks?r`<span class="gold">Ⓥ ${this._num(o.vbucks)}</span>`:c}
              </div>
              ${o.known?r`<div class="bp-set-progress">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(o.unlocked/o.known*100)}%"></div></div>
                    <span>${o.complete?"\u2713 All unlocked":o.unlocked===o.known?`\u2713 ${o.unlocked} unlocked`:`\u2713 ${o.unlocked} unlocked \xB7 \u{1F512} ${o.known-o.unlocked} still locked`}</span>
                  </div>`:c}
              <div class="bp-hero-types">${o.types.map(([d,g])=>`${g} ${S(d,g)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(s+1,i.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${o.pages.length>1?r`<div class="bp-pages">
                ${o.pages.map((d,g)=>r`
                  <button class="mini-button ${g===l?"active":""} ${d.bonus?"bonus":""}" @click=${()=>this._passPage=g}>
                    ${d.done?"\u2713 ":""}${d.label}<span class="bp-page-count">${d.rewards.length}</span>
                  </button>`)}
              </div>`:c}

          <div class="bp-rewards">
            ${u.rewards.map(d=>r`
              <div class="bp-reward ${nt(d)?"vbucks":""} ${ut(d)?"outfit":""} ${d.owned===!0?"unlocked":d.owned===!1?"locked":""}"
                title="${ee(d)} · ${gt(d)}${d.owned===!0?" \xB7 unlocked":d.owned===!1?" \xB7 locked":""}">
                <div class="bp-reward-img">
                  ${d.icon?r`<img src=${d.icon} alt="" @error=${E} />`:r`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${d.owned===!0?r`<span class="bp-state unlocked">✓</span>`:d.owned===!1?r`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`:c}
                  ${d.owned===!0?c:this._passCostBadge(d)}
                </div>
                <span class="bp-reward-name">${nt(d)&&d.quantity?`${this._num(d.quantity)} V-Bucks`:ee(d)}</span>
                <span class="bp-reward-type">${gt(d)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys($).length?r`<span>All base pages: ${this._costText($)}</span>`:c}

        </div>
      </div>
    `}_outfitRarity(t){let e=String(t?.rarity||"");return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}_renderLockerView(t){let a=(t.outfits||{}).avatar,i=a?.id||null,s=!!(this._config.avatar||"").trim(),o=this._outfits;if(o.loading||o.data===void 0&&!o.error)return r`<div class="empty">Loading locker…</div>`;if(o.error)return r`<div class="empty">${o.error}</div>`;let l=o.data?.outfits||[];if(!l.length)return r`<div class="empty">Your outfits will show up here soon.</div>`;let u=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],b=14,h=v=>!!v.first_seen&&this._now-Date.parse(v.first_seen)<b*864e5,f=l.filter(v=>v.name),_=f.filter(v=>v.favorite).length,$=f.filter(h).length,S=this._outfitQuery.trim().toLowerCase(),g=[...f.filter(v=>this._lockerFilter!=="favorites"||v.favorite).filter(v=>this._lockerFilter!=="new"||h(v)).filter(v=>!S||String(v.name).toLowerCase().includes(S)||String(v.set||"").toLowerCase().includes(S))].sort((v,z)=>{if(v.id?.toLowerCase()===i)return-1;if(z.id?.toLowerCase()===i)return 1;if(this._outfitSort==="rarity"){let P=u.indexOf(this._outfitRarity(v)),F=u.indexOf(this._outfitRarity(z));return(P<0?99:P)-(F<0?99:F)||String(v.name).localeCompare(String(z.name))}return String(v.name).localeCompare(String(z.name))}),m=this._config.compact?18:24,A=Math.max(1,Math.ceil(g.length/m)),w=Math.min(this._outfitPage,A-1),C=g.slice(w*m,w*m+m),M=new Map;for(let v of f)M.set(this._outfitRarity(v)||"Other",(M.get(this._outfitRarity(v)||"Other")||0)+1);return r`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${L[this._outfitRarity(a)]||"var(--accent)"}">
          <div class="locker-hero-img">
            ${a?.icon?r`<img src=${a.icon} alt="" @error=${E} />`:r`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Avatar${s?" \xB7 this card uses its own skin setting":""}</div>
            <div class="bp-hero-name">${a?.name||(i?"Unknown outfit":"Not chosen")}</div>
            <div class="bp-hero-meta">
              ${a?.rarity?r`<span>${this._outfitRarity(a)}</span>`:c}
              ${i?r`<button class="link-button" ?disabled=${this._loadingAction==="set_avatar"} @click=${()=>this._setAvatar(null)}>Clear</button>`:r`<span class="muted">Tap an outfit below to use it</span>`}
            </div>
            <div class="bp-hero-types">
              <b>${this._num(f.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${u.filter(v=>M.get(v)).map(v=>r`<span class="rarity-dot" style="--rarity:${L[v]}" title=${v}>${M.get(v)}</span>`)}
            </div>
          </div>
        </div>

        <div class="locker-controls">
          <input class="locker-search" type="search" placeholder="Search outfits or sets" .value=${this._outfitQuery}
            @input=${v=>{this._outfitQuery=v.target.value,this._outfitPage=0}} />
          <button class="mini-button ${this._outfitSort==="rarity"?"active":""}" @click=${()=>{this._outfitSort="rarity",this._outfitPage=0}}>Rarity</button>
          <button class="mini-button ${this._outfitSort==="name"?"active":""}" @click=${()=>{this._outfitSort="name",this._outfitPage=0}}>A–Z</button>
        </div>
        <div class="mode-tabs">
          ${["all","favorites","new"].map(v=>r`
            <button class="mode-tab ${this._lockerFilter===v?"active":""}" @click=${()=>{this._lockerFilter=v,this._outfitPage=0}}>
              ${v==="all"?"All":v==="favorites"?`\u2605 Favourites (${_})`:`\u2728 New (${$})`}</button>`)}
        </div>

        ${C.length?r`<div class="bp-rewards locker-grid">
              ${C.map(v=>{let z=String(v.id||"").toLowerCase(),P=z===i,F=this._selectedOutfit===z;return r`
                  <div class="bp-reward locker-tile ${P?"equipped":""} ${F?"selected":""}" style="--rarity:${L[this._outfitRarity(v)]||"#9CA3AF"}"
                    title="${v.name}${v.set?` \xB7 ${v.set}`:""}" role="button" tabindex="0"
                    @click=${()=>this._selectedOutfit=F?null:z}>
                    <div class="bp-reward-img locker-img">
                      ${v.small||v.icon?r`<img src=${v.small||v.icon} alt="" loading="lazy" @error=${E} />`:r`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${P?r`<span class="bp-cost included">Avatar</span>`:c}
                      ${v.favorite?r`<span class="locker-fav">★</span>`:c}
                      ${h(v)?r`<span class="locker-new">✨ New</span>`:c}
                      ${F?r`<div class="locker-actions">
                            ${P?c:r`<button class="locker-use" ?disabled=${this._loadingAction==="set_avatar"}
                                  @click=${Q=>{Q.stopPropagation(),this._setAvatar(z)}}>
                                  ${this._loadingAction==="set_avatar"?"Saving\u2026":"Use as avatar"}</button>`}
                            <button class="locker-use fav" @click=${Q=>{Q.stopPropagation(),this._setFavorite(z,!v.favorite)}}>
                              ${v.favorite?"\u2606 Unfavourite":"\u2605 Favourite"}</button>
                          </div>`:c}
                    </div>
                    <span class="bp-reward-name">${v.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(v)||"Outfit"}</span>
                  </div>`})}
            </div>`:r`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${A>1?r`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${w===0} @click=${()=>this._outfitPage=w-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${w+1} of ${A} · ${g.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${w>=A-1} @click=${()=>this._outfitPage=w+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:c}
      </div>
    `}async _loadShop(t=!1){if(!(!this.hass||this._shop.loading||!t&&(this._shop.data!==void 0||this._shop.error))){this._shop={...this._shop,loading:!0};try{this._shop={data:await this.hass.callWS({type:"fortnite_activity/shop",player_id:this._player})}}catch(e){this._shop={error:e?.message||"Item Shop unavailable"}}}}async _toggleWishlist(t,e){let a=String(t.key||t.id||"").toLowerCase();if(a){this._loadingAction=`wish:${a}`;try{await this.hass.callService("fortnite_activity",e?"wishlist_add":"wishlist_remove",{player_id:this._player,cosmetic_id:a,...e?Object.fromEntries(Object.entries({name:t.name,icon:t.icon,type:t.type,rarity:t.rarity}).filter(([,i])=>typeof i=="string"&&i)):{}}),this._searchResults=(this._searchResults||[]).map(i=>String(i.key).toLowerCase()===a?{...i,wishlisted:e}:i),await this._loadShop(!0)}catch(i){console.error("Wishlist update failed:",i)}finally{this._loadingAction=null}}}async _searchCosmetics(){let t=this._searchQuery.trim();if(t.length<2){this._searchResults=null;return}this._searchLoading=!0;try{let e=await this.hass.callWS({type:"fortnite_activity/cosmetic_search",query:t,player_id:this._player,...this._searchType!=="all"?{cosmetic_type:this._searchType}:{}});this._searchQuery.trim()===t&&(this._searchResults=e?.results||[])}catch{this._searchResults=[]}finally{this._searchLoading=!1}}_wishButton(t,e){let a=String(t.key||t.id||"").toLowerCase();return r`<button class="wish-btn ${e?"on":""}" title=${e?"Remove from wishlist":"Add to wishlist"}
      ?disabled=${this._loadingAction===`wish:${a}`}
      @click=${i=>{i.stopPropagation(),this._toggleWishlist(t,!e)}}>
      <ha-icon icon=${e?"mdi:heart":"mdi:heart-outline"}></ha-icon></button>`}_renderShopView(){let t=this._shop;if(t.loading&&t.data===void 0)return r`<div class="empty">Loading the Item Shop…</div>`;if(t.error)return r`<div class="empty">${t.error}</div>`;let e=t.data?.shop,a=t.data?.wishlist||[],i=t.data?.in_shop||[],s=(o,l)=>r`
      <button class="mode-tab ${this._shopTab===o?"active":""}" @click=${()=>this._shopTab=o}>${l}</button>`;return r`
      ${i.length?r`<div class="shop-alert">
            <ha-icon icon="mdi:heart"></ha-icon>
            <span><b>${i.length===1?i[0].name:`${i.length} wishlist items`}</b> ${i.length===1?"is":"are"} in the shop today!</span>
          </div>`:c}
      <div class="mode-tabs shop-tabs">
        ${s("today","Today's shop")}
        ${s("wishlist",r`♥ Wishlist${a.length?` (${a.length})`:""}`)}
      </div>
      ${this._shopTab==="wishlist"?this._renderWishlist(a,i):this._renderShopToday(e)}
    `}_renderShopToday(t){if(!t)return r`<div class="empty">The Item Shop will show here soon.</div>`;let e=this._shopQuery.trim().toLowerCase(),a=(t.sections||[]).map(s=>({...s,offers:s.offers.filter(o=>!e||String(o.title).toLowerCase().includes(e)||o.items.some(l=>String(l.name||"").toLowerCase().includes(e)))})).filter(s=>s.offers.length),i=t.expiration?Date.parse(t.expiration)-this._now:null;return r`
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Search today's shop" .value=${this._shopQuery}
          @input=${s=>this._shopQuery=s.target.value} />
        ${i&&i>0?r`<span class="muted">New shop in ${this._formatSpan(i)}</span>`:c}
      </div>
      ${a.length?a.map(s=>r`
            <div class="section-title">${s.name}</div>
            <div class="shop-grid">
              ${s.offers.map(o=>{let l=o.items[0]||{};return r`
                  <div class="shop-tile ${o.owned?"owned":""} ${o.wishlisted?"wish":""}" style="--rarity:${L[this._outfitRarity(l)]||"#9CA3AF"}"
                    title="${o.title}${o.items.length>1?` \xB7 ${o.items.map(u=>u.name).join(", ")}`:""}">
                    <div class="shop-img">
                      ${o.image?r`<img src=${o.image} alt="" loading="lazy" @error=${E} />`:r`<ha-icon icon="mdi:shopping-outline"></ha-icon>`}
                      ${o.owned?r`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(l,!!l.wishlisted)}
                      ${o.bundle?r`<span class="shop-bundle">Bundle · ${o.items.length}</span>`:c}
                    </div>
                    <span class="bp-reward-name">${o.title}</span>
                    <span class="shop-price">Ⓥ ${this._num(o.price)}${o.regular_price&&o.regular_price>o.price?r` <s>${this._num(o.regular_price)}</s>`:c}</span>
                  </div>`})}
            </div>`):r`<div class="empty">Nothing in today's shop matches “${this._shopQuery}”.</div>`}
    `}_renderWishlist(t,e){let a=new Set(e.map(s=>s.id)),i=(s,o)=>r`
      <button class="mode-tab ${this._searchType===s?"active":""}" @click=${()=>{this._searchType=s,this._searchCosmetics()}}>${o}</button>`;return r`
      <div class="section-title">Find any skin or item</div>
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Type a name, e.g. Peely" .value=${this._searchQuery}
          @input=${s=>{this._searchQuery=s.target.value,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>this._searchCosmetics(),400)}} />
      </div>
      <div class="mode-tabs">${i("outfit","Outfits")} ${i("all","Everything")}</div>
      ${this._searchLoading?r`<div class="empty">Searching…</div>`:c}
      ${this._searchResults?this._searchResults.length?r`<div class="bp-rewards locker-grid">
              ${this._searchResults.map(s=>r`
                <div class="bp-reward" style="--rarity:${L[this._outfitRarity(s)]||"#9CA3AF"}" title=${s.name}>
                  <div class="bp-reward-img locker-img">
                    ${s.icon?r`<img src=${s.icon} alt="" loading="lazy" @error=${E} />`:r`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                    ${s.owned?r`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(s,!!s.wishlisted)}
                  </div>
                  <span class="bp-reward-name">${s.name}</span>
                  <span class="bp-reward-type">${s.owned?"Owned":s.type||this._outfitRarity(s)}</span>
                </div>`)}
            </div>`:r`<div class="empty">No matches.</div>`:c}

      <div class="section-title">Your wishlist</div>
      ${t.length?r`<div class="bp-rewards locker-grid">
            ${t.map(s=>r`
              <div class="bp-reward ${a.has(s.id)?"in-shop":""}" style="--rarity:${L[this._outfitRarity(s)]||"#9CA3AF"}" title=${s.name||s.id}>
                <div class="bp-reward-img locker-img">
                  ${s.icon?r`<img src=${s.icon} alt="" loading="lazy" @error=${E} />`:r`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                  ${this._wishButton(s,!0)}
                  ${a.has(s.id)?r`<span class="shop-bundle in">In shop!</span>`:c}
                </div>
                <span class="bp-reward-name">${s.name||s.id}</span>
                <span class="bp-reward-type">${a.has(s.id)?"Available now":s.type||"Waiting"}</span>
              </div>`)}
          </div>`:r`<div class="empty">Tap ♡ on any skin to get told when it is in the shop.</div>`}
    `}async _loadNews(){if(!(!this.hass||this._news.loading||this._news.data!==void 0||this._news.error)){this._news={loading:!0};try{this._news={data:await this.hass.callWS({type:"fortnite_activity/news",player_id:this._player})}}catch(t){this._news={error:t?.message||"News unavailable"}}}}_renderNewsView(){let t=this._news;if(t.loading||t.data===void 0&&!t.error)return r`<div class="empty">Loading news…</div>`;if(t.error)return r`<div class="empty">${t.error}</div>`;let e=t.data?.news||[],a=t.data?.update,i=t.data?.season||this._catalog.season;return r`
      ${a||i?r`<div class="news-update">
            <ha-icon icon="mdi:update"></ha-icon>
            <div>
              <b>${a?.chapter&&a?.season?`Chapter ${a.chapter} \xB7 Season ${a.season}`:i?.number?`Season ${i.number}`:"Current update"}</b>
              <span>
                ${a?.patch||a?.version?`Update ${a.patch||a.version}`:""}${a?.release_date?` \xB7 out ${this._formatWhen(a.release_date)}`:""}
                ${i?.days_left!=null?` \xB7 season ends in ${i.days_left} days`:""}
              </span>
            </div>
          </div>`:c}
      ${this._sectionsHas("events")?c:this._renderNextEventTeaser()}
      ${e.length?r`<div class="news-list">
            ${e.map(s=>r`
              <div class="news-card">
                ${s.image||s.tile?r`<img src=${s.image||s.tile} alt="" loading="lazy" @error=${E} />`:c}
                <div class="news-body">
                  ${s.tag?r`<span class="tag">${s.tag}</span>`:c}
                  <b>${s.title}</b>
                  ${s.body?r`<p>${s.body}</p>`:c}
                </div>
              </div>`)}
          </div>`:r`<div class="empty">No news right now.</div>`}
    `}_sectionsHas(t){return this._sections.includes(t)}_renderNextEventTeaser(){let e=(this._events.list||[]).filter(i=>this._matchesFilters(i,this._currentFilters())).find(i=>i.windows.some(s=>this._windowState(s)!=="finished"));if(!e)return c;let a=this._eventTiming(e);return r`<div class="news-update event">
      ${e.poster?r`<img src=${e.poster} alt="" @error=${E} />`:r`<ha-icon icon="mdi:tournament"></ha-icon>`}
      <div><b>${e.name}</b><span>${a.text}</span></div>
    </div>`}async _loadMap(t=this._mapMode){if(!(!this.hass||this._maps[t]?.loading||this._maps[t]?.data!==void 0)){this._maps={...this._maps,[t]:{loading:!0}};try{let e=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,mode:t});this._maps={...this._maps,[t]:{data:e?.map??null}}}catch(e){this._maps={...this._maps,[t]:{error:e?.message||"Map unavailable"}}}}}async _loadMatchMap(t){let e=`playlist:${t}`;if(!(!this.hass||this._maps[e])){this._maps={...this._maps,[e]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,playlist_id:t});this._maps={...this._maps,[e]:{data:a?.map??null}}}catch{this._maps={...this._maps,[e]:{data:null}}}}}_matchMap(t){let e=this._maps[`playlist:${t.playlist_id}`]?.data;return e||(t.mode_category==="build"||t.mode_category==="zero_build")&&this._maps.br?.data||null}_poiPos(t,e){let a=t?.bounds;if(!a||a.maxX===a.minX||a.maxY===a.minY)return null;let i=(e.y-a.minY)/(a.maxY-a.minY)*100,s=(1-(e.x-a.minX)/(a.maxX-a.minX))*100;return i<0||i>100||s<0||s>100?null:{left:i,top:s}}_renderMapImage(t,e=!1){let a=(t.pois||[]).filter(i=>/poi|landmark|named/i.test(String(i.type||""))||!i.type);return r`
      <div class="map-frame ${e?"compact":""}">
        <img src=${t.image} alt=${t.name||"Map"} loading="lazy" @error=${E} />
        ${e?c:a.map(i=>{let s=this._poiPos(t,i);return s?r`<span class="map-poi ${this._mapPoi===i.name?"on":""}" style="left:${s.left}%;top:${s.top}%"
                    title=${i.name} @click=${()=>this._mapPoi=this._mapPoi===i.name?null:i.name}>
                    <i></i><b>${i.name}</b></span>`:c})}
      </div>
    `}_renderMapView(){let e=this._maps.br?.data?.modes||[],a=this._maps[this._mapMode]||{};if(a.loading||a.data===void 0)return r`<div class="empty">Loading map…</div>`;if(a.error)return r`<div class="empty">${a.error}</div>`;let i=a.data;if(!i)return r`<div class="empty">The map will show here soon.</div>`;let s=l=>l==="br"?"Battle Royale":l==="og"?"OG":l.startsWith("rotating:")?this._maps[l]?.data?.name||l.split(":")[1].replace(/^\w/,u=>u.toUpperCase()):l,o=(i.pois||[]).filter(l=>/poi|landmark|named/i.test(String(l.type||""))||!l.type);return r`
      ${e.length>1?r`<div class="mode-tabs">
            ${e.map(l=>r`<button class="mode-tab ${this._mapMode===l?"active":""}" @click=${()=>{this._mapMode=l,this._loadMap(l)}}>${s(l)}</button>`)}
          </div>`:c}
      <div class="map-head">
        <b>${i.name||s(this._mapMode)}</b>
        <span class="muted">${i.chapter&&i.season?`Chapter ${i.chapter} \xB7 Season ${i.season}`:""}${i.patch?` \xB7 ${i.patch}`:""}</span>
      </div>
      ${this._renderMapImage(i)}
      ${o.length?r`<div class="section-title">Places (${o.length})</div>
            <div class="poi-list">
              ${[...o].sort((l,u)=>l.name.localeCompare(u.name)).map(l=>r`
                <button class="tag poi-chip ${this._mapPoi===l.name?"on":""}" @click=${()=>this._mapPoi=this._mapPoi===l.name?null:l.name}>${l.name}</button>`)}
            </div>`:c}
    `}_spriteCurve(t){let e=[...t.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,s)=>i.level-s.level),a=[];for(let i of e){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(t,e){if(typeof t!="number"||!e.length)return null;let a=0;e.forEach(([,l],u)=>{t>=l&&(a=u)});let[i]=e[a],s=e[e.length-1],o=e[a+1];return{level:i,maxLevel:s[0],maxXp:s[1],next:o?o[1]:null,toMax:Math.max(0,s[1]-t),atMax:a===e.length-1}}_spriteInfo(t,e){let a=t.variants||[],i=a.filter(u=>u.owned),s=a.filter(u=>u.mastered).length,o=null;for(let u of i){let b=this._spriteLevel(u.xp,e);b&&(!o||b.level>o.level)&&(o=b)}let l=i.reduce((u,b)=>u+Math.max(1,Number(b.count)||0),0);return{owned:i.length,total:a.length,mastered:s,best:o,copies:l}}_spriteName(t){return String(t.name||"").replace(/ Sprite$/,"")}_renderSpritesView(t){let e=t?.attributes||{},a=this._spriteCurve(e),i=e.families||[],s=Number(t?.state||0),o=Number(e.owned_variants||0),l=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],u=i.filter(d=>d.mastered>0).length,h=[...i.filter(d=>this._spriteFilter==="missing"?!d.owned:this._spriteFilter==="unmastered"?d.owned&&!d.mastered:this._spriteFilter==="mastered"?d.mastered>0:!0)].sort((d,g)=>this._spriteSort==="rarity"?l.indexOf(g.rarity)-l.indexOf(d.rarity)||(d.dex??0)-(g.dex??0):this._spriteSort==="progress"&&g.owned_variants/g.total_variants-d.owned_variants/d.total_variants||(d.dex??0)-(g.dex??0)),f=i.flatMap(d=>d.variants.filter(g=>!g.owned&&g.drop_chance_pct).map(g=>({f:d,v:g}))).sort((d,g)=>g.v.drop_chance_pct-d.v.drop_chance_pct||l.indexOf(d.f.rarity)-l.indexOf(g.f.rarity)).slice(0,6),_=a.length?i.flatMap(d=>d.variants.filter(g=>g.owned&&typeof g.xp=="number"&&g.xp>0).map(g=>({f:d,v:g,lv:this._spriteLevel(g.xp,a)}))).filter(d=>d.lv&&!d.lv.atMax).sort((d,g)=>d.lv.toMax-g.lv.toMax).slice(0,5):[],$=(d,g)=>r`
      <button class="mode-tab ${this._spriteFilter===d?"active":""}" @click=${()=>this._spriteFilter=d}>${g}</button>`,S=(d,g)=>r`
      <button class="mode-tab ${this._spriteSort===d?"active":""}" @click=${()=>this._spriteSort=d}>${g}</button>`;return r`
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,s)}"><span>${Math.round(s)}%</span></div>
        <div class="sp-stat">
          <b>${e.owned_families??0}<small>/${e.total_families??i.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${u}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${o}<small>/${e.total_variants??0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${_.length?r`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${_.map(({f:d,v:g,lv:m})=>r`
                <div class="master-row" style="--rarity:${L[d.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=d.id}>
                  ${g.icon?r`<img src=${g.icon} alt="" @error=${E} />`:c}
                  <span class="variant-name">${g.label==="Base"?this._spriteName(d):`${g.label} ${this._spriteName(d)}`}</span>
                  <span class="sp-level-pill">Level ${m.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,g.xp/m.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(m.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:c}

      ${f.length?r`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${f.map(({f:d,v:g})=>r`
                <div class="hunt-item" style="--rarity:${L[d.rarity]||"#9CA3AF"}" title="${g.name}" @click=${()=>this._expandedSprite=d.id}>
                  ${g.icon?r`<img src=${g.icon} alt="" @error=${E} />`:c}
                  <span>${g.label==="Base"?this._spriteName(d):`${g.label} ${this._spriteName(d)}`}</span>
                  <small>${g.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`:c}

      <div class="tab-rows">
        <div class="mode-tabs">${$("all","All")} ${$("mastered","\u2B50 Mastered")} ${$("unmastered","Not mastered")} ${$("missing","Not found")}</div>
        <div class="mode-tabs">${S("dex","Number")} ${S("rarity","Rarity")} ${S("progress","Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${h.length?h.map(d=>{let g=this._expandedSprite===d.id,m=this._spriteInfo(d,a),A=m.mastered?r`<span class="sp-status gold">⭐ Mastered</span>`:d.owned?r`<span class="sp-status">Not mastered</span>`:r`<span class="sp-status dim">Not found yet</span>`,w=d.owned?r`<span class="sp-have">Have ${m.copies}${m.best?r` · <span class=${m.best.atMax?"sp-max":""} title=${m.best.atMax?"Top level":""}>Lv ${m.best.level}</span>`:c}</span>`:c;return r`
                <div class="sp-card ${d.owned?"":"missing"} ${m.mastered?"mastered":""} ${g?"open":""}"
                  style="--rarity:${L[d.rarity]||"#9CA3AF"}" role="button" tabindex="0"
                  @click=${()=>this._expandedSprite=g?null:d.id}>
                  <div class="sp-img">
                    ${d.icon?r`<img src=${d.icon} alt="" @error=${E} />`:r`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${m.mastered?r`<span class="sp-badge star" title="Mastered">⭐</span>`:c}
                    ${d.owned?c:r`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                  </div>
                  <span class="sp-name">${this._spriteName(d)}</span>
                  ${A}
                  ${w}
                  <div class="sp-kinds" title="${m.owned} of ${m.total} kinds">
                    ${(d.variants||[]).map(C=>r`
                      <span class="sp-kind ${C.owned?"owned":""} ${C.mastered?"mastered":""}" title="${C.label}${C.owned?"":" (not found yet)"}">
                        ${C.icon?r`<img src=${C.icon} alt="" @error=${E} />`:c}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${m.owned} of ${m.total} kinds</span>
                </div>
                ${g?this._renderSpriteDetail(d):c}`}):r`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${(e.versions||[]).length>1?r`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${e.versions.map(d=>r`
              <div class="version-row ${d.current?"current":""}">
                <span>${d.current?"This season":d.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,d.completion_pct)}%"></div></div>
                <span>${d.owned_variants}/${d.total_variants}</span>
              </div>`)}
          </div>`:c}
    `}_renderSpriteDetail(t){let e=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{}),a=t.name;return r`
      <div class="sprite-detail sp-detail" style="--rarity:${L[t.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${t.icon_large||t.icon?r`<img src=${t.icon_large||t.icon} alt="" @error=${E} />`:c}
          <div>
            <b>${t.name}</b> <span class="tag rarity-tag">${t.rarity||""}</span>
            ${t.description?r`<p class="detail-desc">${t.description}</p>`:c}
            ${t.hint?r`<p class="detail-desc hint">📍 ${t.hint}</p>`:c}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(t.variants||[]).map(i=>{let s=i.owned?this._spriteLevel(i.xp,e):null,o=(i.boons||[]).find(u=>u.name&&u.name!==a),l=Math.max(1,Number(i.count)||0);return r`
              <div class="sp-kind-row ${i.owned?"":"missing"} ${i.mastered?"mastered":""}">
                <div class="sp-kind-icon">
                  ${i.icon?r`<img src=${i.icon} alt="" @error=${E} />`:r`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${i.owned?c:r`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${i.label}</b>
                    ${i.mastered?r`<span class="sp-chip gold">⭐ Mastered</span>`:c}
                    ${i.owned?r`<span class="sp-chip">You have ${l}</span>`:r`<span class="sp-chip dim">Not found yet</span>`}
                    ${s?r`<span class="sp-chip">Level ${s.level}${s.atMax?" \xB7 max":""}</span>`:c}
                    ${!i.owned&&i.drop_chance_pct!=null?r`<span class="sp-chip dim">${i.drop_chance_pct}% chance</span>`:c}
                  </div>
                  ${s&&!s.atMax&&s.next?r`<div class="sp-xp">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,i.xp/s.next*100)}%"></div></div>
                        <span>${this._num(i.xp)} / ${this._num(s.next)} XP to level ${s.level+1}</span>
                      </div>`:c}
                  ${o?r`<div class="sp-perk">✨ ${o.description||o.name}</div>`:c}
                </div>
              </div>`})}
        </div>
      </div>
    `}_renderWindowMatches(t,e,a){let i=`window:${t}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let s=this._matchLists[i],o=s?.matches||[],l=s?.tracked??0,u=a.matches||0;return r`
      <div class="match-feed-header">
        <span>${e} matches (${l}${u>l?` of ${u}`:""})</span>

      </div>
      ${s?.loading?r`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,o,r`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(t,e){let a=this._playlist(t.playlist_id),i=a?.image,s=/ropesmile|reload/i.test(t.playlist_id+t.name)?"reload":/nobuild|zero build/i.test(t.playlist_id+t.name)?"zero_build":"build";return r`
      <div class="feature-card ${i?"":`no-art art-${s}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${e?` \xB7 ${e}`:""}</span>
          <span class="feature-value">${a?.name||t.name}</span>
          <span class="feature-sub">${this._num(t.matches)} matches</span>
        </div>
        ${i?r`<img class="feature-art" src=${i} alt="" @error=${E} />`:r`<ha-icon class="feature-icon" icon=${Se[s]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(t){let e=t.metrics||{},a=Object.values(t.inputs||{}).filter(s=>s.share_pct>=1),i=t.team_sizes||{};return r`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",e.kills_per_minute??0],["Avg Match",`${e.avg_match_minutes??0}m`],["Score/Match",this._num(e.score_per_match)],["Solo Top 10",`${e.solo_top10_rate??0}%`],["Solo Top 25",`${e.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?r`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((s,o)=>r`<div class="split-seg seg-${o}" style="width: ${s.share_pct}%" title="${s.label}: ${s.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((s,o)=>r`<span><i class="dot seg-${o}"></i>${s.label} ${s.share_pct}% · K/D ${s.kd}</span>`)}
            </div>
          </div>`:c}

      ${Object.keys(i).length?r`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(s=>i[s]).map(s=>r`<div class="size-row">
                <span class="size-name">${s.charAt(0).toUpperCase()+s.slice(1)}</span>
                <span>${this._num(i[s].matches)} m</span>
                <span>${i[s].win_rate}% win</span>
                <span>${i[s].kd} K/D</span>
              </div>`)}
          </div>`:c}
    `}_defaultFilters(){let t=this._config.events_region||this._events.defaultRegion||"EU";return{region:t==="all"?[]:[t],type:[],mode:[],team:[],platform:[]}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(t,e){return!(e.region.length&&!e.region.includes(t.region_group)||e.type.length&&!e.type.includes(t.tournament_type)||e.mode.length&&!e.mode.some(a=>a==="Ranked"?t.ranked:t.mode===a)||e.team.length&&!e.team.includes(t.team)||e.platform.length&&!e.platform.some(a=>(t.platform_groups||[]).includes(a)))}_toggleFilter(t,e){let a=this._currentFilters(),i=a[t].includes(e)?a[t].filter(s=>s!==e):[...a[t],e];this._filters={...a,[t]:i}}_renderEventsView(){let t=this._events;if(t.loading&&!t.list)return r`<div class="empty">Loading tournaments…</div>`;if(t.error)return r`<div class="empty">${t.error}</div>`;if(t.list===null)return r`<div class="empty">Tournaments will show here soon.</div>`;let e=t.list||[],a=this._currentFilters(),i=[...new Set(e.map(h=>h.region_group))].sort(),s=e.filter(h=>this._matchesFilters(h,a)).filter(h=>h.windows.some(f=>this._windowState(f)!=="finished")||this._expandedEvent===h.key),o=[["region","Region",i.map(h=>[h,h])],["type","Type",[...new Set(e.map(h=>h.tournament_type).filter(Boolean))].map(h=>[h,Xt[h]||h])],["mode","Mode",[["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked"]]],["team","Team",[["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]]],["platform","Platform",[["PC","PC"],["Console","Console"],["Mobile","Mobile"]]]],l=(h,f)=>o.find(_=>_[0]===h)?.[2].find(_=>_[0]===f)?.[1]||f,u=o.flatMap(([h])=>a[h].map(f=>[h,f])),b=JSON.stringify(a)!==JSON.stringify(this._defaultFilters());return r`
      <div class="filter-bar">
        <button class="filter-toggle ${this._filtersOpen?"open":""}" @click=${()=>this._filtersOpen=!this._filtersOpen}>
          <ha-icon icon="mdi:filter-variant"></ha-icon><span>Filters</span>${u.length?r`<b>${u.length}</b>`:c}
        </button>
        <div class="filter-active">
          ${u.length?u.map(([h,f])=>r`<button class="fchip on" title="Remove" @click=${()=>this._toggleFilter(h,f)}>${l(h,f)} ✕</button>`):r`<span class="muted">All tournaments</span>`}
        </div>
        ${b?r`<button class="filter-reset" @click=${()=>this._filters=null} title="Reset filters"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button>`:c}
      </div>
      ${this._filtersOpen?r`<div class="filter-panel">
            ${o.map(([h,f,_])=>_.length?r`<div class="fgroup"><span>${f}</span><div>
                  ${_.map(([$,S])=>r`<button class="fchip ${a[h].includes($)?"on":""}" @click=${()=>this._toggleFilter(h,$)}>${S}</button>`)}
                </div></div>`:c)}
          </div>`:c}
      <div class="match-feed-header">
        <span>Tournaments (${s.length})</span>
        <span class="muted">UK time</span>
      </div>
      <div class="match-list events">
        ${s.length?s.map(h=>this._renderEvent(h)):r`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(t){let e=t.windows.find(o=>this._windowState(o)==="live");if(e)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(e.end)-this._now)}`,live:!0,soon:!1};let a=t.windows.find(o=>this._windowState(o)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,s=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${s?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:s}}_renderEvent(t){let e=this._eventTiming(t),a=this._expandedEvent===t.key,i=t.tournament_type?Xt[t.tournament_type]||t.tournament_type:null,s=[t.mode,t.team,t.ranked&&t.tournament_type!=="RankedCup"?"Ranked":null,...t.platform_groups||[],t.region].filter(Boolean);return r`
      <div class="event-card ${e.live?"live":""} ${a?"expanded":""} ${t.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(t)}>
          ${t.poster?r`<img class="event-art" src=${t.poster} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${t.name}</span>
              ${e.live?r`<span class="placement-badge win">LIVE</span>`:c}
            </div>
            <span class="match-mode ${e.soon?"soon":""}">${e.text}</span>
            <div class="tag-row">
              ${i?r`<span class="tag type-tag ${t.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:c}
              ${t.can_spectate?r`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>`:c}
              ${s.map(o=>r`<span class="tag">${o}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(t):c}
      </div>
    `}_renderEventDetails(t){let e=t.loading_screen||t.poster;return r`
      <div class="event-details">
        ${e?r`<img class="event-hero" src=${e} alt="" @error=${E} />`:c}
        ${t.subtitle&&t.subtitle!==t.name?r`<div class="detail-sub">${t.subtitle}</div>`:c}
        ${t.description?r`<p class="detail-desc">${t.description}</p>`:c}
        ${t.schedule_info?r`<p class="detail-desc muted">${t.schedule_info}</p>`:c}
        ${t.platform_groups?.length?r`<div class="detail-line"><span>Platforms</span><b>${t.platform_groups.join(", ")}</b></div>`:c}
        <div class="detail-line"><span>Region</span><b>${t.region}</b></div>
        ${t.min_account_level?r`<div class="detail-line"><span>Minimum account level</span><b>${t.min_account_level}</b></div>`:c}
        ${t.tournament_type==="FNCS"?r`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`:c}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${t.windows.map(a=>{let i=this._windowState(a),s=`${t.event_id}|${a.window_id}`,o=this._leaderboards[s],l=Date.parse(a.begin)-this._now;return r`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":l<7*864e5?`in ${this._formatSpan(l)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?r`<button class="mini-button" @click=${()=>this._loadLeaderboard(t.event_id,a.window_id)}>
                        ${o?.loading?"Loading\u2026":o?.data?"Refresh":"Leaderboard"}
                      </button>`:c}
                </div>
                ${o?this._renderLeaderboard(o):c}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(t){if(t.error)return r`<div class="lb-note">${t.error}</div>`;if(!t.data)return t.loading?r`<div class="lb-note">Loading leaderboard…</div>`:c;let e=t.data,a=(i,s=!1)=>r`
      <div class="lb-row ${s?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${s?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return r`
      <div class="leaderboard">
        ${e.player&&!e.entries.some(i=>i.is_player)?a(e.player,!0):c}
        ${e.entries.length?e.entries.map(i=>a(i,i.is_player)):r`<div class="lb-note">No scores yet.</div>`}
        ${e.updated?r`<div class="lb-note">Updated ${this._formatRelativeTime(e.updated)}${e.total_pages?` \xB7 ${e.total_pages} pages`:""}</div>`:c}
      </div>
    `}};x([N({attribute:!1})],k.prototype,"hass",2),x([y()],k.prototype,"_config",2),x([y()],k.prototype,"_view",2),x([y()],k.prototype,"_window",2),x([y()],k.prototype,"_selectedMode",2),x([y()],k.prototype,"_loadingAction",2),x([y()],k.prototype,"_catalog",2),x([y()],k.prototype,"_avatar",2),x([y()],k.prototype,"_events",2),x([y()],k.prototype,"_filters",2),x([y()],k.prototype,"_expandedEvent",2),x([y()],k.prototype,"_expandedMatch",2),x([y()],k.prototype,"_leaderboards",2),x([y()],k.prototype,"_now",2),x([y()],k.prototype,"_matchLists",2),x([y()],k.prototype,"_showAllMatches",2),x([y()],k.prototype,"_expandedSprite",2),x([y()],k.prototype,"_spriteFilter",2),x([y()],k.prototype,"_spriteSort",2),x([y()],k.prototype,"_trends",2),x([y()],k.prototype,"_pass",2),x([y()],k.prototype,"_passSet",2),x([y()],k.prototype,"_passPage",2),x([y()],k.prototype,"_outfits",2),x([y()],k.prototype,"_outfitQuery",2),x([y()],k.prototype,"_outfitSort",2),x([y()],k.prototype,"_outfitPage",2),x([y()],k.prototype,"_selectedOutfit",2),x([y()],k.prototype,"_lockerFilter",2),x([y()],k.prototype,"_shop",2),x([y()],k.prototype,"_shopTab",2),x([y()],k.prototype,"_shopQuery",2),x([y()],k.prototype,"_searchQuery",2),x([y()],k.prototype,"_searchType",2),x([y()],k.prototype,"_searchResults",2),x([y()],k.prototype,"_searchLoading",2),x([y()],k.prototype,"_news",2),x([y()],k.prototype,"_maps",2),x([y()],k.prototype,"_mapMode",2),x([y()],k.prototype,"_mapPoi",2),x([y()],k.prototype,"_filtersOpen",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",k);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${$e} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{k as FortniteActivityCard};
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
