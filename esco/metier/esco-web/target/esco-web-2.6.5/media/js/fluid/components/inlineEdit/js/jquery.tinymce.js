(function(A){if(typeof (tinyMCE)!=="undefined"){tinyMCE.init({mode:"none",theme:"simple"})
}A.fn.tinymce=function(){this.each(function(){tinyMCE.execCommand("mceAddControl",false,this.id)
});
return this
}
})(jQuery);