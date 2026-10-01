# API contract

This document defines the HTTP boundary used by the white-label storefront. Sessions use httpOnly cookies; bearer tokens are never stored in browser storage.

## Shared shapes

Successful list responses use `{ "data": [], "meta": { "page": 1, "pageSize": 24, "total": 0 } }`. Errors use `{ "error": { "code": "string", "message": "string", "fields": {} } }`.

## Endpoints

| Method | Endpoint | Request | Response |
| --- | --- | --- | --- |
| GET | `/products` | `page`, `pageSize`, `q`, `category`, `brand`, `minPrice`, `maxPrice`, `rating`, `sort` | Product list + pagination |
| GET | `/products/:slug` | — | Product detail, variants, stock |
| GET | `/categories` | — | Category list |
| POST | `/cart/validate` | `{ lines: [{ productId, variantId, quantity }] }` | Validated lines and totals |
| POST | `/coupons/validate` | `{ code, lines }` | Discount and totals |
| POST | `/shipping/quote` | `{ address, lines }` | Shipping methods and prices |
| POST | `/orders` | `{ lines, contact, address, shippingMethodId, paymentMethodId, idempotencyKey }` | Order and order number |
| GET | `/orders` | `page`, `pageSize` | Orders |
| GET | `/orders/:id` | — | Order detail |
| POST | `/orders/track` | `{ orderNumber, phone }` | Public tracking timeline |
| POST | `/auth/login` | `{ email, password }` | User profile; session cookie |
| POST | `/auth/register` | `{ name, email, password }` | User profile; session cookie |
| POST | `/auth/logout` | — | Empty success |
| POST | `/auth/forgot-password` | `{ email }` | Empty success |
| GET | `/auth/me` | — | User profile |
| GET/PATCH | `/profile` | Profile fields for PATCH | Profile |
| GET/POST | `/addresses` | Address body for POST | Address list or new address |
| PATCH/DELETE | `/addresses/:id` | Address body for PATCH | Updated or empty success |
| GET | `/products/:id/reviews` | `page`, `pageSize` | Reviews |
| POST | `/products/:id/reviews` | `{ rating, title, body }` | Review |
| POST | `/contact` | `{ name, email, message }` | Empty success |
| POST | `/newsletter` | `{ email }` | Empty success |

Prices are integers in minor units. Order creation is idempotent by `idempotencyKey`. Card information is handled only by a hosted payment provider or redirect.
