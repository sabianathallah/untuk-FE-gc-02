[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21437212&assignment_repo_type=AssignmentRepo)
# P2-Challenge-2 (Client Side)

This README contains the API documentation for the backend endpoints consumed by the FrontEnd_For_CMS and FrontEnd_For_Public applications in this repository.

Base URL
--------

All examples assume the backend is running at:

```
http://localhost:3000
```

Authentication
--------------
- The CMS (admin) frontend uses JWT access tokens stored in `localStorage` under the key `access_token`.
- Protected endpoints require an `Authorization: Bearer <token>` header.

Public endpoints are available under `/pub/*` and do not require authentication.

Endpoints
---------

1) POST /login
	 - Description: Authenticate user and receive access token.
	 - Auth: none
	 - Request body (application/json):
		 ```json
		 { "email": "user@example.com", "password": "secret" }
		 ```
	 - Response (200):
		 ```json
		 { "access_token": "<jwt-token>", "data": { /* optional user data */ } }
		 ```

2) POST /adduser
	 - Description: Create a new user (CMS only).
	 - Auth: required (Bearer token)
	 - Request body (application/json):
		 ```json
		 { "email": "newuser@example.com", "password": "secret" }
		 ```
	 - Response (201):
		 ```json
		 { "message": "User created", "data": { /* user */ } }
		 ```

3) GET /categories
	 - Description: List all categories (used by CMS for selects and management).
	 - Auth: required (Bearer token)
	 - Response (200):
		 ```json
		 { "data": [ { "id": 1, "name": "Wrangler" }, ... ] }
		 ```

4) POST /categories
	 - Description: Create a new category.
	 - Auth: required (Bearer token)
	 - Request body:
		 ```json
		 { "name": "Wrangler" }
		 ```
	 - Response (201):
		 ```json
		 { "message": "Category created", "data": { "id": 5, "name": "Wrangler" } }
		 ```

5) PUT /categories/:id
	 - Description: Update a category by id.
	 - Auth: required (Bearer token)
	 - Request body:
		 ```json
		 { "name": "Updated name" }
		 ```

6) GET /products
	 - Description: Admin product list (paginated, protected).
	 - Auth: required (Bearer token)
	 - Query parameters:
		 - `search` (string)
		 - `pages` (number)
		 - `limits` (number)
	 - Response (200):
		 ```json
		 {
			 "data": {
				 "data": [ { "id":1, "name":"...", "price": 123 }, ... ],
				 "currentPage": 1,
				 "totalPage": 5
			 }
		 }
		 ```

7) POST /products
	 - Description: Create a new product (CMS).
	 - Auth: required (Bearer token)
	 - Request body (application/json):
		 ```json
		 {
			 "name": "Jeep Wrangler",
			 "description": "...",
			 "price": 1200000000,
			 "stock": 10,
			 "CategoryId": 2,
			 "imageUrl": "" // can be empty, image uploaded later
		 }
		 ```
	 - Response (201):
		 ```json
		 { "data": { "id": 123, "name": "Jeep Wrangler" } }
		 ```

8) GET /products/:id
	 - Description: Get product detail (admin/protected version used by CMS).
	 - Auth: required (Bearer token)
	 - Response (200):
		 ```json
		 { "data": { "id": 123, "name": "Jeep Wrangler", "CategoryId": 2, ... } }
		 ```

9) PUT /products/:id
	 - Description: Update a product by id.
	 - Auth: required (Bearer token)
	 - Request body: same shape as create product

10) DELETE /products/:id
		- Description: Delete a product.
		- Auth: required (Bearer token)

11) PATCH /products/upload/:id
		- Description: Upload an image for a product (multipart/form-data).
		- Auth: required (Bearer token)
		- Form field: `file` (the image file)
		- Response (200):
			```json
			{ "message": "Image uploaded", "data": { "imageUrl": "http://..." } }
			```

Public endpoints
----------------
12) GET /pub/products
		- Description: Public product listing (paginated). Supports filtering and server-side sorting.
		- Auth: none
		- Query parameters:
		  - `search` (string) — search by product name (case-insensitive)
		  - `pages` (number) — page number (default 1)
		  - `limits` (number) — items per page (default 10)
		  - `categoryId` (number) — filter products by category id (this maps to Product.CategoryId)
		  - `sorts` (string) — ordering for createdAt; accepted values: `asc` or `desc` (server-side sorting by createdAt). Note: additional client-side sorts (price/name) may be implemented in the frontend.
		- Example response:
			```json
			{
				"data": {
					"data": [
						{
							"id": 1,
							"name": "Jeep Wrangler",
							"price": 1200000000,
							"imageUrl": "...",
							"Category": { "id": 2, "name": "Wrangler" }
						},
						...
					],
					"currentPage": 1,
					"totalPage": 5
				}
			}
			```

13) GET /pub/products/:id
		- Description: Public product detail (no auth required).
		- Response (200):
			```json
			{ "data": { "id": 1, "name": "Jeep Wrangler", "price": 1200000000, "imageUrl": "...", "Category": { "id":2, "name":"Wrangler" } } }
			```

Notes & assumptions
-------------------
- The documentation above is derived from the frontend code in this repository. The exact response shape and status codes depend on the backend implementation.
- All protected routes require a valid JWT in the `Authorization` header. The frontends store the token in `localStorage` under `access_token`.
- Query parameter names (`pages`, `limits`) and response wrapper (`data.data`) follow what the frontend expects.


