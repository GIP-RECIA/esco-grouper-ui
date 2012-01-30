package org.esco.grouperui.web.converters;

import java.util.Map;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;

import org.apache.commons.lang.StringUtils;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * this class store all converter and apply this on pattern. <br />
 * each converter store can be user on standalone way like on jsf tag lib.
 * 
 * <pre>
 * &lt;bean id=&quot;mapAttributeConverters&quot;
 *      class=&quot;org.esco.grouperui.web.converters.MapAttributeConverters&quot;&gt;
 *     &lt;property name=&quot;attributes&quot;&gt;
 *        &lt;map&gt;
 *              &lt;entry key=&quot;#{attr['objectClass']}&quot; value-ref=&quot;objectClassConverter&quot; /&gt;
 *        &lt;/map&gt;
 *     &lt;/property&gt;
 * &lt;/bean&gt;
 * </pre>
 * 
 * where objectClassConverter ref is :
 * 
 * <pre>
 *  &lt;bean id=&quot;objectClassConverter&quot;
 *      class=&quot;org.esco.grouperui.web.converters.ObjectClassConverter&quot;&gt;
 *       &lt;description&gt;
 *               A converter for objectClass value type.
 *       &lt;/description&gt;
 *       &lt;property name=&quot;separator&quot; value=&quot;&lt;br/&gt;&quot; /&gt;
 *  &lt;/bean&gt;
 * </pre>
 * 
 * @author dMoulron
 */
public class MapAttributeConverters implements MultiConverters {

    /** Logger. */
    private static final IESCOLogger  LOGGER                    = ESCOLoggerFactory
                                                                        .getLogger(MapAttributeConverters.class);

    /** Constant for converter not implemented. */
    private static final String       CONVERTER_NOT_IMPLEMENTED = "getAsObject() is not implemented";

    /** Map of the converters. */
    private Map < String, Converter > attributes;

    /**
     * Default constructor.
     */
    public MapAttributeConverters() {
    }

    /**
     * {@inheritDoc}
     */
    public Boolean isConvertible(final String theParameter) {
        Boolean result = Boolean.FALSE;
        if (this.attributes.get(theParameter) != null) {
            result = Boolean.TRUE;
        }
        return result;
    }

    /**
     * {@inheritDoc}
     */
    public Object getAsObject(final FacesContext theContext, final UIComponent theComponent,
            final String theValue, final String theKey) throws ConverterException {
        throw new ESCOTechnicalException(MapAttributeConverters.CONVERTER_NOT_IMPLEMENTED);
    }

    /**
     * {@inheritDoc}
     */
    public String getAsString(final FacesContext theContext, final UIComponent theComponent,
            final Object theValue, final String theKey) throws ConverterException {
        String result = null;
        if (StringUtils.isNotEmpty(theKey)) {
            result = this.attributes.get(theKey).getAsString(theContext, theComponent, theValue);
        } else {
            MapAttributeConverters.LOGGER.error("The key is missing.");
        }
        return result;
    }

    /**
     * Setter for attributes.
     * 
     * @param theAttributes
     *            the attributes to set.
     */
    public final void setAttributes(final Map < String, Converter > theAttributes) {
        this.attributes = theAttributes;
    }

}
