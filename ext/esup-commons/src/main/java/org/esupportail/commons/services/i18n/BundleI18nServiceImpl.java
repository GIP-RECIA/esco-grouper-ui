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

import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import org.esupportail.commons.utils.Assert;
import org.springframework.beans.factory.InitializingBean;

/**
 * A simple implementation of I18nService.
 * 
 * See /properties/i18n/i18n-example.xml.
 */
public class BundleI18nServiceImpl extends AbstractI18nService implements InitializingBean {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 674871167329599584L;
	
	/**
	 * The basename of the properties files that holds the bundles.
	 */
	private String bundleBasename;
	
	/**
	 * Bean constructor.
	 */
	public BundleI18nServiceImpl() {
		super();
	}

	/**
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	public void afterPropertiesSet() {
		Assert.hasText(bundleBasename, 
				"property bundleBasename of class " + getClass().getName() + " can not be null");
	}

	/**
	 * @see org.esupportail.commons.services.i18n.I18nService#getStrings(java.util.Locale)
	 */
	public Map<String, String> getStrings(final Locale locale) {
		Map<String, String> map = new BundleMap(locale);
		ResourceBundle bundle = getResourceBundle(bundleBasename, locale);
		if (bundle != null) {
			Enumeration<String> keys = bundle.getKeys();
			while (keys.hasMoreElements()) {
				String key = keys.nextElement();
				map.put(key, bundle.getString(key));
			}
		}
		return map;
	}

	/**
	 * @return The bundleBasename.
	 */
	public String getBundleBasename() {
		return bundleBasename;
	}
	/**
	 * @param bundleBasename The bundleBasename to set.
	 */
	public void setBundleBasename(final String bundleBasename) {
		this.bundleBasename = bundleBasename;
	}

}

