<template>
    <div>
        <div class="d-flex justify-content-end mt-3 mb-5">
            <button type="button" class="btn btn-primary" @click="handleCreate" >&#43; Add Todo</button>
        </div>
        <Table>
            <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.id }}</td>
                <td>{{ todo.title }}</td>
                <td>{{ todo.description }}</td>
                <td>{{ todo.date_added }}</td>
                <td>{{ todo.deadline }}</td>
                <td>
                    <div class="bg-warning text-dark" v-if="todo.isComplete != true ">
                        <h5 class="text-center" @click="markComplete(todo.id, todo.isComplete)">Due</h5>
                    </div>
                    <div class="bg-success text-dark" v-else>
                        <h5 class="text-center" @click="markComplete(todo.id, todo.isComplete)">Complete</h5>
                    </div>
                </td>
                <td>
                    <div class="d-flex flex-row" style="justify-content:space-between">
                        
                        <!-- <router-link :to="{name: 'edit', params: {id: todo.id}}">Edit</router-link> -->
                        <div>
                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + todo.id">
                                <i class="bi bi-pen"></i>
                            </button>
                        </div>
                        <div>
                            <button @click="deleteTodo(todo.id)" type="button" class="btn btn-outline-danger" data-toggle="tooltip" data-placement="right" title="Delete">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <div class="modal fade" :id="'staticBackdrop' + todo.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Edit Task</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form action="" @submit="editTodo(todo.id)">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12 form-group">
                                            <label for="title" class="col-form-label col-form-label-lg">Title <span class="text-danger">*</span> </label>
                                            <input type="name" class="form-control" v-model.trim="todo.title" required=""/>
                                        </div>
                                        <div class="col-12 form-group">
                                            <label for="deadline" class="col-form-label col-form-label-lg">Description <span class="text-danger">*</span> </label>
                                            <textarea class="form-control" rows="3" placeholder="Description here..." v-model.trim="todo.description"></textarea>
                                        </div>
                                        <div class="col-12 form-group">
                                            <fieldset disabled>
                                                <label for="date_added" class="col-form-label col-form-label-lg">Date Added <span class="text-danger">*</span> </label>
                                                <input type="date" class="form-control" v-model="todo.date_added">
                                            </fieldset>
                                        </div>
                                        <div class="col-6 form-group">
                                            <label for="deadline" class="col-form-label col-form-label-lg">Deadline <span class="text-danger">*</span> </label>
                                            <input type="date" class="form-control" v-model="todo.deadline">
                                        </div>
                                        <div class="col-6 form-group">
                                            <label for="date_completed" class="col-form-label col-form-label-lg">Date Completed <span class="text-danger">*</span> </label>
                                            <input type="date" class="form-control" v-model="todo.date_completed">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </tr>
        </Table>
        <CreateTodo :showModal="showCreate" @closeModal="closeCreate"/>
    </div>
</template>

<script>
import {  mapState } from 'vuex';
import Table from '../table/Table.vue';
import CreateTodo from '../modals/CreateTodo.vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        return {};
    },
    components: { Table, CreateTodo },
    data() {
        return {
            showModal : false,
            showCreate: false,
            isComplete: false,
            date_completed: new Date().toISOString().slice(0,10),
        }
    },
    computed: {
        ...mapState(["todos"]),
    },
    methods: {
        handleCreate(){
            this.showCreate = !this.showCreate
        },
        closeCreate(){
            this.showCreate = false
        },
        markComplete(id, isComplete){
            this.$store.dispatch("markComplete", {id, isComplete : this.isComplete = !this.isComplete})
        },
        editTodo(id){
           // this.$store.dispatch("editTodos", {id})
            this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your To-Do has been saved!',
                showConfirmButton: false,
                timer: 3000
            }).then( this.$store.dispatch("editTodos", {id}))
        },
        deleteTodo(id){
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((response)=>{
                if (response.isConfirmed){
                    this.$store.dispatch("deleteTodos", {id})
                    this.$swal.fire(
                        {
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        }
                    )
                } else if (
                    response.dismiss === Swal.DismissReason.cancel
                ) {
                    this.$swal.fire({
                        title: 'Canceled',
                        text: 'Your imaginary file is safe :)',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
    },
    created() {
        this.$store.dispatch("fetchTodos" )
    }
}
</script>

<style scoped>
input[type='checkbox'] {
    accent-color: green;
}
</style>