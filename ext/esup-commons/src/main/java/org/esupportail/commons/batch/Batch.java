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

import org.esupportail.commons.exceptions.ConfigException;
import org.esupportail.commons.services.application.ApplicationService;
import org.esupportail.commons.services.application.ApplicationUtils;
import org.esupportail.commons.services.database.DatabaseUtils;
import org.esupportail.commons.services.exceptionHandling.ExceptionUtils;
import org.esupportail.commons.services.ldap.LdapUserService;
import org.esupportail.commons.services.ldap.LdapUtils;
import org.esupportail.commons.services.ldap.SearchableLdapUserServiceImpl;
import org.esupportail.commons.services.logging.Logger;
import org.esupportail.commons.services.logging.LoggerImpl;
import org.esupportail.commons.services.portal.PortalUtils;
import org.esupportail.commons.services.smtp.AsynchronousSmtpServiceImpl;
import org.esupportail.commons.services.smtp.SmtpService;
import org.esupportail.commons.services.smtp.SmtpUtils;
import org.esupportail.portal.ws.client.PortalService;
import org.esupportail.portal.ws.client.TestablePortalService;
import org.esupportail.portal.ws.client.support.uportal.CachingUportalServiceImpl;
import org.esupportail.portal.ws.client.support.uportal.TestableUportalServiceImpl;

/**
 * A class with a main method called by ant targets.
 */
public class Batch {

	/**
	 * A logger.
	 */
	private static final Logger LOG = new LoggerImpl(Batch.class);
	
	/**
	 * Bean constructor.
	 */
	private Batch() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Print the syntax and exit.
	 */
	private static void syntax() {
		throw new IllegalArgumentException(
				"syntax: " + Batch.class.getSimpleName() + " <options>"
				+ "\nwhere option can be:"
				+ "\n- test-smtp: test the SMTP connection"
				+ "\n- test-ldap: test the LDAP connection"
				+ "\n- test-database: test the database connection");
	}
	
	/**
	 * Test the LDAP connection.
	 * @throws ConfigException 
	 */
	private static void testLdap() throws ConfigException {
		LdapUserService ldapUserService = LdapUtils.createLdapService();
		if (!ldapUserService.supportsTest()) {
			LOG.error("LdapUserService implementation [" + ldapUserService.getClass().getName() 
					+ "] does not support testing. Please use [" 
					+ SearchableLdapUserServiceImpl.class.getName() + "] instead.");
			return;
		}
		ldapUserService.test();
	}

	/**
	 * Test the SMTP connection.
	 * @throws ConfigException 
	 */
	private static void testSmtp() throws ConfigException {
		SmtpService smtpService = SmtpUtils.createSmtpService();
		if (!smtpService.supportsTest()) {
			LOG.error("SmtpService implementation [" + smtpService.getClass().getName() 
					+ "] does not support testing. Please use [" 
					+ AsynchronousSmtpServiceImpl.class.getName() + "] instead.");
			return;
		}
		smtpService.test();
	}

	/**
	 * Test the Portal connection.
	 * @throws ConfigException 
	 */
	private static void testPortal() throws ConfigException {
		PortalService portalService = PortalUtils.createPortalService();
		if (!(portalService instanceof TestablePortalService)) {
			LOG.error("PortalService implementation [" + portalService.getClass().getName() 
					+ "] does not support testing. Please use [" 
					+ TestableUportalServiceImpl.class.getName() + "] or [" 
					+ CachingUportalServiceImpl.class.getName() + "] instead.");
			return;
		}
		((TestablePortalService) portalService).test();
	}

	/**
	 * Test the database connection.
	 * @throws ConfigException 
	 */
	private static void testDatabase() throws ConfigException {
		DatabaseUtils.test();
	}
	
	/**
	 * Dispatch dependaing on the arguments.
	 * @param args
	 */
	protected static void dispatch(final String[] args) {
		switch (args.length) {
		case 0:
			syntax();
			break;
		case 1:
			if ("test-ldap".equals(args[0])) {
				testLdap();
			} else if ("test-smtp".equals(args[0])) {
				testSmtp();
			} else if ("test-portal".equals(args[0])) {
				testPortal();
			} else if ("test-database".equals(args[0])) {
				testDatabase();
			} else {
				syntax();
			}
			break;
		default:
			syntax();
			break;
		}
	}

	/**
	 * The main method, called by ant.
	 * @param args
	 */
	public static void main(final String[] args) {
		try {
			ApplicationService applicationService = ApplicationUtils.createApplicationService();
			LOG.info(applicationService.getName() + " v" + applicationService.getVersion());
			dispatch(args);
		} catch (Throwable t) {
			ExceptionUtils.catchException(t);
		}
	}

}
