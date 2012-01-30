(function(D){var A=D.event,F=A.special,C=F.pullcontent={setup:function(G){A.add(this,Core.MOUSEDOWN,B,G)
},teardown:function(){A.remove(this,Core.MOUSEDOWN,B)
}};
function B(G){returned=E(G,Core.PULLCONTENT)
}function E(G,J){try{G.type=J;
var I=D.event.handle.call(G);
return I===false?false:I||G.result
}catch(H){return false
}}})(jQuery);
var Core={applicationContext:"",isInBlockUiMode:false,binding:[],config:[],navParam:[],content:null,doException:null,wait:"",nbBlockUi:0,interruptedAction:null,plugins:[],addPlugin:function(A){this.plugins.push(A)
},_executePluginFunction:function(A,B){var C=null;
$.each(this.plugins,function(){if(this._entryPoint==A){C=this
}});
if(C!=null){return C.execute(B)
}else{Core.log("The plugin : "+A+" is not found.");
return null
}},setWaitMessage:function(A){this.wait=A
},initAjaxTrigger:function(){var B=function(D,C,E){var E=false;
if(C.responseText.indexOf("<error>true</error>")>-1){$("#mainContent").empty();
$("#mainContent").append(C.responseText);
$(".jGrowl-notification").trigger("jGrowl.close");
E=true
}return E
};
var A=function(C,F,E){var E=false;
if(F.responseText.indexOf("j_spring_cas_security_check")>-1||F.responseText.indexOf("j_spring_security_check")>-1){try{window.location.reload(true);
Core.log("reload windows")
}catch(D){Core.fireException(D)
}E=true
}return E
};
jQuery().ajaxError(function(C,F,E){Core.log("call after ajaxError");
Core.fireException(E);
Core.doException=true;
if(!B(C,F,E)){try{Core.setNavParam("errorHandle","true");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/exception/exception.jsf",{errorHandle:"true"},"#mainContent",true,false);
Core._hideBlockUI()
}catch(D){Core.fireException(D)
}}A(C,F,E)
});
jQuery().ajaxComplete(function(C,F){Core.log("call after ajaxComplete");
if(Core.doException==null||!Core.doException){if(F.responseText.indexOf("<error><message>")>-1){var D=Core.getValueOfXml(F.responseXML,"message");
var E=Core.getStatus(F.responseXML);
if(!E){Core.handleError(C,F,D)
}}}if(!A(C,F)){}})
},handleError:function(A,C,B){A.stopImmediatePropagation();
if(Core.doException!==true){Core.doException=true;
Core.log(A);
var D=null;
if(B!=null){D=B
}else{jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/exceptionAjaxController/getExceptionName.jsf",function(E){D=Core.getResult(E)
});
jQuery.ajaxSettings.async=true
}if(D!=null){Core._hideBlockUI(true);
setTimeout(function(){$.jGrowl(D,{header:"Important",theme:"jGrowlError",sticky:true})
},300);
Core.doException=false
}}},setConfig:function(A,B){Core.log("Enregistrement dans la config : "+A+"="+B);
this.config[A]=B
},getConfig:function(A){return this.config[A]
},setNavParam:function(A,B){Core.log("Add data navigation : "+A+"="+B);
this.navParam[A]=B
},getNavParam:function(A){return this.navParam[A]
},getNavParams:function(){var A=[];
for(x in this.navParam){A.push(x)
}return A
},resetNavParams:function(){this.navParam=[]
},getUrl:function(){return this.getNavParam("fromRequest")
},getUrlParams:function(){var param={};
var keys=this.getNavParams();
for(i=0;
i<keys.length;
i++){aux="{"+keys[i]+":'"+this.getNavParam(keys[i])+"'}";
eval("var json ="+aux);
param=$.extend(param,json)
}return param
},_showBlockUI:function(A){_opts=$.extend({delay:"600",onAfterShowBlockUI:function(){}},A);
if(this.nbBlockUi==0){this.isInBlockUiMode=true;
$.blockUI({message:"<h1>"+Core.wait+"</h1>",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:0.5,color:"#fff"}})
}else{_opts=$.extend(_opts,{delay:"0"})
}Core.log("---> Core._showBlockUI() : "+this.nbBlockUi);
if(this.nbBlockUi>0){this.nbBlockUi++;
_opts.onAfterShowBlockUI.call()
}else{this.nbBlockUi++;
setTimeout(_opts.onAfterShowBlockUI,_opts.delay)
}},_hideBlockUI:function(B){var A=false;
if(B!=null){A=B
}if(this.nbBlockUi>1&&!A){}else{this.isInBlockUiMode=false;
$.unblockUI();
this.nbBlockUi=0
}if(this.nbBlockUi>0){this.nbBlockUi--
}Core.log("---> Core._hideBlockUI(): "+this.nbBlockUi)
},pullAjaxContent:function(E,F,C,A,D){var B=C;
var G=F;
var H=E;
var J=A;
var I=this._executePluginFunction("ProfilePlugin",{theFunction:"canAccessToScreen",url:H,param:G});
if(!I){this.goToIndexPage()
}else{_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.closeAllValidatePromptsOpen();
if(D==undefined){D=true
}if(!D){Core.log("Call direct overload ajax panel on url : "+E);
Core._loadContentFromURL(H,G,B,J)
}else{if(!jQuery.isFunction(Core._optionGA.onConditionnal)&&!jQuery.isFunction(Core._optionGA.onFire)){Core.log("Call direct ajax panel on url : "+E);
Core._loadContentFromURL(H,G,B,J)
}else{Core.log("Call ajax panel on url : "+E);
Core.interruptedAction={url:H};
Core.addAction($(B),Core.PULLCONTENT,function(){Core._loadContentFromURL(H,G,B,J)
},true);
$(B).trigger(Core.PULLCONTENT)
}}}};
if(A){Core._showBlockUI(_displayBlockUIOption)
}else{_displayBlockUIOption.onAfterShowBlockUI.call()
}}},_loadContentFromURL:function(A,D,C,B){_divTargeted=C;
_urlParameter=D;
_displayBlockUI=B;
Core.removeBindingBySelector(C,Core.PULLCONTENT);
jQuery.ajaxSettings.async=false;
$.post(A,_urlParameter,function(E){$(_divTargeted).empty();
$(_divTargeted).append(E);
setTimeout(function(){welcome.resizeAll()
},300);
welcome.fireButtonBar();
if(_displayBlockUI){Core._hideBlockUI()
}});
jQuery.ajaxSettings.async=true;
$(_divTargeted).attr("url",A)
},addScreen:function(A){Core.log("Add screen to body");
try{if(!Profile.canDisplayNavigationArea()){welcome.hide("west")
}}catch(B){Core.log("Probl�me de profil dans la gestion de la zone de naviguation.")
}finally{A.fire();
$.each($("input[name*=ONLINE_HELP]"),function(){Core.addAction($(this),Core.KEYDOWN,function(C){if(C.which==13){$("iframe").attr("src",Lang.getString($(C.target).attr("name")));
$(".containerPlus").mb_open().css("visibility","visible");
return false
}},false);
Core.addAction($(this),Core.CLICK,function(C){$("iframe").attr("src",Lang.getString($(C.target).attr("name")));
$(".containerPlus").mb_open().css("visibility","visible");
return false
},false)
});
$.each($(".cbutton"),function(){$(this).unbind(Core.KEYDOWN);
$(this).bind(Core.KEYDOWN,function(C){if(C.which==13){$(this).children("a").click();
return false
}C.stopImmediatePropagation();
C.preventDefault();
return false
})
})
}},goToIndexPage:function(){Core._hideBlockUI();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{},"#mainContent",true,false)
},removeBindingBySelector:function(A,B){jQuery.each(Core.binding,function(E,D){if(D!=undefined&&D.el.selector==A&&D.declancheur==B){var C=Core.binding.slice(E+1||Core.binding.length);
Core.binding.length=E<0?Core.binding.length+E:E;
Core.binding.push.apply(Core.binding,C)
}})
},addBindingAction:function(A){itemToRemove=[];
jQuery.each(this.binding,function(B,C){if(C!=undefined&&C.el.selector==A.el.selector){itemToRemove.push(B)
}else{if(C=undefined){itemToRemove.push(B)
}}});
itemToRemove=itemToRemove.sort().reverse();
jQuery.each(itemToRemove,function(D,C){var B=Core.binding.slice(D+1||Core.binding.length);
Core.binding.length=D<0?Core.binding.length+D:D;
Core.binding.push.apply(Core.binding,B)
});
this.binding.push.apply(Core.binding,[A])
},addAction:function(E,C,A,D){try{Core.log("Add action to element "+E.get(0).tagName+"."+E.get(0).id+" on "+C)
}catch(B){Core.log("Add action to element "+E.tagName+"."+E.id+" on "+C)
}E.unbind(C,A);
E.bind(C,A);
if(D==undefined){D=true
}Core.log("overload action : "+D);
bindJQ={el:E,declancheur:C,action:A,overload:D};
Core.addBindingAction(bindJQ);
if(jQuery.isFunction(this._optionGA.onConditionnal)||jQuery.isFunction(this._optionGA.onFire)){this.addActionGlobal()
}},_optionGA:{onConditionnal:null,onTrue:null,onFalse:null,onFire:null,onException:null},addActionGlobal:function(B){Core.log("Add global action on fire.");
this._optionGA=$.extend(this._optionGA,B||{});
var A=this._optionGA;
jQuery.each(this.binding,function(C,D){if(D!=undefined&&D.overload){D.el.unbind(D.declancheur);
if(jQuery.isFunction(A.onConditionnal)){D.el.bind(D.declancheur,function(F){Core.log("fire global action on element : "+D.el.selector+" and on declancheur "+D.declancheur);
try{Core.interruptedAction=$.extend(Core.interruptedAction,{fire:true,action:D,event:F});
var E=A.onConditionnal.call(D,Core.interruptedAction,D);
Core.log("---> result of condition : "+E);
if(E){Core.log("Call callback on true condition");
A.onTrue(Core.interruptedAction)
}else{Core.log("Call callback on false condition");
A.onFalse(Core.interruptedAction)
}}catch(F){Core.fireException(F);
A.onException(Core.interruptedAction)
}if(Core.PULLCONTENT==D.declancheur){Core.log("remove binding action on div to prevent multiple call of pluContent ");
Core.removeBindingBySelector(D.el,Core.PULLCONTENT)
}})
}else{D.el.bind(D.declancheur,A.onFire)
}}})
},raisedInterruptedAction:function(){var A=false;
Core.log(Core.interruptedAction);
if(Core.interruptedAction!=null&&jQuery.isFunction(Core.interruptedAction.action.action)&&Core.interruptedAction.fire){Core.log(" raisedInterruptedAction ");
Core.interruptedAction.action.action(Core.interruptedAction.event);
Core.interruptedAction=null;
A=true
}return A
},delActionGlobal:function(){if(jQuery.isFunction(this._optionGA.onConditionnal)||jQuery.isFunction(this._optionGA.onFire)){Core.log("Remove global action information");
this._optionGA={onConditionnal:null,onTrue:null,onFalse:null,onFire:null,onException:null};
Core.interruptedAction=null;
jQuery.each(this.binding,function(B,C){try{C.el.bind(C.declancheur,C.action)
}catch(A){Core.log("Action is undefined.")
}})
}},fireException:function(B){var A="\r\n";
var C="Exception: ";
if(B.message){C+=B.message
}else{if(B.description){C+=B.description
}}if(B.lineNumber){C+=" on line number "+B.lineNumber
}if(B.fileName){C+=" in file "+B.fileName
}if(B.stack){C+=A+"Stack trace:"+A+B.stack
}Core.log(C)
},getStatus:function(A){try{return Core.getValueOfXml(A,"status")=="true"
}catch(B){return false
}},getIdOfComponent:function(A){return Core.getValueOfXml(A,"idOfComponent")
},getResult:function(A){return Core.getValueOfXml(A,"result")
},getValueOfXml:function(B,A){return $(B).find(A).text()
},log:function(A){if(Debug.isInDebug()){if(jQuery.browser.msie){if(("console" in window)){console.log(A)
}else{var C=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];
window.console={};
for(var B=0;
B<C.length;
++B){window.console[C[B]]=function(){}
}}}else{if(("console" in window)&&("firebug" in console)){console.log(A)
}}}}};
Const={ABORT:"abort",BLUR:"blur",CHANGE:"change",CLICK:"click",DBLCLICK:"dbclick",DRAGDROP:"dragdrop",ERROR:"erro",FOCUS:"focus",KEYDOWN:"keydown",KEYPRESS:"keypress",KEYUP:"keyup",LOAD:"load",MOUSEDOWN:"mousedown",MOUSEMOVE:"mousemove",MOUSEOUT:"mouseout",MOUSEOVER:"mouseover",MOUSEUP:"mouseup",MOVE:"move",RESET:"reset",RESIZE:"resize",SELECT:"select",SUBMIT:"submit",UNLOAD:"unload",BEFOREUNLOAD:"beforeunload",PULLCONTENT:"pullcontent"};
$.extend(Core,Const);
(function(A){A.fn.__focus__=A.fn.focus;
A.fn.__hide__=A.fn.hide;
A.__post__=A.post;
A.__currCss__=A.curCSS;
A.fn.focus=function(B){try{return A.fn.__focus__.apply(this,arguments)
}catch(C){}};
A.fn.hide=function(D,C){try{return A.fn.__hide__.apply(this,arguments)
}catch(B){}};
A.post=function(D,F,C,E){try{return A.__post__.apply(this,arguments)
}catch(B){Core.fireException(B)
}};
A.curCSS=function(E,D,B){try{return A.__currCss__.apply(this,arguments)
}catch(C){}};
return A
})(jQuery);
Core.initAjaxTrigger();