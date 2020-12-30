# Functional CSS classes

## align-items

Class name | CSS rules
:--|:--
`.items-baseline` | `align-items: baseline;`
`.items-center` | `align-items: center;`
`.items-end` | `align-items: flex-end;`
`.items-start` | `align-items: flex-start;`
`.items-stretch` | `align-items: stretch;`

## background-color

Class name | CSS rules
:--|:--
`.bg` | `background-color: ${theme.backgroundColor.default \|\| theme.color.default};`
`.bg-${key}` | `background-color: ${theme.backgroundColor[key] \|\| theme.color[key]};`

## border-color

Class name | CSS rules
:--|:--
`.border` | `border-color: ${theme.borderColor.default \|\| theme.color.default};`
`.border-${key}` | `border-color: ${theme.borderColor[key] \|\| theme.color[key]};`

## border-radius

- `defaultValue` = `theme.borderRadius.default`
- `value` = `theme.borderRadius[key]` || `resolveNumericValue(key)`

Class name | CSS rules
:--|:--
`.rounded` | `border-radius: ${defaultValue};`
`.rounded-t` | `border-top-left-radius: ${defaultValue};`<br>`border-top-right-radius: ${defaultValue};`
`.rounded-r` | `border-top-right-radius: ${defaultValue};`<br>`border-bottom-right-radius: ${defaultValue};`
`.rounded-b` | `border-bottom-left-radius: ${defaultValue};`<br>`border-bottom-right-radius: ${defaultValue};`
`.rounded-l` | `border-top-left-radius: ${defaultValue};`<br>`border-bottom-left-radius: ${defaultValue};`
`.rounded-tl` | `border-top-left-radius: ${defaultValue};`
`.rounded-tr` | `border-top-right-radius: ${defaultValue};`
`.rounded-bl` | `border-bottom-left-radius: ${defaultValue};`
`.rounded-br` | `border-bottom-right-radius: ${defaultValue};`
`.rounded-full` | `border-radius: 9999px;`
`.rounded-t-full` | `border-top-left-radius: 9999px;`<br>`border-top-right-radius: 9999px;`
`.rounded-r-full` | `border-top-right-radius: 9999px;`<br>`border-bottom-right-radius: 9999px;`
`.rounded-b-full` | `border-bottom-left-radius: 9999px;`<br>`border-bottom-right-radius: 9999px;`
`.rounded-l-full` | `border-top-left-radius: 9999px;`<br>`border-bottom-left-radius: 9999px;`
`.rounded-tl-full` | `border-top-left-radius: 9999px;`
`.rounded-tr-full` | `border-top-right-radius: 9999px;`
`.rounded-bl-full` | `border-bottom-left-radius: 9999px;`
`.rounded-br-full` | `border-bottom-right-radius: 9999px;`
`.rounded-${key}` | `border-radius: ${value};`
`.rounded-t-${key}` | `border-top-left-radius: ${value};`<br>`border-top-right-radius: ${value};`
`.rounded-r-${key}` | `border-top-right-radius: ${value};`<br>`border-bottom-right-radius: ${value};`
`.rounded-b-${key}` | `border-bottom-left-radius: ${value};`<br>`border-bottom-right-radius: ${value};`
`.rounded-l-${key}` | `border-top-left-radius: ${value};`<br>`border-bottom-left-radius: ${value};`
`.rounded-tl-${key}` | `border-top-left-radius: ${value};`
`.rounded-tr-${key}` | `border-top-right-radius: ${value};`
`.rounded-bl-${key}` | `border-bottom-left-radius: ${value};`
`.rounded-br-${key}` | `border-bottom-right-radius: ${value};`

## border-width

- `defaultValue` = `theme.borderWidth.default`
- `value` = `theme.borderWidth[key]` || `resolveNumericValue(key)`

Class name | CSS rules
:--|:--
`.b` | `border-width: ${defaultValue};`
`.bx` | `border-left-width: ${defaultValue};`<br>`border-right-width: ${defaultValue};`
`.by` | `border-top-width: ${defaultValue};`<br>`border-bottom-width: ${defaultValue};`
`.bt` | `border-top-width: ${defaultValue};`
`.br` | `border-right-width: ${defaultValue};`
`.bb` | `border-bottom-width: ${defaultValue};`
`.bl` | `border-left-width: ${defaultValue};`
`.b-${key}` | `border-width: ${value};`
`.bx-${key}` | `border-left-width: ${value};`<br>`border-right-width: ${value};`
`.by-${key}` | `border-top-width: ${value};`<br>`border-bottom-width: ${value};`
`.bt-${key}` | `border-top-width: ${value};`
`.br-${key}` | `border-right-width: ${value};`
`.bb-${key}` | `border-bottom-width: ${value};`
`.bl-${key}` | `border-left-width: ${value};`

