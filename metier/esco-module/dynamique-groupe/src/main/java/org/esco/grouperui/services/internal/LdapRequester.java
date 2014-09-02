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
package org.esco.grouperui.services.internal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.exceptions.business.ESCOLDAPBadRequestException;
import org.esco.grouperui.exceptions.technicals.ESCOLDAPArgumentIndexOutOfBoundException;
import org.esco.grouperui.exceptions.technicals.ESCOLDAPNotEnoughArgumentException;
import org.esco.grouperui.services.ILdapRequester;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esupportail.commons.services.ldap.LdapEntity;
import org.esupportail.commons.services.ldap.SimpleLdapEntityServiceImpl;
import org.springframework.ldap.core.LdapTemplate;

/**
 * Service class to request LDAP.<br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author raBesnard
 */
public class LdapRequester implements ILdapRequester {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger          LOGGER               = ESCOLoggerFactory
                                                                           .getLogger(LdapRequester.class);

    /** Regexp used to replace parameter in request. */
    private static final String               REGEXP_QUESTION_MARK = "\\?";

    /** Character used to replace parameter in request. */
    private static final char                 CHAR_QUESTION_MARK   = '?';

    /** Id attribute for LDAP service. */
    private static final String               ID_ATTRIBUTE         = "uid";

    /**
     * The SimpleLdapEntityServiceImpl used to request LDAP.
     */
    private final SimpleLdapEntityServiceImpl ldapEntityService;

    /**
     * The LdapTemplate that provide services from LDAP. This attribute is
     * instanced by Spring (see /properties/ldap/ldap.xml). It used to
     * initialize SimpleLdapEntityService.
     */
    private LdapTemplate                      ldapTemplate;

    /** The LDAP request to execute. */
    private String                            request;

    /** The map that contains request parameters. */
    private Map < Integer, String >           parameters;

    /** The List of attributes that the request musts return. */
    private List < String >                   attributes;

    /** The objectClass wanted by the request. */
    private String                            objectClass;

    /**
     * Default constructor.
     */
    public LdapRequester() {
        this.ldapEntityService = new SimpleLdapEntityServiceImpl();

        // parameters is a TreeMap because indexes must
        // be order
        this.parameters = new TreeMap < Integer, String >();
        this.request = null;
        this.attributes = null;
        this.objectClass = null;
    }

    /**
     * Getter of property request.
     * 
     * @return the request
     */
    protected String getRequest() {
        return this.request;
    }

    /**
     * Getter of property attributes.
     * 
     * @return the attributes
     */
    protected List < String > getAttributes() {
        return this.attributes;
    }

    /**
     * Getter of property ldapTemplate.
     * 
     * @return the ldapTemplate
     */
    public LdapTemplate getLdapTemplate() {
        return this.ldapTemplate;
    }

    /**
     * Setter of property ldapTemplate.
     * 
     * @param theLdapTemplate
     *            the ldapTemplate to set
     */
    public void setLdapTemplate(final LdapTemplate theLdapTemplate) {
        this.ldapTemplate = theLdapTemplate;
    }

    /**
     * Set the LDAP request.
     * 
     * @param request
     *            request
     */
    public void prepareStatement(final String request) {
        // add open end close brackets
        this.request = request;
    }

    /**
     * Execute LDAP request and return list of result.
     * 
     * @return list of result
     * @throws ESCOLDAPBadRequestException
     *             if request is invalid
     */
    public List < LdapEntity > executeQuery() throws ESCOLDAPBadRequestException {
        List < LdapEntity > result = null;

        Validate.notNull(this.request, "The request is null.");

        this.prepareParameters();
        this.prepareLdapService();

        result = this.testAndExecuteQuery();

        return result;
    }

