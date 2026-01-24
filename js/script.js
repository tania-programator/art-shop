'use strict';
// Динамічний базовий шлях
const pathParts = window.location.pathname.split('/');

const repoName = window.location.hostname.includes('github.io')
	? pathParts[1]
	: '';

const BASE_URL = window.location.origin + '/' + (repoName ? repoName + '/' : '');
// helper-функції для localStorage
function getFavorites() {
	return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(items) {
	localStorage.setItem("favorites", JSON.stringify(items));
}

function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(items) {
	localStorage.setItem("cart", JSON.stringify(items));
}

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

if (nextBtn && prevBtn) {
	prevBtn.addEventListener('click', () => showSlide(index - 1));
	nextBtn.addEventListener('click', () => showSlide(index + 1));
}

// Автоперемикання(необов'язково)
// setInterval(() => {
// 	showSlide(index + 1);
// }, 4500);

// Вподобайки та кошик
// Масиви для зберігання даних було видалено після додавання JSON
// let favorites = [];
// let cart = [];


// Приклад даних товарів
// const basePath = window.location.pathname.includes('/products/') ? '../img/' : 'img/'; я змінила
// цей basePath на наступний, коли додалась папка clean, бо була проблема з адресами картинок
// БАЗОВИЙ ШЛЯХ ДО КАРТИНОК

const basePath =
	window.location.origin +
	'/' +
	(repoName ? repoName + '/' : '') +
	'img/';
const products = [
	{ id: 1, name: "Spring girl", price: 1200, category: "clean", img: basePath + "clean/Spring_girl.jpg" },
	{ id: 2, name: "The life of one rose", price: 6000, category: "lifevsdeath", img: basePath + "lifevsdeath/The_life_of_one_rose.jpg" },
	{ id: 3, name: "Red flower", price: 1000, category: "decoration", img: basePath + "decoration/Red_flower.jpg" },
	{ id: 4, name: "Challenge", price: 3000, category: "portraits", img: basePath + "portraits/Challenge.jpg" },
	{ id: 5, name: "Nice", price: 3000, category: "portraits", img: basePath + "portraits/Nice.jpg" },
	// { id: 6, name: "Kiss", price: 500, category: "love", img: basePath + "love/Kiss.jpg" },
	{ id: 7, name: "The wind", price: 2500, category: "clean", img: basePath + "clean/The_wind.jpg" },
	{ id: 8, name: "Flower wall", price: 2000, category: "clean", img: basePath + "clean/Flower_wall.jpg" },
	{ id: 9, name: "Ukrainian bird", price: 5000, category: "lifevsdeath", img: basePath + "lifevsdeath/Ukrainian_bird.jpg" },
	{ id: 10, name: "Nazar", price: 7000, category: "lifevsdeath", img: basePath + "lifevsdeath/Nazar.jpg" },
	{ id: 11, name: "Eighty-four", price: 500, category: "lifevsdeath", img: basePath + "lifevsdeath/Eighty-four.jpg" },
	{ id: 12, name: "The_night", price: 1000, category: "decoration", img: basePath + "decoration/The_night.jpg" },
	{ id: 13, name: "Coat_of_arms", price: 1000, category: "whiteonblack", img: basePath + "whiteonblack/Coat_of_arms.jpg" },
	{ id: 14, name: "Horse", price: 1000, category: "whiteonblack", img: basePath + "whiteonblack/Horse.jpg" },
	{ id: 15, name: "Care", price: 1200, category: "portraits", img: basePath + "portraits/Care.jpg" },
	{ id: 16, name: "Care-compare", price: 1200, category: "portraits", img: basePath + "portraits/Care-compare.jpg" },
	{ id: 17, name: "Nidalee", price: 2500, category: "portraits", img: basePath + "portraits/Nidalee.jpg" },
	{ id: 18, name: "Summer_rest", price: 2000, category: "portraits", img: basePath + "portraits/Summer_rest.jpg" },
	{ id: 19, name: "True_life", price: 2500, category: "portraits", img: basePath + "portraits/True_life.jpg" },
	{ id: 20, name: "Kiss", price: 1200, category: "love", img: basePath + "love/Kiss.jpg" },
	{ id: 21, name: "Signal_lights", price: 1500, category: "love", img: basePath + "love/Signal_lights.jpg" },
	{ id: 22, name: "Strauberry", price: 500, category: "love", img: basePath + "love/Strauberry.jpg" },
];

// Додати у вподобані
// function addToFavorites(id) {
// 	id = Number(id);
// 	const product = products.find(p => p.id === id);
// 	if (!product) return;
// 	if (!favorites.some(p => p.id === id)) {
// 		favorites.push(product);
// 	}
// 	updateHeader();
// }
function addToFavorites(id) {
	id = Number(id);
	const product = products.find(p => p.id === id);
	if (!product) return;

	const favorites = getFavorites();

	if (!favorites.some(p => p.id === id)) {
		favorites.push(product);
		saveFavorites(favorites);
	}

	updateHeader();
}

// Додати у кошик

// function addToCart(id) {
// 	id = Number(id);
// 	const product = products.find(p => p.id === id);
// 	if (!product) return;
// 	cart.push(product);
// 	updateHeader();
// }
function addToCart(id) {
	id = Number(id);
	const product = products.find(p => p.id === id);
	if (!product) return;

	const cart = getCart();   // 🔥 ВАЖЛИВО
	cart.push(product);
	saveCart(cart);
	renderDropdown("cart-dropdown", cart, "cart"); // 🔥 ОЦЕ

	updateHeader();
}


// --- Видалення товару ---
// function removeItem(id, type) {
// 	id = Number(id);
// 	if (type === "fav") {
// 		favorites = favorites.filter(p => p.id !== id);
// 		renderDropdown("fav-dropdown", favorites, "fav");
// 	} else if (type === "cart") {
// 		cart = cart.filter(p => p.id !== id);
// 		renderDropdown("cart-dropdown", cart, "cart");
// 	}
// 	updateHeader();
// }
function removeItem(id, type) {
	id = Number(id);

	if (type === "fav") {
		let favorites = getFavorites();
		favorites = favorites.filter(p => p.id !== id);
		saveFavorites(favorites);
		renderDropdown("fav-dropdown", favorites, "fav");
	}

	if (type === "cart") {
		let cart = getCart();
		cart = cart.filter(p => p.id !== id);
		saveCart(cart);
		renderDropdown("cart-dropdown", cart, "cart");
	}

	updateHeader();
}

// Оновити лічильники у шапці
// function updateHeader() {
// 	document.getElementById("fav-count").textContent = favorites.length;
// 	document.getElementById("cart-count").textContent = cart.length;
// }
function updateHeader() {
	document.getElementById("fav-count").textContent = getFavorites().length;
	document.getElementById("cart-count").textContent = getCart().length;
}

// --- Рендер списку у dropdown ---
function renderDropdown(containerId, items, type) {
	const container = document.getElementById(containerId);
	if (!container) return;

	if (items.length === 0) {
		container.innerHTML = "<p>Порожньо</p>";
		return;
	}

	container.innerHTML = items.map(p => `
    <div class="dropdown-item">
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <span class="name">${p.name}</span>
        <span class="price">${p.price} грн</span>
      </div>
      <button class="remove-btn" data-id="${p.id}" data-type="${type}">❌</button>
    </div>
  `).join("");

	if (type === "cart") {
		const total = items.reduce((sum, p) => sum + p.price, 0);
		container.innerHTML += `<div class="dropdown-item total"><b>Разом: ${total} грн</b></div>
		<button class="checkout-btn" id="checkout-btn" style="width: 100%; box-sizing: border-box; padding: 0.75rem 1rem; margin-top: 0.625rem;">
				Замовити
			</button>`;
	}
}

// --- Перемикання списків ---
function toggleDropdown(id) {
	document.querySelectorAll(".dropdown").forEach(d => {
		if (d.id === id) {
			d.classList.toggle("open");
		} else {
			d.classList.remove("open");
		}
	});
}

// --- Обробка кліків ---
document.addEventListener("click", (e) => {
	// Закрити, якщо клік поза dropdown
	if (!e.target.closest(".dropdown-wrapper")) {
		document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
	}

	// Видалення
	const btn = e.target.closest(".remove-btn");
	if (btn) {
		removeItem(btn.dataset.id, btn.dataset.type);
	}
	//Перехід при кліку на окрему сторінку
	if (e.target.id === "checkout-btn") {
		window.location.href = BASE_URL + "checkout.html";
	}
});

// Кнопки у шапці
// document.getElementById("fav-btn").addEventListener("click", () => {
// 	renderDropdown("fav-dropdown", favorites, "fav");
// 	toggleDropdown("fav-dropdown");
// });

// document.getElementById("cart-btn").addEventListener("click", () => {
// 	renderDropdown("cart-dropdown", cart, "cart");
// 	toggleDropdown("cart-dropdown");
// });
document.getElementById("fav-btn").addEventListener("click", () => {
	const favorites = getFavorites();
	renderDropdown("fav-dropdown", favorites, "fav");
	toggleDropdown("fav-dropdown");
});

document.getElementById("cart-btn").addEventListener("click", () => {
	const cart = getCart();
	renderDropdown("cart-dropdown", cart, "cart");
	toggleDropdown("cart-dropdown");
});

// Доступ для onclick у карточках
window.addToFavorites = addToFavorites;
window.addToCart = addToCart;
// Перехід на сторінку товару
// function goToProduct(id) {
// 	window.location.href = `product.html?id=${id}`;
// }
// ВІДНОВЛЕННЯ ДАНИХ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
document.addEventListener("DOMContentLoaded", () => {
	updateHeader();
});
