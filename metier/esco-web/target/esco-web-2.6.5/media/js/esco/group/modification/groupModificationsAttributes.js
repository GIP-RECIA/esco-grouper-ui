var GroupModificationsAttributes=new DUI.Class({_options:{},_postData:{},_needUpdateData:true,init:function(B){_options=$.extend({},{},B||{})
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
this._needUpdateData=true
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},clearMod:function(){Core.log("Clear all data in controller. ");
jQuery.ajaxSettings.async=false;
fromResponse=_options.fromResponse;
if(fromResponse==undefined){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",function(B){})
}jQuery.ajaxSettings.async=true
},prepareAttributesToController:function(){var B=this;
jQuery.each($("input[type=text]"),function(A,D){B._postData[$(this).attr("id")]=$(this).val()
})
},preparePrivilegesToController:function(){var B=this;
jQuery.each($("div[id=groupPrivileges]").find("input[type=checkbox]"),function(){B._postData["privilege_"+$(this).attr("id")]=$(this).attr("checked")
})
},prepareCustomTypeToController:function(){var B=this;
jQuery.each($("input[name=customType]"),function(){B._postData["customType_"+$(this).attr("value")]=$(this).attr("checked")
})
},prepareContextToController:function(){var B=this;
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(){B._postData["groupContext_"+$(this).attr("value")]=$(this).attr("checked")
})
},sendGroupDataToController:function(){if(this._needUpdateData){this.prepareAttributesToController();
this.preparePrivilegesToController();
this.prepareCustomTypeToController();
this.prepareContextToController();
jQuery.ajaxSettings.async=false;
this._postData.groupUuid=$("input[id=groupUuid]").val();
$.post("/"+Core.applicationContext+"/ajax/groupModificationsAttributesController/updateAttributes.jsf",this._postData,function(B){});
jQuery.ajaxSettings.async=true
}},initAction:function(){var B=this;
Core.addAction($("#groupSave"),Core.CLICK,function(A){B._postData={};
_displayBlockUIOption={onAfterShowBlockUI:function(){var D=Validate.validateAttributes();
if(!D){B.sendGroupDataToController();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModifications.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}Core._hideBlockUI()
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(E){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",json,function(C){});
var A="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
isCreationVal=$("input[id=isCreationView]").val();
var F={};
if(isCreationVal=="true"){F={stemUuid:$("input[id=stemUuid]").val()}
}else{F={groupUuid:$("input[id=groupUuid]").val()}
}Core.pullAjaxContent(A,F,"#mainContent",true,false)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(A){var D=true;
B._needUpdateData=false;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid").val(),needToRedirect:D},function(C){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(C);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(J){Core.log("onConditional method for global action");
var H={};
var I=false;
var K=$("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val();
var L=$("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val();
var A=""==$("#groupUuid").val();
if((K||(A&&L))&&$(J.event.target).attr("url")==J.url&&J.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{if(B._needUpdateData){Core.log("fire check condition");
B.sendGroupDataToController();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",H,function(C){I=Core.getStatus(C)
})
}jQuery.ajaxSettings.async=true
}return I&&B._needUpdateData
},onException:function(A){Core._hideBlockUI()
},onTrue:function(A){_selfCaller=A.action;
_selfEvent=A.e;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(D){Core.log("fire function change_cancel");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}D.stopImmediatePropagation();
Core._hideBlockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(D){Core.log("fire function change_yes");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}Core._hideBlockUI();
Core.delActionGlobal();
D.stopImmediatePropagation();
jQuery.ajaxSettings.async=false;
$("#groupSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(D){Core.log("fire function change_no");
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
}},$.screen);