package org.esco.grouperui.exceptions.business;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Stem not unique business exception.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-003]<br/>
 * [RECIA-ESCO-L1-004]<br/>
 * [RECIA-ESCO-L1-005]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOStemNotUniqueException extends ESCOBusinessException {

    /** UID. **/
    private static final long serialVersionUID = 4597110909927943965L;

    /**
     * Default constructor.
     */
    public ESCOStemNotUniqueException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOStemNotUniqueException(final String code) {
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
    public ESCOStemNotUniqueException(final String code, final Throwable cause) {
        super(code, cause);
    }
}
