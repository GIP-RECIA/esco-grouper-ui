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
		<input type="image" id="onlineHelpMain" name="ONLINE_HELP_STEM_PROPERTIES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['STEM.PROPERTIES.OF.STEM']}" />
	</div>

	<h:inputHidden id="initEsco"  value="#{stemController.initParameters}" />
	<h:inputHidden id="searchPathHidden"  value="#{stemController.displayNameSearchPath}" />
	<h:inputHidden id="stemUuid"  value="#{stemController.stemUuid}" />
	<h:inputHidden id="isEmptyStem"  value="#{stemController.isEmptyStem}" />

	<div style="font-weight: bold">
		<h:outputText value="#{msgs['STEM.CURRENT.LOCATION']}" />
	</div>
	<div style="padding-bottom: 10px; font-size: 14px;">
		<div class="breadCrumbHolder module">
			<div id="breadCrumb" class="breadCrumb module path"></div>
		</div>
	</div>

	<ul id="escoTabs">
		<li id="attributeTab" title="<h:outputText value="#{msgs['STEM.ATTRIBUTE.TAB']}" />">
			<a href="#attributePanel">
				<span>
					<t:graphicImage url="/media/imgs/tab/12799.uddiview.gif" style="margin-bottom: -3px; border: 0pt none ;margin-right:5px;" />
					<h:outputText value="#{msgs['STEM.ATTRIBUTE']}" />
				</span>
			</a>
		</li>
	</ul>

	<div id="escoPanels">
		<div id="attributePanel">
		    <h2>
				<h:outputText value="#{msgs['STEM.ATTRIBUTE.OF.STEM']}" />
			</h2>
			<g:group name="org.esco.grouperui.stem.property.attribut">
				<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
					<g:sort var="stemAttributes" list="#{stemController.stemAttributes}" />
					<h:dataTable value="#{stemAttributes}"
								 var="attribute"
								 rowClasses="tableBody odd, tableBody odd"
								 styleClass="personTable"
								 headerClass="tableHeader" >
							<h:column>
								<h:inputHidden value="#{attribute.key}"/>
								<h:outputText value="#{msgs[parameter.label]}" />
							</h:column>
							<h:column>
								<h:outputText escape="false"  value="&#160;" rendered="#{empty attribute.values}"/>
								<h:outputText value="#{attribute.values}" />
							</h:column>
					</h:dataTable>
				</g:isVisible>
			</g:group>
		</div>
	</div>

	<div id="buttonBar">
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<t:div rendered="#{stemController.hasCreate}" styleClass="cbutton thirdAction">
		   		<f:verbatim><a id="stemCreateGroup" href="#" title="<h:outputText value="#{msgs['STEM_CREATE_GROUP_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['STEM.CREATE.GROUP']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		 	<t:div rendered="#{stemController.hasStem}" styleClass="cbutton secondAction">
		   		<f:verbatim><a id="stemCreateStem" href="#" title="<h:outputText value="#{msgs['STEM_CREATE_STEM_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['STEM.CREATE.STEM']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		 	<t:div id="stemDeleteDiv" rendered="#{stemController.hasStem}" styleClass="cbutton secondAction">
		   		<f:verbatim><a id="stemDelete" href="#" title="<h:outputText value="#{msgs['STEM_DEL_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['DELETE_GROUP_BUTTON']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
			<t:div rendered="#{stemController.hasStem}" styleClass="cbutton primaryAction">
		   		<f:verbatim><a id="stemManage" href="#" title="<h:outputText value="#{msgs['STEM_ADMINISTRATE_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['STEM.MANAGE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		</div>
	</div>

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
			$("#attributeTab").children().attr("href",$("#attributeTab").children().attr("href").substring($("#attributeTab").children().attr("href").indexOf("#")));
		</script>
	</t:div>

<script type="text/javascript">

	$.each($(".personTable").find("tr"),function(){
		$($(this).find("td")[0]).attr("title",Lang.getString("STEM_PROPERTY_ATTRIBUTE_"+$(this).find("input").val()+"_TITLE"));
	});

	if (!Profile.canAccessToStemModification()){
		$("#stemManage").hide();
	}

	if ($("#isEmptyStem").val() == "false"){
		$("#stemDeleteDiv").hide();
	}

	// Synchronize tree and content
	TreePlugin.select_node("id",'<h:outputText value="#{stemController.stemUuid}" />');

	var stemProperties = new StemProperties();
	Core.addScreen(stemProperties);
	Core._hideBlockUI();
</script>
</g:view>
