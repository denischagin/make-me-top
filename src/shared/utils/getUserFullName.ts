interface FullNameInterface {
    lastName: string;
    firstName: string;
    patronymic: string;
}

/**
 * Возвращает строку fullname
 *
 * @example
 * getUserFullName(user)
 *
 * @param {string} data - объект содержащий lastName, firstName и patronymic
 *
 * @return Иванов Иван Иваныч
 */

export function getUserFullName<D extends FullNameInterface>(data: D | undefined) {
    if (data) {
        return `${data.lastName} ${data.firstName} ${data.patronymic ?? ''}`;
    }

    return 'Неизвестно';
}