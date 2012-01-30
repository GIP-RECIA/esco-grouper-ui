var EscoAnimate={_showAnimate:function(A){A.animate({height:"show",queue:false},"slow","easeOutQuad")
},_hideAnimate:function(A){A.css("height",A.height()+"px");
A.animate({height:"hide",queue:false},"slow","easeOutQuad")
}};