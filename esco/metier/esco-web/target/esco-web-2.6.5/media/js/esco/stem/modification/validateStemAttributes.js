var ValidateStemAttributes=new DUI.Class({_options:{},init:function(A){this._options=$.extend(this._options,A||{});
Core.log("Loading validateStemAttributes librairy whith options : "+$.toJSON(this._options))
},fire:function(){this.sendToController();
var A=false;
$.each($("input[isAttr=true]"),function(){if($(this).val()!=Stem._attributeVal[$(this).attr("id")]){A=true
}});
if(A==true){$("#stemSave").parent().show();
$("#stemCancel").parent().show()
}else{stem.getIsStemModified()
}},sendToController:function(){jQuery.each($("input[type=text]"),function(B,A){Core.addAction($(A),Core.CHANGE,function(D){var C={idInput:A.id,value:A.value};
$.post("/"+Core.applicationContext+"/ajax/stemModificationsAttributesController/updateAttributesOnChange.jsf",C,function(E){})
},false)
})
},validate:function(A){_this=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){var B=Validate.validateAttributes();
if(!B){if($("#save").attr("value")=="save"){var D="/"+Core.applicationContext+"/stylesheets/stemModifications/stemModificationsResume.jsf";
var C={stemUuid:$("input[id=stemUuid]").val()};
Core.pullAjaxContent(D,C,"#mainContent",true,false)
}}else{Core.log("Validate form -> Not valide")
}}};
Core._showBlockUI(_displayBlockUIOption);
Core._hideBlockUI()
}},$.screen);