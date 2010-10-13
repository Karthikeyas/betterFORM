/*
 * Copyright (c) 2010. betterForm Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

package de.betterform.connector.context;

import de.betterform.connector.AbstractConnector;
import de.betterform.connector.SubmissionHandler;
import de.betterform.xml.dom.DOMUtil;
import de.betterform.xml.xforms.XFormsProcessor;
import de.betterform.xml.xforms.exception.XFormsException;
import de.betterform.xml.xforms.model.submission.Submission;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Category;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

/**
 * This SubmissionHandler stores the received instance data in
 * context map of the XFormsProcessor for further usage e.g. through another form being called from the
 * submitting form.
 *
 * @author Joern Turner
 */
public class ContextMapSubmissionHandler extends AbstractConnector implements SubmissionHandler {
    /**
     * The logger.
     */
    private static Log LOGGER = LogFactory.getLog(ContextMapSubmissionHandler.class);

    /**
     * Serializes and submits the specified instance data to the context map of
     * the XFormsProcessor. Only submissions with replace="none" are accepted; every other
     * mode will throw an XFormsException
     * <br /><br />
     *
     * URI syntax in XForms will
     * be simply:<br />
     *  &lt;xf:submission action="context:[keyName]" ... /&gt;
     * <p/>
     *
     * @param submission the submission issuing the request.
     * @param instance the instance data to be serialized and submitted.
     * @return <code>null</code>.
     * @throws de.betterform.xml.xforms.exception.XFormsException if any error
     * occurred during submission or a replace-mode different from 'none' was
     * choosen
     */
    //todo: add GET and replace="instance" to load Node from context map
    public Map submit(Submission submission, Node instance) throws XFormsException {

        if(LOGGER.isTraceEnabled()){
            LOGGER.trace("submitting instance...");
            DOMUtil.prettyPrintDOM(instance);
        }


        if (submission.getMethod().equalsIgnoreCase("get")){
            if (submission.getReplace().equals("instance")) {
                String contextKey = ContextMapResolver.getContextKeyFormURI(getURI());
                Object xmlNode = ContextMapResolver.getNodeFromContext(contextKey,getContext());
                
                if(LOGGER.isTraceEnabled()){
                    DOMUtil.prettyPrintDOM((Node) xmlNode);
                }

                Map response=new HashMap(1);
                response.put(XFormsProcessor.SUBMISSION_RESPONSE_DOCUMENT,xmlNode);
                return response;
            }else{
                throw new XFormsException("submission replace mode '" + submission.getReplace() + "' not supported");
            }
        } else if (submission.getMethod().equalsIgnoreCase("put")) {

            if (submission.getReplace().equals("none")) {
                // create uri
//                URI uri = null;
//                try {
//                    uri = new URI(getURI());
//                }
//                catch (URISyntaxException e) {
//                    throw new XFormsException("failed to parse URI - syntax error.", e);
//                }
//
//                String key = uri.getSchemeSpecificPart();
//                String fragment = uri.getFragment();


                String contextKey = ContextMapResolver.getContextKeyFormURI(getURI());

                if (contextKey == null ) {
                    throw new XFormsException("key name missing");
                }
                else {
                    Document doc;
                    if(instance instanceof Element){
                        doc = DOMUtil.newDocument(true,false);
                        DOMUtil.importAndAppendNode(doc,instance);
                        if(LOGGER.isTraceEnabled()){
                            LOGGER.trace("storing instance in context...");
                            DOMUtil.prettyPrintDOM(doc);
                        }
                    }else if (instance instanceof Document){
                        doc = (Document) instance;
                    }else{
                        throw new XFormsException("Node of type '" + instance.getNodeType() + " is not supported");
                    }

//                    getContext().put(contextKey, instance);
                    getContext().put(contextKey, doc);
                    if (LOGGER.isDebugEnabled()) {
                        LOGGER.debug("storing node in context: " + contextKey + "='" + instance + "'");
                    }
                }
            }
            else {
                throw new XFormsException("submission replace mode '" + submission.getReplace() + "' not supported");
            }
            return new HashMap();
        }
        throw new XFormsException("submission method '" + submission.getMethod() + "' not supported");
    }
}
