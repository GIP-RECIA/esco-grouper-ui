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
}
