package org.esco.grouperui.services.grouper.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.esco.grouperui.domaine.beans.Field;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.esco.grouperui.services.extension.ServiceConstants;
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
    ApplicationContext          beanFactory;

    @Autowired
    @Qualifier("grouperApiImpl")
    private IGrouperService     grouperApiImpl;

    /** person with id Apd00000. */
    private static final String PERSON_ID_APD00000  = "Apd00000";

    /** id of the group Lycée1:Premiere:P1. */
    private static final String GROUP_ID_P1         = "1d8c3c6201204653af473166436b9558";

    /** id of the group Lycée1:Premiere:P2. */
    private static final String GROUP_ID_P2         = "590f3e6e2dcc4140906975b39ebf600e";

    /** id of the group Lycee_1:Langues:LV1Anglais. */
    private static final String GROUP_ID_LV1ANGLAIS = "071d582890454b4b8946e4ff601f3c9a";

    /** name of the group Lycee_1:CDI. */
    private static final String GROUP_NAME_CDI      = "Lycee_1:CDI";

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
    public void findSubjectById() throws ESCOSubjectNotUniqueException, ESCOSubjectNotFoundException {
        String personId = "F08000by";

        Person person = this.grouperApiImpl.findSubjectById(personId);
        Assert.assertNotNull(person);
        Assert.assertEquals(person.getId(), personId);
        Assert.assertEquals(person.getName(), "julie.nuzusi");
        Assert.assertTrue(person.getAttributes().get("displayName").contains("Julie NUZUSI"));

        person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);
        Assert.assertNotNull(person);
        Assert.assertEquals(person.getId(), GrouperServiceApiTest.PERSON_ID_APD00000);
        Assert.assertEquals(person.getName(), "pierre.dupont");
        Assert.assertTrue(person.getAttributes().get("displayName").contains("Pierre Dupont"));
    }

    @Test
    public void findSubjectByIdWithSubjectNotFound() throws ESCOSubjectNotUniqueException {
        try {
            this.grouperApiImpl.findSubjectById("wwww");
            Assert.fail();
        } catch (ESCOSubjectNotFoundException e) {
            Assert.assertTrue(true);
        }
    }

    @Test
    public void findMembershipsImmediate() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);
        List < Group > memberships = this.grouperApiImpl.findMemberships(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(memberships);
        Assert.assertEquals(memberships.size(), 2);
        for (Group group : memberships) {
            Assert.assertNotNull(group);
            if ("Lycee_1:Langues:LV2Allemand".equals(group.getName())
                    || "Lycee_1:Langues:LV1Anglais".equals(group.getName())) {
                Assert.assertTrue(true);
            } else {
                Assert.fail();
            }
        }
    }

    @Test
    public void findMembershipsEffective() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);
        List < Group > memberships = this.grouperApiImpl.findMemberships(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.EFFECTIVE);

        Assert.assertNotNull(memberships);
        Assert.assertEquals(memberships.size(), 1);

        Group group = memberships.get(0);
        Assert.assertNotNull(group);
        Assert.assertEquals(group.getName(), "Lycee_3:Eleves");
    }

    @Test
    public void findMembershipsAll() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException,
            ESCOGroupNotFoundException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);
        List < Group > memberships = this.grouperApiImpl.findMemberships(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.ALL);

        Assert.assertNotNull(memberships);
        Assert.assertEquals(memberships.size(), 3);

        for (Group group : memberships) {
            Assert.assertNotNull(group);
            if ("Lycee_1:Langues:LV2Allemand".equals(group.getName())
                    || "Lycee_1:Langues:LV1Anglais".equals(group.getName())
                    || "Lycee_3:Eleves".equals(group.getName())) {
                Assert.assertTrue(true);
            } else {
                Assert.fail();
            }
        }
    }

    @Test
    public void findMembershipsWithoutMemberships() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException, ESCOGroupNotFoundException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);
        List < Group > memberships = this.grouperApiImpl.findMemberships(person,
                GrouperServiceApiTest.GROUP_ID_P2, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(memberships);
        Assert.assertTrue(memberships.isEmpty());
    }

    @Test
    public void findListTypes() {
        String[] names = new String[] {"standard", "list", "dynamique" };
        List < GroupType > liste = this.grouperApiImpl.findListTypes(names);
        Assert.assertNotNull(liste);
        Assert.assertEquals(liste.size(), names.length);
        for (GroupType groupType : liste) {
            Assert.assertNotNull(groupType);
            List < Field > fields = groupType.getFields();
            Assert.assertNotNull(fields);
            if ("dynamique".equals(groupType.getName())) {
                Assert.assertEquals(fields.size(), 2);
                Assert.assertEquals(fields.get(0).getName(), "description type");
                Assert.assertEquals(fields.get(1).getName(), "membres");
            }
        }
    }

    @Test
    public void findGroupTypes() {
        String[] names = new String[] {"standard", "list", "dynamique" };
        Map < String, GroupType > map = this.grouperApiImpl.findGroupTypes(names);
        Assert.assertNotNull(map);
        Assert.assertEquals(map.size(), names.length);

        GroupType groupType = map.get(names[2]);
        Assert.assertNotNull(groupType);
        List < Field > fields = groupType.getFields();
        Assert.assertNotNull(fields);
        Assert.assertEquals(fields.size(), 2);
        Assert.assertEquals(fields.get(0).getName(), "description type");
        Assert.assertEquals(fields.get(1).getName(), "membres");
    }

    @Test
    public void findGroupsMemberOptinOptout() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById("F089000d");
        List < Group > groups = this.grouperApiImpl.findGroupsMemberOptinOptout(person);

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 13);
        boolean found = false;
        for (Group group : groups) {
            Assert.assertNotNull(group);
            if ("Lycée1:Cours de récréation:optin+A".equals(group.getDisplayName())
                    && "optin+A".equals(group.getExtension())) {
                found = true;
                Assert.assertEquals(group.getMappingFieldCol().get(ServiceConstants.MAPPING_FIELD_COL_MEMBER),
                        Boolean.TRUE.toString());
            } else {
                Assert.assertEquals(group.getMappingFieldCol().get(ServiceConstants.MAPPING_FIELD_COL_MEMBER),
                        Boolean.FALSE.toString());
            }
        }
        if (!found) {
            Assert.fail();
        }
    }

    @Test
    public void findGroupPrivilegesImmediate() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
        sources.put("esco:ldap", SourceTypeEnum.PERSON);
        sources.put("g:gsa", SourceTypeEnum.GROUP);

        List < String > attributes = new ArrayList < String >();
        attributes.add("displayName");
        attributes.add("name");
        attributes.add("description");

        List < Privilege > privileges = this.grouperApiImpl.findGroupPrivileges(person, attributes, sources,
                GrouperServiceApiTest.GROUP_NAME_CDI, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(privileges);
        Assert.assertEquals(privileges.size(), 26);

        for (Privilege privilege : privileges) {
            Assert.assertNotNull(privilege);
        }

        Privilege privilege = privileges.get(0);
        Person personTarget = privilege.getPersonTarget();
        Assert.assertNotNull(personTarget);
        Assert.assertEquals(personTarget.getId(), GrouperServiceApiTest.PERSON_ID_APD00000);
        Assert.assertNotNull(personTarget.getAttributes());
        Assert.assertEquals(privilege.getPrivilegeName(), "admin");
        Assert.assertNull(privilege.getGroupTarget());

        privilege = privileges.get(1);
        Group groupTarget = privilege.getGroupTarget();
        Assert.assertNotNull(groupTarget);
        Assert.assertNotNull(groupTarget.getIdGroup());
        Assert.assertNotNull(groupTarget.getAttributes());
        Assert.assertEquals(privilege.getPrivilegeName(), "update");
        Assert.assertNull(privilege.getPersonTarget());
    }

    @Test
    public void findGroupPrivilegesEffective() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Privilege > privileges = this.grouperApiImpl.findGroupPrivileges(person, null, null,
                GrouperServiceApiTest.GROUP_NAME_CDI, ScopeEnum.EFFECTIVE);

        Assert.assertNotNull(privileges);
        Assert.assertEquals(privileges.size(), 690);

        for (Privilege privilege : privileges) {
            Assert.assertNotNull(privilege);
        }
    }

    @Test
    public void findGroupPrivilegesAll() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Privilege > privileges = this.grouperApiImpl.findGroupPrivileges(person, null, null,
                GrouperServiceApiTest.GROUP_NAME_CDI, ScopeEnum.ALL);

        Assert.assertNotNull(privileges);
        Assert.assertEquals(privileges.size(), 716);

        for (Privilege privilege : privileges) {
            Assert.assertNotNull(privilege);
        }
    }

    @Test
    public void findSubjectPrivilegesGroupImmediate() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Group > groups = this.grouperApiImpl.findSubjectPrivilegesGroup(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);

        Group group = groups.get(0);
        Assert.assertNotNull(group);
        Assert.assertEquals(group.getName(), GrouperServiceApiTest.GROUP_NAME_CDI);
        Assert.assertEquals(group.getUserRight(), GroupPrivilegeEnum.UPDATE);
        Assert.assertTrue(group.isCanOptin());
        Assert.assertTrue(group.isCanOptout());
    }

    @Test
    public void findSubjectPrivilegesGroupEffective() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Group > groups = this.grouperApiImpl.findSubjectPrivilegesGroup(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.EFFECTIVE);

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 1);

        Group group = groups.get(0);
        Assert.assertNotNull(group);
        Assert.assertEquals(group.getName(), "Lycee_3:Eleves");
        Assert.assertEquals(group.getUserRight(), GroupPrivilegeEnum.VIEW);
        Assert.assertTrue(group.isCanOptin());
        Assert.assertTrue(group.isCanOptout());
    }

    @Test
    public void findSubjectPrivilegesGroupAll() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Group > groups = this.grouperApiImpl.findSubjectPrivilegesGroup(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.ALL);

        Assert.assertNotNull(groups);
        Assert.assertEquals(groups.size(), 2);
    }

    @Test
    public void findSubjectPrivilegesStemImmediate() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Stem > stems = this.grouperApiImpl.findSubjectPrivilegesStem(person,
                GrouperServiceApiTest.GROUP_ID_LV1ANGLAIS, ScopeEnum.IMMEDIATE);

        Assert.assertNotNull(stems);
        Assert.assertEquals(stems.size(), 2);

        Stem stem = stems.get(0);
        Assert.assertNotNull(stem);
        Assert.assertEquals(stem.getName(), "Lycee_1:Cours_de_recreation:CD");
        Assert.assertTrue(stem.getHasStem());
        Assert.assertFalse(stem.getHasCreate());

        stem = stems.get(1);
        Assert.assertNotNull(stem);
        Assert.assertEquals(stem.getName(), "Lycee_1:Cours_de_recreation:CG");
        Assert.assertFalse(stem.getHasStem());
        Assert.assertTrue(stem.getHasCreate());
    }

    @Test
    public void findSubjectPrivilegesStemEffective() throws ESCOSubjectNotFoundException,
            ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Stem > stems = this.grouperApiImpl.findSubjectPrivilegesStem(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.EFFECTIVE);

        Assert.assertNotNull(stems);
        Assert.assertEquals(stems.size(), 2);

        Stem stem = stems.get(0);
        Assert.assertNotNull(stem);
        Assert.assertEquals(stem.getName(), "Lycee_1:Cours_de_recreation:CD");
        Assert.assertTrue(stem.getHasStem());
        Assert.assertFalse(stem.getHasCreate());

        stem = stems.get(1);
        Assert.assertNotNull(stem);
        Assert.assertEquals(stem.getName(), "Lycee_1:Cours_de_recreation:CG");
        Assert.assertFalse(stem.getHasStem());
        Assert.assertTrue(stem.getHasCreate());
    }

    @Test
    public void findSubjectPrivilegesStemAll() throws ESCOSubjectNotFoundException, ESCOSubjectNotUniqueException {
        Person person = this.grouperApiImpl.findSubjectById(GrouperServiceApiTest.PERSON_ID_APD00000);

        List < Stem > stems = this.grouperApiImpl.findSubjectPrivilegesStem(person,
                GrouperServiceApiTest.GROUP_ID_P1, ScopeEnum.ALL);

        Assert.assertNotNull(stems);
        Assert.assertEquals(stems.size(), 2);
    }

}
