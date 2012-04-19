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
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
package org.esco.grouperui.tools.parameter.internal.db;

import java.io.Writer;

import org.apache.commons.logging.Log;

/**
 * {@link Writer} implementation that redirects to a logger.
 * 
 * @author Andreas Veithen
 * @version $Id: LoggerWriter.java 59 2008-03-11 21:37:29Z veithen $
 */
public class LoggerWriter extends Writer {

    /**
     * Logger.
     */
    private final Log          log;
    /**
     * End of line character.
     */
    private final String       endOfLine;
    /**
     * Data to be write into database.
     */
    private final StringBuffer lineBuffer = new StringBuffer();
    /**
     * matcher for end of line.
     */
    private int                endOfLineMatch;

    /**
     * @param log
     *            logger
     * @param endOfLine
     *            type of end of line.
     */
    public LoggerWriter(final Log log, final String endOfLine) {
        this.log = log;
        this.endOfLine = endOfLine;
    }

    /**
     * @param log
     *            logger
     */
    public LoggerWriter(final Log log) {
        this(log, System.getProperty("line.separator"));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void write(final char[] cbuf, final int off, final int len) {
        int start = off;
        for (int i = off; i < off + len; i++) {
            if (cbuf[i] == this.endOfLine.charAt(this.endOfLineMatch)) {
                this.endOfLineMatch++;
                if (this.endOfLineMatch == this.endOfLine.length()) {
                    this.lineBuffer.append(cbuf, start, i - start + 1);
                    this.lineBuffer.setLength(this.lineBuffer.length() - this.endOfLine.length());
                    this.flushLineBuffer();
                    start = i + 1;
                    this.endOfLineMatch = 0;
                }
            } else {
                this.endOfLineMatch = 0;
            }
        }
        this.lineBuffer.append(cbuf, start, off + len - start);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void close() {
        if (this.lineBuffer.length() > 0) {
            this.flushLineBuffer();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void flush() {
        // Nothing to do
    }

    /**
     *
     */
    private void flushLineBuffer() {
        this.log.info(this.lineBuffer.toString());
        this.lineBuffer.setLength(0);
    }
}
