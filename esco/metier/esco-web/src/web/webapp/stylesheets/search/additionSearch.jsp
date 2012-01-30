<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_ADDITION_SEARCH_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['ADDITION_SEARCH_TITLE']}" />
	</div>

	<span id="idNode" style="display:none;"><h:outputText value="#{searchController.idNode}" /></span>
	<h:inputHidden id="searchPathHidden" value="#{searchController.nameIdNode}" />
	<h:inputHidden id="searchPathHiddenForPersonSearch" value="#{searchController.nameIdNode}" />
	<h:inputHidden id="groupUuid" value="#{param.groupUuid}" />
	<h:inputHidden id="onlyGroup" value="#{param.onlyGroup}" />
	<h:inputHidden id="isAllSelected" value="#{searchController.isSelectedAll}"/>
	<h:inputHidden id="theSearchStep" value="1"/>
	<h:inputHidden id="theDataOfTable" value="person"/>

	<ul id="escoTabs">
		<li id="attributeTab"><a href="#attributePanel"> <span>
		<t:graphicImage url="/media/imgs/search/17338.insp_sbook.png" style="margin-bottom: -3px; border: 0pt none; margin-right: 5px;" />
		<h:outputText value="#{msgs['SEARCH_TITLE']}" /> </span> </a></li>
	</ul>

	<!-- A collection of divs that represent the panel beneath each tab. -->
	<div id="escoPanels">
		<div id="attributePanel">
			<div style="border-bottom: 1px dotted green; margin-bottom: 10px;">
				<div style="float: left !important; width: 180px !important; height: 50px !important;">
					<h:outputText
						id="labelSearchTerm" value="#{msgs['SEARCH_TERM']}"
						styleClass="font_search labelSearch" /> <br />

					<input type="text"
						style="background: transparent url(../media/imgs/search/17338.insp_sbook.png) no-repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; padding-left: 17px;"
						value="<h:outputText value="#{searchController.additionSearch.searchTerm}" />"
						name="org.esco.grouperui.search.regexp.searchTerm" id="theTerm"
						title="<h:outputText value="#{msgs['SEARCH_TERM']}" />"
						class="validate[org.esco.grouperui.search.regexp.searchTerm]" />
				</div>
				<div style="margin-left: 200px !important; height: 50px !important;">
					<div style="float:left">
						<h:outputText
							id="labelSearchSource" value="#{msgs['SEARCH_SUBJECT_SOURCE']}"
							styleClass="font_search labelSearch" />
							<br />

						<h:selectOneRadio id="subjectSearch" styleClass="font_search"
							value="#{searchController.additionSearch.searchSubjectEnum.label}">
							<f:selectItems value="#{searchController.listSearchSubjectLocale}" />
						</h:selectOneRadio>
					</div>
					<div id="actionsSearch" style="clear:none !important; ">
						<div class="cbutton primaryAction" style="float:right;" title="<h:outputText value="#{msgs['SEARCH_BUTTON_GO_TITLE']}" />">
							<a id="search"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_TITLE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
						</div>
					</div>
				</div>
			</div>

			<div id="_idJsp1:searchGroupProperties"
				style="border-bottom: 1px dotted green; margin-bottom: 10px;"><h:outputText
				id="labelSearchFrom" value="#{msgs['SEARCH_FROM']}"
				styleClass="font_search labelSearch" /> <br />

				<div class="breadCrumbHolder module">
					<div id="breadCrumb" class="breadCrumb module"></div>
				</div>

				<h:outputText id="labelSearchGroupDisplay"
					value="#{msgs['SEARCH_DISPLAY_GROUP']}"
					styleClass="font_search labelSearch" />
					<h:selectOneRadio id="displayGroupSearch" styleClass="font_search"
					value="#{searchController.additionSearch.searchFieldEnum.label}">
					<f:selectItems value="#{searchController.listSearchFieldLocale}" />
				</h:selectOneRadio>
				<br/>
			</div>

			<div id="error" class="error font_error"></div>

			<div id="modalSearch" style="width: 690px; align:left;">
				<div id="myloading"></div>
				<div id="pagerGrid" class="scroll" style="visibility:hidden"></div>
				<table id="list" class="scroll" cellpadding="0" cellspacing="0"></table>
				<br/>
				<div id="actionsSearch2" style="clear:none !important; display:none;">
					<div class="cbutton primaryAction" style="float:right; width: 170px;" title="<h:outputText value="#{msgs['SEARCH_INDIVIDUAL_BUTTON_GO_TITLE']}" />">
						<a id="searchAgain"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_INDIVIDUAL_TITLE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
					</div>
					<div class="cbutton secondAction" style="float:right;" title="<h:outputText value="#{msgs['SEARCH_INDIVIDUAL_BUTTON_RETURN_TITLE']}" />">
						<a id="returnTerm"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_INDIVIDUAL_RETURN']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
					</div>
				</div>
				<br/><br/>
			</div>

		</div>
	</div>

	<div id="buttonBar">
		<div id="buttonBarAction" class="buttonBarOpen"  title="<h:outputText value="#{msgs['BUTTON_BAR_TITLE']}" />">
			<a href="#">&nbsp;</a>
		</div>
		<div id="actions">
			<div class="cbutton primaryAction" style="display: none;" title="<h:outputText value="#{msgs['SEARCH_BUTTON_ADD_TITLE']}" />">
		   		<a id="searchSave"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_SAVE']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		 	<div class="cbutton secondAction" title="<h:outputText value="#{msgs['SEARCH_BUTTON_RETURN_TITLE']}" />">
		   		<a id="searchReturn"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_RETURN']}"></h:outputText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
		 	</div>
		</div>
	</div>

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
			$("#attributeTab").children().attr("href",$("#attributeTab").children().attr("href").substring($("#attributeTab").children().attr("href").indexOf("#")));
		</script>
	</t:div>

	<script language="JavaScript">

	$("input[value=SEARCH_GROUP]").parent().attr("title",Lang.getString("SEARCH_GROUP_TITLE"));
	$("input[value=SEARCH_PERSON]").parent().attr("title",Lang.getString("SEARCH_PERSON_TITLE"));
	$("input[value=SEARCH_PERSON_IN_A_GROUP]").parent().attr("title",Lang.getString("SEARCH_PERSON_IN_A_GROUP_TITLE"));

	$("#breadCrumb").attr("title",Lang.getString("BREADCRUMB_TITLE"));

	$("input[value=NAME]").parent().attr("title",Lang.getString("SEARCH_NAME_TITLE"));
	$("input[value=DISPLAY_NAME]").parent().attr("title",Lang.getString("SEARCH_DISPLAY_NAME_TITLE"));
	$("input[value=DISPLAY_EXTENSION]").parent().attr("title",Lang.getString("SEARCH_DISPLAY_EXTENSION_TITLE"));

	$("#theTerm").bind(Core.KEYDOWN,function(e){
		e.stopImmediatePropagation();
	});

		var search = null;
		_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					var col1	 = Lang.getString("SEARCH_COLUMN_1");
					var col2 	 = Lang.getString("SEARCH_COLUMN_2");
					var col3 	 = Lang.getString("SEARCH_COLUMN_3");
					var error 	 = Lang.getString("SEARCH_ERROR");
					var errorAdd = Lang.getString("SEARCH_ERROR_ADD");


					var	options = {
							TYPE_OF_DATA 			: "GROUP-PERSON",
							ACTION_ON_LOAD_COMPLETE	: true,
							ACTION_ON_FIND_DATA     : true,
							IS_SELECTABLE_GRID		: true,
							ACTION_ON_SELECT_ROW	: true,
							ACTION_ON_SELECT_ALL	: true,
							ACTION_ON_PAGING		: true,
							URL_FIND_DATA 			: "/" + Core.applicationContext + "/ajax/searchController/additionSearch.jsf",
							URL_DATA_RESULT			: "/" + Core.applicationContext + "/ajax/searchController/getDataResultAdditionSearch.jsf",
							URL_SELECT_ROWS 		: "/" + Core.applicationContext + "/ajax/searchController/selectedRows.jsf",
							COLUMN_SELECTED_VALUE 	: 6,
							COLUMN_ID_VALUE 		: 1,
							COLUMN_TYPE_DATA 		: 5,
							COLUMN_NAMEGROUP_VALUE 	: 4
						};

					var lang = {
							WARNING_MESSAGE : error,
							WARNING_ADD_MESSAGE : errorAdd,
							TABLE_OF_COL_NAME : [
												'id',
												col1,
												col2,
												col3,
												'TYPECOLUMN',
												'selected' ],
							TABLE_OF_COL_MODEL :  [ {name : 'col1'   ,index : 'id'                    ,width : 220 , hidden : true  },
												    {name : 'col2'   ,index : 'attribute.displayName' ,width : 238 , resizable:true },
													{name : 'col3'   ,index : 'attribute.objectClass' ,width : 100 , resizable:true   ,sortable : true},
													{name : 'col4'   ,index : 'attribute.mail'        ,width : 304 , resizable:true   ,sortable : false},
													{name : 'col5'   ,index : 'col5'                  ,width : 220 , sortable : false ,hidden: true},
													{name : 'select' ,index : 'select'                ,width : 220 , hidden : true  }]
						};
					search = new AdditionSearch(options,lang);
					Core.addScreen(search);
					$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
				}
		};
		Core._showBlockUI(_displayBlockUIOption);
		welcome.resizeAll();

		if($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP"){
			$(".jqgrow").eq(0).children("td").each(function(){
				if($(this).html()=="GROUP"){
					setTimeout(function() {$("#modalSearch").css("display","none");},50);
				}
			});
		}

	</script>
</g:view>