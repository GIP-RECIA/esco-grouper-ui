/**
 * @author aChesneau
 */
var TreeMenu = {

		_currentCutAction : null,

		/**
		 * Set the current cut action.
		 */
		setCurrentCutAction:function(action){
			TreeMenu.releaseAllCutAction();
			TreeMenu._currentCutAction = action;
		},

		/**
		 * Release the current cut action called by the menu context.
		 */
		releaseCurrentCutAction : function(){
			if (TreeMenu._currentCutAction != null ){
				TreeMenu._currentCutAction.release();
				TreeMenu._currentCutAction = null;
			}
		},

		/**
		 * Release all cut actions called by the menu context.
		 */
		releaseAllCutAction:function(){
			MoveGroup.release();
			MoveStem.release();
			CopyMembers.release();
		},

		/**
		 * Is the copy members of group menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		copyMembersIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER") return false;
			else if ($(node).attr("right") != "admin" && $(node).attr("right") != "update") return false;
			else if (CopyMembers._groupMembersCut != null && CopyMembers._groupMembersCut.attr("id") == $(node).attr("id")) return false;
			else return true;
		},

		/**
		 * The click on copy members of group menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		copyMembersAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			CopyMembers.init(node);
		},

		/**
		 * Is the paste members of group menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		pasteMembersIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER") return false;
			else if ($(node).attr("right") != "admin" && $(node).attr("right") != "update") return false;
			else if (CopyMembers._groupMembersCut != null && CopyMembers._groupMembersCut.attr("id") == $(node).attr("id")) return false;
			return CopyMembers._isGroupMembersCut;
		},

		/**
		 * The click on paste members of group menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		pasteMembersAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			$(CopyMembers._groupMembersCut).css("opacity","1");

			// Call the move action
			var theDestGroup = $(node).attr("name");
			var theOriginGroup = $(CopyMembers._groupMembersCut).attr("name");

			var parameter = {
					groupOriginName : theOriginGroup,
					groupDestName : theDestGroup
			};
			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					$.post("/" + Core.applicationContext + "/ajax/groupDeleteOrCopyMembersController/copyGroupMembers.jsf", parameter, function(data){
						if (Core.getStatus(data)){
							tree.settings.callback.onload = function(){
								Core._hideBlockUI();
								tree.settings.callback.onload = function(){
								};
							};
						}
						tree.refresh($("li[id=:]"));
					});
				}
			};
			Core._showBlockUI(_displayBlockUIOption);

			TreeMenu.releaseCurrentCutAction();
		},

		/**
		 * Is the cut group menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		cutGroupIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER") return false;
			else if ($(node).attr("right") != "admin") return false;
			else return true;
			return false;
		},

		/**
		 * The click on cut group menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		cutGroupAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			MoveGroup.init(node);
		},

		/**
		 * Is the paste group menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		pasteGroupIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "GROUP") return false;
			else if ($(node).attr("right") == "FOLDER") return false;
			else if ($(node).attr("right") == "NONE") return false;

			if ( MoveGroup._theNodeCut != null ){
				var destStem = $(node).attr("displayName");
				var originalStem = tree.parent($(MoveGroup._theNodeCut)).attr("displayName");
				if (originalStem == destStem ) return false;
			}
			return MoveGroup._isNodeCut;
			return false;
		},

		/**
		 * The click on paste group menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		pasteGroupAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			$(MoveGroup._theNodeCut).css("opacity","1");

			// Call the move action
			var destStem = $(node).attr("displayName");
			var originalStem = tree.parent($(MoveGroup._theNodeCut)).attr("displayName");

			var parameter = {
					groupUuid : $(MoveGroup._theNodeCut).attr("id"),
					stemName : $(node).attr("name"),
					stemDisplayName : $(node).attr("displayName")
			};
			var _node = $(MoveGroup._theNodeCut);
			var _dest = $(node);

			MoveGroup._resultOfMoveAction = null;
			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					$.post("/" + Core.applicationContext + "/ajax/groupController/moveGroup.jsf", parameter, function(data){
						if (Core.getStatus(data)){
							tree.settings.callback.onload = function(){
								TreePlugin.openAndSelectParent(Core.getValueOfXml(data,"message"));
								$("li[typeNode=ROOT]").click().click();
								Core._hideBlockUI();
								tree.settings.callback.onload = function(){
								};
							};
						}
						tree.refresh($("li[id=:]"));
					});
				}
			};
			Core._showBlockUI(_displayBlockUIOption);

			TreeMenu.releaseCurrentCutAction();
		},

		/**
		 * Is the cut stem menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		cutStemIsVisible:function(node,treeobj){
			return false;
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "GROUP") return false;
			//else if ($(node).attr("right") != "admin") return false;
			else return true;
			return false;
		},

		/**
		 * The click on cut stem menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		cutStemAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			MoveStem.init(node);
		},

		/**
		 * Is the paste stem menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		pasteStemIsVisible:function(node,treeobj){
			return false;
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "GROUP") return false;
			//else if ($(node).attr("right") == "GROUP") return false;
			//else if ($(node).attr("right") == "NONE") return false;

			if ( MoveStem._theNodeCut != null ){
				var destStem = $(node).attr("displayName");
				var originalStem = $(MoveStem._theNodeCut).attr("displayName");
				if (originalStem == destStem ) return false;
			}
			return MoveStem._isNodeCut;
			return false;
		},

		/**
		 * The click on paste stem menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		pasteStemAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			$(MoveStem._theNodeCut).css("opacity","1");

			// Call the move action
			var parameter = {
					stemUuid : $(MoveStem._theNodeCut).attr("id"),
					stemName : $(MoveStem._theNodeCut).attr("name"),
					targetStemName : $(node).attr("name")
			};
			var _node = $(MoveStem._theNodeCut);
			var _dest = $(node);

			MoveStem._resultOfMoveAction = null;
			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					$.post("/" + Core.applicationContext + "/ajax/stemController/moveStem.jsf", parameter, function(data){
						if (Core.getStatus(data)){
							tree.settings.callback.onload = function(){
								TreePlugin.openAndSelectParent(Core.getValueOfXml(data,"message"));
								$("li[typeNode=ROOT]").click().click();
								Core._hideBlockUI();
								tree.settings.callback.onload = function(){
								};
							};
						}
						tree.refresh($("li[id=:]"));
					});
				}
			};
			Core._showBlockUI(_displayBlockUIOption);

			TreeMenu.releaseCurrentCutAction();
		},


		/**
		 * Is the create delete menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		deleteIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER"){
				if ($(node).attr("isEmpty") != "true") return false;
				else if ($(node).attr("right") == "GROUP") return false;
				else if ($(node).attr("right") == "NONE") return false;
				else return true;
			}
			else if ($(node).attr("right") != "admin") return false;
			else return true;
		},

		/**
		 * The click on delete folder menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		deleteAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if (node.attr("typeNode")== "FOLDER"){
				var needToRedirect = false;
				if ($("#stemUuid") != undefined && $("#stemUuid").val() == node.attr("id") )
					needToRedirect = true;

				$.post("/" + Core.applicationContext + "/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:node.attr("id"),displayName:node.attr("displayName"),needToRedirect:needToRedirect,from:"treeNavigate"},function(data)
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
			}else if (node.attr("typeNode")== "GROUP"){
				var needToRedirect = false;
				if ($("#groupUuid") != undefined && $("#groupUuid").val() == node.attr("id") ){
					needToRedirect = true;
					try{
						group._needUpdateData = false;
					}catch(e){
					}
				}


				$.post("/" + Core.applicationContext + "/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:node.attr("id"),displayName:node.attr("displayName"),needToRedirect:needToRedirect,from:"treeNavigate"},function(data)
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
			}
		},

		/**
		 * Is the create folder menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		createFolderIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if($(node).attr("typeNode") == "GROUP") return false;
			else if ($(node).attr("right") == "GROUP") return false;
			else if ($(node).attr("right") == "NONE") return false;
			else if (!Profile.canAccessToStemModification()) return false;
			else return true;
		},

		/**
		 * The click on create folder menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		createFolderAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if (node.attr("typeNode")== "FOLDER"){
				tree.select_node($(node));
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications.jsf",{stemUuid:$(node).attr("ID"),from:"treeNavigate",creation:"true"}, "#mainContent", true);
			}
		},

		/**
		 * Is the create group menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		createGroupIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if($(node).attr("typeNode") == "GROUP") return false;
			else if ($(node).attr("right") == "FOLDER") return false;
			else if ($(node).attr("right") == "NONE") return false;
			else if (!Profile.canAccessToGroupModification()) return false;
			else return true;
		},

		/**
		 * The click on create group menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		createGroupAction : function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if (node.attr("typeNode")== "FOLDER"){
				tree.select_node($(node));
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf",{stemUuid:$(node).attr("ID"),from:"treeNavigate",creation:"true"}, "#mainContent", true );
			}
		},

		/**
		 * Is the search menu is visible.
		 * @return true if the menu is visible and false otherwise.
		 */
		searchIsVisible:function(node,treeobj){
			return true;
		},

		/**
		 * The click on search menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		searchAction:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
	        var pathName="";
	        var pathDisplayName="";
	        if (node.attr("typeNode")=="GROUP"){
	        	var splitData = $(node).attr("name").split(":");
	        	for ( i =0 ; i < splitData.length - 1 ; i++ ) {
	        		pathName = pathName + splitData[i] + ":";
	        	}
	        	pathName = pathName.substring(0 ,pathName.length-1 );

	        	splitData = $(node).attr("displayName").split(":");
	        	for ( i =0 ; i < splitData.length -1 ; i++ ) {
	        		pathDisplayName = pathDisplayName + splitData[i] + ":";
	        	}
	        	pathDisplayName = pathDisplayName.substring(0,pathDisplayName.length-1);
	        }else{
	        	pathName = $(node).attr("name");
	        	pathDisplayName = $(node).attr("displayName");
	        }
	        tree.select_node($(node));
	        Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/simpleSearch.jsf",{idNode:pathDisplayName,nameIdNode:pathName}, "#mainContent", true, true);
		},

		/**
		 * Is the manage menu is visible
		 * @return true if the menu is visible and false otherwise.
		 */
		manageIsVisible:function(node,treeobj){
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER") {
				if (!Profile.canAccessToStemModification()) return false;
				else if ($(node).attr("right") == "GROUP") return false;
				else if ($(node).attr("right") == "NONE") return false;
				else return true;
			}
			else if (node.attr("typeNode")== "GROUP") {
				if (!Profile.canAccessToGroupModification()) return false;
				else if ($(node).attr("right") != "admin") return false;
				else return true;
			}
			else return false;
		},

		/**
		 * The click on manage menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		manageAction : function(node, treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if (node.attr("typeNode")== "FOLDER") {
				tree.select_node($(node));
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications.jsf",{stemUuid:$(node).attr("ID"),from:"treeNavigate",creation:"false"}, "#mainContent", true, true);
			} else if (node.attr("typeNode")=="GROUP"){
				tree.select_node($(node));
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$(node).attr("ID"),from:"treeNavigate",creation:"false"}, "#mainContent", true, true);
			}
		},

		/**
		 * Is the properties menu is visible
		 * @return true if the menu is visible and false otherwise.
		 */
		propertiesIsVisible:function(node,treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if (node.attr("typeNode")== "FOLDER") {
				if (!Profile.canAccessToStemProperties()) return false;
				else return true;
			}
			else if (node.attr("typeNode")== "GROUP") {
				if (!Profile.canAccessToGroupProperties()) return false;
				else return true;
			}
			else return false;
		},

		/**
		 * The click on properties menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		propertiesAction : function(node, treeobj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if (node.attr("typeNode")== "GROUP"){
				tree.select_node($(node));
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupProperties.jsf",{groupUuid:$(node).attr("ID"),from:"treeNavigate"}, "#mainContent", true, true);
			}
			else if (node.attr("typeNode")== "FOLDER"){
				tree.select_node($(node));
				$.post("/" + Core.applicationContext + "/ajax/stemController/isModifiedStems.jsf", json, function(data) {});
				Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemProperties/stemProperties.jsf",{stemUuid:$(node).attr("ID"),from:"treeNavigate"}, "#mainContent", true, true);
			}
		},

		/**
		 * Is the subscribe menu is visible
		 * @return true if the menu is visible and false otherwise.
		 */
		subscribeIsVisible:function(node,treeObj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if($(node).attr("typeNode") == "FOLDER")return false;
			else if($(node).attr("optin") == "false")return false;
			else return true;
		},

		/**
		 * The click on subscribe menu.
		 * @param node the current node clicked.
		 * @param treeobj the instance of the tree.
		 */
		subscribeAction : function(node,treeobj){
			TreeMenu._clickOptinOrOptoutDefaultAction(node,"OPTIN");
		},

		/**
		 * Is the subscribe menu is visible
		 * @return true if the menu is visible and false otherwise.
		 */
		unSubscribeIsVisible:function(node,treeObj){
			if (node === false){
				node = $("a[class=clicked]").parent("li");
			}
			if($(node).attr("typeNode") == "ROOT") return false;
			else if($(node).attr("typeNode") == "FOLDER")return false;
			else if($(node).attr("optout") == "false")return false;
			else return true;
		},

		/**
		 * The click on unsubscribe menu.
		 */
		unSubscribeAction : function(node,treeobj){
			TreeMenu._clickOptinOrOptoutDefaultAction(node,"OPTOUT");
		},

		/**
		 * Get the function to do the optin or optout action.
		 */
		_clickOptinOrOptoutDefaultAction : function (node,typeSubscription) {
			var idGroup = $(node).attr("id");
			json = {groupId : idGroup, typeOfSubscription : typeSubscription};
			$.post("/" + Core.applicationContext + "/ajax/personSubscriptionsController/subscribeOrUnsubscribeToGroup.jsf", json, function(data){
				if (Core.getStatus(data)){
					_displayBlockUIOption = {
						onAfterShowBlockUI : function(){
							tree.settings.callback.onload = function(){

								if ($("input[name=personSubscriptions] + a") != undefined){

									var $tabs = $('#escoPanels').tabs();
									var index = -1;
									jQuery.each($(".ui-tabs-nav > .ui-corner-top"), function(indexTab, tab){
									    if (tab.textContent == $('input[name=personSubscriptions] + a').attr("title")){
											index = indexTab;
									    }
									});
									if ( $('#escoPanels').tabs('option', 'selected') == index ){
										$tabs.tabs('load', index);
									}

								}

								Core._hideBlockUI();

								tree.settings.callback.onload = function(){
								};
							};
							tree.refresh($("li[id=:]"));
						}
					};
					Core._showBlockUI(_displayBlockUIOption);

				}else{
					$.jGrowl(Core.getResult(data), {
						header: 'Important',
						theme : 'jGrowlError',
						sticky: true
						});
				}
			});
		}
};