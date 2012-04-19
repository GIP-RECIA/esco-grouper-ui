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
