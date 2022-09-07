<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a href="" class="navbar-brand" style="display:flex; align-items:center;">
                <img src="../../assets/img/icons8-task-100.png" alt="brand-img" class="" style="height:4rem; width:4rem">
                <h4 class="text-light text-uppercase" style="font-family: 'Rampart One', cursive; font-size: x-large; font-weight: 700;">{{ title }}</h4>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li v-for="link in props.links" :key="link.id" class="nav-item">
                        <router-link :to="link.path" class="nav-link active text-uppercase" aria-current="page">{{ link.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    title: {type: String, required: true},
    links: {type: Array, required: true}
});
</script>