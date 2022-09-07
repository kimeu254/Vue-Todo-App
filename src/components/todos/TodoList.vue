<template>
    <div>
        <h2 class="d-flex justify-content-center mt-3">To-Do List</h2>
        <TabNav :tabs="['All', 'Complete', 'Due']" :selected="selected" @selected="setSelected">
            <Tab :isSelected="selected === 'All'">
                <Todos/>
            </Tab>
            <Tab :isSelected="selected === 'Complete'">
                <Complete/>
            </Tab>
            <Tab :isSelected="selected === 'Due'">
                <Due/>
            </Tab>
        </TabNav>
    </div>
</template>

<script>
import TabNav from '../tabs/TabNav.vue';
import Tab from '../tabs/Tab.vue';
import Todos from './Todos.vue';
import Complete from './Complete.vue';
import Due from './Due.vue';
export default {
    setup() {
        return {};
    },
    data() {
        return {
            selected: 'All'
        };
    },
    components: { TabNav, Tab, Todos, Complete, Due },
    methods: {
        setSelected(tab){
        this.selected = tab
        }
    },
}
</script>
