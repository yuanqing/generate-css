import * as fs from 'fs-extra'
import * as globby from 'globby'

export async function extractClassNamesAsync(
  globPattern: string
): Promise<Array<string>> {
  const paths = await globby(globPattern)
  const result: { [key: string]: boolean } = {}
  for (const path of paths) {
    const string = await fs.readFile(path, 'utf8')
    const classNames = extractClassNamesFromHtml(string)
    for (const className of classNames) {
      result[className] = true
    }
  }
  return Object.keys(result).sort()
}

const classHtmlRegex = /class=(['"])((?:(?!\1).)+)\1/g // https://stackoverflow.com/a/8057827

function extractClassNamesFromHtml(html: string): Array<string> {
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
