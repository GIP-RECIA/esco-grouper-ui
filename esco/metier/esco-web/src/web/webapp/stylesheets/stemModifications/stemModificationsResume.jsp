<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
		<input type="image" id="onlineHelpMain" name="ONLINE_HELP_STEM_MODIFICATION_RESUME_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['STEM.MODIFICATION.OF.STEM']}" />
	</div>

	<h:inputHidden id="searchPathHidden"  value="#{stemController.displayNameSearchPath}" />
	<h:inputHidden id="stemUuid"  value="#{stemController.stemUuid}" />

	<div style="font-weight: bold">
		<h:outputText value="#{msgs['STEM.CURRENT.LOCATION']}" />
	</div>
	<div style="padding-bottom: 10px; font-size: 14px;">
		<div class="breadCrumbHolder module">
			<div id="breadCrumb" class="breadCrumb module path"></div>
		</div>
	</div>

	<ul id="escoTabs">
		<li id="resumeTab">
			<a href="#resumePanel">
				<span>
					<t:graphicImage url="/media/imgs/tab/12799.uddiview.gif" style="margin-bottom: -3px; border: 0pt none ;margin-right:5px;" />
					<h:outputText value="#{msgs['STEM_MODIFICATIONS_RESUME.TITLE']}" />
				</span>
			</a>
		</li>
	</ul>
	<div id="escoPanels">
		<t:div id="resumePanel">
			<t:div id="errorPanel" styleClass="errorMessage" rendered="#{stemController.errors != null && not empty stemController.errors && empty resume.jsp}">
				<t:graphicImage url="/media/imgs/priv/11951.showerr_tsk.gif" />
				<h:outputText style="color:red" value="#{msgs['STEM_MODIFICATIONS_RESUME.ERROR_DETAIL']}" />
				<t:dataList var="error" value="#{stemController.errors}">
					<f:verbatim>
					<ul>
						<li></f:verbatim>
							<h:outputText style="error" value="#{msgs[concat['org.esco.grouperui.stemmodification.resume. ,#error']]}" rendered="#{msgs[concat['org.esco.grouperui.stemmodification.resume. ,#error']] != concat['?????,org.esco.grouperui.stemmodification.resume. ,#error,?????']}" />
							<h:outputText style="error" value="#{msgs[error]}" rendered="#{msgs[concat['org.esco.grouperui.stemmodification.resume. ,#error']] == concat['?????,org.esco.grouperui.stemmodification.resume. ,#error,?????']}" />
						<f:verbatim></li>
					</ul>
					</f:verbatim>
				</t:dataList>
			</t:div>
			<t:dataList var="resume" value="#{stemController.listResume}">
				<t:div id="elementPanel" rendered="#{resume.data != null && not empty resume.data && empty resume.jsp}">
					<f:verbatim>
						<h2></f:verbatim>
							<t:graphicImage url="/media/imgs/tab/minus.gif" id="imgToReduceOrOpen" styleClass="reduce" />
							<h:outputText value="#{msgs[resume.title]}" />
							<h:outputText escape="false"  value="&#160;"/>
							<t:graphicImage rendered="#{resume.error && stemController.saveCall}" url="/media/imgs/priv/11951.showerr_tsk.gif" />
							<t:graphicImage rendered="#{not resume.error && not resume.saved && stemController.saveCall}" url="/media/imgs/priv/17370.contended_monitor_obj.png" />
							<t:graphicImage rendered="#{resume.saved && stemController.saveCall}" url="/media/imgs/priv/14073.complete_status.gif" />
							<h:outputText escape="false"  value="&#160;"/>
							<f:verbatim><h:outputText style="color:red" value="#{msgs['DEFAULT_ERROR_OPERATION']}" rendered="#{resume.error && stemController.saveCall}" /></f:verbatim>
						<f:verbatim></h2></f:verbatim>
					<t:div id="contentToOpenOrReduce"  style="display:none;">
						<t:div styleClass="errorMessage">
							<f:verbatim><h:outputText style="color:red" value="#{msgs['DEFAULT_ERROR_ELEMENTS']}" rendered="#{resume.error && stemController.saveCall}" /></f:verbatim>
						</t:div>
						<t:div  style="width : 90%">
							<t:div id="dataDiv" style="width : 90%">
								<t:dataTable value="#{resume.data}"
											 var="members"
											 styleClass="personTable personTableResume"
											 rowClasses="tableBody odd">

										<t:column styleClass="picto" headerstyleClass="pictoHeader">
											<f:facet name="header">
												<h:outputText escape="false" value="&#160;"/>
											</f:facet>
											<t:aliasBean  alias="#{typeDataValueForRow}" value="#{resume.typeDataValueForRow}">
												<t:div id="discard" styleClass="errorLign" rendered="#{typeDataValueForRow == 'ERROR'}">
													<h:inputHidden id="classIndexValue" value="#{resume.classIndexValue}" />
													<t:graphicImage url="/media/imgs/action/14763.delete.gif" style="cursor:pointer; vertical-align:middle;" />
												</t:div>
												<t:div id="ok" rendered="#{typeDataValueForRow != 'ERROR'}">
													<h:inputHidden value="#{resume.classIndexValue}" />
													<t:graphicImage url="/media/imgs/priv/14073.complete_status.gif" style="vertical-align:middle;" rendered="#{typeDataValueForRow == 'SAVED'}"/>
													<h:outputText escape="false"  value="&#160;" rendered="#{typeDataValueForRow != 'SAVED'}"/>
												</t:div>
											</t:aliasBean>
										</t:column>

										<t:columns value="#{resume.colInfos}" var="colInfos" headerstyleClass="tableHeader" >
											<f:facet name="header">
												<h:outputText value="#{msgs[colInfos.colName]}" />
											</f:facet>

											<t:aliasBean alias="#{columnValue}" value="#{resume.columnValue}" >
												<t:aliasBean  alias="#{typeDataValue}" value="#{resume.typeDataValue}">
													<t:aliasBean  alias="#{originalValue}" value="#{resume.originalValue}">

														<t:div rendered="#{colInfos.dataType != 'CHECKBOX' && (typeDataValue != 'ERROR' || colInfos.dataType != 'INPUT') && (empty resume.originalValue || resume.originalValue == null)}">
															<t:outputText value="#{columnValue}" style="color:green" rendered="#{typeDataValue == 'ADDED'}" />
															<t:outputText value="#{columnValue}" style="color:red" rendered="#{typeDataValue == 'DELETED'}" />
															<t:outputText value="#{columnValue}" rendered="#{typeDataValue == 'UPDATED'}" />
															<t:outputText value="#{columnValue}" rendered="#{typeDataValue == 'SAVED'}" />
															<t:outputText value="#{columnValue}" rendered="#{typeDataValue == 'ERROR'}" />
															<t:outputText value="---" rendered="#{empty columnValue}" />
														</t:div>

														<t:div styleClass="editableText" id="editText" forceId="#{resume.rowNum}"  rendered="#{typeDataValue == 'ERROR' && colInfos.dataType == 'INPUT' && (empty resume.originalValue || resume.originalValue == null)}">
															<f:verbatim><strong class="flc-inlineEdit-text" style="color:red"></f:verbatim><t:outputText value="#{columnValue}"/><f:verbatim></strong></f:verbatim>
														</t:div>

														<t:div rendered="#{colInfos.dataType == 'CHECKBOX' && (empty resume.originalValue || resume.originalValue == null)}">
															<t:graphicImage rendered="#{columnValue == '0'}" url="/media/imgs/priv/unchecked.png" />
															<t:graphicImage rendered="#{columnValue == '1'}" url="/media/imgs/priv/checked.png" />
															<t:outputText value="---" rendered="#{empty columnValue}" />
														</t:div>

														<t:div rendered="#{resume.originalValue != null && not empty resume.originalValue}">
															<t:graphicImage rendered="#{columnValue != originalValue && originalValue == '1' && colInfos.dataType == 'CHECKBOX'}" url="/media/imgs/priv/11951.showerr_tsk.gif" />
															<t:graphicImage rendered="#{columnValue != originalValue && originalValue == '0' && colInfos.dataType == 'CHECKBOX'}" url="/media/imgs/priv/13304.success.gif" />
															<t:graphicImage rendered="#{columnValue == originalValue && originalValue == '0' && colInfos.dataType == 'CHECKBOX'}" url="/media/imgs/priv/unchecked.png" />
															<t:graphicImage rendered="#{columnValue == originalValue && originalValue == '1' && colInfos.dataType == 'CHECKBOX'}" url="/media/imgs/priv/checked.png" />

															<t:outputText value="#{columnValue}" style="color:navy" rendered="#{columnValue != originalValue && colInfos.dataType == 'LABEL'}" />
															<t:outputText value="#{columnValue}" rendered="#{columnValue == originalValue && colInfos.dataType == 'LABEL'}" />
														</t:div>

													</t:aliasBean>
												</t:aliasBean>
											</t:aliasBean>
										</t:columns>

								</t:dataTable>
							</t:div>
						</t:div>
					</t:div>
				</t:div>
				<t:div id="elementPanelJsp" rendered="#{resume.data != null && not empty resume.data && resume.jsp != null}">
					<g:include url="#{resume.jsp}" />
				</t:div>
			</t:dataList>
		</t:div>
	</div>


	<div id="buttonBar">
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['STEM.SAVE.TITLE']}" />">
		   		<a id="groupSave" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SAVE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
			<div class="cbutton secondAction" title="<h:outputText value="#{msgs['STEM.CANCEL.TITLE']}" />">
		   		<a id="groupCancel" href="#"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['CANCEL']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		</div>
	</div>

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
			$("#resumeTab").children().attr("href",$("#resumeTab").children().attr("href").substring($("#resumeTab").children().attr("href").indexOf("#")));
		</script>
	</t:div>

<script type="text/javascript">
	$("#groupSave").focus();
	var stemResume = new StemResume();
	Core.addScreen(stemResume);

	$.each($("div[id*=contentToOpenOrReduce]"),function(){
		$(this).css("height",$(this).find("div[id*=dataDiv]").css("height"));
	});

	$.each($("img[class=reduce]"),function(){
		var idImg = $(this).attr("id");
		EscoAnimate._showAnimate($("div[id="+idImg.substring(0, idImg.lastIndexOf(":")+1) + "contentToOpenOrReduce"+"]"));
	});

</script>
</g:view>
