<%@include file="../_include.jsp"%>

<g:view stringsVar="msgs" locale="#{sessionController.locale}">
	<h:inputHidden id="initEsco"  value="#{personController.initParameters}" />

	<div id="modalPanel" style="width: 800px;">
	<br />
		<h2 style="text-align: left;">
			<h:outputText value="#{msgs['ATTRIBUTE.OF']}" />
			<h:outputText value="#{personAttributesController.subjectInfo.name}" />
		</h2>
		<br />
		<br />
		<g:group name="org.esco.grouperui.person.property.attribut">
			<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
				<g:sort var="subjectAttributes" list="#{personAttributesController.subjectAttributes}" />
				<h:dataTable value="#{subjectAttributes}"
							 var="attribute"
							 rowClasses="tableBody odd, tableBody odd"
							 styleClass="personTable"
							 headerClass="tableHeader" >
						<h:column>
							<h:outputText value="#{msgs[parameter.label]}" />
						</h:column>
						<h:column>
							<h:outputText value="#{attribute.values}"/>
						</h:column>
				</h:dataTable>
			</g:isVisible>
		</g:group>
	</div>
	<br />
	<br />
	<div id="actionsSearch">
	 	<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['MODAL_PERSON_RETURN_TITLE']}" />">
	   		<a id="modalReturn"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['PERSON_CLOSE']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	 	</div>
	</div>
	<br />
	<br />
</g:view>
<script language="JavaScript">

	Core.isInBlockUiMode = true;

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