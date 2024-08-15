/* eslint-disable no-unused-vars */
import './index.css';
import { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';

const mdStr ='# This is a H1  \n## This is a H2  \n###### This is a H6';

const Markdown = () => {
  const [markdown, setMarkdown] = useState(mdStr);

  return (
      <div className='markdown-container'>
        <MarkdownEditor
          className="markdown-editor"
          value={markdown}
          height="400px"
          width='500px'
          autoFocus
          onChange={(value, viewUpdate) => setMarkdown(value)}
        />
        <MarkdownPreview
          className="markdown-preview"
          source={markdown}
          rehypeRewrite={(node, index, parent) => {
            if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
              parent.children = parent.children.slice(1);
            }
          }}
        />
      </div>
  );
};

export default Markdown;