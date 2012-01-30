<?xml version="1.0" encoding="UTF-8" ?>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
	xmlns:f="http://java.sun.com/jsf/core"
	xmlns:h="http://java.sun.com/jsf/html"
	xmlns:t="http://myfaces.apache.org/tomahawk"
	xmlns:e="http://commons.esup-portail.org"
	xmlns:g="http://core.escogrouperui.org/jsf">

	<!-- Dynamic Ajax Tabs -->
	<div id="escoPanels">
     	<t:aliasBean  alias="#{tabs}" value="#{groupModificationsController.tabs}">
     		<e:ul rendered="#{not empty tabs}">
	     		<t:dataList var="tab" value="#{tabs}" >
					<e:li rendered="#{tab.isPresent}">
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

</jsp:root>