import axios from "axios";

interface IFetchSystemById {
  id: number;
}

export const FetchSystemById = async (params: IFetchSystemById) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_FETCH_URL}/galaxy-app/system/${params.id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};