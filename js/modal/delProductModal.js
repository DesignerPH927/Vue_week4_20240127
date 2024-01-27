export default {
  props: ['tempProduct', 'delProduct'],
  data () {
    return {
      delPModal: ''
    }
  },
  methods: {
    show () {
      this.delPModal.show()
    },
    hide () {
      this.delPModal.hide()
    }
  },
  mounted () {    
    this.delPModal = new bootstrap.Modal(this.$refs.delPModal, {
      keyboard: false,
      backdrop: false
    })    
  },
  template: '#delProductModal'
}