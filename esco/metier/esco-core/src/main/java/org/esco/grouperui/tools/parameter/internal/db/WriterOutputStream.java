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

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CoderResult;
import java.nio.charset.CodingErrorAction;

/**
 * {@link OutputStream} implementation that redirects to a {@link Writer}.
 * 
 * @author Andreas Veithen
 * @version $Id: WriterOutputStream.java 59 2008-03-11 21:37:29Z veithen $
 */
public class WriterOutputStream extends OutputStream {
    private final Writer         writer;
    private final CharsetDecoder decoder;
    private final ByteBuffer     decoderIn  = ByteBuffer.allocate(128);
    private final CharBuffer     decoderOut = CharBuffer.allocate(128);

    /**
     * @param writer
     * @param charset
     */
    public WriterOutputStream(final Writer writer, final Charset charset) {
        this.writer = writer;
        this.decoder = charset.newDecoder();
        this.decoder.onMalformedInput(CodingErrorAction.REPLACE);
        this.decoder.onUnmappableCharacter(CodingErrorAction.REPLACE);
        this.decoder.replaceWith("?");
    }

    /**
     * @param writer
     * @param charset
     */
    public WriterOutputStream(final Writer writer, final String charset) {
        this(writer, Charset.forName(charset));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void write(final byte[] theBytes, int theOffset, int theLength) throws IOException {
        while (theLength > 0) {
            int nbElC = Math.min(theLength, this.decoderIn.remaining());
            this.decoderIn.put(theBytes, theOffset, nbElC);
            this.processInput(false);
            theLength -= nbElC;
            theOffset += nbElC;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void write(final byte[] bytes) throws IOException {
        this.write(bytes, 0, bytes.length);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void write(final int b) throws IOException {
        this.write(new byte[] {(byte) b }, 0, 1);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void close() throws IOException {
        this.processInput(true);
        this.writer.close();
    }

    /**
     * @param endOfInput
     * @throws IOException
     */
    private void processInput(final boolean endOfInput) throws IOException {
        this.decoderIn.flip();
        CoderResult coderResult;
        do {
            coderResult = this.decoder.decode(this.decoderIn, this.decoderOut, endOfInput);
            // The decoder is configured to replace malformed input and
            // unmappable characters
            assert !coderResult.isError();
            this.writer.write(this.decoderOut.array(), 0, this.decoderOut.position());
            this.decoderOut.rewind();
        } while (coderResult.isOverflow());
        this.decoderIn.compact();
    }
}
