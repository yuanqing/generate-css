import * as fs from 'fs-extra'
import * as globby from 'globby'
import * as path from 'path'

async function main(): Promise<void> {
  const data = [
    ...(await readDeclarationsAsync()),
    ...(await readPluginsAsync())
  ].sort(function (x, y) {
    return x.name.localeCompare(y.name)
  })
  const result = []
  result.push('# Functional CSS classes')
  for (const { classes, name, value } of data) {
    const section = []
    section.push(`## ${name}\n\n`)
    if (value !== null) {
      section.push(`${value}\n\n`)
    }
    section.push('Class name | CSS rules\n')
    section.push(':--|:--\n')
    section.push(`${classes}`)
    result.push(section.join(''))
  }
  const file = path.join(path.resolve(__dirname, '..'), 'docs', 'css.md')
  await fs.outputFile(file, `${result.join('\n\n')}\n`)
}
main()

async function readDeclarationsAsync(): Promise<Array<any>> {
  const directory = path.join(
    path.resolve(__dirname, '..'),
    'src',
    'utilities',
    'create-css',
    'declarations'
  )
  const files = await globby([
    path.join(directory, '*.ts'),
    `!${path.join(directory, 'index.ts')}`
  ])
  const result: Array<any> = []
  for (const file of files) {
    const name = path.basename(file, '.ts')
    const classes = Object.values(require(file))[0]
    result.push({
      classes: stringifyClasses(classes),
      name,
      value: null
    })
  }
  return result
}

function stringifyClasses(classes: any): string {
  const result = []
  for (const className of Object.keys(classes)) {
    result.push(
      `\`.${className}\` | ${stringifyDeclarations(classes[className])}`
    )
  }
  return result.join('\n')
}

function stringifyDeclarations(declarations: any): string {
  const result = []
  for (const property of Object.keys(declarations)) {
    result.push(`\`${property}: ${declarations[property]};\``)
  }
  return result.join('<br>')
}

async function readPluginsAsync(): Promise<Array<any>> {
  const directory = path.join(
    path.resolve(__dirname, '..'),
    'src',
    'utilities',
    'create-css',
    'plugins'
  )
  const files = await globby([
    path.join(directory, '*.ts'),
    `!${path.join(directory, 'index.ts')}`
  ])
  const result: Array<any> = []
  for (const file of files) {
    const string = await fs.readFile(file, 'utf8')
    if (string.indexOf('/*\n') !== 0) {
      continue
    }
    const comment = string.slice(3, string.indexOf('\n*/'))
    for (const section of comment.split('\n---\n')) {
      const split = section.split('\n\n')
      const name = split[0]
      if (split.length === 2) {
        result.push({
          classes: split[1],
          name,
          value: null
        })
        continue
      }
      result.push({
        classes: split[2],
        name,
        value: split[1]
      })
    }
  }
  return result
}
