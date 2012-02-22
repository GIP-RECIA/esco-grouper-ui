package org.esco.grouperui.services.grouper.internal.escoaddons;


import edu.internet2.middleware.grouper.Group;
import org.esco.grouperui.services.application.filters.ScopeEnum;

public class Privs2GroupsSetMap extends Privs2SetMap<Group>{

	public Privs2GroupsSetMap(ScopeEnum theScope) {
		super(theScope);
	}
	
	public Privs2GroupsSetMap() {
		super();
	}
	
}
