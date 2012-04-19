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

import java.util.HashMap;
import java.util.Map;

/**
 * Class witch contains all the different profiles existing in the ESCOGrouper
 * application. Requirement(s): [RECIA-ESCO-L2-008], [RECIA-ESCO-L2-009]
 * 
 * @author aChesneau
 */
public class UsersProfileContainer {

    /**
     * The list of all profile in the ESCOGrouper application.
     */
    private static Map < String, UserProfile > listOfProfiles     = new HashMap < String, UserProfile >();

    /**
     * The list of mapping between urls and property key.
     */
    private static Map < String, String >      listOfUrlsProfiles = new HashMap < String, String >();

    /**
     * The default profile to use.
     */
    private String                             defaultProfile;

    /**
     * Get the listOfProfiles property.
     * 
     * @return the listOfProfiles
     */
    public Map < String, UserProfile > getListOfProfiles() {
        return UsersProfileContainer.listOfProfiles;
    }

    /**
     * Setter of the listOfProfiles property.
     * 
     * @param theListOfProfiles
     *            the listOfProfiles to set
     */
    public static void setListOfProfiles(final Map < String, UserProfile > theListOfProfiles) {
        UsersProfileContainer.listOfProfiles = theListOfProfiles;
    }

    /**
     * Get the defaultProfile property.
     * 
     * @return the defaultProfile
     */
    public String getDefaultProfile() {
        return this.defaultProfile;
    }

    /**
     * Setter of the defaultProfile property.
     * 
     * @param theDefaultProfile
     *            the defaultProfile to set
     */
    public void setDefaultProfile(final String theDefaultProfile) {
        this.defaultProfile = theDefaultProfile;
    }

    /**
     * Get the listOfUrlsProfiles property.
     * 
     * @return the listOfUrlsProfiles
     */
    public Map < String, String > getListOfUrlsProfiles() {
        return UsersProfileContainer.listOfUrlsProfiles;
    }

    /**
     * Setter of the listOfUrlsProfiles property.
     * 
     * @param theListOfUrlsProfiles
     *            the listOfUrlsProfiles to set
     */
    public static void setListOfUrlsProfiles(final Map < String, String > theListOfUrlsProfiles) {
        UsersProfileContainer.listOfUrlsProfiles = theListOfUrlsProfiles;
    }

    /**
     * Add an url mapping or modify it if exist.
     * 
     * @param theUrl
     *            The url to map.
     * @param theKey
     *            The property key.
     */
    public static void addUrlMapping(final String theUrl, final String theKey) {
        UsersProfileContainer.listOfUrlsProfiles.put(theUrl, theKey);
    }

    /**
     * Add a profile or complete it if exists
     * 
     * @param theProfile
     *            The profile to add or complete
     */
    public static void addProfile(final UserProfile theProfile) {
        if (UsersProfileContainer.listOfProfiles.containsKey(theProfile.getName())) {
            Map < String, Boolean > theAttributes = UsersProfileContainer.listOfProfiles.get(theProfile.getName())
                    .getFunctions();

            Map < String, Boolean > theNewAttributes = theProfile.getFunctions();
            for (Map.Entry < String, Boolean > e : theNewAttributes.entrySet()) {
                theAttributes.put(e.getKey(), e.getValue());
            }
            theProfile.setFunctions(theAttributes);
        }
        UsersProfileContainer.listOfProfiles.put(theProfile.getName(), theProfile);
    }
}
