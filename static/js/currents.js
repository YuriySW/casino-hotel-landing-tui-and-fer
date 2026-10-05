(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = form.getAttribute('action') || '/send.php';
      var data = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        redirect: 'follow'
      })
        .then(function (res) {
          if (res.redirected) {
            window.location.href = res.url;
            return;
          }
          if (res.ok) {
            window.location.href = '/thanks.html';
            return;
          }
          window.location.href = '/write.html';
        })
        .catch(function () {
          window.location.href = '/write.html';
        });
    });
  });
})();
