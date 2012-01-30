jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(E,A,D,C,B){return jQuery.easing[jQuery.easing.def](E,A,D,C,B)
},easeInQuad:function(E,A,D,C,B){return C*(A/=B)*A+D
},easeOutQuad:function(E,A,D,C,B){return -C*(A/=B)*(A-2)+D
},easeInOutQuad:function(E,A,D,C,B){if((A/=B/2)<1){return C/2*A*A+D
}return -C/2*((--A)*(A-2)-1)+D
},easeInCubic:function(E,A,D,C,B){return C*(A/=B)*A*A+D
},easeOutCubic:function(E,A,D,C,B){return C*((A=A/B-1)*A*A+1)+D
},easeInOutCubic:function(E,A,D,C,B){if((A/=B/2)<1){return C/2*A*A*A+D
}return C/2*((A-=2)*A*A+2)+D
},easeInQuart:function(E,A,D,C,B){return C*(A/=B)*A*A*A+D
},easeOutQuart:function(E,A,D,C,B){return -C*((A=A/B-1)*A*A*A-1)+D
},easeInOutQuart:function(E,A,D,C,B){if((A/=B/2)<1){return C/2*A*A*A*A+D
}return -C/2*((A-=2)*A*A*A-2)+D
},easeInQuint:function(E,A,D,C,B){return C*(A/=B)*A*A*A*A+D
},easeOutQuint:function(E,A,D,C,B){return C*((A=A/B-1)*A*A*A*A+1)+D
},easeInOutQuint:function(E,A,D,C,B){if((A/=B/2)<1){return C/2*A*A*A*A*A+D
}return C/2*((A-=2)*A*A*A*A+2)+D
},easeInSine:function(E,A,D,C,B){return -C*Math.cos(A/B*(Math.PI/2))+C+D
},easeOutSine:function(E,A,D,C,B){return C*Math.sin(A/B*(Math.PI/2))+D
},easeInOutSine:function(E,A,D,C,B){return -C/2*(Math.cos(Math.PI*A/B)-1)+D
},easeInExpo:function(E,A,D,C,B){return(A==0)?D:C*Math.pow(2,10*(A/B-1))+D
},easeOutExpo:function(E,A,D,C,B){return(A==B)?D+C:C*(-Math.pow(2,-10*A/B)+1)+D
},easeInOutExpo:function(E,A,D,C,B){if(A==0){return D
}if(A==B){return D+C
}if((A/=B/2)<1){return C/2*Math.pow(2,10*(A-1))+D
}return C/2*(-Math.pow(2,-10*--A)+2)+D
},easeInCirc:function(E,A,D,C,B){return -C*(Math.sqrt(1-(A/=B)*A)-1)+D
},easeOutCirc:function(E,A,D,C,B){return C*Math.sqrt(1-(A=A/B-1)*A)+D
},easeInOutCirc:function(E,A,D,C,B){if((A/=B/2)<1){return -C/2*(Math.sqrt(1-A*A)-1)+D
}return C/2*(Math.sqrt(1-(A-=2)*A)+1)+D
},easeInElastic:function(H,B,G,F,E){var C=1.70158;
var D=0;
var A=F;
if(B==0){return G
}if((B/=E)==1){return G+F
}if(!D){D=E*0.3
}if(A<Math.abs(F)){A=F;
var C=D/4
}else{var C=D/(2*Math.PI)*Math.asin(F/A)
}return -(A*Math.pow(2,10*(B-=1))*Math.sin((B*E-C)*(2*Math.PI)/D))+G
},easeOutElastic:function(H,B,G,F,E){var C=1.70158;
var D=0;
var A=F;
if(B==0){return G
}if((B/=E)==1){return G+F
}if(!D){D=E*0.3
}if(A<Math.abs(F)){A=F;
var C=D/4
}else{var C=D/(2*Math.PI)*Math.asin(F/A)
}return A*Math.pow(2,-10*B)*Math.sin((B*E-C)*(2*Math.PI)/D)+F+G
},easeInOutElastic:function(H,B,G,F,E){var C=1.70158;
var D=0;
var A=F;
if(B==0){return G
}if((B/=E/2)==2){return G+F
}if(!D){D=E*(0.3*1.5)
}if(A<Math.abs(F)){A=F;
var C=D/4
}else{var C=D/(2*Math.PI)*Math.asin(F/A)
}if(B<1){return -0.5*(A*Math.pow(2,10*(B-=1))*Math.sin((B*E-C)*(2*Math.PI)/D))+G
}return A*Math.pow(2,-10*(B-=1))*Math.sin((B*E-C)*(2*Math.PI)/D)*0.5+F+G
},easeInBack:function(F,A,E,D,C,B){if(B==undefined){B=1.70158
}return D*(A/=C)*A*((B+1)*A-B)+E
},easeOutBack:function(F,A,E,D,C,B){if(B==undefined){B=1.70158
}return D*((A=A/C-1)*A*((B+1)*A+B)+1)+E
},easeInOutBack:function(F,A,E,D,C,B){if(B==undefined){B=1.70158
}if((A/=C/2)<1){return D/2*(A*A*(((B*=(1.525))+1)*A-B))+E
}return D/2*((A-=2)*A*(((B*=(1.525))+1)*A+B)+2)+E
},easeInBounce:function(E,A,D,C,B){return C-jQuery.easing.easeOutBounce(E,B-A,0,C,B)+D
},easeOutBounce:function(E,A,D,C,B){if((A/=B)<(1/2.75)){return C*(7.5625*A*A)+D
}else{if(A<(2/2.75)){return C*(7.5625*(A-=(1.5/2.75))*A+0.75)+D
}else{if(A<(2.5/2.75)){return C*(7.5625*(A-=(2.25/2.75))*A+0.9375)+D
}else{return C*(7.5625*(A-=(2.625/2.75))*A+0.984375)+D
}}}},easeInOutBounce:function(E,A,D,C,B){if(A<B/2){return jQuery.easing.easeInBounce(E,A*2,0,C,B)*0.5+D
}return jQuery.easing.easeOutBounce(E,A*2-B,0,C,B)*0.5+C*0.5+D
}});