import * as chokidar from 'chokidar'

import { Config } from '../types'
import { build } from './build'
import { log } from './log'

export function watch(config: Config): void {
  const watcher = chokidar.watch(config.sourceFilesPattern)
  async function onChangeAsync() {
    await build(config)
    log.info('Watching...')
  }
  watcher.on('ready', onChangeAsync)
  watcher.on('change', onChangeAsync)
}
