package org.esco.grouperui.web.converters;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

/**
 * Class MultiConverters. <br/>
 * Requirement(s): <br/>
 * [RECIA-ESCO-L1-001] <br/>
 * [RECIA-ESCO-L1-008] <br/>
 * [RECIA-ESCO-L1-021]
 * 
 * @author ctrimoreau
 */
public interface MultiConverters {

    /**
     * Allow to check if the element is convertible or not.
     * 
     * @param theParameter
     *            the parameter on which we based to check if the element is
     *            convertible.
     * @return true if convertible, false else.
     */
    Boolean isConvertible(final String theParameter);

    /**
     * Convert the specified string value, which is associated with the
     * specified UIComponent, into a model data object that is appropriate for
     * being stored during the Apply Request Values phase of the request
     * processing lifecycle.
     * 
     * @param theContext
     *            FacesContext for the request being processed.
     * @param theComponent
     *            UIComponent with which this model object value is associated.
     * @param theValue
     *            String value to be converted.
     * @param theKey
     *            String key on which we based to convert to i18n.
     * @return the object converted.
     */
    Object getAsObject(final FacesContext theContext, final UIComponent theComponent, final String theValue,
            final String theKey);

    /**
     * Convert the specified string value, which is associated with the being
     * stored during the Apply Request Values phase of the request processing
     * lifecycle.
     * 
     * @param theContext
     *            FacesContext for the request being processed.
     * @param theComponent
     *            UIComponent with which this model object value is associated.
     * @param theValue
     *            String value to be converted.
     * @param theKey
     *            String key on which we based to convert to i18n.
     * @return The i18n value of the theValue.
     */
    String getAsString(final FacesContext theContext, final UIComponent theComponent, final Object theValue,
            final String theKey);

}
