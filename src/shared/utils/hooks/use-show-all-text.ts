import { useState } from 'react';

export interface UseShowAllTextArgs {
    text: string;
    initTextLength?: number;
}

export interface UseShowAllTextReturn {
    handleShowMoreText: () => void;
    handleHideMoreText: () => void;
    handleToggleShowMoreText: () => void;
    slicedText: string;
    isShowAllText: boolean;
    isSmallTextLength: boolean;
}

export const useShowAllText = ({ text, initTextLength = 255 }: UseShowAllTextArgs): UseShowAllTextReturn => {
    const [isShowAllText, setIsShowAllText] = useState(false);

    const handleToggleShowMoreText = () => {
        setIsShowAllText(prev => !prev);
    };

    const handleShowMoreText = () => {
        setIsShowAllText(true);
    };

    const handleHideMoreText = () => {
        setIsShowAllText(false);
    };

    const isSmallTextLength = text.length < initTextLength;

    const slicedText = isShowAllText || isSmallTextLength ? text : text.slice(0, initTextLength) + '...';

    return {
        handleHideMoreText,
        handleShowMoreText,
        handleToggleShowMoreText,
        slicedText,
        isShowAllText,
        isSmallTextLength,
    };
};