/*
Project: Project 5-Personal Web Site-Visitor Form Validation-Refactor JS
Name: Fawn Sannar
Submitted: Fri, 18 Apr 2025 21:04:20 -0600
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection: This one was annoying to do. My page is meant to be a
rulebook, and stapling on a visitor logbook makes no sense at all. I
understand it's required for the assignment, but it's still a nonsense
feature for this kind of site lol. Oh well.

Changes made: Virtually nothing, only some minor formatting changes.
I received no feedback. The Project 5 spec mentions potentially
splitting the section navigation code and theme toggling code into
separate files, but given they're literally just two self-contained
event listeners, doing so would be silly and I won't be doing that lmao.
There is more comment text than code in this file.
*/

const sections = document.querySelectorAll("section");
const navlinks = document.querySelectorAll("nav > a[href]");
const navexpand = document.getElementById("expand-navbar");

// Event listener for toggling sections
// Having these be separate pages would be genuinely better design.
// Single page applications are overengineered nonsense 90% of the time
// and having a static html site whose content is literally just text
// try to emulate that functionality makes no sense lmao
navlinks.forEach(el => el.addEventListener("click", _ => {
	const show = el.getAttribute("href").slice(1);
	sections.forEach(section => {
		if (section.id == show) {
			section.removeAttribute("hidden");
		} else {
			section.setAttribute("hidden", "hidden");
		}
		navexpand.checked = false;
	});
	navlinks.forEach(it => it.classList.remove("nav-active"));
	el.classList.add("nav-active");
}));

// Event listener for toggling theme
// This is evil by the way, just use CSS variables like a sane person??
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
