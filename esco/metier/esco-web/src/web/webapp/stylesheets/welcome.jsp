<%@include file="_include.jsp"%>


<%@page import="org.esco.grouperui.web.ESCOConstantes"%>
<%@page import="org.esco.grouperui.tools.property.PropertyManager"%>
<%@page import="org.esco.grouperui.web.controllers.SessionController"%>
<%@page import="java.io.IOException"%>



<%
  if (ESCOConstantes.ESCO_PORTLET_MODE.equals(PropertyManager.find("application.deployement").deType(
                String.class))
                && !SessionController.isPortlet()) {
        try {
            response.sendError(404);
        } catch (IOException e) {
        }
    }else{
%>
<e:page stringsVar="msgs" locale="#{sessionController.locale}">
<div id="westPanel" class="ui-layout-west">

	<div class="headerComplex">
		<input type="image" name="ONLINE_HELP_NAVIGUATION_AREA_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:2px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['WELCOME.NAVIGATE']}" />
	</div>

	<div class="content">
     	<t:aliasBean  alias="#{tabs}" value="#{sessionController.tabs}">
     		<e:ul styleClass="toolbar" rendered="#{not empty tabs}">
	     		<t:dataList var="tab" value="#{tabs}" >
					<e:li id="idTab" >
						<t:div styleClass="ui-icon #{tab.icone}"/>
						<h:outputText value="#{msgs[tab.name]}" />
			         </e:li>
	     		</t:dataList>
	     	</e:ul>
	     </t:aliasBean>
		<div id="arbo" class="demo source" style="margin-top:10px;">
		</div>
	</div>
</div>
<!-- Modal for delete actions. -->
<div id="modalDelete" class="modalDelete"></div>

<!-- Modal for move group.-->
<div id="modalMoveGroup" style="display: none; padding: 10px; ">
	<span id="messageStep" style="color:black; text-align: left;float: left;">&nbsp;</span>
	<br />
	<div class="progressbar">0%</div>
</div>

<!-- Modal Continu -->
	<div id="modalSave" style="display:none; cursor: default;">
	    <h1><h:outputText value="#{msgs['MODAL_CONTINUE']}" /></h1>
	    <div id="buttonBar">
		    <div id="actionsModalSave">
		        <div class="cbuttonModal thirdAction" title="<h:outputText value="#{msgs['MODAL_CANCEL_TITLE']}" />">
					<a href="#" id="change_cancel"><span><h:outputText value="#{msgs['MODAL_CONTINUE.CANCEL']}" /></span></a>
				</div>
		        <div class="cbuttonModal secondAction" title="<h:outputText value="#{msgs['MODAL_NO_TITLE']}" />">
					<a href="#" id="change_no"><span><h:outputText value="#{msgs['MODAL_CONTINUE.NO']}" /></span></a>
				</div>
				<div class="cbuttonModal primaryAction" title="<h:outputText value="#{msgs['MODAL_YES_TITLE']}" />">
		            <a href="#" id="change_yes"><span><h:outputText value="#{msgs['MODAL_CONTINUE.YES']}" /></span></a>
				</div>
			</div>
	    </div>
	</div>

	<h:inputHidden id="isServlet" value="#{sessionController.isServlet}" />
	<h:inputHidden id="appContext" value="#{sessionController.applicationContext}" />
	<h:inputHidden id="initEsco"  value="#{personController.initParameters}" />
	<h:inputHidden id="profile"  value="#{sessionController.jsonProfile}" />
	<h:inputHidden id="urlMapping"  value="#{sessionController.jsonUrlMapping}" />
	<h:inputHidden id="regExpRules" value="#{regexpController.validationRegExps}" />
	<h:inputHidden id="i18nMessages" value="#{i18nController.messages}" />

<t:div styleClass="ui-layout-north" style="overflow:hidden;" rendered="#{sessionController.isServlet}">
	<!-- Start top -->
	<t:div id="toppanel">
		<!-- The tab on top -->
		<t:div styleClass="tab">
			<f:verbatim><ul class="login">
				<li class="left">&nbsp;</li>
				<li><h:outputText value="#{msgs['WELCOME.WELCOME']}" />&nbsp;</f:verbatim><h:outputText value="#{personAttributesController.subjectInfo.mappingFieldCol['attribute.displayName']}" /><f:verbatim></li>
				<li class="sep">|</li>
				<li id="toggle">
					<a id="open" name="disconnectEscoGrouper" class="open" href="/<h:outputText value="#{sessionController.applicationContext}" />/j_spring_security_logout"><h:outputText value="#{msgs['WELCOME.LOGOUT']}" /></a>
					<a id="close" style="display: none;" class="close" href="#"></a>
				</li>
				<li class="right">&nbsp;</li>
			</ul></f:verbatim>
		</t:div>

	</t:div>
	<!-- End top -->

	<t:div styleClass="clear: both;"></t:div>
	<t:div id="header" forceId="true">
		<t:div styleClass="titre">
			<f:verbatim>ESCO-Grouper</f:verbatim>
		</t:div>
		<t:div id="logoInternet2" forceId="true">
			<t:graphicImage url="/media/imgs/internet2_logo.gif" style="height: 100px; width: 100px;"/>
		</t:div>
	</t:div>
	<t:div styleClass="bar" style="height : 8px;"></t:div>
</t:div>

<div id="mainContent"></div>

<div class="ui-layout-south ui-widget-content" style="overflow:hidden;">
	<div class="bar" style="height : 8px;"></div>
	<span class="version" id="versionAndCopyright"></span>
	<!--
		<span class="version">Version : <h:outputText value="#{sessionController.version}" /></span>
		<span class="version">Profile : <h:outputText value="#{sessionController.profil}" /></span>
	-->
</div>


  <div id="onlineHelp" class="containerPlus draggable resizable {buttons:'m,c', skin:'default', width:'500', height:'350' }" style="top:10%; left:10%;">
    <div class="no"><div class="ne"><div class="n"><img src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" style='float: left; padding-top: 2px;margin-right:7px'/><h:outputText style="font-weight:bold;" value="#{msgs['TITLE_WINDOW_HELP']}" /></div></div>
      <div class="o"><div class="e"><div class="c">
        <div class="mbcontainercontent">
          <div id="dock"> </div><div style="clear:both;"></div>
				<iframe src="" style="border:0; margin-right:30px" width="100%" height="100%"></iframe>
          </div>
      	</div>
      </div>
     </div>
     <div >
        <div class="so"><div class="se"><div class="s"> </div></div></div>
     </div>
    </div>
  </div>

<script language="JavaScript">

	// Deploy context
	Core.applicationContext = $("#appContext").val();

	// Help window
	$(".containerPlus").buildContainers({
	  containment:"document",
	  elementsPath: "/" + Core.applicationContext + "/media/imgs/elements/"
	});

	/** Profile management. */
	var jsonProfile = null;
	var jsonUrlMapping = null;
	eval("jsonProfile="+$("#profile").val());
	Profile.setProperties(jsonProfile);
	eval("jsonUrlMapping="+$("#urlMapping").val());
	Profile.setUrlMappingProperties(jsonUrlMapping);
	Core.addScreen(new ProfilePlugin());

	/** i18n management. */
	var lang = null;
	eval("lang="+$("#i18nMessages").val());
	Lang._LANG = lang;

	/** Move group management. */
	Core.addScreen(DragAndDrop);
	Core.addScreen(new MoveGroupPlugin());
	Core.addScreen(new MoveStemPlugin());

	/** RegEXP management. */
	var jsonRulesString = $("#regExpRules").val();
	eval("jsonRules = " + jsonRulesString +";");
	Validate._rules=jsonRules;

	var welcome = null;
	Core.setWaitMessage(Lang.getString("WELCOME.WAIT"));
	$.fn.jGrowl.prototype.defaults.closerTemplate = '<div>[ '+ Lang.getString("PERSON_CLOSE_ALL") + ' ]</div>';

	$(document).ready(function() {
		_displayBlockUIOption = {
				onAfterShowBlockUI : function(){

			welcome = new Welcome();
			Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{}, "#mainContent", true);
			Core.addScreen(welcome);
			}
		};
		Core._showBlockUI(_displayBlockUIOption);

		$("#versionAndCopyright").html($(".portlet-menu").html());
	});

</script>
</e:page>
<%
}
%>
