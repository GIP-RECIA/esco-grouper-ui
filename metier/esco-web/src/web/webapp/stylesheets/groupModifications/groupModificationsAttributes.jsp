<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_GROUP_MODIFICATION_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="margin-right:20px;float:right;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['MODIFICATION.OF.GROUP']}" />
	</div>

	<h:inputHidden id="initializationEsco"  value="#{groupModificationsController.initParameters}" />
	<h:inputHidden id="groupName"  value="#{groupModificationsController.displayExtension}" />
	<h:inputHidden id="groupUuid"  value="#{groupModificationsController.groupUuid}" />
	<h:inputHidden id="stemUuid"  value="#{groupModificationsController.stemUuid}" />
	<h:inputHidden id="searchPathHidden"  value="#{groupModificationsController.displayNameSearchPath}" />
	<h:inputHidden id="isCreationView"  value="#{groupModificationsController.isCreation}" />

	<div style="font-weight: bold">
		<h:outputText value="#{msgs['CURRENT.LOCATION']}" />
	</div>
	<div style="padding-bottom: 10px; font-size: 14px;">
		<div class="breadCrumbHolder module">
			<div id="breadCrumb" class="breadCrumb module path"></div>
		</div>
	</div>

	<ul id="escoTabs">
		<li id="attributeTab" title="<h:outputText value="#{msgs['ATTRIBUTE.TAB']}" />">
			<a href="#attributePanel">
				<span>
					<t:graphicImage url="/media/imgs/tab/12799.uddiview.gif" style="margin-bottom: -3px; border: 0pt none ;margin-right:5px;" />
					<h:outputText value="#{msgs['ATTRIBUTE.TAB']}" />
				</span>
			</a>
		</li>
	</ul>

	<div id="escoPanels">
		<div id="attributePanel">
			<input type="image" name="ONLINE_HELP_GROUP_MODIFICATION_ATTRIBUTES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
				<h2>
					<h:outputText value="#{msgs['ATTRIBUTE.OF.GROUP']}" />
				</h2>
			<t:div id="groupAttributesCreation" rendered="#{groupModificationsAttributesController.groupInput == 'creation'}">
				<g:group name="org.esco.grouperui.group.attribut.creation" >
					<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
						<g:sort var="groupAttributes" list="#{groupModificationsAttributesController.groupAttributes}" />
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
									<f:verbatim><input type='text' isAttr='true' isCreate='true' class='validate[org.esco.grouperui.group.attribut.regexp.</f:verbatim>
									<h:outputText value="#{attribute.key}"/>
									<f:verbatim>]' value="</f:verbatim>
									<h:outputText value="#{attribute.values}" />
									<f:verbatim>" name="org.esco.grouperui.group.attribut.regexp.</f:verbatim>
									<h:outputText value="#{attribute.key}" />
									<f:verbatim>" id="</f:verbatim>
									<h:outputText value="#{attribute.key}" />
									<f:verbatim>" size='100'/></f:verbatim>
								</h:column>
						</h:dataTable>
					</g:isVisible>
				</g:group>
			</t:div>
			<t:div id="groupAttributesModification" rendered="#{groupModificationsAttributesController.groupInput == 'modification'}">
				<g:group name="org.esco.grouperui.group.attribut.modification" >
					<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
						<g:sort var="groupAttributes" list="#{groupModificationsAttributesController.groupAttributes}" />
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
									<f:verbatim><input type='text' isAttr='true' isCreate='false' class='validate[org.esco.grouperui.group.attribut.regexp.</f:verbatim>
									<h:outputText value="#{attribute.key}"/>
									<f:verbatim>]' value="</f:verbatim>
									<h:outputText value="#{attribute.values}" />
									<f:verbatim>" name="org.esco.grouperui.group.attribut.regexp.</f:verbatim>
									<h:outputText value="#{attribute.key}" />
									<f:verbatim>" id="</f:verbatim>
									<h:outputText value="#{attribute.key}" />
									<f:verbatim>" size='100'/></f:verbatim>
								</h:column>
						</h:dataTable>
					</g:isVisible>
				</g:group>
			</t:div>
			<br>
			<t:div id="groupPrivileges">
				<h2>
					<h:outputText value="#{msgs['DEFAULT.PRIVILEGES.OF.GROUP']}" />
				</h2>
				<ul style="list-style-type:none;">
					<t:dataList var="privilege"
							   value="#{groupModificationsAttributesController.groupRights}"
							   layout="Constant"
							   rowCountVar="int"
							   rowIndexVar="int">
						<f:verbatim><li style="display: block; cursor: default;"><</f:verbatim>
									<t:outputText value="input type='checkbox' isDefaultRight='true' attr='right' id='#{privilege.value}' value='#{privilege.value}'"/>
									<t:outputText rendered="#{privilege.disabled}" value=" checked='checked'"/>
							<f:verbatim> /></f:verbatim>
							<t:outputText value="#{privilege.label}"/>
						<f:verbatim></li></f:verbatim>
					</t:dataList>
				</ul>
			</t:div>

			<div id="groupCustomTypes">
				<h2>
					<h:outputText value="#{msgs['CUSTOM.TYPES.OF.GROUP']}" />
				</h2>
				<ul style="list-style-type:none;">
					<t:dataList var="customType"
							   value="#{groupModificationsAttributesController.groupCustomTypes}"
							   layout="Constant"
							   rowCountVar="int"
							   rowIndexVar="int">
						<f:verbatim><li style="display: block; cursor: default;"><</f:verbatim>
									<t:outputText value="input type='radio' isCustomType='true' name='customType' value='#{customType.value}'"/>
									<t:outputText rendered="#{customType.disabled}" value=" checked='checked' "/>
							<f:verbatim> /></f:verbatim>
							<t:outputText value="#{customType.label}"/>
							<f:verbatim><</f:verbatim>
									<t:outputText value="input type='hidden' id='#{customType.value}' value='#{customType.contexts}'"/>
							<f:verbatim> /></f:verbatim>
						<f:verbatim></li></f:verbatim>
					</t:dataList>
				</ul>
			</div>

			<div id="groupContext">
				<h2>
					<h:outputText value="#{msgs['CONTEXT.OF.GROUP']}" />
				</h2>
				<ul style="list-style-type:none;">
					<t:dataList var="context"
							   value="#{groupModificationsAttributesController.groupContexts}"
							   layout="Constant"
							   rowCountVar="int"
							   rowIndexVar="int">
						<f:verbatim><li</f:verbatim>
									<t:outputText value=" id='context_#{context.value}'"/>
						<f:verbatim>><</f:verbatim>
									<t:outputText value="input type='checkbox' isContext='true' name='#{context.value}'  value='#{context.value}'"/>
									<t:outputText rendered="#{context.disabled}" value=" checked='checked'"/>
							<f:verbatim> /></f:verbatim>
							<t:outputText value="#{context.label}"/>
						<f:verbatim></li></f:verbatim>
					</t:dataList>
				</ul>

			</div>

		</div>
	</div>

	<div id="buttonBar">
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['GROUP_NEXT_TITLE']}" />">
		   		<a id="groupSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['GROUP_NEXT']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction" title="<h:outputText value="#{msgs['GROUP_CANCEL_TITLE']}" />">
		   		<a id="groupCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
	 		<t:div styleClass="cbutton secondAction" id="groupDeleteDiv">
		   		<f:verbatim><a id="groupDelete" href="#" title="<h:outputText value="#{msgs['GROUP_DELETE_GROUP_TITLE']}" />"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['DELETE_GROUP_BUTTON']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a></f:verbatim>
		 	</t:div>
		</div>
	</div>

	<!-- Modal Nothing -->
	<div id="modalNothingTodo" style="display:none; cursor: default">
        <h1><h:outputText value="#{msgs['MODAL_NOTHING']}" /></h1>
	    <div id="buttonBar">
		    <div id="actions">
		        <div class="cbuttonModal primaryAction">
					<a href="#" id="nochange_ok"><span>&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['MODAL_NOTHING.OK']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
				</div>
			</div>
	    </div>
	</div>

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
			$("#attributeTab").children().attr("href",$("#attributeTab").children().attr("href").substring($("#attributeTab").children().attr("href").indexOf("#")));
		</script>
	</t:div>

	<script type="text/javascript">
		$.each($('input[isAttr=true][isCreate=true]'),function(){
			$(this).attr("title",Lang.getString("GROUP_CREATION_ATTRIBUTE_"+$(this).attr("id")+"_TITLE"));
		});
		$.each($('input[isAttr=true][isCreate=false]'),function(){
			$(this).attr("title",Lang.getString("GROUP_MODIFICATION_ATTRIBUTE_"+$(this).attr("id")+"_TITLE"));
		});

		$.each($(".personTable").find("tr"),function(){
			$($(this).find("td")[0]).attr("title",Lang.getString("GROUP_PROPERTY_ATTRIBUTE_"+$(this).find("input").val()+"_TITLE"));
		});

		$.each($('input[isDefaultRight=true]'),function(){
			$(this).parent().attr("title",Lang.getString("GROUP_EDITION_RIGHT_"+$(this).attr("id")+"_TITLE"));
		});

		$.each($('input[isCustomType=true]'),function(){
			$(this).parent().attr("title",Lang.getString("GROUP_EDITION_CUSTOMTYPE_"+$(this).attr("value")+"_TITLE"));
		});

		$.each($('input[isContext=true]'),function(){
			$(this).parent().attr("title",Lang.getString("GROUP_EDITION_CONTEXT_"+$(this).attr("value")+"_TITLE"));
		});

		if ($("#isCreationView").val()=="true" ){
			$("#groupDeleteDiv").hide();
		}

		// Synchronize tree and content
		if ($("#isCreationView").val()=="true" ){
			TreePlugin.select_node("id",'<h:outputText value="#{groupModificationsController.stemUuid}" />');
		}else{
			TreePlugin.select_node("id",'<h:outputText value="#{groupModificationsController.groupUuid}" />');
		}

		var keys = Core.getNavParams();
		var json = "";

		for ( i = 0 ; i < keys.length ; i ++){
			json = json + keys[i] + " : '" + Core.getNavParam(keys[i]) + "'";
			if (i != keys.length - 1){
				json = json + ",";
			}
		}
		eval("var opt = {" + json + "}");

		var group = new GroupModificationsAttributes(opt);
		Core.addScreen(group);
		var validate = new ValidateGroupAttributes(opt);
		Core.addScreen(validate);

		Core.addAction($('input'),Core.KEYDOWN,function(e){e.stopPropagation();}, false);

		$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();

		$(document).ready(function(){
			validate.updateContexts();
		});
	</script>

</g:view>