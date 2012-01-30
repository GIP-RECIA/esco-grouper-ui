var GroupResume=new DUI.Class({_options:{},init:function(A){_options=$.extend({},{},A||{})
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
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
$.post("/"+Core.applicationContext+"/ajax/groupController/discardModification.jsf",H,function(I){D.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.isInBlockUiMode=true;
var A={};
$.post("/"+Core.applicationContext+"/ajax/groupController/saveGroup.jsf",A,function(B){if(!Core.getStatus(B)){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}else{if(!Core.raisedInterruptedAction()){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}}})
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
},false)
}},$.screen);