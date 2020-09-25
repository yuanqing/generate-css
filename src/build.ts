import { generateCssAsync } from './generate-css'
import { Config } from './types'
import { log } from './utilities/log'

export async function build(config: Config): Promise<void> {
  if (config.outputPath !== null) {
    log.info('Generating CSS...')
  }
  await generateCssAsync(config)
  if (config.outputPath !== null) {
    log.success('Done')
  }
}