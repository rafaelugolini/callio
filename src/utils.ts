import { existsSync } from "../deps.ts";

export const getDirectory = () => {
  const dirPath = Deno.args[0];

  if (!dirPath || dirPath === "") {
    console.error("Please add directory as an argument");
    Deno.exit(-1);
  }

  try {
    const fileInfo = Deno.lstatSync(dirPath);
    if (!fileInfo.isDirectory) {
      console.error(`Couldn't find a valid directory ${dirPath}`);
      Deno.exit(-1);
    }
  } catch {
    console.error(`Couldn't find path ${dirPath}`);
    Deno.exit(-1);
  }

  return dirPath;
};
