var Person=new DUI.Class({_options:{},_methodToCall:null,_isInitPrivilegeTab:false,_actionOnSave:null,_eventOnSave:null,_domOnSave:null,_nodeOnInit:null,init:function(B){_options=$.extend({},B||{});
fluid.accessibletabs("escoTabs","escoPanels");
$("#personSave").parent().hide();
$("#personCancel").parent().hide()
},fire:function(){Core.interruptedAction=null;
this.getIsPersonModified();
this.initTab();
this.initAction();
if($("a[class=clicked]").attr("id")==undefined&&tree!=undefined){tree.select_node($("li[id=:]"))
}this._nodeOnInit=$("a[class=clicked]")
},setMethodToCall:function(B){this._methodToCall=B;
this.initLoadDataOfCurrentSelection()
},getNavParams:function(){return this._options
},initLoadDataOfCurrentSelection:function(){var B=this;
if(!this._isInitPrivilegeTab){Core.addAction($("input[name=privilegesRadio]"),Core.CLICK,function(A){A.stopImmediatePropagation();
_self=B;
_displayBlockUIOption={onAfterShowBlockUI:function(){if(_self._methodToCall=="group"){personPrivilegesGroup._loadData()
}else{if(_self._methodToCall=="stem"){personPrivilegesStem._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}},initTab:function(){tabSelected=_options.tab;
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},getIsPersonModified:function(){$.post("/"+Core.applicationContext+"/ajax/personController/isModifiedPerson.jsf",{},function(B){$("#isPersonModified").attr("value",Core.getStatus(B));
if($("#isPersonModified").val()=="false"){$("#personSave").parent().hide();
$("#personCancel").parent().hide()
}else{$("#personSave").parent().show();
$("#personCancel").parent().show()
}})
},initAction:function(){_this=this;
Core.addAction($("#personSave"),Core.CLICK,function(B){if($("#isPersonModified").val()=="true"){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{},"#mainContent",true,false)
}},false);
Core.addAction($("#personCancel"),Core.CLICK,function(B){$.post("/"+Core.applicationContext+"/ajax/personController/clearControllers.jsf",json,function(A){});
Core.delActionGlobal();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
},false);
Core.addActionGlobal({onConditionnal:function(F){Core.log("onConditional method for global action");
var D={};
var E=null;
Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/personController/isModifiedPerson.jsf",D,function(A){E=Core.getStatus(A)
});
jQuery.ajaxSettings.async=true;
return E
},onException:function(B){$.unblockUI()
},onTrue:function(B){_selfCaller=B.action;
_selfEvent=B.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(A){Core.log("fire function change_cancel");
tree.select_node(_this._nodeOnInit);
A.stopImmediatePropagation();
Core.isInBlockUiMode=false;
$.unblockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(A){Core.log("fire function change_yes");
Core.isInBlockUiMode=false;
$.unblockUI();
tree.select_node(_this._nodeOnInit);
jQuery.ajaxSettings.async=false;
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(A){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/personController/clearControllers.jsf",json,function(D){});
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