# Global Navigation Provider for Storybook

The Global Navigation Provider is a powerful Storybook decorator that enables automatic navigation interception and addon-links integration across all stories without requiring individual story configuration.

## 🚀 Features

- **🌐 Global Navigation**: Works across all stories automatically
- **🔗 Addon-Links Integration**: Seamless story navigation using Storybook addon-links
- **⚙️ Per-Story Configuration**: Customizable settings via story parameters
- **🎯 Smart Detection**: Automatically detects navigation elements
- **🧩 Router Context**: Provides MemoryRouter for React Router components
- **🐛 Debug Mode**: Built-in debugging and logging capabilities

## 📦 Installation

The Global Navigation Provider is already configured in `.storybook/preview.ts` and works automatically for all stories.

## 🎯 Basic Usage

### Automatic (No Configuration Required)

The provider works automatically for any component with navigation elements:

```tsx
// Any story with navigation elements will work automatically
export const MyStory: Story = {
  render: () => <MyNavigationComponent />,
  // Navigation works out of the box!
};
```

### Per-Story Configuration

Configure navigation behavior for specific stories:

```tsx
import { navigationConfigs } from '../.storybook/GlobalNavigationProvider';

export const MyStory: Story = {
  render: () => <MyComponent />,
  parameters: {
    globalNavigation: {
      enabled: true,
      debug: true, // See navigation events in console
      initialRoute: '/about',
      routeMap: {
        '/': 'HomePage',
        '/about': 'AboutPage',
        '/custom': 'MyStory'
      },
      onNavigate: (path, targetStory, storyTitle) => {
        console.log(`Navigating from ${path} to ${targetStory}`);
        // Add analytics, logging, etc.
      }
    }
  }
};
```

### Using Predefined Configurations

```tsx
// Enable debug mode
export const DebugStory: Story = {
  parameters: navigationConfigs.debug
};

// Disable navigation
export const StaticStory: Story = {
  parameters: navigationConfigs.disabled
};

// Custom route mapping
export const CustomRoutesStory: Story = {
  parameters: navigationConfigs.custom({
    '/special': 'SpecialStory',
    '/custom': 'CustomStory'
  })
};

// With navigation logging
export const LoggingStory: Story = {
  parameters: navigationConfigs.withLogging((path, story, title) => {
    analytics.track('storybook_navigation', { path, story, title });
  })
};
```

## 🎨 Supported Navigation Elements

The provider automatically detects clicks on these elements:

### HTML Elements
```html
<!-- Standard links -->
<a href="/about">About</a>

<!-- Buttons with navigation data -->
<button data-navigate="/contact">Contact</button>
<button data-path="/blog">Blog</button>
<button data-to="/home">Home</button>

<!-- Role-based elements -->
<div role="link" data-navigate="/services">Services</div>
<div role="menuitem" data-path="/donations">Donations</div>
```

### CSS Classes
```html
<!-- Navigation-specific classes -->
<div class="nav-link" data-navigate="/about">About</div>
<div class="menu-item" data-path="/contact">Contact</div>
<div class="navigation-item" data-navigate="/blog">Blog</div>
<div class="header-link" data-path="/services">Services</div>
```

### Test IDs
```html
<!-- Test ID patterns -->
<button data-testid="nav-home" data-navigate="/">Home</button>
<button data-testid="navigation-about" data-path="/about">About</button>
```

### React Router Elements
```tsx
// React Router Link components
<Link to="/about">About</Link>
<NavLink to="/contact">Contact</NavLink>

// Custom components with 'to' prop
<CustomLink to="/services">Services</CustomLink>
```

## ⚙️ Configuration Options

### GlobalNavigationConfig Interface

