package org.esco.grouperui.exceptions.technicals;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * <b>LDAP exception throws when the expression to decode in LDAP request is
 * invalid.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author SopraGroup
 */
public class ESCOLDAPDecodeRequestException extends ESCOTechnicalException {

    /**
     * UID.
     */
    private static final long serialVersionUID = -5837249938633861026L;

    /**
     * Default constructor.
     */
    public ESCOLDAPDecodeRequestException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOLDAPDecodeRequestException(final String code) {
        super(code);
    }

    /**
     * Third constructor, with code & cause.
     * 
     * @param code
     *            : the code of the exception.
     * @param cause
     *            : the cause of the exception.
     */
    public ESCOLDAPDecodeRequestException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
