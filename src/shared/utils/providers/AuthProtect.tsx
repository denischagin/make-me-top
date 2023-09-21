import { URL_DEFAULT } from "@shared/constants/links";
import { storageKeys } from "@shared/constants/storageKeys";
import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface AuthProtectProps {
	children: JSX.Element;
}

const getTokenFromLocalStorage = () => {
	return localStorage.getItem(storageKeys.tokenAuth);
};

export const AuthProtect = ({ children }: AuthProtectProps) => {
	const [isAuth, setIsAuth] = useState(true);

	useEffect(() => {
		const token = getTokenFromLocalStorage();

		if (!token) setIsAuth(false);
	}, []);

	if (!isAuth) return <Navigate to={URL_DEFAULT} replace />;

	return children;
};
