var Person=new DUI.Class({_options:{},_methodToCall:null,_isInitPrivilegeTab:false,_actionOnSave:null,_eventOnSave:null,_domOnSave:null,_nodeOnInit:null,init:function(A){_options=$.extend({},A||{});
fluid.accessibletabs("escoTabs","escoPanels");
$("#personSave").parent().hide();
$("#personCancel").parent().hide()
},fire:function(){Core.interruptedAction=null;
this.getIsPersonModified();
this.initTab();
this.initAction();
if($("a[class=clicked]").attr("id")==undefined&&tree!=undefined){tree.select_node($("li[id=:]"))
}this._nodeOnInit=$("a[class=clicked]")
},setMethodToCall:function(A){this._methodToCall=A;
this.initLoadDataOfCurrentSelection()
},getNavParams:function(){return this._options
},initLoadDataOfCurrentSelection:function(){var A=this;
if(!this._isInitPrivilegeTab){Core.addAction($("input[name=privilegesRadio]"),Core.CLICK,function(B){B.stopImmediatePropagation();
_self=A;
_displayBlockUIOption={onAfterShowBlockUI:function(){if(_self._methodToCall=="group"){personPrivilegesGroup._loadData()
}else{if(_self._methodToCall=="stem"){personPrivilegesStem._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}},initTab:function(){tabSelected=_options.tab;
if(tabSelected==undefined){tabSelected=0
}$("#escoPanels").tabs({selected:tabSelected})
},getIsPersonModified:function(){$.post("/"+Core.applicationContext+"/ajax/personController/isModifiedPerson.jsf",{},function(A){$("#isPersonModified").attr("value",Core.getStatus(A));
if($("#isPersonModified").val()=="false"){$("#personSave").parent().hide();
$("#personCancel").parent().hide()
}else{$("#personSave").parent().show();
$("#personCancel").parent().show()
}})
},initAction:function(){_this=this;
Core.addAction($("#personSave"),Core.CLICK,function(A){if($("#isPersonModified").val()=="true"){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{},"#mainContent",true,false)
}},false);
Core.addAction($("#personCancel"),Core.CLICK,function(A){$.post("/"+Core.applicationContext+"/ajax/personController/clearControllers.jsf",json,function(B){});
Core.delActionGlobal();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false)
},false);
Core.addActionGlobal({onConditionnal:function(B){Core.log("onConditional method for global action");
var A={};
var C=null;
Core.log("fire check condition");
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/personController/isModifiedPerson.jsf",A,function(D){C=Core.getStatus(D)
});
jQuery.ajaxSettings.async=true;
return C
},onException:function(A){$.unblockUI()
},onTrue:function(A){_selfCaller=A.action;
_selfEvent=A.event;
$.blockUI({message:$("#modalSave"),fadeOut:false,css:{backgroundColor:"#E6F7D4",border:"none",padding:"15px",width:"325px","-webkit-border-radius":"10px","-moz-border-radius":"10px"},overlayCSS:{backgroundColor:"#000",opacity:0.3}});
$("#change_cancel").unbind(Core.CLICK);
Core.addAction($("#change_cancel"),Core.CLICK,function(B){Core.log("fire function change_cancel");
tree.select_node(_this._nodeOnInit);
B.stopImmediatePropagation();
Core.isInBlockUiMode=false;
$.unblockUI()
},false);
$("#change_yes").unbind(Core.CLICK);
Core.addAction($("#change_yes"),Core.CLICK,function(B){Core.log("fire function change_yes");
Core.isInBlockUiMode=false;
$.unblockUI();
tree.select_node(_this._nodeOnInit);
jQuery.ajaxSettings.async=false;
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/person/personResume.jsf",{idPerson:$("input[id=personId]").val()},"#mainContent",true,false);
jQuery.ajaxSettings.async=true
},false);
$("#change_no").unbind(Core.CLICK);
Core.addAction($("#change_no"),Core.CLICK,function(B){Core.log("fire function change_no");
Core.isInBlockUiMode=false;
$.unblockUI();
jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/personController/clearControllers.jsf",json,function(C){});
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