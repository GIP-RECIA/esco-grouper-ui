package org.esco.grouperui.services.grouper.internal.utils;

import java.util.HashSet;
import java.util.Set;

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

public class EscoGrouperHelper {

    /**
     * Nom par defaut du cache.
     */
    private static final String       DEFAULT_CACHE_NAME         = EscoGrouperHelper.class.getName();

    /**
     * Le nom par défaut du cache manager bean.
     */
    private static final String       DEFAULT_CACHE_MANAGER_NAME = "cacheManager";

    /**
     * Un logger.
     */
    private final IESCOLogger         logger                     = ESCOLoggerFactory
                                                                         .getLogger(EscoGrouperHelper.class);

    /**
     * le cacheManager.
     */
    private static CacheManager       cacheManager;

    /**
	 *
	 */
    private static EhCacheFactoryBean cacheFactoryBean;

    /**
     * Les privilèges grouper
     */
    enum Privs {
        view, create, read, update, optin, optout, admin, stem
    };

    /**
     * le nom du cache.
     */
    private final String   cacheName = EscoGrouperHelper.DEFAULT_CACHE_NAME;

    /**
     * le cache.
     */
    private final Cache    cache;

    private Member         member;

    private GrouperSession session;

    private String         prefixClee;

    public EscoGrouperHelper() {

        if (EscoGrouperHelper.cacheFactoryBean == null) {
            EscoGrouperHelper.cacheFactoryBean = new EhCacheFactoryBean();
            EscoGrouperHelper.cacheFactoryBean.setCacheName(this.cacheName);
            // cacheFactoryBean.setEternal(true);
            EscoGrouperHelper.cacheFactoryBean.setTimeToLive(1800); // 30mn
            EscoGrouperHelper.cacheFactoryBean.setTimeToIdle(600); // 10mn
            try {
                EscoGrouperHelper.cacheFactoryBean.afterPropertiesSet();
            } catch (java.lang.Exception e) {
                this.logger.error("cacheFactoryBean.afterPropertiesSet erreur");
                throw new java.lang.RuntimeException(e);
            }
        }

        this.cache = (Cache) EscoGrouperHelper.cacheFactoryBean.getObject();
        this.logger.debug("cacheName = " + this.cache.getName());
    }

    public EscoGrouperHelper(final GrouperSession session) {
        this();
        this.setSession(session);
    }

    /**
     * Les noms de stems où l'utilisateur courant à un groupe ou un stem ayant
     * le privilège donné. Le résultat est mis en cache.
     * 
     * @param priv
     *            le privilège à tester
     * @return Set<String> l'ensemble de noms de stems où l'utilisateur courant
     *         à ce privilège
     */
    public Set < String > getStemsNamesWhereMemberHasPrivCached(final Privs priv) {
        String clee = this.prefixClee + priv;
        Element element = this.cache.get(clee);
        Set < String > res;
        if (element != null) {
            res = (Set < String >) element.getObjectValue();
        } else {
            res = this.getStemsNamesWhereMemberHasPriv(priv);
            this.cache.put(new Element(clee, res));
        }
        return res;
    }

    /**
     * Ajoute les noms, d'un stem et ses sous stems, à un ensemble de noms de
     * stems.
     * 
     * @param stemName
     *            le nom à ajouter dans l'ensemble
     * @param setOfStemName
     *            l'ensemble à modifier (ne doit pas être null)
     */
    private Set < String > addStem(final String stemName, final Set < String > setOfStemName) {
        String stem = stemName;
        Boolean addOk = setOfStemName.add(stem);
        return this.addStemOfGroup(stem, setOfStemName);
    }

    /**
     * Ajoute les sous stems d'un groupe à un ensemble de noms de stem.
     */
    private Set < String > addStemOfGroup(final String groupName, final Set < String > setOfStemName) {
        String stem = groupName;
        Boolean addOk;
        do {
            int aux = stem.lastIndexOf(':');
            if (aux <= 0) {
                addOk = false;
            } else {
                stem = stem.substring(0, aux);
                addOk = setOfStemName.add(stem);
            }
        } while (addOk);
        return setOfStemName;
    }

    /**
     * Ensemble des noms d'un ensemble de groupes.
     */
    private Set < String > namesSetOfGroups(final Set setOfgroups) {
        Set < String > res = new HashSet < String >();
        for (Object o : setOfgroups) {
            String str = ((Group) o).getName();
            this.addStemOfGroup(str, res);
        }
        return res;
    }

    /**
     * Ensemble des noms d'un ensemble de stems.
     */
    private Set < String > namesSetOfStem(final Set setOfStems) {
        Set < String > res = new HashSet < String >();
        for (Object o : setOfStems) {
            String str = ((Stem) o).getName();
            this.addStem(str, res);
        }
        return res;
    }

    /**
     * Pour un privilège donnée donne tous les noms de stems ou groupes où le
     * membre a ce privilège.
     * 
     * @param privilege
     * @return Set<String> Ensembles des noms.
     */
    public Set getStemsNamesWhereMemberHasPriv(final Privs privilege) {
        switch (privilege) {
            case admin:
                return this.namesSetOfGroups(this.member.hasAdmin());
            case update:
                return this.namesSetOfGroups(this.member.hasUpdate());
            case read:
                return this.namesSetOfGroups(this.member.hasRead());
            case view:
                return this.namesSetOfGroups(this.member.hasView());
            case optin:
                return this.namesSetOfGroups(this.member.hasOptin());
            case optout:
                return this.namesSetOfGroups(this.member.hasOptout());
            case create:
                return this.namesSetOfStem(this.member.hasCreate());
            case stem:
                return this.namesSetOfStem(this.member.hasStem());
            default:
                return new HashSet();
        }
    }

    /**
     * Test si l'utilisateur a un privilèges sur le stem donné.
     * 
     * @param String
     *            stemName
     * @return boolean
     */
    public boolean userHasPrivs(final String stemName) {
        for (Privs priv : Privs.values()) {
            Set < String > names = this.getStemsNamesWhereMemberHasPrivCached(priv);
            if (names.contains(stemName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Pour une session, détermine le membre correspondant à l'utilisateur de
     * connection
     * 
     * @param s
     *            GrouperSession pour l'utilisateur connexion
     */
    public static Member getMember(final GrouperSession s) {
        try {
            return MemberFinder.findBySubject(s, s.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Fixe la session grouper.
     */
    public void setSession(final GrouperSession session) {
        this.session = session;
        this.member = EscoGrouperHelper.getMember(session);
        this.prefixClee = session.getSubject().getName() + ":";
    }

}
