import React from 'react';

export const DataViz = ({viz, children}) => (
    <>
        <div className="viz_info">
            <h1>{viz["title"]}</h1>
            <p>{viz["info"]}</p>
            <a href={viz["url"]} target="_blank" rel="noreferrer"> See data used in this visualization </a>
        </div>
        {children}
    </>
)