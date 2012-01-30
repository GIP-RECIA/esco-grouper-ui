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