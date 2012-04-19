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
package org.esupportail.commons.aop;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * AOP Utilities.
 */
public abstract class AopUtils {

	/**
	 * Constructor.
	 */
	private AopUtils() {
		super();
	}

	/**
	 * @param joinPoint
	 * @return The key to cache the method call
	 */
	public static String getCacheKey(
			final ProceedingJoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		String key = joinPoint.getSignature().toLongString() + "(";
		String separator = "";
		for (int i = 0; i < args.length; i++) {
			key += separator;
			Object o = args[i];
			if (o == null) {
				key += "null";
			} else {
				key += o.getClass().getSimpleName();
				if (o instanceof String || o instanceof Number || o instanceof Boolean) {
					key += "[" + o + "]";
				} else {
					key += "#" + o.hashCode();
				}
			}
			separator = ", ";
		}
		key += ")";
		return key;
	}

	/**
	 * @param joinPoint
	 * @return The log signature
	 */
	public static String getLogSignature(
			final ProceedingJoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		String signature = joinPoint.getSignature().toLongString();
		String[] signatureParts = signature.split("\\(");
		String[] pathParts = signatureParts[0].split("\\.");
		String methodName = pathParts[pathParts.length - 1];
		String className = pathParts[pathParts.length - 2];
		String str = className + "." + methodName + "(";
		String separator = "";
		for (int i = 0; i < args.length; i++) {
			str += separator;
			Object o = args[i];
			if (o == null) {
				str += "null";
			} else {
				String[] nameParts = o.getClass().getSimpleName().split("\\.");
				String argClassName = nameParts[nameParts.length - 1];
				if (o instanceof String || o instanceof Number || o instanceof Boolean) {
					str += argClassName + "[" + o + "]";
				} else {
					str += argClassName + "#" + o.hashCode();
				}
			}
			separator = ", ";
		}
		str += ")";
		return str;
	}

}