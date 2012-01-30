package org.esco.grouperui.services.dynamicgroup;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.GnuParser;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Members;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.domaine.beans.SourceTypeEnum;
import org.esco.grouperui.domaine.beans.Subject;
import org.esco.grouperui.exceptions.business.ESCOAddMemberException;
import org.esco.grouperui.exceptions.business.ESCODeleteMemberException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOInsufficientPrivilegesException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.services.application.filters.ScopeEnum;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author dMoulron
 */
public class BatchAddMember {

    /** The parameter groupName. */
    private static final String      GROUPNAME = "groupname";

    /** The parameter request. */
    private static final String      REQUEST   = "request";

    /** launch options. */
    private static final Options     OPTIONS   = new Options();

    /** spring application context. */
    private final ApplicationContext applicationContext;

    /** Command line options. */
    private final CommandLine        commandLine;

    static {
        // Example : AND(ENTPersonVille=Olivet)
        Option option = new Option("r", BatchAddMember.REQUEST, true,
                "request to find member must be added to group");
        option.setRequired(true);
        BatchAddMember.OPTIONS.addOption(option);

        option = new Option("g", BatchAddMember.GROUPNAME, true, "group name");
        option.setRequired(true);
        BatchAddMember.OPTIONS.addOption(option);
    }

    /**
     * Default constructor.
     * 
     * @param args
     *            arguments of the batch
     * @throws ParseException
     *             exception occurs parsing the command line
     */
    public BatchAddMember(final String[] args) throws ParseException {

        GnuParser parser = new GnuParser();
        this.commandLine = parser.parse(BatchAddMember.OPTIONS, args, true);

        this.applicationContext = new ClassPathXmlApplicationContext(
                new String[] {"classpath:/properties/applicationContext.xml" });
    }

    /**
     * @return 1 if no error
     * @throws ESCOGroupNotFoundException
     *             if the group matching the name is not found.
     * @throws ESCOInsufficientPrivilegesException
     *             if the person hasn't sufficient privilege to add members.
     * @throws ESCOAddMemberException
     *             if a member cannot be added. If this exception occurs no
     *             member is added.
     */
    public int run() throws ESCOAddMemberException, ESCOInsufficientPrivilegesException,
            ESCOGroupNotFoundException {
        final List < String > attributes = new ArrayList < String >();
        IGroupDynamicService groupDynamicService = (IGroupDynamicService) this.applicationContext
                .getBean("dynamicService");

        attributes.add("uid");
        attributes.add("ENTPersonVille");
        attributes.add("givenName");

        List < List < SimpleValue >> dynamicAttributes = groupDynamicService.decodeAndExecuteRequest(
                this.commandLine.getOptionValue(BatchAddMember.REQUEST), attributes, "ENTPerson");

        Validate.notNull(dynamicAttributes);
        Validate.isTrue(!dynamicAttributes.isEmpty());

        IGrouperService grouperService = (IGrouperService) this.applicationContext.getBean("grouperService");

        Person person = new Person();
        person.setId("Apd00000");
        // person.setSource(SourceTypeEnum.GROUP.name());

        List < String > attributesFind = new ArrayList < String >();
        Map < String, SourceTypeEnum > sources = new HashMap < String, SourceTypeEnum >();
        sources.put("g:gsa", SourceTypeEnum.GROUP);
        sources.put("esco:ldap", SourceTypeEnum.PERSON);

        attributesFind.add("displayName");
        attributesFind.add("name");

        try {
            Members members = grouperService.findMembers(person, this.commandLine
                    .getOptionValue(BatchAddMember.GROUPNAME), attributesFind, sources, ScopeEnum.IMMEDIATE);
            List < String > listForDelMember = new ArrayList < String >();
            for (Subject subject : members.getSubjects()) {
                listForDelMember.add(subject.getId());
            }
            if (!listForDelMember.isEmpty()) {
                grouperService.removeMembers(person, this.commandLine.getOptionValue(BatchAddMember.GROUPNAME),
                        listForDelMember);
            }
        } catch (ESCODeleteMemberException e) {
        }

        List < String > listForAddMember = new ArrayList < String >();
        for (List < SimpleValue > listAttr : dynamicAttributes) {
            for (SimpleValue attr : listAttr) {
                if ("uid".equals(attr.getKey())) {
                    listForAddMember.add(attr.getValue());
                }
            }
        }

        grouperService.addMembers(person, this.commandLine.getOptionValue(BatchAddMember.GROUPNAME),
                listForAddMember);

        return 1;
    }

    /**
     * Main method.
     * 
     * @param args
     *            arguments of the main method
     */
    public static void main(final String[] args) {

        try {
            BatchAddMember addMember = new BatchAddMember(args);
            addMember.run();
        } catch (ESCOAddMemberException e) {
            e.printStackTrace();
        } catch (ESCOInsufficientPrivilegesException e) {
            e.printStackTrace();
        } catch (ESCOGroupNotFoundException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
