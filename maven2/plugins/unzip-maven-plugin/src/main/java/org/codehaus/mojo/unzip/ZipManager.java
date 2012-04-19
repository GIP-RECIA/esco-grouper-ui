/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.codehaus.mojo.unzip;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.zip.Deflater;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public class ZipManager
{

    // Taille du buffer (la même que la taille par défaut définie dans
    // BufferedInputStream)
    private static final int BUFFER = 8192;

    /**
     * 
     * @param in stream source
     * @param out strem cible
     * @throws IOException dans le cas d'erreur lors de la copie des donn�es d'un stream � un autre
     */
    public static final void copyInputStream(InputStream in, OutputStream out) throws IOException
    {
        byte[] buffer = new byte[BUFFER];
        int len;

        while ((len = in.read(buffer)) >= 0)
            out.write(buffer, 0, len);

        in.close();
        out.close();
    }

    /**
     * @param afile nom du zip � d�compresser
     * @param location chemin ou d�compresser
     * @return liste des fichier descompresser
     * @throws Exception dans le cas d'erreur lors du dezippage
     */
    public static final List unzip(File afile, String location) throws Exception
    {
        ArrayList files = new ArrayList();

        Enumeration entries = null;
        ZipFile zipFile;

        try
        {
            zipFile = new ZipFile(afile);

            entries = zipFile.entries();

            while (entries.hasMoreElements())
            {
                ZipEntry entry = (ZipEntry) entries.nextElement();

                if (entry.isDirectory()) // PAS DANS GEOSOURCE
                {

                    try
                    {
                        (new File(location + File.separator + entry.getName())).mkdir();
                    } catch (RuntimeException e)
                    {
                    }

                    continue;
                }

                String newFilename = location + File.separator + entry.getName();
                File newFile = new File(newFilename);
                if (newFile.exists())
                    newFile.delete();

                copyInputStream(zipFile.getInputStream(entry), new BufferedOutputStream(new FileOutputStream(
                                newFilename)));
                files.add(new File(newFilename));
            }

            zipFile.close();

        } catch (IOException ioe)
        {
            System.err.println("Unhandled exception:");
            ioe.printStackTrace();
            throw ioe;

        }
        return files;
    }

    /**
     * Compresse les fichiers passés en paramètre dans fichier Zip dont on donne le path (et le nom complet bien
     * entendu avec l'extension qui doit être .zip)
     * 
     * @param files les fichiers � compresser
     * @param zipPath le chemin du fichier cible
     * @return le fichier Zip créé
     * @throws IOException si une erreur apparait lors de la compression
     */
    public static File zipFiles(List files, String zipPath) throws IOException
    {
        byte[] data = new byte[BUFFER];

        try
        {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(zipPath));
            // Création du fichier Zip
            ZipOutputStream zos = new ZipOutputStream(bos);
            // Méthode de compression
            zos.setMethod(ZipOutputStream.DEFLATED);
            // Taux de compression (entre min = 0 et max = 9)
            zos.setLevel(9);
            // Fichiers à compresser
            for (Iterator iter = files.iterator(); iter.hasNext();)
            {
                File element = (File) iter.next();

                BufferedInputStream bis = new BufferedInputStream(new FileInputStream(element));
                // Création d'une entrée Zip
                ZipEntry zip = new ZipEntry(element.getName());
                // Affectation de cette entrée au flux de sortie
                zos.putNextEntry(zip);
                // Ecriture du buffer sur le fichier dans l'archive Zip
                int count = bis.read(data, 0, BUFFER);
                while (count != -1)
                {
                    zos.write(data, 0, count);
                    count = bis.read(data, 0, BUFFER);
                }
                zos.closeEntry();
                bis.close();
            }
            zos.close();
            return new File(zipPath);
        } catch (FileNotFoundException fnf)
        {
            throw fnf;
        } catch (IOException io)
        {
            throw io;
        }
    }

    /**
     * Archive un répertoire dans un zip
     * 
     * @param directory nom du répertoire
     * @param zipName nom de l'archive
     * @param root fichier root
     */
    public static void zipDirectory(String directory, String zipName, String root)
    {
        try
        {
            ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(zipName));
            zip.setMethod(ZipOutputStream.DEFLATED);
            zip.setLevel(Deflater.BEST_COMPRESSION);

            File dataDirectories = new File(directory);
            zipDirectory(dataDirectories, zip, new File(root).getAbsolutePath());
            zip.close();
        } catch (FileNotFoundException fileNotFound)
        {
        } catch (IOException io)
        {
        }
    }

    /**
     * Fonction r�cursive pour zipper une arborescence
     * 
     * @param directory nom du répertoire
     * @param zip nom de l'archive
     * @param root fichier root
     * 
     */
    private static void zipDirectory(File directory, ZipOutputStream zip, String root)
    {
        String[] listFile = directory.list();
        for (int i = 0; i < listFile.length; i++)
        {
            try
            {
                File file = new File(directory.getPath() + "/" + listFile[i]);
                if (file.isDirectory())
                    zipDirectory(file, zip, root);
                else
                {
                    FileInputStream in = new FileInputStream(file);
                    byte[] bytes = new byte[in.available()];
                    in.read(bytes);
                    in.close();

                    String filename = file.getPath();
                    if (file.getAbsolutePath().startsWith(root))
                    {
                        filename = file.getAbsolutePath().substring(root.length() + 1);
                    }
                    ZipEntry entry = new ZipEntry(filename);
                    entry.setTime(file.lastModified());
                    zip.putNextEntry(entry);
                    zip.write(bytes);
                    zip.closeEntry();
                }
            } catch (FileNotFoundException fileNotFound)
            {
            } catch (IOException io)
            {
            }
        }
    }

    /**
     * Dézippe une archive dans un répertoire Par sécurité tout le répertoire est supprimé
     * 
     * @param zipName le nom du fichier � dezipper
     * @param directory le r�pertoire ou le dezipper
     * @return la liste de tous les fichiers issue du dezippage
     */
    public static List unzipDirectory(String zipName, String directory)
    {

        List files = new ArrayList();
        try
        {

            ZipFile zipFile = new ZipFile(zipName);
            Enumeration entries = zipFile.entries();
            ZipEntry entry;
            File file;

            while (entries.hasMoreElements())
            {
                entry = (ZipEntry) entries.nextElement();
                file = new File(directory, entry.getName());

                if (entry.isDirectory())
                {
                    file.mkdirs();
                } else
                {
                    if (file.getParentFile() != null && !file.getParentFile().exists())
                    {
                        file.getParentFile().mkdirs();
                    }
                    int i = 0;
                    byte[] bytes = new byte[1024];
                    BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(file));
                    BufferedInputStream in = new BufferedInputStream(zipFile.getInputStream(entry));
                    while ((i = in.read(bytes)) != -1)
                    {
                        out.write(bytes, 0, i);
                    }
                    in.close();
                    out.flush();
                    out.close();
                    files.add(file);
                }
            }
            zipFile.close();
        } catch (FileNotFoundException fileNotFound)
        {
        } catch (IOException io)
        {
        }

        return files;
    }

    /**
     * Fonction récursive Suppression d'un répertoire
     * 
     * @param directory le r�pertoire � supprimer
     */
    public static void deleteAllFiles(File directory)
    {

        String[] listFile = directory.list();
        for (int i = 0; i < listFile.length; i++)
        {
            File file = new File(directory.getPath() + "/" + listFile[i]);
            if (file.isDirectory())
            {
                deleteAllFiles(file);
            } else if (file.exists())
                file.delete();
        }
        directory.delete();
    }

}
