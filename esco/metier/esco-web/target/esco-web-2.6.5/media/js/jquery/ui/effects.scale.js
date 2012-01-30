(function(A){A.effects.puff=function(B){return this.queue(function(){var H=A(this);
var E=A.extend(true,{},B.options);
var D=A.effects.setMode(H,B.options.mode||"hide");
var C=parseInt(B.options.percent,10)||150;
E.fade=true;
var G={height:H.height(),width:H.width()};
var F=C/100;
H.from=(D=="hide")?G:{height:G.height*F,width:G.width*F};
E.from=H.from;
E.percent=(D=="hide")?C:100;
E.mode=D;
H.effect("scale",E,B.duration,B.callback);
H.dequeue()
})
};
A.effects.scale=function(B){return this.queue(function(){var C=A(this);
var H=A.extend(true,{},B.options);
var F=A.effects.setMode(C,B.options.mode||"effect");
var D=parseInt(B.options.percent,10)||(parseInt(B.options.percent,10)==0?0:(F=="hide"?0:100));
var E=B.options.direction||"both";
var G=B.options.origin;
if(F!="effect"){H.origin=G||["middle","center"];
H.restore=true
}var J={height:C.height(),width:C.width()};
C.from=B.options.from||(F=="show"?{height:0,width:0}:J);
var I={y:E!="horizontal"?(D/100):1,x:E!="vertical"?(D/100):1};
C.to={height:J.height*I.y,width:J.width*I.x};
if(B.options.fade){if(F=="show"){C.from.opacity=0;
C.to.opacity=1
}if(F=="hide"){C.from.opacity=1;
C.to.opacity=0
}}H.from=C.from;
H.to=C.to;
H.mode=F;
C.effect("size",H,B.duration,B.callback);
C.dequeue()
})
};
A.effects.size=function(B){return this.queue(function(){var E=A(this),P=["position","top","left","width","height","overflow","opacity"];
var O=["position","top","left","overflow","opacity"];
var L=["width","height","overflow"];
var D=["fontSize"];
var M=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var H=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var I=A.effects.setMode(E,B.options.mode||"effect");
var K=B.options.restore||false;
var G=B.options.scale||"both";
var C=B.options.origin;
var F={height:E.height(),width:E.width()};
E.from=B.options.from||F;
E.to=B.options.to||F;
if(C){var J=A.effects.getBaseline(C,F);
E.from.top=(F.height-E.from.height)*J.y;
E.from.left=(F.width-E.from.width)*J.x;
E.to.top=(F.height-E.to.height)*J.y;
E.to.left=(F.width-E.to.width)*J.x
}var N={from:{y:E.from.height/F.height,x:E.from.width/F.width},to:{y:E.to.height/F.height,x:E.to.width/F.width}};
if(G=="box"||G=="both"){if(N.from.y!=N.to.y){P=P.concat(M);
E.from=A.effects.setTransition(E,M,N.from.y,E.from);
E.to=A.effects.setTransition(E,M,N.to.y,E.to)
}if(N.from.x!=N.to.x){P=P.concat(H);
E.from=A.effects.setTransition(E,H,N.from.x,E.from);
E.to=A.effects.setTransition(E,H,N.to.x,E.to)
}}if(G=="content"||G=="both"){if(N.from.y!=N.to.y){P=P.concat(D);
E.from=A.effects.setTransition(E,D,N.from.y,E.from);
E.to=A.effects.setTransition(E,D,N.to.y,E.to)
}}A.effects.save(E,K?P:O);
E.show();
A.effects.createWrapper(E);
E.css("overflow","hidden").css(E.from);
if(G=="content"||G=="both"){M=M.concat(["marginTop","marginBottom"]).concat(D);
H=H.concat(["marginLeft","marginRight"]);
L=P.concat(M).concat(H);
E.find("*[width]").each(function(){child=A(this);
if(K){A.effects.save(child,L)
}var Q={height:child.height(),width:child.width()};
child.from={height:Q.height*N.from.y,width:Q.width*N.from.x};
child.to={height:Q.height*N.to.y,width:Q.width*N.to.x};
if(N.from.y!=N.to.y){child.from=A.effects.setTransition(child,M,N.from.y,child.from);
child.to=A.effects.setTransition(child,M,N.to.y,child.to)
}if(N.from.x!=N.to.x){child.from=A.effects.setTransition(child,H,N.from.x,child.from);
child.to=A.effects.setTransition(child,H,N.to.x,child.to)
}child.css(child.from);
child.animate(child.to,B.duration,B.options.easing,function(){if(K){A.effects.restore(child,L)
}})
})
}E.animate(E.to,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(I=="hide"){E.hide()
}A.effects.restore(E,K?P:O);
A.effects.removeWrapper(E);
if(B.callback){B.callback.apply(this,arguments)
}E.dequeue()
}})
})
}
})(jQuery);