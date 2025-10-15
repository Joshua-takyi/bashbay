# Hero UI Theme Configuration Guide (Tailwind CSS v4)

A comprehensive guide for customizing Hero UI (NextUI) colors, themes, and styling in your Next.js application using Tailwind CSS v4's new CSS-first configuration.

## Table of Contents

1. [Understanding Hero UI Theming](#understanding-hero-ui-theming)
2. [Tailwind v4 Changes](#tailwind-v4-changes)
3. [Basic Configuration](#basic-configuration)
4. [Customizing Colors](#customizing-colors)
5. [Adding Custom Colors](#adding-custom-colors)
6. [Dark Mode Configuration](#dark-mode-configuration)
7. [Advanced Customization](#advanced-customization)
8. [Common Use Cases](#common-use-cases)

---

## Understanding Hero UI Theming

Hero UI (NextUI) uses Tailwind CSS under the hood and provides a powerful theming system that allows you to:

- Customize existing color schemes (primary, secondary, success, warning, danger)
- Add new custom colors (like accent, brand, etc.)
- Configure light and dark mode separately
- Override component-specific styles

### Key Concepts

**Theme Colors**: Hero UI provides semantic color names:

- `primary` - Main brand color
- `secondary` - Secondary actions
- `success` - Positive actions (green)
- `warning` - Warning states (yellow/orange)
- `danger` - Destructive actions (red)
- `default` - Neutral gray tones
- `foreground` - Text colors
- `background` - Page backgrounds

---

## Tailwind v4 Changes

**🎉 Tailwind CSS v4 introduces a CSS-first configuration approach!**

### Key Changes:

- **No more `tailwind.config.js` or `tailwind.config.ts` file**
- Configuration is now done directly in your CSS file using `@theme`
- CSS variables are the primary way to define custom values
- More performant and easier to maintain
- Better integration with modern CSS features

### What This Means:

Instead of configuring Tailwind in a JavaScript/TypeScript config file, you now define your theme directly in your `globals.css` (or main CSS file) using CSS custom properties and the `@theme` directive.

---

## Basic Configuration

### Step 1: Locate Your CSS File

Your theme configuration now lives in your main CSS file, typically:

- `app/globals.css` (Next.js App Router)
- `styles/globals.css` (older structure)

### Step 2: Basic CSS Structure

Here's a minimal Tailwind v4 configuration in your `globals.css`:

```css
/* app/globals.css */
@import "tailwindcss";

/* Optional: Import NextUI styles if needed */
@import "@nextui-org/theme/dist/styles.css";

@theme {
  /* Your custom theme configuration goes here */
}
```

### Step 3: NextUI Integration

For NextUI/Hero UI, you'll define theme variables using CSS custom properties:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* NextUI Theme Variables */
    --nextui-primary: 0 112 243;
    --nextui-primary-foreground: 255 255 255;
    --nextui-background: 255 255 255;
    --nextui-foreground: 17 24 28;
  }

  .dark {
    --nextui-primary: 59 130 246;
    --nextui-primary-foreground: 255 255 255;
    --nextui-background: 0 0 0;
    --nextui-foreground: 236 237 238;
  }
}
```

---

## Customizing Colors

With Tailwind v4, all color customization is done directly in your CSS file using CSS custom properties.

### Method 1: Simple Color Override

Change the primary color across your entire app in `globals.css`:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Primary color - RGB values (space-separated) */
    --nextui-primary: 0 112 243; /* #0070F3 in RGB */
    --nextui-primary-foreground: 255 255 255; /* White */
  }
}
```

**Converting HEX to RGB:**

- `#0070F3` → `rgb(0, 112, 243)` → `0 112 243`
- `#FFFFFF` → `rgb(255, 255, 255)` → `255 255 255`

### Method 2: Full Color Scale

For more control, define a complete color scale using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #e6f1fe;
  --color-primary-100: #cce3fd;
  --color-primary-200: #99c7fb;
  --color-primary-300: #66aaf9;
  --color-primary-400: #338ef7;
  --color-primary-500: #0070f3; /* Main shade */
  --color-primary-600: #005bc4;
  --color-primary-700: #004493;
  --color-primary-800: #002e62;
  --color-primary-900: #001731;
}

@layer base {
  :root {
    --nextui-primary: 0 112 243;
    --nextui-primary-foreground: 255 255 255;
  }
}
```

### Method 3: Using HSL Colors

For dynamic theming with better color manipulation, use HSL:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* HSL values (hue saturation lightness) */
    --primary-h: 210;
    --primary-s: 100%;
    --primary-l: 50%;

    /* Computed primary color */
    --nextui-primary: var(--primary-h) var(--primary-s) var(--primary-l);
    --nextui-primary-foreground: 0 0% 100%;
  }
}

/* Easy to create hover states */
.btn-primary:hover {
  background: hsl(
    var(--primary-h) var(--primary-s) calc(var(--primary-l) + 10%)
  );
}
```

---

## Adding Custom Colors

### Adding an Accent Color

Want to add a custom "accent" color alongside the default ones? Define it in your CSS:

```css
@import "tailwindcss";

@theme {
  /* Define the full accent color scale */
  --color-accent-50: #fff0f5;
  --color-accent-100: #ffe1eb;
  --color-accent-200: #ffc3d7;
  --color-accent-300: #ffa5c3;
  --color-accent-400: #ff87af;
  --color-accent-500: #ff69b4; /* Main accent (Hot Pink) */
  --color-accent-600: #cc5490;
  --color-accent-700: #993f6c;
  --color-accent-800: #662a48;
  --color-accent-900: #331524;
}

@layer base {
  :root {
    /* Primary colors */
    --nextui-primary: 0 112 243;
    --nextui-primary-foreground: 255 255 255;

    /* Secondary colors */
    --nextui-secondary: 121 40 202;
    --nextui-secondary-foreground: 255 255 255;

    /* Custom accent color for NextUI */
    --nextui-accent: 255 105 180;
    --nextui-accent-foreground: 255 255 255;
  }
}
```

### Adding Multiple Custom Colors

```css
@import "tailwindcss";

@theme {
  /* Brand color */
  --color-brand: #6366f1;
  --color-brand-50: #eef2ff;
  --color-brand-500: #6366f1;
  --color-brand-900: #312e81;

  /* Accent color */
  --color-accent: #f59e0b;
  --color-accent-50: #fffbeb;
  --color-accent-500: #f59e0b;
  --color-accent-900: #78350f;

  /* Info color */
  --color-info: #3b82f6;
  --color-info-50: #eff6ff;
  --color-info-500: #3b82f6;
  --color-info-900: #1e3a8a;
}

@layer base {
  :root {
    /* Define for NextUI usage */
    --nextui-brand: 99 102 241;
    --nextui-brand-foreground: 255 255 255;

    --nextui-accent: 245 158 11;
    --nextui-accent-foreground: 255 255 255;

    --nextui-info: 59 130 246;
    --nextui-info-foreground: 255 255 255;
  }
}
```

### Using Custom Colors in Components

Once defined, use them with Tailwind classes (note: NextUI components may not recognize custom colors directly):

```tsx
// Using with Tailwind classes
<div className="bg-accent-500 text-white">
  Custom styled content
</div>

<button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded">
  Brand Button
</button>

<div className="text-info-600 bg-info-50 p-4">
  Info message
</div>
```

---

## Dark Mode Configuration

### Configuring Both Light and Dark Modes

In Tailwind v4, dark mode is configured using the `.dark` class selector:

```css
@import "tailwindcss";

@layer base {
  /* Light mode (default) */
  :root {
    --nextui-primary: 0 112 243;
    --nextui-primary-foreground: 255 255 255;
    --nextui-background: 255 255 255;
    --nextui-foreground: 17 24 28;
  }

  /* Dark mode */
  .dark {
    --nextui-primary: 59 130 246; /* Lighter blue for dark mode */
    --nextui-primary-foreground: 255 255 255;
    --nextui-background: 0 0 0;
    --nextui-foreground: 236 237 238;
  }
}
```

### Creating Custom Dark Theme

For a GitHub-style dark theme:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Light theme */
    --nextui-primary: 0 112 243;
    --nextui-background: 255 255 255;
    --nextui-foreground: 17 24 28;
  }

  /* Custom dark theme with data attribute */
  [data-theme="github-dark"],
  .github-dark {
    --nextui-primary: 167 139 250; /* Purple */
    --nextui-primary-foreground: 255 255 255;
    --nextui-background: 13 17 23; /* GitHub dark background */
    --nextui-foreground: 201 209 217;

    /* Content layers */
    --nextui-content1: 22 27 34;
    --nextui-content2: 33 38 45;
    --nextui-content3: 45 51 59;
    --nextui-content4: 55 62 71;
  }
}
```

Apply the custom theme:

```tsx
// In your layout.tsx or provider
<NextUIProvider>
  <div className="github-dark text-foreground bg-background">
    {children}
  </div>
</NextUIProvider>

// Or with data attribute
<div data-theme="github-dark">
  {children}
</div>
```

---

## Advanced Customization

### Custom Border Radius

Define custom border radius values using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --radius-small: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;
  --radius-xl: 16px;
}

@layer base {
  :root {
    --nextui-radius-small: 4px;
    --nextui-radius-medium: 8px;
    --nextui-radius-large: 12px;
  }
}
```

Use them:

```tsx
<div className="rounded-[var(--radius-large)]">...</div>
```

### Custom Font Configuration

```css
@import "tailwindcss";

@theme {
  --font-size-tiny: 0.75rem; /* 12px */
  --font-size-small: 0.875rem; /* 14px */
  --font-size-medium: 1rem; /* 16px */
  --font-size-large: 1.125rem; /* 18px */

  /* Font families */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: "Fira Code", monospace;
}

@layer base {
  :root {
    --nextui-font-size-tiny: 0.75rem;
    --nextui-font-size-small: 0.875rem;
    --nextui-font-size-medium: 1rem;
    --nextui-font-size-large: 1.125rem;
  }
}
```

### Spacing and Layout

```css
@theme {
  --spacing-unit: 0.25rem; /* 4px base unit */
  --spacing-1: calc(var(--spacing-unit) * 1); /* 4px */
  --spacing-2: calc(var(--spacing-unit) * 2); /* 8px */
  --spacing-4: calc(var(--spacing-unit) * 4); /* 16px */
  --spacing-8: calc(var(--spacing-unit) * 8); /* 32px */
}
```

### Opacity and Hover States

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Opacity values */
    --opacity-disabled: 0.3;
    --opacity-hover: 0.8;
    --opacity-focus: 0.9;
  }
}

@layer utilities {
  .btn-primary:hover {
    opacity: var(--opacity-hover);
  }

  .btn-primary:disabled {
    opacity: var(--opacity-disabled);
  }
}
```

---

## Common Use Cases

### Use Case 1: Brand Color System

Setting up your company's brand colors:

```css
@import "tailwindcss";

@theme {
  /* Brand color palette */
  --color-brand-blue: #1e40af;
  --color-brand-red: #dc2626;
  --color-success: #16a34a;
}

@layer base {
  /* Light mode */
  :root {
    /* Primary brand color (logo color) */
    --nextui-primary: 30 64 175; /* #1E40AF in RGB */
    --nextui-primary-foreground: 255 255 255;

    /* Secondary brand color */
    --nextui-secondary: 220 38 38; /* #DC2626 in RGB */
    --nextui-secondary-foreground: 255 255 255;

    /* Success states */
    --nextui-success: 22 163 74; /* #16A34A in RGB */
    --nextui-success-foreground: 255 255 255;

    /* Background colors */
    --nextui-background: 248 250 252; /* #F8FAFC */
    --nextui-foreground: 15 23 42; /* #0F172A */
  }

  /* Dark mode */
  .dark {
    /* Lighter colors for dark mode */
    --nextui-primary: 59 130 246; /* Lighter blue */
    --nextui-primary-foreground: 255 255 255;

    --nextui-secondary: 239 68 68; /* Lighter red */
    --nextui-secondary-foreground: 255 255 255;

    --nextui-background: 15 23 42;
    --nextui-foreground: 248 250 252;
  }
}
```

### Use Case 2: E-commerce Site

Colors optimized for shopping:

```css
@import "tailwindcss";

@layer base {
  :root {
    /* Buy/Add to cart button - Emerald green */
    --nextui-primary: 16 185 129; /* #10B981 */
    --nextui-primary-foreground: 255 255 255;

    /* Sale/Discount tag - Red */
    --nextui-danger: 239 68 68; /* #EF4444 */
    --nextui-danger-foreground: 255 255 255;

    /* Featured/Premium - Amber/Gold */
    --nextui-warning: 245 158 11; /* #F59E0B */
    --nextui-warning-foreground: 255 255 255;

    /* Info/Help - Blue */
    --nextui-secondary: 59 130 246; /* #3B82F6 */
    --nextui-secondary-foreground: 255 255 255;
  }
}

@theme {
  /* Additional e-commerce specific colors */
  --color-sale: #ef4444;
  --color-new-arrival: #8b5cf6;
  --color-best-seller: #f59e0b;
}
```

### Use Case 3: Dashboard/Admin Panel

Professional, minimal color scheme:

```css
@import "tailwindcss";

@theme {
  /* Border radius for professional look */
  --radius-small: 6px;
  --radius-medium: 8px;
  --radius-large: 12px;
}

@layer base {
  /* Light mode - Clean and professional */
  :root {
    --nextui-primary: 59 130 246; /* #3B82F6 Blue */
    --nextui-primary-foreground: 255 255 255;

    --nextui-secondary: 100 116 139; /* #64748B Slate */
    --nextui-secondary-foreground: 255 255 255;

    --nextui-success: 16 185 129; /* #10B981 */
    --nextui-warning: 245 158 11; /* #F59E0B */
    --nextui-danger: 239 68 68; /* #EF4444 */

    --nextui-background: 241 245 249; /* #F1F5F9 */
    --nextui-foreground: 15 23 42; /* #0F172A */

    /* Content layers for cards, modals, etc. */
    --nextui-content1: 255 255 255; /* #FFFFFF */
    --nextui-content2: 248 250 252; /* #F8FAFC */
  }

  /* Dark mode - Professional dark theme */
  .dark {
    --nextui-primary: 59 130 246;
    --nextui-primary-foreground: 255 255 255;

    --nextui-background: 15 23 42; /* #0F172A */
    --nextui-foreground: 241 245 249; /* #F1F5F9 */

    --nextui-content1: 30 41 59; /* #1E293B */
    --nextui-content2: 51 65 85; /* #334155 */
  }
}
```

---

## Testing Your Theme

### Step 1: Create a Test Component

Create `app/components/theme-test.tsx`:

```tsx
import { Button, Card, CardBody } from "@nextui-org/react";

export default function ThemeTest() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Theme Test</h2>

      <div className="flex gap-2 flex-wrap">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="default">Default</Button>
      </div>

      <Card>
        <CardBody>
          <p className="text-foreground">This text uses the foreground color</p>
        </CardBody>
      </Card>

      <div className="bg-primary text-primary-foreground p-4 rounded">
        Primary background with foreground text
      </div>
    </div>
  );
}
```

### Step 2: Add to a Page

Test your theme by adding the component to any page and viewing in both light and dark modes.

---

## Troubleshooting

### Colors Not Applying?

1. **Clear cache**: Delete `.next` folder and restart dev server

   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Check CSS import order**: Ensure Tailwind is imported before other styles:

   ```css
   /* globals.css */
   @import "tailwindcss"; /* Must be first */
   @import "@nextui-org/theme/dist/styles.css";
   ```

3. **Verify CSS variable format**: Use space-separated RGB values (not commas):

   ```css
   /* ✅ Correct */
   --nextui-primary: 0 112 243;

   /* ❌ Incorrect */
   --nextui-primary: rgb(0, 112, 243);
   --nextui-primary: 0, 112, 243;
   ```

### Dark Mode Not Working?

1. Ensure your root element has the `dark` class when in dark mode
2. Check that dark mode variables are defined in the `.dark` selector
3. Verify your theme provider is toggling the class correctly:

   ```tsx
   // Example dark mode toggle
   <button onClick={() => document.documentElement.classList.toggle("dark")}>
     Toggle Dark Mode
   </button>
   ```

### Custom Colors Not Recognized?

Hero UI only recognizes the built-in color names (`primary`, `secondary`, etc.) for its `color` prop. For custom colors, use Tailwind classes directly:

```tsx
// Won't work with NextUI components
<Button color="accent">Click</Button>

