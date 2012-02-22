package org.esco.grouperui.services.grouper.internal.escoaddons;

import java.util.Collection;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
import org.esco.grouperui.tools.IWrapper;
import org.odmg.NotImplementedException;

import edu.internet2.middleware.grouper.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;

public class JustIterableListGroupWrapper extends NotImplementedList<org.esco.grouperui.domaine.beans.Group> {
/*	private Set<Group> viewvers;
	private Set<Group> admins;
	private Set<Group> updaters;
	private Set<Group> readers;
	private Set<Group> optins;
	private Set<Group> optout;
*/	private Set<Group> members;

	
	private EnumMap<Privs, Set<Group>> directPrivs2Set = new EnumMap<Privs, Set<Group>>(Privs.class);
	private EnumMap<Privs, Set<Group>> indirectPrivs2Set = new EnumMap<Privs, Set<Group>>(Privs.class);
	
	private IWrapper < Group, org.esco.grouperui.domaine.beans.Group>    groupAPIWrapper;
	
	private Map<String, org.esco.grouperui.domaine.beans.Group> total = 
							new HashMap<String, org.esco.grouperui.domaine.beans.Group>();		
	
	
	
	
	
	Set<Group> getMembers() {
		return members;
	}

	void setMembers(Set<Group> members) {
		this.members = members;
	}

	Set<Group> getGroupSet(Privs priv, ScopeEnum scope) {
		switch (scope) {
		case IMMEDIATE:
				return directPrivs2Set.get(priv);
		case EFFECTIVE:
				return indirectPrivs2Set.get(priv);
		default:
			break;
		}
		return null;
	}

	public void setGroupSet(Privs priv, ScopeEnum scope, Set<Group> privs2Set) {
		switch (scope) {
		case IMMEDIATE:
			 directPrivs2Set.put(priv, privs2Set);
			break;
		case EFFECTIVE:
			indirectPrivs2Set.put(priv, privs2Set);
		default:
			break;
		}
	}



	protected IWrapper<Group, org.esco.grouperui.domaine.beans.Group> getGroupAPIWrapper() {
		return groupAPIWrapper;
	}
	
	

	protected void setGroupAPIWrapper(
			IWrapper<Group, org.esco.grouperui.domaine.beans.Group> groupAPIWrapper) {
		this.groupAPIWrapper = groupAPIWrapper;
	}





	Map<String, org.esco.grouperui.domaine.beans.Group> getTotal() {
		return total;
	}

	void setTotal(Map<String, org.esco.grouperui.domaine.beans.Group> total) {
		this.total = total;
	}

	
	/**
	 * test si tous les ensembles passés en perametre sont vide.
	 * @param set liste d'ensemble
	 * @return true si tous les ensembles sont vide ou null.
	 */
	private boolean allSetEmpty(EnumMap<Privs, Set<Group>> map){
		for (Set<Group> set : map.values()) {
			if (set != null && !set.isEmpty()) return false;
		}
		return true;
	}
	
	
	
	@Override
	public boolean isEmpty() {
		
		return allSetEmpty(directPrivs2Set) && allSetEmpty(indirectPrivs2Set);
		
	}

