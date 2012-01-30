
/**
 * Create a new action type : pullContent.
 * this action can be firing by call $(_divTargeted).trigger(Core.PULLCONTENT);
 */
;(function($){
// local refs
var $event = $.event, $special = $event.special,

pullcontent = $special.pullcontent = {
	/**
	 * setup action.
	 */
	setup: function( data ){
		$event.add( this, Core.MOUSEDOWN, handler, data );
	},
	/**
	 * remove action.
	 */
	teardown: function(){
		$event.remove( this, Core.MOUSEDOWN, handler );
	}
};
// handle pullContent-releatd DOM events
function handler ( event ){
	returned = hijack( event, Core.PULLCONTENT );
};
// set event type to custom value, and handle it
function hijack ( event, type ){
	try{
		event.type = type; // force the event type
		var result = $.event.handle.call( event );
		return result===false ? false : result || event.result;
	}catch(e){
		return false;
	}
};
})( jQuery ); // confine scope

/**
 *
 * @author MOULRON Diogene
 */
/**
 *
 */
var Core = {

	applicationContext : "",

	isInBlockUiMode : false,

	// tableau des binding jQuery
	binding: [],
    // tableau de la configuration global de l'application
    config: [],
    navParam : [],
    content : null,
    doException : null,
    wait: "",
    nbBlockUi: 0,
    interruptedAction : null,

	// List of core plugins.
	plugins : [],


	/**
	 * Add a plugin to core.
	 */
	addPlugin:function(plugin){
		this.plugins.push(plugin);
	},

	/**
	 * Execute a function on the plugin.
	 * @param entryPoint the name of plugin
	 * @param args Parameter to pass to the function.
	 * @return a instance of the plugin.
	 */
	_executePluginFunction:function(entryPoint,args){
		var thePlugin = null;
		$.each(this.plugins,function(){
			if (this._entryPoint == entryPoint){
				thePlugin = this;
			}
		});
		if (thePlugin!=null){
			return thePlugin.execute(args);
		}else{
			Core.log("The plugin : " + entryPoint + " is not found.");
			return null;
		}
	},

    /**
     * Init the please wait message.
     */
    setWaitMessage :function(msg){
		this.wait = msg;
	},

    /***
     * Method for manage all ajax call with jquery.
     * Made a Growl information for error.
     * Made a redirect on welcome page if session end.
     */
    initAjaxTrigger : function() {

		var errorHandle = function(request, settings, error){
			var error = false;
			if ( settings.responseText.indexOf("<error>true</error>") > -1){
				$("#mainContent").empty();
				$("#mainContent").append(settings.responseText);

				$('.jGrowl-notification').trigger('jGrowl.close');
				error = true;
			}

			return error;
		};

		var sessionHandle = function(request, settings, error){
			var error = false;

			// Call before all ajax call. verify if the session is alive. if there is not alive redirect all screen to main page.
			if ( settings.responseText.indexOf("j_spring_cas_security_check") > -1 || settings.responseText.indexOf("j_spring_security_check") > -1){

				// if the user's session is expired, the status code will be 403 - forbidden
				try {
					window.location.reload(true);
					Core.log("reload windows");
				} catch (e) {
					// the user's session is expired
					Core.fireException(e);
				}
				error = true;
			}

			return error;
		};


		jQuery().ajaxError( function(request, settings, error){
			Core.log("call after ajaxError");
			Core.fireException(error);
			Core.doException = true;
			if (!errorHandle(request, settings, error)){
				try {
					Core.setNavParam("errorHandle", "true");
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/exception/exception.jsf",{errorHandle:"true"}, "#mainContent", true, false);
					Core._hideBlockUI();
				} catch (e) {
					// the user's session is expired
					Core.fireException(e);
				}
			}
			sessionHandle(request, settings, error);
		});

		/**
		 * Verify if there are no error in request. If there are error call handleError.
		 */
		jQuery().ajaxComplete( function(request, settings){
			Core.log("call after ajaxComplete");
			if (Core.doException == null || !Core.doException) {

				if ( settings.responseText.indexOf("<error><message>") > -1 ){
					var msg = Core.getValueOfXml(settings.responseXML, "message");
					var status = Core.getStatus(settings.responseXML);
					if (!status){
						Core.handleError(request, settings, msg);
					}
				}
			}
			if (!sessionHandle(request, settings)){
			}
		});
	},

	/**
	 * Launch jGrowl information for error.
	 */
	handleError : function(request, settings, msg) {

		request.stopImmediatePropagation();

		// if there is no exception in traitement
		if (Core.doException !== true){
			Core.doException = true;
			Core.log(request);
			var message = null;

			if (msg != null){
				message = msg;
			} else {
				jQuery.ajaxSettings.async = false;
				$.post("/" + Core.applicationContext + "/ajax/exceptionAjaxController/getExceptionName.jsf", function(data) {
					message = Core.getResult(data);
				});
				jQuery.ajaxSettings.async = true;
			}

			if (message != null){
				Core._hideBlockUI(true);
				setTimeout(function() {
					$.jGrowl(message, {
							header: 'Important',
							theme : 'jGrowlError',
							sticky: true
						});
					}
					, 300
				);

				Core.doException = false;
			}
		}
	},

    /**
     * AJout d'une configuration
     * @param {Object} name le nom de la config
     * @param {Object} value sa valeur
     */
    setConfig: function(name, value){
        Core.log("Enregistrement dans la config : " + name + "=" + value);
        this.config[name] = value;
    },

    /**
     * recuperation de la config associï¿½e au nom passÃ© en parametre
     * @param {Object} name le nom de la config voulue
     */
    getConfig: function(name){
        return this.config[name];
    },



    /**
     * Add data navigation
     * @param {Object} name of param
     * @param {Object} value of param
     */
    setNavParam: function(name, value){
        Core.log("Add data navigation : " + name + "=" + value);
        this.navParam[name] = value;
    },

    /**
     * return data navigation
     * @param {Object} name of param
     */
    getNavParam : function(name) {
    	return this.navParam[name];
	},

	/**
	 *
	 */
	getNavParams : function() {
		var rs = [];
		for (x in this.navParam){
			rs.push(x);
		}
		return rs;
	},

	/**
	 * clear all parameters save for navigation.
	 */
	resetNavParams : function() {
		this.navParam = [];
	},

	/**
	 * Get the url to call in the param
	 */
	getUrl:function(){
		return this.getNavParam("fromRequest");
	},

	/**
	 * Get the json of url param.
	 */
	getUrlParams:function(){
		var param = {};

		var keys = this.getNavParams();


		for ( i = 0 ; i < keys.length ; i ++){
			aux = "{"+ keys[i]+":'"+ this.getNavParam(keys[i])+"'}";
			eval ("var json ="+aux);
			param = $.extend(param,json);
		}

		//Core.log("getStringUrlWithParams > url retour = " + url);
		return param;
	},

	/**
	 * show blockUI for loading.
	 */
	_showBlockUI : function(opts){

		_opts = $.extend({delay:'600',onAfterShowBlockUI:function(){}},opts);

		if (this.nbBlockUi == 0){
			this.isInBlockUiMode = true;
			$.blockUI({
				message:'<h1>'+Core.wait+'</h1>',
				css: {
				border: 'none',
				padding: '15px',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				opacity: 0.5,
				color: '#fff'
				}
			});

		}else{
			_opts = $.extend(_opts,{delay:'0'});
		}
		Core.log("---> Core._showBlockUI() : "  + this.nbBlockUi);
		if (this.nbBlockUi > 0){
			this.nbBlockUi++;
			_opts.onAfterShowBlockUI.call();
		}
		else{
			this.nbBlockUi++;
			setTimeout(_opts.onAfterShowBlockUI, _opts.delay);
		}
	},

	 /**
	  * hide ajax wait div.
	  */
	_hideBlockUI : function(force){
		var forceHideBlock = false;
		if(force != null) {
			forceHideBlock = force;
		}

		if (this.nbBlockUi > 1 && !forceHideBlock){
		}else{
			this.isInBlockUiMode = false;
			$.unblockUI();
			this.nbBlockUi = 0;
		}
		if(this.nbBlockUi > 0){
			this.nbBlockUi--;
		}
		Core.log("---> Core._hideBlockUI(): "  + this.nbBlockUi);
	},

	/**
	 * method for populate <div> with ajax call result.
	 *
	 * @param url : the url of ajax service
	 * @param divTargeted : the div target
	 * @param displayBlockUI : boolean to indicate if the interface is blocked when call.
	 */
	pullAjaxContent : function(url, urlParameter, divTargeted, displayBlockUI, overload) {
		var _divTargeted = divTargeted;
		var _urlParameter = urlParameter;
		var _url = url;
		var _displayBlockUI = displayBlockUI;

		var canAccess = this._executePluginFunction("ProfilePlugin", {theFunction:"canAccessToScreen",url:_url,param:_urlParameter});
		if (!canAccess){
			this.goToIndexPage();
		}else{
			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){

					Validate.closeAllValidatePromptsOpen();

						if (overload == undefined){
						overload = true;
					}

					if (!overload) {
						Core.log("Call direct overload ajax panel on url : " + url);
						Core._loadContentFromURL(_url, _urlParameter, _divTargeted, _displayBlockUI);
					} else {

						if (!jQuery.isFunction(Core._optionGA.onConditionnal) && !jQuery.isFunction(Core._optionGA.onFire)){
							Core.log("Call direct ajax panel on url : " + url);
							Core._loadContentFromURL(_url, _urlParameter, _divTargeted, _displayBlockUI);
						} else {
							Core.log("Call ajax panel on url : " + url);

							// Not use, it is for debug
							Core.interruptedAction = {
									url : _url
							};
							Core.addAction(
									$(_divTargeted),
									Core.PULLCONTENT,
									function() {
										Core._loadContentFromURL(_url, _urlParameter, _divTargeted, _displayBlockUI);
									},
									true
								);

							$(_divTargeted).trigger(Core.PULLCONTENT);
							}
						}
					}
			};

			if (displayBlockUI) {
				Core._showBlockUI(_displayBlockUIOption);
			}else{
				_displayBlockUIOption.onAfterShowBlockUI.call();
			}
		}
	},

	/**
	 * Load div content by call ajax request
	 */
	_loadContentFromURL : function(url, urlParameter, divTargeted, displayBlockUI) {
		_divTargeted = divTargeted;
		_urlParameter = urlParameter;
		_displayBlockUI = displayBlockUI;

		// remove binding action on div
		Core.removeBindingBySelector(divTargeted, Core.PULLCONTENT);

		jQuery.ajaxSettings.async = false;
		$.post(url, _urlParameter,function(data){
			$(_divTargeted).empty();
			$(_divTargeted).append(data);

			setTimeout(function() { welcome.resizeAll(); }, 300);
			welcome.fireButtonBar();

			if (_displayBlockUI) {
				Core._hideBlockUI();
			}
		});
		jQuery.ajaxSettings.async = true;

		$(_divTargeted).attr("url",  url);
	},


	/**
	 * Add sreen class and fire it
	 */
	addScreen : function(screen) {
		Core.log("Add screen to body");
		// Display or not the navigation area with the profile information.
		try{
			if (!Profile.canDisplayNavigationArea()){
				welcome.hide("west");
			}
		}catch(e){
			Core.log("Problème de profil dans la gestion de la zone de naviguation.");
		}finally{
			screen.fire();
			// Add action to the help icon
			$.each($("input[name*=ONLINE_HELP]"),function(){
				Core.addAction($(this),Core.KEYDOWN,function(e){
					if (e.which == 13){
						$("iframe").attr("src",Lang.getString($(e.target).attr("name")));
						$(".containerPlus").mb_open().css("visibility","visible");
						return false;
					}
				},false);
				Core.addAction($(this),Core.CLICK,function(e){
						$("iframe").attr("src",Lang.getString($(e.target).attr("name")));
						$(".containerPlus").mb_open().css("visibility","visible");
						return false;
				},false);
			});

			// Add management of buttons
			$.each($(".cbutton"),function(){
				$(this).unbind(Core.KEYDOWN);
				$(this).bind(Core.KEYDOWN,function(e){
					if (e.which == 13){
						$(this).children("a").click();
						return false;
					}
					e.stopImmediatePropagation();
					e.preventDefault();
					return false;
				});
			});
		}
	},

	goToIndexPage:function(){
		Core._hideBlockUI();
		Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{}, "#mainContent", true, false);
	},

	removeBindingBySelector : function(selector, declancheur) {
		jQuery.each(Core.binding, function(index, action) {
			if (action != undefined && action.el.selector == selector && action.declancheur == declancheur) {
				var rest = Core.binding.slice(index + 1 || Core.binding.length);
				Core.binding.length = index < 0 ? Core.binding.length + index : index;
				Core.binding.push.apply(Core.binding, rest);
			}
		});
	},

	/**
	 * Method for add action in bind array. if this action already add override it.
	 */
	addBindingAction : function(bindJQ) {
		itemToRemove = [];
		jQuery.each(this.binding, function(index, action) {
			if (action != undefined && action.el.selector == bindJQ.el.selector) {
				itemToRemove.push(index);
			} else if (action = undefined){
				itemToRemove.push(index);
			}
		});

		itemToRemove = itemToRemove.sort().reverse();
		jQuery.each(itemToRemove, function(index, action) {
			var rest = Core.binding.slice(index + 1 || Core.binding.length);
			Core.binding.length = index < 0 ? Core.binding.length + index : index;
			Core.binding.push.apply(Core.binding, rest);
		});

		this.binding.push.apply(Core.binding, [bindJQ]);
	},

	/**
	 * bind action on element via trigger.
	 *
	 * @param el : the url of ajax servicve
	 * @param declancheur : trigger
	 * @param action : action to run
	 * @param overload :  boolean indicating whether the overall action is authorized.
	 */
	addAction : function(el, declancheur, action, overload) {
		try {
			Core.log("Add action to element " + el.get(0).tagName + "." + el.get(0).id  + " on " + declancheur);
		} catch (e) {
			Core.log("Add action to element " + el.tagName + "." + el.id  + " on " + declancheur);
		}


		//unbind before bind to avoid side effect
		el.unbind(declancheur, action);
		el.bind(declancheur, action);

		if (overload == undefined){
			overload = true;
		}
		Core.log("overload action : " + overload);

		// Object containing the el, the declancheur and the action
		bindJQ = {
			el: el,
			declancheur: declancheur,
			action: action,
			overload: overload
		};

		Core.addBindingAction(bindJQ);
		if (jQuery.isFunction(this._optionGA.onConditionnal) || jQuery.isFunction(this._optionGA.onFire)){
			this.addActionGlobal();
		}
	},

	/**
	 * option for global action.
	 */
	_optionGA : {
		onConditionnal : null,
		onTrue : null,
		onFalse : null,
		onFire : null,
		onException : null
	},

	/**
	 * Allow to overload the current binding with a new one
	 */
	addActionGlobal : function(opts) {
		Core.log("Add global action on fire.");
		this._optionGA = $.extend(this._optionGA, opts || {});
		var optionGA = this._optionGA;

		jQuery.each(this.binding, function(index, action) {
			if (action != undefined && action.overload){
				//Core.log("Unbind action on " + $.toJSON(action.el));
				action.el.unbind(action.declancheur);

				if (jQuery.isFunction( optionGA.onConditionnal )){
					action.el.bind(action.declancheur, function(e) {

						Core.log("fire global action on element : " + action.el.selector + " and on declancheur " + action.declancheur );

						try {
							Core.interruptedAction = $.extend(Core.interruptedAction, {
													fire : true,
													action : action,
													event : e
													//url : "Not defined" // Not use, it is for debug
											});
							// TODO : !Core.isInBlockUiMode
							var condRs = optionGA.onConditionnal.call(action, Core.interruptedAction, action );
							Core.log("---> result of condition : " + condRs);
							if (condRs){
								Core.log("Call callback on true condition");

								optionGA.onTrue(Core.interruptedAction );
							} else {
								Core.log("Call callback on false condition");

								optionGA.onFalse(Core.interruptedAction );
							}
						} catch (e) {
							Core.fireException(e);
							optionGA.onException(Core.interruptedAction);
						}

						if ( Core.PULLCONTENT == action.declancheur){
							Core.log("remove binding action on div to prevent multiple call of pluContent ");
							// remove binding action on div to prevent multiple call of pluContent
							Core.removeBindingBySelector(action.el, Core.PULLCONTENT);
						}
					});
				} else {
					action.el.bind(action.declancheur, optionGA.onFire);
				}
			}
		});
	},

	/**
	 * Action call if an action interrup the standard naviguation.
	 */
	raisedInterruptedAction : function() {
		var raised = false;
		Core.log(Core.interruptedAction);
		if (Core.interruptedAction != null && jQuery.isFunction( Core.interruptedAction.action.action ) && Core.interruptedAction.fire) {
			Core.log(" raisedInterruptedAction ");
			Core.interruptedAction.action.action( Core.interruptedAction.event );

			Core.interruptedAction = null;
			raised = true;
		}
		return raised;
	},

	/**
	 *
	 */
	delActionGlobal : function() {
		if (jQuery.isFunction(this._optionGA.onConditionnal) || jQuery.isFunction(this._optionGA.onFire)){
			Core.log("Remove global action information");
			// reset all Global action data.
			this._optionGA = {
					onConditionnal : null,
					onTrue : null,
					onFalse : null,
					onFire : null,
					onException : null
				};
			Core.interruptedAction = null;

			jQuery.each(this.binding, function(index, action) {
				// rebind action
				try{
					action.el.bind(action.declancheur, action.action);
				}catch(e){
					Core.log("Action is undefined.");
				}
			});
		}
	},

    /**
     * @param {Object} ex
     */
    fireException: function(ex){
        var newLine = "\r\n";
        var exStr = "Exception: ";
        if (ex.message) {
            exStr += ex.message;
        }
        else
            if (ex.description) {
                exStr += ex.description;
            }
        if (ex.lineNumber) {
            exStr += " on line number " + ex.lineNumber;
        }
        if (ex.fileName) {
            exStr += " in file " + ex.fileName;
        }
        if (ex.stack) {
            exStr += newLine + "Stack trace:" + newLine + ex.stack;
        }

        Core.log(exStr);
    },

    /**
     * @param {Object} data : value of XML
	 * @param {Object} name : name of the element
     * Get the result of XML request
     */
    getStatus: function(data){
    	try{
    		return Core.getValueOfXml(data,"status") == "true";
    	}catch(e){
    		return false;
    	}
    },

	/**
	 * @retrun the value of tag idOfComponent in xml data
	 **/
    getIdOfComponent: function(data){
		return Core.getValueOfXml(data,"idOfComponent");
    },

	/**
	 * @return the value of tag result in xml data.
	 **/
    getResult: function(data){
		return Core.getValueOfXml(data,"result");
    },

	/**
     * @param {Object} data : value of XML
	 * @param {Object} name : name of the element
     * Get the result of XML request
     */
    getValueOfXml: function(data, name){
		return $(data).find(name).text();
    },

	/**
	 * Wrapper of the logger (fireBug for firefox)
	 * @param str The message to display.
	 */
    log: function(str){
    	if (Debug.isInDebug()){
			if(jQuery.browser["msie"]){
				if (("console" in window)){
					console.log(str);
				} else {
		            var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

		            window.console = {};
		            for (var i = 0; i < names.length; ++i)
		                window.console[names[i]] = function(){
		                };
		        }
			} else {
				if (("console" in window) && ("firebug" in console)) {
					console.log(str);
				}
			}
    	}
    }
};

