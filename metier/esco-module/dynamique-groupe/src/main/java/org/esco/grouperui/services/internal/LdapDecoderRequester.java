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

import java.util.List;

import org.apache.commons.lang.Validate;
import org.esco.dynamicgroups.domain.definition.DecodedPropositionResult;
import org.esco.dynamicgroups.domain.definition.IProposition;
import org.esco.dynamicgroups.domain.definition.IPropositionTranslator;
import org.esco.dynamicgroups.domain.definition.PropositionCodec;
import org.esco.grouperui.exceptions.business.ESCOLDAPBadRequestException;
import org.esco.grouperui.exceptions.technicals.ESCOLDAPDecodeRequestException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esupportail.commons.services.ldap.LdapEntity;

/**
 * Service class to decode expression in LDAP request and request LDAP. This
 * service extends LdapRequester. The method prepareStatement is override to
 * allow to decode the request.<br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author raBesnard
 */
public class LdapDecoderRequester extends LdapRequester {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(LdapDecoderRequester.class);

    /** The codec to use. */
    private PropositionCodec         codec;

    /** The proposition translator into LDAP filters. */
    private IPropositionTranslator   propositionTranslator;

    /**
     * Default constructor.
     */
    public LdapDecoderRequester() {
        super();
    }

    /**
     * Transform request in LDAP request, execute LDAP request and return list
     * of result.
     * 
     * @return list of result
     * @throws ESCOLDAPBadRequestException
     *             if request is invalid
     */
    @Override
    public List < LdapEntity > executeQuery() throws ESCOLDAPBadRequestException {
        List < LdapEntity > result = null;

        Validate.notNull(this.getRequest(), "The request is null.");

        this.prepareParameters();
        this.decodeRequest();
        this.prepareLdapService();

        result = this.testAndExecuteQuery();

        return result;
    }

    /**
     * Decode request in LDAP request.
     */
    protected void decodeRequest() {
        // transform the request in LDAP request
        LdapDecoderRequester.LOGGER.debug("Decode request : " + this.getRequest());
        final DecodedPropositionResult ldapRequest = this.codec.decode(this.getRequest());
        if (ldapRequest.isValid()) {
            final IProposition dnfProposition = ldapRequest.getProposition().toDisjunctiveNormalForm();
            final String request = this.propositionTranslator.translate(dnfProposition);
            super.prepareStatement(request);
            LdapDecoderRequester.LOGGER.debug("LDAP request decoded : " + request);
        } else {
            LdapDecoderRequester.LOGGER.error("Result: The string is not a valid expression.");
            if (ldapRequest.hasErrorMessage()) {
                throw new ESCOLDAPDecodeRequestException("Error message: " + ldapRequest.getErrorMessage());
            }
        }
    }

    /**
     * Getter of property codec.
     * 
     * @return the codec
     */
    public PropositionCodec getCodec() {
        return this.codec;
    }

    /**
     * Setter of property codec.
     * 
     * @param theCodec
     *            the codec to set
     */
    public void setCodec(final PropositionCodec theCodec) {
        this.codec = theCodec;
    }

    /**
     * Getter of property propositionTranslator.
     * 
     * @return the propositionTranslator
     */
    public IPropositionTranslator getPropositionTranslator() {
        return this.propositionTranslator;
    }

    /**
     * Setter of property propositionTranslator.
     * 
     * @param thePropositionTranslator
     *            the propositionTranslator to set
     */
    public void setPropositionTranslator(final IPropositionTranslator thePropositionTranslator) {
        this.propositionTranslator = thePropositionTranslator;
    }

}
