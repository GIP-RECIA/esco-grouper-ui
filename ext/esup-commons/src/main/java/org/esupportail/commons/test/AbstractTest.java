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
package org.esupportail.commons.test;

import org.esupportail.commons.batch.WebApplicationEnvironment;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.AbstractTransactionalSpringContextTests;

/**
 * Based on AbstractDependencyInjectionSpringContextTests 
 * 
 * AbstractDependencyInjectionSpringContextTests seems not take care of web
 * scopes ...)
 * 
 * This works with web scope spring beans (session and request scope) if you use WebApplicationFilter 
 * in your test classes.
 * 
 * To use it you can write something like this :
 * 
 * <PRE>
public class TestUserLoginBean extends AbstractTest {

	public void testAuthenticate() throws Exception {

		new WebApplicationFilter(webApplicationUtils, new FilterChain() {

			public void doFilter(
					final ServletRequest arg0, 
					final ServletResponse arg1) 
			throws IOException, ServletException {
			

				UserLoginController userLogin = 
					(UserLoginController) applicationContext.getBean("userLoginController");
				userLogin.setUsername("invite");
				userLogin.setPassword("azerty");
				userLogin.authenticate();
				boolean isAuthenticated = userLogin.isAuthenticated();
				assertTrue(isAuthenticated);
			}

		).run();

	}
}
 *}</PRE>
 * 
 * 
 * @see WebApplicationEnvironment
 * 
 */
public abstract class AbstractTest extends AbstractTransactionalSpringContextTests {

//	/**
//	 * A logger.
//	 */
//  PA: if used, set assessors.
//	protected final Log log = LogFactory.getLog(getClass());

	/**
	 * The application environment.
	 * PA: if used, set assessors.
	 */
	private WebApplicationEnvironment webApplicationUtils = new WebApplicationEnvironment();

	/**
	 * Reinitialize a new request/response for every test method => a new WebApplicationUtils.
	 * @see org.springframework.test.AbstractTransactionalSpringContextTests#onSetUpBeforeTransaction()
	 */
	@Override
	protected void onSetUpBeforeTransaction() throws Exception {
		super.onSetUpBeforeTransaction();
		webApplicationUtils = new WebApplicationEnvironment();
	}

	/**
	 * To commit, we call setComplete => to rollabck comment it.
	 * So override this method - default is to rollback (setComplete is not called).
	 * @see org.springframework.test.AbstractTransactionalSpringContextTests#onSetUpInTransaction()
	 */
	@Override
	protected void onSetUpInTransaction() throws Exception {
		super.onSetUpInTransaction();
		// to commit, we call setComplete => to rollabck comment it
		//setComplete();
	}

	/** 
	 * @see org.springframework.test.AbstractSingleSpringContextTests#loadContextLocations(java.lang.String[])
	 */
	@Override
	protected ConfigurableApplicationContext loadContextLocations(final String [] locations) throws Exception {
		return webApplicationUtils.loadContextLocations(locations);
	}

	/**
	 * @see org.springframework.test.AbstractSingleSpringContextTests#getConfigLocations()
	 */
	@Override
	protected String[] getConfigLocations() {
		return WebApplicationEnvironment.CONFIG_LOCATIONS;
	}

}
