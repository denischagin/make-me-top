import { ModalPlanetInterface } from "@entities/explorer/model/interfaces";

import { UserInterface } from "@shared/types/common";

export interface UserState {
  isRegistered: boolean;
  isModalOpen: boolean;
  planetList: Array<ModalPlanetInterface>
  explorersList: Array<UserInterface>
  curatorsList: Array<UserInterface>
  userInfo: UserInterface
}
