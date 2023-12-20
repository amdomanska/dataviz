import React from 'react';

export const DataViz = ({ title, information, children }) => (
    <>
        <h1>{title}</h1>
        <h2>{information}</h2>
        { children }
    </>
)