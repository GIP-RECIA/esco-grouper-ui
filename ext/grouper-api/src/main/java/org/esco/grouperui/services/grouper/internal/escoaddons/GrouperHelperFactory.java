package org.esco.grouperui.services.grouper.internal.escoaddons;

import net.sf.ehcache.Cache;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.cache.ehcache.EhCacheFactoryBean;

import com.mysql.jdbc.Field;

import edu.internet2.middleware.grouper.GrouperSession;

public class GrouperHelperFactory implements InitializingBean {

	
	/**
	 * Un logger.
	 */
	 private static final IESCOLogger logger= ESCOLoggerFactory.getLogger(GrouperHelperFactory.class);

	 /**
	  * Pour garder les grouperHelpers d'un même thread.
	  */
	 private ThreadLocal<GrouperHelper> threadLocalGrouperHelper = new ThreadLocal<GrouperHelper>(); 

	 /**
	 * le cacheFactory
	 */
	 private  EhCacheFactoryBean cacheFactoryBean;
	
	 private Cache cache;
	 
	
	@Override
	public void afterPropertiesSet() throws Exception {
		
		if (cache == null) {
		try {
			cache = (Cache) cacheFactoryBean.getObject();
		} catch (Exception e) {
			logger.error("le cacheFactoryBean doit être un factory de net.sf.ehcache.Cache: " + e.getMessage());
			throw e;
		}
		}
	}

	public GrouperHelper get(GrouperSession session){
		GrouperHelper gh = threadLocalGrouperHelper.get();
		if (gh == null) {
			gh = new GrouperHelper(cache, session);
			threadLocalGrouperHelper.set(gh);
		} else {
			gh.setSession(session);
		}
		return gh;
	}

	public EhCacheFactoryBean getCacheFactoryBean() {
		return cacheFactoryBean;
	}

	public void setCacheFactoryBean(EhCacheFactoryBean cacheFactoryBean) {
		this.cacheFactoryBean = cacheFactoryBean;
	}

	public Cache getCache() {
		return cache;
	}

	public void setCache(Cache cache) {
		this.cache = cache;
	}
	
	
}
