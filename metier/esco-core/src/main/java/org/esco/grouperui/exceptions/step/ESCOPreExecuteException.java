package org.esco.grouperui.exceptions.step;

/**
 * Logical business exceptions occuring the pre-execution of a step.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public class ESCOPreExecuteException extends Exception {
    /** UID. */
    private static final long serialVersionUID = -6165278636851623567L;

    /**
     * Default constructor.
     */
    public ESCOPreExecuteException() {

    }

    /**
     * constructor with code.
     * 
     * @param theCode
     *            the code of the exception
     */
    public ESCOPreExecuteException(final String theCode) {
        super(theCode);
    }

    /**
     * constructor with code and cause.
     * 
     * @param theCode
     *            the code of the exception
     * @param theCause
     *            the initial exception
     */
    public ESCOPreExecuteException(final String theCode, final Throwable theCause) {
        super(theCode, theCause);
    }

}
