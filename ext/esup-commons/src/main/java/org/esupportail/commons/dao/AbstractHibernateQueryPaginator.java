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

import java.util.ArrayList;
import java.util.List;

import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;
import org.hibernate.Query;
import org.hibernate.ScrollableResults;

/** 
 * A Hibernate paginator that directly relies on a HQL query.
 * @param <E> the class of the results
 */ 
@SuppressWarnings("serial")
public abstract class AbstractHibernateQueryPaginator<E> extends AbstractHibernatePaginator<E> {
	
	/**
	 * A logger.
	 */
	private final Logger logger = new LoggerImpl(getClass());
	
	/** 
	 * Constructor.
	 */ 
	public AbstractHibernateQueryPaginator() { 
		super();
	} 
	
	/** 
	 * Constructor.
	 * @param daoService 
	 * @param pageSizeValues 
	 * @param pageSize the number of results to display on the page 
	 * @deprecated use setPageSizeValues() and setDefaultPageSize() 
	 */ 
	@Deprecated
	public AbstractHibernateQueryPaginator(
			final HibernateDaoService daoService,
			final List<Integer> pageSizeValues,
			final int pageSize) { 
		super(daoService, pageSizeValues, pageSize);
	} 
	
	/**
	 * @see org.esupportail.commons.web.beans.AbstractPaginator#loadItemsInternal()
	 */
	@Override
	@SuppressWarnings("unchecked")
	protected void loadItemsInternal() {
		String queryString = getQueryString();
		if (queryString == null) {
			setVisibleItems(new ArrayList<E>());
			setCurrentPageInternal(0);
			setTotalItemsCount(0);
			return;
		}
		Query query = getDaoService().getQuery(queryString);
		ScrollableResults scrollableResults = query.scroll(); 
		/* 
		 * We set the max results to one more than the specfied pageSize to 
		 * determine if any more results exist (i.e. if there is a next page 
		 * to display). The result set is trimmed down to just the pageSize 
		 * before being displayed later (in getList()). 
		 */ 
		if (logger.isDebugEnabled()) {
			logger.debug("executing " + query.getQueryString() + "...");
		}
		query.setFirstResult(getCurrentPageInternal() * getPageSize());
		query.setMaxResults(getPageSize());
		setVisibleItems(query.list());
		// the total number of results is computed here since scrolling is not allowed when rendering
		scrollableResults.last(); 
		setTotalItemsCount(scrollableResults.getRowNumber() + 1);
		if (logger.isDebugEnabled()) {
			logger.debug("done.");
		}
		if (getVisibleItemsCountInternal() == 0 && getTotalItemsCountInternal() != 0) {
			setCurrentPageInternal(getLastPageNumberInternal());
			loadItemsInternal();
		}
		updateLoadTime();
	}

	/**
	 * @return the query string.
	 */
	protected abstract String getQueryString();

} 

