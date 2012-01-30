var EscoGridItemFocus={item:null};
var functionClick=function(){if($("input[id=cb_jqg]:checked").val()=="on"){_this._selectType="all"
}else{_this._selectType="unselectall"
}_this._sendSelectedRows()
};
var EscoGrid={_options:{IS_MULTIPLE_VIEW_GRID:false,TYPE_OF_DATA:"GROUP-PERSON",IS_SELECTABLE_GRID:false,NEED_FIND_DATA_REQUEST:true,ACTION_ON_FIND_DATA:false,ACTION_ON_SELECT_ROW:false,ACTION_ON_SELECT_ALL:false,ACTION_ON_CLICK_LINK_ITEM:false,ACTION_ON_PAGING:false,ACTION_ON_LOAD_DATA_IF_NO_DATA:false,ACTION_ON_LOAD_COMPLETE:false,COLORATE_ADDED_ITEMS:false,ACTION_ON_EXISTING_ADDED_ITEMS:false,HIDE_BLOCK_UI_ON_LOAD_COMPLETE:true,URL_FIND_DATA:"",URL_SELECT_ROWS:"",URL_DATA_RESULT:"",GRID_HEIGHT:"auto",ID_GRID:"#list",ID_PAGER_GRID:"#pagerGrid",ID_LOADING_GRID:"#myloading",COLUMN_SELECTED_VALUE:6,COLUMN_ADDED_VALUE:8,COLUMN_ID_VALUE:1,COLUMN_TYPE_DATA:7,COLUMN_NAMEGROUP_VALUE:4,COLUMN_LINK_VALUE:2,DEL_NAV_BAR_POSITION:1,ROW_LIST:[10,20,30,50,100]},_lang:{DEL_NAV_BAR_MESSAGE_DEFAULT:"",DEL_NAV_BAR_MESSAGE_CUSTOM:"",ADD_LABEL:"",ADD_TITLE:"",DEL_LABEL:"",DEL_TITLE:"",TABLE_OF_COL_NAME:null,TABLE_OF_COL_MODEL:null},_theNavBar:null,nbRowSelected:0,isExistingAddedItems:false,_selectType:"undefined",_alreadyLoad:false,init:function(A,B){this._options=$.extend({},this._options,A||{});
this._lang=$.extend({},this._lang,B||{})
},fire:function(){if(this._options.IS_SELECTABLE_GRID==false){this._options.COLUMN_ADDED_VALUE--;
this._options.COLUMN_ID_VALUE--;
this._options.COLUMN_LINK_VALUE--;
this._options.COLUMN_NAMEGROUP_VALUE--;
this._options.COLUMN_TYPE_DATA--;
this._options.COLUMN_SELECTED_VALUE--
}var A=this.doOnFire();
if(A){this._loadData()
}},doOnFire:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnFire")
},getPostDataToFindDataRequest:function(){Core.log("NOT IMPLEMENTED : EscoGrid.getPostDataToFindDataRequest")
},_getPostDataToFindDataRequest:function(){if(this._options.NEED_FIND_DATA_REQUEST){return this.getPostDataToFindDataRequest()
}},doIsMultipleViewGrid:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doIsMultipleViewGrid")
},_doIsMultipleViewGrid:function(){if(this._options.IS_MULTIPLE_VIEW_GRID){this.doIsMultipleViewGrid()
}},doSelectRow:function(B,A){Core.log("NOT IMPLEMENTED : EscoGrid.doSelectRow")
},_doSelectRow:function(B,A){if(this._options.ACTION_ON_SELECT_ROW){this.doSelectRow(B,A)
}},doSelectAll:function(B,A){Core.log("NOT IMPLEMENTED : EscoGrid.doSelectAll")
},_doSelectAll:function(B,A){if(this._options.ACTION_ON_SELECT_ALL){this.doSelectAll(B,A)
}},doOnPaging:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnPaging")
},_doOnPaging:function(){if(this._options.ACTION_ON_PAGING){this.doOnPaging()
}},doSpecificActionIfNoData:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doSpecificActionIfNoData");
return true
},_doSpecificActionIfNoData:function(){if(this._options.ACTION_ON_LOAD_DATA_IF_NO_DATA){return this.doSpecificActionIfNoData()
}},doOnLoadComplete:function(A){Core.log("NOT IMPLEMENTED : EscoGrid.doOnLoadComplete")
},_doOnLoadComplete:function(A){if(this._options.ACTION_ON_LOAD_COMPLETE){this.doOnLoadComplete()
}},doOnExistingAddedItems:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnExistingAddedItems")
},_doOnExistingAddedItems:function(){if(this._options.ACTION_ON_EXISTING_ADDED_ITEMS){this.doOnExistingAddedItems()
}},doActionOnFindData:function(A){Core.log("NOT IMPLEMENTED : EscoGrid.doActionOnFindData")
},_doActionOnFindData:function(A){if(this._options.ACTION_ON_FIND_DATA){this.doActionOnFindData(A)
}},_loadData:function(){if(this._options.NEED_FIND_DATA_REQUEST){var A=this;
A.nbRowSelected=0;
jQuery.ajaxSettings.async=false;
json=A.getPostDataToFindDataRequest();
$.post(A._options.URL_FIND_DATA,json,function(B){A._doneLoadData(Core.getStatus(B));
A._doActionOnFindData(B)
});
jQuery.ajaxSettings.async=true
}else{this._doneLoadData(true)
}},getIfSelectable:function(){},_doneLoadData:function(A){var B=this;
Core.log("EscoGrid._doneLoadData("+A+")");
if(A){B._visibilityOfGridContent("visible");
B._showPagerGridContent();
B._doSelectableGrid(true)
}else{B._hidePagerGridContent();
B._doSelectableGrid(false);
B._doIsMultipleViewGrid();
B._doSpecificActionIfNoData()
}if(B._isGridEmpty()){if(A){B._loadTableData()
}else{if(B._alreadyLoad){B._clearGridData()
}else{B._loadTableData();
B._hidePagerGridContent();
B._doSelectableGrid(false);
B._doIsMultipleViewGrid()
}}}else{B._reloadGrid()
}if($.browser.msie){$("tr[id*=empty]").children("td").each(function(){$(this).css("padding-top","0px");
$(this).css("padding-bottom","0px")
})
}B._updateRowSelectedInfo();
B._alreadyLoad=true
},_getTableIds:function(){return $(this._options.ID_GRID).getDataIDs()
},_loadTableData:function(){var A=this;
$(A._options.ID_GRID).jqGrid({url:A._options.URL_DATA_RESULT,datatype:"xml",colNames:A._lang.TABLE_OF_COL_NAME,colModel:A._lang.TABLE_OF_COL_MODEL,rowNum:10,rowList:this._options.ROW_LIST,imgpath:"/"+Core.applicationContext+"/media/js/jqGrid/themes/grouper/images",pager:$(this._options.ID_PAGER_GRID),sortname:"id",height:A._options.GRID_HEIGHT,viewrecords:true,sortorder:"desc",mtype:"POST",multiselect:A._options.IS_SELECTABLE_GRID,xmlReader:{root:"invoices",row:"result",page:"invoices>currentPage",total:"invoices>nbResultPage",records:"invoices>nbResult"},onSelectRow:function(C,B){A._doSelectRow(C,B)
},onSelectAll:function(C,B){A._doSelectAll(C,B)
},onPaging:function(){A.doOnPaging()
},onSortCol:function(){A._sendSelectedRows()
},loadComplete:function(C){var B=A._getTableIds();
A._doIsAllSelectedAndAddedItems(C);
A._selectItemSelected(B);
A._doColorateAddedItem();
A._createNavBar();
A._doOnLoadComplete(C);
A.getIfSelectable();
A._doOnClickLinkItem(B);
A._doOnExistingAddedItems();
A._addActionSelectAll();
A._resizeGrid();
if(A._options.HIDE_BLOCK_UI_ON_LOAD_COMPLETE){Core._hideBlockUI()
}$.each($("input[id*=inputLink_]:visible"),function(){$(this).focus(function(){EscoGridItemFocus.item=$(this).parent().parent();
$(this).parent().parent().addClass("over")
});
$(this).blur(function(){EscoGridItemFocus.item=$($("input[id*=inputLink_]:visible")[0]).parent().parent();
$(this).parent().parent().removeClass("over")
});
$(this).bind("keydown",function(D){if(D.which==74){$(this).parent().parent().find("img[action=optin]").click();
return false
}else{if(D.which==81){$(this).parent().parent().find("img[action=optout]").click();
return false
}}})
});
$.each($("input[id*=jqg]:visible"),function(){$(this).focus(function(){EscoGridItemFocus.item=$(this).parent().parent();
$(this).parent().parent().addClass("over")
});
$(this).blur(function(){EscoGridItemFocus.item=$("input[id=jqg_1]:visible").parent().parent();
$(this).parent().parent().removeClass("over")
});
$(this).bind("keydown",function(D){if(D.which==13){$(this).parent().parent().find("a").children().click();
return false
}else{if(D.which==74){$(this).parent().parent().find("img[action=optin]").click();
return false
}else{if(D.which==81){$(this).parent().parent().find("img[action=optout]").click();
return false
}else{if(D.which==86){$(this).parent().parent().find("img[action=view]").click();
return false
}else{if(D.which==82){$(this).parent().parent().find("img[action=read]").click();
return false
}else{if(D.which==85){$(this).parent().parent().find("img[action=update]").click();
return false
}else{if(D.which==65){$(this).parent().parent().find("img[action=admin]").click();
return false
}else{if(D.which==70){$(this).parent().parent().find("img[action=stem]").click();
return false
}else{if(D.which==71){$(this).parent().parent().find("img[action=group]").click();
return false
}}}}}}}}}})
})
},caption:"A grid"});
$(A._options.ID_LOADING_GRID).empty().append($("div[class=loading]"))
},_createNavBar:function(){var A=this;
if($(A._options.ID_PAGER_GRID).children(".navtable").length==0){A._theNavBar=$(A._options.ID_GRID).navGrid(A._options.ID_PAGER_GRID,{edit:false,add:false,del:false,search:false,refresh:false,view:false});
A.doAddNavButtons()
}},doAddNavButtons:function(){Core.log("NOT IMPLEMENTED EscoGrid.doAddNavButtons")
},_addANavButton:function(D,C,B,A,E){this._theNavBar.navButtonAdd(this._options.ID_PAGER_GRID,{caption:D,title:C,buttonimg:B,onClickButton:A,type:E})
},_doColorateAddedItem:function(){if(this._options.COLORATE_ADDED_ITEMS){var A=this;
$(this._options.ID_GRID+" tr:gt(0)").each(function(){if($($(this).children()[A._options.COLUMN_ADDED_VALUE]).html()=="true"){$(this).addClass("addedElement")
}})
}},_addActionSelectAll:function(){var A=this;
if(A._options.IS_SELECTABLE_GRID){$("input[id=cb_jqg]").unbind("click",functionClick);
$("input[id=cb_jqg]").bind("click",functionClick)
}},addActionOnClickLinkItemPerson:function(A){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemPerson")
},addActionOnClickLinkItemGroup:function(A){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemGroup")
},addActionOnClickLinkItemStem:function(A){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemStem")
},_doOnClickLinkItem:function(D){var F=this;
if(this._options.ACTION_ON_CLICK_LINK_ITEM){for(var B=0;
B<D.length;
B++){var E=$(this._options.ID_GRID).getCell(D[B],this._options.COLUMN_ID_VALUE);
if(F._options.TYPE_OF_DATA=="GROUP-PERSON"){var C=$(this._options.ID_GRID).getCell(D[B],this._options.COLUMN_TYPE_DATA)
}else{var C=F._options.TYPE_OF_DATA
}var H=$(this._options.ID_GRID).getCell(D[B],this._options.COLUMN_LINK_VALUE);
if(C=="PERSON"){if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+E+"' class='tableLinkIcon'><span id='"+E+"' >"+H+"</span></a>"
}else{ce="<input id='inputLink_"+E+"' paramId='"+E+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+E+"' class='tableLink'><span id='"+E+"' >"+H+"</span></a>"
}$(this._options.ID_GRID).setRowData(D[B],{colLink:ce});
F.addActionOnClickLinkItemPerson("#tablelink_"+E)
}else{if(C=="GROUP"){var G=$(this._options.ID_GRID).getCell(D[B],this._options.COLUMN_NAMEGROUP_VALUE);
if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+E+"' class='tableLinkIcon' displayName='"+H+"'><span id='"+G+"' idNode='"+E+"'>"+H+"</span></a>"
}else{ce="<input id='inputLink_"+E+"' paramId='"+E+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+E+"' displayName='"+H+"' class='tableLink'><span id='"+G+"' idNode='"+E+"'>"+H+"</span></a>"
}$(this._options.ID_GRID).setRowData(D[B],{colLink:ce});
F.addActionOnClickLinkItemGroup("#tablelink_"+E)
}else{if(C=="STEM"){var G=$(this._options.ID_GRID).getCell(D[B],this._options.COLUMN_NAMEGROUP_VALUE);
if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+E+"' class='tableLinkIcon' displayName='"+H+"'><span id='"+G+"' idNode='"+E+"'>"+H+"</span></a>"
}else{ce="<input id='inputLink_"+E+"' paramId='"+E+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+E+"' displayName='"+H+"' class='tableLink'><span id='"+G+"' idNode='"+E+"'>"+H+"</span></a>"
}$(this._options.ID_GRID).setRowData(D[B],{colLink:ce});
F.addActionOnClickLinkItemStem("#tablelink_"+E)
}}}var A=E;
if(!this._options.IS_SELECTABLE_GRID){$("#inputLink_"+A).click(function(I){$("#tablelink_"+$(this).attr("paramId")).children("span").click()
})
}}}},_selectItemSelected:function(A){if(this._options.IS_SELECTABLE_GRID){for(var C=0;
C<A.length;
C++){var B=$(this._options.ID_GRID).getCell(A[C],this._options.COLUMN_SELECTED_VALUE);
if(B=="true"){$("#jqg_"+(C+1)).attr("checked",true);
this.nbRowSelected--;
$(this._options.ID_GRID).setSelection(C+1+"")
}}}},_doIsAllSelectedAndAddedItems:function(A){if($(A).find("isAllSelected").text()=="true"){$("input[id=cb_jqg]").attr("checked",true)
}else{$("input[id=cb_jqg]").attr("checked",false)
}this.isExistingAddedItems=$(A).find("isExistingAddedItem").text()=="true"
},_sendSelectedRows:function(){jQuery.ajaxSettings.async=false;
var A=$(this._options.ID_GRID).getGridParam("selarrrow").toString();
$.post(this._options.URL_SELECT_ROWS,{rows:A,typeOfSelect:this._selectType},function(B){});
jQuery.ajaxSettings.async=true
},_updateRowSelectedInfo:function(){if(this._options.IS_SELECTABLE_GRID){if(this.nbRowSelected==0){$(this._options.ID_PAGER_GRID+" .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_DEFAULT)
}else{try{$(this._options.ID_PAGER_GRID+" .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_CUSTOM.replace("{1}",this.nbRowSelected))
}catch(A){}}}},_doSelectableGrid:function(A){if(this._options.IS_SELECTABLE_GRID){$("input[id=cb_jqg]").attr("disabled",!A)
}},_visibilityOfGridContent:function(A){$("div[class=grid_bdiv]").css("visibility",A);
$(this._options.ID_PAGER_GRID).css("visibility",A)
},_showPagerGridContent:function(){jQuery(this._options.ID_PAGER_GRID+" > *").show()
},_hidePagerGridContent:function(){jQuery(this._options.ID_PAGER_GRID+" > *").not(".navtable").hide()
},_isGridEmpty:function(){return $(this._options.ID_GRID).html()=="<TBODY></TBODY>"||$(this._options.ID_GRID).html()==""
},_clearGridData:function(){$(this._options.ID_GRID).clearGridData()
},_resizeGrid:function(){var A=this;
$(A._options.ID_LOADING_GRID).css("min-height","25px");
if($.browser.msie){$(A._options.ID_LOADING_GRID).css("height","35px")
}$(A._options.ID_LOADING_GRID).css("margin-bottom","9px");
$("div[class=grid_hdiv]").css("padding-right","2px");
$("div[class=grid_bdiv]").css("padding-right","2px");
$(A._options.ID_PAGER_GRID).css("visibility","visible");
$(A._options.ID_PAGER_GRID).css("margin-left","1px");
if($.browser.mozilla&&jQuery.browser.version.indexOf("1.9.0")>=0){$(A._options.ID_PAGER_GRID).css("margin-left","0px")
}if($.browser.msie){$(A._options.ID_PAGER_GRID).css("width",($(A._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px");
$("tr[id*=empty]").children("td").each(function(){$(this).css("padding-top","0px");
$(this).css("padding-bottom","0px")
})
}else{$(A._options.ID_PAGER_GRID).css("width",($(A._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px")
}if($.browser.mozilla&&jQuery.browser.version.substr(0,5)=="1.9.1"){$(A._options.ID_PAGER_GRID).css("margin-left","0px")
}this.doResizeGrid()
},doResizeGrid:function(){},_reloadGrid:function(){$(this._options.ID_GRID).trigger("reloadGrid")
},addTitle:function(){$(".scroll").find("img[id=first]").attr("title",Lang.getString("IMG_FIRST"));
$(".scroll").find("img[id=prev]").attr("title",Lang.getString("IMG_PREV"));
$(".scroll").find("img[id=next]").attr("title",Lang.getString("IMG_NEXT"));
$(".scroll").find("img[id=last]").attr("title",Lang.getString("IMG_LAST"));
$(".scroll").find("select").attr("title",Lang.getString("SELECT_PAGINATION"));
$(".scroll").find("input[class=selbox]").attr("title",Lang.getString("SELECT_PAGE"))
}};