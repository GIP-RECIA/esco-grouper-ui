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
package org.esupportail.commons.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;

/**
 * An abstract DAO implementation (obsolete).
 * @deprecated
 */
@Deprecated
public abstract class AbstractHibernateDaoService 
implements HibernateDaoService {

	/**
	 * Bean constructor.
	 */
	protected AbstractHibernateDaoService() {
		throw exception();
	}

	/**
	 * @return an exception
	 */
	private UnsupportedOperationException exception() {
		return new UnsupportedOperationException("class " + getClass() + " is obsolete, "
				+ "use AbstractSimpleHibernateDaoService or "
				+ "AbstractJdbcJndiHibernateDaoService instead");
	}
	
	/**
	 * @see org.esupportail.commons.dao.HibernateDaoService#getQuery(java.lang.String)
	 */
	public Query getQuery(
			@SuppressWarnings("unused")
			final String hqlQuery) {
		throw exception();
	}
	
	/**
	 * Count entries of the database.
	 * @param countQuery the query
	 * @return an integer.
	 */
	protected int getQueryIntResult(
			@SuppressWarnings("unused")
			final String countQuery) {
		throw exception();
	}
	
	/**
	 * do updates in the database.
	 * @param queryString
	 */
	protected void executeUpdate(
			@SuppressWarnings("unused")
			final String queryString) {
		throw exception();
	}
	
	/**
	 * @see org.esupportail.commons.dao.HibernateDaoService#getSqlQuery(java.lang.String)
	 */
	public SQLQuery getSqlQuery(
			@SuppressWarnings("unused")
			final String sqlQuery) {
		throw exception();
	}
	
	//////////////////////////////////////////////////////////////
	// misc
	//////////////////////////////////////////////////////////////

	/**
	 * Add an object into the database.
	 * @param object 
	 */
	protected void addObject(
			@SuppressWarnings("unused")
			final Object object) {
		throw exception();
	}

	/**
	 * Update an object in the database.
	 * @param object 
	 */
	protected void updateObject(
			@SuppressWarnings("unused")
			final Object object) {
		throw exception();
	}

	/**
	 * Delete an object from the database.
	 * @param object 
	 */
	protected void deleteObject(
			@SuppressWarnings("unused")
			final Object object) {
		throw exception();
	}

	/**
	 * Delete a list of objects from the database.
	 * @param objects 
	 */
	@SuppressWarnings("unchecked")
	protected void deleteObjects(
			@SuppressWarnings("unused")
			final List objects) {
		throw exception();
	}

}
