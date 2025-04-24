export const customConsoleLog = (
  contentToBeLogged: unknown,
  description?: string
) => {
  try {
    console.log(`
      =========== Start ===========
      Description: ${description}

      Content: 
      ${typeof contentToBeLogged === "object" ? JSON.stringify(contentToBeLogged, null, 2) : contentToBeLogged}

      =========== End ===========
    `);
  } catch (error) {
    console.error("Error logging content:", error);
  }
};
