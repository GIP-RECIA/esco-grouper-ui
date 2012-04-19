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
<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">
	<input type="image" name="ONLINE_HELP_STEM_MODIFICATION_ATTRIBUTES_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;cursor:pointer;border:0;" />
	<h2>
		<h:outputText value="#{msgs['STEM.ATTRIBUTE.OF.STEM']}" />
	</h2>

	<div id="escoPanels">
		<div id="attributePanel">
			<t:div rendered="#{stemModificationsAttributesController.groupInput == 'creation'}">
				<g:group name="org.esco.grouperui.stem.attribut.creation" >
					<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
						<g:sort var="stemAttributes" list="#{stemModificationsAttributesController.stemAttributes}" />
						<h:dataTable value="#{stemAttributes}"
									 var="attribute"
									 rowClasses="tableBody odd, tableBody odd"
									 styleClass="personTable"
									 headerClass="tableHeader" >
								<h:column>
									 <h:inputHidden value="#{attribute.key}"/>
									 <h:outputText value="#{msgs[parameter.label]}" />
								</h:column>
								<h:column>
									<f:verbatim><</f:verbatim>
										<h:outputText rendered="#{attribute.key != 'extension' || stemModificationsAttributesController.hasRightModificationExtension}" value="input type='text' isAttr='true' isCreate='true' class='validate[org.esco.grouperui.stem.attribut.regexp.#{attribute.key}]' value='#{attribute.values}' name='org.esco.grouperui.stem.attribut.regexp.#{attribute.key}' id='#{attribute.key}' size='100'"/>
										<h:outputText rendered="#{attribute.key == 'extension' && not stemModificationsAttributesController.hasRightModificationExtension}" value="b"/>
									<f:verbatim> /></f:verbatim>
									<h:outputText rendered="#{attribute.key == 'extension' && not stemModificationsAttributesController.hasRightModificationExtension}" value="#{attribute.values}"/>
								</h:column>
						</h:dataTable>
					</g:isVisible>
				</g:group>
			</t:div>
			<t:div rendered="#{stemModificationsAttributesController.groupInput == 'modification'}">
				<g:group name="org.esco.grouperui.stem.attribut.modification" >
					<g:isVisible var="parameter" keyName="#{attribute.key}" roleName="VIEW" >
						<g:sort var="stemAttributes" list="#{stemModificationsAttributesController.stemAttributes}" />
						<h:dataTable value="#{stemAttributes}"
									 var="attribute"
									 rowClasses="tableBody odd, tableBody odd"
									 styleClass="personTable"
									 headerClass="tableHeader" >
								<h:column>
								 	 <h:inputHidden value="#{attribute.key}"/>
									 <h:outputText value="#{msgs[parameter.label]}" />
								</h:column>
								<h:column>
									<f:verbatim><</f:verbatim>
										<h:outputText rendered="#{attribute.key != 'extension' || stemModificationsAttributesController.hasRightModificationExtension}" value="input type='text' isAttr='true' isCreate='false' class='validate[org.esco.grouperui.stem.attribut.regexp.#{attribute.key}]' value='#{attribute.values}' name='org.esco.grouperui.stem.attribut.regexp.#{attribute.key}' id='#{attribute.key}' size='100'"/>
										<h:outputText rendered="#{attribute.key == 'extension' && not stemModificationsAttributesController.hasRightModificationExtension}" value="b"/>
									<f:verbatim> /></f:verbatim>
										<h:outputText rendered="#{attribute.key == 'extension' && not stemModificationsAttributesController.hasRightModificationExtension}" value="#{attribute.values}"/>
								</h:column>
						</h:dataTable>
					</g:isVisible>
				</g:group>
			</t:div>
		</div>
	</div>
	<h:inputHidden id="originalValues" value="#{stemModificationsAttributesController.originalStemAttributes}" />

<script language="JavaScript">

	$.each($('input[isAttr=true][isCreate=true]'),function(){
		$(this).attr("title",Lang.getString("STEM_CREATION_ATTRIBUTE_"+$(this).attr("id")+"_TITLE"));
	});

	$.each($('input[isAttr=true][isCreate=false]'),function(){
		$(this).attr("title",Lang.getString("STEM_MODIFICATION_ATTRIBUTE_"+$(this).attr("id")+"_TITLE"));
	});

	$.each($(".personTable").find("tr"),function(){
		$($(this).find("td")[0]).attr("title",Lang.getString("STEM_PROPERTY_ATTRIBUTE_"+$(this).find("input").val()+"_TITLE"));
	});

	var originalValues = null;
	eval("originalValues="+$("#originalValues").val());
	Stem._attributeVal = originalValues;

	var validate = new ValidateStemAttributes(opt);
	Core.addScreen(validate);

	$("#currentTab").attr("value","0");

	$('input[isAttr=true]').unbind(Core.KEYDOWN);
	$('input[isAttr=true]').bind(Core.KEYDOWN,function(e){
		e.stopImmediatePropagation();
	});
	Core.addAction($('input[type=text]'),Core.FOCUS,function(e){e.stopPropagation();}, false);

	if ($("#isCreationView").val() == "false"){
		$('input[isAttr=true]').unbind(Core.KEYUP);
		Core.addAction($('input[isAttr=true]'),Core.KEYUP,function(e){
			e.stopImmediatePropagation();
			var result = false;
			$.each($('input[isAttr=true]'),function(){
				if ($(this).val() != Stem._attributeVal[$(this).attr("id")]){
					result = true;
				}
			});
			if (result == true){
				$("#stemSave").parent().show();
				$("#stemCancel").parent().show();
			}else{
				stem.getIsStemModified();
			}
		}, false);
	}

	if ($("#firstLoad").val() == "true" ){
		$("#firstLoad").attr("value","false");

	}else{
		setTimeout("validate.validate()",200);
	}
	$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>

</g:view>