## color

Class name | CSS rules
:--|:--
`.color` | `color: ${theme.color.default};`
`.color-${key}` | `color: ${theme.color[key]};`

## cursor

Class name | CSS rules
:--|:--
`.cursor-default` | `cursor: default;`
`.cursor-pointer` | `cursor: pointer;`

## display

Class name | CSS rules
:--|:--
`.block` | `display: block;`
`.flex` | `display: flex;`
`.hidden` | `display: none;`
`.inline-flex` | `display: inline-flex;`

## flex

Class name | CSS rules
:--|:--
`.flex-1` | `flex: 1 1 0%;`
`.flex-auto` | `flex: 1 1 auto;`
`.flex-initial` | `flex: 0 1 auto;`
`.flex-none` | `flex: none;`

## flex-wrap

Class name | CSS rules
:--|:--
`.flex-nowrap` | `flex-wrap: nowrap;`
`.flex-wrap` | `flex-wrap: wrap;`
`.flex-wrap-reverse` | `flex-wrap: wrap-reverse;`

## font-family

Class name | CSS rules
:--|:--
`.font` | `font-family: ${theme.fontFamily.default};`
`.font-${key}` | `font-family: ${theme.fontFamily[key]};`

## font-size

Class name | CSS rules
:--|:--
`.font-${key}` | `font-size: ${theme.fontSize[key]};`

## font-weight

Class name | CSS rules
:--|:--
`.font-${key}` | `font-weight: ${theme.fontWeight[key]};`

## height

Class name | CSS rules
:--|:--
`.h` | `height: ${theme.height.default};`
`.h-screen` | `height: 100vh;`
`.h-${key}` | `height: ${theme.height[key] \|\| computeNumericValue(key)};`
`.minh` | `min-height: ${theme.height.default};`
`.minh-screen` | `min-height: 100vh;`
`.minh-${key}` | `min-height: ${theme.height[key] \|\| computeNumericValue(key)};`
`.maxh` | `max-height: ${theme.height.default};`
`.maxh-screen` | `max-height: 100vh;`
`.maxh-${key}` | `max-height: ${theme.height[key] \|\| computeNumericValue(key)};`

## justify-content

Class name | CSS rules
:--|:--
`.justify-around` | `justify-content: space-around;`
`.justify-between` | `justify-content: space-between;`
`.justify-center` | `justify-content: center;`
`.justify-end` | `justify-content: flex-end;`
`.justify-evenly` | `justify-content: space-evenly;`
`.justify-start` | `justify-content: flex-start;`

## letter-spacing

Class name | CSS rules
:--|:--
`.kerning` | `letter-spacing: ${theme.letterSpacing.default};`
`.kerning-${key}` | `letter-spacing: ${theme.letterSpacing[key]};`

## line-height

Class name | CSS rules
:--|:--
`.leading` | `line-height: ${theme.lineHeight.default};`
`.leading-${key}` | `line-height: ${theme.lineHeight[key]};`

## margin

- `defaultValue` = `theme.margin.default` || `theme.space.default`
- `value` = `theme.margin[key]` || `theme.space[key]` || `resolveNumericValue(key)`

Class name | CSS rules
:--|:--
`.m` | `margin: ${defaultValue};`
`.mx` | `margin-left: ${defaultValue};`<br>`margin-right: ${defaultValue};`
`.my` | `margin-top: ${defaultValue};`<br>`margin-bottom: ${defaultValue};`
`.mt` | `margin-top: ${defaultValue};`
`.mr` | `margin-right: ${defaultValue};`
`.mb` | `margin-bottom: ${defaultValue};`
`.ml` | `margin-left: ${defaultValue};`
`.mx-${key}` | `margin-left: ${value};`<br>`margin-right: ${value};`
`.my-${key}` | `margin-top: ${value};`<br>`margin-bottom: ${value};`
`.mt-${key}` | `margin-top: ${value};`
`.mr-${key}` | `margin-right: ${value};`
`.mb-${key}` | `margin-bottom: ${value};`
`.ml-${key}` | `margin-left: ${value};`
`.-m` | `margin: -${defaultValue};`
`.-mx` | `margin-left: -${defaultValue};`<br>`margin-right: -${defaultValue};`
`.-my` | `margin-top: -${defaultValue};`<br>`margin-bottom: -${defaultValue};`
`.-mt` | `margin-top: -${defaultValue};`
`.-mr` | `margin-right: -${defaultValue};`
`.-mb` | `margin-bottom: -${defaultValue};`
`.-ml` | `margin-left: -${defaultValue};`
`.-mx-${key}` | `margin-left: -${value};`<br>`margin-right: -${value};`
`.-my-${key}` | `margin-top: -${value};`<br>`margin-bottom: -${value};`
`.-mt-${key}` | `margin-top: -${value};`
`.-mr-${key}` | `margin-right: -${value};`
`.-mb-${key}` | `margin-bottom: -${value};`
`.-ml-${key}` | `margin-left: -${value};`

