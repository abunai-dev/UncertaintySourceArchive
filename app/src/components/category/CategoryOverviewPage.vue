<template>
    <div class="classification-details">
        <header>
            <h1>Category - "{{ props.statedcategory.name }}"</h1>
        </header>
        <main>
            <BasicInformation :definition="props.statedcategory.definition" :description="props.statedcategory.description"/>
            <OptionDetailSection :options="props.statedcategory.options" :category="props.statedcategory" @filter-by-option="sendFilterOption"/>
            <ExampleSection :description="props.statedcategory.exampleScenario" :imagePath="imagePath" :collaborationUrl="props.statedcategory.discussionUrl"/>
        </main>
        
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@/util/types/Category';
import type { Option } from '@/util/types/Option';
import { type PropType, ref } from 'vue';
import BasicInformation from '@/components/util/BasicInformationSection.vue'
import OptionDetailSection from './OptionDetailSection.vue';
import ExampleSection from '../util/ExampleSection.vue';



const props = defineProps({
        statedcategory: {
            type: Object as PropType<Category>,
            required: true
        },
    });

const emit = defineEmits(['filterBy']);

function sendFilterOption(option: Option) {
    const category = props.statedcategory
    const payload = { category, option }
    console.log("sendFilterOption :" + props.statedcategory.name + Option.name)
    emit('filterBy', payload)
}

const imagePath = ref("images/categories/" + props.statedcategory.imagePath);

</script>

<style scoped>
.classification-details {
    margin: 10px;
    padding: 10px;
    flex-direction: column;
}

h1 {
    margin-top: 0;
}

main {
    flex-direction: column;
}

img {
    max-width: 1000px;
    max-height: 400px;
    align-content: center;
    text-align: center;
    align-self: center;

}

</style>
@/util/types/Option