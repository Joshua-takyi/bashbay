# Quick Start: Mapbox Integration

## Get Your Map Working in 3 Steps

### Step 1: Get a Mapbox Token (Free)

1. Go to: **https://account.mapbox.com/access-tokens/**
2. Sign up (it's free - no credit card required)
3. Copy your **"Default public token"** (starts with `pk.`)

### Step 2: Add Token to Your Project

1. Open: `/client/.env.local`
2. Paste your token:
   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV4YW1wbGUifQ.example
   ```

### Step 3: Restart the Server

```bash
cd client
pnpm dev
```

## That's It! 🎉

Now visit:

- **http://localhost:3000/create** (Venue Form)
- The map will load with full functionality

## What You Can Do

✅ **Search** - Type any address or place name  
✅ **Click** - Click anywhere on the map to set location  
✅ **Drag** - Drag the marker to fine-tune position  
✅ **GPS** - Click the locate button to use your current location

## Troubleshooting

**Map shows "Mapbox token not found"**

- Check that the token is in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server

**Search doesn't work**

- Check your internet connection
- Verify the token is valid on Mapbox dashboard

## Need Help?

See the full documentation:

- `MAPBOX_SETUP.md` - Detailed setup guide
- `MAPBOX_IMPLEMENTATION.md` - Technical details

---

**Free Tier Limits:**

- 50,000 map loads per month
- 100,000 geocoding requests per month
- Perfect for development and small apps!
