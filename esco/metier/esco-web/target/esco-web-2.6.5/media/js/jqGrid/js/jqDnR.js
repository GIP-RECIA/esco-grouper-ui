(function(C){C.fn.jqDrag=function(E){return G(this,E,"d")
};
C.fn.jqResize=function(E){return G(this,E,"r")
};
C.jqDnR={dnr:{},e:0,drag:function(E){if(D.k=="d"){B.css({left:D.X+E.pageX-D.pX,top:D.Y+E.pageY-D.pY})
}else{B.css({width:Math.max(E.pageX-D.pX+D.W,0),height:Math.max(E.pageY-D.pY+D.H,0)})
}return false
},stop:function(){C().unbind("mousemove",F.drag).unbind("mouseup",F.stop)
}};
var F=C.jqDnR,D=F.dnr,B=F.e,G=function(H,E,I){return H.each(function(){E=(E)?C(E,H):H;
E.bind("mousedown",{e:H,k:I},function(J){var M=J.data,L={};
B=M.e;
if(B.css("position")!="relative"){try{B.position(L)
}catch(K){}}D={X:L.left||A("left")||0,Y:L.top||A("top")||0,W:A("width")||B[0].scrollWidth||0,H:A("height")||B[0].scrollHeight||0,pX:J.pageX,pY:J.pageY,k:M.k};
C().mousemove(C.jqDnR.drag).mouseup(C.jqDnR.stop);
return false
})
})
},A=function(E){return parseInt(B.css(E))||false
}
})(jQuery);