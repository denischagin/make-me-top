import React from 'react';
import {bem} from "@shared/utils/bem";
import {IStarProgressProps} from "@shared/StarProgress/interface";
import "./styles.scss";

const StarProgress: React.FC<IStarProgressProps> = (props) => {
    const {
        percentageProgress
    } = props;

    const [block, element] = bem("star-progress");

    const percentageProgressToSVGPath = (percentageProgress: number): string => {
        let pixelProgress = 80 / 100 * (100 - percentageProgress);
        const offsetForException100 = 20;

        if (percentageProgress > 95) {
            pixelProgress -= offsetForException100;
        }

        return String(`
            M 20 60 
            C 20 ${pixelProgress + 20}, 100 ${pixelProgress + 20}, 100 60
            L 120 120
            L 0 120
            z
            `);
    }

    return (
        <div className={block()}>
            <svg
                className={element("progress")}
                xmlns="http://www.w3.org/2000/svg"
                width="120px"
                height="120px"
            >
                <path
                    d={percentageProgressToSVGPath(percentageProgress)}
                    stroke="white"
                    fill="#7c7abd"/>
            </svg>
        </div>
    );
};

export default StarProgress;