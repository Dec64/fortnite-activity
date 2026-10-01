var ee=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var x=(l,i,t,e)=>{for(var a=e>1?void 0:e?ae(i,t):i,s=l.length-1,r;s>=0;s--)(r=l[s])&&(a=(e?r(i,t,a):r(a))||a);return e&&a&&ee(i,t,a),a};var at=globalThis,it=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dt=Symbol(),Rt=new WeakMap,I=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(it&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=Rt.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&Rt.set(t,i))}return i}toString(){return this.cssText}},zt=l=>new I(typeof l=="string"?l:l+"",void 0,dt),W=(l,...i)=>{let t=l.length===1?l[0]:i.reduce((e,a,s)=>e+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+l[s+1],l[0]);return new I(t,l,dt)},Pt=(l,i)=>{if(it)l.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),a=at.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,l.appendChild(e)}},pt=it?l=>l:l=>l instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return zt(t)})(l):l;var{is:ie,defineProperty:se,getOwnPropertyDescriptor:re,getOwnPropertyNames:ne,getOwnPropertySymbols:oe,getPrototypeOf:le}=Object,st=globalThis,Lt=st.trustedTypes,ce=Lt?Lt.emptyScript:"",de=st.reactiveElementPolyfillSupport,q=(l,i)=>l,K={toAttribute(l,i){switch(i){case Boolean:l=l?ce:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,i){let t=l;switch(i){case Boolean:t=l!==null;break;case Number:t=l===null?null:Number(l);break;case Object:case Array:try{t=JSON.parse(l)}catch{t=null}}return t}},rt=(l,i)=>!ie(l,i),Ft={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??=Symbol("metadata"),st.litPropertyMetadata??=new WeakMap;var z=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=Ft){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(i,e,t);a!==void 0&&se(this.prototype,i,a)}}static getPropertyDescriptor(i,t,e){let{get:a,set:s}=re(this.prototype,i)??{get(){return this[t]},set(r){this[t]=r}};return{get:a,set(r){let c=a?.call(this);s?.call(this,r),this.requestUpdate(i,c,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Ft}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let i=le(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let t=this.properties,e=[...ne(t),...oe(t)];for(let a of e)this.createProperty(a,t[a])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let a of e)t.unshift(pt(a))}else i!==void 0&&t.push(pt(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),a=this.constructor._$Eu(i,e);if(a!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:K).toAttribute(t,e.type);this._$Em=i,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(i,t){let e=this.constructor,a=e._$Eh.get(i);if(a!==void 0&&this._$Em!==a){let s=e.getPropertyOptions(a),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:K;this._$Em=a;let c=r.fromAttribute(t,s.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(i,t,e,a=!1,s){if(i!==void 0){let r=this.constructor;if(a===!1&&(s=this[i]),e??=r.getPropertyOptions(i),!((e.hasChanged??rt)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:a,wrapped:s},r){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,r??t??this[i]),s!==!0||r!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),a===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,s]of e){let{wrapped:r}=s,c=this[a];r!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,s,c)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[q("elementProperties")]=new Map,z[q("finalized")]=new Map,de?.({ReactiveElement:z}),(st.reactiveElementVersions??=[]).push("2.1.2");var vt=globalThis,Tt=l=>l,nt=vt.trustedTypes,Bt=nt?nt.createPolicy("lit-html",{createHTML:l=>l}):void 0,Vt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Ht="?"+L,pe=`<${Ht}>`,B=document,Z=()=>B.createComment(""),Q=l=>l===null||typeof l!="object"&&typeof l!="function",_t=Array.isArray,he=l=>_t(l)||typeof l?.[Symbol.iterator]=="function",ht=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,Ot=/>/g,F=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Ut=/"/g,It=/^(?:script|style|textarea|title)$/i,yt=l=>(i,...t)=>({_$litType$:l,strings:i,values:t}),n=yt(1),P=yt(2),Re=yt(3),D=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),jt=new WeakMap,T=B.createTreeWalker(B,129);function Wt(l,i){if(!_t(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bt!==void 0?Bt.createHTML(i):i}var ue=(l,i)=>{let t=l.length-1,e=[],a,s=i===2?"<svg>":i===3?"<math>":"",r=G;for(let c=0;c<t;c++){let o=l[c],h,b,u=-1,_=0;for(;_<o.length&&(r.lastIndex=_,b=r.exec(o),b!==null);)_=r.lastIndex,r===G?b[1]==="!--"?r=Dt:b[1]!==void 0?r=Ot:b[2]!==void 0?(It.test(b[2])&&(a=RegExp("</"+b[2],"g")),r=F):b[3]!==void 0&&(r=F):r===F?b[0]===">"?(r=a??G,u=-1):b[1]===void 0?u=-2:(u=r.lastIndex-b[2].length,h=b[1],r=b[3]===void 0?F:b[3]==='"'?Ut:Nt):r===Ut||r===Nt?r=F:r===Dt||r===Ot?r=G:(r=F,a=void 0);let v=r===F&&l[c+1].startsWith("/>")?" ":"";s+=r===G?o+pe:u>=0?(e.push(h),o.slice(0,u)+Vt+o.slice(u)+L+v):o+L+(u===-2?c:v)}return[Wt(l,s+(l[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},Y=class l{constructor({strings:i,_$litType$:t},e){let a;this.parts=[];let s=0,r=0,c=i.length-1,o=this.parts,[h,b]=ue(i,t);if(this.el=l.createElement(h,e),T.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=T.nextNode())!==null&&o.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(Vt)){let _=b[r++],v=a.getAttribute(u).split(L),y=/([.?@])?(.*)/.exec(_);o.push({type:1,index:s,name:y[2],strings:v,ctor:y[1]==="."?gt:y[1]==="?"?mt:y[1]==="@"?bt:j}),a.removeAttribute(u)}else u.startsWith(L)&&(o.push({type:6,index:s}),a.removeAttribute(u));if(It.test(a.tagName)){let u=a.textContent.split(L),_=u.length-1;if(_>0){a.textContent=nt?nt.emptyScript:"";for(let v=0;v<_;v++)a.append(u[v],Z()),T.nextNode(),o.push({type:2,index:++s});a.append(u[_],Z())}}}else if(a.nodeType===8)if(a.data===Ht)o.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(L,u+1))!==-1;)o.push({type:7,index:s}),u+=L.length-1}s++}}static createElement(i,t){let e=B.createElement("template");return e.innerHTML=i,e}};function U(l,i,t=l,e){if(i===D)return i;let a=e!==void 0?t._$Co?.[e]:t._$Cl,s=Q(i)?void 0:i._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(l),a._$AT(l,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(i=U(l,a._$AS(l,i.values),a,e)),i}var ut=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,a=(i?.creationScope??B).importNode(t,!0);T.currentNode=a;let s=T.nextNode(),r=0,c=0,o=e[0];for(;o!==void 0;){if(r===o.index){let h;o.type===2?h=new X(s,s.nextSibling,this,i):o.type===1?h=new o.ctor(s,o.name,o.strings,this,i):o.type===6&&(h=new ft(s,this,i)),this._$AV.push(h),o=e[++c]}r!==o?.index&&(s=T.nextNode(),r++)}return T.currentNode=B,a}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},X=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=U(this,i,t),Q(i)?i===d||i==null||i===""?(this._$AH!==d&&this._$AR(),this._$AH=d):i!==this._$AH&&i!==D&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):he(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==d&&Q(this._$AH)?this._$AA.nextSibling.data=i:this.T(B.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,a=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=Y.createElement(Wt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let s=new ut(a,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(i){let t=jt.get(i.strings);return t===void 0&&jt.set(i.strings,t=new Y(i)),t}k(i){_t(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let s of i)a===t.length?t.push(e=new l(this.O(Z()),this.O(Z()),this,this.options)):e=t[a],e._$AI(s),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=Tt(i).nextSibling;Tt(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,a,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=i,this.name=t,this._$AM=a,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(i,t=this,e,a){let s=this.strings,r=!1;if(s===void 0)i=U(this,i,t,0),r=!Q(i)||i!==this._$AH&&i!==D,r&&(this._$AH=i);else{let c=i,o,h;for(i=s[0],o=0;o<s.length-1;o++)h=U(this,c[e+o],t,o),h===D&&(h=this._$AH[o]),r||=!Q(h)||h!==this._$AH[o],h===d?i=d:i!==d&&(i+=(h??"")+s[o+1]),this._$AH[o]=h}r&&!a&&this.j(i)}j(i){i===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},gt=class extends j{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===d?void 0:i}},mt=class extends j{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==d)}},bt=class extends j{constructor(i,t,e,a,s){super(i,t,e,a,s),this.type=5}_$AI(i,t=this){if((i=U(this,i,t,0)??d)===D)return;let e=this._$AH,a=i===d&&e!==d||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,s=i!==d&&(e===d||a);a&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},ft=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){U(this,i)}};var ge=vt.litHtmlPolyfillSupport;ge?.(Y,X),(vt.litHtmlVersions??=[]).push("3.3.3");var qt=(l,i,t)=>{let e=t?.renderBefore??i,a=e._$litPart$;if(a===void 0){let s=t?.renderBefore??null;e._$litPart$=a=new X(i.insertBefore(Z(),s),s,void 0,t??{})}return a._$AI(l),a};var xt=globalThis,R=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=qt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};R._$litElement$=!0,R.finalized=!0,xt.litElementHydrateSupport?.({LitElement:R});var me=xt.litElementPolyfillSupport;me?.({LitElement:R});(xt.litElementVersions??=[]).push("4.2.2");var be={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:rt},fe=(l=be,i,t)=>{let{kind:e,metadata:a}=t,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),s.set(t.name,l),e==="accessor"){let{name:r}=t;return{set(c){let o=i.get.call(this);i.set.call(this,c),this.requestUpdate(r,o,l,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,l,c),c}}}if(e==="setter"){let{name:r}=t;return function(c){let o=this[r];i.call(this,c),this.requestUpdate(r,o,l,!0,c)}}throw Error("Unsupported decorator location: "+e)};function V(l){return(i,t)=>typeof t=="object"?fe(l,i,t):((e,a,s)=>{let r=a.hasOwnProperty(s);return a.constructor.createProperty(s,e),r?Object.getOwnPropertyDescriptor(a,s):void 0})(l,i,t)}function w(l){return V({...l,state:!0,attribute:!1})}var Kt=W`
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
`;var $t=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"}],ve=l=>l.layout==="session_only"?["session"]:l.layout==="career_only"?["stats"]:l.layout==="events_only"?["events"]:$t.map(i=>i.value).filter(i=>i!=="events"||l.show_tournaments!==!1),_e=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; leave empty to use the equipped outfit)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:$t}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...$t]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"show_platforms",label:"Show linked platform accounts (PSN / Xbox / Switch names)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],J=class extends R{setConfig(i){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,max_feed_matches:10,...i},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=ve(this._config))}_valueChanged(i){if(!this._config||!this.hass)return;let t=i.target,e=i.detail?i.detail.value:t.value;this._config={...this._config,...e},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?d:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${_e}
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
  `}};x([V({attribute:!1})],J.prototype,"hass",2),x([w()],J.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",J);var ye="1.10.0";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var xe={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},H={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},O={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},$e={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Gt=(l,i)=>{let t=l&&$e[l]||l||"";return i===1||!t?t:`${t}s`},Zt={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},Qt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],we={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},wt={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_platforms:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},Yt=["session","stats","events","sprites","trends","pass","locker"],ke={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},Et=l=>String(l?.icon||"").split("/").pop()||"",et=l=>l?.type==="Currency"&&(/MTX/i.test(Et(l))||/v-?bucks/i.test(l?.name||"")),St=l=>l?.type==="AthenaCharacter"||/^T_Soldier_/i.test(Et(l)),lt=l=>{if(St(l))return"Outfit";if(et(l))return"V-Bucks";let i=Et(l);return l?.type==="AthenaDance"&&/Spray/i.test(i)?"Spray":l?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(i)?"Emoticon":ke[l?.type]||"Cosmetic"},Xt=l=>l?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(l.name)?l.name:lt(l),E=l=>{l.target.hidden=!0},Jt=l=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:l}),tt={at:0},N={at:0},kt=new Map,$=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...wt};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._renderedView=null;this._entityCache=new Map;this._avatarQuery=""}static get styles(){return Kt}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...wt,...t},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...wt}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-N.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let t=this._config;if(Array.isArray(t.sections)&&t.sections.length){let e=t.sections.filter(a=>Yt.includes(a));if(e.length)return[...new Set(e)]}switch(t.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return Yt.filter(e=>e!=="events"||t.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");if(!e||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(e.states[a]!==this.hass.states[a])return!0;return!1}updated(t){if(super.updated(t),!this.hass)return;let e=t.has("hass")&&!t.get("hass");e&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(t.has("_config")||e)&&this._scheduleAvatar(),this._renderedView==="pass"&&this._loadPass(),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!tt.promise||Date.now()-tt.at>36e5)&&(tt.at=Date.now(),tt.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let t=await tt.promise;this._catalog={season:t?.season,playlists:t?.playlists||{}}}async _loadEvents(t=!1){if(this.hass){(t||!N.promise||Date.now()-N.at>10*6e4)&&(N.at=Date.now(),N.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),this._events.list||(this._events={...this._events,loading:!0});try{let e=await N.promise;this._events={list:e?.tournaments??null,defaultRegion:e?.default_region_group}}catch(e){N.promise=void 0,this._events={error:e?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let t=(this._config.avatar||"").trim();if(t!==this._avatarQuery){if(this._avatarQuery=t,window.clearTimeout(this._avatarTimer),t.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let e=t.toLowerCase();kt.has(e)||kt.set(e,this.hass.callWS({type:"fortnite_activity/cosmetic",query:t}).then(s=>s?.cosmetic||null).catch(()=>null));let a=await kt.get(e);this._avatarQuery===t&&(this._avatar=a)},800)}}async _loadLeaderboard(t,e){let a=`${t}|${e}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let s=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:t,window_id:e,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:s?.leaderboard?{data:s.leaderboard}:{error:s?.unavailable||"Leaderboard unavailable"}}}catch(s){this._leaderboards={...this._leaderboards,[a]:{error:s?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(t){this._outfits={error:t?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let t=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:t?.battlepass??null}}catch(t){this._pass={error:t?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let t=Qt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!t.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let e=(a,s)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:t,period:s,types:["mean","min","max","state"]});try{let a=await e(30,"day"),s="day";Object.values(a||{}).every(r=>(r||[]).length<3)&&(a=await e(7,"hour"),s="hour"),this._trends={stats:a||{},at:Date.now(),period:s}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(t,e){!this.hass||this._matchLists[t]||(this._matchLists={...this._matchLists,[t]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...e}).then(a=>{this._matchLists={...this._matchLists,[t]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[t]:{error:a?.message||"Could not load matches"}}}))}_isRanked(t){return!!t.rank_delta_pct||!!t.unreal_rank_change||/habanero/i.test(t.playlist_id||"")}_findEntity(t,e){let a=this.hass?.states;if(!a)return;let s=this._player,r=`${s}:${t}:${e}`,c=this._entityCache.get(r);if(c&&a[c])return a[c];let o;for(let[h,b]of Object.entries(a))if(h.startsWith(`${t}.`)&&b.attributes?.fortnite_player_id===s&&b.attributes?.fortnite_entity_key===e){o=h;break}if(o||(o=[e,...xe[e]||[]].flatMap(u=>[`${t}.fortnite_${s}_${u}`,`${t}.fortnite_${s}_${s}_${u}`]).find(u=>a[u])),!!o)return this._entityCache.set(r,o),a[o]}async _callService(t,e={}){if(this.hass){this._loadingAction=t;try{await this.hass.callService("fortnite_activity",t,{player_id:this._player,...e}),t==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${t}:`,a)}}}_setView(t){this._view=t,t==="events"&&this._loadEvents(),t==="trends"&&this._loadTrends(),t==="pass"&&this._loadPass(),t==="locker"&&this._loadOutfits()}_entityId(t,e){return this._findEntity(t,e)?.entity_id}_toggleEvent(t){if(this._expandedEvent===t.key){this._expandedEvent=null;return}this._expandedEvent=t.key;let e=t.windows.find(a=>this._windowState(a)==="live")||[...t.windows].reverse().find(a=>this._windowState(a)==="finished");e&&!this._leaderboards[`${t.event_id}|${e.window_id}`]&&this._loadLeaderboard(t.event_id,e.window_id)}_formatRelativeTime(t){if(!t)return"";let e=new Date(t);if(isNaN(e.getTime()))return"";let a=Math.max(1,Math.round((this._now-e.getTime())/6e4));if(a<60)return`${a}m ago`;let s=Math.round(a/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`}_formatDuration(t){if(!t||t<=0)return"0m";let e=Math.floor(t/60),a=Math.round(t%60);return e>0?`${e}h ${a}m`:`${a}m`}_formatSpan(t){let e=Math.max(0,Math.round(t/6e4)),a=Math.floor(e/1440),s=Math.floor(e%1440/60),r=e%60;return a>0?`${a}d ${s}h`:s>0?`${s}h ${r}m`:`${r}m`}_formatWhen(t){try{return Jt(this.hass?.config?.time_zone).format(new Date(t)).replace(/\b(am|pm)\b/i,e=>e.toLowerCase())}catch{return Jt().format(new Date(t))}}_num(t,e=0){return Number(t||0).toLocaleString("en-GB",{maximumFractionDigits:e,minimumFractionDigits:0})}_playlist(t){return t?this._catalog.playlists[t.toLowerCase()]:void 0}_windowState(t){let e=Date.parse(t.begin),a=Date.parse(t.end);return this._now>=a?"finished":this._now>=e?"live":"upcoming"}_rankBadge(t,e=30){let a=t||"Unranked",s=Object.keys(H).find(u=>a.startsWith(u));if(!s)return n`<span class="rank-badge unranked" style="width:${e}px;height:${e}px">–</span>`;let[r,c]=H[s],o=(a.match(/\b(I{1,3})$/)||[])[1]||"",h=`g-${s}-${e}`;return n`<span class="rank-badge" title=${a} style="width:${e}px;height:${e}px">
      ${P`<svg viewBox="0 0 40 44" width=${e} height=${e} aria-hidden="true">
        <defs><linearGradient id=${h} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${r}></stop><stop offset="1" stop-color=${c}></stop>
        </linearGradient></defs>
        ${s==="Unreal"?P`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:P`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${o}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let t=this._player,e=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),s=this._findEntity("sensor","rank_battle_royale"),r=this._findEntity("sensor","rank_reload"),c=this._findEntity("sensor","level"),o=this._findEntity("binary_sensor","playing"),h=this._findEntity("sensor","profile"),b=this._findEntity("sensor","sprites"),u=this._findEntity("sensor","power_ranking"),_=!!b&&!["unavailable","unknown"].includes(b.state);if(!e&&!a&&!o)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${t}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let v=o?.state==="on"||e?.state==="active",y=e?.attributes||{},p=a?.attributes||{},m=h?.attributes||{},f={...s?.attributes||{},current_rank:s?.state},g={...r?.attributes||{},current_rank:r?.state},k=!!h?.attributes?.outfits?.owned_count,S=this._sections.filter(Mt=>this._sections.length===1||(Mt!=="sprites"||_)&&(Mt!=="locker"||k)),C=this._config.default_section,M=v&&S.includes("session")?"session":S.includes("stats")?"stats":S[0],A=this._view??(C&&C!=="auto"&&S.includes(C)?C:M);S.includes(A)||(A=M),this._renderedView=A;let Ct=this._config.header||"full",ct="",At={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};At[this._config.theme_accent||""]&&(ct+=`--accent: ${At[this._config.theme_accent]};`),this._config.custom_background&&(ct+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let te=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}`;return n`
      <ha-card class=${te} style="${ct}">
        ${Ct==="none"?d:Ct==="slim"?this._renderSlimHeader(t,v,y,m):this._renderHeader(t,v,y,p,m,c,f,g)}
        ${this._renderButtons(A,v,S)}
        ${A==="session"?this._renderSessionView(v,y,f):A==="events"?this._renderEventsView():A==="sprites"?this._renderSpritesView(b):A==="trends"?this._renderTrendsView():A==="pass"?this._renderPassView(c):A==="locker"?this._renderLockerView(m):this._renderStatsView(p,m,f,g,u)}
      </ha-card>
    `}_renderHeader(t,e,a,s,r,c,o,h){let b=r.display_name||t.charAt(0).toUpperCase()+t.slice(1),u=r.season||this._catalog.season,_=this._config.show_platforms!==!1?r.platforms||[]:[],v=s.metrics?.last_played,y=c?.attributes||{},p=Number(c?.state)||0,m=Number(y.account_level||0),f=this._avatarImage(r),g=this._config.compact?20:24,k=this._findEntity("sensor","vbucks"),S=!this._config.hide_vbucks&&k&&!isNaN(Number(k.state)),C=k?.attributes?.crew;return n`
      <div class="fa-header">
        <div class="player-avatar ${f?"has-image":""}">
          ${f?n`<img src=${f} alt=${this._avatarName(r)} @error=${E} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${b}</h2>
            <span class="header-ranks">
              ${o.current_rank&&o.current_rank!=="Unranked"?this._rankBadge(o.current_rank,g):d}
              ${h.current_rank&&h.current_rank!=="Unranked"?this._rankBadge(h.current_rank,g):d}
            </span>
          </div>
          <div class="player-meta">
            ${u?.number?n`<span class="level-badge">S${u.number} · ${u.days_left}d left</span>`:d}
            ${!this._config.hide_season_level&&p>0?n`<span class="level-badge">Lvl ${p}</span>`:d}
            ${!this._config.hide_account_level&&m>0?n`<span>Acct ${m.toLocaleString()}</span>`:d}
            ${S?n`<span class="vbucks-chip" title=${Object.entries(k.attributes?.by_kind||{}).map(([M,A])=>`${M}: ${this._num(A)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(k.state)}</span>`:d}
            ${C?.active&&!this._config.hide_vbucks?n`<span class="crew-chip" title="Fortnite Crew${C.end_date?` \xB7 renews ${this._formatWhen(C.end_date)}`:""}">Crew</span>`:d}
            ${v?.time&&!e?n`<span title=${v.name||""}>Played ${this._formatRelativeTime(v.time)}</span>`:d}
          </div>
          ${_.length?n`<div class="platforms">
                ${_.map(M=>n`<span class="platform-chip" title=${M.name||M.label}>${M.label}${M.name?n` · ${M.name}`:d}</span>`)}
              </div>`:d}
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
      ${u?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${u.number}: ${u.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,u.progress_pct)}%"></div>
          </div>`:d}
    `}_liveEventCount(){let t=this._currentFilters();return(this._events.list||[]).filter(e=>this._matchesFilters(e,t)&&e.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(t){return(this._config.avatar||"").trim()?this._avatar?.icon:t?.outfits?.equipped?.icon||void 0}_avatarName(t){return(this._config.avatar||"").trim()?this._avatar?.name||"":t?.outfits?.equipped?.name||""}_renderSlimHeader(t,e,a,s){let r=s.display_name||t.charAt(0).toUpperCase()+t.slice(1),c=this._avatarImage(s),o=this._findEntity("sensor","vbucks"),h=!this._config.hide_vbucks&&o&&!isNaN(Number(o.state));return n`
      <div class="fa-header slim">
        <div class="player-avatar ${c?"has-image":""}">
          ${c?n`<img src=${c} alt="" @error=${E} />`:t.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${r}</h2>
            ${h?n`<span class="vbucks-chip">Ⓥ ${this._num(o.state)}</span>`:d}
          </div>
        </div>
        <div class="status-pill ${e?"live":"idle"}">
          ${e?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
        </div>
      </div>
    `}_renderButtons(t,e,a){let s=a.length>1,r=!this._config.sections?.length&&this._config.layout==="events_only",c=this._config.show_sub_buttons!==!1&&!r;if(!s&&!c)return d;let o=this._eventsEnabled?this._liveEventCount():0,h={session:["mdi:lightning-bolt",e?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",o],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"]},b=(u,_,v,y=0)=>n`
      <button class="bubble-sub-button ${t===u?"active":""}" @click=${()=>this._setView(u)} title=${v}>
        <ha-icon icon=${_}></ha-icon><span class="btn-label">${v}</span>
        ${y>0?n`<span class="notify-badge" title="${y} live">${y}</span>`:d}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${s?a.map(u=>b(u,h[u][0],h[u][1],h[u][2]||0)):d}
        ${c?e?n`<button class="bubble-sub-button" title="End Session" @click=${()=>this._callService("end_session")} ?disabled=${this._loadingAction==="end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="end_session"?"Stopping...":"End Session"}</span>
            </button>`:n`<button class="bubble-sub-button" title="Start Session" @click=${()=>this._callService("start_session")} ?disabled=${this._loadingAction==="start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction==="start_session"?"Starting...":"Start Session"}</span>
            </button>`:d}
        ${c?n`<button class="bubble-sub-button" title="Refresh" @click=${()=>this._callService("refresh_player")} ?disabled=${this._loadingAction==="refresh_player"}>
              <ha-icon icon=${this._loadingAction==="refresh_player"?"mdi:loading":"mdi:refresh"} class=${this._loadingAction==="refresh_player"?"spin":""}></ha-icon>
              <span class="btn-label">${this._loadingAction==="refresh_player"?"Refreshing...":"Refresh"}</span>
            </button>`:d}
      </div>
    `}_renderKpis(t){if(this._config.compact){let e=[];for(let a=0;a<t.length;a+=2)e.push(t.slice(a,a+2));return n`<table class="stat-table"><tbody>
        ${e.map(a=>n`<tr>
          ${a.map(([s,r,c])=>n`<th>${s}</th><td class="kpi-value ${c||""}">${r}</td>`)}
          ${a.length<2?n`<th></th><td></td>`:d}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${t.map(([e,a,s])=>n`<div class="kpi-chip"><span class="kpi-label">${e}</span><span class="kpi-value ${s||""}">${a}</span></div>`)}
    </div>`}_renderRank(t,e,a,s){let r=e.current_rank||"Unranked",c=Number(e.progress_pct||0),o=r.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(r,this._config.compact?26:34)}<span>${t}</span></span>
          <span class="rank-name" style="color: ${(H[Object.keys(H).find(h=>r.startsWith(h))||""]||["var(--secondary-text-color)"])[0]}">${r}</span>
        </div>
        ${o?n`<div class="unreal-position">
              <span class="unreal-number">${e.unreal_rank?`#${this._num(e.unreal_rank)}`:"Unreal"}</span>
              ${s?n`<span class="rank-delta-badge ${s>0?"pos":"neg"}">${s>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(s))} places</span>`:d}
            </div>`:this._config.hide_rank_progress?d:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,c))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${o?"Unreal leaderboard position":`${c}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(t,e,a){let s=Number(e.net_rank_delta_pct||0),r=v=>v>=0?`+${v}%`:`${v}%`,c=e.session_id,o=c?`session:${c}:${e.matches_played||0}`:"";o&&this._config.show_match_feed!==!1&&this._ensureMatches(o,{session_id:c});let b=(o?this._matchLists[o]?.matches:void 0)||e.recent_matches||[],u=b.filter(v=>this._isRanked(v)),_=u.filter(v=>v.rank_track===a.game_mode&&typeof v.unreal_rank_change=="number").reduce((v,y)=>v+(y.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",e.matches_played||0,"cyan"],["Wins",`${e.wins||0} \u{1F3C6}`,"gold"],["Kills",e.kills||0],["K/D",e.kd_ratio||0],...u.length?[["Rank Net",r(s),s>=0?"positive":"negative"]]:[]])}

      ${u.length?this._renderRank("Battle Royale Ranked",a,`${s>=0?"\u25B2":"\u25BC"} ${r(s)} this session`,_||null):d}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${e.matches_played||b.length} ${(e.matches_played||b.length)===1?"match":"matches"})</span>
              ${t?n`<span class="tracking-live">Tracking Live</span>`:d}
            </div>
            ${this._renderMatchList(o||"session",b,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:d}
    `}_renderMatchList(t,e,a){let s=this._config.max_feed_matches||10,r=this._showAllMatches[t],c=r?e:e.slice(0,s);return n`
      <div class="match-list">
        ${c.length?c.map(o=>this._renderMatch(o)):n`<div class="empty">${a}</div>`}
        ${e.length>s?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[t]:!r}}>
              ${r?"Show fewer":`Show all ${e.length}`}
            </button>`:d}
      </div>
    `}_renderMatch(t){let e=this._playlist(t.playlist_id),a=e?.image,s=`${t.timestamp}|${t.playlist_id}`,r=this._expandedMatch===s,c=(t.match_count||1)>1,o=this._isRanked(t),h=(b,u)=>u==null||u===""?d:n`<div class="detail"><span>${b}</span><b>${u}</b></div>`;return n`
      <div class="match-card ${t.is_victory?"victory":""} ${r?"expanded":""}"
        @click=${()=>this._expandedMatch=r?null:s}>
        <div class="match-row">
          ${a?n`<img class="match-art" src=${a} alt="" loading="lazy" @error=${E} />`:d}
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
                </span>`:d}
          </div>
          <ha-icon class="chevron" icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${r?n`<div class="match-details" @click=${b=>b.stopPropagation()}>
              ${a?n`<img class="detail-art" src=${a} alt="" @error=${E} />`:d}
              ${e?.description?n`<p class="detail-desc">${e.description}</p>`:d}
              <div class="detail-grid">
                ${h("Finished",this._formatWhen(t.timestamp))}
                ${h("Mode",t.mode_name)}
                ${h("Placement",t.placement_text)}
                ${h("Kills",t.kills)}
                ${c?h("Games",t.match_count):d}
                ${c&&t.wins?h("Victories",t.wins):d}
                ${h("Time played",t.minutes?this._formatDuration(t.minutes):void 0)}
                ${h("Score",t.score?this._num(t.score):void 0)}
                ${h("Players outlived",t.players_outlived?this._num(t.players_outlived):void 0)}
                ${o?n`
                      ${h("Ranked track",t.rank_track)}
                      ${h("Rank after",t.unreal_rank?`${t.current_rank} #${this._num(t.unreal_rank)}`:t.current_rank)}
                      ${h("Rank change",t.rank_delta_pct?`${t.rank_delta_pct>0?"+":""}${t.rank_delta_pct}%`:void 0)}
                      ${h("Unreal places",t.unreal_rank_change?`${t.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(t.unreal_rank_change))}`:void 0)}`:d}
              </div>
              ${(t.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:d}
            </div>`:d}
      </div>
    `}_renderStatsView(t,e,a,s,r){let c=e.windows||{},o=e.window_labels||{},h=["lifetime",...["season","week","today"].filter(S=>c[S])],b=h.includes(this._window)?this._window:"lifetime",u={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},_=t.metrics||{},v={matches:t.total_matches||0,kills:t.total_kills||0,wins:t.total_wins||0,kd:t.kd_ratio||0,win_rate:t.win_rate_pct||0,players_outlived:t.players_outlived||0,hours_played:_.hours_played,favourite_mode:_.favourite_mode,modes:t.modes||{}},y=b==="lifetime"?v:c[b],p=this._selectedMode!=="all"?y.modes?.[this._selectedMode]:null,m=p&&p.matches!==void 0?p:y,f=m.minutes!==void 0?Math.round(m.minutes/60*10)/10:y.hours_played,g=y.favourite_mode,k=(S,C)=>n`
      <button class="mode-tab ${this._selectedMode===S?"active":""}" @click=${()=>this._selectedMode=S}>${C}</button>
    `;return n`
      <div class="tab-rows">
        ${h.length>1?n`<div class="mode-tabs">
              ${h.map(S=>n`<button class="mode-tab ${b===S?"active":""}" title=${o[S]||""}
                  @click=${()=>this._window=S}>${u[S]}</button>`)}
            </div>`:d}
        <div class="mode-tabs">
          ${k("all","Overall")} ${k("zero_build","Zero Build")} ${k("build","Build")} ${k("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${m.win_rate||0}%`,"cyan"],["K/D",m.kd||0],["Wins",n`${this._num(m.wins)} 🏆`,"gold"],["Matches",this._num(m.matches)],["Kills",this._num(m.kills)],["Outlived",this._num(m.players_outlived)],["Kills/Match",m.matches?this._num(m.kills/m.matches,2):0],...f!==void 0?[["Hours",this._num(f,1)]]:[]])}

      ${b==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(t):d}
      ${g?this._renderFavourite(g,b!=="lifetime"?u[b]:""):d}
      ${b!=="lifetime"&&y?.since?this._renderWindowMatches(b,u[b],y):d}

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
          </div>`:d}
      ${e.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:d}
    `}_renderOtherTracks(t){let e=(t.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return e.length?n`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${e.map(a=>n`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(H[Object.keys(H).find(s=>a.current_rank.startsWith(s))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:d}_lineChart(t,e,a){let o=t.map(g=>g.v),h=Math.min(...o),b=Math.max(...o),u=b-h||Math.abs(b)||1,_=t[0].t,v=t[t.length-1].t||_+1,y=g=>6+(g-_)/(v-_||1)*308,p=g=>84-(g-h)/u*78,m=t.map((g,k)=>`${k?"L":"M"}${y(g.t).toFixed(1)},${p(g.v).toFixed(1)}`).join(" "),f=g=>new Date(g).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return n`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${P`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${m}" class="trend-line"></path>
        ${t.map(g=>P`<g class="trend-pt"><circle cx="${y(g.t)}" cy="${p(g.v)}" r="7" class="trend-hit"></circle><circle cx="${y(g.t)}" cy="${p(g.v)}" r="2.5" class="trend-dot"></circle><title>${f(g.t)}: ${e(g.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let e=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!e.length)return n`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,s=100,r=4,c=Math.max(4,...e.map(h=>h.kills||0)),o=(a-2*r)/e.length;return n`<svg class="trend-svg" viewBox="0 0 ${a} ${s+12}" preserveAspectRatio="none" role="img">
      ${P`${e.map((h,b)=>{let u=Math.max(2,(h.kills||0)/c*(s-14)),_=r+b*o+1;return P`<g><rect x="${_}" y="${s-u}" width="${Math.max(2,o-2)}" height="${u}" rx="2" class="kill-bar"></rect>
          ${h.is_victory?P`<text x="${_+(o-2)/2}" y="${s-u-3}" text-anchor="middle" class="win-mark">★</text>`:d}
          <rect x="${_-1}" y="0" width="${o}" height="${s}" fill="transparent"><title>${this._formatWhen(h.timestamp)} · ${h.mode_name}: ${h.kills} kills · ${h.placement_text}</title></rect></g>`})}
      <line x1="${r}" x2="${a-r}" y1="${s}" y2="${s}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${c} kills</span></div>`}_renderTrendsView(){let t=this._trends,e=Qt.map(a=>{let s=this._entityId("sensor",a.key);if(!s)return d;let r=((t.stats||{})[s]||[]).map(v=>({t:typeof v.start=="number"?v.start:Date.parse(v.start),v:v.mean??v.state??v.max})).filter(v=>typeof v.v=="number"),c=this.hass.states[s];if(!r.length&&(!c||["unavailable","unknown"].includes(c.state)))return d;let o=v=>`${this._num(v,a.digits||0)}${a.unit||""}`,h=r[0]?.v,b=r[r.length-1]?.v,u=r.length>1?b-h:null,_=u==null||u===0?"":u>0!=!!a.lowerBetter?"positive":"negative";return n`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${_}">${c&&!isNaN(Number(c.state))?o(Number(c.state)):"\u2014"}</span>
        </div>
        ${r.length>1?this._lineChart(r,o,t.period||"day"):n`<div class="collecting">Collecting history — the chart fills in as Home Assistant records it.</div>`}
        <div class="rank-meta">
          <span>${r.length>1?`${u>=0?"\u25B2":"\u25BC"} ${o(Math.abs(u))} over ${r.length} ${t.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return n`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${t.loading&&!t.stats?n`<div class="empty">Loading history…</div>`:d}
      ${t.error?n`<div class="empty">${t.error}</div>`:d}
      <div class="trend-grid">${e}</div>
    `}_passSets(t){let e=[],a=new Map;for(let s of t.pages||[]){let r=String(s.track||"").replace(/Bonus$/,"")||"Pass";a.has(r)||(a.set(r,[]),e.push(r)),a.get(r).push(s)}return e.map((s,r)=>{let c=a.get(s),o=c.flatMap(p=>p.rewards||[]),h=o.find(St)||null,b=h?.icon||o.find(p=>p.icon&&!et(p)&&p.type!=="HomebaseBannerIcon")?.icon||null,u={},_={},v=new Map,y=0;for(let p of c){let m=/Bonus$/.test(p.track||"");for(let f of p.rewards||[]){if(typeof f.cost=="number"&&f.cost>0&&f.price_row!=="Included"){let k=m?_:u;k[f.currency||""]=(k[f.currency||""]||0)+f.cost}et(f)&&(y+=Number(f.quantity)||0);let g=lt(f);g!=="V-Bucks"&&v.set(g,(v.get(g)||0)+1)}}return{key:s,title:h?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(h.name)?h.name:`Set ${r+1}`,outfit:h,hero:b,pages:c.map(p=>{let m=/Bonus$/.test(p.track||"");return{label:`${m?"Bonus":"Page"} ${p.page}`,bonus:m,rewards:p.rewards||[]}}),rewardCount:o.length,baseCost:u,bonusCost:_,vbucks:y,types:[...v.entries()].sort((p,m)=>m[1]-p[1])}})}_costText(t){return Object.entries(t).map(([e,a])=>`${this._num(a)} ${Gt(e,a)}`).join(" + ")}_passCostBadge(t){if(t.price_row==="Included"||t.cost===0)return n`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof t.cost!="number")return d;let e=t.currency==="AthenaCategoryStar";return n`<span class="bp-cost ${e?"character":""}" title="${t.cost} ${Gt(t.currency,t.cost)}">
      <ha-icon icon=${e?"mdi:account-star":"mdi:star"}></ha-icon>${t.cost}</span>`}_goPassSet(t,e){this._passSet=(t+e)%e,this._passPage=0}_renderPassView(t){let e=this._pass;if(e.loading||e.data===void 0&&!e.error)return n`<div class="empty">Loading Battle Pass…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(!e.data||!e.data.pages?.length)return n`<div class="empty">The Battle Pass catalogue is not available right now.</div>`;let a=e.data,s=this._passSets(a),r=Math.min(this._passSet,s.length-1),c=s[r],o=Math.min(this._passPage,c.pages.length-1),h=c.pages[o],b=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,u=Number(t?.state)||null,_=s.reduce((f,g)=>f+g.vbucks,0),v=s.filter(f=>f.outfit).length,y={};for(let f of s)for(let[g,k]of Object.entries(f.baseCost))y[g]=(y[g]||0)+k;let p=this._findEntity("sensor","profile")?.attributes?.quests,m=(f,g)=>g>1&&!/s$/.test(f)?`${f}s`:f;return n`
      <div class="bp">
        <div class="bp-summary">
          <div class="bp-summary-title">
            <ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon>
            <span>Season ${a.season} Battle Pass</span>
            ${b?.days_left!=null?n`<span class="bp-days">${b.days_left}d left</span>`:d}
          </div>
          <div class="bp-stats">
            <div><b>${s.length}</b><span>sets</span></div>
            <div><b>${v}</b><span>outfits</span></div>
            <div><b>${a.reward_count??s.reduce((f,g)=>f+g.rewardCount,0)}</b><span>rewards</span></div>
            ${_?n`<div class="gold"><b>${this._num(_)}</b><span>V-Bucks</span></div>`:d}
            ${u?n`<div><b>${u}</b><span>level</span></div>`:d}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${s.map((f,g)=>n`
            <button class="bp-thumb ${g===r?"active":""}" role="tab" aria-selected=${g===r?"true":"false"} title=${f.title}
              @click=${()=>this._goPassSet(g,s.length)}>
              ${f.hero?n`<img src=${f.hero} alt="" @error=${E} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${()=>this._goPassSet(r-1,s.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${c.hero?n`<img src=${c.hero} alt="" @error=${E} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${r+1} of ${s.length}</div>
              <div class="bp-hero-name">${c.title}</div>
              <div class="bp-hero-meta">
                ${Object.keys(c.baseCost).length?n`<span title="Stars to unlock every base page reward">${this._costText(c.baseCost)}</span>`:d}
                ${Object.keys(c.bonusCost).length?n`<span title="Bonus pages">Bonus: ${this._costText(c.bonusCost)}</span>`:d}
                ${c.vbucks?n`<span class="gold">Ⓥ ${this._num(c.vbucks)}</span>`:d}
              </div>
              <div class="bp-hero-types">${c.types.map(([f,g])=>`${g} ${m(f,g)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(r+1,s.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${c.pages.length>1?n`<div class="bp-pages">
                ${c.pages.map((f,g)=>n`
                  <button class="mini-button ${g===o?"active":""} ${f.bonus?"bonus":""}" @click=${()=>this._passPage=g}>
                    ${f.label}<span class="bp-page-count">${f.rewards.length}</span>
                  </button>`)}
              </div>`:d}

          <div class="bp-rewards">
            ${h.rewards.map(f=>n`
              <div class="bp-reward ${et(f)?"vbucks":""} ${St(f)?"outfit":""}" title="${Xt(f)} · ${lt(f)}">
                <div class="bp-reward-img">
                  ${f.icon?n`<img src=${f.icon} alt="" @error=${E} />`:n`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${this._passCostBadge(f)}
                </div>
                <span class="bp-reward-name">${et(f)&&f.quantity?`${this._num(f.quantity)} V-Bucks`:Xt(f)}</span>
                <span class="bp-reward-type">${lt(f)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(y).length?n`<span>All base pages: ${this._costText(y)}</span>`:d}
          <span>Claimed rewards are not available from this data source.</span>
          ${p?n`<span title="Epic's quest data has no names or targets; only states are counted">Quests on record: ${this._num(p.total)}</span>`:d}
        </div>
      </div>
    `}_outfitRarity(t){let e=String(t?.rarity||"");return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}_renderLockerView(t){let e=t.outfits||{},a=e.equipped,s=this._outfits;if(s.loading||s.data===void 0&&!s.error)return n`<div class="empty">Loading locker…</div>`;if(s.error)return n`<div class="empty">${s.error}</div>`;let r=s.data?.outfits||[];if(!r.length)return n`<div class="empty">No owned outfits yet. They appear once the linked Epic account's profile has been read (every 6 hours).</div>`;let c=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],o=r.filter(g=>g.name),h=r.length-o.length,b=this._outfitQuery.trim().toLowerCase(),_=[...o.filter(g=>!b||String(g.name).toLowerCase().includes(b)||String(g.set||"").toLowerCase().includes(b))].sort((g,k)=>{if(g.id?.toLowerCase()===e.equipped_id)return-1;if(k.id?.toLowerCase()===e.equipped_id)return 1;if(this._outfitSort==="rarity"){let S=c.indexOf(this._outfitRarity(g)),C=c.indexOf(this._outfitRarity(k));return(S<0?99:S)-(C<0?99:C)||String(g.name).localeCompare(String(k.name))}return String(g.name).localeCompare(String(k.name))}),v=this._config.compact?18:24,y=Math.max(1,Math.ceil(_.length/v)),p=Math.min(this._outfitPage,y-1),m=_.slice(p*v,p*v+v),f=new Map;for(let g of o)f.set(this._outfitRarity(g)||"Other",(f.get(this._outfitRarity(g)||"Other")||0)+1);return n`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${O[this._outfitRarity(a)]||"var(--accent)"}">
          <div class="locker-hero-img">
            ${a?.icon?n`<img src=${a.icon} alt="" @error=${E} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Equipped${e.shuffle&&e.shuffle!=="DISABLED"?" \xB7 shuffle on":""}</div>
            <div class="bp-hero-name">${a?.name||(e.equipped_id?"Unknown outfit":"Not available")}</div>
            ${a?.rarity?n`<div class="bp-hero-meta"><span>${this._outfitRarity(a)}</span></div>`:d}
            <div class="bp-hero-types">
              <b>${this._num(r.length)}</b> outfits owned${h?` \xB7 ${h} not in the catalogue`:""}
            </div>
            <div class="locker-rarities">
              ${c.filter(g=>f.get(g)).map(g=>n`<span class="rarity-dot" style="--rarity:${O[g]}" title=${g}>${f.get(g)}</span>`)}
            </div>
          </div>
        </div>

        <div class="locker-controls">
          <input class="locker-search" type="search" placeholder="Search outfits or sets" .value=${this._outfitQuery}
            @input=${g=>{this._outfitQuery=g.target.value,this._outfitPage=0}} />
          <button class="mini-button ${this._outfitSort==="rarity"?"active":""}" @click=${()=>{this._outfitSort="rarity",this._outfitPage=0}}>Rarity</button>
          <button class="mini-button ${this._outfitSort==="name"?"active":""}" @click=${()=>{this._outfitSort="name",this._outfitPage=0}}>A–Z</button>
        </div>

        ${m.length?n`<div class="bp-rewards locker-grid">
              ${m.map(g=>{let k=g.id?.toLowerCase()===e.equipped_id;return n`
                  <div class="bp-reward ${k?"equipped":""}" style="--rarity:${O[this._outfitRarity(g)]||"#9CA3AF"}" title="${g.name}${g.set?` \xB7 ${g.set}`:""}">
                    <div class="bp-reward-img locker-img">
                      ${g.small||g.icon?n`<img src=${g.small||g.icon} alt="" loading="lazy" @error=${E} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${k?n`<span class="bp-cost included">Equipped</span>`:d}
                    </div>
                    <span class="bp-reward-name">${g.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(g)||"Outfit"}</span>
                  </div>`})}
            </div>`:n`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${y>1?n`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${p===0} @click=${()=>this._outfitPage=p-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${p+1} of ${y} · ${_.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${p>=y-1} @click=${()=>this._outfitPage=p+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:d}
      </div>
    `}_spriteCurve(t){let e=[...t.level_curve||[]].filter(s=>typeof s.level=="number"&&typeof s.xp=="number").sort((s,r)=>s.level-r.level),a=[];for(let s of e){if(a.length&&s.xp<a[a.length-1][1])break;a.push([s.level,s.xp])}return a.length>=2?a:[]}_spriteLevel(t,e){if(typeof t!="number"||!e.length)return null;let a=0;e.forEach(([,o],h)=>{t>=o&&(a=h)});let[s]=e[a],r=e[e.length-1],c=e[a+1];return{level:s,maxLevel:r[0],maxXp:r[1],next:c?c[1]:null,toMax:Math.max(0,r[1]-t),atMax:a===e.length-1}}_renderSpritesView(t){let e=t?.attributes||{},a=this._spriteCurve(e),s=e.families||[],r=Number(t?.state||0),c=Number(e.owned_variants||0),o=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],b=[...s.filter(p=>this._spriteFilter==="missing"?p.owned_variants<p.total_variants:this._spriteFilter==="unmastered"?p.variants.some(m=>m.owned&&!m.mastered):this._spriteFilter==="complete"?p.complete:!0)].sort((p,m)=>this._spriteSort==="rarity"?o.indexOf(m.rarity)-o.indexOf(p.rarity)||(p.dex??0)-(m.dex??0):this._spriteSort==="progress"&&m.owned_variants/m.total_variants-p.owned_variants/p.total_variants||(p.dex??0)-(m.dex??0)),u=s.flatMap(p=>p.variants.filter(m=>!m.owned&&m.drop_chance_pct).map(m=>({f:p,v:m}))).sort((p,m)=>m.v.drop_chance_pct-p.v.drop_chance_pct||o.indexOf(p.f.rarity)-o.indexOf(m.f.rarity)).slice(0,6),_=a.length?s.flatMap(p=>p.variants.filter(m=>m.owned&&typeof m.xp=="number"&&m.xp>0).map(m=>({f:p,v:m,lv:this._spriteLevel(m.xp,a)}))).filter(p=>p.lv&&!p.lv.atMax).sort((p,m)=>p.lv.toMax-m.lv.toMax).slice(0,6):[],v=(p,m)=>n`
      <button class="mode-tab ${this._spriteFilter===p?"active":""}" @click=${()=>this._spriteFilter=p}>${m}</button>`,y=(p,m)=>n`
      <button class="mode-tab ${this._spriteSort===p?"active":""}" @click=${()=>this._spriteSort=p}>${m}</button>`;return n`
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
            <span><b>${c}</b>/${e.total_variants} variants</span>
            <span><b>${e.owned_families}</b>/${e.total_families} sprites</span>
            <span><b>${e.complete_families??0}</b> full sets</span>
            <span>★ <b>${e.mastered_variants||0}</b>/${c} mastered</span>
          </div>
          ${e.equipped?n`<div class="rank-meta"><span>Equipped: <b>${e.equipped.variant}</b></span></div>`:d}
        </div>
      </div>

      ${(e.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">By game update${e.cumulative?n` · all-time ${e.cumulative.owned_variants}/${e.cumulative.total_variants}`:d}</div>
            ${e.versions.map(p=>n`
              <div class="version-row ${p.current?"current":""}">
                <span>${p.version}${p.current?" (now)":""}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,p.completion_pct)}%"></div></div>
                <span>${p.owned_variants}/${p.total_variants}</span>
              </div>`)}
          </div>`:d}

      ${_.length?n`<div class="split-section">
            <div class="section-title">Closest to mastering (current copy, level ${a[a.length-1][0]} = ${this._num(a[a.length-1][1])} XP)</div>
            <div class="master-list">
              ${_.map(({f:p,v:m,lv:f})=>n`
                <div class="master-row" style="--rarity:${O[p.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=p.id}>
                  ${m.icon?n`<img src=${m.icon} alt="" @error=${E} />`:d}
                  <span class="variant-name">${p.name.replace(/ Sprite$/,"")}${m.label!=="Base"?` \xB7 ${m.label}`:""}</span>
                  <span>Lv ${f.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,m.xp/f.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(f.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:d}

      ${u.length?n`<div class="split-section">
            <div class="section-title">Next to hunt (highest drop chance)</div>
            <div class="hunt-row">
              ${u.map(({f:p,v:m})=>n`
                <div class="hunt-item" style="--rarity:${O[p.rarity]||"#9CA3AF"}" title="${m.name}" @click=${()=>this._expandedSprite=p.id}>
                  ${m.icon?n`<img src=${m.icon} alt="" @error=${E} />`:d}
                  <span>${m.label==="Base"?p.name.replace(/ Sprite$/,""):`${m.label} ${p.name.replace(/ Sprite$/,"")}`}</span>
                  <small>${m.drop_chance_pct}%</small>
                </div>`)}
            </div>
          </div>`:d}

      <div class="tab-rows">
        <div class="mode-tabs">${v("all","All")} ${v("missing","Missing")} ${v("unmastered","To master")} ${v("complete","Full sets")}</div>
        <div class="mode-tabs">${y("dex","Dex")} ${y("rarity","Rarity")} ${y("progress","Progress")}</div>
      </div>

      <div class="sprite-grid">
        ${b.length?b.map(p=>{let m=this._expandedSprite===p.id;return n`
                <div class="sprite-card ${p.owned?"":"missing"} ${m?"open":""} ${p.complete?"complete":""}"
                  style="--rarity:${O[p.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=m?null:p.id}>
                  ${p.icon?n`<img src=${p.icon} alt="" @error=${E} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  <span class="sprite-name">${p.name.replace(/ Sprite$/,"")}</span>
                  <span class="sprite-count">${p.owned_variants}/${p.total_variants}${p.mastered?n` · ★${p.mastered}`:d}</span>
                  <span class="sprite-dots">
                    ${(p.variants||[]).map(f=>n`<i class="dot ${f.owned?"owned":""} ${f.mastered?"mastered":""}" title=${f.label}></i>`)}
                  </span>
                </div>
                ${m?this._renderSpriteDetail(p):d}`}):n`<div class="empty">Nothing matches this filter.</div>`}
      </div>
    `}_variantPerks(t){let e=new Set,a=(t.variants||[]).flatMap(s=>(s.boons||[]).filter(r=>r.name&&r.name!==t.name&&!e.has(r.name)&&e.add(r.name)).map(r=>({variant:s.label,...r})));return a.length?n`<div class="perk-list">
      <div class="section-title">Variant perks</div>
      ${a.map(s=>n`<div class="detail-line"><b>${s.variant}</b>${s.name!==s.variant?n`<span>${s.name}</span>`:d}</div>
        ${s.description?n`<div class="perk-desc">${s.description}</div>`:d}`)}
    </div>`:d}_renderSpriteDetail(t){let e=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{});return n`
      <div class="sprite-detail" style="--rarity:${O[t.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${t.icon_large||t.icon?n`<img src=${t.icon_large||t.icon} alt="" @error=${E} />`:d}
          <div>
            <b>${t.name}</b> <span class="tag rarity-tag">${t.rarity||""}</span>
            ${t.description?n`<p class="detail-desc">${t.description}</p>`:d}
            ${t.hint?n`<p class="detail-desc hint">📍 ${t.hint}</p>`:d}

          </div>
        </div>
        ${this._variantPerks(t)}
        <div class="variant-tiles">
          ${(t.variants||[]).map(a=>n`
            <div class="variant-tile ${a.owned?"":"missing"} ${a.mastered?"mastered":""}" title=${a.name}>
              ${a.icon?n`<img src=${a.icon} alt="" @error=${E} />`:d}
              <span class="variant-name">${a.label}</span>
              <span class="variant-status">
                ${a.owned?(()=>{let s=this._spriteLevel(a.xp,e),r=s?s.atMax?`Lv ${s.level}${a.xp>s.maxXp?"+":""}`:`Lv ${s.level} \xB7 ${this._num(a.xp)}/${this._num(s.next)}`:a.xp?`${this._num(a.xp)} XP`:"Owned";return n`${r}${a.count>1?` \xB7 \xD7${a.count}`:""}${a.mastered?n` <span title="Mastered at some point (collection record)">★</span>`:d}`})():a.drop_chance_pct!=null?`Missing \xB7 ${a.drop_chance_pct}%`:"Missing \xB7 special"}
              </span>
            </div>`)}
        </div>
      </div>
    `}_renderWindowMatches(t,e,a){let s=`window:${t}:${a.since}:${a.matches}`;this._ensureMatches(s,{since:a.since});let r=this._matchLists[s],c=r?.matches||[],o=r?.tracked??0,h=a.matches||0;return n`
      <div class="match-feed-header">
        <span>${e} matches (${o}${h>o?` of ${h}`:""})</span>
        ${h>o?n`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>`:d}
      </div>
      ${r?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(s,c,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(t,e){let a=this._playlist(t.playlist_id),s=a?.image,r=/ropesmile|reload/i.test(t.playlist_id+t.name)?"reload":/nobuild|zero build/i.test(t.playlist_id+t.name)?"zero_build":"build";return n`
      <div class="feature-card ${s?"":`no-art art-${r}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${e?` \xB7 ${e}`:""}</span>
          <span class="feature-value">${a?.name||t.name}</span>
          <span class="feature-sub">${this._num(t.matches)} matches</span>
        </div>
        ${s?n`<img class="feature-art" src=${s} alt="" @error=${E} />`:n`<ha-icon class="feature-icon" icon=${we[r]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(t){let e=t.metrics||{},a=Object.values(t.inputs||{}).filter(r=>r.share_pct>=1),s=t.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",e.kills_per_minute??0],["Avg Match",`${e.avg_match_minutes??0}m`],["Score/Match",this._num(e.score_per_match)],["Solo Top 10",`${e.solo_top10_rate??0}%`],["Solo Top 25",`${e.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?n`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((r,c)=>n`<div class="split-seg seg-${c}" style="width: ${r.share_pct}%" title="${r.label}: ${r.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((r,c)=>n`<span><i class="dot seg-${c}"></i>${r.label} ${r.share_pct}% · K/D ${r.kd}</span>`)}
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
    `}_defaultFilters(){return{region:this._config.events_region||this._events.defaultRegion||"EU",type:"all",mode:"all",team:"all",platform:"all"}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(t,e){return!(e.region!=="all"&&t.region_group!==e.region||e.type!=="all"&&t.tournament_type!==e.type||(e.mode==="Ranked"?!t.ranked:e.mode!=="all"&&t.mode!==e.mode)||e.team!=="all"&&t.team!==e.team||e.platform!=="all"&&!(t.platform_groups||[]).includes(e.platform))}_setFilter(t,e){this._filters={...this._currentFilters(),[t]:e}}_renderEventsView(){let t=this._events;if(t.loading&&!t.list)return n`<div class="empty">Loading tournaments…</div>`;if(t.error)return n`<div class="empty">${t.error}</div>`;if(t.list===null)return n`<div class="empty">Tournament schedule is not available right now.</div>`;let e=t.list||[],a=this._currentFilters(),s=[...new Set(e.map(o=>o.region_group))].sort(),r=e.filter(o=>this._matchesFilters(o,a)).filter(o=>o.windows.some(h=>this._windowState(h)!=="finished")||this._expandedEvent===o.key),c=(o,h)=>n`
      <select class="filter-select" .value=${a[o]} @change=${b=>this._setFilter(o,b.target.value)}>
        ${h.map(([b,u])=>n`<option value=${b} ?selected=${a[o]===b}>${u}</option>`)}
      </select>
    `;return n`
      <div class="event-filters">
        ${c("region",[["all","All regions"],...s.map(o=>[o,o])])}
        ${c("type",[["all","Type"],...[...new Set(e.map(o=>o.tournament_type).filter(Boolean))].map(o=>[o,Zt[o]||o])])}
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
        ${r.length?r.map(o=>this._renderEvent(o)):n`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(t){let e=t.windows.find(c=>this._windowState(c)==="live");if(e)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(e.end)-this._now)}`,live:!0,soon:!1};let a=t.windows.find(c=>this._windowState(c)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let s=Date.parse(a.begin)-this._now,r=s<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${r?` \xB7 in ${this._formatSpan(s)}`:""}`,live:!1,soon:r}}_renderEvent(t){let e=this._eventTiming(t),a=this._expandedEvent===t.key,s=t.tournament_type?Zt[t.tournament_type]||t.tournament_type:null,r=[t.mode,t.team,t.ranked&&t.tournament_type!=="RankedCup"?"Ranked":null,...t.platform_groups||[],t.region].filter(Boolean);return n`
      <div class="event-card ${e.live?"live":""} ${a?"expanded":""} ${t.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(t)}>
          ${t.poster?n`<img class="event-art" src=${t.poster} alt="" loading="lazy" @error=${E} />`:d}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${t.name}</span>
              ${e.live?n`<span class="placement-badge win">LIVE</span>`:d}
            </div>
            <span class="match-mode ${e.soon?"soon":""}">${e.text}</span>
            <div class="tag-row">
              ${s?n`<span class="tag type-tag ${t.tournament_type==="FNCS"?"fncs":""}">${s}</span>`:d}
              ${t.can_spectate?n`<span class="tag spectate-tag" title="Epic allows spectating this session inside Fortnite">👁 Spectate in-game</span>`:d}
              ${r.map(c=>n`<span class="tag">${c}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(t):d}
      </div>
    `}_renderEventDetails(t){let e=t.loading_screen||t.poster;return n`
      <div class="event-details">
        ${e?n`<img class="event-hero" src=${e} alt="" @error=${E} />`:d}
        ${t.subtitle&&t.subtitle!==t.name?n`<div class="detail-sub">${t.subtitle}</div>`:d}
        ${t.description?n`<p class="detail-desc">${t.description}</p>`:d}
        ${t.schedule_info?n`<p class="detail-desc muted">${t.schedule_info}</p>`:d}
        ${t.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${t.platform_groups.join(", ")}</b></div>`:d}
        <div class="detail-line"><span>Region</span><b>${t.region}</b></div>
        ${t.min_account_level?n`<div class="detail-line"><span>Minimum account level</span><b>${t.min_account_level}</b></div>`:d}
        ${t.tournament_type==="FNCS"?n`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Epic streams major FNCS rounds on its official channels; this schedule does not say which sessions are broadcast.</div>`:d}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${t.windows.map(a=>{let s=this._windowState(a),r=`${t.event_id}|${a.window_id}`,c=this._leaderboards[r],o=Date.parse(a.begin)-this._now;return n`
              <div class="window-row ${s}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${s}">
                    ${s==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:s==="finished"?"Finished":o<7*864e5?`in ${this._formatSpan(o)}`:"Upcoming"}
                  </span>
                  ${s!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(t.event_id,a.window_id)}>
                        ${c?.loading?"Loading\u2026":c?.data?"Refresh":"Leaderboard"}
                      </button>`:d}
                </div>
                ${c?this._renderLeaderboard(c):d}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(t){if(t.error)return n`<div class="lb-note">${t.error}</div>`;if(!t.data)return t.loading?n`<div class="lb-note">Loading leaderboard…</div>`:d;let e=t.data,a=(s,r=!1)=>n`
      <div class="lb-row ${r?"you":""}">
        <span class="lb-rank">#${this._num(s.rank)}</span>
        <span class="lb-names">${r?"You \xB7 ":""}${(s.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(s.points)} pts</span>
        <span class="lb-extra">${s.matches}m · ${s.wins}W · ${s.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${e.player&&!e.entries.some(s=>s.is_player)?a(e.player,!0):d}
        ${e.entries.length?e.entries.map(s=>a(s,s.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${e.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(e.updated)}${e.total_pages?` \xB7 ${e.total_pages} pages`:""}</div>`:d}
      </div>
    `}};x([V({attribute:!1})],$.prototype,"hass",2),x([w()],$.prototype,"_config",2),x([w()],$.prototype,"_view",2),x([w()],$.prototype,"_window",2),x([w()],$.prototype,"_selectedMode",2),x([w()],$.prototype,"_loadingAction",2),x([w()],$.prototype,"_catalog",2),x([w()],$.prototype,"_avatar",2),x([w()],$.prototype,"_events",2),x([w()],$.prototype,"_filters",2),x([w()],$.prototype,"_expandedEvent",2),x([w()],$.prototype,"_expandedMatch",2),x([w()],$.prototype,"_leaderboards",2),x([w()],$.prototype,"_now",2),x([w()],$.prototype,"_matchLists",2),x([w()],$.prototype,"_showAllMatches",2),x([w()],$.prototype,"_expandedSprite",2),x([w()],$.prototype,"_spriteFilter",2),x([w()],$.prototype,"_spriteSort",2),x([w()],$.prototype,"_trends",2),x([w()],$.prototype,"_pass",2),x([w()],$.prototype,"_passSet",2),x([w()],$.prototype,"_passPage",2),x([w()],$.prototype,"_outfits",2),x([w()],$.prototype,"_outfitQuery",2),x([w()],$.prototype,"_outfitSort",2),x([w()],$.prototype,"_outfitPage",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",$);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${ye} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{$ as FortniteActivityCard};
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
