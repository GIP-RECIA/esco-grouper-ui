var CorePlugin={_entryPoint:null,fire:function(){this.doOnFire();
Core.addPlugin(this)
},doOnFire:function(){Core.log("NOT IMPLEMENTED : CorePlugin.doOnFire")
},execute:function(B){if(this[B.theFunction]!=undefined){return this[B.theFunction].call(this,B)
}}};