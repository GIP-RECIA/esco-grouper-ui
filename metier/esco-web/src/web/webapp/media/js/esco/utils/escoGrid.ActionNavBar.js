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