import { useEffect } from "react";

import { useAppDispatch } from "@/app/providers/store/hooks";
import { getGalaxy } from "@/entities/galaxy/api/getGalaxy";
import Galaxy from "@/entities/galaxy/ui/galaxy";
import "./styles.scss";

export const GalaxyPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGalaxy({}));
  }, [dispatch]);

  return (
    <div>
      <Galaxy />
    </div>
  );
};
