<%@include file="../_include.jsp"%>

	<f:verbatim><h2></f:verbatim>
		<t:graphicImage url="/media/imgs/tab/minus.gif" id="imgToReduceOrOpen" styleClass="reduce" />
		<h:outputText value="#{msgs[resume.title]}" />
		<h:outputText escape="false"  value="&#160;"/>
		<t:graphicImage rendered="#{resume.error && groupModificationsController.saveCall}" url="/media/imgs/priv/11951.showerr_tsk.gif" />
		<t:graphicImage rendered="#{not resume.error && not resume.saved && groupModificationsController.saveCall}" url="/media/imgs/priv/17370.contended_monitor_obj.png" />
		<t:graphicImage rendered="#{resume.saved && groupModificationsController.saveCall}" url="/media/imgs/priv/14073.complete_status.gif" />
		<h:outputText escape="false"  value="&#160;"/>
		<f:verbatim><h:outputText style="color:red" value="#{msgs['DEFAULT_ERROR_OPERATION']}" rendered="#{resume.error && groupModificationsController.saveCall}" /></f:verbatim>
	<f:verbatim></h2></f:verbatim>

	<t:div id="contentToOpenOrReduce" style="margin-left : 13px; display:none;">
		<t:div styleClass="errorMessage">
			<f:verbatim><h:outputText style="color:red" value="#{msgs['DEFAULT_ERROR_ELEMENTS']}" rendered="#{resume.error && groupModificationsController.saveCall}" /></f:verbatim>
		</t:div>
		<t:div  style="margin-left:10px;width:89%;">
			<t:div id="dataDiv" style="width : 89.5%">
				<t:dataTable value="#{resume.data}"
							 var="members"
							 styleClass="personTable"
							 rowClasses="tableBody odd">

					<t:column styleClass="colInfos" headerstyleClass="tableHeader">

						<t:aliasBean alias="#{columnValue}" value="#{resume.columnValue}" >
							<t:outputText value="---" rendered="#{empty columnValue}" />
							<t:outputText value="#{columnValue}" rendered="#{not empty columnValue}" />
						</t:aliasBean>
					</t:column>

				</t:dataTable>
			</t:div>
		</t:div>
	</t:div>