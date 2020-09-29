const consecutiveSpaceRegex = / +/

export function extractClassNamesFromStringFactory(
  regex: RegExp,
  matchesIndex: number
): (string: string) => Array<string> {
  return function (string: string): Array<string> {
    const iterator = string.matchAll(regex)
    const result: { [key: string]: boolean } = {}
    for (const matches of iterator) {
      const classNames = matches[matchesIndex]
        .trim()
        .split(consecutiveSpaceRegex)
      for (const className of classNames) {
        result[className] = true
      }
    }
    return Object.keys(result).sort()
  }
}
