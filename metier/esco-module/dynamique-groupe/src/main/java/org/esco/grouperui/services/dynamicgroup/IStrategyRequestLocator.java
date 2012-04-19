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
package org.esco.grouperui.services.dynamicgroup;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;

/**
 * <pre>
 * &lt;bean id=&quot;defaultStrategyRequestLocator&quot;
 *              class=&quot;org.esco.grouperui.services.dynamicgroup.internal.DefaultStrategyRequestLocator&quot;&gt;
 *             &lt;property name=&quot;evaluator&quot; &gt;
 *                     &lt;description&gt;
 *                             expression evaluator. This class can be evaluate java regexp in jexel expression.
 *                     &lt;/description&gt;
 *                     &lt;bean class=&quot;org.esco.grouperui.services.dynamicgroup.internal.ExpressionEvaluator&quot; /&gt;
 *             &lt;/property&gt;
 *             &lt;property name=&quot;strategies&quot; &gt;
 *                     &lt;description&gt;
 *                             all strategies.
 *                     &lt;/description&gt;
 *                     &lt;map&gt;
 *                             &lt;entry key=&quot;evaluator.regexp('esco:Etablissements:(([&circ;_]+)_(\\d{5,7}\\w?))(:[&circ;:]+)*|esco:admin:([&circ;:]+:){1,3}(([&circ;:]+)_(\\d{5,7}\\w?))|esco:Applications:([&circ;:]+:){1,2}(([&circ;:]+)_(\\d{5,7}\\w?))', path)&quot;&gt;
 *                                     &lt;bean class=&quot;org.esco.grouperui.services.dynamicgroup.internal.DefaultStrategyRequestFactory&quot; /&gt;
 *                             &lt;/entry&gt;
 *                             &lt;entry key=&quot;evaluator.regexp('(.*)', term)&quot;&gt;
 *                                     &lt;bean class=&quot;org.esco.grouperui.services.dynamicgroup.internal.UAIStrategyRequestFactory&quot; /&gt;
 *                             &lt;/entry&gt;
 *                     &lt;/map&gt;
 *             &lt;/property&gt;
 *     &lt;/bean&gt;
 * </pre>
 * 
 * @author dMoulron
 */
public interface IStrategyRequestLocator {

    /**
     * locator for good strategy corresponding to expression in spring
     * declaration.
     * 
     * @param thePerson
     *            the person call this method.
     * @param theGroup
     *            the group which use to construct request
     * @param theStem
     *            the stem which use to construct request
     * @return one strategy corresponding to the expression
     */
    IStrategyRequestFactory locate(final Person thePerson, final Group theGroup, final Stem theStem);
}
