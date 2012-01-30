package org.esco.grouperui.web.beans.profile;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;

/**
 * Requirement(s): [RECIA-ESCO-L2-008], [RECIA-ESCO-L2-009]
 * 
 * @author aChesneau
 */
public class UserProfileAggregator implements InitializingBean {

    /**
     * The profiles to add to the UsersProfileContainer
     */
    private List < UserProfile > profiles;

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {

        if (this.profiles == null) {
            throw new IllegalArgumentException("the property profiles can not be null.");
        }
        if (this.profiles.isEmpty()) {
            throw new IllegalArgumentException("the property profiles can not be empty.");
        }
        for (UserProfile userProfile : this.profiles) {
            UsersProfileContainer.addProfile(userProfile);
        }
    }

    /**
     * Setter of the profiles property.
     * 
     * @param theProfiles
     *            the profiles to set
     */
    public void setProfiles(final List < UserProfile > theProfiles) {
        this.profiles = theProfiles;
    }

}
