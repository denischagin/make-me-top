import { queryParams } from "@shared/constants";
import { URL_LOGIN } from "@shared/constants/links";

export const getNavigationPath = (pathname: string) => {
    return `${URL_LOGIN}?${queryParams.redirect}=${encodeURIComponent(
        pathname,
    )}`;
};
