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
package org.esco.grouperui.web.plugins;

import java.util.List;

import org.esupportail.commons.web.tags.config.TagsConfigurator;
import org.springframework.beans.factory.InitializingBean;

/**
 * Tags Configurator merger.
 * 
 * @author dMoulron
 */
public class TagsMerger implements InitializingBean {

    /**
     * Tags configurator that must be merge with scripts and stylsheets.
     */
    private TagsConfigurator tagsConfigurator;
    /**
     * list of new script to be add in original tagsConfigurator.
     */
    private List < String >  scripts;
    /**
     *list of new stylesheets to be add in original tagsConfigurator.
     */
    private List < String >  stylesheets;

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.tagsConfigurator == null) {
            throw new IllegalArgumentException("The property tagsConfigurator can not be null.");
        }

        if (this.scripts != null) {
            List < String > orignalsSripts = this.tagsConfigurator.getScripts();
            // add all new script
            orignalsSripts.addAll(this.scripts);
            this.tagsConfigurator.setScripts(orignalsSripts);
        }

        if (this.stylesheets != null) {
            List < String > orignalsStylesheets = this.tagsConfigurator.getStylesheets();
            // add all new script
            orignalsStylesheets.addAll(this.stylesheets);
            this.tagsConfigurator.setStylesheets(orignalsStylesheets);
        }
    }

    /**
     * setter for property tagsConfigurator.
     * 
     * @param theTagsConfigurator
     *            the tagsConfigurator to set
     */
    public void setTagsConfigurator(final TagsConfigurator theTagsConfigurator) {
        this.tagsConfigurator = theTagsConfigurator;
    }

    /**
     * setter for property scripts.
     * 
     * @param theScripts
     *            the scripts to set
     */
    public void setScripts(final List < String > theScripts) {
        this.scripts = theScripts;
    }

    /**
     * setter for property stylesheets.
     * 
     * @param theStylesheets
     *            the stylesheets to set
     */
    public void setStylesheets(final List < String > theStylesheets) {
        this.stylesheets = theStylesheets;
    }

}
