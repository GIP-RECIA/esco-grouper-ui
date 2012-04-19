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
/**
 * ESUP-Portail Commons - Copyright (c) 2006-2009 ESUP-Portail consortium.
 */
package org.esupportail.commons.utils.strings; 

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * A class to format XML.
 */
public final class XmlUtils {
	
	/**
	 * A logger.
	 */
	private static final Logger LOGGER = new LoggerImpl(XmlUtils.class);

	/**
	 * The XML indentation number.
	 */
	private static final Integer XML_INDENT_NUMBER = new Integer(4);

	/**
	 * Constructor.
	 */
	private XmlUtils() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return an indented XML string.
	 * @param input
	 * @param omitXmlDeclaration 
	 */
	public static String format(
			final String input,
			final boolean omitXmlDeclaration) {
		try {
			TransformerFactory tf = TransformerFactory.newInstance();
			try {
				tf.setAttribute("indent-number", XML_INDENT_NUMBER);
			} catch (IllegalArgumentException e) {
				// jdk 1.5
			}
			Transformer t = tf.newTransformer();
			t.setOutputProperty(OutputKeys.INDENT, "yes");
			if (omitXmlDeclaration) {
				t.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			}
			t.setOutputProperty("{http://xml.apache.org/xalan}indent-amount", XML_INDENT_NUMBER.toString());
			OutputStream os = new ByteArrayOutputStream();
			t.transform(
					new StreamSource(new StringReader(input)), 
					new StreamResult(new OutputStreamWriter(os, "UTF-8")));
			return os.toString();
		} catch (Exception e) {
			LOGGER.error(e);
			return input;
		}
	}

}
