<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div id="myloading" ></div>
	<div id="pagerGrid_privilegeStem" class="scroll" style="visibility:hidden"></div>
	<table id="list_privilegeStem" class="scroll" cellpadding="0" cellspacing="0"></table>

<script language="JavaScript">

	var	options = {
			IS_MULTIPLE_VIEW_GRID 			: true,
			TYPE_OF_DATA 					: "STEM",
			IS_SELECTABLE_GRID 				: true,
			ACTION_ON_SELECT_ROW 			: true,
			ACTION_ON_FIND_DATA				: true,
			ACTION_ON_SELECT_ALL 			: true,
			ACTION_ON_CLICK_LINK_ITEM 		: true,
			ACTION_ON_PAGING 				: true,
			ACTION_ON_LOAD_COMPLETE 		: true,
			ACTION_ON_EXISTING_ADDED_ITEMS 	: true,
			COLORATE_ADDED_ITEMS 			: true,
			URL_FIND_DATA 					: "/" + Core.applicationContext + "/ajax/personPrivilegesStemController/findPrivileges.jsf",
			URL_SELECT_ROWS 				: "/" + Core.applicationContext + "/ajax/personPrivilegesStemController/selectedRows.jsf",
			URL_DATA_RESULT				 	: "/" + Core.applicationContext + "/ajax/personPrivilegesStemController/dataResult.jsf",
			ID_GRID 						: "#list_privilegeStem",
			ID_PAGER_GRID 					: "#pagerGrid_privilegeStem",
			ID_LOADING_GRID 				: "#myloading",
			COLUMN_SELECTED_VALUE 			: 8,
			COLUMN_ADDED_VALUE 				: 7,
			COLUMN_ID_VALUE 				: 1,
			COLUMN_NAMEGROUP_VALUE 			: 3,
			COLUMN_LINK_VALUE 				: 2,
			DEL_NAV_BAR_POSITION 			: 1,
			URL_SEND_PRIVILEGE 				: "/" + Core.applicationContext + "/ajax/personPrivilegesStemController/updatePrivilege.jsf",
			HAS_STEM						: "col4",
			HAS_CREATE						: "col5"
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
									Lang.getString("PERSON_PRIVILEGE_STEM_COLUMN_1"),
									Lang.getString("PERSON_PRIVILEGE_STEM_COLUMN_2"),
									Lang.getString("PERSON_PRIVILEGE_STEM_COLUMN_3"),
									Lang.getString("PERSON_PRIVILEGE_STEM_COLUMN_4"),
									'path',
									'added',
									'select' ],
			TABLE_OF_COL_MODEL : [{ name : 'col1'    , index : 'id'               , width : 220, sortable : false, hidden : true },
								  { name : 'colLink' , index : 'displayExtension' , width : 218, resizable:true },
								  { name : 'col3'    , index : 'displayName'      , width : 335, resizable:true },
								  { name : 'col4'    , index : 'cs'               , width :  40, sortable : false, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
								  { name : 'col5'    , index : 'cg'               , width :  40, sortable : false, resizable:true, editable : true, edittype:"checkbox", editoptions:{value:"1:0"} },
								  { name : 'col6'    , index : 'path'             , width : 220, sortable : false, hidden : true },
								  { name : 'added'   , index : 'select'           , width : 220, hidden : true	},
								  { name : 'select'  , index : 'select'           , width : 220, hidden : true	} ]
		};

	var personPrivilegesStem = new PersonPrivilegesStem(options,lang);
	Core.addScreen(personPrivilegesStem);
	$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>
	<style>
		.tbutton{
			margin-top : 5px;
		}
	</style>
</g:view>