
// account: vueJS_2024@gmail.com
// password: vuejs2024
// apiUrl:https://vue3-course-api.hexschool.io/v2

const app = Vue.createApp({
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      apiUrl: 'https://vue3-course-api.hexschool.io/v2'
    }
  },
  methods: {
    loginAdmin () {
      if (this.login.username === '' || this.login.password === '') {
        alert('請勿空白')
        return
      }
      axios.post(`${this.apiUrl}/admin/signin`, this.login)
        .then((res) => {
          alert("已登入", res);
          const { token, expired } = res.data
          document.cookie = `zack0125=${token}; expires=${new Date(expired)};`;
          window.location = 'products.html'
        })
        .catch((err) => {
          alert("未登入", err.response.data.message);
        })
    }
  },
})

app.mount('#app')