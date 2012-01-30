var ProfilePluginPrototype=$.extend(true,{},CorePlugin,{doOnFire:function(){this._entryPoint="ProfilePlugin"
},canAccessToScreen:function(E){var F=E.url;
var H=E.param;
var G=true;
G=Profile.getPropertyValueFromUrl(F,H);
if(G==undefined){G=true
}return G
}});
var ProfilePlugin=new DUI.Class(ProfilePluginPrototype,$.screen);