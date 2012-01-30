package org.esco.grouperui.web.validators;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author oFages
 */
@XmlRootElement(name = "elements")
public class RegExp {

    /**
     * The name of the attribute.
     */
    private String     name;

    /**
     * The regExp associated to the attribute.
     */
    private RegExpAttr regExpAttr;

    /**
     * Constructor.
     * 
     * @param theName
     *            The name of the attribute.
     * @param theRegExpAttr
     *            The regExp associated to the attribute.
     */
    public RegExp(final String theName, final RegExpAttr theRegExpAttr) {
        super();
        this.name = theName;
        this.regExpAttr = theRegExpAttr;
    }

    /**
     * Getter for name.
     * 
     * @return the name to get.
     */
    public final String getName() {
        return this.name;
    }

    /**
     * Setter for name.
     * 
     * @param theName
     *            the name to set.
     */
    public final void setName(final String theName) {
        this.name = theName;
    }

    /**
     * Getter for regExpAttr.
     * 
     * @return the regExpAttr to get.
     */
    @XmlElement(name = "regexattr")
    public final RegExpAttr getRegExpAttr() {
        return this.regExpAttr;
    }

    /**
     * Setter for regExpAttr.
     * 
     * @param theRegExpAttr
     *            the regExpAttr to set.
     */
    public final void setRegExpAttr(final RegExpAttr theRegExpAttr) {
        this.regExpAttr = theRegExpAttr;
    }

}
