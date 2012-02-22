package org.esco.grouperui.services.grouper.internal.escoaddons;


import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;

import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.odmg.NotImplementedException;

import edu.internet2.middleware.grouper.Field;
import edu.internet2.middleware.grouper.FieldFinder;
import edu.internet2.middleware.grouper.Group;
import edu.internet2.middleware.grouper.GrouperSession;
import edu.internet2.middleware.grouper.Member;
import edu.internet2.middleware.grouper.MemberFinder;
import edu.internet2.middleware.grouper.Membership;
import edu.internet2.middleware.grouper.Stem;
import edu.internet2.middleware.grouper.misc.Owner;
import edu.internet2.middleware.subject.Subject;

public class GrouperHelper {

	
	/**
	 * Un logger.
	 */
	 private static final IESCOLogger logger= ESCOLoggerFactory.getLogger(GrouperHelper.class);

	 
	/**
	 * le cache.
	 */
	private Cache cache;
	
	/**
	 * Le member de travail
	 */
	private Member member;
	
	/**
	 * le subject de travail
	 */
	private Subject subject;
	
	private GrouperSession session;

	private String prefixClee;


	
//	private Map<ScopeEnum, Privs2GroupsSetMap> map4memberGoups = new EnumMap<ScopeEnum, Privs2GroupsSetMap>(ScopeEnum.class);
	

	public GrouperHelper(Cache cache){
		this.cache = cache; 
	}

	public GrouperHelper(Cache cache, GrouperSession session) {
		this(cache);
		setSession(session);	
	}

	private Set<String> newSet() {
		return Collections.synchronizedSet(new HashSet());
	}

	
	/**
	 * la clef qui donne les noms de groupe ou stem où this.member à des droits.   
	 * @return
	 */
	private String getPrivCleeOLD(){
		return prefixClee + "all:";
	}
	
	

/* TODO : a supprimé  apres avoir geré les consequences 
	private <T> Clee<Map<Privs, Set<T>>>  getCleeOLD(final String suffix ){
		return new Clee <Map<Privs, Set<T>>>(prefixClee + suffix){
			@Override
			public Map<Privs, Set<T>> buildElem() {
				return new TreeMap<Privs, Set<T>>();
			}
		};
	}
*/	
	/**
	 * 
	 * @param <T>
	 * @param <M>
	 * @param suffix
	 * @param scope
	 * @param theClass
	 * @return
	 */
	private <T, M extends Privs2SetMap<T>> Clee<M> getClee(
														final ScopeEnum scope, 
														final Class<M> theClass){
		StringBuilder sb = new StringBuilder(prefixClee);
		sb.append(theClass.getName()).append(":").append(scope.name());
		return new Clee<M>(sb.toString()){
			@Override
			public M buildElem() {
				try {
					M elem = theClass.newInstance();
					elem.setScope(scope);
					return elem;
				} catch (InstantiationException e) {
					logger.error(e, "class =" , theClass.getName());
				} catch (IllegalAccessException e) {
					logger.error(e, "class =" , theClass.getName());
				}
				return null;
			}
		};
	}
	
	/**
	 * @param scope
	 * @return la Clee 
	 */
	private Clee<Privs2GroupsSetMap> getGroupClee(final ScopeEnum scope){
		return getClee(scope , Privs2GroupsSetMap.class);
	}
	
	
	private Clee<Privs2StemsSetMap> getStemClee(final ScopeEnum scope){
		return getClee(scope, Privs2StemsSetMap.class);
	}
	
	/**
	 * 
	 * @param scope
	 * @return la clée correspondante au scope
	 */
	private Clee<Privs2NamesSetMap> getNameClee(final ScopeEnum scope){
		return getClee(scope , Privs2NamesSetMap.class);
	}
	
