# Leet Cart

Leet Cart is a modern e-commerce application built with Next.js and TypeScript. It provides a seamless experience for users to browse and purchase health insurance plans.

## About The Project

This project is a mock e-commerce platform for health insurance plans. It showcases a complete user flow from browsing products to checking out. The application is built with a modern tech stack and follows best practices for web development.

### How It Works

1.  **Browse Plans**: Users can browse a variety of health insurance plans on the home page.

2.  **Add to Cart**: Users can add their desired plans to the shopping cart.

3.  **Manage Cart**: Users can view their cart, update the quantity of plans, or remove them.

4.  **Apply Discounts**: Users can apply discount codes to get a better price.

    - **Note**: Every second order automatically gets a 10% discount. If a coupon code is manually applied, it will override the automatic discount.

5.  **Manage Coupons**: Users can view all created coupons, see their status (active/used), and create new coupons.

6.  **Checkout**: Users can proceed to checkout and place their order.

7.  **View Orders**: After placing an order, users can view their order history.

## Features

- **Product Listing**: View a list of available health insurance plans.

- **Shopping Cart**: Add, update, and remove items from the cart.

- **Order Management**: View a history of past orders.

- **Responsive Design**: The application is designed to work on all screen sizes.

- **Dark Mode**: The application supports a dark mode theme.

### Coupon Management

- **View All Coupons**: See a list of all coupons, with their status (active or used).

- **Create Coupons**: Users can create new discount coupons.

- **Single Use**: Each coupon code can only be used once.

- **Automatic Discounts**: Every second order automatically receives a 10% discount, which can be overridden by a manually applied coupon.

## Data Persistence

All application data, including cart items, orders, and discounts, is persisted in the browser's local storage. This means that your data will be saved across sessions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/leet-cart.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code.
- `npm run test`: Runs the test suite.

## Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Zustand](https://github.com/pmndrs/zustand) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [Vitest](https://vitest.dev/) - Testing Framework
- [ESLint](https://eslint.org/) - Linter

## Folder Structure

```
/
├── app/              # Main application code (pages, components, hooks)
├── components/       # Shared UI components
├── lib/              # Helper functions and constants
├── store/            # Zustand stores
├── __tests__/        # Test files
└── types/            # TypeScript types
```
