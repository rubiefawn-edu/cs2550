/*
Project: Project 5-Personal Web Site-Visitor Form Validation-Refactor JS
Name: Fawn Sannar
Submitted: Fri, 18 Apr 2025 21:04:30 -0600
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection: This isn't a "library". It's deeply coupled to the exact
visitor form for this exact assignment. It fully assumes there is exactly
one form ever that needs validation. What on earth?

See also: https://regexlicensing.org/

This one is more about parser generators for programming lanugages,
but the principles are still relevant to the overzealous use of regex:
https://tiarkrompf.github.io/notes/?/just-write-the-parser/
*/

/* Project 5 Template */

// Pro tip: don't use a regex for phone number!!! Just strip all
// non-numeric characters and then check length; a valid phone number
// will only be either 10 or 11 digits long exactly
const phoneRegex = /^(\+\d ?)?(\d{3}-?\d{3}-?\d{4})$/;
// The provided email regex was super broken, wtf? Who wrote that?
// Also, it's incorrect to use regex to determine if a TLD is valid,
// there's quite a long list of them and new ones are added every few
// years.
const emailRegex = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9_-]+\.\w+$/;
const zipCodeRegex = /^(?<zip>\d{5})(-(?<ext>\d{4}))?$/;

const stateAbbreviations = [
	'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
	'FL', 'GA',	'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
	'ME', 'MH', 'MD', 'MA',	'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
	'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',	'MP', 'OH', 'OK', 'OR', 'PW',
	'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',	'VT', 'VI', 'VA',
	'WA', 'WV', 'WI', 'WY'
];

let form = null;
let successMsg = null;

function initValidation(formId, successId) {
	form = document.getElementById(formId);
	successMsg = document.getElementById(successId);

	const inputs = form.querySelectorAll("input");
	inputs.forEach(it => it.addEventListener("change", inputChanged));
	form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
	const el = ev.currentTarget;
	validateForm();
	// NOTE: we use 'was-validated' class so that you show the error
	// indications only for the single field rather than the whole form
	// at once
	el.classList.add('was-validated');
}

function submitForm(ev) {
	console.log("in submit");
	let form = ev.currentTarget;
	// If you don't preventDefault and stopPropagation, the default
	// form action would be to redirect to the url in the 'action'
	// attribute of the form
	// https://wp.zybooks.com/form-viewer.php
	ev.preventDefault(); // don't redirect
	ev.stopPropagation();
	validateForm();

	// DOM checkValidity function tells you current status of form
	// according to html5
	if (!form.checkValidity()) {
		form.querySelectorAll('input').forEach(it => it.classList.add('was-validated'));
	} else {
		successMsg.hidden = false;
		form.hidden = true;
	}
}

function validateForm() {
	checkRequired("first-name", "First Name is Required");
	checkRequired("last-name", "Last Name is Required");
	checkRequired("address", "Address is Required");
	checkRequired("city", "City is Required");
  
	// Just use a <datalist> for the love of god, it's supported for
	// text input types in all modern browsers
	if(checkRequired("state", "State is Required")){
		validateState("state", "Not a valid State, enter two digit code e.g., UT");
	}
 
	if (checkRequired("email", "Email Address is required")) {
		checkFormat("email", "email format is bad", emailRegex)
	}

	if (checkRequired("zip", "Zip Code is Required")) {
		checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
	}

	// Once again: don't use a regex for phone number validation, ahhhhh
	// Just remove all non-numeric characters and then check length;
	// a valid phone number will only be either 10 or 11 digits long
	if (checkRequired("phone", "Phone is required")) {
	 	checkFormat("phone", "phone format is bad", phoneRegex)
	}

	// Checking the validity of the first checkbox in the group
	// will check all others with the same name attribute
	checkRequired("foundby2", "you must select at least one!");
}

function validateState(id, msg) {
	const el = document.getElementById(id);
	setElementValidity(id, stateAbbreviations.includes(el.value.toUpperCase()), msg);
}

function checkFormat(id, msg, regex) {
	const value = document.getElementById(id).value;
	return setElementValidity(id, regex.test(value), msg);
}

function checkRequired(id, message) {
	const el = document.getElementById(id);
	let valid = false;
	switch (el.type) {
	case 'checkbox':
	case 'radio':
		document.querySelectorAll(`[name=${el.name}]`).forEach(it => {
			valid ||= it.checked;
			it.classList.add('was-validated');
		});
		break;
	default:
		valid = el.value.length;
		break;
	}
	return setElementValidity(id, valid, message);
}

function setElementValidity(id, valid, message) {
	const el = document.getElementById(id);
	let err = document.querySelector(`:where(#${id}, #${id} + label[for=${id}]) + .error-msg`);

	if (!err) {
		err = document.createElement('div');
		err.classList.add('error-msg');
		// checkboxes and radios have labels after their input
		if (el.type == "checkbox" || el.type == "radio") {
			document.querySelector(`label[for=${id}]`).after(err);
		} else { el.after(err); }
	}

	err.textContent = message;
	el.setCustomValidity(valid ? '' : message);

	// This makes some code above nicer
	return valid;
}
