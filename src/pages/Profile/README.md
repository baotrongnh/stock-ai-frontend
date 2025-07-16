# Profile Module

This module contains the user profile functionality with a well-organized structure.

## Structure

```
Profile/
├── Profile.tsx                 # Main profile component
├── README.md                   # This documentation
├── components/                 # React components
│   ├── index.ts               # Component exports
│   ├── ProfileHeader.tsx      # Header with user info and edit controls
│   ├── TabNavigation.tsx      # Navigation tabs
│   ├── PersonalInfoTab.tsx    # Personal information form
│   ├── AccountDetailsTab.tsx  # Account details (read-only)
│   ├── InvestmentTab.tsx      # Investment preferences
│   └── SettingsTab.tsx        # Settings and privacy
├── hooks/                     # Custom React hooks
│   ├── index.ts              # Hook exports
│   └── useProfile.ts         # Profile data management
└── types/                     # TypeScript types
    └── index.ts              # Type definitions
```

## Features

### Profile Header

- Displays user avatar, name, and status badges
- Shows join date, location, and provider information
- Portfolio value summary
- Edit/Save/Cancel controls

### Tabs

1. **Personal Info** - Basic and professional information
2. **Account Details** - Backend account information (read-only)
3. **Investment Profile** - Investment preferences and portfolio summary
4. **Settings** - Notifications and privacy settings

### Data Management

- Custom `useProfile` hook handles all profile operations
- Fetches user data from API on component mount
- Manages editing state and form validation
- Handles profile updates with proper error handling

## Usage

```tsx
import Profile from "./pages/Profile/Profile";

// Use in your routes
<Route path="/profile" component={Profile} />;
```

## API Integration

The profile integrates with the following API endpoints:

- `UserServices.getUserById()` - Fetch user profile
- `UserServices.updateUser()` - Update user profile

## Types

All TypeScript interfaces are defined in `types/index.ts`:

- `UserProfile` - Main profile interface
- `UserBackendFields` - Backend-specific fields
- `TabItem` - Tab configuration

## Components

Each tab is a separate component for better maintainability:

- Consistent styling and behavior
- Proper prop interfaces
- Reusable form patterns