/**
 * Constantes for events
 */
Const = {
    ABORT: "abort",
    BLUR: "blur",
    CHANGE: "change",
    CLICK: "click",
    DBLCLICK: "dbclick",
    DRAGDROP: "dragdrop",
    ERROR: "erro",
    FOCUS: "focus",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    LOAD: "load",
    MOUSEDOWN: "mousedown",
    MOUSEMOVE: "mousemove",
    MOUSEOUT: "mouseout",
    MOUSEOVER: "mouseover",
    MOUSEUP: "mouseup",
    MOVE: "move",
    RESET: "reset",
    RESIZE: "resize",
    SELECT: "select",
    SUBMIT: "submit",
    UNLOAD: "unload",
    BEFOREUNLOAD: "beforeunload",
    PULLCONTENT : "pullcontent"
};

$.extend(Core, Const);

/**
 * ovveride hide method for catch exception if there is no element present.
 **/
(function (jQuery){
    // keep reference to the original $.fn.hide
	jQuery.fn.__focus__ = jQuery.fn.focus;
    jQuery.fn.__hide__ = jQuery.fn.hide;
    jQuery.__post__ = jQuery.post;
    jQuery.__currCss__ = jQuery.curCSS;


    jQuery.fn.focus = function(elem){
    	try {
    		return jQuery.fn.__focus__.apply(this, arguments);
    	} catch (e) {
			// nothing to do. this is for IE error when element does not exist.
		}
	};

    jQuery.fn.hide = function(speed, callback){
    	try {
    		return jQuery.fn.__hide__.apply(this, arguments);
    	} catch (e) {
			// nothing to do. this is for IE error when element does not exist.
		}
	};
    jQuery.post = function( url, data, callback, type ){
    	try {
    		return jQuery.__post__.apply(this, arguments);
    	} catch (e) {
    		Core.fireException(e);
			// nothing to do. this is for call return no values.
		}
	};

	jQuery.curCSS = function( elem, name, force ){
    	try {
    		return jQuery.__currCss__.apply(this, arguments);
    	} catch (e) {
    		// nothing to do. this is for IE error when element does not exist.
		}
	};

    return jQuery;
})(jQuery);

Core.initAjaxTrigger();
