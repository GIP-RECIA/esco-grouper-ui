package org.esco.grouperui.services.grouper.internal.escoaddons;

import java.util.EnumMap;
import java.util.Set;

import org.esco.grouperui.services.application.filters.ScopeEnum;

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
