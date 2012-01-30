var Lang={_LANG:{},getString:function(A){var B=A.toUpperCase();
B=B.replace(" ","_");
if(this._LANG[B]!=null){return this._LANG[B]
}else{if(Debug.isInDebug()){return"?????"+B+"?????"
}else{return""
}}}};