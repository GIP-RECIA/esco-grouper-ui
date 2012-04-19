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

	<div id="myloading"></div>
	<div id="pagerGrid_privilegeGroup" class="scroll" style="visibility:hidden"></div>
	<table id="list_privilegeGroup" class="scroll" cellpadding="0" cellspacing="0"></table>

<script language="JavaScript">
		var	options = {
				IS_MULTIPLE_VIEW_GRID 			: true,
				TYPE_OF_DATA 					: "GROUP",
				IS_SELECTABLE_GRID 				: true,
				COLORATE_ADDED_ITEMS			: true,
				ACTION_ON_FIND_DATA				: true,
				ACTION_ON_SELECT_ROW 			: true,
				ACTION_ON_SELECT_ALL 			: true,
				ACTION_ON_CLICK_LINK_ITEM 		: true,
				ACTION_ON_PAGING 				: true,
				ACTION_ON_LOAD_COMPLETE 		: true,
				ACTION_ON_EXISTING_ADDED_ITEMS 	: true,
				URL_FIND_DATA 					: "/" + Core.applicationContext + "/ajax/personPrivilegesGroupController/findPrivileges.jsf",
				URL_SELECT_ROWS		 			: "/" + Core.applicationContext + "/ajax/personPrivilegesGroupController/selectedRows.jsf",
				URL_DATA_RESULT 				: "/" + Core.applicationContext + "/ajax/personPrivilegesGroupController/dataResult.jsf",
				ID_GRID 						: "#list_privilegeGroup",
				ID_PAGER_GRID 					: "#pagerGrid_privilegeGroup",
				ID_LOADING_GRID 				: "#myloading",
				COLUMN_SELECTED_VALUE 			: 11,
				COLUMN_ADDED_VALUE 				: 12,
				COLUMN_ID_VALUE 				: 1,
				COLUMN_NAMEGROUP_VALUE 			: 3,
				COLUMN_LINK_VALUE 				: 2,
				URL_SEND_PRIVILEGE 				: "/" + Core.applicationContext + "/ajax/personPrivilegesGroupController/updatePrivilege.jsf",
				OPTIN							: "col4",
				OPTOUT							: "col5",
				VIEW							: "col6",
				READ							: "col7",
				UPDATE							: "col8",
				ADMIN							: "col9"
			};

		var lang = {
				WARNING_MESSAGE             : Lang.getString("PERSON_PRIVILEGE_WARNING"),
				DEL_NAV_BAR_MESSAGE_DEFAULT : Lang.getString("PERSON_PRIVILEGE_DEL_CAPTION"),
				DEL_NAV_BAR_MESSAGE_CUSTOM  : Lang.getString("PERSON_PRIVILEGE_DEL_TITLE"),
				ADD_LABEL					: Lang.getString("PERSON_PRIVILEGE_ADD_CAPTION"),
				ADD_TITLE                   : Lang.getString("PERSON_PRIVILEGE_ADD_TOOLTIPS"),
				DEL_LABEL                   : Lang.getString("PERSON_PRIVILEGE_DEL_CAPTION"),
				DEL_TITLE                   : Lang.getString("PERSON_PRIVILEGE_DEL_TOOLTIPS"),
				TABLE_OF_COL_NAME : [
										'id',
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_1"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_2"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_3"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_4"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_5"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_6"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_7"),
										Lang.getString("PERSON_PRIVILEGE_GROUP_COLUMN_8"),
										'path',
										'select',
										'added' ],
				TABLE_OF_COL_MODEL : [{ name : 'col1'    , index : 'id'               , sortable : false, width : 220, hidden : true  },
									  { name : 'colLink' , index : 'displayExtension' , sortable : true , width : 158, resizable:true },
									  { name : 'col3'    , index : 'displayName'      , sortable : true , width : 275, resizable:true },
									  { name : 'col4'    , index : 'subscribe'        , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col5'    , index : 'unsubscribe'      , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col6'    , index : 'view'             , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col7'    , index : 'read'             , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col8'    , index : 'update'           , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col9'    , index : 'administrate'     , sortable : false, width :  30, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
									  { name : 'col10'   , index : 'path'             , sortable : false, width : 220, hidden : true  },
									  { name : 'select'  , index : 'select'           , sortable : false, width : 220, hidden : true  },
									  { name : 'added'   , index : 'added'            , sortable : false, width : 220, hidden : true  }]
			};

			var personPrivilegesGroup = new PersonPrivilegesGroup(options,lang);
			Core.addScreen(personPrivilegesGroup);
			$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>
<style>
	.tbutton{
		margin-top : 5px;
	}
</style>
</g:view>