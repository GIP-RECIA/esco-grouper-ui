<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">
<input type="image" id="onlineHelpTab" name="ONLINE_HELP_PERSON_PROPERTIES_ATTRIBUTES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title='<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />' style="float:right;cursor:pointer;border:0;" />
	<h2>
		<h:outputText value="#{msgs['ATTRIBUTE.OF']}" />
		<h:outputText value="#{personAttributesController.subjectInfo.name}" />
	</h2>
	<t:div>
	<g:group name="org.esco.grouperui.person.property.attribut">
		<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
			<g:sort var="subjectAttributes" list="#{personAttributesController.subjectAttributes}" />
			<h:dataTable value="#{subjectAttributes}"
						 var="attribute"
						 rowClasses="tableBody odd, tableBody odd"
						 styleClass="personTable"
						 headerClass="tableHeader" >
					<h:column>
						<h:inputHidden value="#{attribute.key}"/>
						<h:outputText value="#{msgs[parameter.label]}" />
					</h:column>
					<h:column>
						<h:outputText value="#{attribute.values}"/>
					</h:column>
			</h:dataTable>
		</g:isVisible>
	</g:group>
	</t:div>
</g:view>
<script language="JavaScript">
	$.each($(".personTable").find("tr"),function(){
		$($(this).find("td")[0]).attr("title",Lang.getString("PERSON_PROPERTY_ATTRIBUTE_"+$(this).find("input").val()+"_TITLE"));
	});
</script>