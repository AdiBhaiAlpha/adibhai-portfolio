(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBIuJFn74hJK1LT_Shcl-Y5DMgiOArB8Ps",
    authDomain: "shipu-ai.firebaseapp.com",
    databaseURL: "https://shipu-ai-default-rtdb.firebaseio.com",
    projectId: "shipu-ai",
    storageBucket: "shipu-ai.firebasestorage.app",
    messagingSenderId: "953122849300",
    appId: "1:953122849300:web:f821f1a161ce7879001d01",
    measurementId: "G-N2WMSS3MNG"
  };
  firebase.initializeApp(firebaseConfig);
  var ref = firebase.database().ref('portfolio');

  var grid = document.getElementById('projectsGrid');
  var empty = document.getElementById('emptyState');
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  function render(projects) {
    grid.innerHTML = '';
    if (!projects || Object.keys(projects).length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    Object.keys(projects).forEach(function (id) {
      var p = projects[id];
      var card = document.createElement('article');
      card.className = 'project-card reveal';
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        location.href = 'project.html?id=' + encodeURIComponent(id);
      });
      var img = p.image ? '<img src="' + p.image + '" alt="' + (p.title || '') + '" class="project-thumb">' : '<div class="project-thumb" style="background:#f3f4f6;"></div>';
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
      var links = '';
      if (p.link) links += '<a href="' + p.link + '" target="_blank" rel="noopener">Live</a>';
      if (p.repo) links += '<a href="' + p.repo + '" target="_blank" rel="noopener">Code</a>';
      card.innerHTML = '<div class="project-thumb-wrap">' + img + '</div>' +
        '<div class="body">' +
        '<h3>' + (p.title || '') + '</h3>' +
        '<p>' + (p.description || '') + '</p>' +
        '<div class="tags">' + tags + '</div>' +
        '<div class="links">' + links + '</div>' +
        '</div>';
      grid.appendChild(card);
    });
    observeReveals();
  }

  ref.on('value', function (snapshot) {
    render(snapshot.val());
  });

  function observeReveals() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }
  observeReveals();

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (toggle) toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
})();
