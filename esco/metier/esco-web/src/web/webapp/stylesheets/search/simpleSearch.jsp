<%@include file="../_include.jsp"%>
<g:view stringsVar="msgs" locale="#{sessionController.locale}">

	<div class="headerComplex centerContent">
	<input type="image" id="onlineHelpMain" name="ONLINE_HELP_SIMPLE_SEARCH_URL" src="/<h:outputText value="#{sessionController.applicationContext}"/>/media/imgs/action/help.gif" title="<h:outputText value="#{msgs['ICON_HELP_TITLE']}" />" style="float:right;margin-right:20px;cursor:pointer;border:0;" />
		<h:outputText value="#{msgs['SEARCH_TITLE']}" />

	</div>

	<span id="idNode" style="display:none;"><h:outputText value="#{searchController.idNode}" /></span>

	<h:inputHidden id="searchPathHidden" value="#{searchController.nameIdNode}" />
	<h:inputHidden id="searchPathHiddenForPersonSearch" value="#{searchController.nameIdNode}" />

	<ul id="escoTabs">
		<li id="attributeTab"><a href="#attributePanel"><span>
		<t:graphicImage url="/media/imgs/search/17338.insp_sbook.png" style="margin-bottom: -3px; border: 0pt none; margin-right: 5px;" />
		<h:outputText value="#{msgs['SEARCH_TITLE']}" /> </span></a></li>
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
						value="" name="org.esco.grouperui.search.regexp.searchTerm" id="theTerm"
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
							value="#{searchController.defaultSimpleSearchSubjectEnum}">
							<f:selectItems value="#{searchController.listSearchSubjectLocale}" />
						</h:selectOneRadio>
					</div>
					<div id="actionsSearch" style="clear:none; !important">
						<div class="cbutton primaryAction" style="float:right;" title="<h:outputText value="#{msgs['SEARCH_BUTTON_GO_TITLE']}" />">
							<a id="search"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h:outputText value="#{msgs['SEARCH_TITLE']}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
						</div>
					</div>
				</div>
			</div>

			<div id="searchGroupProperties"
				class="searchGroupProperties"
				style="border-bottom: 1px dotted green; margin-bottom: 10px;">

				<h:outputText id="labelSearchFrom" value="#{msgs['SEARCH_FROM']}" styleClass="font_search labelSearch" /> <br />

				<div class="breadCrumbHolder module">
					<div id="breadCrumb" class="breadCrumb module"></div>
				</div>

				<h:outputText id="labelSearchGroupDisplay"
					value="#{msgs['SEARCH_DISPLAY_GROUP']}"
					styleClass="font_search labelSearch" />
					<h:selectOneRadio id="displayGroupSearch" styleClass="font_search"
					value="#{searchController.defaultSearchFieldEnum}">
					<f:selectItems value="#{searchController.listSearchFieldLocale}" />
				</h:selectOneRadio>
				<br/>
			</div>

			<div id="error" class="error font_error"></div>
			<div id="myloading"></div>
			<div id="pagerGrid" class="scroll" style="visibility:hidden;"></div>
			<table id="list" class="scroll" style="width:100%" cellpadding="0" cellspacing="0"></table>

		</div>
	</div>

	<t:div styleClass="ui-layout-north" rendered="#{sessionController.isServlet}">
		<script type="text/javascript">
			$("#attributeTab").children().attr("href",$("#attributeTab").children().attr("href").substring($("#attributeTab").children().attr("href").indexOf("#")));
		</script>
	</t:div>

<script language="JavaScript" >

	$("input[value=SEARCH_GROUP]").parent().attr("title",Lang.getString("SEARCH_GROUP_TITLE"));
	$("input[value=SEARCH_PERSON]").parent().attr("title",Lang.getString("SEARCH_PERSON_TITLE"));

	$("#breadCrumb").attr("title",Lang.getString("BREADCRUMB_TITLE"));

	$("input[value=NAME]").parent().attr("title",Lang.getString("SEARCH_NAME_TITLE"));
	$("input[value=DISPLAY_NAME]").parent().attr("title",Lang.getString("SEARCH_DISPLAY_NAME_TITLE"));
	$("input[value=DISPLAY_EXTENSION]").parent().attr("title",Lang.getString("SEARCH_DISPLAY_EXTENSION_TITLE"));

	$("#theTerm").bind(Core.KEYDOWN,function(e){
		e.stopImmediatePropagation();
	});

	$("input[name=subjectSearch][value=SEARCH_PERSON_IN_A_GROUP]").parent().css("display","none");

	var col1  = Lang.getString("SEARCH_COLUMN_1");
	var col2  = Lang.getString("SEARCH_COLUMN_2");
	var col3  = Lang.getString("SEARCH_COLUMN_3");
	var error = Lang.getString("SEARCH_ERROR");

	var	options = {
			TYPE_OF_DATA 				: "GROUP-PERSON",
			ACTION_ON_CLICK_LINK_ITEM 	: true,
			ACTION_ON_LOAD_COMPLETE		: true,
			URL_FIND_DATA 				: "/" + Core.applicationContext + "/ajax/searchController/simpleSearch.jsf",
			URL_DATA_RESULT	 			: "/" + Core.applicationContext + "/ajax/searchController/getDataResultSimpleSearch.jsf",
			COLUMN_SELECTED_VALUE 		: 6,
			COLUMN_ID_VALUE 			: 1,
			COLUMN_TYPE_DATA 			: 5,
			COLUMN_NAMEGROUP_VALUE 		: 4,
			COLUMN_LINK_VALUE 			: 2
		};

	var lang = {
			WARNING_MESSAGE :error,
			TABLE_OF_COL_NAME : ['id',
		            				col1,
		            				col2,
		            				col3,
		            				'TYPECOLUMN',
		            				'selected' ],
			TABLE_OF_COL_MODEL : [{name : 'col1'   ,index : 'id'                   ,width : 220 ,hidden : true  },
								  {name : 'colLink',index : 'attribute.displayName',width : 270 ,resizable:true },
								  {name : 'col3'   ,index : 'attribute.objectClass',width : 100 ,resizable:true ,sortable : true},
								  {name : 'col4'   ,index : 'attribute.mail'       ,width : 304 ,resizable:true ,sortable : false},
								  {name : 'col5'   ,index : 'col5'                 ,width : 220 ,hidden : true  },
								  {name : 'col6'   ,index : 'selected'             ,width : 220 ,hidden : true  }]
		};

	var search = new SimpleSearch(options,lang);
	Core.addScreen(search);
	$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus();
</script>
</g:view>