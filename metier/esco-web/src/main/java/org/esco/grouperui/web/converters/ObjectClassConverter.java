package org.esco.grouperui.web.converters;

import java.util.List;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.ESCOConstantes;
import org.esupportail.commons.beans.AbstractI18nAwareBean;

/**
 * Class ObjectClassConverter. Requirement(s): <br/>
 * [RECIA-ESCO-L1-001] <br/>
 * [RECIA-ESCO-L1-008] <br/>
 * [RECIA-ESCO-L1-021] <br/>
 * This class use the bean ObjectClassConverterSeparator to create the separator
 * between each values. The bean is injected via Spring (converters.xml). <br/>
 * objectClass is the form name;name;...
 * 
 * @author ctrimoreau
 */
public class ObjectClassConverter extends AbstractI18nAwareBean implements Converter {

    /**
     * the serial uid.
     */
    private static final long        serialVersionUID          = -5590222436384494058L;

    /**
     * LOGGER
     */
    private final static IESCOLogger LOGGER                    = ESCOLoggerFactory
                                                                       .getLogger(ObjectClassConverter.class);

    /** Constant for converter not implemented. */
    private static final String      CONVERTER_NOT_IMPLEMENTED = "getAsObject() is not implemented";

    /** The default separator value. */
    private static final String      DEFAULT_SEPARATOR         = " - ";

    /** The separator. */
    private String                   separator;

    /**
     * The value to ignore.
     */
    private List < String >          valueToIgnore;

    /**
     * Default constructor.
     */
    public ObjectClassConverter() {
    }

    /**
     * {@inheritDoc}
     */
    public Object getAsObject(final FacesContext theContext, final UIComponent theComponent, final String theValue)
            throws ConverterException {
        throw new ESCOTechnicalException(ObjectClassConverter.CONVERTER_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public String getAsString(final FacesContext theContext, final UIComponent theComponent, final Object theValue)
            throws ConverterException {

        StringBuffer newBuffer = new StringBuffer();
        if (theValue instanceof String) {
            if (StringUtils.isNotEmpty((String) theValue)) {
                String[] splitedValue = ((String) theValue).split(";");
                int nbValues = splitedValue.length;
                int cpt = 1;
                for (String strValue : splitedValue) {
                    String strValueInternationalize = this.getString(strValue);
                    if (!StringUtils
                            .equalsIgnoreCase(
                                    strValueInternationalize.toUpperCase(),
                                    (ESCOConstantes.NO_INTERNATIONALIZATION_EXCEPTION + strValue + ESCOConstantes.NO_INTERNATIONALIZATION_EXCEPTION)
                                            .toUpperCase())) {
                        if (!this.valueToIgnore.contains(strValueInternationalize)) {
                            newBuffer.append(strValueInternationalize);
                            if (cpt < nbValues) {
                                newBuffer.append(this.getSeparator());
                            }
                        }
                    } else {
                        ObjectClassConverter.LOGGER.debug("NO INTERNALISATION FOR OBJECTCLASS : " + strValue);
                    }
                    cpt++;
                }
            }
        }
        return newBuffer.toString();
    }

    /**
     * Setter for separator.
     * 
     * @param theSeparator
     *            the separator to set.
     */
    public final void setSeparator(final String theSeparator) {
        this.separator = theSeparator;
    }

    /**
     * getter for property separator.
     * 
     * @return the separator
     */
    public String getSeparator() {
        if (this.separator == null) {
            this.separator = ObjectClassConverter.DEFAULT_SEPARATOR;
        }

        return this.separator;
    }

    /**
     * Setter of the valueToIgnore property.
     * 
     * @param theValueToIgnore
     *            the valueToIgnore to set
     */
    public void setValueToIgnore(final List theValueToIgnore) {
        this.valueToIgnore = theValueToIgnore;
    }

}
