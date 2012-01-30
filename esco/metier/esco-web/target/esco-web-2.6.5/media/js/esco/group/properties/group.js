var Group=new DUI.Class({_options:{},_methodToCall:null,_isInitPrivilegeTab:false,_actionOnSave:null,_eventOnSave:null,_domOnSave:null,init:function(A){_options=$.extend({},A||{});
$("#groupSave").parent().hide();
$("#groupCancel").parent().hide()
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
this.getIsGroupModified()
},setMethodToCall:function(A){this._methodToCall=A;
this.initLoadDataOfCurrentSelection()
},getIsGroupModified:function(){$.post("/"+Core.applicationContext+"/ajax/groupController/isModifiedGroups.jsf",{},function(A){$("#isGroupModified").attr("value",Core.getStatus(A));
if($("#isGroupModified").val()=="false"){$("#groupSave").parent().hide();
$("#groupCancel").parent().hide()
}else{$("#groupSave").parent().show();
$("#groupCancel").parent().show()
}})
},initLoadDataOfCurrentSelection:function(){if(!this._isInitPrivilegeTab){Core.addAction($("input[name=privilegesRadio]"),Core.CLICK,function(A){A.stopImmediatePropagation();
_displayBlockUIOption={onAfterShowBlockUI:function(){if(group._methodToCall=="group"){groupPrivilegesGroup._loadData()
}else{if(group._methodToCall=="stem"){groupPrivilegesStem._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}},getNavParams:function(){return this._options
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},initTab:function(){tabSelected=_options.tab;
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},clearMod:function(){Core.log("Clear all data in controller. ");
jQuery.ajaxSettings.async=false;
if(Core.getNavParam("fromResponse")==null){$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",function(A){})
}jQuery.ajaxSettings.async=true
},initAction:function(){Core.addAction($("#groupSave"),Core.CLICK,function(A){if($("#isGroupModified").val()=="true"){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}},false);
Core.addAction($("#groupAdmin"),Core.CLICK,function(A){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$("input[id=groupUuid]").val(),creation:"false",from:"treeNavigate"},"#mainContent",true,true)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(B){var A=true;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid").val(),needToRedirect:A},function(C){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(C);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(A){$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",json,function(B){});
Core.delActionGlobal();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
},false);
Core.addActionGlobal({onConditionnal:function(B){Core.log("onConditional method for global action");
var A={};
var C=null;
if($("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val()&&$(B.event.target).attr("url")==B.url&&B.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupController/isModifiedGroups.jsf",A,function(D){C=Core.getStatus(D)
});
jQuery.ajaxSettings.async=true
}return C
},onException:function(A){$.unblockUI()
},onTrue:function(A){_selfCaller=A.action;
_selfEvent=A.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(B){Core.log("fire function change_cancel");
tree.select_node($("li[id="+$("#groupUuid").val()+"]"));
B.stopImmediatePropagation();
Core.isInBlockUiMode=false;
$.unblockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(B){B.stopImmediatePropagation();
Core.log("fire function change_yes");
tree.select_node($("li[id="+$("#groupUuid").val()+"]"));
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(B){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupController/clearModification.jsf",json,function(C){});
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