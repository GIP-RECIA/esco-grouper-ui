(function(Q){var L,M,T,O,R,K;
var S={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",backgroundImage:"",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent",backgroundImage:""},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2",backgroundImage:""},eventPosX:"pageX",eventPosY:"pageY",shadow:true,onContextMenu:null,onShowMenu:null};
Q.fn.contextMenu=function(B,C){if(!L){L=Q('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(D){D.stopPropagation()
})
}if(!M){M=Q("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:0.2,zIndex:499}).appendTo("body").hide()
}R=R||[];
R.push({id:B,menuStyle:Q.extend({},S.menuStyle,C.menuStyle||{}),itemStyle:Q.extend({},S.itemStyle,C.itemStyle||{}),itemHoverStyle:Q.extend({},S.itemHoverStyle,C.itemHoverStyle||{}),bindings:C.bindings||{},shadow:C.shadow||C.shadow===false?C.shadow:S.shadow,onContextMenu:C.onContextMenu||S.onContextMenu,onShowMenu:C.onShowMenu||S.onShowMenu,eventPosX:C.eventPosX||S.eventPosX,eventPosY:C.eventPosY||S.eventPosY});
var A=R.length-1;
Q(this).bind("contextmenu",function(D){var E=(!!R[A].onContextMenu)?R[A].onContextMenu(D):true;
if(E){N(A,this,D,C)
}return false
});
return this
};
function N(B,C,A,D){var E=R[B];
O=Q("#"+E.id).find("ul:first").clone(true);
O.css(E.menuStyle).find("li").css(E.itemStyle).hover(function(){Q(this).css(E.itemHoverStyle);
Q(this).find("#imgAdd").attr("src","img/add_hover.png");
Q(this).find("#imgRemove").attr("src","img/remove_hover.png")
},function(){Q(this).css(E.itemStyle);
Q(this).find("#imgAdd").attr("src","img/add.png");
Q(this).find("#imgRemove").attr("src","img/remove.png")
}).find("img").css({verticalAlign:"middle",paddingRight:"3px"});
L.html(O);
if(!!E.onShowMenu){L=E.onShowMenu(A,L)
}Q.each(E.bindings,function(F,G){Q("#"+F,L).bind("click",function(H){P();
G(C,K)
})
});
L.css({left:A[E.eventPosX],top:A[E.eventPosY]}).show();
if(E.shadow){M.css({width:L.width(),height:L.height(),left:A.pageX+2,top:A.pageY+2}).show()
}Q(document).one("click",P)
}function P(){L.hide();
M.hide()
}Q.contextMenu={defaults:function(A){Q.each(A,function(B,C){if(typeof C=="object"&&S[B]){Q.extend(S[B],C)
}else{S[B]=C
}})
}}
})(jQuery);
$(function(){$("div.contextMenu").hide()
});