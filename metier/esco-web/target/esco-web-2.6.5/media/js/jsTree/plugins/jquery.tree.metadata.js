(function(B){if(typeof B.metadata=="undefined"){throw"jsTree metadata: jQuery metadata plugin not included."
}B.extend(B.tree.plugins,{metadata:{defaults:{attribute:"data"},callbacks:{check:function(I,J,A,H){var G=B.extend(true,{},B.tree.plugins.metadata.defaults,this.settings.plugins.metadata);
if(typeof B(J).metadata({type:"attr",name:G.attribute})[I]!="undefined"){return B(J).metadata()[I]
}}}}})
})(jQuery);