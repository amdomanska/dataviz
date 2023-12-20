import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
export const DataViz = ({viz, children}) => (
    <>
        <div className="viz_info">
            <h1>{viz["title"]}</h1>
            <p>{viz["info"]}</p>
            <a href={viz["url"]} target="_blank" rel="noreferrer" class="data_source"><LaunchIcon fontSize="small"/> Data source </a>
        </div>
        {children}
    </>
)