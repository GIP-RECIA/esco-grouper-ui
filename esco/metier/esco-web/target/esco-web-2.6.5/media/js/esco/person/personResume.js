var PersonResume=new DUI.Class({_options:{},init:function(B){_options=$.extend({},{},B||{})
},fire:function(){this.initTab();
this.initAction()
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},initAction:function(){$(".reduce").bind("click",function(){var D=$(this).attr("id");
var E=D.substring(0,D.lastIndexOf(":")+1);
var F=E+"contentToOpenOrReduce";
if($(this).attr("src").indexOf("minus.gif")>=0){$(this).attr("src","/"+Core.applicationContext+"/media/imgs/tab/plus.gif");
EscoAnimate._hideAnimate($("div[id="+F+"]"))
}else{$(this).attr("src","/"+Core.applicationContext+"/media/imgs/tab/minus.gif");
EscoAnimate._showAnimate($("div[id="+F+"]"))
}});
$(".errorLign").bind("click",function(){var P=$(this).attr("id");
var L=P.substring(0,P.lastIndexOf(":")+1);
var K=L+"classIndexValue";
var I=($("input[id="+K+"]").attr("value")).split(":");
var M=I[1];
var O=I[0];
var J={id:M,controllerClass:O};
var N=$(this).parent("td").parent("tr");
$.post("/"+Core.applicationContext+"/ajax/personController/discardModification.jsf",J,function(A){N.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){var B={};
$.post("/"+Core.applicationContext+"/ajax/personController/savePerson.jsf",B,function(A){if(!Core.getStatus(A)){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
}else{if(!Core.raisedInterruptedAction()){if($("#needToRefreshTree").val()=="true"){tree.refresh($("li[id=:]"))
}Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
}}})
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
},false)
}},$.screen);