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
package org.esco.grouperui.tools.parameter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.converters.MapAttributeConverters;
import org.esco.grouperui.web.converters.MultiConverters;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * Utility class for compute EL .
 * 
 * @author dMoulron
 */
public final class ParameterUtils {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(ParameterUtils.class);

    /**
     * private constructor.
     */
    private ParameterUtils() {
    }

    /**
     * execute EL on parameter. this method can authorize EL in DB.
     * 
     * @param theFacesContext
     *            the context of JSF
     * @param theParameter
     *            the parameter for execute EL
     * @return the result of computing EL.
     */
    public static String executeELFromParameter(final FacesContext theFacesContext,
            final Parameter theParameter) {

        MultiConverters mapConverters = (MapAttributeConverters) FaceContextUtils.getValueFromContext(
                theFacesContext, "mapAttributeConverters");

        String value = null;
        ParameterUtils.LOGGER.debug("Parameter to be tested : " + theParameter.getKey());
        if (theParameter.getKey().contains("|")) {
            String[] paramToTest = theParameter.getKey().split("\\|");
            for (String param : paramToTest) {

                ValueBinding binding = theFacesContext.getApplication().createValueBinding(param);
                String valueToDisplay = (String) binding.getValue(theFacesContext);

                if (!StringUtils.isEmpty(valueToDisplay) && ParameterUtils.isValueToDisplay(valueToDisplay)) {
                    value = (String) binding.getValue(theFacesContext);

                    if (mapConverters.isConvertible(param)) {
                        value = mapConverters.getAsString(theFacesContext, null, value, param);
                    }

                    break;
                }
            }
        } else {
            ValueBinding binding = theFacesContext.getApplication().createValueBinding(theParameter.getKey());
            value = (String) binding.getValue(theFacesContext);

            if (mapConverters.isConvertible(theParameter.getKey())) {
                value = mapConverters.getAsString(theFacesContext, null, value, theParameter.getKey());
            }
        }

        if (StringUtils.isEmpty(value)) {
            value = org.esco.grouperui.web.ESCOConstantes.EMPTY_DATA;
        }

        return value;
    }

    /**
     * verify if theValue can be display.
     * 
     * @param theValue
     *            the value to be verify
     * @return true if theValue can be display, false otherwise.
     */
    private static boolean isValueToDisplay(final String theValue) {
        Pattern pattern = Pattern.compile("((.+)( [\\W]? )(.+))|([^\\W]+[^\\W|[ ]]+)");
        Matcher matcher = pattern.matcher(theValue);

        return matcher.find();
    }

}
