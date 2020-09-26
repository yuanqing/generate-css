#!/usr/bin/env node
import * as sade from 'sade'

import { build } from './build'
import { readConfigAsync } from './utilities/read-config-async'
import { watch } from './watch'

sade('generate-css <pattern>', true)
  .option(
    '-a, --append',
    'Glob pattern for CSS files to append to the generated CSS file'
  )
  .option(
    '-c, --config',
    'Path to a `generate-css` configuration file',
    'generate-css.config.json'
  )
  .option(
    '-f, --format',
    'Whether to pretty-print the generated CSS file',
    false
  )
  .option('-o, --output', 'Path to write the generated CSS file')
  .option(
    '-p, --prepend',
    'Glob pattern for CSS files to prepend to the generated CSS file'
  )
  .option(
    '-w, --watch',
    'Whether to automatically generate a CSS file on changes to the source files',
    false
  )
  .action(async function (
    pattern: string,
    options: {
      append: string
      config: string
      format: boolean
      output: string
      prepend: string
      watch: boolean
    }
  ) {
    const config = await readConfigAsync(options.config, {
      appendCssFilesPattern:
        typeof options.append === 'undefined' ? null : options.append,
      outputPath: typeof options.output === 'undefined' ? null : options.output,
      prependCssFilesPattern:
        typeof options.prepend === 'undefined' ? null : options.prepend,
      prettyPrint: options.format,
      sourceFilesPattern: pattern
    })
    if (options.watch === true) {
      watch(config)
      return
    }
    await build(config)
  })
  .parse(process.argv)
