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
import java.util.Map;

/**
 * A LDAP entity, as returned by LDAP searches.
 */
public interface LdapEntity extends Serializable {

	/**
	 * @return the map of all the attributes.
	 */
	Map<String, List<String>> getAttributes();

	/**
	 * @param attributes the attributes to set
	 */
	void setAttributes(Map<String, List<String>> attributes);


	/**
	 * @return the id
	 */
	String getId();
	
	/**
	 * 
	 * @param id the id to set
	 */
	void setId(String id);
	
	/**
	 * @return the set of all the attribute names.
	 */
	List<String> getAttributeNames();
	
	/**
	 * @param name 
	 * @return the values for an attribute.
	 */
	List<String> getAttributes(String name);
	
	/**
	 * @param name 
	 * @return the value for an attribute.
	 */
	String getAttribute(String name);
	
}
