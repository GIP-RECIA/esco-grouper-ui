<%--
 Copyright (C) 2009 GIP RECIA http://www.recia.fr
 @Author (C) 2009 GIP RECIA <contact@recia.fr>
 @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
--%>
<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<input type="image" name="ONLINE_HELP_GROUP_MODIFICATION_PRIVILEGES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<!-- For all selected  -->
	<h:inputHidden id="isAllSelected" value="#{groupModificationsPrivilegesController.isSelectedAll}" />
	<h:inputHidden id="isExistAddedPrivileges" value="" />
	<h:inputHidden id="isCreation" value="#{groupModificationsPrivilegesController.groupInput}" />

	<!-- Radio buttons -->
	<h:selectOneRadio id="privilegesRadio" styleClass="font_search"
					  value="#{groupModificationsPrivilegesController.defaultPrivilegesRadio.label}">
		<f:selectItems value="#{groupModificationsPrivilegesController.listPrivilegesRadio}"/>
	</h:selectOneRadio>
	<h2>
		<h:outputText id="subtitle" value="#{msgs['MODIFICATION.PRIVILEGES.OF.GROUP']}" />
		<h:outputText id="subtitleWarningPrivilege" styleClass="memberWarning" value="" />
	</h2>

	<!-- Table -->
	<div id="message"/>
	<div id="myloading"/>
	<div id="pagerGrid_privilege" class="scroll" style="visibility:hidden"></div>
	<table id="list_privilege" class="scroll" cellpadding="0" cellspacing="0"></table>

	<div id="modalAttribute" style="width:800px; align:left;" />

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
		try{
			$("#privilegeTab").children().attr("href",$("#privilegeTab").children().attr("href").substring($("#privilegeTab").children().attr("href").indexOf("#")));
		}catch(e){}
		</script>
	</t:div>

<script type="text/javascript">

	$("input[value=PRIVILEGE_RADIO_IMMEDIATE]").parent().attr("title",Lang.getString("PRIVILEGE_RADIO_IMMEDIATE_TITLE"));
	$("input[value=PRIVILEGE_RADIO_EFFECTIVE]").parent().attr("title",Lang.getString("PRIVILEGE_RADIO_EFFECTIVE_TITLE"));
	$("input[value=PRIVILEGE_RADIO_ALL]").parent().attr("title",Lang.getString("PRIVILEGE_RADIO_ALL_TITLE"));

	var	options = {
			IS_MULTIPLE_VIEW_GRID 			: true,
			IS_SELECTABLE_GRID 				: true,
			COLORATE_ADDED_ITEMS			: true,
			ACTION_ON_SELECT_ROW 			: true,
			ACTION_ON_FIND_DATA 			: true,
			ACTION_ON_SELECT_ALL 			: true,
			ACTION_ON_CLICK_LINK_ITEM	 	: true,
			ACTION_ON_PAGING 				: true,
			ACTION_ON_LOAD_COMPLETE 		: true,
			ACTION_ON_EXISTING_ADDED_ITEMS 	: true,
			URL_FIND_DATA 					: "/" + Core.applicationContext + "/ajax/groupModificationsPrivilegesController/findPrivileges.jsf",
			URL_SELECT_ROWS 				: "/" + Core.applicationContext + "/ajax/groupModificationsPrivilegesController/selectedRows.jsf",
			URL_DATA_RESULT 				: "/" + Core.applicationContext + "/ajax/groupModificationsPrivilegesController/dataResult.jsf",
			ID_GRID 						: "#list_privilege",
			ID_PAGER_GRID 					: "#pagerGrid_privilege",
			ID_LOADING_GRID 				: "#myloading",
			COLUMN_SELECTED_VALUE 			: 9,
			COLUMN_ADDED_VALUE 				: 11,
			COLUMN_ID_VALUE 				: 1,
			COLUMN_TYPE_DATA 				: 10,
			COLUMN_NAMEGROUP_VALUE 			: 8,
			COLUMN_LINK_VALUE 				: 2,
			URL_SEND_PRIVILEGE 				: "/" + Core.applicationContext + "/ajax/groupModificationsPrivilegesController/updatePrivilege.jsf",
			OPTIN							: "col3",
			OPTOUT							: "col4",
			VIEW							: "col5",
			READ							: "col6",
			UPDATE							: "col7",
			ADMIN							: "col8"
		};

	var lang = {
			WARNING_MESSAGE             : Lang.getString("MODIFICATION.PRIVILEGE_WARNING"),
			DEL_NAV_BAR_MESSAGE_DEFAULT : Lang.getString("MODIFICATION.PRIVILEGE_DEL_CAPTION"),
			DEL_NAV_BAR_MESSAGE_CUSTOM  : Lang.getString("MODIFICATION.PRIVILEGE_DEL_TITLE"),
			ADD_LABEL                   : Lang.getString("MODIFICATION.PRIVILEGE_ADD_CAPTION"),
			ADD_TITLE                   : Lang.getString("MODIFICATION.PRIVILEGE_ADD_TOOLTIPS"),
			DEL_LABEL                   : Lang.getString("MODIFICATION.PRIVILEGE_DEL_CAPTION"),
			DEL_TITLE                   : Lang.getString("MODIFICATION.PRIVILEGE_DEL_TOOLTIPS"),
			TABLE_OF_COL_NAME : ['id',
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_1"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_2"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_3"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_4"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_5"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_6"),
									Lang.getString("MODIFICATION.PRIVILEGE_GROUP_COLUMN_7"),
									'path',
									'select',
									'type',
									'added' ],
			TABLE_OF_COL_MODEL : [{ name : 'col1'   , index : 'id'          , width : 220, hidden : true   , sortable : false },
								  { name : 'colLink', index : 'displayName' , width : 493, sortable : true , resizable : true },
								  { name : 'col3'   , index : 'subscribe'   , width :  25, sortable : false, resizable : true },
								  { name : 'col4'   , index : 'unsubscribe' , width :  25, sortable : false, resizable : true },
								  { name : 'col5'   , index : 'view'        , width :  25, sortable : false, resizable : true },
								  { name : 'col6'   , index : 'read'        , width :  25, sortable : false, resizable : true },
								  { name : 'col7'   , index : 'update'      , width :  25, sortable : false, resizable : true },
								  { name : 'col8'   , index : 'administrate', width :  25, sortable : false, resizable : true },
								  { name : 'col9'   , index : 'path'        , width : 220, hidden : true   , sortable : false },
								  { name : 'select' , index : 'select'      , width : 220, hidden : true  },
								  { name : 'type'   , index : 'type'        , width :  50, hidden : true   , resizable : false},
								  { name : 'added'  , index : 'added'       , width : 220, hidden : true  }]
		};

		var groupPrivileges = new GroupPrivileges(options,lang);
		Core.addScreen(groupPrivileges);
		$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>
<style>
	.tbutton{
		margin-top : 5px;
	}
</style>
</g:view>