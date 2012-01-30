var TreePlugin={nextNodeToOpen:{nextId:1,nextNode:"",nameOfNodeToOpen:""},openAndSelectNode:function(A){if(A!=undefined){Core.log("TreePlugin.openAndSelectNode("+A+")");
this.nextNodeToOpen.nameOfNodeToOpen=A
}this.nextNodeToOpen.nextNode="";
var C=this.nextNodeToOpen.nameOfNodeToOpen.split(":");
for(j=0;
j<this.nextNodeToOpen.nextId;
j++){this.nextNodeToOpen.nextNode+=C[j]+":"
}this.nextNodeToOpen.nextNode=this.nextNodeToOpen.nextNode.substring(0,this.nextNodeToOpen.nextNode.length-1);
var B=$("li[displayName="+this.nextNodeToOpen.nextNode+"]");
var E=B.attr("typeNode")=="FOLDER"&&C.length!=this.nextNodeToOpen.nextId;
if(E){if(B.hasClass("closed")){this.nextNodeToOpen.nextId++;
_this=this;
var D=function(){_this.openAndSelectNode()
};
tree.open_branch(B,false,D)
}else{this.nextNodeToOpen.nextId++;
this.openAndSelectNode()
}}else{this.nextNodeToOpen.nextNode="";
this.nextNodeToOpen.nameOfNodeToOpen="";
this.nextNodeToOpen.nextId=1;
tree.select_node(B);
B.children("a").click();
Core._hideBlockUI()
}},openAndSelectParent:function(A){if(A!=undefined){Core.log("TreePlugin.openAndSelectNode("+A+")");
this.nextNodeToOpen.nameOfNodeToOpen=A
}this.nextNodeToOpen.nextNode="";
var C=this.nextNodeToOpen.nameOfNodeToOpen.split(":");
for(j=0;
j<this.nextNodeToOpen.nextId;
j++){this.nextNodeToOpen.nextNode+=C[j]+":"
}this.nextNodeToOpen.nextNode=this.nextNodeToOpen.nextNode.substring(0,this.nextNodeToOpen.nextNode.length-1);
var B=$("li[displayName="+this.nextNodeToOpen.nextNode+"]");
var E=B.attr("typeNode")=="FOLDER"&&C.length!=this.nextNodeToOpen.nextId;
if(E){if(B.hasClass("closed")){this.nextNodeToOpen.nextId++;
_this=this;
var D=function(){_this.openAndSelectParent()
};
tree.open_branch(B,false,D)
}else{this.nextNodeToOpen.nextId++;
this.openAndSelectParent()
}}else{this.nextNodeToOpen.nextNode="";
this.nextNodeToOpen.nameOfNodeToOpen="";
this.nextNodeToOpen.nextId=1;
Core._hideBlockUI()
}},refreshNodeOfTree:function(B){var A=null;
if(B!=undefined&&B==false){A=tree.parent($("a[class=clicked]"))
}else{A=$("a[class=clicked]")
}tree.refresh(A);
Validate.closeAllValidatePromptsOpen()
},select_node:function(A,B){Core.log("TreePlugin.select_node("+A+","+B+")");
if(B!=":"&&B[0]==":"){B=B.substring(1,B.length)
}tree.deselect_branch($("a[class=clicked]"));
tree.select_node($("li["+A+"="+B+"]"))
},addTitleToIcon:function(){$.each($("#arbo").find("ins"),function(){var A=$(this).parent().parent().attr("RIGHT");
if($(this).parent().parent().attr("typeNode")=="ROOT"){A==""
}if(A=="FOLDER"){$(this).attr("title",Lang.getString("ICON_FOLDER"))
}else{if(A=="GROUP"){$(this).attr("title",Lang.getString("ICON_GROUP"))
}else{if(A=="ALL"){$(this).attr("title",Lang.getString("ICON_ALL"))
}else{if(A=="NONE"){$(this).attr("title",Lang.getString("ICON_NONE"))
}else{if(A=="view"){$(this).attr("title",Lang.getString("ICON_VIEW"))
}else{if(A=="read"){$(this).attr("title",Lang.getString("ICON_READ"))
}else{if(A=="update"){$(this).attr("title",Lang.getString("ICON_UPDATE"))
}else{if(A=="admin"){$(this).attr("title",Lang.getString("ICON_ADMIN"))
}}}}}}}}if($(this).parent().parent().attr("optin")=="true"){$(this).attr("title",$(this).attr("title")+Lang.getString("ICON_OPTIN"))
}if($(this).parent().parent().attr("optout")=="true"){$(this).attr("title",$(this).attr("title")+Lang.getString("ICON_OPTOUT"))
}})
}};