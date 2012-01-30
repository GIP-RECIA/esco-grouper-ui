<%@include file="_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_GROUP_PROPERTIES_URL"
			src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['PROPERTIES.OF.GROUP']}" />
	</div>

	<h:inputHidden id="initEsco"  value="#{groupController.initParameters}" />
	<h:inputHidden id="groupName"  value="#{groupController.displayExtension}" />
	<h:inputHidden id="groupUuid"  value="#{groupController.groupUuid}" />
	<h:inputHidden id="searchPathHidden"  value="#{groupController.displayNameSearchPath}" />
	<h:inputHidden id="nameSearchPath"  value="#{groupController.nameSearchPath}" />
	<h:inputHidden id="parentNameSearchPath"  value="#{groupController.parentNameSearchPath}" />
	<h:inputHidden id="nameSearchDisplayPath"  value="#{groupController.displayNameSearchPath}" />
	<h:inputHidden id="parentNameSearchDisplayPath"  value="#{groupController.parentDisplayNameSearchPath}" />
	<h:inputHidden id="userRightOnGroup"  value="#{groupController.group.userRight.name}" />
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
     	<t:aliasBean  alias="#{tabs}" value="#{groupController.tabs}">
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
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['GROUP_SAVE_TITLE']}" />">
		   		<a id="groupSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SAVE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction" title="<h:outputText value="#{msgs['GROUP_CANCEL_TITLE']}" />">
		   		<a id="groupCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
	 		<t:div rendered="#{groupController.isAdmin}" styleClass="cbutton secondAction">
		   		<f:verbatim><a id="groupDelete" href="#" title="<h:outputText value="#{msgs['GROUP_DELETE_GROUP_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['DELETE_GROUP_BUTTON']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		 	<t:div rendered="#{sessionController.profileInfo['org.esco.grouperui.web.group.modification'] and groupController.isAdmin}" styleClass="cbutton secondAction">
		   		<f:verbatim><a id="groupAdmin" href="#" title="<h:outputText value="#{msgs['GROUP_ADMINISTRATE_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['ADMINISTRATE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>

		</div>
	</div>

<script type="text/javascript">

	// Synchronize tree and content
	TreePlugin.select_node("id",'<h:outputText value="#{groupController.groupUuid}" />');

	keys = Core.getNavParams();
	json = "";

	for ( i = 0 ; i < keys.length ; i ++){
		json = json + keys[i] + " : '" + Core.getNavParam(keys[i]) + "'";
		if (i != keys.length - 1){
			json = json + ",";
		}
	}
	eval("var opt = {" + json + "}");

	var group = new Group(opt);
	Core.addScreen(group);
</script>
</g:view>