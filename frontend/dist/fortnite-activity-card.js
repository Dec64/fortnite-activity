var ce=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var Pe=(i,e,t)=>e in i?ce(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var g=(i,e,t,s)=>{for(var a=s>1?void 0:s?Me(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(a=(s?o(e,t,a):o(a))||a);return s&&a&&ce(e,t,a),a};var de=(i,e,t)=>Pe(i,typeof e!="symbol"?e+"":e,t);var I=globalThis,V=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),pe=new WeakMap,U=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&pe.set(t,e))}return e}toString(){return this.cssText}},he=i=>new U(typeof i=="string"?i:i+"",void 0,Z),D=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,a,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[r+1],i[0]);return new U(t,i,Z)},ue=(i,e)=>{if(V)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),a=I.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,i.appendChild(s)}},Q=V?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return he(t)})(i):i;var{is:Re,defineProperty:Te,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:De,getOwnPropertySymbols:Oe,getPrototypeOf:Ne}=Object,q=globalThis,be=q.trustedTypes,ze=be?be.emptyScript:"",He=q.reactiveElementPolyfillSupport,O=(i,e)=>i,N={toAttribute(i,e){switch(e){case Boolean:i=i?ze:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},K=(i,e)=>!Re(i,e),fe={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=fe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Te(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){let{get:a,set:r}=Ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){let l=a?.call(this);r?.call(this,o),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??fe}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let e=Ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let t=this.properties,s=[...De(t),...Oe(t)];for(let a of s)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let a of s)t.unshift(Q(a))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:N).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let r=s.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:N;this._$Em=a;let l=o.fromAttribute(t,r.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(e,t,s,a=!1,r){if(e!==void 0){let o=this.constructor;if(a===!1&&(r=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??K)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:r},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[a,r]of s){let{wrapped:o}=r,l=this[a];o!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,r,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[O("elementProperties")]=new Map,y[O("finalized")]=new Map,He?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var re=globalThis,me=i=>i,W=re.trustedTypes,ge=W?W.createPolicy("lit-html",{createHTML:i=>i}):void 0,ke="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+$,Le=`<${we}>`,S=document,H=()=>S.createComment(""),L=i=>i===null||typeof i!="object"&&typeof i!="function",oe=Array.isArray,Fe=i=>oe(i)||typeof i?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,_e=/>/g,k=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,$e=/"/g,Se=/^(?:script|style|textarea|title)$/i,ne=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),u=ne(1),Qe=ne(2),Xe=ne(3),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),xe=new WeakMap,w=S.createTreeWalker(S,129);function Ae(i,e){if(!oe(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(e):e}var Be=(i,e)=>{let t=i.length-1,s=[],a,r=e===2?"<svg>":e===3?"<math>":"",o=z;for(let l=0;l<t;l++){let n=i[l],d,h,c=-1,f=0;for(;f<n.length&&(o.lastIndex=f,h=o.exec(n),h!==null);)f=o.lastIndex,o===z?h[1]==="!--"?o=ve:h[1]!==void 0?o=_e:h[2]!==void 0?(Se.test(h[2])&&(a=RegExp("</"+h[2],"g")),o=k):h[3]!==void 0&&(o=k):o===k?h[0]===">"?(o=a??z,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?k:h[3]==='"'?$e:ye):o===$e||o===ye?o=k:o===ve||o===_e?o=z:(o=k,a=void 0);let m=o===k&&i[l+1].startsWith("/>")?" ":"";r+=o===z?n+Le:c>=0?(s.push(d),n.slice(0,c)+ke+n.slice(c)+$+m):n+$+(c===-2?l:m)}return[Ae(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},F=class i{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let r=0,o=0,l=e.length-1,n=this.parts,[d,h]=Be(e,t);if(this.el=i.createElement(d,s),w.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=w.nextNode())!==null&&n.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(ke)){let f=h[o++],m=a.getAttribute(c).split($),_=/([.?@])?(.*)/.exec(f);n.push({type:1,index:r,name:_[2],strings:m,ctor:_[1]==="."?te:_[1]==="?"?se:_[1]==="@"?ae:M}),a.removeAttribute(c)}else c.startsWith($)&&(n.push({type:6,index:r}),a.removeAttribute(c));if(Se.test(a.tagName)){let c=a.textContent.split($),f=c.length-1;if(f>0){a.textContent=W?W.emptyScript:"";for(let m=0;m<f;m++)a.append(c[m],H()),w.nextNode(),n.push({type:2,index:++r});a.append(c[f],H())}}}else if(a.nodeType===8)if(a.data===we)n.push({type:2,index:r});else{let c=-1;for(;(c=a.data.indexOf($,c+1))!==-1;)n.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(e,t){let s=S.createElement("template");return s.innerHTML=e,s}};function C(i,e,t=i,s){if(e===A)return e;let a=s!==void 0?t._$Co?.[s]:t._$Cl,r=L(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(i),a._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=a:t._$Cl=a),a!==void 0&&(e=C(i,a._$AS(i,e.values),a,s)),e}var ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,a=(e?.creationScope??S).importNode(t,!0);w.currentNode=a;let r=w.nextNode(),o=0,l=0,n=s[0];for(;n!==void 0;){if(o===n.index){let d;n.type===2?d=new B(r,r.nextSibling,this,e):n.type===1?d=new n.ctor(r,n.name,n.strings,this,e):n.type===6&&(d=new ie(r,this,e)),this._$AV.push(d),n=s[++l]}o!==n?.index&&(r=w.nextNode(),o++)}return w.currentNode=S,a}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},B=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),L(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=F.createElement(Ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===a)this._$AH.p(t);else{let r=new ee(a,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new F(e)),t}k(e){oe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,a=0;for(let r of e)a===t.length?t.push(s=new i(this.O(H()),this.O(H()),this,this.options)):s=t[a],s._$AI(r),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=me(e).nextSibling;me(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(e,t=this,s,a){let r=this.strings,o=!1;if(r===void 0)e=C(this,e,t,0),o=!L(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{let l=e,n,d;for(e=r[0],n=0;n<r.length-1;n++)d=C(this,l[s+n],t,n),d===A&&(d=this._$AH[n]),o||=!L(d)||d!==this._$AH[n],d===p?e=p:e!==p&&(e+=(d??"")+r[n+1]),this._$AH[n]=d}o&&!a&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},te=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},se=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},ae=class extends M{constructor(e,t,s,a,r){super(e,t,s,a,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??p)===A)return;let s=this._$AH,a=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==p&&(s===p||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ie=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var je=re.litHtmlPolyfillSupport;je?.(F,B),(re.litHtmlVersions??=[]).push("3.3.3");var Ee=(i,e,t)=>{let s=t?.renderBefore??e,a=s._$litPart$;if(a===void 0){let r=t?.renderBefore??null;s._$litPart$=a=new B(e.insertBefore(H(),r),r,void 0,t??{})}return a._$AI(i),a};var le=globalThis,v=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};v._$litElement$=!0,v.finalized=!0,le.litElementHydrateSupport?.({LitElement:v});var Ie=le.litElementPolyfillSupport;Ie?.({LitElement:v});(le.litElementVersions??=[]).push("4.2.2");var G=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};var Ve={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:K},qe=(i=Ve,e,t)=>{let{kind:s,metadata:a}=t,r=globalThis.litPropertyMetadata.get(a);if(r===void 0&&globalThis.litPropertyMetadata.set(a,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(t.name,i),s==="accessor"){let{name:o}=t;return{set(l){let n=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,n,i,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,i,l),l}}}if(s==="setter"){let{name:o}=t;return function(l){let n=this[o];e.call(this,l),this.requestUpdate(o,n,i,!0,l)}}throw Error("Unsupported decorator location: "+s)};function P(i){return(e,t)=>typeof t=="object"?qe(i,e,t):((s,a,r)=>{let o=a.hasOwnProperty(r);return a.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(a,r):void 0})(i,e,t)}function R(i){return P({...i,state:!0,attribute:!1})}var Ce=D`
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

  ha-card {
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
    overflow-x: auto;
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
`;var Ke=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Recap when idle)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble Card (Sleek pill badges & theme vars)"},{value:"cyber_fortnite",label:"Cyber Fortnite (Vibrant gamer)"},{value:"minimal",label:"Minimalist / Flat"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}}],E=class extends v{hass;_config;setConfig(e){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10,...e}}_valueChanged(e){if(!this._config||!this.hass)return;let t=e.target,s=e.detail?e.detail.value:t.value;this._config={...this._config,...s};let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?p:u`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Ke}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}};de(E,"styles",D`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `),g([P({attribute:!1})],E.prototype,"hass",2),g([R()],E.prototype,"_config",2),E=g([G("fortnite-activity-card-editor")],E);window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Dynamic Fortnite stats and live game-by-game session tracker with Bubble Card styling.",preview:!0,documentationURL:"https://github.com/Dec64/fortnite-activity"});var x=class extends v{static get styles(){return Ce}hass;_config={type:"custom:fortnite-activity-card",player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10};_activeTab="session";_selectedMode="all";setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10,...e}}static async getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10}}get _player(){return(this._config.player||"player1").toLowerCase()}_getEntityState(e){return this.hass?.states[e]}async _callService(e,t={}){if(this.hass)try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t})}catch(s){console.error(`Error calling service fortnite_activity.${e}:`,s)}}_formatRelativeTime(e){if(!e)return"";try{let t=new Date(e),s=Date.now()-t.getTime(),a=Math.max(1,Math.round(s/6e4));if(a<60)return`${a}m ago`;let r=Math.round(a/60);return r<24?`${r}h ago`:`${Math.round(r/24)}d ago`}catch{return""}}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),s=e%60;return t>0?`${t}h ${s}m`:`${s}m`}render(){if(!this.hass)return p;let e=this._player,t=this._getEntityState(`sensor.fortnite_${e}_current_session`),s=this._getEntityState(`sensor.fortnite_${e}_overall_stats`),a=this._getEntityState(`sensor.fortnite_${e}_rank_battle_royale`),r=this._getEntityState(`sensor.fortnite_${e}_rank_reload`),o=this._getEntityState(`sensor.fortnite_${e}_level`),n=this._getEntityState(`binary_sensor.fortnite_${e}_playing`)?.state==="on"||t?.state==="active",d=t?.attributes||{},h=s?.attributes||{},c=a?.attributes||{},f=r?.attributes||{},m=o?.attributes||{},_=e.charAt(0).toUpperCase()+e.slice(1),b=o?.state||m.level||0,Y=m.account_level||0,j="";this._config.theme_accent==="victory_gold"?j="--accent: #FFD700;":this._config.theme_accent==="slurp_cyan"?j="--accent: #00E5FF;":this._config.theme_accent==="storm_purple"&&(j="--accent: #A855F7;");let T=this._activeTab;return this._config.layout==="session_only"?T="session":this._config.layout==="career_only"&&(T="career"),u`
      <ha-card style="${j}">
        <!-- Card Header -->
        <div class="card-header">
          <div class="player-identity">
            <div class="player-avatar">${e.slice(0,2).toUpperCase()}</div>
            <div class="player-info">
              <h2>${_}</h2>
              <div class="player-meta">
                ${Number(b)>0?u`<span class="level-badge">Lvl ${b}</span>`:""}
                ${Number(Y)>0?u`<span>• Account: ${Y.toLocaleString()}</span>`:""}
                ${Number(b)===0&&Number(Y)===0?u`<span>Fortnite Player</span>`:""}
              </div>
            </div>
          </div>

          <!-- Status Indicator Pill -->
          <div class="status-pill ${n?"live":"idle"}">
            ${n?u`<div class="pulse-dot"></div>
                  <span>LIVE • ${this._formatDuration(d.duration_minutes||0)}</span>`:u`<span>IDLE</span>`}
          </div>
        </div>

        <!-- Bubble Sub-Buttons Bar -->
        ${this._config.show_sub_buttons!==!1?u`
              <div class="sub-button-row">
                <button
                  class="bubble-sub-button ${T==="session"?"active":""}"
                  @click=${()=>this._activeTab="session"}
                >
                  <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                  <span>${n?"Live Session":"Last Session"}</span>
                </button>

                <button
                  class="bubble-sub-button ${T==="career"?"active":""}"
                  @click=${()=>this._activeTab="career"}
                >
                  <ha-icon icon="mdi:trophy-outline"></ha-icon>
                  <span>Career Stats</span>
                </button>

                ${n?u`
                      <button class="bubble-sub-button" @click=${()=>this._callService("end_session")}>
                        <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                        <span>End Session</span>
                      </button>
                    `:u`
                      <button class="bubble-sub-button" @click=${()=>this._callService("start_session")}>
                        <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                        <span>Start Session</span>
                      </button>
                    `}

                <button class="bubble-sub-button" @click=${()=>this._callService("refresh_player")}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <span>Refresh</span>
                </button>
              </div>
            `:p}

        <!-- Main Body: Session View vs Career View -->
        ${T==="session"?this._renderSessionView(n,d,c):this._renderCareerView(h,c,f)}
      </ha-card>
    `}_renderSessionView(e,t,s){let a=t.matches_played||0,r=t.wins||0,o=t.kills||0,l=t.kd_ratio||0,n=t.net_rank_delta_pct||0,d=s.current_rank||"Unranked",h=s.progress_pct||0,c=s.division||0,f=t.recent_matches||[],m=this._config.max_feed_matches||10,_=f.slice(0,m);return u`
      <!-- Session Metric KPI Chips Row -->
      <div class="kpi-row">
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value cyan">${a}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Victories</span>
          <span class="kpi-value gold">${r} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${o}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Session K/D</span>
          <span class="kpi-value">${l}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Rank Net</span>
          <span class="kpi-value ${n>=0?"positive":"neg"}">
            ${n>=0?`+${n}%`:`${n}%`}
          </span>
        </div>
      </div>

      <!-- Rank Progress Bar -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale Ranked</span>
          <span class="rank-name">${d} (Div ${c})</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,h))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${h}% to next rank</span>
          <span style="color: ${n>=0?"#10B981":"#EF4444"}">
            ${n>=0?`\u25B2 +${n}% this session`:`\u25BC ${n}% this session`}
          </span>
        </div>
      </div>

      <!-- Match-by-Match Timeline Feed -->
      ${this._config.show_match_feed!==!1?u`
            <div class="match-feed-header">
              <span>Match Feed (${f.length} games)</span>
              ${e?u`<span style="color: var(--accent); font-size: 11px;">Tracking Live</span>`:p}
            </div>

            <div class="match-list">
              ${_.length>0?_.map(b=>u`
                      <div class="match-card ${b.is_victory?"victory":""}">
                        <div class="match-left">
                          <div class="match-headline">
                            <span class="match-num">#${b.match_number}</span>
                            <span class="placement-badge ${b.is_victory?"win":""}">
                              ${b.placement_text}
                            </span>
                          </div>
                          <span class="match-mode">${b.mode_name} • ${this._formatRelativeTime(b.timestamp)}</span>
                        </div>
                        <div class="match-right">
                          <span class="kills-badge">
                            <ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>
                            ${b.kills}
                          </span>
                          ${b.rank_delta_pct!==void 0?u`
                                <span class="rank-delta-badge ${b.rank_delta_pct>=0?"pos":"neg"}">
                                  ${b.rank_delta_pct>=0?`+${b.rank_delta_pct}%`:`${b.rank_delta_pct}%`}
                                </span>
                              `:p}
                        </div>
                      </div>
                    `):u`
                    <div style="text-align: center; padding: 24px; color: var(--secondary-text-color);">
                      No matches recorded in this session yet.<br />
                      <small style="opacity: 0.7;">Matches will appear here as soon as you finish a game.</small>
                    </div>
                  `}
            </div>
          `:p}
    `}_renderCareerView(e,t,s){let a=e.modes||{},r={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0};this._selectedMode==="build"&&a.build?r=a.build:this._selectedMode==="zero_build"&&a.zero_build?r=a.zero_build:this._selectedMode==="reload"&&a.reload&&(r=a.reload);let o=t.current_rank||"Unranked",l=t.progress_pct||0,n=t.division||0,d=s.current_rank||"Unranked",h=s.progress_pct||0,c=s.division||0;return u`
      <!-- Mode Tabs Switcher -->
      <div class="mode-tabs">
        <button
          class="mode-tab ${this._selectedMode==="all"?"active":""}"
          @click=${()=>this._selectedMode="all"}
        >
          Overall
        </button>
        <button
          class="mode-tab ${this._selectedMode==="zero_build"?"active":""}"
          @click=${()=>this._selectedMode="zero_build"}
        >
          Zero Build
        </button>
        <button
          class="mode-tab ${this._selectedMode==="build"?"active":""}"
          @click=${()=>this._selectedMode="build"}
        >
          Battle Royale
        </button>
        <button
          class="mode-tab ${this._selectedMode==="reload"?"active":""}"
          @click=${()=>this._selectedMode="reload"}
        >
          Reload
        </button>
      </div>

      <!-- Career Stats Grid -->
      <div class="kpi-row">
        <div class="kpi-chip">
          <span class="kpi-label">Win Rate</span>
          <span class="kpi-value cyan">${r.win_rate}%</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">K/D Ratio</span>
          <span class="kpi-value">${r.kd}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Total Wins</span>
          <span class="kpi-value gold">${r.wins} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value">${r.matches}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${r.kills}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Outlived</span>
          <span class="kpi-value">${(e.players_outlived||0).toLocaleString()}</span>
        </div>
      </div>

      <!-- Ranks Showcase -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale</span>
          <span class="rank-name">${o} (Div ${n})</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,l))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${l}% to promotion</span>
          <span>Peak: ${t.highest_rank||o}</span>
        </div>
      </div>

      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Reload Build</span>
          <span class="rank-name">${d} (Div ${c})</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,h))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${h}% to promotion</span>
          <span>Peak: ${s.highest_rank||d}</span>
        </div>
      </div>
    `}};g([P({attribute:!1})],x.prototype,"hass",2),g([R()],x.prototype,"_config",2),g([R()],x.prototype,"_activeTab",2),g([R()],x.prototype,"_selectedMode",2),x=g([G("fortnite-activity-card")],x);export{x as FortniteActivityCard};
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
