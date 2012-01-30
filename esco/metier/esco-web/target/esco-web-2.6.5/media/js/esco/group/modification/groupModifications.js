var GroupModificationsBase={_options:{onSelectTab:null,onBeforeSave:[]},init:function(B){_options=$.extend({},{},B||{});
if($("#isCreationView").val()=="false"){$("#groupSave").parent().hide()
}},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
jQuery.each(this._options.onBeforeSave,function(C,D){D.call()
})
},getIsGroupModified:function(){if($("#isCreationView").val()=="false"){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",{},function(B){$("#isGroupModified").attr("value",Core.getStatus(B));
if($("#isGroupModified").val()=="false"){$("#groupSave").parent().hide()
}else{$("#groupSave").parent().show()
}})
}},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},initTab:function(){tabSelected=Core.getNavParam("tab");
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},initAction:function(){var B=function(A){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsResume.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false);
Core._hideBlockUI()
}};
Core._showBlockUI(_displayBlockUIOption)
};
Core.addAction($("#groupSave"),Core.CLICK,function(A){dataSave={save:true};
$(this).trigger("group.save",dataSave);
if(dataSave.save){B(A)
}},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(E){$(this).trigger("group.cancel");
var A="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
isCreationVal=$("input[id=isCreationView]").val();
var F={};
if(isCreationVal=="true"){F={stemUuid:$("input[id=stemUuid]").val()}
}else{F={groupUuid:$("input[id=groupUuid]").val()}
}Core.pullAjaxContent(A,F,"#mainContent",true,false)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(A){var D=true;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid"),needToRedirect:D},function(C){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(C);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(J){Core.log("onConditional method for global action");
var H={};
var I=null;
var K=$("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val();
var L=$("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val();
var A=""==$("#groupUuid").val();
if((K||(A&&L))&&$(J.event.target).attr("url")==J.url&&J.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",H,function(C){I=Core.getStatus(C)
});
jQuery.ajaxSettings.async=true
}return I
},onException:function(A){Core._hideBlockUI()
},onTrue:function(A){Core.log("Call on true  group mod tab");
_selfCaller=A.action;
_selfEvent=A.e;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(D){Core.log("fire function change_cancel");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}D.stopImmediatePropagation();
Core.isInBlockUiMode=false;
Core._hideBlockUI();
$("#change_yes").unbind(Core.CLICK)
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(D){Core.log("fire function change_yes");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$("#groupSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(D){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
Core._hideBlockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",json,function(C){});
jQuery.ajaxSettings.async=true;
Core.delActionGlobal();
Core.log("---------------------------------> Caller : ");
Core.log(_selfCaller);
D.stopImmediatePropagation();
_selfCaller.action(_selfEvent)
},false)
},onFalse:function(A){A.fire=false;
A.action.action(A.e)
}})
}};
var GroupModifications=new DUI.Class(GroupModificationsBase,$.screen);