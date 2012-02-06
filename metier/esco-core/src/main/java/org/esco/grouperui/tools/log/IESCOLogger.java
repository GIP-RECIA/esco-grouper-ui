package org.esco.grouperui.tools.log;

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
    void debug(final Object... theMessage);

    /**
     * wrapper for debug method. Verify if log is enable.
     * @param theException
     *            the exception origin of debug
     * @param theMessage
     *            the message to be log
     */
    void debug(final Throwable theException, final Object... theMessage);

    /**
     * wrapper for info method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     */
    void info(final Object... theMessage);

    /**
     * wrapper for info method. Verify if log is enable.
     * @param theException
     *            the exception origin of info
     * @param theMessage
     *            the message to be log
     */
    void info(final Throwable theException, final Object... theMessage);

    /**
     * wrapper for error method. Verify if log is enable.
     * 
     * @param theMessage
     *            the message to be log
     */
    void error(final Object... theMessage);

    /**
     * wrapper for error method. Verify if log is enable.
     * @param theException
     *            the exception origin of error
     * @param theMessage
     *            the message to be log
     */
    void error(final Throwable theException, final Object... theMessage);

    /**
     * wrapper for debug method. Verify if log is enable.
     * @param theException
     *            the exception origin of warn
     * @param theMessage
     *            the message to be log
     */
    void warn(final Throwable theException, final Object... theMessage);

    /**
     * accesseur de la propri�t� logger.
     * 
     * @return the logger
     */
    Log getLogger();

}
