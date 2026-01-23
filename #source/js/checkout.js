'use strict';
// 🔐 ІНІЦІАЛІЗАЦІЯ EMAILJS
(function () {
	emailjs.init("02WFMVxSPn4imGlUB"); // ⬅️ встав свій Public Key
})();

// Санітизація HTML
function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}

// Отримати кошик
function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

// Очистити кошик
function clearCart() {
	localStorage.removeItem("cart");
}

// Рендер замовлення
const cart = getCart();
const itemsContainer = document.getElementById("order-items");
const totalEl = document.getElementById("order-total");

let total = 0;

if (cart.length === 0) {
	itemsContainer.innerHTML = "<p>Кошик порожній</p>";
} else {
	// Валідація кошика
	function validateCart(cart) {
		return Array.isArray(cart) && cart.every(item =>
			typeof item.name === 'string' &&
			typeof item.price === 'number' &&
			item.price > 0
		);
	}

	if (!validateCart(cart)) {
		itemsContainer.innerHTML = "<p>Кошик містить недійсні дані</p>";
	} else {
		// Безпечний рендер
		itemsContainer.innerHTML = cart.map(p => `
			<div class="order-item">
				<img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}">
				<div>
					<p><strong>${escapeHtml(p.name)}</strong></p>
					<p>${p.price} грн</p>
				</div>
			</div>
		`).join("");

		cart.forEach(item => {
			total += item.price;
		});
	}

	totalEl.textContent = total;
}

// Обробка форми
document.getElementById("order-form").addEventListener("submit", (e) => {
	e.preventDefault();

	if (cart.length === 0) {
		alert("Кошик порожній");
		return;
	}

	const formData = new FormData(e.target);
	const order = {
		customer: Object.fromEntries(formData),
		items: cart,
		total: total,
		date: new Date().toLocaleString()
	};

	console.log("Заявка:", order);

	// ❗ Тут пізніше буде EmailJS / сервер
	const templateParams = {
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		address: formData.get("address"),
		items: cart.map(p => `${p.name} — ${p.price} грн`).join("\n"),
		total: total
	};

	emailjs.send(
		"service_rq84wv9",   // ⬅️ service ID
		"template_6uk0ry7",  // ⬅️ template ID
		templateParams
	)
		.then(() => {
			alert("Дякуємо! Заявка відправлена ❤️");
			clearCart();
			window.location.href = "index.html";
		})
		.catch(err => {
			console.error(err);
			alert("Помилка при відправці заявки 😢");
		});
});
