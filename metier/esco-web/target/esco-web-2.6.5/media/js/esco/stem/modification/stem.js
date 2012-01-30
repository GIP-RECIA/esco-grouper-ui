var Stem=new DUI.Class({_options:{},_attributeVal:{},init:function(B){_options=$.extend({},{},B||{});
$("#stemSave").parent().hide();
$("#stemCancel").parent().hide()
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb()
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},getIsStemModified:function(){if($("#isCreationView").val()=="false"){$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",{},function(B){$("#isStemModified").attr("value",Core.getStatus(B));
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
if(Core.getNavParam("fromResponse")==null){$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",function(B){})
}jQuery.ajaxSettings.async=true
},initAction:function(){$("#stemSave").unbind(Core.CLICK);
Core.addAction($("#stemSave"),Core.CLICK,function(B){_displayBlockUIOption={onAfterShowBlockUI:function(){tabSelected=$("#currentTab").attr("value");
if(tabSelected!="0"){$("#save").attr("value","save");
$("a[id*=tabId][title="+Lang.getString("STEM.ATTRIBUTE.TAB")+"]").click()
}else{$("#save").attr("value","save");
validate.validate()
}}};
Core._showBlockUI(_displayBlockUIOption);
Core._hideBlockUI()
},false);
Core.addAction($("#stemCancel"),Core.CLICK,function(F){$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",json,function(A){});
var D=$("input[id=isCreationView]").val();
var E=false;
if(D=="true"){E=true
}Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$("input[id=stemUuid]").val(),creation:E},"#mainContent",true,false)
},false);
Core.addAction($("#stemDelete"),Core.CLICK,function(D){var C=true;
$.post("/"+Core.applicationContext+"/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:$("#groupUuid"),needToRedirect:C},function(A){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(A);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(F){jQuery.ajaxSettings.async=false;
var H={};
var E=null;
if($("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val()&&$(F.event.target).attr("url")==F.url&&F.event.type==Core.PULLCONTENT){throw"SameStemException"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",H,function(A){E=Core.getStatus(A)
});
jQuery.ajaxSettings.async=true
}var G=false;
$.each($("input[isAttr=true]"),function(){if($(this).val()!=Stem._attributeVal[$(this).attr("id")]){G=true
}});
return E||(G&&$("#modalDelete").html()=="")
},onException:function(B){$.unblockUI()
},onTrue:function(B){_selfCaller=B.action;
_selfEvent=B.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(A){Core.log("fire function change_cancel");
if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}A.stopImmediatePropagation();
Core.isInBlockUiMode=false;
Core._hideBlockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(A){Core.log("fire function change_yes");
if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
A.stopImmediatePropagation();
jQuery.ajaxSettings.async=false;
$("#stemSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(A){if($("#stemUuid").attr("value")==undefined||$("#stemUuid").attr("value")==""){callDone.splice($(tree.selected).attr("id"));
tree.select_node($(tree.selected))
}else{tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/stemController/clearModification.jsf",json,function(D){});
jQuery.ajaxSettings.async=true;
Core.delActionGlobal();
Core.log("---------------------------------> Caller : ");
Core.log(_selfCaller);
A.stopImmediatePropagation();
_selfCaller.action(_selfEvent)
},false)
},onFalse:function(B){B.fire=false;
B.action.action(B.event)
}})
}},$.screen);