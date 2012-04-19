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

import org.esupportail.commons.utils.Assert;
import org.springframework.orm.hibernate3.HibernateTemplate;

/**
 * A simple abstract DAO implementation.
 */
public abstract class AbstractSimpleHibernateDaoService 
extends AbstractGenericHibernateDaoService {

	/**
	 * The Hibernate template. 
	 */
	private HibernateTemplate hibernateTemplate;

	/**
	 * Bean constructor.
	 */
	protected AbstractSimpleHibernateDaoService() {
		super();
	}

	/**
	 * @see org.esupportail.commons.dao.AbstractGenericHibernateDaoService#initDao()
	 */
	@Override
	public void initDao() {
		Assert.notNull(hibernateTemplate, 
				"property hibernateTemplate of class " + getClass().getName() + " can not be null");
	}

	/**
	 * @see org.esupportail.commons.dao.AbstractGenericHibernateDaoService#getHibernateTemplate()
	 */
	@Override
	protected HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	/**
	 * @param hibernateTemplate the hibernateTemplate to set
	 */
	public void setHibernateTemplate(final HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

}
