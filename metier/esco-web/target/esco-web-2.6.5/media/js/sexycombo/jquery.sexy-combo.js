(function(F){F.fn.sexyCombo=function(A){return this.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}new E(this,A)
})
};
var D={skin:"sexy",suffix:"__sexyCombo",hiddenSuffix:"__sexyComboHidden",renameOriginal:false,initialHiddenValue:"",emptyText:"",autoFill:false,triggerSelected:true,filterFn:null,dropUp:false,separator:",",key:"value",value:"text",showListCallback:null,hideListCallback:null,initCallback:null,initEventsCallback:null,changeCallback:null,textChangeCallback:null,checkWidth:true};
F.sexyCombo=function(M,C){if(M.tagName.toUpperCase()!="SELECT"){return 
}this.config=F.extend({},D,C||{});
this.selectbox=F(M);
this.options=this.selectbox.children().filter("option");
this.wrapper=this.selectbox.wrap("<div>").hide().parent().addClass("combo").addClass(this.config.skin);
this.input=F("<input type='text' />").appendTo(this.wrapper).attr("autocomplete","off").attr("value","").attr("name",this.selectbox.attr("name")+this.config.suffix);
var N=this.selectbox.attr("name");
var L=N+this.config.hiddenSuffix;
if(this.config.renameOriginal){this.selectbox.attr("name",L)
}this.hidden=F("<input type='hidden' />").appendTo(this.wrapper).attr("autocomplete","off").attr("value",this.config.initialHiddenValue).attr("name",this.config.renameOriginal?N:L);
this.icon=F("<div />").appendTo(this.wrapper).addClass("icon").attr("id","_"+this.selectbox.attr("name")+this.config.suffix);
this.listWrapper=F("<div />").appendTo(F(this.config.listContainer)).addClass("list-wrapper");
this.updateDrop();
this.list=F("<ul />").appendTo(this.listWrapper);
var A=this;
var B=[];
this.options.each(function(){var G=F.trim(F(this).text());
if(A.config.checkWidth){B.push(F("<li id='"+F(this).val()+"' />").appendTo(A.list).html("<span>"+G+"</span>").addClass("visible").find("span").outerWidth())
}else{F("<li />").appendTo(A.list).html("<span>"+G+"</span>").addClass("visible")
}});
this.listItems=this.list.children();
if(B.length){B=B.sort(function(G,H){return G-H
});
var K=B[B.length-1]
}this.singleItemHeight=this.listItems.outerHeight();
this.listWrapper.addClass("invisible");
if(F.browser.opera){this.wrapper.css({position:"relative",left:"0",top:"0"})
}this.filterFn=("function"==typeof (this.config.filterFn))?this.config.filterFn:this.filterFn;
this.lastKey=null;
this.multiple=this.selectbox.attr("multiple");
var A=this;
this.wrapper.data("sc:lastEvent","click");
this.overflowCSS="overflowY";
if((this.config.checkWidth)&&(this.listWrapper.innerWidth()<K)){this.overflowCSS="overflow"
}this.notify("init");
this.initEvents()
};
var E=F.sexyCombo;
E.fn=E.prototype={};
E.fn.extend=E.extend=F.extend;
E.fn.extend({initEvents:function(){var A=this;
this.icon.bind("click",function(B){A.wrapper.data("sc:positionY",F("input[name="+B.target.id.substring(1,B.target.id.length)+"]").offset().top+17);
if(F.browser.msie){A.wrapper.data("sc:positionX",F("input[name="+B.target.id.substring(1,B.target.id.length)+"]").offset().left+1)
}else{A.wrapper.data("sc:positionX",F("input[name="+B.target.id.substring(1,B.target.id.length)+"]").offset().left-2)
}});
this.input.bind("click",function(B){A.wrapper.data("sc:positionY",F("input[name="+B.target.name+"]").offset().top+17);
if(F.browser.msie){A.wrapper.data("sc:positionX",F("input[name="+B.target.name+"]").offset().left+1)
}else{A.wrapper.data("sc:positionX",F("input[name="+B.target.name+"]").offset().left-2)
}});
this.icon.bind("click",function(){if(A.input.attr("disabled")){A.input.attr("disabled",false)
}A.wrapper.data("sc:lastEvent","click");
A.filter();
A.iconClick()
});
this.listItems.bind("mouseover",function(B){if("LI"==B.target.nodeName.toUpperCase()){A.highlight(B.target)
}else{A.highlight(F(B.target).parent())
}});
this.listItems.bind("click",function(B){A.listItemClick(F(B.target))
});
this.input.bind("keyup",function(B){A.wrapper.data("sc:positionY",F("input[name="+B.target.name+"]").offset().top+17);
if(F.browser.msie){A.wrapper.data("sc:positionX",F("input[name="+B.target.name+"]").offset().left+1)
}else{A.wrapper.data("sc:positionX",F("input[name="+B.target.name+"]").offset().left-2)
}A.wrapper.data("sc:lastEvent","key");
A.keyUp(B)
});
this.input.bind("keypress",function(B){if(E.KEY.RETURN==B.keyCode){B.preventDefault()
}if(E.KEY.TAB==B.keyCode){B.preventDefault()
}});
F(document).bind("click",function(B){if((A.icon.get(0)==B.target)||(A.input.get(0)==B.target)){return 
}A.hideList()
});
this.triggerSelected();
this.applyEmptyText();
this.input.bind("click",function(B){if(A.config.autoFill){A.wrapper.data("sc:lastEvent","click");
A.icon.trigger("click")
}else{B.stopImmediatePropagation();
this.blur();
A.showList()
}});
this.wrapper.bind("click",function(){A.wrapper.data("sc:lastEvent","click")
});
this.input.bind("keydown",function(B){if(!A.config.autoFill){B.stopImmediatePropagation();
this.blur()
}});
this.wrapper.bind("keyup",function(B){var C=B.keyCode;
for(key in E.KEY){if(E.KEY[key]==C){return 
}}A.wrapper.data("sc:lastEvent","key")
});
this.input.bind("click",function(){A.wrapper.data("sc:lastEvent","click")
});
this.notify("initEvents")
},getTextValue:function(){return this.__getValue("input")
},getCurrentTextValue:function(){return this.__getCurrentValue("input")
},getHiddenValue:function(){return this.__getValue("hidden")
},getCurrentHiddenValue:function(){return this.__getCurrentValue("hidden")
},__getValue:function(I){I=this[I];
if(!this.multiple){return F.trim(I.val())
}var A=I.val().split(this.config.separator);
var J=[];
for(var B=0,C=A.length;
B<C;
++B){J.push(F.trim(A[B]))
}J=E.normalizeArray(J);
return J
},__getCurrentValue:function(A){A=this[A];
if(!this.multiple){return F.trim(A.val())
}return F.trim(A.val().split(this.config.separator).pop())
},iconClick:function(){if(this.listVisible()){this.hideList();
this.input.blur()
}else{this.showList();
this.input.focus()
}},listVisible:function(){return this.listWrapper.hasClass("visible")
},showList:function(){if(!this.listItems.filter(".visible").length){return 
}this.listWrapper.removeClass("invisible").addClass("visible");
F(this.listWrapper).css("top",parseInt(this.wrapper.data("sc:positionY")));
F(this.listWrapper).css("left",parseInt(this.wrapper.data("sc:positionX")));
F(this.listWrapper).parent().css("display","block");
F(this.listWrapper).parent().css("zIndex","50");
this.wrapper.css("zIndex","50");
this.listWrapper.css("zIndex","50");
this.setListHeight();
var A=this.listWrapper.height();
var H=this.wrapper.height();
var B=parseInt(this.wrapper.data("sc:positionY"))+H+A;
var C=F(window).height()+F(document).scrollTop();
if(""==F.trim(this.input.val())){this.highlightFirst();
this.listWrapper.scrollTop(0)
}else{this.highlightSelected()
}this.notify("showList")
},hideList:function(){if(this.listWrapper.hasClass("invisible")){return 
}F(this.listWrapper).parent().css("display","none");
this.listWrapper.removeClass("visible").addClass("invisible");
this.wrapper.css("zIndex","0");
this.listWrapper.css("zIndex","100");
this.notify("hideList")
},getListItemsHeight:function(){return 15*this.liLen()
},setOverflow:function(){var A=this.getListMaxHeight();
if(this.getListItemsHeight()>A){this.listWrapper.css("overflowY","scroll");
this.listWrapper.css("overflowX","scroll")
}else{this.listWrapper.css("overflowY","hidden");
this.listWrapper.css("overflowX","hidden")
}},highlight:function(A){if((E.KEY.DOWN==this.lastKey)||(E.KEY.UP==this.lastKey)){return 
}this.listItems.removeClass("active");
F(A).addClass("active")
},setComboValue:function(I,J,C){var A=this.input.val();
var B="";
if(this.multiple){B=this.getTextValue();
if(J){B.pop()
}B.push(F.trim(I));
B=E.normalizeArray(B);
B=B.join(this.config.separator)+this.config.separator
}else{B=F.trim(I)
}this.input.val(B);
this.setHiddenValue(I);
this.filter();
if(C){this.hideList()
}this.input.removeClass("empty");
if(this.multiple){this.input.focus()
}if(this.input.val()!=A){this.notify("textChange")
}},setHiddenValue:function(O){var R=false;
O=F.trim(O);
var P=this.hidden.val();
if(!this.multiple){for(var C=0,B=this.options.length;
C<B;
++C){if(O==this.options.eq(C).text()){this.hidden.val(this.options.eq(C).val());
R=true;
break
}}}else{var A=this.getTextValue();
var Q=[];
for(var C=0,B=A.length;
C<B;
++C){for(var M=0,N=this.options.length;
M<N;
++M){if(A[C]==this.options.eq(M).text()){Q.push(this.options.eq(M).val())
}}}if(Q.length){R=true;
this.hidden.val(Q.join(this.config.separator))
}}if(!R){this.hidden.val(this.config.initialHiddenValue)
}if(P!=this.hidden.val()){this.notify("change")
}this.selectbox.val(this.hidden.val());
this.selectbox.trigger("change")
},listItemClick:function(A){this.setComboValue(A.text(),true,true);
this.inputFocus()
},filter:function(){if("yes"==this.wrapper.data("sc:optionsChanged")){var A=this;
this.listItems.remove();
this.options=this.selectbox.children().filter("option");
this.options.each(function(){var C=F.trim(F(this).text());
F("<li />").appendTo(A.list).text(C).addClass("visible")
});
this.listItems=this.list.children();
this.listItems.bind("mouseover",function(C){A.highlight(C.target)
});
this.listItems.bind("click",function(C){A.listItemClick(F(C.target))
});
A.wrapper.data("sc:optionsChanged","")
}var B=this.input.val();
var A=this;
this.listItems.each(function(){var H=F(this);
var C=H.text();
if(A.filterFn.call(A,A.getCurrentTextValue(),C,A.getTextValue())){H.removeClass("invisible").addClass("visible")
}else{H.removeClass("visible").addClass("invisible")
}});
this.setOverflow();
this.setListHeight()
},filterFn:function(J,I,B){if("click"==this.wrapper.data("sc:lastEvent")){return true
}if(!this.multiple){return I.toLowerCase().indexOf(J.toLowerCase())==0
}else{for(var A=0,C=B.length;
A<C;
++A){if(I==B[A]){return false
}}return I.toLowerCase().search(J.toLowerCase())==0
}},getListMaxHeight:function(){var A=parseInt(this.listWrapper.css("maxHeight"),10);
if(isNaN(A)){A=this.singleItemHeight*10
}return A
},setListHeight:function(){var A=this.getListItemsHeight();
var B=this.getListMaxHeight();
var C=this.listWrapper.height();
if(A<C){this.listWrapper.height(A);
return A
}else{if(A>C){this.listWrapper.height(Math.min(B,A));
return Math.min(B,A)
}}},getActive:function(){return this.listItems.filter(".active")
},keyUp:function(A){this.lastKey=A.keyCode;
var B=E.KEY;
switch(A.keyCode){case B.RETURN:case B.TAB:this.setComboValue(this.getActive().text(),true,true);
if(!this.multiple){break
}case B.DOWN:this.highlightNext();
break;
case B.UP:this.highlightPrev();
break;
case B.ESC:this.hideList();
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
var A=F.trim(this.input.val());
try{this.listItems.each(function(){var C=F(this);
if(C.text()==A){C.addClass("active");
self.listWrapper.scrollTop(0);
self.scrollDown()
}});
this.highlightFirst()
}catch(B){}},highlightNext:function(){var A=this.getActive().next();
while(A.hasClass("invisible")&&A.length){A=A.next()
}if(A.length){this.listItems.removeClass("active");
A.addClass("active");
this.scrollDown()
}},scrollDown:function(){if("scroll"!=this.listWrapper.css(this.overflowCSS)){return 
}var B=this.getActiveIndex()+1;
var A=this.listItems.outerHeight()*B-this.listWrapper.height();
if(F.browser.msie){A+=B
}if(this.listWrapper.scrollTop()<A){this.listWrapper.scrollTop(A)
}},highlightPrev:function(){var A=this.getActive().prev();
while(A.length&&A.hasClass("invisible")){A=A.prev()
}if(A.length){this.getActive().removeClass("active");
A.addClass("active");
this.scrollUp()
}},getActiveIndex:function(){return F.inArray(this.getActive().get(0),this.listItems.filter(".visible").get())
},scrollUp:function(){if("scroll"!=this.listWrapper.css(this.overflowCSS)){return 
}var A=this.getActiveIndex()*this.listItems.outerHeight();
if(this.listWrapper.scrollTop()>A){this.listWrapper.scrollTop(A)
}},applyEmptyText:function(){if(!this.config.emptyText.length){return 
}var A=this;
this.input.bind("focus",function(){A.inputFocus()
}).bind("blur",function(){A.inputBlur()
});
if(""==this.input.val()){this.input.addClass("empty").val(this.config.emptyText)
}},inputFocus:function(){if(this.input.hasClass("empty")){this.input.removeClass("empty").val("")
}},inputBlur:function(){if(""==this.input.val()){this.input.addClass("empty").val(this.config.emptyText)
}},triggerSelected:function(){if(!this.config.triggerSelected){return 
}var B=this;
try{this.options.each(function(){if(F(this).attr("selected")){B.setComboValue(F(this).text(),false,true);
throw new Error()
}})
}catch(A){return 
}B.setComboValue(this.options.eq(0).text(),false,false)
},autoFill:function(){if(!this.config.autoFill||(E.KEY.BACKSPACE==this.lastKey)||this.multiple){return 
}var A=this.input.val();
var B=this.getActive().text();
this.input.val(B);
this.selection(this.input.get(0),A.length,B.length)
},selection:function(H,C,A){if(H.createTextRange){var B=H.createTextRange();
B.collapse(true);
B.moveStart("character",C);
B.moveEnd("character",A);
B.select()
}else{if(H.setSelectionRange){H.setSelectionRange(C,A)
}else{if(H.selectionStart){H.selectionStart=C;
H.selectionEnd=A
}}}},updateDrop:function(){if(this.config.dropUp){this.listWrapper.addClass("list-wrapper-up")
}else{this.listWrapper.removeClass("list-wrapper-up")
}},setDropUp:function(A){this.config.dropUp=A;
this.updateDrop()
},notify:function(A){if(!F.isFunction(this.config[A+"Callback"])){return 
}this.config[A+"Callback"].call(this)
}});
E.extend({KEY:{UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8},log:function(A){var B=F("#log");
B.html(B.html()+A+"<br />")
},createSelectbox:function(C){var J=F("<select />").appendTo(C.container).attr({name:C.name,id:C.id,size:"1"});
if(C.multiple){J.attr("multiple",true)
}var K=C.data;
var A=false;
for(var B=0,L=K.length;
B<L;
++B){A=K[B].selected||false;
F("<option />").appendTo(J).attr("value",K[B][C.key]).text(K[B][C.value]).attr("selected",A)
}return J.get(0)
},create:function(C){var B={name:"",id:"",data:[],multiple:false,key:"value",value:"text",container:F(document),url:"",ajaxData:{}};
C=F.extend({},B,C||{});
if(C.url){return F.getJSON(C.url,C.ajaxData,function(H){delete C.url;
delete C.ajaxData;
C.data=H;
return E.create(C)
})
}C.container=F(C.container);
var A=E.createSelectbox(C);
return new E(A,C)
},deactivate:function(A){A=F(A);
A.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var B=F(this);
if(!B.parent().is(".combo")){return 
}})
},activate:function(A){A=F(A);
A.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var B=F(this);
if(!B.parent().is(".combo")){return 
}B.parent().find("input[type='text']").attr("disabled",false)
})
},changeOptions:function(A){A=F(A);
A.each(function(){if("SELECT"!=this.tagName.toUpperCase()){return 
}var C=F(this);
var J=C.parent();
var B=J.find("input[type='text']");
var K=J.find("ul").parent();
K.removeClass("visible").addClass("invisible");
J.css("zIndex","0");
K.css("zIndex","100");
B.val("");
J.data("sc:optionsChanged","yes");
var L=C;
L.parent().find("input[type='text']").val(L.find("option:eq(0)").text());
L.parent().data("sc:lastEvent","click");
L.find("option:eq(0)").attr("selected","selected")
})
},normalizeArray:function(H){var A=[];
for(var C=0,B=H.length;
C<B;
++C){if(""==H[C]){continue
}A.push(H[C])
}return A
}})
})(jQuery);