var ee=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var w=(d,i,t,e)=>{for(var a=e>1?void 0:e?ae(i,t):i,s=d.length-1,r;s>=0;s--)(r=d[s])&&(a=(e?r(i,t,a):r(a))||a);return e&&a&&ee(i,t,a),a};var at=globalThis,it=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),zt=new WeakMap,I=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(it&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=zt.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&zt.set(t,i))}return i}toString(){return this.cssText}},Rt=d=>new I(typeof d=="string"?d:d+"",void 0,ht),W=(d,...i)=>{let t=d.length===1?d[0]:i.reduce((e,a,s)=>e+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+d[s+1],d[0]);return new I(t,d,ht)},Ft=(d,i)=>{if(it)d.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),a=at.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,d.appendChild(e)}},ut=it?d=>d:d=>d instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return Rt(t)})(d):d;var{is:ie,defineProperty:se,getOwnPropertyDescriptor:re,getOwnPropertyNames:ne,getOwnPropertySymbols:oe,getPrototypeOf:le}=Object,st=globalThis,Pt=st.trustedTypes,ce=Pt?Pt.emptyScript:"",de=st.reactiveElementPolyfillSupport,K=(d,i)=>d,q={toAttribute(d,i){switch(i){case Boolean:d=d?ce:null;break;case Object:case Array:d=d==null?d:JSON.stringify(d)}return d},fromAttribute(d,i){let t=d;switch(i){case Boolean:t=d!==null;break;case Number:t=d===null?null:Number(d);break;case Object:case Array:try{t=JSON.parse(d)}catch{t=null}}return t}},rt=(d,i)=>!ie(d,i),Lt={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??=Symbol("metadata"),st.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=Lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(i,e,t);a!==void 0&&se(this.prototype,i,a)}}static getPropertyDescriptor(i,t,e){let{get:a,set:s}=re(this.prototype,i)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let o=a?.call(this);s?.call(this,r),this.requestUpdate(i,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Lt}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let i=le(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let t=this.properties,e=[...ne(t),...oe(t)];for(let a of e)this.createProperty(a,t[a])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let a of e)t.unshift(ut(a))}else i!==void 0&&t.push(ut(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),a=this.constructor._$Eu(i,e);if(a!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:q).toAttribute(t,e.type);this._$Em=i,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(i,t){let e=this.constructor,a=e._$Eh.get(i);if(a!==void 0&&this._$Em!==a){let s=e.getPropertyOptions(a),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:q;this._$Em=a;let o=r.fromAttribute(t,s.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(i,t,e,a=!1,s){if(i!==void 0){let r=this.constructor;if(a===!1&&(s=this[i]),e??=r.getPropertyOptions(i),!((e.hasChanged??rt)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:a,wrapped:s},r){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,r??t??this[i]),s!==!0||r!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),a===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,s]of e){let{wrapped:r}=s,o=this[a];r!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,s,o)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[K("elementProperties")]=new Map,R[K("finalized")]=new Map,de?.({ReactiveElement:R}),(st.reactiveElementVersions??=[]).push("2.1.2");var _t=globalThis,Dt=d=>d,nt=_t.trustedTypes,Bt=nt?nt.createPolicy("lit-html",{createHTML:d=>d}):void 0,Vt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+P,pe=`<${Ht}>`,B=document,Z=()=>B.createComment(""),G=d=>d===null||typeof d!="object"&&typeof d!="function",yt=Array.isArray,he=d=>yt(d)||typeof d?.[Symbol.iterator]=="function",gt=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Nt=/>/g,L=RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ot=/'/g,Ut=/"/g,It=/^(?:script|style|textarea|title)$/i,$t=d=>(i,...t)=>({_$litType$:d,strings:i,values:t}),n=$t(1),F=$t(2),ze=$t(3),T=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),jt=new WeakMap,D=B.createTreeWalker(B,129);function Wt(d,i){if(!yt(d)||!d.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bt!==void 0?Bt.createHTML(i):i}var ue=(d,i)=>{let t=d.length-1,e=[],a,s=i===2?"<svg>":i===3?"<math>":"",r=Y;for(let o=0;o<t;o++){let l=d[o],h,m,u=-1,y=0;for(;y<l.length&&(r.lastIndex=y,m=r.exec(l),m!==null);)y=r.lastIndex,r===Y?m[1]==="!--"?r=Tt:m[1]!==void 0?r=Nt:m[2]!==void 0?(It.test(m[2])&&(a=RegExp("</"+m[2],"g")),r=L):m[3]!==void 0&&(r=L):r===L?m[0]===">"?(r=a??Y,u=-1):m[1]===void 0?u=-2:(u=r.lastIndex-m[2].length,h=m[1],r=m[3]===void 0?L:m[3]==='"'?Ut:Ot):r===Ut||r===Ot?r=L:r===Tt||r===Nt?r=Y:(r=L,a=void 0);let f=r===L&&d[o+1].startsWith("/>")?" ":"";s+=r===Y?l+pe:u>=0?(e.push(h),l.slice(0,u)+Vt+l.slice(u)+P+f):l+P+(u===-2?o:f)}return[Wt(d,s+(d[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},Q=class d{constructor({strings:i,_$litType$:t},e){let a;this.parts=[];let s=0,r=0,o=i.length-1,l=this.parts,[h,m]=ue(i,t);if(this.el=d.createElement(h,e),D.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=D.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Vt)){let y=m[r++],f=a.getAttribute(u).split(P),x=/([.?@])?(.*)/.exec(y);l.push({type:1,index:s,name:x[2],strings:f,ctor:x[1]==="."?bt:x[1]==="?"?ft:x[1]==="@"?vt:j}),a.removeAttribute(u)}else u.startsWith(P)&&(l.push({type:6,index:s}),a.removeAttribute(u));if(It.test(a.tagName)){let u=a.textContent.split(P),y=u.length-1;if(y>0){a.textContent=nt?nt.emptyScript:"";for(let f=0;f<y;f++)a.append(u[f],Z()),D.nextNode(),l.push({type:2,index:++s});a.append(u[y],Z())}}}else if(a.nodeType===8)if(a.data===Ht)l.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(P,u+1))!==-1;)l.push({type:7,index:s}),u+=P.length-1}s++}}static createElement(i,t){let e=B.createElement("template");return e.innerHTML=i,e}};function U(d,i,t=d,e){if(i===T)return i;let a=e!==void 0?t._$Co?.[e]:t._$Cl,s=G(i)?void 0:i._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(d),a._$AT(d,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(i=U(d,a._$AS(d,i.values),a,e)),i}var mt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,a=(i?.creationScope??B).importNode(t,!0);D.currentNode=a;let s=D.nextNode(),r=0,o=0,l=e[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new X(s,s.nextSibling,this,i):l.type===1?h=new l.ctor(s,l.name,l.strings,this,i):l.type===6&&(h=new xt(s,this,i)),this._$AV.push(h),l=e[++o]}r!==l?.index&&(s=D.nextNode(),r++)}return D.currentNode=B,a}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},X=class d{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=U(this,i,t),G(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==T&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):he(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&G(this._$AH)?this._$AA.nextSibling.data=i:this.T(B.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,a=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=Q.createElement(Wt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let s=new mt(a,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(i){let t=jt.get(i.strings);return t===void 0&&jt.set(i.strings,t=new Q(i)),t}k(i){yt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let s of i)a===t.length?t.push(e=new d(this.O(Z()),this.O(Z()),this,this.options)):e=t[a],e._$AI(s),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=Dt(i).nextSibling;Dt(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,a,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=t,this._$AM=a,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(i,t=this,e,a){let s=this.strings,r=!1;if(s===void 0)i=U(this,i,t,0),r=!G(i)||i!==this._$AH&&i!==T,r&&(this._$AH=i);else{let o=i,l,h;for(i=s[0],l=0;l<s.length-1;l++)h=U(this,o[e+l],t,l),h===T&&(h=this._$AH[l]),r||=!G(h)||h!==this._$AH[l],h===p?i=p:i!==p&&(i+=(h??"")+s[l+1]),this._$AH[l]=h}r&&!a&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},bt=class extends j{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},ft=class extends j{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},vt=class extends j{constructor(i,t,e,a,s){super(i,t,e,a,s),this.type=5}_$AI(i,t=this){if((i=U(this,i,t,0)??p)===T)return;let e=this._$AH,a=i===p&&e!==p||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,s=i!==p&&(e===p||a);a&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},xt=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){U(this,i)}};var ge=_t.litHtmlPolyfillSupport;ge?.(Q,X),(_t.litHtmlVersions??=[]).push("3.3.3");var Kt=(d,i,t)=>{let e=t?.renderBefore??i,a=e._$litPart$;if(a===void 0){let s=t?.renderBefore??null;e._$litPart$=a=new X(i.insertBefore(Z(),s),s,void 0,t??{})}return a._$AI(d),a};var wt=globalThis,z=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Kt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};z._$litElement$=!0,z.finalized=!0,wt.litElementHydrateSupport?.({LitElement:z});var me=wt.litElementPolyfillSupport;me?.({LitElement:z});(wt.litElementVersions??=[]).push("4.2.2");var be={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:rt},fe=(d=be,i,t)=>{let{kind:e,metadata:a}=t,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),e==="setter"&&((d=Object.create(d)).wrapped=!0),s.set(t.name,d),e==="accessor"){let{name:r}=t;return{set(o){let l=i.get.call(this);i.set.call(this,o),this.requestUpdate(r,l,d,!0,o)},init(o){return o!==void 0&&this.C(r,void 0,d,o),o}}}if(e==="setter"){let{name:r}=t;return function(o){let l=this[r];i.call(this,o),this.requestUpdate(r,l,d,!0,o)}}throw Error("Unsupported decorator location: "+e)};function V(d){return(i,t)=>typeof t=="object"?fe(d,i,t):((e,a,s)=>{let r=a.hasOwnProperty(s);return a.constructor.createProperty(s,e),r?Object.getOwnPropertyDescriptor(a,s):void 0})(d,i,t)}function E(d){return V({...d,state:!0,attribute:!1})}var qt=W`
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
`;var kt=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"}],ve=d=>d.layout==="session_only"?["session"]:d.layout==="career_only"?["stats"]:d.layout==="events_only"?["events"]:kt.map(i=>i.value).filter(i=>i!=="events"||d.show_tournaments!==!1),xe=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; overrides the avatar chosen in the Locker section)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:kt}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...kt]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],J=class extends z{setConfig(i){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...i},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=ve(this._config))}_valueChanged(i){if(!this._config||!this.hass)return;let t=i.target,e=i.detail?i.detail.value:t.value;this._config={...this._config,...e},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?p:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${xe}
          .computeLabel=${i=>i.label||i.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=W`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};w([V({attribute:!1})],J.prototype,"hass",2),w([E()],J.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",J);var _e="1.11.1";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var ye={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},H={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},N={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},$e={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Yt=(d,i)=>{let t=d&&$e[d]||d||"";return i===1||!t?t:`${t}s`},Zt={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Gt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],we={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},St={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},Qt=["session","stats","events","sprites","trends","pass","locker"],ke={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},dt=d=>String(d?.icon||"").split("/").pop()||"",et=d=>d?.type==="Currency"&&(/MTX/i.test(dt(d))||/v-?bucks/i.test(d?.name||"")),lt=d=>d?.type==="AthenaCharacter"||/^T_Soldier_/i.test(dt(d)),ct=d=>{if(lt(d))return"Outfit";if(et(d))return"V-Bucks";let i=dt(d);return d?.type==="AthenaDance"&&/Spray/i.test(i)?"Spray":d?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(i)?"Emoticon":ke[d?.type]||"Cosmetic"},Xt=d=>d?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(d.name)?d.name:ct(d),M=d=>{d.target.hidden=!0},Jt=d=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:d}),tt={at:0},O={at:0},Et=new Map,k=class extends z{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...St};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._selectedOutfit=null;this._renderedView=null;this._entityCache=new Map;this._avatarQuery=""}static get styles(){return qt}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...St,...t},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...St}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-O.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let t=this._config;if(Array.isArray(t.sections)&&t.sections.length){let e=t.sections.filter(a=>Qt.includes(a));if(e.length)return[...new Set(e)]}switch(t.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return Qt.filter(e=>e!=="events"||t.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(e.states[a]!==this.hass.states[a])return!0;return!1}updated(t){if(super.updated(t),!this.hass)return;let e=t.has("hass")&&!t.get("hass");e&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(t.has("_config")||e)&&this._scheduleAvatar(),this._renderedView==="pass"&&(this._loadPass(),this._loadOutfits()),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!tt.promise||Date.now()-tt.at>36e5)&&(tt.at=Date.now(),tt.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await tt.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}async _loadEvents(t=!1){if(this.hass){(t||!O.promise||Date.now()-O.at>10*6e4)&&(O.at=Date.now(),O.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let e=await O.promise;this._events={list:e?.tournaments??null,defaultRegion:e?.default_region_group}}catch(e){O.promise=void 0,this._events={error:e?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let e=t.toLowerCase();Et.has(e)||Et.set(e,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(s=>s?.cosmetic||null).catch(()=>null));let a=await Et.get(e);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadLeaderboard(t,e){let a=`${t}|${e}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let s=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:t,window_id:e,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:s?.leaderboard?{data:s.leaderboard}:{error:s?.unavailable||"Leaderboard unavailable"}}}catch(s){this._leaderboards={...this._leaderboards,[a]:{error:s?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(t){this._outfits={error:t?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let t=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:t?.battlepass??null}}catch(t){this._pass={error:t?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let t=Gt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!t.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let e=(a,s)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:t,period:s,types:["mean","min","max","state"]});try{let a=await e(30,"day"),s="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await e(7,"hour"),s="hour"),this._trends={stats:a||{},at:Date.now(),period:s}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(t,e){!this.hass||this._matchLists[t]||(this._matchLists={...this._matchLists,[t]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...e}).then(a=>{this._matchLists={...this._matchLists,[t]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[t]:{error:a?.message||"Could not load matches"}}}))}_isRanked(t){return!!t.rank_delta_pct||!!t.unreal_rank_change||/habanero/i.test(t.playlist_id||"")}_findEntity(t,e){let a=this.hass?.states;if(!a)return;let s=this._player,r=`${s}:${t}:${e}`,o=this._entityCache.get(r);if(o&&a[o])return a[o];let l;for(let[h,m]of Object.entries(a))if(h.startsWith(`${t}.`)&&m.attributes?.fortnite_player_id===s&&m.attributes?.fortnite_entity_key===e){l=h;break}if(l||(l=[e,...ye[e]||[]].flatMap(u=>[`${t}.fortnite_${s}_${u}`,`${t}.fortnite_${s}_${s}_${u}`]).find(u=>a[u])),!!l)return this._entityCache.set(r,l),a[l]}async _callService(t,e={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...e}),t==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadEvents(),t==="trends"&&this._loadTrends(),t==="pass"&&(this._loadPass(),this._loadOutfits()),t==="locker"&&this._loadOutfits()}_entityId(t,e){return this._findEntity(t,e)?.entity_id}_toggleEvent(t){if(this._expandedEvent===t.key){this._expandedEvent=null;return}this._expandedEvent=t.key;let e=t.windows.find(a=>this._windowState(a)==="live")||[...t.windows].reverse().find(a=>this._windowState(a)==="finished");e&&!this._leaderboards[`${t.event_id}|${e.window_id}`]&&this._loadLeaderboard(t.event_id,e.window_id)}_formatRelativeTime(t){if(!t)return"";let e=new Date(t);if(isNaN(e.getTime()))return"";let a=Math.max(1,Math.round((this._now-e.getTime())/6e4));if(a<60)return`${a}m ago`;let s=Math.round(a/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let e=Math.floor(t/60),a=Math.round(t%60);return e>0?`${e}h ${a}m`:`${a}m`}_formatSpan(t){let e=Math.max(0,Math.round(t/6e4)),a=Math.floor(e/1440),s=Math.floor(e%1440/60),r=e%60;return a>0?`${a}d ${s}h`:s>0?`${s}h ${r}m`:`${r}m`}_formatWhen(t){try{return Jt(this.hass?.config?.time_zone).format(new Date(t)).replace(/\b(am|pm)\b/i,e=>e.toLowerCase())}catch{return Jt().format(new Date(t))}}_num(t,e=0){return Number(t||0).toLocaleString("en-GB",{maximumFractionDigits:e,minimumFractionDigits:0})}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}_windowState(t){let e=Date.parse(t.begin),a=Date.parse(t.end);return this._now>=a?"finished":this._now>=e?"live":"upcoming"}_rankBadge(t,e=30){let a=t||"Unranked",s=Object.keys(H).find(u=>a.startsWith(u));if(!s)return n`<span class="rank-badge unranked" style="width:${e}px;height:${e}px">–</span>`;let[r,o]=H[s],l=(a.match(/\b(I{1,3})$/)||[])[1]||"",h=`g-${s}-${e}`;return n`<span class="rank-badge" title=${a} style="width:${e}px;height:${e}px">
      ${F`<svg viewBox="0 0 40 44" width=${e} height=${e} aria-hidden="true">
        <defs><linearGradient id=${h} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${o}></stop>
        </linearGradient></defs>
        ${s==="Unreal"?F`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:F`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${l}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,e=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),s=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),o=this._findEntity("sensor","level"),l=this._findEntity("binary_sensor","playing"),h=this._findEntity("sensor","profile"),m=this._findEntity("sensor","sprites"),u=this._findEntity("sensor","power_ranking"),y=!!m&&!["unavailable","unknown"].includes(m.state);if(!e&&!a&&!l)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let f=l?.state==="on"||e?.state==="active",x=e?.attributes||{},S=a?.attributes||{},c=h?.attributes||{},g={...s?.attributes||{},current_rank:s?.state},b={...r?.attributes||{},current_rank:r?.state},v=!!h?.attributes?.outfits?.owned_count,_=this._sections.filter(Mt=>this._sections.length===1||(Mt!=="sprites"||y)&&(Mt!=="locker"||v)),$=this._config.default_section,C=f&&_.includes("session")?"session":_.includes("stats")?"stats":_[0],A=this._view??($&&$!=="auto"&&_.includes($)?$:C);_.includes(A)||(A=C),this._renderedView=A;let Ct=this._config.header||"full",pt="",At={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};At[this._config.theme_accent||""]&&(pt+=`--accent: ${At[this._config.theme_accent]};`),this._config.custom_background&&(pt+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let te=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return n`
      <ha-card class=${te} style="${pt}">
        ${Ct==="none"?p:Ct==="slim"?this._renderSlimHeader(t,f,x,c):this._renderHeader(t,f,x,S,c,o,g,b)}
        ${this._renderButtons(A,f,_)}
        ${A==="session"?this._renderSessionView(f,x,g):A==="events"?this._renderEventsView():A==="sprites"?this._renderSpritesView(m):A==="trends"?this._renderTrendsView():A==="pass"?this._renderPassView(o):A==="locker"?this._renderLockerView(c):this._renderStatsView(S,c,g,b,u)}
      </ha-card>
    `}_renderHeader(t,e,a,s,r,o,l,h){let m=r.display_name||t.charAt(0).toUpperCase()+t.slice(1),u=r.season||this._catalog.season,y=this._config.show_platforms!==!1?r.platforms||[]:[],f=s.metrics?.last_played,x=o?.attributes||{},S=Number(o?.state)||0,c=Number(x.account_level||0),g=this._avatarImage(r),b=this._config.compact?20:24,v=this._findEntity("sensor","vbucks"),_=!this._config.hide_vbucks&&v&&!isNaN(Number(v.state)),$=v?.attributes?.crew;return n`
      <div class="fa-header">
        <div class="player-avatar ${g?"has-image":""}">
          ${g?n`<img src=${g} alt=${this._avatarName(r)} @error=${M} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${m}</h2>
            <span class="header-ranks">
              ${l.current_rank&&l.current_rank!=="Unranked"?this._rankBadge(l.current_rank,b):p}
              ${h.current_rank&&h.current_rank!=="Unranked"?this._rankBadge(h.current_rank,b):p}
            </span>
          </div>
          <div class="player-meta">
            ${u?.number?n`<span class="level-badge">S${u.number} · ${u.days_left}d left</span>`:p}
            ${!this._config.hide_season_level&&S>0?n`<span class="level-badge">Lvl ${S}</span>`:p}
            ${!this._config.hide_account_level&&c>0?n`<span>Acct ${c.toLocaleString()}</span>`:p}
            ${_?n`<span class="vbucks-chip" title=${Object.entries(v.attributes?.by_kind||{}).map(([C,A])=>`${C}: ${this._num(A)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(v.state)}</span>`:p}
            ${$?.active&&!this._config.hide_vbucks?n`<span class="crew-chip" title="Fortnite Crew${$.end_date?` \xB7 renews ${this._formatWhen($.end_date)}`:""}">Crew</span>`:p}
            ${f?.time&&!e?n`<span title=${f.name||""}>Played ${this._formatRelativeTime(f.time)}</span>`:p}
          </div>
          ${y.length?n`<div class="platforms">
                ${y.map(C=>n`<span class="platform-chip" title=${C.name||C.label}>${C.label}${C.name?n` · ${C.name}`:p}</span>`)}
              </div>`:p}
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
      ${u?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${u.number}: ${u.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,u.progress_pct)}%"></div>
          </div>`:p}
    `}_liveEventCount(){let t=this._currentFilters();return(this._events.list||[]).filter(e=>this._matchesFilters(e,t)&&e.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(t){return(this._config.avatar||"").trim()?this._avatar?.icon:t?.outfits?.avatar?.icon||void 0}_avatarName(t){return(this._config.avatar||"").trim()?this._avatar?.name||"":t?.outfits?.avatar?.name||""}async _setAvatar(t){this._loadingAction="set_avatar";try{await this.hass.callService("fortnite_activity","set_avatar",{player_id:this._player,outfit_id:t||""}),this._outfits={data:{...this._outfits.data||{},avatar_id:t}}}catch(e){console.error("Error setting Fortnite avatar:",e)}finally{this._loadingAction=null,this._selectedOutfit=null}}_renderSlimHeader(t,e,a,s){let r=s.display_name||t.charAt(0).toUpperCase()+t.slice(1),o=this._avatarImage(s),l=this._findEntity("sensor","vbucks"),h=!this._config.hide_vbucks&&l&&!isNaN(Number(l.state));return n`
      <div class="fa-header slim">
        <div class="player-avatar ${o?"has-image":""}">
          ${o?n`<img src=${o} alt="" @error=${M} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${r}</h2>
            ${h?n`<span class="vbucks-chip">Ⓥ ${this._num(l.state)}</span>`:p}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(t,e,a){let s=a.length>1,r=!this._config.sections?.length&&this._config.layout==="events_only",o=this._config.show_sub_buttons!==!1&&!r;if(!s&&!o)return p;let l=this._eventsEnabled?this._liveEventCount():0,h={session:["mdi:lightning-bolt",e?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",l],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"]},m=(u,y,f,x=0)=>n`
      <button class="bubble-sub-button ${t===u?"active":""}" @click=${()=>this._setView(u)} title=${f}>
        <ha-icon icon=${y}></ha-icon><span class="btn-label">${f}</span>
        ${x>0?n`<span class="notify-badge" title="${x} live">${x}</span>`:p}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${s?a.map(u=>m(u,h[u][0],h[u][1],h[u][2]||0)):p}
        ${o?e?n`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:n`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`:p}
        ${o?n`<button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
              <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
              <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
            </button>`:p}
      </div>
    `}_renderKpis(t){if(this._config.compact){let e=[];for(let a=0;a<t.length;a+=2)e.push(t.slice(a,a+2));return n`<table class="stat-table"><tbody>
        ${e.map(a=>n`<tr>
          ${a.map(([s,r,o])=>n`<th>${s}</th><td class="kpi-value ${o||""}">${r}</td>`)}
          ${a.length<2?n`<th></th><td></td>`:p}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${t.map(([e,a,s])=>n`<div class="kpi-chip"><span class="kpi-label">${e}</span><span class="kpi-value ${s||""}">${a}</span></div>`)}
    </div>`}_renderRank(t,e,a,s){let r=e.current_rank||"Unranked",o=Number(e.progress_pct||0),l=r.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${t}</span></span>
          <span class="rank-name" style="color: ${(H[Object.keys(H).find(h=>r.startsWith(h))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${l?n`<div class="unreal-position">
              <span class="unreal-number">${e.unreal_rank?`#${this._num(e.unreal_rank)}`:"Unreal"}</span>
              ${s?n`<span class="rank-delta-badge ${s>0?"pos":"neg"}">${s>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(s))} places</span>`:p}
            </div>`:this._config.hide_rank_progress?p:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${l?"Unreal leaderboard position":`${o}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,e,a){let s=Number(e.net_rank_delta_pct||0),r=f=>f>=0?`+${f}%`:`${f}%`,o=e.session_id,l=o?`session:${o}:${e.matches_played||0}`:"";l&&this._config.show_match_feed!==!1&&this._ensureMatches(l,{session_id:o});let m=(l?this._matchLists[l]?.matches:void 0)||e.recent_matches||[],u=m.filter(f=>this._isRanked(f)),y=u.filter(f=>f.rank_track===a.game_mode&&typeof f.unreal_rank_change=="number").reduce((f,x)=>f+(x.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",e.matches_played||0,"cyan"],["Wins",`${e.wins||0} \u{1F3C6}`,"gold"],["Kills",e.kills||0],["K/D",e.kd_ratio||0],...u.length?[["Rank Net",r(s),s>=0?"positive":"negative"]]:[]])}

      ${u.length?this._renderRank("Battle Royale Ranked",a,`${s>=0?"\u25B2":"\u25BC"} ${r(s)} this session`,y||null):p}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${e.matches_played||m.length} ${(e.matches_played||m.length)===1?"match":"matches"})</span>
              ${t?n`<span class="tracking-live">Tracking Live</span>`:p}
            </div>
            ${this._renderMatchList(l||"session",m,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:p}
    `}_renderMatchList(t,e,a){let s=this._config.max_feed_matches||10,r=this._showAllMatches[t],o=r?e:e.slice(0,s);return n`
      <div class="match-list">
        ${o.length?o.map(l=>this._renderMatch(l)):n`<div class="empty">${a}</div>`}
        ${e.length>s?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[t]:!r}}>
              ${r?"Show fewer":`Show all ${e.length}`}
            </button>`:p}
      </div>
    `}_renderMatch(t){let e=this._playlist(t.playlist_id),a=e?.image,s=`${t.timestamp}|${t.playlist_id}`,r=this._expandedMatch===s,o=(t.match_count||1)>1,l=this._isRanked(t),h=(m,u)=>u==null||u===""?p:n`<div class="detail"><span>${m}</span><b>${u}</b></div>`;return n`
      <div class="match-card ${t.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:s}>
        <div class="match-row">
          ${a?n`<img class="match-art" src=${a} alt="" loading="lazy" @error=${M} />`:p}
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
                </span>`:p}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?n`<div class="match-details" @click=${m=>m.stopPropagation()}>
              ${a?n`<img class="detail-art" src=${a} alt="" @error=${M} />`:p}
              ${e?.description?n`<p class="detail-desc">${e.description}</p>`:p}
              <div class="detail-grid">
                ${h("Finished",this._formatWhen(t.timestamp))}
                ${h("Mode",t.mode_name)}
                ${h("Placement",t.placement_text)}
                ${h("Kills",t.kills)}
                ${o?h("Games",t.match_count):p}
                ${o&&t.wins?h("Victories",t.wins):p}
                ${h("Time played",t.minutes?this._formatDuration(t.minutes):void 0)}
                ${h("Score",t.score?this._num(t.score):void 0)}
                ${h("Players outlived",t.players_outlived?this._num(t.players_outlived):void 0)}
                ${l?n`
                      ${h("Ranked track",t.rank_track)}
                      ${h("Rank after",t.unreal_rank?`${t.current_rank} #${this._num(t.unreal_rank)}`:t.current_rank)}
                      ${h("Rank change",t.rank_delta_pct?`${t.rank_delta_pct>0?"+":""}${t.rank_delta_pct}%`:void 0)}
                      ${h("Unreal places",t.unreal_rank_change?`${t.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(t.unreal_rank_change))}`:void 0)}`:p}
              </div>
              ${(t.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:p}
            </div>`:p}
      </div>
    `}_renderStatsView(t,e,a,s,r){let o=e.windows||{},l=e.window_labels||{},h=["lifetime",...["season","week","today"].filter(_=>o[_])],m=h.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},y=t.metrics||{},f={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:y.hours_played,favourite_mode:y.favourite_mode,modes:t.modes||{}},x=m==="lifetime"?f:o[m],S=this._selectedMode!=="all"?x.modes?.[this._selectedMode]:null,c=S&&S.matches!==void 0?S:x,g=c.minutes!==void 0?Math.round(c.minutes/60*10)/10:x.hours_played,b=x.favourite_mode,v=(_,$)=>n`
      <button class="mode-tab ${this._selectedMode===_?"active":""}" @click=${()=>this._selectedMode=_}>${$}</button>
    `;return n`
      <div class="tab-rows">
        ${h.length>1?n`<div class="mode-tabs">
              ${h.map(_=>n`<button class="mode-tab ${m===_?"active":""}" title=${l[_]||""}
                  @click=${()=>this._window=_}>${u[_]}</button>`)}
            </div>`:p}
        <div class="mode-tabs">
          ${v("all","Overall")} ${v("zero_build","Zero Build")} ${v("build","Build")} ${v("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${c.win_rate||0}%`,"cyan"],["K/D",c.kd||0],["Wins",n`${this._num(c.wins)} 🏆`,"gold"],["Matches",this._num(c.matches)],["Kills",this._num(c.kills)],["Outlived",this._num(c.players_outlived)],["Kills/Match",c.matches?this._num(c.kills/c.matches,2):0],...g!==void 0?[["Hours",this._num(g,1)]]:[]])}

      ${m==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):p}
      ${b?this._renderFavourite(b,m!=="lifetime"?u[m]:""):p}
      ${m!=="lifetime"&&x?.since?this._renderWindowMatches(m,u[m],x):p}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",s,`Peak: ${s.highest_rank||s.current_rank||"Unranked"}`)}
      ${this._renderOtherTracks(a)}
      ${r&&!["unavailable","unknown"].includes(r.state)?n`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(r.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(r.attributes?.points)} points${r.attributes?.counting_events!=null?` \xB7 ${r.attributes.counting_events} counting events`:""}</span>
              <span>${r.attributes?.peak_pr!=null?`Peak PR ${this._num(r.attributes.peak_pr)}`:"Competitive (tournaments)"}${r.attributes?.delta_pr?` \xB7 ${r.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(r.attributes.delta_pr))}`:""}</span></div>
          </div>`:p}
      ${e.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:p}
    `}_renderOtherTracks(t){let e=(t.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return e.length?n`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${e.map(a=>n`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(H[Object.keys(H).find(s=>a.current_rank.startsWith(s))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:p}_lineChart(t,e,a){let l=t.map(b=>b.v),h=Math.min(...l),m=Math.max(...l),u=m-h||Math.abs(m)||1,y=t[0].t,f=t[t.length-1].t||y+1,x=b=>6+(b-y)/(f-y||1)*308,S=b=>84-(b-h)/u*78,c=t.map((b,v)=>`${v?"L":"M"}${x(b.t).toFixed(1)},${S(b.v).toFixed(1)}`).join(" "),g=b=>new Date(b).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return n`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${F`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${c}" class="trend-line"></path>
        ${t.map(b=>F`<g class="trend-pt"><circle cx="${x(b.t)}" cy="${S(b.v)}" r="7" class="trend-hit"></circle><circle cx="${x(b.t)}" cy="${S(b.v)}" r="2.5" class="trend-dot"></circle><title>${g(b.t)}: ${e(b.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let e=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!e.length)return n`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,s=100,r=4,o=Math.max(4,...e.map(h=>h.kills||0)),l=(a-2*r)/e.length;return n`<svg class="trend-svg" viewBox="0 0 ${a} ${s+12}" preserveAspectRatio="none" role="img">
      ${F`${e.map((h,m)=>{let u=Math.max(2,(h.kills||0)/o*(s-14)),y=r+m*l+1;return F`<g><rect x="${y}" y="${s-u}" width="${Math.max(2,l-2)}" height="${u}" rx="2" class="kill-bar"></rect>
          ${h.is_victory?F`<text x="${y+(l-2)/2}" y="${s-u-3}" text-anchor="middle" class="win-mark">★</text>`:p}
          <rect x="${y-1}" y="0" width="${l}" height="${s}" fill="transparent"><title>${this._formatWhen(h.timestamp)} · ${h.mode_name}: ${h.kills} kills · ${h.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${s}" y2="${s}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${o} kills</span></div>`}_renderTrendsView(){let t=this._trends,e=Gt.map(a=>{let s=this._entityId("sensor",a.key);if(!s)return p;let r=((t.stats||{})[s]||[]).map(f=>({t:typeof f.start=="number"?f.start:Date.parse(f.start),v:f.mean??f.state??f.max})).filter(f=>typeof f.v=="number"),o=this.hass.states[s];if(!r.length&&(!o||["unavailable","unknown"].includes(o.state)))return p;let l=f=>`${this._num(f,a.digits||0)}${a.unit||""}`,h=r[0]?.v,m=r[r.length-1]?.v,u=r.length>1?m-h:null,y=u==null||u===0?"":u>0!=!!a.lowerBetter?"positive":"negative";return n`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${y}">${o&&!isNaN(Number(o.state))?l(Number(o.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,l,t.period||"day"):n`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${u>=0?"\u25B2":"\u25BC"} ${l(Math.abs(u))} over ${r.length} ${t.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return n`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${t.loading&&!t.stats?n`<div class="empty">Loading history…</div>`:p}
      ${t.error?n`<div class="empty">${t.error}</div>`:p}
      <div class="trend-grid">${e}</div>
    `}_passSets(t){let e=[],a=new Map;for(let s of t.pages||[]){let r=String(s.track||"").replace(/Bonus$/,"")||"Pass";a.has(r)||(a.set(r,[]),e.push(r)),a.get(r).push(s)}return e.map((s,r)=>{let o=a.get(s),l=o.flatMap(b=>b.rewards||[]),h=l.find(lt)||null,m=h?.icon||l.find(b=>b.icon&&!et(b)&&b.type!=="HomebaseBannerIcon")?.icon||null,u={},y={},f=new Map,x=0;for(let b of o){let v=/Bonus$/.test(b.track||"");for(let _ of b.rewards||[]){if(typeof _.cost=="number"&&_.cost>0&&_.price_row!=="Included"){let C=v?y:u;C[_.currency||""]=(C[_.currency||""]||0)+_.cost}et(_)&&(x+=Number(_.quantity)||0);let $=ct(_);$!=="V-Bucks"&&f.set($,(f.get($)||0)+1)}}let S=l.filter(b=>b.owned===!0||b.owned===!1),c=S.filter(b=>b.owned===!0).length,g=l.filter(b=>b.type!=="Currency").length;return{key:s,unlocked:c,known:S.length,complete:S.length>0&&S.length===g&&c===S.length,title:h?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(h.name)?h.name:`Set ${r+1}`,outfit:h,hero:m,pages:o.map(b=>{let v=/Bonus$/.test(b.track||""),_=b.rewards||[],$=_.filter(A=>A.owned===!0||A.owned===!1),C=$.length>0&&$.length===_.filter(A=>A.type!=="Currency").length&&$.every(A=>A.owned);return{label:`${v?"Bonus":"Page"} ${b.page}`,bonus:v,rewards:_,done:C}}),rewardCount:l.length,baseCost:u,bonusCost:y,vbucks:x,types:[...f.entries()].sort((b,v)=>v[1]-b[1])}})}_costText(t){return Object.entries(t).map(([e,a])=>`${this._num(a)} ${Yt(e,a)}`).join(" + ")}_passCostBadge(t){if(t.price_row==="Included"||t.cost===0)return n`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof t.cost!="number")return p;let e=t.currency==="AthenaCategoryStar";return n`<span class="bp-cost ${e?"character":""}" title="${t.cost} ${Yt(t.currency,t.cost)}">
      <ha-icon icon=${e?"mdi:account-star":"mdi:star"}></ha-icon>${t.cost}</span>`}_goPassSet(t,e){this._passSet=(t+e)%e,this._passPage=0}_withOwnedOutfits(t){let e=new Set((this._outfits.data?.outfits||[]).map(o=>String(o.id||"").toLowerCase()));if(!e.size||t.known==null)return t;let a=t.unlocked||0,s=t.known||0,r=(t.pages||[]).map(o=>({...o,rewards:(o.rewards||[]).map(l=>{if(l.owned!=null||!lt(l))return l;let h=/^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(dt(l));return!h||!e.has(`character_${h[1].toLowerCase()}`)?l:(a+=1,s+=1,{...l,owned:!0})})}));return{...t,pages:r,unlocked:a,known:s}}_renderPassView(t){let e=this._pass;if(e.loading||e.data===void 0&&!e.error)return n`<div class="empty">Loading Battle Pass…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(!e.data||!e.data.pages?.length)return n`<div class="empty">The Battle Pass will show here soon.</div>`;let a=this._withOwnedOutfits(e.data),s=this._passSets(a),r=Math.min(this._passSet,s.length-1),o=s[r],l=Math.min(this._passPage,o.pages.length-1),h=o.pages[l],m=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,u=Number(t?.state)||null,y=s.reduce((c,g)=>c+g.vbucks,0),f=s.filter(c=>c.outfit).length,x={};for(let c of s)for(let[g,b]of Object.entries(c.baseCost))x[g]=(x[g]||0)+b;let S=(c,g)=>g>1&&!/s$/.test(c)?`${c}s`:c;return n`
      <div class="bp">
        <div class="bp-summary">
          <div class="bp-summary-title">
            <ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon>
            <span>Season ${a.season} Battle Pass</span>
            ${m?.days_left!=null?n`<span class="bp-days">${m.days_left}d left</span>`:p}
          </div>
          ${a.known?n`<div class="bp-unlock">
                <div class="bp-unlock-top">
                  <span>✓ <b>${a.unlocked}</b> unlocked</span>
                  ${a.known>a.unlocked?n`<span class="bp-locked-count">🔒 ${a.known-a.unlocked} still locked</span>`:p}
                </div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(a.unlocked/a.known*100)}%"></div></div>
              </div>`:p}
          <div class="bp-stats">
            <div><b>${s.length}</b><span>sets</span></div>
            <div><b>${f}</b><span>outfits</span></div>
            <div><b>${a.reward_count??s.reduce((c,g)=>c+g.rewardCount,0)}</b><span>rewards</span></div>
            ${y?n`<div class="gold"><b>${this._num(y)}</b><span>V-Bucks</span></div>`:p}
            ${u?n`<div><b>${u}</b><span>level</span></div>`:p}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${s.map((c,g)=>n`
            <button class="bp-thumb ${g===r?"active":""} ${c.complete?"done":""}" role="tab" aria-selected=${g===r?"true":"false"}
              title="${c.title}${c.known?` \xB7 ${c.unlocked} of ${c.known} unlocked`:""}"
              @click=${()=>this._goPassSet(g,s.length)}>
              ${c.hero?n`<img src=${c.hero} alt="" @error=${M} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
              ${c.complete?n`<span class="bp-thumb-check">✓</span>`:p}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${()=>this._goPassSet(r-1,s.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${o.hero?n`<img src=${o.hero} alt="" @error=${M} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${r+1} of ${s.length}</div>
              <div class="bp-hero-name">${o.title}</div>
              <div class="bp-hero-meta">
                ${Object.keys(o.baseCost).length?n`<span title="Stars for every reward on the main pages">${this._costText(o.baseCost)}</span>`:p}
                ${Object.keys(o.bonusCost).length?n`<span title="Bonus pages">Bonus: ${this._costText(o.bonusCost)}</span>`:p}
                ${o.vbucks?n`<span class="gold">Ⓥ ${this._num(o.vbucks)}</span>`:p}
              </div>
              ${o.known?n`<div class="bp-set-progress">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round(o.unlocked/o.known*100)}%"></div></div>
                    <span>${o.complete?"\u2713 All unlocked":o.unlocked===o.known?`\u2713 ${o.unlocked} unlocked`:`\u2713 ${o.unlocked} unlocked \xB7 \u{1F512} ${o.known-o.unlocked} still locked`}</span>
                  </div>`:p}
              <div class="bp-hero-types">${o.types.map(([c,g])=>`${g} ${S(c,g)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(r+1,s.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${o.pages.length>1?n`<div class="bp-pages">
                ${o.pages.map((c,g)=>n`
                  <button class="mini-button ${g===l?"active":""} ${c.bonus?"bonus":""}" @click=${()=>this._passPage=g}>
                    ${c.done?"\u2713 ":""}${c.label}<span class="bp-page-count">${c.rewards.length}</span>
                  </button>`)}
              </div>`:p}

          <div class="bp-rewards">
            ${h.rewards.map(c=>n`
              <div class="bp-reward ${et(c)?"vbucks":""} ${lt(c)?"outfit":""} ${c.owned===!0?"unlocked":c.owned===!1?"locked":""}"
                title="${Xt(c)} · ${ct(c)}${c.owned===!0?" \xB7 unlocked":c.owned===!1?" \xB7 locked":""}">
                <div class="bp-reward-img">
                  ${c.icon?n`<img src=${c.icon} alt="" @error=${M} />`:n`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${c.owned===!0?n`<span class="bp-state unlocked">✓</span>`:c.owned===!1?n`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`:p}
                  ${c.owned===!0?p:this._passCostBadge(c)}
                </div>
                <span class="bp-reward-name">${et(c)&&c.quantity?`${this._num(c.quantity)} V-Bucks`:Xt(c)}</span>
                <span class="bp-reward-type">${ct(c)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(x).length?n`<span>All base pages: ${this._costText(x)}</span>`:p}

        </div>
      </div>
    `}_outfitRarity(t){let e=String(t?.rarity||"");return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}_renderLockerView(t){let a=(t.outfits||{}).avatar,s=a?.id||null,r=!!(this._config.avatar||"").trim(),o=this._outfits;if(o.loading||o.data===void 0&&!o.error)return n`<div class="empty">Loading locker…</div>`;if(o.error)return n`<div class="empty">${o.error}</div>`;let l=o.data?.outfits||[];if(!l.length)return n`<div class="empty">Your outfits will show up here soon.</div>`;let h=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],m=l.filter(v=>v.name),u=this._outfitQuery.trim().toLowerCase(),f=[...m.filter(v=>!u||String(v.name).toLowerCase().includes(u)||String(v.set||"").toLowerCase().includes(u))].sort((v,_)=>{if(v.id?.toLowerCase()===s)return-1;if(_.id?.toLowerCase()===s)return 1;if(this._outfitSort==="rarity"){let $=h.indexOf(this._outfitRarity(v)),C=h.indexOf(this._outfitRarity(_));return($<0?99:$)-(C<0?99:C)||String(v.name).localeCompare(String(_.name))}return String(v.name).localeCompare(String(_.name))}),x=this._config.compact?18:24,S=Math.max(1,Math.ceil(f.length/x)),c=Math.min(this._outfitPage,S-1),g=f.slice(c*x,c*x+x),b=new Map;for(let v of m)b.set(this._outfitRarity(v)||"Other",(b.get(this._outfitRarity(v)||"Other")||0)+1);return n`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${N[this._outfitRarity(a)]||"var(--accent)"}">
          <div class="locker-hero-img">
            ${a?.icon?n`<img src=${a.icon} alt="" @error=${M} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Avatar${r?" \xB7 this card uses its own skin setting":""}</div>
            <div class="bp-hero-name">${a?.name||(s?"Unknown outfit":"Not chosen")}</div>
            <div class="bp-hero-meta">
              ${a?.rarity?n`<span>${this._outfitRarity(a)}</span>`:p}
              ${s?n`<button class="link-button" ?disabled=${this._loadingAction==="set_avatar"} @click=${()=>this._setAvatar(null)}>Clear</button>`:n`<span class="muted">Tap an outfit below to use it</span>`}
            </div>
            <div class="bp-hero-types">
              <b>${this._num(m.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${h.filter(v=>b.get(v)).map(v=>n`<span class="rarity-dot" style="--rarity:${N[v]}" title=${v}>${b.get(v)}</span>`)}
            </div>
          </div>
        </div>

        <div class="locker-controls">
          <input class="locker-search" type="search" placeholder="Search outfits or sets" .value=${this._outfitQuery}
            @input=${v=>{this._outfitQuery=v.target.value,this._outfitPage=0}} />
          <button class="mini-button ${this._outfitSort==="rarity"?"active":""}" @click=${()=>{this._outfitSort="rarity",this._outfitPage=0}}>Rarity</button>
          <button class="mini-button ${this._outfitSort==="name"?"active":""}" @click=${()=>{this._outfitSort="name",this._outfitPage=0}}>A–Z</button>
        </div>

        ${g.length?n`<div class="bp-rewards locker-grid">
              ${g.map(v=>{let _=String(v.id||"").toLowerCase(),$=_===s,C=this._selectedOutfit===_;return n`
                  <div class="bp-reward locker-tile ${$?"equipped":""} ${C?"selected":""}" style="--rarity:${N[this._outfitRarity(v)]||"#9CA3AF"}"
                    title="${v.name}${v.set?` \xB7 ${v.set}`:""}" role="button" tabindex="0"
                    @click=${()=>this._selectedOutfit=C?null:_}>
                    <div class="bp-reward-img locker-img">
                      ${v.small||v.icon?n`<img src=${v.small||v.icon} alt="" loading="lazy" @error=${M} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${$?n`<span class="bp-cost included">Avatar</span>`:p}
                      ${C&&!$?n`<button class="locker-use" ?disabled=${this._loadingAction==="set_avatar"}
                            @click=${A=>{A.stopPropagation(),this._setAvatar(_)}}>
                            ${this._loadingAction==="set_avatar"?"Saving\u2026":"Use as avatar"}</button>`:p}
                    </div>
                    <span class="bp-reward-name">${v.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(v)||"Outfit"}</span>
                  </div>`})}
            </div>`:n`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${S>1?n`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${c===0} @click=${()=>this._outfitPage=c-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${c+1} of ${S} · ${f.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${c>=S-1} @click=${()=>this._outfitPage=c+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:p}
      </div>
    `}_spriteCurve(t){let e=[...t.level_curve||[]].filter(s=>typeof s.level=="number"&&typeof s.xp=="number").sort((s,r)=>s.level-r.level),a=[];for(let s of e){if(a.length&&s.xp<a[a.length-1][1])break;a.push([s.level,s.xp])}return a.length>=2?a:[]}_spriteLevel(t,e){if(typeof t!="number"||!e.length)return null;let a=0;e.forEach(([,l],h)=>{t>=l&&(a=h)});let[s]=e[a],r=e[e.length-1],o=e[a+1];return{level:s,maxLevel:r[0],maxXp:r[1],next:o?o[1]:null,toMax:Math.max(0,r[1]-t),atMax:a===e.length-1}}_spriteInfo(t,e){let a=t.variants||[],s=a.filter(h=>h.owned),r=a.filter(h=>h.mastered).length,o=null;for(let h of s){let m=this._spriteLevel(h.xp,e);m&&(!o||m.level>o.level)&&(o=m)}let l=s.reduce((h,m)=>h+Math.max(1,Number(m.count)||0),0);return{owned:s.length,total:a.length,mastered:r,best:o,copies:l}}_spriteName(t){return String(t.name||"").replace(/ Sprite$/,"")}_renderSpritesView(t){let e=t?.attributes||{},a=this._spriteCurve(e),s=e.families||[],r=Number(t?.state||0),o=Number(e.owned_variants||0),l=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],h=s.filter(c=>c.mastered>0).length,u=[...s.filter(c=>this._spriteFilter==="missing"?!c.owned:this._spriteFilter==="unmastered"?c.owned&&!c.mastered:this._spriteFilter==="mastered"?c.mastered>0:!0)].sort((c,g)=>this._spriteSort==="rarity"?l.indexOf(g.rarity)-l.indexOf(c.rarity)||(c.dex??0)-(g.dex??0):this._spriteSort==="progress"&&g.owned_variants/g.total_variants-c.owned_variants/c.total_variants||(c.dex??0)-(g.dex??0)),y=s.flatMap(c=>c.variants.filter(g=>!g.owned&&g.drop_chance_pct).map(g=>({f:c,v:g}))).sort((c,g)=>g.v.drop_chance_pct-c.v.drop_chance_pct||l.indexOf(c.f.rarity)-l.indexOf(g.f.rarity)).slice(0,6),f=a.length?s.flatMap(c=>c.variants.filter(g=>g.owned&&typeof g.xp=="number"&&g.xp>0).map(g=>({f:c,v:g,lv:this._spriteLevel(g.xp,a)}))).filter(c=>c.lv&&!c.lv.atMax).sort((c,g)=>c.lv.toMax-g.lv.toMax).slice(0,5):[],x=(c,g)=>n`
      <button class="mode-tab ${this._spriteFilter===c?"active":""}" @click=${()=>this._spriteFilter=c}>${g}</button>`,S=(c,g)=>n`
      <button class="mode-tab ${this._spriteSort===c?"active":""}" @click=${()=>this._spriteSort=c}>${g}</button>`;return n`
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,r)}"><span>${Math.round(r)}%</span></div>
        <div class="sp-stat">
          <b>${e.owned_families??0}<small>/${e.total_families??s.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${h}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${o}<small>/${e.total_variants??0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${f.length?n`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${f.map(({f:c,v:g,lv:b})=>n`
                <div class="master-row" style="--rarity:${N[c.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=c.id}>
                  ${g.icon?n`<img src=${g.icon} alt="" @error=${M} />`:p}
                  <span class="variant-name">${g.label==="Base"?this._spriteName(c):`${g.label} ${this._spriteName(c)}`}</span>
                  <span class="sp-level-pill">Level ${b.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,g.xp/b.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(b.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:p}

      ${y.length?n`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${y.map(({f:c,v:g})=>n`
                <div class="hunt-item" style="--rarity:${N[c.rarity]||"#9CA3AF"}" title="${g.name}" @click=${()=>this._expandedSprite=c.id}>
                  ${g.icon?n`<img src=${g.icon} alt="" @error=${M} />`:p}
                  <span>${g.label==="Base"?this._spriteName(c):`${g.label} ${this._spriteName(c)}`}</span>
                  <small>${g.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`:p}

      <div class="tab-rows">
        <div class="mode-tabs">${x("all","All")} ${x("mastered","\u2B50 Mastered")} ${x("unmastered","Not mastered")} ${x("missing","Not found")}</div>
        <div class="mode-tabs">${S("dex","Number")} ${S("rarity","Rarity")} ${S("progress","Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${u.length?u.map(c=>{let g=this._expandedSprite===c.id,b=this._spriteInfo(c,a),v=b.mastered?n`<span class="sp-status gold">⭐ Mastered</span>`:c.owned?n`<span class="sp-status">Not mastered</span>`:n`<span class="sp-status dim">Not found yet</span>`,_=c.owned?n`<span class="sp-have">Have ${b.copies}${b.best?n` · <span class=${b.best.atMax?"sp-max":""} title=${b.best.atMax?"Top level":""}>Lv ${b.best.level}</span>`:p}</span>`:p;return n`
                <div class="sp-card ${c.owned?"":"missing"} ${b.mastered?"mastered":""} ${g?"open":""}"
                  style="--rarity:${N[c.rarity]||"#9CA3AF"}" role="button" tabindex="0"
                  @click=${()=>this._expandedSprite=g?null:c.id}>
                  <div class="sp-img">
                    ${c.icon?n`<img src=${c.icon} alt="" @error=${M} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${b.mastered?n`<span class="sp-badge star" title="Mastered">⭐</span>`:p}
                    ${c.owned?p:n`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                  </div>
                  <span class="sp-name">${this._spriteName(c)}</span>
                  ${v}
                  ${_}
                  <div class="sp-kinds" title="${b.owned} of ${b.total} kinds">
                    ${(c.variants||[]).map($=>n`
                      <span class="sp-kind ${$.owned?"owned":""} ${$.mastered?"mastered":""}" title="${$.label}${$.owned?"":" (not found yet)"}">
                        ${$.icon?n`<img src=${$.icon} alt="" @error=${M} />`:p}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${b.owned} of ${b.total} kinds</span>
                </div>
                ${g?this._renderSpriteDetail(c):p}`}):n`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${(e.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${e.versions.map(c=>n`
              <div class="version-row ${c.current?"current":""}">
                <span>${c.current?"This season":c.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,c.completion_pct)}%"></div></div>
                <span>${c.owned_variants}/${c.total_variants}</span>
              </div>`)}
          </div>`:p}
    `}_renderSpriteDetail(t){let e=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{}),a=t.name;return n`
      <div class="sprite-detail sp-detail" style="--rarity:${N[t.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${t.icon_large||t.icon?n`<img src=${t.icon_large||t.icon} alt="" @error=${M} />`:p}
          <div>
            <b>${t.name}</b> <span class="tag rarity-tag">${t.rarity||""}</span>
            ${t.description?n`<p class="detail-desc">${t.description}</p>`:p}
            ${t.hint?n`<p class="detail-desc hint">📍 ${t.hint}</p>`:p}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(t.variants||[]).map(s=>{let r=s.owned?this._spriteLevel(s.xp,e):null,o=(s.boons||[]).find(h=>h.name&&h.name!==a),l=Math.max(1,Number(s.count)||0);return n`
              <div class="sp-kind-row ${s.owned?"":"missing"} ${s.mastered?"mastered":""}">
                <div class="sp-kind-icon">
                  ${s.icon?n`<img src=${s.icon} alt="" @error=${M} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${s.owned?p:n`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${s.label}</b>
                    ${s.mastered?n`<span class="sp-chip gold">⭐ Mastered</span>`:p}
                    ${s.owned?n`<span class="sp-chip">You have ${l}</span>`:n`<span class="sp-chip dim">Not found yet</span>`}
                    ${r?n`<span class="sp-chip">Level ${r.level}${r.atMax?" \xB7 max":""}</span>`:p}
                    ${!s.owned&&s.drop_chance_pct!=null?n`<span class="sp-chip dim">${s.drop_chance_pct}% chance</span>`:p}
                  </div>
                  ${r&&!r.atMax&&r.next?n`<div class="sp-xp">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,s.xp/r.next*100)}%"></div></div>
                        <span>${this._num(s.xp)} / ${this._num(r.next)} XP to level ${r.level+1}</span>
                      </div>`:p}
                  ${o?n`<div class="sp-perk">✨ ${o.description||o.name}</div>`:p}
                </div>
              </div>`})}
        </div>
      </div>
    `}_renderWindowMatches(t,e,a){let s=`window:${t}:${a.since}:${a.matches}`;this._ensureMatches(s,{since:a.since});let r=this._matchLists[s],o=r?.matches||[],l=r?.tracked??0,h=a.matches||0;return n`
      <div class="match-feed-header">
        <span>${e} matches (${l}${h>l?` of ${h}`:""})</span>

      </div>
      ${r?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(s,o,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(t,e){let a=this._playlist(t.playlist_id),s=a?.image,r=/ropesmile|reload/i.test(t.playlist_id+t.name)?"reload":/nobuild|zero build/i.test(t.playlist_id+t.name)?"zero_build":"build";return n`
      <div class="feature-card ${s?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${e?` \xB7 ${e}`:""}</span>
          <span class="feature-value">${a?.name||t.name}</span>
          <span class="feature-sub">${this._num(t.matches)} matches</span>
        </div>
        ${s?n`<img class="feature-art" src=${s} alt="" @error=${M} />`:n`<ha-icon class="feature-icon" icon=${we[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(t){let e=t.metrics||{},a=Object.values(t.inputs||{}).filter(r=>r.share_pct>=1),s=t.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",e.kills_per_minute??0],["Avg Match",`${e.avg_match_minutes??0}m`],["Score/Match",this._num(e.score_per_match)],["Solo Top 10",`${e.solo_top10_rate??0}%`],["Solo Top 25",`${e.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?n`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((r,o)=>n`<div class="split-seg seg-${o}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((r,o)=>n`<span><i class="dot seg-${o}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
            </div>
          </div>`:p}

      ${Object.keys(s).length?n`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(r=>s[r]).map(r=>n`<div class="size-row">
                <span class="size-name">${r.charAt(0).toUpperCase()+r.slice(1)}</span>
                <span>${this._num(s[r].matches)} m</span>
                <span>${s[r].win_rate}% win</span>
                <span>${s[r].kd} K/D</span>
              </div>`)}
          </div>`:p}
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",type:"all",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(t,e){return!(e.region!=="all"&&t.region_group!==e.region||e.type!=="all"&&t.tournament_type!==e.type||(e.mode==="Ranked"?!t.ranked:e.mode!=="all"&&t.mode!==e.mode)||e.team!=="all"&&t.team!==e.team||e.platform!=="all"&&!(t.platform_groups||[]).includes(e.platform))}_setFilter(t,e){this._filters={...this._currentFilters(),[t]:e}}_renderEventsView(){let t=this._events;if(t.loading&&!t.list)return n`<div class="empty">Loading tournaments…</div>`;if(t.error)return n`<div class="empty">${t.error}</div>`;if(t.list===null)return n`<div class="empty">Tournaments will show here soon.</div>`;let e=t.list||[],a=this._currentFilters(),s=[...new Set(e.map(l=>l.region_group))].sort(),r=e.filter(l=>this._matchesFilters(l,a)).filter(l=>l.windows.some(h=>this._windowState(h)!=="finished")||this._expandedEvent===l.key),o=(l,h)=>n`
      <select class="filter-select" .value=${a[l]} @change=${m=>this._setFilter(l,m.target.value)}>
        ${h.map(([m,u])=>n`<option value=${m} ?selected=${a[l]===m}>${u}</option>`)}
      </select>
    `;return n`
      <div class="event-filters">
        ${o("region",[["all","All regions"],...s.map(l=>[l,l])])}
        ${o("type",[["all","Type"],...[...new Set(e.map(l=>l.tournament_type).filter(Boolean))].map(l=>[l,Zt[l]||l])])}
        ${o("mode",[["all","Mode"],["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked cups"]])}
        ${o("team",[["all","Team"],["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]])}
        ${o("platform",[["all","Platform"],["PC","PC"],["Console","Console"],["Mobile","Mobile"]])}
        ${this._filters&&JSON.stringify(this._filters)!==JSON.stringify({...this._filters,...this._defaultFilters()})?n`<button class="filter-reset" @click=${()=>this._filters=null} title="Clear all filters">
              <ha-icon icon="mdi:filter-remove-outline"></ha-icon><span>Reset</span>
            </button>`:p}
      </div>
      <div class="match-feed-header">
        <span>Tournaments (${r.length})</span>
        <span class="muted">UK time</span>
      </div>
      <div class="match-list events">
        ${r.length?r.map(l=>this._renderEvent(l)):n`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(t){let e=t.windows.find(o=>this._windowState(o)==="live");if(e)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(e.end)-this._now)}`,live:!0,soon:!1};let a=t.windows.find(o=>this._windowState(o)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let s=Date.parse(a.begin)-this._now,r=s<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(s)}`:""}`,live:!1,soon:r}}_renderEvent(t){let e=this._eventTiming(t),a=this._expandedEvent===t.key,s=t.tournament_type?Zt[t.tournament_type]||t.tournament_type:null,r=[t.mode,t.team,t.ranked&&t.tournament_type!=="RankedCup"?"Ranked":null,...t.platform_groups||[],t.region].filter(Boolean);return n`
      <div class="event-card ${e.live?"live":""} ${a?"expanded":""} ${t.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(t)}>
          ${t.poster?n`<img class="event-art" src=${t.poster} alt="" loading="lazy" @error=${M} />`:p}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${t.name}</span>
              ${e.live?n`<span class="placement-badge win">LIVE</span>`:p}
            </div>
            <span class="match-mode ${e.soon?"soon":""}">${e.text}</span>
            <div class="tag-row">
              ${s?n`<span class="tag type-tag ${t.tournament_type==="FNCS"?"fncs":""}">${s}</span>`:p}
              ${t.can_spectate?n`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>`:p}
              ${r.map(o=>n`<span class="tag">${o}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(t):p}
      </div>
    `}_renderEventDetails(t){let e=t.loading_screen||t.poster;return n`
      <div class="event-details">
        ${e?n`<img class="event-hero" src=${e} alt="" @error=${M} />`:p}
        ${t.subtitle&&t.subtitle!==t.name?n`<div class="detail-sub">${t.subtitle}</div>`:p}
        ${t.description?n`<p class="detail-desc">${t.description}</p>`:p}
        ${t.schedule_info?n`<p class="detail-desc muted">${t.schedule_info}</p>`:p}
        ${t.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${t.platform_groups.join(", ")}</b></div>`:p}
        <div class="detail-line"><span>Region</span><b>${t.region}</b></div>
        ${t.min_account_level?n`<div class="detail-line"><span>Minimum account level</span><b>${t.min_account_level}</b></div>`:p}
        ${t.tournament_type==="FNCS"?n`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`:p}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${t.windows.map(a=>{let s=this._windowState(a),r=`${t.event_id}|${a.window_id}`,o=this._leaderboards[r],l=Date.parse(a.begin)-this._now;return n`
              <div class="window-row ${s}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${s}">
                    ${s==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:s==="finished"?"Finished":l<7*864e5?`in ${this._formatSpan(l)}`:"Upcoming"}
                  </span>
                  ${s!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(t.event_id,a.window_id)}>
                        ${o?.loading?"Loading\u2026":o?.data?"Refresh":"Leaderboard"}
                      </button>`:p}
                </div>
                ${o?this._renderLeaderboard(o):p}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(t){if(t.error)return n`<div class="lb-note">${t.error}</div>`;if(!t.data)return t.loading?n`<div class="lb-note">Loading leaderboard…</div>`:p;let e=t.data,a=(s,r=!1)=>n`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(s.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(s.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(s.points)} pts</span>
        <span class="lb-extra">${s.matches}m · ${s.wins}W · ${s.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${e.player&&!e.entries.some(s=>s.is_player)?a(e.player,!0):p}
        ${e.entries.length?e.entries.map(s=>a(s,s.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${e.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(e.updated)}${e.total_pages?` \xB7 ${e.total_pages} pages`:""}</div>`:p}
      </div>
    `}};w([V({attribute:!1})],k.prototype,"hass",2),w([E()],k.prototype,"_config",2),w([E()],k.prototype,"_view",2),w([E()],k.prototype,"_window",2),w([E()],k.prototype,"_selectedMode",2),w([E()],k.prototype,"_loadingAction",2),w([E()],k.prototype,"_catalog",2),w([E()],k.prototype,"_avatar",2),w([E()],k.prototype,"_events",2),w([E()],k.prototype,"_filters",2),w([E()],k.prototype,"_expandedEvent",2),w([E()],k.prototype,"_expandedMatch",2),w([E()],k.prototype,"_leaderboards",2),w([E()],k.prototype,"_now",2),w([E()],k.prototype,"_matchLists",2),w([E()],k.prototype,"_showAllMatches",2),w([E()],k.prototype,"_expandedSprite",2),w([E()],k.prototype,"_spriteFilter",2),w([E()],k.prototype,"_spriteSort",2),w([E()],k.prototype,"_trends",2),w([E()],k.prototype,"_pass",2),w([E()],k.prototype,"_passSet",2),w([E()],k.prototype,"_passPage",2),w([E()],k.prototype,"_outfits",2),w([E()],k.prototype,"_outfitQuery",2),w([E()],k.prototype,"_outfitSort",2),w([E()],k.prototype,"_outfitPage",2),w([E()],k.prototype,"_selectedOutfit",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",k);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${_e} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{k as FortniteActivityCard};
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
