var GroupModificationsResume=new DUI.Class({_options:{},init:function(B){_options=$.extend(this._options,B||{})
},fire:function(){fluid.accessibletabs("escoTabs","escoPanels");
this.initAction();
this.inlineEditSetup();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},inlineEditSetup:function(){if($(".editableText").length!=0){fluid.inlineEdit(".editableText",{componentDecorators:{type:"fluid.undoDecorator"},listeners:{onFinishEdit:function(H,L,J,N){var M=/^(.*):(\d+):(.*)$/gi;
var I=M.exec(J.id);
if(I!=null){var K={id:I[2],newValue:H};
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/getAttributeKey.jsf",K,function(D){var C=Core.getResult(D);
Core.log("Result of query : /ajax/groupModificationsController/getAttributeKey => "+C);
var A=C;
$(J).addClass("validate[org.esco.grouperui.group.attribut.regexp."+A+"]");
J.name="org.esco.grouperui.group.attribut.regexp."+A;
var B=Validate.validateAttribute(J.name);
jQuery.ajaxSettings.async=true;
if(!B){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/applyModification.jsf",K,function(E){})
}})
}}},submitOnEnter:true})
}},initAction:function(){Core.addAction($("input"),Core.KEYDOWN,function(B){B.stopPropagation()
},false);
$(".reduce").bind("click",function(){var D=$(this).attr("id");
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
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/discardModification.jsf",J,function(A){N.remove()
})
});
Core.addAction($("#groupResumeSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){var B={};
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/saveGroup.jsf",B,function(H){if(Core.getResult(H).indexOf("false")!=-1){var F="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsResume.jsf";
var A={groupUuid:$("input[id=groupUuid]").val()};
Core.pullAjaxContent(F,A,"#mainContent",true,false);
Core._hideBlockUI()
}else{var G=Core.getResult(H);
nodeToSelect=G;
TreePlugin.refreshNodeOfTree(G!=$("a[class=clicked]").parent("li").attr("id"));
if(G!=$("a[class=clicked]").parent("li").attr("id")){$("a[class=clicked]").parent("li").attr("isEmpty","false")
}Core.raisedInterruptedAction()
}})
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupResumeCancel"),Core.CLICK,function(){var C="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
var D={groupUuid:$("input[id=groupUuid]").val()};
Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent(C,D,"#mainContent",true,false)
},false)
}},$.screen);