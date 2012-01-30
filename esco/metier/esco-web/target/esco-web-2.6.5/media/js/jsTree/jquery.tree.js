(function(D){D.tree={datastores:{},plugins:{},defaults:{data:{async:false,type:"html",opts:{method:"GET",url:false}},selected:false,opened:[],languages:[],ui:{dots:true,animation:0,scroll_spd:4,theme_path:false,theme_name:"default",selected_parent_close:"select_parent",selected_delete:"select_previous"},types:{"default":{clickable:true,renameable:true,deletable:true,creatable:true,draggable:true,max_children:-1,max_depth:-1,valid_children:"all",icon:{image:false,position:false}}},rules:{multiple:false,multitree:"none",type_attr:"rel",createat:"bottom",drag_copy:"ctrl",drag_button:"left",use_max_children:true,use_max_depth:true,max_children:-1,max_depth:-1,valid_children:"all"},lang:{new_node:"New folder",loading:"Loading ..."},callback:{beforechange:function(B,A){return true
},beforeopen:function(B,A){return true
},beforeclose:function(B,A){return true
},beforemove:function(B,H,G,A){return true
},beforecreate:function(B,H,G,A){return true
},beforerename:function(A,B,F){return true
},beforedelete:function(B,A){return true
},beforedata:function(B,A){return{id:D(B).attr("id")||0}
},ondata:function(B,A){return B
},onparse:function(A,B){return A
},onhover:function(B,A){},onselect:function(B,A){},ondeselect:function(B,A){},onchange:function(B,A){},onrename:function(A,F,B){},onmove:function(H,A,I,B,J){},oncopy:function(H,A,I,B,J){},oncreate:function(H,A,I,B,J){},ondelete:function(A,F,B){},onopen:function(B,A){},onopen_all:function(A){},onclose_all:function(A){},onclose:function(B,A){},error:function(A,B){},ondblclk:function(B,A){A.toggle_branch.call(A,B);
A.select_branch.call(A,B)
},onrgtclk:function(A,F,B){},onload:function(A){},oninit:function(A){},onfocus:function(A){},ondestroy:function(A){},onsearch:function(B,A){B.addClass("search")
},ondrop:function(B,H,G,A){},check:function(A,B,G,H){return G
},check_move:function(B,H,G,A){return true
}},plugins:{}},create:function(){return new C()
},focused:function(){return C.inst[C.focused]
},reference:function(B){var A=D(B);
if(!A.size()){A=D("#"+B)
}if(!A.size()){return null
}A=(A.is(".tree"))?A.attr("id"):A.parents(".tree:eq(0)").attr("id");
return C.inst[A]||null
},rollback:function(G){for(var H in G){if(!G.hasOwnProperty(H)){continue
}var A=C.inst[H];
var B=!A.locked;
if(B){A.lock(true)
}A.inp=false;
A.container.html(G[H].html).find(".dragged").removeClass("dragged").end().find(".hover").removeClass("hover");
if(G[H].selected){A.selected=D("#"+G[H].selected);
A.selected_arr=[];
A.container.find("a.clicked").each(function(){A.selected_arr.push(A.get_node(this))
})
}if(B){A.lock(false)
}delete B;
delete A
}},drop_mode:function(A){A=D.extend(A,{show:false,type:"default",str:"Foreign node"});
C.drag_drop.foreign=true;
C.drag_drop.isdown=true;
C.drag_drop.moving=true;
C.drag_drop.appended=false;
C.drag_drop.f_type=A.type;
C.drag_drop.f_data=A;
if(!A.show){C.drag_drop.drag_help=false;
C.drag_drop.drag_node=false
}else{}if(D.tree.drag_start!==false){D.tree.drag_start.call(null,false)
}},drag_start:false,drag:false,drag_end:false};
D.fn.tree=function(A){return this.each(function(){var B=D.extend({},A);
if(C.inst&&C.inst[D(this).attr("id")]){C.inst[D(this).attr("id")].destroy()
}if(B!==false){new C().init(this,B)
}})
};
function C(){return{cntr:++C.cntr,settings:D.extend({},D.tree.defaults),init:function(K,N){var L=this;
this.container=D(K);
if(this.container.size==0){return false
}C.inst[this.cntr]=this;
if(!this.container.attr("id")){this.container.attr("id","jstree_"+this.cntr)
}C.inst[this.container.attr("id")]=C.inst[this.cntr];
C.focused=this.cntr;
this.settings=D.extend(true,{},this.settings,N);
if(this.settings.languages&&this.settings.languages.length){this.current_lang=this.settings.languages[0];
var O=false;
var P="#"+this.container.attr("id");
for(var M=0;
M<this.settings.languages.length;
M++){O=C.add_css(P+" ."+this.settings.languages[M]);
if(O!==false){O.style.display=(this.settings.languages[M]==this.current_lang)?"":"none"
}}}else{this.current_lang=false
}this.container.addClass("tree");
if(this.settings.ui.theme_name!==false){if(this.settings.ui.theme_path===false){D("script").each(function(){if(this.src.toString().match(/jquery\.tree.*?js$/)){L.settings.ui.theme_path=this.src.toString().replace(/jquery\.tree.*?js$/,"")+"themes/"+L.settings.ui.theme_name+"/style.css";
return false
}})
}if(this.settings.ui.theme_path!=""&&D.inArray(this.settings.ui.theme_path,C.themes)==-1){C.add_sheet({url:this.settings.ui.theme_path});
C.themes.push(this.settings.ui.theme_path)
}this.container.addClass("tree-"+this.settings.ui.theme_name)
}var A="";
for(var B in this.settings.types){if(!this.settings.types.hasOwnProperty(B)){continue
}if(!this.settings.types[B].icon){continue
}if(this.settings.types[B].icon.image||this.settings.types[B].icon.position){if(B=="default"){A+="#"+this.container.attr("id")+" li > a ins { "
}else{A+="#"+this.container.attr("id")+" li[rel="+B+"] > a ins { "
}if(this.settings.types[B].icon.image){A+=" background-image:url("+this.settings.types[B].icon.image+"); "
}if(this.settings.types[B].icon.position){A+=" background-position:"+this.settings.types[B].icon.position+"; "
}A+="} "
}}if(A!=""){C.add_sheet({str:A})
}if(this.settings.rules.multiple){this.selected_arr=[]
}this.offset=false;
this.hovered=false;
this.locked=false;
this.callback("oninit",[this]);
this.refresh();
this.attach_events();
this.focus()
},refresh:function(A){if(this.locked){return this.error("LOCKED")
}var G=this;
if(A&&!this.settings.data.async){A=false
}this.is_partial_refresh=A?true:false;
this.opened=Array();
if(this.settings.opened!=false){D.each(this.settings.opened,function(F,E){if(this.replace(/^#/,"").length>0){G.opened.push("#"+this.replace(/^#/,""))
}});
this.settings.opened=false
}else{this.container.find("li.open").each(function(E){if(this.id){G.opened.push("#"+this.id)
}})
}if(this.selected){this.settings.selected=Array();
if(A){D(A).find("li:has(a.clicked)").each(function(){if(this.id){G.settings.selected.push("#"+this.id)
}})
}else{if(this.selected_arr){D.each(this.selected_arr,function(){if(this.attr("id")){G.settings.selected.push("#"+this.attr("id"))
}})
}else{if(this.selected.attr("id")){this.settings.selected.push("#"+this.selected.attr("id"))
}}}}else{if(this.settings.selected!==false){var B=Array();
if((typeof this.settings.selected).toLowerCase()=="object"){D.each(this.settings.selected,function(){if(this.replace(/^#/,"").length>0){B.push("#"+this.replace(/^#/,""))
}})
}else{if(this.settings.selected.replace(/^#/,"").length>0){B.push("#"+this.settings.selected.replace(/^#/,""))
}}this.settings.selected=B
}}if(A&&this.settings.data.async){this.opened=Array();
A=this.get_node(A);
A.find("li.open").each(function(E){G.opened.push("#"+this.id)
});
if(A.hasClass("open")){A.removeClass("open").addClass("closed")
}if(A.hasClass("leaf")){A.removeClass("leaf")
}A.children("ul:eq(0)").html("");
return this.open_branch(A,true,function(){G.reselect.apply(G)
})
}var G=this;
var H=new D.tree.datastores[this.settings.data.type]();
if(this.container.children("ul").size()==0){this.container.html("<ul class='ltr' style='direction:ltr;'><li class='last'><a class='loading' href='#'><ins>&nbsp;</ins>"+(this.settings.lang.loading||"Loading ...")+"</a></li></ul>")
}H.load(this.callback("beforedata",[false,this]),this,this.settings.data.opts,function(E){E=G.callback("ondata",[E,G]);
H.parse(E,G,G.settings.data.opts,function(F){F=G.callback("onparse",[F,G]);
G.container.empty().append(D("<ul class='ltr'>").html(F));
G.container.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
G.container.find("li").not(".open").not(".closed").addClass("leaf");
G.reselect()
})
})
},reselect:function(A){var I=this;
if(!A){this.cl_count=0
}else{this.cl_count--
}if(this.opened&&this.opened.length){var J=false;
for(var H=0;
this.opened&&H<this.opened.length;
H++){if(this.settings.data.async){var B=this.get_node(this.opened[H]);
if(B.size()&&B.hasClass("closed")>0){J=true;
var B=this.opened[H].toString().replace("/","\\/");
delete this.opened[H];
this.open_branch(B,true,function(){I.reselect.apply(I,[true])
});
this.cl_count++
}}else{this.open_branch(this.opened[H],true)
}}if(this.settings.data.async&&J){return 
}if(this.cl_count>0){return 
}delete this.opened
}if(this.cl_count>0){return 
}this.container.css("direction","ltr").children("ul:eq(0)").addClass("ltr");
if(this.settings.ui.dots==false){this.container.children("ul:eq(0)").addClass("no_dots")
}if(this.scrtop){this.container.scrollTop(I.scrtop);
delete this.scrtop
}if(this.settings.selected!==false){D.each(this.settings.selected,function(E){if(I.is_partial_refresh){I.select_node(D(I.settings.selected[E].toString().replace("/","\\/"),I.container),(I.settings.rules.multiple!==false))
}else{I.select_node(D(I.settings.selected[E].toString().replace("/","\\/"),I.container),(I.settings.rules.multiple!==false&&E>0))
}});
this.settings.selected=false
}this.callback("onload",[I])
},get:function(B,F,A){if(!F){F=this.settings.data.type
}if(!A){A=this.settings.data.opts
}return new D.tree.datastores[F]().get(B,this,A)
},attach_events:function(){var A=this;
this.container.bind("mousedown.jstree",function(B){if(C.drag_drop.isdown){C.drag_drop.move_type=false;
B.preventDefault();
B.stopPropagation();
B.stopImmediatePropagation();
return false
}}).bind("mouseup.jstree",function(B){setTimeout(function(){A.focus.apply(A)
},5)
}).bind("click.jstree",function(B){return true
});
D("#"+this.container.attr("id")+" li").live("click",function(B){if(B.target.tagName!="LI"){return true
}A.off_height();
if(B.pageY-D(B.target).offset().top>A.li_height){return true
}A.toggle_branch.apply(A,[B.target]);
B.stopPropagation();
return false
});
D("#"+this.container.attr("id")+" li a").live("click.jstree",function(B){if(B.which&&B.which==3){return true
}if(A.locked){B.preventDefault();
B.target.blur();
return A.error("LOCKED")
}A.select_branch.apply(A,[B.target,B.ctrlKey||A.settings.rules.multiple=="on"]);
if(A.inp){A.inp.blur()
}B.preventDefault();
B.target.blur();
return false
}).live("dblclick.jstree",function(B){if(A.locked){B.preventDefault();
B.stopPropagation();
B.target.blur();
return A.error("LOCKED")
}A.callback("ondblclk",[A.get_node(B.target).get(0),A]);
B.preventDefault();
B.stopPropagation();
B.target.blur()
}).live("contextmenu.jstree",function(B){if(A.locked){B.target.blur();
return A.error("LOCKED")
}return A.callback("onrgtclk",[A.get_node(B.target).get(0),A,B])
}).live("mouseover.jstree",function(B){if(A.locked){B.preventDefault();
B.stopPropagation();
return A.error("LOCKED")
}if(A.hovered!==false&&(B.target.tagName=="A"||B.target.tagName=="INS")){A.hovered.children("a").removeClass("hover");
A.hovered=false
}A.callback("onhover",[A.get_node(B.target).get(0),A])
}).live("mousedown.jstree",function(I){if(A.settings.rules.drag_button=="left"&&I.which&&I.which!=1){return true
}if(A.settings.rules.drag_button=="right"&&I.which&&I.which!=3){return true
}A.focus.apply(A);
if(A.locked){return A.error("LOCKED")
}var B=A.get_node(I.target);
if(A.settings.rules.multiple!=false&&A.selected_arr.length>1&&B.children("a:eq(0)").hasClass("clicked")){var L=0;
for(var J in A.selected_arr){if(!A.selected_arr.hasOwnProperty(J)){continue
}if(A.check("draggable",A.selected_arr[J])){A.selected_arr[J].addClass("dragged");
C.drag_drop.origin_tree=A;
L++
}}if(L>0){if(A.check("draggable",B)){C.drag_drop.drag_node=B
}else{C.drag_drop.drag_node=A.container.find("li.dragged:eq(0)")
}C.drag_drop.isdown=true;
var K=C.drag_drop.drag_node.clone();
if(A.settings.languages.length>0){K.find("a").not("."+A.current_lang).hide()
}C.drag_drop.dragged=A.container.find("li.dragged")
}}else{if(A.check("draggable",B)){C.drag_drop.drag_node=B;
var K=B.clone();
if(A.settings.languages.length>0){K.find("a").not("."+A.current_lang).hide()
}C.drag_drop.isdown=true;
C.drag_drop.foreign=false;
C.drag_drop.origin_tree=A;
B.addClass("dragged");
C.drag_drop.dragged=A.container.find("li.dragged")
}}C.drag_drop.init_x=I.pageX;
C.drag_drop.init_y=I.pageY;
B.blur();
I.preventDefault();
I.stopPropagation();
return false
})
},focus:function(){if(this.locked){return false
}if(C.focused!=this.cntr){C.focused=this.cntr;
this.callback("onfocus",[this])
}},off_height:function(){if(this.offset===false){this.container.css({position:"relative"});
this.offset=this.container.offset();
var A=0;
A=parseInt(D.curCSS(this.container.get(0),"paddingTop",true),10);
if(A){this.offset.top+=A
}A=parseInt(D.curCSS(this.container.get(0),"borderTopWidth",true),10);
if(A){this.offset.top+=A
}this.container.css({position:""})
}if(!this.li_height){var A=this.container.find("ul li.closed, ul li.leaf").eq(0);
this.li_height=A.height();
if(A.children("ul:eq(0)").size()){this.li_height-=A.children("ul:eq(0)").height()
}if(!this.li_height){this.li_height=18
}}},scroll_check:function(O,L){var P=this;
var A=P.container;
var K=P.container.offset();
var N=A.scrollTop();
var B=A.scrollLeft();
var M=(A.get(0).scrollWidth>A.width())?40:20;
if(L-K.top<20){A.scrollTop(Math.max((N-P.settings.ui.scroll_spd),0))
}if(A.height()-(L-K.top)<M){A.scrollTop(N+P.settings.ui.scroll_spd)
}if(O-K.left<20){A.scrollLeft(Math.max((B-P.settings.ui.scroll_spd),0))
}if(A.width()-(O-K.left)<40){A.scrollLeft(B+P.settings.ui.scroll_spd)
}if(A.scrollLeft()!=B||A.scrollTop()!=N){C.drag_drop.move_type=false;
C.drag_drop.ref_node=false
}C.drag_drop.scroll_time=setTimeout(function(){P.scroll_check(O,L)
},50)
},scroll_into_view:function(I){I=I?this.get_node(I):this.selected;
if(!I){return false
}var B=I.offset().top;
var H=this.container.offset().top;
var A=H+this.container.height();
var J=(this.container.get(0).scrollWidth>this.container.width())?40:20;
if(B+5<H){this.container.scrollTop(this.container.scrollTop()-(H-B+5))
}if(B+J>A){this.container.scrollTop(this.container.scrollTop()+(B+J-A))
}},get_node:function(A){return D(A).closest("li")
},get_type:function(A){A=!A?this.selected:this.get_node(A);
if(!A){return 
}var B=A.attr(this.settings.rules.type_attr);
return B||"default"
},set_type:function(A,B){B=!B?this.selected:this.get_node(B);
if(!B||!A){return 
}B.attr(this.settings.rules.type_attr,A)
},get_text:function(A,B){A=this.get_node(A);
if(!A||A.size()==0){return""
}if(this.settings.languages&&this.settings.languages.length){B=B?B:this.current_lang;
A=A.children("a."+B)
}else{A=A.children("a:visible")
}var F="";
A.contents().each(function(){if(this.nodeType==3){F=this.data;
return false
}});
return F
},check:function(G,H){if(this.locked){return false
}var B=false;
if(H===-1){if(typeof this.settings.rules[G]!="undefined"){B=this.settings.rules[G]
}}else{H=!H?this.selected:this.get_node(H);
if(!H){return 
}var A=this.get_type(H);
if(typeof this.settings.types[A]!="undefined"&&typeof this.settings.types[A][G]!="undefined"){B=this.settings.types[A][G]
}else{if(typeof this.settings.types["default"]!="undefined"&&typeof this.settings.types["default"][G]!="undefined"){B=this.settings.types["default"][G]
}}}if(typeof B=="function"){B=B.call(null,H,this)
}B=this.callback("check",[G,H,B,this]);
return B
},check_move:function(U,b,Z){if(this.locked){return false
}if(D(b).closest("li.dragged").size()){return false
}var W=U.parents(".tree:eq(0)").get(0);
var Y=b.parents(".tree:eq(0)").get(0);
if(W&&W!=Y){var S=D.tree.reference(Y.id).settings.rules.multitree;
if(S=="none"||(D.isArray(S)&&D.inArray(W.id,S)==-1)){return false
}}var T=(Z!="inside")?this.parent(b):this.get_node(b);
U=this.get_node(U);
if(T==false){return false
}var R={max_depth:this.settings.rules.use_max_depth?this.check("max_depth",T):-1,max_children:this.settings.rules.use_max_children?this.check("max_children",T):-1,valid_children:this.check("valid_children",T)};
var B=(typeof U=="string")?U:this.get_type(U);
if(typeof R.valid_children!="undefined"&&(R.valid_children=="none"||(typeof R.valid_children=="object"&&D.inArray(B,D.makeArray(R.valid_children))==-1))){return false
}if(this.settings.rules.use_max_children){if(typeof R.max_children!="undefined"&&R.max_children!=-1){if(R.max_children==0){return false
}var a=1;
if(C.drag_drop.moving==true&&C.drag_drop.foreign==false){a=C.drag_drop.dragged.size();
a=a-T.find("> ul > li.dragged").size()
}if(R.max_children<T.find("> ul > li").size()+a){return false
}}}if(this.settings.rules.use_max_depth){if(typeof R.max_depth!="undefined"&&R.max_depth===0){return this.error("MOVE: MAX-DEPTH REACHED")
}var X=(R.max_depth>0)?R.max_depth:false;
var A=0;
var V=T;
while(V!==-1){V=this.parent(V);
A++;
var S=this.check("max_depth",V);
if(S>=0){X=(X===false)?(S-A):Math.min(X,S-A)
}if(X!==false&&X<=0){return this.error("MOVE: MAX-DEPTH REACHED")
}}if(X!==false&&X<=0){return this.error("MOVE: MAX-DEPTH REACHED")
}if(X!==false){var Q=1;
if(typeof U!="string"){var V=U;
while(V.size()>0){if(X-Q<0){return this.error("MOVE: MAX-DEPTH REACHED")
}V=V.children("ul").children("li");
Q++
}}}}if(this.callback("check_move",[U,b,Z,this])==false){return false
}return true
},hover_branch:function(B){if(this.locked){return this.error("LOCKED")
}var A=this;
var B=A.get_node(B);
if(!B.size()){return this.error("HOVER: NOT A VALID NODE")
}if(!A.check("clickable",B)){return this.error("SELECT: NODE NOT SELECTABLE")
}if(this.hovered){this.hovered.children("A").removeClass("hover")
}this.hovered=B;
this.hovered.children("a").addClass("hover");
this.scroll_into_view(this.hovered)
},select_node:function(J,H){if(this.locked){return this.error("LOCKED")
}if(!J&&this.hovered!==false){J=this.hovered
}var I=this;
J=I.get_node(J);
if(!J.size()){return this.error("SELECT: NOT A VALID NODE")
}J.children("a").removeClass("hover");
if(!I.check("clickable",J)){return this.error("SELECT: NODE NOT SELECTABLE")
}if(I.callback("beforechange",[J.get(0),I])===false){return this.error("SELECT: STOPPED BY USER")
}if(this.settings.rules.multiple!=false&&H&&J.children("a.clicked").size()>0){return this.deselect_branch(J)
}if(this.settings.rules.multiple!=false&&H){this.selected_arr.push(J)
}if(this.settings.rules.multiple!=false&&!H){for(var B in this.selected_arr){if(!this.selected_arr.hasOwnProperty(B)){continue
}this.selected_arr[B].children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected_arr[B].get(0),I])
}this.selected_arr=[];
this.selected_arr.push(J);
if(this.selected&&this.selected.children("A").hasClass("clicked")){this.selected.children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected.get(0),I])
}}if(!this.settings.rules.multiple){if(this.selected){this.selected.children("A").removeClass("clicked");
this.callback("ondeselect",[this.selected.get(0),I])
}}this.selected=J;
if(this.hovered!==false){this.hovered.children("A").removeClass("hover");
this.hovered=J
}this.selected.children("a").addClass("clicked").end().parents("li.closed").each(function(){I.open_branch(this,true)
});
try{this.scroll_into_view(this.selected)
}catch(A){}},select_branch:function(H,B){var G=this;
this.select_node(H,B);
try{this.callback("onselect",[this.selected.get(0),G]);
this.callback("onchange",[this.selected.get(0),G])
}catch(A){}},deselect_branch:function(B){if(this.locked){return this.error("LOCKED")
}var A=this;
var B=this.get_node(B);
if(B.children("a.clicked").size()==0){return this.error("DESELECT: NODE NOT SELECTED")
}B.children("a").removeClass("clicked");
this.callback("ondeselect",[B.get(0),A]);
if(this.settings.rules.multiple!=false&&this.selected_arr.length>1){this.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){A.selected_arr.push(D(this))
});
if(B.get(0)==this.selected.get(0)){this.selected=this.selected_arr[0]
}}else{if(this.settings.rules.multiple!=false){this.selected_arr=[]
}this.selected=false
}this.callback("onchange",[B.get(0),A])
},toggle_branch:function(A){if(this.locked){return this.error("LOCKED")
}var A=this.get_node(A);
if(A.hasClass("closed")){return this.open_branch(A)
}if(A.hasClass("open")){return this.close_branch(A)
}},open_branch:function(B,H,I){var J=this;
if(this.locked){return this.error("LOCKED")
}var B=this.get_node(B);
if(!B.size()){return this.error("OPEN: NO SUCH NODE")
}if(B.hasClass("leaf")){return this.error("OPEN: OPENING LEAF NODE")
}if(this.settings.data.async&&B.find("li").size()==0){if(this.callback("beforeopen",[B.get(0),this])===false){return this.error("OPEN: STOPPED BY USER")
}B.children("ul:eq(0)").remove().end().append("<ul><li class='last'><a class='loading' href='#'><ins>&nbsp;</ins>"+(J.settings.lang.loading||"Loading ...")+"</a></li></ul>");
B.removeClass("closed").addClass("open");
var A=new D.tree.datastores[this.settings.data.type]();
A.load(this.callback("beforedata",[B,this]),this,this.settings.data.opts,function(E){E=J.callback("ondata",[E,J]);
if(!E||E.length==0){B.removeClass("closed").removeClass("open").addClass("leaf").children("ul").remove();
if(I){I.call()
}return 
}A.parse(E,J,J.settings.data.opts,function(F){F=J.callback("onparse",[F,J]);
B.children("ul:eq(0)").replaceWith(D("<ul>").html(F));
B.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
B.find("li").not(".open").not(".closed").addClass("leaf");
J.open_branch.apply(J,[B]);
if(I){I.call()
}})
});
return true
}else{if(!this.settings.data.async){if(this.callback("beforeopen",[B.get(0),this])===false){return this.error("OPEN: STOPPED BY USER")
}}if(parseInt(this.settings.ui.animation)>0&&!H){B.children("ul:eq(0)").css("display","none");
B.removeClass("closed").addClass("open");
B.children("ul:eq(0)").slideDown(parseInt(this.settings.ui.animation),function(){D(this).css("display","");
if(I){I.call()
}})
}else{B.removeClass("closed").addClass("open");
if(I){I.call()
}}this.callback("onopen",[B.get(0),this]);
return true
}},close_branch:function(F,A){if(this.locked){return this.error("LOCKED")
}var B=this;
var F=this.get_node(F);
if(!F.size()){return this.error("CLOSE: NO SUCH NODE")
}if(B.callback("beforeclose",[F.get(0),B])===false){return this.error("CLOSE: STOPPED BY USER")
}if(parseInt(this.settings.ui.animation)>0&&!A&&F.children("ul:eq(0)").size()==1){F.children("ul:eq(0)").slideUp(parseInt(this.settings.ui.animation),function(){if(F.hasClass("open")){F.removeClass("open").addClass("closed")
}D(this).css("display","")
})
}else{if(F.hasClass("open")){F.removeClass("open").addClass("closed")
}}if(this.selected&&this.settings.ui.selected_parent_close!==false&&F.children("ul:eq(0)").find("a.clicked").size()>0){F.find("li:has(a.clicked)").each(function(){B.deselect_branch(this)
});
if(this.settings.ui.selected_parent_close=="select_parent"&&F.children("a.clicked").size()==0){this.select_branch(F,(this.settings.rules.multiple!=false&&this.selected_arr.length>0))
}}this.callback("onclose",[F.get(0),this])
},open_all:function(A,G){if(this.locked){return this.error("LOCKED")
}var H=this;
A=A?this.get_node(A):this.container;
var B=A.find("li.closed").size();
if(!G){this.cl_count=0
}else{this.cl_count--
}if(B>0){this.cl_count+=B;
A.find("li.closed").each(function(){var E=this;
H.open_branch.apply(H,[this,true,function(){H.open_all.apply(H,[E,true])
}])
})
}else{if(this.cl_count==0){this.callback("onopen_all",[this])
}}},close_all:function(B){if(this.locked){return this.error("LOCKED")
}var A=this;
B=B?this.get_node(B):this.container;
B.find("li.open").each(function(){A.close_branch(this,true)
});
this.callback("onclose_all",[this])
},set_lang:function(F){if(!D.isArray(this.settings.languages)||this.settings.languages.length==0){return false
}if(this.locked){return this.error("LOCKED")
}if(!D.inArray(F,this.settings.languages)&&typeof this.settings.languages[F]!="undefined"){F=this.settings.languages[F]
}if(typeof F=="undefined"){return false
}if(F==this.current_lang){return true
}var A=false;
var B="#"+this.container.attr("id");
A=C.get_css(B+" ."+this.current_lang);
if(A!==false){A.style.display="none"
}A=C.get_css(B+" ."+F);
if(A!==false){A.style.display=""
}this.current_lang=F;
return true
},get_lang:function(){if(!D.isArray(this.settings.languages)||this.settings.languages.length==0){return false
}return this.current_lang
},create:function(g,A,U){if(this.locked){return this.error("LOCKED")
}var a=false;
if(A==-1){a=true;
A=this.container
}else{A=A?this.get_node(A):this.selected
}if(!a&&(!A||!A.size())){return this.error("CREATE: NO NODE SELECTED")
}var k=U;
var W=A;
if(U=="before"){U=A.parent().children().index(A);
A=A.parents("li:eq(0)")
}if(U=="after"){U=A.parent().children().index(A)+1;
A=A.parents("li:eq(0)")
}if(!a&&A.size()==0){a=true;
A=this.container
}if(!a){if(!this.check("creatable",A)){return this.error("CREATE: CANNOT CREATE IN NODE")
}if(A.hasClass("closed")){if(this.settings.data.async&&A.children("ul").size()==0){var Z=this;
return this.open_branch(A,true,function(){Z.create.apply(Z,[g,A,U])
})
}else{this.open_branch(A,true)
}}}var B=false;
if(!g){g={}
}else{g=D.extend(true,{},g)
}if(!g.attributes){g.attributes={}
}if(!g.attributes[this.settings.rules.type_attr]){g.attributes[this.settings.rules.type_attr]=this.get_type(W)||"default"
}if(this.settings.languages.length){if(!g.data){g.data={};
B=true
}for(var Y=0;
Y<this.settings.languages.length;
Y++){if(!g.data[this.settings.languages[Y]]){g.data[this.settings.languages[Y]]=((typeof this.settings.lang.new_node).toLowerCase()!="string"&&this.settings.lang.new_node[Y])?this.settings.lang.new_node[Y]:this.settings.lang.new_node
}}}else{if(!g.data){g.data=this.settings.lang.new_node;
B=true
}}g=this.callback("ondata",[g,this]);
var c=D.tree.datastores.json().parse(g,this);
c=this.callback("onparse",[c,this]);
var h=D(c);
if(h.children("ul").size()){if(!h.is(".open")){h.addClass("closed")
}}else{h.addClass("leaf")
}h.find("li:last-child").addClass("last").end().find("li:has(ul)").not(".open").addClass("closed");
h.find("li").not(".open").not(".closed").addClass("leaf");
var d={max_depth:this.settings.rules.use_max_depth?this.check("max_depth",(a?-1:A)):-1,max_children:this.settings.rules.use_max_children?this.check("max_children",(a?-1:A)):-1,valid_children:this.check("valid_children",(a?-1:A))};
var j=this.get_type(h);
if(typeof d.valid_children!="undefined"&&(d.valid_children=="none"||(D.isArray(d.valid_children)&&D.inArray(j,d.valid_children)==-1))){return this.error("CREATE: NODE NOT A VALID CHILD")
}if(this.settings.rules.use_max_children){if(typeof d.max_children!="undefined"&&d.max_children!=-1&&d.max_children>=this.children(A).size()){return this.error("CREATE: MAX_CHILDREN REACHED")
}}if(this.settings.rules.use_max_depth){if(typeof d.max_depth!="undefined"&&d.max_depth===0){return this.error("CREATE: MAX-DEPTH REACHED")
}var e=(d.max_depth>0)?d.max_depth:false;
var Y=0;
var f=A;
while(f!==-1&&!a){f=this.parent(f);
Y++;
var b=this.check("max_depth",f);
if(b>=0){e=(e===false)?(b-Y):Math.min(e,b-Y)
}if(e!==false&&e<=0){return this.error("CREATE: MAX-DEPTH REACHED")
}}if(e!==false&&e<=0){return this.error("CREATE: MAX-DEPTH REACHED")
}if(e!==false){var X=1;
var f=h;
while(f.size()>0){if(e-X<0){return this.error("CREATE: MAX-DEPTH REACHED")
}f=f.children("ul").children("li");
X++
}}}if((typeof U).toLowerCase()=="undefined"||U=="inside"){U=(this.settings.rules.createat=="top")?0:A.children("ul:eq(0)").children("li").size()
}if(A.children("ul").size()==0||(a==true&&A.children("ul").children("li").size()==0)){if(!a){var V=this.moved(h,A.children("a:eq(0)"),"inside",true)
}else{var V=this.moved(h,this.container.children("ul:eq(0)"),"inside",true)
}}else{if(k=="before"&&A.children("ul:eq(0)").children("li:nth-child("+(U+1)+")").size()){var V=this.moved(h,A.children("ul:eq(0)").children("li:nth-child("+(U+1)+")").children("a:eq(0)"),"before",true)
}else{if(k=="after"&&A.children("ul:eq(0)").children("li:nth-child("+(U)+")").size()){var V=this.moved(h,A.children("ul:eq(0)").children("li:nth-child("+(U)+")").children("a:eq(0)"),"after",true)
}else{if(A.children("ul:eq(0)").children("li:nth-child("+(U+1)+")").size()){var V=this.moved(h,A.children("ul:eq(0)").children("li:nth-child("+(U+1)+")").children("a:eq(0)"),"before",true)
}else{var V=this.moved(h,A.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after",true)
}}}}if(V===false){return this.error("CREATE: ABORTED")
}if(B){this.select_branch(h.children("a:eq(0)"));
this.rename()
}return h
},rename:function(M,A){if(this.locked){return this.error("LOCKED")
}M=M?this.get_node(M):this.selected;
var J=this;
if(!M||!M.size()){return this.error("RENAME: NO NODE SELECTED")
}if(!this.check("renameable",M)){return this.error("RENAME: NODE NOT RENAMABLE")
}if(!this.callback("beforerename",[M.get(0),J.current_lang,J])){return this.error("RENAME: STOPPED BY USER")
}M.parents("li.closed").each(function(){J.open_branch(this)
});
if(this.current_lang){M=M.find("a."+this.current_lang)
}else{M=M.find("a:first")
}var L={};
L[this.container.attr("id")]=this.get_rollback();
var N=M.children("ins").clone();
if((typeof A).toLowerCase()=="string"){M.text(A).prepend(N);
J.callback("onrename",[J.get_node(M).get(0),J,L])
}else{var K="";
M.contents().each(function(){if(this.nodeType==3){K=this.data;
return false
}});
J.inp=D("<input type='text' autocomplete='off' />");
J.inp.val(K.replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<")).bind("mousedown",function(E){E.stopPropagation()
}).bind("mouseup",function(E){E.stopPropagation()
}).bind("click",function(E){E.stopPropagation()
}).bind("keyup",function(E){var F=E.keyCode||E.which;
if(F==27){this.value=K;
this.blur();
return 
}if(F==13){this.blur();
return 
}});
J.inp.blur(function(E){if(this.value==""){this.value=K
}M.text(this.value).prepend(N);
M.get(0).style.display="";
M.prevAll("span").remove();
J.inp=false;
J.callback("onrename",[J.get_node(M).get(0),J,L])
});
var B=D("<span />").addClass(M.attr("class")).append(N).append(J.inp);
M.get(0).style.display="none";
M.parent().prepend(B);
J.inp.get(0).focus();
J.inp.get(0).select()
}},remove:function(K){if(this.locked){return this.error("LOCKED")
}var J=this;
var A={};
A[this.container.attr("id")]=this.get_rollback();
if(K&&(!this.selected||this.get_node(K).get(0)!=this.selected.get(0))){K=this.get_node(K);
if(K.size()){if(!this.check("deletable",K)){return this.error("DELETE: NODE NOT DELETABLE")
}if(!this.callback("beforedelete",[K.get(0),J])){return this.error("DELETE: STOPPED BY USER")
}$parent=K.parent();
if(K.find("a.clicked").size()){var B=false;
J.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){if(!B&&this==J.selected.get(0)){B=true
}if(D(this).parents().index(K)!=-1){return true
}J.selected_arr.push(D(this))
});
if(B){this.selected=this.selected_arr[0]||false
}}K=K.remove();
$parent.children("li:last").addClass("last");
if($parent.children("li").size()==0){$li=$parent.parents("li:eq(0)");
$li.removeClass("open").removeClass("closed").addClass("leaf").children("ul").remove()
}this.callback("ondelete",[K.get(0),this,A])
}}else{if(this.selected){if(!this.check("deletable",this.selected)){return this.error("DELETE: NODE NOT DELETABLE")
}if(!this.callback("beforedelete",[this.selected.get(0),J])){return this.error("DELETE: STOPPED BY USER")
}$parent=this.selected.parent();
var K=this.selected;
if(this.settings.rules.multiple==false||this.selected_arr.length==1){var I=true;
var L=this.settings.ui.selected_delete=="select_previous"?this.prev(this.selected):false
}K=K.remove();
$parent.children("li:last").addClass("last");
if($parent.children("li").size()==0){$li=$parent.parents("li:eq(0)");
$li.removeClass("open").removeClass("closed").addClass("leaf").children("ul").remove()
}if(!I&&this.settings.rules.multiple!=false){var J=this;
this.selected_arr=[];
this.container.find("a.clicked").filter(":first-child").parent().each(function(){J.selected_arr.push(D(this))
});
if(this.selected_arr.length>0){this.selected=this.selected_arr[0];
this.remove()
}}if(I&&L){this.select_branch(L)
}this.callback("ondelete",[K.get(0),this,A])
}else{return this.error("DELETE: NO NODE SELECTED")
}}},next:function(A,B){A=this.get_node(A);
if(!A.size()){return false
}if(B){return(A.nextAll("li").size()>0)?A.nextAll("li:eq(0)"):false
}if(A.hasClass("open")){return A.find("li:eq(0)")
}else{if(A.nextAll("li").size()>0){return A.nextAll("li:eq(0)")
}else{return A.parents("li").next("li").eq(0)
}}},prev:function(A,B){A=this.get_node(A);
if(!A.size()){return false
}if(B){return(A.prevAll("li").size()>0)?A.prevAll("li:eq(0)"):false
}if(A.prev("li").size()){var A=A.prev("li").eq(0);
while(A.hasClass("open")){A=A.children("ul:eq(0)").children("li:last")
}return A
}else{return A.parents("li:eq(0)").size()?A.parents("li:eq(0)"):false
}},parent:function(A){A=this.get_node(A);
if(!A.size()){return false
}return A.parents("li:eq(0)").size()?A.parents("li:eq(0)"):-1
},children:function(A){if(A===-1){return this.container.children("ul:eq(0)").children("li")
}A=this.get_node(A);
if(!A.size()){return false
}return A.children("ul:eq(0)").children("li")
},toggle_dots:function(){if(this.settings.ui.dots){this.settings.ui.dots=false;
this.container.children("ul:eq(0)").addClass("no_dots")
}else{this.settings.ui.dots=true;
this.container.children("ul:eq(0)").removeClass("no_dots")
}},callback:function(H,B){var I=false;
var J=null;
for(var A in this.settings.plugins){if(typeof D.tree.plugins[A]!="object"){continue
}I=D.tree.plugins[A];
if(I.callbacks&&typeof I.callbacks[H]=="function"){J=I.callbacks[H].apply(this,B)
}if(typeof J!=="undefined"&&J!==null){if(H=="ondata"||H=="onparse"){B[0]=J
}else{return J
}}}I=this.settings.callback[H];
if(typeof I=="function"){return I.apply(null,B)
}},get_rollback:function(){var A={};
A.html=this.container.html();
A.selected=this.selected?this.selected.attr("id"):false;
return A
},moved:function(c,U,a,b,Z,S){var c=D(c);
var X=D(c).parents("ul:eq(0)");
var W=D(U);
if(W.is("ins")){W=W.parent()
}if(!S){var S={};
S[this.container.attr("id")]=this.get_rollback();
if(!b){var d=c.size()>1?c.eq(0).parents(".tree:eq(0)"):c.parents(".tree:eq(0)");
if(d.get(0)!=this.container.get(0)){d=C.inst[d.attr("id")];
S[d.container.attr("id")]=d.get_rollback()
}delete d
}}if(a=="inside"&&this.settings.data.async){var T=this;
if(this.get_node(W).hasClass("closed")){return this.open_branch(this.get_node(W),true,function(){T.moved.apply(T,[c,U,a,b,Z,S])
})
}if(this.get_node(W).find("> ul > li > a.loading").size()==1){setTimeout(function(){T.moved.apply(T,[c,U,a,b,Z])
},200);
return 
}}if(c.size()>1){var T=this;
var d=this.moved(c.eq(0),U,a,false,Z,S);
c.each(function(E){if(E==0){return 
}if(d){d=T.moved(this,d.children("a:eq(0)"),"after",false,Z,S)
}});
return c
}if(Z){_what=c.clone();
_what.each(function(E){this.id=this.id+"_copy";
D(this).find("li").each(function(){this.id=this.id+"_copy"
});
D(this).removeClass("dragged").find("a.clicked").removeClass("clicked").end().find("li.dragged").removeClass("dragged")
})
}else{_what=c
}if(b){if(!this.callback("beforecreate",[this.get_node(c).get(0),this.get_node(U).get(0),a,this])){return false
}}else{if(!this.callback("beforemove",[this.get_node(c).get(0),this.get_node(U).get(0),a,this])){return false
}}if(!b){var d=c.parents(".tree:eq(0)");
if(d.get(0)!=this.container.get(0)){d=C.inst[d.attr("id")];
if(d.settings.languages.length){var B=[];
if(this.settings.languages.length==0){B.push("."+d.current_lang)
}else{for(var V in this.settings.languages){if(!this.settings.languages.hasOwnProperty(V)){continue
}for(var Y in d.settings.languages){if(!d.settings.languages.hasOwnProperty(Y)){continue
}if(this.settings.languages[V]==d.settings.languages[Y]){B.push("."+this.settings.languages[V])
}}}}if(B.length==0){return this.error("MOVE: NO COMMON LANGUAGES")
}_what.find("a").not(B.join(",")).remove()
}_what.find("a.clicked").removeClass("clicked")
}}c=_what;
switch(a){case"before":W.parents("ul:eq(0)").children("li.last").removeClass("last");
W.parent().before(c.removeClass("last"));
W.parents("ul:eq(0)").children("li:last").addClass("last");
break;
case"after":W.parents("ul:eq(0)").children("li.last").removeClass("last");
W.parent().after(c.removeClass("last"));
W.parents("ul:eq(0)").children("li:last").addClass("last");
break;
case"inside":if(W.parent().children("ul:first").size()){if(this.settings.rules.createat=="top"){W.parent().children("ul:first").prepend(c.removeClass("last")).children("li:last").addClass("last");
var R=W.parent().children("ul:first").children("li:first");
if(R.size()){a="before";
U=R
}}else{var R=W.parent().children("ul:first").children(".last");
if(R.size()){a="after";
U=R
}W.parent().children("ul:first").children(".last").removeClass("last").end().append(c.removeClass("last")).children("li:last").addClass("last")
}}else{c.addClass("last");
W.parent().removeClass("leaf").append("<ul/>");
if(!W.parent().hasClass("open")){W.parent().addClass("closed")
}W.parent().children("ul:first").prepend(c)
}if(W.parent().hasClass("closed")){this.open_branch(W)
}break;
default:break
}if(X.find("li").size()==0){var A=X.parent();
A.removeClass("open").removeClass("closed").addClass("leaf");
if(!A.is(".tree")){A.children("ul").remove()
}A.parents("ul:eq(0)").children("li.last").removeClass("last").end().children("li:last").addClass("last")
}else{X.children("li.last").removeClass("last");
X.children("li:last").addClass("last")
}if(Z){this.callback("oncopy",[this.get_node(c).get(0),this.get_node(U).get(0),a,this,S])
}else{if(b){this.callback("oncreate",[this.get_node(c).get(0),(W.is("ul")?-1:this.get_node(U).get(0)),a,this,S])
}else{this.callback("onmove",[this.get_node(c).get(0),this.get_node(U).get(0),a,this,S])
}}return c
},error:function(A){this.callback("error",[A,this]);
return false
},lock:function(A){this.locked=A;
if(this.locked){this.container.children("ul:eq(0)").addClass("locked")
}else{this.container.children("ul:eq(0)").removeClass("locked")
}},cut:function(A){if(this.locked){return this.error("LOCKED")
}A=A?this.get_node(A):this.container.find("a.clicked").filter(":first-child").parent();
if(!A||!A.size()){return this.error("CUT: NO NODE SELECTED")
}C.cut_copy.copy_nodes=false;
C.cut_copy.cut_nodes=A
},copy:function(A){if(this.locked){return this.error("LOCKED")
}A=A?this.get_node(A):this.container.find("a.clicked").filter(":first-child").parent();
if(!A||!A.size()){return this.error("COPY: NO NODE SELECTED")
}C.cut_copy.copy_nodes=A;
C.cut_copy.cut_nodes=false
},paste:function(L,K){if(this.locked){return this.error("LOCKED")
}var A=false;
if(L==-1){A=true;
L=this.container
}else{L=L?this.get_node(L):this.selected
}if(!A&&(!L||!L.size())){return this.error("PASTE: NO NODE SELECTED")
}if(!C.cut_copy.copy_nodes&&!C.cut_copy.cut_nodes){return this.error("PASTE: NOTHING TO DO")
}var J=this;
var M=K;
if(K=="before"){K=L.parent().children().index(L);
L=L.parents("li:eq(0)")
}else{if(K=="after"){K=L.parent().children().index(L)+1;
L=L.parents("li:eq(0)")
}else{if((typeof K).toLowerCase()=="undefined"||K=="inside"){K=(this.settings.rules.createat=="top")?0:L.children("ul:eq(0)").children("li").size()
}}}if(!A&&L.size()==0){A=true;
L=this.container
}if(C.cut_copy.copy_nodes&&C.cut_copy.copy_nodes.size()){var N=true;
if(!A&&!this.check_move(C.cut_copy.copy_nodes,L.children("a:eq(0)"),"inside")){return false
}if(L.children("ul").size()==0||(A==true&&L.children("ul").children("li").size()==0)){if(!A){var B=this.moved(C.cut_copy.copy_nodes,L.children("a:eq(0)"),"inside",false,true)
}else{var B=this.moved(C.cut_copy.copy_nodes,this.container.children("ul:eq(0)"),"inside",false,true)
}}else{if(M=="before"&&L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").size()){var B=this.moved(C.cut_copy.copy_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").children("a:eq(0)"),"before",false,true)
}else{if(M=="after"&&L.children("ul:eq(0)").children("li:nth-child("+(K)+")").size()){var B=this.moved(C.cut_copy.copy_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K)+")").children("a:eq(0)"),"after",false,true)
}else{if(L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").size()){var B=this.moved(C.cut_copy.copy_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").children("a:eq(0)"),"before",false,true)
}else{var B=this.moved(C.cut_copy.copy_nodes,L.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after",false,true)
}}}}C.cut_copy.copy_nodes=false
}if(C.cut_copy.cut_nodes&&C.cut_copy.cut_nodes.size()){var N=true;
L.parents().andSelf().each(function(){if(C.cut_copy.cut_nodes.index(this)!=-1){N=false;
return false
}});
if(!N){return this.error("Invalid paste")
}if(!A&&!this.check_move(C.cut_copy.cut_nodes,L.children("a:eq(0)"),"inside")){return false
}if(L.children("ul").size()==0||(A==true&&L.children("ul").children("li").size()==0)){if(!A){var B=this.moved(C.cut_copy.cut_nodes,L.children("a:eq(0)"),"inside")
}else{var B=this.moved(C.cut_copy.cut_nodes,this.container.children("ul:eq(0)"),"inside")
}}else{if(M=="before"&&L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").size()){var B=this.moved(C.cut_copy.cut_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").children("a:eq(0)"),"before")
}else{if(M=="after"&&L.children("ul:eq(0)").children("li:nth-child("+(K)+")").size()){var B=this.moved(C.cut_copy.cut_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K)+")").children("a:eq(0)"),"after")
}else{if(L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").size()){var B=this.moved(C.cut_copy.cut_nodes,L.children("ul:eq(0)").children("li:nth-child("+(K+1)+")").children("a:eq(0)"),"before")
}else{var B=this.moved(C.cut_copy.cut_nodes,L.children("ul:eq(0)").children("li:last").children("a:eq(0)"),"after")
}}}}C.cut_copy.cut_nodes=false
}},search:function(N,B){var O=this;
if(!N||(this.srch&&N!=this.srch)){this.srch="";
this.srch_opn=false;
this.container.find("a.search").removeClass("search")
}this.srch=N;
if(!N){return 
}if(!B){B="contains"
}if(this.settings.data.async){if(!this.srch_opn){var M=D.extend({search:N},this.callback("beforedata",[false,this]));
D.ajax({type:this.settings.data.opts.method,url:this.settings.data.opts.url,data:M,dataType:"text",success:function(E){O.srch_opn=D.unique(E.split(","));
O.search.apply(O,[N,B])
}})
}else{if(this.srch_opn.length){if(this.srch_opn&&this.srch_opn.length){var R=false;
for(var Q=0;
Q<this.srch_opn.length;
Q++){if(this.get_node("#"+this.srch_opn[Q]).size()>0){R=true;
var P="#"+this.srch_opn[Q];
delete this.srch_opn[Q];
this.open_branch(P,true,function(){O.search.apply(O,[N,B])
})
}}if(!R){this.srch_opn=[];
O.search.apply(O,[N,B])
}}}else{this.srch_opn=false;
var A="a";
if(this.settings.languages.length){A+="."+this.current_lang
}this.callback("onsearch",[this.container.find(A+":"+B+"('"+N+"')"),this])
}}}else{var A="a";
if(this.settings.languages.length){A+="."+this.current_lang
}var L=this.container.find(A+":"+B+"('"+N+"')");
L.parents("li.closed").each(function(){O.open_branch(this,true)
});
this.callback("onsearch",[L,this])
}},add_sheet:C.add_sheet,destroy:function(){this.callback("ondestroy",[this]);
this.container.unbind(".jstree");
D("#"+this.container.attr("id")).die("click.jstree").die("dblclick.jstree").die("mouseover.jstree").die("mouseout.jstree").die("mousedown.jstree");
this.container.removeClass("tree ui-widget ui-widget-content tree-default tree-"+this.settings.ui.theme_name).children("ul").removeClass("no_dots ltr locked").find("li").removeClass("leaf").removeClass("open").removeClass("closed").removeClass("last").children("a").removeClass("clicked hover search");
if(this.cntr==C.focused){for(var A in C.inst){if(A!=this.cntr&&A!=this.container.attr("id")){C.inst[A].focus();
break
}}}C.inst[this.cntr]=false;
C.inst[this.container.attr("id")]=false;
delete C.inst[this.cntr];
delete C.inst[this.container.attr("id")];
C.cntr--
}}
}C.cntr=0;
C.inst={};
C.themes=[];
C.drag_drop={isdown:false,drag_node:false,drag_help:false,dragged:false,init_x:false,init_y:false,moving:false,origin_tree:false,marker:false,move_type:false,ref_node:false,appended:false,foreign:false,droppable:[],open_time:false,scroll_time:false};
C.mouseup=function(B){var F=C.drag_drop;
if(F.open_time){clearTimeout(F.open_time)
}if(F.scroll_time){clearTimeout(F.scroll_time)
}if(F.moving&&D.tree.drag_end!==false){D.tree.drag_end.call(null,B,F)
}if(F.foreign===false&&F.drag_node&&F.drag_node.size()){if(F.move_type){var A=C.inst[F.ref_node.parents(".tree:eq(0)").attr("id")];
if(A){A.moved(F.dragged,F.ref_node,F.move_type,false,(F.origin_tree.settings.rules.drag_copy=="on"||(F.origin_tree.settings.rules.drag_copy=="ctrl"&&B.ctrlKey)))
}}F.move_type=false;
F.ref_node=false
}if(F.foreign!==false){if(F.drag_help){F.drag_help.remove()
}if(F.move_type){var A=C.inst[F.ref_node.parents(".tree:eq(0)").attr("id")];
if(A){A.callback("ondrop",[F.f_data,A.get_node(F.ref_node).get(0),F.move_type,A])
}}F.foreign=false;
F.move_type=false;
F.ref_node=false
}if(C.drag_drop.marker){C.drag_drop.marker.hide()
}if(F.dragged&&F.dragged.size()){F.dragged.removeClass("dragged")
}F.dragged=false;
F.drag_help=false;
F.drag_node=false;
F.f_type=false;
F.f_data=false;
F.init_x=false;
F.init_y=false;
F.moving=false;
F.appended=false;
F.origin_tree=false;
if(F.isdown){F.isdown=false;
B.preventDefault();
B.stopPropagation();
return false
}};
C.mousemove=function(B){var X=C.drag_drop;
var S=false;
if(X.isdown){if(!X.moving&&Math.abs(X.init_x-B.pageX)<5&&Math.abs(X.init_y-B.pageY)<5){B.preventDefault();
B.stopPropagation();
return false
}else{if(!X.moving){C.drag_drop.moving=true;
S=true
}}if(X.open_time){clearTimeout(X.open_time)
}if(X.drag_help!==false){if(!X.appended){if(X.foreign!==false){X.origin_tree=D.tree.focused()
}D("body").append(X.drag_help);
X.w=X.drag_help.width();
X.appended=true
}X.drag_help.css({left:(B.pageX+5),top:(B.pageY+15)})
}if(S&&D.tree.drag_start!==false){D.tree.drag_start.call(null,B,X)
}if(D.tree.drag!==false){D.tree.drag.call(null,B,X)
}if(B.target.tagName=="DIV"&&B.target.id=="jstree-marker"){return false
}var U=D(B.target);
if(U.is("ins")){U=U.parent()
}var Z=U.is(".tree")?U:U.parents(".tree:eq(0)");
if(Z.size()==0||!C.inst[Z.attr("id")]){if(X.scroll_time){clearTimeout(X.scroll_time)
}if(X.drag_help!==false){X.drag_help.find("li:eq(0) ins").addClass("forbidden")
}X.move_type=false;
X.ref_node=false;
return false
}var T=C.inst[Z.attr("id")];
T.off_height();
if(X.scroll_time){clearTimeout(X.scroll_time)
}X.scroll_time=setTimeout(function(){T.scroll_check(B.pageX,B.pageY)
},50);
var Q=false;
var P=Z.scrollTop();
if(B.target.tagName=="A"||B.target.tagName=="INS"){if(U.is("#jstree-dragged")){return false
}if(T.get_node(B.target).hasClass("closed")){X.open_time=setTimeout(function(){T.open_branch(U)
},500)
}var Y=U.offset();
var A={x:(Y.left-1),y:(B.pageY-Y.top)};
var W=[];
if(A.y<T.li_height/3+1){W=["before","inside","after"]
}else{if(A.y>T.li_height*2/3-1){W=["after","inside","before"]
}else{if(A.y<T.li_height/2){W=["inside","before","after"]
}else{W=["inside","after","before"]
}}}var V=false;
var R=(X.foreign==false)?X.origin_tree.container.find("li.dragged"):X.f_type;
D.each(W,function(F,E){if(T.check_move(R,U,E)){Q=E;
V=true;
return false
}});
if(V){switch(Q){case"before":A.y=Y.top-2;
break;
case"after":A.y=Y.top-2+T.li_height;
break;
case"inside":A.x-=2;
A.y=Y.top-2+T.li_height/2;
break
}X.move_type=Q;
X.ref_node=D(B.target);
if(X.drag_help!==false){X.drag_help.find(".forbidden").removeClass("forbidden")
}}}if((U.is(".tree")||U.is("ul"))&&U.find("li:eq(0)").size()==0){var Y=U.offset();
X.move_type="inside";
X.ref_node=Z.children("ul:eq(0)");
if(X.drag_help!==false){X.drag_help.find(".forbidden").removeClass("forbidden")
}}else{if((B.target.tagName!="A"&&B.target.tagName!="INS")||!V){if(X.drag_help!==false){X.drag_help.find("li:eq(0) ins").addClass("forbidden")
}X.move_type=false;
X.ref_node=false
}}B.preventDefault();
B.stopPropagation();
return false
}return true
};
D(function(){D(document).bind("mousemove.jstree",C.mousemove);
D(document).bind("mouseup.jstree",C.mouseup)
});
C.cut_copy={copy_nodes:false,cut_nodes:false};
C.css=false;
C.get_css=function(G,A){G=G.toLowerCase();
var H=C.css.cssRules||C.css.rules;
var B=0;
do{if(H.length&&B>H.length+5){return false
}if(H[B].selectorText&&H[B].selectorText.toLowerCase()==G){if(A==true){if(C.css.removeRule){document.styleSheets[i].removeRule(B)
}if(C.css.deleteRule){document.styleSheets[i].deleteRule(B)
}return true
}else{return H[B]
}}}while(H[++B]);
return false
};
C.add_css=function(A){if(C.get_css(A)){return false
}(C.css.insertRule)?C.css.insertRule(A+" { }",0):C.css.addRule(A,null,0);
return C.get_css(A)
};
C.remove_css=function(A){return C.get_css(A,true)
};
C.add_sheet=function(A){if(A.str){var B=document.createElement("style");
B.type="text/css";
if(B.styleSheet){B.styleSheet.cssText=A.str
}else{B.appendChild(document.createTextNode(A.str))
}document.getElementsByTagName("head")[0].appendChild(B);
return B.sheet
}if(A.url){if(document.createStyleSheet){try{document.createStyleSheet(A.url)
}catch(G){}}else{var H=document.createElement("link");
H.rel="stylesheet";
H.type="text/css";
H.media="all";
H.href=A.url;
document.getElementsByTagName("head")[0].appendChild(H);
return H.styleSheet
}}};
D(function(){var F=navigator.userAgent.toLowerCase();
var A=(F.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1];
var B='/* TREE LAYOUT */ .tree ul { margin:0 0 0 5px; padding:0 0 0 0; list-style-type:none; } .tree li { display:block; min-height:18px; line-height:18px; padding:0 0 0 15px; margin:0 0 0 0; /* Background fix */ clear:both; } .tree li ul { display:none; } .tree li a, .tree li span { display:inline-block;line-height:16px;height:16px;color:black;white-space:nowrap;text-decoration:none;padding:1px 4px 1px 4px;margin:0; } .tree li a:focus { outline: none; } .tree li a input, .tree li span input { margin:0;padding:0 0;display:inline-block;height:12px !important;border:1px solid white;background:white;font-size:10px;font-family:Verdana; } .tree li a input:not([class="xxx"]), .tree li span input:not([class="xxx"]) { padding:1px 0; } /* FOR DOTS */ .tree .ltr li.last { float:left; } .tree > ul li.last { overflow:visible; } /* OPEN OR CLOSE */ .tree li.open ul { display:block; } .tree li.closed ul { display:none !important; } /* FOR DRAGGING */ #jstree-dragged { position:absolute; top:-10px; left:-10px; margin:0; padding:0; } #jstree-dragged ul ul ul { display:none; } #jstree-marker { padding:0; margin:0; line-height:5px; font-size:1px; overflow:hidden; height:5px; position:absolute; left:-45px; top:-30px; z-index:1000; background-color:transparent; background-repeat:no-repeat; display:none; } #jstree-marker.marker { width:45px; background-position:-32px top; } #jstree-marker.marker_plus { width:5px; background-position:right top; } /* BACKGROUND DOTS */ .tree li li { overflow:hidden; } .tree > .ltr > li { display:table; } /* ICONS */ .tree ul ins { display:inline-block; text-decoration:none; width:16px; height:16px; } .tree .ltr ins { margin:0 4px 0 0px; } ';
if(/msie/.test(F)&&!/opera/.test(F)){if(parseInt(A)==6){B+='.tree li { height:18px; zoom:1; } .tree li li { overflow:visible; } .tree .ltr li.last { margin-top: expression( (this.previousSibling && /open/.test(this.previousSibling.className) ) ? "-2px" : "0"); } .marker { width:45px; background-position:-32px top; } .marker_plus { width:5px; background-position:right top; }'
}if(parseInt(A)==7){B+='.tree li li { overflow:visible; } .tree .ltr li.last { margin-top: expression( (this.previousSibling && /open/.test(this.previousSibling.className) ) ? "-2px" : "0"); }'
}}if(/opera/.test(F)){B+='.tree > ul > li.last:after { content:"."; display: block; height:1px; clear:both; visibility:hidden; }'
}if(/mozilla/.test(F)&&!/(compatible|webkit)/.test(F)&&A.indexOf("1.8")==0){B+=".tree .ltr li a { display:inline; float:left; } .tree li ul { clear:both; }"
}C.css=C.add_sheet({str:B})
})
})(jQuery);
(function(B){B.extend(B.tree.datastores,{html:function(){return{get:function(E,A,F){return E&&B(E).size()?B("<div>").append(A.get_node(E).clone()).html():A.container.children("ul:eq(0)").html()
},parse:function(H,F,A,G){if(G){G.call(null,H)
}return H
},load:function(H,F,A,G){if(A.url){B.ajax({type:A.method,url:A.url,data:H,dataType:"html",success:function(D,C){G.call(null,D)
},error:function(D,C,E){G.call(null,false);
F.error(E+" "+C)
}})
}else{G.call(null,A["static"]||F.container.children("ul:eq(0)").html())
}}}
},json:function(){return{get:function(N,R,Q){var A=this;
if(!N||B(N).size()==0){N=R.container.children("ul").children("li")
}else{N=B(N)
}if(!Q){Q={}
}if(!Q.outer_attrib){Q.outer_attrib=["id","rel","class"]
}if(!Q.inner_attrib){Q.inner_attrib=[]
}if(N.size()>1){var L=[];
N.each(function(){L.push(A.get(this,R,Q))
});
return L
}if(N.size()==0){return[]
}var S={attributes:{},data:{}};
if(N.hasClass("open")){S.data.state="open"
}if(N.hasClass("closed")){S.data.state="closed"
}for(var M in Q.outer_attrib){if(!Q.outer_attrib.hasOwnProperty(M)){continue
}var P=(Q.outer_attrib[M]=="class")?N.attr(Q.outer_attrib[M]).replace(/(^| )last( |$)/ig," ").replace(/(^| )(leaf|closed|open)( |$)/ig," "):N.attr(Q.outer_attrib[M]);
if(typeof P!="undefined"&&P.toString().replace(" ","").length>0){S.attributes[Q.outer_attrib[M]]=P
}delete P
}if(R.settings.languages.length){for(var M in R.settings.languages){if(!R.settings.languages.hasOwnProperty(M)){continue
}var T=N.children("a."+R.settings.languages[M]);
if(Q.force||Q.inner_attrib.length||T.children("ins").get(0).style.backgroundImage.toString().length||T.children("ins").get(0).className.length){S.data[R.settings.languages[M]]={};
S.data[R.settings.languages[M]].title=R.get_text(N,R.settings.languages[M]);
if(T.children("ins").get(0).style.className.length){S.data[R.settings.languages[M]].icon=T.children("ins").get(0).style.className
}if(T.children("ins").get(0).style.backgroundImage.length){S.data[R.settings.languages[M]].icon=T.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
}if(Q.inner_attrib.length){S.data[R.settings.languages[M]].attributes={};
for(var O in Q.inner_attrib){if(!Q.inner_attrib.hasOwnProperty(O)){continue
}var P=T.attr(Q.inner_attrib[O]);
if(typeof P!="undefined"&&P.toString().replace(" ","").length>0){S.data[R.settings.languages[M]].attributes[Q.inner_attrib[O]]=P
}delete P
}}}else{S.data[R.settings.languages[M]]=R.get_text(N,R.settings.languages[M])
}}}else{var T=N.children("a");
S.data.title=R.get_text(N);
if(T.children("ins").size()&&T.children("ins").get(0).className.length){S.data.icon=T.children("ins").get(0).className
}if(T.children("ins").size()&&T.children("ins").get(0).style.backgroundImage.length){S.data.icon=T.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
}if(Q.inner_attrib.length){S.data.attributes={};
for(var O in Q.inner_attrib){if(!Q.inner_attrib.hasOwnProperty(O)){continue
}var P=T.attr(Q.inner_attrib[O]);
if(typeof P!="undefined"&&P.toString().replace(" ","").length>0){S.data.attributes[Q.inner_attrib[O]]=P
}delete P
}}}if(N.children("ul").size()>0){S.children=[];
N.children("ul").children("li").each(function(){S.children.push(A.get(this,R,Q))
})
}return S
},parse:function(N,Q,P,A){if(Object.prototype.toString.apply(N)==="[object Array]"){var K="";
for(var M=0;
M<N.length;
M++){if(typeof N[M]=="function"){continue
}K+=this.parse(N[M],Q,P)
}if(A){A.call(null,K)
}return K
}if(!N||!N.data){if(A){A.call(null,false)
}return""
}var K="";
K+="<li ";
var R=false;
if(N.attributes){for(var M in N.attributes){if(!N.attributes.hasOwnProperty(M)){continue
}if(M=="class"){K+=" class='"+N.attributes[M]+" ";
if(N.state=="closed"||N.state=="open"){K+=" "+N.state+" "
}K+="' ";
R=true
}else{K+=" "+M+"='"+N.attributes[M]+"' "
}}}if(!R&&(N.state=="closed"||N.state=="open")){K+=" class='"+N.state+"' "
}K+=">";
if(Q.settings.languages.length){for(var M=0;
M<Q.settings.languages.length;
M++){var L={};
L.href="";
L.style="";
L["class"]=Q.settings.languages[M];
if(N.data[Q.settings.languages[M]]&&(typeof N.data[Q.settings.languages[M]].attributes).toLowerCase()!="undefined"){for(var O in N.data[Q.settings.languages[M]].attributes){if(!N.data[Q.settings.languages[M]].attributes.hasOwnProperty(O)){continue
}if(O=="style"||O=="class"){L[O]+=" "+N.data[Q.settings.languages[M]].attributes[O]
}else{L[O]=N.data[Q.settings.languages[M]].attributes[O]
}}}K+="<a";
for(var O in L){if(!L.hasOwnProperty(O)){continue
}K+=" "+O+'="'+L[O]+'" '
}K+=">";
if(N.data[Q.settings.languages[M]]&&N.data[Q.settings.languages[M]].icon){K+="<ins "+(N.data[Q.settings.languages[M]].icon.indexOf("/")==-1?" class='"+N.data[Q.settings.languages[M]].icon+"' ":" style='background-image:url(\""+N.data[Q.settings.languages[M]].icon+"\");' ")+">&nbsp;</ins>"
}else{K+="<ins>&nbsp;</ins>"
}K+=((typeof N.data[Q.settings.languages[M]].title).toLowerCase()!="undefined"?N.data[Q.settings.languages[M]].title:N.data[Q.settings.languages[M]])+"</a>"
}}else{var L={};
L.href="";
L.style="";
L["class"]="";
if((typeof N.data.attributes).toLowerCase()!="undefined"){for(var M in N.data.attributes){if(!N.data.attributes.hasOwnProperty(M)){continue
}if(M=="style"||M=="class"){L[M]+=" "+N.data.attributes[M]
}else{L[M]=N.data.attributes[M]
}}}K+="<a";
for(var M in L){if(!L.hasOwnProperty(M)){continue
}K+=" "+M+'="'+L[M]+'" '
}K+=">";
if(N.data.icon){K+="<ins "+(N.data.icon.indexOf("/")==-1?" class='"+N.data.icon+"' ":" style='background-image:url(\""+N.data.icon+"\");' ")+">&nbsp;</ins>"
}else{K+="<ins>&nbsp;</ins>"
}K+=((typeof N.data.title).toLowerCase()!="undefined"?N.data.title:N.data)+"</a>"
}if(N.children&&N.children.length){K+="<ul>";
for(var M=0;
M<N.children.length;
M++){K+=this.parse(N.children[M],Q,P)
}K+="</ul>"
}K+="</li>";
if(A){A.call(null,K)
}return K
},load:function(H,F,A,G){if(A["static"]){G.call(null,A["static"])
}else{B.ajax({type:A.method,url:A.url,data:H,dataType:"json",success:function(D,C){G.call(null,D)
},error:function(D,C,E){G.call(null,false);
F.error(E+" "+C)
}})
}}}
}})
})(jQuery);