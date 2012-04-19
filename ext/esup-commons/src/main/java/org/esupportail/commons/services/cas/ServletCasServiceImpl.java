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

import java.io.IOException;
import java.net.URLEncoder;

import org.esupportail.commons.utils.ContextUtils;
import org.springframework.beans.factory.InitializingBean;

import edu.yale.its.tp.cas.client.CASReceipt;
import edu.yale.its.tp.cas.client.filter.CASFilter;
import edu.yale.its.tp.cas.proxy.ProxyTicketReceptor;

/** 
 * The implementation of CasService for setvlet.
 */
public class ServletCasServiceImpl implements InitializingBean, CasService {
	
	/**
	 * The serialization id.
	 */
	private static final long serialVersionUID = 3376709081615445608L;

	/**
	 * Bean constructor.
	 */
	public ServletCasServiceImpl() {
		//nothing to do
	}

	/**
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	public void afterPropertiesSet() {
		// nothing to check
	}

	/**
	 * @see org.esupportail.commons.services.cas.CasService#getProxyTicket(java.lang.String)
	 */
	public String getProxyTicket(final String targetService) throws CasException {
		CASReceipt receipt = (CASReceipt) ContextUtils.getSessionAttribute(CASFilter.CAS_FILTER_RECEIPT);
		String pgtIou = receipt.getPgtIou();
		if (pgtIou == null) {
			throw new CasException("pgtIou is null. Check your CAS proxy configuration.");
		}
		try {
			String url = URLEncoder.encode(targetService, "UTF-8"); 
			return ProxyTicketReceptor.getProxyTicket(pgtIou, url);
		} catch (IOException e) {
			throw new CasException("Unable to contact CAS serveur.", e);
		}
	}

	/**
	 * @see org.esupportail.commons.services.cas.CasService#validate()
	 */
	public void validate() throws CasException {
		// nothing to validate
	}
	
}