```typescript
interface GlobalNavigationConfig {
  // Enable/disable navigation for this story
  enabled?: boolean;
  
  // Storybook story collection title to navigate within
  storyTitle?: string;
  
  // Custom route-to-story mapping
  routeMap?: Record<string, string>;
  
  // Initial route for MemoryRouter
  initialRoute?: string;
  
  // Custom navigation handler
  onNavigate?: (path: string, targetStory: string, storyTitle: string) => void;
  
  // Enable debug logging
  debug?: boolean;
}
```

### Default Route Mapping

The provider includes sensible defaults for church website navigation:

```typescript
{
  "/": "Default",
  "/home": "HomePage", 
  "/about": "AboutPage",
  "/aboutUs": "AboutPage",
  "/donations": "DonationsPage",
  "/contact": "ContactPage", 
  "/blog": "BlogPage",
  "/blogs": "BlogPage",
  "/watch": "Default",
  "/liveStream": "Default",
  "/archiveStream": "Default"
}
```

## 🔧 Advanced Usage

### Cross-Story Navigation

Navigate between different story collections:

```tsx
export const CrossCollectionStory: Story = {
  parameters: {
    globalNavigation: {
      storyTitle: "Pages/BlogPage", // Navigate to different collection
      routeMap: {
        "/": "BlogHome",
        "/article": "BlogArticle"
      }
    }
  }
};
```

### Analytics Integration

Track navigation events for analytics:

```tsx
export const AnalyticsStory: Story = {
  parameters: {
    globalNavigation: {
      onNavigate: (path, targetStory, storyTitle) => {
        // Google Analytics
        gtag('event', 'storybook_navigation', {
          path,
          target_story: targetStory,
          story_title: storyTitle
        });
        
        // Custom analytics
        analytics.track('storybook_navigation', {
          path,
          targetStory,
          storyTitle,
          timestamp: Date.now()
        });
      }
    }
  }
};
```

### Conditional Navigation

Enable navigation only for specific stories:

```tsx
const isNavigationStory = (context: any) => 
  context.title?.includes('Navigation') || 
  context.name?.includes('Interactive');

export const ConditionalStory: Story = {
  parameters: {
    globalNavigation: {
      enabled: isNavigationStory,
      debug: true
    }
  }
};
```

## 🐛 Debugging

### Enable Debug Mode

```tsx
export const DebugStory: Story = {
  parameters: {
    globalNavigation: {
      debug: true
    }
  }
};
```

Debug mode provides console logging for:
- ✅ Provider initialization
- 🎯 Navigation element detection
- 📍 Path extraction
- 🚀 Navigation events
- 🧹 Cleanup operations

### Console Output Example

```
🌐 Global Navigation Provider initialized for: HomePage
🎯 Navigation element clicked: <button data-navigate="/about">
📍 Extracted path: /about
🌐 Global Navigation Event
  📍 Path: /about
  📖 Current Story: HomePage
  🎯 Target Story: AboutPage
  📚 Story Title: Components/Header
  🗺️ Route Map: {...}
```



### Before (Individual Component)
```tsx
// export const MyStory: Story = {
//   render: () => (
//     <HeaderWithLinks 
//       storyName="MyStory"
//       customRouteMap={{ "/custom": "CustomStory" }}
//     />
//   )
// };
```

### After (Global Provider)
```tsx
export const MyStory: Story = {
  render: () => <Header />, // Just use the component directly
  parameters: {
    globalNavigation: {
      routeMap: { "/custom": "CustomStory" }
    }
  }
};
```

## 🎯 Best Practices

1. **Use Default Mapping**: The default route mapping covers common navigation patterns
2. **Enable Debug for Development**: Use debug mode when developing new navigation stories
3. **Custom Routes for Special Cases**: Override route mapping only when needed
4. **Disable for Static Stories**: Disable navigation for stories that don't need it
5. **Use onNavigate for Tracking**: Add analytics or logging through the onNavigate callback

## 🔗 Related Files

- **Implementation**: `.storybook/GlobalNavigationProvider.tsx`
- **Configuration**: `.storybook/preview.ts`
