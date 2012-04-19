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
package org.esupportail.commons.services.database;

import java.io.Serializable;


/**
 * The interface of database managers.
 */
public interface DatabaseManager extends Serializable {

	/**
	 * Open the database session.
	 */
	void openSession();

	/**
	 * Close the database session, roolback the current transaction if any.
	 */
	void closeSession();
	
	/**
	 * @return true if the manager opens/closes transactions.
	 */
	boolean isTransactionnal();

	/**
	 * Begin a transaction.
	 */
	void beginTransaction();

	/**
	 * End a transaction.
	 * @param commit true to commit the current transaction, false to rollback
	 */
	void endTransaction(boolean commit);

	/**
	 * Test the database.
	 */
	void test();
	
	/**
	 * @return true if the structure of the database can be created/upgraded.
	 */
	boolean isUpgradable();
	
	/**
	 * Create the database structure.
	 */
	void create();
	
	/**
	 * Upgrade the database structures.
	 */
	void upgrade();

}
