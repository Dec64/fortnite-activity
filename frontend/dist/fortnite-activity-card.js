var nt=Object.defineProperty;var rt=Object.getOwnPropertyDescriptor;var y=(g,r,e,t)=>{for(var a=t>1?void 0:t?rt(r,e):r,i=g.length-1,s;i>=0;i--)(s=g[i])&&(a=(t?s(r,e,a):s(a))||a);return t&&a&&nt(r,e,a),a};var pe=globalThis,ce=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),De=new WeakMap,X=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(ce&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=De.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&De.set(e,r))}return r}toString(){return this.cssText}},Re=g=>new X(typeof g=="string"?g:g+"",void 0,xe),U=(g,...r)=>{let e=g.length===1?g[0]:r.reduce((t,a,i)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+g[i+1],g[0]);return new X(e,g,xe)},Te=(g,r)=>{if(ce)g.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),a=pe.litNonce;a!==void 0&&t.setAttribute("nonce",a),t.textContent=e.cssText,g.appendChild(t)}},ve=ce?g=>g:g=>g instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return Re(e)})(g):g;var{is:ot,defineProperty:lt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ct,getOwnPropertySymbols:dt,getPrototypeOf:ht}=Object,de=globalThis,Ne=de.trustedTypes,mt=Ne?Ne.emptyScript:"",gt=de.reactiveElementPolyfillSupport,J=(g,r)=>g,ee={toAttribute(g,r){switch(r){case Boolean:g=g?mt:null;break;case Object:case Array:g=g==null?g:JSON.stringify(g)}return g},fromAttribute(g,r){let e=g;switch(r){case Boolean:e=g!==null;break;case Number:e=g===null?null:Number(g);break;case Object:case Array:try{e=JSON.parse(g)}catch{e=null}}return e}},he=(g,r)=>!ot(g,r),Be={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Be){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),a=this.getPropertyDescriptor(r,t,e);a!==void 0&&lt(this.prototype,r,a)}}static getPropertyDescriptor(r,e,t){let{get:a,set:i}=pt(this.prototype,r)??{get(){return this[e]},set(s){this[e]=s}};return{get:a,set(s){let o=a?.call(this);i?.call(this,s),this.requestUpdate(r,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Be}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;let r=ht(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){let e=this.properties,t=[...ct(e),...dt(e)];for(let a of t)this.createProperty(a,e[a])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let a=this._$Eu(e,t);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let a of t)e.unshift(ve(a))}else r!==void 0&&e.push(ve(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),a=this.constructor._$Eu(r,t);if(a!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:ee).toAttribute(e,t.type);this._$Em=r,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(r,e){let t=this.constructor,a=t._$Eh.get(r);if(a!==void 0&&this._$Em!==a){let i=t.getPropertyOptions(a),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ee;this._$Em=a;let o=s.fromAttribute(e,i.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(r,e,t,a=!1,i){if(r!==void 0){let s=this.constructor;if(a===!1&&(i=this[r]),t??=s.getPropertyOptions(r),!((t.hasChanged??he)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(r)&&!this.hasAttribute(s._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:a,wrapped:i},s){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,s??e??this[r]),i!==!0||s!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),a===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[a,i]of t){let{wrapped:s}=i,o=this[a];s!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,i,o)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[J("elementProperties")]=new Map,B[J("finalized")]=new Map,gt?.({ReactiveElement:B}),(de.reactiveElementVersions??=[]).push("2.1.2");var ze=globalThis,Oe=g=>g,me=ze.trustedTypes,je=me?me.createPolicy("lit-html",{createHTML:g=>g}):void 0,Ke="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,qe="?"+O,ut=`<${qe}>`,H=document,ae=()=>H.createComment(""),ie=g=>g===null||typeof g!="object"&&typeof g!="function",Me=Array.isArray,bt=g=>Me(g)||typeof g?.[Symbol.iterator]=="function",_e=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ue=/-->/g,Ie=/>/g,I=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,He=/"/g,Ze=/^(?:script|style|textarea|title)$/i,Ee=g=>(r,...e)=>({_$litType$:g,strings:r,values:e}),n=Ee(1),D=Ee(2),Rt=Ee(3),W=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),We=new WeakMap,V=H.createTreeWalker(H,129);function Ge(g,r){if(!Me(g)||!g.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(r):r}var ft=(g,r)=>{let e=g.length-1,t=[],a,i=r===2?"<svg>":r===3?"<math>":"",s=te;for(let o=0;o<e;o++){let l=g[o],h,m,d=-1,f=0;for(;f<l.length&&(s.lastIndex=f,m=s.exec(l),m!==null);)f=s.lastIndex,s===te?m[1]==="!--"?s=Ue:m[1]!==void 0?s=Ie:m[2]!==void 0?(Ze.test(m[2])&&(a=RegExp("</"+m[2],"g")),s=I):m[3]!==void 0&&(s=I):s===I?m[0]===">"?(s=a??te,d=-1):m[1]===void 0?d=-2:(d=s.lastIndex-m[2].length,h=m[1],s=m[3]===void 0?I:m[3]==='"'?He:Ve):s===He||s===Ve?s=I:s===Ue||s===Ie?s=te:(s=I,a=void 0);let x=s===I&&g[o+1].startsWith("/>")?" ":"";i+=s===te?l+ut:d>=0?(t.push(h),l.slice(0,d)+Ke+l.slice(d)+O+x):l+O+(d===-2?o:x)}return[Ge(g,i+(g[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},se=class g{constructor({strings:r,_$litType$:e},t){let a;this.parts=[];let i=0,s=0,o=r.length-1,l=this.parts,[h,m]=ft(r,e);if(this.el=g.createElement(h,t),V.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(a=V.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let d of a.getAttributeNames())if(d.endsWith(Ke)){let f=m[s++],x=a.getAttribute(d).split(O),S=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:S[2],strings:x,ctor:S[1]==="."?we:S[1]==="?"?$e:S[1]==="@"?ke:Z}),a.removeAttribute(d)}else d.startsWith(O)&&(l.push({type:6,index:i}),a.removeAttribute(d));if(Ze.test(a.tagName)){let d=a.textContent.split(O),f=d.length-1;if(f>0){a.textContent=me?me.emptyScript:"";for(let x=0;x<f;x++)a.append(d[x],ae()),V.nextNode(),l.push({type:2,index:++i});a.append(d[f],ae())}}}else if(a.nodeType===8)if(a.data===qe)l.push({type:2,index:i});else{let d=-1;for(;(d=a.data.indexOf(O,d+1))!==-1;)l.push({type:7,index:i}),d+=O.length-1}i++}}static createElement(r,e){let t=H.createElement("template");return t.innerHTML=r,t}};function q(g,r,e=g,t){if(r===W)return r;let a=t!==void 0?e._$Co?.[t]:e._$Cl,i=ie(r)?void 0:r._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(g),a._$AT(g,e,t)),t!==void 0?(e._$Co??=[])[t]=a:e._$Cl=a),a!==void 0&&(r=q(g,a._$AS(g,r.values),a,t)),r}var ye=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,a=(r?.creationScope??H).importNode(e,!0);V.currentNode=a;let i=V.nextNode(),s=0,o=0,l=t[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new ne(i,i.nextSibling,this,r):l.type===1?h=new l.ctor(i,l.name,l.strings,this,r):l.type===6&&(h=new Se(i,this,r)),this._$AV.push(h),l=t[++o]}s!==l?.index&&(i=V.nextNode(),s++)}return V.currentNode=H,a}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},ne=class g{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=q(this,r,e),ie(r)?r===p||r==null||r===""?(this._$AH!==p&&this._$AR(),this._$AH=p):r!==this._$AH&&r!==W&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):bt(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==p&&ie(this._$AH)?this._$AA.nextSibling.data=r:this.T(H.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,a=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=se.createElement(Ge(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===a)this._$AH.p(e);else{let i=new ye(a,this),s=i.u(this.options);i.p(e),this.T(s),this._$AH=i}}_$AC(r){let e=We.get(r.strings);return e===void 0&&We.set(r.strings,e=new se(r)),e}k(r){Me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,a=0;for(let i of r)a===e.length?e.push(t=new g(this.O(ae()),this.O(ae()),this,this.options)):t=e[a],t._$AI(i),a++;a<e.length&&(this._$AR(t&&t._$AB.nextSibling,a),e.length=a)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Oe(r).nextSibling;Oe(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,a,i){this.type=1,this._$AH=p,this._$AN=void 0,this.element=r,this.name=e,this._$AM=a,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(r,e=this,t,a){let i=this.strings,s=!1;if(i===void 0)r=q(this,r,e,0),s=!ie(r)||r!==this._$AH&&r!==W,s&&(this._$AH=r);else{let o=r,l,h;for(r=i[0],l=0;l<i.length-1;l++)h=q(this,o[t+l],e,l),h===W&&(h=this._$AH[l]),s||=!ie(h)||h!==this._$AH[l],h===p?r=p:r!==p&&(r+=(h??"")+i[l+1]),this._$AH[l]=h}s&&!a&&this.j(r)}j(r){r===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},we=class extends Z{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===p?void 0:r}},$e=class extends Z{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==p)}},ke=class extends Z{constructor(r,e,t,a,i){super(r,e,t,a,i),this.type=5}_$AI(r,e=this){if((r=q(this,r,e,0)??p)===W)return;let t=this._$AH,a=r===p&&t!==p||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==p&&(t===p||a);a&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Se=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){q(this,r)}};var xt=ze.litHtmlPolyfillSupport;xt?.(se,ne),(ze.litHtmlVersions??=[]).push("3.3.3");var Ye=(g,r,e)=>{let t=e?.renderBefore??r,a=t._$litPart$;if(a===void 0){let i=e?.renderBefore??null;t._$litPart$=a=new ne(r.insertBefore(ae(),i),i,void 0,e??{})}return a._$AI(g),a};var Ce=globalThis,R=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Ye(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};R._$litElement$=!0,R.finalized=!0,Ce.litElementHydrateSupport?.({LitElement:R});var vt=Ce.litElementPolyfillSupport;vt?.({LitElement:R});(Ce.litElementVersions??=[]).push("4.2.2");var _t={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:he},yt=(g=_t,r,e)=>{let{kind:t,metadata:a}=e,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),t==="setter"&&((g=Object.create(g)).wrapped=!0),i.set(e.name,g),t==="accessor"){let{name:s}=e;return{set(o){let l=r.get.call(this);r.set.call(this,o),this.requestUpdate(s,l,g,!0,o)},init(o){return o!==void 0&&this.C(s,void 0,g,o),o}}}if(t==="setter"){let{name:s}=e;return function(o){let l=this[s];r.call(this,o),this.requestUpdate(s,l,g,!0,o)}}throw Error("Unsupported decorator location: "+t)};function j(g){return(r,e)=>typeof e=="object"?yt(g,r,e):((t,a,i)=>{let s=a.hasOwnProperty(i);return a.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(a,i):void 0})(g,r,e)}function w(g){return j({...g,state:!0,attribute:!1})}var Qe=U`
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

  /* ---- Map (v1.15): real-size rendering, floating controls, true full screen ---- */
  ha-card.map-full { container-type: normal; }
  .mapx { display: grid; gap: 10px; container-type: inline-size; }
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
    z-index: 30;
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
    -webkit-user-select: none;
  }
  .mapx-frame.dragging { cursor: grabbing; }
  .mapx-frame.tool-draw, .mapx-frame.tool-marker { cursor: crosshair; }
  .mapx-frame.tool-erase { cursor: cell; }
  .mapx-frame.fs, .mapx-frame:fullscreen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    aspect-ratio: auto;
    border-radius: 0;
    z-index: 9999;
  }
  .mapx-img { position: absolute; max-width: none; pointer-events: none; image-rendering: auto; }
  .mapx-ink { position: absolute; inset: 0; pointer-events: none; overflow: visible; }
  .mapx-ink .gl { stroke: rgba(255, 255, 255, 0.35); stroke-width: 1; }
  .mapx-ink .ln { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6)); }
  .mapx-ink .ln.live { stroke-dasharray: 1 0; opacity: 0.85; }
  .mapx-gridlabel { position: absolute; transform: translate(-50%, 0); font-size: 11px; font-weight: 900; color: #fff; text-shadow: 0 1px 2px #000, 0 0 3px #000; pointer-events: none; }
  .mapx-gridlabel.row { transform: translate(0, -50%); }

  .mapx-pin {
    position: absolute;
    transform: translate(-50%, -5px);
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
    font-size: 11px;
    font-weight: 800;
    line-height: 1.25;
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(10, 15, 25, 0.85);
    color: #fff;
    white-space: nowrap;
  }
  .mapx-pin.landmark b { font-weight: 600; color: #FDE68A; font-size: 10px; }
  .mapx-pin.on { z-index: 4; }
  .mapx-pin.on i { width: 14px; height: 14px; background: var(--accent); box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7), 0 0 12px var(--accent); }
  .mapx-pin.on b { background: #fff; color: #0b0f19; font-size: 12px; }

  .mapx-mark {
    position: absolute;
    transform: translate(-50%, -100%);
    font-size: 24px;
    line-height: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.7));
    z-index: 3;
  }
  .mapx-mark::after { content: ""; position: absolute; left: 50%; bottom: -3px; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--c); box-shadow: 0 0 0 2px #fff; }
  .mapx-frame.tool-erase .mapx-mark { cursor: pointer; }

  .mapx-drop { position: absolute; transform: translate(-50%, -50%); z-index: 5; pointer-events: none; display: grid; place-items: center; }
  .mapx-drop i { position: absolute; width: 60px; height: 60px; border-radius: 50%; border: 3px solid #FACC15; animation: mapx-ring 1.6s ease-out infinite; }
  .mapx-drop i + i { animation-delay: 0.8s; }
  .mapx-drop span { font-size: 40px; transform: translateY(-34px); animation: mapx-float 1.4s ease-in-out infinite; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.6)); }
  .mapx-drop b { position: absolute; top: 30px; font-size: 12px; font-weight: 900; padding: 2px 10px; border-radius: 999px; background: #FACC15; color: #0b0f19; white-space: nowrap; }
  @keyframes mapx-ring { from { transform: scale(0.3); opacity: 1; } to { transform: scale(1.6); opacity: 0; } }
  @keyframes mapx-float { 50% { transform: translateY(-42px); } }

  .mapx-ui { position: absolute; z-index: 10; }
  .mapx-tools, .mapx-zoombar, .mapx-drawbar {
    display: flex;
    gap: 4px;
    padding: 4px;
    border-radius: 12px;
    background: rgba(10, 15, 25, 0.78);
    backdrop-filter: blur(6px);
  }
  .mapx-tools { top: 8px; right: 8px; flex-direction: column; }
  .mapx-zoombar { right: 8px; bottom: 8px; flex-direction: column; align-items: center; }
  .mapx-zoomval { font-size: 10px; font-weight: 800; color: #fff; opacity: 0.85; }
  .mapx-drawbar { left: 50%; top: 8px; transform: translateX(-50%); flex-wrap: wrap; justify-content: center; max-width: calc(100% - 70px); align-items: center; }
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
  .mapx-sep.v { width: 1px; height: 22px; margin: 0 2px; }
  .mapx-swatch { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.4); background: var(--c); cursor: pointer; padding: 0; }
  .mapx-swatch.on { border-color: #fff; box-shadow: 0 0 0 2px var(--c); }
  .mapx-emoji { width: 30px; height: 30px; border: none; border-radius: 8px; background: transparent; font-size: 18px; cursor: pointer; padding: 0; }
  .mapx-emoji.on { background: rgba(255, 255, 255, 0.2); }

  /* Full screen: floating search + pickers top-left, place card bottom-left */
  .mapx-float-top { top: 10px; left: 10px; width: min(340px, calc(100% - 80px)); display: grid; gap: 6px; }
  .mapx-float-top .mapx-current, .mapx-float-top .mapx-search, .mapx-float-top .mapx-select { background: rgba(10, 15, 25, 0.88); backdrop-filter: blur(6px); }
  .mapx-info.floating { left: 10px; bottom: 10px; width: min(340px, calc(100% - 80px)); }

  .mapx-side { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .mapx-search { display: flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(0, 0, 0, 0.2); }
  .mapx-search ha-icon { --mdc-icon-size: 18px; opacity: 0.7; }
  .mapx-search input { flex: 1; min-width: 0; border: none; background: transparent; color: inherit; font: inherit; font-size: 13px; outline: none; }
  .mapx-selects { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 6px; }
  .mapx-select { display: flex; align-items: center; gap: 6px; padding: 0 10px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(0, 0, 0, 0.2); }
  .mapx-select ha-icon { --mdc-icon-size: 18px; color: var(--accent); }
  .mapx-select.landmark ha-icon { color: #FCD34D; }
  .mapx-select select { flex: 1; min-width: 0; padding: 8px 0; border: none; background: transparent; color: inherit; font: inherit; font-size: 13px; font-weight: 700; outline: none; cursor: pointer; }
  .mapx-select option { color: #111; }
  .mapx-hint { font-size: 12px; opacity: 0.6; padding: 4px 2px; }
  .mapx-info { display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px; background: rgba(10, 15, 25, 0.88); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
  .mapx-info-head { display: flex; align-items: center; gap: 8px; }
  .mapx-info-head > div { flex: 1; min-width: 0; display: grid; }
  .mapx-info b { font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-info small { font-size: 11px; opacity: 0.75; }
  .mapx-facts { display: flex; flex-wrap: wrap; gap: 6px 12px; font-size: 12px; opacity: 0.9; }
  .mapx-facts span { display: inline-flex; align-items: center; gap: 4px; }
  .mapx-facts ha-icon { --mdc-icon-size: 15px; opacity: 0.7; }
  .mapx-near { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
  .mapx-near small { margin-right: 2px; }
  .mapx-near button { font: inherit; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.06); color: inherit; cursor: pointer; }
  .mapx-near em { font-style: normal; opacity: 0.6; margin-left: 2px; }
  .mapx-info-actions { display: flex; flex-wrap: wrap; gap: 6px; }
  .mapx-info-actions .mini-button { display: inline-flex; align-items: center; gap: 4px; color: #fff; border-color: rgba(255, 255, 255, 0.25); }
  .mapx-info-actions ha-icon { --mdc-icon-size: 14px; }
  .mapx-grid-badge {
    flex: 0 0 auto;
    min-width: 30px;
    text-align: center;
    font-size: 11px;
    font-weight: 900;
    padding: 2px 6px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.14);
    font-variant-numeric: tabular-nums;
  }
  @container (min-width: 760px) {
    .mapx { grid-template-columns: minmax(0, 1.6fr) minmax(240px, 1fr); align-items: start; }
    .mapx-top { grid-column: 1 / -1; }
  }
  ha-card.kid .mapx-pin b { font-size: 13px; }
  ha-card.kid .mapx-tool { width: 42px; height: 42px; }

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

  /* ---- v1.15: header actions, sprite sheet, shop pages, news, images ---- */
  .header-right { display: flex; align-items: center; gap: 6px; }
  .header-actions { display: flex; gap: 4px; }
  .hdr-btn {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    cursor: pointer;
  }
  .hdr-btn:hover { border-color: var(--accent); color: var(--accent); }
  .hdr-btn.stop { border-color: #F87171; color: #F87171; }
  .hdr-btn[disabled] { opacity: 0.5; cursor: default; }
  .hdr-btn ha-icon { --mdc-icon-size: 18px; }
  ha-card.compact .hdr-btn { width: 28px; height: 28px; }

  .sp-newdot { position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border-radius: 50%; background: #34D399; box-shadow: 0 0 0 2px var(--card-background-color, #1c2230), 0 0 8px #34D399; }
  .sp-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
  .sp-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3); }
  .sp-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  dialog.sp-sheet {
    width: min(560px, calc(100vw - 24px));
    max-height: min(86vh, 900px);
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--rarity) 50%, rgba(255, 255, 255, 0.1));
    border-radius: 20px;
    background: var(--card-background-color, #1c2230);
    color: var(--primary-text-color, #fff);
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  }
  dialog.sp-sheet[open] { animation: sheet-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1); }
  dialog.sp-sheet::backdrop { background: rgba(0, 0, 0, 0.55); backdrop-filter: blur(3px); animation: fade-in 0.2s ease; }
  @keyframes sheet-in { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: none; } }
  @keyframes fade-in { from { opacity: 0; } }
  .sp-sheet-body { max-height: min(86vh, 900px); overflow-y: auto; padding: 12px; }
  .sp-sheet-nav { position: sticky; top: -12px; z-index: 2; display: flex; align-items: center; gap: 6px; margin: -12px -12px 8px; padding: 10px 12px; background: var(--card-background-color, #1c2230); border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; font-weight: 700; }
  .sp-sheet-nav span { flex: 1; text-align: center; opacity: 0.75; }
  .sp-sheet-nav .close { margin-left: 4px; }
  dialog.sp-sheet .sp-detail { margin: 0; }
  @media (max-width: 600px) {
    dialog.sp-sheet { width: 100vw; max-width: 100vw; margin: auto 0 0; border-radius: 20px 20px 0 0; max-height: 88vh; }
    dialog.sp-sheet[open] { animation: sheet-up 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
    @keyframes sheet-up { from { transform: translateY(100%); } to { transform: none; } }
  }

  .shop-controls { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 8px; margin-bottom: 10px; }
  .shop-refresh { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; opacity: 0.75; white-space: nowrap; }
  .shop-refresh ha-icon { --mdc-icon-size: 14px; }
  .shop-kinds { margin-bottom: 10px; }
  .shop-nav { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 6px; margin-bottom: 4px; }
  .shop-section-select select { font-size: 14px; }
  .shop-section-meta { font-size: 11px; opacity: 0.65; margin: 2px 2px 8px; }
  .shop-price.varies { color: #FDE68A; font-size: 11px; }
  .shop-price.varies s { color: inherit; opacity: 0.7; }
  .shop-tag { font-size: 10px; font-weight: 700; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .shop-tag.new { color: #6EE7B7; opacity: 1; }
  .shop-tag.back { color: #93C5FD; opacity: 1; }

  .whats-new { display: grid; gap: 6px; padding: 10px 12px; margin-bottom: 10px; border-radius: 14px; border: 1px solid rgba(52, 211, 153, 0.4); background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(59, 130, 246, 0.12)); }
  .wn-head { display: flex; align-items: center; gap: 8px; font-size: 14px; }
  .wn-row { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 4px 6px; border-radius: 10px; cursor: pointer; }
  .wn-row:hover { background: rgba(255, 255, 255, 0.06); }
  .wn-icons { display: flex; }
  .wn-icons img { width: 28px; height: 28px; object-fit: contain; margin-right: -6px; }
  .wn-emoji { font-size: 18px; width: 28px; text-align: center; }
  .news-meta { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.8; margin: 4px 2px 6px; }
  .news-meta .muted { text-transform: none; letter-spacing: 0; font-weight: 600; }

  /* Images: fade in once decoded, shimmer while loading, skip off-screen tile work */
  img.fi { opacity: 0; transition: opacity 0.3s ease; }
  img.fi.ld { opacity: 1; }
  :is(.shop-img, .bp-reward-img, .sp-img, .bp-hero-img, .locker-hero-img):has(> img.fi:not(.ld))::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.09) 50%, transparent 70%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
    pointer-events: none;
  }
  .sp-img, .bp-hero-img, .locker-hero-img { position: relative; }
  @keyframes shimmer { from { background-position: 150% 0; } to { background-position: -50% 0; } }
  .shop-tile, .locker-grid .bp-reward { content-visibility: auto; contain-intrinsic-size: auto 170px; }
`;var Ae=[{value:"session",label:"Live / Last Session"},{value:"stats",label:"Stats & Ranks"},{value:"events",label:"Events (tournaments)"},{value:"sprites",label:"Sprites"},{value:"trends",label:"Trends"},{value:"pass",label:"Battle Pass"},{value:"locker",label:"Locker (owned outfits)"},{value:"shop",label:"Item Shop & wishlist"},{value:"news",label:"News & updates"},{value:"map",label:"Map"}],wt=g=>g.layout==="session_only"?["session"]:g.layout==="career_only"?["stats"]:g.layout==="events_only"?["events"]:Ae.map(r=>r.value).filter(r=>r!=="events"||g.show_tournaments!==!1),$t=[{name:"player",label:"Tracked Player Key (e.g. player1, player2)",selector:{text:{}}},{name:"avatar",label:"Avatar skin name (optional; overrides the avatar chosen in the Locker section)",selector:{text:{}}},{name:"sections",label:"Sections to show (tab order follows this list; drag to reorder)",selector:{select:{multiple:!0,reorder:!0,mode:"list",options:Ae}}},{name:"default_section",label:"Section opened first",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatic (Live Session while playing, otherwise Stats)"},...Ae]}}},{name:"header",label:"Header",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full (ranks, season, levels, platforms)"},{value:"slim",label:"Slim (name, V-Bucks, live status)"},{value:"none",label:"None"}]}}},{name:"card_style",label:"Visual Theme",selector:{select:{options:[{value:"bubble",label:"Bubble (follows your HA / Bubble Card theme)"},{value:"cyber_fortnite",label:"Cyber Fortnite (neon gradients)"},{value:"minimal",label:"Minimal (flat, no chrome)"}]}}},{name:"theme_accent",label:"Accent Tint",selector:{select:{options:[{value:"auto",label:"Inherit Theme Accent (--bubble-accent-color)"},{value:"victory_gold",label:"Victory Gold (#FFD700)"},{value:"slurp_cyan",label:"Slurp Cyan (#00E5FF)"},{value:"storm_purple",label:"Storm Purple (#A855F7)"}]}}},{name:"show_match_feed",label:"Show Match-by-Match Timeline",selector:{boolean:{}}},{name:"show_sub_buttons",label:"Show action buttons (Start/End Session, Refresh)",selector:{boolean:{}}},{name:"compact",label:"Compact mode (smaller buttons, inline stats)",selector:{boolean:{}}},{name:"events_region",label:"Default events region filter",selector:{select:{options:[{value:"EU",label:"Europe"},{value:"NA",label:"North America"},{value:"BR",label:"Brazil"},{value:"ASIA",label:"Asia"},{value:"OCE",label:"Oceania"},{value:"ME",label:"Middle East"},{value:"all",label:"All regions"}]}}},{name:"hide_vbucks",label:"Hide V-Bucks balance (e.g. on a shared/family screen)",selector:{boolean:{}}},{name:"kid_mode",label:"Kid mode (bigger, simpler layout)",selector:{boolean:{}}},{name:"max_feed_matches",label:"Max Matches in Session Feed",selector:{number:{min:3,max:20,mode:"slider"}}},{name:"hide_account_level",label:"Hide Account Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_season_level",label:"Hide Season Level (shown only once an Epic login is available)",selector:{boolean:{}}},{name:"hide_rank_progress",label:"Hide Rank Progress Bars",selector:{boolean:{}}},{name:"custom_background",label:"Custom Background Image URL",selector:{text:{}}}],re=class extends R{setConfig(r){this._config={player:"player1",header:"full",default_section:"auto",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,max_feed_matches:10,...r},(!Array.isArray(this._config.sections)||!this._config.sections.length)&&(this._config.sections=wt(this._config))}_valueChanged(r){if(!this._config||!this.hass)return;let e=r.target,t=r.detail?r.detail.value:e.value;this._config={...this._config,...t},delete this._config.layout,delete this._config.show_tournaments;let a=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(a)}render(){return!this.hass||!this._config?p:n`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${$t}
          .computeLabel=${r=>r.label||r.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `}static{this.styles=U`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `}};y([j({attribute:!1})],re.prototype,"hass",2),y([w()],re.prototype,"_config",2);customElements.get("fortnite-activity-card-editor")||customElements.define("fortnite-activity-card-editor",re);var Xe=[{sections:["session","stats","trends"],header:"full"},{sections:["pass","sprites","locker"],header:"none",default_section:"pass"},{sections:["events","shop","news","map"],header:"none",default_section:"events"}],G=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-family-panel"};this._index=0;this._cards=[]}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...e},this._cards=[]}getCardSize(){return 12}static getStubConfig(){return{type:"custom:fortnite-family-panel",players:["player1"]}}get _players(){let e=(this._config.players||[]).map(t=>String(t).toLowerCase()).filter(Boolean);return e.length?e:["player1"]}_kid(e){let t=this._config.kid_mode;return Array.isArray(t)?t.map(a=>String(a).toLowerCase()).includes(e):!!t}_buildCards(){let e=this._config.columns?.length?this._config.columns:Xe;this._cards=[];for(let t of this._players)for(let a of e){let i=document.createElement("fortnite-activity-card");i.setConfig({type:"custom:fortnite-activity-card",player:t,sections:a.sections,header:a.header||"none",default_section:a.default_section||"auto",show_sub_buttons:a.sections.includes("session"),compact:this._config.compact??!1,card_style:this._config.card_style||"bubble",kid_mode:this._kid(t)}),i.dataset.player=t,this._cards.push(i)}}updated(e){(e.has("_config")||!this._cards.length)&&(this._buildCards(),this.requestUpdate());for(let t of this._cards)t.hass=this.hass}_displayName(e){return Object.values(this.hass?.states||{}).find(a=>a.attributes?.fortnite_player_id===e&&a.attributes?.fortnite_entity_key==="profile")?.attributes?.display_name||e.charAt(0).toUpperCase()+e.slice(1)}_scrollTo(e){let t=this.shadowRoot?.querySelector(".track");t&&(t.scrollTo({left:e*t.clientWidth,behavior:"smooth"}),this._index=e)}_onScroll(e){let t=e.target,a=Math.round(t.scrollLeft/Math.max(1,t.clientWidth));a!==this._index&&(this._index=a)}render(){if(!this.hass)return p;let e=(this._config.columns?.length?this._config.columns:Xe).length,t=this._players;return n`
      <div class="panel" style="--panel-height:${this._config.height||"calc(100vh - var(--header-height, 56px) - 16px)"}">
        ${t.length>1?n`<div class="nav">
              ${t.map((a,i)=>n`<button class=${i===this._index?"on":""} @click=${()=>this._scrollTo(i)}>${this._displayName(a)}</button>`)}
            </div>`:p}
        <div class="track" @scroll=${this._onScroll}>
          ${t.map(a=>n`
            <section class="page" style="--cols:${e}">
              ${this._cards.filter(i=>i.dataset.player===a).map(i=>n`<div class="col">${i}</div>`)}
            </section>`)}
        </div>
      </div>
    `}static{this.styles=U`
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
  `}};y([j({attribute:!1})],G.prototype,"hass",2),y([w()],G.prototype,"_config",2),y([w()],G.prototype,"_index",2);customElements.get("fortnite-family-panel")||(customElements.define("fortnite-family-panel",G),window.customCards=window.customCards||[],window.customCards.push({type:"fortnite-family-panel",name:"Fortnite Family Panel",description:"Full-screen landscape page per player; swipe between players."}));var kt="1.15.2";window.customCards=window.customCards||[];window.customCards.push({type:"fortnite-activity-card",name:"Fortnite Activity Card",description:"Fortnite player profile, live session tracker, time-windowed stats and tournaments.",preview:!1,documentationURL:"https://github.com/Dec64/fortnite-activity"});var St={current_session:["session"],rank_battle_royale:["battle_royale_rank"],rank_reload:["reload_rank"]},Y={Bronze:["#E0A06A","#8A5429"],Silver:["#E8EDF2","#8C99A6"],Gold:["#FFE27A","#C99A12"],Platinum:["#8FF3FF","#1C9DB5"],Diamond:["#9CC2FF","#2F5FD0"],Elite:["#D9B4FF","#7B35C9"],Champion:["#FFC76B","#D9530F"],Unreal:["#FF9BD2","#7B2FF7"]},T={Common:"#9CA3AF",Uncommon:"#22C55E",Rare:"#3B82F6",Epic:"#A855F7",Legendary:"#F59E0B",Mythic:"#FACC15"},zt={AthenaBattleStar:"Battle Star",AthenaCategoryStar:"Character Star",MtxCurrency:"V-Bucks"},Je=(g,r)=>{let e=g&&zt[g]||g||"";return r===1||!e?e:`${e}s`},et={FNCS:"FNCS",CashCup:"Cash Cup",RankedCup:"Ranked Cup",VictoryCup:"Victory Cup",ShopCup:"Shop Cup",WorkshopCup:"Test event"},tt=[{key:"season_kd",label:"Season K/D",digits:2},{key:"season_win_rate",label:"Season win rate",unit:"%",digits:1},{key:"ladder_battle_royale",label:"BR ranked ladder (division \xD7 100 + progress)"},{key:"unreal_reload",label:"Reload Unreal position",lowerBetter:!0},{key:"unreal_battle_royale",label:"BR Unreal position",lowerBetter:!0},{key:"ladder_reload",label:"Reload ranked ladder"},{key:"sprites",label:"Sprite collection",unit:"%",digits:1},{key:"level",label:"Season level"},{key:"power_ranking",label:"Power Ranking position",lowerBetter:!0}],Mt={reload:"mdi:reload",zero_build:"mdi:shield-outline",build:"mdi:wall"},Pe={player:"player1",header:"full",card_style:"bubble",theme_accent:"auto",show_match_feed:!0,show_sub_buttons:!0,show_tournaments:!0,compact:!1,max_feed_matches:10},at=["session","stats","events","sprites","trends","pass","locker","shop","news","map"],Et={AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaCharacter:"Outfit",AthenaMusicPack:"Lobby Music"},fe=g=>String(g?.icon||"").split("/").pop()||"",le=g=>g?.type==="Currency"&&(/MTX/i.test(fe(g))||/v-?bucks/i.test(g?.name||"")),ue=g=>g?.type==="AthenaCharacter"||/^T_Soldier_/i.test(fe(g)),be=g=>{if(ue(g))return"Outfit";if(le(g))return"V-Bucks";let r=fe(g);return g?.type==="AthenaDance"&&/Spray/i.test(r)?"Spray":g?.type==="AthenaDance"&&/Emoji|Emoticon/i.test(r)?"Emoticon":Et[g?.type]||"Cosmetic"},it=g=>g?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(g.name)?g.name:be(g),Ct=["cdn.api-fortnite.com","cdn-live.prm.ol.epicgames.com","raw.githubusercontent.com"],P=(g,r)=>{if(!g)return"";try{if(!Ct.includes(new URL(g).hostname))return g}catch{return g}return`/api/fortnite_activity/thumb?w=${r}&u=${encodeURIComponent(g)}`},A=g=>g.target.classList.add("ld"),C=g=>{g.target.hidden=!0},st=g=>new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:!0,timeZone:g}),oe={at:0},K={at:0},Le=new Map,$=class extends R{constructor(){super(...arguments);this._config={type:"custom:fortnite-activity-card",...Pe};this._view=null;this._window="lifetime";this._selectedMode="all";this._loadingAction=null;this._catalog={playlists:{}};this._avatar=null;this._events={};this._filters=null;this._expandedEvent=null;this._expandedMatch=null;this._leaderboards={};this._now=Date.now();this._matchLists={};this._showAllMatches={};this._expandedSprite=null;this._spriteFilter="all";this._spriteSort="dex";this._trends={};this._pass={};this._passSet=0;this._passPage=0;this._outfits={};this._outfitQuery="";this._outfitSort="rarity";this._outfitPage=0;this._selectedOutfit=null;this._lockerFilter="all";this._shop={};this._shopTab="today";this._shopQuery="";this._shopLimit=36;this._shopSection=0;this._shopKind="all";this._searchQuery="";this._searchType="outfit";this._searchResults=null;this._searchLoading=!1;this._news={};this._maps={};this._mapMode="br";this._mapPoi=null;this._mapZoom=1;this._mapCenter={x:.5,y:.5};this._mapBox={w:0,h:0};this._mapTool="pan";this._mapColor="#F43F5E";this._mapIcon="\u{1F4CD}";this._mapDrawing=null;this._notes={};this._undo=[];this._redo=[];this._mapAnim=0;this._mapRaf=0;this._mapPending=null;this._mapObserved=null;this._mapFull=!1;this._mapGrid=!1;this._mapLabels="auto";this._mapShowLandmarks=!0;this._mapMenu=!1;this._mapQuery="";this._mapSort="name";this._mapDrop=null;this._gesture=null;this._pointers=new Map;this._filtersOpen=!1;this._renderedView=null;this._entityCache=new Map;this._avatarQuery="";this._onFullscreenChange=()=>{!document.fullscreenElement&&this._mapFull&&(this._mapFull=!1)};this._onKeyDown=e=>{e.key==="Escape"&&this._mapFull&&this._toggleMapFull(),this._renderedView==="map"&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&(e.preventDefault(),e.shiftKey?this._redoNote():this._undoNote())}}static get styles(){return Qe}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={...Pe,...e},this._entityCache.clear(),this._filters=null}static getConfigElement(){return document.createElement("fortnite-activity-card-editor")}static getStubConfig(){return{type:"custom:fortnite-activity-card",...Pe}}getCardSize(){return this._config.compact?4:6}connectedCallback(){super.connectedCallback(),document.addEventListener("fullscreenchange",this._onFullscreenChange),document.addEventListener("keydown",this._onKeyDown),this._tick=window.setInterval(()=>{this._now=Date.now(),Date.now()-K.at>10*6e4&&this._loadEvents()},3e4)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("fullscreenchange",this._onFullscreenChange),document.removeEventListener("keydown",this._onKeyDown),window.clearInterval(this._tick)}get _player(){return(this._config.player||"player1").toLowerCase()}get _sections(){let e=this._config;if(Array.isArray(e.sections)&&e.sections.length){let t=e.sections.filter(a=>at.includes(a));if(t.length)return[...new Set(t)]}switch(e.layout){case"session_only":return["session"];case"career_only":return["stats"];case"events_only":return["events"];default:return at.filter(t=>t!=="events"||e.show_tournaments!==!1)}}get _eventsEnabled(){return this._sections.includes("events")}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let t=e.get("hass");if(!t||!this._entityCache.size)return!0;for(let a of this._entityCache.values())if(t.states[a]!==this.hass.states[a])return!0;return!1}updated(e){if(super.updated(e),!this.hass)return;let t=e.has("hass")&&!e.get("hass");t&&(this._loadCatalog(),this._eventsEnabled&&this._loadEvents()),(e.has("_config")||t)&&this._scheduleAvatar();let a=this.shadowRoot?.querySelector("dialog.sp-sheet");a&&!a.open&&a.showModal(),this._renderedView==="pass"&&(this._loadPass(),this._loadOutfits()),this._renderedView==="locker"&&this._loadOutfits(),this._renderedView==="shop"&&this._loadShop(),this._renderedView==="news"&&(this._loadNews(),this._loadShop(),this._events.list===void 0&&!this._events.loading&&!this._events.error&&this._loadEvents()),this._renderedView==="map"&&(this._loadMap("br"),this._loadMap(this._mapMode),this._observeMapFrame()),this._renderedView==="trends"&&this._loadTrends()}async _loadCatalog(){(!oe.promise||Date.now()-oe.at>36e5)&&(oe.at=Date.now(),oe.promise=this.hass.callWS({type:"fortnite_activity/catalog",player_id:this._player}).catch(()=>({playlists:{}})));let e=await oe.promise;this._catalog={season:e?.season,playlists:e?.playlists||{}}}async _loadEvents(e=!1){if(this.hass){(e||!K.promise||Date.now()-K.at>10*6e4)&&(K.at=Date.now(),K.promise=this.hass.callWS({type:"fortnite_activity/tournaments",player_id:this._player})),!this._events.list&&!this._events.loading&&(this._events={...this._events,loading:!0});try{let t=await K.promise;this._events={list:t?.tournaments??null,defaultRegion:t?.default_region_group}}catch(t){K.promise=void 0,this._events={error:t?.message||"Could not load tournaments"}}}}_scheduleAvatar(){let e=(this._config.avatar||"").trim();if(e!==this._avatarQuery){if(this._avatarQuery=e,window.clearTimeout(this._avatarTimer),e.length<3){this._avatar=null;return}this._avatarTimer=window.setTimeout(async()=>{let t=e.toLowerCase();Le.has(t)||Le.set(t,this.hass.callWS({type:"fortnite_activity/cosmetic",query:e}).then(i=>i?.cosmetic||null).catch(()=>null));let a=await Le.get(t);this._avatarQuery===e&&(this._avatar=a)},800)}}async _loadLeaderboard(e,t){let a=`${e}|${t}`;if(!this._leaderboards[a]?.loading){this._leaderboards={...this._leaderboards,[a]:{...this._leaderboards[a],loading:!0,error:void 0}};try{let i=await this.hass.callWS({type:"fortnite_activity/leaderboard",event_id:e,window_id:t,player_id:this._player});this._leaderboards={...this._leaderboards,[a]:i?.leaderboard?{data:i.leaderboard}:{error:i?.unavailable||"Leaderboard unavailable"}}}catch(i){this._leaderboards={...this._leaderboards,[a]:{error:i?.message||"Leaderboard unavailable"}}}}}async _loadOutfits(){if(!(!this.hass||this._outfits.loading||this._outfits.error||this._outfits.data!==void 0)){this._outfits={loading:!0};try{this._outfits={data:await this.hass.callWS({type:"fortnite_activity/outfits",player_id:this._player})}}catch(e){this._outfits={error:e?.message||"Locker unavailable"}}}}async _loadPass(){if(!(!this.hass||this._pass.loading||this._pass.error||this._pass.data!==void 0)){this._pass={loading:!0};try{let e=await this.hass.callWS({type:"fortnite_activity/battlepass",player_id:this._player});this._pass={data:e?.battlepass??null}}catch(e){this._pass={error:e?.message||"Battle Pass unavailable"}}}}async _loadTrends(){if(!this.hass||this._trends.loading||this._trends.at&&Date.now()-this._trends.at<6e5)return;let e=tt.map(a=>this._entityId("sensor",a.key)).filter(Boolean);if(this._ensureMatches("trend:recent",{limit:30}),!e.length){this._trends={stats:{},at:Date.now()};return}this._trends={...this._trends,loading:!0};let t=(a,i)=>this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-a*864e5).toISOString(),statistic_ids:e,period:i,types:["mean","min","max","state"]});try{let a=await t(30,"day"),i="day";Object.values(a||{}).every(s=>(s||[]).length<3)&&(a=await t(7,"hour"),i="hour"),this._trends={stats:a||{},at:Date.now(),period:i}}catch(a){this._trends={error:a?.message||"Statistics unavailable",at:Date.now()}}}_ensureMatches(e,t){!this.hass||this._matchLists[e]||(this._matchLists={...this._matchLists,[e]:{loading:!0}},this.hass.callWS({type:"fortnite_activity/matches",player_id:this._player,...t}).then(a=>{this._matchLists={...this._matchLists,[e]:{matches:a?.matches||[],tracked:a?.tracked_matches||0}}}).catch(a=>{this._matchLists={...this._matchLists,[e]:{error:a?.message||"Could not load matches"}}}))}_isRanked(e){return!!e.rank_delta_pct||!!e.unreal_rank_change||/habanero/i.test(e.playlist_id||"")}_findEntity(e,t){let a=this.hass?.states;if(!a)return;let i=this._player,s=`${i}:${e}:${t}`,o=this._entityCache.get(s);if(o&&a[o])return a[o];let l;for(let[h,m]of Object.entries(a))if(h.startsWith(`${e}.`)&&m.attributes?.fortnite_player_id===i&&m.attributes?.fortnite_entity_key===t){l=h;break}if(l||(l=[t,...St[t]||[]].flatMap(d=>[`${e}.fortnite_${i}_${d}`,`${e}.fortnite_${i}_${i}_${d}`]).find(d=>a[d])),!!l)return this._entityCache.set(s,l),a[l]}async _callService(e,t={}){if(this.hass){this._loadingAction=e;try{await this.hass.callService("fortnite_activity",e,{player_id:this._player,...t}),e==="refresh_player"&&this._eventsEnabled&&this._loadEvents(!0),setTimeout(()=>{this._loadingAction=null},1500)}catch(a){this._loadingAction=null,console.error(`Error calling service fortnite_activity.${e}:`,a)}}}_setView(e){this._view=e,e==="events"&&this._loadEvents(),e==="trends"&&this._loadTrends(),e==="pass"&&(this._loadPass(),this._loadOutfits()),e==="locker"&&this._loadOutfits(),e==="shop"&&this._loadShop(),e==="news"&&this._loadNews(),e==="map"&&this._loadMap(this._mapMode)}_entityId(e,t){return this._findEntity(e,t)?.entity_id}_toggleEvent(e){if(this._expandedEvent===e.key){this._expandedEvent=null;return}this._expandedEvent=e.key;let t=e.windows.find(a=>this._windowState(a)==="live")||[...e.windows].reverse().find(a=>this._windowState(a)==="finished");t&&!this._leaderboards[`${e.event_id}|${t.window_id}`]&&this._loadLeaderboard(e.event_id,t.window_id)}_formatRelativeTime(e){if(!e)return"";let t=new Date(e);if(isNaN(t.getTime()))return"";let a=Math.max(1,Math.round((this._now-t.getTime())/6e4));if(a<60)return`${a}m ago`;let i=Math.round(a/60);return i<24?`${i}h ago`:`${Math.round(i/24)}d ago`}_formatDuration(e){if(!e||e<=0)return"0m";let t=Math.floor(e/60),a=Math.round(e%60);return t>0?`${t}h ${a}m`:`${a}m`}_formatSpan(e){let t=Math.max(0,Math.round(e/6e4)),a=Math.floor(t/1440),i=Math.floor(t%1440/60),s=t%60;return a>0?`${a}d ${i}h`:i>0?`${i}h ${s}m`:`${s}m`}_formatWhen(e){try{return st(this.hass?.config?.time_zone).format(new Date(e)).replace(/\b(am|pm)\b/i,t=>t.toLowerCase())}catch{return st().format(new Date(e))}}_num(e,t=0){return Number(e||0).toLocaleString("en-GB",{maximumFractionDigits:t,minimumFractionDigits:0})}_playlist(e){return e?this._catalog.playlists[e.toLowerCase()]:void 0}_windowState(e){let t=Date.parse(e.begin),a=Date.parse(e.end);return this._now>=a?"finished":this._now>=t?"live":"upcoming"}_rankBadge(e,t=30){let a=e||"Unranked",i=Object.keys(Y).find(d=>a.startsWith(d));if(!i)return n`<span class="rank-badge unranked" style="width:${t}px;height:${t}px">–</span>`;let[s,o]=Y[i],l=(a.match(/\b(I{1,3})$/)||[])[1]||"",h=`g-${i}-${t}`;return n`<span class="rank-badge" title=${a} style="width:${t}px;height:${t}px">
      ${D`<svg viewBox="0 0 40 44" width=${t} height=${t} aria-hidden="true">
        <defs><linearGradient id=${h} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${s}></stop><stop offset="1" stop-color=${o}></stop>
        </linearGradient></defs>
        ${i==="Unreal"?D`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`:D`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${h})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${l}</text>`}
      </svg>`}
    </span>`}render(){if(!this.hass)return n`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;let e=this._player,t=this._findEntity("sensor","current_session"),a=this._findEntity("sensor","overall_stats"),i=this._findEntity("sensor","rank_battle_royale"),s=this._findEntity("sensor","rank_reload"),o=this._findEntity("sensor","level"),l=this._findEntity("binary_sensor","playing"),h=this._findEntity("sensor","profile"),m=this._findEntity("sensor","sprites"),d=this._findEntity("sensor","power_ranking"),f=!!m&&!["unavailable","unknown"].includes(m.state);if(!t&&!a&&!l)return n`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${e}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;let x=l?.state==="on"||t?.state==="active",S=t?.attributes||{},z=a?.attributes||{},c=h?.attributes||{},u={...i?.attributes||{},current_rank:i?.state},_={...s?.attributes||{},current_rank:s?.state},E=!!h?.attributes?.outfits?.owned_count,k=this._sections.filter(Fe=>this._sections.length===1||(Fe!=="sprites"||f)&&(Fe!=="locker"||E)),b=this._config.default_section,M=x&&k.includes("session")?"session":k.includes("stats")?"stats":k[0],v=this._view??(b&&b!=="auto"&&k.includes(b)?b:M);k.includes(v)||(v=M),this._renderedView=v;let L=this._config.header||"full",F="",N={victory_gold:"#FFD700",slurp_cyan:"#00E5FF",storm_purple:"#A855F7"};N[this._config.theme_accent||""]&&(F+=`--accent: ${N[this._config.theme_accent]};`),this._config.custom_background&&(F+=` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`);let Q=`theme-${this._config.card_style||"bubble"}${this._config.compact?" compact":""}${this._config.kid_mode?" kid":""}${this._mapFull?" map-full":""}`;return n`
      <ha-card class=${Q} style="${F}">
        ${L==="none"?p:L==="slim"?this._renderSlimHeader(e,x,S,c):this._renderHeader(e,x,S,z,c,o,u,_)}
        ${this._renderButtons(v,x,k)}
        ${v==="session"?this._renderSessionView(x,S,u):v==="events"?this._renderEventsView():v==="sprites"?this._renderSpritesView(m):v==="trends"?this._renderTrendsView():v==="pass"?this._renderPassView(o):v==="locker"?this._renderLockerView(c):v==="shop"?this._renderShopView():v==="news"?this._renderNewsView():v==="map"?this._renderMapView():this._renderStatsView(z,c,u,_,d)}
      </ha-card>
    `}_renderHeader(e,t,a,i,s,o,l,h){let m=s.display_name||e.charAt(0).toUpperCase()+e.slice(1),d=s.season||this._catalog.season,f=i.metrics?.last_played,x=o?.attributes||{},S=Number(o?.state)||0,z=Number(x.account_level||0),c=this._avatarImage(s),u=this._config.compact?20:24,_=this._findEntity("sensor","vbucks"),E=!this._config.hide_vbucks&&_&&!isNaN(Number(_.state)),k=_?.attributes?.crew;return n`
      <div class="fa-header">
        <div class="player-avatar ${c?"has-image":""}">
          ${c?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(c,128)} alt=${this._avatarName(s)} @error=${C} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${m}</h2>
            <span class="header-ranks">
              ${l.current_rank&&l.current_rank!=="Unranked"?this._rankBadge(l.current_rank,u):p}
              ${h.current_rank&&h.current_rank!=="Unranked"?this._rankBadge(h.current_rank,u):p}
            </span>
          </div>
          <div class="player-meta">
            ${d?.number?n`<span class="level-badge">S${d.number} · ${d.days_left}d left</span>`:p}
            ${!this._config.hide_season_level&&S>0?n`<span class="level-badge">Lvl ${S}</span>`:p}
            ${!this._config.hide_account_level&&z>0?n`<span>Acct ${z.toLocaleString()}</span>`:p}
            ${E?n`<span class="vbucks-chip" title=${Object.entries(_.attributes?.by_kind||{}).map(([b,M])=>`${b}: ${this._num(M)}`).join(" \xB7 ")||"V-Bucks"}>Ⓥ ${this._num(_.state)}</span>`:p}
            ${k?.active&&!this._config.hide_vbucks?n`<span class="crew-chip" title="Fortnite Crew${k.end_date?` \xB7 renews ${this._formatWhen(k.end_date)}`:""}">Crew</span>`:p}
            ${f?.time&&!t?n`<span title=${f.name||""}>Played ${this._formatRelativeTime(f.time)}</span>`:p}
          </div>
        </div>
        <div class="header-right">
          <div class="status-pill ${t?"live":"idle"}">
            ${t?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
          </div>
          ${this._renderHeaderActions(t)}
        </div>
      </div>
      ${d?.progress_pct!==void 0&&!this._config.compact?n`<div class="season-bar" title="Season ${d.number}: ${d.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100,d.progress_pct)}%"></div>
          </div>`:p}
    `}_liveEventCount(){let e=this._currentFilters();return(this._events.list||[]).filter(t=>this._matchesFilters(t,e)&&t.windows.some(a=>this._windowState(a)==="live")).length}_avatarImage(e){return(this._config.avatar||"").trim()?this._avatar?.icon:e?.outfits?.avatar?.icon||void 0}_avatarName(e){return(this._config.avatar||"").trim()?this._avatar?.name||"":e?.outfits?.avatar?.name||""}async _setFavorite(e,t){try{await this.hass.callService("fortnite_activity","set_favorite",{player_id:this._player,outfit_id:e,favorite:t});let a=(this._outfits.data?.outfits||[]).map(i=>String(i.key||i.id).toLowerCase()===e?{...i,favorite:t}:i);this._outfits={data:{...this._outfits.data||{},outfits:a}}}catch(a){console.error("Favourite update failed:",a)}finally{this._selectedOutfit=null}}async _setAvatar(e){this._loadingAction="set_avatar";try{await this.hass.callService("fortnite_activity","set_avatar",{player_id:this._player,outfit_id:e||""}),this._outfits={data:{...this._outfits.data||{},avatar_id:e}}}catch(t){console.error("Error setting Fortnite avatar:",t)}finally{this._loadingAction=null,this._selectedOutfit=null}}_renderSlimHeader(e,t,a,i){let s=i.display_name||e.charAt(0).toUpperCase()+e.slice(1),o=this._avatarImage(i),l=this._findEntity("sensor","vbucks"),h=!this._config.hide_vbucks&&l&&!isNaN(Number(l.state));return n`
      <div class="fa-header slim">
        <div class="player-avatar ${o?"has-image":""}">
          ${o?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(o,128)} alt="" @error=${C} />`:e.slice(0,2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${s}</h2>
            ${h?n`<span class="vbucks-chip">Ⓥ ${this._num(l.state)}</span>`:p}
          </div>
        </div>
        <div class="header-right">
          <div class="status-pill ${t?"live":"idle"}">
            ${t?n`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(a.duration_minutes||0)}</span>`:n`<span>IDLE</span>`}
          </div>
          ${this._renderHeaderActions(t)}
        </div>
      </div>
    `}_renderHeaderActions(e){let t=!this._config.sections?.length&&this._config.layout==="events_only";if(this._config.show_sub_buttons===!1||t)return p;let a=this._loadingAction;return n`<div class="header-actions">
      ${e?n`<button class="hdr-btn stop" title="End session" aria-label="End session" ?disabled=${a==="end_session"} @click=${()=>this._callService("end_session")}>
            <ha-icon icon="mdi:stop"></ha-icon></button>`:n`<button class="hdr-btn" title="Start session" aria-label="Start session" ?disabled=${a==="start_session"} @click=${()=>this._callService("start_session")}>
            <ha-icon icon="mdi:play"></ha-icon></button>`}
      <button class="hdr-btn" title="Refresh" aria-label="Refresh" ?disabled=${a==="refresh_player"} @click=${()=>this._callService("refresh_player")}>
        <ha-icon icon="mdi:refresh" class=${a==="refresh_player"?"spin":""}></ha-icon></button>
    </div>`}_renderButtons(e,t,a){let i=a.length>1;if(!i)return p;let s=this._eventsEnabled?this._liveEventCount():0,o=Number(this._findEntity("sensor","wishlist")?.state)||0,l={session:["mdi:lightning-bolt",t?"Live Session":"Last Session"],stats:["mdi:trophy-outline","Stats"],events:["mdi:tournament","Events",s],sprites:["mdi:ghost-outline","Sprites"],trends:["mdi:chart-line","Trends"],pass:["mdi:ticket-confirmation-outline","Pass"],locker:["mdi:hanger","Locker"],shop:["mdi:shopping-outline","Shop",o],news:["mdi:newspaper-variant-outline","News"],map:["mdi:map-outline","Map"]},h=(m,d,f,x=0)=>n`
      <button class="bubble-sub-button ${e===m?"active":""}" @click=${()=>this._setView(m)} title=${f}>
        <ha-icon icon=${d}></ha-icon><span class="btn-label">${f}</span>
        ${x>0?n`<span class="notify-badge" title="${x} live">${x}</span>`:p}
      </button>
    `;return n`
      <div class="sub-button-row">
        ${i?a.map(m=>h(m,l[m][0],l[m][1],l[m][2]||0)):p}
      </div>
    `}_renderKpis(e){if(this._config.compact){let t=[];for(let a=0;a<e.length;a+=2)t.push(e.slice(a,a+2));return n`<table class="stat-table"><tbody>
        ${t.map(a=>n`<tr>
          ${a.map(([i,s,o])=>n`<th>${i}</th><td class="kpi-value ${o||""}">${s}</td>`)}
          ${a.length<2?n`<th></th><td></td>`:p}
        </tr>`)}
      </tbody></table>`}return n`<div class="kpi-row">
      ${e.map(([t,a,i])=>n`<div class="kpi-chip"><span class="kpi-label">${t}</span><span class="kpi-value ${i||""}">${a}</span></div>`)}
    </div>`}_renderRank(e,t,a,i){let s=t.current_rank||"Unranked",o=Number(t.progress_pct||0),l=s.startsWith("Unreal");return n`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(s,this._config.compact?26:34)}<span>${e}</span></span>
          <span class="rank-name" style="color: ${(Y[Object.keys(Y).find(h=>s.startsWith(h))||""]||["var(--secondary-text-color)"])[0]}">${s}</span>
        </div>
        ${l?n`<div class="unreal-position">
              <span class="unreal-number">${t.unreal_rank?`#${this._num(t.unreal_rank)}`:"Unreal"}</span>
              ${i?n`<span class="rank-delta-badge ${i>0?"pos":"neg"}">${i>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(i))} places</span>`:p}
            </div>`:this._config.hide_rank_progress?p:n`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100,Math.max(0,o))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${l?"Unreal leaderboard position":`${o}% to promotion`}</span>
          <span>${a}</span>
        </div>
      </div>
    `}_renderSessionView(e,t,a){let i=Number(t.net_rank_delta_pct||0),s=x=>x>=0?`+${x}%`:`${x}%`,o=t.session_id,l=o?`session:${o}:${t.matches_played||0}`:"";l&&this._config.show_match_feed!==!1&&this._ensureMatches(l,{session_id:o});let m=(l?this._matchLists[l]?.matches:void 0)||t.recent_matches||[],d=m.filter(x=>this._isRanked(x)),f=d.filter(x=>x.rank_track===a.game_mode&&typeof x.unreal_rank_change=="number").reduce((x,S)=>x+(S.unreal_rank_change||0),0);return n`
      ${this._renderKpis([["Matches",t.matches_played||0,"cyan"],["Wins",`${t.wins||0} \u{1F3C6}`,"gold"],["Kills",t.kills||0],["K/D",t.kd_ratio||0],...d.length?[["Rank Net",s(i),i>=0?"positive":"negative"]]:[]])}

      ${d.length?this._renderRank("Battle Royale Ranked",a,`${i>=0?"\u25B2":"\u25BC"} ${s(i)} this session`,f||null):p}

      ${this._config.show_match_feed!==!1?n`
            <div class="match-feed-header">
              <span>Match Feed (${t.matches_played||m.length} ${(t.matches_played||m.length)===1?"match":"matches"})</span>
              ${e?n`<span class="tracking-live">Tracking Live</span>`:p}
            </div>
            ${this._renderMatchList(l||"session",m,n`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `:p}
    `}_renderMatchList(e,t,a){let i=this._config.max_feed_matches||10,s=this._showAllMatches[e],o=s?t:t.slice(0,i);return n`
      <div class="match-list">
        ${o.length?o.map(l=>this._renderMatch(l)):n`<div class="empty">${a}</div>`}
        ${t.length>i?n`<button class="mini-button show-more" @click=${()=>this._showAllMatches={...this._showAllMatches,[e]:!s}}>
              ${s?"Show fewer":`Show all ${t.length}`}
            </button>`:p}
      </div>
    `}_progressChip(e){let t=e.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(e.icon,64)} alt="" @error=${C} />`:p;switch(e.type){case"quests":return n`<span class="pchip quest">📜 ${e.count} quest${e.count>1?"s":""} done</span>`;case"level_up":return n`<span class="pchip level">⬆️ Level ${e.to}</span>`;case"sprite_new":return n`<span class="pchip sprite">${t}New sprite: ${e.name}</span>`;case"sprite_mastered":return n`<span class="pchip gold">${t}⭐ Mastered ${e.name}</span>`;case"sprite_level":return n`<span class="pchip sprite">${t}${e.name} → Lv ${e.level}</span>`;default:return p}}_renderMatch(e){let t=this._playlist(e.playlist_id),a=t?.image,i=`${e.timestamp}|${e.playlist_id}`,s=this._expandedMatch===i,o=(e.match_count||1)>1,l=this._isRanked(e),h=e.progress||[],m=s?this._matchMap(e):null,d=(f,x)=>x==null||x===""?p:n`<div class="detail"><span>${f}</span><b>${x}</b></div>`;return n`
      <div class="match-card ${e.is_victory?"victory":""} ${s?"expanded":""}"
        @click=${()=>{this._expandedMatch=s?null:i,s||(this._loadMap("br"),this._loadMatchMap(e.playlist_id))}}>
        <div class="match-row">
          ${a?n`<img @load=${A} decoding="async" class="fi match-art" src=${P(a,384)} alt="" loading="lazy" @error=${C} />`:p}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${e.match_number}${(e.match_count||1)>1?` \xD7${e.match_count}`:""}</span>
              <span class="placement-badge ${e.is_victory?"win":""}">${e.placement_text}</span>
            </div>
            <span class="match-mode">${e.mode_name} • ${this._formatRelativeTime(e.timestamp)}</span>
            ${h.length?n`<div class="progress-chips">${h.map(f=>this._progressChip(f))}</div>`:p}
          </div>
          <div class="match-right">
            <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${e.kills}</span>
            ${e.rank_delta_pct&&this._isRanked(e)?n`<span class="rank-delta-badge ${e.rank_delta_pct>=0?"pos":"neg"}">
                  ${e.rank_delta_pct>=0?`+${e.rank_delta_pct}%`:`${e.rank_delta_pct}%`}
                </span>`:p}
          </div>
          <ha-icon class="chevron" icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${s?n`<div class="match-details" @click=${f=>f.stopPropagation()}>
              ${m?n`<div class="match-map">
                    ${this._renderMapImage(m,!0)}
                    <span>🗺️ ${m.name||"Battle Royale island"}</span>
                  </div>`:a?n`<img @load=${A} decoding="async" loading="lazy" class="fi detail-art" src=${P(a,384)} alt="" @error=${C} />`:p}
              ${t?.description?n`<p class="detail-desc">${t.description}</p>`:p}
              <div class="detail-grid">
                ${d("Finished",this._formatWhen(e.timestamp))}
                ${d("Mode",e.mode_name)}
                ${d("Placement",e.placement_text)}
                ${d("Kills",e.kills)}
                ${o?d("Games",e.match_count):p}
                ${o&&e.wins?d("Victories",e.wins):p}
                ${d("Time played",e.minutes?this._formatDuration(e.minutes):void 0)}
                ${d("Score",e.score?this._num(e.score):void 0)}
                ${d("Players outlived",e.players_outlived?this._num(e.players_outlived):void 0)}
                ${l?n`
                      ${d("Ranked track",e.rank_track)}
                      ${d("Rank after",e.unreal_rank?`${e.current_rank} #${this._num(e.unreal_rank)}`:e.current_rank)}
                      ${d("Rank change",e.rank_delta_pct?`${e.rank_delta_pct>0?"+":""}${e.rank_delta_pct}%`:void 0)}
                      ${d("Unreal places",e.unreal_rank_change?`${e.unreal_rank_change>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(e.unreal_rank_change))}`:void 0)}`:p}
              </div>
              ${(e.match_count||1)>1?n`<small class="muted">Several games finished between polls; totals are combined.</small>`:p}
            </div>`:p}
      </div>
    `}_renderStatsView(e,t,a,i,s){let o=t.windows||{},l=t.window_labels||{},h=["lifetime",...["season","week","today"].filter(k=>o[k])],m=h.includes(this._window)?this._window:"lifetime",d={lifetime:"Lifetime",season:"Season",week:"7 Days",today:"Today"},f=e.metrics||{},x={matches:e.total_matches||0,kills:e.total_kills||0,wins:e.total_wins||0,kd:e.kd_ratio||0,win_rate:e.win_rate_pct||0,players_outlived:e.players_outlived||0,hours_played:f.hours_played,favourite_mode:f.favourite_mode,modes:e.modes||{}},S=m==="lifetime"?x:o[m],z=this._selectedMode!=="all"?S.modes?.[this._selectedMode]:null,c=z&&z.matches!==void 0?z:S,u=c.minutes!==void 0?Math.round(c.minutes/60*10)/10:S.hours_played,_=S.favourite_mode,E=(k,b)=>n`
      <button class="mode-tab ${this._selectedMode===k?"active":""}" @click=${()=>this._selectedMode=k}>${b}</button>
    `;return n`
      <div class="tab-rows">
        ${h.length>1?n`<div class="mode-tabs">
              ${h.map(k=>n`<button class="mode-tab ${m===k?"active":""}" title=${l[k]||""}
                  @click=${()=>this._window=k}>${d[k]}</button>`)}
            </div>`:p}
        <div class="mode-tabs">
          ${E("all","Overall")} ${E("zero_build","Zero Build")} ${E("build","Build")} ${E("reload","Reload")}
        </div>
      </div>

      ${this._renderKpis([["Win Rate",`${c.win_rate||0}%`,"cyan"],["K/D",c.kd||0],["Wins",n`${this._num(c.wins)} 🏆`,"gold"],["Matches",this._num(c.matches)],["Kills",this._num(c.kills)],["Outlived",this._num(c.players_outlived)],["Kills/Match",c.matches?this._num(c.kills/c.matches,2):0],...u!==void 0?[["Hours",this._num(u,1)]]:[]])}

      ${m==="lifetime"&&this._selectedMode==="all"?this._renderLifetimeExtras(e):p}
      ${_?this._renderFavourite(_,m!=="lifetime"?d[m]:""):p}
      ${m!=="lifetime"&&S?.since?this._renderWindowMatches(m,d[m],S):p}

      ${this._renderRank("Battle Royale",a,`Peak: ${a.highest_rank||a.current_rank||"Unranked"}`)}
      ${this._renderRank("Reload",i,`Peak: ${i.highest_rank||i.current_rank||"Unranked"}`)}
      ${this._renderOtherTracks(a)}
      ${s&&!["unavailable","unknown"].includes(s.state)?n`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(s.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(s.attributes?.points)} points${s.attributes?.counting_events!=null?` \xB7 ${s.attributes.counting_events} counting events`:""}</span>
              <span>${s.attributes?.peak_pr!=null?`Peak PR ${this._num(s.attributes.peak_pr)}`:"Competitive (tournaments)"}${s.attributes?.delta_pr?` \xB7 ${s.attributes.delta_pr>0?"\u25B2":"\u25BC"} ${this._num(Math.abs(s.attributes.delta_pr))}`:""}</span></div>
          </div>`:p}
      ${t.epic_link==="relink_required"?n`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`:p}
    `}_renderOtherTracks(e){let t=(e.all_tracks||[]).filter(a=>!["Battle Royale","Reload Build"].includes(a.game_mode)&&a.current_rank&&a.current_rank!=="Unranked");return t.length?n`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${t.map(a=>n`
        <div class="track-row">
          ${this._rankBadge(a.current_rank,22)}
          <span class="variant-name">${a.game_mode}</span>
          <span style="color:${(Y[Object.keys(Y).find(i=>a.current_rank.startsWith(i))||""]||["inherit"])[0]}">${a.current_rank}${a.unreal_rank?` #${this._num(a.unreal_rank)}`:""}</span>
          <span class="muted">${a.current_rank.startsWith("Unreal")?"":`${a.progress_pct}%`}</span>
        </div>`)}
    </div>`:p}_lineChart(e,t,a){let l=e.map(_=>_.v),h=Math.min(...l),m=Math.max(...l),d=m-h||Math.abs(m)||1,f=e[0].t,x=e[e.length-1].t||f+1,S=_=>6+(_-f)/(x-f||1)*308,z=_=>84-(_-h)/d*78,c=e.map((_,E)=>`${E?"L":"M"}${S(_.t).toFixed(1)},${z(_.v).toFixed(1)}`).join(" "),u=_=>new Date(_).toLocaleString("en-GB",a==="hour"?{day:"numeric",month:"short",hour:"numeric",hour12:!0}:{day:"numeric",month:"short"});return n`<svg class="trend-svg" viewBox="0 0 ${320} ${90}" preserveAspectRatio="none" role="img">
      ${D`<line x1="${6}" x2="${314}" y1="${84}" y2="${84}" class="trend-base"></line>
        <path d="${c}" class="trend-line"></path>
        ${e.map(_=>D`<g class="trend-pt"><circle cx="${S(_.t)}" cy="${z(_.v)}" r="7" class="trend-hit"></circle><circle cx="${S(_.t)}" cy="${z(_.v)}" r="2.5" class="trend-dot"></circle><title>${u(_.t)}: ${t(_.v)}</title></g>`)}`}
    </svg>`}_renderKillsChart(){let t=[...this._matchLists["trend:recent"]?.matches||[]].reverse();if(!t.length)return n`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;let a=320,i=100,s=4,o=Math.max(4,...t.map(h=>h.kills||0)),l=(a-2*s)/t.length;return n`<svg class="trend-svg" viewBox="0 0 ${a} ${i+12}" preserveAspectRatio="none" role="img">
      ${D`${t.map((h,m)=>{let d=Math.max(2,(h.kills||0)/o*(i-14)),f=s+m*l+1;return D`<g><rect x="${f}" y="${i-d}" width="${Math.max(2,l-2)}" height="${d}" rx="2" class="kill-bar"></rect>
          ${h.is_victory?D`<text x="${f+(l-2)/2}" y="${i-d-3}" text-anchor="middle" class="win-mark">★</text>`:p}
          <rect x="${f-1}" y="0" width="${l}" height="${i}" fill="transparent"><title>${this._formatWhen(h.timestamp)} · ${h.mode_name}: ${h.kills} kills · ${h.placement_text}</title></rect></g>`})}
      <line x1="${s}" x2="${a-s}" y1="${i}" y2="${i}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${o} kills</span></div>`}_renderTrendsView(){let e=this._trends,t=tt.map(a=>{let i=this._entityId("sensor",a.key);if(!i)return p;let s=((e.stats||{})[i]||[]).map(x=>({t:typeof x.start=="number"?x.start:Date.parse(x.start),v:x.mean??x.state??x.max})).filter(x=>typeof x.v=="number"),o=this.hass.states[i];if(!s.length&&(!o||["unavailable","unknown"].includes(o.state)))return p;let l=x=>`${this._num(x,a.digits||0)}${a.unit||""}`,h=s[0]?.v,m=s[s.length-1]?.v,d=s.length>1?m-h:null,f=d==null||d===0?"":d>0!=!!a.lowerBetter?"positive":"negative";return n`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${a.label}</span></span>
          <span class="kpi-value ${f}">${o&&!isNaN(Number(o.state))?l(Number(o.state)):"\u2014"}</span>
        </div>
        ${s.length>1?this._lineChart(s,l,e.period||"day"):n`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${s.length>1?`${d>=0?"\u25B2":"\u25BC"} ${l(Math.abs(d))} over ${s.length} ${e.period==="hour"?"hours":"days"}`:""}</span>
          <span>${a.lowerBetter?"lower is better":""}</span>
        </div>
      </div>`});return n`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${e.loading&&!e.stats?n`<div class="empty">Loading history…</div>`:p}
      ${e.error?n`<div class="empty">${e.error}</div>`:p}
      <div class="trend-grid">${t}</div>
    `}_passSets(e){let t=[],a=new Map;for(let i of e.pages||[]){let s=String(i.track||"").replace(/Bonus$/,"")||"Pass";a.has(s)||(a.set(s,[]),t.push(s)),a.get(s).push(i)}return t.map((i,s)=>{let o=a.get(i),l=o.flatMap(_=>_.rewards||[]),h=l.find(ue)||null,m=h?.icon||l.find(_=>_.icon&&!le(_)&&_.type!=="HomebaseBannerIcon")?.icon||null,d={},f={},x=new Map,S=0;for(let _ of o){let E=/Bonus$/.test(_.track||"");for(let k of _.rewards||[]){if(typeof k.cost=="number"&&k.cost>0&&k.price_row!=="Included"){let M=E?f:d;M[k.currency||""]=(M[k.currency||""]||0)+k.cost}le(k)&&(S+=Number(k.quantity)||0);let b=be(k);b!=="V-Bucks"&&x.set(b,(x.get(b)||0)+1)}}let z=l.filter(_=>_.owned===!0||_.owned===!1),c=z.filter(_=>_.owned===!0).length,u=l.filter(_=>_.type!=="Currency").length;return{key:i,unlocked:c,known:z.length,complete:z.length>0&&z.length===u&&c===z.length,title:h?.name&&!/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(h.name)?h.name:`Set ${s+1}`,outfit:h,hero:m,pages:o.map(_=>{let E=/Bonus$/.test(_.track||""),k=_.rewards||[],b=k.filter(v=>v.owned===!0||v.owned===!1),M=b.length>0&&b.length===k.filter(v=>v.type!=="Currency").length&&b.every(v=>v.owned);return{label:`${E?"Bonus":"Page"} ${_.page}`,bonus:E,rewards:k,done:M}}),rewardCount:l.length,baseCost:d,bonusCost:f,vbucks:S,types:[...x.entries()].sort((_,E)=>E[1]-_[1])}})}_costText(e){return Object.entries(e).map(([t,a])=>`${this._num(a)} ${Je(t,a)}`).join(" + ")}_passCostBadge(e){if(e.price_row==="Included"||e.cost===0)return n`<span class="bp-cost included" title="Included with the pass">Included</span>`;if(typeof e.cost!="number")return p;let t=e.currency==="AthenaCategoryStar";return n`<span class="bp-cost ${t?"character":""}" title="${e.cost} ${Je(e.currency,e.cost)}">
      <ha-icon icon=${t?"mdi:account-star":"mdi:star"}></ha-icon>${e.cost}</span>`}_goPassSet(e,t){this._passSet=(e+t)%t,this._passPage=0}_withOwnedOutfits(e){let t=new Set((this._outfits.data?.outfits||[]).map(o=>String(o.id||"").toLowerCase()));if(!t.size||e.known==null)return e;let a=e.unlocked||0,i=e.known||0,s=(e.pages||[]).map(o=>({...o,rewards:(o.rewards||[]).map(l=>{if(l.owned!=null||!ue(l))return l;let h=/^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(fe(l));return!h||!t.has(`character_${h[1].toLowerCase()}`)?l:(a+=1,i+=1,{...l,owned:!0})})}));return{...e,pages:s,unlocked:a,known:i}}_renderPassView(e){let t=this._pass;if(t.loading||t.data===void 0&&!t.error)return n`<div class="empty">Loading Battle Pass…</div>`;if(t.error)return n`<div class="empty">${t.error}</div>`;if(!t.data||!t.data.pages?.length)return n`<div class="empty">The Battle Pass will show here soon.</div>`;let a=this._withOwnedOutfits(t.data),i=this._passSets(a),s=Math.min(this._passSet,i.length-1),o=i[s],l=Math.min(this._passPage,o.pages.length-1),h=o.pages[l],m=this._findEntity("sensor","profile")?.attributes?.season||this._catalog.season,d=Number(e?.state)||null,f=i.reduce((c,u)=>c+u.vbucks,0),x=i.filter(c=>c.outfit).length,S={};for(let c of i)for(let[u,_]of Object.entries(c.baseCost))S[u]=(S[u]||0)+_;let z=(c,u)=>u>1&&!/s$/.test(c)?`${c}s`:c;return n`
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
            <div><b>${i.length}</b><span>sets</span></div>
            <div><b>${x}</b><span>outfits</span></div>
            <div><b>${a.reward_count??i.reduce((c,u)=>c+u.rewardCount,0)}</b><span>rewards</span></div>
            ${f?n`<div class="gold"><b>${this._num(f)}</b><span>V-Bucks</span></div>`:p}
            ${d?n`<div><b>${d}</b><span>level</span></div>`:p}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${i.map((c,u)=>n`
            <button class="bp-thumb ${u===s?"active":""} ${c.complete?"done":""}" role="tab" aria-selected=${u===s?"true":"false"}
              title="${c.title}${c.known?` \xB7 ${c.unlocked} of ${c.known} unlocked`:""}"
              @click=${()=>this._goPassSet(u,i.length)}>
              ${c.hero?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(c.hero,128)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
              ${c.complete?n`<span class="bp-thumb-check">✓</span>`:p}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${()=>this._goPassSet(s-1,i.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${o.hero?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(o.hero,256)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${s+1} of ${i.length}</div>
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
              <div class="bp-hero-types">${o.types.map(([c,u])=>`${u} ${z(c,u)}`).join(" \xB7 ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${()=>this._goPassSet(s+1,i.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${o.pages.length>1?n`<div class="bp-pages">
                ${o.pages.map((c,u)=>n`
                  <button class="mini-button ${u===l?"active":""} ${c.bonus?"bonus":""}" @click=${()=>this._passPage=u}>
                    ${c.done?"\u2713 ":""}${c.label}<span class="bp-page-count">${c.rewards.length}</span>
                  </button>`)}
              </div>`:p}

          <div class="bp-rewards">
            ${h.rewards.map(c=>n`
              <div class="bp-reward ${le(c)?"vbucks":""} ${ue(c)?"outfit":""} ${c.owned===!0?"unlocked":c.owned===!1?"locked":""}"
                title="${it(c)} · ${be(c)}${c.owned===!0?" \xB7 unlocked":c.owned===!1?" \xB7 locked":""}">
                <div class="bp-reward-img">
                  ${c.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(c.icon,256)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${c.owned===!0?n`<span class="bp-state unlocked">✓</span>`:c.owned===!1?n`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`:p}
                  ${c.owned===!0?p:this._passCostBadge(c)}
                </div>
                <span class="bp-reward-name">${le(c)&&c.quantity?`${this._num(c.quantity)} V-Bucks`:it(c)}</span>
                <span class="bp-reward-type">${be(c)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(S).length?n`<span>All base pages: ${this._costText(S)}</span>`:p}

        </div>
      </div>
    `}_outfitRarity(e){let t=String(e?.rarity||"");return t?t.charAt(0).toUpperCase()+t.slice(1).toLowerCase():""}_renderLockerView(e){let a=(e.outfits||{}).avatar,i=a?.id||null,s=!!(this._config.avatar||"").trim(),o=this._outfits;if(o.loading||o.data===void 0&&!o.error)return n`<div class="empty">Loading locker…</div>`;if(o.error)return n`<div class="empty">${o.error}</div>`;let l=o.data?.outfits||[];if(!l.length)return n`<div class="empty">Your outfits will show up here soon.</div>`;let h=["Mythic","Legendary","Epic","Rare","Uncommon","Common"],m=14,d=v=>!!v.first_seen&&this._now-Date.parse(v.first_seen)<m*864e5,f=l.filter(v=>v.name),x=f.filter(v=>v.favorite).length,S=f.filter(d).length,z=this._outfitQuery.trim().toLowerCase(),u=[...f.filter(v=>this._lockerFilter!=="favorites"||v.favorite).filter(v=>this._lockerFilter!=="new"||d(v)).filter(v=>!z||String(v.name).toLowerCase().includes(z)||String(v.set||"").toLowerCase().includes(z))].sort((v,L)=>{if(v.id?.toLowerCase()===i)return-1;if(L.id?.toLowerCase()===i)return 1;if(this._outfitSort==="rarity"){let F=h.indexOf(this._outfitRarity(v)),N=h.indexOf(this._outfitRarity(L));return(F<0?99:F)-(N<0?99:N)||String(v.name).localeCompare(String(L.name))}return String(v.name).localeCompare(String(L.name))}),_=this._config.compact?18:24,E=Math.max(1,Math.ceil(u.length/_)),k=Math.min(this._outfitPage,E-1),b=u.slice(k*_,k*_+_),M=new Map;for(let v of f)M.set(this._outfitRarity(v)||"Other",(M.get(this._outfitRarity(v)||"Other")||0)+1);return n`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${T[this._outfitRarity(a)]||"var(--accent)"}">
          <div class="locker-hero-img">
            ${a?.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(a.icon,256)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Avatar${s?" \xB7 this card uses its own skin setting":""}</div>
            <div class="bp-hero-name">${a?.name||(i?"Unknown outfit":"Not chosen")}</div>
            <div class="bp-hero-meta">
              ${a?.rarity?n`<span>${this._outfitRarity(a)}</span>`:p}
              ${i?n`<button class="link-button" ?disabled=${this._loadingAction==="set_avatar"} @click=${()=>this._setAvatar(null)}>Clear</button>`:n`<span class="muted">Tap an outfit below to use it</span>`}
            </div>
            <div class="bp-hero-types">
              <b>${this._num(f.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${h.filter(v=>M.get(v)).map(v=>n`<span class="rarity-dot" style="--rarity:${T[v]}" title=${v}>${M.get(v)}</span>`)}
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
          ${["all","favorites","new"].map(v=>n`
            <button class="mode-tab ${this._lockerFilter===v?"active":""}" @click=${()=>{this._lockerFilter=v,this._outfitPage=0}}>
              ${v==="all"?"All":v==="favorites"?`\u2605 Favourites (${x})`:`\u2728 New (${S})`}</button>`)}
        </div>

        ${b.length?n`<div class="bp-rewards locker-grid">
              ${b.map(v=>{let L=String(v.id||"").toLowerCase(),F=L===i,N=this._selectedOutfit===L;return n`
                  <div class="bp-reward locker-tile ${F?"equipped":""} ${N?"selected":""}" style="--rarity:${T[this._outfitRarity(v)]||"#9CA3AF"}"
                    title="${v.name}${v.set?` \xB7 ${v.set}`:""}" role="button" tabindex="0"
                    @click=${()=>this._selectedOutfit=N?null:L}>
                    <div class="bp-reward-img locker-img">
                      ${v.small||v.icon?n`<img @load=${A} decoding="async" class="fi" src=${P(v.small||v.icon,256)} alt="" loading="lazy" @error=${C} />`:n`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${F?n`<span class="bp-cost included">Avatar</span>`:p}
                      ${v.favorite?n`<span class="locker-fav">★</span>`:p}
                      ${d(v)?n`<span class="locker-new">✨ New</span>`:p}
                      ${N?n`<div class="locker-actions">
                            ${F?p:n`<button class="locker-use" ?disabled=${this._loadingAction==="set_avatar"}
                                  @click=${Q=>{Q.stopPropagation(),this._setAvatar(L)}}>
                                  ${this._loadingAction==="set_avatar"?"Saving\u2026":"Use as avatar"}</button>`}
                            <button class="locker-use fav" @click=${Q=>{Q.stopPropagation(),this._setFavorite(L,!v.favorite)}}>
                              ${v.favorite?"\u2606 Unfavourite":"\u2605 Favourite"}</button>
                          </div>`:p}
                    </div>
                    <span class="bp-reward-name">${v.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(v)||"Outfit"}</span>
                  </div>`})}
            </div>`:n`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${E>1?n`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${k===0} @click=${()=>this._outfitPage=k-1}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${k+1} of ${E} · ${u.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${k>=E-1} @click=${()=>this._outfitPage=k+1}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:p}
      </div>
    `}async _loadShop(e=!1){if(!(!this.hass||this._shop.loading||!e&&(this._shop.data!==void 0||this._shop.error))){this._shop={...this._shop,loading:!0};try{this._shop={data:await this.hass.callWS({type:"fortnite_activity/shop",player_id:this._player})}}catch(t){this._shop={error:t?.message||"Item Shop unavailable"}}}}async _toggleWishlist(e,t){let a=String(e.key||e.id||"").toLowerCase();if(a){this._loadingAction=`wish:${a}`;try{await this.hass.callService("fortnite_activity",t?"wishlist_add":"wishlist_remove",{player_id:this._player,cosmetic_id:a,...t?Object.fromEntries(Object.entries({name:e.name,icon:e.icon,type:e.type,rarity:e.rarity}).filter(([,i])=>typeof i=="string"&&i)):{}}),this._searchResults=(this._searchResults||[]).map(i=>String(i.key).toLowerCase()===a?{...i,wishlisted:t}:i),await this._loadShop(!0)}catch(i){console.error("Wishlist update failed:",i)}finally{this._loadingAction=null}}}async _searchCosmetics(){let e=this._searchQuery.trim();if(e.length<2){this._searchResults=null;return}this._searchLoading=!0;try{let t=await this.hass.callWS({type:"fortnite_activity/cosmetic_search",query:e,player_id:this._player,...this._searchType!=="all"?{cosmetic_type:this._searchType}:{}});this._searchQuery.trim()===e&&(this._searchResults=t?.results||[])}catch{this._searchResults=[]}finally{this._searchLoading=!1}}_wishButton(e,t){let a=String(e.key||e.id||"").toLowerCase();return n`<button class="wish-btn ${t?"on":""}" title=${t?"Remove from wishlist":"Add to wishlist"}
      ?disabled=${this._loadingAction===`wish:${a}`}
      @click=${i=>{i.stopPropagation(),this._toggleWishlist(e,!t)}}>
      <ha-icon icon=${t?"mdi:heart":"mdi:heart-outline"}></ha-icon></button>`}_renderShopView(){let e=this._shop;if(e.loading&&e.data===void 0)return n`<div class="empty">Loading the Item Shop…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;let t=e.data?.shop,a=e.data?.wishlist||[],i=e.data?.in_shop||[],s=(o,l)=>n`
      <button class="mode-tab ${this._shopTab===o?"active":""}" @click=${()=>this._shopTab=o}>${l}</button>`;return n`
      ${i.length?n`<div class="shop-alert">
            <ha-icon icon="mdi:heart"></ha-icon>
            <span><b>${i.length===1?i[0].name:`${i.length} wishlist items`}</b> ${i.length===1?"is":"are"} in the shop today!</span>
          </div>`:p}
      <div class="mode-tabs shop-tabs">
        ${s("today","Today's shop")}
        ${s("wishlist",n`♥ Wishlist${a.length?` (${a.length})`:""}`)}
      </div>
      ${this._shopTab==="wishlist"?this._renderWishlist(a,i):this._renderShopToday(t)}
    `}_shopTag(e,t){let a=e.items?.[0]||{},i=t?.current||{};return a.brand_new?n`<span class="shop-tag new">✨ Brand new</span>`:typeof a.back_after_days=="number"&&a.back_after_days>1?n`<span class="shop-tag back">↩ Back after ${a.back_after_days} days</span>`:a.intro?.chapter&&i.chapter&&a.intro.chapter===i.chapter&&a.intro.season===i.season?n`<span class="shop-tag new">New this season</span>`:a.intro?.chapter?n`<span class="shop-tag">Released Ch${a.intro.chapter} S${a.intro.season}</span>`:p}_bundleSeparately(e,t){if(!e.bundle||!e.items?.length)return null;let a=new Map;for(let s of t?.sections||[])for(let o of s.offers)!o.bundle&&o.items.length===1&&o.price&&a.set(o.items[0].id,o.price);let i=0;for(let s of e.items){let o=a.get(s.id);if(!o)return null;i+=o}return i||null}_renderShopTile(e,t){let a=e.items[0]||{};return n`
      <div class="shop-tile ${e.owned?"owned":""} ${e.wishlisted?"wish":""}" style="--rarity:${T[this._outfitRarity(a)]||"#9CA3AF"}"
        title="${e.title}${e.items.length>1?` \xB7 ${e.items.map(i=>i.name).join(", ")}`:""}">
        <div class="shop-img">
          ${e.image?n`<img @load=${A} decoding="async" class="fi" src=${P(e.image,256)} alt="" loading="lazy" @error=${C} />`:n`<ha-icon icon="mdi:shopping-outline"></ha-icon>`}
          ${e.owned?n`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(a,!!a.wishlisted)}
          ${e.bundle?n`<span class="shop-bundle">Bundle · ${e.items.length}</span>`:p}
        </div>
        <span class="bp-reward-name">${e.title}</span>
        ${e.price?n`<span class="shop-price">Ⓥ ${this._num(e.price)}${e.regular_price&&e.regular_price>e.price?n` <s>${this._num(e.regular_price)}</s>`:p}</span>`:n`<span class="shop-price varies" title="Fortnite works out this bundle's price from what you already own">
              Price varies${this._bundleSeparately(e,t)?n` · <s>Ⓥ ${this._num(this._bundleSeparately(e,t))}</s>`:p}</span>`}
        ${this._shopTag(e,t)}
      </div>`}_renderShopToday(e){if(!e)return n`<div class="empty">The Item Shop will show here soon.</div>`;let t=this._shopQuery.trim().toLowerCase(),a=c=>c.bundle?"bundle":String(c.items[0]?.type||"other").toLowerCase(),i=[["all","All"],["outfit","Outfits"],["emote","Emotes"],["pickaxe","Pickaxes"],["bundle","Bundles"]],s=e.sections||[],o=!!t||this._shopKind!=="all",l=e.expiration?Date.parse(e.expiration)-this._now:null,h=Math.min(Math.max(0,this._shopSection),Math.max(0,s.length-1)),m=s[h],d=o?s.map(c=>({...c,offers:c.offers.filter(u=>(this._shopKind==="all"||a(u)===this._shopKind)&&(!t||String(u.title).toLowerCase().includes(t)||u.items.some(_=>String(_.name||"").toLowerCase().includes(t))))})).filter(c=>c.offers.length):[],f=d.reduce((c,u)=>c+u.offers.length,0),x=this._shopLimit,S=[];for(let c of d){if(x<=0)break;S.push({...c,offers:c.offers.slice(0,x)}),x-=c.offers.length}let z=c=>{this._shopSection=(c+s.length)%s.length,this.shadowRoot?.querySelector(".shop-nav")?.scrollIntoView({block:"nearest",behavior:"smooth"})};return n`
      <div class="shop-controls">
        <div class="mapx-search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search today's shop" .value=${this._shopQuery}
            @input=${c=>{this._shopQuery=c.target.value,this._shopLimit=36}} />
        </div>
        ${l&&l>0?n`<span class="shop-refresh"><ha-icon icon="mdi:timer-sand"></ha-icon>New shop in ${this._formatSpan(l)}</span>`:p}
      </div>
      <div class="mode-tabs shop-kinds">
        ${i.map(([c,u])=>n`<button class="mode-tab ${this._shopKind===c?"active":""}" @click=${()=>{this._shopKind=c,this._shopLimit=36}}>${u}</button>`)}
      </div>
      ${o?n`
            ${S.length?S.map(c=>n`
                  <div class="section-title">${c.name}</div>
                  <div class="shop-grid">${c.offers.map(u=>this._renderShopTile(u,e))}</div>`):n`<div class="empty">Nothing in today's shop matches.</div>`}
            ${f>this._shopLimit?n`<button class="mini-button show-more" @click=${()=>this._shopLimit+=36}>Show more (${f-this._shopLimit} left)</button>`:p}`:m?n`
              <div class="shop-nav">
                <button class="bp-nav" title="Previous section" @click=${()=>z(h-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
                <label class="mapx-select shop-section-select">
                  <ha-icon icon="mdi:shopping-outline"></ha-icon>
                  <select @change=${c=>z(Number(c.target.value))}>
                    ${s.map((c,u)=>n`<option value=${u} ?selected=${u===h}>${c.name} (${c.offers.length})</option>`)}
                  </select>
                </label>
                <button class="bp-nav" title="Next section" @click=${()=>z(h+1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
              </div>
              <div class="shop-section-meta">Section ${h+1} of ${s.length} · ${m.offers.length} item${m.offers.length===1?"":"s"}</div>
              <div class="shop-grid">${m.offers.map(c=>this._renderShopTile(c,e))}</div>
              ${s.length>1?n`<button class="mini-button show-more" @click=${()=>z(h+1)}>Next: ${s[(h+1)%s.length].name} ›</button>`:p}`:n`<div class="empty">The Item Shop is empty right now.</div>`}
    `}_renderWishlist(e,t){let a=new Set(t.map(s=>s.id)),i=(s,o)=>n`
      <button class="mode-tab ${this._searchType===s?"active":""}" @click=${()=>{this._searchType=s,this._searchCosmetics()}}>${o}</button>`;return n`
      <div class="section-title">Find any skin or item</div>
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Type a name, e.g. Peely" .value=${this._searchQuery}
          @input=${s=>{this._searchQuery=s.target.value,window.clearTimeout(this._searchTimer),this._searchTimer=window.setTimeout(()=>this._searchCosmetics(),400)}} />
      </div>
      <div class="mode-tabs">${i("outfit","Outfits")} ${i("all","Everything")}</div>
      ${this._searchLoading?n`<div class="empty">Searching…</div>`:p}
      ${this._searchResults?this._searchResults.length?n`<div class="bp-rewards locker-grid">
              ${this._searchResults.map(s=>n`
                <div class="bp-reward" style="--rarity:${T[this._outfitRarity(s)]||"#9CA3AF"}" title=${s.name}>
                  <div class="bp-reward-img locker-img">
                    ${s.icon?n`<img @load=${A} decoding="async" class="fi" src=${P(s.icon,256)} alt="" loading="lazy" @error=${C} />`:n`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                    ${s.owned?n`<span class="bp-state unlocked" title="Owned">✓</span>`:this._wishButton(s,!!s.wishlisted)}
                  </div>
                  <span class="bp-reward-name">${s.name}</span>
                  <span class="bp-reward-type">${s.owned?"Owned":s.type||this._outfitRarity(s)}</span>
                </div>`)}
            </div>`:n`<div class="empty">No matches.</div>`:p}

      <div class="section-title">Your wishlist</div>
      ${e.length?n`<div class="bp-rewards locker-grid">
            ${e.map(s=>n`
              <div class="bp-reward ${a.has(s.id)?"in-shop":""}" style="--rarity:${T[this._outfitRarity(s)]||"#9CA3AF"}" title=${s.name||s.id}>
                <div class="bp-reward-img locker-img">
                  ${s.icon?n`<img @load=${A} decoding="async" class="fi" src=${P(s.icon,256)} alt="" loading="lazy" @error=${C} />`:n`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                  ${this._wishButton(s,!0)}
                  ${a.has(s.id)?n`<span class="shop-bundle in">In shop!</span>`:p}
                </div>
                <span class="bp-reward-name">${s.name||s.id}</span>
                <span class="bp-reward-type">${a.has(s.id)?"Available now":s.type||"Waiting"}</span>
              </div>`)}
          </div>`:n`<div class="empty">Tap ♡ on any skin to get told when it is in the shop.</div>`}
    `}async _loadNews(){if(!(!this.hass||this._news.loading||this._news.data!==void 0||this._news.error)){this._news={loading:!0};try{this._news={data:await this.hass.callWS({type:"fortnite_activity/news",player_id:this._player})}}catch(e){this._news={error:e?.message||"News unavailable"}}}}_renderNewsView(){let e=this._news;if(e.loading||e.data===void 0&&!e.error)return n`<div class="empty">Loading news…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;let t=e.data?.news||[],a=e.data?.update,i=e.data?.season||this._catalog.season,s=e.data?.fetched_at?Date.parse(e.data.fetched_at):NaN;return n`
      ${this._renderWhatsNew(a)}
      ${a||i?n`<div class="news-update">
            <ha-icon icon="mdi:update"></ha-icon>
            <div>
              <b>${a?.chapter&&a?.season?`Chapter ${a.chapter} \xB7 Season ${a.season}`:i?.number?`Season ${i.number}`:"Current update"}</b>
              <span>
                ${a?.patch||a?.version?`Update ${a.patch||a.version}`:""}${a?.release_date?` \xB7 out ${this._formatWhen(a.release_date)}`:""}
                ${i?.days_left!=null?` \xB7 season ends in ${i.days_left} days`:""}
              </span>
            </div>
          </div>`:p}
      ${this._sectionsHas("events")?p:this._renderNextEventTeaser()}
      ${t.length?n`<div class="news-meta">
            <span>In-game news</span>
            ${isNaN(s)?p:n`<span class="muted">Updated ${this._formatRelativeTime(new Date(s).toISOString())}</span>`}
          </div>
          <div class="news-list">
            ${t.map(o=>n`
              <div class="news-card">
                ${o.image||o.tile?n`<img @load=${A} decoding="async" class="fi" src=${P(o.image||o.tile,720)} alt="" loading="lazy" @error=${C} />`:p}
                <div class="news-body">
                  ${o.tag?n`<span class="tag">${o.tag}</span>`:p}
                  <b>${o.title}</b>
                  ${o.body?n`<p>${o.body}</p>`:p}
                </div>
              </div>`)}
          </div>`:n`<div class="empty">No news right now.</div>`}
    `}_renderWhatsNew(e){let t=this._findEntity("sensor","sprites")?.attributes||{},a=(t.families||[]).filter(d=>d.new),i=[...new Set((t.families||[]).flatMap(d=>(d.variants||[]).filter(f=>f.new&&!d.new).map(f=>f.label)))],s=this._shop.data?.shop,o=s?.current||{},l=s?s.sections.flatMap(d=>d.offers).filter(d=>d.items?.[0]?.brand_new||d.items?.[0]?.intro?.chapter===o.chapter&&d.items?.[0]?.intro?.season===o.season).length:0,h=t.version||e?.patch||e?.version,m=[a.length?n`<div class="wn-row" @click=${()=>{this._spriteFilter="new",this._setView("sprites")}}>
            <span class="wn-icons">${a.slice(0,4).map(d=>n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(d.icon,64)} alt="" @error=${C} />`)}</span>
            <span><b>${a.length} new sprite${a.length>1?"s":""}</b> · ${a.map(d=>this._spriteName(d)).join(", ")}</span>
          </div>`:p,t.new_kinds?n`<div class="wn-row" @click=${()=>{this._spriteFilter="new",this._setView("sprites")}}>
            <span class="wn-emoji">✨</span><span><b>${t.new_kinds} new sprite kinds</b>${i.length?` \xB7 ${i.join(", ")}`:""}</span>
          </div>`:p,l?n`<div class="wn-row" @click=${()=>this._setView("shop")}><span class="wn-emoji">🛒</span><span><b>${l} brand-new item${l>1?"s":""}</b> in today's shop</span></div>`:p,e?.patch?n`<div class="wn-row" @click=${()=>this._setView("map")}><span class="wn-emoji">🗺️</span><span>Map data for <b>update ${e.patch}</b></span></div>`:p].filter(d=>d!==p);return!m.length||!h?p:n`<div class="whats-new">
      <div class="wn-head"><span class="sp-release-badge">✨ NEW</span><b>What's new in update ${h}</b></div>
      ${m}
    </div>`}_sectionsHas(e){return this._sections.includes(e)}_renderNextEventTeaser(){let t=(this._events.list||[]).filter(i=>this._matchesFilters(i,this._currentFilters())).find(i=>i.windows.some(s=>this._windowState(s)!=="finished"));if(!t)return p;let a=this._eventTiming(t);return n`<div class="news-update event">
      ${t.poster?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(t.poster,128)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:tournament"></ha-icon>`}
      <div><b>${t.name}</b><span>${a.text}</span></div>
    </div>`}async _loadMap(e=this._mapMode){let t=this._maps[e];if(!(!this.hass||t?.loading||t?.error||t?.data!==void 0)){this._maps={...this._maps,[e]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,mode:e});this._maps={...this._maps,[e]:{data:a?.map??null}}}catch(a){this._maps={...this._maps,[e]:{error:a?.message||"Map unavailable"}}}}}async _loadMatchMap(e){let t=`playlist:${e}`;if(!(!this.hass||this._maps[t])){this._maps={...this._maps,[t]:{loading:!0}};try{let a=await this.hass.callWS({type:"fortnite_activity/map",player_id:this._player,playlist_id:e});this._maps={...this._maps,[t]:{data:a?.map??null}}}catch{this._maps={...this._maps,[t]:{data:null}}}}}_matchMap(e){let t=this._maps[`playlist:${e.playlist_id}`]?.data;return t||(e.mode_category==="build"||e.mode_category==="zero_build")&&this._maps.br?.data||null}_poiPos(e,t){let a=e?.bounds;if(!a||a.maxX===a.minX||a.maxY===a.minY)return null;let i=(t.x-a.minX)/(a.maxX-a.minX)-.5,s=(t.y-a.minY)/(a.maxY-a.minY)-.5,o=(Number(e?.camera?.rotation)||0)*Math.PI/180,l=Math.round(Math.cos(o)*1e6)/1e6,h=Math.round(Math.sin(o)*1e6)/1e6,m=(i*l-s*h+.5)*100,d=(i*h+s*l+.5)*100;return m<0||m>100||d<0||d>100?null:{left:m,top:d}}_gridRef(e){return`${"ABCDEFGHIJ"[Math.min(9,Math.max(0,Math.floor(e.left/10)))]}${Math.min(10,Math.max(1,Math.floor(e.top/10)+1))}`}_mapModeLabel(e){let t=this._maps[e]?.data?.name;if(t)return t;if(e==="br")return"Battle Royale";if(e==="og")return"OG";if(!e.startsWith("rotating:"))return e;let a=e.split(":")[1].replace(/(forbidden|blast|berry|ranch|smile|spawn|stake)/g," $1").replace(/\s+/g," ").trim();return this._titleCase(a)}async _loadAllMaps(){for(let e of this._maps.br?.data?.modes||[])await this._loadMap(e)}_mapPlaces(e){return(e?.pois||[]).map((t,a)=>{let i=this._poiPos(e,t);return i?{key:`${t.name}#${a}`,name:this._titleCase(t.name),type:t.type==="landmark"?"landmark":"named",...i,grid:this._gridRef(i)}:null}).filter(Boolean)}_titleCase(e){return String(e||"").toLowerCase().replace(/(^|[\s(-])([a-z])/g,(t,a,i)=>a+i.toUpperCase()).replace(/'([a-z])([a-z]{2,})/g,(t,a,i)=>"'"+a.toUpperCase()+i)}_mapMaxZoom(){let e=Math.max(1,Math.min(this._mapBox.w,this._mapBox.h)||400);return Math.min(10,Math.max(3,4096/e))}_mapGeom(e=this._mapZoom,t=this._mapCenter.x,a=this._mapCenter.y){let i=this._mapBox.w||400,s=this._mapBox.h||400,o=Math.min(i,s)*e,l=(h,m)=>o<=h?(h-o)/2:Math.min(0,Math.max(h-o,h/2-m*o));return{w:i,h:s,size:o,tx:l(i,t),ty:l(s,a)}}_setMapView(e,t,a){let i=Math.min(this._mapMaxZoom(),Math.max(1,e)),s=this._mapGeom(i,t,a);this._mapZoom=i,this._mapCenter={x:(s.w/2-s.tx)/s.size,y:(s.h/2-s.ty)/s.size}}_animateMapTo(e,t,a){let i={z:this._mapZoom,x:this._mapCenter.x,y:this._mapCenter.y},s=performance.now(),o=l=>{let h=Math.min(1,(l-s)/220),m=1-Math.pow(1-h,3);this._setMapView(i.z+(e-i.z)*m,i.x+(t-i.x)*m,i.y+(a-i.y)*m),h<1&&(this._mapAnim=requestAnimationFrame(o))};cancelAnimationFrame(this._mapAnim||0),this._mapAnim=requestAnimationFrame(o)}_zoomAt(e,t,a,i=!1){let s=this._mapGeom(),o=t??s.w/2,l=a??s.h/2,h=(o-s.tx)/s.size,m=(l-s.ty)/s.size,d=Math.min(this._mapMaxZoom(),Math.max(1,this._mapZoom*e)),f=Math.min(s.w,s.h)*d,x=h+(s.w/2-o)/f,S=m+(s.h/2-l)/f;i?this._animateMapTo(d,x,S):this._setMapView(d,x,S)}_focusPlace(e,t=Math.max(this._mapZoom,3)){this._mapPoi=e.key,this._animateMapTo(Math.min(this._mapMaxZoom(),t),e.left/100,e.top/100)}_resetMapView(){this._animateMapTo(1,.5,.5)}_mapFrameEl(){return this.shadowRoot?.querySelector(".mapx-frame")}_observeMapFrame(){let e=this._mapFrameEl();!e||e===this._mapObserved||(this._mapResize?.disconnect(),this._mapObserved=e,this._mapResize=new ResizeObserver(t=>{let a=t[0].contentRect;(Math.abs(a.width-this._mapBox.w)>.5||Math.abs(a.height-this._mapBox.h)>.5)&&(this._mapBox={w:a.width,h:a.height},this._setMapView(this._mapZoom,this._mapCenter.x,this._mapCenter.y))}),this._mapResize.observe(e))}_localPoint(e){let t=this._mapFrameEl().getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}_toMap(e){let t=this._mapGeom();return{x:(e.x-t.tx)/t.size,y:(e.y-t.ty)/t.size}}_onMapWheel(e){if(!this._mapFrameEl())return;e.preventDefault();let t=this._localPoint(e);this._zoomAt(Math.exp(-e.deltaY*.0015),t.x,t.y)}_onMapPointerDown(e){let t=this._mapFrameEl(),a=e.target;if(this._mapMenu&&(this._mapMenu=!1),!t||a.closest(".mapx-ui, .mapx-pin, .mapx-mark"))return;t.setPointerCapture(e.pointerId);let i=this._localPoint(e);this._pointers.set(e.pointerId,i);let s=this._pointers.size===1?this._mapTool:"pan";if(s==="draw"){let o=this._toMap(i);this._mapDrawing={color:this._mapColor,points:[[o.x,o.y]]};return}this._mapDrawing&&(this._mapDrawing=null),this._gesture={z:this._mapZoom,cx:this._mapCenter.x,cy:this._mapCenter.y,moved:!1,tool:s,start:new Map(this._pointers)}}_onMapPointerMove(e){if(!this._pointers.has(e.pointerId))return;let t=this._localPoint(e);if(this._pointers.set(e.pointerId,t),this._mapDrawing){let u=this._toMap(t),_=this._mapDrawing.points[this._mapDrawing.points.length-1],E=this._mapGeom();Math.hypot((u.x-_[0])*E.size,(u.y-_[1])*E.size)>3&&(this._mapDrawing={...this._mapDrawing,points:[...this._mapDrawing.points,[u.x,u.y]]});return}let a=this._gesture;if(!a)return;let i=[...this._pointers.values()],s=[...a.start.values()],o=this._mapGeom(a.z,a.cx,a.cy),l=a.z,h=s[0],m=i[0];if(i.length>=2&&s.length>=2){let u=Math.hypot(s[0].x-s[1].x,s[0].y-s[1].y)||1,_=Math.hypot(i[0].x-i[1].x,i[0].y-i[1].y);l=a.z*(_/u),h={x:(s[0].x+s[1].x)/2,y:(s[0].y+s[1].y)/2},m={x:(i[0].x+i[1].x)/2,y:(i[0].y+i[1].y)/2}}(Math.hypot(m.x-h.x,m.y-h.y)>4||l!==a.z)&&(a.moved=!0);let d=(h.x-o.tx)/o.size,f=(h.y-o.ty)/o.size,x=Math.min(this._mapMaxZoom(),Math.max(1,l)),S=Math.min(o.w,o.h)*x,z=d+(o.w/2-m.x)/S,c=f+(o.h/2-m.y)/S;this._mapPending={z:x,cx:z,cy:c},this._mapRaf||(this._mapRaf=requestAnimationFrame(()=>{this._mapRaf=0,this._mapPending&&this._setMapView(this._mapPending.z,this._mapPending.cx,this._mapPending.cy)}))}_onMapPointerUp(e){let t=this._pointers.get(e.pointerId);if(this._pointers.delete(e.pointerId),this._mapDrawing){let i=this._mapDrawing;this._mapDrawing=null,i.points.length>1&&this._annotate(s=>({...s,lines:[...s.lines,{id:Date.now(),...i}]}));return}let a=this._gesture;a&&(this._pointers.size===0?(this._gesture=null,!a.moved&&t&&this._onMapTap(t,a.tool)):this._gesture={z:this._mapZoom,cx:this._mapCenter.x,cy:this._mapCenter.y,moved:a.moved,tool:"pan",start:new Map(this._pointers)})}_onMapTap(e,t){if(t==="marker"){let a=this._toMap(e);if(a.x<0||a.x>1||a.y<0||a.y>1)return;this._annotate(i=>({...i,marks:[...i.marks,{id:Date.now(),x:a.x,y:a.y,color:this._mapColor,icon:this._mapIcon}]}))}else if(t==="erase"){let a=this._mapGeom(),i=(h,m)=>Math.hypot(a.tx+h*a.size-e.x,a.ty+m*a.size-e.y),s=this._annots(),o=s.marks.find(h=>i(h.x,h.y)<18);if(o)return this._annotate(h=>({...h,marks:h.marks.filter(m=>m.id!==o.id)}));let l=s.lines.find(h=>h.points.some(([m,d])=>i(m,d)<12));l&&this._annotate(h=>({...h,lines:h.lines.filter(m=>m.id!==l.id)}))}}_onMapDblClick(e){if(e.target.closest(".mapx-ui")||this._mapTool!=="pan")return;let t=this._localPoint(e);this._zoomAt(2,t.x,t.y,!0)}_annotKey(){return`fortnite-map-notes:${this._player}:${this._mapMode}`}_annots(){let e=this._annotKey();if(!this._notes[e]){let t=null;try{t=JSON.parse(localStorage.getItem(e)||"null")}catch{t=null}this._notes={...this._notes,[e]:{marks:t?.marks||[],lines:t?.lines||[]}}}return this._notes[e]}_annotate(e){let t=this._annotKey(),a=this._annots(),i=e(a);this._undo=[...this._undo,{key:t,state:a}].slice(-50),this._redo=[],this._saveNotes(t,i)}_saveNotes(e,t){this._notes={...this._notes,[e]:t};try{localStorage.setItem(e,JSON.stringify(t))}catch{}}_undoNote(){let e=this._undo[this._undo.length-1];e&&(this._undo=this._undo.slice(0,-1),this._redo=[...this._redo,{key:e.key,state:this._notes[e.key]||{marks:[],lines:[]}}],this._saveNotes(e.key,e.state))}_redoNote(){let e=this._redo[this._redo.length-1];e&&(this._redo=this._redo.slice(0,-1),this._undo=[...this._undo,{key:e.key,state:this._notes[e.key]||{marks:[],lines:[]}}],this._saveNotes(e.key,e.state))}async _toggleMapFull(){let e=this._mapFrameEl(),t=document;if(this._mapFull){t.fullscreenElement&&await t.exitFullscreen().catch(()=>{}),this._mapFull=!1;return}this._mapFull=!0;try{await e?.requestFullscreen?.({navigationUI:"hide"})}catch{}}_randomDrop(e){let t=e.filter(i=>i.type==="named");if(!t.length)return;let a=t[Math.floor(Math.random()*t.length)];t.length>1&&a.key===this._mapDrop&&(a=t[(t.indexOf(a)+1)%t.length]),this._mapDrop=a.key,this._focusPlace(a,2.5)}_placeFacts(e,t){let a=(e.pois||[])[Number(String(t.key).split("#")[1])];if(!a)return{elevation:null,nearest:[]};let s=this._mapPlaces(e).filter(o=>o.key!==t.key&&o.name!==t.name).map(o=>{let l=(e.pois||[])[Number(String(o.key).split("#")[1])];return{...o,metres:Math.round(Math.hypot(l.x-a.x,l.y-a.y)/100)}}).sort((o,l)=>o.metres-l.metres).slice(0,3);return{elevation:typeof a.z=="number"?Math.round(a.z/100):null,nearest:s}}_renderMapImage(e,t=!1){return n`
      <div class="map-frame ${t?"compact":""}">
        <img @load=${A} class="fi" src=${e.image} alt=${e.name||"Map"} loading="lazy" decoding="async" @error=${C} />
      </div>
    `}_renderMapPicker(){let e=this._maps.br?.data?.modes||["br"],t=this._mapMode,a=[["Battle Royale","mdi:island",e.filter(o=>o==="br")],["OG","mdi:gamepad-classic",e.filter(o=>o==="og")],["Reload & rotating","mdi:autorenew",e.filter(o=>o.startsWith("rotating:"))]],i=t==="br"?"mdi:island":t==="og"?"mdi:gamepad-classic":"mdi:autorenew",s=o=>{let l=this._maps[o];if(l?.loading)return"loading\u2026";let h=(l?.data?.pois||[]).filter(m=>m.type!=="landmark").length;return l?.data?`${h} places`:""};return n`
      <div class="mapx-picker">
        <button class="mapx-current" aria-haspopup="listbox" aria-expanded=${this._mapMenu?"true":"false"}
          @click=${()=>{this._mapMenu=!this._mapMenu,this._mapMenu&&this._loadAllMaps()}}>
          <ha-icon icon=${i}></ha-icon>
          <span><b>${this._mapModeLabel(t)}</b><small>${e.length>1?`${e.length} maps \xB7 tap to change`:"Map"}</small></span>
          <ha-icon icon=${this._mapMenu?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this._mapMenu?n`<div class="mapx-menu" role="listbox">
              ${a.filter(([,,o])=>o.length).map(([o,l,h])=>n`
                <div class="mapx-group"><ha-icon icon=${l}></ha-icon>${o}</div>
                ${h.map(m=>n`
                  <button class="mapx-option ${m===t?"on":""}" role="option" aria-selected=${m===t?"true":"false"}
                    @click=${()=>{this._mapMode=m,this._mapMenu=!1,this._mapPoi=null,this._mapDrop=null,this._setMapView(1,.5,.5),this._loadMap(m)}}>
                    <span>${this._mapModeLabel(m)}</span><small>${s(m)}</small>
                    ${m===t?n`<ha-icon icon="mdi:check"></ha-icon>`:p}
                  </button>`)}`)}
            </div>`:p}
      </div>
    `}_renderPlacePickers(e,t){let a=this._mapQuery.trim().toLowerCase(),i=m=>!a||m.name.toLowerCase().includes(a)||m.grid.toLowerCase()===a,s=[...t.filter(i).reduce((m,d)=>m.set(d.name,[...m.get(d.name)||[],d]),new Map)].sort((m,d)=>m[0].localeCompare(d[0])),o=e.filter(i).sort((m,d)=>m.name.localeCompare(d.name)),l=this._mapPoi,h=m=>{let d=[...e,...t].find(f=>f.key===m);d&&this._focusPlace(d)};return n`
      <div class="mapx-search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input type="search" placeholder="Find a place or grid (e.g. D4)" .value=${this._mapQuery}
          @input=${m=>this._mapQuery=m.target.value}
          @keydown=${m=>{if(m.key==="Enter"){let d=[...o,...s.map(f=>f[1][0])][0];d&&this._focusPlace(d)}}} />
      </div>
      <div class="mapx-selects">
        <label class="mapx-select">
          <ha-icon icon="mdi:map-marker"></ha-icon>
          <select @change=${m=>{m.target.value&&h(m.target.value)}}>
            <option value="" ?selected=${!e.some(m=>m.key===l)}>Named places (${o.length})</option>
            ${o.map(m=>n`<option value=${m.key} ?selected=${m.key===l}>${m.grid} · ${m.name}</option>`)}
          </select>
        </label>
        ${t.length?n`<label class="mapx-select landmark">
              <ha-icon icon="mdi:map-marker-star"></ha-icon>
              <select @change=${m=>{let d=s.find(x=>x[0]===m.target.value)?.[1]||[],f=d.findIndex(x=>x.key===l);d.length&&(this._mapShowLandmarks||(this._mapShowLandmarks=!0),this._focusPlace(d[(f+1)%d.length]))}}>
                <option value="" ?selected=${!t.some(m=>m.key===l)}>Landmarks (${t.length})</option>
                ${s.map(([m,d])=>n`<option value=${m} ?selected=${d.some(f=>f.key===l)}>${d.length>1?`\xD7${d.length}`:d[0].grid} · ${m}</option>`)}
              </select>
            </label>`:p}
      </div>
    `}_renderPlaceInfo(e,t,a){let i=t.find(h=>h.key===this._mapPoi);if(!i)return a?p:n`<div class="mapx-hint">Tap a place on the map or pick one above to see details.</div>`;let s=t.filter(h=>h.name===i.name),o=this._placeFacts(e,i),l=i.key===this._mapDrop;return n`
      <div class="mapx-info ${a?"floating mapx-ui":""}">
        <div class="mapx-info-head">
          <span class="mapx-grid-badge">${i.grid}</span>
          <div>
            <b>${l?"\u{1FA82} Drop here: ":""}${i.name}</b>
            <small>${i.type==="landmark"?"Landmark":"Named place"}${s.length>1?` \xB7 ${s.indexOf(i)+1} of ${s.length}`:""}</small>
          </div>
          <button class="mapx-tool" title="Close" @click=${()=>{this._mapPoi=null,this._mapDrop=null}}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="mapx-facts">
          ${o.elevation!=null?n`<span><ha-icon icon="mdi:image-filter-hdr"></ha-icon>${o.elevation} m high</span>`:p}
          <span><ha-icon icon="mdi:grid"></ha-icon>Grid ${i.grid}</span>
        </div>
        ${o.nearest.length?n`<div class="mapx-near">
              <small>Nearby</small>
              ${o.nearest.map(h=>n`<button @click=${()=>this._focusPlace(h)}>${h.name} <em>${h.metres} m</em></button>`)}
            </div>`:p}
        <div class="mapx-info-actions">
          <button class="mini-button" @click=${()=>this._focusPlace(i)}><ha-icon icon="mdi:crosshairs-gps"></ha-icon> Zoom to</button>
          ${s.length>1?n`<button class="mini-button" @click=${()=>this._focusPlace(s[(s.indexOf(i)+1)%s.length])}><ha-icon icon="mdi:chevron-right"></ha-icon> Next</button>`:p}
          <button class="mini-button" @click=${()=>this._annotate(h=>({...h,marks:[...h.marks,{id:Date.now(),x:i.left/100,y:i.top/100,color:this._mapColor,icon:"\u{1F4CD}"}]}))}>
            <ha-icon icon="mdi:map-marker-plus"></ha-icon> Pin it</button>
        </div>
      </div>
    `}_renderMapView(){let e=this._maps[this._mapMode]||{};if(e.loading||e.data===void 0&&!e.error)return n`${this._renderMapPicker()}<div class="empty">Loading map…</div>`;if(e.error)return n`${this._renderMapPicker()}<div class="empty">${e.error}</div>`;let t=e.data;if(!t)return n`${this._renderMapPicker()}<div class="empty">This map will show here soon.</div>`;let a=this._mapPlaces(t),i=a.filter(b=>b.type==="named"),s=a.filter(b=>b.type==="landmark"),o=this._mapZoom,l=this._mapGeom(),h=(b,M)=>({x:l.tx+b*l.size,y:l.ty+M*l.size}),m=this._mapFull||l.w>=560,d=this._mapLabels==="all"||this._mapLabels==="auto"&&(m||o>=1.6),f=this._mapLabels==="all"?o>=1.6:this._mapLabels==="auto"&&o>=3,x=this._annots(),S=a.find(b=>b.key===this._mapDrop),z=(b,M,v,L=!1,F=!1)=>n`
      <button class="mapx-tool ${L?"on":""}" title=${M} aria-label=${M} ?disabled=${F} @click=${v}><ha-icon icon=${b}></ha-icon></button>`,c=this._mapLabels==="off"?"mdi:label-off-outline":this._mapLabels==="all"?"mdi:label-multiple":"mdi:label-outline",u=b=>b.map(([M,v],L)=>`${L?"L":"M"}${(l.tx+M*l.size).toFixed(1)} ${(l.ty+v*l.size).toFixed(1)}`).join(" "),_=["#F43F5E","#FACC15","#22C55E","#38BDF8","#A855F7","#FFFFFF"],E=["\u{1F4CD}","\u2B50","\u{1F3AF}","\u26A0\uFE0F","\u{1F3E0}","\u{1F4B0}"],k=this._mapTool!=="pan";return n`
      <div class="mapx ${this._mapFull?"full":""}">
        ${this._mapFull?p:n`<div class="mapx-top">
          ${this._renderMapPicker()}
          <div class="mapx-meta">
            ${t.chapter&&t.season?n`<span>Chapter ${t.chapter} · Season ${t.season}</span>`:p}
            ${t.patch?n`<span>Update ${t.patch}</span>`:p}
            <span>${i.length} places${s.length?` \xB7 ${s.length} landmarks`:""}</span>
          </div>
        </div>`}

        <div class="mapx-frame ${this._mapFull?"fs":""} ${this._gesture?"dragging":""} tool-${this._mapTool}"
          @wheel=${b=>this._onMapWheel(b)}
          @pointerdown=${b=>this._onMapPointerDown(b)}
          @pointermove=${b=>this._onMapPointerMove(b)}
          @pointerup=${b=>this._onMapPointerUp(b)}
          @pointercancel=${b=>this._onMapPointerUp(b)}
          @dblclick=${b=>this._onMapDblClick(b)}>
          <!-- The image is laid out at its real on-screen size so the browser resamples it sharply -->
          <img class="mapx-img" src=${t.image} alt=${t.name||"Map"} draggable="false" decoding="async"
            style="left:${l.tx}px;top:${l.ty}px;width:${l.size}px;height:${l.size}px" @error=${C} />

          <svg class="mapx-ink" width=${l.w} height=${l.h} viewBox="0 0 ${l.w} ${l.h}">
            ${this._mapGrid?[...Array(11).keys()].map(b=>D`
                  <line x1=${l.tx+b*l.size/10} y1=${l.ty} x2=${l.tx+b*l.size/10} y2=${l.ty+l.size} class="gl" />
                  <line x1=${l.tx} y1=${l.ty+b*l.size/10} x2=${l.tx+l.size} y2=${l.ty+b*l.size/10} class="gl" />`):p}
            ${x.lines.map(b=>D`<path d=${u(b.points)} stroke=${b.color} class="ln" />`)}
            ${this._mapDrawing?D`<path d=${u(this._mapDrawing.points)} stroke=${this._mapDrawing.color} class="ln live" />`:p}
          </svg>

          ${this._mapGrid?[...Array(10).keys()].map(b=>n`
                <span class="mapx-gridlabel col" style="left:${l.tx+(b+.5)*l.size/10}px;top:${Math.max(4,l.ty+4)}px">${"ABCDEFGHIJ"[b]}</span>
                <span class="mapx-gridlabel row" style="left:${Math.max(4,l.tx+4)}px;top:${l.ty+(b+.5)*l.size/10}px">${b+1}</span>`):p}

          ${a.filter(b=>b.type==="named"||this._mapShowLandmarks||b.key===this._mapPoi).map(b=>{let M=h(b.left/100,b.top/100);if(M.x<-60||M.y<-30||M.x>l.w+60||M.y>l.h+30)return p;let v=b.key===this._mapPoi,L=b.key!==this._mapDrop&&(v||(b.type==="named"?d:f));return n`
                <button class="mapx-pin ${b.type} ${v?"on":""}" style="left:${M.x}px;top:${M.y}px"
                  title="${b.name} · ${b.grid}" aria-label="${b.name}, grid ${b.grid}"
                  @click=${F=>{F.stopPropagation(),this._mapPoi=v?null:b.key}}>
                  <i></i>${L?n`<b>${b.name}</b>`:p}
                </button>`})}

          ${x.marks.map(b=>{let M=h(b.x,b.y);return n`<span class="mapx-mark" style="left:${M.x}px;top:${M.y}px;--c:${b.color}"
              @click=${v=>{this._mapTool==="erase"&&(v.stopPropagation(),this._annotate(L=>({...L,marks:L.marks.filter(F=>F.id!==b.id)})))}}>${b.icon||"\u{1F4CD}"}</span>`})}

          ${S?(()=>{let b=h(S.left/100,S.top/100);return n`<div class="mapx-drop" style="left:${b.x}px;top:${b.y}px"><i></i><i></i><span>🪂</span><b>Drop: ${S.name}</b></div>`})():p}

          ${this._mapFull?n`<div class="mapx-ui mapx-float-top">
                ${this._renderMapPicker()}
                ${this._renderPlacePickers(i,s)}
              </div>
              ${this._renderPlaceInfo(t,a,!0)}`:p}

          <div class="mapx-ui mapx-tools">
            ${z(this._mapFull?"mdi:fullscreen-exit":"mdi:fullscreen",this._mapFull?"Exit full screen":"Full screen",()=>this._toggleMapFull())}
            <span class="mapx-sep"></span>
            ${z("mdi:grid","Grid",()=>this._mapGrid=!this._mapGrid,this._mapGrid)}
            ${z(c,`Labels: ${this._mapLabels==="auto"?"automatic":this._mapLabels}`,()=>{this._mapLabels=this._mapLabels==="auto"?"all":this._mapLabels==="all"?"off":"auto"},this._mapLabels!=="auto")}
            ${s.length?z("mdi:map-marker-star-outline","Landmarks",()=>this._mapShowLandmarks=!this._mapShowLandmarks,this._mapShowLandmarks):p}
            ${i.length?z("mdi:parachute-outline","Pick a drop spot for me",()=>this._randomDrop(a)):p}
            <span class="mapx-sep"></span>
            ${z("mdi:draw","Draw & pins",()=>this._mapTool=k?"pan":"draw",k)}
          </div>

          <div class="mapx-ui mapx-zoombar">
            ${z("mdi:plus","Zoom in",()=>this._zoomAt(1.6,void 0,void 0,!0),!1,o>=this._mapMaxZoom()-.01)}
            <span class="mapx-zoomval">${o.toFixed(1)}×</span>
            ${z("mdi:minus","Zoom out",()=>this._zoomAt(1/1.6,void 0,void 0,!0),!1,o<=1)}
            ${z("mdi:fit-to-screen-outline","Whole map",()=>this._resetMapView(),!1,o===1)}
          </div>

          ${k?n`<div class="mapx-ui mapx-drawbar">
                ${z("mdi:pencil","Pen",()=>this._mapTool="draw",this._mapTool==="draw")}
                ${z("mdi:map-marker-plus","Pin",()=>this._mapTool="marker",this._mapTool==="marker")}
                ${z("mdi:eraser","Eraser",()=>this._mapTool="erase",this._mapTool==="erase")}
                <span class="mapx-sep v"></span>
                ${_.map(b=>n`<button class="mapx-swatch ${this._mapColor===b?"on":""}" style="--c:${b}" title="Colour" @click=${()=>this._mapColor=b}></button>`)}
                ${this._mapTool==="marker"?n`<span class="mapx-sep v"></span>${E.map(b=>n`<button class="mapx-emoji ${this._mapIcon===b?"on":""}" @click=${()=>this._mapIcon=b}>${b}</button>`)}`:p}
                <span class="mapx-sep v"></span>
                ${z("mdi:undo","Undo (Ctrl+Z)",()=>this._undoNote(),!1,!this._undo.length)}
                ${z("mdi:redo","Redo (Ctrl+Shift+Z)",()=>this._redoNote(),!1,!this._redo.length)}
                ${z("mdi:delete-sweep-outline","Clear all",()=>this._annotate(()=>({marks:[],lines:[]})),!1,!x.marks.length&&!x.lines.length)}
                ${z("mdi:check","Done",()=>this._mapTool="pan")}
              </div>`:p}
        </div>

        ${this._mapFull?p:n`<div class="mapx-side">
              ${this._renderPlacePickers(i,s)}
              ${this._renderPlaceInfo(t,a,!1)}
            </div>`}
      </div>
    `}_spriteCurve(e){let t=[...e.level_curve||[]].filter(i=>typeof i.level=="number"&&typeof i.xp=="number").sort((i,s)=>i.level-s.level),a=[];for(let i of t){if(a.length&&i.xp<a[a.length-1][1])break;a.push([i.level,i.xp])}return a.length>=2?a:[]}_spriteLevel(e,t){if(typeof e!="number"||!t.length)return null;let a=0;t.forEach(([,l],h)=>{e>=l&&(a=h)});let[i]=t[a],s=t[t.length-1],o=t[a+1];return{level:i,maxLevel:s[0],maxXp:s[1],next:o?o[1]:null,toMax:Math.max(0,s[1]-e),atMax:a===t.length-1}}_spriteInfo(e,t){let a=e.variants||[],i=a.filter(h=>h.owned),s=a.filter(h=>h.mastered).length,o=null;for(let h of i){let m=this._spriteLevel(h.xp,t);m&&(!o||m.level>o.level)&&(o=m)}let l=i.reduce((h,m)=>h+Math.max(1,Number(m.count)||0),0);return{owned:i.length,total:a.length,mastered:s,best:o,copies:l}}_spriteName(e){return String(e.name||"").replace(/ Sprite$/,"")}_renderSpritesView(e){let t=e?.attributes||{},a=this._spriteCurve(t),i=t.families||[],s=Number(e?.state||0),o=Number(t.owned_variants||0),l=["Common","Uncommon","Rare","Epic","Legendary","Mythic"],h=i.filter(c=>c.mastered>0).length,d=[...i.filter(c=>this._spriteFilter==="missing"?!c.owned:this._spriteFilter==="unmastered"?c.owned&&!c.mastered:this._spriteFilter==="mastered"?c.mastered>0:this._spriteFilter==="new"?c.new||c.new_kinds>0:!0)].sort((c,u)=>this._spriteSort==="rarity"?l.indexOf(u.rarity)-l.indexOf(c.rarity)||(c.dex??0)-(u.dex??0):this._spriteSort==="progress"&&u.owned_variants/u.total_variants-c.owned_variants/c.total_variants||(c.dex??0)-(u.dex??0)),f=i.flatMap(c=>c.variants.filter(u=>!u.owned&&u.drop_chance_pct).map(u=>({f:c,v:u}))).sort((c,u)=>u.v.drop_chance_pct-c.v.drop_chance_pct||l.indexOf(c.f.rarity)-l.indexOf(u.f.rarity)).slice(0,6),x=a.length?i.flatMap(c=>c.variants.filter(u=>u.owned&&typeof u.xp=="number"&&u.xp>0).map(u=>({f:c,v:u,lv:this._spriteLevel(u.xp,a)}))).filter(c=>c.lv&&!c.lv.atMax).sort((c,u)=>c.lv.toMax-u.lv.toMax).slice(0,5):[],S=(c,u)=>n`
      <button class="mode-tab ${this._spriteFilter===c?"active":""}" @click=${()=>this._spriteFilter=c}>${u}</button>`,z=(c,u)=>n`
      <button class="mode-tab ${this._spriteSort===c?"active":""}" @click=${()=>this._spriteSort=c}>${u}</button>`;return n`
      ${t.new_sprites||t.new_kinds?n`<button class="sp-release ${this._spriteFilter==="new"?"on":""}" @click=${()=>this._spriteFilter=this._spriteFilter==="new"?"all":"new"}>
            <span class="sp-release-badge">✨ NEW</span>
            <span><b>Update ${t.version}</b> added ${[t.new_sprites?`${t.new_sprites} new sprite${t.new_sprites>1?"s":""}`:"",t.new_kinds?`${t.new_kinds} new kind${t.new_kinds>1?"s":""}`:""].filter(Boolean).join(" and ")}</span>
            <small>${this._spriteFilter==="new"?"Show all":"Show them"}</small>
          </button>`:p}
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100,s)}"><span>${Math.round(s)}%</span></div>
        <div class="sp-stat">
          <b>${t.owned_families??0}<small>/${t.total_families??i.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${h}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${o}<small>/${t.total_variants??0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${x.length?n`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${x.map(({f:c,v:u,lv:_})=>n`
                <div class="master-row" style="--rarity:${T[c.rarity]||"#9CA3AF"}" @click=${()=>this._expandedSprite=c.id}>
                  ${u.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(u.icon,128)} alt="" @error=${C} />`:p}
                  <span class="variant-name">${u.label==="Base"?this._spriteName(c):`${u.label} ${this._spriteName(c)}`}</span>
                  <span class="sp-level-pill">Level ${_.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,u.xp/_.maxXp*100)}%"></div></div>
                  <span class="muted">${this._num(_.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`:p}

      ${f.length?n`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${f.map(({f:c,v:u})=>n`
                <div class="hunt-item" style="--rarity:${T[c.rarity]||"#9CA3AF"}" title="${u.name}" @click=${()=>this._expandedSprite=c.id}>
                  ${u.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(u.icon,128)} alt="" @error=${C} />`:p}
                  <span>${u.label==="Base"?this._spriteName(c):`${u.label} ${this._spriteName(c)}`}</span>
                  <small>${u.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`:p}

      <div class="tab-rows">
        <div class="mode-tabs">${S("all","All")} ${S("mastered","\u2B50 Mastered")} ${S("unmastered","Not mastered")} ${S("missing","Not found")} ${t.new_sprites||t.new_kinds?S("new","\u2728 New"):p}</div>
        <div class="mode-tabs">${z("dex","Number")} ${z("rarity","Rarity")} ${z("progress","Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${d.length?d.map(c=>{let u=this._spriteInfo(c,a),_=u.mastered?n`<span class="sp-status gold">⭐ Mastered</span>`:c.owned?n`<span class="sp-status">Not mastered</span>`:n`<span class="sp-status dim">Not found yet</span>`,E=c.owned?n`<span class="sp-have">Have ${u.copies}${u.best?n` · <span class=${u.best.atMax?"sp-max":""} title=${u.best.atMax?"Top level":""}>Lv ${u.best.level}</span>`:p}</span>`:p;return n`
                <div class="sp-card ${c.owned?"":"missing"} ${u.mastered?"mastered":""} ${c.new?"is-new":""}"
                  style="--rarity:${T[c.rarity]||"#9CA3AF"}" role="button" tabindex="0"
                  @click=${()=>this._expandedSprite=c.id}
                  @keydown=${k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),this._expandedSprite=c.id)}}>
                  <div class="sp-img">
                    ${c.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(c.icon,160)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${u.mastered?n`<span class="sp-badge star" title="Mastered">⭐</span>`:p}
                    ${c.owned?p:n`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                    ${c.new?n`<span class="sp-badge new" title="New this update">NEW</span>`:c.new_kinds?n`<span class="sp-newdot" title="${c.new_kinds} new kind${c.new_kinds>1?"s":""} this update"></span>`:p}
                  </div>
                  <span class="sp-name">${this._spriteName(c)}</span>
                  ${_}
                  ${E}
                  <div class="sp-kinds" title="${u.owned} of ${u.total} kinds">
                    ${(c.variants||[]).map(k=>n`
                      <span class="sp-kind ${k.owned?"owned":""} ${k.mastered?"mastered":""} ${k.new&&!c.new?"new":""}" title="${k.label}${k.new?" \xB7 new this update":""}${k.owned?"":" (not found yet)"}">
                        ${k.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(k.icon,64)} alt="" @error=${C} />`:p}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${u.owned} of ${u.total} kinds</span>
                </div>`}):n`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${this._expandedSprite?this._renderSpriteSheet(i,d):p}

      ${(t.versions||[]).length>1?n`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${t.versions.map(c=>n`
              <div class="version-row ${c.current?"current":""}">
                <span>${c.current?"This season":c.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,c.completion_pct)}%"></div></div>
                <span>${c.owned_variants}/${c.total_variants}</span>
              </div>`)}
          </div>`:p}
    `}_renderSpriteSheet(e,t){let a=t.some(l=>l.id===this._expandedSprite)?t:e,i=a.findIndex(l=>l.id===this._expandedSprite),s=a[i];if(!s)return p;let o=l=>this._expandedSprite=a[(i+l+a.length)%a.length].id;return n`
      <dialog class="sp-sheet" style="--rarity:${T[s.rarity]||"#9CA3AF"}"
        @close=${()=>this._expandedSprite=null}
        @click=${l=>{l.target===l.currentTarget&&l.currentTarget.close()}}
        @keydown=${l=>{l.key==="ArrowRight"&&o(1),l.key==="ArrowLeft"&&o(-1)}}>
        <div class="sp-sheet-body">
          <div class="sp-sheet-nav">
            <button class="bp-nav" title="Previous sprite" @click=${()=>o(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <span>${i+1} of ${a.length}</span>
            <button class="bp-nav" title="Next sprite" @click=${()=>o(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            <button class="bp-nav close" title="Close" @click=${l=>l.currentTarget.closest("dialog")?.close()}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>
          ${this._renderSpriteDetail(s)}
        </div>
      </dialog>`}_renderSpriteDetail(e){let t=this._spriteCurve(this._findEntity("sensor","sprites")?.attributes||{}),a=e.name;return n`
      <div class="sprite-detail sp-detail" style="--rarity:${T[e.rarity]||"#9CA3AF"}">
        <div class="sprite-detail-head">
          ${e.icon_large||e.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(e.icon_large||e.icon,256)} alt="" @error=${C} />`:p}
          <div>
            <b>${e.name}</b> <span class="tag rarity-tag">${e.rarity||""}</span>
            ${e.new?n`<span class="sp-chip new">✨ New this update</span>`:e.added_in?n`<span class="sp-chip dim">Added in update ${e.added_in}</span>`:p}
            ${e.description?n`<p class="detail-desc">${e.description}</p>`:p}
            ${e.hint?n`<p class="detail-desc hint">📍 ${e.hint}</p>`:p}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(e.variants||[]).map(i=>{let s=i.owned?this._spriteLevel(i.xp,t):null,o=(i.boons||[]).find(h=>h.name&&h.name!==a),l=Math.max(1,Number(i.count)||0);return n`
              <div class="sp-kind-row ${i.owned?"":"missing"} ${i.mastered?"mastered":""}">
                <div class="sp-kind-icon">
                  ${i.icon?n`<img @load=${A} decoding="async" loading="lazy" class="fi" src=${P(i.icon,128)} alt="" @error=${C} />`:n`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${i.owned?p:n`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>`}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${i.label}</b>
                    ${i.new&&!e.new?n`<span class="sp-chip new">✨ New kind</span>`:p}
                    ${i.mastered?n`<span class="sp-chip gold">⭐ Mastered</span>`:p}
                    ${i.owned?n`<span class="sp-chip">You have ${l}</span>`:n`<span class="sp-chip dim">Not found yet</span>`}
                    ${s?n`<span class="sp-chip">Level ${s.level}${s.atMax?" \xB7 max":""}</span>`:p}
                    ${!i.owned&&i.drop_chance_pct!=null?n`<span class="sp-chip dim">${i.drop_chance_pct}% chance</span>`:p}
                  </div>
                  ${s&&!s.atMax&&s.next?n`<div class="sp-xp">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100,i.xp/s.next*100)}%"></div></div>
                        <span>${this._num(i.xp)} / ${this._num(s.next)} XP to level ${s.level+1}</span>
                      </div>`:p}
                  ${o?n`<div class="sp-perk">✨ ${o.description||o.name}</div>`:p}
                </div>
              </div>`})}
        </div>
      </div>
    `}_renderWindowMatches(e,t,a){let i=`window:${e}:${a.since}:${a.matches}`;this._ensureMatches(i,{since:a.since});let s=this._matchLists[i],o=s?.matches||[],l=s?.tracked??0,h=a.matches||0;return n`
      <div class="match-feed-header">
        <span>${t} matches (${l}${h>l?` of ${h}`:""})</span>

      </div>
      ${s?.loading?n`<div class="empty">Loading matches…</div>`:this._renderMatchList(i,o,n`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
    `}_renderFavourite(e,t){let a=this._playlist(e.playlist_id),i=a?.image,s=/ropesmile|reload/i.test(e.playlist_id+e.name)?"reload":/nobuild|zero build/i.test(e.playlist_id+e.name)?"zero_build":"build";return n`
      <div class="feature-card ${i?"":`no-art art-${s}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${t?` \xB7 ${t}`:""}</span>
          <span class="feature-value">${a?.name||e.name}</span>
          <span class="feature-sub">${this._num(e.matches)} matches</span>
        </div>
        ${i?n`<img @load=${A} decoding="async" loading="lazy" class="fi feature-art" src=${P(i,384)} alt="" @error=${C} />`:n`<ha-icon class="feature-icon" icon=${Mt[s]}></ha-icon>`}
      </div>
    `}_renderLifetimeExtras(e){let t=e.metrics||{},a=Object.values(e.inputs||{}).filter(s=>s.share_pct>=1),i=e.team_sizes||{};return n`
      <div class="secondary">
        ${this._renderKpis([["Kills/Min",t.kills_per_minute??0],["Avg Match",`${t.avg_match_minutes??0}m`],["Score/Match",this._num(t.score_per_match)],["Solo Top 10",`${t.solo_top10_rate??0}%`],["Solo Top 25",`${t.solo_top25_rate??0}%`]])}
      </div>

      ${a.length>1?n`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${a.map((s,o)=>n`<div class="split-seg seg-${o}" style="width: ${s.share_pct}%" title="${s.label}: ${s.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${a.map((s,o)=>n`<span><i class="dot seg-${o}"></i>${s.label} ${s.share_pct}% · K/D ${s.kd}</span>`)}
            </div>
          </div>`:p}

      ${Object.keys(i).length?n`<div class="size-table">
            ${["solo","duo","trio","squad"].filter(s=>i[s]).map(s=>n`<div class="size-row">
                <span class="size-name">${s.charAt(0).toUpperCase()+s.slice(1)}</span>
                <span>${this._num(i[s].matches)} m</span>
                <span>${i[s].win_rate}% win</span>
                <span>${i[s].kd} K/D</span>
              </div>`)}
          </div>`:p}
    `}_defaultFilters(){let e=this._config.events_region||this._events.defaultRegion||"EU";return{region:e==="all"?[]:[e],type:[],mode:[],team:[],platform:[]}}_currentFilters(){return this._filters||this._defaultFilters()}_matchesFilters(e,t){return!(t.region.length&&!t.region.includes(e.region_group)||t.type.length&&!t.type.includes(e.tournament_type)||t.mode.length&&!t.mode.some(a=>a==="Ranked"?e.ranked:e.mode===a)||t.team.length&&!t.team.includes(e.team)||t.platform.length&&!t.platform.some(a=>(e.platform_groups||[]).includes(a)))}_toggleFilter(e,t){let a=this._currentFilters(),i=a[e].includes(t)?a[e].filter(s=>s!==t):[...a[e],t];this._filters={...a,[e]:i}}_renderEventsView(){let e=this._events;if(e.loading&&!e.list)return n`<div class="empty">Loading tournaments…</div>`;if(e.error)return n`<div class="empty">${e.error}</div>`;if(e.list===null)return n`<div class="empty">Tournaments will show here soon.</div>`;let t=e.list||[],a=this._currentFilters(),i=[...new Set(t.map(d=>d.region_group))].sort(),s=t.filter(d=>this._matchesFilters(d,a)).filter(d=>d.windows.some(f=>this._windowState(f)!=="finished")||this._expandedEvent===d.key),o=[["region","Region",i.map(d=>[d,d])],["type","Type",[...new Set(t.map(d=>d.tournament_type).filter(Boolean))].map(d=>[d,et[d]||d])],["mode","Mode",[["Battle Royale","Battle Royale"],["Zero Build","Zero Build"],["Reload","Reload"],["Ranked","Ranked"]]],["team","Team",[["Solo","Solo"],["Duos","Duos"],["Trios","Trios"],["Squads","Squads"]]],["platform","Platform",[["PC","PC"],["Console","Console"],["Mobile","Mobile"]]]],l=(d,f)=>o.find(x=>x[0]===d)?.[2].find(x=>x[0]===f)?.[1]||f,h=o.flatMap(([d])=>a[d].map(f=>[d,f])),m=JSON.stringify(a)!==JSON.stringify(this._defaultFilters());return n`
      <div class="filter-bar">
        <button class="filter-toggle ${this._filtersOpen?"open":""}" @click=${()=>this._filtersOpen=!this._filtersOpen}>
          <ha-icon icon="mdi:filter-variant"></ha-icon><span>Filters</span>${h.length?n`<b>${h.length}</b>`:p}
        </button>
        <div class="filter-active">
          ${h.length?h.map(([d,f])=>n`<button class="fchip on" title="Remove" @click=${()=>this._toggleFilter(d,f)}>${l(d,f)} ✕</button>`):n`<span class="muted">All tournaments</span>`}
        </div>
        ${m?n`<button class="filter-reset" @click=${()=>this._filters=null} title="Reset filters"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button>`:p}
      </div>
      ${this._filtersOpen?n`<div class="filter-panel">
            ${o.map(([d,f,x])=>x.length?n`<div class="fgroup"><span>${f}</span><div>
                  ${x.map(([S,z])=>n`<button class="fchip ${a[d].includes(S)?"on":""}" @click=${()=>this._toggleFilter(d,S)}>${z}</button>`)}
                </div></div>`:p)}
          </div>`:p}
      <div class="match-feed-header">
        <span>Tournaments (${s.length})</span>
        <span class="muted">UK time</span>
      </div>
      <div class="match-list events">
        ${s.length?s.map(d=>this._renderEvent(d)):n`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `}_eventTiming(e){let t=e.windows.find(o=>this._windowState(o)==="live");if(t)return{text:`Live now \xB7 ends in ${this._formatSpan(Date.parse(t.end)-this._now)}`,live:!0,soon:!1};let a=e.windows.find(o=>this._windowState(o)==="upcoming");if(!a)return{text:"Finished",live:!1,soon:!1};let i=Date.parse(a.begin)-this._now,s=i<7*864e5;return{text:`${this._formatWhen(a.begin)}${a.label?` \xB7 ${a.label}`:""}${s?` \xB7 in ${this._formatSpan(i)}`:""}`,live:!1,soon:s}}_renderEvent(e){let t=this._eventTiming(e),a=this._expandedEvent===e.key,i=e.tournament_type?et[e.tournament_type]||e.tournament_type:null,s=[e.mode,e.team,e.ranked&&e.tournament_type!=="RankedCup"?"Ranked":null,...e.platform_groups||[],e.region].filter(Boolean);return n`
      <div class="event-card ${t.live?"live":""} ${a?"expanded":""} ${e.tournament_type==="FNCS"?"featured":""}">
        <div class="event-row" @click=${()=>this._toggleEvent(e)}>
          ${e.poster?n`<img @load=${A} decoding="async" class="fi event-art" src=${P(e.poster,128)} alt="" loading="lazy" @error=${C} />`:p}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${t.live?n`<span class="placement-badge win">LIVE</span>`:p}
            </div>
            <span class="match-mode ${t.soon?"soon":""}">${t.text}</span>
            <div class="tag-row">
              ${i?n`<span class="tag type-tag ${e.tournament_type==="FNCS"?"fncs":""}">${i}</span>`:p}
              ${e.can_spectate?n`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>`:p}
              ${s.map(o=>n`<span class="tag">${o}</span>`)}
            </div>
          </div>
          <ha-icon class="chevron" icon=${a?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${a?this._renderEventDetails(e):p}
      </div>
    `}_renderEventDetails(e){let t=e.loading_screen||e.poster;return n`
      <div class="event-details">
        ${t?n`<img @load=${A} decoding="async" loading="lazy" class="fi event-hero" src=${P(t,720)} alt="" @error=${C} />`:p}
        ${e.subtitle&&e.subtitle!==e.name?n`<div class="detail-sub">${e.subtitle}</div>`:p}
        ${e.description?n`<p class="detail-desc">${e.description}</p>`:p}
        ${e.schedule_info?n`<p class="detail-desc muted">${e.schedule_info}</p>`:p}
        ${e.platform_groups?.length?n`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>`:p}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>
        ${e.min_account_level?n`<div class="detail-line"><span>Minimum account level</span><b>${e.min_account_level}</b></div>`:p}
        ${e.tournament_type==="FNCS"?n`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`:p}

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map(a=>{let i=this._windowState(a),s=`${e.event_id}|${a.window_id}`,o=this._leaderboards[s],l=Date.parse(a.begin)-this._now;return n`
              <div class="window-row ${i}">
                <div class="window-main">
                  <span class="window-label">${a.label||"Session"}</span>
                  <span class="window-time">${this._formatWhen(a.begin)} – ${this._formatWhen(a.end).split(", ").pop()}</span>
                  <span class="window-status ${i}">
                    ${i==="live"?`Live \xB7 ${this._formatSpan(Date.parse(a.end)-this._now)} left`:i==="finished"?"Finished":l<7*864e5?`in ${this._formatSpan(l)}`:"Upcoming"}
                  </span>
                  ${i!=="upcoming"?n`<button class="mini-button" @click=${()=>this._loadLeaderboard(e.event_id,a.window_id)}>
                        ${o?.loading?"Loading\u2026":o?.data?"Refresh":"Leaderboard"}
                      </button>`:p}
                </div>
                ${o?this._renderLeaderboard(o):p}
              </div>
            `})}
        </div>
      </div>
    `}_renderLeaderboard(e){if(e.error)return n`<div class="lb-note">${e.error}</div>`;if(!e.data)return e.loading?n`<div class="lb-note">Loading leaderboard…</div>`:p;let t=e.data,a=(i,s=!1)=>n`
      <div class="lb-row ${s?"you":""}">
        <span class="lb-rank">#${this._num(i.rank)}</span>
        <span class="lb-names">${s?"You \xB7 ":""}${(i.names||[]).join(", ")||"\u2014"}</span>
        <span class="lb-points">${this._num(i.points)} pts</span>
        <span class="lb-extra">${i.matches}m · ${i.wins}W · ${i.elims}E</span>
      </div>
    `;return n`
      <div class="leaderboard">
        ${t.player&&!t.entries.some(i=>i.is_player)?a(t.player,!0):p}
        ${t.entries.length?t.entries.map(i=>a(i,i.is_player)):n`<div class="lb-note">No scores yet.</div>`}
        ${t.updated?n`<div class="lb-note">Updated ${this._formatRelativeTime(t.updated)}${t.total_pages?` \xB7 ${t.total_pages} pages`:""}</div>`:p}
      </div>
    `}};y([j({attribute:!1})],$.prototype,"hass",2),y([w()],$.prototype,"_config",2),y([w()],$.prototype,"_view",2),y([w()],$.prototype,"_window",2),y([w()],$.prototype,"_selectedMode",2),y([w()],$.prototype,"_loadingAction",2),y([w()],$.prototype,"_catalog",2),y([w()],$.prototype,"_avatar",2),y([w()],$.prototype,"_events",2),y([w()],$.prototype,"_filters",2),y([w()],$.prototype,"_expandedEvent",2),y([w()],$.prototype,"_expandedMatch",2),y([w()],$.prototype,"_leaderboards",2),y([w()],$.prototype,"_now",2),y([w()],$.prototype,"_matchLists",2),y([w()],$.prototype,"_showAllMatches",2),y([w()],$.prototype,"_expandedSprite",2),y([w()],$.prototype,"_spriteFilter",2),y([w()],$.prototype,"_spriteSort",2),y([w()],$.prototype,"_trends",2),y([w()],$.prototype,"_pass",2),y([w()],$.prototype,"_passSet",2),y([w()],$.prototype,"_passPage",2),y([w()],$.prototype,"_outfits",2),y([w()],$.prototype,"_outfitQuery",2),y([w()],$.prototype,"_outfitSort",2),y([w()],$.prototype,"_outfitPage",2),y([w()],$.prototype,"_selectedOutfit",2),y([w()],$.prototype,"_lockerFilter",2),y([w()],$.prototype,"_shop",2),y([w()],$.prototype,"_shopTab",2),y([w()],$.prototype,"_shopQuery",2),y([w()],$.prototype,"_shopLimit",2),y([w()],$.prototype,"_shopSection",2),y([w()],$.prototype,"_shopKind",2),y([w()],$.prototype,"_searchQuery",2),y([w()],$.prototype,"_searchType",2),y([w()],$.prototype,"_searchResults",2),y([w()],$.prototype,"_searchLoading",2),y([w()],$.prototype,"_news",2),y([w()],$.prototype,"_maps",2),y([w()],$.prototype,"_mapMode",2),y([w()],$.prototype,"_mapPoi",2),y([w()],$.prototype,"_mapZoom",2),y([w()],$.prototype,"_mapCenter",2),y([w()],$.prototype,"_mapBox",2),y([w()],$.prototype,"_mapTool",2),y([w()],$.prototype,"_mapColor",2),y([w()],$.prototype,"_mapIcon",2),y([w()],$.prototype,"_mapDrawing",2),y([w()],$.prototype,"_notes",2),y([w()],$.prototype,"_undo",2),y([w()],$.prototype,"_redo",2),y([w()],$.prototype,"_mapFull",2),y([w()],$.prototype,"_mapGrid",2),y([w()],$.prototype,"_mapLabels",2),y([w()],$.prototype,"_mapShowLandmarks",2),y([w()],$.prototype,"_mapMenu",2),y([w()],$.prototype,"_mapQuery",2),y([w()],$.prototype,"_mapSort",2),y([w()],$.prototype,"_mapDrop",2),y([w()],$.prototype,"_gesture",2),y([w()],$.prototype,"_filtersOpen",2);customElements.get("fortnite-activity-card")||customElements.define("fortnite-activity-card",$);console.info(`%c FORTNITE-ACTIVITY-CARD %c v${kt} `,"background:#7928CA;color:#fff;font-weight:700","background:#00E5FF;color:#000");export{$ as FortniteActivityCard};
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
