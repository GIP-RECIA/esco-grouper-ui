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

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_GROUP_MODIFICATION_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['MODIFICATION.OF.GROUP']}" />

	</div>

	<h:inputHidden id="initializationEsco"  value="#{groupModificationsController.initParameters}" />
	<h:inputHidden id="groupName"  value="#{groupModificationsController.displayExtension}" />
	<h:inputHidden id="groupUuid"  value="#{groupModificationsController.groupUuid}" />
	<h:inputHidden id="stemUuid"  value="#{groupModificationsController.stemUuid}" />
	<h:inputHidden id="searchPathHidden"  value="#{groupModificationsController.displayNameSearchPath}" />
	<h:inputHidden id="nameSearchPath"  value="#{groupModificationsController.nameSearchPath}" />
	<h:inputHidden id="parentNameSearchPath"  value="#{groupModificationsController.parentNameSearchPath}" />
	<h:inputHidden id="nameSearchDisplayPath"  value="#{groupModificationsController.displayNameSearchPath}" />
	<h:inputHidden id="parentNameSearchDisplayPath"  value="#{groupModificationsController.parentDisplayNameSearchPath}" />
	<h:inputHidden id="isCreationView"  value="#{groupModificationsController.isCreation}" />
	<h:inputHidden id="isGroupModified"  value="false" />

	<div style="font-weight: bold">
		<h:outputText value="#{msgs['CURRENT.LOCATION']}" />
	</div>
	<div style="padding-bottom: 10px; font-size: 14px;">
		<div class="breadCrumbHolder module">
			<div id="breadCrumb" class="breadCrumb module path"></div>
		</div>
	</div>

	<!-- Dynamic Ajax Tabs -->
	<div id="escoPanels">
     	<t:aliasBean  alias="#{tabs}" value="#{groupModificationsController.tabs}">
     		<e:ul rendered="#{not empty tabs}">
	     		<t:dataList var="tab" value="#{tabs}" rowIndexVar="tabIndex"  >
					<e:li rendered="#{tab.isPresent}">
						<f:verbatim><</f:verbatim>
									<t:outputText value="input type='hidden' name='#{tab.idTab}' value='#{tabIndex}'"/>
						<f:verbatim> /></f:verbatim>
						<h:outputLink id="tabId" value="#{tab.url}" title="#{msgs[tab.title]}">
							<f:verbatim><span></f:verbatim>
							<t:graphicImage value="#{tab.icone}"
						     				style="margin-bottom: -3px; border: 0pt none ;margin-right:5px;" />
							<h:outputText value="#{msgs[tab.name]}" />
							<f:verbatim></span></f:verbatim>
						</h:outputLink>
			         </e:li>
	     		</t:dataList>
	     	</e:ul>
	     </t:aliasBean>
	</div>

	<div id="buttonBar">
		<div id="buttonBarAction" class="buttonBarOpen" title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['GROUP_SAVE_TITLE']}" />">
		   		<a id="groupSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SAVE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction" title="<h:outputText value="#{msgs['GROUP_CANCEL_TITLE']}" />">
		   		<a id="groupCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		</div>
	</div>

	<script type="text/javascript">
		var groupModification = new GroupModifications();
		Core.addScreen(groupModification);
	</script>
</g:view>