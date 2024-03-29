import type { CategoryOption } from './CategoryOption'
import ReducibleByAddStaticData from './ReducibleByAddStaticData.json'
import colors from 'tailwindcss/colors'

/** List of all options of the Category Reducible by Add */
export enum ReducibleByAddOptionList {
  YES = 'Yes',
  NO = 'No'
}

/** Map with detailed information about all options of the Category Reducible by Add */
const reducibleByAddOptions = ReducibleByAddStaticData as Record<
  ReducibleByAddOptionList,
  CategoryOption
>
reducibleByAddOptions[ReducibleByAddOptionList.YES].icon = 'fa-hexagon-check'
reducibleByAddOptions[ReducibleByAddOptionList.NO].icon = 'fa-hexagon-xmark'

reducibleByAddOptions[ReducibleByAddOptionList.YES].color = colors.emerald
reducibleByAddOptions[ReducibleByAddOptionList.NO].color = colors.pink
export { reducibleByAddOptions }
