package org.esco.grouperui.web.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlValue;

/**
 * Class XMLResultString. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author oFages
 */
@XmlRootElement(name = "result")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class XMLResultString {

    /**
     * The result.
     */
    private String result;

    /**
     * Default constructor.
     */
    public XMLResultString() {
    }

    /**
     * minimal constructor.
     * 
     * @param theResult
     *            the result to be set
     */
    public XMLResultString(final String theResult) {
        this.result = theResult;
    }

    /**
     * getter for property result.
     * 
     * @return the result
     */
    @XmlValue
    public String getResult() {
        return this.result;
    }
}
