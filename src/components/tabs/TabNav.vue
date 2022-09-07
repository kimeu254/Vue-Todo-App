<template>
    <div>
        <ul class="nav nav-pills nav-fill justify-content-center" style="cursor:pointer">
            <li v-for="tab in tabs" :key="tab" class="nav-item">
                <a class="nav-link" :class="{ active: tab === selected }" @click="setTab(tab)">
                    {{ tab }}
                </a>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
export default {
    setup () {
        return {}
    },
    props: {
        tabs: {
            type: Array,
            required: true,
        },
        selected: {
            type: String,
            required: true,
        },
    },
    methods: {
        setTab(tab) {
            this.$emit('selected', tab);
        }
    },
}
</script>