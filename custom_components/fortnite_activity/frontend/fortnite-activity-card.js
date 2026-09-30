var Ee=Object.defineProperty;var Ce=Object.getOwnPropertyDescriptor;var v=(r,e,t,s)=>{for(var i=s>1?void 0:s?Ce(e,t):e,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=(s?n(e,t,i):n(i))||i);return s&&i&&Ee(e,t,i),i};var I=globalThis,V=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),ce=new WeakMap,U=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(t,e))}return e}toString(){return this.cssText}},de=r=>new U(typeof r=="string"?r:r+"",void 0,Z),O=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((s,i,a)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[a+1],r[0]);return new U(t,r,Z)},pe=(r,e)=>{if(V)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=I.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Q=V?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return de(t)})(r):r;var{is:Me,defineProperty:Pe,getOwnPropertyDescriptor:Re,getOwnPropertyNames:Te,getOwnPropertySymbols:Ue,getPrototypeOf:Oe}=Object,q=globalThis,he=q.trustedTypes,Ne=he?he.emptyScript:"",Le=q.reactiveElementPolyfillSupport,N=(r,e)=>r,L={toAttribute(r,e){switch(e){case Boolean:r=r?Ne:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},K=(r,e)=>!Me(r,e),ue={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Pe(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:a}=Re(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){let l=i?.call(this);a?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let e=Oe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let t=this.properties,s=[...Te(t),...Ue(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(Q(i))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let a=(s.converter?.toAttribute!==void 0?s.converter:L).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=s.getPropertyOptions(i),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:L;this._$Em=i;let l=n.fromAttribute(t,a.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(e!==void 0){let n=this.constructor;if(i===!1&&(a=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??K)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,a]of s){let{wrapped:n}=a,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,a,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[N("elementProperties")]=new Map,y[N("finalized")]=new Map,Le?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var re=globalThis,fe=r=>r,W=re.trustedTypes,be=W?W.createPolicy("lit-html",{createHTML:r=>r}):void 0,$e="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+$,Fe=`<${xe}>`,A=document,H=()=>A.createComment(""),z=r=>r===null||typeof r!="object"&&typeof r!="function",ne=Array.isArray,He=r=>ne(r)||typeof r?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,me=/>/g,k=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,ve=/"/g,ke=/^(?:script|style|textarea|title)$/i,oe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),u=oe(1),Ze=oe(2),Qe=oe(3),S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ye=new WeakMap,w=A.createTreeWalker(A,129);function we(r,e){if(!ne(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(e):e}var ze=(r,e)=>{let t=r.length-1,s=[],i,a=e===2?"<svg>":e===3?"<math>":"",n=F;for(let l=0;l<t;l++){let o=r[l],c,p,d=-1,f=0;for(;f<o.length&&(n.lastIndex=f,p=n.exec(o),p!==null);)f=n.lastIndex,n===F?p[1]==="!--"?n=ge:p[1]!==void 0?n=me:p[2]!==void 0?(ke.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=k):p[3]!==void 0&&(n=k):n===k?p[0]===">"?(n=i??F,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?k:p[3]==='"'?ve:_e):n===ve||n===_e?n=k:n===ge||n===me?n=F:(n=k,i=void 0);let g=n===k&&r[l+1].startsWith("/>")?" ":"";a+=n===F?o+Fe:d>=0?(s.push(c),o.slice(0,d)+$e+o.slice(d)+$+g):o+$+(d===-2?l:g)}return[we(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},D=class r{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,n=0,l=e.length-1,o=this.parts,[c,p]=ze(e,t);if(this.el=r.createElement(c,s),w.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=w.nextNode())!==null&&o.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith($e)){let f=p[n++],g=i.getAttribute(d).split($),m=/([.?@])?(.*)/.exec(f);o.push({type:1,index:a,name:m[2],strings:g,ctor:m[1]==="."?te:m[1]==="?"?se:m[1]==="@"?ie:M}),i.removeAttribute(d)}else d.startsWith($)&&(o.push({type:6,index:a}),i.removeAttribute(d));if(ke.test(i.tagName)){let d=i.textContent.split($),f=d.length-1;if(f>0){i.textContent=W?W.emptyScript:"";for(let g=0;g<f;g++)i.append(d[g],H()),w.nextNode(),o.push({type:2,index:++a});i.append(d[f],H())}}}else if(i.nodeType===8)if(i.data===xe)o.push({type:2,index:a});else{let d=-1;for(;(d=i.data.indexOf($,d+1))!==-1;)o.push({type:7,index:a}),d+=$.length-1}a++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function C(r,e,t=r,s){if(e===S)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,a=z(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=C(r,i._$AS(r,e.values),i,s)),e}var ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??A).importNode(t,!0);w.currentNode=i;let a=w.nextNode(),n=0,l=0,o=s[0];for(;o!==void 0;){if(n===o.index){let c;o.type===2?c=new B(a,a.nextSibling,this,e):o.type===1?c=new o.ctor(a,o.name,o.strings,this,e):o.type===6&&(c=new ae(a,this,e)),this._$AV.push(c),o=s[++l]}n!==o?.index&&(a=w.nextNode(),n++)}return w.currentNode=A,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},B=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),z(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):He(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=D.createElement(we(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let a=new ee(i,this),n=a.u(this.options);a.p(t),this.T(n),this._$AH=a}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new D(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let a of e)i===t.length?t.push(s=new r(this.O(H()),this.O(H()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=fe(e).nextSibling;fe(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){let a=this.strings,n=!1;if(a===void 0)e=C(this,e,t,0),n=!z(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{let l=e,o,c;for(e=a[0],o=0;o<a.length-1;o++)c=C(this,l[s+o],t,o),c===S&&(c=this._$AH[o]),n||=!z(c)||c!==this._$AH[o],c===h?e=h:e!==h&&(e+=(c??"")+a[o+1]),this._$AH[o]=c}n&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},te=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}},se=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}},ie=class extends M{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??h)===S)return;let s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ae=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var De=re.litHtmlPolyfillSupport;De?.(D,B),(re.litHtmlVersions??=[]).push("3.3.3");var Ae=(r,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let a=t?.renderBefore??null;s._$litPart$=i=new B(e.insertBefore(H(),a),a,void 0,t??{})}return i._$AI(r),i};var le=globalThis,_=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};_._$litElement$=!0,_.finalized=!0,le.litElementHydrateSupport?.({LitElement:_});var Be=le.litElementPolyfillSupport;Be?.({LitElement:_});(le.litElementVersions??=[]).push("4.2.2");var je={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:K},Ie=(r=je,e,t)=>{let{kind:s,metadata:i}=t,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(t.name,r),s==="accessor"){let{name:n}=t;return{set(l){let o=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,o,r,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let o=this[n];e.call(this,l),this.requestUpdate(n,o,r,!0,l)}}throw Error("Unsupported decorator location: "+s)};function P(r){return(e,t)=>typeof t=="object"?Ie(r,e,t):((s,i,a)=>{let n=i.hasOwnProperty(a);return i.constructor.createProperty(a,s),n?Object.getOwnPropertyDescriptor(i,a):void 0})(r,e,t)}function E(r){return P({...r,state:!0,attribute:!1})}var Se=O`
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
`;var Ve=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Recap when idle)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble Card (Sleek pill badges & theme vars)"},{value:"cyber_fortnite",label:"Cyber Fortnite (Vibrant gamer)"},{value:"minimal",label:"Minimalist / Flat"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],j=class extends _{setConfig(e){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10,...e}}_valueChanged(e){if(!this._config||!this.hass)return;let t=e.target,s=e.detail?e.detail.value:t.value;this._config={...this._config,...s};let i=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(i)}render(){return!this.hass||!this._config?h:u`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Ve}
          .computeLabel=${e=>e.label||e.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=O`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};v([P({attribute:!1})],j.prototype,"hass",2),v([E()],j.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",j);window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Dynamic Fortnite stats and live game-by-game session tracker with Bubble Card styling.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var qe={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},x=class extends _{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10};this._activeTab="session";this._selectedMode="all";this._loadingAction=null;this._entityCache=new Map}static get styles(){return Se}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10,...t}}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,max_feed_matches:10}}getCardSize(){return 5}get _player(){return(this._config.player||"player1").toLowerCase()}_findEntity(t,s){let i=this.hass?.states;if(!i)return;let a=this._player,n=`${a}:${t}:${s}`,l=this._entityCache.get(n);if(l&&i[l])return i[l];let o;for(let[c,p]of Object.entries(i))if(c.startsWith(`${t}.`)&&p.attributes?.fortnite_player_id===a&&p.attributes?.fortnite_entity_key===s){o=c;break}if(o||(o=[s,...qe[s]||[]].flatMap(d=>[`${t}.fortnite_${a}_${d}`,`${t}.fortnite_${a}_${a}_${d}`]).find(d=>i[d])),!!o)return this._entityCache.set(n,o),i[o]}async _callService(t,s={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...s}),setTimeout(()=>{this._loadingAction=null},1500)}catch(i){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,i)}}}_formatRelativeTime(t){if(!t)return"";try{let s=new Date(t),i=Date.now()-s.getTime(),a=Math.max(1,Math.round(i/6e4));if(a<60)return`${a}m ago`;let n=Math.round(a/60);return n<24?`${n}h ago`:`${Math.round(n/24)}d ago`}catch{return""}}_formatDuration(t){if(!t||t<=0)return"0m";let s=Math.floor(t/60),i=t%60;return s>0?`${s}h ${i}m`:`${i}m`}render(){if(!this.hass)return u`<ha-card><div style="padding: 16px; text-align: center; color: var(--secondary-text-color);">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,s=this._findEntity("sensor","current_session"),i=this._findEntity("sensor","overall_stats"),a=this._findEntity("sensor","rank_battle_royale"),n=this._findEntity("sensor","rank_reload"),l=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing");if(!s&&!i&&!o)return u`<ha-card><div style="padding: 16px; color: var(--secondary-text-color);">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let c=o?.state==="on"||s?.state==="active",p=s?.attributes||{},d=i?.attributes||{},f={...a?.attributes||{},current_rank:a?.state},g={...n?.attributes||{},current_rank:n?.state},m=l?.attributes||{},b=t.charAt(0).toUpperCase()+t.slice(1),G=l?.state||m.level||0,J=m.account_level||0,R="";this._config.theme_accent==="victory_gold"?R="--accent: #FFD700;":this._config.theme_accent==="slurp_cyan"?R="--accent: #00E5FF;":this._config.theme_accent==="storm_purple"&&(R="--accent: #A855F7;");let T=this._activeTab;return this._config.layout==="session_only"?T="session":this._config.layout==="career_only"&&(T="career"),this._config.custom_background&&(R+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`),u`
      <ha-card style="${R}">
        <!-- Card Header -->
        <div class="card-header">
          <div class="player-identity">
            <div class="player-avatar">${t.slice(0,2).toUpperCase()}</div>
            <div class="player-info">
              <h2>${b}</h2>
              <div class="player-meta">
                ${!this._config.hide_season_level&&Number(G)>0?u`<span class="level-badge">Lvl ${G}</span>`:""}
                ${!this._config.hide_account_level&&Number(J)>0?u`<span>• Account: ${J.toLocaleString()}</span>`:""}
                ${(this._config.hide_season_level||Number(G)===0)&&(this._config.hide_account_level||Number(J)===0)?u`<span>Fortnite Player</span>`:""}
              </div>
            </div>
          </div>

          <!-- Status Indicator Pill -->
          <div class="status-pill ${c?"live":"idle"}">
            ${c?u`<div class="pulse-dot"></div>
                  <span>LIVE • ${this._formatDuration(p.duration_minutes||0)}</span>`:u`<span>IDLE</span>`}
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
                  <span>${c?"Live Session":"Last Session"}</span>
                </button>

                <button
                  class="bubble-sub-button ${T==="career"?"active":""}"
                  @click=${()=>this._activeTab="career"}
                >
                  <ha-icon icon="mdi:trophy-outline"></ha-icon>
                  <span>Career Stats</span>
                </button>

                ${c?u`
                      <button class="bubble-sub-button" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
                        <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                        <span>${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
                      </button>
                    `:u`
                      <button class="bubble-sub-button" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
                        <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                        <span>${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
                      </button>
                    `}

                <button class="bubble-sub-button" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
                  <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
                  <span>${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
                </button>
              </div>
            `:h}

        <!-- Main Body: Session View vs Career View -->
        ${T==="session"?this._renderSessionView(c,p,f):this._renderCareerView(d,f,g)}
      </ha-card>
    `}_renderSessionView(t,s,i){let a=s.matches_played||0,n=s.wins||0,l=s.kills||0,o=s.kd_ratio||0,c=s.net_rank_delta_pct||0,p=i.current_rank||"Unranked",d=i.progress_pct||0,f=s.recent_matches||[],g=this._config.max_feed_matches||10,m=f.slice(0,g);return u`
      <!-- Session Metric KPI Chips Row -->
      <div class="kpi-row">
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value cyan">${a}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Victories</span>
          <span class="kpi-value gold">${n} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${l}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Session K/D</span>
          <span class="kpi-value">${o}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Rank Net</span>
          <span class="kpi-value ${c>=0?"positive":"neg"}">
            ${c>=0?`+${c}%`:`${c}%`}
          </span>
        </div>
      </div>

      <!-- Rank Progress Bar -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale Ranked</span>
          <span class="rank-name">${p}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,d))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${d}% to next rank</span>
          <span style="color: ${c>=0?"#10B981":"#EF4444"}">
            ${c>=0?`\u25B2 +${c}% this session`:`\u25BC ${c}% this session`}
          </span>
        </div>
      </div>

      <!-- Match-by-Match Timeline Feed -->
      ${this._config.show_match_feed!==!1?u`
            <div class="match-feed-header">
              <span>Match Feed (${f.length} games)</span>
              ${t?u`<span style="color: var(--accent); font-size: 11px;">Tracking Live</span>`:h}
            </div>

            <div class="match-list">
              ${m.length>0?m.map(b=>u`
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
                              `:h}
                        </div>
                      </div>
                    `):u`
                    <div style="text-align: center; padding: 24px; color: var(--secondary-text-color);">
                      No matches recorded in this session yet.<br />
                      <small style="opacity: 0.7;">Matches will appear here as soon as you finish a game.</small>
                    </div>
                  `}
            </div>
          `:h}
    `}_renderCareerView(t,s,i){let a=t.modes||{},n={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0};this._selectedMode==="build"&&a.build?n=a.build:this._selectedMode==="zero_build"&&a.zero_build?n=a.zero_build:this._selectedMode==="reload"&&a.reload&&(n=a.reload);let l=s.current_rank||"Unranked",o=s.progress_pct||0,c=i.current_rank||"Unranked",p=i.progress_pct||0;return u`
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
          <span class="kpi-value cyan">${n.win_rate}%</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">K/D Ratio</span>
          <span class="kpi-value">${n.kd}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Total Wins</span>
          <span class="kpi-value gold">${n.wins} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value">${n.matches}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${n.kills}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Outlived</span>
          <span class="kpi-value">${(t.players_outlived||0).toLocaleString()}</span>
        </div>
      </div>

      <!-- Ranks Showcase -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale</span>
          <span class="rank-name">${l}</span>
        </div>
        ${this._config.hide_rank_progress?"":u`
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
          </div>
        `}
        <div class="rank-meta">
          <span>${o}% to promotion</span>
          <span>Peak: ${s.highest_rank||l}</span>
        </div>
      </div>

      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Reload Build</span>
          <span class="rank-name">${c}</span>
        </div>
        ${this._config.hide_rank_progress?"":u`
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,p))}%;"></div>
          </div>
        `}
        <div class="rank-meta">
          <span>${p}% to promotion</span>
          <span>Peak: ${i.highest_rank||c}</span>
        </div>
      </div>
    `}};v([P({attribute:!1})],x.prototype,"hass",2),v([E()],x.prototype,"_config",2),v([E()],x.prototype,"_activeTab",2),v([E()],x.prototype,"_selectedMode",2),v([E()],x.prototype,"_loadingAction",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",x);console.info("%c FORTNITE-ACTIVITY-CARD %c v1.0.7 ","background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{x as FortniteActivityCard};
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
