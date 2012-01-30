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