// Use Tailwind classes instead
<button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded">
  Click
</button>
```

### Tailwind v4 Specific Issues

1. **No config file needed**: If you have `tailwind.config.js/ts`, you can delete it (unless you need it for other plugins)
2. **Use `@import`**: Make sure you're using `@import "tailwindcss"` not the old `@tailwind` directives
3. **PostCSS setup**: Tailwind v4 works with or without PostCSS config

---

## Best Practices

1. **Use Semantic Names**: Use color names that describe purpose, not appearance

   - ✅ `primary`, `accent`, `brand`
   - ❌ `blue`, `red`, `orange`

2. **Maintain Contrast**: Ensure sufficient contrast between background and foreground colors (WCAG AAA: 7:1 ratio)

3. **Test Both Modes**: Always test your colors in both light and dark mode

4. **Document Your Colors**: Keep a reference of your color palette in your design system docs

5. **Use Color Scales**: Define full 50-900 scales for flexibility in hover states, borders, etc.

6. **Consider Accessibility**: Test with color blindness simulators and screen readers

---

## Resources

- [NextUI Theme Documentation](https://nextui.org/docs/customization/theme)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Color Palette Generators](https://uicolors.app/create)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [HSL Color Picker](https://hslpicker.com/)
- [RGB/HEX Converter](https://www.rapidtables.com/convert/color/hex-to-rgb.html)

---

## Quick Reference

### Complete Example Configuration (Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Custom color scales */
  --color-brand: #0070f3;
  --color-accent: #ff4ecd;

  /* Border radius */
  --radius-small: 6px;
  --radius-medium: 8px;
  --radius-large: 12px;
}

@layer base {
  /* Light mode theme */
  :root {
    /* Primary color */
    --nextui-primary: 0 112 243; /* #0070F3 */
    --nextui-primary-foreground: 255 255 255;

    /* Secondary color */
    --nextui-secondary: 121 40 202; /* #7928CA */
    --nextui-secondary-foreground: 255 255 255;

    /* Custom accent color */
    --nextui-accent: 255 78 205; /* #FF4ECD */
    --nextui-accent-foreground: 255 255 255;

    /* Base colors */
    --nextui-background: 255 255 255;
    --nextui-foreground: 17 24 28;
  }

  /* Dark mode theme */
  .dark {
    /* Primary color (lighter for dark mode) */
    --nextui-primary: 59 130 246; /* #3B82F6 */
    --nextui-primary-foreground: 255 255 255;

    /* Secondary color */
    --nextui-secondary: 147 51 234; /* #9333EA */
    --nextui-secondary-foreground: 255 255 255;

    /* Custom accent color */
    --nextui-accent: 255 78 205;
    --nextui-accent-foreground: 255 255 255;

    /* Base colors */
    --nextui-background: 0 0 0;
    --nextui-foreground: 236 237 238;
  }
}
```

### Color Conversion Reference

```
HEX to RGB:
#0070F3 → rgb(0, 112, 243) → 0 112 243
#FFFFFF → rgb(255, 255, 255) → 255 255 255
#000000 → rgb(0, 0, 0) → 0 0 0

Common Colors in RGB format:
Blue: 59 130 246
Green: 16 185 129
Red: 239 68 68
Yellow: 245 158 11
Purple: 147 51 234
Pink: 236 72 153
```

---

Happy theming! 🎨
