import { useEffect } from 'react';
import { useFileLoader } from '../FileLoader';

export const FileLoaderClipboard = () => {
    const { handleFileLoad } = useFileLoader();

    const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault()

        const file = e.clipboardData?.files[0]

        if (!file) return
        
        handleFileLoad(file)
    }

    useEffect(() => {
        document.addEventListener('paste', handlePaste)

        return () => document.removeEventListener('paste', handlePaste)
    }, [])

    return <></>;
};
