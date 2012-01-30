var GroupModificationsAttributes=new DUI.Class({_options:{},_postData:{},_needUpdateData:true,init:function(A){_options=$.extend({},{},A||{})
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb();
this._needUpdateData=true
},initBreadCrumb:function(){var A=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:A})
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},clearMod:function(){Core.log("Clear all data in controller. ");
jQuery.ajaxSettings.async=false;
fromResponse=_options.fromResponse;
if(fromResponse==undefined){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",function(A){})
}jQuery.ajaxSettings.async=true
},prepareAttributesToController:function(){var A=this;
jQuery.each($("input[type=text]"),function(C,B){A._postData[$(this).attr("id")]=$(this).val()
})
},preparePrivilegesToController:function(){var A=this;
jQuery.each($("div[id=groupPrivileges]").find("input[type=checkbox]"),function(){A._postData["privilege_"+$(this).attr("id")]=$(this).attr("checked")
})
},prepareCustomTypeToController:function(){var A=this;
jQuery.each($("input[name=customType]"),function(){A._postData["customType_"+$(this).attr("value")]=$(this).attr("checked")
})
},prepareContextToController:function(){var A=this;
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(){A._postData["groupContext_"+$(this).attr("value")]=$(this).attr("checked")
})
},sendGroupDataToController:function(){if(this._needUpdateData){this.prepareAttributesToController();
this.preparePrivilegesToController();
this.prepareCustomTypeToController();
this.prepareContextToController();
jQuery.ajaxSettings.async=false;
this._postData.groupUuid=$("input[id=groupUuid]").val();
$.post("/"+Core.applicationContext+"/ajax/groupModificationsAttributesController/updateAttributes.jsf",this._postData,function(A){});
jQuery.ajaxSettings.async=true
}},initAction:function(){var A=this;
Core.addAction($("#groupSave"),Core.CLICK,function(B){A._postData={};
_displayBlockUIOption={onAfterShowBlockUI:function(){var C=Validate.validateAttributes();
if(!C){A.sendGroupDataToController();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModifications.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}Core._hideBlockUI()
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
Core.addAction($("#groupCancel"),Core.CLICK,function(C){$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/clearModification.jsf",json,function(E){});
var D="/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf";
isCreationVal=$("input[id=isCreationView]").val();
var B={};
if(isCreationVal=="true"){B={stemUuid:$("input[id=stemUuid]").val()}
}else{B={groupUuid:$("input[id=groupUuid]").val()}
}Core.pullAjaxContent(D,B,"#mainContent",true,false)
},false);
Core.addAction($("#groupDelete"),Core.CLICK,function(C){var B=true;
A._needUpdateData=false;
$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid").val(),needToRedirect:B},function(D){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(D);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false);
Core.addActionGlobal({onConditionnal:function(D){Core.log("onConditional method for global action");
var F={};
var E=false;
var C=$("a[class=clicked]").parent("li").attr("id")==$("#groupUuid").val();
var B=$("a[class=clicked]").parent("li").attr("id")==$("#stemUuid").val();
var G=""==$("#groupUuid").val();
if((C||(G&&B))&&$(D.event.target).attr("url")==D.url&&D.event.type==Core.PULLCONTENT){throw"SameGroupEsception"
}else{if(A._needUpdateData){Core.log("fire check condition");
A.sendGroupDataToController();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/groupModificationsController/isModifiedGroups.jsf",F,function(H){E=Core.getStatus(H)
})
}jQuery.ajaxSettings.async=true
}return E&&A._needUpdateData
},onException:function(B){Core._hideBlockUI()
},onTrue:function(B){_selfCaller=B.action;
_selfEvent=B.e;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(C){Core.log("fire function change_cancel");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}C.stopImmediatePropagation();
Core._hideBlockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(C){Core.log("fire function change_yes");
if($("#groupUuid").attr("value")==undefined||$("#groupUuid").attr("value")==""){tree.select_node($("li[id="+$("#stemUuid").val()+"]"))
}else{tree.select_node($("li[id="+$("#groupUuid").val()+"]"))
}Core._hideBlockUI();
Core.delActionGlobal();
C.stopImmediatePropagation();
jQuery.ajaxSettings.async=false;
$("#groupSave").trigger(Core.CLICK);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(C){Core.log("fire function change_no");
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
}},$.screen);