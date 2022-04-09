/*=================================================================
  Handle Functions
==================================================================*/
// Scroll To Top Function
function scrollToSection(allElements) {
	allElements.forEach((element) => {
		element.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: document.querySelector(e.target.dataset.section).offsetTop + 30,
				behavior: 'smooth',
			});
		});
	});
}
// Add Active Class Functions
function addActiveClass(element) {
	element.target.parentElement.querySelectorAll('.active').forEach((el) => {
		el.classList.remove('active');
	});
	element.target.classList.add('active');
}
/*=================================================================
  Landing Page
==================================================================*/
// Select Elements
let landingPage = document.querySelector('.landing'),
	landingImgs = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'],
	headerLinks = Array.from(document.querySelectorAll('.nav a'));
/*========================
  Navbar Links & Menu
========================*/
// Navbar Links
headerLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		document
			.querySelector(e.target.dataset.section)
			.scrollIntoView({ behavior: 'smooth' });
		document.querySelector('.menu-icon').click();
	});
});
// Nav Bullets
let navBullets = document.querySelector('.nav-bullets'),
	bulletsContainerSpans = document.querySelectorAll('.bullets-container span'),
	bullets = document.querySelectorAll('.nav-bullets .bullet'),
	bulletLocalItem = localStorage.getItem('bullets-option');
// Show And Hide Bullets From Settings Box
if (bulletLocalItem !== null) {
	navBullets.style.display = bulletLocalItem;
	document.querySelectorAll('.bullets-container .active').forEach((element) => {
		element.classList.remove('active');
	});
	if (bulletLocalItem === 'block') {
		document.querySelector('.bullets-container .yes').classList.add('active');
	} else {
		document.querySelector('.bullets-container .no').classList.add('active');
	}
}
bulletsContainerSpans.forEach((span) => {
	span.addEventListener('click', (e) => {
		addActiveClass(e);
		if (e.target.dataset.display === 'show') {
			navBullets.style.display = 'block';
			localStorage.setItem('bullets-option', 'block');
		} else {
			navBullets.style.display = 'none';
			localStorage.setItem('bullets-option', 'none');
		}
	});
});
// Scroll To Top On Click
scrollToSection(bullets);
// Menu Elements
let navbarMenu = document.querySelector('.header ul'),
	menuIcon = document.querySelector('.menu-icon');
// Switch Menu Display And Icon
menuIcon.onclick = () => {
	navbarMenu.classList.toggle('open');
	menuIcon.classList.toggle('fa-chevron-down');
	menuIcon.classList.toggle('fa-chevron-up');
};
// Change The Menu Shape On Load
window.onload = () => {
	if (window.innerWidth <= 673) {
		navbarMenu.classList.add('menu');
		navbarMenu.classList.remove('nav');
	} else {
		navbarMenu.classList.add('nav');
		navbarMenu.classList.remove('menu');
	}
};
// Change The Menu Shape On Resize
window.onresize = () => {
	if (window.innerWidth <= 673) {
		navbarMenu.classList.add('menu');
		navbarMenu.classList.remove('nav');
		0;
	} else {
		navbarMenu.classList.add('nav');
		navbarMenu.classList.remove('menu');
	}
};
/*================
  Slider
=================*/
// Change Background
let backgroundOptions = true,
	backgroundInterval,
	backgroundLocalItem = localStorage.getItem('background-option');
