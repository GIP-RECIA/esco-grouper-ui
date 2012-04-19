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

import org.esupportail.commons.exceptions.GroupNotFoundException;

/**
 * The interface of LDAP group services.
 */
public interface LdapGroupService extends BasicLdapService {

	/**
	 * Search a group in the LDAP directory from a unique identifier.
	 * @param id the identifier
	 * @return the LdapGroup that corresponds to the given id.
	 * @throws LdapException 
	 * @throws GroupNotFoundException
	 */
	LdapGroup getLdapGroup(String id) throws LdapException, GroupNotFoundException;

	/**
	 * Tell if a group matches a filter.
	 * @param id the group's unique identifier in the LDAP directory
	 * @param filter the filter
	 * @return true if the group matches the filter.
	 * @throws LdapException
	 */
	boolean groupMatchesFilter(String id, String filter) throws LdapException;

	/**
	 * @param token
	 * @return The list of LdapGroup that corresponds to a token.
	 * @throws LdapException 
	 */
	List<LdapGroup> getLdapGroupsFromToken(String token) throws LdapException;
	
	/**
	 * @param filterExpr
	 * @return The list of LdapGroup that corresponds to a filter.
	 * @throws LdapException 
	 */
	List<LdapGroup> getLdapGroupsFromFilter(String filterExpr) throws LdapException;
	
	/**
	 * @return the attributes to display when searching for groups.
	 */
	List<String> getSearchDisplayedAttributes();

}
