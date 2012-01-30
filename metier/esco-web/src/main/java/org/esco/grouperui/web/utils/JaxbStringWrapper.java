package org.esco.grouperui.web.utils;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;

/**
 * generic wrapper to convert object into xml.
 * 
 * @author dMoulron
 */
public class JaxbStringWrapper implements IWrapper < XmlProducer, String > {

    /**
     * the serial uid.
     */
    private static final long        serialVersionUID = -7594052556452622162L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(JaxbStringWrapper.class);

    /**
     * Default constructor.
     */
    public JaxbStringWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public String wrap(final XmlProducer theXmlProducer) throws ESCOWrapperException {
        StringWriter stringWriter = new StringWriter();
        try {
            String encoding = PropertyManager.find(ESCOConstantes.AJAX_ENCODING).deType(String.class);
            JAXBContext context = JAXBContext.newInstance(theXmlProducer.getTypesOfTarget());
            Marshaller marshaller = context.createMarshaller();

            marshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);

            marshaller.marshal(theXmlProducer.getTarget(), stringWriter);
        } catch (JAXBException e) {
            JaxbStringWrapper.LOGGER.error(e);
            // nothing to do.
        }

        return stringWriter.getBuffer().toString();
    }
}
