# Mapbox Integration Setup

## Overview

The application now uses Mapbox GL JS for interactive maps in the venue and event forms. Users can search for locations, click on the map, or drag markers to set coordinates.

## Features

- 🔍 **Location Search**: Search for addresses and places using Mapbox Geocoding API
- 🗺️ **Interactive Map**: Click anywhere on the map to set a location
- 📍 **Draggable Markers**: Drag the marker to fine-tune the location
- 📱 **Geolocation**: Use the device's GPS to find current location
- 🔄 **Reverse Geocoding**: Automatically get address from coordinates
- 🎯 **Navigation Controls**: Zoom and rotate the map

## Setup Instructions

### 1. Get a Mapbox Access Token

1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up for a free account (or log in if you already have one)
3. Navigate to the **Access Tokens** page
4. Either use the default public token or create a new one
5. Copy your token

### 2. Add Token to Environment Variables

Open `.env.local` in the client directory and add your token:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV4YW1wbGUifQ.example-token-here
```

### 3. Restart the Development Server

```bash
pnpm dev
```

## Usage in Forms

### Venue Form (`/create`)

The venue form includes a LocationPicker component that allows venue owners to:

- Search for their venue's address
- Pin the exact location on the map
- The coordinates are automatically captured and sent with the form

### Event Form (`/events/create`)

Similar to the venue form, event organizers can use the map to set the event location.

## Components

### LocationPicker

Located at: `client/app/components/forms/location-picker.tsx`

**Props:**

- `location: string` - The address/place name
- `coordinates: { lat: number, lng: number }` - GPS coordinates
- `onLocationChange: (location: string) => void` - Callback when location text changes
- `onCoordinatesChange: (coordinates) => void` - Callback when coordinates change

**Features:**

- Debounced search (500ms delay)
- Automatic reverse geocoding when clicking map or dragging marker
- Visual feedback for selected location
- Responsive design

## API Endpoints Used

### Geocoding (Search)

```
GET https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json
```

### Reverse Geocoding

```
GET https://api.mapbox.com/geocoding/v5/mapbox.places/{lng},{lat}.json
```

## Map Styles

Currently using: `mapbox://styles/mapbox/streets-v12`

Other available styles:

- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/dark-v11`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/outdoors-v12`

## Pricing

Mapbox offers a generous free tier:

- **50,000 free map loads per month**
- **100,000 free geocoding requests per month**

For most applications, this should be sufficient. Check [Mapbox Pricing](https://www.mapbox.com/pricing) for details.

## Troubleshooting

### Map not showing

- Check that `NEXT_PUBLIC_MAPBOX_TOKEN` is set in `.env.local`
- Verify the token is valid on the Mapbox dashboard
- Restart the development server after adding the token

### "Mapbox token not found" error

- The component will show a warning message
- Add the token to `.env.local` as described above

### Search not working

- Check browser console for API errors
- Verify the token has geocoding permissions
- Check your Mapbox usage limits

## Security Notes

- The `NEXT_PUBLIC_` prefix makes the token visible in client-side code
- This is expected for Mapbox public tokens
- Restrict the token's permissions on the Mapbox dashboard
- Set URL restrictions if deploying to production
- Consider implementing rate limiting on your backend

## Future Enhancements

- [ ] Add custom map markers
- [ ] Implement map bounds for venue search
- [ ] Add satellite view toggle
- [ ] Cache geocoding results
- [ ] Add location autocomplete with recent searches