	/**
	 * Recherche les noms de stems (ou group) dans lesquels this.member  à un group ou 
	 * un stem sur lequel il a le privilège donné.
	 * Le résultat est mis en cache.
	 * 
	 * @param priv le privilège à calculer
	 * @parm returnAll demande de retourner le resultat pour tous les privilèges déjà calculés .
	 * @return Set<String> l'ensemble des noms de stems trouvés.
	 */
	private Set<String> findNamesWhereMemberHasPrivCached(Privs priv, boolean returnAll) {
			Clee<Privs2NamesSetMap> clee = getNameClee(ScopeEnum.ALL) ;
			
			Set<String> res ;
			Set<String> path;
			
			Privs2NamesSetMap  map = getCacheElem(clee);
			
			synchronized (map) {
					path = map.get(Privs.ANY);
					
					if (path == null ) {
							// si any est vide
						path = newSet();
				   			// on reconstruit any avec ce qu'il y a pour les autres privs
				   		if (!map.isEmpty()) {
							for (Privs privAux : Privs.values()) {
								if (privAux.isRight()) {
									Set<String> set = map.get(privAux);
									if (set != null) {
										for (String name : set) {
											addAllPath(name, path);
										}
									}
								}	
							}
						}
						map.put(Privs.ANY, path);
					} 
					
					res = map.get(priv);
					
					if (res == null) {
							// cas ou le privileges demander est vide
						res = findNamesWhereMemberHasPriv(priv, path);
						map.put(priv, res);
					}
			}
			if (returnAll) return path;
			return res;
	}
		
		
	public void clearCache() {
		
		synchronized (cache) {
			for (ScopeEnum scope : ScopeEnum.values()) {
				Clee clee= getStemClee(scope);
				cache.remove(clee);
				clee = getGroupClee(scope);
				cache.remove(clee);
				clee = getNameClee(scope);
				cache.remove(clee);
			}
		}
	}
	
/*	private <T> void clearCache(Clee<T> clee){
		synchronized (cache) {
			cache.remove(clee);
		}
	}
*/	
	
	
	/**
	 * @param priv
	 * @param map
	 */
	private <T extends Privs2SetMap> void clearCachePriv(final Privs priv, Clee<T> clee){
		Element e;
		T map;
		synchronized (cache) {
			if (priv == null) {
				cache.remove(clee);
				return;
			} 
			e =  cache.get(clee);
			if (e == null) return;
			map = (T) e.getObjectValue();
		}
		
		if (map == null ) return ;
		
		synchronized(map) {
			map.remove(priv);
			map.remove(Privs.ANY);
		}
		
	}
	
	
	public void clearCache(Privs priv) {
			clearCacheGroup(priv);
			clearCacheStem(priv);
			clearCacheName(priv);			
	}
	
	public void clearCacheGroup(Privs priv){
		if (priv == null || priv.isGroup()) {
			for (ScopeEnum scope : ScopeEnum.values()) {
			
				clearCachePriv(priv, getGroupClee(scope));
			}
		}
	}
	
	public void clearCacheStem(Privs priv){
		if (priv == null || priv.isStem()) {
			for (ScopeEnum scope : ScopeEnum.values()) {
				clearCachePriv(priv, getStemClee(scope));
			}
		}
	}
	public void clearCacheName(Privs priv){
		if (priv == null || priv.isRight()) {
			for (ScopeEnum scope : ScopeEnum.values()) {
				clearCachePriv(priv, getNameClee(scope));
			}
		}
	}
	
	private <T> T getCacheElem(Clee<T> clee) {
		Element elem;
		T val;
		synchronized(cache) {
			elem = cache.get(clee);
			if (elem == null) {
				val = clee.buildElem();
				if (val != null){
					elem = new Element(clee, val);
					cache.put(elem);
				}
			} else {
				val = (T) elem.getObjectValue();
			}
			return val;
		}
	}
	
	
	
