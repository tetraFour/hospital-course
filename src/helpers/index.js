export const clearObject = (object) => {
  const finalObject = { ...object };

  // console.log("before clean", finalObject);

  for (const key in finalObject) {
    finalObject[key] = "";
  }

  // console.log("final obj", finalObject);

  return finalObject;
};
