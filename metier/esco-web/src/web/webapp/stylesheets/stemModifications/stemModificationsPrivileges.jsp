<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">
	<input type="image" name="ONLINE_HELP_STEM_MODIFICATION_PRIVILEGES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<!-- For all selected  -->
	<h:inputHidden id="isAllSelected" value="#{stemModificationsPrivilegesController.isSelectedAll}" />
	<h:inputHidden id="isExistAddedPrivileges" value="" />
	<h:inputHidden id="isCreation" value="#{stemModificationsPrivilegesController.groupInput}" />
	<h:inputHidden id="nameSearchPath"  value="#{stemController.nameSearchPath}" />
	<h:inputHidden id="nameSearchDisplayPath"  value="#{stemController.displayNameSearchPath}" />



	<h:selectOneRadio id="privilegesRadio" styleClass="font_search"
					  value="#{stemModificationsPrivilegesController.defaultPrivilegesRadio.label}">
		<f:selectItems value="#{stemModificationsPrivilegesController.listPrivilegesRadio}"/>
	</h:selectOneRadio>
	<h2>
		<h:outputText id="subtitle" value="#{msgs['STEM.PRIVILEGES.OF.STEM']}" />
		<h:outputText id="subtitleWarningPrivilege" styleClass="memberWarning" value="" />
	</h2>


	<div id="subtitleWarningPrivilege"/>
	<div id="myloading"/>
	<div id="pagerGrid_privilege" class="scroll" style="visibility:hidden"></div>
	<table id="list_privilege" class="scroll" cellpadding="0" cellspacing="0"></table>

	<div id="modalAttribute" style="width:800px; align:left;" />

<script language="JavaScript">

	$("input[value=PRIVILEGE_RADIO_IMMEDIATE]").parent().attr("title",Lang.getString("STEM_PRIVILEGE_RADIO_IMMEDIATE_TITLE"));
	$("input[value=PRIVILEGE_RADIO_EFFECTIVE]").parent().attr("title",Lang.getString("STEM_PRIVILEGE_RADIO_EFFECTIVE_TITLE"));
	$("input[value=PRIVILEGE_RADIO_ALL]").parent().attr("title",Lang.getString("STEM_PRIVILEGE_RADIO_ALL_TITLE"));


	$("#currentTab").attr("value","1");
	Validate.closeAllValidatePromptsOpen();

	var	options = {
			IS_MULTIPLE_VIEW_GRID 			: true,
			TYPE_OF_DATA 					: "GROUP-PERSON",
			IS_SELECTABLE_GRID 				: true,
			ACTION_ON_SELECT_ROW 			: true,
			ACTION_ON_FIND_DATA 			: true,
			ACTION_ON_SELECT_ALL 			: true,
			ACTION_ON_CLICK_LINK_ITEM 		: true,
			ACTION_ON_PAGING 				: true,
			ACTION_ON_LOAD_COMPLETE 		: true,
			ACTION_ON_EXISTING_ADDED_ITEMS 	: true,
			COLORATE_ADDED_ITEMS			: true,
			URL_FIND_DATA 					: "/" + Core.applicationContext + "/ajax/stemModificationsPrivilegesController/findPrivileges.jsf",
			URL_SELECT_ROWS 				: "/" + Core.applicationContext + "/ajax/stemModificationsPrivilegesController/selectedRows.jsf",
			URL_DATA_RESULT 				: "/" + Core.applicationContext + "/ajax/stemModificationsPrivilegesController/dataResult.jsf",
			ID_GRID 						: "#list_privilege",
			ID_PAGER_GRID 					: "#pagerGrid_privilege",
			ID_LOADING_GRID 				: "#myloading",
			COLUMN_SELECTED_VALUE 			: 5,
			COLUMN_ID_VALUE 				: 1,
			COLUMN_NAMEGROUP_VALUE 			: 5,
			COLUMN_ADDED_VALUE 				: 7,
			COLUMN_TYPE_DATA 				: 6,
			COLUMN_LINK_VALUE 				: 2,
			URL_SEND_PRIVILEGE 				: "/" + Core.applicationContext + "/ajax/stemModificationsPrivilegesController/updatePrivilege.jsf",
			HAS_STEM						: "col3",
			HAS_CREATE						: "col4"
		};

		var lang = {
				WARNING_MESSAGE             : Lang.getString("MODIFICATION.PRIVILEGE_WARNING"),
				DEL_NAV_BAR_MESSAGE_DEFAULT : Lang.getString("MODIFICATION.PRIVILEGE_DEL_CAPTION"),
				DEL_NAV_BAR_MESSAGE_CUSTOM  : Lang.getString("MODIFICATION.PRIVILEGE_DEL_TITLE"),
				ADD_LABEL                   : Lang.getString("MODIFICATION.PRIVILEGE_ADD_CAPTION"),
				ADD_TITLE                   : Lang.getString("MODIFICATION.PRIVILEGE_ADD_TOOLTIPS"),
				DEL_LABEL                   : Lang.getString("MODIFICATION.PRIVILEGE_DEL_CAPTION"),
				DEL_TITLE                   : Lang.getString("MODIFICATION.PRIVILEGE_DEL_TOOLTIPS"),
				TABLE_OF_COL_NAME : [
										'id',
										Lang.getString("STEM.PRIVILEGE_STEM_COLUMN_1"),
										Lang.getString("STEM.PRIVILEGE_STEM_COLUMN_2"),
										Lang.getString("STEM.PRIVILEGE_STEM_COLUMN_3"),
										'path',
										'select',
										'type',
										'added' ],
				TABLE_OF_COL_MODEL : [{ name : 'col1'    , index : 'id'          , width : 220, hidden : true },
									  { name : 'colLink' , index : 'displayName' , width : 523, sortable : true  , resizable : true  },
									  { name : 'col3'    , index : 'cs'          , width :  40, sortable : false , resizable : true  },
									  { name : 'col4'    , index : 'cg'          , width :  40, sortable : false , resizable : true  },
									  { name : 'col5'    , index : 'path'        , width : 220, hidden : true },
									  { name : 'select'  , index : 'select'      , width : 220, hidden : true },
									  { name : 'type'    , index : 'type'        , width :  50, hidden : true    , resizable : false },
									  { name : 'added'   , index : 'added'       , width : 220, hidden : true }]
			};

	var stemPrivileges = new StemPrivileges(options,lang);

	Core.addScreen(stemPrivileges);
	$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
	Core.addAction($("input[name=privilegesRadio]"),
			Core.CLICK,
			function() {
				_displayBlockUIOption = {
						onAfterShowBlockUI : function(){
						stemPrivileges._loadData();
					}
				};
				Core._showBlockUI(_displayBlockUIOption);
			},
			false
	);
</script>
<style>
	.tbutton{
		margin-top : 5px;
	}
</style>
</g:view>