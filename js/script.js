'use strict';
// знаходимо елемент
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const body = document.body;

// додаємо обробник кліку
burger.addEventListener('click', () => {
	burger.classList.toggle('active'); // перемикаємо клас active
	menu.classList.toggle('active');
	body.classList.toggle('lock'); // додаємо/знімаємо блокування скролу
});
// Перехід по якорях
const menuLinks = document.querySelectorAll('.header__link');

menuLinks.forEach(link => {
	link.addEventListener('click', () => {
		// Розблокувати прокрутку
		document.body.classList.remove('lock');

		// Закрити меню
		if (menu.classList.contains('active')) {
			menu.classList.remove('active');
		}
	});
});