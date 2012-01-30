var PersonResume=new DUI.Class({_options:{},init:function(A){_options=$.extend({},{},A||{})
},fire:function(){this.initTab();
this.initAction()
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},initAction:function(){$(".reduce").bind("click",function(){var A=$(this).attr("id");
var C=A.substring(0,A.lastIndexOf(":")+1);
var B=C+"contentToOpenOrReduce";
if($(this).attr("src").indexOf("minus.gif")>=0){$(this).attr("src","/"+Core.applicationContext+"/media/imgs/tab/plus.gif");
EscoAnimate._hideAnimate($("div[id="+B+"]"))
}else{$(this).attr("src","/"+Core.applicationContext+"/media/imgs/tab/minus.gif");
EscoAnimate._showAnimate($("div[id="+B+"]"))
}});
$(".errorLign").bind("click",function(){var B=$(this).attr("id");
var F=B.substring(0,B.lastIndexOf(":")+1);
var G=F+"classIndexValue";
var A=($("input[id="+G+"]").attr("value")).split(":");
var E=A[1];
var C=A[0];
var H={id:E,controllerClass:C};
var D=$(this).parent("td").parent("tr");
$.post("/"+Core.applicationContext+"/ajax/personController/discardModification.jsf",H,function(I){D.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){var A={};
$.post("/"+Core.applicationContext+"/ajax/personController/savePerson.jsf",A,function(B){if(!Core.getStatus(B)){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
}else{if(!Core.raisedInterruptedAction()){if($("#needToRefreshTree").val()=="true"){tree.refresh($("li[id=:]"))
}Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
}}})
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
},false)
}},$.screen);