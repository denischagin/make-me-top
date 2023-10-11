import { ErrorInterface } from "@shared/types/common";
import { ExplorerCardInfoInterface, ExplorerInfoInterface, ExplorersFilterInterface } from "./interfaces";

export interface ExplorerInfoResponseInterface
    extends ExplorerInfoInterface,
        ErrorInterface {}

export interface ExplorerFilterResponseInterface
    extends ExplorersFilterInterface,
        ErrorInterface {}


export interface ExplorerIdInterface {
    personId: number;
}

export interface ExplorerCardInfoResponseInterface
    extends ExplorerCardInfoInterface,
        ErrorInterface {}