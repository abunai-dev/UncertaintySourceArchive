<template>Incoming</template>

<script setup lang="ts">
import type { Uncertainty } from '@/model/uncertainty/Uncertainty'
import { ref, type PropType, type Ref, computed } from 'vue'
import type { Filter, Sorting, Columns } from '@/model/ui/Table'
import { classesValues, Classes, classes } from '@/model/classes/Class'
import { classOptions, type ClassOptionEnumType } from '@/model/classes/options/ClassOption'

const props = defineProps({
  searchString: {
    type: String,
    required: false,
    default: ''
  },
  filter: {
    type: Object as PropType<Filter>,
    required: false,
    default: () => {
      return {}
    }
  },
  sorting: {
    type: Object as PropType<Sorting>,
    required: false,
    default: () => {
      return {
        field: 'none',
        direction: 'ascending'
      }
    }
  },
  shownColumns: {
    type: Array as PropType<Columns[]>,
    required: false,
    default: () => {
      return [
        Classes.ARCHITECTURAL_ELEMENT_TYPE,
        Classes.IMPACT_ON_CONFIDENTIALITY,
        Classes.LOCATION,
        Classes.MANAGABILITY,
        Classes.REDUCIBLE_BY_ADD,
        Classes.RESOLUTION_TIME,
        Classes.SEVERITY_OF_IMPACT,
        Classes.TYPE,
        'name',
        'id',
        'keywords'
      ]
    }
  }
})

const uncertainties: Ref<Uncertainty[]> = ref([])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filteredUncertainties = computed(() => {
  return uncertainties.value
    .filter(matchesFilter)
    .filter(matchesSearchString)
    .sort(uncertaintyComparator)
})

/**
 * Predicate to check if an uncertainty matches the filter
 * @param uncertainty Uncertainty to check
 */
function matchesFilter(uncertainty: Uncertainty): boolean {
  return classesValues.every((c: Classes) => {
    const f = props.filter[c]
    return f == undefined || f.length == 0 || f.includes(uncertainty.classes[c])
  })
}

const searcheStringParts = computed(() =>
  props.searchString
    .trimEnd()
    .toLowerCase()
    .split(/ +/g)
    .map((s) => s.trim().replace(/,/g, ''))
)

/**
 * Predicate to check if an uncertainty matches the search string
 * @param uncertainty Uncertainty to check
 */
function matchesSearchString(uncertainty: Uncertainty): boolean {
  if (searcheStringParts.value.length == 0) {
    return true
  }
  return searcheStringParts.value.some((part) => {
    if (uncertainty.name.toLowerCase().includes(part) || uncertainty.id.toString().includes(part)) {
      return true
    }
    for (let keyword in uncertainty.keywords) {
      if (keyword.toLowerCase().includes(part)) {
        return true
      }
    }
    for (let c of classesValues) {
      if (classOptions[uncertainty.classes[c]].name.toLowerCase().includes(part)) {
        return true
      }
    }
    return false
  })
}

const sortingDirection = computed(() => (props.sorting.direction == 'ascending' ? 1 : -1))

/**
 * Comparator for uncertainties. Uses the sorting field and direction from props.
 * @param a Left uncertainty
 * @param b Right uncertainty
 */
function uncertaintyComparator(a: Uncertainty, b: Uncertainty): number {
  if (props.sorting.field == 'none') {
    return a.id - b.id
  } else if (props.sorting.field == 'name') {
    return sortingDirection.value * a.name.localeCompare(b.name)
  } else if (props.sorting.field == 'id') {
    return sortingDirection.value * (a.id - b.id)
  } else if (props.sorting.field == 'keywords') {
    const aKeywords = Object.keys(a.keywords).sort()
    const bKeywords = Object.keys(b.keywords).sort()
    for (let i = 0; i < Math.min(aKeywords.length, bKeywords.length); i++) {
      const result = sortingDirection.value * aKeywords[i].localeCompare(bKeywords[i])
      if (result != 0) {
        return result
      }
    }
    return sortingDirection.value * (aKeywords.length - bKeywords.length)
  } else {
    const indexA = (classes[props.sorting.field].options as ClassOptionEnumType[]).indexOf(
      a.classes[props.sorting.field]
    )
    const indexB = (classes[props.sorting.field].options as ClassOptionEnumType[]).indexOf(
      b.classes[props.sorting.field]
    )

    if (indexA == indexB) {
      return 0
    }
    if (indexA == -1) {
      return sortingDirection.value
    }
    if (indexB == -1) {
      return sortingDirection.value * -1
    }
    return sortingDirection.value * (indexA - indexB)
  }
}
</script>