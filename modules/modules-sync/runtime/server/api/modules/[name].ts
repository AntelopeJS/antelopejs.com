import { moduleStorage } from "../../../../../../module-storage";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Module name is required",
    });
  }

  const data = await moduleStorage.getModule(name);

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Module not found",
    });
  }

  return {
    ...data,
    readme: data.readme ? await parseMarkdown(data.readme) : undefined,
  };
});
