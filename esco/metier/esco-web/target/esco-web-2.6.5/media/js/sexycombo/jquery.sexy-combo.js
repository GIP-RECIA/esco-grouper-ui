(function(B){B.fn.sexyCombo=function(D){return this.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}new C(this,D)
})
};
var A={skin:"sexy",suffix:"__sexyCombo",hiddenSuffix:"__sexyComboHidden",renameOriginal:false,initialHiddenValue:"",emptyText:"",autoFill:false,triggerSelected:true,filterFn:null,dropUp:false,separator:",",key:"value",value:"text",showListCallback:null,hideListCallback:null,initCallback:null,initEventsCallback:null,changeCallback:null,textChangeCallback:null,checkWidth:true};
B.sexyCombo=function(E,H){if(E.tagName.toUpperCase()!="SELECT"){return 
}this.config=B.extend({},A,H||{});
this.selectbox=B(E);
this.options=this.selectbox.children().filter("option");
this.wrapper=this.selectbox.wrap("<div>").hide().parent().addClass("combo").addClass(this.config.skin);
this.input=B("<input type='text' />").appendTo(this.wrapper).attr("autocomplete","off").attr("value","").attr("name",this.selectbox.attr("name")+this.config.suffix);
var D=this.selectbox.attr("name");
var F=D+this.config.hiddenSuffix;
if(this.config.renameOriginal){this.selectbox.attr("name",F)
}this.hidden=B("<input type='hidden' />").appendTo(this.wrapper).attr("autocomplete","off").attr("value",this.config.initialHiddenValue).attr("name",this.config.renameOriginal?D:F);
this.icon=B("<div />").appendTo(this.wrapper).addClass("icon").attr("id","_"+this.selectbox.attr("name")+this.config.suffix);
this.listWrapper=B("<div />").appendTo(B(this.config.listContainer)).addClass("list-wrapper");
this.updateDrop();
this.list=B("<ul />").appendTo(this.listWrapper);
var J=this;
var I=[];
this.options.each(function(){var K=B.trim(B(this).text());
if(J.config.checkWidth){I.push(B("<li id='"+B(this).val()+"' />").appendTo(J.list).html("<span>"+K+"</span>").addClass("visible").find("span").outerWidth())
}else{B("<li />").appendTo(J.list).html("<span>"+K+"</span>").addClass("visible")
}});
this.listItems=this.list.children();
if(I.length){I=I.sort(function(L,K){return L-K
});
var G=I[I.length-1]
}this.singleItemHeight=this.listItems.outerHeight();
this.listWrapper.addClass("invisible");
if(B.browser.opera){this.wrapper.css({position:"relative",left:"0",top:"0"})
}this.filterFn=("function"==typeof (this.config.filterFn))?this.config.filterFn:this.filterFn;
this.lastKey=null;
this.multiple=this.selectbox.attr("multiple");
var J=this;
this.wrapper.data("sc:lastEvent","click");
this.overflowCSS="overflowY";
if((this.config.checkWidth)&&(this.listWrapper.innerWidth()<G)){this.overflowCSS="overflow"
}this.notify("init");
this.initEvents()
};
var C=B.sexyCombo;
C.fn=C.prototype={};
C.fn.extend=C.extend=B.extend;
C.fn.extend({initEvents:function(){var D=this;
this.icon.bind("click",function(E){D.wrapper.data("sc:positionY",B("input[name="+E.target.id.substring(1,E.target.id.length)+"]").offset().top+17);
if(B.browser.msie){D.wrapper.data("sc:positionX",B("input[name="+E.target.id.substring(1,E.target.id.length)+"]").offset().left+1)
}else{D.wrapper.data("sc:positionX",B("input[name="+E.target.id.substring(1,E.target.id.length)+"]").offset().left-2)
}});
this.input.bind("click",function(E){D.wrapper.data("sc:positionY",B("input[name="+E.target.name+"]").offset().top+17);
if(B.browser.msie){D.wrapper.data("sc:positionX",B("input[name="+E.target.name+"]").offset().left+1)
}else{D.wrapper.data("sc:positionX",B("input[name="+E.target.name+"]").offset().left-2)
}});
this.icon.bind("click",function(){if(D.input.attr("disabled")){D.input.attr("disabled",false)
}D.wrapper.data("sc:lastEvent","click");
D.filter();
D.iconClick()
});
this.listItems.bind("mouseover",function(E){if("LI"==E.target.nodeName.toUpperCase()){D.highlight(E.target)
}else{D.highlight(B(E.target).parent())
}});
this.listItems.bind("click",function(E){D.listItemClick(B(E.target))
});
this.input.bind("keyup",function(E){D.wrapper.data("sc:positionY",B("input[name="+E.target.name+"]").offset().top+17);
if(B.browser.msie){D.wrapper.data("sc:positionX",B("input[name="+E.target.name+"]").offset().left+1)
}else{D.wrapper.data("sc:positionX",B("input[name="+E.target.name+"]").offset().left-2)
}D.wrapper.data("sc:lastEvent","key");
D.keyUp(E)
});
this.input.bind("keypress",function(E){if(C.KEY.RETURN==E.keyCode){E.preventDefault()
}if(C.KEY.TAB==E.keyCode){E.preventDefault()
}});
B(document).bind("click",function(E){if((D.icon.get(0)==E.target)||(D.input.get(0)==E.target)){return 
}D.hideList()
});
this.triggerSelected();
this.applyEmptyText();
this.input.bind("click",function(E){if(D.config.autoFill){D.wrapper.data("sc:lastEvent","click");
D.icon.trigger("click")
}else{E.stopImmediatePropagation();
this.blur();
D.showList()
}});
this.wrapper.bind("click",function(){D.wrapper.data("sc:lastEvent","click")
});
this.input.bind("keydown",function(E){if(!D.config.autoFill){E.stopImmediatePropagation();
this.blur()
}});
this.wrapper.bind("keyup",function(F){var E=F.keyCode;
for(key in C.KEY){if(C.KEY[key]==E){return 
}}D.wrapper.data("sc:lastEvent","key")
});
this.input.bind("click",function(){D.wrapper.data("sc:lastEvent","click")
});
this.notify("initEvents")
},getTextValue:function(){return this.__getValue("input")
},getCurrentTextValue:function(){return this.__getCurrentValue("input")
},getHiddenValue:function(){return this.__getValue("hidden")
},getCurrentHiddenValue:function(){return this.__getCurrentValue("hidden")
},__getValue:function(E){E=this[E];
if(!this.multiple){return B.trim(E.val())
}var H=E.val().split(this.config.separator);
var D=[];
for(var G=0,F=H.length;
G<F;
++G){D.push(B.trim(H[G]))
}D=C.normalizeArray(D);
return D
},__getCurrentValue:function(D){D=this[D];
if(!this.multiple){return B.trim(D.val())
}return B.trim(D.val().split(this.config.separator).pop())
},iconClick:function(){if(this.listVisible()){this.hideList();
this.input.blur()
}else{this.showList();
this.input.focus()
}},listVisible:function(){return this.listWrapper.hasClass("visible")
},showList:function(){if(!this.listItems.filter(".visible").length){return 
}this.listWrapper.removeClass("invisible").addClass("visible");
B(this.listWrapper).css("top",parseInt(this.wrapper.data("sc:positionY")));
B(this.listWrapper).css("left",parseInt(this.wrapper.data("sc:positionX")));
B(this.listWrapper).parent().css("display","block");
B(this.listWrapper).parent().css("zIndex","50");
this.wrapper.css("zIndex","50");
this.listWrapper.css("zIndex","50");
this.setListHeight();
var G=this.listWrapper.height();
var D=this.wrapper.height();
var F=parseInt(this.wrapper.data("sc:positionY"))+D+G;
var E=B(window).height()+B(document).scrollTop();
if(""==B.trim(this.input.val())){this.highlightFirst();
this.listWrapper.scrollTop(0)
}else{this.highlightSelected()
}this.notify("showList")
},hideList:function(){if(this.listWrapper.hasClass("invisible")){return 
}B(this.listWrapper).parent().css("display","none");
this.listWrapper.removeClass("visible").addClass("invisible");
this.wrapper.css("zIndex","0");
this.listWrapper.css("zIndex","100");
this.notify("hideList")
},getListItemsHeight:function(){return 15*this.liLen()
},setOverflow:function(){var D=this.getListMaxHeight();
if(this.getListItemsHeight()>D){this.listWrapper.css("overflowY","scroll");
this.listWrapper.css("overflowX","scroll")
}else{this.listWrapper.css("overflowY","hidden");
this.listWrapper.css("overflowX","hidden")
}},highlight:function(D){if((C.KEY.DOWN==this.lastKey)||(C.KEY.UP==this.lastKey)){return 
}this.listItems.removeClass("active");
B(D).addClass("active")
},setComboValue:function(E,D,F){var H=this.input.val();
var G="";
if(this.multiple){G=this.getTextValue();
if(D){G.pop()
}G.push(B.trim(E));
G=C.normalizeArray(G);
G=G.join(this.config.separator)+this.config.separator
}else{G=B.trim(E)
}this.input.val(G);
this.setHiddenValue(E);
this.filter();
if(F){this.hideList()
}this.input.removeClass("empty");
if(this.multiple){this.input.focus()
}if(this.input.val()!=H){this.notify("textChange")
}},setHiddenValue:function(H){var E=false;
H=B.trim(H);
var G=this.hidden.val();
if(!this.multiple){for(var K=0,L=this.options.length;
K<L;
++K){if(H==this.options.eq(K).text()){this.hidden.val(this.options.eq(K).val());
E=true;
break
}}}else{var D=this.getTextValue();
var F=[];
for(var K=0,L=D.length;
K<L;
++K){for(var J=0,I=this.options.length;
J<I;
++J){if(D[K]==this.options.eq(J).text()){F.push(this.options.eq(J).val())
}}}if(F.length){E=true;
this.hidden.val(F.join(this.config.separator))
}}if(!E){this.hidden.val(this.config.initialHiddenValue)
}if(G!=this.hidden.val()){this.notify("change")
}this.selectbox.val(this.hidden.val());
this.selectbox.trigger("change")
},listItemClick:function(D){this.setComboValue(D.text(),true,true);
this.inputFocus()
},filter:function(){if("yes"==this.wrapper.data("sc:optionsChanged")){var E=this;
this.listItems.remove();
this.options=this.selectbox.children().filter("option");
this.options.each(function(){var F=B.trim(B(this).text());
B("<li />").appendTo(E.list).text(F).addClass("visible")
});
this.listItems=this.list.children();
this.listItems.bind("mouseover",function(F){E.highlight(F.target)
});
this.listItems.bind("click",function(F){E.listItemClick(B(F.target))
});
E.wrapper.data("sc:optionsChanged","")
}var D=this.input.val();
var E=this;
this.listItems.each(function(){var F=B(this);
var G=F.text();
if(E.filterFn.call(E,E.getCurrentTextValue(),G,E.getTextValue())){F.removeClass("invisible").addClass("visible")
}else{F.removeClass("visible").addClass("invisible")
}});
this.setOverflow();
this.setListHeight()
},filterFn:function(D,E,G){if("click"==this.wrapper.data("sc:lastEvent")){return true
}if(!this.multiple){return E.toLowerCase().indexOf(D.toLowerCase())==0
}else{for(var H=0,F=G.length;
H<F;
++H){if(E==G[H]){return false
}}return E.toLowerCase().search(D.toLowerCase())==0
}},getListMaxHeight:function(){var D=parseInt(this.listWrapper.css("maxHeight"),10);
if(isNaN(D)){D=this.singleItemHeight*10
}return D
},setListHeight:function(){var F=this.getListItemsHeight();
var E=this.getListMaxHeight();
var D=this.listWrapper.height();
if(F<D){this.listWrapper.height(F);
return F
}else{if(F>D){this.listWrapper.height(Math.min(E,F));
return Math.min(E,F)
}}},getActive:function(){return this.listItems.filter(".active")
},keyUp:function(E){this.lastKey=E.keyCode;
var D=C.KEY;
switch(E.keyCode){case D.RETURN:case D.TAB:this.setComboValue(this.getActive().text(),true,true);
if(!this.multiple){break
}case D.DOWN:this.highlightNext();
break;
case D.UP:this.highlightPrev();
break;
case D.ESC:this.hideList();
break;
default:this.inputChanged();
break
}},liLen:function(){return this.listItems.filter(".visible").length
},inputChanged:function(){this.filter();
if(this.liLen()){this.showList();
this.setOverflow();
this.setListHeight()
}else{this.hideList()
}this.setHiddenValue(this.input.val());
this.notify("textChange")
},highlightFirst:function(){this.listItems.removeClass("active").filter(".visible:eq(0)").addClass("active");
this.autoFill()
},highlightSelected:function(){this.listItems.removeClass("active");
var E=B.trim(this.input.val());
try{this.listItems.each(function(){var F=B(this);
if(F.text()==E){F.addClass("active");
self.listWrapper.scrollTop(0);
self.scrollDown()
}});
this.highlightFirst()
}catch(D){}},highlightNext:function(){var D=this.getActive().next();
while(D.hasClass("invisible")&&D.length){D=D.next()
}if(D.length){this.listItems.removeClass("active");
D.addClass("active");
this.scrollDown()
}},scrollDown:function(){if("scroll"!=this.listWrapper.css(this.overflowCSS)){return 
}var D=this.getActiveIndex()+1;
var E=this.listItems.outerHeight()*D-this.listWrapper.height();
if(B.browser.msie){E+=D
}if(this.listWrapper.scrollTop()<E){this.listWrapper.scrollTop(E)
}},highlightPrev:function(){var D=this.getActive().prev();
while(D.length&&D.hasClass("invisible")){D=D.prev()
}if(D.length){this.getActive().removeClass("active");
D.addClass("active");
this.scrollUp()
}},getActiveIndex:function(){return B.inArray(this.getActive().get(0),this.listItems.filter(".visible").get())
},scrollUp:function(){if("scroll"!=this.listWrapper.css(this.overflowCSS)){return 
}var D=this.getActiveIndex()*this.listItems.outerHeight();
if(this.listWrapper.scrollTop()>D){this.listWrapper.scrollTop(D)
}},applyEmptyText:function(){if(!this.config.emptyText.length){return 
}var D=this;
this.input.bind("focus",function(){D.inputFocus()
}).bind("blur",function(){D.inputBlur()
});
if(""==this.input.val()){this.input.addClass("empty").val(this.config.emptyText)
}},inputFocus:function(){if(this.input.hasClass("empty")){this.input.removeClass("empty").val("")
}},inputBlur:function(){if(""==this.input.val()){this.input.addClass("empty").val(this.config.emptyText)
}},triggerSelected:function(){if(!this.config.triggerSelected){return 
}var D=this;
try{this.options.each(function(){if(B(this).attr("selected")){D.setComboValue(B(this).text(),false,true);
throw new Error()
}})
}catch(E){return 
}D.setComboValue(this.options.eq(0).text(),false,false)
},autoFill:function(){if(!this.config.autoFill||(C.KEY.BACKSPACE==this.lastKey)||this.multiple){return 
}var E=this.input.val();
var D=this.getActive().text();
this.input.val(D);
this.selection(this.input.get(0),E.length,D.length)
},selection:function(D,E,G){if(D.createTextRange){var F=D.createTextRange();
F.collapse(true);
F.moveStart("character",E);
F.moveEnd("character",G);
F.select()
}else{if(D.setSelectionRange){D.setSelectionRange(E,G)
}else{if(D.selectionStart){D.selectionStart=E;
D.selectionEnd=G
}}}},updateDrop:function(){if(this.config.dropUp){this.listWrapper.addClass("list-wrapper-up")
}else{this.listWrapper.removeClass("list-wrapper-up")
}},setDropUp:function(D){this.config.dropUp=D;
this.updateDrop()
},notify:function(D){if(!B.isFunction(this.config[D+"Callback"])){return 
}this.config[D+"Callback"].call(this)
}});
C.extend({KEY:{UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8},log:function(E){var D=B("#log");
D.html(D.html()+E+"<br />")
},createSelectbox:function(G){var F=B("<select />").appendTo(G.container).attr({name:G.name,id:G.id,size:"1"});
if(G.multiple){F.attr("multiple",true)
}var E=G.data;
var I=false;
for(var H=0,D=E.length;
H<D;
++H){I=E[H].selected||false;
B("<option />").appendTo(F).attr("value",E[H][G.key]).text(E[H][G.value]).attr("selected",I)
}return F.get(0)
},create:function(D){var E={name:"",id:"",data:[],multiple:false,key:"value",value:"text",container:B(document),url:"",ajaxData:{}};
D=B.extend({},E,D||{});
if(D.url){return B.getJSON(D.url,D.ajaxData,function(G){delete D.url;
delete D.ajaxData;
D.data=G;
return C.create(D)
})
}D.container=B(D.container);
var F=C.createSelectbox(D);
return new C(F,D)
},deactivate:function(D){D=B(D);
D.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var E=B(this);
if(!E.parent().is(".combo")){return 
}})
},activate:function(D){D=B(D);
D.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var E=B(this);
if(!E.parent().is(".combo")){return 
}E.parent().find("input[type='text']").attr("disabled",false)
})
},changeOptions:function(D){D=B(D);
D.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var H=B(this);
var G=H.parent();
var I=G.find("input[type='text']");
var F=G.find("ul").parent();
F.removeClass("visible").addClass("invisible");
G.css("zIndex","0");
F.css("zIndex","100");
I.val("");
G.data("sc:optionsChanged","yes");
var E=H;
E.parent().find("input[type='text']").val(E.find("option:eq(0)").text());
E.parent().data("sc:lastEvent","click");
E.find("option:eq(0)").attr("selected","selected")
})
},normalizeArray:function(D){var G=[];
for(var E=0,F=D.length;
E<F;
++E){if(""==D[E]){continue
}G.push(D[E])
}return G
}})
})(jQuery);