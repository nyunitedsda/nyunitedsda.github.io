import { linkTo } from "@storybook/addon-links";
import { useEffect, type ReactNode } from "react";
import { MemoryRouter } from "react-router";

// Global navigation configuration that can be customized per story
export interface GlobalNavigationConfig {
	enabled?: boolean;
	storyTitle?: string;
	routeMap?: Record<string, string>;
	initialRoute?: string;
	onNavigate?: (path: string, targetStory: string, storyTitle: string) => void;
	debug?: boolean;
}

// Default route mapping for the church website
const DEFAULT_GLOBAL_ROUTE_MAP: Record<string, string> = {
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
	"/archiveStream": "Default",
	// Add more default routes as needed
};

// Extract story information from Storybook context
const getStoryInfo = (context: any) => {
	const storyTitle = context?.title || "Components/Header";
	const storyName = context?.name || "Default";
	return { storyTitle, storyName };
};

// Enhanced navigation function for global use
const createGlobalNavigate = (
	currentStoryName: string,
	config: GlobalNavigationConfig,
	context: any
) => (path: string) => {
	const { storyTitle } = getStoryInfo(context);
	const routeMap = config.routeMap || DEFAULT_GLOBAL_ROUTE_MAP;
	const targetStory = routeMap[path] || "Default";
	const finalStoryTitle = config.storyTitle || storyTitle;
	
	if (config.debug) {
		console.group("🌐 Global Navigation Event");
		console.log("📍 Path:", path);
		console.log("📖 Current Story:", currentStoryName);
		console.log("🎯 Target Story:", targetStory);
		console.log("📚 Story Title:", finalStoryTitle);
		console.log("🗺️ Route Map:", routeMap);
		console.groupEnd();
	}
	
	// Call custom navigation handler if provided
	config.onNavigate?.(path, targetStory, finalStoryTitle);
	
	// Only navigate if it's different from current story
	if (targetStory !== currentStoryName) {
		linkTo(finalStoryTitle, targetStory)();
	}
};

interface GlobalNavigationProviderProps {
	children?: ReactNode;
	context: any; // Storybook context
}

/**
 * GlobalNavigationProvider - A global decorator for Storybook that provides:
 * 
 * 🌐 **Global Navigation**: Works across all stories without individual setup
 * 🚀 **Automatic Interception**: Captures navigation clicks on any story
 * 🔗 **Addon-Links Integration**: Uses Storybook addon-links for story navigation
 * ⚙️ **Configurable**: Can be customized per story via parameters
 * 🎯 **Context Aware**: Automatically detects story information
 * 🧩 **Router Context**: Provides MemoryRouter for React Router components
 * 
 * Usage in .storybook/preview.ts:
 * ```typescript
 * import { GlobalNavigationProvider } from './GlobalNavigationProvider';
 * 
 * const preview: Preview = {
 *   decorators: [
 *     (Story, context) => (
 *       <GlobalNavigationProvider context={context}>
 *         <Story />
 *       </GlobalNavigationProvider>
 *     ),
 *   ],
 * };
 * ```
 * 
 * Configure per story:
 * ```typescript
 * export const MyStory: Story = {
 *   parameters: {
 *     globalNavigation: {
 *       enabled: true,
 *       debug: true,
 *       routeMap: { "/custom": "CustomStory" },
 *       onNavigate: (path, story) => console.log('Nav:', path, story)
 *     }
 *   }
 * };
 * ```
 */
export const GlobalNavigationProvider = ({ 
	children, 
	context 
}: GlobalNavigationProviderProps) => {
	const { storyName } = getStoryInfo(context);
	
	// Get navigation configuration from story parameters
	const config: GlobalNavigationConfig = {
		enabled: true,
		debug: false,
		...context?.parameters?.globalNavigation
	};
	
	useEffect(() => {
		// Skip if navigation is disabled for this story
		if (!config.enabled) {
			return;
		}
		
		// Enhanced click event listener with comprehensive navigation detection
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			
			// Comprehensive navigation element detection
			const navElement = target.closest('a[href]') || 
							   target.closest('button[href]') ||
							   target.closest('[role="link"]') ||
							   target.closest('[data-navigate]') ||
							   target.closest('[data-path]') ||
							   target.closest('.nav-link') ||
							   target.closest('[data-testid*="nav"]') ||
							   target.closest('button[data-to]') ||
							   target.closest('[role="menuitem"]') ||
							   // Additional selectors for common navigation patterns
							   target.closest('.navigation-item') ||
							   target.closest('.menu-item') ||
							   target.closest('.header-link');
			
			if (navElement) {
				// Try to get navigation path from various attributes
				const href = navElement.getAttribute('href') ||
							 navElement.getAttribute('data-navigate') ||
							 navElement.getAttribute('data-path') ||
							 navElement.getAttribute('data-to') ||
							 navElement.getAttribute('to');
				
				if (href && href.startsWith('/')) {
					event.preventDefault();
					event.stopPropagation();
					
					if (config.debug) {
						console.log("🎯 Navigation element clicked:", navElement);
						console.log("📍 Extracted path:", href);
					}
					
					createGlobalNavigate(storyName, config, context)(href);
				}
			}
		};
		
		// Use capture phase to intercept before other handlers
		document.addEventListener('click', handleClick, true);
		
		if (config.debug) {
			console.log("🌐 Global Navigation Provider initialized for:", storyName);
		}
		
		return () => {
			document.removeEventListener('click', handleClick, true);
			if (config.debug) {
				console.log("🌐 Global Navigation Provider cleaned up for:", storyName);
			}
		};
	}, [storyName, config.enabled, config.debug, context]);
	
	// Determine initial route from story parameters or default
	const initialRoute = context?.parameters?.globalNavigation?.initialRoute || 
						 context?.parameters?.route || 
						 "/";
	
	// Wrap in MemoryRouter to provide routing context globally
	return (
		<MemoryRouter initialEntries={[initialRoute]}>
			{children}
		</MemoryRouter>
	);
};

export default GlobalNavigationProvider;

// Helper function to create story parameters for navigation
export const withGlobalNavigation = (config: GlobalNavigationConfig = {}) => ({
	globalNavigation: {
		enabled: true,
		...config
	}
});

// Predefined configurations for common use cases
export const navigationConfigs = {
	// Basic navigation with debug enabled
	debug: withGlobalNavigation({ debug: true }),
	
	// Disabled navigation for stories that don't need it
	disabled: withGlobalNavigation({ enabled: false }),
	
	// Custom route mapping
	custom: (routeMap: Record<string, string>) => 
		withGlobalNavigation({ routeMap }),
	
	// With navigation logging
	withLogging: (callback?: (path: string, story: string, title: string) => void) => 
		withGlobalNavigation({ 
			debug: true,
			onNavigate: callback || ((path, story, title) => {
				console.log(`🚀 Global Navigation: ${path} → ${story} (${title})`);
			})
		}),
};
