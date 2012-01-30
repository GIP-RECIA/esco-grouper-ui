var Stem=new DUI.Class({_options:{},_attributeVal:{},init:function(A){_options=$.extend({},{},A||{});
$("#stemSave").parent().hide();
$("#stemCancel").parent().hide()
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb()
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},getIsStemModified:function(){if($("#isCreationView").val()=="false"){$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",{},function(A){$("#isStemModified").attr("value",Core.getStatus(A));
if($("#isStemModified").val()=="false"){$("#stemSave").parent().hide();
$("#stemCancel").parent().hide()
}else{$("#stemSave").parent().show();
$("#stemCancel").parent().show()
}})
}else{$("#stemSave").parent().show();
$("#stemCancel").parent().show()
}},initTab:function(){tabSelected=_options.tab;
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},clearMod:function(){Core.log("Clear all data in controller. ");
jQuery.ajaxSettings.async=false;
if(Core.getNavParam("fromResponse")==null){$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",function(A){})
}jQuery.ajaxSettings.async=true
},initAction:function(){$("#stemSave").unbind(Core.CLICK);
Core.addAction($("#stemSave"),Core.CLICK,function(A){_displayBlockUIOption={onAfterShowBlockUI:function(){tabSelected=$("#currentTab").attr("value");
if(tabSelected!="0"){$("#save").attr("value","save");
$("a[id*=tabId][title="+Lang.getString("STEM.ATTRIBUTE.TAB")+"]").click()
}else{$("#save").attr("value","save");
validate.validate()
}}};
Core._showBlockUI(_displayBlockUIOption);
Core._hideBlockUI()
},false);
Core.addAction($("#stemCancel"),Core.CLICK,function(B){$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",json,function(D){});
var A=$("input[id=isCreationView]").val();
var C=false;
if(A=="true"){C=true
}Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$("input[id=stemUuid]").val(),creation:C},"#mainContent",true,false)
},false);
Core.addAction($("#stemDelete"),Core.CLICK,function(B){var A=true;
$.post("/"+Core.applicationContext+"/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:$("#groupUuid"),needToRedirect:A},function(C){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(C);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(D){jQuery.ajaxSettings.async=false;
var B={};
var A=null;
if($("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val()&&$(D.event.target).attr("url")==D.url&&D.event.type==Core.PULLCONTENT){throw"SameStemException"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",B,function(E){A=Core.getStatus(E)
});
jQuery.ajaxSettings.async=true
}var C=false;
$.each($("input[isAttr=true]"),function(){if($(this).val()!=Stem._attributeVal[$(this).attr("id")]){C=true
}});
return A||(C&&$("#modalDelete").html()=="")
},onException:function(A){$.unblockUI()
},onTrue:function(A){_selfCaller=A.action;
_selfEvent=A.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(B){Core.log("fire function change_cancel");
if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}B.stopImmediatePropagation();
Core.isInBlockUiMode=false;
Core._hideBlockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(B){Core.log("fire function change_yes");
if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
B.stopImmediatePropagation();
jQuery.ajaxSettings.async=false;
$("#stemSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(B){if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){callDone.splice($(tree.selected).attr("id"));
tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",json,function(C){});
jQuery.ajaxSettings.async=true;
Core.delActionGlobal();
Core.log("---------------------------------> Caller : ");
Core.log(_selfCaller);
B.stopImmediatePropagation();
_selfCaller.action(_selfEvent)
},false)
},onFalse:function(A){A.fire=false;
A.action.action(A.event)
}})
}},$.screen);