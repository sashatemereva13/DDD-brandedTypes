/*  USER REGISTRATION   */

type User = {
  name: any;
  email: string;
  phone: string;
  password: string;
};

const createUser = (
  name: any,
  email: string,
  phone: string,
  password: string,
): User => {
  return {
    name,
    email,
    phone,
    password,
  };
};
// CAREFUL ! This function is very flexible but also very error-prone.
// It accepts any strings !

/*  manual tests   */
const newUser = createUser(
  true,
  "alice@example.com",
  "secret123",
  "123-456-7890",
);

console.table(newUser);
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/********/

// TODO: 1. Type checks
type Brand<K, T> = K & { __brand: T };

type UserName = Brand<string, "UserName">;
type UserEmail = Brand<string, "UserEmail">;
type UserPhone = Brand<string, "UserPhone">;
type UserPassword = Brand<string, "UserPassword">;

// TODO: 2. Validation checks (Factory Functions)
// return Phone Type with a simple string (weak validation)

const makeUserName = (value: string): UserName => {
  if (!value || value.trim().length < 2 || value.trim().length > 50) {
    throw new Error("Name must be between 2 and 50 characters");
  }

  const validNameRegex = /^[a-zA-Z\s-]+$/;
  if (!validNameRegex.test(value)) {
    throw new Error("Name can only contain letters, spaces, and hyphens");
  }

  return value as UserName;
};

const makeUserEmail = (email: string): UserEmail => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
  return email as UserEmail;
};

const makeUserPhone = (phone: string): UserPhone => {
  const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error("Invalid phone number format");
  }
  return phone as UserPhone;
};

const makeUserPassword = (password: string): UserPassword => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one digit");
  }
  if (!/[@$!%*?&]/.test(password)) {
    throw new Error(
      "Password must contain at least one special character (@$!%*?&)",
    );
  }
  return password as UserPassword;
};

// TODO: 3. try-catch blocks around the calls to createPhone
// to handle potential validation errors gracefully, ensuring
// that the application can respond appropriately to invalid inputs without crashing.

try {
  const name = makeUserName("Alice Smith");
  const email = makeUserEmail("alice@example.com");
  const phone = makeUserPhone("123-456-7890");
  const password = makeUserPassword("Secret123!");

  const newUser = createUser(name, email, phone, password);
  console.table(newUser);
} catch (error) {
  console.error("Error creating user:", error);
}

// TODO: 4. Branded Types to prevent accidental misuse of the createUser
// function with raw strings, enhancing type safety in the restaurant domain.

type User = {
  name: UserName;
  email: UserEmail;
  phone: UserPhone;
  password: UserPassword;
};

const createUser = (
  name: UserName,
  email: UserEmail,
  phone: UserPhone,
  password: UserPassword,
): User => {
  return {
    name,
    email,
    phone,
    password,
  };
};

/*

-----   Factory Functions  -----
const makeName()
const makeEmail()
const makePhone()
const makePassword()

*/

// Validation Rules for createUser:
// - name: Must be a non-empty string, typically 2-50 characters, no special characters except spaces/hyphens
// - email: Must follow valid email format (local@domain.tld), cannot be empty
// - phone: Already validated by createPhone factory (French format: 10 digits, valid prefix)
// - socialSecurityNumber: Must follow a specific format (depends on country - length, structure, checksum)
//   * Could be validated as a Value Object similar to Phone
//   * Should not be stored as plain string in production (PII/security concern)
// - All fields: Should check for null/undefined
// - Business rule: User must have unique email (typically checked against database)

// Branded Types:
// - Name: string & { readonly __brand: unique symbol }
// - Email: string & { readonly __brand: unique symbol }
// - Phone: string & { readonly __brand: unique symbol }
// - Password: string & { readonly __brand: unique symbol }
// - SocialSecurityNumber: string & { readonly __brand: unique symbol }