## outline

Class name | CSS rules
:--|:--
`.outline-none` | `outline: none;`

## padding

defaultValue = theme.padding.default || theme.space.default
value = theme.padding[key] || theme.space[key] || computeNumericValue(key)

Class name | CSS rules
:--|:--
`.p` | `padding: ${defaultValue};`
`.px` | `padding-left: ${defaultValue};`<br>`padding-right: ${defaultValue};`
`.py` | `padding-top: ${defaultValue};`<br>`padding-bottom: ${defaultValue};`
`.pt` | `padding-top: ${defaultValue};`
`.pr` | `padding-right: ${defaultValue};`
`.pb` | `padding-bottom: ${defaultValue};`
`.pl` | `padding-left: ${defaultValue};`
`.px-${key}` | `padding-left: ${value};`<br>`padding-right: ${value};`
`.py-${key}` | `padding-top: ${value};`<br>`padding-bottom: ${value};`
`.pt-${key}` | `padding-top: ${value};`
`.pr-${key}` | `padding-right: ${value};`
`.pb-${key}` | `padding-bottom: ${value};`
`.pl-${key}` | `padding-left: ${value};`

## position

Class name | CSS rules
:--|:--
`.absolute` | `position: absolute;`
`.fixed` | `position: fixed;`
`.relative` | `position: relative;`
`.static` | `position: static;`

## select

Class name | CSS rules
:--|:--
`.select-all` | `user-select: all;`
`.select-auto` | `user-select: auto;`
`.select-none` | `user-select: none;`
`.select-text` | `user-select: text;`

## text style

Class name | CSS rules
:--|:--
`.text` | `font-size: ${theme.fontSize.default};`<br>`font-weight: ${theme.fontWeight.default};`<br>`letter-spacing: ${theme.letterSpacing.default};`<br>`line-height: ${theme.lineHeight.default};`
`.text-${key}` | `font-size: ${theme.fontSize[key]};`<br>`font-weight: ${theme.fontWeight[key]};`<br>`letter-spacing: ${theme.letterSpacing[key]};`<br>`line-height: ${theme.lineHeight[key]};`

## text-align

Class name | CSS rules
:--|:--
`.text-center` | `text-align: center;`
`.text-justify` | `text-align: justify;`
`.text-left` | `text-align: left;`
`.text-right` | `text-align: right;`

## text-decoration

Class name | CSS rules
:--|:--
`.line-through` | `text-decoration: line-through;`
`.no-underline` | `text-decoration: none;`
`.underline` | `text-decoration: underline;`

## text-transform

Class name | CSS rules
:--|:--
`.caps` | `text-transform: capitalize;`
`.lowercase` | `text-transform: lowercase;`
`.normal-case` | `text-transform: none;`
`.uppercase` | `text-transform: uppercase;`

## top, right, bottom, left

- `value` = `theme.space[key]` || `resolveNumericValue(key)`

Class name | CSS rules
:--|:--
`.top` | `top: 0;`
`.top-${key}` | `top: ${value};`
`.-top-${key}` | `top: -${value};`
`.right` | `right: 0;`
`.right-${key}` | `right: ${value};`
`.-right-${key}` | `right: -${value};`
`.bottom` | `bottom: 0;`
`.bottom-${key}` | `bottom: ${value};`
`.-bottom-${key}` | `bottom: -${value};`
`.left` | `left: 0;`
`.left-${key}` | `left: ${value};`
`.-left-${key}` | `left: -${value};`

## width

Class name | CSS rules
:--|:--
`.w` | `width: ${theme.width.default};`
`.w-screen` | `width: 100vw;`
`.w-${key}` | `width: ${theme.width[key] \|\| computeNumericValue(key)};`
`.minw` | `min-width: ${theme.width.default};`
`.minw-screen` | `min-width: 100vw;`
`.minw-${key}` | `min-width: ${theme.width[key] \|\| computeNumericValue(key)};`
`.maxw` | `max-width: ${theme.width.default};`
`.maxw-screen` | `max-width: 100vw;`
`.maxw-${key}` | `max-width: ${theme.width[key] \|\| computeNumericValue(key)};`
