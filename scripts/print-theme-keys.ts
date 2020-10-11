import * as fs from 'fs-extra'
import * as path from 'path'

const themeTypeRegex = /export type Theme = {([\S\s]*?)}/
const keysToOmit = ['baseSpace', 'baseFontSize', 'breakpoint']

async function main() {
  const file = path.join(path.resolve(__dirname, '..'), 'src', 'types.ts')
  const content = await fs.readFile(file, 'utf8')
  const match = content.match(themeTypeRegex)
  if (match === null) {
    throw new Error('`Theme` type not found')
  }
  const lines = match[1].trim().split('\n')
  const result = []
  for (const line of lines) {
    const split = line.trim().split('?:')
    if (keysToOmit.indexOf(split[0]) === -1) {
      result.push(split[0])
    }
  }
  result.sort()
  for (const key of result) {
    console.log(`- \`theme.${key}\``) // eslint-disable-line no-console
  }
}
main()
