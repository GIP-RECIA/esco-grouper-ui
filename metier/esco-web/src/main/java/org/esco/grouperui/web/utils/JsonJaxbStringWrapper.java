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

import java.io.IOException;
import java.io.StringWriter;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.AnnotationIntrospector;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.xc.JaxbAnnotationIntrospector;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * generic wrapper to convert object into xml.
 * 
 * @author dMoulron
 */
public class JsonJaxbStringWrapper implements IWrapper < XmlProducer, String > {

    /**
     * the serial uid.
     */
    private static final long        serialVersionUID = -7594052556452622162L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(JsonJaxbStringWrapper.class);

    /**
     * Default constructor.
     */
    public JsonJaxbStringWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public String wrap(final XmlProducer theXmlProducer) throws ESCOWrapperException {
        StringWriter stringWriter = new StringWriter();
        try {
            ObjectMapper mapper = new ObjectMapper();
            AnnotationIntrospector introspector = new JaxbAnnotationIntrospector();
            mapper.getSerializationConfig().setAnnotationIntrospector(introspector);

            mapper.writeValue(stringWriter, theXmlProducer.getTarget());

        } catch (JsonGenerationException e) {
            JsonJaxbStringWrapper.LOGGER.error(e);
            // nothing to do.
        } catch (JsonMappingException e) {
            JsonJaxbStringWrapper.LOGGER.error(e);
            // nothing to do.
        } catch (IOException e) {
            JsonJaxbStringWrapper.LOGGER.error(e);
            // nothing to do.
        }

        return stringWriter.getBuffer().toString();
    }
}
