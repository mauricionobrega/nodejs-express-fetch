var namespace = {};

namespace.data = ({
  name: 'Mauricio',
  email: 'mauricio.nobrega@gmail.com',
  get: function () {
    return {
      name: this.name,
      email: this.email
    }
  }
}).get();

namespace.post = ({
  user: function (data) {
    return fetch('/signup-me', {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      // console.log('status: ', response.status);     //=> number 100–599
      // console.log('statusText: ', response.statusText); //=> String
      // console.log('headers: ', response.headers);    //=> Headers
      // console.log('url: ', response.url);        //=> String
      return response.text()
    }, function(error) {
      console.log('error: ', error.message) //=> String
    });
  }
});

namespace.post.user(namespace.data).then(function(response) { // { name: 'Mauricio', email: 'mauricio.nobrega@gmail.com' }
  console.log('FINISH [data]: ', response);
  console.log('\n');
});

// namespace.post.user({}).then(function(response) { // {}
//   console.log('FINISH [data vazio]: ', response);
//   console.log('\n');
// });

// namespace.post.user().then(function(response) { // undefined
//   console.log('FINISH [data undefined]: ', response);
//   console.log('\n');
// });
