import axios, { AxiosError, AxiosResponse } from "axios";

interface IFetchSystemById {
  id: number;
}

export const fetchSystemById = async (params: IFetchSystemById) => {
  return await axios
    .get(`${process.env.REACT_APP_FETCH_URL}/galaxy-app/system/${params.id}`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((reason: AxiosError) => {
      if (axios.isCancel(reason)) {
        console.log(reason.request);
        console.log(reason.message);
      }
      if (reason.response) {
        if (reason.response!.status >= 400) {
          return reason.response;
        }
      }

      return;
    });
};
