var CorePlugin={_entryPoint:null,fire:function(){this.doOnFire();
Core.addPlugin(this)
},doOnFire:function(){Core.log("NOT IMPLEMENTED : CorePlugin.doOnFire")
},execute:function(A){if(this[A.theFunction]!=undefined){return this[A.theFunction].call(this,A)
}}};