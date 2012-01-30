var GroupModificationsResume=new DUI.Class({_options:{},init:function(A){_options=$.extend(this._options,A||{})
},fire:function(){fluid.accessibletabs("escoTabs","escoPanels");
this.initAction();
this.inlineEditSetup();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},inlineEditSetup:function(){if($(".editableText").length!=0){fluid.inlineEdit(".editableText",{componentDecorators:{type:"fluid.undoDecorator"},listeners:{onFinishEdit:function(A,D,F,B){var C=/^(.*):(\d+):(.*)$/gi;
var G=C.exec(F.id);
if(G!=null){var E={id:G[2],newValue:A};
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/getAttributeKey.jsf",E,function(H){var I=Core.getResult(H);
Core.log("Result of query : /ajax/groupModificationsController/getAttributeKey => "+I);
var K=I;
$(F).addClass("validate[org.esco.grouperui.group.attribut.regexp."+K+"]");
F.name="org.esco.grouperui.group.attribut.regexp."+K;
var J=Validate.validateAttribute(F.name);
jQuery.ajaxSettings.async=true;
if(!J){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/applyModification.jsf",E,function(L){})
}})
}}},submitOnEnter:true})
}},initAction:function(){Core.addAction($("input"),Core.KEYDOWN,function(A){A.stopPropagation()
},false);
$(".reduce").bind("click",function(){var A=$(this).attr("id");
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
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/discardModification.jsf",H,function(I){D.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){var A={};
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/saveGroup.jsf",A,function(B){if(Core.getResult(B).indexOf("false")!=-1){var D="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsResume.jsf";
var E={groupUuid:$("input[id=groupUuid]").val()};
Core.pullAjaxContent(D,E,"#mainContent",true,false);
Core._hideBlockUI()
}else{var C=Core.getResult(B);
nodeToSelect=C;
TreePlugin.refreshNodeOfTree(C!=$("a[class=clicked]").parent("li").attr("id"));
if(C!=$("a[class=clicked]").parent("li").attr("id")){$("a[class=clicked]").parent("li").attr("isEmpty","false")
}Core.raisedInterruptedAction()
}})
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){var A="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
var B={groupUuid:$("input[id=groupUuid]").val()};
Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent(A,B,"#mainContent",true,false)
},false)
}},$.screen);