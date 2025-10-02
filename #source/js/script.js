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

// Автоперемикання(необов'язково)
// setInterval(() => {
// 	showSlide(index + 1);
// }, 4500);

// Вподобайки та кошик
// Масиви для зберігання даних
let favorites = [];
let cart = [];

// Приклад даних товарів
const basePath = window.location.pathname.includes('/products/') ? '../img/' : 'img/';
const products = [
	{ id: 1, name: "Spring girl", price: 1200, img: basePath + "Spring girl.jpg" },
	{ id: 2, name: "The life of one rose", price: 1500, img: "img/The life of one rose.jpg" },
	{ id: 3, name: "Red flower", price: 1000, img: "img/Red flower.jpg" },
	{ id: 4, name: "Challenge", price: 3000, img: "img/Challenge.jpg" },
	{ id: 5, name: "Nice", price: 3000, img: "img/Nice.jpg" },
	{ id: 6, name: "Kiss", price: 500, img: "img/Kiss.jpg" },
	{ id: 7, name: "The wind", price: 2500, img: "../img/The wind.jpg" },
	{ id: 8, name: "Flower wall", price: 2000, img: "../img/Flower wall.jpg" },
];

// Додати у вподобані
function addToFavorites(id) {
	id = Number(id);
	const product = products.find(p => p.id === id);
	if (!product) return;
	if (!favorites.some(p => p.id === id)) {
		favorites.push(product);
	}
	updateHeader();
}

// Додати у кошик

function addToCart(id) {
	id = Number(id);
	const product = products.find(p => p.id === id);
	if (!product) return;
	cart.push(product);
	updateHeader();
}

// --- Видалення товару ---
function removeItem(id, type) {
	id = Number(id);
	if (type === "fav") {
		favorites = favorites.filter(p => p.id !== id);
		renderDropdown("fav-dropdown", favorites, "fav");
	} else if (type === "cart") {
		cart = cart.filter(p => p.id !== id);
		renderDropdown("cart-dropdown", cart, "cart");
	}
	updateHeader();
}
// Оновити лічильники у шапці
function updateHeader() {
	document.getElementById("fav-count").textContent = favorites.length;
	document.getElementById("cart-count").textContent = cart.length;
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
		container.innerHTML += `<div class="dropdown-item total"><b>Разом: ${total} грн</b></div>`;
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
});

// Кнопки у шапці
document.getElementById("fav-btn").addEventListener("click", () => {
	renderDropdown("fav-dropdown", favorites, "fav");
	toggleDropdown("fav-dropdown");
});

document.getElementById("cart-btn").addEventListener("click", () => {
	renderDropdown("cart-dropdown", cart, "cart");
	toggleDropdown("cart-dropdown");
});

// Доступ для onclick у карточках
window.addToFavorites = addToFavorites;
window.addToCart = addToCart;
// Перехід на сторінку товару
function goToProduct(id) {
	window.location.href = `product.html?id=${id}`;
}
