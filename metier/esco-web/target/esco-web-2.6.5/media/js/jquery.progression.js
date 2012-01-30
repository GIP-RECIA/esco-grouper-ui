(function(D){D.fn.progression=function(C){var B=D.extend({Current:50,Maximum:100,TextColor:"#000000",aBackground:"#FFFFFF",aTextColor:"#FFFFFF",BorderColor:"#000000",Animate:true,AnimateTimeOut:3000,Easing:"linear",startFct:null,endFct:null},D.fn.progression.defaults,C);
if(C){var A=C.Current
}return this.each(function(){$this=D(this);
$innerdiv=$this.find(".progress");
var M=D.metadata?D.extend({},B,$this.metadata()):B;
if($innerdiv.length!=1){E($this,M)
}else{if(A){M.Current=A
}M.Maximum=parseInt($this.attr("pmax"))
}if(M.Current>M.Maximum){F("La valeur demandee doit etre inférieur ou egale a la valeur maximale.");
return false
}var Q=Math.round(parseInt($this.attr("pcur"))/M.Maximum*100);
var R=Math.round(parseInt(M.Current)/M.Maximum*100);
if(typeof M.startFct=="function"){M.startFct(M)
}if(M.Animate){var P=parseInt($this.attr("pcur"));
var N=Math.abs(P-M.Current);
var O=Math.floor(M.AnimateTimeOut/M.Maximum);
$innerdiv.queue("fx",[]);
$innerdiv.stop();
$innerdiv.animate({width:R+"%"},{duration:Math.round(O*(N+1)),queue:false,easing:M.Easing,complete:function(){if(typeof M.endFct=="function"){M.endFct(M)
}}});
for(i=0;
i<=N;
i++){$innerdiv.animate({opacity:1},{duration:Math.round(O*i),queue:false,complete:function(){if(P<=M.Current){D(this).progressionSetTextTo(P++)
}else{D(this).progressionSetTextTo(P--)
}}})
}}else{$innerdiv.css({width:R+"%"});
$innerdiv.progressionSetTextTo(M.Current);
if(typeof M.endFct=="function"){M.endFct(M)
}}})
};
function E(B,A){B.html("");
B.css({textAlign:"left",position:"relative",overflow:"hidden",backgroundColor:A.aBackground,borderColor:A.BorderColor,color:A.TextColor});
if(A.Width){B.css("width",A.Width)
}if(A.Height){B.css({height:A.Height,lineHeight:A.Height})
}if(A.BackgroundImg){B.css({backgroundImage:"url("+A.BackgroundImg+")"})
}$innerdiv=D("<div class='progress'></div>");
D("<div class='text'>&nbsp;</div>").css({position:"absolute",width:"100%",height:"100%",zIndex:6000,textAlign:"center"}).appendTo(B);
D("<span class='text'>&nbsp;</span>").css({position:"absolute",width:"0px",display:"none",textAlign:"center"}).appendTo($innerdiv);
B.append($innerdiv);
$innerdiv.css({position:"absolute",width:0,height:"100%",overflow:"hidden",background:'#98C781 url("/" + Core.applicationContext + "/media/imgs/layout/80ade5_40x100_textures_04_highlight_hard_100.png)repeat-x scroll 0 50%',color:A.aTextColor});
$innerdiv.css();
if(A.aBackgroundImg){$innerdiv.css({backgroundImage:"url("+A.aBackgroundImg+")"})
}B.attr("pmax",A.Maximum);
B.attr("pcur",0)
}D.fn.progressionSetTextTo=function(A){return this.each(function(){$this=D(this).parent();
if($this.attr("pmax")!=100){$this.find(".text").html(A+"/"+$this.attr("pmax"))
}else{$this.find(".text").html(A+" %")
}$this.attr("pcur",A)
})
};
function F(A){if(window.console&&window.console.log){window.console.log("jQuery Progression: "+A)
}}D.fn.progression.defaults={}
})(jQuery);