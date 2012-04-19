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
package org.esco.grouperui.web.beans.group;

/**
 * Class DynamicGroup. Requirement(s) : [RECIA-ESCO-L1-009], [RECIA-ESCO-L1-010]
 * 
 * @author Sopra Group
 */
public class RadioButtonItem {

    /**
     *
     */
    private static final long serialVersionUID = -192801199680436262L;

    /** The list of use contexts associated to the custom type. */
    private String            contexts;
    /** the label of this line in radio button. */
    private String            label;
    /** he name of the radio button. */
    private String            value;
    /** selected (boolean). */
    private boolean           disabled;

    /**
     * @param theValue
     *            the name of the radio button
     * @param theLabel
     *            label
     * @param theDisabled
     *            selected (boolean)
     */
    public RadioButtonItem(final String theValue, final String theLabel, final boolean theDisabled) {
        this.value = theValue;
        this.disabled = theDisabled;
        this.label = theLabel;
    }

    /**
     * @param theValue
     *            the name of the radio button
     * @param theLabel
     *            label
     * @param theDisabled
     *            selected (boolean)
     * @param theContexts
     *            contexts associated to the custom type
     */
    public RadioButtonItem(final String theValue, final String theLabel, final boolean theDisabled,
            final String theContexts) {
        this.value = theValue;
        this.disabled = theDisabled;
        this.label = theLabel;
        this.contexts = theContexts;
    }

    /**
     * setter of property contexts.
     * 
     * @param contexts
     *            the contexts to set
     */
    public void setContexts(final String contexts) {
        this.contexts = contexts;
    }

    /**
     * getter of property contexts.
     * 
     * @return the contexts
     */
    public String getContexts() {
        return this.contexts;
    }

    /**
     * getter for property label.
     * 
     * @return the label
     */
    public String getLabel() {
        return this.label;
    }

    /**
     * setter for property label.
     * 
     * @param theLabel
     *            the label to set
     */
    public void setLabel(final String theLabel) {
        this.label = theLabel;
    }

    /**
     * getter for property value.
     * 
     * @return the value
     */
    public String getValue() {
        return this.value;
    }

    /**
     * setter for property value.
     * 
     * @param theValue
     *            the value to set
     */
    public void setValue(final String theValue) {
        this.value = theValue;
    }

    /**
     * getter for property disabled.
     * 
     * @return the disabled
     */
    public boolean isDisabled() {
        return this.disabled;
    }

    /**
     * getter for property disabled.
     * 
     * @return the disabled
     */
    public boolean getDisabled() {
        return this.disabled;
    }

    /**
     * setter for property disabled.
     * 
     * @param theDisabled
     *            the disabled to set
     */
    public void setDisabled(final boolean theDisabled) {
        this.disabled = theDisabled;
    }

}
