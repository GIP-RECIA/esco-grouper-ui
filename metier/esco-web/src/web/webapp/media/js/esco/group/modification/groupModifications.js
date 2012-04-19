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
 * @author MOULRON Diogène
 */
var GroupModificationsBase = {

	_options : {
		onSelectTab : null,
		onBeforeSave : []
	},

	init: function(opts){
		_options = $.extend({}, {}, opts || {});
		if ($("#isCreationView").val() == "false" ){
			$("#groupSave").parent().hide();
		}
	},

	fire : function(){
		this.initTab();
		this.initAction();
		this.initBreadCrumb();

		jQuery.each(this._options.onBeforeSave, function(index, action){
			action.call();
		});
	},

	getIsGroupModified : function(){
		if ($("#isCreationView").val() == "false" ){
			$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/isModifiedGroups.jsf",{},function(data){
				$("#isGroupModified").attr("value",Core.getStatus(data));
				if ($("#isGroupModified").val() == "false"){
					$("#groupSave").parent().hide();
				}else{
					$("#groupSave").parent().show();
				}
			});
		}
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
	 * Load tab
	 */
	initTab : function() {

		tabSelected = Core.getNavParam("tab");
		if (tabSelected == undefined){
			tabSelected = 0;
		}

		// Creation of tabs (selecting the third tab by default (as example)
		$("#escoPanels").tabs({
			selected: tabSelected
		});
	},

	/**
	 * Initialize actions
	 */
	initAction : function() {

		var actionSave = function (e){

			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					// Call Ajax
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsResume.jsf",{groupUuid: $("input[id=groupUuid]").val()}, "#mainContent", true, false);
					Core._hideBlockUI();
				}
			};
			Core._showBlockUI(_displayBlockUIOption);
		};

		// Save button
		Core.addAction($("#groupSave"),
			Core.CLICK,
			function(e) {
				dataSave = { save : true };

				$(this).trigger("group.save", dataSave);

				if (dataSave.save) {
					actionSave(e);
				}
			},
			false
		);

		// Cancel button
		Core.addAction($("#groupCancel"),
			Core.CLICK,
			function(e) {
				$(this).trigger("group.cancel");

				var url = "/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf";
				// We check if the view is in creation or modification state
				isCreationVal = $("input[id=isCreationView]").val();
				var query = {};
				if (isCreationVal == "true") {
					query={stemUuid:$("input[id=stemUuid]").val()};
				} else {
					query={groupUuid: $("input[id=groupUuid]").val()};
				}

				// We setup the redirection to the current group
				// We redirect the user to the current group (on attributs page).
				Core.pullAjaxContent(url, query, "#mainContent", true, false);
			},
			false // TODO lot 2 = true
		);

		Core.addAction($("#groupDelete"),
				Core.CLICK,
				function(e) {
					var needToRedirect = true;
						$.post("/" + Core.applicationContext + "/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid"),needToRedirect:needToRedirect},function(data)
							{
							Core.isInBlockUiMode = true;
							$("#modalDelete").empty().append(data);
							 $.blockUI({
						            message: $('#modalDelete'),
						            css: {  cursor: 'default',
								 			width: '500px',
								 			top: '30%' ,
									        left: '50%' ,
									        'margin-left': '-250px'
								 		}
						        });
							});
				},
				false
			);

		// manage modification on group
		Core.addActionGlobal({
				onConditionnal : function(interruptedAction) {
					Core.log("onConditional method for global action");

					var json = {};
					var rs = null;

					var sameGroup = $("a[class=clicked]").parent("li").attr("id") == $("#groupUuid").val();
					var sameStem = $("a[class=clicked]").parent("li").attr("id") == $("#stemUuid").val();
					var newGroup = "" == $("#groupUuid").val();
					if ((sameGroup || (newGroup && sameStem)) && $(interruptedAction.event.target).attr("url") == interruptedAction.url && interruptedAction.event.type == Core.PULLCONTENT) {
						throw "SameGroupEsception";
					} else {
						Core.log("fire check condition" );
						jQuery.ajaxSettings.async = false;
						$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/isModifiedGroups.jsf", json, function(data) {
							//_this.setStatutFindPrivilegesGroup(data);
							rs = Core.getStatus(data);
						});

						jQuery.ajaxSettings.async = true;
					}

					return rs;
				},
				onException : function(interruptedAction) {
					Core._hideBlockUI();
				},
				onTrue : function(interruptedAction) {
			  		Core.log("Call on true  group mod tab");
					_selfCaller = interruptedAction.action;
					_selfEvent = interruptedAction.e;

					$.blockUI({
		                message: $('#modalSave'),
		                // disabled fadeOut for don't launch reset modal dialogue in settimout
		                fadeOut:  false,
		                css: {
							backgroundColor: '#E6F7D4',
							border: 'none',
							padding: '15px',
		                	width: '325px',
		                	'-webkit-border-radius': '10px',
							'-moz-border-radius': '10px'
			            },
		            	overlayCSS:  {
		                	backgroundColor: '#000',
		                	opacity:         0.3
		            	}
		            });

					// Cancel button.
					$("#change_cancel").unbind(Core.CLICK);
					Core.addAction($("#change_cancel"),
						Core.CLICK,
						function(e) {
							Core.log("fire function change_cancel" );
							if ($("#groupUuid").attr("value") == undefined ||$("#groupUuid").attr("value") == "" ){
								tree.select_node($("li[id=" + $("#stemUuid").val() + "]"));
							}else{
								tree.select_node($("li[id=" + $("#groupUuid").val() + "]"));
							}
							e.stopImmediatePropagation();
							Core.isInBlockUiMode = false;
							Core._hideBlockUI();

							// unbind yes action for forbid multiple launch of this action
							$("#change_yes").unbind(Core.CLICK);
						},
						false);

					// Yes button
					$("#change_yes").unbind(Core.CLICK);
					Core.addAction($("#change_yes"),
						Core.CLICK,
						function(e) {
							Core.log("fire function change_yes" );
							if ($("#groupUuid").attr("value") == undefined ||$("#groupUuid").attr("value") == "" ){
								tree.select_node($("li[id=" + $("#stemUuid").val() + "]"));
							}else{
								tree.select_node($("li[id=" + $("#groupUuid").val() + "]"));
							}
							Core.isInBlockUiMode = false;
							Core._hideBlockUI(	);

							jQuery.ajaxSettings.async = false;
							$("#groupSave").trigger(Core.CLICK);
							jQuery.ajaxSettings.async = true;
				        },
						false);

					// No button. clear all modification in group and fire original event on action.
					$("#change_no").unbind(Core.CLICK);
					Core.addAction($("#change_no"),
						Core.CLICK,
						function(e) {
							Core.log("fire function change_no" );
							Core.isInBlockUiMode = false;
							Core._hideBlockUI();

							jQuery.ajaxSettings.async = false;
							// We send the request of cleanning all the objects
							$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/clearModification.jsf", json, function(data) {});
							jQuery.ajaxSettings.async = true;

							Core.delActionGlobal();

							Core.log( "---------------------------------> Caller : " );
							Core.log( _selfCaller );

							e.stopImmediatePropagation();

							_selfCaller.action( _selfEvent );
				        },
						false);

				},
				onFalse : function(interruptedAction) {
					interruptedAction.fire = false;
					interruptedAction.action.action( interruptedAction.e );
				}
		});
	}

};

var GroupModifications = new DUI.Class( GroupModificationsBase, $.screen);