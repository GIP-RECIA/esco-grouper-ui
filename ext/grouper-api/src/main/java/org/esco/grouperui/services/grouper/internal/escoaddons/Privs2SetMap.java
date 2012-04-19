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

import java.util.EnumMap;
import java.util.Set;

import org.esco.grouperui.services.application.filters.ScopeEnum;
/**
 * @author sopragroup
 */
public class Privs2SetMap <T> extends EnumMap<Privs, Set<T>>{
	private ScopeEnum scope;

	public Privs2SetMap(){
		super(Privs.class);
	}
	public Privs2SetMap(ScopeEnum theScope){
		super(Privs.class);
		scope = theScope;
	}

	protected ScopeEnum getScope() {
		return scope;
	}

	protected void setScope(ScopeEnum theScope){
		scope = theScope;
	}
}
