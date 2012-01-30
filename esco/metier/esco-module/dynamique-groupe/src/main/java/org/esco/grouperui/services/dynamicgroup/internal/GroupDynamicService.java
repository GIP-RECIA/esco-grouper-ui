package org.esco.grouperui.services.dynamicgroup.internal;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOLDAPBadRequestException;
import org.esco.grouperui.services.ILdapRequester;
import org.esco.grouperui.services.dynamicgroup.IGroupDynamicService;
import org.esco.grouperui.services.dynamicgroup.IStrategyRequestLocator;
import org.esco.grouperui.services.internal.LdapDecoderRequester;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esupportail.commons.services.ldap.LdapEntity;

/**
 * @author dMoulron
 */
public class GroupDynamicService implements IGroupDynamicService {

    /** Logger. */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(GroupDynamicService.class);
    /**
     * locator to find strategy corresponding to current group, or stem or
     * person.
     */
    private IStrategyRequestLocator  strategyLocator;

    /** LDAP Requester service. */
    private ILdapRequester           ldapRequester;

    /** LDAP ldapDecoderRequester service. */
    private LdapDecoderRequester     ldapDecoderRequester;

    /**
     * Default constructor.
     */
    public GroupDynamicService() {
    }

    /**
     * setter for property strategyLocator.
     * 
     * @param theStrategyLocator
     *            the strategyLocator to set
     */
    public void setStrategyLocator(final IStrategyRequestLocator theStrategyLocator) {
        this.strategyLocator = theStrategyLocator;
    }

    /**
     * Setter for ldapRequester.
     * 
     * @param theLdapRequester
     *            the ldapRequester to set.
     */
    public final void setLdapRequester(final ILdapRequester theLdapRequester) {
        this.ldapRequester = theLdapRequester;
    }

    /**
     * setter for property ldapDecoderRequester.
     * 
     * @param theLdapDecoderRequester
     *            the ldapDecoderRequester to set
     */
    public void setLdapDecoderRequester(final LdapDecoderRequester theLdapDecoderRequester) {
        this.ldapDecoderRequester = theLdapDecoderRequester;
    }

    /**
     * {@inheritDoc}
     */
    public String findApplyStrategy(final Person thePerson, final Group theGroup, final Stem theStem) {
        return this.strategyLocator.locate(thePerson, theGroup, theStem).createRequest(thePerson, theGroup,
                theStem);
    }

    /**
     * {@inheritDoc}
     */
    public List < List < SimpleValue >> decodeAndExecuteRequest(final String theRequest,
            final List < String > attributes, final String theBaseObjectSearch) {
        List < List < SimpleValue >> result = new ArrayList < List < SimpleValue > >();

        this.ldapDecoderRequester.setObjectClass(theBaseObjectSearch);
        this.ldapDecoderRequester.setAttributes(attributes);
        this.ldapDecoderRequester.prepareStatement(theRequest);

        List < LdapEntity > results;
        try {
            results = this.ldapDecoderRequester.executeQuery();
            for (LdapEntity entity : results) {
                List < SimpleValue > dynamicAttributes = new ArrayList < SimpleValue >();

                for (String attribut : attributes) {
                    dynamicAttributes.add(new SimpleValue(attribut, entity.getAttribute(attribut)));
                }
                result.add(dynamicAttributes);
            }
        } catch (ESCOLDAPBadRequestException e) {
            GroupDynamicService.LOGGER.error("Error while interrogating the LDAP : ", e);
        } finally {
            this.ldapDecoderRequester.clear();
        }

        return result;
    }

    /**
     * {@inheritDoc}
     */
    public List < SimpleValue > executeRequest(final String theRequest, final String attribute,
            final String theBaseObjectSearch) {
        List < SimpleValue > result = new ArrayList < SimpleValue >();

        // Interrogate the LDAP
        if (null != theRequest && !"".equals(theRequest)) {
            List < String > attributes = new ArrayList < String >();
            attributes.add(attribute);
            this.ldapRequester.setAttributes(attributes);
            this.ldapRequester.setObjectClass(theBaseObjectSearch);
            this.ldapRequester.prepareStatement(theRequest);

            List < LdapEntity > results;
            try {
                results = this.ldapRequester.executeQuery();
                for (LdapEntity entity : results) {
                    result.add(new SimpleValue(attribute, entity.getAttribute(attribute)));
                }
            } catch (ESCOLDAPBadRequestException e) {
                GroupDynamicService.LOGGER.error("Error while interrogating the LDAP : ", e);
            } finally {
                this.ldapRequester.clear();
            }
        }

        return result;
    }

}
