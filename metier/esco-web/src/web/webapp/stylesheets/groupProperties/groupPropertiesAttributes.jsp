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
	<input type="image" id="onlineHelpTab" name="ONLINE_HELP_GROUP_PROPERTIES_ATTRIBUTES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<h2>
		<h:outputText value="#{msgs['ATTRIBUTE.OF.GROUP']}" />
	</h2>
	<div style="padding-bottom: 10px;">
		<g:group name="org.esco.grouperui.group.property.attribut">
			<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
				<g:sort var="groupAttributes" list="#{groupPropertiesController.groupAttributes}" />
				<h:dataTable value="#{groupAttributes}"
							 var="attribute"
							 rowClasses="tableBody odd, tableBody odd"
							 styleClass="personTable"
							 headerClass="tableHeader" >
					<h:column>
						<h:inputHidden value="#{attribute.key}"/>
						<h:outputText value="#{msgs[parameter.label]}" />
					</h:column>
					<h:column>
						<h:outputText value="#{attribute.values}" />
					</h:column>
				</h:dataTable>
			</g:isVisible>
		</g:group>
	</div>

	<h2>
		<h:outputText value="#{msgs['CUSTOM.ATTRIBUTES.TYPE']}" />
	</h2>
	<div>
		<t:dataList var="typeGroup" value="#{groupPropertiesController.groupTypeAttributes}">

			<f:verbatim><h3></f:verbatim>
				<h:outputText value="#{msgs[typeGroup.key]}" />
			<f:verbatim></h3></f:verbatim>
			<t:div styleClass="dynamicGroup" rendered="#{not empty typeGroup.values}">
				<t:dataTable value="#{typeGroup.values}"
							 var="typeGroupAttribute"
							 rowClasses="tableBody odd, tableBody odd"
							 styleClass="personTable"
							 headerClass="tableHeader">
					<t:column styleClass="dynamicGroupCell">
						<t:inputHidden value="#{typeGroupAttribute.key}" />
						<t:outputText value="#{typeGroupAttribute.key}" />
					</t:column>
					<t:column>
						<t:outputText escape="false"  value="---" rendered="#{empty typeGroupAttribute.value}" />
						<t:outputText value="#{typeGroupAttribute.value}"  rendered="#{not empty typeGroupAttribute.value}" />
					</t:column>
				</t:dataTable>
			</t:div>
			<t:div styleClass="dynamicGroup" rendered="#{empty typeGroup.values}">
				<f:verbatim>
					<table class="personTable">
						<tbody>
							<tr class="tableBody odd">
								<td>
									</f:verbatim>
									<h:outputText value="#{msgs['CUSTOM.ATTRIBUTES.NO.DATA']}" />
									<f:verbatim>
								</td>
							</tr>
						</tbody>
					</table>
				</f:verbatim>
			</t:div>
		</t:dataList>

		<t:div rendered="#{empty groupPropertiesController.groupTypeAttributes}">
			<f:verbatim>
				<table class="personTable">
					<tbody>
						<tr class="tableBody odd"><td><h:outputText value="#{msgs['CUSTOM.ATTRIBUTES.NO.DATA']}" /></td></tr>
					</tbody>
				</table>
			</f:verbatim>
		</t:div>
	</div>
</g:view>
<script language="javascript">

	$.each($(".personTable").find("tr"),function(){
		$($(this).find("td")[0]).attr("title",Lang.getString("GROUP_PROPERTY_ATTRIBUTE_"+$(this).find("input").val()+"_TITLE"));
	});

	Core._hideBlockUI(true);

	$("#groupAdmin").show();
	$("#groupDelete").show();
	$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>