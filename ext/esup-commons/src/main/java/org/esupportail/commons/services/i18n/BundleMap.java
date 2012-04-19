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
package org.esupportail.commons.services.i18n;

import java.util.HashMap;
import java.util.Locale;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;

/**
 * A map to store bundle strings.
 */
public class BundleMap extends HashMap<String, String> {
	
	/**
	 * The id for serialization.
	 */
	private static final long serialVersionUID = 4329416691636820025L;
	
	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());

	/**
	 * The locale (used for error messages only).
	 */
	private Locale locale;

	/**
	 * Bean constructor.
	 * @param locale 
	 */
	public BundleMap(final Locale locale) {
		super();
		this.locale = locale;
	}

	/**
	 * @see java.util.HashMap#get(java.lang.Object)
	 */
	@Override
	public String get(final Object key) {
		String result = super.get(key);
		if (result == null) {
			logger.warn("no string found for key '" + key + "' and locale '" + locale + "'");
			return "?????" + key + "?????"; 
		}
		return result;
	}
	
	

}
