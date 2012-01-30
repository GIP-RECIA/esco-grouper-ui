var ActionRightCheckBox={clickOptinDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
var E=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+E[0]+"_"+C.VIEW),true)
}var F=$(C.ID_GRID).getCell(E[0],1);
json={idElement:F,optin:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(G){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickOptoutDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.VIEW),true)
}idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,optout:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickViewDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.OPTIN),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.OPTOUT),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.READ),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.UPDATE),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.ADMIN),false)
}idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,view:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickReadDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.VIEW),true)
}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.UPDATE),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.ADMIN),false)
}idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,read:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickUpdateDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.VIEW),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.READ),true)
}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.ADMIN),false)
}idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,update:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickAdminDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.VIEW),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.READ),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+C.UPDATE),true)
}idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,administrate:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickHasStemDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,hasStem:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},clickHasCreateDefaultAction:function(C,A){var B=function(D){D.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
idElement=$(C.ID_GRID).getCell(row[0],1);
json={idElement:idElement,hasCreate:$(this).attr("checked")};
_callIsModified=A;
$.post(C.URL_SEND_PRIVILEGE,json,function(E){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return B
},_toggleImg:function(A,B){if(B!=undefined){if(B===true){A.attr("checked","true");
A.attr("src","/"+Core.applicationContext+"/media/imgs/checked.png")
}else{A.attr("checked","false");
A.attr("src","/"+Core.applicationContext+"/media/imgs/unchecked.png")
}}else{if(A.attr("checked")==="false"){A.attr("checked","true");
A.attr("src","/"+Core.applicationContext+"/media/imgs/checked.png")
}else{A.attr("checked","false");
A.attr("src","/"+Core.applicationContext+"/media/imgs/unchecked.png")
}}}};