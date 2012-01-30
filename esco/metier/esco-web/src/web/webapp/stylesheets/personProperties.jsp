<%@include file="_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_PERSON_PROPERTIES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['PROPERTIES.OF.PERSON']}" />

	</div>
	<h:inputHidden id="initEsco"  value="#{personController.initParameters}" />
	<h:inputHidden id="personId"  value="#{personController.person.id}" />
	<h:inputHidden id="isPersonModified"  value="false" />
<!-- Dynamic Ajax Tabs -->
	<div id="escoPanels">
     	<t:aliasBean  alias="#{tabs}" value="#{personController.tabs}">
     		<e:ul rendered="#{not empty tabs}">
	     		<t:dataList var="tab" value="#{tabs}" rowIndexVar="tabIndex"  >
					<e:li>
						<f:verbatim><</f:verbatim>
									<t:outputText value="input type='hidden' name='#{tab.idTab}' value='#{tabIndex}'"/>
						<f:verbatim> /></f:verbatim>
						<h:outputLink id="tabId" value="#{tab.url}" title="#{msgs[tab.title]}" style="#{tab.isPresent?'display:block':'display:none'}">
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
			<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['PERSON_BUTTON_SAVE']}" />">
		   		<a id="personSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SAVE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction" title="<h:outputText value="#{msgs['PERSON_BUTTON_CANCEL']}" />">
		   		<a id="personCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		</div>
	</div>

<script type="text/javascript">
	keys = Core.getNavParams();
	json = "";

	for ( i = 0 ; i < keys.length ; i ++){
		json = json + keys[i] + " : '" + Core.getNavParam(keys[i]) + "'";
		if (i != keys.length - 1){
			json = json + ",";
		}
	}
	eval("var opt = {" + json + "}");

	var person = new Person(opt);
	Core.addScreen(person);
</script>
</g:view>
