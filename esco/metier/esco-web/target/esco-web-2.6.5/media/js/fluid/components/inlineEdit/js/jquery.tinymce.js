(function(B){if(typeof (tinyMCE)!=="undefined"){tinyMCE.init({mode:"none",theme:"simple"})
}B.fn.tinymce=function(){this.each(function(){tinyMCE.execCommand("mceAddControl",false,this.id)
});
return this
}
})(jQuery);