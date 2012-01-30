package org.esco.grouperui.exceptions.technicals;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * <b>LDAP exception throws when there are more question marks than
 * arguments.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author SopraGroup
 */
public class ESCOLDAPNotEnoughArgumentException extends ESCOTechnicalException {

    /**
     * UID.
     */
    private static final long serialVersionUID = 6229425398328543784L;

    /**
     * Default constructor.
     */
    public ESCOLDAPNotEnoughArgumentException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOLDAPNotEnoughArgumentException(final String code) {
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
    public ESCOLDAPNotEnoughArgumentException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