	public Iterator<org.esco.grouperui.domaine.beans.Group> iterator() {
		
		return new Iterator<org.esco.grouperui.domaine.beans.Group>() {
			private Iterator<Group> it ;
			
			private  org.esco.grouperui.domaine.beans.Group nextGroup;
			
			// attention l'ordre a de l'importance car ADMIN => UPDATE => READ => VIEW
			// ANY est utilisé pour members
		/*	final private Privs privs[] = {	Privs.ADMIN, 
											Privs.UPDATE, 
											Privs.READ, 
											Privs.VIEW, 
											Privs.OPTIN,
											Privs.OPTOUT};
		*/
			private Privs priv;
			private ScopeEnum scope;
		//	private int idx = -1;
			
			{
				
				priv = Privs.STEM; // un privilege bidon (qui ne concerne pas les groupes) comme init
				it = nextPriv();
			}
			
	/*		
			private EnumMap<Privs, Set<Group>> nextScope(){
				EnumMap<Privs, Set<Group>> map;
				switch (scope) {
				case ALL:
					  scope = ScopeEnum.IMMEDIATE;
					  return directPrivs2Set;
					break;
				case IMMEDIATE:
						scope = ScopeEnum.EFFECTIVE;
						return indirectPrivs2Set;
				default:
						scope = ScopeEnum.ALL;
						return null;
					break;
				}
			}
	*/		private boolean nextScope(){
				EnumMap<Privs, Set<Group>> map;
				switch (scope) {
				case ALL:
					  scope = ScopeEnum.IMMEDIATE;
					  return true;
				case IMMEDIATE:
						scope = ScopeEnum.EFFECTIVE;
						return true;
				default:
						scope = ScopeEnum.ALL;
						return false;
				}
			}
	
	
			private Set<Group> nextSet(){
				Set<Group> sg;
				while (nextScope()){
					sg = getGroupSet(priv, scope);
					if (sg != null) {
						return sg;
					}
				}
				return null;
			}
			
			@SuppressWarnings("fallthrough")
			private Iterator<Group> nextPriv(){
				Set<Group> sg; 
			//	idx++;
			//	if (idx < privs.length) {
			//	switch (privs[idx]) {
				switch (priv) {
				case STEM:
						priv = Privs.ADMIN;
						scope = ScopeEnum.ALL;
				case ADMIN:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv = Privs.UPDATE;
						scope = ScopeEnum.ALL;
				case UPDATE:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv = Privs.READ;
						scope = ScopeEnum.ALL;
				case READ:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv = Privs.VIEW;
						scope = ScopeEnum.ALL;
				case VIEW:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv = Privs.OPTIN;
						scope = ScopeEnum.ALL;
				case OPTIN:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv = Privs.OPTOUT;
						scope = ScopeEnum.ALL;
				case OPTOUT:
						sg = nextSet();
						if (sg != null) return sg.iterator();
						priv= Privs.STEM;
						scope = ScopeEnum.ALL;
				default:
					break;
				}
				
				
				return null;
			}
			
			
			@Override
			public boolean hasNext() {
				if (it == null) return false;
				if (nextGroup != null) return true;

				boolean inTotal = true;
				
				while (it.hasNext() && inTotal) {
					Group group = it.next();
					String name = group.getName();
					nextGroup = getTotal().get(name);
					if (nextGroup == null) {
						inTotal = false;
						nextGroup = getGroupAPIWrapper().wrap(group);
						getTotal().put(name, nextGroup);
							// ces privileges sont traités ici car un seul des 4 doit etre affecté
							// avec la priorite donné par l'ordre de lecture dans nextPriv()
						switch (priv){
						case ADMIN:
							nextGroup.setUserRight(GroupPrivilegeEnum.ADMIN);
							break;
				
						case UPDATE:
							nextGroup.setUserRight(GroupPrivilegeEnum.UPDATE);
							break;
					
						case READ:
							nextGroup.setUserRight(GroupPrivilegeEnum.READ);
							break;
						case VIEW:
							nextGroup.setUserRight(GroupPrivilegeEnum.VIEW);	
							break;
						default:
							break;
						}
						if (getMembers() != null) {
							nextGroup.addMappingFieldCol(
									ServiceConstants.MAPPING_FIELD_COL_MEMBER,
									((Boolean) getMembers().contains(group)).toString() );
						}
					}
						// OPTIN et OPTOUT sont traités ici car il sont donnés en complement des autres privilèges
					switch (priv) {
						case OPTIN:
							nextGroup.setCanOptin(true);
							break;
						case OPTOUT:
							nextGroup.setCanOptout(true);
							break;
						default:
							break;
					}
				}
				
				if (! inTotal) return true;

				it = nextPriv();
		
				return hasNext();
			}

			@Override
			public org.esco.grouperui.domaine.beans.Group next() {
				if (hasNext()){
					org.esco.grouperui.domaine.beans.Group group = nextGroup;
					nextGroup = null;
					return group;
				}
				return null;
			}

			@Override
			public void remove() {
				throw new NotImplementedException();
				
			}
			
		};
		
		
		
	}

	
}
