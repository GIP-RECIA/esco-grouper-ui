var GroupResume=new DUI.Class({_options:{},init:function(B){_options=$.extend({},{},B||{})
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
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
$.post("/"+Core.applicationContext+"/ajax/groupController/discardModification.jsf",J,function(A){N.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.isInBlockUiMode=true;
var B={};
$.post("/"+Core.applicationContext+"/ajax/groupController/saveGroup.jsf",B,function(A){if(!Core.getStatus(A)){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}else{if(!Core.raisedInterruptedAction()){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}}})
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
},false)
}},$.screen);