	/**
	 * Ajoute les noms, d'un stem ou group, à un ensemble de noms (setOfName).
	 * Ajoute tous les paths de ce nom, à un ensemble de noms de path (setOfPath)  
	 * 
	 * @param name le nom de groupe  ou stem à ajouter dans les ensembles
	 * @param setOfName l'ensemble de noms de groupe ou stem à modifier (ne doit pas être null)
	 * @param setOfPath l'ensemble des paths à modifier (ne doit pas être null)
	 */
	private Set<String> addName(String name, Set<String> setOfName, Set<String> setOfPath) {
		setOfName.add(name);
		addAllPath(name, setOfPath);
		return setOfName;	
	}
	
	/**
	 * Ajoute tous les paths d'un nom (name), à un ensemble de paths (setOfPath)  
	 */
	private void addAllPath(String name , Set<String> setOfPath) {
		Boolean addOk = setOfPath.add(name);
		String path = name;
		while (addOk) {
			int aux = path.lastIndexOf(':');
			if (aux <= 0) {
				addOk = false;
			} else {
				path = path.substring(0, aux);
				addOk = setOfPath.add(path);
			}			
		}
	}
	
	/**
	 * Ensemble des noms d'un ensemble de groupes.
	 *
	private Set<String> namesSetOfGroups(Set<Group> setOfgroups, Set<String> setOfPath) {
		Set<String> res = newSet();
		for (Group group : setOfgroups) {
			String str = group.getName(); 
			addName(str, res, setOfPath);
		}
		return res;
	}
	*/
	/**
	 * Ensemble des noms d'un ensemble de stems.
	 *
	private Set<String> namesSetOfStem(Set<Stem> setOfStems, Set<String> setOfPath) {
			Set<String> res = newSet();
			for (Stem stem : setOfStems) {
				String str = stem.getName();
				addName(str, res, setOfPath);
			}
			return res;
	}
	*/
	
	/**
	 * Ensemble des noms d'un ensemble de stems ou groups.
	 * Attention setOfPath est modifié.
	 * 
	 * @param setOfOwner ensemble de stems ou groups.
	 * @param setOfPath  ensemble, resultat, de chemin déduit des stems ou groups.
	 * @param <T> 
	 * @return l'ensemble des noms déduit.
	*/
	private  <T extends Owner> Set<String> namesSetOfOwner(final Set<T> setOfOwner, Set<String> setOfPath ) {
		Set<String> res = newSet();
		for (T owner : setOfOwner) {
			String str = owner.getName();
			addName(str, res, setOfPath);
		}
		return res;
	}
	
	
	/**
	 * Recherche des noms de stem (ou group) dans  lesquels this.member a un group ou stem ayant le privilège donné .
	 * Les ensembles de groups ou stems sont cachés.
	 * 
	 * @param privilege Le privilège de filtrage.
	 * @return Set<String> Ensemble de noms.
	 */
	private Set<String> findNamesWhereMemberHasPriv(Privs privilege, Set<String> setOfPath) {
		if (privilege.isGroup()) return namesSetOfOwner(findGroupsWhereMemberHasPrivCached(privilege,ScopeEnum.ALL), setOfPath);
		if (privilege.isStem()) return namesSetOfOwner(findStemWhereMemberHasPrivCached(privilege), setOfPath);
		return setOfPath;
	}
	
	/**
	 * Recherche les groups pour lesquels this.member a un privilège donné.
	 * @param privilege : le privilège de recherche
	 * @return Ensemble des groupes trouvés.
	 */
	private Set<Group> findGroupsWhereMemberHasPriv(Privs privilege) {
		Member m = getMember();
		switch (privilege) {
			case ADMIN: return m.hasAdmin();
			case UPDATE: return m.hasUpdate();
			case READ: return m.hasRead();
			case VIEW: return m.hasView();
			case OPTIN: return m.hasOptin();
			case OPTOUT: return m.hasOptout();
			default: return null;
		}
	}
	
