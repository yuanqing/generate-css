const classHtmlRegex = /class=(['"])((?:(?!\1).)+)\1/g // https://stackoverflow.com/a/8057827

export function extractClassNamesFromHtmlString(html: string): Array<string> {
  const iterator = html.matchAll(classHtmlRegex)
  const result: { [key: string]: boolean } = {}
  for (const matches of iterator) {
    const classNames = matches[2].split(' ')
    for (const className of classNames) {
      result[className] = true
    }
  }
  return Object.keys(result).sort()
}
