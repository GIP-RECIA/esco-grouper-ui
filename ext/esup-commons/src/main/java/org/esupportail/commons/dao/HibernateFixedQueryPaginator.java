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

import org.esupportail.commons.utils.Assert;

/** 
 * A Hibernate paginator that uses a fixed query.
 * @param <E> the class of the results
 */ 
public class HibernateFixedQueryPaginator<E> extends AbstractHibernateQueryPaginator<E> { 
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = -4330439368349986870L;
	
	/**
	 * The fixed query string.
	 */
	private String queryString;
	
	/** 
	 * Constructor.
	 * @param queryString
	 */ 
	public HibernateFixedQueryPaginator(
			final String queryString) { 
		super();
		this.queryString = queryString;
	} 
	
	/** 
	 * Constructor.
	 */ 
	public HibernateFixedQueryPaginator() { 
		super();
	} 
	
	/** 
	 * Constructor.
	 * @param daoService 
	 * @param queryString
	 * @param pageSizeValues 
	 * @param pageSize the number of results to display on the page 
	 */ 
	@Deprecated
	public HibernateFixedQueryPaginator(
			final AbstractGenericHibernateDaoService daoService,
			final String queryString,
			final List<Integer> pageSizeValues,
			final int pageSize) { 
		super(daoService, pageSizeValues, pageSize);
		this.queryString = queryString;
	} 
	
	/** 
	 * Constructor.
	 * @param daoService 
	 * @param queryString
	 * @param pageSizeValues 
	 */ 
	@Deprecated
	public HibernateFixedQueryPaginator(
			final AbstractGenericHibernateDaoService daoService,
			final String queryString,
			final List<Integer> pageSizeValues) { 
		this(daoService, queryString, pageSizeValues, 0);
	} 
	
	/** 
	 * Constructor.
	 * @param daoService 
	 * @param queryString
	 * @param pageSize the number of results to display on the page 
	 */ 
	@Deprecated
	public HibernateFixedQueryPaginator(
			final AbstractGenericHibernateDaoService daoService,
			final String queryString,
			final int pageSize) { 
		this(daoService, queryString, null, pageSize);
	} 
	
	/** 
	 * Constructor.
	 * @param daoService 
	 * @param queryString
	 */ 
	@Deprecated
	public HibernateFixedQueryPaginator(
			final AbstractGenericHibernateDaoService daoService,
			final String queryString) { 
		this(daoService, queryString, null, 0);
	} 
	
	/**
	 * @see org.esupportail.commons.dao.AbstractHibernateQueryPaginator#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		Assert.hasLength(queryString, 
				"property queryString of class " + this.getClass().getName() + " can not be null");
	}

	/**
	 * @see org.esupportail.commons.dao.AbstractHibernateQueryPaginator#getQueryString()
	 */
	@Override
	protected final String getQueryString() {
		return queryString;
	}

	/**
	 * @param queryString the queryString to set
	 */
	public void setQueryString(final String queryString) {
		this.queryString = queryString;
	}

} 