	/**
	 * Recherche les groupes sur lesquels this.member à un privilège donné pour un scope donné.
	 *  
	 * @param priv privilège de recherche
	 * @param scope scope du privilège de recherche 
	 * @return ensemble de groupe trouvés
	 */
	public Set<Group> findGroupsWhereMemberHasPriv (final Privs priv, final ScopeEnum scope){
		Member m = getMember();
		Field f = FieldFinder.find(priv.getFieldName(), true);
		switch (scope){
			case IMMEDIATE: return m.getImmediateGroups(f);
			case EFFECTIVE: return m.getEffectiveGroups(f);
			default: return findGroupsWhereMemberHasPriv(priv);
		}
	}
	
	
 	
	/**
	 * Recherche les groupes sur lesquels this.member à un privilège donné pour un scope donné.
	 * Version cachée de {@link #findGroupsWhereMemberHasPriv(Privs, ScopeEnum)}i
	 * @param privilege de recherche.
	 * @param scope du privilege de recherche.
	 * @return ensemble des groupes trouvés.
	 */
	public Set<Group> findGroupsWhereMemberHasPrivCached(final Privs privilege, final ScopeEnum scope) {
		Set<Group> leSet ;
		Privs2GroupsSetMap laMap = getCacheElem(getGroupClee(scope));
		
		synchronized (laMap) {
			leSet = laMap.get(privilege);
			if (leSet != null) return leSet;
			leSet = findGroupsWhereMemberHasPriv(privilege,scope);
			laMap.put(privilege, leSet);
			return leSet;
		}
	
	}
	
	
	
	
	
	public Iterable<Stem> findStemWhereMemberHasPriv(final Privs privilege, final ScopeEnum scope){
		if (! privilege.isStem()) return null;
		
		Field f = FieldFinder.find(privilege.getFieldName(), true);

		Set<Membership> memberships;
		Set<Stem> stems;
		final Set<Membership> membershipsRes;
		switch (scope) {
		case IMMEDIATE:
				memberships = getMember().getImmediateMemberships(f);
			break;
		case EFFECTIVE:
				memberships = getMember().getEffectiveMemberships(f);
			break;
		default:
				return findStemWhereMemberHasPriv(privilege);
		}
		
		membershipsRes = memberships;
		
		return new Iterable<Stem>() {
			
			
			@Override
			public Iterator<Stem> iterator() {
				return new Iterator<Stem>() {

					Iterator<Membership> it = membershipsRes.iterator();
					
					@Override
					public boolean hasNext() {
						
						return it.hasNext();
					}

					@Override
					public Stem next() {
						return it.next().getStem();
					}

					@Override
					public void remove() {
						throw new NotImplementedException();
						
					}
					
				};
			}
		};
	}
 	
	/**
	 * Recherche les stems sur lesquels this.member a un privilège donné.
	 * @param privilege : le privilège de recherche
	 * @return Ensemble de stems trouvés.
	 */
	public Set<Stem> findStemWhereMemberHasPriv(Privs privilege) {

		switch (privilege) {
		case CREATE: return getMember().hasCreate();
		case STEM:return getMember().hasStem();
		default: return null;
		}
	}
	
	/**
	 * Recherche les stems pour lesquels this.member a un privilège donné.
	 * Version avec mise en cache des stems trouvé de {@link #findStemWhereMemberHasPriv(Privs)}.
	 * @see #findStemWhereMemberHasPriv
	 * @param privilege : le privilège de recherche.
	 * @return Ensemble des stems trouvés.
	 */
	public Set<Stem> findStemWhereMemberHasPrivCached(Privs privilege) {
		Set<Stem> leSet ;
		Map<Privs, Set<Stem>> laMap = getCacheElem(getStemClee(ScopeEnum.ALL));
		synchronized (laMap) {
			leSet = laMap.get(privilege);
			if (leSet != null) return leSet;
			leSet = findStemWhereMemberHasPriv(privilege);
			laMap.put(privilege, leSet);
			return leSet;
		}
	}
	
	
	
	
	/**
	 * Test si l'utilisateur a un privilèges dans le stem donné.
	 * Le privilège peut être sur un élement dans l'arborescence donnée
	 * par le stem.
	 * @param String stemName
	 * @return boolean 
	 */
	public boolean userHasPrivs(String stemName){
		
		for (Privs priv : Privs.values()) {
			if (priv.isRight()) {
				// on demande le calcul de chaque privs mais on s'arrete des que l'on a trouver
				Set<String> names = findNamesWhereMemberHasPrivCached(priv, true);
				if (names.contains(stemName)) {
					return true;	
				}
			}
		}
		return false;
	}
	
