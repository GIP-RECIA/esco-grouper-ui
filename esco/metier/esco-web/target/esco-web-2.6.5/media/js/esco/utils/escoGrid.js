var EscoGridItemFocus={item:null};
var functionClick=function(){if($("input[id=cb_jqg]:checked").val()=="on"){_this._selectType="all"
}else{_this._selectType="unselectall"
}_this._sendSelectedRows()
};
var EscoGrid={_options:{IS_MULTIPLE_VIEW_GRID:false,TYPE_OF_DATA:"GROUP-PERSON",IS_SELECTABLE_GRID:false,NEED_FIND_DATA_REQUEST:true,ACTION_ON_FIND_DATA:false,ACTION_ON_SELECT_ROW:false,ACTION_ON_SELECT_ALL:false,ACTION_ON_CLICK_LINK_ITEM:false,ACTION_ON_PAGING:false,ACTION_ON_LOAD_DATA_IF_NO_DATA:false,ACTION_ON_LOAD_COMPLETE:false,COLORATE_ADDED_ITEMS:false,ACTION_ON_EXISTING_ADDED_ITEMS:false,HIDE_BLOCK_UI_ON_LOAD_COMPLETE:true,URL_FIND_DATA:"",URL_SELECT_ROWS:"",URL_DATA_RESULT:"",GRID_HEIGHT:"auto",ID_GRID:"#list",ID_PAGER_GRID:"#pagerGrid",ID_LOADING_GRID:"#myloading",COLUMN_SELECTED_VALUE:6,COLUMN_ADDED_VALUE:8,COLUMN_ID_VALUE:1,COLUMN_TYPE_DATA:7,COLUMN_NAMEGROUP_VALUE:4,COLUMN_LINK_VALUE:2,DEL_NAV_BAR_POSITION:1,ROW_LIST:[10,20,30,50,100]},_lang:{DEL_NAV_BAR_MESSAGE_DEFAULT:"",DEL_NAV_BAR_MESSAGE_CUSTOM:"",ADD_LABEL:"",ADD_TITLE:"",DEL_LABEL:"",DEL_TITLE:"",TABLE_OF_COL_NAME:null,TABLE_OF_COL_MODEL:null},_theNavBar:null,nbRowSelected:0,isExistingAddedItems:false,_selectType:"undefined",_alreadyLoad:false,init:function(C,D){this._options=$.extend({},this._options,C||{});
this._lang=$.extend({},this._lang,D||{})
},fire:function(){if(this._options.IS_SELECTABLE_GRID==false){this._options.COLUMN_ADDED_VALUE--;
this._options.COLUMN_ID_VALUE--;
this._options.COLUMN_LINK_VALUE--;
this._options.COLUMN_NAMEGROUP_VALUE--;
this._options.COLUMN_TYPE_DATA--;
this._options.COLUMN_SELECTED_VALUE--
}var B=this.doOnFire();
if(B){this._loadData()
}},doOnFire:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnFire")
},getPostDataToFindDataRequest:function(){Core.log("NOT IMPLEMENTED : EscoGrid.getPostDataToFindDataRequest")
},_getPostDataToFindDataRequest:function(){if(this._options.NEED_FIND_DATA_REQUEST){return this.getPostDataToFindDataRequest()
}},doIsMultipleViewGrid:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doIsMultipleViewGrid")
},_doIsMultipleViewGrid:function(){if(this._options.IS_MULTIPLE_VIEW_GRID){this.doIsMultipleViewGrid()
}},doSelectRow:function(D,C){Core.log("NOT IMPLEMENTED : EscoGrid.doSelectRow")
},_doSelectRow:function(D,C){if(this._options.ACTION_ON_SELECT_ROW){this.doSelectRow(D,C)
}},doSelectAll:function(D,C){Core.log("NOT IMPLEMENTED : EscoGrid.doSelectAll")
},_doSelectAll:function(D,C){if(this._options.ACTION_ON_SELECT_ALL){this.doSelectAll(D,C)
}},doOnPaging:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnPaging")
},_doOnPaging:function(){if(this._options.ACTION_ON_PAGING){this.doOnPaging()
}},doSpecificActionIfNoData:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doSpecificActionIfNoData");
return true
},_doSpecificActionIfNoData:function(){if(this._options.ACTION_ON_LOAD_DATA_IF_NO_DATA){return this.doSpecificActionIfNoData()
}},doOnLoadComplete:function(B){Core.log("NOT IMPLEMENTED : EscoGrid.doOnLoadComplete")
},_doOnLoadComplete:function(B){if(this._options.ACTION_ON_LOAD_COMPLETE){this.doOnLoadComplete()
}},doOnExistingAddedItems:function(){Core.log("NOT IMPLEMENTED : EscoGrid.doOnExistingAddedItems")
},_doOnExistingAddedItems:function(){if(this._options.ACTION_ON_EXISTING_ADDED_ITEMS){this.doOnExistingAddedItems()
}},doActionOnFindData:function(B){Core.log("NOT IMPLEMENTED : EscoGrid.doActionOnFindData")
},_doActionOnFindData:function(B){if(this._options.ACTION_ON_FIND_DATA){this.doActionOnFindData(B)
}},_loadData:function(){if(this._options.NEED_FIND_DATA_REQUEST){var B=this;
B.nbRowSelected=0;
jQuery.ajaxSettings.async=false;
json=B.getPostDataToFindDataRequest();
$.post(B._options.URL_FIND_DATA,json,function(A){B._doneLoadData(Core.getStatus(A));
B._doActionOnFindData(A)
});
jQuery.ajaxSettings.async=true
}else{this._doneLoadData(true)
}},getIfSelectable:function(){},_doneLoadData:function(C){var D=this;
Core.log("EscoGrid._doneLoadData("+C+")");
if(C){D._visibilityOfGridContent("visible");
D._showPagerGridContent();
D._doSelectableGrid(true)
}else{D._hidePagerGridContent();
D._doSelectableGrid(false);
D._doIsMultipleViewGrid();
D._doSpecificActionIfNoData()
}if(D._isGridEmpty()){if(C){D._loadTableData()
}else{if(D._alreadyLoad){D._clearGridData()
}else{D._loadTableData();
D._hidePagerGridContent();
D._doSelectableGrid(false);
D._doIsMultipleViewGrid()
}}}else{D._reloadGrid()
}if($.browser.msie){$("tr[id*=empty]").children("td").each(function(){$(this).css("padding-top","0px");
$(this).css("padding-bottom","0px")
})
}D._updateRowSelectedInfo();
D._alreadyLoad=true
},_getTableIds:function(){return $(this._options.ID_GRID).getDataIDs()
},_loadTableData:function(){var B=this;
$(B._options.ID_GRID).jqGrid({url:B._options.URL_DATA_RESULT,datatype:"xml",colNames:B._lang.TABLE_OF_COL_NAME,colModel:B._lang.TABLE_OF_COL_MODEL,rowNum:10,rowList:this._options.ROW_LIST,imgpath:"/"+Core.applicationContext+"/media/js/jqGrid/themes/grouper/images",pager:$(this._options.ID_PAGER_GRID),sortname:"id",height:B._options.GRID_HEIGHT,viewrecords:true,sortorder:"desc",mtype:"POST",multiselect:B._options.IS_SELECTABLE_GRID,xmlReader:{root:"invoices",row:"result",page:"invoices>currentPage",total:"invoices>nbResultPage",records:"invoices>nbResult"},onSelectRow:function(A,D){B._doSelectRow(A,D)
},onSelectAll:function(A,D){B._doSelectAll(A,D)
},onPaging:function(){B.doOnPaging()
},onSortCol:function(){B._sendSelectedRows()
},loadComplete:function(A){var D=B._getTableIds();
B._doIsAllSelectedAndAddedItems(A);
B._selectItemSelected(D);
B._doColorateAddedItem();
B._createNavBar();
B._doOnLoadComplete(A);
B.getIfSelectable();
B._doOnClickLinkItem(D);
B._doOnExistingAddedItems();
B._addActionSelectAll();
B._resizeGrid();
if(B._options.HIDE_BLOCK_UI_ON_LOAD_COMPLETE){Core._hideBlockUI()
}$.each($("input[id*=inputLink_]:visible"),function(){$(this).focus(function(){EscoGridItemFocus.item=$(this).parent().parent();
$(this).parent().parent().addClass("over")
});
$(this).blur(function(){EscoGridItemFocus.item=$($("input[id*=inputLink_]:visible")[0]).parent().parent();
$(this).parent().parent().removeClass("over")
});
$(this).bind("keydown",function(C){if(C.which==74){$(this).parent().parent().find("img[action=optin]").click();
return false
}else{if(C.which==81){$(this).parent().parent().find("img[action=optout]").click();
return false
}}})
});
$.each($("input[id*=jqg]:visible"),function(){$(this).focus(function(){EscoGridItemFocus.item=$(this).parent().parent();
$(this).parent().parent().addClass("over")
});
$(this).blur(function(){EscoGridItemFocus.item=$("input[id=jqg_1]:visible").parent().parent();
$(this).parent().parent().removeClass("over")
});
$(this).bind("keydown",function(C){if(C.which==13){$(this).parent().parent().find("a").children().click();
return false
}else{if(C.which==74){$(this).parent().parent().find("img[action=optin]").click();
return false
}else{if(C.which==81){$(this).parent().parent().find("img[action=optout]").click();
return false
}else{if(C.which==86){$(this).parent().parent().find("img[action=view]").click();
return false
}else{if(C.which==82){$(this).parent().parent().find("img[action=read]").click();
return false
}else{if(C.which==85){$(this).parent().parent().find("img[action=update]").click();
return false
}else{if(C.which==65){$(this).parent().parent().find("img[action=admin]").click();
return false
}else{if(C.which==70){$(this).parent().parent().find("img[action=stem]").click();
return false
}else{if(C.which==71){$(this).parent().parent().find("img[action=group]").click();
return false
}}}}}}}}}})
})
},caption:"A grid"});
$(B._options.ID_LOADING_GRID).empty().append($("div[class=loading]"))
},_createNavBar:function(){var B=this;
if($(B._options.ID_PAGER_GRID).children(".navtable").length==0){B._theNavBar=$(B._options.ID_GRID).navGrid(B._options.ID_PAGER_GRID,{edit:false,add:false,del:false,search:false,refresh:false,view:false});
B.doAddNavButtons()
}},doAddNavButtons:function(){Core.log("NOT IMPLEMENTED EscoGrid.doAddNavButtons")
},_addANavButton:function(H,I,J,F,G){this._theNavBar.navButtonAdd(this._options.ID_PAGER_GRID,{caption:H,title:I,buttonimg:J,onClickButton:F,type:G})
},_doColorateAddedItem:function(){if(this._options.COLORATE_ADDED_ITEMS){var B=this;
$(this._options.ID_GRID+" tr:gt(0)").each(function(){if($($(this).children()[B._options.COLUMN_ADDED_VALUE]).html()=="true"){$(this).addClass("addedElement")
}})
}},_addActionSelectAll:function(){var B=this;
if(B._options.IS_SELECTABLE_GRID){$("input[id=cb_jqg]").unbind("click",functionClick);
$("input[id=cb_jqg]").bind("click",functionClick)
}},addActionOnClickLinkItemPerson:function(B){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemPerson")
},addActionOnClickLinkItemGroup:function(B){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemGroup")
},addActionOnClickLinkItemStem:function(B){Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemStem")
},_doOnClickLinkItem:function(N){var L=this;
if(this._options.ACTION_ON_CLICK_LINK_ITEM){for(var P=0;
P<N.length;
P++){var M=$(this._options.ID_GRID).getCell(N[P],this._options.COLUMN_ID_VALUE);
if(L._options.TYPE_OF_DATA=="GROUP-PERSON"){var O=$(this._options.ID_GRID).getCell(N[P],this._options.COLUMN_TYPE_DATA)
}else{var O=L._options.TYPE_OF_DATA
}var J=$(this._options.ID_GRID).getCell(N[P],this._options.COLUMN_LINK_VALUE);
if(O=="PERSON"){if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+M+"' class='tableLinkIcon'><span id='"+M+"' >"+J+"</span></a>"
}else{ce="<input id='inputLink_"+M+"' paramId='"+M+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+M+"' class='tableLink'><span id='"+M+"' >"+J+"</span></a>"
}$(this._options.ID_GRID).setRowData(N[P],{colLink:ce});
L.addActionOnClickLinkItemPerson("#tablelink_"+M)
}else{if(O=="GROUP"){var K=$(this._options.ID_GRID).getCell(N[P],this._options.COLUMN_NAMEGROUP_VALUE);
if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+M+"' class='tableLinkIcon' displayName='"+J+"'><span id='"+K+"' idNode='"+M+"'>"+J+"</span></a>"
}else{ce="<input id='inputLink_"+M+"' paramId='"+M+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+M+"' displayName='"+J+"' class='tableLink'><span id='"+K+"' idNode='"+M+"'>"+J+"</span></a>"
}$(this._options.ID_GRID).setRowData(N[P],{colLink:ce});
L.addActionOnClickLinkItemGroup("#tablelink_"+M)
}else{if(O=="STEM"){var K=$(this._options.ID_GRID).getCell(N[P],this._options.COLUMN_NAMEGROUP_VALUE);
if(this._options.IS_SELECTABLE_GRID){ce="<a id='tablelink_"+M+"' class='tableLinkIcon' displayName='"+J+"'><span id='"+K+"' idNode='"+M+"'>"+J+"</span></a>"
}else{ce="<input id='inputLink_"+M+"' paramId='"+M+"' style='float:left;margin-left:3px;' type='image' src='/"+Core.applicationContext+"/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_"+M+"' displayName='"+J+"' class='tableLink'><span id='"+K+"' idNode='"+M+"'>"+J+"</span></a>"
}$(this._options.ID_GRID).setRowData(N[P],{colLink:ce});
L.addActionOnClickLinkItemStem("#tablelink_"+M)
}}}var I=M;
if(!this._options.IS_SELECTABLE_GRID){$("#inputLink_"+I).click(function(A){$("#tablelink_"+$(this).attr("paramId")).children("span").click()
})
}}}},_selectItemSelected:function(D){if(this._options.IS_SELECTABLE_GRID){for(var E=0;
E<D.length;
E++){var F=$(this._options.ID_GRID).getCell(D[E],this._options.COLUMN_SELECTED_VALUE);
if(F=="true"){$("#jqg_"+(E+1)).attr("checked",true);
this.nbRowSelected--;
$(this._options.ID_GRID).setSelection(E+1+"")
}}}},_doIsAllSelectedAndAddedItems:function(B){if($(B).find("isAllSelected").text()=="true"){$("input[id=cb_jqg]").attr("checked",true)
}else{$("input[id=cb_jqg]").attr("checked",false)
}this.isExistingAddedItems=$(B).find("isExistingAddedItem").text()=="true"
},_sendSelectedRows:function(){jQuery.ajaxSettings.async=false;
var B=$(this._options.ID_GRID).getGridParam("selarrrow").toString();
$.post(this._options.URL_SELECT_ROWS,{rows:B,typeOfSelect:this._selectType},function(A){});
jQuery.ajaxSettings.async=true
},_updateRowSelectedInfo:function(){if(this._options.IS_SELECTABLE_GRID){if(this.nbRowSelected==0){$(this._options.ID_PAGER_GRID+" .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_DEFAULT)
}else{try{$(this._options.ID_PAGER_GRID+" .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_CUSTOM.replace("{1}",this.nbRowSelected))
}catch(B){}}}},_doSelectableGrid:function(B){if(this._options.IS_SELECTABLE_GRID){$("input[id=cb_jqg]").attr("disabled",!B)
}},_visibilityOfGridContent:function(B){$("div[class=grid_bdiv]").css("visibility",B);
$(this._options.ID_PAGER_GRID).css("visibility",B)
},_showPagerGridContent:function(){jQuery(this._options.ID_PAGER_GRID+" > *").show()
},_hidePagerGridContent:function(){jQuery(this._options.ID_PAGER_GRID+" > *").not(".navtable").hide()
},_isGridEmpty:function(){return $(this._options.ID_GRID).html()=="<TBODY></TBODY>"||$(this._options.ID_GRID).html()==""
},_clearGridData:function(){$(this._options.ID_GRID).clearGridData()
},_resizeGrid:function(){var B=this;
$(B._options.ID_LOADING_GRID).css("min-height","25px");
if($.browser.msie){$(B._options.ID_LOADING_GRID).css("height","35px")
}$(B._options.ID_LOADING_GRID).css("margin-bottom","9px");
$("div[class=grid_hdiv]").css("padding-right","2px");
$("div[class=grid_bdiv]").css("padding-right","2px");
$(B._options.ID_PAGER_GRID).css("visibility","visible");
$(B._options.ID_PAGER_GRID).css("margin-left","1px");
if($.browser.mozilla&&jQuery.browser.version.indexOf("1.9.0")>=0){$(B._options.ID_PAGER_GRID).css("margin-left","0px")
}if($.browser.msie){$(B._options.ID_PAGER_GRID).css("width",($(B._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px");
$("tr[id*=empty]").children("td").each(function(){$(this).css("padding-top","0px");
$(this).css("padding-bottom","0px")
})
}else{$(B._options.ID_PAGER_GRID).css("width",($(B._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px")
}if($.browser.mozilla&&jQuery.browser.version.substr(0,5)=="1.9.1"){$(B._options.ID_PAGER_GRID).css("margin-left","0px")
}this.doResizeGrid()
},doResizeGrid:function(){},_reloadGrid:function(){$(this._options.ID_GRID).trigger("reloadGrid")
},addTitle:function(){$(".scroll").find("img[id=first]").attr("title",Lang.getString("IMG_FIRST"));
$(".scroll").find("img[id=prev]").attr("title",Lang.getString("IMG_PREV"));
$(".scroll").find("img[id=next]").attr("title",Lang.getString("IMG_NEXT"));
$(".scroll").find("img[id=last]").attr("title",Lang.getString("IMG_LAST"));
$(".scroll").find("select").attr("title",Lang.getString("SELECT_PAGINATION"));
$(".scroll").find("input[class=selbox]").attr("title",Lang.getString("SELECT_PAGE"))
}};