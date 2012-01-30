var ValidateGroupAttributes=new DUI.Class({_options:{},init:function(A){this._options=$.extend(this._options,A||{});
Core.log("Loading validateGroupAttributes librairy whith options : "+$.toJSON(this._options))
},fire:function(){this.addActions()
},addActions:function(){jQuery.each($("input[name=customType]"),function(B,A){Core.addAction($(A),Core.CLICK,function(C){$("input[type=checkbox]","div[id=groupContext]").attr("checked",false);
validate.updateContexts()
},false)
});
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(B,A){Core.addAction($(A),Core.CLICK,function(C){validate.uncheckIncompatibleContexts(this);
jQuery.each($("input[type=checkbox]","div[id=groupContext]"),function(E,D){})
},false)
})
},updateContexts:function(){var A=false;
jQuery.each($("input[name=customType]"),function(C,B){if(B.checked){$("li[id*=context_]").css("display","none");
var F=new RegExp("[|]+","g");
var E=($("#"+B.value).val()).split(F);
for(var D=0;
D<E.length;
D++){$("#context_"+E[D]).css("display","block");
$("#context_"+E[D]).parent().css("cursor","default")
}A=true
}if(!A){$("li[id*=context_]").css("display","none")
}})
},uncheckIncompatibleContexts:function(A){if(A.checked){_context=A.value;
jQuery.each($("input[name=customType]"),function(C,B){if(B.checked){var D={customType:B.value,context:_context};
$.post("/"+Core.applicationContext+"/ajax/groupModificationsAttributesController/getIncompatibilities.jsf",D,function(G){var F=new RegExp("[|]+","g");
var H=Core.getResult(G).split(F);
for(var E=0;
E<H.length;
E++){$("input[name="+H[E]+"]","div[id=groupContext]").attr("checked",false)
}})
}})
}},checkGroupStandardIfAllUnchecked:function(){var A=false;
$("input[name=customType]").each(function(){if($(this).attr("checked")){A=true
}});
if(!A){$("input[name=customType][value=standard]").attr("checked",true)
}},validate:function(A){_this=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){Core._hideBlockUI();
var B=Validate.validateAttributes();
if(!B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModifications.jsf",{groupUuid:$("input[id=groupUuid]").val()},"#mainContent",true,false)
}}};
Core._showBlockUI(_displayBlockUIOption)
},initCheckboxPrivileges:function(A){if(A.id=="view"){if(A.checked==true){}else{$("#optout").attr("checked",false);
$("#optin").attr("checked",false);
$("#read").attr("checked",false);
$("#update").attr("checked",false);
$("#admin").attr("checked",false)
}}else{if(A.id=="read"){if(A.checked==true){$("#view").attr("checked",true)
}else{$("#update").attr("checked",false);
$("#admin").attr("checked",false)
}}else{if(A.id=="update"){if(A.checked==true){$("#view").attr("checked",true);
$("#read").attr("checked",true)
}else{$("#admin").attr("checked",false)
}}else{if(A.id=="admin"){if(A.checked==true){$("#view").attr("checked",true);
$("#read").attr("checked",true);
$("#update").attr("checked",true)
}}}}}}},$.screen);