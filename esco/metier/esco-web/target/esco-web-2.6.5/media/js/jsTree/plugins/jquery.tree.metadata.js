(function(A){if(typeof A.metadata=="undefined"){throw"jsTree metadata: jQuery metadata plugin not included."
}A.extend(A.tree.plugins,{metadata:{defaults:{attribute:"data"},callbacks:{check:function(C,B,F,D){var E=A.extend(true,{},A.tree.plugins.metadata.defaults,this.settings.plugins.metadata);
if(typeof A(B).metadata({type:"attr",name:E.attribute})[C]!="undefined"){return A(B).metadata()[C]
}}}}})
})(jQuery);