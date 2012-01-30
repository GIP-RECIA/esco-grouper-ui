<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">
<input type="image" name="ONLINE_HELP_GROUP_PROPERTIES_MEMBERS_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<br />
	<h2>
		<h:outputText id="subtitle" value="#{msgs['MEMBERS.OF.GROUP']}" />
		<h:outputText id="subtitleWarning" styleClass="memberWarning" value="" />
	</h2>

	<div id="myloading"/>
	<div id="pagerGrid" class="scroll" style="visibility:hidden"></div>
	<table id="list" class="scroll" cellpadding="0" cellspacing="0"></table>


	<script>
	var groupDynamicMember = null;
	_displayBlockUIOption = {
			onAfterShowBlockUI : function(){

			var	options = {
					IS_MULTIPLE_VIEW_GRID : true,
					IS_SELECTABLE_GRID : false,
					COLORATE_ADDED_ITEMS:true,
					NEED_FIND_DATA_REQUEST:true,
					ACTION_ON_SELECT_ROW : true,
					ACTION_ON_FIND_DATA : true,
					ACTION_ON_SELECT_ALL : true,
					ACTION_ON_CLICK_LINK_ITEM : true,
					ACTION_ON_PAGING : true,
					ACTION_ON_LOAD_COMPLETE : true,
					ACTION_ON_EXISTING_ADDED_ITEMS : true,
					URL_FIND_DATA : "/" + Core.applicationContext + "/ajax/groupDynamicMembersController/findMembers.jsf",
					URL_SELECT_ROWS :"/" + Core.applicationContext + "/ajax/groupDynamicMembersController/selectedRows.jsf",
					URL_DATA_RESULT :"/" + Core.applicationContext + "/ajax/groupDynamicMembersController/dataResult.jsf"
				};

			var lang = {
					WARNING_MESSAGE :'<h:outputText style="color:red;" value="#{msgs['MEMBER_WARNING']}" />',
					DEL_NAV_BAR_MESSAGE_DEFAULT : '<h:outputText value="#{msgs['MEMBER_DEL_CAPTION']}" />',
					DEL_NAV_BAR_MESSAGE_CUSTOM : '<h:outputText value="#{msgs['MEMBER_DEL_TITLE']}" />',
					ADD_LABEL:'<h:outputText value="#{msgs['MEMBER_ADD_CAPTION']}" />',
					ADD_TITLE:'<h:outputText value="#{msgs['MEMBER_ADD_TOOLTIPS']}" />',
					DEL_LABEL:'<h:outputText value="#{msgs['MEMBER_DEL_CAPTION']}" />',
					DEL_TITLE:'<h:outputText value="#{msgs['MEMBER_DEL_TOOLTIPS']}" />',
					TABLE_OF_COL_NAME : [
											'id',
											'<h:outputText value="#{msgs['MEMBER_COLUMN_1']}" />',
											'<h:outputText value="#{msgs['MEMBER_COLUMN_2']}" />',
											'<h:outputText value="#{msgs['MEMBER_COLUMN_3']}" />',
											'typeSubject',
											'select',
											'type',
											'added' ],
					TABLE_OF_COL_MODEL : [
								       		{ name : 'col1', index : 'id', width : 50, resizable:false,hidden : true },
								    		{ name : 'colLink', index : 'displayName', resizable:false,width : 210 },
								    		{ name : 'col3', index : 'objectClass', sortable : true, resizable:false,width : 110 },
								    		{ name : 'col4', index : 'info', sortable : false, resizable:false,width : 315 },
											{ name : 'col5', index : 'typeSubject', width : 50, resizable:false,hidden : true },
											{ name : 'col6', index : 'select', width : 50, resizable:false,hidden : true },
											{ name : 'col7', index : 'type', width : 50, resizable:false,hidden : true },
											{ name : 'col8', index : 'added', width : 50, resizable:false,hidden : true }]
				};


				groupDynamicMember = new GroupDynamicMember(options,lang);

				Core.addScreen(groupDynamicMember);
			}
		};
		Core._showBlockUI(_displayBlockUIOption);
	</script>


	<style>
		.tbutton{
			margin-top : 5px;
		}
	</style>
</g:view>