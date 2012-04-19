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
/**
 * ESUP-Portail Commons - Copyright (c) 2006-2009 ESUP-Portail consortium.
 */
package org.esupportail.commons.aop.cache;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.esupportail.commons.utils.ContextUtils;

/**
 * A caching interceptor that will check for results in session cache before calling methods.
 */
@Aspect
public class SessionCachingMethodInterceptor extends AbstractCachingMethodInterceptor {

	/**
	 * Constructor.
	 */
	public SessionCachingMethodInterceptor() {
		super();
	}

	/**
	 * @see org.esupportail.commons.aop.cache.AbstractCachingMethodInterceptor#getContextAttribute(java.lang.String)
	 */
	@Override
	protected Object getContextAttribute(final String name) {
		return ContextUtils.getSessionAttribute(name);
	}

	/**
	 * @see org.esupportail.commons.aop.cache.AbstractCachingMethodInterceptor#setContextAttribute(
	 * java.lang.String, java.lang.Object)
	 */
	@Override
	protected void setContextAttribute(
			final String name, 
			final Object value) {
		ContextUtils.setSessionAttribute(name, value);
	}

	/**
	 * @see org.esupportail.commons.aop.cache.AbstractCachingMethodInterceptor#around(
	 * org.aspectj.lang.ProceedingJoinPoint)
	 */
	@Override
	@Around("@annotation(org.esupportail.commons.aop.cache.SessionCache)")
	public Object around(final ProceedingJoinPoint joinPoint) throws Throwable {
		return super.around(joinPoint);
	}

}