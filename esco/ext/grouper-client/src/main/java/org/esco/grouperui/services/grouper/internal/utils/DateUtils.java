package org.esco.grouperui.services.grouper.internal.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Utility pack for handle date.
 * 
 * @author SopraGroup
 */
public class DateUtils {

    /** Formatter. **/
    private static final String FORMATTER = "dd/MM/yyyy HH:mm:ss.SSS";

    /**
     * Default constructor.
     */
    private DateUtils() {

    }

    /**
     * Convert a string into date.
     * 
     * @param sDate
     *            : the string date
     * @return a date.
     * @throws ParseException
     *             : if the date in input has an incorrect format.
     */
    public static Date stringToDate(final String sDate) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat(DateUtils.FORMATTER);
        return formatter.parse(sDate);
    }

    /**
     * Convert a date into string.
     * 
     * @param date
     *            : the date to stringify.
     * @return a date in string format.
     */
    public static String dateToString(final Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat(DateUtils.FORMATTER);
        return formatter.format(date);

    }
}
