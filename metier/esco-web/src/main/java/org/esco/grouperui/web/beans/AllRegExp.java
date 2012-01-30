package org.esco.grouperui.web.beans;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.esco.grouperui.web.validators.RegExp;

/**
 * @author oFages
 */
@XmlRootElement(name = "allRegExp")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class AllRegExp {

    /**
     * The list of validation regExps.
     */
    private List < RegExp > allRegExp;

    /**
     * Default constructor.
     */
    public AllRegExp() {
    }

    /**
     * minimal constructor.
     * 
     * @param theAllRegExp
     *            the list of RegExp to be set
     */
    public AllRegExp(final List < RegExp > theAllRegExp) {
        super();
        this.allRegExp = theAllRegExp;
    }

    /**
     * Getter for allRegExp.
     * 
     * @return the allRegExp to get.
     */
    @XmlElement(name = "elements", type = RegExp.class)
    public final List < RegExp > getAllRegExp() {
        return this.allRegExp;
    }

}
