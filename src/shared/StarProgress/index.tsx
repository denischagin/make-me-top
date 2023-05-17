import React from 'react';
import {bem} from "@shared/utils/bem";
import {IStarProgressProps} from "@shared/StarProgress/interface";
import "./styles.scss";

const StarProgress: React.FC<IStarProgressProps> = (props) => {
    const {
        percentageProgress
    } = props;

    const [block, element] = bem("star-progress");

    return (
        <div className={block()}>
            <div
                className={element("progress")}
                style={{
                    height: `${100 - percentageProgress}%`,
                }}
            />
        </div>
    );
};

export default StarProgress;