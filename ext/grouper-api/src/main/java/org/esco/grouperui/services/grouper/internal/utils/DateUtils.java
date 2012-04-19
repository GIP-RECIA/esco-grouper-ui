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
