var StemResume=new DUI.Class({_options:{},init:function(A){_options=$.extend(this._options,A||{})
},fire:function(){this.initTab();
this.initAction();
this.inlineEditSetup();
this.initBreadCrumb();
Core._hideBlockUI(true)
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},inlineEditSetup:function(){if($(".editableText").length!=0){fluid.inlineEdit(".editableText",{componentDecorators:{type:"fluid.undoDecorator"},listeners:{onFinishEdit:function(C,E,B,D){regIdNode=/^(.*):(\d+):(.*)$/gi;
mymatch=regIdNode.exec(B.id);
if(mymatch!=null){var A={id:mymatch[2],newValue:C};
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/getAttributeKey.jsf",A,function(G){var F=Core.getResult(G);
Core.log("Result of query : /ajax/stemController/getAttributeKey => "+F);
var I=F;
$(B).addClass("validate[org.esco.grouperui.stem.attribut.regexp."+I+"]");
B.name="org.esco.grouperui.stem.attribut.regexp."+I;
var H=Validate.validateAttribute(B.name);
jQuery.ajaxSettings.async=true;
if(!H){$.post("/"+Core.applicationContext+"/ajax/stemController/applyModification.jsf",A,function(J){})
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
$.post("/"+Core.applicationContext+"/ajax/stemController/discardModification.jsf",H,function(I){D.remove()
})
});
Core.addAction($("#groupSave"),Core.CLICK,function(){_displayBlockUIOption={onAfterShowBlockUI:function(){var A={};
$.post("/"+Core.applicationContext+"/ajax/stemController/saveStem.jsf",A,function(B){if(Core.getResult(B).indexOf("false")!=-1){var D="/"+Core.applicationContext+"/stylesheets/stemModifications/stemModificationsResume.jsf";
var E={stemUuid:$("input[id=stemUuid]").val()};
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
Core.addAction($("#groupCancel"),Core.CLICK,function(){var A="/"+Core.applicationContext+"/stylesheets/stemModifications.jsf";
var B={stemUuid:$("input[id=stemUuid]").val()};
Core.setNavParam("fromResponse","Resume");
Core.pullAjaxContent(A,B,"#mainContent",true,false)
},false)
}},$.screen);