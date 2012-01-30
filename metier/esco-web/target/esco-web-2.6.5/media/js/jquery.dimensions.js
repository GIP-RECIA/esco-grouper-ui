(function(J){var H=J.fn.height,F=J.fn.width;
J.fn.extend({height:function(){if(this[0]==window){return self.innerHeight||J.boxModel&&document.documentElement.clientHeight||document.body.clientHeight
}if(this[0]==document){return Math.max(document.body.scrollHeight,document.body.offsetHeight)
}return H.apply(this,arguments)
},width:function(){if(this[0]==window){return self.innerWidth||J.boxModel&&document.documentElement.clientWidth||document.body.clientWidth
}if(this[0]==document){return Math.max(document.body.scrollWidth,document.body.offsetWidth)
}return F.apply(this,arguments)
},innerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight-G(this,"borderTopWidth")-G(this,"borderBottomWidth"):this.height()+G(this,"paddingTop")+G(this,"paddingBottom")
},innerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth-G(this,"borderLeftWidth")-G(this,"borderRightWidth"):this.width()+G(this,"paddingLeft")+G(this,"paddingRight")
},outerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(":visible")?this[0].offsetHeight:this.height()+G(this,"borderTopWidth")+G(this,"borderBottomWidth")+G(this,"paddingTop")+G(this,"paddingBottom")
},outerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(":visible")?this[0].offsetWidth:this.width()+G(this,"borderLeftWidth")+G(this,"borderRightWidth")+G(this,"paddingLeft")+G(this,"paddingRight")
},scrollLeft:function(A){if(A!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(A,J(window).scrollTop())
}else{this.scrollLeft=A
}})
}if(this[0]==window||this[0]==document){return self.pageXOffset||J.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft
}return this[0].scrollLeft
},scrollTop:function(A){if(A!=undefined){return this.each(function(){if(this==window||this==document){window.scrollTo(J(window).scrollLeft(),A)
}else{this.scrollTop=A
}})
}if(this[0]==window||this[0]==document){return self.pageYOffset||J.boxModel&&document.documentElement.scrollTop||document.body.scrollTop
}return this[0].scrollTop
},position:function(C,R){var A=this[0],E=A.parentNode,S=A.offsetParent,C=J.extend({margin:false,border:false,padding:false,scroll:false},C||{}),P=A.offsetLeft,Q=A.offsetTop,T=A.scrollLeft,D=A.scrollTop;
if(J.browser.mozilla||J.browser.msie){P+=G(A,"borderLeftWidth");
Q+=G(A,"borderTopWidth")
}if(J.browser.mozilla){do{if(J.browser.mozilla&&E!=A&&J.css(E,"overflow")!="visible"){P+=G(E,"borderLeftWidth");
Q+=G(E,"borderTopWidth")
}if(E==S){break
}}while((E=E.parentNode)&&(E.tagName.toLowerCase()!="body"||E.tagName.toLowerCase()!="html"))
}var B=I(A,C,P,Q,T,D);
if(R){J.extend(R,B);
return this
}else{return B
}},offset:function(A,f){var g=0,h=0,X=0,c=0,E=this[0],i=this[0],j,B,Y=J.css(E,"position"),Z=J.browser.mozilla,e=J.browser.msie,C=J.browser.safari,a=J.browser.opera,d=false,b=false,A=J.extend({margin:true,border:false,padding:false,scroll:true,lite:false},A||{});
if(A.lite){return this.offsetLite(A,f)
}if(E.tagName.toLowerCase()=="body"){g=E.offsetLeft;
h=E.offsetTop;
if(Z){g+=G(E,"marginLeft")+(G(E,"borderLeftWidth")*2);
h+=G(E,"marginTop")+(G(E,"borderTopWidth")*2)
}else{if(a){g+=G(E,"marginLeft");
h+=G(E,"marginTop")
}else{if(e&&jQuery.boxModel){g+=G(E,"borderLeftWidth");
h+=G(E,"borderTopWidth")
}}}}else{do{B=J.css(i,"position");
g+=i.offsetLeft;
h+=i.offsetTop;
if(Z||e){g+=G(i,"borderLeftWidth");
h+=G(i,"borderTopWidth");
if(Z&&B=="absolute"){d=true
}if(e&&B=="relative"){b=true
}}j=i.offsetParent;
if(A.scroll||Z){do{if(A.scroll){X+=i.scrollLeft;
c+=i.scrollTop
}if(Z&&i!=E&&J.css(i,"overflow")!="visible"){g+=G(i,"borderLeftWidth");
h+=G(i,"borderTopWidth")
}i=i.parentNode
}while(i!=j)
}i=j;
if(i.tagName.toLowerCase()=="body"||i.tagName.toLowerCase()=="html"){if((C||(e&&J.boxModel))&&Y!="absolute"&&Y!="fixed"){g+=G(i,"marginLeft");
h+=G(i,"marginTop")
}if((Z&&!d&&Y!="fixed")||(e&&Y=="static"&&!b)){g+=G(i,"borderLeftWidth");
h+=G(i,"borderTopWidth")
}break
}}while(i)
}var D=I(E,A,g,h,X,c);
if(f){J.extend(f,D);
return this
}else{return D
}},offsetLite:function(B,P){var E=0,O=0,R=0,C=0,D=this[0],Q,B=J.extend({margin:true,border:false,padding:false,scroll:true},B||{});
do{E+=D.offsetLeft;
O+=D.offsetTop;
Q=D.offsetParent;
if(B.scroll){do{R+=D.scrollLeft;
C+=D.scrollTop;
D=D.parentNode
}while(D!=Q)
}D=Q
}while(D&&D.tagName.toLowerCase()!="body"&&D.tagName.toLowerCase()!="html");
var A=I(this[0],B,E,O,R,C);
if(P){J.extend(P,A);
return this
}else{return A
}}});
var G=function(B,A){return parseInt(J.css(B.jquery?B[0]:B,A))||0
};
var I=function(E,A,C,D,L,B){if(!A.margin){C-=G(E,"marginLeft");
D-=G(E,"marginTop")
}if(A.border&&(J.browser.safari||J.browser.opera)){C+=G(E,"borderLeftWidth");
D+=G(E,"borderTopWidth")
}else{if(!A.border&&!(J.browser.safari||J.browser.opera)){C-=G(E,"borderLeftWidth");
D-=G(E,"borderTopWidth")
}}if(A.padding){C+=G(E,"paddingLeft");
D+=G(E,"paddingTop")
}if(A.scroll){L-=E.scrollLeft;
B-=E.scrollTop
}return A.scroll?{top:D-B,left:C-L,scrollTop:B,scrollLeft:L}:{top:D,left:C}
}
})(jQuery);