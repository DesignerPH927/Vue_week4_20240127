
// 步驟：
// 1. 畫面layout v
// 2. 驗證登入成功 v
// 3. 抓取遠端資料並渲染 v
// 4. 製作彈跳 product、delProduct modal 元件 v
// 5. 製作切換 新增、編輯 modal v
// 6. 製作 modal 內容 v
// 7. 將 modal內的 input 綁定 v-model v
// 8. 製作多圖新增功能 v
// 9. 製作 新增、編輯、刪除功能 v
// 10. 製作 分頁 功能 v
// 11. 製作登出功能 V





// apiUrl:https://vue3-course-api.hexschool.io/v2
// apiPath: 'vuejs2024'


import productModal from './modal/productModal.js'

import delModal from './modal/delProductModal.js'

import pagination from './pagination.js'

const app = Vue.createApp({
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'vuejs2024',
      isNew: false,     //辨別 新、舊 資料使用
      remoteData: [],
      tempProduct: {},
      pages: {} // 建立分頁
    }
  },
  components: {
    productModal,
    delModal,
    pagination
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)zack0125\s*\=\s*([^;]*).*$)|^.*$/,
  "$1",);
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          alert("已驗證", res);
          this.getProducts()
        })
        .catch((err) => {
          alert("未驗證", err.response.data.message);
          window.location = 'index.html'
        })
    },
    // 注意：製作分頁時，/?page ← 這裡只能使用page，若是用別的名稱則不會動做
    getProducts ( pages = 1 ) {
      axios(`${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${pages}`)
        .then((res) => {
          // console.log("已取得", res);
          this.remoteData = res.data.products
          this.pages = res.data.pagination
          // console.log(pages);
        })
        .catch((err) => {
          alert("未取得", err.response.data.message);
        })
    },
    openModal (status, item) {
      // console.log(status, item);
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.$refs.pModal.show()
        this.isNew = true
      }else if (status === 'edit') {
        this.tempProduct = { ...item }
        this.$refs.pModal.show()
        this.isNew = false
      }else if (status === 'delete') {
        this.tempProduct = { ...item }
        this.$refs.delModal.show()
      }
    },
    updateProduct () {      
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`
      let http = 'post'

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        http = 'put'
      }

      axios[http]( url, { data: this.tempProduct } )
        .then((res) => {
          alert("已更新", res);
          this.$refs.pModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert("未更新", err.response.data.message);
        })
    },
    delProduct () {
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert("已刪除", res);
          this.$refs.delModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert("未刪除", err.response.data.message);
        })
    },
    logout () {
      axios.post(`${this.apiUrl}/logout`)
        .then((res) => {
          alert('#已登出', res)
          window.location = 'index.html'
        })
        .catch((err) => {
          alert("未登出", err.response.data.message)
          
        })
    }
  },
  mounted () {
    this.checkAdmin()    
  }
})

app.mount('#app')