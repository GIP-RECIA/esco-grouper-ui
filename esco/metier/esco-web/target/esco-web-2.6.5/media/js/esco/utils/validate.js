var Validate={_validatePromptOpen:new Array(),_rules:{},getValidatePromtsOpen:function(){return this._validatePromptOpen
},addJsonRules:function(A){$.extend(this._rules,A||{})
},addValidatePrompt:function(A){var B=this.getRule(A);
if(B!=null){Validate._validatePromptOpen.push("input[name="+A+"]");
$.validationEngine.loadValidation("input[name="+A+"]",{promptPosition:"bottomLeft",allrules:this.getRule(A)})
}else{$.validationEngine.isError=false
}},addValidatePromptWithNewRules:function(A,B){Validate._validatePromptOpen.push(A);
$.validationEngine.loadValidation(A,{promptPosition:"bottomLeft",allrules:$.extend($.validationEngineLanguage.allRules,B||{})})
},removeValidatePrompt:function(B){var A=new Array;
for(i=0;
i<Validate._validatePromptOpen.length;
i++){if(this._validatePromptOpen[i]!=B){A.push(this._validatePromptOpen[i])
}}$.validationEngine.closePrompt(B,true);
Validate._validatePromptOpen=A
},closeAllValidatePromptsOpen:function(){for(i=0;
i<Validate._validatePromptOpen.length;
i++){try{$.validationEngine.closePrompt(this._validatePromptOpen[i],true)
}catch(A){}}this._validatePromptOpen=new Array
},getRule:function(E){var C=E;
var D=undefined;
$.each(this._rules,function(){if(this.name==C){D=this
}});
if(D==undefined){var A=new RegExp("^(.*)[.](.*)$","gi");
var F=A.exec(C);
var B=F[1]+".default";
$.each(this._rules,function(){if(this.name==B){D=this
}})
}if(D==undefined){$.each(this._rules,function(){if(this.name=="org.esco.grouperui.default.rule.regexp.default"){D=this
}})
}if(D==undefined){return null
}else{return D.regexattr
}},validateAttributes:function(){var A=false;
$("input[class*=validate]").each(function(B){Validate.addValidatePrompt($($("input[class*=validate]")[B]).attr("name"));
if($.validationEngine.isError){A=true
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("input[name="+$($("input[class*=validate]")[B]).attr("name")+"]")
}}});
return A
},validateAttribute:function(B){var A=false;
Validate.addValidatePrompt(B);
if($.validationEngine.isError){A=true
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("input[name="+B+"]")
}}return A
}};