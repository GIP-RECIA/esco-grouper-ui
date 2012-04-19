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
 * @author aChesneau
 */
var Person = new DUI.Class({

	_options : {},
	_methodToCall : null,
	_isInitPrivilegeTab : false,
	_actionOnSave:null,
	_eventOnSave:null,
	_domOnSave:null,
	_nodeOnInit:null,

	init: function(opts){
		_options = $.extend({}, opts || {});
		fluid.accessibletabs("escoTabs", "escoPanels");
		$("#personSave").parent().hide();
		$("#personCancel").parent().hide();
	},

	fire : function(){
		Core.interruptedAction = null;
		this.getIsPersonModified();
		this.initTab();
		this.initAction();
		if ($("a[class=clicked]").attr("id") == undefined && tree != undefined){
			tree.select_node($("li[id=:]"));
		}
		this._nodeOnInit = $("a[class=clicked]");
	},

	setMethodToCall:function(type){
		this._methodToCall = type ;
		this.initLoadDataOfCurrentSelection();
	},

	getNavParams:function(){
		return this._options;
	},

	/**
	 * Init one time the action of the privilege radio button.
	 */
	initLoadDataOfCurrentSelection:function(){
		var _this = this;
		if (!this._isInitPrivilegeTab){
			Core.addAction($("input[name=privilegesRadio]"),
					Core.CLICK,
					function(e) {
						e.stopImmediatePropagation();
						_self = _this;
						_displayBlockUIOption = {
								onAfterShowBlockUI : function(){
								if (_self._methodToCall == "group"){
									personPrivilegesGroup._loadData();
								}else if (_self._methodToCall == "stem"){
									personPrivilegesStem._loadData();
								}
							}
						};
						Core._showBlockUI(_displayBlockUIOption);
					},
					false
			);
		}
	},

	/**
	 * Load tab
	 */
	initTab : function() {

		tabSelected = _options.tab;
		if (tabSelected == undefined){
			tabSelected = 0;
		}

		// Creation of tabs (selecting the third tab by default (as example)
		$("#escoPanels").tabs({
			selected: tabSelected
		});
	},


	getIsPersonModified : function(){
		$.post("/" + Core.applicationContext + "/ajax/personController/isModifiedPerson.jsf",{},function(data){
			$("#isPersonModified").attr("value",Core.getStatus(data));
			if ($("#isPersonModified").val() == "false"){
				$("#personSave").parent().hide();
				$("#personCancel").parent().hide();
			}else{
				$("#personSave").parent().show();
				$("#personCancel").parent().show();
			}
		});
	},

	initAction : function (){

		_this = this;
		// Save button
		Core.addAction($("#personSave"),
			Core.CLICK,
			function(e) {
				if ($("#isPersonModified").val() == "true"){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/person/personResume.jsf",{}, "#mainContent", true, false);
				}
			},
			false
		);

		// Cancel button
		Core.addAction($("#personCancel"),
			Core.CLICK,
			function(e) {
				//alert("click");
				// We send the request of cleanning all the objects
				$.post("/" + Core.applicationContext + "/ajax/personController/clearControllers.jsf", json, function(data) {});

				//remove global action from context
				Core.delActionGlobal();

				// We setup the redirection to the current group
				// We redirect the user to the current group (on attributs page).
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson:$("input[id=personId]").val()}, "#mainContent", true, false);
			},
			false
		);

		Core.addActionGlobal({
				onConditionnal : function(interruptedAction) {
					Core.log("onConditional method for global action");

					var json = {};
					var rs = null;

						Core.log("fire check condition" );
						jQuery.ajaxSettings.async = false;
						$.post("/" + Core.applicationContext + "/ajax/personController/isModifiedPerson.jsf", json, function(data) {
							rs = Core.getStatus(data);
						});
						jQuery.ajaxSettings.async = true;
					return rs;
				},
				onException : function(interruptedAction) {
					$.unblockUI();
				},
				onTrue : function(interruptedAction) {
					_selfCaller = interruptedAction.action;
					_selfEvent = interruptedAction.event;

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
							tree.select_node(_this._nodeOnInit);
							e.stopImmediatePropagation();
							Core.isInBlockUiMode = false;
							$.unblockUI();
						},
						false);

					// Yes button
					$("#change_yes").unbind(Core.CLICK);
					Core.addAction($("#change_yes"),
						Core.CLICK,
						function(e) {
							Core.log("fire function change_yes" );
							Core.isInBlockUiMode = false;
							$.unblockUI();
							tree.select_node(_this._nodeOnInit);
							jQuery.ajaxSettings.async = false;
							Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/person/personResume.jsf",{idPerson: $("input[id=personId]").val()}, "#mainContent", true, false);
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
							$.unblockUI();

							jQuery.ajaxSettings.async = false;
							$.post("/" + Core.applicationContext + "/ajax/personController/clearControllers.jsf", json, function(data) {
							});
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
					interruptedAction.action.action( interruptedAction.event );
				}
		});

	}
}, $.screen);