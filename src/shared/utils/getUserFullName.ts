interface FullNameInterface {
    lastName: string;
    firstName: string;
    patronymic: string;
}

export function getUserFullName<D extends FullNameInterface>(data: D) {
    return `${data.lastName} ${data.firstName} ${data.patronymic}`;
}