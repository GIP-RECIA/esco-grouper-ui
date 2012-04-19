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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.exceptions.business.ESCOStemNotDeleteException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotSaveException;
import org.esco.grouperui.exceptions.business.ESCOStemNotUniqueException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.application.filters.SearchStemEnum;
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
    private static final String PERSON_ID_APD00000     = "Apd00000";

    /** name of the group Lycee_1:Langues:LV1Allemand. */
    private static final String GROUP_NAME_LV1ALLEMAND = "Lycee_1:Langues:LV1Allemand";

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
    public void updateMembers() throws ESCOAddMemberException, ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException, ESCODeleteMemberException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
        sources.put("esco:ldap", SourceTypeEnum.PERSON);
        sources.put("g:gsa", SourceTypeEnum.GROUP);

        List < String > attributes = new ArrayList < String >();
        attributes.add("displayName");
        attributes.add("name");
        attributes.add("description");

        List < String > membersToAdd = new ArrayList < String >();
        // person Jean-Claude XERYCO
        membersToAdd.add("F0890072");
        // group football
        membersToAdd.add("dd51834ceb4f468b81bfceb5a7a8476c");

        this.grouperClientImpl.addMembers(person, GrouperServiceClientTest.GROUP_NAME_LV1ALLEMAND, membersToAdd);

        Members members = this.grouperClientImpl.findMembers(person,
                GrouperServiceClientTest.GROUP_NAME_LV1ALLEMAND, attributes, sources, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(members);
        List < Subject > subjects = members.getSubjects();
        Assert.assertNotNull(subjects);
        Assert.assertEquals(subjects.size(), 2);

        Subject subject = subjects.get(0);
        Assert.assertNotNull(subject);
        Assert.assertEquals(subject.getId(), "F0890072");
        Assert.assertEquals(subject.getTypeEnum(), SourceTypeEnum.PERSON);
        Assert.assertNotNull(subject.getAttributes());

        subject = subjects.get(1);
        Assert.assertNotNull(subject);
        Assert.assertEquals(subject.getId(), "dd51834ceb4f468b81bfceb5a7a8476c");
        Assert.assertEquals(subject.getTypeEnum(), SourceTypeEnum.GROUP);
        Assert.assertNotNull(subject.getAttributes());

        this.grouperClientImpl
                .removeMembers(person, GrouperServiceClientTest.GROUP_NAME_LV1ALLEMAND, membersToAdd);

        members = this.grouperClientImpl.findMembers(person, GrouperServiceClientTest.GROUP_NAME_LV1ALLEMAND,
                attributes, sources, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(members);
        subjects = members.getSubjects();
        Assert.assertNotNull(subjects);
        Assert.assertEquals(subjects.size(), 0);
    }

    public void assignPrivilegesToStem() throws ESCOStemNotFoundException, ESCOStemNotUniqueException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Privilege priv1 = new Privilege();
        priv1.setPrivilegeName("create");
        priv1.setPrivilegeType("naming");

        this.grouperClientImpl.assignStemPrivileges(person, "7af118349b2d47908c0bd8eaf367cfba",
                "fdd86e05d4084b639de27e76a065e47c", priv1);

    }

    public void removePrivilegesToStem() throws ESCOStemNotFoundException, ESCOStemNotUniqueException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Privilege priv1 = new Privilege();
        priv1.setPrivilegeName("stem");
        priv1.setPrivilegeType("naming");

        this.grouperClientImpl.removeStemPrivileges(person, "7af118349b2d47908c0bd8eaf367cfba",
                "fdd86e05d4084b639de27e76a065e47c", priv1);

    }

    public void assignPrivilegesToGroup() throws ESCOGroupNotUniqueException, ESCOGroupNotFoundException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Privilege priv1 = new Privilege();
        priv1.setPrivilegeName("read");
        priv1.setPrivilegeType("access");

        this.grouperClientImpl.assignGroupPrivileges(person, "7af118349b2d47908c0bd8eaf367cfba",
                "d715e81074de4423a4f0d78432cc529a", priv1);

    }

    public void removePrivilegesToGroup() throws ESCOGroupNotUniqueException, ESCOGroupNotFoundException,
            ESCOSubjectNotFoundException, ESCOInsufficientPrivilegesException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Privilege priv1 = new Privilege();
        priv1.setPrivilegeName("read");
        priv1.setPrivilegeType("access");

        this.grouperClientImpl.removeGroupPrivileges(person, "7af118349b2d47908c0bd8eaf367cfba",
                "d715e81074de4423a4f0d78432cc529a", priv1);

    }

    public void findGroupPrivilegesGroup() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        this.grouperClientImpl.findSubjectPrivilegesGroup(person, "d715e81074de4423a4f0d78432cc529a",
                ScopeEnum.IMMEDIATE);

        this.grouperClientImpl.findSubjectPrivilegesGroup(person, GrouperServiceClientTest.PERSON_ID_APD00000,
                ScopeEnum.IMMEDIATE);
    }

    public void findGroupPrivilegesStem() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        // this.grouperClientImpl.findGroupPrivilegesStem(p,
        // "7af118349b2d47908c0bd8eaf367cfba", MembershipScopeEnum.ALL);
        this.grouperClientImpl.findSubjectPrivilegesStem(person, "fe57c16e2e2049e980cce36f14e2be36",
                ScopeEnum.EFFECTIVE);

        Assert.assertTrue(true);
    }

    public void findSubjectMemberOptinOptout() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        this.grouperClientImpl.findGroupsMemberOptinOptout(person);
    }

    public void defaultPrivilegesOnGroup() throws ESCOGroupNotFoundException, ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        this.grouperClientImpl.findDefaultGroupPrivileges(person, "7af118349b2d47908c0bd8eaf367cfba");
    }

    public void findStemByUUID() throws ESCOStemNotFoundException, ESCOStemNotUniqueException {
        Stem stem = this.grouperClientImpl.findStemByUuid(null, "1c70a6863cdc4449970da11dd795d123");

        Assert.assertNotNull(stem);
    }

    public void findStem() throws ESCOStemNotFoundException {
        List < Stem > stems = this.grouperClientImpl.searchStems(null, SearchStemEnum.NAME, "%un%", "root:etc");

        Assert.assertNotNull(stems);
    }

    public void findStemPrivileges() {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();

        sources.put("esco:ldap", SourceTypeEnum.PERSON);
        sources.put("g:gsa", SourceTypeEnum.GROUP);

        List < String > attributes = new ArrayList < String >();

        attributes.add("displayName");
        attributes.add("name");
        attributes.add("description");

        List < Privilege > privileges = this.grouperClientImpl.findStemPrivileges(person, attributes, sources,
                "root:Lycee_1", ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(privileges);
    }

    public void findGroupPrivileges() {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();

        sources.put("esco:ldap", SourceTypeEnum.PERSON);
        sources.put("g:gsa", SourceTypeEnum.GROUP);

        List < String > attributes = new ArrayList < String >();

        attributes.add("displayName");
        attributes.add("name");
        attributes.add("description");
        List < Privilege > privileges = this.grouperClientImpl.findGroupPrivileges(person, attributes, sources,
                "root:Lycee_1:Terminale:T1", ScopeEnum.ALL);

        Assert.assertNotNull(privileges);
    }

    public void createStem() throws ESCOStemNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException, ESCOStemNotUniqueException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        String rootName = "root:testMCT";

        Stem stem = new Stem();

        stem.addMappingFieldCol("name", rootName + ":" + "MALIE13");
        stem.addMappingFieldCol("displayExtension", "cjkcjkldjkljkl");
        stem.addMappingFieldCol("extension", "MALIE13");
        stem.addMappingFieldCol("description", "Cecie est une description");

        // stem.setName(rootName + ":" + "MALIE4");
        // stem.setDisplayExtension("cjkcjkldjkljkl");
        // stem.setExtension("MALIE4");
        // stem.setDisplayName(null);
        // stem.setDescription("Cecie est une description");
        // stem.setUuid("2ecccb40b9a748a794178e7a52d14b6f");

        try {
            this.grouperClientImpl.stemCreate(person, stem);
        } catch (ESCOStemNotSaveException e) {
            Assert.assertTrue(true);
        }

        Assert.assertTrue(true);
    }

    public void updateStem() throws ESCOStemNotFoundException, ESCOAttributeException,
            ESCOInsufficientPrivilegesException {
        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        Stem stem = new Stem();

        stem.setName("root:testMCT:MALIE14");
        stem.setDisplayExtension("cjkcjkldjkljkl");
        stem.setExtension("MALIE13");

        stem.setDescription("Cecie est une description");
        stem.setUuid("489c1ad77fab4364943dd16477aa44c1");

        try {
            this.grouperClientImpl.stemUpdate(person, stem);
        } catch (ESCOStemNotSaveException e) {
            Assert.assertTrue(true);
        }

        Assert.assertTrue(true);
    }

    public void createGroup() throws ESCOGroupNotSaveException, ESCOGroupNotFoundException,
            ESCOAttributeException, ESCOInsufficientPrivilegesException, ESCOGroupNotUniqueException {

        String groupName = "root:Lycee_1:Terminale:All:All:All:T8";

        Group group = new Group();

        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        group.setName(groupName);
        // group.setDisplayExtension("is all");
        // group.setExtension("TTTESSS2");
        // group.setDisplayName("root:Lycée1:Terminale:All");
        // group.setDescription("Ceci est une description de all");

        this.grouperClientImpl.groupCreate(person, group);

    }

    public void updateGroup() throws ESCOGroupNotSaveException, ESCOGroupNotFoundException,
            ESCOAttributeException, ESCOInsufficientPrivilegesException {

        String groupName = "root:Lycee_1:Terminale:All:All:All:T9";

        Group group = new Group();

        Person person = new Person();
        person.setId(GrouperServiceClientTest.PERSON_ID_APD00000);

        group.setName(groupName);
        // group.setDisplayExtension("is all");
        group.setExtension("TTTESSS2");
        group.setIdGroup("45b030d64c1e40aca33a54dcea74bf61");
        // group.setDisplayName("root:Lycée1:Terminale:All");
        // group.setDescription("Ceci est une description de all");

        this.grouperClientImpl.groupUpdate(person, group);
    }

    public void removeGroup() throws ESCOInsufficientPrivilegesException, ESCOGroupNotFoundException,
            ESCOGroupNotDeleteException {
        Person person = new Person();
        person.setId("F089000a");

        this.grouperClientImpl.groupDelete(person, "5f9270af50bf47ed8aefc50fb9baa9d8");

    }

    public void removeStem() throws ESCOStemNotFoundException, ESCOInsufficientPrivilegesException,
            ESCOStemNotDeleteException {
        Person person = new Person();
        person.setId("F089000a");

        this.grouperClientImpl.stemDelete(person, "d35494c599d64597b3e023cfbcff9d85");

    }

    public void copyMembers() throws ESCOAddMemberException, ESCOGroupNotFoundException,
            ESCOInsufficientPrivilegesException {

        Person person = new Person();
        person.setId("F089000a");

        this.grouperClientImpl.copyMembers(person, "root:Lycee_1:CDI", "root:Lycee_1:testTheCopyOfMembers");

    }
}
