/* ===========================
   BRAND UTILITY
=========================== */

type Brand<K, T> = K & { __brand: T };

type USD = Brand<number, "USD">;
type Quantity = Brand<number, "Quantity">;


/* ===========================
 FACTORY FUNCTIONS VALIDATION
=========================== */

const makePrice = (value: number): USD => {
	if (value < 0) throw new Error("Price cannot be negative");
	if (value > 1000) throw new Error("Price exceeds maximum");
	return value as USD;
}

const makeQuantity = (value: number): Quantity => {
	if (value <= 0) throw new Error("Quantity must be positive");
	if (value > 100) throw new Error("Quantity exceeds maximum");
	return value as Quantity;
}

/* ===========================
    DOMAIN LOGIC
=========================== */

const calculatePrice = (price: USD, quantity: Quantity)	: USD => {
	return makePrice(price * quantity);
}

/* ===========================
    APPLICATION LAYER
=========================== */

try {
	const pizzaPrice = makePrice(10);
	const pizzaCount = makeQuantity(3);

	const total = calculatePrice(pizzaPrice, pizzaCount);

	console.log(`Total price: $${total}`);
} catch (error) {
	console.error("Error calculating price:", error);
}

