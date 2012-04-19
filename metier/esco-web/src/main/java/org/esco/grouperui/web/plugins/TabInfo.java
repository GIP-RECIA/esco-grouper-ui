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

import java.io.Serializable;

/**
 * @author dMoulron
 */
public class TabInfo implements Serializable {

    /**
     * The serial uid.
     */
    private static final long serialVersionUID = 8366528511870852576L;

    /**
     * Id of the tab.
     */
    private String            idTab;
    /**
     * The label for the tab.
     */
    private String            name;
    /**
     * The title for the tab.
     */
    private String            title;
    /**
     * The url for the tab.
     */
    private String            url;
    /**
     * The icon for the tab.
     */
    private String            icone;
    /**
     * The regexp to compute if the tab is present.
     */
    private String            regpresent;

    /**
     * true if this tab must be present.
     */
    private Boolean           tabpresent;
    /**
     * The regexp to compute if tab data is present in resume.
     */
    private String            regresume;

    /**
     * true if this tab must be rpesent in summary.
     */
    private Boolean           resume;
    /**
     * Order is a enum LAST, FIRST, NONE.
     */
    private String            order;
    /**
     * list of descated tab.
     */
    private String            desactivate;

    /**
     * Default constructor.
     */
    public TabInfo() {
    }

    /**
     * getter for property name.
     * 
     * @return the name
     */
    public String getName() {
        return this.name;
    }

    /**
     * setter for property name.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.name = theName;
    }

    /**
     * getter for property title.
     * 
     * @return the title
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * setter for property title.
     * 
     * @param theTitle
     *            the title to set
     */
    public void setTitle(final String theTitle) {
        this.title = theTitle;
    }

    /**
     * getter for property url.
     * 
     * @return the url
     */
    public String getUrl() {
        return this.url;
    }

    /**
     * setter for property url.
     * 
     * @param theUrl
     *            the url to set
     */
    public void setUrl(final String theUrl) {
        this.url = theUrl;
    }

    /**
     * getter for property icone.
     * 
     * @return the icone
     */
    public String getIcone() {
        return this.icone;
    }

    /**
     * setter for property icone.
     * 
     * @param theIcone
     *            the icone to set
     */
    public void setIcone(final String theIcone) {
        this.icone = theIcone;
    }

    /**
     * getter for property regpresent.
     * 
     * @return the regpresent
     */
    public String getRegpresent() {
        return this.regpresent;
    }

    /**
     * getter for property regpresent.
     * 
     * @return the regpresent
     */
    public boolean getisPresent() {
        return this.tabpresent;
    }

    /**
     * setter for property regpresent.
     * 
     * @param theRegpresent
     *            the regpresent to set
     */
    public void setRegpresent(final String theRegpresent) {
        this.regpresent = theRegpresent;
    }

    /**
     * setter for property tabpresent.
     * 
     * @param theTabpresent
     *            the tabpresent to set
     */
    public void setTabpresent(final Boolean theTabpresent) {
        this.tabpresent = theTabpresent;
    }

    /**
     * getter for property regresume.
     * 
     * @return the regresume
     */
    public boolean getIsResume() {
        return this.resume;
    }

    /**
     * setter for property resume.
     * 
     * @param theResume
     *            the resume to set
     */
    public void setResume(final Boolean theResume) {
        this.resume = theResume;
    }

    /**
     * getter for property regresume.
     * 
     * @return the regresume
     */
    public String getRegresume() {
        return this.regresume;
    }

    /**
     * setter for property regresume.
     * 
     * @param theRegresume
     *            the regresume to set
     */
    public void setRegresume(final String theRegresume) {
        this.regresume = theRegresume;
    }

    /**
     * getter for property order.
     * 
     * @return the order
     */
    public String getOrder() {
        return this.order;
    }

    /**
     * setter for property order.
     * 
     * @param theOrder
     *            the order to set
     */
    public void setOrder(final String theOrder) {
        this.order = theOrder;
    }

    /**
     * getter for property idTab.
     * 
     * @return the idTab
     */
    public String getIdTab() {
        return this.idTab;
    }

    /**
     * setter for property idTab.
     * 
     * @param theIdTab
     *            the idTab to set
     */
    public void setIdTab(final String theIdTab) {
        this.idTab = theIdTab;
    }

    /**
     * getter for property desactivate.
     * 
     * @return the desactivate
     */
    public String getDesactivate() {
        return this.desactivate;
    }

    /**
     * setter for property desactivate.
     * 
     * @param theDesactivate
     *            the desactivate to set
     */
    public void setDesactivate(final String theDesactivate) {
        this.desactivate = theDesactivate;
    }

}
