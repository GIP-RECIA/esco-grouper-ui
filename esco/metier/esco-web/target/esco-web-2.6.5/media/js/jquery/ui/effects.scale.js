(function(B){B.effects.puff=function(A){return this.queue(function(){var I=B(this);
var L=B.extend(true,{},A.options);
var M=B.effects.setMode(I,A.options.mode||"hide");
var N=parseInt(A.options.percent,10)||150;
L.fade=true;
var J={height:I.height(),width:I.width()};
var K=N/100;
I.from=(M=="hide")?J:{height:J.height*K,width:J.width*K};
L.from=I.from;
L.percent=(M=="hide")?N:100;
L.mode=M;
I.effect("scale",L,A.duration,A.callback);
I.dequeue()
})
};
B.effects.scale=function(A){return this.queue(function(){var R=B(this);
var M=B.extend(true,{},A.options);
var O=B.effects.setMode(R,A.options.mode||"effect");
var Q=parseInt(A.options.percent,10)||(parseInt(A.options.percent,10)==0?0:(O=="hide"?0:100));
var P=A.options.direction||"both";
var N=A.options.origin;
if(O!="effect"){M.origin=N||["middle","center"];
M.restore=true
}var K={height:R.height(),width:R.width()};
R.from=A.options.from||(O=="show"?{height:0,width:0}:K);
var L={y:P!="horizontal"?(Q/100):1,x:P!="vertical"?(Q/100):1};
R.to={height:K.height*L.y,width:K.width*L.x};
if(A.options.fade){if(O=="show"){R.from.opacity=0;
R.to.opacity=1
}if(O=="hide"){R.from.opacity=1;
R.to.opacity=0
}}M.from=R.from;
M.to=R.to;
M.mode=O;
R.effect("size",M,A.duration,A.callback);
R.dequeue()
})
};
B.effects.size=function(A){return this.queue(function(){var d=B(this),S=["position","top","left","width","height","overflow","opacity"];
var T=["position","top","left","overflow","opacity"];
var W=["width","height","overflow"];
var Q=["fontSize"];
var V=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var a=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var Z=B.effects.setMode(d,A.options.mode||"effect");
var X=A.options.restore||false;
var b=A.options.scale||"both";
var R=A.options.origin;
var c={height:d.height(),width:d.width()};
d.from=A.options.from||c;
d.to=A.options.to||c;
if(R){var Y=B.effects.getBaseline(R,c);
d.from.top=(c.height-d.from.height)*Y.y;
d.from.left=(c.width-d.from.width)*Y.x;
d.to.top=(c.height-d.to.height)*Y.y;
d.to.left=(c.width-d.to.width)*Y.x
}var U={from:{y:d.from.height/c.height,x:d.from.width/c.width},to:{y:d.to.height/c.height,x:d.to.width/c.width}};
if(b=="box"||b=="both"){if(U.from.y!=U.to.y){S=S.concat(V);
d.from=B.effects.setTransition(d,V,U.from.y,d.from);
d.to=B.effects.setTransition(d,V,U.to.y,d.to)
}if(U.from.x!=U.to.x){S=S.concat(a);
d.from=B.effects.setTransition(d,a,U.from.x,d.from);
d.to=B.effects.setTransition(d,a,U.to.x,d.to)
}}if(b=="content"||b=="both"){if(U.from.y!=U.to.y){S=S.concat(Q);
d.from=B.effects.setTransition(d,Q,U.from.y,d.from);
d.to=B.effects.setTransition(d,Q,U.to.y,d.to)
}}B.effects.save(d,X?S:T);
d.show();
B.effects.createWrapper(d);
d.css("overflow","hidden").css(d.from);
if(b=="content"||b=="both"){V=V.concat(["marginTop","marginBottom"]).concat(Q);
a=a.concat(["marginLeft","marginRight"]);
W=S.concat(V).concat(a);
d.find("*[width]").each(function(){child=B(this);
if(X){B.effects.save(child,W)
}var C={height:child.height(),width:child.width()};
child.from={height:C.height*U.from.y,width:C.width*U.from.x};
child.to={height:C.height*U.to.y,width:C.width*U.to.x};
if(U.from.y!=U.to.y){child.from=B.effects.setTransition(child,V,U.from.y,child.from);
child.to=B.effects.setTransition(child,V,U.to.y,child.to)
}if(U.from.x!=U.to.x){child.from=B.effects.setTransition(child,a,U.from.x,child.from);
child.to=B.effects.setTransition(child,a,U.to.x,child.to)
}child.css(child.from);
child.animate(child.to,A.duration,A.options.easing,function(){if(X){B.effects.restore(child,W)
}})
})
}d.animate(d.to,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(Z=="hide"){d.hide()
}B.effects.restore(d,X?S:T);
B.effects.removeWrapper(d);
if(A.callback){A.callback.apply(this,arguments)
}d.dequeue()
}})
})
}
})(jQuery);