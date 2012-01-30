(function(B){B.fn.extend({getPostData:function(){var A=this[0];
if(!A.grid){return 
}return A.p.postData
},setPostData:function(D){var A=this[0];
if(!A.grid){return 
}if(typeof (D)==="object"){A.p.postData=D
}else{alert("Error: cannot add a non-object postData value. postData unchanged.")
}},appendPostData:function(D){var A=this[0];
if(!A.grid){return 
}if(typeof (D)==="object"){B.extend(A.p.postData,D)
}else{alert("Error: cannot append a non-object postData value. postData unchanged.")
}},setPostDataItem:function(A,F){var E=this[0];
if(!E.grid){return 
}E.p.postData[A]=F
},getPostDataItem:function(D){var A=this[0];
if(!A.grid){return 
}return A.p.postData[D]
},removePostDataItem:function(D){var A=this[0];
if(!A.grid){return 
}delete A.p.postData[D]
},getUserData:function(){var A=this[0];
if(!A.grid){return 
}return A.p.userData
},getUserDataItem:function(D){var A=this[0];
if(!A.grid){return 
}return A.p.userData[D]
}})
})(jQuery);