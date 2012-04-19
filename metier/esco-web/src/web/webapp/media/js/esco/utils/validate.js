/*
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * @author aChesneau
 */

var Validate = {

		_validatePromptOpen : new Array(),
		_rules : {},

		 /**
	     * Get all the validatePromptsOpen
	     */
	    getValidatePromtsOpen:function(){
	    	return this._validatePromptOpen;
	    },

	    /**
	     * Add all of the json rules
	     */
	    addJsonRules : function(newRules){
	    	$.extend(this._rules,newRules||{});
	    },

	    /**
	     * Add a validate prompt open.
	     */
	    addValidatePrompt:function(elementName){
	    	var rule = this.getRule(elementName);
	    	if (rule != null){
		    	Validate._validatePromptOpen.push("input[name="+elementName+"]");
		    	$.validationEngine.loadValidation("input[name="+elementName+"]", {
					promptPosition : "bottomLeft",
					allrules : this.getRule(elementName)
				});
	    	}else{
	    		$.validationEngine.isError = false;
	    	}
	    },

	    /**
	     * Add a validate prompt open.
	     */
	    addValidatePromptWithNewRules:function(element,newRules){
	    	Validate._validatePromptOpen.push(element);
	    	$.validationEngine.loadValidation(element, {
				promptPosition : "bottomLeft",
				allrules : $.extend($.validationEngineLanguage.allRules,newRules||{})
			});
	    },

	    /**
	     * Remove a validate prompts.
	     */

	    removeValidatePrompt:function(element){
	    	var aux = new Array;
	    	for (i = 0 ; i < Validate._validatePromptOpen.length ; i++ ){
	    		if ( this._validatePromptOpen[i] != element ){
	    			aux.push(this._validatePromptOpen[i]);
	    		}
	    	}
	    	$.validationEngine.closePrompt(element, true);
	    	Validate._validatePromptOpen = aux ;
	    },

	    /**
	     * Close all the validate prompts.
	     */
	    closeAllValidatePromptsOpen:function(){
	    	for (i = 0 ; i < Validate._validatePromptOpen.length ; i++ ){
	    		try{
	    			$.validationEngine.closePrompt(this._validatePromptOpen[i], true);
	    		}catch(e){
	    		}
	    	}
	    	this._validatePromptOpen = new Array;
	    },

	    /**
	     * Get the rule for the idElement
	     * if no rule is defined, we take the default rule
	     */
	    getRule:function(elementName){
	    	var _elementName = elementName;
	    	var rule = undefined;
	    	$.each(this._rules,function(){
	    		if (this.name == _elementName){
	    			rule=this;
	    		}
	    	});
	    	if (rule == undefined) {
	    		var reg = new RegExp("^(.*)[\.](.*)$", "gi");
	    		var match = reg.exec(_elementName);
	    		var theMatch = match[1] + ".default";
	    		$.each(this._rules,function(){
		    		if (this.name == theMatch){
		    			rule=this;
		    		}
		    	});
	    	}
	    	if (rule == undefined){
	    		$.each(this._rules,function(){
		    		if (this.name == "org.esco.grouperui.default.rule.regexp.default"){
		    			rule=this;
		    		}
		    	});
	    	}

	    	if (rule == undefined){
	    		return null;
	    	}else{
	    		return rule.regexattr;
	    	}
	    },

	    /**
	     * Validate all the attributes on the current page
	     */
	    validateAttributes:function() {
	    	var error = false;

	    	$("input[class*=validate]").each(function(i) {
				Validate.addValidatePrompt($($("input[class*=validate]")[i]).attr("name"));

				if ($.validationEngine.isError){
					error = true;
				} else if (!$.validationEngine.isError) {
					Validate.removeValidatePrompt("input[name="+$($("input[class*=validate]")[i]).attr("name")+"]");
				}
	    	});

	    	return error;
	    },

	    /**
	     * Validate a specific attribute on the current page
	     */
	    validateAttribute:function(inputName) {
	    	var error = false;

			Validate.addValidatePrompt(inputName);

			if ($.validationEngine.isError){
				error = true;
			} else if (!$.validationEngine.isError) {
				Validate.removeValidatePrompt("input[name="+inputName+"]");
			}

	    	return error;
	    }

};