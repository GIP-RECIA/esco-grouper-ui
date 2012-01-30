(function(K){K.fn.jqDrag=function(A){return H(this,A,"d")
};
K.fn.jqResize=function(A){return H(this,A,"r")
};
K.jqDnR={dnr:{},e:0,drag:function(A){if(J.k=="d"){L.css({left:J.X+A.pageX-J.pX,top:J.Y+A.pageY-J.pY})
}else{L.css({width:Math.max(A.pageX-J.pX+J.W,0),height:Math.max(A.pageY-J.pY+J.H,0)})
}return false
},stop:function(){K().unbind("mousemove",I.drag).unbind("mouseup",I.stop)
}};
var I=K.jqDnR,J=I.dnr,L=I.e,H=function(B,C,A){return B.each(function(){C=(C)?K(C,B):B;
C.bind("mousedown",{e:B,k:A},function(G){var N=G.data,D={};
L=N.e;
if(L.css("position")!="relative"){try{L.position(D)
}catch(F){}}J={X:D.left||E("left")||0,Y:D.top||E("top")||0,W:E("width")||L[0].scrollWidth||0,H:E("height")||L[0].scrollHeight||0,pX:G.pageX,pY:G.pageY,k:N.k};
K().mousemove(K.jqDnR.drag).mouseup(K.jqDnR.stop);
return false
})
})
},E=function(A){return parseInt(L.css(A))||false
}
})(jQuery);