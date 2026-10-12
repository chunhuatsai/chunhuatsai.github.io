(() => {
  const form = document.querySelector('#publication-filters');
  if (!form) return;
  const search = form.querySelector('#paper-search');
  const year = form.querySelector('#paper-year');
  const type = form.querySelector('#paper-type');
  const status = document.querySelector('#filter-status');
  const papers = [...document.querySelectorAll('.publication[data-year]')];
  const sections = [...new Set(papers.map(p => p.closest('section')))];
  function update() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    papers.forEach(p => {
      const text = p.textContent.toLocaleLowerCase();
      p.hidden = !terms.every(term => text.includes(term)) || (year.value && p.dataset.year !== year.value) || (type.value && p.dataset.type !== type.value);
      if (!p.hidden) count++;
    });
    sections.forEach(s => {
      const visible = [...s.querySelectorAll('.publication')].filter(p => !p.hidden).length;
      s.hidden = visible === 0;
      s.querySelector('.section-heading .post-meta').textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
    });
    status.textContent = count ? `${count} of ${papers.length} publications` : 'No matching publications. Try another search or reset the filters.';
  }
  form.hidden = false;
  status.hidden = false;
  form.addEventListener('submit', e => e.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  document.querySelectorAll('.archive-nav a').forEach(link => {
    link.addEventListener('click', () => {
      search.value = '';
      year.value = '';
      type.value = link.getAttribute('href').slice(1);
      update();
    });
  });
  update();
})();
