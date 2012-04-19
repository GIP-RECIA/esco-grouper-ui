#! /bin/bash
# fichiers java
fileType="*.java";
fileCopyright=header_java.txt;
echo "------------"
echo "Fichiers type a ajouter le copyright $fileType "
echo "Fichier du copyright $fileCopyright"
dirF=`find . -name $fileType`
for dir in $dirF
do
   echo "Concatenation du copyrigth dans $dir "
   (cat $fileCopyright; echo; cat $dir) >$dir."bis"
   #echo "Ajout effectue"
   #echo "Suppression du fichier d'origine $dir"
   rm $dir
   #echo "Renommage du fichier concatene $dir.bis en $dir"
   mv $dir."bis" $dir
done
echo "--------------"

# fichiers jsp
fileType="*.jsp";
fileCopyright=header_jsp.txt;
echo "------------"
echo "Fichiers type a ajouter le copyright $fileType "
echo "Fichier du copyright $fileCopyright"
dirF=`find . -name $fileType`
for dir in $dirF
do
   echo "Concatenation du copyrigth dans $dir "
   (cat $fileCopyright; echo; cat $dir) >$dir."bis"
   #echo "Ajout effectue"
   #echo "Suppression du fichier d'origine $dir"
   rm $dir
   #echo "Renommage du fichier concatene $dir.bis en $dir"
   mv $dir."bis" $dir
done
echo "--------------"

# fichiers html
fileType="*.html";
fileCopyright=header_html.txt;
echo "------------"
echo "Fichiers type a ajouter le copyright $fileType "
echo "Fichier du copyright $fileCopyright"
dirF=`find ./metier/ -name $fileType`
for dir in $dirF
do
   echo "Concatenation du copyrigth dans $dir "
   (cat $fileCopyright; echo; cat $dir) >$dir."bis"
   #echo "Ajout effectue"
   #echo "Suppression du fichier d'origine $dir"
   rm $dir
   #echo "Renommage du fichier concatene $dir.bis en $dir"
   mv $dir."bis" $dir
done
echo "--------------"

# fichiers js
fileType="*.js";
fileCopyright=header_js.txt;
echo "------------"
echo "Fichiers type a ajouter le copyright $fileType "
echo "Fichier du copyright $fileCopyright"
dirF=`find ./metier/esco-web/src/web/webapp/media/js/esco/ -name $fileType`
for dir in $dirF
do
   echo "Concatenation du copyrigth dans $dir "
   (cat $fileCopyright; echo; cat $dir) >$dir."bis"
   #echo "Ajout effectue"
   #echo "Suppression du fichier d'origine $dir"
   rm $dir
   #echo "Renommage du fichier concatene $dir.bis en $dir"
   mv $dir."bis" $dir
done
dirF=`find ./metier/esco-module/dynamique-groupe/src/web/webapp/media/js/esco/ -name $fileType`
for dir in $dirF
do
   echo "Concatenation du copyrigth dans $dir "
   (cat $fileCopyright; echo; cat $dir) >$dir."bis"
   #echo "Ajout effectue"
   #echo "Suppression du fichier d'origine $dir"
   rm $dir
   #echo "Renommage du fichier concatene $dir.bis en $dir"
   mv $dir."bis" $dir
done
echo "--------------"
echo "fin"
