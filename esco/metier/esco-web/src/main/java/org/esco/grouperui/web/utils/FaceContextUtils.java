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
