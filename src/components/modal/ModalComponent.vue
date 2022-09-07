<template>
    <teleport to="body">
        <div
            ref="modal"
            class="modal fade"
            :class="{ show: active, 'd-block': active }"
            tabindex="-1"
            role="dialog"
            :aria-labelledby="`modal-${id}`"
            :aria-hidden="active"
        >
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark" :id="`modal-${id}`"><slot name="title"></slot></h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="$emit('closeModal', false)"></button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
    <div class="fade" :class="{ show: active, 'modal-backdrop show': active }"></div>
    </teleport>
</template>

<script>
import { ref, watch} from 'vue'
import IdUnique from '../utils/unique-id';

export default {
    name: 'Modal',
    emits: ['closeModal'],
    props: {
      showModal: Boolean,
      modalId: String,
    },
    setup(props) {
      const id = IdUnique();
      const active = ref(props.showModal);
  
      watch(() => props.showModal, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          active.value = props.showModal;
          const body = document.querySelector("body");
          props.showModal ? body.classList.add("modal-open") : body.classList.remove("modal-open")
        }
      },{immediate:true, deep: true});
  
      return {
        active,
        id
      }
    }
  }
  </script>