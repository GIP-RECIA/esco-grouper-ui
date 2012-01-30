<%@include file="../_include.jsp"%>
<style>
GridHeader td, tr {
	padding-right:50px;
	}
</style>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">
	<div id="modalPanel" style="width: 800px;">
	<br />
		<h2 style="text-align: left;">
			<h:outputText value="#{msgs['REQUEST.RESULTS']}" />
		</h2>
		<br />
		<div class="ldaprequest">
			<h:outputText value="#{groupDynamiqueController.ldapRequest}" />
		</div>
		<br />
		<br />
		<div align="center">
			<div id="myloading"></div>
			<div id="pagerGrid" class="scroll" style="display:none;"></div>
			<table id="list" class="scroll" style="width:100%" cellpadding="0" cellspacing="0"></table>
		</div>
	</div>
	<br />
	<br />
	<div id="actions">
		<div class="cbutton primaryAction" title="<h:outputText value="#{msgs['CLOSE_TITLE_LDAP']}" />">
	   		<a id="modalReturn"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['PERSON_CLOSE']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
	 	</div>
	</div>
	<br />
	<br />

	<script>

		var col1 = '<h:outputText value="#{msgs['LDAP_RESULT_COLUMN_1']}" />';
		var col2 = '<h:outputText value="#{msgs['LDAP_RESULT_COLUMN_2']}" />';
		var col3 = '<h:outputText value="#{msgs['LDAP_RESULT_COLUMN_3']}" />';


		var	options = {
				IS_MULTIPLE_VIEW_GRID : false,
				IS_SELECTABLE_GRID : false,
				NEED_FIND_DATA_REQUEST: false,
				COLORATE_ADDED_ITEMS:false,
				ACTION_ON_SELECT_ROW : false,
				ACTION_ON_SELECT_ALL : false,
				ACTION_ON_CLICK_LINK_ITEM : false,
				ACTION_ON_PAGING : false,
				ACTION_ON_LOAD_COMPLETE : true,
				HIDE_BLOCK_UI_ON_LOAD_COMPLETE : false,
				ACTION_ON_EXISTING_ADDED_ITEMS : false,
				GRID_HEIGHT : "250px",
				ID_GRID : "#list",
				ID_PAGER_GRID : "#pagerGrid",
				ID_LOADING_GRID :"#myloading",
				URL_DATA_RESULT :"/" + Core.applicationContext + "/ajax/groupDynamiqueController/getLdapRequestResult.jsf"
			};

		var lang = {
				TABLE_OF_COL_NAME : [
				     				'id',
				    				col1,
				    				col2,
				    				col3,
				    				'TYPECOLUMN',
				    				'selected' ],
				TABLE_OF_COL_MODEL :[
										{name : 'col1',index : 'id',hidden : true},
										{name : 'col2',index : 'attribute.displayName',resizable:false,width : 270},
										{name : 'col3',index : 'attribute.objectClass',resizable:false,sortable : true,width : 150},
										{name : 'col4',resizable:false,index : 'attribute.mail',sortable : false,width : 292},
										{name : 'col5',index : 'col5',sortable : false,hidden: true},
										{name : 'col6',index : 'selected',hidden : true}]
			};



		var resultOfRequest = new ResultOfRequest(options,lang);

		Core.addScreen(resultOfRequest);

	</script>
</g:view>