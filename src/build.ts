import { generateCssAsync } from './generate-css'
import { CliOptions } from './types'
import { log } from './utilities/log'
import { readConfigAsync } from './utilities/read-config-async'

export async function build(cliOptions: CliOptions): Promise<void> {
  try {
    const config = await readConfigAsync(cliOptions)
    if (config.outputPath !== null) {
      log.info('Generating CSS...')
    }
    await generateCssAsync(config)
    if (config.outputPath !== null) {
      log.success('Done')
    }
  } catch (error) {
    log.error(error.message)
    process.exit(1)
  }
}