if (backgroundLocalItem !== null) {
	backgroundLocalItem === 'true'
		? (backgroundOptions = true)
		: (backgroundOptions = false);
	document.querySelectorAll('.random-backgrounds span').forEach((element) => {
		element.classList.remove('active');
	});
	if (backgroundLocalItem === 'true') {
		document.querySelector('.yes').classList.add('active');
	} else {
		document.querySelector('.no').classList.add('active');
	}
}
// Set The Background Function Interval
function randomizeImgs() {
	if (backgroundOptions === true) {
		backgroundInterval = setInterval(() => {
			// Get Random Number
			let randomNumber = Math.floor(Math.random() * landingImgs.length);
			// Change Background Image Url
			landingPage.style.backgroundImage =
				'url("images/landing_and_gallery/' + landingImgs[randomNumber] + '")';
		}, 5000);
	}
}
randomizeImgs();
/*=================================================================
  Settings
==================================================================*/
document.querySelector('.settings-icon').onclick = () => {
	document.querySelector('.settings').classList.toggle('open');
};
/*================
  Switch Colors
=================*/
// [1] Check If There Is a Color In Local Storage
let mainColor = localStorage.getItem('theme-color');
if (mainColor !== null) {
	document.documentElement.style.setProperty('--main-color', mainColor);
	// Remove Active Class From All Elements
	document.querySelectorAll('.theme-colors ul li').forEach((element) => {
		element.classList.remove('active');
		// Add Active Class For The Selected Element
		element.getAttribute('data-color') === mainColor
			? element.classList.add('active')
			: '';
	});
}
// [2] Get Theme Color
let themeColors = Array.from(document.querySelectorAll('.settings ul li'));
themeColors.forEach((color) => {
	color.addEventListener('click', (e) => {
		document.documentElement.style.setProperty(
			'--main-color',
			e.target.dataset.color
		);
		localStorage.setItem('theme-color', e.target.dataset.color);
		// Add Active Class Function
		addActiveClass(e);
	});
});
/*======================
  Change Background
======================*/
document.querySelectorAll('.random-backgrounds span').forEach((span) => {
	span.addEventListener('click', (e) => {
		// Add Active Class Function
		addActiveClass(e);
		if (e.target.dataset.random === 'yes') {
			backgroundOptions = true;
			randomizeImgs();
			localStorage.setItem('background-option', backgroundOptions);
		} else {
			backgroundOptions = false;
			clearInterval(backgroundInterval);
			localStorage.setItem('background-option', backgroundOptions);
		}
	});
});
/*======================
  Reset Settings
======================*/
document.querySelector('.reset-button').onclick = () => {
	// Clear Local Storage
	// [1] First Way
	// localStorage.clear();
	// [2] Second Way
	localStorage.removeItem('theme-color');
	localStorage.removeItem('background-option');
	localStorage.removeItem('bullets-option');
	// Relaod Window
	window.location.reload();
};
/*=================================================================
  Our Skills
==================================================================*/
let ourSkills = document.querySelector('.our-skills'),
	allSkills = document.querySelectorAll('.skill-box .skill-progress span');
// Skills Progress Animation When Scroll Top
window.onscroll = () => {
	if (window.scrollY >= ourSkills.offsetTop - 250) {
		allSkills.forEach((skill) => {
			skill.style.width = skill.dataset.progress;
		});
	}
};
/*=================================================================
  Our Gallery
==================================================================*/
let galleryImgs = document.querySelectorAll('.our-gallery img');
galleryImgs.forEach((img) => {
	img.addEventListener('click', (e) => {
		// Popup & Popup Overlay
		let popup = document.createElement('div'),
			popupOverlay = document.createElement('div');
		popup.classList.add('popup');
		popupOverlay.classList.add('popup-overlay');
		document.body.appendChild(popupOverlay);
		// Close Popup When Overlay Cliked
		popupOverlay.onclick = function () {
			popupOverlay.remove();
			popup.remove();
		};
		document.body.appendChild(popup);
		// Popup Img Box With Close Icon
		let popupImgBox = document.createElement('div'),
			popupSpan = document.createElement('span'),
			popupCloseIcon = document.createElement('i');
		// Close Icon
		popupCloseIcon.classList.add('fas');
		popupCloseIcon.classList.add('fa-times');
		popupSpan.appendChild(popupCloseIcon);
		popupImgBox.appendChild(popupSpan);
		// Active Close Icon
		popupSpan.onclick = function () {
			popupOverlay.remove();
			popup.remove();
		};
		// Img Box
		popupImgBox.classList.add('img-box');
		popup.appendChild(popupImgBox);
		// Popup Img
		let popupImg = document.createElement('img');
		popupImg.src = img.src;
		// Img Heading
		if (img.alt !== null) {
			let popupImgHeading = document.createElement('h3');
			popupImgHeading.innerHTML = img.alt;
			popupImgBox.appendChild(popupImgHeading);
		}
		popupImgBox.appendChild(popupImg);
	});
});
