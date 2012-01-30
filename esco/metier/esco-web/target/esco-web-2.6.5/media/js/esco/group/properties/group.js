var Group=new DUI.Class({_options:{},_methodToCall:null,_isInitPrivilegeTab:false,_actionOnSave:null,_eventOnSave:null,_domOnSave:null,init:function(B){_options=$.extend({},B||{});
$("#groupSave").parent().hide();
$("#groupCancel").parent().hide()
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
this.getIsGroupModified()
},setMethodToCall:function(B){this._methodToCall=B;
this.initLoadDataOfCurrentSelection()
},getIsGroupModified:function(){$.post("/"+Core.applicationContext+"/ajax/groupController/isModifiedGroups.jsf",{},function(B){$("#isGroupModified").attr("value",Core.getStatus(B));
if($("#isGroupModified").val()=="false"){$("#groupSave").parent().hide();
$("#groupCancel").parent().hide()
}else{$("#groupSave").parent().show();
$("#groupCancel").parent().show()
}})
},initLoadDataOfCurrentSelection:function(){if(!this._isInitPrivilegeTab){Core.addAction($("input[name=privilegesRadio]"),Core.CLICK,function(B){B.stopImmediatePropagation();
_displayBlockUIOption={onAfterShowBlockUI:function(){if(group._methodToCall=="group"){groupPrivilegesGroup._loadData()
}else{if(group._methodToCall=="stem"){groupPrivilegesStem._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}},getNavParams:function(){return this._options
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},initTab:function(){tabSelected=_options.tab;
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},clearMod:function(){Core.log("Clear all data in controller. ");
jQuery.ajaxSettings.async=false;
if(Core.getNavParam("fromResponse")==null){$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",function(B){})
}jQuery.ajaxSettings.async=true
},initAction:function(){Core.addAction($("#groupSave"),Core.CLICK,function(B){if($("#isGroupModified").val()=="true"){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}},false);
Core.addAction($("#groupAdmin"),Core.CLICK,function(B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$("input[id=groupUuid]").val(),creation:"false",from:"treeNavigate"},"#mainContent",true,true)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(D){var C=true;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid").val(),needToRedirect:C},function(A){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(A);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(B){$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",json,function(A){});
Core.delActionGlobal();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
},false);
Core.addActionGlobal({onConditionnal:function(F){Core.log("onConditional method for global action");
var D={};
var E=null;
if($("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val()&&$(F.event.target).attr("url")==F.url&&F.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupController/isModifiedGroups.jsf",D,function(A){E=Core.getStatus(A)
});
jQuery.ajaxSettings.async=true
}return E
},onException:function(B){$.unblockUI()
},onTrue:function(B){_selfCaller=B.action;
_selfEvent=B.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(A){Core.log("fire function change_cancel");
tree.select_node($("li[id="+$("#groupUuid").val()+"]"));
A.stopImmediatePropagation();
Core.isInBlockUiMode=false;
$.unblockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(A){A.stopImmediatePropagation();
Core.log("fire function change_yes");
tree.select_node($("li[id="+$("#groupUuid").val()+"]"));
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(A){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",json,function(D){});
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