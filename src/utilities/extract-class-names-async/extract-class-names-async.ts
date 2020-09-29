import * as fs from 'fs-extra'
import * as globby from 'globby'

import { extractClassNamesFromHtml } from './extract-class-names-from-html'
import { extractClassNamesFromJs } from './extract-class-names-from-js'

const jsFileRegex = /.[jt]sx?$/

export async function extractClassNamesAsync(
  pattern: string
): Promise<Array<string>> {
  const files = await globby(pattern)
  const result: { [key: string]: boolean } = {}
  for (const file of files) {
    const string = await fs.readFile(file, 'utf8')
    const classNames =
      jsFileRegex.test(file) === true
        ? extractClassNamesFromJs(string)
        : extractClassNamesFromHtml(string)
    for (const className of classNames) {
      result[className] = true
    }
  }
  return Object.keys(result).sort()
}
