(function(A){A.fn.progression=function(D){var E=A.extend({Current:50,Maximum:100,TextColor:"#000000",aBackground:"#FFFFFF",aTextColor:"#FFFFFF",BorderColor:"#000000",Animate:true,AnimateTimeOut:3000,Easing:"linear",startFct:null,endFct:null},A.fn.progression.defaults,D);
if(D){var F=D.Current
}return this.each(function(){$this=A(this);
$innerdiv=$this.find(".progress");
var L=A.metadata?A.extend({},E,$this.metadata()):E;
if($innerdiv.length!=1){C($this,L)
}else{if(F){L.Current=F
}L.Maximum=parseInt($this.attr("pmax"))
}if(L.Current>L.Maximum){B("La valeur demandee doit etre inférieur ou egale a la valeur maximale.");
return false
}var H=Math.round(parseInt($this.attr("pcur"))/L.Maximum*100);
var G=Math.round(parseInt(L.Current)/L.Maximum*100);
if(typeof L.startFct=="function"){L.startFct(L)
}if(L.Animate){var I=parseInt($this.attr("pcur"));
var K=Math.abs(I-L.Current);
var J=Math.floor(L.AnimateTimeOut/L.Maximum);
$innerdiv.queue("fx",[]);
$innerdiv.stop();
$innerdiv.animate({width:G+"%"},{duration:Math.round(J*(K+1)),queue:false,easing:L.Easing,complete:function(){if(typeof L.endFct=="function"){L.endFct(L)
}}});
for(i=0;
i<=K;
i++){$innerdiv.animate({opacity:1},{duration:Math.round(J*i),queue:false,complete:function(){if(I<=L.Current){A(this).progressionSetTextTo(I++)
}else{A(this).progressionSetTextTo(I--)
}}})
}}else{$innerdiv.css({width:G+"%"});
$innerdiv.progressionSetTextTo(L.Current);
if(typeof L.endFct=="function"){L.endFct(L)
}}})
};
function C(D,E){D.html("");
D.css({textAlign:"left",position:"relative",overflow:"hidden",backgroundColor:E.aBackground,borderColor:E.BorderColor,color:E.TextColor});
if(E.Width){D.css("width",E.Width)
}if(E.Height){D.css({height:E.Height,lineHeight:E.Height})
}if(E.BackgroundImg){D.css({backgroundImage:"url("+E.BackgroundImg+")"})
}$innerdiv=A("<div class='progress'></div>");
A("<div class='text'>&nbsp;</div>").css({position:"absolute",width:"100%",height:"100%",zIndex:6000,textAlign:"center"}).appendTo(D);
A("<span class='text'>&nbsp;</span>").css({position:"absolute",width:"0px",display:"none",textAlign:"center"}).appendTo($innerdiv);
D.append($innerdiv);
$innerdiv.css({position:"absolute",width:0,height:"100%",overflow:"hidden",background:'#98C781 url("/" + Core.applicationContext + "/media/imgs/layout/80ade5_40x100_textures_04_highlight_hard_100.png)repeat-x scroll 0 50%',color:E.aTextColor});
$innerdiv.css();
if(E.aBackgroundImg){$innerdiv.css({backgroundImage:"url("+E.aBackgroundImg+")"})
}D.attr("pmax",E.Maximum);
D.attr("pcur",0)
}A.fn.progressionSetTextTo=function(D){return this.each(function(){$this=A(this).parent();
if($this.attr("pmax")!=100){$this.find(".text").html(D+"/"+$this.attr("pmax"))
}else{$this.find(".text").html(D+" %")
}$this.attr("pcur",D)
})
};
function B(D){if(window.console&&window.console.log){window.console.log("jQuery Progression: "+D)
}}A.fn.progression.defaults={}
})(jQuery);