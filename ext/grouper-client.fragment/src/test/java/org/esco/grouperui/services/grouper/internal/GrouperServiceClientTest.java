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
package org.esco.grouperui.services.grouper.internal;

import java.util.List;

import junit.framework.Assert;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;

import com.mycila.testing.junit.MycilaJunitRunner;
import com.mycila.testing.plugin.spring.SpringContext;

/**
 * GrouperServiceClient test case.
 * 
 * @author SopraGroup
 */
@SpringContext(locations = {"classpath:/spring/grouper-client.xml",
        "classpath:/spring/grouper-client-strategy.xml", "classpath:/spring/esco-core.xml" })
@RunWith(MycilaJunitRunner.class)
public class GrouperServiceClientTest {

    /** Application context. **/
    @SuppressWarnings("unused")
    @Autowired
    private ApplicationContext  beanFactory;

    /** Implementation for grouper client. **/
    @Autowired
    @Qualifier("grouperClientImpl")
    private IGrouperService     grouperClientImpl;

    /** person with id Apd00000. */
    private static final String ID_PERSON_APD00000 = "Apd00000";

    /**
     * @param name
     */
    public GrouperServiceClientTest() {
    }

    @BeforeClass
    public static void beforeTest() {
        System.setProperty("conf.dir",
                "D:/Recia/java/apache-tomcat-5.5.27/wtpwebapps/ESCOGrouper/WEB-INF/classes/properties");
    }

    @Test
    public void searchGroupsWithDisplayExtension() throws ESCOGroupNotFoundException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        List < Group > groups = this.grouperClientImpl.searchGroups(person, SearchGroupEnum.EXTENSION,
                SearchTypeEnum.SIMPLE, "", "admin");

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);
        Group group = groups.get(0);
        Assert.assertEquals(group.getName(), "etc:sysadmingroup");
    }

    @Test
    public void searchGroupsWithName() throws ESCOGroupNotFoundException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        List < Group > groups = this.grouperClientImpl.searchGroups(person, SearchGroupEnum.NAME,
                SearchTypeEnum.SIMPLE, "", "admin");

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);
        Group group = groups.get(0);
        Assert.assertEquals(group.getName(), "etc:sysadmingroup");

    }

    @Test
    public void searchGroupsWithDisplayName() throws ESCOGroupNotFoundException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        List < Group > groups = this.grouperClientImpl.searchGroups(person, SearchGroupEnum.DISPLAY_NAME,
                SearchTypeEnum.SIMPLE, "", "admin");

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 5);
        Group group = groups.get(0);
        Assert.assertEquals(group.getName(), "etc:UnDossier:UnGroupe");
        group = groups.get(1);
        Assert.assertEquals(group.getName(), "etc:UnDossier:grp2");
        group = groups.get(2);
        Assert.assertEquals(group.getName(), "etc:UnDossier:grp3");
        group = groups.get(3);
        Assert.assertEquals(group.getName(), "etc:unDossier2:grp4");
        group = groups.get(4);
        Assert.assertEquals(group.getName(), "etc:sysadmingroup");

    }

    @Test
    public void searchGroupsWithDisplayNameAndPath() throws ESCOGroupNotFoundException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        List < Group > groups = this.grouperClientImpl.searchGroups(person, SearchGroupEnum.DISPLAY_NAME,
                SearchTypeEnum.SIMPLE, "etc:unDossier2", "admin");

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);
        Group group = groups.get(0);
        Assert.assertEquals(group.getName(), "etc:unDossier2:grp4");

    }

    @Test
    public void searchGroupsWithWilcard() throws ESCOGroupNotFoundException {

        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        List < Group > groups = this.grouperClientImpl.searchGroups(person, SearchGroupEnum.EXTENSION,
                SearchTypeEnum.SIMPLE, "", "*adm*");

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);
        Group group = groups.get(0);
        Assert.assertEquals(group.getName(), "etc:unDossier2:grp4");
    }

    @Test
    public void searchGroupsNoGroupFound() {

        Person person = new Person();
        person.setId(GrouperServiceClientTest.ID_PERSON_APD00000);

        try {
            this.grouperClientImpl.searchGroups(person, SearchGroupEnum.EXTENSION, SearchTypeEnum.SIMPLE, "",
                    "xxx");
            Assert.fail();
        } catch (ESCOGroupNotFoundException e) {
            Assert.assertTrue(true);
        }
    }

}
