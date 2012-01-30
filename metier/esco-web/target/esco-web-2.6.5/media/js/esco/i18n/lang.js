var Lang={_LANG:{},getString:function(C){var D=C.toUpperCase();
D=D.replace(" ","_");
if(this._LANG[D]!=null){return this._LANG[D]
}else{if(Debug.isInDebug()){return"?????"+D+"?????"
}else{return""
}}}};