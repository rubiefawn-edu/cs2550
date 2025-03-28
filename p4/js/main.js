const sections = document.querySelectorAll("section");
const navlinks = document.querySelectorAll("nav > a[href]");

navlinks.forEach(it => it.addEventListener("click", _ => section_toggle_visible(it)));

function section_toggle_visible(el) {
	const show = el.getAttribute("href").slice(1);
	console.log(show);
	sections.forEach(section => {
		console.log(`${section.id} == ${show}? ${section.id == show}`);
		if (section.id == show) {
			section.removeAttribute("hidden");
		} else {
			section.setAttribute("hidden", "hidden");
		}
	});
	navlinks.forEach(it => it.classList.remove("nav-active"));
	el.classList.add("nav-active");
}

document.getElementById('toggle-theme').addEventListener('click', _ => {
	const head = document.querySelector('head');
	const themes = head.querySelectorAll(
		'link[rel="stylesheet"]:not([href="css/main.css"], [href="css/saffron.css"])'
	);
	if (themes.length) {
		themes.forEach(it => it.remove());
		return;
	}

	// No unexpected stylesheets were found, add the theme
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'css/theme.css';
	head.appendChild(link);
});
