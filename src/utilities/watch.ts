import * as chokidar from 'chokidar'

import { Config } from '../types'
import { build } from './build'
import { log } from './log'

export function watch(
  pattern: string,
  baseCssFilesPattern: null | string,
  config: Config,
  outputPath: string,
  minify: boolean
): void {
  const watcher = chokidar.watch(pattern)
  async function onChangeAsync() {
    await build(pattern, baseCssFilesPattern, config, outputPath, minify)
    log.info('Watching...')
  }
  watcher.on('ready', onChangeAsync)
  watcher.on('change', onChangeAsync)
}
