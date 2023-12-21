import { searchParamKeys } from "@shared/constants";
import { URL_LOGIN } from "@shared/constants/links";

export const getNavigationPath = (pathname: string) => {
    return `${URL_LOGIN}?${searchParamKeys.redirect}=${encodeURIComponent(
        pathname,
    )}`;
};
