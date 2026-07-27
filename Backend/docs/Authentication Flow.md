# Express + JWT Authentication Flow Notes

---

# 1. What is Authentication?

Authentication is the process of verifying **who the user is**.

Example:

- User enters email and password.
- Backend verifies them.
- If correct, backend generates a JWT token.
- The client stores this token and sends it with every protected request.

Authentication answers only one question:

**Who are you?**

---

# 2. Authentication vs Authorization

## Authentication

Verifies the identity of the user.

Example:

User Login
↓
JWT Verified
↓
User = Hitesh

## Authorization

Checks whether the authenticated user has permission to perform an action.

Example:

User = Hitesh
↓
Trying to delete Repository X
↓
Is Hitesh the owner?
↓
YES → Allow
NO → Deny

Authentication → "Who are you?"

Authorization → "What are you allowed to do?"

---

# 3. Express Request Lifecycle

Whenever a request reaches the server, Express processes it step by step.

Example Request:

POST /api/auth/register

Flow:

Browser
↓
Express Server
↓
express.json()
↓
authRoutes
↓
Validation Middleware
↓
Controller
↓
Service
↓
Database
↓
Controller
↓
Response

If any error occurs:

Request
↓
Middleware / Service
↓
next(error)
↓
Error Handler
↓
JSON Error Response

---

# 4. What does app.use() do?

Example:

```javascript
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);
```

Express internally stores them in order:

1. express.json()
2. authRoutes
3. errorHandler

Whenever a request comes in, Express executes them one by one.

---

# 5. Why express.json() is Required

A browser sends raw JSON.

Example:

```json
{
    "username":"Hitesh",
    "email":"abc@gmail.com"
}
```

Without:

```javascript
app.use(express.json());
```

Express cannot understand the request body.

So:

```javascript
req.body
```

becomes:

```javascript
undefined
```

That's why we got:

```
Cannot destructure property 'username' of undefined
```

express.json() converts raw request data into:

```javascript
req.body
```

---

# 6. Route

Example:

```javascript
router.post(
    "/register",
    registerValidation,
    authController.registerUser
);
```

This creates a middleware pipeline.

```
registerValidation
        ↓
registerUser
```

Express executes them from left to right.

---

# 7. Middleware

Middleware is simply a function that runs before the next function.

Example:

```javascript
registerValidation(req, res, next);
```

Middleware has three possible outcomes.

### Case 1 - Continue

```javascript
next();
```

Meaning:

"I'm done."

Continue to the next function.

---

### Case 2 - End the Request

```javascript
res.json(...);
```

Meaning:

"Response sent."

Stop processing.

---

### Case 3 - Error

```javascript
next(error);
```

Meaning:

"Something failed."

Jump directly to the global error handler.

---

# 8. Why next() Exists

Express executes middleware in sequence.

It has no idea when your middleware has finished.

Calling:

```javascript
next();
```

tells Express:

"Continue to the next middleware."

Without calling next(), Express waits forever and the request hangs.

---

# 9. Controller

Controller handles HTTP-related work.

Responsibilities:

- Receive request
- Call service
- Send response
- Forward errors

Example:

```javascript
const result = await authService.registerUser(req.body);

res.status(201).json(result);
```

Controllers should remain small.

They should NOT contain business logic.

---

# 10. Service

The service contains the application's business logic.

Example during registration:

Receive User Data
↓
Check Duplicate Email
↓
Check Duplicate Username
↓
Hash Password
↓
Save User
↓
Generate JWT
↓
Return Result

Services answer the question:

"What should the application do?"

---

# 11. Password Hashing

Never store passwords directly.

Wrong:

```
12345678
```

Correct:

```
$2b$10$A98asdasd9...
```

During login:

```javascript
bcrypt.compare()
```

does NOT decrypt passwords.

Instead:

- Hashes the entered password.
- Compares both hashes.

---

# 12. JWT (JSON Web Token)

A JWT contains three parts.

```
HEADER
PAYLOAD
SIGNATURE
```

Looks like:

```
xxxxx.yyyyy.zzzzz
```

Payload Example:

```json
{
    "id":"123",
    "username":"Hitesh",
    "email":"abc@gmail.com"
}
```

