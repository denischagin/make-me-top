import { useCallback } from "react";

type ModifierValue = string | number | boolean | null | undefined;

interface ModifiersHash {
  [key: string]: ModifierValue;
}

export type GetClassBlock = (
  modifiersAndClasses?: ModifiersHash | string | Array<string>,
  additionalClasses?: string | Array<string>
) => string;

export type GetClassElement = (
  element: string,
  modifiersAndClasses?: ModifiersHash | string | Array<string>,
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

function getAdditionalClasses(
  blockName: string,
  blockClasses: string | Array<string>
) {
  if (typeof blockClasses === "string") {
    return `${blockName} ${blockClasses}`;
  }

  return `${blockName} ${blockClasses.join(" ")}`;
}

/**
 * Возвращает две мемоизированные функции для генерации классов блока и классов элемента
 *
 * @example
 * const [block, element] = useBem('block-name')
 *
 * return (
 *     <div className={block({modA: true, modD: 42})}>
 *         <p className={element('element-name', {modA: true, modD: 42})} >
 *             ...
 *         </p>
 *     </div>
 * )
 *
 * @param {string} blockName имя блока
 *
 * @return {[Function, Function]} [block, element]
 */
export function bem(blockName: string): UseBemMethods {

  /**
   * передача blockName в className и добавление к нему модифкаторов
   *
   * @example
   *     <div className={block({modA: true})}>
   * ...
   *
   * @param {string} block имя блока
   *
   * @return {[Function, Function]} block-name block-name--modA
   */

  const block: GetClassBlock = useCallback(
    (
      blockModifiersAndClasses: ModifiersHash | string | Array<string> = {},
      additionalClasses: string | Array<string> = ""
    ): string => {
      if (
        typeof blockModifiersAndClasses === "string" ||
        Array.isArray(blockModifiersAndClasses)
      ) {
        return getAdditionalClasses(blockName, blockModifiersAndClasses);
      }

      const blockModifiersAppliedFromRender = getModifiers(
        blockName,
        Object.keys(blockModifiersAndClasses),
        blockModifiersAndClasses
      );

      const arrayOfAdditionalClasses =
        typeof additionalClasses === "string"
          ? [additionalClasses]
          : additionalClasses;

      return [
        blockName,
        ...blockModifiersAppliedFromRender,
        ...arrayOfAdditionalClasses,
      ]
        .join(" ")
        .trim();
    },
    [blockName]
  );

  /**
 * добавление элементов и модификаторов к ним
 *
 * @example
 *     <p className={element('element-name', {modD: 42})}>
 * ...
 *
 * @param {string} element имя блока
 *
 * @return {[Function, Function]} block-name__element-name block-name__element-name--modD-42
 */

  const element: GetClassElement = useCallback(
    (
      elementName: string,
      blockModifiersAndClasses: ModifiersHash | string | Array<string> = {},
      additionalClasses: string | Array<string> = ""
    ): string => {
      const elementFullName = `${blockName}__${elementName}`;

      if (
        typeof blockModifiersAndClasses === "string" ||
        Array.isArray(blockModifiersAndClasses)
      ) {
        return getAdditionalClasses(elementFullName, blockModifiersAndClasses);
      }

      const elementModifiersAppliedFromRender = getModifiers(
        elementFullName,
        Object.keys(blockModifiersAndClasses),
        blockModifiersAndClasses
      );

      const arrayOfAdditionalClasses =
        typeof additionalClasses === "string"
          ? [additionalClasses]
          : additionalClasses;

      return [
        elementFullName,
        ...elementModifiersAppliedFromRender,
        ...arrayOfAdditionalClasses,
      ]
        .join(" ")
        .trim();
    },
    [blockName]
  );

  return [block, element];
}
