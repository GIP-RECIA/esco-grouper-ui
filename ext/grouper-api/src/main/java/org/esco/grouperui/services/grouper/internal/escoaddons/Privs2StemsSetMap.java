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
package org.esco.grouperui.services.grouper.internal.escoaddons;

import org.esco.grouperui.services.application.filters.ScopeEnum;

import edu.internet2.middleware.grouper.Stem;
/**
 * @author sopragroup
 */
public class Privs2StemsSetMap extends Privs2SetMap<Stem> {

	public Privs2StemsSetMap() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Privs2StemsSetMap(ScopeEnum theScope) {
		super(theScope);
		// TODO Auto-generated constructor stub
	}

}
