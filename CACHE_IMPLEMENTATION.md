# API Caching Implementation

## Overview
The API service now includes a comprehensive caching mechanism that automatically caches API responses and serves cached data when available, reducing redundant API calls and improving app performance.

## How It Works

### Automatic Caching
- All read-only API methods now automatically cache their responses
- Cache entries have a default TTL (Time To Live) of 5 minutes
- Some methods have custom TTL values (e.g., completion data: 1 minute, stats: 2 minutes)

### Cache Keys
Each API call generates a unique cache key based on the method name and parameters:
- `programmList` - for program list
- `challengeDetails_123` - for challenge details with ID 123
- `favorites_user@email.com` - for user favorites
- `completionSeries_userId_programId_repeatCount` - for completion data

### Cache Invalidation
The system automatically clears related caches when data is modified:
- When marking items as complete, related completion caches are cleared
- When adding/removing favorites, favorites caches are cleared
- This ensures data consistency

## Usage Examples

### Basic Usage (No Changes Required)
Your existing code will automatically benefit from caching:

```typescript
// This will use cached data if available, or make an API call if not
this.apiService.getChallengeList().subscribe(data => {
  // Handle data
});

// This will also use cached data if the same challenge was fetched before
this.apiService.getChallengeDetails(challengeId).subscribe(data => {
  // Handle data
});
```

### Cache Management
You can manually manage the cache when needed:

```typescript
// Clear specific cache entry
this.apiService.clearCache('challengeList');

// Clear all cache
this.apiService.clearAllCache();

// Get cache statistics
const stats = this.apiService.getCacheStats();
console.log(`Cache size: ${stats.size}, Keys: ${stats.keys}`);
```

## Cache TTL (Time To Live)

Different types of data have different cache durations:

- **Default**: 5 minutes (for most static data like lists, categories)
- **Completion Data**: 1 minute (for workout completion status)
- **Stats Data**: 2 minutes (for user statistics)
- **Favorites**: 2 minutes (for user favorites)

## Benefits

1. **Reduced API Calls**: Eliminates redundant requests for the same data
2. **Faster Loading**: Cached data loads instantly
3. **Better UX**: Smoother navigation between pages
4. **Reduced Server Load**: Fewer API requests to your backend
5. **Automatic Management**: No manual cache management required

## Cache Behavior

### Home Page Scenario
1. User visits home page → API calls made, data cached
2. User clicks "View All" on any section → Cached data used, no new API call
3. User navigates back to home → Cached data used, instant loading
4. After 5 minutes → Cache expires, fresh data fetched on next request

### Data Modification
1. User marks workout as complete → Related completion caches cleared
2. User adds item to favorites → Favorites cache cleared
3. Next request for modified data → Fresh API call made

## Best Practices

1. **Don't manually clear cache** unless absolutely necessary
2. **Trust the automatic invalidation** - it handles data consistency
3. **Monitor cache stats** in development to understand cache behavior
4. **Cache is per-session** - it clears when the app is refreshed

## Debugging

To see what's cached and monitor cache behavior:

```typescript
// In your component or service
const stats = this.apiService.getCacheStats();
console.log('Cache stats:', stats);
```

This will show you the current cache size and all cached keys.
