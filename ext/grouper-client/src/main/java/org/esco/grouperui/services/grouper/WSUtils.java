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
package org.esco.grouperui.services.grouper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.GcWebServiceError;
import edu.internet2.middleware.grouperClient.ws.beans.WsResponseBean;

/**
 * Utility pack functions to handle WS.
 * 
 * @author SopraGroup
 */
public class WSUtils {

    /** Empty string. */
    public static final String       EMPTY      = "";

    /** Success code. */
    public static final String       SUCCESS    = "T";

    /** Failure code. */
    public static final String       FAILURE    = "F";

    /** Double dot. */
    public static final String       DOUBLE_DOT = ":";

    /** Logger for this class. */
    private static final IESCOLogger LOGGER     = ESCOLoggerFactory.getLogger(WSUtils.class);

    /**
     * Default constructor.
     */
    private WSUtils() {
    }

    /**
     * Test if the service has correctly answered.
     * 
     * @param wsResponseBean
     *            : the response from the WS.
     * @return true if response is correct, false if answer is bad.
     */
    public static boolean isOK(final WsResponseBean wsResponseBean) {

        WSUtils.LOGGER.debug("isOK(final WsResponseBean wsResponseBean) - start/end");

        return wsResponseBean != null && wsResponseBean.getResultMetadata().getSuccess() != null
                && WSUtils.SUCCESS.equalsIgnoreCase(wsResponseBean.getResultMetadata().getSuccess());
    }

    /**
     * Return the error code from the exception.
     * 
     * @param gwse
     *            : the exception to handle
     * @return the result code.
     */
    public static String getResultCode(final GcWebServiceError gwse) {

        WSUtils.LOGGER.debug("getResultCode(final GcWebServiceError gwse) - start");

        String retour = WSUtils.EMPTY;

        WsResponseBean response = null;

        if (gwse != null) {
            response = (WsResponseBean) gwse.getContainerResponseObject();

            if (response != null && response.getResultMetadata() != null
                    && response.getResultMetadata().getResultCode() != null) {
                retour = response.getResultMetadata().getResultCode();
            }
        }

        WSUtils.LOGGER.debug("getResultCode(final GcWebServiceError gwse) - end");

        return retour;
    }

    /**
     * Return the error code from the exception.
     * 
     * @param gwse
     *            : the exception to handle
     * @param index
     *            : the position of the element in the transaction.
     * @return the result code.
     */
    public static String getDetails(final GcWebServiceError gwse, final int index) {

        WSUtils.LOGGER.debug("getResultCode(final GcWebServiceError gwse) - start");

        String retour = WSUtils.EMPTY;

        if (gwse != null) {
            retour = gwse.getMessage();
        }

        WSUtils.LOGGER.debug("getResultCode(final GcWebServiceError gwse) - end");

        String[] retours = retour.split("Error (.*), result index: (.),");

        return retours[index];
    }

    /**
     * Convert a string in boolean.
     * 
     * @param value
     *            : the value to convert
     * @return true if the value is equals to "T", false otherwise.
     */
    public static final boolean convertToBoolean(final String value) {

        WSUtils.LOGGER.debug("convertToBoolean(final String value) - start");

        Validate.notNull(value, "Convert to boolean a null value is simply not possible!");

        Boolean retour = Boolean.FALSE;

        if (WSUtils.SUCCESS.equals(value)) {
            retour = Boolean.TRUE;
        }

        WSUtils.LOGGER.debug("convertToBoolean(final String value) - end");

        return retour;
    }

}
