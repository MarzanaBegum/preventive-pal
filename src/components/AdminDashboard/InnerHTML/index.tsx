import React from 'react';

type InnerHTMLProps = React.HTMLAttributes<HTMLDivElement> & { html: string };

function InnerHTML({ html, dangerouslySetInnerHTML, ...rest }: InnerHTMLProps) {
  return <p dangerouslySetInnerHTML={{ __html: html }} {...rest}></p>;
}
export default InnerHTML;
