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
package org.esupportail.commons.services.ldap;

import java.util.List;
import java.util.Locale;

/**
 * An abstract class that implements interface LdapUserService.
 * This class does not support the retrieval of statistics.
 */
@SuppressWarnings("serial")
abstract class AbstractLdapService implements BasicLdapService {
	
	/**
	 * The exception thrown when the statistics methods are called.
	 */
	private final UnsupportedOperationException unsupportedExcepion = 
		new UnsupportedOperationException("class " + getClass() + " does not support statistics.");

	/**
	 * Bean constructor.
	 */
	public AbstractLdapService() {
		super();
	}

	/**
	 * @see org.esupportail.commons.services.ldap.BasicLdapService#getStatistics(java.util.Locale)
	 */
	public List<String> getStatistics(@SuppressWarnings("unused") final Locale locale) {
		throw unsupportedExcepion;
	}

	/**
	 * @see org.esupportail.commons.services.ldap.BasicLdapService#resetStatistics()
	 */
	public void resetStatistics() {
		throw unsupportedExcepion;
	}

	/**
	 * @see org.esupportail.commons.services.ldap.BasicLdapService#supportStatistics()
	 */
	public boolean supportStatistics() {
		return false;
	}

	/**
	 * @see org.esupportail.commons.services.ldap.BasicLdapService#supportsTest()
	 */
	public boolean supportsTest() {
		return false;
	}

	/**
	 * @see org.esupportail.commons.services.ldap.BasicLdapService#test()
	 */
	public void test() {
		throw unsupportedExcepion;
	}

}