	/**
	 * Donne la liste des noms de privilège que l'utilisateur à sur un groupe ou stem donné.
	 * @param groupOrStemName Nom du groupe ou du stem a tester
	 * @param isGroup true si on test un groupe false pour un stem
	 * @return La liste de privilége 
	 * 
	 *
	 public List<Privs> userPrivsList (String groupOrStemName, boolean isGroup) {
		 List<Privs> privsList = new ArrayList<Privs>(Privs.values().length);
		 for (Privs priv : Privs.values()) {
			 if ( (priv.isRight()) && (isGroup == priv.isGroup())) {
				 Set<String> names = findNamesWhereMemberHasPrivCached(priv, false);
				 if (names.contains(groupOrStemName)){
					privsList.add(priv); 
				}
			}
		}
		return privsList;
	}
	*/
	 public List<Privs> userPrivsList(final Stem stem ) {
		 List<Privs> privsList = new ArrayList<Privs>();
		 for (Privs priv : Privs.values()) {
			 if (priv.isStem()) {
				 Set<Stem> stems = findStemWhereMemberHasPrivCached(priv);
				 if (stems.contains(stem)) {
					 privsList.add(priv);
				 }
			 }
		 }
		 return privsList;
	 }
	 
	 public List<Privs> userPrivsList(final Group group) {
		 List<Privs> privsList = new ArrayList<Privs>();
		 for (Privs priv : Privs.values()) {
			 if (priv.isGroup()) {
				 Set<Group> groups = findGroupsWhereMemberHasPrivCached(priv, ScopeEnum.ALL);
				 if (groups.contains(group)) {
					 privsList.add(priv);
				 }
			 }
		 }
		 return privsList;
	 }
	
	/**
	 * Pour une session, détermine le membre correspondant à l'utilisateur de connection  
	 * @param s GrouperSession pour l'utilisateur connexion
	 */
	public static Member getMember(GrouperSession s) {
		try {
			//return MemberFinder.findBySubject(s, s.getSubject());
			return MemberFinder.findBySubject(s, s.getSubject(), false);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 *	Fixe la session grouper. 
	 */
	public void setSession(GrouperSession session){
		this.session = session;
		setSubject(session.getSubject());
	}
	
	
	public Member getMember() {
		if (member == null) {
			member = MemberFinder.findBySubject(session, subject, false);
		}
		return member;
	}
	
	private boolean testSubjectMember(){
		return member == null || member.getSubjectId().equals(subject.getId() );
	}
	
	/**
	 * fixe le member: lève un exception si le membre n'est pas le subject de this.
	 * Est utile pour éviter le calcul du member si on le connait déjà, à utilisé qu'après avoir fixé le subject. 
	 * @param member
	 * @throws GrouperHelperException
	 */
	public void setMember(Member member) throws GrouperHelperException {
		this.member = member;
		if (!testSubjectMember()) {
			this.member = null;
			throw new GrouperHelperException(
					String.format("subject (%s) et member incompatible: %s != %s ", 
							subject.getName() , subject.getId(), member.getSubjectId()));
		}
	}
	
	public Subject getSubject() {
		return subject;
	}

	/**
	 * fixe le subject:
	 * permet de travailler sur un subject  autre que celui définit dans la session.
	 * si on connait le member correspondant au subject il faut pour des raisons de perfomance le donner
	 * avec setMember();
	 *   
	 * @param subject
	 */
	public void setSubject(Subject subject) {
		this.subject = subject;
		this.prefixClee = subject.getName() + ":";
		if (!testSubjectMember()) {
			member = null;
		}
	}

}
