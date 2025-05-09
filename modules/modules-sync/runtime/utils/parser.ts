export function parseReadmeAssets(content: string, repo: string): string {
  if (!content) return content;

  const [owner, repoName] = repo.split("/");
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repoName}`;
  const branch = "main"; // Default to main branch when using repo slug

  // Replace markdown image/link patterns: ![alt](path) or [text](path)
  // Updated regex to match relative paths without ./ prefix
  const markdownRegex = /(!?\[.*?\])\((?!http|#)([^)]+)\)/g;
  return content.replace(markdownRegex, (match, linkText, path) => {
    // Don't replace absolute URLs or anchors
    if (path.startsWith("http") || path.startsWith("#")) {
      return match;
    }

    // If the path doesn't start with a dot or slash, add a slash
    const normalizedPath =
      path.startsWith(".") || path.startsWith("/") ? path.replace(/^\//, "") : path;

    const absolutePath = `${baseUrl}/${branch}/${normalizedPath}`;
    return `${linkText}(${absolutePath})`;
  });

  // // Replace HTML tags with src or href attributes
  // const htmlRegex =
  //   /(<(?:img|a|link|script|source)[^>]*?(?:src|href)=["'])(?!http|#)([^"']*?)(["'][^>]*?>)/gi;
  // processedContent = processedContent.replace(htmlRegex, (match, tagStart, path, tagEnd) => {
  //   // Don't replace absolute URLs or anchors
  //   if (path.startsWith("http") || path.startsWith("#")) {
  //     return match;
  //   }

  //   // If the path doesn't start with a dot or slash, add a slash
  //   const normalizedPath =
  //     path.startsWith(".") || path.startsWith("/") ? path.replace(/^\//, "") : path;

  //   const absolutePath = `${baseUrl}/${branch}/${normalizedPath}`;
  //   return `${tagStart}${absolutePath}${tagEnd}`;
  // });
}
