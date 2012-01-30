(function(J){var G=J.event,H=G.special,K=H.pullcontent={setup:function(A){G.add(this,Core.MOUSEDOWN,L,A)
},teardown:function(){G.remove(this,Core.MOUSEDOWN,L)
}};
function L(A){returned=I(A,Core.PULLCONTENT)
}function I(D,A){try{D.type=A;
var B=J.event.handle.call(D);
return B===false?false:B||D.result
}catch(C){return false
}}})(jQuery);
var Core={applicationContext:"",isInBlockUiMode:false,binding:[],config:[],navParam:[],content:null,doException:null,wait:"",nbBlockUi:0,interruptedAction:null,plugins:[],addPlugin:function(B){this.plugins.push(B)
},_executePluginFunction:function(D,F){var E=null;
$.each(this.plugins,function(){if(this._entryPoint==D){E=this
}});
if(E!=null){return E.execute(F)
}else{Core.log("The plugin : "+D+" is not found.");
return null
}},setWaitMessage:function(B){this.wait=B
},initAjaxTrigger:function(){var D=function(B,F,A){var A=false;
if(F.responseText.indexOf("<error>true</error>")>-1){$("#mainContent").empty();
$("#mainContent").append(F.responseText);
$(".jGrowl-notification").trigger("jGrowl.close");
A=true
}return A
};
var C=function(H,A,B){var B=false;
if(A.responseText.indexOf("j_spring_cas_security_check")>-1||A.responseText.indexOf("j_spring_security_check")>-1){try{window.location.reload(true);
Core.log("reload windows")
}catch(G){Core.fireException(G)
}B=true
}return B
};
jQuery().ajaxError(function(H,A,B){Core.log("call after ajaxError");
Core.fireException(B);
Core.doException=true;
if(!D(H,A,B)){try{Core.setNavParam("errorHandle","true");
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/exception/exception.jsf",{errorHandle:"true"},"#mainContent",true,false);
Core._hideBlockUI()
}catch(G){Core.fireException(G)
}}C(H,A,B)
});
jQuery().ajaxComplete(function(H,A){Core.log("call after ajaxComplete");
if(Core.doException==null||!Core.doException){if(A.responseText.indexOf("<error><message>")>-1){var G=Core.getValueOfXml(A.responseXML,"message");
var B=Core.getStatus(A.responseXML);
if(!B){Core.handleError(H,A,G)
}}}if(!C(H,A)){}})
},handleError:function(E,G,H){E.stopImmediatePropagation();
if(Core.doException!==true){Core.doException=true;
Core.log(E);
var F=null;
if(H!=null){F=H
}else{jQuery.ajaxSettings.async=false;
$.post("/"+Core.applicationContext+"/ajax/exceptionAjaxController/getExceptionName.jsf",function(A){F=Core.getResult(A)
});
jQuery.ajaxSettings.async=true
}if(F!=null){Core._hideBlockUI(true);
setTimeout(function(){$.jGrowl(F,{header:"Important",theme:"jGrowlError",sticky:true})
},300);
Core.doException=false
}}},setConfig:function(C,D){Core.log("Enregistrement dans la config : "+C+"="+D);
this.config[C]=D
},getConfig:function(B){return this.config[B]
},setNavParam:function(C,D){Core.log("Add data navigation : "+C+"="+D);
this.navParam[C]=D
},getNavParam:function(B){return this.navParam[B]
},getNavParams:function(){var B=[];
for(x in this.navParam){B.push(x)
}return B
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
},_showBlockUI:function(B){_opts=$.extend({delay:"600",onAfterShowBlockUI:function(){}},B);
if(this.nbBlockUi==0){this.isInBlockUiMode=true;
$.blockUI({message:"<h1>"+Core.wait+"</h1>",css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:0.5,color:"#fff"}})
}else{_opts=$.extend(_opts,{delay:"0"})
}Core.log("---> Core._showBlockUI() : "+this.nbBlockUi);
if(this.nbBlockUi>0){this.nbBlockUi++;
_opts.onAfterShowBlockUI.call()
}else{this.nbBlockUi++;
setTimeout(_opts.onAfterShowBlockUI,_opts.delay)
}},_hideBlockUI:function(D){var C=false;
if(D!=null){C=D
}if(this.nbBlockUi>1&&!C){}else{this.isInBlockUiMode=false;
$.unblockUI();
this.nbBlockUi=0
}if(this.nbBlockUi>0){this.nbBlockUi--
}Core.log("---> Core._hideBlockUI(): "+this.nbBlockUi)
},pullAjaxContent:function(T,S,L,N,K){var M=L;
var R=S;
var Q=T;
var O=N;
var P=this._executePluginFunction("ProfilePlugin",{theFunction:"canAccessToScreen",url:Q,param:R});
if(!P){this.goToIndexPage()
}else{_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.closeAllValidatePromptsOpen();
if(K==undefined){K=true
}if(!K){Core.log("Call direct overload ajax panel on url : "+T);
Core._loadContentFromURL(Q,R,M,O)
}else{if(!jQuery.isFunction(Core._optionGA.onConditionnal)&&!jQuery.isFunction(Core._optionGA.onFire)){Core.log("Call direct ajax panel on url : "+T);
Core._loadContentFromURL(Q,R,M,O)
}else{Core.log("Call ajax panel on url : "+T);
Core.interruptedAction={url:Q};
Core.addAction($(M),Core.PULLCONTENT,function(){Core._loadContentFromURL(Q,R,M,O)
},true);
$(M).trigger(Core.PULLCONTENT)
}}}};
if(N){Core._showBlockUI(_displayBlockUIOption)
}else{_displayBlockUIOption.onAfterShowBlockUI.call()
}}},_loadContentFromURL:function(E,F,G,H){_divTargeted=G;
_urlParameter=F;
_displayBlockUI=H;
Core.removeBindingBySelector(G,Core.PULLCONTENT);
jQuery.ajaxSettings.async=false;
$.post(E,_urlParameter,function(A){$(_divTargeted).empty();
$(_divTargeted).append(A);
setTimeout(function(){welcome.resizeAll()
},300);
welcome.fireButtonBar();
if(_displayBlockUI){Core._hideBlockUI()
}});
jQuery.ajaxSettings.async=true;
$(_divTargeted).attr("url",E)
},addScreen:function(C){Core.log("Add screen to body");
try{if(!Profile.canDisplayNavigationArea()){welcome.hide("west")
}}catch(D){Core.log("Probl�me de profil dans la gestion de la zone de naviguation.")
}finally{C.fire();
$.each($("input[name*=ONLINE_HELP]"),function(){Core.addAction($(this),Core.KEYDOWN,function(A){if(A.which==13){$("iframe").attr("src",Lang.getString($(A.target).attr("name")));
$(".containerPlus").mb_open().css("visibility","visible");
return false
}},false);
Core.addAction($(this),Core.CLICK,function(A){$("iframe").attr("src",Lang.getString($(A.target).attr("name")));
$(".containerPlus").mb_open().css("visibility","visible");
return false
},false)
});
$.each($(".cbutton"),function(){$(this).unbind(Core.KEYDOWN);
$(this).bind(Core.KEYDOWN,function(A){if(A.which==13){$(this).children("a").click();
return false
}A.stopImmediatePropagation();
A.preventDefault();
return false
})
})
}},goToIndexPage:function(){Core._hideBlockUI();
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{},"#mainContent",true,false)
},removeBindingBySelector:function(C,D){jQuery.each(Core.binding,function(A,B){if(B!=undefined&&B.el.selector==C&&B.declancheur==D){var F=Core.binding.slice(A+1||Core.binding.length);
Core.binding.length=A<0?Core.binding.length+A:A;
Core.binding.push.apply(Core.binding,F)
}})
},addBindingAction:function(B){itemToRemove=[];
jQuery.each(this.binding,function(D,A){if(A!=undefined&&A.el.selector==B.el.selector){itemToRemove.push(D)
}else{if(A=undefined){itemToRemove.push(D)
}}});
itemToRemove=itemToRemove.sort().reverse();
jQuery.each(itemToRemove,function(A,E){var F=Core.binding.slice(A+1||Core.binding.length);
Core.binding.length=A<0?Core.binding.length+A:A;
Core.binding.push.apply(Core.binding,F)
});
this.binding.push.apply(Core.binding,[B])
},addAction:function(G,I,F,H){try{Core.log("Add action to element "+G.get(0).tagName+"."+G.get(0).id+" on "+I)
}catch(J){Core.log("Add action to element "+G.tagName+"."+G.id+" on "+I)
}G.unbind(I,F);
G.bind(I,F);
if(H==undefined){H=true
}Core.log("overload action : "+H);
bindJQ={el:G,declancheur:I,action:F,overload:H};
Core.addBindingAction(bindJQ);
if(jQuery.isFunction(this._optionGA.onConditionnal)||jQuery.isFunction(this._optionGA.onFire)){this.addActionGlobal()
}},_optionGA:{onConditionnal:null,onTrue:null,onFalse:null,onFire:null,onException:null},addActionGlobal:function(D){Core.log("Add global action on fire.");
this._optionGA=$.extend(this._optionGA,D||{});
var C=this._optionGA;
jQuery.each(this.binding,function(B,A){if(A!=undefined&&A.overload){A.el.unbind(A.declancheur);
if(jQuery.isFunction(C.onConditionnal)){A.el.bind(A.declancheur,function(G){Core.log("fire global action on element : "+A.el.selector+" and on declancheur "+A.declancheur);
try{Core.interruptedAction=$.extend(Core.interruptedAction,{fire:true,action:A,event:G});
var H=C.onConditionnal.call(A,Core.interruptedAction,A);
Core.log("---> result of condition : "+H);
if(H){Core.log("Call callback on true condition");
C.onTrue(Core.interruptedAction)
}else{Core.log("Call callback on false condition");
C.onFalse(Core.interruptedAction)
}}catch(G){Core.fireException(G);
C.onException(Core.interruptedAction)
}if(Core.PULLCONTENT==A.declancheur){Core.log("remove binding action on div to prevent multiple call of pluContent ");
Core.removeBindingBySelector(A.el,Core.PULLCONTENT)
}})
}else{A.el.bind(A.declancheur,C.onFire)
}}})
},raisedInterruptedAction:function(){var B=false;
Core.log(Core.interruptedAction);
if(Core.interruptedAction!=null&&jQuery.isFunction(Core.interruptedAction.action.action)&&Core.interruptedAction.fire){Core.log(" raisedInterruptedAction ");
Core.interruptedAction.action.action(Core.interruptedAction.event);
Core.interruptedAction=null;
B=true
}return B
},delActionGlobal:function(){if(jQuery.isFunction(this._optionGA.onConditionnal)||jQuery.isFunction(this._optionGA.onFire)){Core.log("Remove global action information");
this._optionGA={onConditionnal:null,onTrue:null,onFalse:null,onFire:null,onException:null};
Core.interruptedAction=null;
jQuery.each(this.binding,function(F,E){try{E.el.bind(E.declancheur,E.action)
}catch(D){Core.log("Action is undefined.")
}})
}},fireException:function(F){var D="\r\n";
var E="Exception: ";
if(F.message){E+=F.message
}else{if(F.description){E+=F.description
}}if(F.lineNumber){E+=" on line number "+F.lineNumber
}if(F.fileName){E+=" in file "+F.fileName
}if(F.stack){E+=D+"Stack trace:"+D+F.stack
}Core.log(E)
},getStatus:function(C){try{return Core.getValueOfXml(C,"status")=="true"
}catch(D){return false
}},getIdOfComponent:function(B){return Core.getValueOfXml(B,"idOfComponent")
},getResult:function(B){return Core.getValueOfXml(B,"result")
},getValueOfXml:function(D,C){return $(D).find(C).text()
},log:function(D){if(Debug.isInDebug()){if(jQuery.browser.msie){if(("console" in window)){console.log(D)
}else{var E=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];
window.console={};
for(var F=0;
F<E.length;
++F){window.console[E[F]]=function(){}
}}}else{if(("console" in window)&&("firebug" in console)){console.log(D)
}}}}};
Const={ABORT:"abort",BLUR:"blur",CHANGE:"change",CLICK:"click",DBLCLICK:"dbclick",DRAGDROP:"dragdrop",ERROR:"erro",FOCUS:"focus",KEYDOWN:"keydown",KEYPRESS:"keypress",KEYUP:"keyup",LOAD:"load",MOUSEDOWN:"mousedown",MOUSEMOVE:"mousemove",MOUSEOUT:"mouseout",MOUSEOVER:"mouseover",MOUSEUP:"mouseup",MOVE:"move",RESET:"reset",RESIZE:"resize",SELECT:"select",SUBMIT:"submit",UNLOAD:"unload",BEFOREUNLOAD:"beforeunload",PULLCONTENT:"pullcontent"};
$.extend(Core,Const);
(function(B){B.fn.__focus__=B.fn.focus;
B.fn.__hide__=B.fn.hide;
B.__post__=B.post;
B.__currCss__=B.curCSS;
B.fn.focus=function(D){try{return B.fn.__focus__.apply(this,arguments)
}catch(A){}};
B.fn.hide=function(A,E){try{return B.fn.__hide__.apply(this,arguments)
}catch(F){}};
B.post=function(H,A,I,G){try{return B.__post__.apply(this,arguments)
}catch(J){Core.fireException(J)
}};
B.curCSS=function(A,F,H){try{return B.__currCss__.apply(this,arguments)
}catch(G){}};
return B
})(jQuery);
Core.initAjaxTrigger();