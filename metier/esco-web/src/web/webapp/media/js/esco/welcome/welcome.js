/*
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author MOULRON Diogene
 */

// the tree.
var tree = null;
var tree_context = { items : {create:false, rename:false, remove:false} };

// The property for open a specific node.
var stackOfNodesToOpen = new Array();
var nodeToSelect = null;
var needNodeSelection = false;

// Display or not content on select
var displayContent = true;

// If the node is already open
var callDone = new Array();

var WelcomeBase = {

  _options : {
    buttonBarHidden : false,
    buttonBarPresent : false,
    generalMenuAction : []
  },
  outerLayout : null,

  init: function(opts){
    _options = $.extend({}, {
      rootName : "Root"
    }, opts || {});

  },

  fire : function(){
	  _options = $.extend({}, {
	      rootName : "Root"
	    },{rootName : Lang.getString("WELCOME.ROOTNAME"),loading : Lang.getString("WELCOME.LOADING")});

	this.initTree();
	this.initLayer();
	jQuery.each(this._options.generalMenuAction, function(index, action){
		action.call();
	});

	$('.ui-icon-search').parent().attr("title",Lang.getString("SEARCH_MENU_TITLE"));
	$('.ui-icon-home').parent().attr("title",Lang.getString("HOME_MENU_TITLE"));
  },

  initLayer: function () {

    /*
    *#######################
    * OUTER LAYOUT SETTINGS
    *#######################
    *
    * This configuration illustrates how extensively the layout can be customized
    * ALL SETTINGS ARE OPTIONAL - and there are more available than shown below
    *
    * These settings are set in 'sub-key format' - ALL data must be in a nested data-structures
    * All default settings (applied to all panes) go inside the defaults:{} key
    * Pane-specific settings go inside their keys: north:{}, south:{}, center:{}, etc
    */

	 // The size of the west panel if no navigation area
	 var theWestWidth = 21;
	 if ( !Profile.canDisplayNavigationArea()){
		 theWestWidth = 0;
	 }

    var layoutSettings_Outer = {
      name: "outerLayout" // NO FUNCTIONAL USE, but could be used by custom code to 'identify' a layout
      // options.defaults apply to ALL PANES - but overridden by pane-specific settings
    ,	defaults: {
        size:					"auto"
      ,	minSize:				15
      ,	paneClass:				"pane" 		// default = 'ui-layout-pane'
      ,	resizerClass:			"resizer"	// default = 'ui-layout-resizer'
      ,	togglerClass:			"toggler"	// default = 'ui-layout-toggler'
      ,	buttonClass:			"button"	// default = 'ui-layout-button'
      ,	contentSelector:		".content"	// inner div to auto-size so only it scrolls, not the entire pane!
      ,	contentIgnoreSelector:	"span"		// 'paneSelector' for content to 'ignore' when measuring room for content
      ,	togglerLength_open:		35			// WIDTH of toggler on north/south edges - HEIGHT on east/west edges
      ,	togglerLength_closed:	35			// "100%" OR -1 = full height
      ,	hideTogglerOnSlide:		true		// hide the toggler when pane is 'slid open'
      ,	togglerTip_open:		Lang.getString("CLOSE_PAN")
      ,	togglerTip_closed:		Lang.getString("OPEN_PAN")
      ,	resizerTip:				Lang.getString("RESIZE_PAN")
      , sliderTip :             Lang.getString("OPEN_MENU_PAN")
      //	effect defaults - overridden on some panes
      ,	fxName:					"slide"		// none, slide, drop, scale
      ,	fxSpeed_open:			750
      ,	fxSpeed_close:			1500
      ,	fxSettings_open:		{ easing: "easeInQuint" }
      ,	fxSettings_close:		{ easing: "easeOutQuint" }
    }
    ,	north: {
        spacing_open:			1			// cosmetic spacing
      ,	togglerLength_open:		0			// HIDE the toggler button
      ,	togglerLength_closed:	-1			// "100%" OR -1 = full width of pane
      ,	resizable: 				false
      ,	slidable:				false
      , initHidden:             !Banner.isDisplayed()
      //	override default effect
      ,	fxName:					"none"
          ,	togglerTip_open:		Lang.getString("CLOSE_PAN")
          ,	togglerTip_closed:		Lang.getString("OPEN_PAN")
          ,	resizerTip:				Lang.getString("RESIZE_PAN")
          , sliderTip :             Lang.getString("OPEN_MENU_PAN")
      }
    ,	south: {
        closable:	false
      ,	resizable:	true
      ,	slidable:	false
      ,	height:		15
      ,	spacing_open:		0
      ,	togglerTip_open:		Lang.getString("CLOSE_PAN")
      ,	togglerTip_closed:		Lang.getString("OPEN_PAN")
      ,	resizerTip:				Lang.getString("RESIZE_PAN")
      , sliderTip :             Lang.getString("OPEN_MENU_PAN")
      }
    ,	west: {
        size:					250
      ,	spacing_closed:			theWestWidth			// wider space when closed
      ,	togglerLength_closed:	21			// make toggler 'square' - 21x21
      ,	togglerAlign_closed:	"top"		// align to top of resizer
      ,	togglerLength_open:		0			// NONE - using custom togglers INSIDE west-pane
      ,	togglerTip_open:		Lang.getString("CLOSE_PAN")
      ,	togglerTip_closed:		Lang.getString("OPEN_PAN")
      ,	resizerTip_open:		Lang.getString("RESIZE_PAN")
      , sliderTip :             Lang.getString("OPEN_PAN")
      ,	slideTrigger_open:		"click" 	// default
      ,	initClosed:				!Profile.canDisplayNavigationArea()
      //	add 'bounce' option to default 'slide' effect
      ,	fxSettings_open:		{ easing: "easeOutBounce" }
      }
    ,	center: {
        paneSelector:			"#mainContent" 			// sample: use an ID to select pane instead of a class
      ,	onresize:				function() {
                      //Core.log("size of maincontent : " + welcome.outerLayout.panes.center.height());
                      $("#escoPanels > .ui-tabs-panel").each(function(){
                        // search all breadCrumb not in panel.
                        isBreadCrumb = $("div#breadCrumb:not(#escoPanels #breadCrumb)").size() > 0;
                        isBarHidden = welcome._options.buttonBarHidden;
                        isBarPresent = welcome._options.buttonBarPresent;
                        heightBreadCrumb = (isBreadCrumb)?155:65;
                        heightBarHidden = (isBarHidden)?35:0;

                        heightBarPresent = (isBarPresent && !isBreadCrumb)?35:0;

                        newHeight = heightBreadCrumb + heightBarPresent - heightBarHidden;

                        //Core.log("size reducce of tabPanel : " + newHeight);
                        $(this).css("height", welcome.outerLayout.panes.center.height() - newHeight);

                        // for ie. hide then show breabcrumb because if disapear on drag split bar.
                        $('#breadCrumb').hide().show();
                      });
                }
      }
    };
    // create the OUTER LAYOUT
    this.outerLayout = $(".flora").layout( layoutSettings_Outer );

        // save selector strings to vars so we don't have to repeat it
    // must prefix paneClass with "body > " to target ONLY the outerLayout panes
    var westSelector = ".flora > .ui-layout-west"; // outer-west pane

     // CREATE SPANs for pin-buttons - using a generic class as identifiers
    //$("<span></span>").addClass("pin-button").prependTo( westSelector );
    // BIND events to pin-buttons to make them functional
    //this.outerLayout.addPinBtn( westSelector +" .pin-button", "west");

     // CREATE SPANs for close-buttons - using unique IDs as identifiers
    $("<span></span>").attr("id", "west-closer" ).prependTo( westSelector );
    // BIND layout events to close-buttons to make them functional
    this.outerLayout.addCloseBtn("#west-closer", "west");

    $("#west-closer").attr("title",Lang.getString("CLOSE_PAN"));
    setTimeout("Core._hideBlockUI()",1200);
  },

  hide : function(pane) {
    try {
      this.outerLayout.hide(pane);
    } catch (e) {
      // nothing to do, the pane does not exist.
    }
  },

  show : function(pane) {
    try {
      this.outerLayout.show(pane);
    } catch (e) {
      // nothing to do, the pane does not exist.
    }
  },

  resizeAll : function () {
    this.outerLayout.resizeAll();
  },

  fireButtonBar : function() {
    var _this = this;
    _this._options.buttonBarPresent = $("#buttonBar").size() > 0;

    if (_this._options.buttonBarPresent) {
    	isClosed = $("#buttonBarAction").hasClass("buttonBarClose");
    	_this._options.buttonBarHidden = false || isClosed;

      $("#buttonBarAction").unbind("click").bind("click", function() {
    	  	$("li[id=:] > a").focus();
	    	isClosed = $("#buttonBarAction").hasClass("buttonBarClose");
	    	if (isClosed){
	          $("#actions").height("30px");
	          $("#actions").css("display", "block");
	          jQuery("#actions").css("visibility","visible");
	          _this._options.buttonBarHidden = false;
	          $("#buttonBarAction").css("padding-bottom", "0px");
	          $("#buttonBarAction").toggleClass("buttonBarClose").toggleClass("buttonBarOpen");
	        } else {
	          $("#actions").height("0px");
	          $("#actions").css("display", "none");
	          jQuery("#actions").css("visibility","hidden");
	          _this._options.buttonBarHidden = true;
	          $("#buttonBarAction").css("padding-bottom", "10px");
	          $("#buttonBarAction").toggleClass("buttonBarClose").toggleClass("buttonBarOpen");
	        }
	        welcome.resizeAll();
      });
    }
  },

  initTree : function(){
    Core.log("Initialising tree ... ");

    jQuery.ajaxSettings.async = false;

    Core.log("Call context menu ");
    //var tree_context = { items : {create:false, rename:false,remove : false} };
    $.post("/" + Core.applicationContext + "/ajax/json/treeController/getContextMenu.jsf", function(data){

       json = {};
       eval("json="+data);
    	Core.log("processing context menu data ... ");

      jQuery.each(json.elements, function(index, element) {
    	  		var newItem = new Array();
    	  		eval("var fVisible = " + element.visible);
    	  		element.visible = fVisible;
				eval("var fAction = " + element.action);
				element.action = fAction;
				newItem[element.id]=element;
				$.extend( tree_context.items , newItem);
      });

    });
    jQuery.ajaxSettings.async = true;


    Core.log("Call create tree ");
    tree = $.tree.create();

    var stat = [{ attributes: { id : ":" , displayName:"Root", name : ":", typeNode :"ROOT", right : ["ALL"]}, state: "closed", data: { title : _options.rootName, icon : "/" + Core.applicationContext + "/media/imgs/tree/dossier_dossier.gif"}}];

    tree.init($("#arbo"),
			{
				data : {
		          type  : "json",
		          async : true,
		          opts :{
    					method:"POST",
    					url:"/" + Core.applicationContext + "/ajax/json/treeController/getNodeElementsForm.jsf"
				  }
				},
				ui :
				{
					theme_name : "classic"
				},
				plugins :
				{
					hotkeys       : {},
					contextmenu   : $.extend({},tree_context)
				},
				lang : {
					loading		: _options.loading
				},
				rules : {
			        use_max_children : false,
			        use_max_depth : false
			    },
				types:
				{
					"default" : {
						clickable	: true,
						deletable	: true,
						draggable	: function(NODE,TREEOBJ){
										if ( $(NODE).attr("typeNode")=="GROUP" && $(NODE).attr("right") == "admin"){
											return true;
										}
										else{
											return false;
										}
										//else if ($(NODE).attr("typeNode")=="FOLDER"){
											//return true;
										//}
									}
					}
				},
				callback:{
					beforemove : function(NODE, REF_NODE, TYPE, TREE_OBJ){
						DragAndDrop.moveElement(NODE, REF_NODE, TYPE, TREE_OBJ);
					},

					onhover : function (NODE,TREE_OBJ) {
			    		if(MoveGroup._isInDragMode){
			    			obj = $(NODE);
							var off_t = obj.offset().top;
							var beg_t = $(".content").offset().top;
							var end_t = beg_t + $(".content").height();
							var h_cor = ($(".content").get(0).scrollWidth >$(".content").width()) ? 40 : 20;
							if(off_t + 5 < beg_t) $(".content").scrollTop($(".content").scrollTop() - (beg_t - off_t + 5) );
							if(off_t + h_cor > end_t) $(".content").scrollTop($(".content").scrollTop() + (off_t + h_cor - end_t) );

			    			if ($(NODE).attr("typeNode") == "FOLDER"){
			    				if (MoveGroup._previousNode != null){
									if ($.browser["msie"]){
										$(MoveGroup._previousNode).children("a").css("opacity","1");
									}else{
										$(MoveGroup._previousNode).children("a").css("cursor","pointer");
									}
			    				}
								MoveGroup._previousNode = $(NODE);
								if ($(NODE).attr("right") == "GROUP" || $(NODE).attr("right") == "ALL"){
									if ($.browser["msie"]){
										$(NODE).children("a").css("opacity","1");
									}else{
										$(NODE).children("a").css("cursor","default");
									}
								}else{
									if ($.browser["msie"]){
										$(NODE).children("a").css("opacity","0.5");
									}else{
										$(NODE).children("a").css("cursor","no-drop");
									}
								}
			    			}else{
			    				if (MoveGroup._previousNode != null){
									if ($.browser["msie"]){
										$(MoveGroup._previousNode).children("a").css("opacity","1");
									}else{
										$(MoveGroup._previousNode).children("a").css("cursor","pointer");
									}
			    				}
			    				MoveGroup._previousNode = $(NODE);
								if ($.browser["msie"]){
									$(NODE).children("a").css("opacity","0.5");
								}else{
									$(NODE).children("a").css("cursor","no-drop");
								}
			    			}
			    		}else if(MoveStem._isInDragMode){
			    			obj = $(NODE);
							var off_t = obj.offset().top;
							var beg_t = $(".content").offset().top;
							var end_t = beg_t + $(".content").height();
							var h_cor = ($(".content").get(0).scrollWidth >$(".content").width()) ? 40 : 20;
							if(off_t + 5 < beg_t) $(".content").scrollTop($(".content").scrollTop() - (beg_t - off_t + 5) );
							if(off_t + h_cor > end_t) $(".content").scrollTop($(".content").scrollTop() + (off_t + h_cor - end_t) );

			    			if ($(NODE).attr("typeNode") == "FOLDER"){
			    				if (MoveStem._previousNode != null){
									if ($.browser["msie"]){
										$(MoveStem._previousNode).children("a").css("opacity","1");
									}else{
										$(MoveStem._previousNode).children("a").css("cursor","pointer");
									}
			    				}
								MoveStem._previousNode = $(NODE);
								//if ($(NODE).attr("right") == "GROUP" || $(NODE).attr("right") == "ALL"){
								if ($.browser["msie"]){
									$(NODE).children("a").css("opacity","1");
								}else{
									$(NODE).children("a").css("cursor","default");
								}
								/**}else{
									if ($.browser["msie"]){
										$(NODE).children("a").css("opacity","0.5");
									}else{
										$(NODE).children("a").css("cursor","no-drop");
									}**/
								//}
			    			}else{
			    				if (MoveStem._previousNode != null){
									if ($.browser["msie"]){
										$(MoveStem._previousNode).children("a").css("opacity","1");
									}else{
										$(MoveStem._previousNode).children("a").css("cursor","pointer");
									}
			    				}
			    				MoveStem._previousNode = $(NODE);
								if ($.browser["msie"]){
									$(NODE).children("a").css("opacity","0.5");
								}else{
									$(NODE).children("a").css("cursor","no-drop");
								}
			    			}
			    		}else if ( $(NODE).attr("typeNode") == "FOLDER" ){
			    			MoveStem._nodeHovered = $(NODE);
			    			MoveGroup._nodeHovered = null;
			    		}else if ( $(NODE).attr("typeNode") == "GROUP" ){
			    			MoveStem._nodeHovered = null;
							MoveGroup._nodeHovered = $(NODE);
						}
		        	},
					beforedata : function (n, t) {
						if(n == false) {
						     t.settings.data.opts["static"] = stat;
		                }
		                else{
		                	t.settings.data.opts["static"] = false;
		                	 return { theIdOfNodeRequest : $(n).attr("name") };
		                }

					 },

					 ondata :function(DATA, TREE_OBJ) {
						 if (DATA.elements != undefined){
							 return DATA.elements;
						 }else{
							 return DATA;
						 }
					 },

					 beforechange	: function(NODE,TREE_OBJ) {
						 tree.deselect_branch($(".clicked"));
						// $(NODE).children("a").addClass("clicked");
					 },

					 onopen : function(NODE,TREE_OBJ){
						// Select the node or not
						if ( nodeToSelect != undefined && nodeToSelect!= null){
							tree.select_branch($("#"+nodeToSelect));
							nodeToSelect = null;
						}
						TreePlugin.addTitleToIcon();
					 },

					 onselect:function(NODE,TREE_OBJ){
				            if($(NODE).attr("typeNode")!= "ROOT"){
				              if ( displayContent ){
				          		Core.resetNavParams();
				                if ( $(NODE).attr("typeNode")=="GROUP"){
				                	if (Profile.canAccessToGroupProperties()){
				                		Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupProperties.jsf",{groupUuid:$(NODE).attr("ID"),from:'treeNavigate'}, "#mainContent", true, true);
				                	}else{
				                		Core.goToIndexPage();
				                	}
				                }
				                else{// Folder
				                	if (Profile.canAccessToStemProperties()){
				                		$.post("/" + Core.applicationContext + "/ajax/stemController/isModifiedStems.jsf", json, function(data) {});
				                		Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemProperties/stemProperties.jsf",{stemUuid:$(NODE).attr("ID"),from:'treeNavigate'}, "#mainContent", true, true);
				                	}else{
				                		Core.goToIndexPage();
				                	}
				                }
				              }else{
				                displayContent=true;
				              }
				            }else{
				            	displayContent=true;
				            }
					}
				}
			});

     Core.log("End initialising tree.");

     tree.open_branch($("li[typeNode=ROOT]"));
     tree.select_branch($("li[typeNode=ROOT]"));
  }

};

var Welcome = new DUI.Class( WelcomeBase, $.screen);

WelcomeBase._options.generalMenuAction.push(function() {
		Core.addAction(
				$('.ui-icon-search').parent(),
				Core.CLICK,
				function(){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/search/simpleSearch.jsf",{idNode:'Root',nameIdNode:':'},"#mainContent", true,true);
				}
		);
	});

WelcomeBase._options.generalMenuAction.push(function() {
		Core.addAction(
				$('.ui-icon-home').parent(),
				Core.CLICK,
				function(){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{}, "#mainContent", true, false);
				}
		);
	});

