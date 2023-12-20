import React from 'react';

export const DataViz = ({ viz, children }) => (
    <>
        <h1>{viz["title"]}</h1>
        <h2>{viz["information"]}</h2>
        <a href={viz["url"]} target="_blank" rel="noreferrer"> See data used in this visualization </a>
        { children }
    </>
)