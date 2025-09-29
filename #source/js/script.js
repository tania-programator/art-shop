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

// Слайдер
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(i) {
	if (i < 0) {
		index = slideItems.length - 1;
	} else if (i >= slideItems.length) {
		index = 0;
	} else {
		index = i;
	}
	slides.style.transform = `translateX(-${index * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Автоперемикання (необов'язково)
// setInterval(() => {
// 	showSlide(index + 1);
// }, 5000);


// Перехід на сторінку товару
function goToProduct(id) {
	window.location.href = `product.html?id=${id}`;
}