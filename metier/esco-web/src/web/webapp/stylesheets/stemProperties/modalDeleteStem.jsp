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
	<br />
	<br />
	<h:inputHidden id="initEsco"  value="#{stemController.initParameters}" />
	<h:inputHidden id="nameStem" value="#{stemController.displayName}" />
	<h:inputHidden id="needToRedirectParent" value="#{stemController.needToRedirectToParent}" />
	<h:inputHidden id="idParent" value="" />

	<h1 id="labelModal"></h1>
	<br />
	<br />
	<br />
	<div id="actionsSearch">
		<div class="cbutton SecondAction" title="<h:outputText value="#{msgs['MODAL_DELETE_STEM_NO_TITLE']}" />">
	   		<a id="modalNo"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['MODAL_NO']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	 	</div>
	 	<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['MODAL_DELETE_STEM_YES_TITLE']}" />">
	   		<a id="modalYes"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['MODAL_YES']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	 	</div>

	</div>
	<br />
	<br />
</g:view>
<script language="JavaScript">
$("#labelModal").empty().append(Lang.getString("STEM_DELETE_MODAL")).append("<br />").append($("#nameStem").val()).append(" ?");
$("#idParent").attr("value",$(tree.prev($("a[class=clicked]"))).attr("id"));

Core.addAction(
		$("#modalNo"),
		Core.CLICK,
		function(e){
			Core.isInBlockUiMode = false;
			$('#modalDelete').empty();
			$.unblockUI();
		},
		false
	);

Core.addAction(
		$("#modalYes"),
		Core.CLICK,
		function(e){
			$.post("/" + Core.applicationContext + "/ajax/stemController/deleteStem.jsf", {}, function(data){
				if (Core.getStatus(data)){
					_displayBlockUIOption = {
						onAfterShowBlockUI : function(){
							tree.settings.callback.onload = function(){
								if ($("#needToRedirectParent").val() == "true"){
									tree.select_branch($("li[id="+$("#idParent").val()+"]"));
									$('#modalDelete').empty();
								}
								Core._hideBlockUI(true);
								tree.settings.callback.onload = function(){
								};
							};
							tree.refresh($("li[id=:]"));
						}
					};
					Core._showBlockUI(_displayBlockUIOption);
				}
			});
		},
		false
	);
</script>