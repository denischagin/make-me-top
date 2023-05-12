import React from 'react';
import "./styles.scss"

interface IGalaxyPageName {
    galaxyName: string,
}
const GalaxyPageName: React.FC<IGalaxyPageName> = (props) => {
    const {
        galaxyName
    } = props;

    return (
        <div className="galaxyPageName">
            <div
                className="galaxyPageName__page-context"
            >
                Галактика
            </div>
            <div
                className="galaxyPageName__galaxy-name"
            >
                {galaxyName}
            </div>
        </div>
    );
};

export default GalaxyPageName;