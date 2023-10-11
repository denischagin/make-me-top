import { ErrorInterface } from "@shared/types/common";
import { KeeperCardInfoInterface, KeepersFilterInterface } from "./interfaces";

export interface RejectCoursePayloadInterface {
    approved: boolean;
}

export interface RejectCourseInterface {
    requestId: number;
    rejection: RejectCoursePayloadInterface;
}

export interface KeeperFilterResponseInterface
    extends KeepersFilterInterface,
        ErrorInterface {}

export interface KeeperIdInterface {
    personId: number;
}

export interface KeeperCardInfoResponseInterface
    extends KeeperCardInfoInterface,
        ErrorInterface {}
