export interface SendCourseRequestButtonProps {
    activeTabIndex: number,
    handleSendApplication: () => void,
    keepersListIsEmpty: boolean,
    setActiveTab: (activeTab: number) => void,
    className: string
}