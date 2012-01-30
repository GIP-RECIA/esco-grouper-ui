(function(H){var C,B,E,J,G,D;
var F={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",backgroundImage:"",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent",backgroundImage:""},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2",backgroundImage:""},eventPosX:"pageX",eventPosY:"pageY",shadow:true,onContextMenu:null,onShowMenu:null};
H.fn.contextMenu=function(K,M){if(!C){C=H('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(N){N.stopPropagation()
})
}if(!B){B=H("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:0.2,zIndex:499}).appendTo("body").hide()
}G=G||[];
G.push({id:K,menuStyle:H.extend({},F.menuStyle,M.menuStyle||{}),itemStyle:H.extend({},F.itemStyle,M.itemStyle||{}),itemHoverStyle:H.extend({},F.itemHoverStyle,M.itemHoverStyle||{}),bindings:M.bindings||{},shadow:M.shadow||M.shadow===false?M.shadow:F.shadow,onContextMenu:M.onContextMenu||F.onContextMenu,onShowMenu:M.onShowMenu||F.onShowMenu,eventPosX:M.eventPosX||F.eventPosX,eventPosY:M.eventPosY||F.eventPosY});
var L=G.length-1;
H(this).bind("contextmenu",function(O){var N=(!!G[L].onContextMenu)?G[L].onContextMenu(O):true;
if(N){A(L,this,O,M)
}return false
});
return this
};
function A(K,O,L,N){var M=G[K];
J=H("#"+M.id).find("ul:first").clone(true);
J.css(M.menuStyle).find("li").css(M.itemStyle).hover(function(){H(this).css(M.itemHoverStyle);
H(this).find("#imgAdd").attr("src","img/add_hover.png");
H(this).find("#imgRemove").attr("src","img/remove_hover.png")
},function(){H(this).css(M.itemStyle);
H(this).find("#imgAdd").attr("src","img/add.png");
H(this).find("#imgRemove").attr("src","img/remove.png")
}).find("img").css({verticalAlign:"middle",paddingRight:"3px"});
C.html(J);
if(!!M.onShowMenu){C=M.onShowMenu(L,C)
}H.each(M.bindings,function(Q,P){H("#"+Q,C).bind("click",function(R){I();
P(O,D)
})
});
C.css({left:L[M.eventPosX],top:L[M.eventPosY]}).show();
if(M.shadow){B.css({width:C.width(),height:C.height(),left:L.pageX+2,top:L.pageY+2}).show()
}H(document).one("click",I)
}function I(){C.hide();
B.hide()
}H.contextMenu={defaults:function(K){H.each(K,function(L,M){if(typeof M=="object"&&F[L]){H.extend(F[L],M)
}else{F[L]=M
}})
}}
})(jQuery);
$(function(){$("div.contextMenu").hide()
});