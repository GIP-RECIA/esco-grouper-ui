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

/**
 * The interface of writeable LDAP user services.
 */
public interface WriteableLdapUserService extends Serializable {

	/** 
	 * Update a LDAP user in the LDAP directory.
	 * @param ldapUser
	 */
	void updateLdapUser(LdapUser ldapUser);
	
	/** 
	 * Create a LDAP user.
	 * @param ldapUser
	 */
	void createLdapUser(LdapUser ldapUser);
	
	/** 
	 * Delete a LDAP user.
	 * @param ldapUser
	 */
	void deleteLdapUser(LdapUser ldapUser);
	
	/** 
	 * Define credentials which will be used for LDAP binding.
	 * Usefull when you ask credentials via a forms in your application
	 * and you want to bind to LDAP with those credentials.
	 * @param userId
	 * @param password
	 */
	void setAuthenticatedContext(String userId, String password);
	
	/** 
	 * Disable WriteableLdapUserService write capabilities
	 * so that it can't write in LDAP directory in the sequel.
	 */
	void defineAnonymousContext();

}
