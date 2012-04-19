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
