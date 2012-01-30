(function(B){B.tree={datastores:{},plugins:{},defaults:{data:{async:false,type:"html",opts:{method:"GET",url:false}},selected:false,opened:[],languages:[],ui:{dots:true,animation:0,scroll_spd:4,theme_path:false,theme_name:"default",selected_parent_close:"select_parent",selected_delete:"select_previous"},types:{"default":{clickable:true,renameable:true,deletable:true,creatable:true,draggable:true,max_children:-1,max_depth:-1,valid_children:"all",icon:{image:false,position:false}}},rules:{multiple:false,multitree:"none",type_attr:"rel",createat:"bottom",drag_copy:"ctrl",drag_button:"left",use_max_children:true,use_max_depth:true,max_children:-1,max_depth:-1,valid_children:"all"},lang:{new_node:"New folder",loading:"Loading ..."},callback:{beforechange:function(C,D){return true
},beforeopen:function(C,D){return true
},beforeclose:function(C,D){return true
},beforemove:function(E,C,D,F){return true
},beforecreate:function(E,C,D,F){return true
},beforerename:function(E,D,C){return true
},beforedelete:function(C,D){return true
},beforedata:function(C,D){return{id:B(C).attr("id")||0}
},ondata:function(C,D){return C
},onparse:function(D,C){return D
},onhover:function(C,D){},onselect:function(C,D){},ondeselect:function(C,D){},onchange:function(C,D){},onrename:function(E,C,D){},onmove:function(E,G,D,F,C){},oncopy:function(E,G,D,F,C){},oncreate:function(E,G,D,F,C){},ondelete:function(E,C,D){},onopen:function(C,D){},onopen_all:function(C){},onclose_all:function(C){},onclose:function(C,D){},error:function(D,C){},ondblclk:function(C,D){D.toggle_branch.call(D,C);
D.select_branch.call(D,C)
},onrgtclk:function(E,C,D){},onload:function(C){},oninit:function(C){},onfocus:function(C){},ondestroy:function(C){},onsearch:function(C,D){C.addClass("search")
},ondrop:function(E,C,D,F){},check:function(F,E,D,C){return D
},check_move:function(E,C,D,F){return true
}},plugins:{}},create:function(){return new A()
},focused:function(){return A.inst[A.focused]
},reference:function(C){var D=B(C);
if(!D.size()){D=B("#"+C)
}if(!D.size()){return null
}D=(D.is(".tree"))?D.attr("id"):D.parents(".tree:eq(0)").attr("id");
return A.inst[D]||null
},rollback:function(D){for(var C in D){if(!D.hasOwnProperty(C)){continue
}var F=A.inst[C];
var E=!F.locked;
if(E){F.lock(true)
}F.inp=false;
F.container.html(D[C].html).find(".dragged").removeClass("dragged").end().find(".hover").removeClass("hover");
if(D[C].selected){F.selected=B("#"+D[C].selected);
F.selected_arr=[];
F.container.find("a.clicked").each(function(){F.selected_arr.push(F.get_node(this))
})
}if(E){F.lock(false)
}delete E;
delete F
}},drop_mode:function(C){C=B.extend(C,{show:false,type:"default",str:"Foreign node"});
A.drag_drop.foreign=true;
A.drag_drop.isdown=true;
A.drag_drop.moving=true;
A.drag_drop.appended=false;
A.drag_drop.f_type=C.type;
A.drag_drop.f_data=C;
if(!C.show){A.drag_drop.drag_help=false;
A.drag_drop.drag_node=false
}else{}if(B.tree.drag_start!==false){B.tree.drag_start.call(null,false)
}},drag_start:false,drag:false,drag_end:false};
B.fn.tree=function(C){return this.each(function(){var D=B.extend({},C);
if(A.inst&&A.inst[B(this).attr("id")]){A.inst[B(this).attr("id")].destroy()
}if(D!==false){new A().init(this,D)
}})
};
function A(){return{cntr:++A.cntr,settings:B.extend({},B.tree.defaults),init:function(H,E){var G=this;
this.container=B(H);
if(this.container.size==0){return false
}A.inst[this.cntr]=this;
if(!this.container.attr("id")){this.container.attr("id","jstree_"+this.cntr)
}A.inst[this.container.attr("id")]=A.inst[this.cntr];
A.focused=this.cntr;
this.settings=B.extend(true,{},this.settings,E);
if(this.settings.languages&&this.settings.languages.length){this.current_lang=this.settings.languages[0];
var D=false;
var C="#"+this.container.attr("id");
for(var F=0;
F<this.settings.languages.length;
F++){D=A.add_css(C+" ."+this.settings.languages[F]);
if(D!==false){D.style.display=(this.settings.languages[F]==this.current_lang)?"":"none"
}}}else{this.current_lang=false
}this.container.addClass("tree");
if(this.settings.ui.theme_name!==false){if(this.settings.ui.theme_path===false){B("script").each(function(){if(this.src.toString().match(/jquery\.tree.*?js$/)){G.settings.ui.theme_path=this.src.toString().replace(/jquery\.tree.*?js$/,"")+"themes/"+G.settings.ui.theme_name+"/style.css";
return false
}})
}if(this.settings.ui.theme_path!=""&&B.inArray(this.settings.ui.theme_path,A.themes)==-1){A.add_sheet({url:this.settings.ui.theme_path});
A.themes.push(this.settings.ui.theme_path)
}this.container.addClass("tree-"+this.settings.ui.theme_name)
}var J="";
for(var I in this.settings.types){if(!this.settings.types.hasOwnProperty(I)){continue
}if(!this.settings.types[I].icon){continue
}if(this.settings.types[I].icon.image||this.settings.types[I].icon.position){if(I=="default"){J+="#"+this.container.attr("id")+" li > a ins { "
}else{J+="#"+this.container.attr("id")+" li[rel="+I+"] > a ins { "
}if(this.settings.types[I].icon.image){J+=" background-image:url("+this.settings.types[I].icon.image+"); "
}if(this.settings.types[I].icon.position){J+=" background-position:"+this.settings.types[I].icon.position+"; "
}J+="} "
}}if(J!=""){A.add_sheet({str:J})
}if(this.settings.rules.multiple){this.selected_arr=[]
}this.offset=false;
this.hovered=false;
this.locked=false;
this.callback("oninit",[this]);
this.refresh();
this.attach_events();
this.focus()
},refresh:function(F){if(this.locked){return this.error("LOCKED")
}var D=this;
if(F&&!this.settings.data.async){F=false
}this.is_partial_refresh=F?true:false;
this.opened=Array();
if(this.settings.opened!=false){B.each(this.settings.opened,function(G,H){if(this.replace(/^#/,"").length>0){D.opened.push("#"+this.replace(/^#/,""))
}});
this.settings.opened=false
}else{this.container.find("li.open").each(function(G){if(this.id){D.opened.push("#"+this.id)
}})
}if(this.selected){this.settings.selected=Array();
if(F){B(F).find("li:has(a.clicked)").each(function(){if(this.id){D.settings.selected.push("#"+this.id)
}})
}else{if(this.selected_arr){B.each(this.selected_arr,function(){if(this.attr("id")){D.settings.selected.push("#"+this.attr("id"))
}})
}else{if(this.selected.attr("id")){this.settings.selected.push("#"+this.selected.attr("id"))
}}}}else{if(this.settings.selected!==false){var E=Array();
if((typeof this.settings.selected).toLowerCase()=="object"){B.each(this.settings.selected,function(){if(this.replace(/^#/,"").length>0){E.push("#"+this.replace(/^#/,""))
}})
}else{if(this.settings.selected.replace(/^#/,"").length>0){E.push("#"+this.settings.selected.replace(/^#/,""))
}}this.settings.selected=E
}}if(F&&this.settings.data.async){this.opened=Array();
F=this.get_node(F);
F.find("li.open").each(function(G){D.opened.push("#"+this.id)
});
if(F.hasClass("open")){F.removeClass("open").addClass("closed")
}if(F.hasClass("leaf")){F.removeClass("leaf")
}F.children("ul:eq(0)").html("");
return this.open_branch(F,true,function(){D.reselect.apply(D)
})
}var D=this;
var C=new B.tree.datastores[this.settings.data.type]();
if(this.container.children("ul").size()==0){this.container.html("<ul class='ltr' style='direction:ltr;'><li class='last'><a class='loading' href='#'><ins>&nbsp;</ins>"+(this.settings.lang.loading||"Loading ...")+"</a></li></ul>")
}C.load(this.callback("beforedata",[false,this]),this,this.settings.data.opts,function(G){G=D.callback("ondata",[G,D]);
C.parse(G,D,D.settings.data.opts,function(H){H=D.callback("onparse",[H,D]);
D.container.empty().append(B("<ul class='ltr'>").html(H));
D.container.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
D.container.find("li").not(".open").not(".closed").addClass("leaf");
D.reselect()
})
})
},reselect:function(G){var D=this;
if(!G){this.cl_count=0
}else{this.cl_count--
}if(this.opened&&this.opened.length){var C=false;
for(var E=0;
this.opened&&E<this.opened.length;
E++){if(this.settings.data.async){var F=this.get_node(this.opened[E]);
if(F.size()&&F.hasClass("closed")>0){C=true;
var F=this.opened[E].toString().replace("/","\\/");
delete this.opened[E];
this.open_branch(F,true,function(){D.reselect.apply(D,[true])
});
this.cl_count++
}}else{this.open_branch(this.opened[E],true)
}}if(this.settings.data.async&&C){return 
}if(this.cl_count>0){return 
}delete this.opened
}if(this.cl_count>0){return 
}this.container.css("direction","ltr").children("ul:eq(0)").addClass("ltr");
if(this.settings.ui.dots==false){this.container.children("ul:eq(0)").addClass("no_dots")
}if(this.scrtop){this.container.scrollTop(D.scrtop);
delete this.scrtop
}if(this.settings.selected!==false){B.each(this.settings.selected,function(H){if(D.is_partial_refresh){D.select_node(B(D.settings.selected[H].toString().replace("/","\\/"),D.container),(D.settings.rules.multiple!==false))
}else{D.select_node(B(D.settings.selected[H].toString().replace("/","\\/"),D.container),(D.settings.rules.multiple!==false&&H>0))
}});
this.settings.selected=false
}this.callback("onload",[D])
},get:function(D,C,E){if(!C){C=this.settings.data.type
}if(!E){E=this.settings.data.opts
}return new B.tree.datastores[C]().get(D,this,E)
},attach_events:function(){var C=this;
this.container.bind("mousedown.jstree",function(D){if(A.drag_drop.isdown){A.drag_drop.move_type=false;
D.preventDefault();
D.stopPropagation();
D.stopImmediatePropagation();
return false
}}).bind("mouseup.jstree",function(D){setTimeout(function(){C.focus.apply(C)
},5)
}).bind("click.jstree",function(D){return true
});
B("#"+this.container.attr("id")+" li").live("click",function(D){if(D.target.tagName!="LI"){return true
}C.off_height();
if(D.pageY-B(D.target).offset().top>C.li_height){return true
}C.toggle_branch.apply(C,[D.target]);
D.stopPropagation();
return false
});
B("#"+this.container.attr("id")+" li a").live("click.jstree",function(D){if(D.which&&D.which==3){return true
}if(C.locked){D.preventDefault();
D.target.blur();
return C.error("LOCKED")
}C.select_branch.apply(C,[D.target,D.ctrlKey||C.settings.rules.multiple=="on"]);
if(C.inp){C.inp.blur()
}D.preventDefault();
D.target.blur();
return false
}).live("dblclick.jstree",function(D){if(C.locked){D.preventDefault();
D.stopPropagation();
D.target.blur();
return C.error("LOCKED")
}C.callback("ondblclk",[C.get_node(D.target).get(0),C]);
D.preventDefault();
D.stopPropagation();
D.target.blur()
}).live("contextmenu.jstree",function(D){if(C.locked){D.target.blur();
return C.error("LOCKED")
}return C.callback("onrgtclk",[C.get_node(D.target).get(0),C,D])
}).live("mouseover.jstree",function(D){if(C.locked){D.preventDefault();
D.stopPropagation();
return C.error("LOCKED")
}if(C.hovered!==false&&(D.target.tagName=="A"||D.target.tagName=="INS")){C.hovered.children("a").removeClass("hover");
C.hovered=false
}C.callback("onhover",[C.get_node(D.target).get(0),C])
}).live("mousedown.jstree",function(G){if(C.settings.rules.drag_button=="left"&&G.which&&G.which!=1){return true
}if(C.settings.rules.drag_button=="right"&&G.which&&G.which!=3){return true
}C.focus.apply(C);
if(C.locked){return C.error("LOCKED")
}var H=C.get_node(G.target);
if(C.settings.rules.multiple!=false&&C.selected_arr.length>1&&H.children("a:eq(0)").hasClass("clicked")){var D=0;
for(var F in C.selected_arr){if(!C.selected_arr.hasOwnProperty(F)){continue
}if(C.check("draggable",C.selected_arr[F])){C.selected_arr[F].addClass("dragged");
A.drag_drop.origin_tree=C;
D++
}}if(D>0){if(C.check("draggable",H)){A.drag_drop.drag_node=H
}else{A.drag_drop.drag_node=C.container.find("li.dragged:eq(0)")
}A.drag_drop.isdown=true;
var E=A.drag_drop.drag_node.clone();
if(C.settings.languages.length>0){E.find("a").not("."+C.current_lang).hide()
}A.drag_drop.dragged=C.container.find("li.dragged")
}}else{if(C.check("draggable",H)){A.drag_drop.drag_node=H;
var E=H.clone();
if(C.settings.languages.length>0){E.find("a").not("."+C.current_lang).hide()
}A.drag_drop.isdown=true;
A.drag_drop.foreign=false;
A.drag_drop.origin_tree=C;
H.addClass("dragged");
A.drag_drop.dragged=C.container.find("li.dragged")
}}A.drag_drop.init_x=G.pageX;
A.drag_drop.init_y=G.pageY;
H.blur();
G.preventDefault();
G.stopPropagation();
return false
})
},focus:function(){if(this.locked){return false
}if(A.focused!=this.cntr){A.focused=this.cntr;
this.callback("onfocus",[this])
}},off_height:function(){if(this.offset===false){this.container.css({position:"relative"});
this.offset=this.container.offset();
var C=0;
C=parseInt(B.curCSS(this.container.get(0),"paddingTop",true),10);
if(C){this.offset.top+=C
}C=parseInt(B.curCSS(this.container.get(0),"borderTopWidth",true),10);
if(C){this.offset.top+=C
}this.container.css({position:""})
}if(!this.li_height){var C=this.container.find("ul li.closed, ul li.leaf").eq(0);
this.li_height=C.height();
if(C.children("ul:eq(0)").size()){this.li_height-=C.children("ul:eq(0)").height()
}if(!this.li_height){this.li_height=18
}}},scroll_check:function(D,G){var C=this;
var J=C.container;
var H=C.container.offset();
var E=J.scrollTop();
var I=J.scrollLeft();
var F=(J.get(0).scrollWidth>J.width())?40:20;
if(G-H.top<20){J.scrollTop(Math.max((E-C.settings.ui.scroll_spd),0))
}if(J.height()-(G-H.top)<F){J.scrollTop(E+C.settings.ui.scroll_spd)
}if(D-H.left<20){J.scrollLeft(Math.max((I-C.settings.ui.scroll_spd),0))
}if(J.width()-(D-H.left)<40){J.scrollLeft(I+C.settings.ui.scroll_spd)
}if(J.scrollLeft()!=I||J.scrollTop()!=E){A.drag_drop.move_type=false;
A.drag_drop.ref_node=false
}A.drag_drop.scroll_time=setTimeout(function(){C.scroll_check(D,G)
},50)
},scroll_into_view:function(D){D=D?this.get_node(D):this.selected;
if(!D){return false
}var F=D.offset().top;
var E=this.container.offset().top;
var G=E+this.container.height();
var C=(this.container.get(0).scrollWidth>this.container.width())?40:20;
if(F+5<E){this.container.scrollTop(this.container.scrollTop()-(E-F+5))
}if(F+C>G){this.container.scrollTop(this.container.scrollTop()+(F+C-G))
}},get_node:function(C){return B(C).closest("li")
},get_type:function(D){D=!D?this.selected:this.get_node(D);
if(!D){return 
}var C=D.attr(this.settings.rules.type_attr);
return C||"default"
},set_type:function(D,C){C=!C?this.selected:this.get_node(C);
if(!C||!D){return 
}C.attr(this.settings.rules.type_attr,D)
},get_text:function(E,D){E=this.get_node(E);
if(!E||E.size()==0){return""
}if(this.settings.languages&&this.settings.languages.length){D=D?D:this.current_lang;
E=E.children("a."+D)
}else{E=E.children("a:visible")
}var C="";
E.contents().each(function(){if(this.nodeType==3){C=this.data;
return false
}});
return C
},check:function(D,C){if(this.locked){return false
}var E=false;
if(C===-1){if(typeof this.settings.rules[D]!="undefined"){E=this.settings.rules[D]
}}else{C=!C?this.selected:this.get_node(C);
if(!C){return 
}var F=this.get_type(C);
if(typeof this.settings.types[F]!="undefined"&&typeof this.settings.types[F][D]!="undefined"){E=this.settings.types[F][D]
}else{if(typeof this.settings.types["default"]!="undefined"&&typeof this.settings.types["default"][D]!="undefined"){E=this.settings.types["default"][D]
}}}if(typeof E=="function"){E=E.call(null,C,this)
}E=this.callback("check",[D,C,E,this]);
return E
},check_move:function(L,E,G){if(this.locked){return false
}if(B(E).closest("li.dragged").size()){return false
}var J=L.parents(".tree:eq(0)").get(0);
var H=E.parents(".tree:eq(0)").get(0);
if(J&&J!=H){var N=B.tree.reference(H.id).settings.rules.multitree;
if(N=="none"||(B.isArray(N)&&B.inArray(J.id,N)==-1)){return false
}}var M=(G!="inside")?this.parent(E):this.get_node(E);
L=this.get_node(L);
if(M==false){return false
}var O={max_depth:this.settings.rules.use_max_depth?this.check("max_depth",M):-1,max_children:this.settings.rules.use_max_children?this.check("max_children",M):-1,valid_children:this.check("valid_children",M)};
var C=(typeof L=="string")?L:this.get_type(L);
if(typeof O.valid_children!="undefined"&&(O.valid_children=="none"||(typeof O.valid_children=="object"&&B.inArray(C,B.makeArray(O.valid_children))==-1))){return false
}if(this.settings.rules.use_max_children){if(typeof O.max_children!="undefined"&&O.max_children!=-1){if(O.max_children==0){return false
}var F=1;
if(A.drag_drop.moving==true&&A.drag_drop.foreign==false){F=A.drag_drop.dragged.size();
F=F-M.find("> ul > li.dragged").size()
}if(O.max_children<M.find("> ul > li").size()+F){return false
}}}if(this.settings.rules.use_max_depth){if(typeof O.max_depth!="undefined"&&O.max_depth===0){return this.error("MOVE: MAX-DEPTH REACHED")
}var I=(O.max_depth>0)?O.max_depth:false;
var D=0;
var K=M;
while(K!==-1){K=this.parent(K);
D++;
var N=this.check("max_depth",K);
if(N>=0){I=(I===false)?(N-D):Math.min(I,N-D)
}if(I!==false&&I<=0){return this.error("MOVE: MAX-DEPTH REACHED")
}}if(I!==false&&I<=0){return this.error("MOVE: MAX-DEPTH REACHED")
}if(I!==false){var P=1;
if(typeof L!="string"){var K=L;
while(K.size()>0){if(I-P<0){return this.error("MOVE: MAX-DEPTH REACHED")
}K=K.children("ul").children("li");
P++
}}}}if(this.callback("check_move",[L,E,G,this])==false){return false
}return true
},hover_branch:function(C){if(this.locked){return this.error("LOCKED")
}var D=this;
var C=D.get_node(C);
if(!C.size()){return this.error("HOVER: NOT A VALID NODE")
}if(!D.check("clickable",C)){return this.error("SELECT: NODE NOT SELECTABLE")
}if(this.hovered){this.hovered.children("A").removeClass("hover")
}this.hovered=C;
this.hovered.children("a").addClass("hover");
this.scroll_into_view(this.hovered)
},select_node:function(C,E){if(this.locked){return this.error("LOCKED")
}if(!C&&this.hovered!==false){C=this.hovered
}var D=this;
C=D.get_node(C);
if(!C.size()){return this.error("SELECT: NOT A VALID NODE")
}C.children("a").removeClass("hover");
if(!D.check("clickable",C)){return this.error("SELECT: NODE NOT SELECTABLE")
}if(D.callback("beforechange",[C.get(0),D])===false){return this.error("SELECT: STOPPED BY USER")
}if(this.settings.rules.multiple!=false&&E&&C.children("a.clicked").size()>0){return this.deselect_branch(C)
}if(this.settings.rules.multiple!=false&&E){this.selected_arr.push(C)
}if(this.settings.rules.multiple!=false&&!E){for(var F in this.selected_arr){if(!this.selected_arr.hasOwnProperty(F)){continue
}this.selected_arr[F].children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected_arr[F].get(0),D])
}this.selected_arr=[];
this.selected_arr.push(C);
if(this.selected&&this.selected.children("A").hasClass("clicked")){this.selected.children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected.get(0),D])
}}if(!this.settings.rules.multiple){if(this.selected){this.selected.children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected.get(0),D])
}}this.selected=C;
if(this.hovered!==false){this.hovered.children("A").removeClass("hover");
this.hovered=C
}this.selected.children("a").addClass("clicked").end().parents("li.closed").each(function(){D.open_branch(this,true)
});
try{this.scroll_into_view(this.selected)
}catch(G){}},select_branch:function(C,E){var D=this;
this.select_node(C,E);
try{this.callback("onselect",[this.selected.get(0),D]);
this.callback("onchange",[this.selected.get(0),D])
}catch(F){}},deselect_branch:function(C){if(this.locked){return this.error("LOCKED")
}var D=this;
var C=this.get_node(C);
if(C.children("a.clicked").size()==0){return this.error("DESELECT: NODE NOT SELECTED")
}C.children("a").removeClass("clicked");
this.callback("ondeselect",[C.get(0),D]);
if(this.settings.rules.multiple!=false&&this.selected_arr.length>1){this.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){D.selected_arr.push(B(this))
});
if(C.get(0)==this.selected.get(0)){this.selected=this.selected_arr[0]
}}else{if(this.settings.rules.multiple!=false){this.selected_arr=[]
}this.selected=false
}this.callback("onchange",[C.get(0),D])
},toggle_branch:function(C){if(this.locked){return this.error("LOCKED")
}var C=this.get_node(C);
if(C.hasClass("closed")){return this.open_branch(C)
}if(C.hasClass("open")){return this.close_branch(C)
}},open_branch:function(F,E,D){var C=this;
if(this.locked){return this.error("LOCKED")
}var F=this.get_node(F);
if(!F.size()){return this.error("OPEN: NO SUCH NODE")
}if(F.hasClass("leaf")){return this.error("OPEN: OPENING LEAF NODE")
}if(this.settings.data.async&&F.find("li").size()==0){if(this.callback("beforeopen",[F.get(0),this])===false){return this.error("OPEN: STOPPED BY USER")
}F.children("ul:eq(0)").remove().end().append("<ul><li class='last'><a class='loading' href='#'><ins>&nbsp;</ins>"+(C.settings.lang.loading||"Loading ...")+"</a></li></ul>");
F.removeClass("closed").addClass("open");
var G=new B.tree.datastores[this.settings.data.type]();
G.load(this.callback("beforedata",[F,this]),this,this.settings.data.opts,function(H){H=C.callback("ondata",[H,C]);
if(!H||H.length==0){F.removeClass("closed").removeClass("open").addClass("leaf").children("ul").remove();
if(D){D.call()
}return 
}G.parse(H,C,C.settings.data.opts,function(I){I=C.callback("onparse",[I,C]);
F.children("ul:eq(0)").replaceWith(B("<ul>").html(I));
F.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
F.find("li").not(".open").not(".closed").addClass("leaf");
C.open_branch.apply(C,[F]);
if(D){D.call()
}})
});
return true
}else{if(!this.settings.data.async){if(this.callback("beforeopen",[F.get(0),this])===false){return this.error("OPEN: STOPPED BY USER")
}}if(parseInt(this.settings.ui.animation)>0&&!E){F.children("ul:eq(0)").css("display","none");
F.removeClass("closed").addClass("open");
F.children("ul:eq(0)").slideDown(parseInt(this.settings.ui.animation),function(){B(this).css("display","");
if(D){D.call()
}})
}else{F.removeClass("closed").addClass("open");
if(D){D.call()
}}this.callback("onopen",[F.get(0),this]);
return true
}},close_branch:function(C,E){if(this.locked){return this.error("LOCKED")
}var D=this;
var C=this.get_node(C);
if(!C.size()){return this.error("CLOSE: NO SUCH NODE")
}if(D.callback("beforeclose",[C.get(0),D])===false){return this.error("CLOSE: STOPPED BY USER")
}if(parseInt(this.settings.ui.animation)>0&&!E&&C.children("ul:eq(0)").size()==1){C.children("ul:eq(0)").slideUp(parseInt(this.settings.ui.animation),function(){if(C.hasClass("open")){C.removeClass("open").addClass("closed")
}B(this).css("display","")
})
}else{if(C.hasClass("open")){C.removeClass("open").addClass("closed")
}}if(this.selected&&this.settings.ui.selected_parent_close!==false&&C.children("ul:eq(0)").find("a.clicked").size()>0){C.find("li:has(a.clicked)").each(function(){D.deselect_branch(this)
});
if(this.settings.ui.selected_parent_close=="select_parent"&&C.children("a.clicked").size()==0){this.select_branch(C,(this.settings.rules.multiple!=false&&this.selected_arr.length>0))
}}this.callback("onclose",[C.get(0),this])
},open_all:function(F,D){if(this.locked){return this.error("LOCKED")
}var C=this;
F=F?this.get_node(F):this.container;
var E=F.find("li.closed").size();
if(!D){this.cl_count=0
}else{this.cl_count--
}if(E>0){this.cl_count+=E;
F.find("li.closed").each(function(){var G=this;
C.open_branch.apply(C,[this,true,function(){C.open_all.apply(C,[G,true])
}])
})
}else{if(this.cl_count==0){this.callback("onopen_all",[this])
}}},close_all:function(C){if(this.locked){return this.error("LOCKED")
}var D=this;
C=C?this.get_node(C):this.container;
C.find("li.open").each(function(){D.close_branch(this,true)
});
this.callback("onclose_all",[this])
},set_lang:function(C){if(!B.isArray(this.settings.languages)||this.settings.languages.length==0){return false
}if(this.locked){return this.error("LOCKED")
}if(!B.inArray(C,this.settings.languages)&&typeof this.settings.languages[C]!="undefined"){C=this.settings.languages[C]
}if(typeof C=="undefined"){return false
}if(C==this.current_lang){return true
}var E=false;
var D="#"+this.container.attr("id");
E=A.get_css(D+" ."+this.current_lang);
if(E!==false){E.style.display="none"
}E=A.get_css(D+" ."+C);
if(E!==false){E.style.display=""
}this.current_lang=C;
return true
},get_lang:function(){if(!B.isArray(this.settings.languages)||this.settings.languages.length==0){return false
}return this.current_lang
},create:function(F,T,R){if(this.locked){return this.error("LOCKED")
}var L=false;
if(T==-1){L=true;
T=this.container
}else{T=T?this.get_node(T):this.selected
}if(!L&&(!T||!T.size())){return this.error("CREATE: NO NODE SELECTED")
}var C=R;
var P=T;
if(R=="before"){R=T.parent().children().index(T);
T=T.parents("li:eq(0)")
}if(R=="after"){R=T.parent().children().index(T)+1;
T=T.parents("li:eq(0)")
}if(!L&&T.size()==0){L=true;
T=this.container
}if(!L){if(!this.check("creatable",T)){return this.error("CREATE: CANNOT CREATE IN NODE")
}if(T.hasClass("closed")){if(this.settings.data.async&&T.children("ul").size()==0){var M=this;
return this.open_branch(T,true,function(){M.create.apply(M,[F,T,R])
})
}else{this.open_branch(T,true)
}}}var S=false;
if(!F){F={}
}else{F=B.extend(true,{},F)
}if(!F.attributes){F.attributes={}
}if(!F.attributes[this.settings.rules.type_attr]){F.attributes[this.settings.rules.type_attr]=this.get_type(P)||"default"
}if(this.settings.languages.length){if(!F.data){F.data={};
S=true
}for(var N=0;
N<this.settings.languages.length;
N++){if(!F.data[this.settings.languages[N]]){F.data[this.settings.languages[N]]=((typeof this.settings.lang.new_node).toLowerCase()!="string"&&this.settings.lang.new_node[N])?this.settings.lang.new_node[N]:this.settings.lang.new_node
}}}else{if(!F.data){F.data=this.settings.lang.new_node;
S=true
}}F=this.callback("ondata",[F,this]);
var J=B.tree.datastores.json().parse(F,this);
J=this.callback("onparse",[J,this]);
var E=B(J);
if(E.children("ul").size()){if(!E.is(".open")){E.addClass("closed")
}}else{E.addClass("leaf")
}E.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
E.find("li").not(".open").not(".closed").addClass("leaf");
var I={max_depth:this.settings.rules.use_max_depth?this.check("max_depth",(L?-1:T)):-1,max_children:this.settings.rules.use_max_children?this.check("max_children",(L?-1:T)):-1,valid_children:this.check("valid_children",(L?-1:T))};
var D=this.get_type(E);
if(typeof I.valid_children!="undefined"&&(I.valid_children=="none"||(B.isArray(I.valid_children)&&B.inArray(D,I.valid_children)==-1))){return this.error("CREATE: NODE NOT A VALID CHILD")
}if(this.settings.rules.use_max_children){if(typeof I.max_children!="undefined"&&I.max_children!=-1&&I.max_children>=this.children(T).size()){return this.error("CREATE: MAX_CHILDREN REACHED")
}}if(this.settings.rules.use_max_depth){if(typeof I.max_depth!="undefined"&&I.max_depth===0){return this.error("CREATE: MAX-DEPTH REACHED")
}var H=(I.max_depth>0)?I.max_depth:false;
var N=0;
var G=T;
while(G!==-1&&!L){G=this.parent(G);
N++;
var K=this.check("max_depth",G);
if(K>=0){H=(H===false)?(K-N):Math.min(H,K-N)
}if(H!==false&&H<=0){return this.error("CREATE: MAX-DEPTH REACHED")
}}if(H!==false&&H<=0){return this.error("CREATE: MAX-DEPTH REACHED")
}if(H!==false){var O=1;
var G=E;
while(G.size()>0){if(H-O<0){return this.error("CREATE: MAX-DEPTH REACHED")
}G=G.children("ul").children("li");
O++
}}}if((typeof R).toLowerCase()=="undefined"||R=="inside"){R=(this.settings.rules.createat=="top")?0:T.children("ul:eq(0)").children("li").size()
}if(T.children("ul").size()==0||(L==true&&T.children("ul").children("li").size()==0)){if(!L){var Q=this.moved(E,T.children("a:eq(0)"),"inside",true)
}else{var Q=this.moved(E,this.container.children("ul:eq(0)"),"inside",true)
}}else{if(C=="before"&&T.children("ul:eq(0)").children("li:nth-child("+(R+1)+")").size()){var Q=this.moved(E,T.children("ul:eq(0)").children("li:nth-child("+(R+1)+")").children("a:eq(0)"),"before",true)
}else{if(C=="after"&&T.children("ul:eq(0)").children("li:nth-child("+(R)+")").size()){var Q=this.moved(E,T.children("ul:eq(0)").children("li:nth-child("+(R)+")").children("a:eq(0)"),"after",true)
}else{if(T.children("ul:eq(0)").children("li:nth-child("+(R+1)+")").size()){var Q=this.moved(E,T.children("ul:eq(0)").children("li:nth-child("+(R+1)+")").children("a:eq(0)"),"before",true)
}else{var Q=this.moved(E,T.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after",true)
}}}}if(Q===false){return this.error("CREATE: ABORTED")
}if(S){this.select_branch(E.children("a:eq(0)"));
this.rename()
}return E
},rename:function(D,I){if(this.locked){return this.error("LOCKED")
}D=D?this.get_node(D):this.selected;
var G=this;
if(!D||!D.size()){return this.error("RENAME: NO NODE SELECTED")
}if(!this.check("renameable",D)){return this.error("RENAME: NODE NOT RENAMABLE")
}if(!this.callback("beforerename",[D.get(0),G.current_lang,G])){return this.error("RENAME: STOPPED BY USER")
}D.parents("li.closed").each(function(){G.open_branch(this)
});
if(this.current_lang){D=D.find("a."+this.current_lang)
}else{D=D.find("a:first")
}var E={};
E[this.container.attr("id")]=this.get_rollback();
var C=D.children("ins").clone();
if((typeof I).toLowerCase()=="string"){D.text(I).prepend(C);
G.callback("onrename",[G.get_node(D).get(0),G,E])
}else{var F="";
D.contents().each(function(){if(this.nodeType==3){F=this.data;
return false
}});
G.inp=B("<input type='text' autocomplete='off' />");
G.inp.val(F.replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<")).bind("mousedown",function(J){J.stopPropagation()
}).bind("mouseup",function(J){J.stopPropagation()
}).bind("click",function(J){J.stopPropagation()
}).bind("keyup",function(K){var J=K.keyCode||K.which;
if(J==27){this.value=F;
this.blur();
return 
}if(J==13){this.blur();
return 
}});
G.inp.blur(function(J){if(this.value==""){this.value=F
}D.text(this.value).prepend(C);
D.get(0).style.display="";
D.prevAll("span").remove();
G.inp=false;
G.callback("onrename",[G.get_node(D).get(0),G,E])
});
var H=B("<span />").addClass(D.attr("class")).append(C).append(G.inp);
D.get(0).style.display="none";
D.parent().prepend(H);
G.inp.get(0).focus();
G.inp.get(0).select()
}},remove:function(D){if(this.locked){return this.error("LOCKED")
}var E=this;
var H={};
H[this.container.attr("id")]=this.get_rollback();
if(D&&(!this.selected||this.get_node(D).get(0)!=this.selected.get(0))){D=this.get_node(D);
if(D.size()){if(!this.check("deletable",D)){return this.error("DELETE: NODE NOT DELETABLE")
}if(!this.callback("beforedelete",[D.get(0),E])){return this.error("DELETE: STOPPED BY USER")
}$parent=D.parent();
if(D.find("a.clicked").size()){var G=false;
E.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){if(!G&&this==E.selected.get(0)){G=true
}if(B(this).parents().index(D)!=-1){return true
}E.selected_arr.push(B(this))
});
if(G){this.selected=this.selected_arr[0]||false
}}D=D.remove();
$parent.children("li:last").addClass("last");
if($parent.children("li").size()==0){$li=$parent.parents("li:eq(0)");
$li.removeClass("open").removeClass("closed").addClass("leaf").children("ul").remove()
}this.callback("ondelete",[D.get(0),this,H])
}}else{if(this.selected){if(!this.check("deletable",this.selected)){return this.error("DELETE: NODE NOT DELETABLE")
}if(!this.callback("beforedelete",[this.selected.get(0),E])){return this.error("DELETE: STOPPED BY USER")
}$parent=this.selected.parent();
var D=this.selected;
if(this.settings.rules.multiple==false||this.selected_arr.length==1){var F=true;
var C=this.settings.ui.selected_delete=="select_previous"?this.prev(this.selected):false
}D=D.remove();
$parent.children("li:last").addClass("last");
if($parent.children("li").size()==0){$li=$parent.parents("li:eq(0)");
$li.removeClass("open").removeClass("closed").addClass("leaf").children("ul").remove()
}if(!F&&this.settings.rules.multiple!=false){var E=this;
this.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){E.selected_arr.push(B(this))
});
if(this.selected_arr.length>0){this.selected=this.selected_arr[0];
this.remove()
}}if(F&&C){this.select_branch(C)
}this.callback("ondelete",[D.get(0),this,H])
}else{return this.error("DELETE: NO NODE SELECTED")
}}},next:function(D,C){D=this.get_node(D);
if(!D.size()){return false
}if(C){return(D.nextAll("li").size()>0)?D.nextAll("li:eq(0)"):false
}if(D.hasClass("open")){return D.find("li:eq(0)")
}else{if(D.nextAll("li").size()>0){return D.nextAll("li:eq(0)")
}else{return D.parents("li").next("li").eq(0)
}}},prev:function(D,C){D=this.get_node(D);
if(!D.size()){return false
}if(C){return(D.prevAll("li").size()>0)?D.prevAll("li:eq(0)"):false
}if(D.prev("li").size()){var D=D.prev("li").eq(0);
while(D.hasClass("open")){D=D.children("ul:eq(0)").children("li:last")
}return D
}else{return D.parents("li:eq(0)").size()?D.parents("li:eq(0)"):false
}},parent:function(C){C=this.get_node(C);
if(!C.size()){return false
}return C.parents("li:eq(0)").size()?C.parents("li:eq(0)"):-1
},children:function(C){if(C===-1){return this.container.children("ul:eq(0)").children("li")
}C=this.get_node(C);
if(!C.size()){return false
}return C.children("ul:eq(0)").children("li")
},toggle_dots:function(){if(this.settings.ui.dots){this.settings.ui.dots=false;
this.container.children("ul:eq(0)").addClass("no_dots")
}else{this.settings.ui.dots=true;
this.container.children("ul:eq(0)").removeClass("no_dots")
}},callback:function(E,F){var D=false;
var C=null;
for(var G in this.settings.plugins){if(typeof B.tree.plugins[G]!="object"){continue
}D=B.tree.plugins[G];
if(D.callbacks&&typeof D.callbacks[E]=="function"){C=D.callbacks[E].apply(this,F)
}if(typeof C!=="undefined"&&C!==null){if(E=="ondata"||E=="onparse"){F[0]=C
}else{return C
}}}D=this.settings.callback[E];
if(typeof D=="function"){return D.apply(null,F)
}},get_rollback:function(){var C={};
C.html=this.container.html();
C.selected=this.selected?this.selected.attr("id"):false;
return C
},moved:function(F,N,H,G,I,P){var F=B(F);
var K=B(F).parents("ul:eq(0)");
var L=B(N);
if(L.is("ins")){L=L.parent()
}if(!P){var P={};
P[this.container.attr("id")]=this.get_rollback();
if(!G){var E=F.size()>1?F.eq(0).parents(".tree:eq(0)"):F.parents(".tree:eq(0)");
if(E.get(0)!=this.container.get(0)){E=A.inst[E.attr("id")];
P[E.container.attr("id")]=E.get_rollback()
}delete E
}}if(H=="inside"&&this.settings.data.async){var O=this;
if(this.get_node(L).hasClass("closed")){return this.open_branch(this.get_node(L),true,function(){O.moved.apply(O,[F,N,H,G,I,P])
})
}if(this.get_node(L).find("> ul > li > a.loading").size()==1){setTimeout(function(){O.moved.apply(O,[F,N,H,G,I])
},200);
return 
}}if(F.size()>1){var O=this;
var E=this.moved(F.eq(0),N,H,false,I,P);
F.each(function(R){if(R==0){return 
}if(E){E=O.moved(this,E.children("a:eq(0)"),"after",false,I,P)
}});
return F
}if(I){_what=F.clone();
_what.each(function(R){this.id=this.id+"_copy";
B(this).find("li").each(function(){this.id=this.id+"_copy"
});
B(this).removeClass("dragged").find("a.clicked").removeClass("clicked").end().find("li.dragged").removeClass("dragged")
})
}else{_what=F
}if(G){if(!this.callback("beforecreate",[this.get_node(F).get(0),this.get_node(N).get(0),H,this])){return false
}}else{if(!this.callback("beforemove",[this.get_node(F).get(0),this.get_node(N).get(0),H,this])){return false
}}if(!G){var E=F.parents(".tree:eq(0)");
if(E.get(0)!=this.container.get(0)){E=A.inst[E.attr("id")];
if(E.settings.languages.length){var C=[];
if(this.settings.languages.length==0){C.push("."+E.current_lang)
}else{for(var M in this.settings.languages){if(!this.settings.languages.hasOwnProperty(M)){continue
}for(var J in E.settings.languages){if(!E.settings.languages.hasOwnProperty(J)){continue
}if(this.settings.languages[M]==E.settings.languages[J]){C.push("."+this.settings.languages[M])
}}}}if(C.length==0){return this.error("MOVE: NO COMMON LANGUAGES")
}_what.find("a").not(C.join(",")).remove()
}_what.find("a.clicked").removeClass("clicked")
}}F=_what;
switch(H){case"before":L.parents("ul:eq(0)").children("li.last").removeClass("last");
L.parent().before(F.removeClass("last"));
L.parents("ul:eq(0)").children("li:last").addClass("last");
break;
case"after":L.parents("ul:eq(0)").children("li.last").removeClass("last");
L.parent().after(F.removeClass("last"));
L.parents("ul:eq(0)").children("li:last").addClass("last");
break;
case"inside":if(L.parent().children("ul:first").size()){if(this.settings.rules.createat=="top"){L.parent().children("ul:first").prepend(F.removeClass("last")).children("li:last").addClass("last");
var Q=L.parent().children("ul:first").children("li:first");
if(Q.size()){H="before";
N=Q
}}else{var Q=L.parent().children("ul:first").children(".last");
if(Q.size()){H="after";
N=Q
}L.parent().children("ul:first").children(".last").removeClass("last").end().append(F.removeClass("last")).children("li:last").addClass("last")
}}else{F.addClass("last");
L.parent().removeClass("leaf").append("<ul/>");
if(!L.parent().hasClass("open")){L.parent().addClass("closed")
}L.parent().children("ul:first").prepend(F)
}if(L.parent().hasClass("closed")){this.open_branch(L)
}break;
default:break
}if(K.find("li").size()==0){var D=K.parent();
D.removeClass("open").removeClass("closed").addClass("leaf");
if(!D.is(".tree")){D.children("ul").remove()
}D.parents("ul:eq(0)").children("li.last").removeClass("last").end().children("li:last").addClass("last")
}else{K.children("li.last").removeClass("last");
K.children("li:last").addClass("last")
}if(I){this.callback("oncopy",[this.get_node(F).get(0),this.get_node(N).get(0),H,this,P])
}else{if(G){this.callback("oncreate",[this.get_node(F).get(0),(L.is("ul")?-1:this.get_node(N).get(0)),H,this,P])
}else{this.callback("onmove",[this.get_node(F).get(0),this.get_node(N).get(0),H,this,P])
}}return F
},error:function(C){this.callback("error",[C,this]);
return false
},lock:function(C){this.locked=C;
if(this.locked){this.container.children("ul:eq(0)").addClass("locked")
}else{this.container.children("ul:eq(0)").removeClass("locked")
}},cut:function(C){if(this.locked){return this.error("LOCKED")
}C=C?this.get_node(C):this.container.find("a.clicked").filter(":first-child").parent();
if(!C||!C.size()){return this.error("CUT: NO NODE SELECTED")
}A.cut_copy.copy_nodes=false;
A.cut_copy.cut_nodes=C
},copy:function(C){if(this.locked){return this.error("LOCKED")
}C=C?this.get_node(C):this.container.find("a.clicked").filter(":first-child").parent();
if(!C||!C.size()){return this.error("COPY: NO NODE SELECTED")
}A.cut_copy.copy_nodes=C;
A.cut_copy.cut_nodes=false
},paste:function(E,F){if(this.locked){return this.error("LOCKED")
}var I=false;
if(E==-1){I=true;
E=this.container
}else{E=E?this.get_node(E):this.selected
}if(!I&&(!E||!E.size())){return this.error("PASTE: NO NODE SELECTED")
}if(!A.cut_copy.copy_nodes&&!A.cut_copy.cut_nodes){return this.error("PASTE: NOTHING TO DO")
}var G=this;
var D=F;
if(F=="before"){F=E.parent().children().index(E);
E=E.parents("li:eq(0)")
}else{if(F=="after"){F=E.parent().children().index(E)+1;
E=E.parents("li:eq(0)")
}else{if((typeof F).toLowerCase()=="undefined"||F=="inside"){F=(this.settings.rules.createat=="top")?0:E.children("ul:eq(0)").children("li").size()
}}}if(!I&&E.size()==0){I=true;
E=this.container
}if(A.cut_copy.copy_nodes&&A.cut_copy.copy_nodes.size()){var C=true;
if(!I&&!this.check_move(A.cut_copy.copy_nodes,E.children("a:eq(0)"),"inside")){return false
}if(E.children("ul").size()==0||(I==true&&E.children("ul").children("li").size()==0)){if(!I){var H=this.moved(A.cut_copy.copy_nodes,E.children("a:eq(0)"),"inside",false,true)
}else{var H=this.moved(A.cut_copy.copy_nodes,this.container.children("ul:eq(0)"),"inside",false,true)
}}else{if(D=="before"&&E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").size()){var H=this.moved(A.cut_copy.copy_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").children("a:eq(0)"),"before",false,true)
}else{if(D=="after"&&E.children("ul:eq(0)").children("li:nth-child("+(F)+")").size()){var H=this.moved(A.cut_copy.copy_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F)+")").children("a:eq(0)"),"after",false,true)
}else{if(E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").size()){var H=this.moved(A.cut_copy.copy_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").children("a:eq(0)"),"before",false,true)
}else{var H=this.moved(A.cut_copy.copy_nodes,E.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after",false,true)
}}}}A.cut_copy.copy_nodes=false
}if(A.cut_copy.cut_nodes&&A.cut_copy.cut_nodes.size()){var C=true;
E.parents().andSelf().each(function(){if(A.cut_copy.cut_nodes.index(this)!=-1){C=false;
return false
}});
if(!C){return this.error("Invalid paste")
}if(!I&&!this.check_move(A.cut_copy.cut_nodes,E.children("a:eq(0)"),"inside")){return false
}if(E.children("ul").size()==0||(I==true&&E.children("ul").children("li").size()==0)){if(!I){var H=this.moved(A.cut_copy.cut_nodes,E.children("a:eq(0)"),"inside")
}else{var H=this.moved(A.cut_copy.cut_nodes,this.container.children("ul:eq(0)"),"inside")
}}else{if(D=="before"&&E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").size()){var H=this.moved(A.cut_copy.cut_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").children("a:eq(0)"),"before")
}else{if(D=="after"&&E.children("ul:eq(0)").children("li:nth-child("+(F)+")").size()){var H=this.moved(A.cut_copy.cut_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F)+")").children("a:eq(0)"),"after")
}else{if(E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").size()){var H=this.moved(A.cut_copy.cut_nodes,E.children("ul:eq(0)").children("li:nth-child("+(F+1)+")").children("a:eq(0)"),"before")
}else{var H=this.moved(A.cut_copy.cut_nodes,E.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after")
}}}}A.cut_copy.cut_nodes=false
}},search:function(I,C){var H=this;
if(!I||(this.srch&&I!=this.srch)){this.srch="";
this.srch_opn=false;
this.container.find("a.search").removeClass("search")
}this.srch=I;
if(!I){return 
}if(!C){C="contains"
}if(this.settings.data.async){if(!this.srch_opn){var J=B.extend({search:I},this.callback("beforedata",[false,this]));
B.ajax({type:this.settings.data.opts.method,url:this.settings.data.opts.url,data:J,dataType:"text",success:function(L){H.srch_opn=B.unique(L.split(","));
H.search.apply(H,[I,C])
}})
}else{if(this.srch_opn.length){if(this.srch_opn&&this.srch_opn.length){var E=false;
for(var F=0;
F<this.srch_opn.length;
F++){if(this.get_node("#"+this.srch_opn[F]).size()>0){E=true;
var G="#"+this.srch_opn[F];
delete this.srch_opn[F];
this.open_branch(G,true,function(){H.search.apply(H,[I,C])
})
}}if(!E){this.srch_opn=[];
H.search.apply(H,[I,C])
}}}else{this.srch_opn=false;
var D="a";
if(this.settings.languages.length){D+="."+this.current_lang
}this.callback("onsearch",[this.container.find(D+":"+C+"('"+I+"')"),this])
}}}else{var D="a";
if(this.settings.languages.length){D+="."+this.current_lang
}var K=this.container.find(D+":"+C+"('"+I+"')");
K.parents("li.closed").each(function(){H.open_branch(this,true)
});
this.callback("onsearch",[K,this])
}},add_sheet:A.add_sheet,destroy:function(){this.callback("ondestroy",[this]);
this.container.unbind(".jstree");
B("#"+this.container.attr("id")).die("click.jstree").die("dblclick.jstree").die("mouseover.jstree").die("mouseout.jstree").die("mousedown.jstree");
this.container.removeClass("tree ui-widget ui-widget-content tree-default tree-"+this.settings.ui.theme_name).children("ul").removeClass("no_dots ltr locked").find("li").removeClass("leaf").removeClass("open").removeClass("closed").removeClass("last").children("a").removeClass("clicked hover search");
if(this.cntr==A.focused){for(var C in A.inst){if(C!=this.cntr&&C!=this.container.attr("id")){A.inst[C].focus();
break
}}}A.inst[this.cntr]=false;
A.inst[this.container.attr("id")]=false;
delete A.inst[this.cntr];
delete A.inst[this.container.attr("id")];
A.cntr--
}}
}A.cntr=0;
A.inst={};
A.themes=[];
A.drag_drop={isdown:false,drag_node:false,drag_help:false,dragged:false,init_x:false,init_y:false,moving:false,origin_tree:false,marker:false,move_type:false,ref_node:false,appended:false,foreign:false,droppable:[],open_time:false,scroll_time:false};
A.mouseup=function(D){var C=A.drag_drop;
if(C.open_time){clearTimeout(C.open_time)
}if(C.scroll_time){clearTimeout(C.scroll_time)
}if(C.moving&&B.tree.drag_end!==false){B.tree.drag_end.call(null,D,C)
}if(C.foreign===false&&C.drag_node&&C.drag_node.size()){if(C.move_type){var E=A.inst[C.ref_node.parents(".tree:eq(0)").attr("id")];
if(E){E.moved(C.dragged,C.ref_node,C.move_type,false,(C.origin_tree.settings.rules.drag_copy=="on"||(C.origin_tree.settings.rules.drag_copy=="ctrl"&&D.ctrlKey)))
}}C.move_type=false;
C.ref_node=false
}if(C.foreign!==false){if(C.drag_help){C.drag_help.remove()
}if(C.move_type){var E=A.inst[C.ref_node.parents(".tree:eq(0)").attr("id")];
if(E){E.callback("ondrop",[C.f_data,E.get_node(C.ref_node).get(0),C.move_type,E])
}}C.foreign=false;
C.move_type=false;
C.ref_node=false
}if(A.drag_drop.marker){A.drag_drop.marker.hide()
}if(C.dragged&&C.dragged.size()){C.dragged.removeClass("dragged")
}C.dragged=false;
C.drag_help=false;
C.drag_node=false;
C.f_type=false;
C.f_data=false;
C.init_x=false;
C.init_y=false;
C.moving=false;
C.appended=false;
C.origin_tree=false;
if(C.isdown){C.isdown=false;
D.preventDefault();
D.stopPropagation();
return false
}};
A.mousemove=function(C){var G=A.drag_drop;
var L=false;
if(G.isdown){if(!G.moving&&Math.abs(G.init_x-C.pageX)<5&&Math.abs(G.init_y-C.pageY)<5){C.preventDefault();
C.stopPropagation();
return false
}else{if(!G.moving){A.drag_drop.moving=true;
L=true
}}if(G.open_time){clearTimeout(G.open_time)
}if(G.drag_help!==false){if(!G.appended){if(G.foreign!==false){G.origin_tree=B.tree.focused()
}B("body").append(G.drag_help);
G.w=G.drag_help.width();
G.appended=true
}G.drag_help.css({left:(C.pageX+5),top:(C.pageY+15)})
}if(L&&B.tree.drag_start!==false){B.tree.drag_start.call(null,C,G)
}if(B.tree.drag!==false){B.tree.drag.call(null,C,G)
}if(C.target.tagName=="DIV"&&C.target.id=="jstree-marker"){return false
}var J=B(C.target);
if(J.is("ins")){J=J.parent()
}var E=J.is(".tree")?J:J.parents(".tree:eq(0)");
if(E.size()==0||!A.inst[E.attr("id")]){if(G.scroll_time){clearTimeout(G.scroll_time)
}if(G.drag_help!==false){G.drag_help.find("li:eq(0) ins").addClass("forbidden")
}G.move_type=false;
G.ref_node=false;
return false
}var K=A.inst[E.attr("id")];
K.off_height();
if(G.scroll_time){clearTimeout(G.scroll_time)
}G.scroll_time=setTimeout(function(){K.scroll_check(C.pageX,C.pageY)
},50);
var N=false;
var O=E.scrollTop();
if(C.target.tagName=="A"||C.target.tagName=="INS"){if(J.is("#jstree-dragged")){return false
}if(K.get_node(C.target).hasClass("closed")){G.open_time=setTimeout(function(){K.open_branch(J)
},500)
}var F=J.offset();
var D={x:(F.left-1),y:(C.pageY-F.top)};
var H=[];
if(D.y<K.li_height/3+1){H=["before","inside","after"]
}else{if(D.y>K.li_height*2/3-1){H=["after","inside","before"]
}else{if(D.y<K.li_height/2){H=["inside","before","after"]
}else{H=["inside","after","before"]
}}}var I=false;
var M=(G.foreign==false)?G.origin_tree.container.find("li.dragged"):G.f_type;
B.each(H,function(P,Q){if(K.check_move(M,J,Q)){N=Q;
I=true;
return false
}});
if(I){switch(N){case"before":D.y=F.top-2;
break;
case"after":D.y=F.top-2+K.li_height;
break;
case"inside":D.x-=2;
D.y=F.top-2+K.li_height/2;
break
}G.move_type=N;
G.ref_node=B(C.target);
if(G.drag_help!==false){G.drag_help.find(".forbidden").removeClass("forbidden")
}}}if((J.is(".tree")||J.is("ul"))&&J.find("li:eq(0)").size()==0){var F=J.offset();
G.move_type="inside";
G.ref_node=E.children("ul:eq(0)");
if(G.drag_help!==false){G.drag_help.find(".forbidden").removeClass("forbidden")
}}else{if((C.target.tagName!="A"&&C.target.tagName!="INS")||!I){if(G.drag_help!==false){G.drag_help.find("li:eq(0) ins").addClass("forbidden")
}G.move_type=false;
G.ref_node=false
}}C.preventDefault();
C.stopPropagation();
return false
}return true
};
B(function(){B(document).bind("mousemove.jstree",A.mousemove);
B(document).bind("mouseup.jstree",A.mouseup)
});
A.cut_copy={copy_nodes:false,cut_nodes:false};
A.css=false;
A.get_css=function(D,F){D=D.toLowerCase();
var C=A.css.cssRules||A.css.rules;
var E=0;
do{if(C.length&&E>C.length+5){return false
}if(C[E].selectorText&&C[E].selectorText.toLowerCase()==D){if(F==true){if(A.css.removeRule){document.styleSheets[i].removeRule(E)
}if(A.css.deleteRule){document.styleSheets[i].deleteRule(E)
}return true
}else{return C[E]
}}}while(C[++E]);
return false
};
A.add_css=function(C){if(A.get_css(C)){return false
}(A.css.insertRule)?A.css.insertRule(C+" { }",0):A.css.addRule(C,null,0);
return A.get_css(C)
};
A.remove_css=function(C){return A.get_css(C,true)
};
A.add_sheet=function(F){if(F.str){var E=document.createElement("style");
E.type="text/css";
if(E.styleSheet){E.styleSheet.cssText=F.str
}else{E.appendChild(document.createTextNode(F.str))
}document.getElementsByTagName("head")[0].appendChild(E);
return E.sheet
}if(F.url){if(document.createStyleSheet){try{document.createStyleSheet(F.url)
}catch(D){}}else{var C=document.createElement("link");
C.rel="stylesheet";
C.type="text/css";
C.media="all";
C.href=F.url;
document.getElementsByTagName("head")[0].appendChild(C);
return C.styleSheet
}}};
B(function(){var C=navigator.userAgent.toLowerCase();
var E=(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1];
var D='/* TREE LAYOUT */ .tree ul { margin:0 0 0 5px; padding:0 0 0 0; list-style-type:none; } .tree li { display:block; min-height:18px; line-height:18px; padding:0 0 0 15px; margin:0 0 0 0; /* Background fix */ clear:both; } .tree li ul { display:none; } .tree li a, .tree li span { display:inline-block;line-height:16px;height:16px;color:black;white-space:nowrap;text-decoration:none;padding:1px 4px 1px 4px;margin:0; } .tree li a:focus { outline: none; } .tree li a input, .tree li span input { margin:0;padding:0 0;display:inline-block;height:12px !important;border:1px solid white;background:white;font-size:10px;font-family:Verdana; } .tree li a input:not([class="xxx"]), .tree li span input:not([class="xxx"]) { padding:1px 0; } /* FOR DOTS */ .tree .ltr li.last { float:left; } .tree > ul li.last { overflow:visible; } /* OPEN OR CLOSE */ .tree li.open ul { display:block; } .tree li.closed ul { display:none !important; } /* FOR DRAGGING */ #jstree-dragged { position:absolute; top:-10px; left:-10px; margin:0; padding:0; } #jstree-dragged ul ul ul { display:none; } #jstree-marker { padding:0; margin:0; line-height:5px; font-size:1px; overflow:hidden; height:5px; position:absolute; left:-45px; top:-30px; z-index:1000; background-color:transparent; background-repeat:no-repeat; display:none; } #jstree-marker.marker { width:45px; background-position:-32px top; } #jstree-marker.marker_plus { width:5px; background-position:right top; } /* BACKGROUND DOTS */ .tree li li { overflow:hidden; } .tree > .ltr > li { display:table; } /* ICONS */ .tree ul ins { display:inline-block; text-decoration:none; width:16px; height:16px; } .tree .ltr ins { margin:0 4px 0 0px; } ';
if(/msie/.test(C)&&!/opera/.test(C)){if(parseInt(E)==6){D+='.tree li { height:18px; zoom:1; } .tree li li { overflow:visible; } .tree .ltr li.last { margin-top: expression( (this.previousSibling && /open/.test(this.previousSibling.className) ) ? "-2px" : "0"); } .marker { width:45px; background-position:-32px top; } .marker_plus { width:5px; background-position:right top; }'
}if(parseInt(E)==7){D+='.tree li li { overflow:visible; } .tree .ltr li.last { margin-top: expression( (this.previousSibling && /open/.test(this.previousSibling.className) ) ? "-2px" : "0"); }'
}}if(/opera/.test(C)){D+='.tree > ul > li.last:after { content:"."; display: block; height:1px; clear:both; visibility:hidden; }'
}if(/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)&&E.indexOf("1.8")==0){D+=".tree .ltr li a { display:inline; float:left; } .tree li ul { clear:both; }"
}A.css=A.add_sheet({str:D})
})
})(jQuery);
(function(A){A.extend(A.tree.datastores,{html:function(){return{get:function(C,D,B){return C&&A(C).size()?A("<div>").append(D.get_node(C).clone()).html():D.container.children("ul:eq(0)").html()
},parse:function(B,D,E,C){if(C){C.call(null,B)
}return B
},load:function(B,D,E,C){if(E.url){A.ajax({type:E.method,url:E.url,data:B,dataType:"html",success:function(F,G){C.call(null,F)
},error:function(G,H,F){C.call(null,false);
D.error(F+" "+H)
}})
}else{C.call(null,E["static"]||D.container.children("ul:eq(0)").html())
}}}
},json:function(){return{get:function(K,G,H){var D=this;
if(!K||A(K).size()==0){K=G.container.children("ul").children("li")
}else{K=A(K)
}if(!H){H={}
}if(!H.outer_attrib){H.outer_attrib=["id","rel","class"]
}if(!H.inner_attrib){H.inner_attrib=[]
}if(K.size()>1){var C=[];
K.each(function(){C.push(D.get(this,G,H))
});
return C
}if(K.size()==0){return[]
}var F={attributes:{},data:{}};
if(K.hasClass("open")){F.data.state="open"
}if(K.hasClass("closed")){F.data.state="closed"
}for(var B in H.outer_attrib){if(!H.outer_attrib.hasOwnProperty(B)){continue
}var I=(H.outer_attrib[B]=="class")?K.attr(H.outer_attrib[B]).replace(/(^| )last( |$)/ig," ").replace(/(^| )(leaf|closed|open)( |$)/ig," "):K.attr(H.outer_attrib[B]);
if(typeof I!="undefined"&&I.toString().replace(" ","").length>0){F.attributes[H.outer_attrib[B]]=I
}delete I
}if(G.settings.languages.length){for(var B in G.settings.languages){if(!G.settings.languages.hasOwnProperty(B)){continue
}var E=K.children("a."+G.settings.languages[B]);
if(H.force||H.inner_attrib.length||E.children("ins").get(0).style.backgroundImage.toString().length||E.children("ins").get(0).className.length){F.data[G.settings.languages[B]]={};
F.data[G.settings.languages[B]].title=G.get_text(K,G.settings.languages[B]);
if(E.children("ins").get(0).style.className.length){F.data[G.settings.languages[B]].icon=E.children("ins").get(0).style.className
}if(E.children("ins").get(0).style.backgroundImage.length){F.data[G.settings.languages[B]].icon=E.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
}if(H.inner_attrib.length){F.data[G.settings.languages[B]].attributes={};
for(var J in H.inner_attrib){if(!H.inner_attrib.hasOwnProperty(J)){continue
}var I=E.attr(H.inner_attrib[J]);
if(typeof I!="undefined"&&I.toString().replace(" ","").length>0){F.data[G.settings.languages[B]].attributes[H.inner_attrib[J]]=I
}delete I
}}}else{F.data[G.settings.languages[B]]=G.get_text(K,G.settings.languages[B])
}}}else{var E=K.children("a");
F.data.title=G.get_text(K);
if(E.children("ins").size()&&E.children("ins").get(0).className.length){F.data.icon=E.children("ins").get(0).className
}if(E.children("ins").size()&&E.children("ins").get(0).style.backgroundImage.length){F.data.icon=E.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
}if(H.inner_attrib.length){F.data.attributes={};
for(var J in H.inner_attrib){if(!H.inner_attrib.hasOwnProperty(J)){continue
}var I=E.attr(H.inner_attrib[J]);
if(typeof I!="undefined"&&I.toString().replace(" ","").length>0){F.data.attributes[H.inner_attrib[J]]=I
}delete I
}}}if(K.children("ul").size()>0){F.children=[];
K.children("ul").children("li").each(function(){F.children.push(D.get(this,G,H))
})
}return F
},parse:function(I,F,G,D){if(Object.prototype.toString.apply(I)==="[object Array]"){var C="";
for(var J=0;
J<I.length;
J++){if(typeof I[J]=="function"){continue
}C+=this.parse(I[J],F,G)
}if(D){D.call(null,C)
}return C
}if(!I||!I.data){if(D){D.call(null,false)
}return""
}var C="";
C+="<li ";
var E=false;
if(I.attributes){for(var J in I.attributes){if(!I.attributes.hasOwnProperty(J)){continue
}if(J=="class"){C+=" class='"+I.attributes[J]+" ";
if(I.state=="closed"||I.state=="open"){C+=" "+I.state+" "
}C+="' ";
E=true
}else{C+=" "+J+"='"+I.attributes[J]+"' "
}}}if(!E&&(I.state=="closed"||I.state=="open")){C+=" class='"+I.state+"' "
}C+=">";
if(F.settings.languages.length){for(var J=0;
J<F.settings.languages.length;
J++){var B={};
B.href="";
B.style="";
B["class"]=F.settings.languages[J];
if(I.data[F.settings.languages[J]]&&(typeof I.data[F.settings.languages[J]].attributes).toLowerCase()!="undefined"){for(var H in I.data[F.settings.languages[J]].attributes){if(!I.data[F.settings.languages[J]].attributes.hasOwnProperty(H)){continue
}if(H=="style"||H=="class"){B[H]+=" "+I.data[F.settings.languages[J]].attributes[H]
}else{B[H]=I.data[F.settings.languages[J]].attributes[H]
}}}C+="<a";
for(var H in B){if(!B.hasOwnProperty(H)){continue
}C+=" "+H+'="'+B[H]+'" '
}C+=">";
if(I.data[F.settings.languages[J]]&&I.data[F.settings.languages[J]].icon){C+="<ins "+(I.data[F.settings.languages[J]].icon.indexOf("/")==-1?" class='"+I.data[F.settings.languages[J]].icon+"' ":" style='background-image:url(\""+I.data[F.settings.languages[J]].icon+"\");' ")+">&nbsp;</ins>"
}else{C+="<ins>&nbsp;</ins>"
}C+=((typeof I.data[F.settings.languages[J]].title).toLowerCase()!="undefined"?I.data[F.settings.languages[J]].title:I.data[F.settings.languages[J]])+"</a>"
}}else{var B={};
B.href="";
B.style="";
B["class"]="";
if((typeof I.data.attributes).toLowerCase()!="undefined"){for(var J in I.data.attributes){if(!I.data.attributes.hasOwnProperty(J)){continue
}if(J=="style"||J=="class"){B[J]+=" "+I.data.attributes[J]
}else{B[J]=I.data.attributes[J]
}}}C+="<a";
for(var J in B){if(!B.hasOwnProperty(J)){continue
}C+=" "+J+'="'+B[J]+'" '
}C+=">";
if(I.data.icon){C+="<ins "+(I.data.icon.indexOf("/")==-1?" class='"+I.data.icon+"' ":" style='background-image:url(\""+I.data.icon+"\");' ")+">&nbsp;</ins>"
}else{C+="<ins>&nbsp;</ins>"
}C+=((typeof I.data.title).toLowerCase()!="undefined"?I.data.title:I.data)+"</a>"
}if(I.children&&I.children.length){C+="<ul>";
for(var J=0;
J<I.children.length;
J++){C+=this.parse(I.children[J],F,G)
}C+="</ul>"
}C+="</li>";
if(D){D.call(null,C)
}return C
},load:function(B,D,E,C){if(E["static"]){C.call(null,E["static"])
}else{A.ajax({type:E.method,url:E.url,data:B,dataType:"json",success:function(F,G){C.call(null,F)
},error:function(G,H,F){C.call(null,false);
D.error(F+" "+H)
}})
}}}
}})
})(jQuery);