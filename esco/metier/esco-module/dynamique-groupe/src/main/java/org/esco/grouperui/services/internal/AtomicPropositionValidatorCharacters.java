package org.esco.grouperui.services.internal;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import org.esco.dynamicgroups.domain.beans.II18NManager;
import org.esco.dynamicgroups.domain.definition.AtomicProposition;
import org.esco.dynamicgroups.domain.definition.IAtomicPropositionValidator;

/**
 * Checks that the attribute in an atomic proposition not contains forbidden
 * characters. This class add the support for i18n and the spring bean
 * injection.<br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L2-001]<br/>
 * [RECIA-ESCO-L2-002]
 * 
 * @author Sopra Group
 */
public class AtomicPropositionValidatorCharacters implements IAtomicPropositionValidator, Serializable {

    /** Serial version UID. */
    private static final long   serialVersionUID               = -6326428474665841668L;

    /** Key for an invalid attribute. */
    private static final String ATTRIBUTE_FORBIDDEN_CHARACTERS = "proposition.decoding.error.attribute.forbidden.characters";

    /** The i18n manager. */
    private II18NManager        i18n;

    /**
     * The characters or string of characters that can not be used in a
     * proposition.
     */
    private List < String >     forbiddenCharacters;

    /**
     * Builds an instance of AtomicPropositionValidatorBean.
     */
    public AtomicPropositionValidatorCharacters() {
        super();
    }

    /**
     * Builds an instance of AtomicPropositionValidatorBean.
     * 
     * @param forbiddenCharacters
     *            The forbidden characters.
     * @param i18n
     *            The Internationalization manager.
     */
    public AtomicPropositionValidatorCharacters(final List < String > forbiddenCharacters,
            final II18NManager i18n) {
        this.forbiddenCharacters = forbiddenCharacters;
        this.i18n = i18n;
    }

    /**
     * Checks the atom.
     * 
     * @param atom
     *            The atom to check.
     * @return True if the attribute in the atom not contains forbidden
     *         characters.
     * @see org.esco.dynamicgroups.domain.definition.IAtomicPropositionValidator#isValid(AtomicProposition)
     */
    public boolean isValid(final AtomicProposition atom) {
        boolean valid = true;
        String attribute = atom.getAttribute();
        for (String forbiddenChar : this.forbiddenCharacters) {
            if (null == attribute || attribute.matches(forbiddenChar)) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    /**
     * Explains why an atom is invalid.
     * 
     * @param invalidAtom
     *            The invalid atom.
     * @return The explanation.
     * @see org.esco.dynamicgroups.domain.definition.IAtomicPropositionValidator#explainInvalidAtom(AtomicProposition)
     */
    public String explainInvalidAtom(final AtomicProposition invalidAtom) {
        return this.i18n.getI18nMessage(AtomicPropositionValidatorCharacters.ATTRIBUTE_FORBIDDEN_CHARACTERS,
                invalidAtom.getAttribute(), Arrays.toString(this.getForbiddenCharacters().toArray()));
    }

    /**
     * Getter for i18n.
     * 
     * @return i18n.
     */
    public II18NManager getI18n() {
        return this.i18n;
    }

    /**
     * Setter for i18n.
     * 
     * @param i18n
     *            the new value for i18n.
     */
    public void setI18n(final II18NManager i18n) {
        this.i18n = i18n;
    }

    /**
     * Getter for forbiddenCharacters.
     * 
     * @return the forbiddenCharacters
     */
    public List < String > getForbiddenCharacters() {
        return this.forbiddenCharacters;
    }

    /**
     * Setter for forbiddenCharacters.
     * 
     * @param theForbiddenCharacters
     *            the forbiddenCharacters to set
     */
    public void setForbiddenCharacters(final List < String > theForbiddenCharacters) {
        this.forbiddenCharacters = theForbiddenCharacters;
    }

}
