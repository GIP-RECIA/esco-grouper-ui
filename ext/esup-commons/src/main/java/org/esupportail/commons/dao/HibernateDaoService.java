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

import org.hibernate.Query;
import org.hibernate.SQLQuery;

/**
 * An abstract DAO implementation.
 */
public interface HibernateDaoService {

	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String SELECT_KEYWORD = " SELECT ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String COUNT_KEYWORD = " COUNT ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String AS_KEYWORD = " AS ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String DISTINCT_KEYWORD = " DISTINCT ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String STAR_KEYWORD = " * ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String OPEN_PAREN_KEYWORD = " ( ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String CLOSE_PAREN_KEYWORD = " ) ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String COMMA_KEYWORD = " , ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String COUNT_ALL_PHRASE = 
		COUNT_KEYWORD + OPEN_PAREN_KEYWORD + STAR_KEYWORD + CLOSE_PAREN_KEYWORD;
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String FROM_KEYWORD = " FROM ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String ORDER_BY_KEYWORD = " ORDER BY ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String DESC_KEYWORD = " DESC ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String ASC_KEYWORD = " ASC ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String WHERE_KEYWORD = " WHERE ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String EXISTS_KEYWORD = " EXISTS ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String DOT_KEYWORD = ".";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String EQUALS_KEYWORD = " = ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String LIKE_KEYWORD = " LIKE ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String TRUE_KEYWORD = " true ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String FALSE_KEYWORD = " false ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String QUOTE_KEYWORD = "'";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String AND_KEYWORD = " AND ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String OR_KEYWORD = " OR ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String NOT_KEYWORD = " NOT ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String IN_KEYWORD = " IN ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String IS_NULL_PHRASE = " IS NULL ";
	
	/** @deprecated Use {@link HqlUtils} */
	@Deprecated
	String IS_NOT_NULL_PHRASE = " IS NOT NULL ";
	
	/**
	 * @param hqlQuery 
	 * @return a Query object that corresponds to a query string.
	 */
	Query getQuery(String hqlQuery);
	
	/**
	 * @param sqlQuery 
	 * @return a Query object that corresponds to a native SQL query string.
	 */
	SQLQuery getSqlQuery(String sqlQuery);
	
}
