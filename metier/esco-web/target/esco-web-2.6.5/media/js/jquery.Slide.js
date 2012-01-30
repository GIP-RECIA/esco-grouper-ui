$(document).ready(function(){$("#open").click(function(){$.blockUI({css:{border:"none",padding:"15px",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px",opacity:0.5,color:"#fff"}});
$("div#panel").slideDown("slow")
});
$("#close").click(function(){$("div#panel").slideUp("slow")
});
$("#toggle a").click(function(){$("#toggle a").toggle()
})
});