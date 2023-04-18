import { useCallback } from "react";

type ModifierValue = string | number | boolean | null | undefined;

interface ModifiersHash {
  [key: string]: ModifierValue;
}

export type GetClassBlock = (
  modifiersAndClasses?: ModifiersHash | string,
  additionalClasses?: string | Array<string>
) => string;

export type GetClassElement = (
  element: string,
  modifiersAndClasses?: ModifiersHash | string,
  additionalClasses?: string | Array<string>
) => string;

type UseBemMethods = [GetClassBlock, GetClassElement];

function getModifier(
  base: string,
  modifier: string,
  value: ModifierValue
): string {
  return typeof value === "boolean"
    ? `${base}--${modifier}`
    : `${base}--${modifier}-${value}`;
}

function getModifiers(
  base: string,
  modifiersArray: Array<string>,
  modifiersObject: ModifiersHash,
): Array<string> {
  return modifiersArray
    .filter(
      (modifier): boolean =>
        modifiersObject[modifier] !== false &&
        modifiersObject[modifier] !== undefined &&
        modifiersObject[modifier] !== null
    )
    .map((modifier): string =>
      getModifier(base, modifier, modifiersObject[modifier])
    );
}

export function bem(blockName: string): UseBemMethods {
  const block: GetClassBlock = useCallback(
    (blockModifiersAndClasses = {}, additionalClasses: string | Array<string> = ""): string => {
      const arrayOfClasses: Array<string> = [];

      const modifiersAndClasses = typeof blockModifiersAndClasses === "string"
        ? { [blockModifiersAndClasses]: true }
        : blockModifiersAndClasses;

      const getAdditionalClasses = Array.isArray(additionalClasses)
        ? additionalClasses
        : arrayOfClasses.concat(additionalClasses);

      const blockModifiersAppliedFromRender = getModifiers(
        blockName,
        Object.keys(blockModifiersAndClasses),
        modifiersAndClasses
      );

      const getClassesAsSecondArg = typeof blockModifiersAndClasses === "string"
        ? arrayOfClasses.concat(blockModifiersAndClasses)
        : blockModifiersAppliedFromRender;

      return [blockName, ...getAdditionalClasses, ...getClassesAsSecondArg]
        .join(" ")
        .trim();
    },
    [blockName]
  );

  const element: GetClassElement = useCallback(
    (
      elementName: string,
      blockModifiersAndClasses = {},
      additionalClasses: string | Array<string> = ""
    ): string => {
      const arrayOfClasses: Array<string> = [];
      const elementFullName = `${blockName}__${elementName}`;

      const modifiersAndClasses = typeof blockModifiersAndClasses === "string"
        ? { [blockModifiersAndClasses]: true }
        : blockModifiersAndClasses;

      const getAdditionalClasses = Array.isArray(additionalClasses)
        ? additionalClasses
        : arrayOfClasses.concat(additionalClasses);

      const elementModifiersAppliedFromRender = getModifiers(
        elementFullName,
        Object.keys(blockModifiersAndClasses),
        modifiersAndClasses
      );

      const getClassesAsSecondArg = typeof blockModifiersAndClasses === "string"
        ? arrayOfClasses.concat(blockModifiersAndClasses)
        : elementModifiersAppliedFromRender;

      return [
        elementFullName,
        ...getClassesAsSecondArg,
        ...getAdditionalClasses,
      ]
        .join(" ")
        .trim();
    },
    [blockName]
  );

  return [block, element];
}
