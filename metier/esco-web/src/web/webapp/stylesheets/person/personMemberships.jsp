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
	<input type="image" id="onlineHelpTab" name="ONLINE_HELP_PERSON_PROPERTIES_MEMBERSHIPS_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />

	<h:selectOneRadio id="membershipsRadio" styleClass="font_search"
					  value="#{personMembershipsController.defaultMembershipsRadio.label}">
		<f:selectItems value="#{personMembershipsController.listMembershipsRadio}" />
	</h:selectOneRadio>
	<h2>
		<h:outputText value="#{msgs['MEMBERSHIPS.OF.PERSON']}" />
		<h:outputText id="subtitleWarningMembership" styleClass="memberWarning" value="" />
	</h2>

	<div id="myloading_membership"></div>
	<div id="pagerGridMembership" class="scroll" style="visibility:hidden"></div>
	<table id="listMembership" class="scroll" cellpadding="0" cellspacing="0"></table>

<script language="JavaScript">

	$("input[value=MEMBERSHIP_RADIO_IMMEDIATE]").parent().attr("title",Lang.getString("PERSON_MEMBERSHIP_DIRECT_TITLE"));
	$("input[value=MEMBERSHIP_RADIO_EFFECTIVE]").parent().attr("title",Lang.getString("PERSON_MEMBERSHIP_INDIRECT_TITLE"));
	$("input[value=MEMBERSHIP_RADIO_ALL]").parent().attr("title",Lang.getString("PERSON_MEMBERSHIP_ALL_TITLE"));

	var personMembership = null;
	_displayBlockUIOption = {
			onAfterShowBlockUI : function(){

				var	options = {
						IS_MULTIPLE_VIEW_GRID 			: true,
						IS_SELECTABLE_GRID 				: true,
						NEED_FIND_DATA_REQUEST			: true,
						TYPE_OF_DATA 					: "GROUP",
						COLORATE_ADDED_ITEMS			: true,
						ACTION_ON_SELECT_ROW 			: true,
						ACTION_ON_FIND_DATA				: true,
						ACTION_ON_SELECT_ALL 			: true,
						ACTION_ON_CLICK_LINK_ITEM 		: true,
						ACTION_ON_PAGING 				: true,
						ACTION_ON_LOAD_COMPLETE 		: true,
						ACTION_ON_EXISTING_ADDED_ITEMS 	: true,
						ID_GRID 						: "#listMembership",
						ID_PAGER_GRID 					: "#pagerGridMembership",
						ID_LOADING_GRID 				: "#myloading_membership",
						URL_FIND_DATA 					: "/" + Core.applicationContext + "/ajax/personMembershipsController/findMemberships.jsf",
						URL_SELECT_ROWS 				: "/" + Core.applicationContext + "/ajax/personMembershipsController/selectedRows.jsf",
						URL_DATA_RESULT 				: "/" + Core.applicationContext + "/ajax/personMembershipsController/dataResult.jsf",
						COLUMN_SELECTED_VALUE 			: 5,
						COLUMN_ADDED_VALUE				: 6,
						COLUMN_ID_VALUE 				: 1,
						COLUMN_NAMEGROUP_VALUE			: 3,
						COLUMN_LINK_VALUE 				: 2
					};

				var lang = {
						WARNING_MESSAGE 			: Lang.getString("PERSON.MEMBERSHIP_WARNING"),
						DEL_NAV_BAR_MESSAGE_DEFAULT : Lang.getString("PERSON.MEMBERSHIP_DEL_CAPTION"),
						DEL_NAV_BAR_MESSAGE_CUSTOM 	: Lang.getString("PERSON_DEL_TITLE"),
						ADD_LABEL					: Lang.getString("PERSON.MEMBERSHIP_ADD_CAPTION"),
						ADD_TITLE					: Lang.getString("PERSON.MEMBERSHIP_ADD_TOOLTIPS"),
						DEL_LABEL					: Lang.getString("PERSON.MEMBERSHIP_DEL_CAPTION"),
						DEL_TITLE					: Lang.getString("PERSON.MEMBERSHIP_DEL_TOOLTIPS"),
						TABLE_OF_COL_NAME : [
												'id',
												Lang.getString("PERSON_MEMBERSHIP_COLUMN_1"),
												Lang.getString("PERSON_MEMBERSHIP_COLUMN_2"),
												'path',
												'select',
												'added' ],
						TABLE_OF_COL_MODEL : [{ name : 'col1'    , index : 'id'               , width : 220, resizable:false , hidden : true },
											  { name : 'colLink' , index : 'displayExtension' , width : 160, resizable:true , sortable : true },
											  { name : 'col3'    , index : 'displayName'      , width : 480, resizable:true , sortable : true },
											  { name : 'col4'    , index : 'path'             , width : 220, hidden : true },
											  { name : 'select'  , index : 'select'           , width : 220, hidden : true	},
											  { name : 'added'   , index : 'added'            , width : 220, hidden : true } ]
					};

				personMembership = new PersonMemberships(options,lang);
				Core.addScreen(personMembership);
				$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();

				Core.addAction($("input[name=membershipsRadio]"),
						Core.CLICK,
						function() {
							_displayBlockUIOption = {
									onAfterShowBlockUI : function(){
											personMembership._loadData();
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