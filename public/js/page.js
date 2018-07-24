var namespace = {};

namespace.data = ({
  email: 'mauricio@gmail.com',
  get: function () {
    return {
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
      return response.text();
    });
  }
});

namespace.post.user(namespace.data).then(function(response) { // { name: 'Mauricio', email: 'mauricio.nobrega@gmail.com' }
  console.log('FINISH [data completed]: ', response);
  console.log('\n');
});

namespace.post.user({}).then(function(response) { // {}
  console.log('FINISH [data object empty]: ', response);
  console.log('\n');
});

namespace.post.user().then(function(response) { // undefined
  console.log('FINISH [data undefined]: ', response);
  console.log('\n');
});
