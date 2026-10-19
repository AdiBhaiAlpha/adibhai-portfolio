(function () {
  var ADMIN_PASS = '2448766';
  var ref = firebase.database().ref('portfolio');

  var loginView = document.getElementById('loginView');
  var adminView = document.getElementById('adminView');
  var pwd = document.getElementById('pwd');
  var loginBtn = document.getElementById('loginBtn');
  var loginMsg = document.getElementById('loginMsg');

  if (sessionStorage.getItem('admin_auth') === '1') showAdmin();

  loginBtn.addEventListener('click', function () {
    if (pwd.value === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', '1');
      showAdmin();
    } else {
      loginMsg.textContent = 'Wrong password.';
    }
  });

  function showAdmin() {
    loginView.classList.add('hidden');
    adminView.classList.remove('hidden');
    renderList();
  }

  function renderList() {
    ref.once('value', function (snapshot) {
      var projects = snapshot.val() || {};
      var container = document.getElementById('projectList');
      container.innerHTML = '';
      Object.keys(projects).forEach(function (id) {
        var p = projects[id];
        var item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = '<div><h4>' + (p.title || '') + '</h4><p>' + (p.description || '') + '</p></div>' +
          '<div class="btn-row"><button class="btn-secondary" data-edit="' + id + '">Edit</button>' +
          '<button class="btn-danger" data-del="' + id + '">Delete</button></div>';
        container.appendChild(item);
      });
      container.querySelectorAll('[data-edit]').forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-edit');
          ref.child(id).once('value', function (snap) {
            var p = snap.val() || {};
            document.getElementById('title').value = p.title || '';
            document.getElementById('description').value = p.description || '';
            document.getElementById('image').value = p.image || '';
            document.getElementById('link').value = p.link || '';
            document.getElementById('repo').value = p.repo || '';
            document.getElementById('tags').value = (p.tags || []).join(', ');
            document.getElementById('editId').value = id;
          });
        });
      });
      container.querySelectorAll('[data-del]').forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-del');
          ref.child(id).remove();
          renderList();
        });
      });
    });
  }

  document.getElementById('projectForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var entry = {
      title: document.getElementById('title').value.trim(),
      description: document.getElementById('description').value.trim(),
      image: document.getElementById('image').value.trim(),
      link: document.getElementById('link').value.trim(),
      repo: document.getElementById('repo').value.trim(),
      tags: document.getElementById('tags').value.split(',').map(function (t) { return t.trim(); }).filter(Boolean)
    };
    var editId = document.getElementById('editId').value;
    if (editId !== '') {
      ref.child(editId).set(entry);
    } else {
      ref.push(entry);
    }
    document.getElementById('projectForm').reset();
    document.getElementById('editId').value = '';
    renderList();
    var msg = document.getElementById('msg');
    msg.className = 'msg ok';
    msg.textContent = 'Saved.';
    setTimeout(function () { msg.textContent = ''; msg.className = ''; }, 2000);
  });

  document.getElementById('cancelEdit').addEventListener('click', function () {
    document.getElementById('projectForm').reset();
    document.getElementById('editId').value = '';
  });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    sessionStorage.removeItem('admin_auth');
    location.reload();
  });
})();
