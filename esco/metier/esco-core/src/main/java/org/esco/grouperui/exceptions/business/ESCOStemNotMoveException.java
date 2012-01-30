package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Stem not move business exception.</b><br/>
 * Requirements: [RECIA-ESCO-L3-***]
 * 
 * @author sDupuis
 */
public class ESCOStemNotMoveException extends ESCOBusinessException {

    /**
     * UID.
     */
    private static final long serialVersionUID = -4498116332993400823L;

    /**
     * Default constructor.
     */
    public ESCOStemNotMoveException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOStemNotMoveException(final String code) {
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
    public ESCOStemNotMoveException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
