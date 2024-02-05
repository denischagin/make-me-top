import { createContext, useContext, useState } from 'react';
import { ShowUserInfoContextInterface, ShowUserInfoProps } from '@features/show-user-info/ui/ShowUserInfo/interface';
import '../styles.scss'


const ShowUserInfoContext = createContext<Partial<ShowUserInfoContextInterface>>({});
export const useShowUserInfo = () => useContext(ShowUserInfoContext)

export const ShowUserInfo = ({children, ...restProps}: ShowUserInfoProps) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => {
       setIsOpenModal(false)
    }

    const handleOpenModal  = () => {
        setIsOpenModal(true)
    }


    return (
        <ShowUserInfoContext.Provider value={{ ...restProps, handleOpenModal, handleCloseModal, isOpenModal}}>
            {children}
        </ShowUserInfoContext.Provider>
    );
};