var TreePlugin={nextNodeToOpen:{nextId:1,nextNode:"",nameOfNodeToOpen:""},openAndSelectNode:function(F){if(F!=undefined){Core.log("TreePlugin.openAndSelectNode("+F+")");
this.nextNodeToOpen.nameOfNodeToOpen=F
}this.nextNodeToOpen.nextNode="";
var I=this.nextNodeToOpen.nameOfNodeToOpen.split(":");
for(j=0;
j<this.nextNodeToOpen.nextId;
j++){this.nextNodeToOpen.nextNode+=I[j]+":"
}this.nextNodeToOpen.nextNode=this.nextNodeToOpen.nextNode.substring(0,this.nextNodeToOpen.nextNode.length-1);
var J=$("li[displayName="+this.nextNodeToOpen.nextNode+"]");
var G=J.attr("typeNode")=="FOLDER"&&I.length!=this.nextNodeToOpen.nextId;
if(G){if(J.hasClass("closed")){this.nextNodeToOpen.nextId++;
_this=this;
var H=function(){_this.openAndSelectNode()
};
tree.open_branch(J,false,H)
}else{this.nextNodeToOpen.nextId++;
this.openAndSelectNode()
}}else{this.nextNodeToOpen.nextNode="";
this.nextNodeToOpen.nameOfNodeToOpen="";
this.nextNodeToOpen.nextId=1;
tree.select_node(J);
J.children("a").click();
Core._hideBlockUI()
}},openAndSelectParent:function(F){if(F!=undefined){Core.log("TreePlugin.openAndSelectNode("+F+")");
this.nextNodeToOpen.nameOfNodeToOpen=F
}this.nextNodeToOpen.nextNode="";
var I=this.nextNodeToOpen.nameOfNodeToOpen.split(":");
for(j=0;
j<this.nextNodeToOpen.nextId;
j++){this.nextNodeToOpen.nextNode+=I[j]+":"
}this.nextNodeToOpen.nextNode=this.nextNodeToOpen.nextNode.substring(0,this.nextNodeToOpen.nextNode.length-1);
var J=$("li[displayName="+this.nextNodeToOpen.nextNode+"]");
var G=J.attr("typeNode")=="FOLDER"&&I.length!=this.nextNodeToOpen.nextId;
if(G){if(J.hasClass("closed")){this.nextNodeToOpen.nextId++;
_this=this;
var H=function(){_this.openAndSelectParent()
};
tree.open_branch(J,false,H)
}else{this.nextNodeToOpen.nextId++;
this.openAndSelectParent()
}}else{this.nextNodeToOpen.nextNode="";
this.nextNodeToOpen.nameOfNodeToOpen="";
this.nextNodeToOpen.nextId=1;
Core._hideBlockUI()
}},refreshNodeOfTree:function(D){var C=null;
if(D!=undefined&&D==false){C=tree.parent($("a[class=clicked]"))
}else{C=$("a[class=clicked]")
}tree.refresh(C);
Validate.closeAllValidatePromptsOpen()
},select_node:function(C,D){Core.log("TreePlugin.select_node("+C+","+D+")");
if(D!=":"&&D[0]==":"){D=D.substring(1,D.length)
}tree.deselect_branch($("a[class=clicked]"));
tree.select_node($("li["+C+"="+D+"]"))
},addTitleToIcon:function(){$.each($("#arbo").find("ins"),function(){var B=$(this).parent().parent().attr("RIGHT");
if($(this).parent().parent().attr("typeNode")=="ROOT"){B==""
}if(B=="FOLDER"){$(this).attr("title",Lang.getString("ICON_FOLDER"))
}else{if(B=="GROUP"){$(this).attr("title",Lang.getString("ICON_GROUP"))
}else{if(B=="ALL"){$(this).attr("title",Lang.getString("ICON_ALL"))
}else{if(B=="NONE"){$(this).attr("title",Lang.getString("ICON_NONE"))
}else{if(B=="view"){$(this).attr("title",Lang.getString("ICON_VIEW"))
}else{if(B=="read"){$(this).attr("title",Lang.getString("ICON_READ"))
}else{if(B=="update"){$(this).attr("title",Lang.getString("ICON_UPDATE"))
}else{if(B=="admin"){$(this).attr("title",Lang.getString("ICON_ADMIN"))
}}}}}}}}if($(this).parent().parent().attr("optin")=="true"){$(this).attr("title",$(this).attr("title")+Lang.getString("ICON_OPTIN"))
}if($(this).parent().parent().attr("optout")=="true"){$(this).attr("title",$(this).attr("title")+Lang.getString("ICON_OPTOUT"))
}})
}};