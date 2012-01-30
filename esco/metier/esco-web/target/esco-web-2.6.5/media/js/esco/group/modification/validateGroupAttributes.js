var ValidateGroupAttributes=new DUI.Class({_options:{},init:function(B){this._options=$.extend(this._options,B||{});
Core.log("Loading validateGroupAttributes librairy whith options : "+$.toJSON(this._options))
},fire:function(){this.addActions()
},addActions:function(){jQuery.each($("input[name=customType]"),function(D,C){Core.addAction($(C),Core.CLICK,function(A){$("input[type=checkbox]","div[id=groupContext]").attr("checked",false);
validate.updateContexts()
},false)
});
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(D,C){Core.addAction($(C),Core.CLICK,function(A){validate.uncheckIncompatibleContexts(this);
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(B,F){})
},false)
})
},updateContexts:function(){var B=false;
jQuery.each($("input[name=customType]"),function(I,J){if(J.checked){$("li[id*=context_]").css("display","none");
var A=new RegExp("[|]+","g");
var G=($("#"+J.value).val()).split(A);
for(var H=0;
H<G.length;
H++){$("#context_"+G[H]).css("display","block");
$("#context_"+G[H]).parent().css("cursor","default")
}B=true
}if(!B){$("li[id*=context_]").css("display","none")
}})
},uncheckIncompatibleContexts:function(B){if(B.checked){_context=B.value;
jQuery.each($("input[name=customType]"),function(E,F){if(F.checked){var A={customType:F.value,context:_context};
$.post("/"+Core.applicationContext+"/ajax/groupModificationsAttributesController/getIncompatibilities.jsf",A,function(D){var I=new RegExp("[|]+","g");
var C=Core.getResult(D).split(I);
for(var J=0;
J<C.length;
J++){$("input[name="+C[J]+"]","div[id=groupContext]").attr("checked",false)
}})
}})
}},checkGroupStandardIfAllUnchecked:function(){var B=false;
$("input[name=customType]").each(function(){if($(this).attr("checked")){B=true
}});
if(!B){$("input[name=customType][value=standard]").attr("checked",true)
}},validate:function(B){_this=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){Core._hideBlockUI();
var A=Validate.validateAttributes();
if(!A){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModifications.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}}};
Core._showBlockUI(_displayBlockUIOption)
},initCheckboxPrivileges:function(B){if(B.id=="view"){if(B.checked==true){}else{$("#optout").attr("checked",false);
$("#optin").attr("checked",false);
$("#read").attr("checked",false);
$("#update").attr("checked",false);
$("#admin").attr("checked",false)
}}else{if(B.id=="read"){if(B.checked==true){$("#view").attr("checked",true)
}else{$("#update").attr("checked",false);
$("#admin").attr("checked",false)
}}else{if(B.id=="update"){if(B.checked==true){$("#view").attr("checked",true);
$("#read").attr("checked",true)
}else{$("#admin").attr("checked",false)
}}else{if(B.id=="admin"){if(B.checked==true){$("#view").attr("checked",true);
$("#read").attr("checked",true);
$("#update").attr("checked",true)
}}}}}}},$.screen);