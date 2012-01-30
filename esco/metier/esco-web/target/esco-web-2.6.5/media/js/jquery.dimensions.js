(function(B){var D=B.fn.height,A=B.fn.width;
B.fn.extend({height:function(){if(this[0]==window){return self.innerHeight||B.boxModel&&document.documentElement.clientHeight||document.body.clientHeight
}if(this[0]==document){return Math.max(document.body.scrollHeight,document.body.offsetHeight)
}return D.apply(this,arguments)
},width:function(){if(this[0]==window){return self.innerWidth||B.boxModel&&document.documentElement.clientWidth||document.body.clientWidth
}if(this[0]==document){return Math.max(document.body.scrollWidth,document.body.offsetWidth)
}return A.apply(this,arguments)
},innerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight-E(this,"borderTopWidth")-E(this,"borderBottomWidth"):this.height()+E(this,"paddingTop")+E(this,"paddingBottom")
},innerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth-E(this,"borderLeftWidth")-E(this,"borderRightWidth"):this.width()+E(this,"paddingLeft")+E(this,"paddingRight")
},outerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight:this.height()+E(this,"borderTopWidth")+E(this,"borderBottomWidth")+E(this,"paddingTop")+E(this,"paddingBottom")
},outerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth:this.width()+E(this,"borderLeftWidth")+E(this,"borderRightWidth")+E(this,"paddingLeft")+E(this,"paddingRight")
},scrollLeft:function(F){if(F!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(F,B(window).scrollTop())
}else{this.scrollLeft=F
}})
}if(this[0]==window||this[0]==document){return self.pageXOffset||B.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft
}return this[0].scrollLeft
},scrollTop:function(F){if(F!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(B(window).scrollLeft(),F)
}else{this.scrollTop=F
}})
}if(this[0]==window||this[0]==document){return self.pageYOffset||B.boxModel&&document.documentElement.scrollTop||document.body.scrollTop
}return this[0].scrollTop
},position:function(M,H){var O=this[0],K=O.parentNode,G=O.offsetParent,M=B.extend({margin:false,border:false,padding:false,scroll:false},M||{}),J=O.offsetLeft,I=O.offsetTop,F=O.scrollLeft,L=O.scrollTop;
if(B.browser.mozilla||B.browser.msie){J+=E(O,"borderLeftWidth");
I+=E(O,"borderTopWidth")
}if(B.browser.mozilla){do{if(B.browser.mozilla&&K!=O&&B.css(K,"overflow")!="visible"){J+=E(K,"borderLeftWidth");
I+=E(K,"borderTopWidth")
}if(K==G){break
}}while((K=K.parentNode)&&(K.tagName.toLowerCase()!="body"||K.tagName.toLowerCase()!="html"))
}var N=C(O,M,J,I,F,L);
if(H){B.extend(H,N);
return this
}else{return N
}},offset:function(W,J){var I=0,H=0,R=0,M=0,S=this[0],G=this[0],F,V,Q=B.css(S,"position"),P=B.browser.mozilla,K=B.browser.msie,U=B.browser.safari,O=B.browser.opera,L=false,N=false,W=B.extend({margin:true,border:false,padding:false,scroll:true,lite:false},W||{});
if(W.lite){return this.offsetLite(W,J)
}if(S.tagName.toLowerCase()=="body"){I=S.offsetLeft;
H=S.offsetTop;
if(P){I+=E(S,"marginLeft")+(E(S,"borderLeftWidth")*2);
H+=E(S,"marginTop")+(E(S,"borderTopWidth")*2)
}else{if(O){I+=E(S,"marginLeft");
H+=E(S,"marginTop")
}else{if(K&&jQuery.boxModel){I+=E(S,"borderLeftWidth");
H+=E(S,"borderTopWidth")
}}}}else{do{V=B.css(G,"position");
I+=G.offsetLeft;
H+=G.offsetTop;
if(P||K){I+=E(G,"borderLeftWidth");
H+=E(G,"borderTopWidth");
if(P&&V=="absolute"){L=true
}if(K&&V=="relative"){N=true
}}F=G.offsetParent;
if(W.scroll||P){do{if(W.scroll){R+=G.scrollLeft;
M+=G.scrollTop
}if(P&&G!=S&&B.css(G,"overflow")!="visible"){I+=E(G,"borderLeftWidth");
H+=E(G,"borderTopWidth")
}G=G.parentNode
}while(G!=F)
}G=F;
if(G.tagName.toLowerCase()=="body"||G.tagName.toLowerCase()=="html"){if((U||(K&&B.boxModel))&&Q!="absolute"&&Q!="fixed"){I+=E(G,"marginLeft");
H+=E(G,"marginTop")
}if((P&&!L&&Q!="fixed")||(K&&Q=="static"&&!N)){I+=E(G,"borderLeftWidth");
H+=E(G,"borderTopWidth")
}break
}}while(G)
}var T=C(S,W,I,H,R,M);
if(J){B.extend(J,T);
return this
}else{return T
}},offsetLite:function(M,H){var J=0,I=0,F=0,L=0,K=this[0],G,M=B.extend({margin:true,border:false,padding:false,scroll:true},M||{});
do{J+=K.offsetLeft;
I+=K.offsetTop;
G=K.offsetParent;
if(M.scroll){do{F+=K.scrollLeft;
L+=K.scrollTop;
K=K.parentNode
}while(K!=G)
}K=G
}while(K&&K.tagName.toLowerCase()!="body"&&K.tagName.toLowerCase()!="html");
var N=C(this[0],M,J,I,F,L);
if(H){B.extend(H,N);
return this
}else{return N
}}});
var E=function(F,G){return parseInt(B.css(F.jquery?F[0]:F,G))||0
};
var C=function(G,K,I,H,F,J){if(!K.margin){I-=E(G,"marginLeft");
H-=E(G,"marginTop")
}if(K.border&&(B.browser.safari||B.browser.opera)){I+=E(G,"borderLeftWidth");
H+=E(G,"borderTopWidth")
}else{if(!K.border&&!(B.browser.safari||B.browser.opera)){I-=E(G,"borderLeftWidth");
H-=E(G,"borderTopWidth")
}}if(K.padding){I+=E(G,"paddingLeft");
H+=E(G,"paddingTop")
}if(K.scroll){F-=G.scrollLeft;
J-=G.scrollTop
}return K.scroll?{top:H-J,left:I-F,scrollTop:J,scrollLeft:F}:{top:H,left:I}
}
})(jQuery);