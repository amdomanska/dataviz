import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

export const DataViz = ({viz, children}) => {

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        url: viz.url
                    })
                }
            }
        )
    }

    return (
        <>
            <div className="viz_info">
                <h1>{viz.title}</h1>
                <p dangerouslySetInnerHTML={{__html: viz.info}}></p>
                <a href={viz.url} target="_blank" rel="noreferrer" className="data_source"><LaunchIcon
                    fontSize="small"/> Data source </a>
            </div>
            {renderChildren()}
        </>
    )
}