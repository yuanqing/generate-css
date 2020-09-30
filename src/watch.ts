import * as chokidar from 'chokidar'

import { build } from './build'
import { CliOptions } from './types'
import { log } from './utilities/log'

export function watch(cliOptions: CliOptions): void {
  const watcher = chokidar.watch([
    cliOptions.sourceFilesPattern,
    cliOptions.configFilePath
  ])
  async function onChangeAsync() {
    await build(cliOptions)
    log.info('Watching...')
  }
  watcher.on('ready', onChangeAsync)
  watcher.on('change', onChangeAsync)
}
