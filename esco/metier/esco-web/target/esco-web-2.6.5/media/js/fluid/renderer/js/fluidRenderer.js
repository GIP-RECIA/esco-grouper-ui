fluid_1_1=fluid_1_1||{};
(function(e,AM){function AA(AU){return"as child of "+(AU.parent.fullID?"component with full ID "+AU.parent.fullID:"root")
}function c(AZ){var AV="";
var AW=AZ;
if(AZ.children===undefined){AV=AZ.ID+(AZ.localID!==undefined?AZ.localID:"");
AW=AZ.parent
}while(AW.parent){var Aa=AW.parent;
if(AW.fullID!==undefined){AV=AW.fullID+AV;
return AV
}if(AW.noID===undefined){var AU=AW.ID;
if(AU===undefined){AM.fail("Error in component tree - component found with no ID "+AA(Aa)+": please check structure")
}var AY=AU.indexOf(":");
var AX=AY===-1?AU:AU.substring(0,AY);
AV=AX+":"+(AW.localID===undefined?"":AW.localID)+":"+AV
}AW=Aa
}return AV
}function g(AU){return AM.isPrimitive(AU)||AU instanceof Array&&(AU.length===0||typeof (AU[0])==="string")
}function F(AW,AV){if(g(AW)){return{componentType:"UIBound",value:AW,ID:AV}
}else{var AU=I(AW);
if(AU.ID){return{ID:AV,componentType:"UIContainer",children:[AU]}
}else{AU.ID=AV;
return AU
}}}function AK(AW){if(!(AW instanceof Array)){var AX=[];
for(var AV in AW){var AY=AW[AV];
if(AY instanceof Array){for(var AU=0;
AU<AY.length;
++AU){var AZ=F(AY[AU],AV);
AX[AX.length]=AZ
}}else{AX[AX.length]=F(AY,AV)
}}return AX
}else{return AW
}}function AF(AU,AV){if(AU.value===undefined&&AU.valuebinding!==undefined){if(!AV){AM.fail("Cannot perform value fixup for valuebinding "+AU.valuebinding+" since no model was supplied to rendering")
}AU.value=AM.model.getBeanValue(AV,AU.valuebinding)
}}function H(AV,AW,AU){if(AV[AW]!==undefined){if(g(AV[AW])){AV[AW]={value:AV[AW]}
}}else{AV[AW]={value:null}
}AF(AV[AW],AU)
}var m={children:"UIContainer",value:"UIBound",valuebinding:"UIBound",messagekey:"UIMessage",markup:"UIVerbatim",selection:"UISelect",target:"UILink",choiceindex:"UISelectChoice",functionname:"UIInitBlock"};
function I(AX,AW){if(AX){for(var AY in m){if(AX[AY]!==undefined){AX.componentType=m[AY];
break
}}if(AX.componentType===undefined&&AX.ID!==undefined){AX.componentType="UIBound"
}}if(!AX||AX.componentType===undefined){var AV=AX.decorators;
if(AV){delete AX.decorators
}AX={componentType:"UIContainer",children:AX};
AX.decorators=AV
}var AU=AX.componentType;
if(AU==="UIContainer"){AX.children=AK(AX.children)
}else{if(AU==="UISelect"){H(AX,"selection",AW);
H(AX,"optionlist",AW);
H(AX,"optionnames",AW)
}else{if(AU==="UILink"){H(AX,"target",AW);
H(AX,"linktext",AW)
}}}return AX
}function y(AV,AU){if(AV.submittingname===undefined&&AV.willinput!==false){AV.submittingname=AU?AU:AV.fullID
}return AV.submittingname
}function AN(Ab,AY){if(Ab.componentType===undefined){Ab=I(Ab,AY)
}if(Ab.componentType!=="UIContainer"&&!Ab.parent){Ab={children:[Ab]}
}if(Ab.children){Ab.childmap={};
for(var AX=0;
AX<Ab.children.length;
++AX){var Ad=Ab.children[AX];
if(Ad.componentType===undefined){Ad=I(Ad,AY);
Ab.children[AX]=Ad
}Ad.parent=Ab;
if(Ad.ID===undefined){AM.fail("Error in component tree: component found with no ID "+AA(Ad))
}Ab.childmap[Ad.ID]=Ad;
var AV=Ad.ID.indexOf(":");
if(AV===-1){}else{var AZ=Ad.ID.substring(0,AV);
var Ac=Ab.childmap[AZ];
if(!Ac){Ac=[];
Ab.childmap[AZ]=Ac
}if(Ad.localID===undefined&&Ac.length!==0){Ad.localID=Ac.length
}Ac[Ac.length]=Ad
}Ad.fullID=c(Ad);
var AU=Ad.componentType;
if(AU=="UISelect"){Ad.selection.fullID=Ad.fullID+"-selection"
}else{if(AU=="UIInitBlock"){var Aa=Ad.functionname+"(";
for(var AW=0;
AW<Ad.arguments.length;
++AW){if(Ad.arguments[AW] instanceof AM.ComponentReference){Ad.arguments[AW]=Ad.parent.fullID+Ad.arguments[AW].reference
}Aa+='"'+Ad.arguments[AW]+'"';
if(AW<Ad.arguments.length-1){Aa+=", "
}}Ad.markup=Aa+")\n";
Ad.componentType="UIVerbatim"
}else{if(AU=="UIBound"){AF(Ad,AY)
}}}AN(Ad,AY)
}}return Ab
}var AR={};
var r={};
var J={};
var b={};
var k={};
var AQ="";
var w=false;
var q={};
var O={};
var Y=[];
var i={};
function D(AV,AU,AW){return AV.resourceKey+AU.fullID+AW
}function N(AX,AU,AZ,Aa){var AV;
var AW=AZ?AZ[AX]:null;
if(AW){for(var AY=0;
AY<AW.length;
++AY){var Ab=AW[AY];
if(!AV&&Ab.rsfID==AU){AV=Ab
}if(Ab.rsfID==AX){return Ab
}}}return AV
}function AE(AX,AZ){var AY=AZ.jointID?AZ.jointID:AZ.ID;
var AW=AM.SplitID(AY);
var AU=AW.prefix+":";
var AV=N(AY,AU,AX.downmap,AZ);
if(AV){return AV
}if(AZ.children){AV=N(AY,AU,AR,AZ);
if(AV){return AV
}}return null
}function L(AU){if(!b[AU.href]){AM.aggregateMMap(k,AU.collectmap);
b[AU.href]=true
}}function AI(AX,AU){for(var AV=0;
AV<AX.children.length;
++AV){var AY=AX.children[AV];
if(AY.children){var Aa=AE(AU,AY);
if(Aa){r[AY.fullID]=Aa;
var Ac=Aa.attributemap.id;
if(Ac!==undefined){J[D(AU.parent,AX,Ac)]=AY.fullID
}L(Aa.parent);
AI(AY,Aa)
}}}if(AU.downmap){for(var Ac in AU.downmap){var AZ=AU.downmap[Ac];
for(var AV=0;
AV<AZ.length;
++AV){var AW=AZ[AV];
var Ab=AW.attributemap.id;
if(Ab!==undefined&&AW.rsfID!==undefined){var Aa=f(AX,AW.rsfID);
if(Aa!==null){var Ad=Aa.fullID;
if(Aa.componentType==="UISelect"){Ad=Ad+"-selection"
}J[D(AU.parent,AX,Ab)]=Ad
}}}}}}function AT(AW,AV,AU){r={};
J={};
b={};
k={};
AR=AW;
r[AV.fullID]=AU;
AI(AV,AU)
}function S(AW,AU){if(AU.elide){return 
}var AV={};
e.extend(true,AV,AU.attributemap);
AS(AV,AW);
x(AW,AV);
AQ+="<"+AU.tagname+" ";
AQ+=AM.dumpAttributes(AV);
AQ+=">"
}function W(AV,AX,AU){for(;
AX<AU;
++AX){var AW=AV[AX].text;
if(AW){AQ+=AV[AX].text
}}}function M(AY,AV,AU,Aa,AW){var AX=AV;
while(true){if(AV===AY.length){break
}var AZ=AY[AV];
if(AZ.nestingdepth<AU){break
}if(AZ.rsfID!==undefined){if(!AW){break
}if(AW&&AZ.nestingdepth>AU+(Aa?0:1)){AM.log("Error in component tree - leaf component found to contain further components - at "+AZ.toString())
}else{break
}}++AV
}if(!Aa&&(AV==AY.length||!AY[AV].rsfID)){--AV
}W(AY,AX,AV);
return AV
}var AC={};
function o(){if(!AC.iselide){AQ+="<"+AC.uselump.tagname
}}function h(){if(!AC.iselide){AQ+="</"+AC.uselump.tagname+">"
}}function j(){W(AC.uselump.parent.lumps,AC.uselump.lumpindex+1,AC.close.lumpindex+(AC.iselide?0:1))
}function A(){if(!AC.iselide){AQ+=AM.dumpAttributes(AC.attrcopy)
}P()
}function AG(){if(AC.iselide){A()
}else{AQ+=AM.dumpAttributes(AC.attrcopy);
AQ+=">";
AC.nextpos=AC.endopen.lumpindex
}}function P(){if(AC.endopen.lumpindex===AC.close.lumpindex){if(!AC.iselide){AQ+="/>"
}}else{if(!AC.iselide){AQ+=">"
}W(AC.uselump.parent.lumps,AC.endopen.lumpindex,AC.close.lumpindex+(AC.iselide?0:1))
}}function Q(AU){if(G(AU)){Z(AU)
}else{A()
}}function u(AU){if(AC.iselide){Q(AC.value)
}else{if(G(AU)){Z(AU)
}else{AG()
}}}function Z(AU){AQ+=AM.dumpAttributes(AC.attrcopy);
if(!AC.iselide){AQ+=">"
}AQ+=AM.XMLEncode(AU.toString());
h()
}function G(AU){return AU!==null&&AU!==undefined&&!p(AU)
}function p(AU){return false
}function AL(AV,AU){return AU
}function B(AW){AQ+='<input type="hidden" ';
var AV=AW.virtual;
var AU={};
AU[AV?"id":"name"]=AW.name;
AU.value=AW.value;
AQ+=AM.dumpAttributes(AU);
AQ+=" />\n"
}function E(AU,AV){var AZ=AC.uselump.tagname;
var AX=O.applier;
function AY(){AM.applyChange(AM.byId(AV),undefined,AX)
}if(O.autoBind&&/input|select|textarea/.test(AZ)&&!i[AV]){var AW=[{jQuery:["change",AY]}];
if(e.browser.msie&&AZ==="input"&&/radio|checkbox/.test(AC.attrcopy.type)){AW.push({jQuery:["click",AY]})
}t(AU,AW,AC.attrcopy,AV)
}}function s(AU,AW){if(AU){var AV=AW?AW:AU;
if(q&&AV.submittingname&&AV.valuebinding){q[AV.submittingname]={name:AV.submittingname,EL:AV.valuebinding,oldvalue:AV.value};
E(AU,AU.fullID)
}if(AU.fossilizedbinding){B(AU.fossilizedbinding)
}if(AU.fossilizedshaper){B(AU.fossilizedshaper)
}}}function K(AU){if(!i[AU.selection.fullID]){i[AU.selection.fullID]=true;
s(AU.selection);
s(AU.optionlist);
s(AU.optionnames)
}}AM.NULL_STRING="\u25a9null\u25a9";
var AJ={a:"href",link:"href",img:"src",frame:"src",script:"src",style:"src",input:"src",embed:"src",form:"action",applet:"codebase",object:"codebase"};
function AP(AU,AW){var AV=AU.selection;
return AV.value&&typeof (AV.value)!=="string"&&typeof (AV.value.length)==="number"?e.inArray(AW,AV.value,AW)!==-1:AV.value===AW
}function C(AU,AV){AU=AU.parent;
if(AV.indexOf("..::")===0){AV=AV.substring(4);
AU=AU.parent
}return AU.childmap[AV]
}function AO(AV){var AX=[];
if(AV.type){AX[0]=AV
}else{for(var AW in AV){if(AW==="$"){AW="jQuery"
}var AY=AV[AW];
var AU={type:AW};
if(AW==="jQuery"){AU.func=AY[0];
AU.args=AY.slice(1)
}else{if(AW==="addClass"||AW==="removeClass"){AU.classes=AY
}else{if(AW==="attrs"){AU.attributes=AY
}else{if(AW==="identify"){AU.key=AY
}}}}AX[AX.length]=AU
}}return AX
}function t(AW,Aa,Ad,AY){O.idMap=O.idMap||{};
for(var AV=0;
AV<Aa.length;
++AV){var AU=Aa[AV];
var AX=AU.type;
if(!AX){var AZ=AO(AU);
t(AW,AZ,Ad,AY);
continue
}if(AX==="$"){AX=AU.type="jQuery"
}if(AX==="jQuery"||AX==="event"||AX==="fluid"){var Ac=AS(Ad,AW,true,AY);
AU.id=Ac;
Y[Y.length]=AU
}else{if(AX==="attrs"){e.extend(true,Ad,AU.attributes)
}else{if(AX==="addClass"||AX==="removeClass"){var Ab={nodeType:1,className:Ad["class"]||""};
e(Ab)[AX](AU.classes);
Ad["class"]=Ab.className
}else{if(AX==="identify"){var Ac=AS(Ad,AW,true,AY);
O.idMap[AU.key]=Ac
}}}}}}function x(AU,AV){if(!AU.decorators){return 
}if(AU.decorators.length===undefined){AU.decorators=AO(AU.decorators)
}t(AU,AU.decorators,AV)
}function U(Aj){var Ab=AC.attrcopy;
var AW=AC.uselump.parent.lumps;
var Ad=AC.uselump.lumpindex;
var Ah=Aj.componentType;
var Am=AC.uselump.tagname;
x(Aj,Ab);
if(Ah==="UIMessage"){Ah="UIBound";
if(!O.messageLocator){Aj.value="[No messageLocator is configured in options - please consult documentation on options.messageSource]"
}else{Aj.value=O.messageLocator(Aj.messagekey,Aj.args)
}}function AY(Ao,Ap){AM.fail("Error in component tree - UISelectChoice with id "+Ao.fullID+Ap)
}if(Ah==="UIBound"||Ah==="UISelectChoice"){var Ae;
if(Aj.choiceindex!==undefined){if(Aj.parentFullID){Ae=getAbsoluteComponent(view,Aj.parentFullID);
if(!Ae){AY(Aj," has parentFullID of "+Aj.parentFullID+" which cannot be resolved")
}}else{if(Aj.parentRelativeID!==undefined){Ae=C(Aj,Aj.parentRelativeID);
if(!Ae){AY(Aj," has parentRelativeID of "+Aj.parentRelativeID+" which cannot be resolved")
}}else{AY(Aj," does not have either parentFullID or parentRelativeID set")
}}y(Ae.selection);
K(Ae)
}var Aa=Ae?Ae.selection.submittingname:Aj.submittingname;
if(Am==="input"||Am==="textarea"){if(!Ae){Aa=y(Aj)
}if(Aa!==undefined){Ab.name=Aa
}}s(Aj,Ae?Ae.selection:null);
if(typeof (Aj.value)==="boolean"||Ab.type==="radio"||Ab.type==="checkbox"){var Ac;
var Al=Aj.value;
if(Aj.choiceindex!==undefined){if(!Ae.optionlist.value){AM.fail("Error in component tree - selection control with full ID "+Ae.fullID+" has no values")
}Ac=Ae.optionlist.value[Aj.choiceindex];
Al=AP(Ae,Ac)
}if(G(Al)){if(Al){Ab.checked="checked"
}else{delete Ab.checked
}}Ab.value=Ac?Ac:"true";
Q(null)
}else{if(Aj.value instanceof Array){j()
}else{var Ai=Ae?Ae[Am==="textarea"||Am==="input"?"optionlist":"optionnames"].value[Aj.choiceindex]:Aj.value;
if(Am==="textarea"){if(p(Ai)&&Aj.willinput){Ai=""
}Q(Ai)
}else{if(Am==="input"){if(Aj.willinput||G(Ai)){Ab.value=Ai
}Q(null)
}else{delete Ab.name;
u(Ai)
}}}}}else{if(Ah==="UISelect"){E(Aj,Aj.selection.fullID);
var AV=Am==="select";
var AZ=false;
if(Aj.selection.value instanceof Array){AZ=true;
if(AV){Ab.multiple="multiple"
}}y(Aj.selection,Ab.id);
if(AV){if(Aj.selection.willinput!==false){Ab.name=Aj.selection.submittingname
}}AQ+=AM.dumpAttributes(Ab);
if(AV){AQ+=">";
var AX=Aj.optionlist.value;
var Ag=Aj.optionnames===null||Aj.optionnames===undefined||!Aj.optionnames.value?AX:Aj.optionnames.value;
if(!Ag||!Ag.length){AM.fail("Error in component tree - UISelect component with fullID "+Aj.fullID+" does not have optionnames set")
}for(var Ak=0;
Ak<Ag.length;
++Ak){AQ+='<option value="';
var Ai=AX[Ak];
if(Ai===null){Ai=AM.NULL_STRING
}AQ+=AM.XMLEncode(Ai);
if(AP(Aj,Ai)){AQ+='" selected="selected'
}AQ+='">';
AQ+=AM.XMLEncode(Ag[Ak]);
AQ+="</option>\n"
}h()
}else{P()
}K(Aj)
}else{if(Ah==="UILink"){var Af=AJ[Am];
if(Af){var AU=Aj.target.value;
if(!G(AU)){AU=Ab[attname]
}else{AU=AL(AC.uselump.parent,AU)
}Ab[Af]=AU
}var Ai=Aj.linktext.value;
if(!G(Ai)){AG()
}else{Q(Ai)
}}else{if(Aj.markup!==undefined){var An=Aj.markup;
if(An===null){AQ+=AM.dumpAttributes(Ab);
AQ+=">";
j()
}else{if(!AC.iselide){AQ+=AM.dumpAttributes(Ab);
AQ+=">"
}AQ+=An;
h()
}}else{}}}}}function AS(AX,AW,AV,AZ){if(!AV){delete AX["rsf:id"]
}if(AZ!==undefined){AX.id=AZ
}else{if(AX.id||AV){AX.id=AW.fullID
}}var AY=1;
var AU=AX.id;
while(O.document.getElementById(AX.id)){AX.id=AU+"-"+(AY++)
}return AX.id
}function R(AU){var AY;
var AW=AC.attrcopy["for"];
if(AW!==undefined){AY="for"
}else{AW=AC.attrcopy.headers;
if(AW!==undefined){AY="headers"
}}if(!AY){return 
}var AX=AC.uselump.tagname;
if(AY==="for"&&AX!=="label"){return 
}if(AY==="headers"&&AX!=="td"&&AX!=="th"){return 
}var AV=J[D(AC.uselump.parent,AU,AW)];
if(AV!==undefined){AC.attrcopy[AY]=AV
}}function v(AU){AQ+=("<!-- "+AM.XMLEncode(AU)+"-->")
}function AD(AU){AQ+='<span style="background-color:#FF466B;color:white;padding:1px;">';
AQ+=AU;
AQ+="</span><br/>"
}function V(AU){var AV=AU.fullID;
return !AV?"component tree root":"full path "+AV
}function d(AZ,Ai,Ae){var Ag=Ae.lumpindex;
var AW=Ae.parent.lumps;
var Af=-1;
var Ah=AW[Ag+1];
var AY=Ae.close_tag;
Af=AY.lumpindex+1;
var Ad=Ae.downmap?Ae.downmap["payload-component"]:null;
var AV=Ad?Ad[0]:null;
var AU=Ae.rsfID.charCodeAt(0)===126;
var Ac=Ah;
var AX=AY;
var Ab=Ae;
var Aa={};
e.extend(true,Aa,(AV===null?Ae:AV).attributemap);
AC.attrcopy=Aa;
AC.uselump=Ab;
AC.endopen=Ac;
AC.close=AX;
AC.nextpos=Af;
AC.iselide=AU;
R(AZ);
if(Ai===null){if(Ae.rsfID.indexOf("scr=")===(AU?1:0)){var Aj=Ae.rsfID.substring(4+(AU?1:0));
if(Aj==="ignore"){Af=AC.close.lumpindex+1
}else{o();
AG();
Af=AC.endopen.lumpindex
}}}else{if(AV){AC.endopen=AW[AV.lumpindex+1];
AC.close=AV.close_tag;
AC.uselump=AV;
W(AW,Ag,AV.lumpindex);
Ag=AV.lumpindex
}AS(Aa,Ai);
o();
U(Ai);
if(AV!==null){if(AC.nextpos===Af){W(AW,AC.close.lumpindex+1,AY.lumpindex+1)
}}Af=AC.nextpos
}return Af
}function n(AX,AU){var AW=AU.parent;
var AV=AW.lumps[AU.lumpindex+1];
if(AX.children!==undefined){S(AX,AU)
}else{d(AX.parent,AX,AU)
}z(AX,AU,AV)
}function f(AX,AY,AW){if(AY.indexOf("msg=")===0){var AU=AY.substring(4);
return{componentType:"UIMessage",messagekey:AU}
}while(AX){var AV=AX.childmap[AY];
if(AV){return AV
}AX=AX.parent
}return null
}function AH(AV,AW){var AU;
while(AV){AU=AV.childmap[AW];
if(AU){break
}AV=AV.parent
}return AU
}function X(AW,AX){var AV=AM.SplitID(AX.ID);
var AU=AW.downmap[AX.ID];
if(AU===null){AU=AW.downmap[AV.prefix+":"]
}return AU===null?null:AU[0]
}function z(Ac,AW,Ai){var Al=Ai.lumpindex;
var Ao=AW.nestingdepth;
var Ad=AW.parent;
if(w){var AU={}
}while(true){Al=M(Ad.lumps,Al,Ao,!AW.elide,false);
if(Al===Ad.lumps.length){break
}var Ag=Ad.lumps[Al];
var Ah=Ag.rsfID;
if(Ag.nestingdepth<Ao||Ah===undefined){break
}if(Ah.charCodeAt(0)===126){Ah=Ah.substring(1)
}if(Ah.indexOf(":")!==-1){var Aj=AM.getPrefix(Ah);
var AX=AH(Ac,Aj);
var AZ=Ag.uplump.finallump[Aj];
var Aa=AZ.close_tag;
if(AX){for(var Ak=0;
Ak<AX.length;
++Ak){var AY=AX[Ak];
if(AY.children){var Am=r[AY.fullID];
if(Am){if(w){v("Branching for "+AY.fullID+" from "+AM.debugLump(Ag)+" to "+AM.debugLump(Am))
}n(AY,Am);
if(w){v("Branch returned for "+AY.fullID+AM.debugLump(Ag)+" to "+AM.debugLump(Am))
}}else{if(w){AD("No matching template branch found for branch container with full ID "+AY.fullID+" rendering from parent template branch "+AM.debugLump(Ai))
}}}else{var Am=X(AW,AY);
if(!Am){if(w){AD("Repetitive leaf with full ID "+AY.fullID+" could not be rendered from parent template branch "+AM.debugLump(Ai))
}continue
}var An=d(Ac,AY,Am);
var Af=An<Ad.lumps.lengtn&&Ad.lumps[An].nestingdepth>=Am.nestingdepth;
var Ab=AY.children?AY:Ac;
if(Af){z(Ab,Am,Ad.lumps[An]);
An=Am.close_tag.lumpindex+1
}if(Ak!==AX.length-1){if(An<Aa.lumpindex){M(Ad.lumps,An,Am.nestingdepth-1,false,false)
}}else{M(Ad.lumps,An,Am.nestingdepth,true,false)
}}}}else{if(w){AD("No branch container with prefix "+Aj+": found in container "+V(Ac)+" rendering at template position "+AM.debugLump(Ai)+", skipping")
}}Al=Aa.lumpindex+1;
if(w){v("Stack returned from branch for ID "+Ah+" to "+AM.debugLump(Ai)+": skipping from "+AM.debugLump(Ag)+" to "+AM.debugLump(Aa))
}}else{var Ae;
if(Ah){if(w){AU[Ah]=true
}Ae=f(Ac,Ah,Ag)
}if(Ae&&Ae.children!==undefined){n(Ae);
Al=Ag.close_tag.lumpindex+1
}else{Al=d(Ac,Ae,Ag)
}}if(Al===Ad.lumps.length){break
}}if(w){var AX=Ac.children;
for(var AV=0;
AV<AX.length;
++AV){var AY=AX[AV];
if(!(AY.ID.indexOf(":")!==-1)&&!AU[AY.ID]){AD("Leaf child component "+AY.componentType+" with full ID "+AY.fullID+" could not be found within template "+AM.debugLump(Ai))
}}}}function l(AU){W(AU.parent.lumps,AU.lumpindex,AU.close_tag.lumpindex+1)
}function AB(){for(var AW in k){var AU=k[AW];
for(var AV=0;
AV<AU.length;
++AV){l(AU[AV])
}}}function T(){for(var AX=0;
AX<Y.length;
++AX){var AU=Y[AX];
var AZ=AM.byId(AU.id);
if(!AZ){AM.fail("Error during rendering - component with id "+AU.id+" which has a queued decorator was not found in the output markup")
}if(AU.type==="jQuery"){var AW=e(AZ);
AW[AU.func].apply(AW,e.makeArray(AU.args))
}else{if(AU.type==="fluid"){var AV=AU.args;
if(!AV){if(!AU.container){AU.container=AZ
}AV=[AU.container,AU.options]
}var AY=AM.invokeGlobalFunction(AU.func,AV,AM);
AU.that=AY
}else{if(AU.type==="event"){AZ[AU.event]=AU.handler
}}}}}AM.ComponentReference=function(AU){this.reference=AU
};
AM.explode=function(AX,AU){var AW=[];
for(var AV in AX){var AY=AU===undefined?AV:AU+"."+AV;
AW[AW.length]={ID:AV,value:AX[AV],valuebinding:AY}
}return AW
};
AM.explodeSelectionToInputs=function(AU,AV){return AM.transform(AU,function(AX,AW){return{ID:AV.rowID,children:[{ID:AV.inputID,parentRelativeID:"..::"+AV.selectID,choiceindex:AW},{ID:AV.labelID,parentRelativeID:"..::"+AV.selectID,choiceindex:AW}]}
})
};
AM.resolveMessageSource=function(AU){if(AU.type==="data"){if(AU.url===undefined){return AM.messageLocator(AU.messages)
}else{}}};
AM.makeBranches=function(){var AX;
var AV;
for(var AU=0;
AU<arguments.length;
++AU){var AW=arguments[AU];
var AY;
if(typeof (AW)==="string"){AY={ID:AW}
}else{if(AW instanceof Array){AY={ID:AW[0],jointID:AW[1]}
}else{e.extend(true,AV,AW);
AY=AV
}}if(AV&&AY!==AV){if(!AV.children){AV.children=[]
}AV.children[AV.children.length]=AY
}AV=AY;
if(!AX){AX=AY
}}return AX
};
AM.renderTemplates=function(AX,AU,AV,AW){AV=AV||{};
AU=AU||{};
w=AV.debugMode;
if(!AV.messageLocator&&AV.messageSource){AV.messageLocator=AM.resolveMessageSource(AV.messageSource)
}AV.document=AV.document||document;
q=AW;
Y=[];
AU=AN(AU,AV.model);
var AY=AX[0];
AT(AX.globalmap,AU,AY.rootlump);
AQ="";
i={};
O=AV;
AB();
z(AU,AY.rootlump,AY.lumps[AY.firstdocumentindex]);
return AQ
};
AM.reRender=function(AZ,AV,Ab,Aa){Aa=Aa||{};
AV=AM.unwrap(AV);
var AX=AM.getLastFocusedElement?AM.getLastFocusedElement():null;
var Ac;
if(AX&&AM.dom.isContainer(AV,AX)){Ac=AX.id
}if(e.browser.msie){e(AV).empty()
}else{AV.innerHTML=""
}var AY={};
var AU=AM.renderTemplates(AZ,Ab,Aa,AY);
if(Aa.renderRaw){AU=AM.XMLEncode(AU);
AU=AU.replace(/\n/g,"<br/>")
}if(Aa.model){AM.bindFossils(AV,Aa.model,AY)
}if(e.browser.msie){e(AV).html(AU)
}else{AV.innerHTML=AU
}T();
if(Ac){var AW=AM.byId(Ac);
if(AW){e(AW).focus()
}}return AZ
};
function a(AU){var AV=AM.dom.iterateDom(AU,function(AX){return AX.nodeType===8||AX.nodeType===4?"stop":null
},true);
var AW=AV.nodeValue;
if(AW.indexOf("[CDATA[")===0){return AW.substring(6,AW.length-2)
}else{return AW
}}AM.extractTemplate=function(AV,AU){if(!AU){return AV.innerHTML
}else{return a(AV)
}};
AM.selfRender=function(AY,AU,AW){AW=AW||{};
AY=AM.unwrap(AY);
var AV={base:{resourceText:AM.extractTemplate(AY,AW.armouring),href:".",resourceKey:".",cutpoints:AW.cutpoints}};
var AX=AM.parseTemplates(AV,["base"],AW);
return AM.reRender(AX,AY,AU,AW)
}
})(jQuery,fluid_1_1);