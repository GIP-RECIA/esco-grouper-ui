(function(){var D=this,V,N=D.jQuery,M=D.$,I=D.jQuery=D.$=function(e,f){return new I.fn.init(e,f)
},O=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,U=/^.[^:#\[\.,]*$/;
I.fn=I.prototype={init:function(g,e){g=g||document;
if(g.nodeType){this[0]=g;
this.length=1;
this.context=g;
return this
}if(typeof g==="string"){var i=O.exec(g);
if(i&&(i[1]||!e)){if(i[1]){g=I.clean([i[1]],e)
}else{var f=document.getElementById(i[3]);
if(f&&f.id!=i[3]){return I().find(g)
}var h=I(f||[]);
h.context=document;
h.selector=g;
return h
}}else{return I(e).find(g)
}}else{if(I.isFunction(g)){return I(document).ready(g)
}}if(g.selector&&g.context){this.selector=g.selector;
this.context=g.context
}return this.setArray(I.isArray(g)?g:I.makeArray(g))
},selector:"",jquery:"1.3.2",size:function(){return this.length
},get:function(e){return e===V?Array.prototype.slice.call(this):this[e]
},pushStack:function(h,f,g){var e=I(h);
e.prevObject=this;
e.context=this.context;
if(f==="find"){e.selector=this.selector+(this.selector?" ":"")+g
}else{if(f){e.selector=this.selector+"."+f+"("+g+")"
}}return e
},setArray:function(e){this.length=0;
Array.prototype.push.apply(this,e);
return this
},each:function(f,e){return I.each(this,f,e)
},index:function(e){return I.inArray(e&&e.jquery?e[0]:e,this)
},attr:function(h,f,e){var g=h;
if(typeof h==="string"){if(f===V){return this[0]&&I[e||"attr"](this[0],h)
}else{g={};
g[h]=f
}}return this.each(function(i){for(h in g){I.attr(e?this.style:this,h,I.prop(this,g[h],e,i,h))
}})
},css:function(e,f){if((e=="width"||e=="height")&&parseFloat(f)<0){f=V
}return this.attr(e,f,"curCSS")
},text:function(f){if(typeof f!=="object"&&f!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(f))
}var e="";
I.each(f||this,function(){I.each(this.childNodes,function(){if(this.nodeType!=8){e+=this.nodeType!=1?this.nodeValue:I.fn.text([this])
}})
});
return e
},wrapAll:function(e){if(this[0]){var f=I(e,this[0].ownerDocument).clone();
if(this[0].parentNode){f.insertBefore(this[0])
}f.map(function(){var g=this;
while(g.firstChild){g=g.firstChild
}return g
}).append(this)
}return this
},wrapInner:function(e){return this.each(function(){I(this).contents().wrapAll(e)
})
},wrap:function(e){return this.each(function(){I(this).wrapAll(e)
})
},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.insertBefore(e,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this)
})
},after:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this.nextSibling)
})
},end:function(){return this.prevObject||I([])
},push:[].push,sort:[].sort,splice:[].splice,find:function(e){if(this.length===1){var f=this.pushStack([],"find",e);
f.length=0;
I.find(e,this[0],f);
return f
}else{return this.pushStack(I.unique(I.map(this,function(g){return I.find(e,g)
})),"find",e)
}},clone:function(e){var g=this.map(function(){if(!I.support.noCloneEvent&&!I.isXMLDoc(this)){var i=this.outerHTML;
if(!i){var j=this.ownerDocument.createElement("div");
j.appendChild(this.cloneNode(true));
i=j.innerHTML
}return I.clean([i.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]
}else{return this.cloneNode(true)
}});
if(e===true){var f=this.find("*").andSelf(),h=0;
g.find("*").andSelf().each(function(){if(this.nodeName!==f[h].nodeName){return 
}var i=I.data(f[h],"events");
for(var k in i){for(var j in i[k]){I.event.add(this,k,i[k][j],i[k][j].data)
}}h++
})
}return g
},filter:function(e){return this.pushStack(I.isFunction(e)&&I.grep(this,function(g,f){return e.call(g,f)
})||I.multiFilter(e,I.grep(this,function(f){return f.nodeType===1
})),"filter",e)
},closest:function(g){var f=I.expr.match.POS.test(g)?I(g):null,e=0;
return this.map(function(){var h=this;
while(h&&h.ownerDocument){if(f?f.index(h)>-1:I(h).is(g)){I.data(h,"closest",e);
return h
}h=h.parentNode;
e++
}})
},not:function(e){if(typeof e==="string"){if(U.test(e)){return this.pushStack(I.multiFilter(e,this,true),"not",e)
}else{e=I.multiFilter(e,this)
}}var f=e.length&&e[e.length-1]!==V&&!e.nodeType;
return this.filter(function(){return f?I.inArray(this,e)<0:this!=e
})
},add:function(e){return this.pushStack(I.unique(I.merge(this.get(),typeof e==="string"?I(e):I.makeArray(e))))
},is:function(e){return !!e&&I.multiFilter(e,this).length>0
},hasClass:function(e){return !!e&&this.is("."+e)
},val:function(j){if(j===V){var m=this[0];
if(m){if(I.nodeName(m,"option")){return(m.attributes.value||{}).specified?m.value:m.text
}if(I.nodeName(m,"select")){var h=m.selectedIndex,k=[],l=m.options,g=m.type=="select-one";
if(h<0){return null
}for(var e=g?h:0,i=g?h+1:l.length;
e<i;
e++){var f=l[e];
if(f.selected){j=I(f).val();
if(g){return j
}k.push(j)
}}return k
}return(m.value||"").replace(/\r/g,"")
}return V
}if(typeof j==="number"){j+=""
}return this.each(function(){if(this.nodeType!=1){return 
}if(I.isArray(j)&&/radio|checkbox/.test(this.type)){this.checked=(I.inArray(this.value,j)>=0||I.inArray(this.name,j)>=0)
}else{if(I.nodeName(this,"select")){var n=I.makeArray(j);
I("option",this).each(function(){this.selected=(I.inArray(this.value,n)>=0||I.inArray(this.text,n)>=0)
});
if(!n.length){this.selectedIndex=-1
}}else{this.value=j
}}})
},html:function(e){return e===V?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(e)
},replaceWith:function(e){return this.after(e).remove()
},eq:function(e){return this.slice(e,+e+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))
},map:function(e){return this.pushStack(I.map(this,function(g,f){return e.call(g,f,g)
}))
},andSelf:function(){return this.add(this.prevObject)
},domManip:function(i,l,k){if(this[0]){var h=(this[0].ownerDocument||this[0]).createDocumentFragment(),e=I.clean(i,(this[0].ownerDocument||this[0]),h),g=h.firstChild;
if(g){for(var f=0,m=this.length;
f<m;
f++){k.call(j(this[f],g),this.length>1||f>0?h.cloneNode(true):h)
}}if(e){I.each(e,P)
}}return this;
function j(n,o){return l&&I.nodeName(n,"table")&&I.nodeName(o,"tr")?(n.getElementsByTagName("tbody")[0]||n.appendChild(n.ownerDocument.createElement("tbody"))):n
}}};
I.fn.init.prototype=I.fn;
function P(e,f){if(f.src){I.ajax({url:f.src,async:false,dataType:"script"})
}else{I.globalEval(f.text||f.textContent||f.innerHTML||"")
}if(f.parentNode){f.parentNode.removeChild(f)
}}function S(){return +new Date
}I.extend=I.fn.extend=function(){var l=arguments[0]||{},j=1,k=arguments.length,g=false,i;
if(typeof l==="boolean"){g=l;
l=arguments[1]||{};
j=2
}if(typeof l!=="object"&&!I.isFunction(l)){l={}
}if(k==j){l=this;
--j
}for(;
j<k;
j++){if((i=arguments[j])!=null){for(var h in i){var e=l[h],f=i[h];
if(l===f){continue
}if(g&&f&&typeof f==="object"&&!f.nodeType){l[h]=I.extend(g,e||(f.length!=null?[]:{}),f)
}else{if(f!==V){l[h]=f
}}}}}return l
};
var W=/z-?index|font-?weight|opacity|zoom|line-?height/i,Q=document.defaultView||{},Y=Object.prototype.toString;
I.extend({noConflict:function(e){D.$=M;
if(e){D.jQuery=N
}return I
},isFunction:function(e){return Y.call(e)==="[object Function]"
},isArray:function(e){return Y.call(e)==="[object Array]"
},isXMLDoc:function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&I.isXMLDoc(e.ownerDocument)
},globalEval:function(f){if(f&&/\S/.test(f)){var e=document.getElementsByTagName("head")[0]||document.documentElement,g=document.createElement("script");
g.type="text/javascript";
if(I.support.scriptEval){g.appendChild(document.createTextNode(f))
}else{g.text=f
}e.insertBefore(g,e.firstChild);
e.removeChild(g)
}},nodeName:function(f,e){return f.nodeName&&f.nodeName.toUpperCase()==e.toUpperCase()
},each:function(i,f,h){var g,j=0,k=i.length;
if(h){if(k===V){for(g in i){if(f.apply(i[g],h)===false){break
}}}else{for(;
j<k;
){if(f.apply(i[j++],h)===false){break
}}}}else{if(k===V){for(g in i){if(f.call(i[g],g,i[g])===false){break
}}}else{for(var e=i[0];
j<k&&f.call(e,j,e)!==false;
e=i[++j]){}}}return i
},prop:function(e,f,i,h,g){if(I.isFunction(f)){f=f.call(e,h)
}return typeof f==="number"&&i=="curCSS"&&!W.test(g)?f+"px":f
},className:{add:function(e,f){I.each((f||"").split(/\s+/),function(g,h){if(e.nodeType==1&&!I.className.has(e.className,h)){e.className+=(e.className?" ":"")+h
}})
},remove:function(e,f){if(e.nodeType==1){e.className=f!==V?I.grep(e.className.split(/\s+/),function(g){return !I.className.has(f,g)
}).join(" "):""
}},has:function(f,e){return f&&I.inArray(e,(f.className||f).toString().split(/\s+/))>-1
}},swap:function(e,i,f){var g={};
for(var h in i){g[h]=e.style[h];
e.style[h]=i[h]
}f.call(e);
for(var h in i){e.style[h]=g[h]
}},css:function(j,h,l,g){if(h=="width"||h=="height"){var f,i={position:"absolute",visibility:"hidden",display:"block"},e=h=="width"?["Left","Right"]:["Top","Bottom"];
function k(){f=h=="width"?j.offsetWidth:j.offsetHeight;
if(g==="border"){return 
}I.each(e,function(){if(!g){f-=parseFloat(I.curCSS(j,"padding"+this,true))||0
}if(g==="margin"){f+=parseFloat(I.curCSS(j,"margin"+this,true))||0
}else{f-=parseFloat(I.curCSS(j,"border"+this+"Width",true))||0
}})
}if(j.offsetWidth!==0){k()
}else{I.swap(j,i,k)
}return Math.max(0,Math.round(f))
}return I.curCSS(j,h,l)
},curCSS:function(h,e,f){var k,m=h.style;
if(e=="opacity"&&!I.support.opacity){k=I.attr(m,"opacity");
return k==""?"1":k
}if(e.match(/float/i)){e=J
}if(!f&&m&&m[e]){k=m[e]
}else{if(Q.getComputedStyle){if(e.match(/float/i)){e="float"
}e=e.replace(/([A-Z])/g,"-$1").toLowerCase();
var l=Q.getComputedStyle(h,null);
if(l){k=l.getPropertyValue(e)
}if(e=="opacity"&&k==""){k="1"
}}else{if(h.currentStyle){var i=e.replace(/\-(\w)/g,function(n,o){return o.toUpperCase()
});
k=h.currentStyle[e]||h.currentStyle[i];
if(!/^\d+(px)?$/i.test(k)&&/^\d/.test(k)){var g=m.left,j=h.runtimeStyle.left;
h.runtimeStyle.left=h.currentStyle.left;
m.left=k||0;
k=m.pixelLeft+"px";
m.left=g;
h.runtimeStyle.left=j
}}}}return k
},clean:function(h,e,k){e=e||document;
if(typeof e.createElement==="undefined"){e=e.ownerDocument||e[0]&&e[0].ownerDocument||document
}if(!k&&h.length===1&&typeof h[0]==="string"){var j=/^<(\w+)\s*\/?>$/.exec(h[0]);
if(j){return[e.createElement(j[1])]
}}var i=[],g=[],f=e.createElement("div");
I.each(h,function(p,s){if(typeof s==="number"){s+=""
}if(!s){return 
}if(typeof s==="string"){s=s.replace(/(<(\w+)[^>]*?)\/>/g,function(u,v,t){return t.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?u:v+"></"+t+">"
});
var o=s.replace(/^\s+/,"").substring(0,10).toLowerCase();
var q=!o.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!o.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||o.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!o.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!o.indexOf("<td")||!o.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!o.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!I.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
f.innerHTML=q[1]+s+q[2];
while(q[0]--){f=f.lastChild
}if(!I.support.tbody){var r=/<tbody/i.test(s),n=!o.indexOf("<table")&&!r?f.firstChild&&f.firstChild.childNodes:q[1]=="<table>"&&!r?f.childNodes:[];
for(var m=n.length-1;
m>=0;
--m){if(I.nodeName(n[m],"tbody")&&!n[m].childNodes.length){n[m].parentNode.removeChild(n[m])
}}}if(!I.support.leadingWhitespace&&/^\s/.test(s)){f.insertBefore(e.createTextNode(s.match(/^\s*/)[0]),f.firstChild)
}s=I.makeArray(f.childNodes)
}if(s.nodeType){i.push(s)
}else{i=I.merge(i,s)
}});
if(k){for(var l=0;
i[l];
l++){if(I.nodeName(i[l],"script")&&(!i[l].type||i[l].type.toLowerCase()==="text/javascript")){g.push(i[l].parentNode?i[l].parentNode.removeChild(i[l]):i[l])
}else{if(i[l].nodeType===1){i.splice.apply(i,[l+1,0].concat(I.makeArray(i[l].getElementsByTagName("script"))))
}k.appendChild(i[l])
}}return g
}return i
},attr:function(l,i,e){if(!l||l.nodeType==3||l.nodeType==8){return V
}var j=!I.isXMLDoc(l),f=e!==V;
i=j&&I.props[i]||i;
if(l.tagName){var h=/href|src|style/.test(i);
if(i=="selected"&&l.parentNode){l.parentNode.selectedIndex
}if(i in l&&j&&!h){if(f){if(i=="type"&&I.nodeName(l,"input")&&l.parentNode){throw"type property can't be changed"
}l[i]=e
}if(I.nodeName(l,"form")&&l.getAttributeNode(i)){return l.getAttributeNode(i).nodeValue
}if(i=="tabIndex"){var k=l.getAttributeNode("tabIndex");
return k&&k.specified?k.value:l.nodeName.match(/(button|input|object|select|textarea)/i)?0:l.nodeName.match(/^(a|area)$/i)&&l.href?0:V
}return l[i]
}if(!I.support.style&&j&&i=="style"){return I.attr(l.style,"cssText",e)
}if(f){l.setAttribute(i,""+e)
}var g=!I.support.hrefNormalized&&j&&h?l.getAttribute(i,2):l.getAttribute(i);
return g===null?V:g
}if(!I.support.opacity&&i=="opacity"){if(f){l.zoom=1;
l.filter=(l.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(e)+""=="NaN"?"":"alpha(opacity="+e*100+")")
}return l.filter&&l.filter.indexOf("opacity=")>=0?(parseFloat(l.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}i=i.replace(/-([a-z])/ig,function(m,n){return n.toUpperCase()
});
if(f){l[i]=e
}return l[i]
},trim:function(e){return(e||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(f){var g=[];
if(f!=null){var e=f.length;
if(e==null||typeof f==="string"||I.isFunction(f)||f.setInterval){g[0]=f
}else{while(e){g[--e]=f[e]
}}}return g
},inArray:function(e,f){for(var g=0,h=f.length;
g<h;
g++){if(f[g]===e){return g
}}return -1
},merge:function(e,g){var h=0,i,f=e.length;
if(!I.support.getAll){while((i=g[h++])!=null){if(i.nodeType!=8){e[f++]=i
}}}else{while((i=g[h++])!=null){e[f++]=i
}}return e
},unique:function(f){var h=[],g={};
try{for(var i=0,j=f.length;
i<j;
i++){var e=I.data(f[i]);
if(!g[e]){g[e]=true;
h.push(f[i])
}}}catch(k){h=f
}return h
},grep:function(h,f,g){var i=[];
for(var j=0,e=h.length;
j<e;
j++){if(!g!=!f(h[j],j)){i.push(h[j])
}}return i
},map:function(g,f){var h=[];
for(var i=0,j=g.length;
i<j;
i++){var e=f(g[i],i);
if(e!=null){h[h.length]=e
}}return h.concat.apply([],h)
}});
var K=navigator.userAgent.toLowerCase();
I.browser={version:(K.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(K),opera:/opera/.test(K),msie:/msie/.test(K)&&!/opera/.test(K),mozilla:/mozilla/.test(K)&&!/(compatible|webkit)/.test(K)};
I.each({parent:function(e){return e.parentNode
},parents:function(e){return I.dir(e,"parentNode")
},next:function(e){return I.nth(e,2,"nextSibling")
},prev:function(e){return I.nth(e,2,"previousSibling")
},nextAll:function(e){return I.dir(e,"nextSibling")
},prevAll:function(e){return I.dir(e,"previousSibling")
},siblings:function(e){return I.sibling(e.parentNode.firstChild,e)
},children:function(e){return I.sibling(e.firstChild)
},contents:function(e){return I.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:I.makeArray(e.childNodes)
}},function(e,f){I.fn[e]=function(g){var h=I.map(this,f);
if(g&&typeof g=="string"){h=I.multiFilter(g,h)
}return this.pushStack(I.unique(h),e,g)
}
});
I.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,f){I.fn[e]=function(h){var k=[],g=I(h);
for(var l=0,i=g.length;
l<i;
l++){var j=(l>0?this.clone(true):this).get();
I.fn[f].apply(I(g[l]),j);
k=k.concat(j)
}return this.pushStack(k,e,h)
}
});
I.each({removeAttr:function(e){I.attr(this,e,"");
if(this.nodeType==1){this.removeAttribute(e)
}},addClass:function(e){I.className.add(this,e)
},removeClass:function(e){I.className.remove(this,e)
},toggleClass:function(f,e){if(typeof e!=="boolean"){e=!I.className.has(this,f)
}I.className[e?"add":"remove"](this,f)
},remove:function(e){if(!e||I.filter(e,[this]).length){I("*",this).add([this]).each(function(){I.event.remove(this);
I.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){I(this).children().remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(e,f){I.fn[e]=function(){return this.each(f,arguments)
}
});
function B(e,f){return e[0]&&parseInt(I.curCSS(e[0],f,true),10)||0
}var X="jQuery"+S(),d=0,G={};
I.extend({cache:{},data:function(h,g,e){h=h==D?G:h;
var f=h[X];
if(!f){f=h[X]=++d
}if(g&&!I.cache[f]){I.cache[f]={}
}if(e!==V){I.cache[f][g]=e
}return g?I.cache[f][g]:f
},removeData:function(h,g){h=h==D?G:h;
var f=h[X];
if(g){if(I.cache[f]){delete I.cache[f][g];
g="";
for(g in I.cache[f]){break
}if(!g){I.removeData(h)
}}}else{try{delete h[X]
}catch(e){if(h.removeAttribute){h.removeAttribute(X)
}}delete I.cache[f]
}},queue:function(h,g,f){if(h){g=(g||"fx")+"queue";
var e=I.data(h,g);
if(!e||I.isArray(f)){e=I.data(h,g,I.makeArray(f))
}else{if(f){e.push(f)
}}}return e
},dequeue:function(f,e){var g=I.queue(f,e),h=g.shift();
if(!e||e==="fx"){h=g[0]
}if(h!==V){h.call(f)
}}});
I.fn.extend({data:function(g,e){var f=g.split(".");
f[1]=f[1]?"."+f[1]:"";
if(e===V){var h=this.triggerHandler("getData"+f[1]+"!",[f[0]]);
if(h===V&&this.length){h=I.data(this[0],g)
}return h===V&&f[1]?this.data(f[0]):h
}else{return this.trigger("setData"+f[1]+"!",[f[0],e]).each(function(){I.data(this,g,e)
})
}},removeData:function(e){return this.each(function(){I.removeData(this,e)
})
},queue:function(e,f){if(typeof e!=="string"){f=e;
e="fx"
}if(f===V){return I.queue(this[0],e)
}return this.each(function(){var g=I.queue(this,e,f);
if(e=="fx"&&g.length==1){g[0].call(this)
}})
},dequeue:function(e){return this.each(function(){I.dequeue(this,e)
})
}});
(function(){var n=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,h=0,s=Object.prototype.toString;
var q=function(AE,AH,AI,t){AI=AI||[];
AH=AH||document;
if(AH.nodeType!==1&&AH.nodeType!==9){return[]
}if(!AE||typeof AE!=="string"){return AI
}var w=[],AC,x,AA,AF,u,AB,AD=true;
n.lastIndex=0;
while((AC=n.exec(AE))!==null){w.push(AC[1]);
if(AC[2]){AB=RegExp.rightContext;
break
}}if(w.length>1&&i.exec(AE)){if(w.length===2&&e.relative[w[0]]){x=f(w[0]+w[1],AH)
}else{x=e.relative[w[0]]?[AH]:q(w.shift(),AH);
while(w.length){AE=w.shift();
if(e.relative[AE]){AE+=w.shift()
}x=f(AE,x)
}}}else{var v=t?{expr:w.pop(),set:p(t)}:q.find(w.pop(),w.length===1&&AH.parentNode?AH.parentNode:AH,m(AH));
x=q.filter(v.expr,v.set);
if(w.length>0){AA=p(x)
}else{AD=false
}while(w.length){var z=w.pop(),y=z;
if(!e.relative[z]){z=""
}else{y=w.pop()
}if(y==null){y=AH
}e.relative[z](AA,y,m(AH))
}}if(!AA){AA=x
}if(!AA){throw"Syntax error, unrecognized expression: "+(z||AE)
}if(s.call(AA)==="[object Array]"){if(!AD){AI.push.apply(AI,AA)
}else{if(AH.nodeType===1){for(var AG=0;
AA[AG]!=null;
AG++){if(AA[AG]&&(AA[AG]===true||AA[AG].nodeType===1&&g(AH,AA[AG]))){AI.push(x[AG])
}}}else{for(var AG=0;
AA[AG]!=null;
AG++){if(AA[AG]&&AA[AG].nodeType===1){AI.push(x[AG])
}}}}}else{p(AA,AI)
}if(AB){q(AB,AH,AI,t);
if(r){hasDuplicate=false;
AI.sort(r);
if(hasDuplicate){for(var AG=1;
AG<AI.length;
AG++){if(AI[AG]===AI[AG-1]){AI.splice(AG--,1)
}}}}}return AI
};
q.matches=function(t,u){return q(t,null,null,u)
};
q.find=function(AA,z,AB){var y,w;
if(!AA){return[]
}for(var v=0,u=e.order.length;
v<u;
v++){var x=e.order[v],w;
if((w=e.match[x].exec(AA))){var t=RegExp.leftContext;
if(t.substr(t.length-1)!=="\\"){w[1]=(w[1]||"").replace(/\\/g,"");
y=e.find[x](w,z,AB);
if(y!=null){AA=AA.replace(e.match[x],"");
break
}}}}if(!y){y=z.getElementsByTagName("*")
}return{set:y,expr:AA}
};
q.filter=function(u,t,y,AC){var AB=u,AA=[],AG=t,AE,AF,x=t&&t[0]&&m(t[0]);
while(u&&t.length){for(var AI in e.filter){if((AE=e.match[AI].exec(u))!=null){var AH=e.filter[AI],z,w;
AF=false;
if(AG==AA){AA=[]
}if(e.preFilter[AI]){AE=e.preFilter[AI](AE,AG,y,AA,AC,x);
if(!AE){AF=z=true
}else{if(AE===true){continue
}}}if(AE){for(var AD=0;
(w=AG[AD])!=null;
AD++){if(w){z=AH(w,AE,AD,AG);
var v=AC^!!z;
if(y&&z!=null){if(v){AF=true
}else{AG[AD]=false
}}else{if(v){AA.push(w);
AF=true
}}}}}if(z!==V){if(!y){AG=AA
}u=u.replace(e.match[AI],"");
if(!AF){return[]
}break
}}}if(u==AB){if(AF==null){throw"Syntax error, unrecognized expression: "+u
}else{break
}}AB=u
}return AG
};
var e=q.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(t){return t.getAttribute("href")
}},relative:{"+":function(AA,z,y){var w=typeof z==="string",AB=w&&!/\W/.test(z),x=w&&!AB;
if(AB&&!y){z=z.toUpperCase()
}for(var v=0,u=AA.length,t;
v<u;
v++){if((t=AA[v])){while((t=t.previousSibling)&&t.nodeType!==1){}AA[v]=x||t&&t.nodeName===z?t||false:t===z
}}if(x){q.filter(z,AA,true)
}},">":function(x,AA,y){var u=typeof AA==="string";
if(u&&!/\W/.test(AA)){AA=y?AA:AA.toUpperCase();
for(var t=0,z=x.length;
t<z;
t++){var w=x[t];
if(w){var v=w.parentNode;
x[t]=v.nodeName===AA?v:false
}}}else{for(var t=0,z=x.length;
t<z;
t++){var w=x[t];
if(w){x[t]=u?w.parentNode:w.parentNode===AA
}}if(u){q.filter(AA,x,true)
}}},"":function(y,w,u){var x=h++,v=o;
if(!w.match(/\W/)){var t=w=u?w:w.toUpperCase();
v=l
}v("parentNode",w,x,y,t,u)
},"~":function(y,w,u){var x=h++,v=o;
if(typeof w==="string"&&!w.match(/\W/)){var t=w=u?w:w.toUpperCase();
v=l
}v("previousSibling",w,x,y,t,u)
}},find:{ID:function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var t=v.getElementById(u[1]);
return t?[t]:[]
}},NAME:function(z,v,w){if(typeof v.getElementsByName!=="undefined"){var y=[],u=v.getElementsByName(z[1]);
for(var t=0,x=u.length;
t<x;
t++){if(u[t].getAttribute("name")===z[1]){y.push(u[t])
}}return y.length===0?null:y
}},TAG:function(t,u){return u.getElementsByTagName(t[1])
}},preFilter:{CLASS:function(u,AA,t,z,x,y){u=" "+u[1].replace(/\\/g,"")+" ";
if(y){return u
}for(var v=0,w;
(w=AA[v])!=null;
v++){if(w){if(x^(w.className&&(" "+w.className+" ").indexOf(u)>=0)){if(!t){z.push(w)
}}else{if(t){AA[v]=false
}}}}return false
},ID:function(t){return t[1].replace(/\\/g,"")
},TAG:function(u,t){for(var v=0;
t[v]===false;
v++){}return t[v]&&m(t[v])?u[1]:u[1].toUpperCase()
},CHILD:function(t){if(t[1]=="nth"){var u=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(t[2]=="even"&&"2n"||t[2]=="odd"&&"2n+1"||!/\D/.test(t[2])&&"0n+"+t[2]||t[2]);
t[2]=(u[1]+(u[2]||1))-0;
t[3]=u[3]-0
}t[0]=h++;
return t
},ATTR:function(u,y,z,x,v,w){var t=u[1].replace(/\\/g,"");
if(!w&&e.attrMap[t]){u[1]=e.attrMap[t]
}if(u[2]==="~="){u[4]=" "+u[4]+" "
}return u
},PSEUDO:function(t,w,x,v,u){if(t[1]==="not"){if(t[3].match(n).length>1||/^\w/.test(t[3])){t[3]=q(t[3],null,null,w)
}else{var y=q.filter(t[3],w,x,true^u);
if(!x){v.push.apply(v,y)
}return false
}}else{if(e.match.POS.test(t[0])||e.match.CHILD.test(t[0])){return true
}}return t
},POS:function(t){t.unshift(true);
return t
}},filters:{enabled:function(t){return t.disabled===false&&t.type!=="hidden"
},disabled:function(t){return t.disabled===true
},checked:function(t){return t.checked===true
},selected:function(t){t.parentNode.selectedIndex;
return t.selected===true
},parent:function(t){return !!t.firstChild
},empty:function(t){return !t.firstChild
},has:function(v,u,t){return !!q(t[3],v).length
},header:function(t){return/h\d/i.test(t.nodeName)
},text:function(t){return"text"===t.type
},radio:function(t){return"radio"===t.type
},checkbox:function(t){return"checkbox"===t.type
},file:function(t){return"file"===t.type
},password:function(t){return"password"===t.type
},submit:function(t){return"submit"===t.type
},image:function(t){return"image"===t.type
},reset:function(t){return"reset"===t.type
},button:function(t){return"button"===t.type||t.nodeName.toUpperCase()==="BUTTON"
},input:function(t){return/input|select|textarea|button/i.test(t.nodeName)
}},setFilters:{first:function(u,t){return t===0
},last:function(v,u,t,w){return u===w.length-1
},even:function(u,t){return t%2===0
},odd:function(u,t){return t%2===1
},lt:function(v,u,t){return u<t[3]-0
},gt:function(v,u,t){return u>t[3]-0
},nth:function(v,u,t){return t[3]-0==u
},eq:function(v,u,t){return t[3]-0==u
}},filter:{PSEUDO:function(x,t,u,y){var AA=t[1],v=e.filters[AA];
if(v){return v(x,u,t,y)
}else{if(AA==="contains"){return(x.textContent||x.innerText||"").indexOf(t[3])>=0
}else{if(AA==="not"){var w=t[3];
for(var u=0,z=w.length;
u<z;
u++){if(w[u]===x){return false
}}return true
}}}},CHILD:function(z,v){var y=v[1],t=z;
switch(y){case"only":case"first":while(t=t.previousSibling){if(t.nodeType===1){return false
}}if(y=="first"){return true
}t=z;
case"last":while(t=t.nextSibling){if(t.nodeType===1){return false
}}return true;
case"nth":var u=v[2],AC=v[3];
if(u==1&&AC==0){return true
}var x=v[0],AB=z.parentNode;
if(AB&&(AB.sizcache!==x||!z.nodeIndex)){var w=0;
for(t=AB.firstChild;
t;
t=t.nextSibling){if(t.nodeType===1){t.nodeIndex=++w
}}AB.sizcache=x
}var AA=z.nodeIndex-AC;
if(u==0){return AA==0
}else{return(AA%u==0&&AA/u>=0)
}}},ID:function(u,t){return u.nodeType===1&&u.getAttribute("id")===t
},TAG:function(u,t){return(t==="*"&&u.nodeType===1)||u.nodeName===t
},CLASS:function(u,t){return(" "+(u.className||u.getAttribute("class"))+" ").indexOf(t)>-1
},ATTR:function(v,t){var z=t[1],x=e.attrHandle[z]?e.attrHandle[z](v):v[z]!=null?v[z]:v.getAttribute(z),w=x+"",u=t[2],y=t[4];
return x==null?u==="!=":u==="="?w===y:u==="*="?w.indexOf(y)>=0:u==="~="?(" "+w+" ").indexOf(y)>=0:!y?w&&x!==false:u==="!="?w!=y:u==="^="?w.indexOf(y)===0:u==="$="?w.substr(w.length-y.length)===y:u==="|="?w===y||w.substr(0,y.length+1)===y+"-":false
},POS:function(t,w,x,u){var v=w[2],y=e.setFilters[v];
if(y){return y(t,x,w,u)
}}}};
var i=e.match.POS;
for(var k in e.match){e.match[k]=RegExp(e.match[k].source+/(?![^\[]*\])(?![^\(]*\))/.source)
}var p=function(u,t){u=Array.prototype.slice.call(u);
if(t){t.push.apply(t,u);
return t
}return u
};
try{Array.prototype.slice.call(document.documentElement.childNodes)
}catch(j){p=function(x,w){var u=w||[];
if(s.call(x)==="[object Array]"){Array.prototype.push.apply(u,x)
}else{if(typeof x.length==="number"){for(var v=0,t=x.length;
v<t;
v++){u.push(x[v])
}}else{for(var v=0;
x[v];
v++){u.push(x[v])
}}}return u
}
}var r;
if(document.documentElement.compareDocumentPosition){r=function(u,t){var v=u.compareDocumentPosition(t)&4?-1:u===t?0:1;
if(v===0){hasDuplicate=true
}return v
}
}else{if("sourceIndex" in document.documentElement){r=function(u,t){var v=u.sourceIndex-t.sourceIndex;
if(v===0){hasDuplicate=true
}return v
}
}else{if(document.createRange){r=function(w,u){var v=w.ownerDocument.createRange(),t=u.ownerDocument.createRange();
v.selectNode(w);
v.collapse(true);
t.selectNode(u);
t.collapse(true);
var x=v.compareBoundaryPoints(Range.START_TO_END,t);
if(x===0){hasDuplicate=true
}return x
}
}}}(function(){var u=document.createElement("form"),v="script"+(new Date).getTime();
u.innerHTML="<input name='"+v+"'/>";
var t=document.documentElement;
t.insertBefore(u,t.firstChild);
if(!!document.getElementById(v)){e.find.ID=function(x,y,z){if(typeof y.getElementById!=="undefined"&&!z){var w=y.getElementById(x[1]);
return w?w.id===x[1]||typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id").nodeValue===x[1]?[w]:V:[]
}};
e.filter.ID=function(x,y){var w=typeof x.getAttributeNode!=="undefined"&&x.getAttributeNode("id");
return x.nodeType===1&&w&&w.nodeValue===y
}
}t.removeChild(u)
})();
(function(){var t=document.createElement("div");
t.appendChild(document.createComment(""));
if(t.getElementsByTagName("*").length>0){e.find.TAG=function(w,v){var u=v.getElementsByTagName(w[1]);
if(w[1]==="*"){var y=[];
for(var x=0;
u[x];
x++){if(u[x].nodeType===1){y.push(u[x])
}}u=y
}return u
}
}t.innerHTML="<a href='#'></a>";
if(t.firstChild&&typeof t.firstChild.getAttribute!=="undefined"&&t.firstChild.getAttribute("href")!=="#"){e.attrHandle.href=function(u){return u.getAttribute("href",2)
}
}})();
if(document.querySelectorAll){(function(){var t=q,u=document.createElement("div");
u.innerHTML="<p class='TEST'></p>";
if(u.querySelectorAll&&u.querySelectorAll(".TEST").length===0){return 
}q=function(x,w,z,v){w=w||document;
if(!v&&w.nodeType===9&&!m(w)){try{return p(w.querySelectorAll(x),z)
}catch(y){}}return t(x,w,z,v)
};
q.find=t.find;
q.filter=t.filter;
q.selectors=t.selectors;
q.matches=t.matches
})()
}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var t=document.createElement("div");
t.innerHTML="<div class='test e'></div><div class='test'></div>";
if(t.getElementsByClassName("e").length===0){return 
}t.lastChild.className="e";
if(t.getElementsByClassName("e").length===1){return 
}e.order.splice(1,0,"CLASS");
e.find.CLASS=function(u,v,w){if(typeof v.getElementsByClassName!=="undefined"&&!w){return v.getElementsByClassName(u[1])
}}
})()
}function l(t,y,x,AD,AA,AC){var AB=t=="previousSibling"&&!AC;
for(var v=0,u=AD.length;
v<u;
v++){var z=AD[v];
if(z){if(AB&&z.nodeType===1){z.sizcache=x;
z.sizset=v
}z=z[t];
var w=false;
while(z){if(z.sizcache===x){w=AD[z.sizset];
break
}if(z.nodeType===1&&!AC){z.sizcache=x;
z.sizset=v
}if(z.nodeName===y){w=z;
break
}z=z[t]
}AD[v]=w
}}}function o(t,y,x,AD,AA,AC){var AB=t=="previousSibling"&&!AC;
for(var v=0,u=AD.length;
v<u;
v++){var z=AD[v];
if(z){if(AB&&z.nodeType===1){z.sizcache=x;
z.sizset=v
}z=z[t];
var w=false;
while(z){if(z.sizcache===x){w=AD[z.sizset];
break
}if(z.nodeType===1){if(!AC){z.sizcache=x;
z.sizset=v
}if(typeof y!=="string"){if(z===y){w=true;
break
}}else{if(q.filter(y,[z]).length>0){w=z;
break
}}}z=z[t]
}AD[v]=w
}}}var g=document.compareDocumentPosition?function(u,t){return u.compareDocumentPosition(t)&16
}:function(u,t){return u!==t&&(u.contains?u.contains(t):true)
};
var m=function(t){return t.nodeType===9&&t.documentElement.nodeName!=="HTML"||!!t.ownerDocument&&m(t.ownerDocument)
};
var f=function(z,x){var u=[],v="",w,t=x.nodeType?[x]:x;
while((w=e.match.PSEUDO.exec(z))){v+=w[0];
z=z.replace(e.match.PSEUDO,"")
}z=e.relative[z]?z+"*":z;
for(var y=0,AA=t.length;
y<AA;
y++){q(z,t[y],u)
}return q.filter(v,u)
};
I.find=q;
I.filter=q.filter;
I.expr=q.selectors;
I.expr[":"]=I.expr.filters;
q.selectors.filters.hidden=function(t){return t.offsetWidth===0||t.offsetHeight===0
};
q.selectors.filters.visible=function(t){return t.offsetWidth>0||t.offsetHeight>0
};
q.selectors.filters.animated=function(t){return I.grep(I.timers,function(u){return t===u.elem
}).length
};
I.multiFilter=function(v,t,u){if(u){v=":not("+v+")"
}return q.matches(v,t)
};
I.dir=function(v,u){var t=[],w=v[u];
while(w&&w!=document){if(w.nodeType==1){t.push(w)
}w=w[u]
}return t
};
I.nth=function(x,t,v,w){t=t||1;
var u=0;
for(;
x;
x=x[v]){if(x.nodeType==1&&++u==t){break
}}return x
};
I.sibling=function(v,u){var t=[];
for(;
v;
v=v.nextSibling){if(v.nodeType==1&&v!=u){t.push(v)
}}return t
};
return ;
D.Sizzle=q
})();
I.event={add:function(k,h,j,f){if(k.nodeType==3||k.nodeType==8){return 
}if(k.setInterval&&k!=D){k=D
}if(!j.guid){j.guid=this.guid++
}if(f!==V){var i=j;
j=this.proxy(i);
j.data=f
}var g=I.data(k,"events")||I.data(k,"events",{}),e=I.data(k,"handle")||I.data(k,"handle",function(){return typeof I!=="undefined"&&!I.event.triggered?I.event.handle.apply(arguments.callee.elem,arguments):V
});
e.elem=k;
I.each(h.split(/\s+/),function(m,n){var o=n.split(".");
n=o.shift();
j.type=o.slice().sort().join(".");
var l=g[n];
if(I.event.specialAll[n]){I.event.specialAll[n].setup.call(k,f,o)
}if(!l){l=g[n]={};
if(!I.event.special[n]||I.event.special[n].setup.call(k,f,o)===false){if(k.addEventListener){k.addEventListener(n,e,false)
}else{if(k.attachEvent){k.attachEvent("on"+n,e)
}}}}l[j.guid]=j;
I.event.global[n]=true
});
k=null
},guid:1,global:{},remove:function(e,j,l){if(e.nodeType==3||e.nodeType==8){return 
}var i=I.data(e,"events"),h,g;
if(i){if(j===V||(typeof j==="string"&&j.charAt(0)==".")){for(var k in i){this.remove(e,k+(j||""))
}}else{if(j.type){l=j.handler;
j=j.type
}I.each(j.split(/\s+/),function(n,p){var m=p.split(".");
p=m.shift();
var o=RegExp("(^|\\.)"+m.slice().sort().join(".*\\.")+"(\\.|$)");
if(i[p]){if(l){delete i[p][l.guid]
}else{for(var q in i[p]){if(o.test(i[p][q].type)){delete i[p][q]
}}}if(I.event.specialAll[p]){I.event.specialAll[p].teardown.call(e,m)
}for(h in i[p]){break
}if(!h){if(!I.event.special[p]||I.event.special[p].teardown.call(e,m)===false){if(e.removeEventListener){e.removeEventListener(p,I.data(e,"handle"),false)
}else{if(e.detachEvent){e.detachEvent("on"+p,I.data(e,"handle"))
}}}h=null;
delete i[p]
}}})
}for(h in i){break
}if(!h){var f=I.data(e,"handle");
if(f){f.elem=null
}I.removeData(e,"events");
I.removeData(e,"handle")
}}},trigger:function(k,e,j,g){var i=k.type||k;
if(!g){k=typeof k==="object"?k[X]?k:I.extend(I.Event(i),k):I.Event(i);
if(i.indexOf("!")>=0){k.type=i=i.slice(0,-1);
k.exclusive=true
}if(!j){k.stopPropagation();
if(this.global[i]){I.each(I.cache,function(){if(this.events&&this.events[i]){I.event.trigger(k,e,this.handle.elem)
}})
}}if(!j||j.nodeType==3||j.nodeType==8){return V
}k.result=V;
k.target=j;
e=I.makeArray(e);
e.unshift(k)
}k.currentTarget=j;
var l=I.data(j,"handle");
if(l){l.apply(j,e)
}if((!j[i]||(I.nodeName(j,"a")&&i=="click"))&&j["on"+i]&&j["on"+i].apply(j,e)===false){k.result=false
}if(!g&&j[i]&&!k.isDefaultPrevented()&&!(I.nodeName(j,"a")&&i=="click")){this.triggered=true;
try{j[i]()
}catch(f){}}this.triggered=false;
if(!k.isPropagationStopped()){var h=j.parentNode||j.ownerDocument;
if(h){I.event.trigger(k,e,h,true)
}}},handle:function(e){var l,g;
e=arguments[0]=I.event.fix(e||D.event);
e.currentTarget=this;
var f=e.type.split(".");
e.type=f.shift();
l=!f.length&&!e.exclusive;
var k=RegExp("(^|\\.)"+f.slice().sort().join(".*\\.")+"(\\.|$)");
g=(I.data(this,"events")||{})[e.type];
for(var i in g){var j=g[i];
if(l||k.test(j.type)){e.handler=j;
e.data=j.data;
var h=j.apply(this,arguments);
if(h!==V){e.result=h;
if(h===false){e.preventDefault();
e.stopPropagation()
}}if(e.isImmediatePropagationStopped()){break
}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(j){if(j[X]){return j
}var h=j;
j=I.Event(h);
for(var i=this.props.length,f;
i;
){f=this.props[--i];
j[f]=h[f]
}if(!j.target){j.target=j.srcElement||document
}if(j.target.nodeType==3){j.target=j.target.parentNode
}if(!j.relatedTarget&&j.fromElement){j.relatedTarget=j.fromElement==j.target?j.toElement:j.fromElement
}if(j.pageX==null&&j.clientX!=null){var e=document.documentElement,g=document.body;
j.pageX=j.clientX+(e&&e.scrollLeft||g&&g.scrollLeft||0)-(e.clientLeft||0);
j.pageY=j.clientY+(e&&e.scrollTop||g&&g.scrollTop||0)-(e.clientTop||0)
}if(!j.which&&((j.charCode||j.charCode===0)?j.charCode:j.keyCode)){j.which=j.charCode||j.keyCode
}if(!j.metaKey&&j.ctrlKey){j.metaKey=j.ctrlKey
}if(!j.which&&j.button){j.which=(j.button&1?1:(j.button&2?3:(j.button&4?2:0)))
}return j
},proxy:function(f,e){e=e||function(){return f.apply(this,arguments)
};
e.guid=f.guid=f.guid||e.guid||this.guid++;
return e
},special:{ready:{setup:H,teardown:function(){}}},specialAll:{live:{setup:function(e,f){I.event.add(this,f[0],a)
},teardown:function(f){if(f.length){var g=0,e=RegExp("(^|\\.)"+f[0]+"(\\.|$)");
I.each((I.data(this,"events").live||{}),function(){if(e.test(this.type)){g++
}});
if(g<1){I.event.remove(this,f[0],a)
}}}}}};
I.Event=function(e){if(!this.preventDefault){return new I.Event(e)
}if(e&&e.type){this.originalEvent=e;
this.type=e.type
}else{this.type=e
}this.timeStamp=S();
this[X]=true
};
function C(){return false
}function c(){return true
}I.Event.prototype={preventDefault:function(){this.isDefaultPrevented=c;
var e=this.originalEvent;
if(!e){return 
}if(e.preventDefault){e.preventDefault()
}e.returnValue=false
},stopPropagation:function(){this.isPropagationStopped=c;
var e=this.originalEvent;
if(!e){return 
}if(e.stopPropagation){e.stopPropagation()
}e.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=c;
this.stopPropagation()
},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};
var T=function(e){var g=e.relatedTarget;
while(g&&g!=this){try{g=g.parentNode
}catch(f){g=this
}}if(g!=this){e.type=e.data;
I.event.handle.apply(this,arguments)
}};
I.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(f,e){I.event.special[e]={setup:function(){I.event.add(this,f,T,e)
},teardown:function(){I.event.remove(this,f,T)
}}
});
I.fn.extend({bind:function(e,f,g){return e=="unload"?this.one(e,f,g):this.each(function(){I.event.add(this,e,g||f,g&&f)
})
},one:function(e,f,h){var g=I.event.proxy(h||f,function(i){I(this).unbind(i,g);
return(h||f).apply(this,arguments)
});
return this.each(function(){I.event.add(this,e,g,h&&f)
})
},unbind:function(f,e){return this.each(function(){I.event.remove(this,f,e)
})
},trigger:function(e,f){return this.each(function(){I.event.trigger(e,f,this)
})
},triggerHandler:function(g,f){if(this[0]){var e=I.Event(g);
e.preventDefault();
e.stopPropagation();
I.event.trigger(e,f,this[0]);
return e.result
}},toggle:function(f){var g=arguments,e=1;
while(e<g.length){I.event.proxy(f,g[e++])
}return this.click(I.event.proxy(f,function(h){this.lastToggle=(this.lastToggle||0)%e;
h.preventDefault();
return g[this.lastToggle++].apply(this,arguments)||false
}))
},hover:function(e,f){return this.mouseenter(e).mouseleave(f)
},ready:function(e){H();
if(I.isReady){e.call(document,I)
}else{I.readyList.push(e)
}return this
},live:function(f,e){var g=I.event.proxy(e);
g.guid+=this.selector+f;
I(document).bind(A(f,this.selector),this.selector,g);
return this
},die:function(f,e){I(document).unbind(A(f,this.selector),e?{guid:e.guid+this.selector+f}:null);
return this
}});
function a(f){var g=RegExp("(^|\\.)"+f.type+"(\\.|$)"),e=true,h=[];
I.each(I.data(this,"events").live||[],function(i,j){if(g.test(j.type)){var k=I(f.target).closest(j.data)[0];
if(k){h.push({elem:k,fn:j})
}}});
h.sort(function(j,i){return I.data(j.elem,"closest")-I.data(i.elem,"closest")
});
I.each(h,function(){if(this.fn.call(this.elem,f,this.fn.data)===false){return(e=false)
}});
return e
}function A(f,e){return["live",f,e.replace(/\./g,"`").replace(/ /g,"|")].join(".")
}I.extend({isReady:false,readyList:[],ready:function(){if(!I.isReady){I.isReady=true;
if(I.readyList){I.each(I.readyList,function(){this.call(document,I)
});
I.readyList=null
}I(document).triggerHandler("ready")
}}});
var L=false;
function H(){if(L){return 
}L=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
I.ready()
},false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
I.ready()
}});
if(document.documentElement.doScroll&&D==D.top){(function(){if(I.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(arguments.callee,0);
return 
}I.ready()
})()
}}}I.event.add(D,"load",I.ready)
}I.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(f,e){I.fn[e]=function(g){return g?this.bind(e,g):this.trigger(e)
}
});
I(D).bind("unload",function(){for(var e in I.cache){if(e!=1&&I.cache[e].handle){I.event.remove(I.cache[e].handle.elem)
}}});
(function(){I.support={};
var h=document.documentElement,i=document.createElement("script"),f=document.createElement("div"),e="script"+(new Date).getTime();
f.style.display="none";
f.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var j=f.getElementsByTagName("*"),g=f.getElementsByTagName("a")[0];
if(!j||!j.length||!g){return 
}I.support={leadingWhitespace:f.firstChild.nodeType==3,tbody:!f.getElementsByTagName("tbody").length,objectAll:!!f.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!f.getElementsByTagName("link").length,style:/red/.test(g.getAttribute("style")),hrefNormalized:g.getAttribute("href")==="/a",opacity:g.style.opacity==="0.5",cssFloat:!!g.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};
i.type="text/javascript";
try{i.appendChild(document.createTextNode("window."+e+"=1;"))
}catch(k){}h.insertBefore(i,h.firstChild);
if(D[e]){I.support.scriptEval=true;
delete D[e]
}h.removeChild(i);
if(f.attachEvent&&f.fireEvent){f.attachEvent("onclick",function(){I.support.noCloneEvent=false;
f.detachEvent("onclick",arguments.callee)
});
f.cloneNode(true).fireEvent("onclick")
}I(function(){var l=document.createElement("div");
l.style.width=l.style.paddingLeft="1px";
document.body.appendChild(l);
I.boxModel=I.support.boxModel=l.offsetWidth===2;
document.body.removeChild(l).style.display="none"
})
})();
var J=I.support.cssFloat?"cssFloat":"styleFloat";
I.props={"for":"htmlFor","class":"className","float":J,cssFloat:J,styleFloat:J,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};
I.fn.extend({_load:I.fn.load,load:function(i,e,f){if(typeof i!=="string"){return this._load(i)
}var k=i.indexOf(" ");
if(k>=0){var g=i.slice(k,i.length);
i=i.slice(0,k)
}var j="GET";
if(e){if(I.isFunction(e)){f=e;
e=null
}else{if(typeof e==="object"){e=I.param(e);
j="POST"
}}}var h=this;
I.ajax({url:i,type:j,dataType:"html",data:e,complete:function(m,l){if(l=="success"||l=="notmodified"){h.html(g?I("<div/>").append(m.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(g):m.responseText)
}if(f){h.each(f,[m.responseText,l,m])
}}});
return this
},serialize:function(){return I.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?I.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))
}).map(function(g,e){var f=I(this).val();
return f==null?null:I.isArray(f)?I.map(f,function(i,h){return{name:e.name,value:i}
}):{name:e.name,value:f}
}).get()
}});
I.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(e,f){I.fn[f]=function(g){return this.bind(f,g)
}
});
var R=S();
I.extend({get:function(g,e,f,h){if(I.isFunction(e)){f=e;
e=null
}return I.ajax({type:"GET",url:g,data:e,success:f,dataType:h})
},getScript:function(e,f){return I.get(e,null,f,"script")
},getJSON:function(g,e,f){return I.get(g,e,f,"json")
},post:function(g,e,f,h){if(I.isFunction(e)){f=e;
e={}
}return I.ajax({type:"POST",url:g,data:e,success:f,dataType:h})
},ajaxSetup:function(e){I.extend(I.ajaxSettings,e)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return D.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(m){m=I.extend(true,m,I.extend(true,{},I.ajaxSettings,m));
var w,f=/=\?(&|$)/g,r,v,g=m.type.toUpperCase();
if(m.data&&m.processData&&typeof m.data!=="string"){m.data=I.param(m.data)
}if(m.dataType=="jsonp"){if(g=="GET"){if(!m.url.match(f)){m.url+=(m.url.match(/\?/)?"&":"?")+(m.jsonp||"callback")+"=?"
}}else{if(!m.data||!m.data.match(f)){m.data=(m.data?m.data+"&":"")+(m.jsonp||"callback")+"=?"
}}m.dataType="json"
}if(m.dataType=="json"&&(m.data&&m.data.match(f)||m.url.match(f))){w="jsonp"+R++;
if(m.data){m.data=(m.data+"").replace(f,"="+w+"$1")
}m.url=m.url.replace(f,"="+w+"$1");
m.dataType="script";
D[w]=function(x){v=x;
i();
l();
D[w]=V;
try{delete D[w]
}catch(y){}if(h){h.removeChild(t)
}}
}if(m.dataType=="script"&&m.cache==null){m.cache=false
}if(m.cache===false&&g=="GET"){var e=S();
var u=m.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+e+"$2");
m.url=u+((u==m.url)?(m.url.match(/\?/)?"&":"?")+"_="+e:"")
}if(m.data&&g=="GET"){m.url+=(m.url.match(/\?/)?"&":"?")+m.data;
m.data=null
}if(m.global&&!I.active++){I.event.trigger("ajaxStart")
}var q=/^(\w+:)?\/\/([^\/?#]+)/.exec(m.url);
if(m.dataType=="script"&&g=="GET"&&q&&(q[1]&&q[1]!=location.protocol||q[2]!=location.host)){var h=document.getElementsByTagName("head")[0];
var t=document.createElement("script");
t.src=m.url;
if(m.scriptCharset){t.charset=m.scriptCharset
}if(!w){var o=false;
t.onload=t.onreadystatechange=function(){if(!o&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){o=true;
i();
l();
t.onload=t.onreadystatechange=null;
h.removeChild(t)
}}
}h.appendChild(t);
return V
}var k=false;
var j=m.xhr();
if(m.username){j.open(g,m.url,m.async,m.username,m.password)
}else{j.open(g,m.url,m.async)
}try{if(m.data){j.setRequestHeader("Content-Type",m.contentType)
}if(m.ifModified){j.setRequestHeader("If-Modified-Since",I.lastModified[m.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}j.setRequestHeader("X-Requested-With","XMLHttpRequest");
j.setRequestHeader("Accept",m.dataType&&m.accepts[m.dataType]?m.accepts[m.dataType]+", */*":m.accepts._default)
}catch(s){}if(m.beforeSend&&m.beforeSend(j,m)===false){if(m.global&&!--I.active){I.event.trigger("ajaxStop")
}j.abort();
return false
}if(m.global){I.event.trigger("ajaxSend",[j,m])
}var n=function(y){if(j.readyState==0){if(p){clearInterval(p);
p=null;
if(m.global&&!--I.active){I.event.trigger("ajaxStop")
}}}else{if(!k&&j&&(j.readyState==4||y=="timeout")){k=true;
if(p){clearInterval(p);
p=null
}r=y=="timeout"?"timeout":!I.httpSuccess(j)?"error":m.ifModified&&I.httpNotModified(j,m.url)?"notmodified":"success";
if(r=="success"){try{v=I.httpData(j,m.dataType,m)
}catch(z){r="parsererror"
}}if(r=="success"){var x;
try{x=j.getResponseHeader("Last-Modified")
}catch(z){}if(m.ifModified&&x){I.lastModified[m.url]=x
}if(!w){i()
}}else{I.handleError(m,j,r)
}l();
if(y){j.abort()
}if(m.async){j=null
}}}};
if(m.async){var p=setInterval(n,13);
if(m.timeout>0){setTimeout(function(){if(j&&!k){n("timeout")
}},m.timeout)
}}try{j.send(m.data)
}catch(s){I.handleError(m,j,null,s)
}if(!m.async){n()
}function i(){if(m.success){m.success(v,r)
}if(m.global){I.event.trigger("ajaxSuccess",[j,m])
}}function l(){if(m.complete){m.complete(j,r)
}if(m.global){I.event.trigger("ajaxComplete",[j,m])
}if(m.global&&!--I.active){I.event.trigger("ajaxStop")
}}return j
},handleError:function(h,f,g,e){if(h.error){h.error(f,g,e)
}if(h.global){I.event.trigger("ajaxError",[f,h,e])
}},active:0,httpSuccess:function(f){try{return !f.status&&location.protocol=="file:"||(f.status>=200&&f.status<300)||f.status==304||f.status==1223
}catch(e){}return false
},httpNotModified:function(e,g){try{var f=e.getResponseHeader("Last-Modified");
return e.status==304||f==I.lastModified[g]
}catch(h){}return false
},httpData:function(f,j,i){var h=f.getResponseHeader("content-type"),g=j=="xml"||!j&&h&&h.indexOf("xml")>=0,e=g?f.responseXML:f.responseText;
if(g&&e.documentElement.tagName=="parsererror"){throw"parsererror"
}if(i&&i.dataFilter){e=i.dataFilter(e,j)
}if(typeof e==="string"){if(j=="script"){I.globalEval(e)
}if(j=="json"){e=D["eval"]("("+e+")")
}}return e
},param:function(g){var e=[];
function f(i,j){e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(j)
}if(I.isArray(g)||g.jquery){I.each(g,function(){f(this.name,this.value)
})
}else{for(var h in g){if(I.isArray(g[h])){I.each(g[h],function(){f(h,this)
})
}else{f(h,I.isFunction(g[h])?g[h]():g[h])
}}}return e.join("&").replace(/%20/g,"+")
}});
var E={},F,b=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function Z(e,g){var f={};
I.each(b.concat.apply([],b.slice(0,g)),function(){f[this]=e
});
return f
}I.fn.extend({show:function(e,g){if(e){return this.animate(Z("show",3),e,g)
}else{for(var k=0,i=this.length;
k<i;
k++){var h=I.data(this[k],"olddisplay");
this[k].style.display=h||"";
if(I.css(this[k],"display")==="none"){var j=this[k].tagName,f;
if(E[j]){f=E[j]
}else{var l=I("<"+j+" />").appendTo("body");
f=l.css("display");
if(f==="none"){f="block"
}l.remove();
E[j]=f
}I.data(this[k],"olddisplay",f)
}}for(var k=0,i=this.length;
k<i;
k++){this[k].style.display=I.data(this[k],"olddisplay")||""
}return this
}},hide:function(e,f){if(e){return this.animate(Z("hide",3),e,f)
}else{for(var i=0,h=this.length;
i<h;
i++){var g=I.data(this[i],"olddisplay");
if(!g&&g!=="none"){I.data(this[i],"olddisplay",I.css(this[i],"display"))
}}for(var i=0,h=this.length;
i<h;
i++){this[i].style.display="none"
}return this
}},_toggle:I.fn.toggle,toggle:function(f,e){var g=typeof f==="boolean";
return I.isFunction(f)&&I.isFunction(e)?this._toggle.apply(this,arguments):f==null||g?this.each(function(){var h=g?f:I(this).is(":hidden");
I(this)[h?"show":"hide"]()
}):this.animate(Z("toggle",3),f,e)
},fadeTo:function(g,f,e){return this.animate({opacity:f},g,e)
},animate:function(f,h,e,i){var g=I.speed(h,e,i);
return this[g.queue===false?"each":"queue"](function(){var k=I.extend({},g),m,l=this.nodeType==1&&I(this).is(":hidden"),j=this;
for(m in f){if(f[m]=="hide"&&l||f[m]=="show"&&!l){return k.complete.call(this)
}if((m=="height"||m=="width")&&this.style){k.display=I.css(this,"display");
k.overflow=this.style.overflow
}}if(k.overflow!=null){this.style.overflow="hidden"
}k.curAnim=I.extend({},f);
I.each(f,function(n,r){var q=new I.fx(j,k,n);
if(/toggle|show|hide/.test(r)){q[r=="toggle"?l?"show":"hide":r](f)
}else{var p=r.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),s=q.cur(true)||0;
if(p){var t=parseFloat(p[2]),o=p[3]||"px";
if(o!="px"){j.style[n]=(t||1)+o;
s=((t||1)/q.cur(true))*s;
j.style[n]=s+o
}if(p[1]){t=((p[1]=="-="?-1:1)*t)+s
}q.custom(s,t,o)
}else{q.custom(s,r,"")
}}});
return true
})
},stop:function(e,g){var f=I.timers;
if(e){this.queue([])
}this.each(function(){for(var h=f.length-1;
h>=0;
h--){if(f[h].elem==this){if(g){f[h](true)
}f.splice(h,1)
}}});
if(!g){this.dequeue()
}return this
}});
I.each({slideDown:Z("show",1),slideUp:Z("hide",1),slideToggle:Z("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(e,f){I.fn[e]=function(g,h){return this.animate(f,g,h)
}
});
I.extend({speed:function(e,f,h){var g=typeof e==="object"?e:{complete:h||!h&&f||I.isFunction(e)&&e,duration:e,easing:h&&f||f&&!I.isFunction(f)&&f};
g.duration=I.fx.off?0:typeof g.duration==="number"?g.duration:I.fx.speeds[g.duration]||I.fx.speeds._default;
g.old=g.complete;
g.complete=function(){if(g.queue!==false){I(this).dequeue()
}if(I.isFunction(g.old)){g.old.call(this)
}};
return g
},easing:{linear:function(e,f,g,h){return g+h*e
},swing:function(e,f,g,h){return((-Math.cos(e*Math.PI)/2)+0.5)*h+g
}},timers:[],fx:function(e,g,f){this.options=g;
this.elem=e;
this.prop=f;
if(!g.orig){g.orig={}
}}});
I.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(I.fx.step[this.prop]||I.fx.step._default)(this);
if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(f){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var e=parseFloat(I.css(this.elem,this.prop,f));
return e&&e>-10000?e:parseFloat(I.curCSS(this.elem,this.prop))||0
},custom:function(f,e,i){this.startTime=S();
this.start=f;
this.end=e;
this.unit=i||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
var g=this;
function h(j){return g.step(j)
}h.elem=this.elem;
if(h()&&I.timers.push(h)&&!F){F=setInterval(function(){var k=I.timers;
for(var j=0;
j<k.length;
j++){if(!k[j]()){k.splice(j--,1)
}}if(!k.length){clearInterval(F);
F=V
}},13)
}},show:function(){this.options.orig[this.prop]=I.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());
I(this.elem).show()
},hide:function(){this.options.orig[this.prop]=I.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(j){var i=S();
if(j||i>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var g=true;
for(var h in this.options.curAnim){if(this.options.curAnim[h]!==true){g=false
}}if(g){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(I.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){I(this.elem).hide()
}if(this.options.hide||this.options.show){for(var e in this.options.curAnim){I.attr(this.elem.style,e,this.options.orig[e])
}}this.options.complete.call(this.elem)
}return false
}else{var f=i-this.startTime;
this.state=f/this.options.duration;
this.pos=I.easing[this.options.easing||(I.easing.swing?"swing":"linear")](this.state,f,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
I.extend(I.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(e){I.attr(e.elem.style,"opacity",e.now)
},_default:function(e){if(e.elem.style&&e.elem.style[e.prop]!=null){e.elem.style[e.prop]=e.now+e.unit
}else{e.elem[e.prop]=e.now
}}}});
if(document.documentElement.getBoundingClientRect){I.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return I.offset.bodyOffset(this[0])
}var i=this[0].getBoundingClientRect(),l=this[0].ownerDocument,h=l.body,g=l.documentElement,f=g.clientTop||h.clientTop||0,e=g.clientLeft||h.clientLeft||0,k=i.top+(self.pageYOffset||I.boxModel&&g.scrollTop||h.scrollTop)-f,j=i.left+(self.pageXOffset||I.boxModel&&g.scrollLeft||h.scrollLeft)-e;
return{top:k,left:j}
}
}else{I.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return I.offset.bodyOffset(this[0])
}I.offset.initialized||I.offset.initialize();
var g=this[0],o=g.offsetParent,n=g,l=g.ownerDocument,j,e=l.documentElement,h=l.body,i=l.defaultView,m=i.getComputedStyle(g,null),k=g.offsetTop,f=g.offsetLeft;
while((g=g.parentNode)&&g!==h&&g!==e){j=i.getComputedStyle(g,null);
k-=g.scrollTop,f-=g.scrollLeft;
if(g===o){k+=g.offsetTop,f+=g.offsetLeft;
if(I.offset.doesNotAddBorder&&!(I.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(g.tagName))){k+=parseInt(j.borderTopWidth,10)||0,f+=parseInt(j.borderLeftWidth,10)||0
}n=o,o=g.offsetParent
}if(I.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseInt(j.borderTopWidth,10)||0,f+=parseInt(j.borderLeftWidth,10)||0
}m=j
}if(m.position==="relative"||m.position==="static"){k+=h.offsetTop,f+=h.offsetLeft
}if(m.position==="fixed"){k+=Math.max(e.scrollTop,h.scrollTop),f+=Math.max(e.scrollLeft,h.scrollLeft)
}return{top:k,left:f}
}
}I.offset={initialize:function(){if(this.initialized){return 
}var j=document.body,n=document.createElement("div"),f,e,l,g,k,m,h=j.style.marginTop,i='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
k={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(m in k){n.style[m]=k[m]
}n.innerHTML=i;
j.insertBefore(n,j.firstChild);
f=n.firstChild,e=f.firstChild,g=f.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(e.offsetTop!==5);
this.doesAddBorderForTableAndCells=(g.offsetTop===5);
f.style.overflow="hidden",f.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(e.offsetTop===-5);
j.style.marginTop="1px";
this.doesNotIncludeMarginInBodyOffset=(j.offsetTop===0);
j.style.marginTop=h;
j.removeChild(n);
this.initialized=true
},bodyOffset:function(g){I.offset.initialized||I.offset.initialize();
var f=g.offsetTop,e=g.offsetLeft;
if(I.offset.doesNotIncludeMarginInBodyOffset){f+=parseInt(I.curCSS(g,"marginTop",true),10)||0,e+=parseInt(I.curCSS(g,"marginLeft",true),10)||0
}return{top:f,left:e}
}};
I.fn.extend({position:function(){var e=0,j=0,h;
if(this[0]){var i=this.offsetParent(),f=this.offset(),g=/^body|html$/i.test(i[0].tagName)?{top:0,left:0}:i.offset();
f.top-=B(this,"marginTop");
f.left-=B(this,"marginLeft");
g.top+=B(i,"borderTopWidth");
g.left+=B(i,"borderLeftWidth");
h={top:f.top-g.top,left:f.left-g.left}
}return h
},offsetParent:function(){var e=this[0].offsetParent||document.body;
while(e&&(!/^body|html$/i.test(e.tagName)&&I.css(e,"position")=="static")){e=e.offsetParent
}return I(e)
}});
I.each(["Left","Top"],function(e,g){var f="scroll"+g;
I.fn[f]=function(h){if(!this[0]){return null
}return h!==V?this.each(function(){this==D||this==document?D.scrollTo(!e?h:I(D).scrollLeft(),e?h:I(D).scrollTop()):this[f]=h
}):this[0]==D||this[0]==document?self[e?"pageYOffset":"pageXOffset"]||I.boxModel&&document.documentElement[f]||document.body[f]:this[0][f]
}
});
I.each(["Height","Width"],function(e,i){var g=e?"Left":"Top",j=e?"Right":"Bottom",h=i.toLowerCase();
I.fn["inner"+i]=function(){return this[0]?I.css(this[0],h,false,"padding"):null
};
I.fn["outer"+i]=function(k){return this[0]?I.css(this[0],h,false,k?"margin":"border"):null
};
var f=i.toLowerCase();
I.fn[f]=function(k){return this[0]==D?document.compatMode=="CSS1Compat"&&document.documentElement["client"+i]||document.body["client"+i]:this[0]==document?Math.max(document.documentElement["client"+i],document.body["scroll"+i],document.documentElement["scroll"+i],document.body["offset"+i],document.documentElement["offset"+i]):k===V?(this.length?I.css(this[0],f):null):this.css(f,typeof k==="string"?k:k+"px")
}
})
})();