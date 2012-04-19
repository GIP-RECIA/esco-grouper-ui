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

import org.esco.grouperui.services.application.IGrouperService;

/**
 * une classe qui reference le GrouperServiceApi a utilisé
 * @author legay
 *
 */
public class GrouperServiceApiRef {
	private IGrouperService grouperService;

	public IGrouperService getGrouperService() {
		return grouperService;
	}

	public void setGrouperService(IGrouperService grouperService) {
		this.grouperService = grouperService;
	}
	
	
	String test(){
		return "c'est un test";
	}
	
	public static void main(String[] args) {
		GrouperServiceApiRef g1 = new GrouperServiceApiRef();
		GrouperServiceApiRef g2 = new GrouperServiceApiRef();
			System.out.println(g1.test() == g2.test());
	}
}
