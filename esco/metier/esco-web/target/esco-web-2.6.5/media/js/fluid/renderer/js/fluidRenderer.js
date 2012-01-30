fluid_1_1=fluid_1_1||{};
(function(A9,Ab){function An(A){return"as child of "+(A.parent.fullID?"component with full ID "+A.parent.fullID:"root")
}function BB(B){var G="";
var E=B;
if(B.children===undefined){G=B.ID+(B.localID!==undefined?B.localID:"");
E=B.parent
}while(E.parent){var F=E.parent;
if(E.fullID!==undefined){G=E.fullID+G;
return G
}if(E.noID===undefined){var A=E.ID;
if(A===undefined){Ab.fail("Error in component tree - component found with no ID "+An(F)+": please check structure")
}var C=A.indexOf(":");
var D=C===-1?A:A.substring(0,C);
G=D+":"+(E.localID===undefined?"":E.localID)+":"+G
}E=F
}return G
}function A7(A){return Ab.isPrimitive(A)||A instanceof Array&&(A.length===0||typeof (A[0])==="string")
}function BY(B,C){if(A7(B)){return{componentType:"UIBound",value:B,ID:C}
}else{var A=BV(B);
if(A.ID){return{ID:C,componentType:"UIContainer",children:[A]}
}else{A.ID=C;
return A
}}}function Ad(E){if(!(E instanceof Array)){var D=[];
for(var F in E){var C=E[F];
if(C instanceof Array){for(var A=0;
A<C.length;
++A){var B=BY(C[A],F);
D[D.length]=B
}}else{D[D.length]=BY(C,F)
}}return D
}else{return E
}}function Ai(A,B){if(A.value===undefined&&A.valuebinding!==undefined){if(!B){Ab.fail("Cannot perform value fixup for valuebinding "+A.valuebinding+" since no model was supplied to rendering")
}A.value=Ab.model.getBeanValue(B,A.valuebinding)
}}function BW(C,B,A){if(C[B]!==undefined){if(A7(C[B])){C[B]={value:C[B]}
}}else{C[B]={value:null}
}Ai(C[B],A)
}var A1={children:"UIContainer",value:"UIBound",valuebinding:"UIBound",messagekey:"UIMessage",markup:"UIVerbatim",selection:"UISelect",target:"UILink",choiceindex:"UISelectChoice",functionname:"UIInitBlock"};
function BV(C,D){if(C){for(var B in A1){if(C[B]!==undefined){C.componentType=A1[B];
break
}}if(C.componentType===undefined&&C.ID!==undefined){C.componentType="UIBound"
}}if(!C||C.componentType===undefined){var E=C.decorators;
if(E){delete C.decorators
}C={componentType:"UIContainer",children:C};
C.decorators=E
}var A=C.componentType;
if(A==="UIContainer"){C.children=Ad(C.children)
}else{if(A==="UISelect"){BW(C,"selection",D);
BW(C,"optionlist",D);
BW(C,"optionnames",D)
}else{if(A==="UILink"){BW(C,"target",D);
BW(C,"linktext",D)
}}}return C
}function Ap(B,A){if(B.submittingname===undefined&&B.willinput!==false){B.submittingname=A?A:B.fullID
}return B.submittingname
}function Aa(C,F){if(C.componentType===undefined){C=BV(C,F)
}if(C.componentType!=="UIContainer"&&!C.parent){C={children:[C]}
}if(C.children){C.childmap={};
for(var G=0;
G<C.children.length;
++G){var A=C.children[G];
if(A.componentType===undefined){A=BV(A,F);
C.children[G]=A
}A.parent=C;
if(A.ID===undefined){Ab.fail("Error in component tree: component found with no ID "+An(A))
}C.childmap[A.ID]=A;
var I=A.ID.indexOf(":");
if(I===-1){}else{var E=A.ID.substring(0,I);
var B=C.childmap[E];
if(!B){B=[];
C.childmap[E]=B
}if(A.localID===undefined&&B.length!==0){A.localID=B.length
}B[B.length]=A
}A.fullID=BB(A);
var J=A.componentType;
if(J=="UISelect"){A.selection.fullID=A.fullID+"-selection"
}else{if(J=="UIInitBlock"){var D=A.functionname+"(";
for(var H=0;
H<A.arguments.length;
++H){if(A.arguments[H] instanceof Ab.ComponentReference){A.arguments[H]=A.parent.fullID+A.arguments[H].reference
}D+='"'+A.arguments[H]+'"';
if(H<A.arguments.length-1){D+=", "
}}A.markup=D+")\n";
A.componentType="UIVerbatim"
}else{if(J=="UIBound"){Ai(A,F)
}}}Aa(A,F)
}}return C
}var AW={};
var Aw={};
var BU={};
var BC={};
var A3={};
var AX="";
var Ar=false;
var Ax={};
var BP={};
var BF=[];
var A5={};
function Ba(C,A,B){return C.resourceKey+A.fullID+B
}function BQ(D,A,B,H){var G;
var F=B?B[D]:null;
if(F){for(var C=0;
C<F.length;
++C){var E=F[C];
if(!G&&E.rsfID==A){G=E
}if(E.rsfID==D){return E
}}}return G
}function Aj(D,B){var C=B.jointID?B.jointID:B.ID;
var E=Ab.SplitID(C);
var A=E.prefix+":";
var F=BQ(C,A,D.downmap,B);
if(F){return F
}if(B.children){F=BQ(C,A,AW,B);
if(F){return F
}}return null
}function BS(A){if(!BC[A.href]){Ab.aggregateMMap(A3,A.collectmap);
BC[A.href]=true
}}function Af(G,J){for(var I=0;
I<G.children.length;
++I){var F=G.children[I];
if(F.children){var D=Aj(J,F);
if(D){Aw[F.fullID]=D;
var B=D.attributemap.id;
if(B!==undefined){BU[Ba(J.parent,G,B)]=F.fullID
}BS(D.parent);
Af(F,D)
}}}if(J.downmap){for(var B in J.downmap){var E=J.downmap[B];
for(var I=0;
I<E.length;
++I){var H=E[I];
var C=H.attributemap.id;
if(C!==undefined&&H.rsfID!==undefined){var D=A8(G,H.rsfID);
if(D!==null){var A=D.fullID;
if(D.componentType==="UISelect"){A=A+"-selection"
}BU[Ba(J.parent,G,C)]=A
}}}}}}function AU(B,C,A){Aw={};
BU={};
BC={};
A3={};
AW=B;
Aw[C.fullID]=A;
Af(C,A)
}function BL(B,A){if(A.elide){return 
}var C={};
A9.extend(true,C,A.attributemap);
AV(C,B);
Aq(B,C);
AX+="<"+A.tagname+" ";
AX+=Ab.dumpAttributes(C);
AX+=">"
}function BH(D,B,A){for(;
B<A;
++B){var C=D[B].text;
if(C){AX+=D[B].text
}}}function BR(C,G,A,F,E){var D=G;
while(true){if(G===C.length){break
}var B=C[G];
if(B.nestingdepth<A){break
}if(B.rsfID!==undefined){if(!E){break
}if(E&&B.nestingdepth>A+(F?0:1)){Ab.log("Error in component tree - leaf component found to contain further components - at "+B.toString())
}else{break
}}++G
}if(!F&&(G==C.length||!C[G].rsfID)){--G
}BH(C,D,G);
return G
}var Al={};
function Az(){if(!Al.iselide){AX+="<"+Al.uselump.tagname
}}function A6(){if(!Al.iselide){AX+="</"+Al.uselump.tagname+">"
}}function A4(){BH(Al.uselump.parent.lumps,Al.uselump.lumpindex+1,Al.close.lumpindex+(Al.iselide?0:1))
}function Bd(){if(!Al.iselide){AX+=Ab.dumpAttributes(Al.attrcopy)
}BO()
}function Ah(){if(Al.iselide){Bd()
}else{AX+=Ab.dumpAttributes(Al.attrcopy);
AX+=">";
Al.nextpos=Al.endopen.lumpindex
}}function BO(){if(Al.endopen.lumpindex===Al.close.lumpindex){if(!Al.iselide){AX+="/>"
}}else{if(!Al.iselide){AX+=">"
}BH(Al.uselump.parent.lumps,Al.endopen.lumpindex,Al.close.lumpindex+(Al.iselide?0:1))
}}function BN(A){if(BX(A)){BE(A)
}else{Bd()
}}function At(A){if(Al.iselide){BN(Al.value)
}else{if(BX(A)){BE(A)
}else{Ah()
}}}function BE(A){AX+=Ab.dumpAttributes(Al.attrcopy);
if(!Al.iselide){AX+=">"
}AX+=Ab.XMLEncode(A.toString());
A6()
}function BX(A){return A!==null&&A!==undefined&&!Ay(A)
}function Ay(A){return false
}function Ac(B,A){return A
}function Bc(B){AX+='<input type="hidden" ';
var C=B.virtual;
var A={};
A[C?"id":"name"]=B.name;
A.value=B.value;
AX+=Ab.dumpAttributes(A);
AX+=" />\n"
}function BZ(A,F){var B=Al.uselump.tagname;
var D=BP.applier;
function C(){Ab.applyChange(Ab.byId(F),undefined,D)
}if(BP.autoBind&&/input|select|textarea/.test(B)&&!A5[F]){var E=[{jQuery:["change",C]}];
if(A9.browser.msie&&B==="input"&&/radio|checkbox/.test(Al.attrcopy.type)){E.push({jQuery:["click",C]})
}Au(A,E,Al.attrcopy,F)
}}function Av(A,B){if(A){var C=B?B:A;
if(Ax&&C.submittingname&&C.valuebinding){Ax[C.submittingname]={name:C.submittingname,EL:C.valuebinding,oldvalue:C.value};
BZ(A,A.fullID)
}if(A.fossilizedbinding){Bc(A.fossilizedbinding)
}if(A.fossilizedshaper){Bc(A.fossilizedshaper)
}}}function BT(A){if(!A5[A.selection.fullID]){A5[A.selection.fullID]=true;
Av(A.selection);
Av(A.optionlist);
Av(A.optionnames)
}}Ab.NULL_STRING="\u25a9null\u25a9";
var Ae={a:"href",link:"href",img:"src",frame:"src",script:"src",style:"src",input:"src",embed:"src",form:"action",applet:"codebase",object:"codebase"};
function AY(A,B){var C=A.selection;
return C.value&&typeof (C.value)!=="string"&&typeof (C.value.length)==="number"?A9.inArray(B,C.value,B)!==-1:C.value===B
}function Bb(A,B){A=A.parent;
if(B.indexOf("..::")===0){B=B.substring(4);
A=A.parent
}return A.childmap[B]
}function AZ(E){var C=[];
if(E.type){C[0]=E
}else{for(var D in E){if(D==="$"){D="jQuery"
}var B=E[D];
var A={type:D};
if(D==="jQuery"){A.func=B[0];
A.args=B.slice(1)
}else{if(D==="addClass"||D==="removeClass"){A.classes=B
}else{if(D==="attrs"){A.attributes=B
}else{if(D==="identify"){A.key=B
}}}}C[C.length]=A
}}return C
}function Au(H,D,A,F){BP.idMap=BP.idMap||{};
for(var I=0;
I<D.length;
++I){var J=D[I];
var G=J.type;
if(!G){var E=AZ(J);
Au(H,E,A,F);
continue
}if(G==="$"){G=J.type="jQuery"
}if(G==="jQuery"||G==="event"||G==="fluid"){var B=AV(A,H,true,F);
J.id=B;
BF[BF.length]=J
}else{if(G==="attrs"){A9.extend(true,A,J.attributes)
}else{if(G==="addClass"||G==="removeClass"){var C={nodeType:1,className:A["class"]||""};
A9(C)[G](J.classes);
A["class"]=C.className
}else{if(G==="identify"){var B=AV(A,H,true,F);
BP.idMap[J.key]=B
}}}}}}function Aq(A,B){if(!A.decorators){return 
}if(A.decorators.length===undefined){A.decorators=AZ(A.decorators)
}Au(A,A.decorators,B)
}function BJ(N){var B=Al.attrcopy;
var G=Al.uselump.parent.lumps;
var T=Al.uselump.lumpindex;
var P=N.componentType;
var K=Al.uselump.tagname;
Aq(N,B);
if(P==="UIMessage"){P="UIBound";
if(!BP.messageLocator){N.value="[No messageLocator is configured in options - please consult documentation on options.messageSource]"
}else{N.value=BP.messageLocator(N.messagekey,N.args)
}}function E(V,U){Ab.fail("Error in component tree - UISelectChoice with id "+V.fullID+U)
}if(P==="UIBound"||P==="UISelectChoice"){var S;
if(N.choiceindex!==undefined){if(N.parentFullID){S=getAbsoluteComponent(view,N.parentFullID);
if(!S){E(N," has parentFullID of "+N.parentFullID+" which cannot be resolved")
}}else{if(N.parentRelativeID!==undefined){S=Bb(N,N.parentRelativeID);
if(!S){E(N," has parentRelativeID of "+N.parentRelativeID+" which cannot be resolved")
}}else{E(N," does not have either parentFullID or parentRelativeID set")
}}Ap(S.selection);
BT(S)
}var C=S?S.selection.submittingname:N.submittingname;
if(K==="input"||K==="textarea"){if(!S){C=Ap(N)
}if(C!==undefined){B.name=C
}}Av(N,S?S.selection:null);
if(typeof (N.value)==="boolean"||B.type==="radio"||B.type==="checkbox"){var A;
var L=N.value;
if(N.choiceindex!==undefined){if(!S.optionlist.value){Ab.fail("Error in component tree - selection control with full ID "+S.fullID+" has no values")
}A=S.optionlist.value[N.choiceindex];
L=AY(S,A)
}if(BX(L)){if(L){B.checked="checked"
}else{delete B.checked
}}B.value=A?A:"true";
BN(null)
}else{if(N.value instanceof Array){A4()
}else{var O=S?S[K==="textarea"||K==="input"?"optionlist":"optionnames"].value[N.choiceindex]:N.value;
if(K==="textarea"){if(Ay(O)&&N.willinput){O=""
}BN(O)
}else{if(K==="input"){if(N.willinput||BX(O)){B.value=O
}BN(null)
}else{delete B.name;
At(O)
}}}}}else{if(P==="UISelect"){BZ(N,N.selection.fullID);
var H=K==="select";
var D=false;
if(N.selection.value instanceof Array){D=true;
if(H){B.multiple="multiple"
}}Ap(N.selection,B.id);
if(H){if(N.selection.willinput!==false){B.name=N.selection.submittingname
}}AX+=Ab.dumpAttributes(B);
if(H){AX+=">";
var F=N.optionlist.value;
var Q=N.optionnames===null||N.optionnames===undefined||!N.optionnames.value?F:N.optionnames.value;
if(!Q||!Q.length){Ab.fail("Error in component tree - UISelect component with fullID "+N.fullID+" does not have optionnames set")
}for(var M=0;
M<Q.length;
++M){AX+='<option value="';
var O=F[M];
if(O===null){O=Ab.NULL_STRING
}AX+=Ab.XMLEncode(O);
if(AY(N,O)){AX+='" selected="selected'
}AX+='">';
AX+=Ab.XMLEncode(Q[M]);
AX+="</option>\n"
}A6()
}else{BO()
}BT(N)
}else{if(P==="UILink"){var R=Ae[K];
if(R){var I=N.target.value;
if(!BX(I)){I=B[attname]
}else{I=Ac(Al.uselump.parent,I)
}B[R]=I
}var O=N.linktext.value;
if(!BX(O)){Ah()
}else{BN(O)
}}else{if(N.markup!==undefined){var J=N.markup;
if(J===null){AX+=Ab.dumpAttributes(B);
AX+=">";
A4()
}else{if(!Al.iselide){AX+=Ab.dumpAttributes(B);
AX+=">"
}AX+=J;
A6()
}}else{}}}}}function AV(D,E,F,B){if(!F){delete D["rsf:id"]
}if(B!==undefined){D.id=B
}else{if(D.id||F){D.id=E.fullID
}}var C=1;
var A=D.id;
while(BP.document.getElementById(D.id)){D.id=A+"-"+(C++)
}return D.id
}function BM(A){var B;
var D=Al.attrcopy["for"];
if(D!==undefined){B="for"
}else{D=Al.attrcopy.headers;
if(D!==undefined){B="headers"
}}if(!B){return 
}var C=Al.uselump.tagname;
if(B==="for"&&C!=="label"){return 
}if(B==="headers"&&C!=="td"&&C!=="th"){return 
}var E=BU[Ba(Al.uselump.parent,A,D)];
if(E!==undefined){Al.attrcopy[B]=E
}}function As(A){AX+=("<!-- "+Ab.XMLEncode(A)+"-->")
}function Ak(A){AX+='<span style="background-color:#FF466B;color:white;padding:1px;">';
AX+=A;
AX+="</span><br/>"
}function BI(A){var B=A.fullID;
return !B?"component tree root":"full path "+B
}function BA(E,L,P){var N=P.lumpindex;
var H=P.parent.lumps;
var O=-1;
var M=H[N+1];
var F=P.close_tag;
O=F.lumpindex+1;
var A=P.downmap?P.downmap["payload-component"]:null;
var I=A?A[0]:null;
var J=P.rsfID.charCodeAt(0)===126;
var B=M;
var G=F;
var C=P;
var D={};
A9.extend(true,D,(I===null?P:I).attributemap);
Al.attrcopy=D;
Al.uselump=C;
Al.endopen=B;
Al.close=G;
Al.nextpos=O;
Al.iselide=J;
BM(E);
if(L===null){if(P.rsfID.indexOf("scr=")===(J?1:0)){var K=P.rsfID.substring(4+(J?1:0));
if(K==="ignore"){O=Al.close.lumpindex+1
}else{Az();
Ah();
O=Al.endopen.lumpindex
}}}else{if(I){Al.endopen=H[I.lumpindex+1];
Al.close=I.close_tag;
Al.uselump=I;
BH(H,N,I.lumpindex);
N=I.lumpindex
}AV(D,L);
Az();
BJ(L);
if(I!==null){if(Al.nextpos===O){BH(H,Al.close.lumpindex+1,F.lumpindex+1)
}}O=Al.nextpos
}return O
}function A0(B,A){var C=A.parent;
var D=C.lumps[A.lumpindex+1];
if(B.children!==undefined){BL(B,A)
}else{BA(B.parent,B,A)
}Ao(B,A,D)
}function A8(C,B,D){if(B.indexOf("msg=")===0){var A=B.substring(4);
return{componentType:"UIMessage",messagekey:A}
}while(C){var E=C.childmap[B];
if(E){return E
}C=C.parent
}return null
}function Ag(C,B){var A;
while(C){A=C.childmap[B];
if(A){break
}C=C.parent
}return A
}function BG(C,B){var D=Ab.SplitID(B.ID);
var A=C.downmap[B.ID];
if(A===null){A=C.downmap[D.prefix+":"]
}return A===null?null:A[0]
}function Ao(A,G,P){var M=P.lumpindex;
var J=G.nestingdepth;
var U=G.parent;
if(Ar){var I={}
}while(true){M=BR(U.lumps,M,J,!G.elide,false);
if(M===U.lumps.length){break
}var R=U.lumps[M];
var Q=R.rsfID;
if(R.nestingdepth<J||Q===undefined){break
}if(Q.charCodeAt(0)===126){Q=Q.substring(1)
}if(Q.indexOf(":")!==-1){var O=Ab.getPrefix(Q);
var F=Ag(A,O);
var D=R.uplump.finallump[O];
var C=D.close_tag;
if(F){for(var N=0;
N<F.length;
++N){var E=F[N];
if(E.children){var L=Aw[E.fullID];
if(L){if(Ar){As("Branching for "+E.fullID+" from "+Ab.debugLump(R)+" to "+Ab.debugLump(L))
}A0(E,L);
if(Ar){As("Branch returned for "+E.fullID+Ab.debugLump(R)+" to "+Ab.debugLump(L))
}}else{if(Ar){Ak("No matching template branch found for branch container with full ID "+E.fullID+" rendering from parent template branch "+Ab.debugLump(P))
}}}else{var L=BG(G,E);
if(!L){if(Ar){Ak("Repetitive leaf with full ID "+E.fullID+" could not be rendered from parent template branch "+Ab.debugLump(P))
}continue
}var K=BA(A,E,L);
var S=K<U.lumps.lengtn&&U.lumps[K].nestingdepth>=L.nestingdepth;
var B=E.children?E:A;
if(S){Ao(B,L,U.lumps[K]);
K=L.close_tag.lumpindex+1
}if(N!==F.length-1){if(K<C.lumpindex){BR(U.lumps,K,L.nestingdepth-1,false,false)
}}else{BR(U.lumps,K,L.nestingdepth,true,false)
}}}}else{if(Ar){Ak("No branch container with prefix "+O+": found in container "+BI(A)+" rendering at template position "+Ab.debugLump(P)+", skipping")
}}M=C.lumpindex+1;
if(Ar){As("Stack returned from branch for ID "+Q+" to "+Ab.debugLump(P)+": skipping from "+Ab.debugLump(R)+" to "+Ab.debugLump(C))
}}else{var T;
if(Q){if(Ar){I[Q]=true
}T=A8(A,Q,R)
}if(T&&T.children!==undefined){A0(T);
M=R.close_tag.lumpindex+1
}else{M=BA(A,T,R)
}}if(M===U.lumps.length){break
}}if(Ar){var F=A.children;
for(var H=0;
H<F.length;
++H){var E=F[H];
if(!(E.ID.indexOf(":")!==-1)&&!I[E.ID]){Ak("Leaf child component "+E.componentType+" with full ID "+E.fullID+" could not be found within template "+Ab.debugLump(P))
}}}}function A2(A){BH(A.parent.lumps,A.lumpindex,A.close_tag.lumpindex+1)
}function Am(){for(var B in A3){var A=A3[B];
for(var C=0;
C<A.length;
++C){A2(A[C])
}}}function BK(){for(var D=0;
D<BF.length;
++D){var A=BF[D];
var B=Ab.byId(A.id);
if(!B){Ab.fail("Error during rendering - component with id "+A.id+" which has a queued decorator was not found in the output markup")
}if(A.type==="jQuery"){var E=A9(B);
E[A.func].apply(E,A9.makeArray(A.args))
}else{if(A.type==="fluid"){var F=A.args;
if(!F){if(!A.container){A.container=B
}F=[A.container,A.options]
}var C=Ab.invokeGlobalFunction(A.func,F,Ab);
A.that=C
}else{if(A.type==="event"){B[A.event]=A.handler
}}}}}Ab.ComponentReference=function(A){this.reference=A
};
Ab.explode=function(C,A){var D=[];
for(var E in C){var B=A===undefined?E:A+"."+E;
D[D.length]={ID:E,value:C[E],valuebinding:B}
}return D
};
Ab.explodeSelectionToInputs=function(A,B){return Ab.transform(A,function(C,D){return{ID:B.rowID,children:[{ID:B.inputID,parentRelativeID:"..::"+B.selectID,choiceindex:D},{ID:B.labelID,parentRelativeID:"..::"+B.selectID,choiceindex:D}]}
})
};
Ab.resolveMessageSource=function(A){if(A.type==="data"){if(A.url===undefined){return Ab.messageLocator(A.messages)
}else{}}};
Ab.makeBranches=function(){var C;
var E;
for(var A=0;
A<arguments.length;
++A){var D=arguments[A];
var B;
if(typeof (D)==="string"){B={ID:D}
}else{if(D instanceof Array){B={ID:D[0],jointID:D[1]}
}else{A9.extend(true,E,D);
B=E
}}if(E&&B!==E){if(!E.children){E.children=[]
}E.children[E.children.length]=B
}E=B;
if(!C){C=B
}}return C
};
Ab.renderTemplates=function(C,A,E,D){E=E||{};
A=A||{};
Ar=E.debugMode;
if(!E.messageLocator&&E.messageSource){E.messageLocator=Ab.resolveMessageSource(E.messageSource)
}E.document=E.document||document;
Ax=D;
BF=[];
A=Aa(A,E.model);
var B=C[0];
AU(C.globalmap,A,B.rootlump);
AX="";
A5={};
BP=E;
Am();
Ao(A,B.rootlump,B.lumps[B.firstdocumentindex]);
return AX
};
Ab.reRender=function(D,H,B,C){C=C||{};
H=Ab.unwrap(H);
var F=Ab.getLastFocusedElement?Ab.getLastFocusedElement():null;
var A;
if(F&&Ab.dom.isContainer(H,F)){A=F.id
}if(A9.browser.msie){A9(H).empty()
}else{H.innerHTML=""
}var E={};
var I=Ab.renderTemplates(D,B,C,E);
if(C.renderRaw){I=Ab.XMLEncode(I);
I=I.replace(/\n/g,"<br/>")
}if(C.model){Ab.bindFossils(H,C.model,E)
}if(A9.browser.msie){A9(H).html(I)
}else{H.innerHTML=I
}BK();
if(A){var G=Ab.byId(A);
if(G){A9(G).focus()
}}return D
};
function BD(A){var C=Ab.dom.iterateDom(A,function(D){return D.nodeType===8||D.nodeType===4?"stop":null
},true);
var B=C.nodeValue;
if(B.indexOf("[CDATA[")===0){return B.substring(6,B.length-2)
}else{return B
}}Ab.extractTemplate=function(B,A){if(!A){return B.innerHTML
}else{return BD(B)
}};
Ab.selfRender=function(B,A,D){D=D||{};
B=Ab.unwrap(B);
var E={base:{resourceText:Ab.extractTemplate(B,D.armouring),href:".",resourceKey:".",cutpoints:D.cutpoints}};
var C=Ab.parseTemplates(E,["base"],D);
return Ab.reRender(C,B,A,D)
}
})(jQuery,fluid_1_1);