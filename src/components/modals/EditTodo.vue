<template>
  <div>
    <h1>Edit Todo</h1>
    <form action="" @submit.prevent="onSave">
      <h3>{{ todo.title }} </h3>
      <textarea name="" id="" cols="30" rows="10" v-model="todo.description"></textarea>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  },
  data() {
    return {
      
    }
  },
  computed: {
    todo(){
      return this.$store.state.todos.find(t => t.id == this.$route.params.id)
    }
  },
  methods: {
    async onSave(){
      await this.$store.dispatch('editTodo', this.todo)
      this.$router.push("/")
    }
  },
}
</script>
