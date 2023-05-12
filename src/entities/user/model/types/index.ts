export type UserStateType = {
    isRegistered: boolean;
    isModalOpen: boolean;
    userData: {
        username: string,
        openSystemList: Array<number>,
        closeSystemList: Array<number>,
        educationSystemList: Array<EducationSystemType>,
    }
}

export type EducationSystemType = {
    systemId: number,
    completed: number,
}

export type PostUser = {
    username: string
}