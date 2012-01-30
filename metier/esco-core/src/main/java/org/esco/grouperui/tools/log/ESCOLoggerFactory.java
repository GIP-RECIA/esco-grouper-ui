package org.esco.grouperui.tools.log;

/**
 * factory for logger class.
 * 
 * @author dMoulron
 */
public class ESCOLoggerFactory {

    /**
     * Default constructor.
     */
    private ESCOLoggerFactory() {
    }

    /**
     * @param theClassToBeLog
     *            the class to be logger
     * @return an implementation of {@link IESCOLogger}
     */
    public static IESCOLogger getLogger(final Class theClassToBeLog) {

        return new DefaultLogger(theClassToBeLog);
    }

}
