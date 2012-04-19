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
package org.esco.grouperui.web.utils;

import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;

import org.apache.commons.lang.Validate;

/**
 * class utility for manipulate facecontext.
 * 
 * @author dMoulron
 */
public final class FaceContextUtils {

    /**
     * regexp representing a EL expression.
     */
    private static final String EL_REGEXP_FORM = "#\\{(.*)\\}";

    /**
     * private constructor.
     */
    private FaceContextUtils() {
    }

    /**
     * Add a variable to context.
     * 
     * @param theFacesContext
     *            The face context.
     * @param theVariable
     *            The variable to add.
     * @param theObject
     *            The object to add.
     */
    public static void addVariableToContext(final FacesContext theFacesContext, final String theVariable,
            final Object theObject) {

        // parameter label
        ValueBinding valueBinding = theFacesContext.getApplication().createValueBinding(
                "#{" + theVariable + "}");
        valueBinding.setValue(theFacesContext, theObject);
    }

    /**
     * Get a value from context.
     * 
     * @param theFacesContext
     *            The face context.
     * @param theVariable
     *            The variable to add.
     * @return the value of the variable to get.
     */
    public static Object getValueFromContext(final FacesContext theFacesContext, final String theVariable) {

        ValueBinding binding = theFacesContext.getApplication().createValueBinding("#{" + theVariable + "}");
        return binding.getValue(theFacesContext);
    }

    /**
     * Evaluate El expression from context.
     * 
     * @param theFacesContext
     *            The face context.
     * @param theExpression
     *            The expression to be evaluate.
     * @return the value of the variable to get.
     */
    public static Object executeELExpression(final FacesContext theFacesContext, final String theExpression) {

        Validate.notNull(theExpression, "the el expresion can not be null");

        if (theExpression.matches(FaceContextUtils.EL_REGEXP_FORM)) {
            ValueBinding binding = theFacesContext.getApplication().createValueBinding(theExpression);
            return binding.getValue(theFacesContext);
        } else {
            return theExpression;
        }

    }

}
