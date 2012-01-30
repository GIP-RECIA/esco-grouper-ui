/**
 * @author aChesneau
 */

var ActionNavBar = {

	/**
	 * Get the default action of the add button.
	 */
	actionAddDefault : function (instance , fromRequest, tab ,onlygroup ){
		var result = function(){
			instance._sendSelectedRows();
			var query = {idNode:$("#parentNameSearchDisplayPath").val(),
							   nameIdNode:$("#parentNameSearchPath").val(),
							   groupUuid:$("input[id=groupUuid]").val()};

			if (onlygroup != undefined && onlygroup == true){
				query = $.extend(query, {onlyGroup:"true"});
			}

			Core.setNavParam("fromRequest", fromRequest );
			Core.setNavParam("groupUuid", $("input[id=groupUuid]").val());
			Core.setNavParam("tab", tab);

			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/additionSearch.jsf",query, "#mainContent", true, false);
		};
		return result;
	},

	/**
	 * Get the default action of the add button.
	 */
	actionAddPersonDefault : function (instance , fromRequest, tab ,onlygroup ){
		var result = function(){
			instance._sendSelectedRows();

			// Information in the tree selected node.
			var nameTreeNodeSelected = null;
			var idTreeNodeSelected = null;

			if ($("a[class=clicked]").parent().attr("typenode") == "GROUP"){
				nameTreeNodeSelected = tree.parent($("a[class=clicked]")).attr("name");
				idTreeNodeSelected = tree.parent($("a[class=clicked]")).attr("displayName");
			}else{
				nameTreeNodeSelected = $("a[class=clicked]").parent().attr("name");
				idTreeNodeSelected = $("a[class=clicked]").parent().attr("displayName");
			}


			var query = {idNode:idTreeNodeSelected,
							   nameIdNode:nameTreeNodeSelected,
							   idPerson:$("input[id=personId]").val()};

			if (onlygroup != undefined && onlygroup == true){
				query = $.extend(query, {onlyGroup:"true"});
			}

			Core.setNavParam("fromRequest", fromRequest );
			Core.setNavParam("idPerson", $("input[id=personId]").val());
			Core.setNavParam("tab", tab);

			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/additionSearch.jsf",query, "#mainContent", true, false);
		};
		return result;
	},

	/**
	 * Get the action of the add button to go to stem search.
	 */
	actionAddStemSearch : function (instance , fromRequest, tab ){
		var result = function(){
			instance._sendSelectedRows();
			var query = {idNode:$("#parentNameSearchDisplayPath").val(),
							   nameIdNode:$("#parentNameSearchPath").val(),
							   groupUuid:$("input[id=groupUuid]").val()};

			Core.setNavParam("fromRequest", fromRequest );
			Core.setNavParam("groupUuid", $("input[id=groupUuid]").val());
			Core.setNavParam("tab", tab);

			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/stemSearch.jsf",query, "#mainContent", true, false);
		};
		return result;
	},

	/**
	 * Get the default action of the add button.
	 */
	actionAddStemSearchPerson : function (instance , fromRequest, tab ,onlygroup ){
		var result = function(){
			instance._sendSelectedRows();

			var nameTreeNodeSelected = null;
			var idTreeNodeSelected = null;

			if ($("a[class=clicked]").parent().attr("typenode") == "GROUP"){
				nameTreeNodeSelected = tree.parent($("a[class=clicked]")).attr("name");
				idTreeNodeSelected = tree.parent($("a[class=clicked]")).attr("displayName");
			}else{
				nameTreeNodeSelected = $("a[class=clicked]").parent().attr("name");
				idTreeNodeSelected = $("a[class=clicked]").parent().attr("displayName");
			}

			var query = {idNode:idTreeNodeSelected,
					   nameIdNode:nameTreeNodeSelected,
					   idPerson:$("input[id=personId]").val()};

			Core.setNavParam("fromRequest", fromRequest );
			Core.setNavParam("idPerson", $("input[id=personId]").val());
			Core.setNavParam("tab", tab);

			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/stemSearch.jsf",query, "#mainContent", true, false);
		};
		return result;
	},

	/**
	 * Get the default action of the add button.
	 */
	actionAddStemPrivilege : function (instance , fromRequest, tab ){
		var result = function(){
			instance._sendSelectedRows();
			var query = {idNode:$("input[id=nameSearchDisplayPath]").val(),
		             nameIdNode:$("input[id=nameSearchPath]").val()};

			Core.setNavParam("fromRequest", fromRequest );
			Core.setNavParam("stemUuid", $("input[id=stemUuid]").val());
			Core.setNavParam("tab", tab);

			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/additionSearch.jsf",query, "#mainContent", true, false);
		};
		return result;
	},

	/**
	 * Get the default action of the delete button.
	 */
	actionDelDefault : function (instance , request , callIsModified){
		var result = function(){
			_displayBlockUIOption = {
					onAfterShowBlockUI : function(){
							instance._selectType="undefined";
							instance._sendSelectedRows();

			    			var _self =instance;
			    			var _callIsModified = callIsModified;

		    	 			jQuery.ajaxSettings.async = false;
							$.post(request, {}, function(data) {
								_self.nbRowSelected = 0;
								_self._doneLoadData(Core.getStatus(data));
								if (_callIsModified != null){
									_callIsModified.call();
								}
							});
							jQuery.ajaxSettings.async = true;
				}
			};
			Core._showBlockUI(_displayBlockUIOption);
		};
		return result;
	}

};