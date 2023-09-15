import { useState } from "react"

export interface ReturnUseShowMoreInterface <T> { 
    handleShowMore: () => void,
    handleHideLast: () => void,
    handleHideAll: () => void,
    limitElements: T[],
    limitElementNumber: number,
    isLastLimit: boolean,
}

export const useShowMore = <T> (
    elements: T[], 
    initLimit: number, 
    plusNumber: number
): ReturnUseShowMoreInterface<T> => {
    const [limitElementNumber, setLimitElementsNumber] = useState(initLimit)

    const handleShowMore = () => setLimitElementsNumber(prev => prev + plusNumber)
    const handleHideLast = () => setLimitElementsNumber(prev => prev - plusNumber)
    const handleHideAll = () => setLimitElementsNumber(initLimit)

    const limitElements = elements.slice(0, limitElementNumber)

    const isLastLimit = limitElementNumber >= elements.length

    return {
        handleShowMore,
        handleHideLast,
        limitElements,
        limitElementNumber,
        isLastLimit,
        handleHideAll
    }

}