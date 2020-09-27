type Theme = {
  [key: string]: string
}

export type Config = {
  appendCssFilesPattern: null | string
  outputPath: null | string
  prependCssFilesPattern: null | string
  prettyPrint: boolean
  reset: boolean
  sourceFilesPattern: string
  theme: {
    baseFontSize: Theme
    breakpoint: Theme
    color: Theme
    fontFamily: Theme
    fontSize: Theme
    fontWeight: Theme
    letterSpacing: Theme
    lineHeight: Theme
    space: number | string
  }
}

export interface ParsedClassName {
  breakpoint: null | string
  pseudoClass: null | PseudoClass
  selector: string
}

export type PseudoClass = {
  isGroup: boolean
  value: string
}

export type CssDeclarationBlocks = {
  breakpoint: null | string
  cssDeclarationBlocks: Array<CssDeclarationBlock>
}
export interface CssDeclarationBlock extends ParsedClassName {
  className: string
  declarations: Declarations
}
export type Declarations = { [property: string]: string }

export type Plugin = {
  regex: RegExp
  createDeclarations: (
    matches: Array<string>,
    config: Config,
    formatValue: (value: string) => null | string
  ) => { [property: string]: string }
}
