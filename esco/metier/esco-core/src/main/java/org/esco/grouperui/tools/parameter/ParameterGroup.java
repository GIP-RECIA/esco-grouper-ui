package org.esco.grouperui.tools.parameter;

import java.util.Collections;
import java.util.List;

import com.google.common.base.Function;
import com.google.common.collect.Lists;

/**
 * @author dMoulron
 */
/**
 * @author dMoulron
 */
public class ParameterGroup {

    /**
     * size of buffer.
     */
    private static final int   BUFFER_64 = 64;

    /**
     *
     */
    private String             name;

    /**
     *
     */
    private List < Parameter > parameters;

    /**
     * Default constructor.
     */
    public ParameterGroup() {
    }

    /**
     * getter for property name.
     * 
     * @return the name
     */
    public String getName() {
        return this.name;
    }

    /**
     * setter for property name.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.name = theName;
    }

    /**
     * getter for property parameters.
     * 
     * @return the parameters
     */
    public List < Parameter > getParameters() {
        return this.parameters;
    }

    /**
     * setter for property parameters.
     * 
     * @param theParameters
     *            the parameters to set
     */
    public void setParameters(final List < Parameter > theParameters) {
        this.parameters = theParameters;
    }

    /**
     * @return true if there are parameter, false otherwise
     */
    public boolean asParemeter() {
        return this.parameters != null && !this.parameters.isEmpty();
    }

    /**
     * setter for property parameters.
     * 
     * @param theParameters
     *            the parameters to be add
     */
    public final void addParameter(final Parameter theParameters) {
        if (this.parameters == null) {
            this.parameters = Collections.singletonList(theParameters);
        } else {
            this.parameters.add(theParameters);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer(ParameterGroup.BUFFER_64);
        buffer.append("Group - ").append("name : ").append(this.name).append(" [ ");

        if (this.parameters != null && !this.parameters.isEmpty()) {
            Lists.transform(this.parameters, new GroupParameterAppend(buffer));
        }
        return buffer.toString();
    }

    /**
     * @author dMoulron
     */
    private class GroupParameterAppend implements Function < Parameter, Parameter > {
        /**
         * the buffer for output.
         */
        private final StringBuffer buffer;

        /**
         * @param theBuffer
         *            the buffer for output.
         */
        public GroupParameterAppend(final StringBuffer theBuffer) {
            this.buffer = theBuffer;
        }

        /**
         * {@inheritDoc}
         */
        public Parameter apply(final Parameter theParameter) {
            this.buffer.append(theParameter.getKey()).append(".").append(theParameter.getValue());
            return theParameter;
        }
    }
}