    /**
     * Test if request syntax is correct and in this case execute query.
     * 
     * @return result of query
     * @throws ESCOLDAPBadRequestException
     *             if request syntax is invalid
     */
    protected List < LdapEntity > testAndExecuteQuery() throws ESCOLDAPBadRequestException {
        List < LdapEntity > result;
        // test if request syntax is correct
        String errorMessage = this.ldapEntityService.testLdapFilter(this.request);
        if (null != errorMessage) {
            throw new ESCOLDAPBadRequestException(errorMessage);
        } else {
            // nothing to do
        }

        // execute request
        LdapRequester.LOGGER.debug("Request execute : " + this.request);
        result = this.ldapEntityService.getLdapEntitiesFromFilter(this.request);
        return result;
    }

    /**
     * Prepare LDAP service before to execute query.
     */
    protected void prepareLdapService() {
        // set attributes and objectClass
        this.ldapEntityService.setAttributes(this.attributes);
        this.ldapEntityService.setObjectClass(this.objectClass);
        // ldapTemplate is initialized by Spring
        this.ldapEntityService.setLdapTemplate(this.ldapTemplate);
        this.ldapEntityService.setIdAttribute(LdapRequester.ID_ATTRIBUTE);
        // DnSubPath null because not used
        this.ldapEntityService.setDnSubPath(null);
        // TestFilter null because not used
        this.ldapEntityService.setTestFilter(null);

        // test if LDAP service is OK
        this.ldapEntityService.afterPropertiesSet();
    }

    /**
     * Prepare parameters before to execute query.
     */
    protected void prepareParameters() {
        // check if number of question marks equals number of parameters
        int nbQuestionMark = 0;
        for (char car : this.request.toCharArray()) {
            if (car == LdapRequester.CHAR_QUESTION_MARK) {
                nbQuestionMark++;
            }
        }
        if (nbQuestionMark > this.parameters.size()) {
            throw new ESCOLDAPNotEnoughArgumentException("There is not enough argument.");
        } else {
            // nothing to do
        }

        // replacement of parameters
        int index;
        for (Integer key : this.parameters.keySet()) {
            // check if question mark exist
            index = key.intValue();
            if (index > 0 && index <= nbQuestionMark) {
                // replace question mark by the value
                this.request = this.request.replaceFirst(LdapRequester.REGEXP_QUESTION_MARK, this.parameters
                        .get(key));
            } else {
                throw new ESCOLDAPArgumentIndexOutOfBoundException("The argument " + key.intValue()
                        + " does not exist.");
            }
        }
    }

    /**
     * Affects the value to the parameter corresponding to the index.
     * 
     * @param index
     *            index of parameter
     * @param value
     *            value of parameter
     */
    public void setParameter(final int index, final String value) {
        this.parameters.put(Integer.valueOf(index), value);
    }

    /**
     * Affects the value to the first parameter that has not yet value.
     * 
     * @param value
     *            value of parameter
     */
    public void setParameter(final String value) {
        // seek the first index no used
        int newIndex = 1;
        for (Integer key : this.parameters.keySet()) {
            if (key.intValue() > 0 && key.intValue() > newIndex) {
                break;
            } else {
                newIndex++;
            }
        }
        this.parameters.put(newIndex, value);
    }

    /**
     * Affects the value of the map to the parameter whose index corresponds to
     * the key of the map.
     * 
     * @param parameters
     *            map of parameters for the request
     */
    public void setParameters(final Map < Integer, String > parameters) {
        if (null != parameters) {
            this.parameters = new TreeMap(parameters);
        } else {
            this.parameters = new TreeMap < Integer, String >();
        }
    }

    /**
     * Set attributes return by the request.
     * 
     * @param attributes
     *            list of attributes return by the request
     */
    public void setAttributes(final List < String > attributes) {
        if (null != attributes) {
            this.attributes = new ArrayList < String >(attributes);
        } else {
            this.attributes = null;
        }
    }

    /**
     * Set the object class.
     * 
     * @param objectClass
     *            objectClass used by the request
     */
    public void setObjectClass(final String objectClass) {
        this.objectClass = objectClass;
    }

    /**
     * Clear all data of the last request.
     */
    public void clear() {
        this.parameters.clear();
        this.attributes.clear();
        this.request = null;
        this.objectClass = null;
    }

}
