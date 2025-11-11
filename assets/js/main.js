/* Theme toggle and small helpers */
(function () {
	const year = document.getElementById('year');
	if (year) year.textContent = String(new Date().getFullYear());

	const toggle = document.getElementById('themeToggle');
	if (toggle) {
		toggle.addEventListener('click', () => {
			const root = document.documentElement;
			const isDark = root.classList.toggle('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		});
	}

	// Show resume link if exists
	const resumeLink = document.getElementById('resumeLink');
	if (resumeLink) {
		fetch('/resume/resume.pdf', { method: 'HEAD' }).then((res) => {
			if (res.ok) resumeLink.classList.remove('hidden');
		});
	}
})();

// Load projects for index and projects pages
(async function () {
	try {
		const res = await fetch('/data/projects.json', { cache: 'no-store' });
		if (!res.ok) return;
		const projects = await res.json();
		renderFeatured(projects);
		renderProjectsGrid(projects);
		renderTags(projects);
	} catch {}
})();

function renderFeatured(projects) {
	const el = document.getElementById('featuredList');
	if (!el || !Array.isArray(projects)) return;
	const featured = projects.slice(0, 3);
	el.innerHTML = featured
		.map(
			(p) => `
			<li class="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
				<div class="font-medium">${escapeHtml(p.title || '')}</div>
				<p class="text-sm text-slate-600 dark:text-slate-300 mt-1">${escapeHtml(p.description || '')}</p>
				<div class="mt-2 flex gap-2 flex-wrap">
					${(p.tags || []).map((t) => `<span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">${escapeHtml(t)}</span>`).join('')}
				</div>
				<div class="mt-3 flex gap-3">
					${p.link ? `<a class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" href="${encodeURI(p.link)}" target="_blank" rel="noopener">Live</a>` : ''}
					${p.repo ? `<a class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" href="${encodeURI(p.repo)}" target="_blank" rel="noopener">Code</a>` : ''}
				</div>
			</li>`
		)
		.join('');
}

function renderProjectsGrid(projects) {
	const grid = document.getElementById('projectsGrid');
	if (!grid || !Array.isArray(projects)) return;
	grid.innerHTML = projects
		.map(
			(p) => `
			<article class="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
				${p.image ? `<img class="w-full h-40 object-cover" src="${encodeURI(p.image)}" alt="${escapeHtml(p.title || 'Project image')}" />` : ''}
				<div class="p-4">
					<h3 class="font-semibold">${escapeHtml(p.title || '')}</h3>
					<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">${escapeHtml(p.description || '')}</p>
					<div class="mt-2 flex gap-2 flex-wrap">
						${(p.tags || []).map((t) => `<span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">${escapeHtml(t)}</span>`).join('')}
					</div>
					<div class="mt-3 flex gap-3">
						${p.link ? `<a class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" href="${encodeURI(p.link)}" target="_blank" rel="noopener">Live</a>` : ''}
						${p.repo ? `<a class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline" href="${encodeURI(p.repo)}" target="_blank" rel="noopener">Code</a>` : ''}
					</div>
				</div>
			</article>`
		)
		.join('');
}

function renderTags(projects) {
	const filters = document.getElementById('projectFilters');
	const grid = document.getElementById('projectsGrid');
	if (!filters || !grid || !Array.isArray(projects)) return;
	const tags = Array.from(new Set(projects.flatMap((p) => p.tags || [])));
	if (!tags.length) return;
	const allBtn = document.createElement('button');
	allBtn.className = 'btn-secondary text-sm';
	allBtn.textContent = 'All';
	allBtn.addEventListener('click', () => renderProjectsGrid(projects));
	filters.appendChild(allBtn);
	tags.forEach((t) => {
		const btn = document.createElement('button');
		btn.className = 'btn-secondary text-sm';
		btn.textContent = t;
		btn.addEventListener('click', () => {
			const filtered = projects.filter((p) => (p.tags || []).includes(t));
			renderProjectsGrid(filtered);
		});
		filters.appendChild(btn);
	});
}

function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}


