import * as chokidar from 'chokidar'

import { build } from './build'
import { CliOptions } from './types'
import { log } from './utilities/log'

export function watch(cliOptions: CliOptions): void {
  const files = [cliOptions.sourceFilesPattern]
  if (typeof cliOptions.configFilePath === 'string') {
    files.push(cliOptions.configFilePath)
  } else {
    files.push('package.json')
  }
  if (cliOptions.prependCssFilesPattern !== null) {
    files.push(cliOptions.prependCssFilesPattern)
  }
  if (cliOptions.appendCssFilesPattern !== null) {
    files.push(cliOptions.appendCssFilesPattern)
  }
  const watcher = chokidar.watch(files)
  async function onChangeAsync() {
    await build(cliOptions)
    log.info('Watching...')
  }
  watcher.on('ready', onChangeAsync)
  watcher.on('change', onChangeAsync)
}
