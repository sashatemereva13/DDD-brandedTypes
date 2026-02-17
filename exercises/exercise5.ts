import { logError } from "./logger.js";

//============================================================================
// EXERCISE 5: The Identity Crisis - Order IDs
//
// ANTI-PATTERN: Using a plain `string` for an identifier. Nothing enforces
// format, non-emptiness, or uniqueness. Duplicate and empty IDs slip through.
//
// DDD FIX: Model identity as a dedicated Value Object with a controlled
// creation strategy. In DDD, the identity of an Entity is a first-class
// concept -- it deserves its own type.
//
// HINT - Branded type + factory:
type OrderId = string & { readonly __brand: unique symbol };

// Option A: Enforce a format (e.g., "ORD-" prefix + numeric)
function createOrderId(raw: string): OrderId {
  if (!/^ORD-\d{5,}$/.test(raw))
    throw new Error("OrderId must match ORD-XXXXX format");
  return raw as OrderId;
}
//
//   // Option B: Generate guaranteed-unique IDs (UUID-based)
function generateOrderId(): OrderId {
  return `ORD-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}` as OrderId;
}
//
// For uniqueness across a collection, use a Repository pattern: the
// Repository is responsible for ensuring no two Entities share an ID.
// This separates identity validation (Value Object) from uniqueness
// enforcement (Repository).
// ============================================================================

type Order = {
  orderId: OrderId;
  customerName: string;
  total: number;
};

export function exercise5_IdentityCrisis() {
  // What makes a valid order ID? Nothing enforced!
  const orders: Order[] = [
    {
      orderId: createOrderId("ORD-00001"),
      customerName: "Alice",
      total: 25,
    },
    {
      orderId: createOrderId("ORD-00002"),
      customerName: "Bob",
      total: 30,
    },
    {
      orderId: createOrderId("ORD-00003"), // Silent bug! Duplicate ID
      customerName: "Charlie",
      total: 15,
    },
    {
      orderId: createOrderId("ORD-00004"), // Silent bug! Inconsistent format
      customerName: "Diana",
      total: 20,
    },
  ];

  logError(5, "Order ID chaos - duplicates, empty, inconsistent formats", {
    orders,
    issue: "Order IDs have no enforced format or uniqueness!",
  });
}
