<template>
    <div v-if="isSelected">
        <slot></slot>
    </div>
</template>

<script>
export default {
    setup () {
        return {}
    },
    props: {
        isSelected: {
            type: Boolean
        }
    }
}
</script>