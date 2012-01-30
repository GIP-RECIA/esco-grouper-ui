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
