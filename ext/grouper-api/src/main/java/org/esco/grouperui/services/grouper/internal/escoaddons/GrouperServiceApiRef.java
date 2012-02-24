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
