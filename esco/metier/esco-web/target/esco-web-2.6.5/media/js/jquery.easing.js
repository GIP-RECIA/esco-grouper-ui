jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(G,F,H,I,J){return jQuery.easing[jQuery.easing.def](G,F,H,I,J)
},easeInQuad:function(G,F,H,I,J){return I*(F/=J)*F+H
},easeOutQuad:function(G,F,H,I,J){return -I*(F/=J)*(F-2)+H
},easeInOutQuad:function(G,F,H,I,J){if((F/=J/2)<1){return I/2*F*F+H
}return -I/2*((--F)*(F-2)-1)+H
},easeInCubic:function(G,F,H,I,J){return I*(F/=J)*F*F+H
},easeOutCubic:function(G,F,H,I,J){return I*((F=F/J-1)*F*F+1)+H
},easeInOutCubic:function(G,F,H,I,J){if((F/=J/2)<1){return I/2*F*F*F+H
}return I/2*((F-=2)*F*F+2)+H
},easeInQuart:function(G,F,H,I,J){return I*(F/=J)*F*F*F+H
},easeOutQuart:function(G,F,H,I,J){return -I*((F=F/J-1)*F*F*F-1)+H
},easeInOutQuart:function(G,F,H,I,J){if((F/=J/2)<1){return I/2*F*F*F*F+H
}return -I/2*((F-=2)*F*F*F-2)+H
},easeInQuint:function(G,F,H,I,J){return I*(F/=J)*F*F*F*F+H
},easeOutQuint:function(G,F,H,I,J){return I*((F=F/J-1)*F*F*F*F+1)+H
},easeInOutQuint:function(G,F,H,I,J){if((F/=J/2)<1){return I/2*F*F*F*F*F+H
}return I/2*((F-=2)*F*F*F*F+2)+H
},easeInSine:function(G,F,H,I,J){return -I*Math.cos(F/J*(Math.PI/2))+I+H
},easeOutSine:function(G,F,H,I,J){return I*Math.sin(F/J*(Math.PI/2))+H
},easeInOutSine:function(G,F,H,I,J){return -I/2*(Math.cos(Math.PI*F/J)-1)+H
},easeInExpo:function(G,F,H,I,J){return(F==0)?H:I*Math.pow(2,10*(F/J-1))+H
},easeOutExpo:function(G,F,H,I,J){return(F==J)?H+I:I*(-Math.pow(2,-10*F/J)+1)+H
},easeInOutExpo:function(G,F,H,I,J){if(F==0){return H
}if(F==J){return H+I
}if((F/=J/2)<1){return I/2*Math.pow(2,10*(F-1))+H
}return I/2*(-Math.pow(2,-10*--F)+2)+H
},easeInCirc:function(G,F,H,I,J){return -I*(Math.sqrt(1-(F/=J)*F)-1)+H
},easeOutCirc:function(G,F,H,I,J){return I*Math.sqrt(1-(F=F/J-1)*F)+H
},easeInOutCirc:function(G,F,H,I,J){if((F/=J/2)<1){return -I/2*(Math.sqrt(1-F*F)-1)+H
}return I/2*(Math.sqrt(1-(F-=2)*F)+1)+H
},easeInElastic:function(J,P,K,L,M){var O=1.70158;
var N=0;
var I=L;
if(P==0){return K
}if((P/=M)==1){return K+L
}if(!N){N=M*0.3
}if(I<Math.abs(L)){I=L;
var O=N/4
}else{var O=N/(2*Math.PI)*Math.asin(L/I)
}return -(I*Math.pow(2,10*(P-=1))*Math.sin((P*M-O)*(2*Math.PI)/N))+K
},easeOutElastic:function(J,P,K,L,M){var O=1.70158;
var N=0;
var I=L;
if(P==0){return K
}if((P/=M)==1){return K+L
}if(!N){N=M*0.3
}if(I<Math.abs(L)){I=L;
var O=N/4
}else{var O=N/(2*Math.PI)*Math.asin(L/I)
}return I*Math.pow(2,-10*P)*Math.sin((P*M-O)*(2*Math.PI)/N)+L+K
},easeInOutElastic:function(J,P,K,L,M){var O=1.70158;
var N=0;
var I=L;
if(P==0){return K
}if((P/=M/2)==2){return K+L
}if(!N){N=M*(0.3*1.5)
}if(I<Math.abs(L)){I=L;
var O=N/4
}else{var O=N/(2*Math.PI)*Math.asin(L/I)
}if(P<1){return -0.5*(I*Math.pow(2,10*(P-=1))*Math.sin((P*M-O)*(2*Math.PI)/N))+K
}return I*Math.pow(2,-10*(P-=1))*Math.sin((P*M-O)*(2*Math.PI)/N)*0.5+L+K
},easeInBack:function(H,G,I,J,K,L){if(L==undefined){L=1.70158
}return J*(G/=K)*G*((L+1)*G-L)+I
},easeOutBack:function(H,G,I,J,K,L){if(L==undefined){L=1.70158
}return J*((G=G/K-1)*G*((L+1)*G+L)+1)+I
},easeInOutBack:function(H,G,I,J,K,L){if(L==undefined){L=1.70158
}if((G/=K/2)<1){return J/2*(G*G*(((L*=(1.525))+1)*G-L))+I
}return J/2*((G-=2)*G*(((L*=(1.525))+1)*G+L)+2)+I
},easeInBounce:function(G,F,H,I,J){return I-jQuery.easing.easeOutBounce(G,J-F,0,I,J)+H
},easeOutBounce:function(G,F,H,I,J){if((F/=J)<(1/2.75)){return I*(7.5625*F*F)+H
}else{if(F<(2/2.75)){return I*(7.5625*(F-=(1.5/2.75))*F+0.75)+H
}else{if(F<(2.5/2.75)){return I*(7.5625*(F-=(2.25/2.75))*F+0.9375)+H
}else{return I*(7.5625*(F-=(2.625/2.75))*F+0.984375)+H
}}}},easeInOutBounce:function(G,F,H,I,J){if(F<J/2){return jQuery.easing.easeInBounce(G,F*2,0,I,J)*0.5+H
}return jQuery.easing.easeOutBounce(G,F*2-J,0,I,J)*0.5+I*0.5+H
}});