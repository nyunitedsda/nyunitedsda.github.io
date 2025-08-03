# Authentication API Documentation

This document describes the authentication system and API calls available in the NY United SDA application.

## Overview

The authentication system provides comprehensive user management including:
- User login and registration
- JWT token management with automatic refresh
- Password reset functionality
- Email verification
- Role-based access control

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate user with email/password |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/refresh` | Refresh authentication tokens |
| POST | `/auth/logout` | Logout user and invalidate tokens |
| GET | `/auth/me` | Get current user profile |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |
| POST | `/auth/verify-email` | Verify email address |

## API Functions

### Core Authentication Functions

Located in `src/api/request/commonQueries.ts`:

```typescript
// Login user
const loginResponse = await loginUser({
  username: 'user1',
  password: 'password123'
});

// Register new user
const registerResponse = await registerUser({
  username: "user1",
  email: 'user@example.com',
  password: 'password123',
  first_name: 'John',
  last_name: 'Doe'
});

// Get current user
const user = await getCurrentUser();

// Refresh token
const tokens = await refreshAuthToken(refreshToken);

// Logout
await logoutUser();

// Password reset
await requestPasswordReset('user1');
await resetPassword(token, newPassword);

// Email verification
await verifyEmail(verificationToken);
```

## React Hooks

### Authentication API Hooks

Located in `src/hooks/auth/useAuthAPI.ts`:

```typescript
import { useLogin, useRegister, useLogout, useCurrentUser } from '@/hooks/auth';

// Login hook
const login = useLogin();
const handleLogin = async () => {
  try {
    await login.mutateAsync({
      username: 'user1',
      password: 'password123'
    });
    // User is now logged in, tokens are stored automatically
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Registration hook
const register = useRegister();
const handleRegister = async () => {
  await register.mutateAsync({
    username: "user1",
    email: 'user@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe'
  });
};

// Current user hook
const { data: user, isLoading, isAuthenticated } = useCurrentUser();

// Logout hook
const logout = useLogout();
const handleLogout = () => {
  logout.mutate();
};

// Auth status hook
const { user, isAuthenticated, isLoading } = useAuthStatus();
```

### Context Hook

```typescript
import { useAuthentication } from '@/hooks/auth';

const { user, isAuthenticated, login, logout, register } = useAuthentication();
```

## Token Management

### Automatic Token Handling

The system automatically handles:
- **Token Storage**: Access and refresh tokens are stored in localStorage
- **Token Injection**: Tokens are automatically added to API requests
- **Token Refresh**: Expired tokens are automatically refreshed
- **Token Cleanup**: Tokens are cleared on logout or authentication errors

### Token Interceptors

The axios instance includes interceptors that:
1. Add the access token to all requests
2. Automatically refresh expired tokens
3. Handle authentication errors
4. Clear invalid tokens

## User Types and Interfaces

### User Object
```typescript
 interface UserDT {
	email?: string;
	first_name?: string;
	id: number;
	is_active: boolean;
	is_system: boolean;
	last_login?: Date;
	last_name?: string;
	password: string;
	remember_me: boolean;
	role_id: number;
	username: string;
}

```

### Authentication Credentials
```typescript
interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
```

### Token Response
```typescript
interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

## Error Handling

The authentication system includes comprehensive error handling:

- **Network Errors**: Automatic retry with exponential backoff
- **Authentication Errors**: Automatic token refresh or logout
- **Validation Errors**: Clear error messages for form validation
- **Server Errors**: Graceful degradation and user feedback

## Security Features

### Token Security
- JWT tokens with configurable expiration
- Secure token storage in localStorage
- Automatic token refresh before expiration
- Token invalidation on logout

### Request Security
- HTTPS enforcement in production
- CORS protection
- Rate limiting on authentication endpoints
- Input validation and sanitization

## Usage Examples

### Complete Login Flow
```typescript
import { useLogin, useAuthStatus } from '@/hooks/auth';

function LoginComponent() {
  const login = useLogin();
  const { isAuthenticated } = useAuthStatus();
  
  const handleSubmit = async (formData) => {
    try {
      await login.mutateAsync(formData);
      // Redirect to dashboard or previous page
    } catch (error) {
      // Show error message
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Login form fields */}
    </form>
  );
}
```

### Protected Route
```typescript
import { useAuthStatus } from '@/hooks/auth';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStatus();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

## Environment Variables

Required environment variables:

```env
VITE_API_URL=https://api.nyunitedsda.org
```

## Testing

The authentication system includes comprehensive tests:
- Unit tests for API functions
- Integration tests for hooks
- End-to-end tests for authentication flows

Run tests with:
```bash
npm test
```

## Migration Guide

If upgrading from an older authentication system:

1. Update import paths for hooks
2. Replace old login/logout functions with new hooks
3. Update protected route components
4. Test token refresh functionality
5. Verify error handling

## Troubleshooting

### Common Issues

**Token not persisting**: Check localStorage permissions and browser settings
**CORS errors**: Verify API URL and server CORS configuration
**Infinite refresh loops**: Check token expiration and refresh endpoint
**Permission denied**: Verify user roles and permissions

### Debug Mode

Enable debug logging:
```typescript
// Add to your main App component
if (import.meta.env.DEV) {
  console.log('Auth Debug Mode Enabled');
}
```
