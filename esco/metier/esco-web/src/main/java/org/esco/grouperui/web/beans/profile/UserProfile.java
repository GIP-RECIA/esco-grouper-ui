package org.esco.grouperui.web.beans.profile;

import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;

/**
 * Class corresponding to one profile in the ESCOGrouper application.
 * Requirement(s): [RECIA-ESCO-L2-008], [RECIA-ESCO-L2-009]
 * 
 * @author aChesneau
 */
@XmlRootElement
public class UserProfile implements InitializingBean {

    /**
     * The name of the profile.
     */
    private String                  name;

    /**
     * List of the property of the profile.
     */
    private Map < String, Boolean > functions = null;

    /**
     * Get the functions property.
     * 
     * @return the functions
     */
    public Map < String, Boolean > getFunctions() {
        return this.functions;
    }

    /**
     * Setter of the functions property.
     * 
     * @param theFunctions
     *            the functions to set
     */
    public void setFunctions(final Map < String, Boolean > theFunctions) {
        this.functions = theFunctions;
    }

    /**
     * Get the name property.
     * 
     * @return the name
     */
    public String getName() {
        return this.name;
    }

    /**
     * Setter of the name property.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.name = theName;
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (StringUtils.isEmpty(this.name)) {
            throw new IllegalArgumentException("the property name can not be null or empty.");
        }
        if (this.functions == null) {
            throw new IllegalArgumentException("the property functions can not be null.");
        }
        if (this.functions.isEmpty()) {
            throw new IllegalArgumentException("the property functions can not be empty.");
        }
    }
}
