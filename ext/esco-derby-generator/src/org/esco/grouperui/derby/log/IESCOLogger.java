package org.esco.grouperui.derby.log;

import org.apache.commons.logging.Log;

/**
 * @author dMoulron
 */
public interface IESCOLogger {

    /**
     * wrapper for debug method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     */
    void debug(final Object theMessage);

    /**
     * wrapper for debug method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     * @param theException
     *            the exception origin of debug
     */
    void debug(final Object theMessage, final Throwable theException);

    /**
     * wrapper for info method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     */
    void info(final Object theMessage);

    /**
     * wrapper for info method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     * @param theException
     *            the exception origin of info
     */
    void info(final Object theMessage, final Throwable theException);

    /**
     * wrapper for error method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     */
    void error(final Object theMessage);

    /**
     * wrapper for error method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     * @param theException
     *            the exception origin of error
     */
    void error(final Object theMessage, final Throwable theException);

    /**
     * wrapper for debug method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     * @param theException
     *            the exception origin of warn
     */
    void warn(final Object theMessage, final Throwable theException);

    /**
     * accesseur de la propriété logger.
     * 
     * @return the logger
     */
    Log getLogger();

}
