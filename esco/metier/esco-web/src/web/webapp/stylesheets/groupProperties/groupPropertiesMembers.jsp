<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<input type="image" name="ONLINE_HELP_GROUP_PROPERTIES_MEMBERS_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<!-- For all selected  -->

	<h:selectOneRadio id="membersRadio" styleClass="font_search"
		value="#{groupMembersController.defaultMembersRadio.label}">
		<f:selectItems value="#{groupMembersController.listMembersRadio}" />
	</h:selectOneRadio>
	<h2>
		<h:outputText id="subtitle" value="#{msgs['MEMBERS.OF.GROUP']}" />
		<h:outputText id="subtitleWarning" styleClass="memberWarning" value="" />
	</h2>

	<div id="myloading"/>
	<div id="pagerGrid" class="scroll" style="visibility:hidden"></div>
	<table id="list" class="scroll" cellpadding="0" cellspacing="0"></table>

	<script>

	$("input[value=MEMBER_RADIO_IMMEDIATE]").parent().attr("title",Lang.getString("GROUP_MEMBERS_IMMEDIATE_TITLE"));
	$("input[value=MEMBER_RADIO_EFFECTIVE]").parent().attr("title",Lang.getString("GROUP_MEMBERS_EFFECTIVE_TITLE"));
	$("input[value=MEMBER_RADIO_ALL]").parent().attr("title",Lang.getString("GROUP_MEMBERS_ALL_TITLE"));

	var groupMember = null;
	_displayBlockUIOption = {
			onAfterShowBlockUI : function(){

			var	options = {
					IS_MULTIPLE_VIEW_GRID          : true,
					IS_SELECTABLE_GRID             : Profile.canAddOrDeleteMembersOnGroupProperties(),
					COLORATE_ADDED_ITEMS           : true,
					NEED_FIND_DATA_REQUEST         : true,
					ACTION_ON_FIND_DATA            : true,
					ACTION_ON_SELECT_ROW           : true,
					ACTION_ON_SELECT_ALL           : true,
					ACTION_ON_CLICK_LINK_ITEM      : true,
					ACTION_ON_PAGING               : true,
					ACTION_ON_LOAD_COMPLETE        : true,
					ACTION_ON_EXISTING_ADDED_ITEMS : true,
					URL_FIND_DATA                  : "/" + Core.applicationContext + "/ajax/groupMembersController/findMembers.jsf",
					URL_SELECT_ROWS                :"/" + Core.applicationContext + "/ajax/groupMembersController/selectedRows.jsf",
					URL_DATA_RESULT                :"/" + Core.applicationContext + "/ajax/groupMembersController/dataResult.jsf"
				};

			var lang = {
					WARNING_MESSAGE             : Lang.getString("MEMBER_WARNING"),
					DEL_NAV_BAR_MESSAGE_DEFAULT : Lang.getString("MEMBER_DEL_CAPTION"),
					DEL_NAV_BAR_MESSAGE_CUSTOM  : Lang.getString("MEMBER_DEL_TITLE"),
					ADD_LABEL                   : Lang.getString("MEMBER_ADD_CAPTION"),
					ADD_TITLE                   : Lang.getString("MEMBER_ADD_TOOLTIPS"),
					DEL_LABEL                   : Lang.getString("MEMBER_DEL_CAPTION"),
					DEL_TITLE                   : Lang.getString("MEMBER_DEL_TOOLTIPS"),
					TABLE_OF_COL_NAME : [
											'id',
											Lang.getString("MEMBER_COLUMN_1"),
											Lang.getString("MEMBER_COLUMN_2"),
											Lang.getString("MEMBER_COLUMN_3"),
											'typeSubject',
											'select',
											'type',
											'added' ],
					TABLE_OF_COL_MODEL : [{ name : 'col1'   , index : 'id'          , width :  50, resizable:false , hidden : true },
								    	  { name : 'colLink', index : 'displayName' , width : 210, resizable:true  },
								    	  { name : 'col3'   , index : 'objectClass' , width : 110, resizable:true  , sortable : true },
								    	  { name : 'col4'   , index : 'info'        , width : 315, resizable:true  , sortable : false },
										  { name : 'col5'   , index : 'typeSubject' , width :  50, resizable:false , hidden : true },
										  { name : 'col6'   , index : 'select'      , width :  50, resizable:false , hidden : true },
										  { name : 'col7'   , index : 'type'        , width :  50, resizable:false , hidden : true },
										  { name : 'col8'   , index : 'added'       , width :  50, resizable:false , hidden : true }]
				};


				groupMember = new GroupMember(options,lang);
				Core.addScreen(groupMember);
				$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
				Core.addAction($("input[name=membersRadio]"),
						Core.CLICK,
						function() {
							_displayBlockUIOption = {
									onAfterShowBlockUI : function(){
										groupMember._loadData();
								}
							};
							Core._showBlockUI(_displayBlockUIOption);
						},
						false
				);
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