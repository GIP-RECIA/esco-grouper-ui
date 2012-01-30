var ValidateStemAttributes=new DUI.Class({_options:{},init:function(B){this._options=$.extend(this._options,B||{});
Core.log("Loading validateStemAttributes librairy whith options : "+$.toJSON(this._options))
},fire:function(){this.sendToController();
var B=false;
$.each($("input[isAttr=true]"),function(){if($(this).val()!=Stem._attributeVal[$(this).attr("id")]){B=true
}});
if(B==true){$("#stemSave").parent().show();
$("#stemCancel").parent().show()
}else{stem.getIsStemModified()
}},sendToController:function(){jQuery.each($("input[type=text]"),function(D,C){Core.addAction($(C),Core.CHANGE,function(A){var B={idInput:C.id,value:C.value};
$.post("/"+Core.applicationContext+"/ajax/stemModificationsAttributesController/updateAttributesOnChange.jsf",B,function(F){})
},false)
})
},validate:function(B){_this=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){var F=Validate.validateAttributes();
if(!F){if($("#save").attr("value")=="save"){var A="/"+Core.applicationContext+"/stylesheets/stemModifications/stemModificationsResume.jsf";
var E={stemUuid:$("input[id=stemUuid]").val()};
Core.pullAjaxContent(A,E,"#mainContent",true,false)
}}else{Core.log("Validate form -> Not valide")
}}};
Core._showBlockUI(_displayBlockUIOption);
Core._hideBlockUI()
}},$.screen);