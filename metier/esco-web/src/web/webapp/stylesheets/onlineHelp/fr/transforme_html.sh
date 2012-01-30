for fic in $*
do
   mv ${fic} ${fic}_old
   sed -e 's/é/\&eacute;/g' ${fic}_old \
   | sed -e 's/è/\&egrave;/g' \
   | sed -e 's/ê/\&ecirc;/g' \
   | sed -e 's/ë/\&euml;/g' \
   | sed -e 's/à/\&agrave;/g' \
   | sed -e 's/â/\&acirc;/g' \
   | sed -e 's/ï/\&iuml;/g' \
   | sed -e 's/î/\&icirc;/g' \
   | sed -e 's/ù/\&ugrave;/g' \
   | sed -e 's/û/\&ucirc;/g' \
   | sed -e 's/ü/\&uuml;/g' \
   | sed -e 's/ô/\&ocirc;/g' \
   | sed -e 's/ç/\&ccedil;/g' \
   | sed -e 's/É/\&Eacute;/g' \
   | sed -e 's/È/\&Egrave;/g' \
   | sed -e 's/Ê/\&Ecirc;/g' \
   | sed -e 's/Ë/\&Euml;/g' \
   | sed -e 's/À/\&Agrave;/g' \
   | sed -e 's/Â/\&Acirc;/g' \
   | sed -e 's/Ï/\&Iuml;/g' \
   | sed -e 's/Î/\&Icirc;/g' \
   | sed -e 's/Ù/\&Ugrave;/g' \
   | sed -e 's/Û/\&Ucirc;/g' \
   | sed -e 's/Ü/\&Uuml;/g' \
   | sed -e 's/Ô/\&Ocirc;/g' \
   | sed -e 's/Ç/\&Ccedil;/g' > ${fic}
done

