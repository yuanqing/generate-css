export type Config = {
  breakpoint: {
    [breakpoint: string]: string
  }
  color: {
    [color: string]: string
  }
  fontSize: {
    [fontSize: string]: string
  }
  fontFamily: {
    [fontFamily: string]: string
  }
  fontWeight: {
    [fontWeight: string]: string
  }
  space: {
    unit: string
    value: number
  }
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
