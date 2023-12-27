import React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

const width = 900;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

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
                <p>{viz.info}</p>
                <a href={viz.url} target="_blank" rel="noreferrer" className="data_source"><LaunchIcon
                    fontSize="small"/> Data source </a>
            </div>
            {renderChildren()}
        </>
    )
}