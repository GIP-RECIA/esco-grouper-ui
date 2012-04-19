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
	<input type="image" id="onlineHelpTab" name="ONLINE_HELP_PERSON_PROPERTIES_SUBSCRIPTIONS_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<h:inputHidden id="loginPerson" value="#{personController.person.name}" />
	<h2>
		<h:outputText id="titleOfSubscriptions" value="#{msgs['SUBSCRIPTIONS.OF.PERSON']}" />
	</h2>

	<div id="myloading_subscriptions"></div>
	<div id="pagerGridSubscriptions" class="scroll" style="visibility:hidden"></div>
	<table id="listSubscriptions" class="scroll" cellpadding="0" cellspacing="0"></table>

<script language="JavaScript">
	/** Add the person 's login in the title. */
	$("#titleOfSubscriptions").append(" "+$("#loginPerson").val());

	var personSubscriptions = null;
	_displayBlockUIOption = {
			onAfterShowBlockUI : function(){

				var	options = {
						IS_MULTIPLE_VIEW_GRID     		: false,
						IS_SELECTABLE_GRID 				: false,
						NEED_FIND_DATA_REQUEST      	: true,
						TYPE_OF_DATA 					: "GROUP",
						COLORATE_ADDED_ITEMS			: false,
						ACTION_ON_SELECT_ROW 			: false,
						ACTION_ON_CLICK_LINK_ITEM 		: true,
						ACTION_ON_LOAD_DATA_IF_NO_DATA 	: true,
						ACTION_ON_PAGING 				: false,
						ACTION_ON_LOAD_COMPLETE 		: true,
						ACTION_ON_EXISTING_ADDED_ITEMS 	: false,
						ID_GRID 						: "#listSubscriptions",
						ID_PAGER_GRID 					: "#pagerGridSubscriptions",
						ID_LOADING_GRID 				: "#myloading_subscriptions",
						URL_FIND_DATA	 				: "/" + Core.applicationContext + "/ajax/personSubscriptionsController/findSubscriptions.jsf",
						URL_DATA_RESULT 				: "/" + Core.applicationContext + "/ajax/personSubscriptionsController/dataResult.jsf",
						URL_SEND_SUBSCRIPTION 			: "/" + Core.applicationContext + "/ajax/personSubscriptionsController/subscribeOrUnsubscribeToGroup.jsf",
						COLUMN_ID_VALUE 				: 1,
						COLUMN_NAMEGROUP_VALUE 			: 6,
						COLUMN_LINK_VALUE 				: 2
					};

				var lang = {
						CLOSE_ALL				 	: Lang.getString("PERSON_CLOSE_ALL"),
						PERSON_IS_SUBSCRIBED		: Lang.getString("PERSON_IS_SUBSCRIBED"),
						PERSON_IS_NOT_SUBSCRIBED	: Lang.getString("PERSON_IS_NOT_SUBSCRIBED"),
						TO_SUBSCRIBE				: Lang.getString("TO_SUBSCRIBE"),
						TO_UNSUBSCRIBE				: Lang.getString("TO_UNSUBSCRIBE"),
						TABLE_OF_COL_NAME : [
												'id',
												Lang.getString("PERSON_SUBSCRIPTIONS_COLUMN_1"),
												Lang.getString("PERSON_SUBSCRIPTIONS_COLUMN_2"),
												Lang.getString("PERSON_SUBSCRIPTIONS_COLUMN_3"),
												'actions',
												'path' ],
						TABLE_OF_COL_MODEL : [{ name : 'col1'    , index : 'id'               , width : 220, resizable:false , hidden : true },
											  { name : 'colLink' , index : 'displayExtension' , width : 160, resizable:true  , sortable : true },
											  { name : 'col3'    , index : 'displayName'      , width : 380, resizable:true  , sortable : true },
											  { name : 'col4'    , index : 'subscriptions'    , width : 220, sortable : false },
											  { name : 'col4'    , index : 'actions'          , width : 220, hidden : true    },
											  { name : 'path'    , index : 'path'             , width : 220, hidden : true    }]
						};

				personSubscriptions = new PersonSubscriptions(options,lang);
				Core.addScreen(personSubscriptions);
				$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
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