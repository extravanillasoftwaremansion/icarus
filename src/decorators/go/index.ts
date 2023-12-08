// Map to store Go code for each method
const goCodeMap: Record<string, string> = {};

export function Go(goCode: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // Check if the decorator is applied to a method
    if (typeof descriptor.value === "function") {
      // Save the Go code in a map
      goCodeMap[propertyKey as string] = goCode;
      // @ts-ignore
      console.log(go);
    } else {
      throw new Error("The @Go decorator can only be applied to methods.");
    }
  };
}

export default Go;
