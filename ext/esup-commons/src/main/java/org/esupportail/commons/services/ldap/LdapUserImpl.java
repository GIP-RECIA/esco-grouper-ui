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

import java.util.ArrayList;
import java.util.List;


/**
 * A basic implementation of LdapUser.
 */
public class LdapUserImpl extends LdapEntityImpl implements LdapUser {

	/**
	 * The id for serialization.
	 */
	private static final long serialVersionUID = 4141419851049182209L;

	/**
	 * Constructor.
	 */
	public LdapUserImpl() {
		super();
	}
	
	/**
	 * @param ldapEntity
	 * @return a LdapUser, created using a LdapEntity.
	 */
	public static LdapUser createLdapUser(final LdapEntity ldapEntity) {
		LdapUserImpl ldapUser = new LdapUserImpl();
		ldapUser.setId(ldapEntity.getId());
		ldapUser.setAttributes(ldapEntity.getAttributes());
		return ldapUser;
	}

	/**
	 * @param ldapEntities
	 * @return a list of LdapUser, created using ldapEntities.
	 */
	public static List<LdapUser> createLdapUsers(final List<LdapEntity> ldapEntities) {
		List<LdapUser> ldapUsers = new ArrayList<LdapUser>();
		for (LdapEntity ldapEntity : ldapEntities) {
			ldapUsers.add(LdapUserImpl.createLdapUser(ldapEntity));
		}
		return ldapUsers;
	}

}
