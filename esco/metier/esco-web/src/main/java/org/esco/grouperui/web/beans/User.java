package org.esco.grouperui.web.beans;

import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Class User. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class User {

    /** User id. */
    private String                         uiid;

    /** Login (uid) of the user. */
    private String                         login;

    /** Language of the user. */
    private String                         lang;

    /**
     * Locale of the user.
     */
    private Locale                         locale;

    /** Attributes of user. */
    private Map < String, Set < String > > attributes;

    /** User roles. */
    private String[]                       role;

    /** user profil. */
    private String                         profil;

    /**
     * Default constructor.
     */
    public User() {
    }

    /**
     * Get the locale property.
     * 
     * @return the locale
     */
    public Locale getLocale() {
        return this.locale;
    }

    /**
     * Setter of the locale property.
     * 
     * @param theLocale
     *            the locale to set
     */
    public void setLocale(final Locale theLocale) {
        this.locale = theLocale;
    }

    /**
     * Get the attributes property.
     * 
     * @return the attributes
     */
    public Map < String, Set < String > > getAttributes() {
        return this.attributes;
    }

    /**
     * Setter of the attributes property.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final Map < String, Set < String > > theAttributes) {
        this.attributes = theAttributes;
    }

    /**
     * Getter for id.
     * 
     * @return the id to get.
     */
    public final String getId() {
        return this.uiid;
    }

    /**
     * Setter for id.
     * 
     * @param theId
     *            the id to set.
     */
    public final void setId(final String theId) {
        this.uiid = theId;
    }

    /**
     * Getter for role.
     * 
     * @return the role to get.
     */
    public String[] getRole() {
        return this.role;
    }

    /**
     * Setter for role.
     * 
     * @param theRole
     *            the role to set.
     */
    public void setRole(final String[] theRole) {
        this.role = theRole;
    }

    /**
     * Getter for login.
     * 
     * @return the login to get.
     */
    public final String getLogin() {
        return this.login;
    }

    /**
     * Setter for login.
     * 
     * @param theLogin
     *            the login to set.
     */
    public final void setLogin(final String theLogin) {
        this.login = theLogin;
    }

    /**
     * Getter for lang.
     * 
     * @return the lang to get.
     */
    public final String getLang() {
        return this.locale.getDisplayName();
    }

    /**
     * Setter for lang.
     * 
     * @param theLang
     *            the lang to set.
     */
    public final void setLang(final String theLang) {
        this.lang = theLang;
    }

    /**
     * getter for property profile
     * 
     * @return the profile
     */
    public String getProfil() {
        return this.profil;
    }

    /**
     * setter for property profile
     * 
     * @param theProfil
     *            the profile to set
     */
    public void setProfil(final String theProfil) {
        this.profil = theProfil;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer();

        buffer.append("Login : ");
        buffer.append(this.login);
        buffer.append("\n");
        buffer.append("lang : ");
        buffer.append(this.lang);
        buffer.append("\n");
        buffer.append("profil : ");
        buffer.append(this.profil);
        buffer.append("\n");
        buffer.append("id : ");
        buffer.append(this.uiid);
        buffer.append("\n");

        return buffer.toString();
    }
}
