(function(A){A.fn.extend({getPostData:function(){var B=this[0];
if(!B.grid){return 
}return B.p.postData
},setPostData:function(B){var C=this[0];
if(!C.grid){return 
}if(typeof (B)==="object"){C.p.postData=B
}else{alert("Error: cannot add a non-object postData value. postData unchanged.")
}},appendPostData:function(B){var C=this[0];
if(!C.grid){return 
}if(typeof (B)==="object"){A.extend(C.p.postData,B)
}else{alert("Error: cannot append a non-object postData value. postData unchanged.")
}},setPostDataItem:function(D,B){var C=this[0];
if(!C.grid){return 
}C.p.postData[D]=B
},getPostDataItem:function(B){var C=this[0];
if(!C.grid){return 
}return C.p.postData[B]
},removePostDataItem:function(B){var C=this[0];
if(!C.grid){return 
}delete C.p.postData[B]
},getUserData:function(){var B=this[0];
if(!B.grid){return 
}return B.p.userData
},getUserDataItem:function(B){var C=this[0];
if(!C.grid){return 
}return C.p.userData[B]
}})
})(jQuery);