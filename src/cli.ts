#!/usr/bin/env node
import * as sade from 'sade'

import { build } from './utilities/build'
import { readConfigAsync } from './utilities/read-config-async'
import { watch } from './utilities/watch'

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
  .option('--m, --minify', 'Whether to minify the generated CSS file', true)
  .option('--o, --output', 'Path to output the generated CSS file')
  .option(
    '--w, --watch',
    'Watch the input files and regenerate a CSS file on changes',
    false
  )
  .action(async function (
    pattern: string,
    options: {
      base: string
      config: string
      minify: boolean
      output: string
      watch: boolean
    }
  ) {
    const config = await readConfigAsync(options.config, {
      baseCssFilesPattern:
        typeof options.base === 'undefined' ? null : options.base,
      minify: options.minify,
      outputPath: typeof options.output === 'undefined' ? null : options.output,
      sourceFilesPattern: pattern
    })
    if (options.watch === true) {
      watch(config)
      return
    }
    await build(config)
  })
  .parse(process.argv)
