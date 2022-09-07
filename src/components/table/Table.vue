<template>
    <div class="table-responsive">
        <table class="table table-hover">
            <caption>All Todos</caption>
            <thead class="">
                <th>#ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date Added</th>
                <th>Deadline</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
