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
	<br />
	<h2>
		<h:outputText value="#{msgs['ATTRIBUTE.OF.GROUP']}" />
	</h2>

	<h:inputHidden id="initEsco"  value="#{groupController.initParameters}" />
	<div style="padding-bottom: 10px;">
		<g:group name="org.esco.grouperui.group.property.attribut">
			<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
				<g:sort var="groupAttributes" list="#{groupPropertiesController.groupAttributesFromRequest}" />
				<h:dataTable value="#{groupAttributes}"
							 var="attribute"
							 rowClasses="tableBody odd, tableBody odd"
							 styleClass="personTable"
							 headerClass="tableHeader" >
					<h:column>
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
		<t:dataList var="dynamicGroup" value="#{groupPropertiesController.groupTypeAttributes}">

			<f:verbatim><h3></f:verbatim>
				<h:outputText value="#{msgs[dynamicGroup.key]}" />
			<f:verbatim></h3></f:verbatim>
			<t:div styleClass="dynamicGroup">
				<t:dataTable value="#{dynamicGroup.values}"
							 var="dynamicAttribute"
							 rowClasses="tableBody odd, tableBody odd"
							 styleClass="personTable"
							 headerClass="tableHeader">
					<t:column styleClass="dynamicGroupCell">
						<t:outputText value="#{dynamicAttribute.key}" />
					</t:column>
					<t:column>
						<t:outputText value="#{dynamicAttribute.value}" />
					</t:column>
				</t:dataTable>
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
	<br />
	<br />
		<div id="actionsSearch">
		 	<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['MODAL_GROUP_RETURN_TITLE']}" />">
		   		<a id="modalReturn"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['PERSON_CLOSE']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		</div>
	<br />
	<br />
</g:view>
<script language="JavaScript">
	Core.addAction(
		$("#modalReturn"),
		Core.CLICK,
		function(e){
			Core.isInBlockUiMode = false;
			$.unblockUI();
			$("#modalAttribute").empty();
		},
		false
	);
</script>