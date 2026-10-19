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

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var container = document.getElementById('projectDetail');

  if (!id) {
    container.innerHTML = '<p class="reveal">Project not found.</p>';
    return;
  }

  firebase.database().ref('portfolio/' + id).once('value', function (snap) {
    var p = snap.val();
    if (!p) {
      container.innerHTML = '<p class="reveal">Project not found.</p>';
      return;
    }
    var img = p.image ? '<img src="' + p.image + '" alt="' + (p.title || '') + '" class="project-thumb">' : '<div class="project-thumb" style="background:#f3f4f6;"></div>';
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    var links = '';
    if (p.link) links += '<a href="' + p.link + '" target="_blank" rel="noopener" class="cta">Live Site <span>→</span></a>';
    if (p.repo) links += '<a href="' + p.repo + '" target="_blank" rel="noopener" class="cta outline">Code <span>→</span></a>';
    var html = '<div class="project-card reveal">' +
      '<div class="project-thumb-wrap">' + img + '</div>' +
      '<div class="body">' +
      '<h2 class="section-title reveal" style="margin-bottom:10px;">' + (p.title || '') + '</h2>' +
      '<div class="tags reveal">' + tags + '</div>' +
      '<p class="reveal" style="font-size:1.05rem;color:var(--muted);margin-bottom:20px;line-height:1.8;">' + (p.description || '') + '</p>' +
      '<div class="links reveal" style="display:flex;gap:12px;">' + links + '</div>' +
      '</div>' +
      '</div>';
    container.innerHTML = html;
    observeReveals();
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
})();
