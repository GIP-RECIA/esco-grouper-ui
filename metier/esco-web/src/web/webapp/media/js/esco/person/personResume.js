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
var PersonResume = new DUI.Class({

	_options : {},

	init: function(opts){
		_options = $.extend({}, {}, opts || {});
	},

	fire : function(){
		this.initTab();
		this.initAction();
	},

	/**
	 * Load tab
	 */
	initTab : function() {
		fluid.accessibletabs("escoTabs", "escoPanels");
	},

	/**
	 * Initialize actions
	 */
	initAction : function() {
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
			$.post("/" + Core.applicationContext + "/ajax/personController/discardModification.jsf", json, function(data) {
				_line.remove();
			});
		});

		Core.addAction($("#groupResumeSave"),
				Core.CLICK,
				function(){
					var json = {};
					$.post("/" + Core.applicationContext + "/ajax/personController/savePerson.jsf", json, function(data) {
						if (!Core.getStatus(data)){
							Core.pullAjaxContent( "/" + Core.applicationContext + "/stylesheets/person/personResume.jsf",{idPerson: $("input[id=personId]").val()}, "#mainContent", true,false);
						} else {
							if (!Core.raisedInterruptedAction()){
								// We setup the redirection to the current group
								if ($("#needToRefreshTree").val()=="true"){
									// Refresh the tree
									tree.refresh($("li[id=:]"));
								}
								Core.pullAjaxContent( "/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson: $("input[id=personId]").val()}, "#mainContent", true,false);
							}
						}
					});
				},
				false
		);

		Core.addAction($("#groupResumeCancel"),
				Core.CLICK,
				function(){
					// Set NavParam to avoid the reintialization of the data of the controller
					Core.setNavParam("fromResponse","Resume");
					// We setup the redirection to the current group
					Core.pullAjaxContent( "/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson: $("input[id=personId]").val()}, "#mainContent", true, false);
				},
				false
		);
	}

}, $.screen);