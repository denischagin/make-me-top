import { GalaxyContext } from "@entities/galaxy/model/context/GalaxyContext";
import { useContext } from "react";

export const useGalaxy = () => useContext(GalaxyContext)