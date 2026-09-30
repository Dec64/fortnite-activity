var Wt=Object.defineProperty;var It=Object.getOwnPropertyDescriptor;var y=(d,s,t,e)=>{for(var a=e>1?void 0:e?It(s,t):s,i=d.length-1,r;i>=0;i--)(r=d[i])&&(a=(e?r(s,t,a):r(a))||a);return e&&a&&Wt(s,t,a),a};var J=globalThis,tt=J.ShadowRoot&&(J.ShadyCSS===void 0||J.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),yt=new WeakMap,H=class{constructor(s,t,e){if(this._$cssResult$=!0,e!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=t}get styleSheet(){let s=this.o,t=this.t;if(tt&&s===void 0){let e=t!==void 0&&t.length===1;e&&(s=yt.get(t)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),e&&yt.set(t,s))}return s}toString(){return this.cssText}},$t=d=>new H(typeof d=="string"?d:d+"",void 0,rt),j=(d,...s)=>{let t=d.length===1?d[0]:s.reduce((e,a,i)=>e+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+d[i+1],d[0]);return new H(t,d,rt)},xt=(d,s)=>{if(tt)d.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of s){let e=document.createElement("style"),a=J.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,d.appendChild(e)}},nt=tt?d=>d:d=>d instanceof CSSStyleSheet?(s=>{let t="";for(let e of s.cssRules)t+=e.cssText;return $t(t)})(d):d;var{is:Vt,defineProperty:Kt,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Gt,getOwnPropertySymbols:Zt,getPrototypeOf:Yt}=Object,et=globalThis,wt=et.trustedTypes,Xt=wt?wt.emptyScript:"",Qt=et.reactiveElementPolyfillSupport,W=(d,s)=>d,I={toAttribute(d,s){switch(s){case Boolean:d=d?Xt:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,s){let t=d;switch(s){case Boolean:t=d!==null;break;case Number:t=d===null?null:Number(d);break;case Object:case Array:try{t=JSON.parse(d)}catch{t=null}}return t}},at=(d,s)=>!Vt(d,s),kt={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:at};Symbol.metadata??=Symbol("metadata"),et.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,t=kt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(s,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(s,e,t);a!==void 0&&Kt(this.prototype,s,a)}}static getPropertyDescriptor(s,t,e){let{get:a,set:i}=qt(this.prototype,s)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let l=a?.call(this);i?.call(this,r),this.requestUpdate(s,l,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??kt}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let s=Yt(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let t=this.properties,e=[...Gt(t),...Zt(t)];for(let a of e)this.createProperty(a,t[a])}let s=this[Symbol.metadata];if(s!==null){let t=litPropertyMetadata.get(s);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let t=[];if(Array.isArray(s)){let e=new Set(s.flat(1/0).reverse());for(let a of e)t.unshift(nt(a))}else s!==void 0&&t.push(nt(s));return t}static _$Eu(s,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(s.set(e,this[e]),delete this[e]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xt(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,t,e){this._$AK(s,e)}_$ET(s,t){let e=this.constructor.elementProperties.get(s),a=this.constructor._$Eu(s,e);if(a!==void 0&&e.reflect===!0){let i=(e.converter?.toAttribute!==void 0?e.converter:I).toAttribute(t,e.type);this._$Em=s,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(s,t){let e=this.constructor,a=e._$Eh.get(s);if(a!==void 0&&this._$Em!==a){let i=e.getPropertyOptions(a),r=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:I;this._$Em=a;let l=r.fromAttribute(t,i.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(s,t,e,a=!1,i){if(s!==void 0){let r=this.constructor;if(a===!1&&(i=this[s]),e??=r.getPropertyOptions(s),!((e.hasChanged??at)(i,t)||e.useDefault&&e.reflect&&i===this._$Ej?.get(s)&&!this.hasAttribute(r._$Eu(s,e))))return;this.C(s,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,t,{useDefault:e,reflect:a,wrapped:i},r){e&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,r??t??this[s]),i!==!0||r!==void 0)||(this._$AL.has(s)||(this.hasUpdated||e||(t=void 0),this._$AL.set(s,t)),a===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,i]of e){let{wrapped:r}=i,l=this[a];r!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,i,l)}}let s=!1,t=this._$AL;try{s=this.shouldUpdate(t),s?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw s=!1,this._$EM(),e}s&&this._$AE(t)}willUpdate(s){}_$AE(s){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(s){}firstUpdated(s){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[W("elementProperties")]=new Map,C[W("finalized")]=new Map,Qt?.({ReactiveElement:C}),(et.reactiveElementVersions??=[]).push("2.1.2");var ut=globalThis,St=d=>d,st=ut.trustedTypes,Et=st?st.createPolicy("lit-html",{createHTML:d=>d}):void 0,Pt="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,zt="?"+R,Jt=`<${zt}>`,z=document,K=()=>z.createComment(""),q=d=>d===null||typeof d!="object"&&typeof d!="function",mt=Array.isArray,te=d=>mt(d)||typeof d?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Ct=/>/g,F=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Rt=/"/g,Lt=/^(?:script|style|textarea|title)$/i,gt=d=>(s,...t)=>({_$litType$:d,strings:s,values:t}),n=gt(1),M=gt(2),be=gt(3),L=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Ft=new WeakMap,P=z.createTreeWalker(z,129);function Tt(d,s){if(!mt(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(s):s}var ee=(d,s)=>{let t=d.length-1,e=[],a,i=s===2?"<svg>":s===3?"<math>":"",r=V;for(let l=0;l<t;l++){let o=d[l],p,h,m=-1,f=0;for(;f<o.length&&(r.lastIndex=f,h=r.exec(o),h!==null);)f=r.lastIndex,r===V?h[1]==="!--"?r=At:h[1]!==void 0?r=Ct:h[2]!==void 0?(Lt.test(h[2])&&(a=RegExp("</"+h[2],"g")),r=F):h[3]!==void 0&&(r=F):r===F?h[0]===">"?(r=a??V,m=-1):h[1]===void 0?m=-2:(m=r.lastIndex-h[2].length,p=h[1],r=h[3]===void 0?F:h[3]==='"'?Rt:Mt):r===Rt||r===Mt?r=F:r===At||r===Ct?r=V:(r=F,a=void 0);let b=r===F&&d[l+1].startsWith("/>")?" ":"";i+=r===V?o+Jt:m>=0?(e.push(p),o.slice(0,m)+Pt+o.slice(m)+R+b):o+R+(m===-2?l:b)}return[Tt(d,i+(d[t]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),e]},G=class d{constructor({strings:s,_$litType$:t},e){let a;this.parts=[];let i=0,r=0,l=s.length-1,o=this.parts,[p,h]=ee(s,t);if(this.el=d.createElement(p,e),P.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(a=P.nextNode())!==null&&o.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let m of a.getAttributeNames())if(m.endsWith(Pt)){let f=h[r++],b=a.getAttribute(m).split(R),v=/([.?@])?(.*)/.exec(f);o.push({type:1,index:i,name:v[2],strings:b,ctor:v[1]==="."?ct:v[1]==="?"?dt:v[1]==="@"?pt:B}),a.removeAttribute(m)}else m.startsWith(R)&&(o.push({type:6,index:i}),a.removeAttribute(m));if(Lt.test(a.tagName)){let m=a.textContent.split(R),f=m.length-1;if(f>0){a.textContent=st?st.emptyScript:"";for(let b=0;b<f;b++)a.append(m[b],K()),P.nextNode(),o.push({type:2,index:++i});a.append(m[f],K())}}}else if(a.nodeType===8)if(a.data===zt)o.push({type:2,index:i});else{let m=-1;for(;(m=a.data.indexOf(R,m+1))!==-1;)o.push({type:7,index:i}),m+=R.length-1}i++}}static createElement(s,t){let e=z.createElement("template");return e.innerHTML=s,e}};function D(d,s,t=d,e){if(s===L)return s;let a=e!==void 0?t._$Co?.[e]:t._$Cl,i=q(s)?void 0:s._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(d),a._$AT(d,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(s=D(d,a._$AS(d,s.values),a,e)),s}var lt=class{constructor(s,t){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:t},parts:e}=this._$AD,a=(s?.creationScope??z).importNode(t,!0);P.currentNode=a;let i=P.nextNode(),r=0,l=0,o=e[0];for(;o!==void 0;){if(r===o.index){let p;o.type===2?p=new Z(i,i.nextSibling,this,s):o.type===1?p=new o.ctor(i,o.name,o.strings,this,s):o.type===6&&(p=new ht(i,this,s)),this._$AV.push(p),o=e[++l]}r!==o?.index&&(i=P.nextNode(),r++)}return P.currentNode=z,a}p(s){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(s,e,t),t+=e.strings.length-2):e._$AI(s[t])),t++}},Z=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,t,e,a){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=s,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,t=this._$AM;return t!==void 0&&s?.nodeType===11&&(s=t.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,t=this){s=D(this,s,t),q(s)?s===c||s==null||s===""?(this._$AH!==c&&this._$AR(),this._$AH=c):s!==this._$AH&&s!==L&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):te(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==c&&q(this._$AH)?this._$AA.nextSibling.data=s:this.T(z.createTextNode(s)),this._$AH=s}$(s){let{values:t,_$litType$:e}=s,a=typeof e=="number"?this._$AC(s):(e.el===void 0&&(e.el=G.createElement(Tt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let i=new lt(a,this),r=i.u(this.options);i.p(t),this.T(r),this._$AH=i}}_$AC(s){let t=Ft.get(s.strings);return t===void 0&&Ft.set(s.strings,t=new G(s)),t}k(s){mt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let i of s)a===t.length?t.push(e=new d(this.O(K()),this.O(K()),this,this.options)):e=t[a],e._$AI(i),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(s=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);s!==this._$AB;){let e=St(s).nextSibling;St(s).remove(),s=e}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,t,e,a,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=s,this.name=t,this._$AM=a,this.options=i,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=c}_$AI(s,t=this,e,a){let i=this.strings,r=!1;if(i===void 0)s=D(this,s,t,0),r=!q(s)||s!==this._$AH&&s!==L,r&&(this._$AH=s);else{let l=s,o,p;for(s=i[0],o=0;o<i.length-1;o++)p=D(this,l[e+o],t,o),p===L&&(p=this._$AH[o]),r||=!q(p)||p!==this._$AH[o],p===c?s=c:s!==c&&(s+=(p??"")+i[o+1]),this._$AH[o]=p}r&&!a&&this.j(s)}j(s){s===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},ct=class extends B{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===c?void 0:s}},dt=class extends B{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==c)}},pt=class extends B{constructor(s,t,e,a,i){super(s,t,e,a,i),this.type=5}_$AI(s,t=this){if((s=D(this,s,t,0)??c)===L)return;let e=this._$AH,a=s===c&&e!==c||s.capture!==e.capture||s.once!==e.once||s.passive!==e.passive,i=s!==c&&(e===c||a);a&&this.element.removeEventListener(this.name,this,e),i&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},ht=class{constructor(s,t,e){this.element=s,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(s){D(this,s)}};var ae=ut.litHtmlPolyfillSupport;ae?.(G,Z),(ut.litHtmlVersions??=[]).push("3.3.3");var Dt=(d,s,t)=>{let e=t?.renderBefore??s,a=e._$litPart$;if(a===void 0){let i=t?.renderBefore??null;e._$litPart$=a=new Z(s.insertBefore(K(),i),i,void 0,t??{})}return a._$AI(d),a};var bt=globalThis,A=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Dt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};A._$litElement$=!0,A.finalized=!0,bt.litElementHydrateSupport?.({LitElement:A});var se=bt.litElementPolyfillSupport;se?.({LitElement:A});(bt.litElementVersions??=[]).push("4.2.2");var ie={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:at},re=(d=ie,s,t)=>{let{kind:e,metadata:a}=t,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),e==="setter"&&((d=Object.create(d)).wrapped=!0),i.set(t.name,d),e==="accessor"){let{name:r}=t;return{set(l){let o=s.get.call(this);s.set.call(this,l),this.requestUpdate(r,o,d,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,d,l),l}}}if(e==="setter"){let{name:r}=t;return function(l){let o=this[r];s.call(this,l),this.requestUpdate(r,o,d,!0,l)}}throw Error("Unsupported decorator location: "+e)};function U(d){return(s,t)=>typeof t=="object"?re(d,s,t):((e,a,i)=>{let r=a.hasOwnProperty(i);return a.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(a,i):void 0})(d,s,t)}function x(d){return U({...d,state:!0,attribute:!1})}var Bt=j`
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
`;var ne=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (e.g. Peely) \u2014 looked up in the cosmetics catalogue",selector:{text:{}}},{name:"layout",label:"Card Layout Mode",selector:{select:{options:[{value:"auto",label:"Adaptive (Session when playing, Stats when idle, Events tab)"},{value:"session_only",label:"Live Session & Match Feed Only"},{value:"career_only",label:"Overall Career & Ranks Only"},{value:"events_only",label:"Tournaments / Events Only"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show Quick Action Sub-Buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"show_tournaments",label:"Show Events (tournament schedule) tab",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],Y=class extends A{setConfig(s){this._config={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...s}}_valueChanged(s){if(!this._config||!this.hass)return;let t=s.target,e=s.detail?s.detail.value:t.value;this._config={...this._config,...e};let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?c:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ne}
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
  `}};y([U({attribute:!1})],Y.prototype,"hass",2),y([x()],Y.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",Y);var oe="1.6.2";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var le={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},O={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},X={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},ce={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Ut=(d,s)=>{let t=d&&ce[d]||d||"";return s===1||!t?t:`${t}s`},Ot={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Nt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],de={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},ft={player:"player1",layout:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},E=d=>{d.target.hidden=!0},Ht=d=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:d}),Q={at:0},T={at:0},vt=new Map,$=class extends A{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...ft};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._showAllPages=!1;this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Bt}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...ft,...t},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...ft}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-T.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _eventsEnabled(){return this._config.show_tournaments!==!1||this._config.layout==="events_only"}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(e.states[a]!==this.hass.states[a])return!0;return!1}updated(t){if(super.updated(t),!this.hass)return;let e=t.has("hass")&&!t.get("hass");e&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(t.has("_config")||e)&&this._scheduleAvatar()}async _loadCatalog(){(!Q.promise||Date.now()-Q.at>36e5)&&(Q.at=Date.now(),Q.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await Q.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}async _loadEvents(t=!1){if(this.hass){(t||!T.promise||Date.now()-T.at>10*6e4)&&(T.at=Date.now(),T.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let e=await T.promise;this._events={list:e?.tournaments??null,defaultRegion:e?.default_region_group}}catch(e){T.promise=void 0,this._events={error:e?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let e=t.toLowerCase();vt.has(e)||vt.set(e,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await vt.get(e);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadLeaderboard(t,e){let a=`${t}|${e}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:t,window_id:e,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.data!==void 0)){this._pass={loading:!0};try{let t=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:t?.battlepass??null}}catch(t){this._pass={error:t?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let t=Nt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!t.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let e=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:t,period:i,types:["mean","min","max","state"]});try{let a=await e(30,"day"),i="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await e(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(t,e){!this.hass||this._matchLists[t]||(this._matchLists={...this._matchLists,[t]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...e}).then(a=>{this._matchLists={...this._matchLists,[t]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[t]:{error:a?.message||"Could not load matches"}}}))}_isRanked(t){return!!t.rank_delta_pct||!!t.unreal_rank_change||/habanero/i.test(t.playlist_id||"")}_findEntity(t,e){let a=this.hass?.states;if(!a)return;let i=this._player,r=`${i}:${t}:${e}`,l=this._entityCache.get(r);if(l&&a[l])return a[l];let o;for(let[p,h]of Object.entries(a))if(p.startsWith(`${t}.`)&&h.attributes?.fortnite_player_id===i&&h.attributes?.fortnite_entity_key===e){o=p;break}if(o||(o=[e,...le[e]||[]].flatMap(m=>[`${t}.fortnite_${i}_${m}`,`${t}.fortnite_${i}_${i}_${m}`]).find(m=>a[m])),!!o)return this._entityCache.set(r,o),a[o]}async _callService(t,e={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...e}),t==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadEvents(),t==="trends"&&this._loadTrends(),t==="pass"&&this._loadPass()}_entityId(t,e){return this._findEntity(t,e)?.entity_id}_toggleEvent(t){if(this._expandedEvent===t.key){this._expandedEvent=null;return}this._expandedEvent=t.key;let e=t.windows.find(a=>this._windowState(a)==="live")||[...t.windows].reverse().find(a=>this._windowState(a)==="finished");e&&!this._leaderboards[`${t.event_id}|${e.window_id}`]&&this._loadLeaderboard(t.event_id,e.window_id)}_formatRelativeTime(t){if(!t)return"";let e=new Date(t);if(isNaN(e.getTime()))return"";let a=Math.max(1,Math.round((this._now-e.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let e=Math.floor(t/60),a=Math.round(t%60);return e>0?`${e}h ${a}m`:`${a}m`}_formatSpan(t){let e=Math.max(0,Math.round(t/6e4)),a=Math.floor(e/1440),i=Math.floor(e%1440/60),r=e%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${r}m`:`${r}m`}_formatWhen(t){try{return Ht(this.hass?.config?.time_zone).format(new Date(t)).replace(/\b(am|pm)\b/i,e=>e.toLowerCase())}catch{return Ht().format(new Date(t))}}_num(t,e=0){return Number(t||0).toLocaleString("en-GB",{maximumFractionDigits:e,minimumFractionDigits:0})}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}_windowState(t){let e=Date.parse(t.begin),a=Date.parse(t.end);return this._now>=a?"finished":this._now>=e?"live":"upcoming"}_rankBadge(t,e=30){let a=t||"Unranked",i=Object.keys(O).find(m=>a.startsWith(m));if(!i)return n`<span class="rank-badge unranked" style="width:${e}px;height:${e}px">–</span>`;let[r,l]=O[i],o=(a.match(/\b(I{1,3})$/)||[])[1]||"",p=`g-${i}-${e}`;return n`<span class="rank-badge" title=${a} style="width:${e}px;height:${e}px">
      ${M`<svg viewBox="0 0 40 44" width=${e} height=${e} aria-hidden="true">
        <defs><linearGradient id=${p} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${l}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?M`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:M`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${p})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${o}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,e=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),l=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing"),p=this._findEntity("sensor","profile"),h=this._findEntity("sensor","sprites"),m=this._findEntity("sensor","power_ranking"),f=!!h&&!["unavailable","unknown"].includes(h.state);if(!e&&!a&&!o)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let b=o?.state==="on"||e?.state==="active",v=e?.attributes||{},u=a?.attributes||{},g=p?.attributes||{},k={...i?.attributes||{},current_rank:i?.state},_={...r?.attributes||{},current_rank:r?.state},S=this._config.layout||"auto",w=this._view??(b?"session":"stats");S==="session_only"?w="session":S==="career_only"?w="stats":S==="events_only"&&(w="events"),w==="events"&&!this._eventsEnabled&&(w="stats"),w==="sprites"&&!f&&(w="stats");let N="",_t={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};_t[this._config.theme_accent||""]&&(N+=`--accent: ${_t[this._config.theme_accent]};`),this._config.custom_background&&(N+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let jt=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return n`
      <ha-card class=${jt} style="${N}">
        ${this._renderHeader(t,b,v,u,g,l,k,_)}
        ${this._config.show_sub_buttons!==!1&&S!=="events_only"?this._renderButtons(w,b,f):c}
        ${w==="session"?this._renderSessionView(b,v,k):w==="events"?this._renderEventsView():w==="sprites"?this._renderSpritesView(h):w==="trends"?this._renderTrendsView():w==="pass"?this._renderPassView(l):this._renderStatsView(u,g,k,_,m)}
      </ha-card>
    `}_renderHeader(t,e,a,i,r,l,o,p){let h=r.display_name||t.charAt(0).toUpperCase()+t.slice(1),m=r.season||this._catalog.season,f=this._config.show_platforms!==!1?r.platforms||[]:[],b=i.metrics?.last_played,v=l?.attributes||{},u=Number(l?.state)||0,g=Number(v.account_level||0),k=this._avatar?.icon,_=this._config.compact?20:24;return n`
      <div class="fa-header">
        <div class="player-avatar ${k?"has-image":""}">
          ${k?n`<img src=${k} alt=${this._avatar?.name||""} @error=${E} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${h}</h2>
            <span class="header-ranks">
              ${o.current_rank&&o.current_rank!=="Unranked"?this._rankBadge(o.current_rank,_):c}
              ${p.current_rank&&p.current_rank!=="Unranked"?this._rankBadge(p.current_rank,_):c}
            </span>
          </div>
          <div class="player-meta">
            ${m?.number?n`<span class="level-badge">S${m.number} · ${m.days_left}d left</span>`:c}
            ${!this._config.hide_season_level&&u>0?n`<span class="level-badge">Lvl ${u}</span>`:c}
            ${!this._config.hide_account_level&&g>0?n`<span>Acct ${g.toLocaleString()}</span>`:c}
            ${b?.time&&!e?n`<span title=${b.name||""}>Played ${this._formatRelativeTime(b.time)}</span>`:c}
          </div>
          ${f.length?n`<div class="platforms">
                ${f.map(S=>n`<span class="platform-chip" title=${S.name||S.label}>${S.label}${S.name?n` · ${S.name}`:c}</span>`)}
              </div>`:c}
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
      ${m?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${m.number}: ${m.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,m.progress_pct)}%"></div>
          </div>`:c}
    `}_liveEventCount(){let t=this._currentFilters();return(this._events.list||[]).filter(e=>this._matchesFilters(e,t)&&e.windows.some(a=>this._windowState(a)==="live")).length}_renderButtons(t,e,a=!1){let i=this._config.layout||"auto",r=this._eventsEnabled?this._liveEventCount():0,l=(o,p,h,m=0)=>n`
      <button class="bubble-sub-button ${t===o?"active":""}" @click=${()=>this._setView(o)} title=${h}>
        <ha-icon icon=${p}></ha-icon><span class="btn-label">${h}</span>
        ${m>0?n`<span class="notify-badge" title="${m} live">${m}</span>`:c}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${i!=="career_only"?l("session","mdi:lightning-bolt",e?"Live Session":"Last Session"):c}
        ${i!=="session_only"?l("stats","mdi:trophy-outline","Stats"):c}
        ${this._eventsEnabled&&i==="auto"?l("events","mdi:tournament","Events",r):c}
        ${a&&i==="auto"?l("sprites","mdi:ghost-outline","Sprites"):c}
        ${i==="auto"?l("trends","mdi:chart-line","Trends"):c}
        ${i==="auto"?l("pass","mdi:ticket-confirmation-outline","Pass"):c}
        ${e?n`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
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
    `}_renderKpis(t){if(this._config.compact){let e=[];for(let a=0;a<t.length;a+=2)e.push(t.slice(a,a+2));return n`<table class="stat-table"><tbody>
        ${e.map(a=>n`<tr>
          ${a.map(([i,r,l])=>n`<th>${i}</th><td class="kpi-value ${l||""}">${r}</td>`)}
          ${a.length<2?n`<th></th><td></td>`:c}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${t.map(([e,a,i])=>n`<div class="kpi-chip"><span class="kpi-label">${e}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(t,e,a,i){let r=e.current_rank||"Unranked",l=Number(e.progress_pct||0),o=r.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${t}</span></span>
          <span class="rank-name" style="color: ${(O[Object.keys(O).find(p=>r.startsWith(p))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${o?n`<div class="unreal-position">
              <span class="unreal-number">${e.unreal_rank?`#${this._num(e.unreal_rank)}`:"Unreal"}</span>
              ${i?n`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:c}
            </div>`:this._config.hide_rank_progress?c:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,l))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${o?"Unreal leaderboard position":`${l}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,e,a){let i=Number(e.net_rank_delta_pct||0),r=b=>b>=0?`+${b}%`:`${b}%`,l=e.session_id,o=l?`session:${l}:${e.matches_played||0}`:"";o&&this._config.show_match_feed!==!1&&this._ensureMatches(o,{session_id:l});let h=(o?this._matchLists[o]?.matches:void 0)||e.recent_matches||[],m=h.filter(b=>this._isRanked(b)),f=m.filter(b=>b.rank_track===a.game_mode&&typeof b.unreal_rank_change=="number").reduce((b,v)=>b+(v.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",e.matches_played||0,"cyan"],["Wins",`${e.wins||0} \u{1F3C6}`,"gold"],["Kills",e.kills||0],["K/D",e.kd_ratio||0],...m.length?[["Rank Net",r(i),i>=0?"positive":"negative"]]:[]])}

      ${m.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${r(i)} this session`,f||null):c}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${e.matches_played||h.length} ${(e.matches_played||h.length)===1?"match":"matches"})</span>
              ${t?n`<span class="tracking-live">Tracking Live</span>`:c}
            </div>
            ${this._renderMatchList(o||"session",h,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:c}
    `}_renderMatchList(t,e,a){let i=this._config.max_feed_matches||10,r=this._showAllMatches[t],l=r?e:e.slice(0,i);return n`
      <div class="match-list">
        ${l.length?l.map(o=>this._renderMatch(o)):n`<div class="empty">${a}</div>`}
        ${e.length>i?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[t]:!r}}>
              ${r?"Show fewer":`Show all ${e.length}`}
            </button>`:c}
      </div>
    `}_renderMatch(t){let e=this._playlist(t.playlist_id),a=e?.image,i=`${t.timestamp}|${t.playlist_id}`,r=this._expandedMatch===i,l=(t.match_count||1)>1,o=this._isRanked(t),p=(h,m)=>m==null||m===""?c:n`<div class="detail"><span>${h}</span><b>${m}</b></div>`;return n`
      <div class="match-card ${t.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:i}>
        <div class="match-row">
          ${a?n`<img class="match-art" src=${a} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${t.match_number}${(t.match_count||1)>1?` \xD7${t.match_count}`:""}</span>
              <span class="placement-badge ${t.is_victory?"win":""}">${t.placement_text}</span>
            </div>
            <span class="match-mode">${t.mode_name} • ${this._formatRelativeTime(t.timestamp)}</span>
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${t.kills}</span>
            ${t.rank_delta_pct&&this._isRanked(t)?n`<span class="rank-delta-badge ${t.rank_delta_pct>=0?"pos":"neg"}">
                  ${t.rank_delta_pct>=0?`+${t.rank_delta_pct}%`:`${t.rank_delta_pct}%`}
                </span>`:c}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?n`<div class="match-details" @click=${h=>h.stopPropagation()}>
              ${a?n`<img class="detail-art" src=${a} alt="" @error=${E} />`:c}
              ${e?.description?n`<p class="detail-desc">${e.description}</p>`:c}
              <div class="detail-grid">
                ${p("Finished",this._formatWhen(t.timestamp))}
                ${p("Mode",t.mode_name)}
                ${p("Placement",t.placement_text)}
                ${p("Kills",t.kills)}
                ${l?p("Games",t.match_count):c}
                ${l&&t.wins?p("Victories",t.wins):c}
                ${p("Time played",t.minutes?this._formatDuration(t.minutes):void 0)}
                ${p("Score",t.score?this._num(t.score):void 0)}
                ${p("Players outlived",t.players_outlived?this._num(t.players_outlived):void 0)}
                ${o?n`
                      ${p("Ranked track",t.rank_track)}
                      ${p("Rank after",t.unreal_rank?`${t.current_rank} #${this._num(t.unreal_rank)}`:t.current_rank)}
                      ${p("Rank change",t.rank_delta_pct?`${t.rank_delta_pct>0?"+":""}${t.rank_delta_pct}%`:void 0)}
                      ${p("Unreal places",t.unreal_rank_change?`${t.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(t.unreal_rank_change))}`:void 0)}`:c}
              </div>
              ${(t.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:c}
            </div>`:c}
      </div>
    `}_renderStatsView(t,e,a,i,r){let l=e.windows||{},o=e.window_labels||{},p=["lifetime",...["season","week","today"].filter(w=>l[w])],h=p.includes(this._window)?this._window:"lifetime",m={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},f=t.metrics||{},b={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:f.hours_played,favourite_mode:f.favourite_mode,modes:t.modes||{}},v=h==="lifetime"?b:l[h],u=this._selectedMode!=="all"?v.modes?.[this._selectedMode]:null,g=u&&u.matches!==void 0?u:v,k=g.minutes!==void 0?Math.round(g.minutes/60*10)/10:v.hours_played,_=v.favourite_mode,S=(w,N)=>n`
      <button class="mode-tab ${this._selectedMode===w?"active":""}" @click=${()=>this._selectedMode=w}>${N}</button>
    `;return n`
      <div class="tab-rows">
        ${p.length>1?n`<div class="mode-tabs">
              ${p.map(w=>n`<button class="mode-tab ${h===w?"active":""}" title=${o[w]||""}
                  @click=${()=>this._window=w}>${m[w]}</button>`)}
            </div>`:c}
        <div class="mode-tabs">
          ${S("all","Overall")} ${S("zero_build","Zero Build")} ${S("build","Build")} ${S("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${g.win_rate||0}%`,"cyan"],["K/D",g.kd||0],["Wins",n`${this._num(g.wins)} 🏆`,"gold"],["Matches",this._num(g.matches)],["Kills",this._num(g.kills)],["Outlived",this._num(g.players_outlived)],["Kills/Match",g.matches?this._num(g.kills/g.matches,2):0],...k!==void 0?[["Hours",this._num(k,1)]]:[]])}

      ${h==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):c}
      ${_?this._renderFavourite(_,h!=="lifetime"?m[h]:""):c}
      ${h!=="lifetime"&&v?.since?this._renderWindowMatches(h,m[h],v):c}

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
      ${e.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:c}
    `}_renderOtherTracks(t){let e=(t.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return e.length?n`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${e.map(a=>n`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(O[Object.keys(O).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:c}_lineChart(t,e,a){let o=t.map(_=>_.v),p=Math.min(...o),h=Math.max(...o),m=h-p||Math.abs(h)||1,f=t[0].t,b=t[t.length-1].t||f+1,v=_=>6+(_-f)/(b-f||1)*308,u=_=>84-(_-p)/m*78,g=t.map((_,S)=>`${S?"L":"M"}${v(_.t).toFixed(1)},${u(_.v).toFixed(1)}`).join(" "),k=_=>new Date(_).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return n`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${M`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${g}" class="trend-line"></path>
        ${t.map(_=>M`<g class="trend-pt"><circle cx="${v(_.t)}" cy="${u(_.v)}" r="7" class="trend-hit"></circle><circle cx="${v(_.t)}" cy="${u(_.v)}" r="2.5" class="trend-dot"></circle><title>${k(_.t)}: ${e(_.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let e=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!e.length)return n`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,r=4,l=Math.max(4,...e.map(p=>p.kills||0)),o=(a-2*r)/e.length;return n`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${M`${e.map((p,h)=>{let m=Math.max(2,(p.kills||0)/l*(i-14)),f=r+h*o+1;return M`<g><rect x="${f}" y="${i-m}" width="${Math.max(2,o-2)}" height="${m}" rx="2" class="kill-bar"></rect>
          ${p.is_victory?M`<text x="${f+(o-2)/2}" y="${i-m-3}" text-anchor="middle" class="win-mark">★</text>`:c}
          <rect x="${f-1}" y="0" width="${o}" height="${i}" fill="transparent"><title>${this._formatWhen(p.timestamp)} · ${p.mode_name}: ${p.kills} kills · ${p.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${l} kills</span></div>`}_renderTrendsView(){let t=this._trends,e=Nt.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return c;let r=((t.stats||{})[i]||[]).map(b=>({t:typeof b.start=="number"?b.start:Date.parse(b.start),v:b.mean??b.state??b.max})).filter(b=>typeof b.v=="number"),l=this.hass.states[i];if(!r.length&&(!l||["unavailable","unknown"].includes(l.state)))return c;let o=b=>`${this._num(b,a.digits||0)}${a.unit||""}`,p=r[0]?.v,h=r[r.length-1]?.v,m=r.length>1?h-p:null,f=m==null||m===0?"":m>0!=!!a.lowerBetter?"positive":"negative";return n`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${f}">${l&&!isNaN(Number(l.state))?o(Number(l.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,o,t.period||"day"):n`<div class="collecting">Collecting history — the chart fills in as Home Assistant records it.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${m>=0?"\u25B2":"\u25BC"} ${o(Math.abs(m))} over ${r.length} ${t.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return n`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${t.loading&&!t.stats?n`<div class="empty">Loading history…</div>`:c}
      ${t.error?n`<div class="empty">${t.error}</div>`:c}
      <div class="trend-grid">${e}</div>
    `}_renderPassView(t){let e=this._pass;if(e.loading||e.data===void 0)return n`<div class="empty">Loading Battle Pass…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(!e.data)return n`<div class="empty">The Battle Pass catalogue is not available right now.</div>`;let a=e.data,i=Number(t?.state)||null,r=new Map;for(let p of a.pages){let h=String(p.track||"").replace(/Bonus$/,"");r.has(h)||r.set(h,r.size+1)}let l=p=>p.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(p.name)?p.name:p.type||"Reward",o=this._showAllPages?a.pages:a.pages.slice(0,4);return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title"><ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon><span>Season ${a.season} Battle Pass</span></span>
          ${i?n`<span class="rank-name">Level ${i}</span>`:c}
        </div>
        <div class="sprite-stats">
          <span><b>${a.reward_count}</b> rewards</span><span><b>${a.pages.length}</b> pages</span>
          ${a.prices.filter(p=>p.cost).map(p=>n`<span>${p.name}: <b>${this._num(p.cost)}</b> ${Ut(p.currency,p.cost)}</span>`)}
        </div>
        <div class="perk-desc">Which rewards you have claimed is not available from this data source.</div>
      </div>
      ${o.map(p=>n`
        <div class="section-title">Section ${r.get(String(p.track||"").replace(/Bonus$/,""))} · ${/Bonus$/.test(p.track||"")?"bonus page":"page"} ${p.page}</div>
        <div class="variant-tiles">
          ${p.rewards.map(h=>n`
            <div class="variant-tile" style="--rarity:${X[h.rarity]||"#9CA3AF"}" title="${l(h)}${h.type?` (${h.type})`:""}">
              ${h.icon?n`<img src=${h.icon} alt="" loading="lazy" @error=${E} />`:n`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
              <span class="variant-name">${l(h)}</span>
              <span class="variant-status">${h.price_row==="Included"||h.cost===0?"Included":h.cost!=null?`${h.cost} ${Ut(h.currency,h.cost)}`:h.type||""}</span>
            </div>`)}
        </div>`)}
      ${a.pages.length>4?n`<button class="mini-button show-more" @click=${()=>this._showAllPages=!this._showAllPages}>
            ${this._showAllPages?"Show fewer pages":`Show all ${a.pages.length} pages`}</button>`:c}
    `}_spriteCurve(t){let e=[...t.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,r)=>i.level-r.level),a=[];for(let i of e){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(t,e){if(typeof t!="number"||!e.length)return null;let a=0;e.forEach(([,o],p)=>{t>=o&&(a=p)});let[i]=e[a],r=e[e.length-1],l=e[a+1];return{level:i,maxLevel:r[0],maxXp:r[1],next:l?l[1]:null,toMax:Math.max(0,r[1]-t),atMax:a===e.length-1}}_renderSpritesView(t){let e=t?.attributes||{},a=this._spriteCurve(e),i=e.families||[],r=Number(t?.state||0),l=Number(e.owned_variants||0),o=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],h=[...i.filter(u=>this._spriteFilter==="missing"?u.owned_variants<u.total_variants:this._spriteFilter==="unmastered"?u.variants.some(g=>g.owned&&!g.mastered):this._spriteFilter==="complete"?u.complete:!0)].sort((u,g)=>this._spriteSort==="rarity"?o.indexOf(g.rarity)-o.indexOf(u.rarity)||(u.dex??0)-(g.dex??0):this._spriteSort==="progress"&&g.owned_variants/g.total_variants-u.owned_variants/u.total_variants||(u.dex??0)-(g.dex??0)),m=i.flatMap(u=>u.variants.filter(g=>!g.owned&&g.drop_chance_pct).map(g=>({f:u,v:g}))).sort((u,g)=>g.v.drop_chance_pct-u.v.drop_chance_pct||o.indexOf(u.f.rarity)-o.indexOf(g.f.rarity)).slice(0,6),f=a.length?i.flatMap(u=>u.variants.filter(g=>g.owned&&typeof g.xp=="number"&&g.xp>0).map(g=>({f:u,v:g,lv:this._spriteLevel(g.xp,a)}))).filter(u=>u.lv&&!u.lv.atMax).sort((u,g)=>u.lv.toMax-g.lv.toMax).slice(0,6):[],b=(u,g)=>n`
      <button class="mode-tab ${this._spriteFilter===u?"active":""}" @click=${()=>this._spriteFilter=u}>${g}</button>`,v=(u,g)=>n`
      <button class="mode-tab ${this._spriteSort===u?"active":""}" @click=${()=>this._spriteSort=u}>${g}</button>`;return n`
      <div class="rank-section sprite-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,r)}">
          <span>${Math.round(r)}%</span>
        </div>
        <div class="sprite-summary-main">
          <div class="rank-header">
            <span class="rank-title"><span>Sprite collection</span></span>
            <span class="muted">Game update ${e.version||"?"}</span>
          </div>
          <div class="sprite-stats">
            <span><b>${l}</b>/${e.total_variants} variants</span>
            <span><b>${e.owned_families}</b>/${e.total_families} sprites</span>
            <span><b>${e.complete_families??0}</b> full sets</span>
            <span>★ <b>${e.mastered_variants||0}</b>/${l} mastered</span>
          </div>
          ${e.equipped?n`<div class="rank-meta"><span>Equipped: <b>${e.equipped.variant}</b></span></div>`:c}
        </div>
      </div>

      ${(e.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">By game update${e.cumulative?n` · all-time ${e.cumulative.owned_variants}/${e.cumulative.total_variants}`:c}</div>
            ${e.versions.map(u=>n`
              <div class="version-row ${u.current?"current":""}">
                <span>${u.version}${u.current?" (now)":""}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,u.completion_pct)}%"></div></div>
                <span>${u.owned_variants}/${u.total_variants}</span>
              </div>`)}
          </div>`:c}

      ${f.length?n`<div class="split-section">
            <div class="section-title">Closest to mastering (current copy, level ${a[a.length-1][0]} = ${this._num(a[a.length-1][1])} XP)</div>
            <div class="master-list">
              ${f.map(({f:u,v:g,lv:k})=>n`
                <div class="master-row" style="--rarity:${X[u.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=u.id}>
                  ${g.icon?n`<img src=${g.icon} alt="" @error=${E} />`:c}
                  <span class="variant-name">${u.name.replace(/ Sprite$/,"")}${g.label!=="Base"?` \xB7 ${g.label}`:""}</span>
                  <span>Lv ${k.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,g.xp/k.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(k.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:c}

      ${m.length?n`<div class="split-section">
            <div class="section-title">Next to hunt (highest drop chance)</div>
            <div class="hunt-row">
              ${m.map(({f:u,v:g})=>n`
                <div class="hunt-item" style="--rarity:${X[u.rarity]||"#9CA3AF"}" title="${g.name}" @click=${()=>this._expandedSprite=u.id}>
                  ${g.icon?n`<img src=${g.icon} alt="" @error=${E} />`:c}
                  <span>${g.label==="Base"?u.name.replace(/ Sprite$/,""):`${g.label} ${u.name.replace(/ Sprite$/,"")}`}</span>
                  <small>${g.drop_chance_pct}%</small>
                </div>`)}
            </div>
          </div>`:c}

      <div class="tab-rows">
        <div class="mode-tabs">${b("all","All")} ${b("missing","Missing")} ${b("unmastered","To master")} ${b("complete","Full sets")}</div>
        <div class="mode-tabs">${v("dex","Dex")} ${v("rarity","Rarity")} ${v("progress","Progress")}</div>
      </div>

      <div class="sprite-grid">
        ${h.length?h.map(u=>{let g=this._expandedSprite===u.id;return n`
                <div class="sprite-card ${u.owned?"":"missing"} ${g?"open":""} ${u.complete?"complete":""}"
                  style="--rarity:${X[u.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=g?null:u.id}>
                  ${u.icon?n`<img src=${u.icon} alt="" @error=${E} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  <span class="sprite-name">${u.name.replace(/ Sprite$/,"")}</span>
                  <span class="sprite-count">${u.owned_variants}/${u.total_variants}${u.mastered?n` · ★${u.mastered}`:c}</span>
                  <span class="sprite-dots">
                    ${(u.variants||[]).map(k=>n`<i class="dot ${k.owned?"owned":""} ${k.mastered?"mastered":""}" title=${k.label}></i>`)}
                  </span>
                </div>
                ${g?this._renderSpriteDetail(u):c}`}):n`<div class="empty">Nothing matches this filter.</div>`}
      </div>
    `}_variantPerks(t){let e=new Set,a=(t.variants||[]).flatMap(i=>(i.boons||[]).filter(r=>r.name&&r.name!==t.name&&!e.has(r.name)&&e.add(r.name)).map(r=>({variant:i.label,...r})));return a.length?n`<div class="perk-list">
      <div class="section-title">Variant perks</div>
      ${a.map(i=>n`<div class="detail-line"><b>${i.variant}</b>${i.name!==i.variant?n`<span>${i.name}</span>`:c}</div>
        ${i.description?n`<div class="perk-desc">${i.description}</div>`:c}`)}
    </div>`:c}_renderSpriteDetail(t){let e=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{});return n`
      <div class="sprite-detail" style="--rarity:${X[t.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${t.icon_large||t.icon?n`<img src=${t.icon_large||t.icon} alt="" @error=${E} />`:c}
          <div>
            <b>${t.name}</b> <span class="tag rarity-tag">${t.rarity||""}</span>
            ${t.description?n`<p class="detail-desc">${t.description}</p>`:c}
            ${t.hint?n`<p class="detail-desc hint">📍 ${t.hint}</p>`:c}

          </div>
        </div>
        ${this._variantPerks(t)}
        <div class="variant-tiles">
          ${(t.variants||[]).map(a=>n`
            <div class="variant-tile ${a.owned?"":"missing"} ${a.mastered?"mastered":""}" title=${a.name}>
              ${a.icon?n`<img src=${a.icon} alt="" @error=${E} />`:c}
              <span class="variant-name">${a.label}</span>
              <span class="variant-status">
                ${a.owned?(()=>{let i=this._spriteLevel(a.xp,e),r=i?i.atMax?`Lv ${i.level}${a.xp>i.maxXp?"+":""}`:`Lv ${i.level} \xB7 ${this._num(a.xp)}/${this._num(i.next)}`:a.xp?`${this._num(a.xp)} XP`:"Owned";return n`${r}${a.count>1?` \xB7 \xD7${a.count}`:""}${a.mastered?n` <span title="Mastered at some point (collection record)">★</span>`:c}`})():a.drop_chance_pct!=null?`Missing \xB7 ${a.drop_chance_pct}%`:"Missing \xB7 special"}
              </span>
            </div>`)}
        </div>
      </div>
    `}_renderWindowMatches(t,e,a){let i=`window:${t}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let r=this._matchLists[i],l=r?.matches||[],o=r?.tracked??0,p=a.matches||0;return n`
      <div class="match-feed-header">
        <span>${e} matches (${o}${p>o?` of ${p}`:""})</span>
        ${p>o?n`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>`:c}
      </div>
      ${r?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,l,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(t,e){let a=this._playlist(t.playlist_id),i=a?.image,r=/ropesmile|reload/i.test(t.playlist_id+t.name)?"reload":/nobuild|zero build/i.test(t.playlist_id+t.name)?"zero_build":"build";return n`
      <div class="feature-card ${i?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${e?` \xB7 ${e}`:""}</span>
          <span class="feature-value">${a?.name||t.name}</span>
          <span class="feature-sub">${this._num(t.matches)} matches</span>
        </div>
        ${i?n`<img class="feature-art" src=${i} alt="" @error=${E} />`:n`<ha-icon class="feature-icon" icon=${de[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(t){let e=t.metrics||{},a=Object.values(t.inputs||{}).filter(r=>r.share_pct>=1),i=t.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",e.kills_per_minute??0],["Avg Match",`${e.avg_match_minutes??0}m`],["Score/Match",this._num(e.score_per_match)],["Solo Top 10",`${e.solo_top10_rate??0}%`],["Solo Top 25",`${e.solo_top25_rate??0}%`]])}
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
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",type:"all",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(t,e){return!(e.region!=="all"&&t.region_group!==e.region||e.type!=="all"&&t.tournament_type!==e.type||(e.mode==="Ranked"?!t.ranked:e.mode!=="all"&&t.mode!==e.mode)||e.team!=="all"&&t.team!==e.team||e.platform!=="all"&&!(t.platform_groups||[]).includes(e.platform))}_setFilter(t,e){this._filters={...this._currentFilters(),[t]:e}}_renderEventsView(){let t=this._events;if(t.loading&&!t.list)return n`<div class="empty">Loading tournaments…</div>`;if(t.error)return n`<div class="empty">${t.error}</div>`;if(t.list===null)return n`<div class="empty">Tournament schedule is not available right now.</div>`;let e=t.list||[],a=this._currentFilters(),i=[...new Set(e.map(o=>o.region_group))].sort(),r=e.filter(o=>this._matchesFilters(o,a)).filter(o=>o.windows.some(p=>this._windowState(p)!=="finished")||this._expandedEvent===o.key),l=(o,p)=>n`
      <select class="filter-select" .value=${a[o]} @change=${h=>this._setFilter(o,h.target.value)}>
        ${p.map(([h,m])=>n`<option value=${h} ?selected=${a[o]===h}>${m}</option>`)}
      </select>
    `;return n`
      <div class="event-filters">
        ${l("region",[["all","All regions"],...i.map(o=>[o,o])])}
        ${l("type",[["all","Type"],...[...new Set(e.map(o=>o.tournament_type).filter(Boolean))].map(o=>[o,Ot[o]||o])])}
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
    `}_eventTiming(t){let e=t.windows.find(l=>this._windowState(l)==="live");if(e)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(e.end)-this._now)}`,live:!0,soon:!1};let a=t.windows.find(l=>this._windowState(l)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,r=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:r}}_renderEvent(t){let e=this._eventTiming(t),a=this._expandedEvent===t.key,i=t.tournament_type?Ot[t.tournament_type]||t.tournament_type:null,r=[t.mode,t.team,t.ranked&&t.tournament_type!=="RankedCup"?"Ranked":null,...t.platform_groups||[],t.region].filter(Boolean);return n`
      <div class="event-card ${e.live?"live":""} ${a?"expanded":""} ${t.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(t)}>
          ${t.poster?n`<img class="event-art" src=${t.poster} alt="" loading="lazy" @error=${E} />`:c}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${t.name}</span>
              ${e.live?n`<span class="placement-badge win">LIVE</span>`:c}
            </div>
            <span class="match-mode ${e.soon?"soon":""}">${e.text}</span>
            <div class="tag-row">
              ${i?n`<span class="tag type-tag ${t.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:c}
              ${t.can_spectate?n`<span class="tag spectate-tag" title="Epic allows spectating this session inside Fortnite">👁 Spectate in-game</span>`:c}
              ${r.map(l=>n`<span class="tag">${l}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(t):c}
      </div>
    `}_renderEventDetails(t){let e=t.loading_screen||t.poster;return n`
      <div class="event-details">
        ${e?n`<img class="event-hero" src=${e} alt="" @error=${E} />`:c}
        ${t.subtitle&&t.subtitle!==t.name?n`<div class="detail-sub">${t.subtitle}</div>`:c}
        ${t.description?n`<p class="detail-desc">${t.description}</p>`:c}
        ${t.schedule_info?n`<p class="detail-desc muted">${t.schedule_info}</p>`:c}
        ${t.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${t.platform_groups.join(", ")}</b></div>`:c}
        <div class="detail-line"><span>Region</span><b>${t.region}</b></div>
        ${t.min_account_level?n`<div class="detail-line"><span>Minimum account level</span><b>${t.min_account_level}</b></div>`:c}
        ${t.tournament_type==="FNCS"?n`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Epic streams major FNCS rounds on its official channels; this schedule does not say which sessions are broadcast.</div>`:c}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${t.windows.map(a=>{let i=this._windowState(a),r=`${t.event_id}|${a.window_id}`,l=this._leaderboards[r],o=Date.parse(a.begin)-this._now;return n`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":o<7*864e5?`in ${this._formatSpan(o)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(t.event_id,a.window_id)}>
                        ${l?.loading?"Loading\u2026":l?.data?"Refresh":"Leaderboard"}
                      </button>`:c}
                </div>
                ${l?this._renderLeaderboard(l):c}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(t){if(t.error)return n`<div class="lb-note">${t.error}</div>`;if(!t.data)return t.loading?n`<div class="lb-note">Loading leaderboard…</div>`:c;let e=t.data,a=(i,r=!1)=>n`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${e.player&&!e.entries.some(i=>i.is_player)?a(e.player,!0):c}
        ${e.entries.length?e.entries.map(i=>a(i,i.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${e.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(e.updated)}${e.total_pages?` \xB7 ${e.total_pages} pages`:""}</div>`:c}
      </div>
    `}};y([U({attribute:!1})],$.prototype,"hass",2),y([x()],$.prototype,"_config",2),y([x()],$.prototype,"_view",2),y([x()],$.prototype,"_window",2),y([x()],$.prototype,"_selectedMode",2),y([x()],$.prototype,"_loadingAction",2),y([x()],$.prototype,"_catalog",2),y([x()],$.prototype,"_avatar",2),y([x()],$.prototype,"_events",2),y([x()],$.prototype,"_filters",2),y([x()],$.prototype,"_expandedEvent",2),y([x()],$.prototype,"_expandedMatch",2),y([x()],$.prototype,"_leaderboards",2),y([x()],$.prototype,"_now",2),y([x()],$.prototype,"_matchLists",2),y([x()],$.prototype,"_showAllMatches",2),y([x()],$.prototype,"_expandedSprite",2),y([x()],$.prototype,"_spriteFilter",2),y([x()],$.prototype,"_spriteSort",2),y([x()],$.prototype,"_trends",2),y([x()],$.prototype,"_pass",2),y([x()],$.prototype,"_showAllPages",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",$);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${oe} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{$ as FortniteActivityCard};
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
