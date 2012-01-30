/**
 * @author aChesneau
 */

var ActionRightCheckBox = {

	/**
	 * The click optin default action.
	 */
	clickOptinDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			var row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.VIEW), true);
			}
			var idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,optin : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click optout default action.
	 */
	clickOptoutDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.VIEW), true);
			}
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,optout : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click view default action.
	 */
	clickViewDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
			} else {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.OPTIN), false);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.OPTOUT), false);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.READ), false);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.UPDATE), false);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.ADMIN), false);
			}
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,view : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click read default action.
	 */
	clickReadDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.VIEW), true);
			} else {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.UPDATE), false);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.ADMIN), false);
			}
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,read : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click update default action.
	 */
	clickUpdateDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.VIEW), true);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.READ), true);
			} else {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.ADMIN), false);
			}
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,update : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click admin default action.
	 */
	clickAdminDefaultAction : function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			if ($(this).attr("checked")=="true") {
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.VIEW), true);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.READ), true);
				ActionRightCheckBox._toggleImg($('#'+row[0]+'_'+options.UPDATE), true);
			}
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,administrate : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click HasStem default action.
	 */
	clickHasStemDefaultAction: function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,hasStem : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},

	/**
	 * The click HasCreate default action.
	 */
	clickHasCreateDefaultAction: function(options,callIsModified){
		var result = function(e){
			e.stopPropagation();
			ActionRightCheckBox._toggleImg($(this));
			row = $(this).attr("id").split("_");
			idElement = $(options.ID_GRID).getCell(row[0], 1);
			json = {idElement : idElement,hasCreate : $(this).attr("checked")};
			_callIsModified = callIsModified;
			$.post(options.URL_SEND_PRIVILEGE, json, function(data){
				if (_callIsModified != undefined){
					_callIsModified.call();
				}
			});
	    };
	    return result;
	},


	_toggleImg : function(el, force){

		if (force != undefined){
			if (force === true){
				el.attr("checked", "true");
				el.attr("src", "/" + Core.applicationContext + "/media/imgs/checked.png");
			} else {
				el.attr("checked", "false");
				el.attr("src", "/" + Core.applicationContext + "/media/imgs/unchecked.png");
			}
		} else {
			if (el.attr("checked") === "false"){
				el.attr("checked", "true");
				el.attr("src", "/" + Core.applicationContext + "/media/imgs/checked.png");
			} else {
				el.attr("checked", "false");
				el.attr("src", "/" + Core.applicationContext + "/media/imgs/unchecked.png");
			}
		}
	}

};
