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
