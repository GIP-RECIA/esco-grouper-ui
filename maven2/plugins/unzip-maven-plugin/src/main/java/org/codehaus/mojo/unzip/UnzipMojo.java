package org.codehaus.mojo.unzip;

/*
 * The MIT License
 *
 * Copyright (c) 2004, The Codehaus
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import java.io.File;

import org.apache.maven.artifact.DefaultArtifact;
import org.apache.maven.artifact.handler.ArtifactHandler;
import org.apache.maven.artifact.handler.DefaultArtifactHandler;
import org.apache.maven.artifact.repository.ArtifactRepository;
import org.apache.maven.artifact.versioning.VersionRange;
import org.apache.maven.model.Dependency;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;

/**
 * Add more source directories to the POM.
 * 
 * @goal unzip-artifacts
 * @phase generate-sources
 * @author <a href="dantran@gmail.com">Dan T. Tran</a>
 * @version $Id: AddSourceMojo.java 6707 2008-04-07 00:56:07Z dantran $
 * @since 1.0
 */
public class UnzipMojo extends AbstractMojo
{

    /**
     * Additional source directories.
     * 
     * @parameter
     * @required
     */
    private String unzipSource;

    /**
     * Additional source directories.
     * 
     * @parameter
     * @required
     */
    private Dependency[] dependencies;

    /**
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;

    /**
     * @parameter default-value="${localRepository}"
     * @required
     * @readonly
     */
    private ArtifactRepository localRepository;

    public void execute() throws MojoExecutionException
    {
        for (int i = 0; i < dependencies.length; ++i)
        {
            VersionRange versionRange = VersionRange.createFromVersion(dependencies[i].getVersion());
            ArtifactHandler artifactHandler = new DefaultArtifactHandler(dependencies[i].getType());

            DefaultArtifact artifact = new DefaultArtifact(dependencies[i].getGroupId(), dependencies[i]
                            .getArtifactId(), versionRange, dependencies[i].getScope(), dependencies[i].getType(),
                            dependencies[i].getClassifier(), artifactHandler);

            File artifactFile = new File(localRepository.getBasedir(), localRepository.pathOf(artifact));
            File targetUnCompress = new File(this.project.getBuild().getDirectory() + File.separatorChar
                            + this.unzipSource);

            this.getLog().info(
                            "Unzip file '" + artifactFile.getAbsolutePath() + "' to directory  '"
                                            + targetUnCompress.getAbsolutePath() + "'.");
            try
            {
                if (!targetUnCompress.exists())
                {
                    this.getLog().debug("Create directory : " + targetUnCompress.getAbsolutePath());
                    targetUnCompress.mkdirs();
                }
                ZipManager.unzip(artifactFile, targetUnCompress.getAbsolutePath());
            } catch (Exception e)
            {
                e.printStackTrace();
                this.getLog().error(
                                "le fichier à décompresser : " + artifactFile.getAbsolutePath()
                                                + " ne peut pas être décompréssé");

            }
        }
    }
}
