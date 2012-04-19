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
package org.esupportail.commons.web.beans; 

import java.util.ArrayList;
import java.util.List;

/** 
 * A paginator built on existing lists.
 * @param <E> the class of the visibleItems
 */ 
@SuppressWarnings("serial")
public abstract class ListPaginator<E> extends AbstractPaginator<E> {
	
	/**
	 * Bean constructor.
	 */
	public ListPaginator() {
		super();
	}
	
	/**
	 * Bean constructor.
	 * @param pageSizeValues 
	 * @param pageSize
	 * @deprecated
	 */
	@Deprecated
	public ListPaginator(
			final List<Integer> pageSizeValues,
			final int pageSize) {
		super(pageSizeValues, pageSize);
	}
	
	/**
	 * @see org.esupportail.commons.web.beans.AbstractPaginator#loadItemsInternal()
	 */
	@Override
	public void loadItemsInternal() {
		List<E> list = getData();
		if (list == null || list.isEmpty()) {
			setCurrentPageInternal(0);
			setVisibleItems(new ArrayList<E>());
			return;
		}
		setTotalItemsCount(list.size());
		int begin = getPageSize() * getCurrentPageInternal();
		int end = Math.min(getPageSize() * (getCurrentPageInternal() + 1), getTotalItemsCountInternal()); 
		if (begin > end) {
			setCurrentPageInternal(0);
			end = Math.min(getPageSize() * (getCurrentPageInternal() + 1), getTotalItemsCountInternal()); 
		}
		setVisibleItems(list.subList(begin, end));
		if (getVisibleItemsCountInternal() == 0 && getTotalItemsCountInternal() != 0) {
			setCurrentPageInternal(getLastPageNumber());
			begin = getPageSize() * getCurrentPageInternal();
			end = Math.min(getPageSize() * (getCurrentPageInternal() + 1), getTotalItemsCountInternal()); 
			setVisibleItems(list.subList(begin, end));
		}
	}

	/**
	 * @return the data to set.
	 */
	protected abstract List<E> getData();

} 

