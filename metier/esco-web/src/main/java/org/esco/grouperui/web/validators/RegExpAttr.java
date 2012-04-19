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
package org.esco.grouperui.web.validators;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.esco.grouperui.web.utils.I18nAdapter;

/**
 * @author oFages
 */
@XmlRootElement(name = "regexattr")
@XmlAccessorType(XmlAccessType.NONE)
public class RegExpAttr {

    /**
     * The regExp to apply.
     */
    @XmlElement(name = "regexp")
    private String regexp;
    /**
     * The message displayed when the regexp is not verified.
     */
    @XmlElement(name = "alertText")
    private String alertText;

    /**
     * Constructor.
     * 
     * @param theRegexp
     *            The regExp to apply.
     * @param theAlertText
     *            The message displayed when the regexp is not verified.
     */
    public RegExpAttr(final String theRegexp, final String theAlertText) {
        super();
        this.regexp = theRegexp;
        this.alertText = theAlertText;
    }

    /**
     * Getter for regexp.
     * 
     * @return the regexp to get.
     */
    public final String getRegexp() {
        return this.regexp;
    }

    /**
     * Setter for regexp.
     * 
     * @param theRegexp
     *            the regexp to set.
     */
    public final void setRegexp(final String theRegexp) {
        this.regexp = theRegexp;
    }

    /**
     * Getter for alertText.
     * 
     * @return the alertText to get.
     */
    @XmlJavaTypeAdapter(value = I18nAdapter.class)
    public final String getAlertText() {
        return this.alertText;
    }

    /**
     * Setter for alertText.
     * 
     * @param theAlertText
     *            the alertText to set.
     */
    public final void setAlertText(final String theAlertText) {
        this.alertText = theAlertText;
    }

}
