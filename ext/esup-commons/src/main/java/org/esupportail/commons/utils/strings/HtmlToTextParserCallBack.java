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

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.parser.ParserDelegator;

/**
 * A class to convert HTML to text using Swing.
 */
public final class HtmlToTextParserCallBack extends HTMLEditorKit.ParserCallback {   
	
	/**
	 * A StringBuffer to store the result of the parsing.
	 */
	private StringBuffer textResult = new StringBuffer();

	/**
	 * Private constructor.
	 */
	private HtmlToTextParserCallBack() {
		super();
	}

	/**
	 * @see javax.swing.text.html.HTMLEditorKit.ParserCallback#handleText(char[], int)
	 */
	@Override
	public void handleText(
			final char[] data, 
			@SuppressWarnings("unused") final int unusedPos) {      
		textResult.append(data);
		}    
	
	/**
	 * Parse HTML and return text.
	 * @param htmlString an HTML string.
	 * @return a String.
	 * @throws IOException
	 */
	static String convert(final String htmlString) throws IOException {
		Reader r = new StringReader(htmlString);      
		ParserDelegator parser = new ParserDelegator();      
		HtmlToTextParserCallBack callback = new HtmlToTextParserCallBack();
		parser.parse(r, callback, false);
		return callback.getTextResult().toString();
	}

	/**
	 * @return Returns the textResult.
	 */
	StringBuffer getTextResult() {
		return textResult;
	}
}
