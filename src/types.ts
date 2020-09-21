export type Config = {
  space: {
    unit: string
    value: number
  }
  breakpoints: {
    [breakpoint: string]: string
  }
  output: string
}

export interface ParsedClassName {
  breakpoint: null | string
  pseudoClass: null | string
  selector: string
}
export interface CssDeclarationBlock extends ParsedClassName {
  declarations: { [property: string]: string }
}
export type CssDeclarationBlocks = {
  breakpoint: null | string
  cssDeclarationBlocks: Array<CssDeclarationBlock>
}

export type Plugin = {
  regex: RegExp
  createDeclarations: (
    config: Config,
    matches: Array<string>,
    className: string
  ) => { [property: string]: string }
}
