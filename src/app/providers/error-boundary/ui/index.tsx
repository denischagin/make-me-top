import React, { Component, ErrorInfo } from 'react';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import './styles.scss';

interface Props {
    children: React.ReactNode;
}

interface State {
    errorInfo: ErrorInfo | null,
    error: Error,
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false,
        error: new Error(''),
        errorInfo: null,
    };

    static getDerivedStateFromError = (error: Error) => {
        return { hasError: true };
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            errorInfo,
            error,
        });
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return (
                <div className={'error-boundary'}>
                    <BackgroundProfile />

                    <Typography variant={typographyVariant.h1} color={typographyColor.white}>
                        В галактике произошла ошибка
                    </Typography>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
