import { UserProgressInGalaxy } from "@entities/galaxy/model/types";

export interface CircleModalWithGalaxyProps {
    isOpen: boolean;
    handleChangeSystem?: (systemId: number) => void;
    handleClose: () => void;
    progress?: number | null;
    currentSystemId?: number | null;
    galaxyId?: number | null;
    userProgress?: UserProgressInGalaxy
}
