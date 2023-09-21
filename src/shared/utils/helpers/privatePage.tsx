import React from "react";
import { AuthProtect } from "@shared/utils/providers/AuthProtect";

export const privatePage = (children: JSX.Element) => {
	return <AuthProtect>{children}</AuthProtect>;
};
