var ActionRightCheckBox={clickOptinDefaultAction:function(E,D){var F=function(C){C.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
var B=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+B[0]+"_"+E.VIEW),true)
}var A=$(E.ID_GRID).getCell(B[0],1);
json={idElement:A,optin:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(H){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickOptoutDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.VIEW),true)
}idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,optout:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickViewDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.OPTIN),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.OPTOUT),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.READ),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.UPDATE),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.ADMIN),false)
}idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,view:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickReadDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.VIEW),true)
}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.UPDATE),false);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.ADMIN),false)
}idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,read:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickUpdateDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.VIEW),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.READ),true)
}else{ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.ADMIN),false)
}idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,update:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickAdminDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
if($(this).attr("checked")=="true"){ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.VIEW),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.READ),true);
ActionRightCheckBox._toggleImg($("#"+row[0]+"_"+E.UPDATE),true)
}idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,administrate:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickHasStemDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,hasStem:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},clickHasCreateDefaultAction:function(E,D){var F=function(A){A.stopPropagation();
ActionRightCheckBox._toggleImg($(this));
row=$(this).attr("id").split("_");
idElement=$(E.ID_GRID).getCell(row[0],1);
json={idElement:idElement,hasCreate:$(this).attr("checked")};
_callIsModified=D;
$.post(E.URL_SEND_PRIVILEGE,json,function(B){if(_callIsModified!=undefined){_callIsModified.call()
}})
};
return F
},_toggleImg:function(C,D){if(D!=undefined){if(D===true){C.attr("checked","true");
C.attr("src","/"+Core.applicationContext+"/media/imgs/checked.png")
}else{C.attr("checked","false");
C.attr("src","/"+Core.applicationContext+"/media/imgs/unchecked.png")
}}else{if(C.attr("checked")==="false"){C.attr("checked","true");
C.attr("src","/"+Core.applicationContext+"/media/imgs/checked.png")
}else{C.attr("checked","false");
C.attr("src","/"+Core.applicationContext+"/media/imgs/unchecked.png")
}}}};