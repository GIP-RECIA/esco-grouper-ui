/**
 *
 * @author MOULRON Diogène
 */
var GroupModificationsAttributes = new DUI.Class(
{

	_options : {},

	_postData : {},

	_needUpdateData : true,

	init : function(opts) {
		_options = $.extend( {}, {}, opts || {});
	},

	fire : function() {
		this.initTab();
		this.initAction();
		this.initBreadCrumb();
		this._needUpdateData = true;
	},

	/**
	 * Load BreadCrumb
	 */
	initBreadCrumb : function() {
		var path = $("#searchPathHidden").attr("value");
		new EscoBreadCrumb( {
			path : path
		});
	},

	/**
	 * Load tab
	 */
	initTab : function() {
		fluid.accessibletabs("escoTabs", "escoPanels");
	},

	clearMod : function() {
		Core.log("Clear all data in controller. ");
		jQuery.ajaxSettings.async = false;

		fromResponse = _options.fromResponse;
		if (fromResponse == undefined) {
			$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/clearModification.jsf",function(data) {
			// nothing to do.
			});
		}
		jQuery.ajaxSettings.async = true;
	},

	/**
	 * Prepare attributes to controller.
	 */
	prepareAttributesToController : function() {
		var _this = this;
		jQuery.each($("input[type=text]"), function(e, input) {
			_this._postData[$(this).attr("id")] = $(this).val();
		});
	},

	/**
	 * Prepare privileges to controller.
	 */
	preparePrivilegesToController : function() {
		var _this = this;
		jQuery.each($("div[id=groupPrivileges]").find("input[type=checkbox]"),function() {
			_this._postData["privilege_" + $(this).attr("id")] = $(this).attr("checked");
		});
	},

	/**
	 * Prepare custom type to controller.
	 */
	prepareCustomTypeToController : function() {
		var _this = this;
		jQuery.each($("input[name=customType]"), function() {
			_this._postData["customType_" + $(this).attr("value")] = $(this).attr("checked");
		});
	},

	/**
	 * Prepare context to controller.
	 */
	prepareContextToController : function() {
		var _this = this;
		jQuery.each($("input[type=checkbox]", "div[id=groupContext]"),function() {
			_this._postData["groupContext_" + $(this).attr("value")] = $(this).attr("checked");
		});
	},

	sendGroupDataToController : function() {
		if (this._needUpdateData){
			this.prepareAttributesToController();
			this.preparePrivilegesToController();
			this.prepareCustomTypeToController();
			this.prepareContextToController();
			jQuery.ajaxSettings.async = false;
			this._postData["groupUuid"] = $("input[id=groupUuid]").val();
			$.post("/" + Core.applicationContext + "/ajax/groupModificationsAttributesController/updateAttributes.jsf",this._postData,function(data){
			});
			jQuery.ajaxSettings.async = true;
		}
	},

	initAction : function() {
		var _this = this;
		// Save button
		Core.addAction(
			$("#groupSave"),
			Core.CLICK,
			function(e) {
				_this._postData = {};
				_displayBlockUIOption = {
					onAfterShowBlockUI : function() {
						var error = Validate.validateAttributes();
						if (!error) {
							// Send the data to the
							// controller.
							_this.sendGroupDataToController();
							Core.pullAjaxContent(
									"/" + Core.applicationContext + "/stylesheets/groupModifications/groupModifications.jsf",
									{groupUuid : $("input[id=groupUuid]").val()},
									"#mainContent",
									true,
									false
							);
						}
						Core._hideBlockUI();
					}
				};
				Core._showBlockUI(_displayBlockUIOption);
			}, false);

		// Cancel button
		Core.addAction($("#groupCancel"),
				Core.CLICK,
				function(e) {
					// We send the request of cleanning all the
					// objects
				$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/clearModification.jsf",json, function(data) {
				});

				var url = "/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf";
				// We check if the view is in creation or
				// modification state
				isCreationVal = $("input[id=isCreationView]")
						.val();
				var query = {};
				if (isCreationVal == "true") {
					query = {
						stemUuid : $("input[id=stemUuid]")
								.val()
					};
				} else {
					query = {
						groupUuid : $("input[id=groupUuid]")
								.val()
					};
				}

				// We setup the redirection to the current group
				// We redirect the user to the current group (on
				// attributs page).
				Core.pullAjaxContent(url, query,
						"#mainContent", true, false);
			}, false // TODO lot 2 = true
		);

		Core.addAction(
			$("#groupDelete"),
			Core.CLICK,
			function(e) {
				var needToRedirect = true;
				_this._needUpdateData = false;
				$.post("/" + Core.applicationContext + "/stylesheets/groupProperties/modalDeleteGroup.jsf",
						{groupUuid : $("#groupUuid").val(),
						 needToRedirect : needToRedirect},
						function(data) {
							Core.isInBlockUiMode = true;
							$("#modalDelete").empty().append(data);
							$.blockUI( {
								message : $('#modalDelete'),
								css : {
									cursor : 'default',
									width : '500px',
									top : '30%',
									left : '50%',
									'margin-left' : '-250px'
								}
							});
						});
			}, false);

		// manage modification on group
		Core.addActionGlobal( {
			onConditionnal : function(interruptedAction) {
				Core.log("onConditional method for global action");

				var json = {};
				var rs = false;

				var sameGroup = $("a[class=clicked]").parent("li").attr("id") == $("#groupUuid").val();
				var sameStem = $("a[class=clicked]").parent("li").attr("id") == $("#stemUuid").val();
				var newGroup = "" == $("#groupUuid").val();
				if ((sameGroup || (newGroup && sameStem))
						&& $(interruptedAction.event.target).attr("url") == interruptedAction.url
						&& interruptedAction.event.type == Core.PULLCONTENT) {
					throw "SameGroupEsception";
				} else {
					if (_this._needUpdateData){
						Core.log("fire check condition");
						_this.sendGroupDataToController();
						jQuery.ajaxSettings.async = false;
						$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/isModifiedGroups.jsf",json, function(data) {
							rs = Core.getStatus(data);
						});
					}
					jQuery.ajaxSettings.async = true;
				}

				return rs && _this._needUpdateData;
			},
			onException : function(interruptedAction) {
				Core._hideBlockUI();
			},
			onTrue : function(interruptedAction) {

				_selfCaller = interruptedAction.action;
				_selfEvent = interruptedAction.e;
				$.blockUI( {
					message : $('#modalSave'),
					// disabled fadeOut for don't launch reset
					// modal dialogue in settimout
					fadeOut : false,
					css : {
						backgroundColor : '#E6F7D4',
						border : 'none',
						padding : '15px',
						width : '325px',
						'-webkit-border-radius' : '10px',
						'-moz-border-radius' : '10px'
					},
					overlayCSS : {
						backgroundColor : '#000',
						opacity : 0.3
					}
				});

				// Cancel button.
				$("#change_cancel").unbind(Core.CLICK);
				Core.addAction(
					$("#change_cancel"),
					Core.CLICK,
					function(e) {
						Core.log("fire function change_cancel");
						if ($("#groupUuid").attr("value") == undefined || $("#groupUuid").attr("value") == "") {
							tree.select_node($("li[id="+ $("#stemUuid").val()+ "]"));
						} else {
							tree.select_node($("li[id="+ $("#groupUuid").val()+ "]"));
						}
						e.stopImmediatePropagation();
						Core._hideBlockUI();
					}, false);

				// Yes button
				$("#change_yes").unbind(Core.CLICK);
				Core.addAction(
					$("#change_yes"),
					Core.CLICK,
					function(e) {
						Core.log("fire function change_yes");
						if ($("#groupUuid").attr("value") == undefined || $("#groupUuid").attr("value") == "") {
							tree.select_node($("li[id="+ $("#stemUuid").val()+ "]"));
						} else {
							tree.select_node($("li[id="+ $("#groupUuid").val()+ "]"));
						}
						Core._hideBlockUI();

						Core.delActionGlobal();
						e.stopImmediatePropagation();

						jQuery.ajaxSettings.async = false;
						$("#groupSave").trigger(
								Core.CLICK);
						jQuery.ajaxSettings.async = true;
					}, false);

				// No button. clear all modification in group
				// and fire original event on action.
				$("#change_no").unbind(Core.CLICK);
				Core.addAction(
					$("#change_no"),
					Core.CLICK,
					function(e) {
						Core.log("fire function change_no");

						Core._hideBlockUI();

						jQuery.ajaxSettings.async = false;
						$.post("/" + Core.applicationContext + "/ajax/groupModificationsController/clearModification.jsf",json,function(data) {
						});
						jQuery.ajaxSettings.async = true;

						Core.delActionGlobal();

						Core.log("---------------------------------> Caller : ");
						Core.log(_selfCaller);

						e.stopImmediatePropagation();

						_selfCaller.action(_selfEvent);
					}, false);

			},
			onFalse : function(interruptedAction) {
				interruptedAction.fire = false;
				interruptedAction.action
						.action(interruptedAction.e);
			}
		});
	}

}, $.screen);