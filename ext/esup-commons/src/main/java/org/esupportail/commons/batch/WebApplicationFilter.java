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
package org.esupportail.commons.batch;

import javax.servlet.FilterChain;

import org.esupportail.commons.services.database.DatabaseUtils;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockServletContext;
import org.springframework.web.filter.RequestContextFilter;

/**
 * Used to run code (in Batch or JUnit mode) which requires a Web Application Environment to work.
 * 
 * The goal is to allow to use request or session scope spring bean inside a Barch/JUnit code.
 * 
 * To use it you can write something like this in Batch.java for exemple :
 * 
 * <PRE>{@code
  protected static void updateAcls() {
		try {
			WebApplicationEnvironment webApplicationUtils = new WebApplicationEnvironment();
			webApplicationUtils.loadDefaultContextLocations();
			new WebApplicationFilter(webApplicationUtils, new FilterChain() {
				public void doFilter(ServletRequest arg0, ServletResponse arg1) 
						throws IOException, ServletException {
					OriDefaultRootAcls oriDefaultRootAcls = 
						(OriDefaultRootAcls) BeanUtils.getBean("oriDefaultRootAcls");
					oriDefaultRootAcls.updateAcls();
				}
			}).run();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
 *}}</PRE>
 * 
 * @see WebApplicationEnvironment
 */
public final class WebApplicationFilter {

	private static RequestContextFilter contextFilter;
	private FilterChain chain;
	//TODO VB: what is this attribute for (never read)?
	private MockServletContext context;
	private MockHttpServletResponse response;
	private MockHttpServletRequest request;

	/**
	 * @param webApplicationUtils
	 * @param chain
	 */
	public WebApplicationFilter(
			final WebApplicationEnvironment webApplicationUtils, 
			final FilterChain chain) {
		this.chain = chain;
		context = webApplicationUtils.getContext();
		response = webApplicationUtils.getResponse();
		request = webApplicationUtils.getRequest();
		contextFilter = webApplicationUtils.getContextFilter();
	}

	/**
	 * Execute the filter.
	 * @throws Exception
	 */
	public void run() throws Exception {

		DatabaseUtils.open();
		DatabaseUtils.begin();
		contextFilter.doFilter(request, response, chain);
		DatabaseUtils.commit();
		DatabaseUtils.close();

	}
}
