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

	<h:inputHidden id="initDynamicGroup" value="#{groupDynamiqueController.initDynamicGroupController}" />
	<h:inputHidden id="ldapOpertators" value="#{groupDynamiqueController.ldapOperators}" />
	<input type="image" id="onlineHelpTab" name="ONLINE_HELP_GROUP_DYNAMIC_LDAP_REQUEST_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<h2>
		<h:outputText value="#{msgs['DYNAMIC.GROUP']}" />
	</h2>

	<t:div id="errorPanel" styleClass="errorMessage" style="visibility : hidden;">
		<h:outputText style="color:red" value="#{msgs['DYNAMIC.GROUP.ERROR']}" />
	</t:div>

	<t:div id="errorPanelLoading" styleClass="errorMessage" style="visibility : hidden;">
		<h:outputText style="color:red" value="#{msgs['DYNAMIC.GROUP.ERROR.LOADING']}"></h:outputText>
	</t:div>

	<div class="demo source" id="treeLDAP"></div>

	<div id="modalTestRule" style="width:800px; align:left;" ></div>

	<div id="divTestLdapRequest" class="cbutton secondAction" style="float:right;" title="<h:outputText value="#{msgs['TEST_LDAP_BUTTON_TITLE']}" />">
		<a id="testLdapRequest" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['TEST_LDAP_BUTTON']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	</div>
</g:view>

<script type="text/javascript">
	var groupDynamic;
	var treeLdap;
	_displayBlockUIOption = {
			onAfterShowBlockUI : function(){
				var lang = {
						NODE_AND                         : Lang.getString("NODE_AND"),
						NODE_OR                          : Lang.getString("NODE_OR"),
						NODE_NOT                         : Lang.getString("NODE_NOT"),
						NODE_CONDITION                   : Lang.getString("NODE_CONDITION"),
						NODE_DELETE                      : Lang.getString("NODE_DELETE"),
						DEFAULT_INPUT_TEXT_LABEL         : Lang.getString("DEFAULT_INPUT_TEXT_LABEL"),
						DEFAULT_COMBO_BOX_LABEL          : Lang.getString("DEFAULT_COMBO_BOX_LABEL"),
						DEFAULT_COMBO_BOX_EDITABLE_LABEL : Lang.getString("DEFAULT_COMBO_BOX_EDITABLE_LABEL")
				};

				eval("var operatorJson="+$("#ldapOpertators").val());

			     groupDynamic = new GroupDynamic(lang, operatorJson);

				 if ($("#actions").children("#divTestLdapRequest").size() == 0 ){
					  $("#divTestLdapRequest").appendTo("#actions");

					  Core.addAction($("#testLdapRequest"),
							  Core.CLICK,
							  function() {
								  var isValid = groupDynamic.getStatusOfTheLdapRequest();
						  		  groupDynamic.showOrHideErrorMessage(!isValid);
								  if (isValid) {
									  	groupDynamic.sendLdapRequest();

										_displayBlockUIOption = {
											onAfterShowBlockUI : function(){
													$.post("/" + Core.applicationContext + "/stylesheets/dynamicGroup/modalTestRule.jsf", {}, function(data) {
														$('#modalTestRule').hide();
														$("#modalTestRule").empty().append(data);
												});
											}
										}
										Core._showBlockUI(_displayBlockUIOption);
									}
						  },
						  false
					);
				 } else {
					 $("#divTestLdapRequest").remove();
				 }

				  treeLdap = $.tree.create();
				  treeLdap.init($("#treeLDAP"),
						{
							data : {
								type : "json",

								opts : 	{
											static : [{ attributes: { id : "ldapRoot" , typeNode :"ROOT"}, state: "close", data: { title : Lang.getString("NODE_ROOT"), icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/dossier_dossier.gif"}}]
										}
							},
							ui :
							{
								theme_name : "arbo"
							},
							plugins :
							{
								contextmenu      : $.extend({},groupDynamic.getMenuContext())
							},
							types:
							{
								"default" : {
									clickable	: false,
									deletable	: true,
									draggable	: false
								}
							},
							callback:{
								beforeclose : function(NODE, TREE_OBJ) { return false; }
							}
						}
					);

					Core.addScreen(groupDynamic);
		}
	};
	Core._showBlockUI(_displayBlockUIOption);
	</script>
