const sections = document.querySelectorAll("section");
const navlinks = document.querySelectorAll("nav > a[href]");

navlinks.forEach(it => it.addEventListener("click", ev => section_toggle_visible(it)));

function section_toggle_visible(el) {
	const show = el.getAttribute("href").slice(1);
	console.log(show);
	[...sections].forEach(section => {
		console.log(`${section.id} == ${show}? ${section.id == show}`);
		if (section.id == show) {
			section.removeAttribute("hidden");
		} else {
			section.setAttribute("hidden", "hidden");
		}
	});
	[...navlinks].forEach(it => it.classList.remove("nav-active"));
	el.classList.add("nav-active");
}
