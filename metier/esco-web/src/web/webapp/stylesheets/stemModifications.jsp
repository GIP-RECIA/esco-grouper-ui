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
<%@include file="_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
		<input type="image" id="onlineHelpMain" name="ONLINE_HELP_STEM_MODIFICATION_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['STEM.MODIFICATION.OF.STEM']}" />
	</div>

	<h:inputHidden id="initEsco"  value="#{stemController.initParameters}" />
	<h:inputHidden id="firstLoad" value="true" />
	<h:inputHidden id="save" value="notSave" />
	<h:inputHidden id="currentTab"  value="0" />
	<h:inputHidden id="stemName"  value="#{stemController.displayExtension}" />
	<h:inputHidden id="stemUuid"  value="#{stemController.stemUuid}" />
	<h:inputHidden id="searchPathHidden"  value="#{stemController.displayNameSearchPath}" />
	<h:inputHidden id="isCreationView"  value="#{stemController.isCreation}" />
	<h:inputHidden id="isStemModified"  value="false" />
	<h:inputHidden id="isEmptyStem"  value="#{stemController.isEmptyStem}" />

	<div style="font-weight: bold">
		<h:outputText value="#{msgs['STEM.CURRENT.LOCATION']}" />
	</div>
	<div style="padding-bottom: 10px; font-size: 14px;">
		<div class="breadCrumbHolder module">
			<div id="breadCrumb" class="breadCrumb module path"></div>
		</div>
	</div>

	<!-- Dynamic Ajax Tabs -->
	<div id="escoPanels">
     	<t:aliasBean  alias="#{tabs}" value="#{stemController.tabs}">
     		<e:ul rendered="#{not empty tabs}">
	     		<t:dataList var="tab" value="#{tabs}" >
					<e:li rendered="#{tab.isPresent}">
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
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction"  title="<h:outputText value="#{msgs['STEM.SAVE.TITLE']}" />">
		   		<a id="stemSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['STEM.SAVE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction"  title="<h:outputText value="#{msgs['STEM.CANCEL.TITLE']}" />">
		   		<a id="stemCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['STEM.CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		 	<t:div id="stemDeleteDiv" styleClass="cbutton secondAction">
		   		<f:verbatim><a id="stemDelete" href="#"  title="<h:outputText value="#{msgs['STEM_DEL_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['DELETE_GROUP_BUTTON']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		</div>
	</div>

<script type="text/javascript">
	// Synchronize tree and content
	if ($("#isCreationView").val()=="false"){
		TreePlugin.select_node("id",'<h:outputText value="#{stemController.stemUuid}" />');
	}

	if ($("#isEmptyStem").val() == "false" || $("#isCreationView").val() == "true"){
		$("#stemDeleteDiv").hide();
	}

	keys = Core.getNavParams();
	json = "";
	for ( i = 0 ; i < keys.length ; i ++){
		json = json + keys[i] + " : '" + Core.getNavParam(keys[i]) + "'";
		if (i != keys.length - 1){
			json = json + ",";
		}
	}
	eval("var opt = {" + json + "}");

	if (Core.getNavParam("fromResponse") == "AdditionSearch" ){
		$("#firstLoad").attr("value","false");
	}

	var stem = new Stem(opt);
	Core.addScreen(stem);
</script>
</g:view>