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
