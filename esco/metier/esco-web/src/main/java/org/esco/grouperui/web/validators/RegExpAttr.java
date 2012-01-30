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
