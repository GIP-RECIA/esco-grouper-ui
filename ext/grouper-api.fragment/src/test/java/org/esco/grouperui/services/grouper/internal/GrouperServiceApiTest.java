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
 *
 */
package org.esco.grouperui.services.grouper.internal;

import java.util.List;
import java.util.Map;
import java.util.Set;

import junit.framework.Assert;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;

import com.mycila.testing.junit.MycilaJunitRunner;
import com.mycila.testing.plugin.spring.SpringContext;

/**
 * @author SopraGroup
 */
@SpringContext(locations = {"classpath:/spring/grouper-api.xml", "classpath:/spring/grouper-api-strategy.xml",
        "classpath:/spring/esco-core.xml" })
@RunWith(MycilaJunitRunner.class)
public class GrouperServiceApiTest {

    @Autowired
    ApplicationContext      beanFactory;

    @Autowired
    @Qualifier("grouperApiImpl")
    private IGrouperService grouperApiImpl;

    /**
     * @param name
     */
    public GrouperServiceApiTest() {
    }

    @BeforeClass
    public static void beforeTest() {
        System.setProperty("conf.dir",
                "D:/Recia/java/apache-tomcat-5.5.27/wtpwebapps/ESCOGrouper/WEB-INF/classes/properties");
    }

    @Test
    public void searchSubjectsWithUAIStrategy() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {

        Person person = this.grouperApiImpl.findSubjectById("F08000by");

        List < Person > subjects = this.grouperApiImpl.searchSubjects(person,
                "esco:Etablissements:CLAUDE DE FRANCE_0410017W:BREVET DE TECH SUP EN 2 ANS 2EME ANN:Eleves_801",
                "*jul*");

        Assert.assertNotNull(subjects);
        Assert.assertEquals(subjects.size(), 35);

        Map < String, Set < String >> attributes;
        for (Person subject : subjects) {
            Assert.assertNotNull(subject);
            Assert.assertNotNull(subject.getId());
            Assert.assertNotNull(subject.getAttributes());

            attributes = subject.getAttributes();
            Set < String > setString = attributes.get("ESCOUAI");

            for (String string : setString) {
                if (!"0410017W".equals(string)) {
                    Assert.fail();
                }
            }
        }
    }

    @Test
    public void searchSubjectsWithDefaultStrategy() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {

        Person person = this.grouperApiImpl.findSubjectById("F08000by");

        List < Person > subjects = this.grouperApiImpl.searchSubjects(person, "Lycee_1", "*jul*");

        Assert.assertNotNull(subjects);
        Assert.assertEquals(subjects.size(), 73);

        for (Person subject : subjects) {
            Assert.assertNotNull(subject);
            Assert.assertNotNull(subject.getId());
        }
    }

}
