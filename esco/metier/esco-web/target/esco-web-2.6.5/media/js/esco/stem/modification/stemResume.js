var StemResume=new DUI.Class({_options:{},init:function(B){_options=$.extend(this._options,B||{})
},fire:function(){this.initTab();
this.initAction();
this.inlineEditSetup();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},inlineEditSetup:function(){if($(".editableText").length!=0){fluid.inlineEdit(".editableText",{componentDecorators:{type:"fluid.undoDecorator"},listeners:{onFinishEdit:function(I,G,J,H){regIdNode=/^(.*):(\d+):(.*)$/gi;
mymatch=regIdNode.exec(J.id);
if(mymatch!=null){var F={id:mymatch[2],newValue:I};
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/getAttributeKey.jsf",F,function(C){var D=Core.getResult(C);
Core.log("Result of query : /ajax/stemController/getAttributeKey => "+D);
var A=D;
$(J).addClass("validate[org.esco.grouperui.stem.attribut.regexp."+A+"]");
J.name="org.esco.grouperui.stem.attribut.regexp."+A;
var B=Validate.validateAttribute(J.name);
jQuery.ajaxSettings.async=true;
if(!B){$.post("/"+Core.applicationContext+"/ajax/stemController/applyModification.jsf",F,function(E){})
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
$.post("/"+Core.applicationContext+"/ajax/stemController/discardModification.jsf",J,function(A){N.remove()
})
});
Core.addAction($("#groupSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){var B={};
$.post("/"+Core.applicationContext+"/ajax/stemController/saveStem.jsf",B,function(H){if(Core.getResult(H).indexOf("false")!=-1){var F="/"+Core.applicationContext+"/stylesheets/stemModifications/stemModificationsResume.jsf";
var A={stemUuid:$("input[id=stemUuid]").val()};
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
Core.addAction($("#groupCancel"),Core.CLICK,function(){var C="/"+Core.applicationContext+"/stylesheets/stemModifications.jsf";
var D={stemUuid:$("input[id=stemUuid]").val()};
Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent(C,D,"#mainContent",true,false)
},false)
}},$.screen);