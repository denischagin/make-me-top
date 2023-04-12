import { useCallback } from "react";

type ModifierValue = string | number | boolean | null | undefined;

interface ModifiersHash {
  [key: string]: ModifierValue;
}

export type GetClassBlock = (modifiers?: ModifiersHash) => string;

export type GetClassElement = (
  element: string,
  modifiers?: ModifiersHash,
  ...additionalClasses: Array<string>
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
  modifiersObject: ModifiersHash
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
    (blockModifiersFromRender = {}): string => {
      const blockModifiersAppliedFromRender = getModifiers(
        blockName,
        Object.keys(blockModifiersFromRender),
        blockModifiersFromRender
      );
      return [blockName, ...blockModifiersAppliedFromRender].join(" ").trim();
    },
    [blockName]
  );

  const element = useCallback(
    (
      elementName: string,
      elementModifiers = {},
      ...additionalClasses: Array<string>
    ): string => {
      const elementFullName = `${blockName}__${elementName}`;
      const elementModifiersAppliedFromRender = getModifiers(
        elementFullName,
        Object.keys(elementModifiers),
        elementModifiers
      );
      return [
        elementFullName,
        ...elementModifiersAppliedFromRender,
        ...additionalClasses,
      ]
        .join(" ")
        .trim();
    },
    [blockName]
  );

  return [block, element];
}
