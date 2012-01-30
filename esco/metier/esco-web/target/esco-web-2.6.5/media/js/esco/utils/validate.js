var Validate={_validatePromptOpen:new Array(),_rules:{},getValidatePromtsOpen:function(){return this._validatePromptOpen
},addJsonRules:function(B){$.extend(this._rules,B||{})
},addValidatePrompt:function(C){var D=this.getRule(C);
if(D!=null){Validate._validatePromptOpen.push("input[name="+C+"]");
$.validationEngine.loadValidation("input[name="+C+"]",{promptPosition:"bottomLeft",allrules:this.getRule(C)})
}else{$.validationEngine.isError=false
}},addValidatePromptWithNewRules:function(C,D){Validate._validatePromptOpen.push(C);
$.validationEngine.loadValidation(C,{promptPosition:"bottomLeft",allrules:$.extend($.validationEngineLanguage.allRules,D||{})})
},removeValidatePrompt:function(D){var C=new Array;
for(i=0;
i<Validate._validatePromptOpen.length;
i++){if(this._validatePromptOpen[i]!=D){C.push(this._validatePromptOpen[i])
}}$.validationEngine.closePrompt(D,true);
Validate._validatePromptOpen=C
},closeAllValidatePromptsOpen:function(){for(i=0;
i<Validate._validatePromptOpen.length;
i++){try{$.validationEngine.closePrompt(this._validatePromptOpen[i],true)
}catch(B){}}this._validatePromptOpen=new Array
},getRule:function(I){var K=I;
var J=undefined;
$.each(this._rules,function(){if(this.name==K){J=this
}});
if(J==undefined){var G=new RegExp("^(.*)[.](.*)$","gi");
var H=G.exec(K);
var L=H[1]+".default";
$.each(this._rules,function(){if(this.name==L){J=this
}})
}if(J==undefined){$.each(this._rules,function(){if(this.name=="org.esco.grouperui.default.rule.regexp.default"){J=this
}})
}if(J==undefined){return null
}else{return J.regexattr
}},validateAttributes:function(){var B=false;
$("input[class*=validate]").each(function(A){Validate.addValidatePrompt($($("input[class*=validate]")[A]).attr("name"));
if($.validationEngine.isError){B=true
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("input[name="+$($("input[class*=validate]")[A]).attr("name")+"]")
}}});
return B
},validateAttribute:function(D){var C=false;
Validate.addValidatePrompt(D);
if($.validationEngine.isError){C=true
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("input[name="+D+"]")
}}return C
}};