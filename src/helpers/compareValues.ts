import { convertObjectValuesToArray } from "./array";

type ReturnObject = {
  isCompatible: boolean;
  incompatibles: Array<string>;
};

export function compareValues(
  data: object | Array<unknown>,
  dataCompare: object | Array<unknown>
): ReturnObject {
  const listOrigin = convertObjectValuesToArray(data);
  const listCompare = convertObjectValuesToArray(dataCompare);

  const elementIncompatibles = listOrigin.filter(
    (value) => !listCompare.includes(value)
  );

  return {
    isCompatible: elementIncompatibles.length > 0,
    incompatibles: elementIncompatibles,
  };
}
