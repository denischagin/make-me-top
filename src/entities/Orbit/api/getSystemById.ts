import axios, {AxiosHeaders} from "axios";

interface IFetchSystemById {
  id: number;
}

export const getSystemById = async (params: IFetchSystemById) => {
  const response = await axios.get(
      `${process.env.REACT_APP_FETCH_URL}/galaxy-app/system/${params.id}`
  ).then(function (response) {
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.headers);

      return error.response.data;
    } else if (error.request) {

      return error.request;
    } else {
      console.log('Error', error.message);
    }
  });

  return response;
};