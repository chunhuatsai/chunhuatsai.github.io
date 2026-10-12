(() => {
  const form = document.querySelector('#blog-filters');
  if (!form) return;
  const search = form.querySelector('#blog-search');
  const year = form.querySelector('#blog-year');
  const topic = form.querySelector('#blog-topic');
  const tag = form.querySelector('#blog-tag');
  const status = document.querySelector('#blog-filter-status');
  const posts = [...document.querySelectorAll('.post-list-item[data-year]')];
  function update() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    posts.forEach(post => {
      const text = post.dataset.search.toLocaleLowerCase();
      const topics = JSON.parse(post.dataset.topics);
      const tags = JSON.parse(post.dataset.tags);
      post.hidden = !terms.every(term => text.includes(term)) || (year.value && post.dataset.year !== year.value) || (topic.value && !topics.includes(topic.value)) || (tag.value && !tags.includes(tag.value));
      if (!post.hidden) count++;
    });
    status.textContent = count ? `${count} of ${posts.length} posts` : 'No matching posts. Try another search or clear the filters.';
  }
  form.hidden = false;
  status.hidden = false;
  form.addEventListener('submit', e => e.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  const initialTag = new URLSearchParams(window.location.search).get('tag');
  if ([...tag.options].some(option => option.value === initialTag)) tag.value = initialTag;
  document.querySelectorAll('.post-tags a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      search.value = '';
      year.value = '';
      topic.value = '';
      tag.value = link.dataset.tag;
      update();
      form.scrollIntoView({block:'start'});
    });
  });
  update();
})();
