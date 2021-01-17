export const clearObject = object => {
  const finalObject = { ...object };

  for (const key in finalObject) {
    finalObject[key] = "";
  }

  return finalObject;
};
