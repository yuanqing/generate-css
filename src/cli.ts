#!/usr/bin/env node
import * as sade from 'sade'

import { generateCssAsync } from './utilities/generate-css'
import { readConfigAsync } from './utilities/read-config-async'

sade('generate-css <pattern>', true)
  .option(
    '--b, --base',
    'Glob pattern for base CSS files to prepend to the generated CSS file'
  )
  .option(
    '--c, --config',
    'Path to a generate-css configuration file',
    'generate-css.config.json'
  )
  .option('--o, --output', 'Path to output the generated CSS file', 'style.css')
  .action(async function (
    pattern: string,
    options: { base: string; config: string; output: string }
  ) {
    const config = await readConfigAsync(options.config)
    const baseCssFilesPattern =
      typeof options.base === 'undefined' ? null : options.base
    await generateCssAsync(pattern, baseCssFilesPattern, config, options.output)
  })
  .parse(process.argv)
