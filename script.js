// Select the hamburger icon and the nav menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

// Toggle the menu visibility on click
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

function scrollToWin(x, y) {
    window.scrollTo(x, y);
  }