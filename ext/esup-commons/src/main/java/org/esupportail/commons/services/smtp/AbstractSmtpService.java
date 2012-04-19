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
package org.esupportail.commons.services.smtp;

import java.io.File;
import java.util.List;

import javax.mail.internet.InternetAddress;

/**
 * An abstract implementation of SmtpService that does not support tests.
 */
@SuppressWarnings("serial")
public abstract class AbstractSmtpService implements SmtpService {

	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#supportsTest()
	 */
	public boolean supportsTest() {
		return false;
	}

	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#test()
	 */
	public void test() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#send(javax.mail.internet.InternetAddress,
	 *  java.lang.String, java.lang.String, java.lang.String)
	 */
	public void send(
			final InternetAddress to, 
			final String subject, 
			final String htmlBody, 
			final String textBody) {
		send(to, subject, htmlBody, textBody, (String) null);
	}
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#send(javax.mail.internet.InternetAddress,
	 *  java.lang.String, java.lang.String, java.lang.String, java.util.List)
	 */
	public void send(
			final InternetAddress to, 
			final String subject, 
			final String htmlBody, 
			final String textBody, 
			final List<File> files) {
		send(to, subject, htmlBody, textBody, files, null);
	}
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendtocc(javax.mail.internet.InternetAddress[],
	 *  javax.mail.internet.InternetAddress[], javax.mail.internet.InternetAddress[], java.lang.String,
	 *   java.lang.String, java.lang.String, java.util.List)
	 */
	public void sendtocc(
			final InternetAddress [] tos, 
			final InternetAddress [] ccs, 
			final InternetAddress [] bccs,
			final String subject, 
			final String htmlBody, 
			final String textBody, 
			final List<File> files) {
		sendtocc(tos, ccs, bccs, subject, htmlBody, textBody, files, null);
	}
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendDoNotIntercept(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, java.lang.String)
	 */
	public void sendDoNotIntercept(
			final InternetAddress to, 
			final String subject, 
			final String htmlBody, 
			final String textBody) {
		sendDoNotIntercept(to, subject, htmlBody, textBody, (String) null);
	}
	
	/**
	 * @see org.esupportail.commons.services.smtp.SmtpService#sendDoNotIntercept(
	 * javax.mail.internet.InternetAddress, java.lang.String, java.lang.String, java.lang.String, java.util.List)
	 */
	public void sendDoNotIntercept(
			final InternetAddress to, 
			final String subject, 
			final String htmlBody, 
			final String textBody, 
			final List<File> files) {
		sendDoNotIntercept(to, subject, htmlBody, textBody, files, null);
	}
}
