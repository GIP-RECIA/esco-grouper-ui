/**
 *
 * @author MOULRON Diogène
 */
var Stem = new DUI.Class({

	_options : {},

	_attributeVal :{},

	init: function(opts){
		_options = $.extend({}, {}, opts || {});
		$("#stemSave").parent().hide();
		$("#stemCancel").parent().hide();
	},

	fire : function(){
		this.initTab();
		this.initAction();
		this.initBreadCrumb();
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

	getIsStemModified : function(){
		if ($("#isCreationView").val() == "false" ){
			$.post("/" + Core.applicationContext + "/ajax/stemController/isModifiedStems.jsf",{},function(data){
				$("#isStemModified").attr("value",Core.getStatus(data));
				if ($("#isStemModified").val() == "false"){
					$("#stemSave").parent().hide();
					$("#stemCancel").parent().hide();
				}else{
					$("#stemSave").parent().show();
					$("#stemCancel").parent().show();
				}
			});
		}else{
			$("#stemSave").parent().show();
			$("#stemCancel").parent().show();
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


	clearMod : function() {
		Core.log("Clear all data in controller. ");
		jQuery.ajaxSettings.async = false;

		if (Core.getNavParam("fromResponse") == null) {
			$.post("/" + Core.applicationContext + "/ajax/stemController/clearModification.jsf", function(data) {
				// nothing to do.
			});
		}
		jQuery.ajaxSettings.async = true;
	},


	initAction : function (){

		// Save button
		$("#stemSave").unbind(Core.CLICK);
		Core.addAction($("#stemSave"),
			Core.CLICK,
			function(e) {

			_displayBlockUIOption = {
					onAfterShowBlockUI : function(){
							tabSelected = $("#currentTab").attr("value");

							if (tabSelected!="0"){
									$("#save").attr("value","save");
									$("a[id*=tabId][title="+Lang.getString("STEM.ATTRIBUTE.TAB")+"]").click();
							}else{
								$("#save").attr("value","save");
								validate.validate();
							}
				}
			};
			Core._showBlockUI(_displayBlockUIOption);
			Core._hideBlockUI();
			},
			false
		);

		// Cancel button
		Core.addAction($("#stemCancel"),
			Core.CLICK,
			function(e) {
				// We send the request of cleanning all the objects
				$.post("/" + Core.applicationContext + "/ajax/stemController/clearModification.jsf", json, function(data) {});

				// We check if the view is in creation or modification state
				var isCreationVal = $("input[id=isCreationView]").val();
				var isCreation = false;
				if (isCreationVal == "true") {
					isCreation = true;
				}

				// We setup the redirection to the current group
				// We redirect the user to the current group (on attributs page).
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications.jsf",{stemUuid:$("input[id=stemUuid]").val(),creation:isCreation}, "#mainContent", true, false);
			},
			false // LOT 2 => true
		);

		Core.addAction($("#stemDelete"),
				Core.CLICK,
				function(e) {
					var needToRedirect = true;
						$.post("/" + Core.applicationContext + "/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:$("#groupUuid"),needToRedirect:needToRedirect},function(data)
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

		Core.addActionGlobal({
			onConditionnal : function(interruptedAction) {
				jQuery.ajaxSettings.async = false;

				var json = {};
				var rs = null;

				// compare curent group with selected group, if same reload all data.
					if ($("a[class=clicked]").parent("li").attr("id") == $("#stemUuid").val() && $(interruptedAction.event.target).attr("url") == interruptedAction.url && interruptedAction.event.type == Core.PULLCONTENT) {
						throw "SameStemException";
					} else {
						Core.log("fire check condition" );
						jQuery.ajaxSettings.async = false;
						// Check if the privilege or other tabs are modfied
						$.post("/" + Core.applicationContext + "/ajax/stemController/isModifiedStems.jsf", json, function(data) {
							//_this.setStatutFindPrivilegesGroup(data);
							rs = Core.getStatus(data);
						});

						jQuery.ajaxSettings.async = true;
					}
				// Verify if attribute are modified
				var result = false;
				$.each($('input[isAttr=true]'),function(){
					if ($(this).val() != Stem._attributeVal[$(this).attr("id")]){
						result = true;
					}
				});
				return rs || ( result && $('#modalDelete').html() == "");
			},
			onException : function(interruptedAction ) {
				$.unblockUI();
			},
			onTrue : function(interruptedAction ) {
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
					if ($("#stemUuid").attr("value") == undefined ||$("#stemUuid").attr("value") == "" ){
						tree.select_node($(tree.selected));
					}else{
						tree.select_node($("li[id=" + $("#stemUuid").val() + "]"));
					}
						e.stopImmediatePropagation();
						Core.isInBlockUiMode = false;
						Core._hideBlockUI();
					},
					false);

				// Yes button
				$("#change_yes").unbind(Core.CLICK);
				Core.addAction($("#change_yes"),
					Core.CLICK,
					function(e) {
					Core.log("fire function change_yes" );
						if ($("#stemUuid").attr("value") == undefined ||$("#stemUuid").attr("value") == "" ){
							tree.select_node($(tree.selected));
						}else{
							tree.select_node($("li[id=" + $("#stemUuid").val() + "]"));
						}
						Core.isInBlockUiMode = false;
						Core._hideBlockUI();

						//Core.delActionGlobal();
						e.stopImmediatePropagation();

						jQuery.ajaxSettings.async = false;
						//Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications/stemModificationsResume.jsf",{stemUuid:$("input[id=stemUuid]").val()}, "#mainContent", true,false);
						$("#stemSave").trigger(Core.CLICK);
						jQuery.ajaxSettings.async = true;
			        },
					false);

				// No button. clear all modification in group and fire original event on action.
				$("#change_no").unbind(Core.CLICK);
				Core.addAction($("#change_no"),
					Core.CLICK,
					function(e) {
						if ($("#stemUuid").attr("value") == undefined ||$("#stemUuid").attr("value") == "" ){
							callDone.splice( $(tree.selected).attr("id"));
							tree.select_node($(tree.selected));
						}else{
							tree.select_node($("li[id=" + $("#stemUuid").val() + "]"));
						}
						Core.isInBlockUiMode = false;
						Core._hideBlockUI();

						jQuery.ajaxSettings.async = false;
						// We send the request of cleanning all the objects
						$.post("/" + Core.applicationContext + "/ajax/stemController/clearModification.jsf", json, function(data) {});
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