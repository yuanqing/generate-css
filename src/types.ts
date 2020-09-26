export type Config = {
  appendCssFilesPattern: null | string
  baseFontSize: {
    [key: string]: string
  }
  breakpoint: {
    [key: string]: string
  }
  color: {
    [key: string]: string
  }
  fontFamily: {
    [key: string]: string
  }
  fontSize: {
    [key: string]: string
  }
  fontWeight: {
    [key: string]: string
  }
  letterSpacing: {
    [key: string]: string
  }
  lineHeight: {
    [key: string]: string
  }
  outputPath: null | string
  prependCssFilesPattern: null | string
  prettyPrint: boolean
  reset: boolean
  sourceFilesPattern: string
  space: number | string
}

export interface ParsedClassName {
  breakpoint: null | string
  pseudoClass: null | string
  selector: string
}

export type CssDeclarationBlocks = {
  breakpoint: null | string
  cssDeclarationBlocks: Array<CssDeclarationBlock>
}
export interface CssDeclarationBlock extends ParsedClassName {
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