The signature is created using:

```
JWT_SECRET
```

If someone modifies the token,

JWT verification fails.

---

# 13. Why JWT is Stateless

Traditional sessions require the server to remember every logged-in user.

JWT does not.

The token already contains:

- User ID
- Creation Time
- Expiration Time

The server only verifies the signature.

It does not store the token.

This is called:

**Stateless Authentication**

---

# 14. Login Flow

Client
↓
POST /login
↓
Validation
↓
Controller
↓
Service
↓
Find User
↓
Compare Password
↓
Generate JWT
↓
Return Token

Passwords are never returned.

---

# 15. Protected Routes

Example:

```
GET /api/auth/me
```

Header:

```
Authorization: Bearer <JWT>
```

Flow:

Request
↓
protect Middleware
↓
Extract Token
↓
Verify JWT
↓
Find User
↓
req.user = user
↓
Controller
↓
Response

---

# 16. Why Find User Again?

Even though JWT already contains user information, we still query MongoDB.

Reason:

The user may have:

- Been deleted
- Been blocked
- Updated profile
- Changed roles
- Lost permissions

Always use the latest database record.

---

# 17. What is req?

Express converts the incoming HTTP request into an object called:

```javascript
req
```

Useful properties:

```javascript
req.body
req.params
req.query
req.headers
```

We can also attach our own properties.

Example:

```javascript
req.user = user;
```

Later we can also use:

```javascript
req.repository
req.permissions
req.owner
```

This is a common Express pattern.

---

# 18. What is res?

res is the response object.

Example:

```javascript
res.status(201).json({
    success: true
});
```

Once a response is sent,

the request lifecycle ends.

---

# 19. Why protect is Middleware

Without middleware,

every controller would have to:

- Extract JWT
- Verify JWT
- Find User
- Handle authentication errors

Instead,

we write it once.

```
protect()
     ↓
Controller
```

Benefits:

- No duplicated code
- Cleaner controllers
- Centralized authentication
- Easy maintenance

This follows the DRY Principle.

**Don't Repeat Yourself**

---

# 20. Why Login Does NOT Use protect

Login is a public route.

The user does not yet have a JWT.

If login used protect:

User Wants Token
↓
protect asks for token
↓
User has no token
↓
401 Unauthorized

The user could never log in.

Therefore:

Public Routes

- /register
- /login

Protected Routes

- /me
- /repositories
- /commit
- /collaborators

---

# 21. Complete Authentication Flow

## Registration

Client
↓
POST /register
↓
express.json()
↓
Route
↓
Validation Middleware
↓
Controller
↓
Service
↓
MongoDB
↓
Hash Password
↓
Generate JWT
↓
Controller
↓
Response

---

## Login

Client
↓
POST /login
↓
Validation
↓
Controller
↓
Service
↓
Find User
↓
Compare Password
↓
Generate JWT
↓
Response

---

## Protected Request

Client
↓
Authorization: Bearer <JWT>
↓
protect Middleware
↓
Extract Token
↓
Verify JWT
↓
Find User
↓
req.user
↓
Controller
↓
Service
↓
Response

---

# 22. Responsibilities of Each Layer

Routes
- Decide which functions execute for a request.

Validation Middleware
- Validate incoming request data.

Authentication Middleware
- Verify JWT.
- Authenticate user.
- Attach req.user.

Controller
- Handle HTTP request.
- Call services.
- Send response.

Service
- Implement business logic.

Model
- Define MongoDB schema.
- Interact with the database.

Utils
- Shared helper functions.

Error Handler
- Catch errors.
- Return consistent error responses.

---

# 23. Key Takeaways

1. Express processes requests sequentially using middleware.
2. Middleware decides whether to continue, end the request, or report an error.
3. Controllers should remain thin and focus on HTTP concerns.
4. Services contain the core business logic.
5. Passwords are never stored in plain text.
6. JWT provides stateless authentication.
7. protect authenticates the user and attaches req.user.
8. Authentication verifies identity.
9. Authorization verifies permissions.
10. Every layer should have a single responsibility.
11. A clean layered architecture makes projects easier to maintain, test, and scale.
