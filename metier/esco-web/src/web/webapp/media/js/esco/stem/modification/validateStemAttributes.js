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
 * @author Sopra Group
 */
var ValidateStemAttributes = new DUI.Class({

	_options : {},

	init: function(opts){
		this._options = $.extend(this._options, opts || {});
		Core.log("Loading validateStemAttributes librairy whith options : " + $.toJSON(this._options));
	},

	fire : function(){
		this.sendToController();
		var result = false;
		$.each($('input[isAttr=true]'),function(){
			if ($(this).val() != Stem._attributeVal[$(this).attr("id")]){
				result = true;
			}
		});
		if (result == true){
			$("#stemSave").parent().show();
			$("#stemCancel").parent().show();
		}else{
			stem.getIsStemModified();
		}
	},

	/**
	 * Send modification to controller.
	 */
	sendToController : function() {
		jQuery.each($("input[type=text]"), function(e, input) {
			Core.addAction(
					$(input),
					Core.CHANGE,
					function(e){
						var json = {
							idInput : input.id,
							value : input.value
						};
						$.post("/" + Core.applicationContext + "/ajax/stemModificationsAttributesController/updateAttributesOnChange.jsf", json, function(data) {

						});
					},
					false
				);
		});
	},

	validate : function(e){
		_this = this;

		_displayBlockUIOption = {
			onAfterShowBlockUI : function(){

				var error = Validate.validateAttributes();

				if(!error){
					// Call Ajax
					// redirection vers la page de summary, puis save() et enfin redirection vers la page
					if ($("#save").attr("value")=="save"){
						var url = "/" + Core.applicationContext + "/stylesheets/stemModifications/stemModificationsResume.jsf";
						var query= {stemUuid: $("input[id=stemUuid]").val()};
						Core.pullAjaxContent(url, query, "#mainContent", true,false);
					}
				} else {
					Core.log("Validate form -> Not valide");
				}
			}
		};
		Core._showBlockUI(_displayBlockUIOption);
		Core._hideBlockUI();
	}
}, $.screen);
