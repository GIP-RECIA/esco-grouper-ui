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
package org.esupportail.commons.services.application;

import java.io.Serializable;


/** 
 * The interface of application services, which should inform about 
 * the current application (version, name...).
 */
public interface ApplicationService extends Serializable {
	
	/**
	 * @return the name of the application.
	 */
	String getName();
	
	/**
	 * @return the version.
	 */
	Version getVersion();

	/**
	 * @return the latest version.
	 */
	Version getLatestVersion();

	/**
	 * @return true for a quick start installation, false otherwise.
	 */
	boolean isQuickStart();

	/**
	 * @return the deploy type.
	 */
	String getDeployType();

	/**
	 * @return the copyright of the application.
	 */
	String getCopyright();
	
	/**
	 * @return the vendor of the application.
	 */
	String getVendor();
	
	/**
	 * @return the database driver
	 */
	String getDatabaseDriver();

	/**
	 * @return the database dialect
	 */
	String getDatabaseDialect();

	/**
	 * @return true when using JNDI
	 */
	boolean isDatabaseUseJndi();

}
