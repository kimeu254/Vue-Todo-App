<template>
    <ModalComponent>
        <template v-slot:title>New Todo</template>
        <form action="" @submit.prevent="onSubmit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 form-group">
                        <label class="col-form-label col-form-label-lg">Title <span class="text-danger">*</span> </label>
                        <input type="name" class="form-control" v-model.trim="todo.title" required/>
                    </div>
                    <div class="col-12 form-group">
                        <label class="col-form-label col-form-label-lg">Description <span class="text-danger">*</span> </label>
                        <textarea class="form-control" rows="3" placeholder="Description here..." v-model.trim="todo.description" required></textarea>
                    </div>
                    <div class="col-6 form-group">
                        <label class="col-form-label col-form-label-lg">Deadline <span class="text-danger">*</span> </label>
                        <input type="date" class="form-control" v-model="todo.deadline" required>
                    </div>
                    <div class="col-6 form-group">
                        <label class="col-form-label col-form-label-lg">Date Completed <span class="text-danger">*</span> </label>
                        <input type="date" class="form-control" v-model="todo.date_completed">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('closeModal', true)">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </ModalComponent> 
</template>

<script>
import ModalComponent from '../modal/ModalComponent.vue'
let arrayFromStorage = JSON.parse(localStorage.getItem("TODOS"))
let arrayLength = arrayFromStorage.length
arrayLength = JSON.stringify(++arrayLength)

export default {
    setup() {
        return {}
    },
    data() {
        return {
            todo: {
                id: arrayLength,
                title: "",
                description: "",
                date_added: new Date().toISOString().slice(0,10),
                deadline: "",
                date_completed: "",
                isComplete: false
            },
        };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch("createTodo", this.todo)
            this.$emit('closeModal')
            this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your To-Do has been saved!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        newId() {
            
            
        }
    },
    components: { ModalComponent }
}
</script>
