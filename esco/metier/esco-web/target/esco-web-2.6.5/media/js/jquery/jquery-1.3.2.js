(function(){var w=this,AB,AF=w.jQuery,p=w.$,r=w.jQuery=w.$=function(A,B){return new r.fn.init(A,B)
},o=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,AC=/^.[^:#\[\.,]*$/;
r.fn=r.prototype={init:function(D,A){D=D||document;
if(D.nodeType){this[0]=D;
this.length=1;
this.context=D;
return this
}if(typeof D==="string"){var B=o.exec(D);
if(B&&(B[1]||!A)){if(B[1]){D=r.clean([B[1]],A)
}else{var E=document.getElementById(B[3]);
if(E&&E.id!=B[3]){return r().find(D)
}var C=r(E||[]);
C.context=document;
C.selector=D;
return C
}}else{return r(A).find(D)
}}else{if(r.isFunction(D)){return r(document).ready(D)
}}if(D.selector&&D.context){this.selector=D.selector;
this.context=D.context
}return this.setArray(r.isArray(D)?D:r.makeArray(D))
},selector:"",jquery:"1.3.2",size:function(){return this.length
},get:function(A){return A===AB?Array.prototype.slice.call(this):this[A]
},pushStack:function(B,D,C){var A=r(B);
A.prevObject=this;
A.context=this.context;
if(D==="find"){A.selector=this.selector+(this.selector?" ":"")+C
}else{if(D){A.selector=this.selector+"."+D+"("+C+")"
}}return A
},setArray:function(A){this.length=0;
Array.prototype.push.apply(this,A);
return this
},each:function(B,A){return r.each(this,B,A)
},index:function(A){return r.inArray(A&&A.jquery?A[0]:A,this)
},attr:function(B,D,A){var C=B;
if(typeof B==="string"){if(D===AB){return this[0]&&r[A||"attr"](this[0],B)
}else{C={};
C[B]=D
}}return this.each(function(E){for(B in C){r.attr(A?this.style:this,B,r.prop(this,C[B],A,E,B))
}})
},css:function(A,B){if((A=="width"||A=="height")&&parseFloat(B)<0){B=AB
}return this.attr(A,B,"curCSS")
},text:function(B){if(typeof B!=="object"&&B!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(B))
}var A="";
r.each(B||this,function(){r.each(this.childNodes,function(){if(this.nodeType!=8){A+=this.nodeType!=1?this.nodeValue:r.fn.text([this])
}})
});
return A
},wrapAll:function(A){if(this[0]){var B=r(A,this[0].ownerDocument).clone();
if(this[0].parentNode){B.insertBefore(this[0])
}B.map(function(){var C=this;
while(C.firstChild){C=C.firstChild
}return C
}).append(this)
}return this
},wrapInner:function(A){return this.each(function(){r(this).contents().wrapAll(A)
})
},wrap:function(A){return this.each(function(){r(this).wrapAll(A)
})
},append:function(){return this.domManip(arguments,true,function(A){if(this.nodeType==1){this.appendChild(A)
}})
},prepend:function(){return this.domManip(arguments,true,function(A){if(this.nodeType==1){this.insertBefore(A,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,function(A){this.parentNode.insertBefore(A,this)
})
},after:function(){return this.domManip(arguments,false,function(A){this.parentNode.insertBefore(A,this.nextSibling)
})
},end:function(){return this.prevObject||r([])
},push:[].push,sort:[].sort,splice:[].splice,find:function(A){if(this.length===1){var B=this.pushStack([],"find",A);
B.length=0;
r.find(A,this[0],B);
return B
}else{return this.pushStack(r.unique(r.map(this,function(C){return r.find(A,C)
})),"find",A)
}},clone:function(A){var C=this.map(function(){if(!r.support.noCloneEvent&&!r.isXMLDoc(this)){var F=this.outerHTML;
if(!F){var E=this.ownerDocument.createElement("div");
E.appendChild(this.cloneNode(true));
F=E.innerHTML
}return r.clean([F.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]
}else{return this.cloneNode(true)
}});
if(A===true){var D=this.find("*").andSelf(),B=0;
C.find("*").andSelf().each(function(){if(this.nodeName!==D[B].nodeName){return 
}var G=r.data(D[B],"events");
for(var E in G){for(var F in G[E]){r.event.add(this,E,G[E][F],G[E][F].data)
}}B++
})
}return C
},filter:function(A){return this.pushStack(r.isFunction(A)&&r.grep(this,function(B,C){return A.call(B,C)
})||r.multiFilter(A,r.grep(this,function(B){return B.nodeType===1
})),"filter",A)
},closest:function(B){var C=r.expr.match.POS.test(B)?r(B):null,A=0;
return this.map(function(){var D=this;
while(D&&D.ownerDocument){if(C?C.index(D)>-1:r(D).is(B)){r.data(D,"closest",A);
return D
}D=D.parentNode;
A++
}})
},not:function(A){if(typeof A==="string"){if(AC.test(A)){return this.pushStack(r.multiFilter(A,this,true),"not",A)
}else{A=r.multiFilter(A,this)
}}var B=A.length&&A[A.length-1]!==AB&&!A.nodeType;
return this.filter(function(){return B?r.inArray(this,A)<0:this!=A
})
},add:function(A){return this.pushStack(r.unique(r.merge(this.get(),typeof A==="string"?r(A):r.makeArray(A))))
},is:function(A){return !!A&&r.multiFilter(A,this).length>0
},hasClass:function(A){return !!A&&this.is("."+A)
},val:function(H){if(H===AB){var E=this[0];
if(E){if(r.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text
}if(r.nodeName(E,"select")){var A=E.selectedIndex,G=[],F=E.options,B=E.type=="select-one";
if(A<0){return null
}for(var D=B?A:0,I=B?A+1:F.length;
D<I;
D++){var C=F[D];
if(C.selected){H=r(C).val();
if(B){return H
}G.push(H)
}}return G
}return(E.value||"").replace(/\r/g,"")
}return AB
}if(typeof H==="number"){H+=""
}return this.each(function(){if(this.nodeType!=1){return 
}if(r.isArray(H)&&/radio|checkbox/.test(this.type)){this.checked=(r.inArray(this.value,H)>=0||r.inArray(this.name,H)>=0)
}else{if(r.nodeName(this,"select")){var J=r.makeArray(H);
r("option",this).each(function(){this.selected=(r.inArray(this.value,J)>=0||r.inArray(this.text,J)>=0)
});
if(!J.length){this.selectedIndex=-1
}}else{this.value=H
}}})
},html:function(A){return A===AB?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(A)
},replaceWith:function(A){return this.after(A).remove()
},eq:function(A){return this.slice(A,+A+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))
},map:function(A){return this.pushStack(r.map(this,function(B,C){return A.call(B,C,B)
}))
},andSelf:function(){return this.add(this.prevObject)
},domManip:function(I,F,G){if(this[0]){var A=(this[0].ownerDocument||this[0]).createDocumentFragment(),D=r.clean(I,(this[0].ownerDocument||this[0]),A),B=A.firstChild;
if(B){for(var C=0,E=this.length;
C<E;
C++){G.call(H(this[C],B),this.length>1||C>0?A.cloneNode(true):A)
}}if(D){r.each(D,AE)
}}return this;
function H(K,J){return F&&r.nodeName(K,"table")&&r.nodeName(J,"tr")?(K.getElementsByTagName("tbody")[0]||K.appendChild(K.ownerDocument.createElement("tbody"))):K
}}};
r.fn.init.prototype=r.fn;
function AE(A,B){if(B.src){r.ajax({url:B.src,async:false,dataType:"script"})
}else{r.globalEval(B.text||B.textContent||B.innerHTML||"")
}if(B.parentNode){B.parentNode.removeChild(B)
}}function AD(){return +new Date
}r.extend=r.fn.extend=function(){var B=arguments[0]||{},D=1,C=arguments.length,G=false,E;
if(typeof B==="boolean"){G=B;
B=arguments[1]||{};
D=2
}if(typeof B!=="object"&&!r.isFunction(B)){B={}
}if(C==D){B=this;
--D
}for(;
D<C;
D++){if((E=arguments[D])!=null){for(var F in E){var A=B[F],H=E[F];
if(B===H){continue
}if(G&&H&&typeof H==="object"&&!H.nodeType){B[F]=r.extend(G,A||(H.length!=null?[]:{}),H)
}else{if(H!==AB){B[F]=H
}}}}}return B
};
var k=/z-?index|font-?weight|opacity|zoom|line-?height/i,n=document.defaultView||{},j=Object.prototype.toString;
r.extend({noConflict:function(A){w.$=p;
if(A){w.jQuery=AF
}return r
},isFunction:function(A){return j.call(A)==="[object Function]"
},isArray:function(A){return j.call(A)==="[object Array]"
},isXMLDoc:function(A){return A.nodeType===9&&A.documentElement.nodeName!=="HTML"||!!A.ownerDocument&&r.isXMLDoc(A.ownerDocument)
},globalEval:function(C){if(C&&/\S/.test(C)){var A=document.getElementsByTagName("head")[0]||document.documentElement,B=document.createElement("script");
B.type="text/javascript";
if(r.support.scriptEval){B.appendChild(document.createTextNode(C))
}else{B.text=C
}A.insertBefore(B,A.firstChild);
A.removeChild(B)
}},nodeName:function(B,A){return B.nodeName&&B.nodeName.toUpperCase()==A.toUpperCase()
},each:function(D,G,E){var F,C=0,B=D.length;
if(E){if(B===AB){for(F in D){if(G.apply(D[F],E)===false){break
}}}else{for(;
C<B;
){if(G.apply(D[C++],E)===false){break
}}}}else{if(B===AB){for(F in D){if(G.call(D[F],F,D[F])===false){break
}}}else{for(var A=D[0];
C<B&&G.call(A,C,A)!==false;
A=D[++C]){}}}return D
},prop:function(A,E,B,C,D){if(r.isFunction(E)){E=E.call(A,C)
}return typeof E==="number"&&B=="curCSS"&&!k.test(D)?E+"px":E
},className:{add:function(A,B){r.each((B||"").split(/\s+/),function(D,C){if(A.nodeType==1&&!r.className.has(A.className,C)){A.className+=(A.className?" ":"")+C
}})
},remove:function(A,B){if(A.nodeType==1){A.className=B!==AB?r.grep(A.className.split(/\s+/),function(C){return !r.className.has(B,C)
}).join(" "):""
}},has:function(B,A){return B&&r.inArray(A,(B.className||B).toString().split(/\s+/))>-1
}},swap:function(A,B,E){var D={};
for(var C in B){D[C]=A.style[C];
A.style[C]=B[C]
}E.call(A);
for(var C in B){A.style[C]=D[C]
}},css:function(D,F,B,G){if(F=="width"||F=="height"){var H,E={position:"absolute",visibility:"hidden",display:"block"},A=F=="width"?["Left","Right"]:["Top","Bottom"];
function C(){H=F=="width"?D.offsetWidth:D.offsetHeight;
if(G==="border"){return 
}r.each(A,function(){if(!G){H-=parseFloat(r.curCSS(D,"padding"+this,true))||0
}if(G==="margin"){H+=parseFloat(r.curCSS(D,"margin"+this,true))||0
}else{H-=parseFloat(r.curCSS(D,"border"+this+"Width",true))||0
}})
}if(D.offsetWidth!==0){C()
}else{r.swap(D,E,C)
}return Math.max(0,Math.round(H))
}return r.curCSS(D,F,B)
},curCSS:function(A,D,C){var G,E=A.style;
if(D=="opacity"&&!r.support.opacity){G=r.attr(E,"opacity");
return G==""?"1":G
}if(D.match(/float/i)){D=AH
}if(!C&&E&&E[D]){G=E[D]
}else{if(n.getComputedStyle){if(D.match(/float/i)){D="float"
}D=D.replace(/([A-Z])/g,"-$1").toLowerCase();
var F=n.getComputedStyle(A,null);
if(F){G=F.getPropertyValue(D)
}if(D=="opacity"&&G==""){G="1"
}}else{if(A.currentStyle){var I=D.replace(/\-(\w)/g,function(K,J){return J.toUpperCase()
});
G=A.currentStyle[D]||A.currentStyle[I];
if(!/^\d+(px)?$/i.test(G)&&/^\d/.test(G)){var B=E.left,H=A.runtimeStyle.left;
A.runtimeStyle.left=A.currentStyle.left;
E.left=G||0;
G=E.pixelLeft+"px";
E.left=B;
A.runtimeStyle.left=H
}}}}return G
},clean:function(F,A,C){A=A||document;
if(typeof A.createElement==="undefined"){A=A.ownerDocument||A[0]&&A[0].ownerDocument||document
}if(!C&&F.length===1&&typeof F[0]==="string"){var D=/^<(\w+)\s*\/?>$/.exec(F[0]);
if(D){return[A.createElement(D[1])]
}}var E=[],G=[],H=A.createElement("div");
r.each(F,function(I,M){if(typeof M==="number"){M+=""
}if(!M){return 
}if(typeof M==="string"){M=M.replace(/(<(\w+)[^>]*?)\/>/g,function(Q,P,R){return R.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?Q:P+"></"+R+">"
});
var J=M.replace(/^\s+/,"").substring(0,10).toLowerCase();
var O=!J.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!J.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||J.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!J.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!J.indexOf("<td")||!J.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!J.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!r.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
H.innerHTML=O[1]+M+O[2];
while(O[0]--){H=H.lastChild
}if(!r.support.tbody){var N=/<tbody/i.test(M),K=!J.indexOf("<table")&&!N?H.firstChild&&H.firstChild.childNodes:O[1]=="<table>"&&!N?H.childNodes:[];
for(var L=K.length-1;
L>=0;
--L){if(r.nodeName(K[L],"tbody")&&!K[L].childNodes.length){K[L].parentNode.removeChild(K[L])
}}}if(!r.support.leadingWhitespace&&/^\s/.test(M)){H.insertBefore(A.createTextNode(M.match(/^\s*/)[0]),H.firstChild)
}M=r.makeArray(H.childNodes)
}if(M.nodeType){E.push(M)
}else{E=r.merge(E,M)
}});
if(C){for(var B=0;
E[B];
B++){if(r.nodeName(E[B],"script")&&(!E[B].type||E[B].type.toLowerCase()==="text/javascript")){G.push(E[B].parentNode?E[B].parentNode.removeChild(E[B]):E[B])
}else{if(E[B].nodeType===1){E.splice.apply(E,[B+1,0].concat(r.makeArray(E[B].getElementsByTagName("script"))))
}C.appendChild(E[B])
}}return G
}return E
},attr:function(B,E,A){if(!B||B.nodeType==3||B.nodeType==8){return AB
}var D=!r.isXMLDoc(B),H=A!==AB;
E=D&&r.props[E]||E;
if(B.tagName){var F=/href|src|style/.test(E);
if(E=="selected"&&B.parentNode){B.parentNode.selectedIndex
}if(E in B&&D&&!F){if(H){if(E=="type"&&r.nodeName(B,"input")&&B.parentNode){throw"type property can't be changed"
}B[E]=A
}if(r.nodeName(B,"form")&&B.getAttributeNode(E)){return B.getAttributeNode(E).nodeValue
}if(E=="tabIndex"){var C=B.getAttributeNode("tabIndex");
return C&&C.specified?C.value:B.nodeName.match(/(button|input|object|select|textarea)/i)?0:B.nodeName.match(/^(a|area)$/i)&&B.href?0:AB
}return B[E]
}if(!r.support.style&&D&&E=="style"){return r.attr(B.style,"cssText",A)
}if(H){B.setAttribute(E,""+A)
}var G=!r.support.hrefNormalized&&D&&F?B.getAttribute(E,2):B.getAttribute(E);
return G===null?AB:G
}if(!r.support.opacity&&E=="opacity"){if(H){B.zoom=1;
B.filter=(B.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(A)+""=="NaN"?"":"alpha(opacity="+A*100+")")
}return B.filter&&B.filter.indexOf("opacity=")>=0?(parseFloat(B.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}E=E.replace(/-([a-z])/ig,function(J,I){return I.toUpperCase()
});
if(H){B[E]=A
}return B[E]
},trim:function(A){return(A||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(C){var B=[];
if(C!=null){var A=C.length;
if(A==null||typeof C==="string"||r.isFunction(C)||C.setInterval){B[0]=C
}else{while(A){B[--A]=C[A]
}}}return B
},inArray:function(A,D){for(var C=0,B=D.length;
C<B;
C++){if(D[C]===A){return C
}}return -1
},merge:function(A,D){var C=0,B,E=A.length;
if(!r.support.getAll){while((B=D[C++])!=null){if(B.nodeType!=8){A[E++]=B
}}}else{while((B=D[C++])!=null){A[E++]=B
}}return A
},unique:function(G){var E=[],F={};
try{for(var D=0,C=G.length;
D<C;
D++){var A=r.data(G[D]);
if(!F[A]){F[A]=true;
E.push(G[D])
}}}catch(B){E=G
}return E
},grep:function(D,F,E){var C=[];
for(var B=0,A=D.length;
B<A;
B++){if(!E!=!F(D[B],B)){C.push(D[B])
}}return C
},map:function(E,F){var D=[];
for(var C=0,B=E.length;
C<B;
C++){var A=F(E[C],C);
if(A!=null){D[D.length]=A
}}return D.concat.apply([],D)
}});
var q=navigator.userAgent.toLowerCase();
r.browser={version:(q.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(q),opera:/opera/.test(q),msie:/msie/.test(q)&&!/opera/.test(q),mozilla:/mozilla/.test(q)&&!/(compatible|webkit)/.test(q)};
r.each({parent:function(A){return A.parentNode
},parents:function(A){return r.dir(A,"parentNode")
},next:function(A){return r.nth(A,2,"nextSibling")
},prev:function(A){return r.nth(A,2,"previousSibling")
},nextAll:function(A){return r.dir(A,"nextSibling")
},prevAll:function(A){return r.dir(A,"previousSibling")
},siblings:function(A){return r.sibling(A.parentNode.firstChild,A)
},children:function(A){return r.sibling(A.firstChild)
},contents:function(A){return r.nodeName(A,"iframe")?A.contentDocument||A.contentWindow.document:r.makeArray(A.childNodes)
}},function(A,B){r.fn[A]=function(D){var C=r.map(this,B);
if(D&&typeof D=="string"){C=r.multiFilter(D,C)
}return this.pushStack(r.unique(C),A,D)
}
});
r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(A,B){r.fn[A]=function(G){var D=[],H=r(G);
for(var C=0,F=H.length;
C<F;
C++){var E=(C>0?this.clone(true):this).get();
r.fn[B].apply(r(H[C]),E);
D=D.concat(E)
}return this.pushStack(D,A,G)
}
});
r.each({removeAttr:function(A){r.attr(this,A,"");
if(this.nodeType==1){this.removeAttribute(A)
}},addClass:function(A){r.className.add(this,A)
},removeClass:function(A){r.className.remove(this,A)
},toggleClass:function(B,A){if(typeof A!=="boolean"){A=!r.className.has(this,B)
}r.className[A?"add":"remove"](this,B)
},remove:function(A){if(!A||r.filter(A,[this]).length){r("*",this).add([this]).each(function(){r.event.remove(this);
r.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){r(this).children().remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(A,B){r.fn[A]=function(){return this.each(B,arguments)
}
});
function y(A,B){return A[0]&&parseInt(r.curCSS(A[0],B,true),10)||0
}var AA="jQuery"+AD(),e=0,t={};
r.extend({cache:{},data:function(B,C,A){B=B==w?t:B;
var D=B[AA];
if(!D){D=B[AA]=++e
}if(C&&!r.cache[D]){r.cache[D]={}
}if(A!==AB){r.cache[D][C]=A
}return C?r.cache[D][C]:D
},removeData:function(B,C){B=B==w?t:B;
var D=B[AA];
if(C){if(r.cache[D]){delete r.cache[D][C];
C="";
for(C in r.cache[D]){break
}if(!C){r.removeData(B)
}}}else{try{delete B[AA]
}catch(A){if(B.removeAttribute){B.removeAttribute(AA)
}}delete r.cache[D]
}},queue:function(B,C,D){if(B){C=(C||"fx")+"queue";
var A=r.data(B,C);
if(!A||r.isArray(D)){A=r.data(B,C,r.makeArray(D))
}else{if(D){A.push(D)
}}}return A
},dequeue:function(D,A){var C=r.queue(D,A),B=C.shift();
if(!A||A==="fx"){B=C[0]
}if(B!==AB){B.call(D)
}}});
r.fn.extend({data:function(C,A){var D=C.split(".");
D[1]=D[1]?"."+D[1]:"";
if(A===AB){var B=this.triggerHandler("getData"+D[1]+"!",[D[0]]);
if(B===AB&&this.length){B=r.data(this[0],C)
}return B===AB&&D[1]?this.data(D[0]):B
}else{return this.trigger("setData"+D[1]+"!",[D[0],A]).each(function(){r.data(this,C,A)
})
}},removeData:function(A){return this.each(function(){r.removeData(this,A)
})
},queue:function(A,B){if(typeof A!=="string"){B=A;
A="fx"
}if(B===AB){return r.queue(this[0],A)
}return this.each(function(){var C=r.queue(this,A,B);
if(A=="fx"&&C.length==1){C[0].call(this)
}})
},dequeue:function(A){return this.each(function(){r.dequeue(this,A)
})
}});
(function(){var J=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,A=0,E=Object.prototype.toString;
var G=function(P,b,a,Z){a=a||[];
b=b||document;
if(b.nodeType!==1&&b.nodeType!==9){return[]
}if(!P||typeof P!=="string"){return a
}var AI=[],R,W,T,d,Y,S,Q=true;
J.lastIndex=0;
while((R=J.exec(P))!==null){AI.push(R[1]);
if(R[2]){S=RegExp.rightContext;
break
}}if(AI.length>1&&O.exec(P)){if(AI.length===2&&D.relative[AI[0]]){W=C(AI[0]+AI[1],b)
}else{W=D.relative[AI[0]]?[b]:G(AI.shift(),b);
while(AI.length){P=AI.shift();
if(D.relative[P]){P+=AI.shift()
}W=C(P,W)
}}}else{var X=Z?{expr:AI.pop(),set:H(Z)}:G.find(AI.pop(),AI.length===1&&b.parentNode?b.parentNode:b,K(b));
W=G.filter(X.expr,X.set);
if(AI.length>0){T=H(W)
}else{Q=false
}while(AI.length){var U=AI.pop(),V=U;
if(!D.relative[U]){U=""
}else{V=AI.pop()
}if(V==null){V=b
}D.relative[U](T,V,K(b))
}}if(!T){T=W
}if(!T){throw"Syntax error, unrecognized expression: "+(U||P)
}if(E.call(T)==="[object Array]"){if(!Q){a.push.apply(a,T)
}else{if(b.nodeType===1){for(var c=0;
T[c]!=null;
c++){if(T[c]&&(T[c]===true||T[c].nodeType===1&&B(b,T[c]))){a.push(W[c])
}}}else{for(var c=0;
T[c]!=null;
c++){if(T[c]&&T[c].nodeType===1){a.push(W[c])
}}}}}else{H(T,a)
}if(S){G(S,b,a,Z);
if(F){hasDuplicate=false;
a.sort(F);
if(hasDuplicate){for(var c=1;
c<a.length;
c++){if(a[c]===a[c-1]){a.splice(c--,1)
}}}}}return a
};
G.matches=function(Q,P){return G(Q,null,null,P)
};
G.find=function(Q,R,P){var S,U;
if(!Q){return[]
}for(var V=0,W=D.order.length;
V<W;
V++){var T=D.order[V],U;
if((U=D.match[T].exec(Q))){var X=RegExp.leftContext;
if(X.substr(X.length-1)!=="\\"){U[1]=(U[1]||"").replace(/\\/g,"");
S=D.find[T](U,R,P);
if(S!=null){Q=Q.replace(D.match[T],"");
break
}}}}if(!S){S=R.getElementsByTagName("*")
}return{set:S,expr:Q}
};
G.filter=function(Y,Z,V,R){var S=Y,T=[],c=Z,P,d,AI=Z&&Z[0]&&K(Z[0]);
while(Y&&Z.length){for(var a in D.filter){if((P=D.match[a].exec(Y))!=null){var b=D.filter[a],U,W;
d=false;
if(c==T){T=[]
}if(D.preFilter[a]){P=D.preFilter[a](P,c,V,T,R,AI);
if(!P){d=U=true
}else{if(P===true){continue
}}}if(P){for(var Q=0;
(W=c[Q])!=null;
Q++){if(W){U=b(W,P,Q,c);
var X=R^!!U;
if(V&&U!=null){if(X){d=true
}else{c[Q]=false
}}else{if(X){T.push(W);
d=true
}}}}}if(U!==AB){if(!V){c=T
}Y=Y.replace(D.match[a],"");
if(!d){return[]
}break
}}}if(Y==S){if(d==null){throw"Syntax error, unrecognized expression: "+Y
}else{break
}}S=Y
}return c
};
var D=G.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(P){return P.getAttribute("href")
}},relative:{"+":function(Q,R,S){var U=typeof R==="string",P=U&&!/\W/.test(R),T=U&&!P;
if(P&&!S){R=R.toUpperCase()
}for(var V=0,W=Q.length,X;
V<W;
V++){if((X=Q[V])){while((X=X.previousSibling)&&X.nodeType!==1){}Q[V]=T||X&&X.nodeName===R?X||false:X===R
}}if(T){G.filter(R,Q,true)
}},">":function(S,P,R){var V=typeof P==="string";
if(V&&!/\W/.test(P)){P=R?P:P.toUpperCase();
for(var W=0,Q=S.length;
W<Q;
W++){var T=S[W];
if(T){var U=T.parentNode;
S[W]=U.nodeName===P?U:false
}}}else{for(var W=0,Q=S.length;
W<Q;
W++){var T=S[W];
if(T){S[W]=V?T.parentNode:T.parentNode===P
}}if(V){G.filter(P,S,true)
}}},"":function(P,R,T){var Q=A++,S=I;
if(!R.match(/\W/)){var U=R=T?R:R.toUpperCase();
S=L
}S("parentNode",R,Q,P,U,T)
},"~":function(P,R,T){var Q=A++,S=I;
if(typeof R==="string"&&!R.match(/\W/)){var U=R=T?R:R.toUpperCase();
S=L
}S("previousSibling",R,Q,P,U,T)
}},find:{ID:function(R,Q,P){if(typeof Q.getElementById!=="undefined"&&!P){var S=Q.getElementById(R[1]);
return S?[S]:[]
}},NAME:function(P,T,S){if(typeof T.getElementsByName!=="undefined"){var Q=[],U=T.getElementsByName(P[1]);
for(var V=0,R=U.length;
V<R;
V++){if(U[V].getAttribute("name")===P[1]){Q.push(U[V])
}}return Q.length===0?null:Q
}},TAG:function(Q,P){return P.getElementsByTagName(Q[1])
}},preFilter:{CLASS:function(V,P,W,Q,S,R){V=" "+V[1].replace(/\\/g,"")+" ";
if(R){return V
}for(var U=0,T;
(T=P[U])!=null;
U++){if(T){if(S^(T.className&&(" "+T.className+" ").indexOf(V)>=0)){if(!W){Q.push(T)
}}else{if(W){P[U]=false
}}}}return false
},ID:function(P){return P[1].replace(/\\/g,"")
},TAG:function(Q,R){for(var P=0;
R[P]===false;
P++){}return R[P]&&K(R[P])?Q[1]:Q[1].toUpperCase()
},CHILD:function(Q){if(Q[1]=="nth"){var P=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(Q[2]=="even"&&"2n"||Q[2]=="odd"&&"2n+1"||!/\D/.test(Q[2])&&"0n+"+Q[2]||Q[2]);
Q[2]=(P[1]+(P[2]||1))-0;
Q[3]=P[3]-0
}Q[0]=A++;
return Q
},ATTR:function(U,Q,P,R,T,S){var V=U[1].replace(/\\/g,"");
if(!S&&D.attrMap[V]){U[1]=D.attrMap[V]
}if(U[2]==="~="){U[4]=" "+U[4]+" "
}return U
},PSEUDO:function(U,R,Q,S,T){if(U[1]==="not"){if(U[3].match(J).length>1||/^\w/.test(U[3])){U[3]=G(U[3],null,null,R)
}else{var P=G.filter(U[3],R,Q,true^T);
if(!Q){S.push.apply(S,P)
}return false
}}else{if(D.match.POS.test(U[0])||D.match.CHILD.test(U[0])){return true
}}return U
},POS:function(P){P.unshift(true);
return P
}},filters:{enabled:function(P){return P.disabled===false&&P.type!=="hidden"
},disabled:function(P){return P.disabled===true
},checked:function(P){return P.checked===true
},selected:function(P){P.parentNode.selectedIndex;
return P.selected===true
},parent:function(P){return !!P.firstChild
},empty:function(P){return !P.firstChild
},has:function(P,Q,R){return !!G(R[3],P).length
},header:function(P){return/h\d/i.test(P.nodeName)
},text:function(P){return"text"===P.type
},radio:function(P){return"radio"===P.type
},checkbox:function(P){return"checkbox"===P.type
},file:function(P){return"file"===P.type
},password:function(P){return"password"===P.type
},submit:function(P){return"submit"===P.type
},image:function(P){return"image"===P.type
},reset:function(P){return"reset"===P.type
},button:function(P){return"button"===P.type||P.nodeName.toUpperCase()==="BUTTON"
},input:function(P){return/input|select|textarea|button/i.test(P.nodeName)
}},setFilters:{first:function(P,Q){return Q===0
},last:function(Q,R,S,P){return R===P.length-1
},even:function(P,Q){return Q%2===0
},odd:function(P,Q){return Q%2===1
},lt:function(P,Q,R){return Q<R[3]-0
},gt:function(P,Q,R){return Q>R[3]-0
},nth:function(P,Q,R){return R[3]-0==Q
},eq:function(P,Q,R){return R[3]-0==Q
}},filter:{PSEUDO:function(S,W,V,R){var P=W[1],U=D.filters[P];
if(U){return U(S,V,W,R)
}else{if(P==="contains"){return(S.textContent||S.innerText||"").indexOf(W[3])>=0
}else{if(P==="not"){var T=W[3];
for(var V=0,Q=T.length;
V<Q;
V++){if(T[V]===S){return false
}}return true
}}}},CHILD:function(S,W){var T=W[1],Y=S;
switch(T){case"only":case"first":while(Y=Y.previousSibling){if(Y.nodeType===1){return false
}}if(T=="first"){return true
}Y=S;
case"last":while(Y=Y.nextSibling){if(Y.nodeType===1){return false
}}return true;
case"nth":var X=W[2],P=W[3];
if(X==1&&P==0){return true
}var U=W[0],Q=S.parentNode;
if(Q&&(Q.sizcache!==U||!S.nodeIndex)){var V=0;
for(Y=Q.firstChild;
Y;
Y=Y.nextSibling){if(Y.nodeType===1){Y.nodeIndex=++V
}}Q.sizcache=U
}var R=S.nodeIndex-P;
if(X==0){return R==0
}else{return(R%X==0&&R/X>=0)
}}},ID:function(P,Q){return P.nodeType===1&&P.getAttribute("id")===Q
},TAG:function(P,Q){return(Q==="*"&&P.nodeType===1)||P.nodeName===Q
},CLASS:function(P,Q){return(" "+(P.className||P.getAttribute("class"))+" ").indexOf(Q)>-1
},ATTR:function(T,V){var P=V[1],R=D.attrHandle[P]?D.attrHandle[P](T):T[P]!=null?T[P]:T.getAttribute(P),S=R+"",U=V[2],Q=V[4];
return R==null?U==="!=":U==="="?S===Q:U==="*="?S.indexOf(Q)>=0:U==="~="?(" "+S+" ").indexOf(Q)>=0:!Q?S&&R!==false:U==="!="?S!=Q:U==="^="?S.indexOf(Q)===0:U==="$="?S.substr(S.length-Q.length)===Q:U==="|="?S===Q||S.substr(0,Q.length+1)===Q+"-":false
},POS:function(U,R,Q,T){var S=R[2],P=D.setFilters[S];
if(P){return P(U,Q,R,T)
}}}};
var O=D.match.POS;
for(var M in D.match){D.match[M]=RegExp(D.match[M].source+/(?![^\[]*\])(?![^\(]*\))/.source)
}var H=function(P,Q){P=Array.prototype.slice.call(P);
if(Q){Q.push.apply(Q,P);
return Q
}return P
};
try{Array.prototype.slice.call(document.documentElement.childNodes)
}catch(N){H=function(P,Q){var S=Q||[];
if(E.call(P)==="[object Array]"){Array.prototype.push.apply(S,P)
}else{if(typeof P.length==="number"){for(var R=0,T=P.length;
R<T;
R++){S.push(P[R])
}}else{for(var R=0;
P[R];
R++){S.push(P[R])
}}}return S
}
}var F;
if(document.documentElement.compareDocumentPosition){F=function(Q,R){var P=Q.compareDocumentPosition(R)&4?-1:Q===R?0:1;
if(P===0){hasDuplicate=true
}return P
}
}else{if("sourceIndex" in document.documentElement){F=function(Q,R){var P=Q.sourceIndex-R.sourceIndex;
if(P===0){hasDuplicate=true
}return P
}
}else{if(document.createRange){F=function(Q,S){var R=Q.ownerDocument.createRange(),T=S.ownerDocument.createRange();
R.selectNode(Q);
R.collapse(true);
T.selectNode(S);
T.collapse(true);
var P=R.compareBoundaryPoints(Range.START_TO_END,T);
if(P===0){hasDuplicate=true
}return P
}
}}}(function(){var Q=document.createElement("form"),P="script"+(new Date).getTime();
Q.innerHTML="<input name='"+P+"'/>";
var R=document.documentElement;
R.insertBefore(Q,R.firstChild);
if(!!document.getElementById(P)){D.find.ID=function(U,T,S){if(typeof T.getElementById!=="undefined"&&!S){var V=T.getElementById(U[1]);
return V?V.id===U[1]||typeof V.getAttributeNode!=="undefined"&&V.getAttributeNode("id").nodeValue===U[1]?[V]:AB:[]
}};
D.filter.ID=function(T,S){var U=typeof T.getAttributeNode!=="undefined"&&T.getAttributeNode("id");
return T.nodeType===1&&U&&U.nodeValue===S
}
}R.removeChild(Q)
})();
(function(){var P=document.createElement("div");
P.appendChild(document.createComment(""));
if(P.getElementsByTagName("*").length>0){D.find.TAG=function(S,T){var U=T.getElementsByTagName(S[1]);
if(S[1]==="*"){var Q=[];
for(var R=0;
U[R];
R++){if(U[R].nodeType===1){Q.push(U[R])
}}U=Q
}return U
}
}P.innerHTML="<a href='#'></a>";
if(P.firstChild&&typeof P.firstChild.getAttribute!=="undefined"&&P.firstChild.getAttribute("href")!=="#"){D.attrHandle.href=function(Q){return Q.getAttribute("href",2)
}
}})();
if(document.querySelectorAll){(function(){var Q=G,P=document.createElement("div");
P.innerHTML="<p class='TEST'></p>";
if(P.querySelectorAll&&P.querySelectorAll(".TEST").length===0){return 
}G=function(T,U,R,V){U=U||document;
if(!V&&U.nodeType===9&&!K(U)){try{return H(U.querySelectorAll(T),R)
}catch(S){}}return Q(T,U,R,V)
};
G.find=Q.find;
G.filter=Q.filter;
G.selectors=Q.selectors;
G.matches=Q.matches
})()
}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var P=document.createElement("div");
P.innerHTML="<div class='test e'></div><div class='test'></div>";
if(P.getElementsByClassName("e").length===0){return 
}P.lastChild.className="e";
if(P.getElementsByClassName("e").length===1){return 
}D.order.splice(1,0,"CLASS");
D.find.CLASS=function(S,R,Q){if(typeof R.getElementsByClassName!=="undefined"&&!Q){return R.getElementsByClassName(S[1])
}}
})()
}function L(Z,U,V,P,S,Q){var R=Z=="previousSibling"&&!Q;
for(var X=0,Y=P.length;
X<Y;
X++){var T=P[X];
if(T){if(R&&T.nodeType===1){T.sizcache=V;
T.sizset=X
}T=T[Z];
var W=false;
while(T){if(T.sizcache===V){W=P[T.sizset];
break
}if(T.nodeType===1&&!Q){T.sizcache=V;
T.sizset=X
}if(T.nodeName===U){W=T;
break
}T=T[Z]
}P[X]=W
}}}function I(Z,U,V,P,S,Q){var R=Z=="previousSibling"&&!Q;
for(var X=0,Y=P.length;
X<Y;
X++){var T=P[X];
if(T){if(R&&T.nodeType===1){T.sizcache=V;
T.sizset=X
}T=T[Z];
var W=false;
while(T){if(T.sizcache===V){W=P[T.sizset];
break
}if(T.nodeType===1){if(!Q){T.sizcache=V;
T.sizset=X
}if(typeof U!=="string"){if(T===U){W=true;
break
}}else{if(G.filter(U,[T]).length>0){W=T;
break
}}}T=T[Z]
}P[X]=W
}}}var B=document.compareDocumentPosition?function(P,Q){return P.compareDocumentPosition(Q)&16
}:function(P,Q){return P!==Q&&(P.contains?P.contains(Q):true)
};
var K=function(P){return P.nodeType===9&&P.documentElement.nodeName!=="HTML"||!!P.ownerDocument&&K(P.ownerDocument)
};
var C=function(Q,S){var V=[],U="",T,W=S.nodeType?[S]:S;
while((T=D.match.PSEUDO.exec(Q))){U+=T[0];
Q=Q.replace(D.match.PSEUDO,"")
}Q=D.relative[Q]?Q+"*":Q;
for(var R=0,P=W.length;
R<P;
R++){G(Q,W[R],V)
}return G.filter(U,V)
};
r.find=G;
r.filter=G.filter;
r.expr=G.selectors;
r.expr[":"]=r.expr.filters;
G.selectors.filters.hidden=function(P){return P.offsetWidth===0||P.offsetHeight===0
};
G.selectors.filters.visible=function(P){return P.offsetWidth>0||P.offsetHeight>0
};
G.selectors.filters.animated=function(P){return r.grep(r.timers,function(Q){return P===Q.elem
}).length
};
r.multiFilter=function(P,R,Q){if(Q){P=":not("+P+")"
}return G.matches(P,R)
};
r.dir=function(Q,R){var S=[],P=Q[R];
while(P&&P!=document){if(P.nodeType==1){S.push(P)
}P=P[R]
}return S
};
r.nth=function(P,T,R,Q){T=T||1;
var S=0;
for(;
P;
P=P[R]){if(P.nodeType==1&&++S==T){break
}}return P
};
r.sibling=function(P,Q){var R=[];
for(;
P;
P=P.nextSibling){if(P.nodeType==1&&P!=Q){R.push(P)
}}return R
};
return ;
w.Sizzle=G
})();
r.event={add:function(B,E,C,G){if(B.nodeType==3||B.nodeType==8){return 
}if(B.setInterval&&B!=w){B=w
}if(!C.guid){C.guid=this.guid++
}if(G!==AB){var D=C;
C=this.proxy(D);
C.data=G
}var F=r.data(B,"events")||r.data(B,"events",{}),A=r.data(B,"handle")||r.data(B,"handle",function(){return typeof r!=="undefined"&&!r.event.triggered?r.event.handle.apply(arguments.callee.elem,arguments):AB
});
A.elem=B;
r.each(E.split(/\s+/),function(J,I){var H=I.split(".");
I=H.shift();
C.type=H.slice().sort().join(".");
var K=F[I];
if(r.event.specialAll[I]){r.event.specialAll[I].setup.call(B,G,H)
}if(!K){K=F[I]={};
if(!r.event.special[I]||r.event.special[I].setup.call(B,G,H)===false){if(B.addEventListener){B.addEventListener(I,A,false)
}else{if(B.attachEvent){B.attachEvent("on"+I,A)
}}}}K[C.guid]=C;
r.event.global[I]=true
});
B=null
},guid:1,global:{},remove:function(A,D,B){if(A.nodeType==3||A.nodeType==8){return 
}var E=r.data(A,"events"),F,G;
if(E){if(D===AB||(typeof D==="string"&&D.charAt(0)==".")){for(var C in E){this.remove(A,C+(D||""))
}}else{if(D.type){B=D.handler;
D=D.type
}r.each(D.split(/\s+/),function(K,I){var L=I.split(".");
I=L.shift();
var J=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");
if(E[I]){if(B){delete E[I][B.guid]
}else{for(var M in E[I]){if(J.test(E[I][M].type)){delete E[I][M]
}}}if(r.event.specialAll[I]){r.event.specialAll[I].teardown.call(A,L)
}for(F in E[I]){break
}if(!F){if(!r.event.special[I]||r.event.special[I].teardown.call(A,L)===false){if(A.removeEventListener){A.removeEventListener(I,r.data(A,"handle"),false)
}else{if(A.detachEvent){A.detachEvent("on"+I,r.data(A,"handle"))
}}}F=null;
delete E[I]
}}})
}for(F in E){break
}if(!F){var H=r.data(A,"handle");
if(H){H.elem=null
}r.removeData(A,"events");
r.removeData(A,"handle")
}}},trigger:function(C,A,D,G){var E=C.type||C;
if(!G){C=typeof C==="object"?C[AA]?C:r.extend(r.Event(E),C):r.Event(E);
if(E.indexOf("!")>=0){C.type=E=E.slice(0,-1);
C.exclusive=true
}if(!D){C.stopPropagation();
if(this.global[E]){r.each(r.cache,function(){if(this.events&&this.events[E]){r.event.trigger(C,A,this.handle.elem)
}})
}}if(!D||D.nodeType==3||D.nodeType==8){return AB
}C.result=AB;
C.target=D;
A=r.makeArray(A);
A.unshift(C)
}C.currentTarget=D;
var B=r.data(D,"handle");
if(B){B.apply(D,A)
}if((!D[E]||(r.nodeName(D,"a")&&E=="click"))&&D["on"+E]&&D["on"+E].apply(D,A)===false){C.result=false
}if(!G&&D[E]&&!C.isDefaultPrevented()&&!(r.nodeName(D,"a")&&E=="click")){this.triggered=true;
try{D[E]()
}catch(H){}}this.triggered=false;
if(!C.isPropagationStopped()){var F=D.parentNode||D.ownerDocument;
if(F){r.event.trigger(C,A,F,true)
}}},handle:function(A){var B,G;
A=arguments[0]=r.event.fix(A||w.event);
A.currentTarget=this;
var H=A.type.split(".");
A.type=H.shift();
B=!H.length&&!A.exclusive;
var C=RegExp("(^|\\.)"+H.slice().sort().join(".*\\.")+"(\\.|$)");
G=(r.data(this,"events")||{})[A.type];
for(var E in G){var D=G[E];
if(B||C.test(D.type)){A.handler=D;
A.data=D.data;
var F=D.apply(this,arguments);
if(F!==AB){A.result=F;
if(F===false){A.preventDefault();
A.stopPropagation()
}}if(A.isImmediatePropagationStopped()){break
}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(B){if(B[AA]){return B
}var D=B;
B=r.Event(D);
for(var C=this.props.length,F;
C;
){F=this.props[--C];
B[F]=D[F]
}if(!B.target){B.target=B.srcElement||document
}if(B.target.nodeType==3){B.target=B.target.parentNode
}if(!B.relatedTarget&&B.fromElement){B.relatedTarget=B.fromElement==B.target?B.toElement:B.fromElement
}if(B.pageX==null&&B.clientX!=null){var A=document.documentElement,E=document.body;
B.pageX=B.clientX+(A&&A.scrollLeft||E&&E.scrollLeft||0)-(A.clientLeft||0);
B.pageY=B.clientY+(A&&A.scrollTop||E&&E.scrollTop||0)-(A.clientTop||0)
}if(!B.which&&((B.charCode||B.charCode===0)?B.charCode:B.keyCode)){B.which=B.charCode||B.keyCode
}if(!B.metaKey&&B.ctrlKey){B.metaKey=B.ctrlKey
}if(!B.which&&B.button){B.which=(B.button&1?1:(B.button&2?3:(B.button&4?2:0)))
}return B
},proxy:function(B,A){A=A||function(){return B.apply(this,arguments)
};
A.guid=B.guid=B.guid||A.guid||this.guid++;
return A
},special:{ready:{setup:s,teardown:function(){}}},specialAll:{live:{setup:function(A,B){r.event.add(this,B[0],h)
},teardown:function(C){if(C.length){var B=0,A=RegExp("(^|\\.)"+C[0]+"(\\.|$)");
r.each((r.data(this,"events").live||{}),function(){if(A.test(this.type)){B++
}});
if(B<1){r.event.remove(this,C[0],h)
}}}}}};
r.Event=function(A){if(!this.preventDefault){return new r.Event(A)
}if(A&&A.type){this.originalEvent=A;
this.type=A.type
}else{this.type=A
}this.timeStamp=AD();
this[AA]=true
};
function x(){return false
}function f(){return true
}r.Event.prototype={preventDefault:function(){this.isDefaultPrevented=f;
var A=this.originalEvent;
if(!A){return 
}if(A.preventDefault){A.preventDefault()
}A.returnValue=false
},stopPropagation:function(){this.isPropagationStopped=f;
var A=this.originalEvent;
if(!A){return 
}if(A.stopPropagation){A.stopPropagation()
}A.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=f;
this.stopPropagation()
},isDefaultPrevented:x,isPropagationStopped:x,isImmediatePropagationStopped:x};
var l=function(A){var B=A.relatedTarget;
while(B&&B!=this){try{B=B.parentNode
}catch(C){B=this
}}if(B!=this){A.type=A.data;
r.event.handle.apply(this,arguments)
}};
r.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(B,A){r.event.special[A]={setup:function(){r.event.add(this,B,l,A)
},teardown:function(){r.event.remove(this,B,l)
}}
});
r.fn.extend({bind:function(A,C,B){return A=="unload"?this.one(A,C,B):this.each(function(){r.event.add(this,A,B||C,B&&C)
})
},one:function(A,D,B){var C=r.event.proxy(B||D,function(E){r(this).unbind(E,C);
return(B||D).apply(this,arguments)
});
return this.each(function(){r.event.add(this,A,C,B&&D)
})
},unbind:function(B,A){return this.each(function(){r.event.remove(this,B,A)
})
},trigger:function(A,B){return this.each(function(){r.event.trigger(A,B,this)
})
},triggerHandler:function(B,C){if(this[0]){var A=r.Event(B);
A.preventDefault();
A.stopPropagation();
r.event.trigger(A,C,this[0]);
return A.result
}},toggle:function(C){var B=arguments,A=1;
while(A<B.length){r.event.proxy(C,B[A++])
}return this.click(r.event.proxy(C,function(D){this.lastToggle=(this.lastToggle||0)%A;
D.preventDefault();
return B[this.lastToggle++].apply(this,arguments)||false
}))
},hover:function(A,B){return this.mouseenter(A).mouseleave(B)
},ready:function(A){s();
if(r.isReady){A.call(document,r)
}else{r.readyList.push(A)
}return this
},live:function(C,A){var B=r.event.proxy(A);
B.guid+=this.selector+C;
r(document).bind(z(C,this.selector),this.selector,B);
return this
},die:function(B,A){r(document).unbind(z(B,this.selector),A?{guid:A.guid+this.selector+B}:null);
return this
}});
function h(D){var C=RegExp("(^|\\.)"+D.type+"(\\.|$)"),A=true,B=[];
r.each(r.data(this,"events").live||[],function(G,F){if(C.test(F.type)){var E=r(D.target).closest(F.data)[0];
if(E){B.push({elem:E,fn:F})
}}});
B.sort(function(E,F){return r.data(E.elem,"closest")-r.data(F.elem,"closest")
});
r.each(B,function(){if(this.fn.call(this.elem,D,this.fn.data)===false){return(A=false)
}});
return A
}function z(B,A){return["live",B,A.replace(/\./g,"`").replace(/ /g,"|")].join(".")
}r.extend({isReady:false,readyList:[],ready:function(){if(!r.isReady){r.isReady=true;
if(r.readyList){r.each(r.readyList,function(){this.call(document,r)
});
r.readyList=null
}r(document).triggerHandler("ready")
}}});
var AG=false;
function s(){if(AG){return 
}AG=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
r.ready()
},false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
r.ready()
}});
if(document.documentElement.doScroll&&w==w.top){(function(){if(r.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(A){setTimeout(arguments.callee,0);
return 
}r.ready()
})()
}}}r.event.add(w,"load",r.ready)
}r.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(B,A){r.fn[A]=function(C){return C?this.bind(A,C):this.trigger(A)
}
});
r(w).bind("unload",function(){for(var A in r.cache){if(A!=1&&r.cache[A].handle){r.event.remove(r.cache[A].handle.elem)
}}});
(function(){r.support={};
var E=document.documentElement,D=document.createElement("script"),G=document.createElement("div"),A="script"+(new Date).getTime();
G.style.display="none";
G.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var C=G.getElementsByTagName("*"),F=G.getElementsByTagName("a")[0];
if(!C||!C.length||!F){return 
}r.support={leadingWhitespace:G.firstChild.nodeType==3,tbody:!G.getElementsByTagName("tbody").length,objectAll:!!G.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!G.getElementsByTagName("link").length,style:/red/.test(F.getAttribute("style")),hrefNormalized:F.getAttribute("href")==="/a",opacity:F.style.opacity==="0.5",cssFloat:!!F.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};
D.type="text/javascript";
try{D.appendChild(document.createTextNode("window."+A+"=1;"))
}catch(B){}E.insertBefore(D,E.firstChild);
if(w[A]){r.support.scriptEval=true;
delete w[A]
}E.removeChild(D);
if(G.attachEvent&&G.fireEvent){G.attachEvent("onclick",function(){r.support.noCloneEvent=false;
G.detachEvent("onclick",arguments.callee)
});
G.cloneNode(true).fireEvent("onclick")
}r(function(){var H=document.createElement("div");
H.style.width=H.style.paddingLeft="1px";
document.body.appendChild(H);
r.boxModel=r.support.boxModel=H.offsetWidth===2;
document.body.removeChild(H).style.display="none"
})
})();
var AH=r.support.cssFloat?"cssFloat":"styleFloat";
r.props={"for":"htmlFor","class":"className","float":AH,cssFloat:AH,styleFloat:AH,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};
r.fn.extend({_load:r.fn.load,load:function(D,A,G){if(typeof D!=="string"){return this._load(D)
}var B=D.indexOf(" ");
if(B>=0){var F=D.slice(B,D.length);
D=D.slice(0,B)
}var C="GET";
if(A){if(r.isFunction(A)){G=A;
A=null
}else{if(typeof A==="object"){A=r.param(A);
C="POST"
}}}var E=this;
r.ajax({url:D,type:C,dataType:"html",data:A,complete:function(H,I){if(I=="success"||I=="notmodified"){E.html(F?r("<div/>").append(H.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(F):H.responseText)
}if(G){E.each(G,[H.responseText,I,H])
}}});
return this
},serialize:function(){return r.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?r.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))
}).map(function(B,A){var C=r(this).val();
return C==null?null:r.isArray(C)?r.map(C,function(D,E){return{name:A.name,value:D}
}):{name:A.name,value:C}
}).get()
}});
r.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(A,B){r.fn[B]=function(C){return this.bind(B,C)
}
});
var m=AD();
r.extend({get:function(C,A,D,B){if(r.isFunction(A)){D=A;
A=null
}return r.ajax({type:"GET",url:C,data:A,success:D,dataType:B})
},getScript:function(A,B){return r.get(A,null,B,"script")
},getJSON:function(B,A,C){return r.get(B,A,C,"json")
},post:function(C,A,D,B){if(r.isFunction(A)){D=A;
A={}
}return r.ajax({type:"POST",url:C,data:A,success:D,dataType:B})
},ajaxSetup:function(A){r.extend(r.ajaxSettings,A)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return w.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(K){K=r.extend(true,K,r.extend(true,{},r.ajaxSettings,K));
var A,R=/=\?(&|$)/g,F,B,Q=K.type.toUpperCase();
if(K.data&&K.processData&&typeof K.data!=="string"){K.data=r.param(K.data)
}if(K.dataType=="jsonp"){if(Q=="GET"){if(!K.url.match(R)){K.url+=(K.url.match(/\?/)?"&":"?")+(K.jsonp||"callback")+"=?"
}}else{if(!K.data||!K.data.match(R)){K.data=(K.data?K.data+"&":"")+(K.jsonp||"callback")+"=?"
}}K.dataType="json"
}if(K.dataType=="json"&&(K.data&&K.data.match(R)||K.url.match(R))){A="jsonp"+m++;
if(K.data){K.data=(K.data+"").replace(R,"="+A+"$1")
}K.url=K.url.replace(R,"="+A+"$1");
K.dataType="script";
w[A]=function(U){B=U;
O();
L();
w[A]=AB;
try{delete w[A]
}catch(T){}if(P){P.removeChild(D)
}}
}if(K.dataType=="script"&&K.cache==null){K.cache=false
}if(K.cache===false&&Q=="GET"){var S=AD();
var C=K.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+S+"$2");
K.url=C+((C==K.url)?(K.url.match(/\?/)?"&":"?")+"_="+S:"")
}if(K.data&&Q=="GET"){K.url+=(K.url.match(/\?/)?"&":"?")+K.data;
K.data=null
}if(K.global&&!r.active++){r.event.trigger("ajaxStart")
}var G=/^(\w+:)?\/\/([^\/?#]+)/.exec(K.url);
if(K.dataType=="script"&&Q=="GET"&&G&&(G[1]&&G[1]!=location.protocol||G[2]!=location.host)){var P=document.getElementsByTagName("head")[0];
var D=document.createElement("script");
D.src=K.url;
if(K.scriptCharset){D.charset=K.scriptCharset
}if(!A){var I=false;
D.onload=D.onreadystatechange=function(){if(!I&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){I=true;
O();
L();
D.onload=D.onreadystatechange=null;
P.removeChild(D)
}}
}P.appendChild(D);
return AB
}var M=false;
var N=K.xhr();
if(K.username){N.open(Q,K.url,K.async,K.username,K.password)
}else{N.open(Q,K.url,K.async)
}try{if(K.data){N.setRequestHeader("Content-Type",K.contentType)
}if(K.ifModified){N.setRequestHeader("If-Modified-Since",r.lastModified[K.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}N.setRequestHeader("X-Requested-With","XMLHttpRequest");
N.setRequestHeader("Accept",K.dataType&&K.accepts[K.dataType]?K.accepts[K.dataType]+", */*":K.accepts._default)
}catch(E){}if(K.beforeSend&&K.beforeSend(N,K)===false){if(K.global&&!--r.active){r.event.trigger("ajaxStop")
}N.abort();
return false
}if(K.global){r.event.trigger("ajaxSend",[N,K])
}var J=function(U){if(N.readyState==0){if(H){clearInterval(H);
H=null;
if(K.global&&!--r.active){r.event.trigger("ajaxStop")
}}}else{if(!M&&N&&(N.readyState==4||U=="timeout")){M=true;
if(H){clearInterval(H);
H=null
}F=U=="timeout"?"timeout":!r.httpSuccess(N)?"error":K.ifModified&&r.httpNotModified(N,K.url)?"notmodified":"success";
if(F=="success"){try{B=r.httpData(N,K.dataType,K)
}catch(T){F="parsererror"
}}if(F=="success"){var V;
try{V=N.getResponseHeader("Last-Modified")
}catch(T){}if(K.ifModified&&V){r.lastModified[K.url]=V
}if(!A){O()
}}else{r.handleError(K,N,F)
}L();
if(U){N.abort()
}if(K.async){N=null
}}}};
if(K.async){var H=setInterval(J,13);
if(K.timeout>0){setTimeout(function(){if(N&&!M){J("timeout")
}},K.timeout)
}}try{N.send(K.data)
}catch(E){r.handleError(K,N,null,E)
}if(!K.async){J()
}function O(){if(K.success){K.success(B,F)
}if(K.global){r.event.trigger("ajaxSuccess",[N,K])
}}function L(){if(K.complete){K.complete(N,F)
}if(K.global){r.event.trigger("ajaxComplete",[N,K])
}if(K.global&&!--r.active){r.event.trigger("ajaxStop")
}}return N
},handleError:function(B,D,C,A){if(B.error){B.error(D,C,A)
}if(B.global){r.event.trigger("ajaxError",[D,B,A])
}},active:0,httpSuccess:function(B){try{return !B.status&&location.protocol=="file:"||(B.status>=200&&B.status<300)||B.status==304||B.status==1223
}catch(A){}return false
},httpNotModified:function(A,C){try{var D=A.getResponseHeader("Last-Modified");
return A.status==304||D==r.lastModified[C]
}catch(B){}return false
},httpData:function(F,B,C){var D=F.getResponseHeader("content-type"),E=B=="xml"||!B&&D&&D.indexOf("xml")>=0,A=E?F.responseXML:F.responseText;
if(E&&A.documentElement.tagName=="parsererror"){throw"parsererror"
}if(C&&C.dataFilter){A=C.dataFilter(A,B)
}if(typeof A==="string"){if(B=="script"){r.globalEval(A)
}if(B=="json"){A=w["eval"]("("+A+")")
}}return A
},param:function(C){var A=[];
function D(F,E){A[A.length]=encodeURIComponent(F)+"="+encodeURIComponent(E)
}if(r.isArray(C)||C.jquery){r.each(C,function(){D(this.name,this.value)
})
}else{for(var B in C){if(r.isArray(C[B])){r.each(C[B],function(){D(B,this)
})
}else{D(B,r.isFunction(C[B])?C[B]():C[B])
}}}return A.join("&").replace(/%20/g,"+")
}});
var v={},u,g=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function i(A,B){var C={};
r.each(g.concat.apply([],g.slice(0,B)),function(){C[this]=A
});
return C
}r.fn.extend({show:function(A,G){if(A){return this.animate(i("show",3),A,G)
}else{for(var C=0,E=this.length;
C<E;
C++){var F=r.data(this[C],"olddisplay");
this[C].style.display=F||"";
if(r.css(this[C],"display")==="none"){var D=this[C].tagName,H;
if(v[D]){H=v[D]
}else{var B=r("<"+D+" />").appendTo("body");
H=B.css("display");
if(H==="none"){H="block"
}B.remove();
v[D]=H
}r.data(this[C],"olddisplay",H)
}}for(var C=0,E=this.length;
C<E;
C++){this[C].style.display=r.data(this[C],"olddisplay")||""
}return this
}},hide:function(A,E){if(A){return this.animate(i("hide",3),A,E)
}else{for(var B=0,C=this.length;
B<C;
B++){var D=r.data(this[B],"olddisplay");
if(!D&&D!=="none"){r.data(this[B],"olddisplay",r.css(this[B],"display"))
}}for(var B=0,C=this.length;
B<C;
B++){this[B].style.display="none"
}return this
}},_toggle:r.fn.toggle,toggle:function(C,A){var B=typeof C==="boolean";
return r.isFunction(C)&&r.isFunction(A)?this._toggle.apply(this,arguments):C==null||B?this.each(function(){var D=B?C:r(this).is(":hidden");
r(this)[D?"show":"hide"]()
}):this.animate(i("toggle",3),C,A)
},fadeTo:function(B,C,A){return this.animate({opacity:C},B,A)
},animate:function(E,C,A,B){var D=r.speed(C,A,B);
return this[D.queue===false?"each":"queue"](function(){var H=r.extend({},D),F,G=this.nodeType==1&&r(this).is(":hidden"),I=this;
for(F in E){if(E[F]=="hide"&&G||E[F]=="show"&&!G){return H.complete.call(this)
}if((F=="height"||F=="width")&&this.style){H.display=r.css(this,"display");
H.overflow=this.style.overflow
}}if(H.overflow!=null){this.style.overflow="hidden"
}H.curAnim=r.extend({},E);
r.each(E,function(L,O){var P=new r.fx(I,H,L);
if(/toggle|show|hide/.test(O)){P[O=="toggle"?G?"show":"hide":O](E)
}else{var J=O.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),N=P.cur(true)||0;
if(J){var M=parseFloat(J[2]),K=J[3]||"px";
if(K!="px"){I.style[L]=(M||1)+K;
N=((M||1)/P.cur(true))*N;
I.style[L]=N+K
}if(J[1]){M=((J[1]=="-="?-1:1)*M)+N
}P.custom(N,M,K)
}else{P.custom(N,O,"")
}}});
return true
})
},stop:function(A,B){var C=r.timers;
if(A){this.queue([])
}this.each(function(){for(var D=C.length-1;
D>=0;
D--){if(C[D].elem==this){if(B){C[D](true)
}C.splice(D,1)
}}});
if(!B){this.dequeue()
}return this
}});
r.each({slideDown:i("show",1),slideUp:i("hide",1),slideToggle:i("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(A,B){r.fn[A]=function(D,C){return this.animate(B,D,C)
}
});
r.extend({speed:function(A,D,B){var C=typeof A==="object"?A:{complete:B||!B&&D||r.isFunction(A)&&A,duration:A,easing:B&&D||D&&!r.isFunction(D)&&D};
C.duration=r.fx.off?0:typeof C.duration==="number"?C.duration:r.fx.speeds[C.duration]||r.fx.speeds._default;
C.old=C.complete;
C.complete=function(){if(C.queue!==false){r(this).dequeue()
}if(r.isFunction(C.old)){C.old.call(this)
}};
return C
},easing:{linear:function(A,D,C,B){return C+B*A
},swing:function(A,D,C,B){return((-Math.cos(A*Math.PI)/2)+0.5)*B+C
}},timers:[],fx:function(A,B,C){this.options=B;
this.elem=A;
this.prop=C;
if(!B.orig){B.orig={}
}}});
r.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(r.fx.step[this.prop]||r.fx.step._default)(this);
if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(B){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var A=parseFloat(r.css(this.elem,this.prop,B));
return A&&A>-10000?A:parseFloat(r.curCSS(this.elem,this.prop))||0
},custom:function(E,A,B){this.startTime=AD();
this.start=E;
this.end=A;
this.unit=B||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
var D=this;
function C(F){return D.step(F)
}C.elem=this.elem;
if(C()&&r.timers.push(C)&&!u){u=setInterval(function(){var F=r.timers;
for(var G=0;
G<F.length;
G++){if(!F[G]()){F.splice(G--,1)
}}if(!F.length){clearInterval(u);
u=AB
}},13)
}},show:function(){this.options.orig[this.prop]=r.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());
r(this.elem).show()
},hide:function(){this.options.orig[this.prop]=r.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(B){var C=AD();
if(B||C>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var E=true;
for(var D in this.options.curAnim){if(this.options.curAnim[D]!==true){E=false
}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(r.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){r(this.elem).hide()
}if(this.options.hide||this.options.show){for(var A in this.options.curAnim){r.attr(this.elem.style,A,this.options.orig[A])
}}this.options.complete.call(this.elem)
}return false
}else{var F=C-this.startTime;
this.state=F/this.options.duration;
this.pos=r.easing[this.options.easing||(r.easing.swing?"swing":"linear")](this.state,F,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
r.extend(r.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(A){r.attr(A.elem.style,"opacity",A.now)
},_default:function(A){if(A.elem.style&&A.elem.style[A.prop]!=null){A.elem.style[A.prop]=A.now+A.unit
}else{A.elem[A.prop]=A.now
}}}});
if(document.documentElement.getBoundingClientRect){r.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return r.offset.bodyOffset(this[0])
}var E=this[0].getBoundingClientRect(),B=this[0].ownerDocument,F=B.body,G=B.documentElement,H=G.clientTop||F.clientTop||0,A=G.clientLeft||F.clientLeft||0,C=E.top+(self.pageYOffset||r.boxModel&&G.scrollTop||F.scrollTop)-H,D=E.left+(self.pageXOffset||r.boxModel&&G.scrollLeft||F.scrollLeft)-A;
return{top:C,left:D}
}
}else{r.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return r.offset.bodyOffset(this[0])
}r.offset.initialized||r.offset.initialize();
var B=this[0],E=B.offsetParent,F=B,H=B.ownerDocument,J,D=H.documentElement,A=H.body,K=H.defaultView,G=K.getComputedStyle(B,null),I=B.offsetTop,C=B.offsetLeft;
while((B=B.parentNode)&&B!==A&&B!==D){J=K.getComputedStyle(B,null);
I-=B.scrollTop,C-=B.scrollLeft;
if(B===E){I+=B.offsetTop,C+=B.offsetLeft;
if(r.offset.doesNotAddBorder&&!(r.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(B.tagName))){I+=parseInt(J.borderTopWidth,10)||0,C+=parseInt(J.borderLeftWidth,10)||0
}F=E,E=B.offsetParent
}if(r.offset.subtractsBorderForOverflowNotVisible&&J.overflow!=="visible"){I+=parseInt(J.borderTopWidth,10)||0,C+=parseInt(J.borderLeftWidth,10)||0
}G=J
}if(G.position==="relative"||G.position==="static"){I+=A.offsetTop,C+=A.offsetLeft
}if(G.position==="fixed"){I+=Math.max(D.scrollTop,A.scrollTop),C+=Math.max(D.scrollLeft,A.scrollLeft)
}return{top:I,left:C}
}
}r.offset={initialize:function(){if(this.initialized){return 
}var I=document.body,E=document.createElement("div"),C,D,G,B,H,F,A=I.style.marginTop,J='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
H={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(F in H){E.style[F]=H[F]
}E.innerHTML=J;
I.insertBefore(E,I.firstChild);
C=E.firstChild,D=C.firstChild,B=C.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(D.offsetTop!==5);
this.doesAddBorderForTableAndCells=(B.offsetTop===5);
C.style.overflow="hidden",C.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(D.offsetTop===-5);
I.style.marginTop="1px";
this.doesNotIncludeMarginInBodyOffset=(I.offsetTop===0);
I.style.marginTop=A;
I.removeChild(E);
this.initialized=true
},bodyOffset:function(B){r.offset.initialized||r.offset.initialize();
var C=B.offsetTop,A=B.offsetLeft;
if(r.offset.doesNotIncludeMarginInBodyOffset){C+=parseInt(r.curCSS(B,"marginTop",true),10)||0,A+=parseInt(r.curCSS(B,"marginLeft",true),10)||0
}return{top:C,left:A}
}};
r.fn.extend({position:function(){var A=0,B=0,D;
if(this[0]){var C=this.offsetParent(),F=this.offset(),E=/^body|html$/i.test(C[0].tagName)?{top:0,left:0}:C.offset();
F.top-=y(this,"marginTop");
F.left-=y(this,"marginLeft");
E.top+=y(C,"borderTopWidth");
E.left+=y(C,"borderLeftWidth");
D={top:F.top-E.top,left:F.left-E.left}
}return D
},offsetParent:function(){var A=this[0].offsetParent||document.body;
while(A&&(!/^body|html$/i.test(A.tagName)&&r.css(A,"position")=="static")){A=A.offsetParent
}return r(A)
}});
r.each(["Left","Top"],function(A,B){var C="scroll"+B;
r.fn[C]=function(D){if(!this[0]){return null
}return D!==AB?this.each(function(){this==w||this==document?w.scrollTo(!A?D:r(w).scrollLeft(),A?D:r(w).scrollTop()):this[C]=D
}):this[0]==w||this[0]==document?self[A?"pageYOffset":"pageXOffset"]||r.boxModel&&document.documentElement[C]||document.body[C]:this[0][C]
}
});
r.each(["Height","Width"],function(A,C){var E=A?"Left":"Top",B=A?"Right":"Bottom",D=C.toLowerCase();
r.fn["inner"+C]=function(){return this[0]?r.css(this[0],D,false,"padding"):null
};
r.fn["outer"+C]=function(G){return this[0]?r.css(this[0],D,false,G?"margin":"border"):null
};
var F=C.toLowerCase();
r.fn[F]=function(G){return this[0]==w?document.compatMode=="CSS1Compat"&&document.documentElement["client"+C]||document.body["client"+C]:this[0]==document?Math.max(document.documentElement["client"+C],document.body["scroll"+C],document.documentElement["scroll"+C],document.body["offset"+C],document.documentElement["offset"+C]):G===AB?(this.length?r.css(this[0],F):null):this.css(F,typeof G==="string"?G:G+"px")
}
})
})();