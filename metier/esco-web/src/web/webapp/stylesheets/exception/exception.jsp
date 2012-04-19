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
<?xml version="1.0" encoding="UTF-8" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
	xmlns:f="http://java.sun.com/jsf/core"
	xmlns:h="http://java.sun.com/jsf/html"
	xmlns:t="http://myfaces.apache.org/tomahawk"
	xmlns:e="http://commons.esup-portail.org"
	xmlns:g="http://core.escogrouperui.org/jsf">

	<session>alive</session>
	<error>true</error>
	<g:view stringsVar="msgs" locale="#{sessionController.locale}">

		<div class="headerComplex centerContent error">
			<h:outputText value="#{msgs['EXCEPTION.TITLE']}" />
		</div>

		<ul id="escoTabs">
			<li id="exceptionTab">
				<a href="#exceptionPanel">
					<span>
						<t:graphicImage value="/media/imgs/tab/11951.showerr_tsk.gif" style="margin-bottom: -3px; border: 0pt none ;margin-right:5px;" />
						<h:outputText value="#{msgs['EXCEPTION.TITLE']}" />
					</span>
				</a>
			</li>
		</ul>
		<t:div id="escoPanels" forceId="true">
			<t:div id="exceptionPanel">
				<h2 class="reduce error"><h:outputText value="#{msgs['EXCEPTION.HEADER.EXCEPTION']}" /></h2>
					<t:div styleClass="errorDivMessage font_error" rendered="#{msgs[exceptionController.exceptionName] != concat['?????,#exceptionController.exceptionName,?????']}">
						<t:outputLabel value="#{msgs[exceptionController.exceptionName]}" />
					</t:div>
					<t:div styleClass="errorDivMessage font_error" rendered="#{msgs[exceptionController.exceptionName] == concat['?????,#exceptionController.exceptionName,?????']}">
						<t:outputLabel for="exceptionName" value="#{msgs['EXCEPTION.EXCEPTION.NAME']}" /> <f:verbatim>:</f:verbatim>
						<e:text id="exceptionName" value="#{exceptionController.exceptionName}" /> <br/>

						<t:outputLabel for="exceptionMessage" value="#{msgs['EXCEPTION.EXCEPTION.MESSAGE']}" /> <f:verbatim>:</f:verbatim>
						<e:text id="exceptionMessage" value="#{exceptionController.exceptionMessage}" />
					</t:div>
					<t:div styleClass="errorDivMessage font_error" id="errorHandle">
						<t:outputLabel value="#{msgs['ESCOTechnicalException']}" />
					</t:div>
			</t:div>
		</t:div>

		<div id="buttonBar">
			<div id="actions">
				<t:div styleClass="cbutton">
		   			<a id="exceptionRetourAccueil" href="#">
		   				<span>&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;<e:text value="#{msgs['EXCEPTION.LIEN_RETOUR_ACCUEIL']}" />&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</span>
		   			</a>
	   			</t:div>
			</div>
		</div>

		<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		</t:div>
	</g:view>

	<script type="text/javascript">
		$("#exceptionTab").children().attr("href",$("#exceptionTab").children().attr("href").substring($("#exceptionTab").children().attr("href").indexOf("#")));
		fluid.accessibletabs("escoTabs", "escoPanels");
		welcome.hide("west");

		$("#exceptionPanel").height($("#exceptionPanel").height() - 10);

		Core._hideBlockUI();

		if(Core.getNavParam("errorHandle")){
			$(".cbutton").css("display","none");
			$('#errorHandle').css("display","block");
		}else{
			$(".cbutton").css("display","block");
			$('#errorHandle').css("display","none");
			$("#exceptionRetourAccueil").click(function(){welcome.show("west");tree.refresh($("li[id=:]"));Core.goToIndexPage();});
		}

		Core.setNavParam("errorHandle", "false");

	</script>
</jsp:root>