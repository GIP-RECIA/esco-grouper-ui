var GroupModificationsBase={_options:{onSelectTab:null,onBeforeSave:[]},init:function(A){_options=$.extend({},{},A||{});
if($("#isCreationView").val()=="false"){$("#groupSave").parent().hide()
}},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
jQuery.each(this._options.onBeforeSave,function(A,B){B.call()
})
},getIsGroupModified:function(){if($("#isCreationView").val()=="false"){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",{},function(A){$("#isGroupModified").attr("value",Core.getStatus(A));
if($("#isGroupModified").val()=="false"){$("#groupSave").parent().hide()
}else{$("#groupSave").parent().show()
}})
}},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},initTab:function(){tabSelected=Core.getNavParam("tab");
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},initAction:function(){var A=function(B){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false);
Core._hideBlockUI()
}};
Core._showBlockUI(_displayBlockUIOption)
};
Core.addAction($("#groupSave"),Core.CLICK,function(B){dataSave={save:true};
$(this).trigger("group.save",dataSave);
if(dataSave.save){A(B)
}},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(C){$(this).trigger("group.cancel");
var D="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
isCreationVal=$("input[id=isCreationView]").val();
var B={};
if(isCreationVal=="true"){B={stemUuid:$("input[id=stemUuid]").val()}
}else{B={groupUuid:$("input[id=groupUuid]").val()}
}Core.pullAjaxContent(D,B,"#mainContent",true,false)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(C){var B=true;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid"),needToRedirect:B},function(D){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(D);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(D){Core.log("onConditional method for global action");
var F={};
var E=null;
var C=$("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val();
var B=$("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val();
var G=""==$("#groupUuid").val();
if((C||(G&&B))&&$(D.event.target).attr("url")==D.url&&D.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",F,function(H){E=Core.getStatus(H)
});
jQuery.ajaxSettings.async=true
}return E
},onException:function(B){Core._hideBlockUI()
},onTrue:function(B){Core.log("Call on true  group mod tab");
_selfCaller=B.action;
_selfEvent=B.e;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(C){Core.log("fire function change_cancel");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}C.stopImmediatePropagation();
Core.isInBlockUiMode=false;
Core._hideBlockUI();
$("#change_yes").unbind(Core.CLICK)
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(C){Core.log("fire function change_yes");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$("#groupSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(C){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",json,function(D){});
jQuery.ajaxSettings.async=true;
Core.delActionGlobal();
Core.log("---------------------------------> Caller : ");
Core.log(_selfCaller);
C.stopImmediatePropagation();
_selfCaller.action(_selfEvent)
},false)
},onFalse:function(B){B.fire=false;
B.action.action(B.e)
}})
}};
var GroupModifications=new DUI.Class(GroupModificationsBase,$.screen);