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

import java.io.Serializable;
import java.util.List;
import java.util.Locale;

/**
 * The interface of LDAP services for any entity.
 */
interface BasicLdapService extends Serializable {

	/**
	 * @param filterExpr
	 * @return null if the filter is correct, an error message otherwise.
	 * @throws LdapException 
	 */
	String testLdapFilter(String filterExpr) throws LdapException;
	
	/**
	 * @return true if the class supports the retrieval of statictics. If false,
	 * calls to methods getStatistics() and resetStatistics() should throw an 
	 * exception.
	 */
	boolean supportStatistics();
	
	/**
	 * Reset the statistics.
	 */
	void resetStatistics();
	
	/**
	 * @return the statistics, as a list of Strings.
	 * @param locale
	 */
	List<String> getStatistics(Locale locale);
	
	/**
	 * @return true if the class supports testing. If false, calls to method 
	 * test() should throw an exception.
	 */
	boolean supportsTest();
	
	/**
	 * Test the LDAP connection.
	 */
	void test();
	
}
