var app = new Vue({
  el: '#app',
  data: {
    user: '',
    message: '',
    signedIn: false,
    chatLists: {}
  },
  methods: {
    signInWithGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then(user => {
        console.log('user',user)
      })
      .catch(error => {
        console.log('error',error)
      })
    },
    signOut() {
      firebase.auth().signOut()
    },
    sendMessage(){
      firebase.database().ref('chat-list').push({
        name: this.user.displayName,
        email: this.user.email,
        message: this.message
      })
      this.message = ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('ini data user');
      // console.log(user);
      // console.log(user.g.Ve);
      // console.log(user.photoURL);
      if (user) {
        this.user = user;
        this.signedIn = true;
      } else {
        this.user = '';
        this.signedIn = false;
      }
    });

    firebase.database().ref('chat-list').on('value', (data) => {
      this.chatLists = data.val()
    })
  }
})