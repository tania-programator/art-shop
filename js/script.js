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