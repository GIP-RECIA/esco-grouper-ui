var EscoAnimate={_showAnimate:function(B){B.animate({height:"show",queue:false},"slow","easeOutQuad")
},_hideAnimate:function(B){B.css("height",B.height()+"px");
B.animate({height:"hide",queue:false},"slow","easeOutQuad")
}};