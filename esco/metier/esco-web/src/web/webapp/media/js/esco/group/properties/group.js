/**
 *
 * @author MOULRON Diogène
 */
var Group = new DUI.Class({

	_options : {},
	_methodToCall : null,
	_isInitPrivilegeTab : false,
	_actionOnSave:null,
	_eventOnSave:null,
	_domOnSave:null,

	init: function(opts){
		_options = $.extend({}, opts || {});
		$("#groupSave").parent().hide();
		$("#groupCancel").parent().hide();
	},

	fire : function(){
		this.initTab();
		this.initAction();
		this.initBreadCrumb();
		this.getIsGroupModified();
	},

	setMethodToCall:function(type){
		this._methodToCall = type ;
		this.initLoadDataOfCurrentSelection();
	},

	getIsGroupModified : function(){
		$.post("/" + Core.applicationContext + "/ajax/groupController/isModifiedGroups.jsf",{},function(data){
			$("#isGroupModified").attr("value",Core.getStatus(data));
			if ($("#isGroupModified").val() == "false"){
				$("#groupSave").parent().hide();
				$("#groupCancel").parent().hide();
			}else{
				$("#groupSave").parent().show();
				$("#groupCancel").parent().show();
			}
		});
	},

	/**
	 * Init one time the action of the privilege radio button.
	 */
	initLoadDataOfCurrentSelection:function(){
		if (!this._isInitPrivilegeTab){
			Core.addAction($("input[name=privilegesRadio]"),
					Core.CLICK,
					function(e) {
						e.stopImmediatePropagation();

						_displayBlockUIOption = {
								onAfterShowBlockUI : function(){
								if (group._methodToCall == "group"){
									groupPrivilegesGroup._loadData();
								}else if (group._methodToCall == "stem"){
									groupPrivilegesStem._loadData();
								}
							}
						};
						Core._showBlockUI(_displayBlockUIOption);
					},
					false
			);
		}
	},

	getNavParams:function(){
		return this._options;
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

		tabSelected = _options.tab;
		if (tabSelected == undefined){
			tabSelected = 0;
		}

		// Creation of tabs (selecting the third tab by default (as example)
		$("#escoPanels").tabs({
			selected: tabSelected
		});
	},


	clearMod : function() {
		Core.log("Clear all data in controller. ");
		jQuery.ajaxSettings.async = false;

		if (Core.getNavParam("fromResponse") == null) {
			$.post("/" + Core.applicationContext + "/ajax/groupController/clearModification.jsf", function(data) {
				// nothing to do.
			});
		}
		jQuery.ajaxSettings.async = true;
	},


	initAction : function (){


		// Save button
		Core.addAction($("#groupSave"),
			Core.CLICK,
			function(e) {
				if ($("#isGroupModified").val() == "true"){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid:$("input[id=groupUuid]").val()}, "#mainContent", true, false);
				}
			},
			false
		);

		// Administrate button
		Core.addAction($("#groupAdmin"),
			Core.CLICK,
			function(e) {
				// Call Ajax
				// redirection vers la page de summary, puis save() et enfin redirection vers la page
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$("input[id=groupUuid]").val(),creation:"false",from:"treeNavigate"}, "#mainContent", true, true);
			},
			false
		);

		Core.addAction($("#groupDelete"),
				Core.CLICK,
				function(e) {
					var needToRedirect = true;
						$.post("/" + Core.applicationContext + "/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:$("#groupUuid").val(),needToRedirect:needToRedirect},function(data)
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


		// Cancel button
		Core.addAction($("#groupCancel"),
			Core.CLICK,
			function(e) {
				//alert("click");
				// We send the request of cleanning all the objects
				$.post("/" + Core.applicationContext + "/ajax/groupController/clearModification.jsf", json, function(data) {});

				//remove global action from context
				Core.delActionGlobal();

				// We setup the redirection to the current group
				// We redirect the user to the current group (on attributs page).
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupProperties.jsf",{groupUuid:$("input[id=groupUuid]").val()}, "#mainContent", true, false);
			},
			false // LOT 2 => true
		);

		Core.addActionGlobal({
				onConditionnal : function(interruptedAction) {
					Core.log("onConditional method for global action");

					var json = {};
					var rs = null;

					// compare curent group with selected group, if same reload all data.
					if ($("a[class=clicked]").parent("li").attr("id") == $("#groupUuid").val() && $(interruptedAction.event.target).attr("url") == interruptedAction.url && interruptedAction.event.type == Core.PULLCONTENT) {
						throw "SameGroupEsception";
					} else {
						Core.log("fire check condition" );
						jQuery.ajaxSettings.async = false;
						$.post("/" + Core.applicationContext + "/ajax/groupController/isModifiedGroups.jsf", json, function(data) {
							//_this.setStatutFindPrivilegesGroup(data);
							rs = Core.getStatus(data);
						});

						jQuery.ajaxSettings.async = true;
					}

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
							tree.select_node($("li[id=" + $("#groupUuid").val() + "]"));
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
							e.stopImmediatePropagation();
							Core.log("fire function change_yes" );
							tree.select_node($("li[id=" + $("#groupUuid").val() + "]"));
							Core.isInBlockUiMode = false;
							$.unblockUI();

							jQuery.ajaxSettings.async = false;
							// Save the current event
							//group._actionOnSave = _selfCaller;
							//group._eventOnSave = _selfEvent;

							// Call Ajax
							// redirection vers la page de summary, puis save() et enfin redirection vers la page
							Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupProperties/groupPropertiesResume.jsf",{groupUuid: $("input[id=groupUuid]").val()}, "#mainContent", true, false);

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
							// We send the request of cleanning all the objects
							$.post("/" + Core.applicationContext + "/ajax/groupController/clearModification.jsf", json, function(data) {
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