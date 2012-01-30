package org.esco.grouperui.services.grouper.internal.escoaddons;


import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.cache.ehcache.EhCacheFactoryBean;

import edu.internet2.middleware.grouper.Group;
import edu.internet2.middleware.grouper.GrouperSession;
import edu.internet2.middleware.grouper.Member;
import edu.internet2.middleware.grouper.MemberFinder;
import edu.internet2.middleware.grouper.Stem;
import edu.internet2.middleware.grouper.SubjectFinder;

public class GrouperHelper {

	/**
	 * Nom par defaut du cache.
	 */
	private static final String DEFAULT_CACHE_NAME = GrouperHelper.class.getName();
	
	
	/**
	 * Le nom par défaut du  cache manager bean.
	 */
	private static final String DEFAULT_CACHE_MANAGER_NAME = "cacheManager";
	
	/**
	 * Un logger.
	 */
	 private static final IESCOLogger logger= ESCOLoggerFactory.getLogger(GrouperHelper.class);



	/**
	 * le cacheManager.
	 */
	private static CacheManager cacheManager;	
	
	/**
	 * 
	 */
	 private static EhCacheFactoryBean cacheFactoryBean;
	
	/**
	 *  Les privilèges grouper 
	 */
	 enum Privs {	view,
		 			create, 
		 			read,
					update, 
		 	    	optin, 
		 			optout, 
					admin,
		 			stem,
		 			any;
		 			
		 			public boolean isStem() {
						switch (this) {
							case create :
							case stem : return true;
							default: return false;	
						}	
					}
					
					public boolean isGroup() {
						return this != any && ! isStem();	
					}
		 		};
	
	
		 		
	private static void initCacheFactory() {
		if (cacheFactoryBean == null) {
			cacheFactoryBean = new EhCacheFactoryBean();
	 		cacheFactoryBean.setCacheName(DEFAULT_CACHE_NAME);
	 		//cacheFactoryBean.setEternal(true);
	 		 cacheFactoryBean.setTimeToLive(600); //  en seconde
	 		cacheFactoryBean.setTimeToIdle(600); 
	 		try {
	        	cacheFactoryBean.afterPropertiesSet();
	        } catch (java.lang.Exception e) {
				logger.error("cacheFactoryBean.afterPropertiesSet erreur");
				throw new java.lang.RuntimeException(e);
			} 
		}
	}
	
	
	
	/**
	 * le cache.
	 */
	private Cache cache;
	
	private Member member;
	
	private GrouperSession session;

	private String prefixClee;

public GrouperHelper(){
	
	initCacheFactory();
	cache = (Cache) cacheFactoryBean.getObject();
	logger.debug("cacheName = "+cache.getName());
}

public GrouperHelper(GrouperSession session) {
	this();
	setSession(session);	
}

	private Set<String> newSet() {
		return Collections.synchronizedSet(new HashSet());
	}
	
	/**
	 * Les noms de stems où l'utilisateur courant à un groupe ou 
	 * un stem ayant le privilège donné.
	 * Le résultat est mis en cache.
	 * 
	 * @param priv le privilège à tester
	 * @return Set<String> l'ensemble de noms de stems où l'utilisateur courant à ce privilège
	 */
	public Set<String> getNamesWhereMemberHasPrivCached(Privs priv, boolean returnAll) {
			String clee = prefixClee;
			Element element;
			Map<Privs, Set<String>> map;
			Set<String> res ;
			Set<String> path;

			synchronized (cache) {
				element = cache.get(clee);
				if (element == null) {
					System.out.println("Defaut cache");
					//map = 	Collections.synchronizedSortedMap(new TreeMap());
					map = new TreeMap();
					cache.put(new Element(clee, map));
				} else {
					map = (Map<Privs, Set<String>> ) element.getObjectValue();			
				}
				
			}
			
			synchronized (map) {
					path = map.get(Privs.any);
					
					if (path == null ) {
							// si any est vide
						path = newSet();
				   			// on reconstruit any
				   		if (!map.isEmpty()) {
							for (Privs privAux : Privs.values()) {
								if (privAux != Privs.any) {
									Set<String> set = map.get(privAux);
									if (set != null) {
										for (String name : set) {
											addAllPath(name, path);
										}
									}
								}	
							}
						}
						map.put(Privs.any, path);
					}
					
					res = map.get(priv);
					
					if (res == null) {
						res = getNamesWhereMemberHasPriv(priv, path);
						map.put(priv, res);		
					}
			}
			if (returnAll) return path;
			return res;
	}
		
		
	public void clearCache() {
		String clee = prefixClee;
		System.out.println("clear cache:" +clee );
		synchronized(cache) {
			cache.remove(clee);
		}
	}
	
