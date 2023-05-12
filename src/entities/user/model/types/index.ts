export type UserStateType = {
    isRegistered: boolean,
    isModalOpen: boolean,
    userData: UserProgress,
}

export type UserProgress = {
    openSystemList: Array<number>,
    closeSystemList: Array<number>,
    educationSystemList: Array<EducationSystemType>,
}

export type EducationSystemType = {
    systemId: number,
    completed: number,
}

export type PostUser = {
    username: string
}