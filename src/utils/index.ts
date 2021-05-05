import { StringMap } from "../types/Generic";

export const convertToDegrees = (
  temp: number,
  scale: "degrees" | "fahrenheit"
) => {
  return scale === "degrees"
    ? Math.floor(temp - 273.15).toString() + String.fromCharCode(176) + "C"
    : ((Math.floor(temp - 273.15) * 9) / 5 + 32).toString() +
        String.fromCharCode(176) +
        "F";
};

type MinimumObjectWithStringValue<PropertyName extends string> = {
  [P in PropertyName]: string | number;
};

const arrayToMapOfKey = <KeyType extends string>(
  array: MinimumObjectWithStringValue<KeyType>[],
  key: KeyType
): StringMap<MinimumObjectWithStringValue<KeyType>> =>
  array.reduce(
    (resultMap, item) => ({
      ...resultMap,
      [item[key]]: item,
    }),
    {}
  );

export default arrayToMapOfKey;