	public void clearCache(String privName) {
		String clee = prefixClee;
		Element element;
		Map<Privs, Set<String>>  map=null;
		
		System.out.println("clear sub cache:" +clee + " " + privName );

		synchronized(cache) {
			element = cache.get(clee);
			if (element != null) {
				map = (Map<Privs, Set<String>> ) element.getObjectValue();
			}	
		}
		
		if (map != null ) {
			synchronized(map) {
				try {
						// on supprime le cache lies au privilege
					map.remove(Privs.valueOf(privName));
						// on supprime any => force au recalcul
					map.remove(Privs.any);
				} catch (Exception e) {
					clearCache();
						cache.remove(clee);

				}
			}
		}	

	}
	
	
	
	
	/**
	 * Ajoute les noms, d'un stem ou groupe, à un ensemble de noms (setOfName).
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
	 */
	private Set<String> namesSetOfGroups(Set setOfgroups, Set<String> setOfPath) {
		Set<String> res = newSet();
		for (Object o : setOfgroups) {
			String str = ((Group) o).getName(); 
			addName(str, res, setOfPath);
		}
		return res;
	}
	
	/**
	 * Ensemble des noms d'un ensemble de stems.
	 */
	private Set<String> namesSetOfStem(Set setOfStems, Set<String> setOfPath) {
			Set<String> res = newSet();
			for (Object o : setOfStems) {
				String str = ((Stem) o).getName();
				addName(str, res, setOfPath);
			}
			return res;
	}
	
	
	/**
	 * Pour un privilège donnée donne tous les noms de stems  ou groupes où le membre a ce privilège.
	 * @param privilege
	 * @return Set<String> Ensembles des noms.
	 */
	private Set<String> getNamesWhereMemberHasPriv(Privs privilege, Set<String> setOfPath) {
		switch (privilege) {
			case admin:  return namesSetOfGroups(member.hasAdmin(), setOfPath);
			case update : return  namesSetOfGroups(member.hasUpdate(), setOfPath);
			case read : return  namesSetOfGroups(member.hasRead(), setOfPath);
			case view : return  namesSetOfGroups(member.hasView(), setOfPath);
			case optin : return  namesSetOfGroups(member.hasOptin(), setOfPath);
			case optout : return  namesSetOfGroups(member.hasOptout(), setOfPath);
			case create : return  namesSetOfStem(member.hasCreate(), setOfPath);
			case stem : return namesSetOfStem(member.hasStem(), setOfPath);
			default : return setOfPath;
		}
	}
	
	
	/**
	 * Test si l'utilisateur a un privilèges sur le stem donné.
	 * @param String stemName
	 * @return boolean 
	 */
	public boolean userHasPrivs(String stemName){
		
		for (Privs priv : Privs.values()) {
			if (priv != Privs.any) {
				Set<String> names = getNamesWhereMemberHasPrivCached(priv, true);
				if (names.contains(stemName)) {
					return true;	
				}
			}
		}
		return false;
	}
	
	/**
	 * Donne la liste des noms de privilège que l'utilisateur à sur un groupe ou stem donné
	 * 
	 */
	 public List<String> userPrivsNames (String groupOrStemName, boolean isGroup) {
		 List<String> privsNames = new ArrayList<String>(Privs.values().length);
		 for (Privs priv : Privs.values()) {
			 if ( (priv != Privs.any) && (isGroup == priv.isGroup())) {
				 Set<String> names = getNamesWhereMemberHasPrivCached(priv, false);
				 if (names.contains(groupOrStemName)){
					privsNames.add(priv.name()); 
				}
			}
		}
		return privsNames;
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
		this.member = getMember(session);
		this.prefixClee = session.getSubject().getName() + ":";
	}

}
