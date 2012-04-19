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
package org.esco.grouperui.web.controllers;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.apache.myfaces.portlet.PortletUtil;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.beans.User;
import org.esco.grouperui.web.beans.profile.UsersProfileContainer;
import org.esco.grouperui.web.plugins.TabInfo;
import org.esco.grouperui.web.plugins.TabsControllerAggregator;
import org.esco.grouperui.web.utils.XmlProducer;
import org.esupportail.commons.web.controllers.ExceptionController;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * Class SessionController. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class SessionController implements InitializingBean, Serializable, ApplicationContextAware {

    /**
     * the serial uid.
     */
    private static final long                serialVersionUID   = -8036073846560178035L;
    /**
     * the id of spring declaration.
     */
    private static final String              TABS_CONTROLLER_ID = "sessionController";

    /** The person. */
    private User                             user;
    /** The version. */
    private String                           version;
    /** The menu entries . */
    private List < TabInfo >                 menuEntries;
    /** spring application context. */
    private ApplicationContext               applicationContext;
    /** The map of all profile. */
    private UsersProfileContainer            allUsersProfile;

    /**
     * The profil of the connected user
     */
    private String                           profileOfConnectedUser;

    /** wrapper for generate json from obejct. */
    private IWrapper < XmlProducer, String > jsonWrapper;

    /**
     * The exception controller (called when logging in/out).
     */
    @SuppressWarnings("unused")
    private ExceptionController              exceptionController;

    /**
     * Default constructor.
     */
    public SessionController() {
    }

    /**
     * Get the user profile in the json format.
     * 
     * @return The json of the profile of the user connected.
     */
    public String getJsonProfile() {
        if (StringUtils.isEmpty(this.profileOfConnectedUser)) {
            if (StringUtils.isNotEmpty(this.getProfil())) {
                if (this.allUsersProfile.getListOfProfiles().containsKey(this.getProfil())) {
                    this.profileOfConnectedUser = this.getProfil();
                } else {
                    this.profileOfConnectedUser = this.allUsersProfile.getDefaultProfile();
                }
            } else {
                this.profileOfConnectedUser = this.allUsersProfile.getDefaultProfile();
            }
        }
        XmlProducer producer = new XmlProducer();
        producer.setTarget(this.allUsersProfile.getListOfProfiles().get(this.profileOfConnectedUser));
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * Get the json mapping between key of profile and urls.
     * 
     * @return The json of the mapping.
     */
    public String getJsonUrlMapping() {
        XmlProducer producer = new XmlProducer();
        producer.setTarget(this.allUsersProfile.getListOfUrlsProfiles());
        return this.jsonWrapper.wrap(producer);
    }

    /**
     * Get the functions of the profile.
     * 
     * @return The map of functions of the profile.
     */
    public Map < String, Boolean > getProfileInfo() {
        if (StringUtils.isEmpty(this.profileOfConnectedUser)) {
            if (StringUtils.isNotEmpty(this.getProfil())) {
                if (this.allUsersProfile.getListOfProfiles().containsKey(this.getProfil())) {
                    this.profileOfConnectedUser = this.getProfil();
                } else {
                    this.profileOfConnectedUser = this.allUsersProfile.getDefaultProfile();
                }
            } else {
                this.profileOfConnectedUser = this.allUsersProfile.getDefaultProfile();
            }
        }
        return this.allUsersProfile.getListOfProfiles().get(this.profileOfConnectedUser).getFunctions();
    }

    /**
     * Setter of the allUsersProfile property.
     * 
     * @param theAllUsersProfile
     *            the allUsersProfile to set
     */
    public void setAllUsersProfile(final UsersProfileContainer theAllUsersProfile) {
        this.allUsersProfile = theAllUsersProfile;
    }

    /**
     * @return true if running as a portlet.
     */
    public static boolean isPortlet() {
        return PortletUtil.isPortletRequest(FacesContext.getCurrentInstance());
    }

    /**
     * @return true if running as a servlet.
     */
    public boolean getIsServlet() {
        return !SessionController.isPortlet();
    }

    /**
     * @return
     */
    public void logout() {

    }

    /**
     * Getter for userBean.
     * 
     * @return the userBean to get.
     */
    public final User getUser() {
        if (this.user == null) {
            this.user = EscoSecurityContext.getUserSecurity();
        }
        return this.user;
    }

    /**
     * Getter for userBean.
     * 
     * @return the userBean to get.
     */
    public final String getProfil() {
        String profile = null;
        if (this.user == null) {
            this.user = EscoSecurityContext.getUserSecurity();
        }
        if (StringUtils.isEmpty(this.user.getProfil())) {
            profile = this.allUsersProfile.getDefaultProfile();
        } else {
            profile = this.user.getProfil();
        }
        return profile;
    }

    /**
     * Setter for userBean.
     * 
     * @param theUser
     *            the userBean to set.
     */
    public void setUser(final User theUser) {
        this.user = theUser;
    }

    /**
     * Getter for local.
     * 
     * @return the local to get.
     */
    public final Locale getLocale() {
        if (this.getUser() == null) {
            return Locale.FRENCH;
        }
        return this.getUser().getLocale();
    }

    /**
     * @param exceptionController
     *            the exceptionController to set
     */
    public void setExceptionController(final ExceptionController exceptionController) {
        this.exceptionController = exceptionController;
    }

    /**
     * getter for property version.
     * 
     * @return the version
     */
    public String getVersion() {
        return this.version;
    }

    /**
     * setter for property version.
     * 
     * @param theVersion
     *            the version to set
     */
    public void setVersion(final String theVersion) {
        this.version = theVersion;
    }

    /**
     * getter for all tabinfo which construct general menu.
     * 
     * @return all tabinfo which construct general menu.
     */
    public List < TabInfo > getTabs() {
        return this.menuEntries;
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {

        // find all bean according to this group bean.
        List < String > tabsControllers = TabsControllerAggregator.getChild(SessionController.TABS_CONTROLLER_ID);

        for (String idController : tabsControllers) {

            TabInfo tabInfo = (TabInfo) this.applicationContext.getBean(idController);

            if (this.menuEntries == null) {
                this.menuEntries = new ArrayList < TabInfo >();
            }

            this.menuEntries.add(tabInfo);
        }

        // initialise user. eliminates a vulnerability in the resumed session on
        // browser that have tabs.
        this.user = null;
    }

    /**
     * setter for property applicationContext.
     * 
     * @param theApplicationContext
     *            the applicationContext to set
     */
    public void setApplicationContext(final ApplicationContext theApplicationContext) {
        this.applicationContext = theApplicationContext;
    }

    /**
     * Setter of the jsonWrapper property.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

    /**
     * Setter of the profileOfConnectedUser property.
     * 
     * @param theProfileOfConnectedUser
     *            the profileOfConnectedUser to set
     */
    public void setProfileOfConnectedUser(final String theProfileOfConnectedUser) {
        if (this.allUsersProfile.getListOfProfiles().containsKey(theProfileOfConnectedUser)) {
            this.profileOfConnectedUser = theProfileOfConnectedUser;
        } else {
            this.profileOfConnectedUser = this.allUsersProfile.getDefaultProfile();
        }
    }

    /**
     * Get the application context.
     * 
     * @return The application context.
     */
    public String getApplicationContext() {
        return PropertyManager.find("applicationContext").deType(String.class);
    }

}
