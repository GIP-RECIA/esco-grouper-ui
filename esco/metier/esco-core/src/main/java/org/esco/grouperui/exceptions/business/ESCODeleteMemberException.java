package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.domaine.beans.Response;
import org.esco.grouperui.domaine.beans.Responses;

/**
 * <b>Group not found business exception.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class ESCODeleteMemberException extends ESCOClientBusinessException {

    /** UID. */
    private static final long serialVersionUID = -1469076236203810508L;

    /**
     * Default constructor.
     */
    public ESCODeleteMemberException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCODeleteMemberException(final String code) {
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
    public ESCODeleteMemberException(final String code, final Throwable cause) {
        super(code, cause);
    }

    /**
     * @param theCode
     *            : the code
     * @param theCause
     *            : the cause
     * @param theResponse
     *            : the response
     */
    public ESCODeleteMemberException(final String theCode, final Throwable theCause, final Responses theResponse) {
        super(theCode, theCause, theResponse);
    }

    /**
     * @param theResponse
     *            : the response of the service
     */
    public ESCODeleteMemberException(final Responses theResponse) {
        super(theResponse);
    }

    /**
     * @param theCode
     *            : the code of the exception.
     * @param theCause
     *            : the cause of the exception.
     * @param theResponse
     *            : the response, contains the collection of response for each
     *            entry of the service transaction, allowing to know for each
     *            entry the result of the service execution.
     */
    public ESCODeleteMemberException(final String theCode, final Throwable theCause, final Response theResponse) {
        super(theCode, theCause, theResponse);
    }

    /**
     * @param theResponse
     *            : the response, contains the collection of response for each
     *            entry of the service transaction, allowing to know for each
     *            entry the result of the service execution.
     */
    public ESCODeleteMemberException(final Response theResponse) {
        super(theResponse);
    }

}
