export default {
  props: ['isNew', 'tempProduct', 'updateProduct'],
  data () {
    return {
      pModal: ''      
    }
  },  
  methods: {
    show () {
      this.pModal.show()
    },
    hide () {
      this.pModal.hide()
    }
  },
  mounted () {    
    this.pModal = new bootstrap.Modal(this.$refs.pModal, {
      keyboard: false,
      backdrop: false
    })    
  },
  template: '#productModal'
}