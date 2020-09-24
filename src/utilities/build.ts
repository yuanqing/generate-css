import { Config } from '../types'
import { generateCssAsync } from './generate-css'
import { log } from './log'

export async function build(
  pattern: string,
  baseCssFilesPattern: null | string,
  config: Config,
  outputPath: string,
  minify: boolean
): Promise<void> {
  log.info('Generating CSS...')
  await generateCssAsync(
    pattern,
    baseCssFilesPattern,
    config,
    outputPath,
    minify
  )
  log.success('Done')
}
