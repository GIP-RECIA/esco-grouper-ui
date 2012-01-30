package org.esco.grouperui.web.beans.profile;

import java.util.Map;
import java.util.Map.Entry;

import org.esco.grouperui.tools.property.PropertyManager;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author aChesneau
 */
public class UserProfileUrlMappingAggregator implements InitializingBean {

    /**
     * The profiles to add to the UsersProfileContainer
     */
    private Map < String, String > listMappings;

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {

        if (this.listMappings == null) {
            throw new IllegalArgumentException("the property listMappings can not be null.");
        }
        if (this.listMappings.isEmpty()) {
            throw new IllegalArgumentException("the property listMappings can not be empty.");
        }
        for (Entry < String, String > urlMapping : this.listMappings.entrySet()) {
            String prefix = "/";
            if (urlMapping.getKey().substring(0, 1).equals("/")) {
                prefix += PropertyManager.find("applicationContext").deType(String.class);
            } else {
                prefix += PropertyManager.find("applicationContext").deType(String.class) + "/";
            }
            UsersProfileContainer.addUrlMapping(prefix + urlMapping.getKey(), urlMapping.getValue());
        }
    }

    /**
     * Setter of the listMappings property.
     * 
     * @param theListMappings
     *            the listMappings to set
     */
    public void setListMappings(final Map < String, String > theListMappings) {
        this.listMappings = theListMappings;
    }

}
