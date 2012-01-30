var ProfilePluginPrototype=$.extend(true,{},CorePlugin,{doOnFire:function(){this._entryPoint="ProfilePlugin"
},canAccessToScreen:function(A){var D=A.url;
var B=A.param;
var C=true;
C=Profile.getPropertyValueFromUrl(D,B);
if(C==undefined){C=true
}return C
}});
var ProfilePlugin=new DUI.Class(ProfilePluginPrototype,$.screen);