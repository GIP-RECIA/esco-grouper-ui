for fic in $*
do
   mv ${fic} ${fic}_old
   sed -e 's/�/\&eacute;/g' ${fic}_old \
   | sed -e 's/�/\&egrave;/g' \
   | sed -e 's/�/\&ecirc;/g' \
   | sed -e 's/�/\&euml;/g' \
   | sed -e 's/�/\&agrave;/g' \
   | sed -e 's/�/\&acirc;/g' \
   | sed -e 's/�/\&iuml;/g' \
   | sed -e 's/�/\&icirc;/g' \
   | sed -e 's/�/\&ugrave;/g' \
   | sed -e 's/�/\&ucirc;/g' \
   | sed -e 's/�/\&uuml;/g' \
   | sed -e 's/�/\&ocirc;/g' \
   | sed -e 's/�/\&ccedil;/g' \
   | sed -e 's/�/\&Eacute;/g' \
   | sed -e 's/�/\&Egrave;/g' \
   | sed -e 's/�/\&Ecirc;/g' \
   | sed -e 's/�/\&Euml;/g' \
   | sed -e 's/�/\&Agrave;/g' \
   | sed -e 's/�/\&Acirc;/g' \
   | sed -e 's/�/\&Iuml;/g' \
   | sed -e 's/�/\&Icirc;/g' \
   | sed -e 's/�/\&Ugrave;/g' \
   | sed -e 's/�/\&Ucirc;/g' \
   | sed -e 's/�/\&Uuml;/g' \
   | sed -e 's/�/\&Ocirc;/g' \
   | sed -e 's/�/\&Ccedil;/g' > ${fic}
done

