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
package org.esupportail.commons.services.cas;

import org.esupportail.commons.utils.HttpUtils;
import org.springframework.beans.factory.InitializingBean;


/** 
 * The implementation of CasService for portlets. The PGT is supposed 
 * to be passed to the portlet as a preferences attribute.
 */
public class PortletCasServiceImpl extends AbstractCasService implements InitializingBean {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 7540349970957963666L;

	/**
	 * The default preferences attribute used to pass the PT to the portlet. 
	 */
	private static final String DEFAULT_CAS_PROXY_TICKET_PREF = "casProxyTicket";
	
	/**
	 * The preferences attribute used to pass the PT to the portlet. 
	 */
	private String casProxyTicketPref;

	/**
	 * Bean constructor.
	 */
	public PortletCasServiceImpl() {
		super();
	}

	/**
	 * @see org.esupportail.commons.services.cas.AbstractCasService#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		if (casProxyTicketPref == null) {
			casProxyTicketPref = DEFAULT_CAS_PROXY_TICKET_PREF;
		}
	}
	
	/**
	 * @return the PGT.
	 */
	@Override
	protected String getServiceTicket() {
		return HttpUtils.getPortalPref(casProxyTicketPref);
	}
	
}
