export const customConsoleLog = (
  contentToBeLogged: any,
  description?: string
) => {
  console.log("\n===========Start============\n");
  description && console.log(description, "\n");
  console.log(contentToBeLogged);
  console.log("\n===========End============\n");
};
