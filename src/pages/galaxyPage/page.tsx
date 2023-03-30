import "./styles.scss";
import Galaxy from "../../entities/galaxy/ui/galaxy";
import {useEffect} from "react";
import {getGalaxy} from "../../entities/galaxy/api/getGalaxy";
import {useAppDispatch} from "../../app/providers/store/hooks";

export const GalaxyPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGalaxy({}));
    }, [dispatch]);


  return (
      <div>
        <Galaxy/>
      </div>
  );
}

