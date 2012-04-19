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
 * @author oFages
 */
var GroupModificationsResume = new DUI.Class({

	_options : {},

	init: function(opts){
		_options = $.extend(this._options,opts || {});
	},

	fire : function(){
		fluid.accessibletabs("escoTabs", "escoPanels");
		this.initAction();
		this.inlineEditSetup();
		this.initBreadCrumb();
		Core._hideBlockUI(true);
	},

	/**
	 * Load BreadCrumb
	 */
	initBreadCrumb : function() {
		var path = $("#searchPathHidden").attr("value");
		new EscoBreadCrumb({
			path : path
		});
	},



  	 /**
  	 * Simple inline text editor.
  	 */
	inlineEditSetup : function() {
		if ($('.editableText').length != 0){
			fluid.inlineEdit(".editableText", {
	            componentDecorators: {
	                type: "fluid.undoDecorator"
	            },
	            listeners : {
	            	onFinishEdit : function(newValue, oldValue, editNode, viewNode) {

	            		var regIdNode = /^(.*):(\d+):(.*)$/gi;
	            		var mymatch = regIdNode.exec(editNode.id);
	            		if (mymatch != null ){
		            		var json = {
		        				id : mymatch[2],
		        				newValue : newValue
		        			};

		            		jQuery.ajaxSettings.async = false;

		            		$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/getAttributeKey.jsf", json, function(data) {
		            			var resultat = Core.getResult(data);
								Core.log("Result of query : /ajax/groupModificationsController/getAttributeKey => " +  resultat);
								var key = resultat;

								$(editNode).addClass("validate[org.esco.grouperui.group.attribut.regexp."+key+"]");
								editNode.name = "org.esco.grouperui.group.attribut.regexp."+key;

								var error = Validate.validateAttribute(editNode.name);

								jQuery.ajaxSettings.async = true;

								if (!error) {
									$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/applyModification.jsf", json, function(data) {
				        			});
								}
		        			});
	            		}
	            	}
				},
				submitOnEnter : true
	        });
		}
	},

	/**
	 * Initialize actions
	 */
	initAction : function() {

		Core.addAction($('input'),Core.KEYDOWN,function(e){e.stopPropagation();}, false);

		$(".reduce").bind("click", function() {
			var idImg = $(this).attr("id");

			var prefixeImg = idImg.substring(0, idImg.lastIndexOf(":")+1);
			var divToReduce = prefixeImg + "contentToOpenOrReduce";

			if ($(this).attr("src").indexOf("minus.gif") >= 0) {
				$(this).attr("src", "/" + Core.applicationContext + "/media/imgs/tab/plus.gif");
				EscoAnimate._hideAnimate($("div[id="+divToReduce+"]"));
			} else {
				$(this).attr("src", "/" + Core.applicationContext + "/media/imgs/tab/minus.gif");
				EscoAnimate._showAnimate($("div[id="+divToReduce+"]"));
			}
		});

		$(".errorLign").bind("click", function() {
			var idRow = $(this).attr("id");

			var prefixeId = idRow.substring(0, idRow.lastIndexOf(":")+1);
			var inputId = prefixeId + "classIndexValue";
			var classIndex = ($("input[id="+inputId+"]").attr("value")).split(":");

			var id = classIndex[1];
			var controllerClass = classIndex[0];

			var json = {
				id : id,
				controllerClass : controllerClass
			};
			var _line = $(this).parent("td").parent("tr");
			$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/discardModification.jsf", json, function(data) {
				_line.remove();
			});
		});

		Core.addAction($("#groupResumeSave"),
				Core.CLICK,
				function(){
					_displayBlockUIOption = {
							onAfterShowBlockUI : function(){

								var json = {};
								$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/saveGroup.jsf", json, function(data) {

									if (Core.getResult(data).indexOf("false")!=-1){
										var url = "/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsResume.jsf";
										var query = {groupUuid: $("input[id=groupUuid]").val()};
										Core.pullAjaxContent(url, query, "#mainContent", true, false);
										Core._hideBlockUI();
									} else {
										var idResult = Core.getResult(data);
										nodeToSelect = idResult;
										TreePlugin.refreshNodeOfTree(idResult!=$("a[class=clicked]").parent("li").attr("id"));

										if(idResult!=$("a[class=clicked]").parent("li").attr("id"))
											$("a[class=clicked]").parent("li").attr("isEmpty","false");

										Core.raisedInterruptedAction();
									}
								});

						}
						};
						Core._showBlockUI(_displayBlockUIOption);


				},
				false
		);

		Core.addAction($("#groupResumeCancel"),
				Core.CLICK,
				function(){
					// We setup the redirection to the current group
					var url = "/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf";
					var query = {groupUuid: $("input[id=groupUuid]").val()};
					// Set NavParam to avoid the reintialization of the data of the controller
					Core.setNavParam("fromResponse","Resume");
					Core.pullAjaxContent(url, query, "#mainContent", true, false);
				},
				false
		);
	}


}, $.screen);