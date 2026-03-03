# @tony-ui/core

Beautiful, accessible Angular components built with **Tailwind CSS v4** and **Signals**. Inspired by [shadcn/ui](https://ui.shadcn.com/).

- **Directive & Component-based** â€” lightweight directives for simple elements, full components for complex interactions
- **Signal inputs** â€” `input()`, `model()`, `output()`, `computed()`, `linkedSignal()` â€” pure Angular 21 signals API
- **Zoneless** â€” built for `provideZonelessChangeDetection()`
- **Themeable** â€” CSS custom properties with light, dark, and corporate themes
- **Accessible** â€” WAI-ARIA compliant, keyboard navigation, screen reader support
- **Reactive Forms** â€” ControlValueAccessor on all form components

## Installation

### Automatic (recommended)

```bash
ng add @tony-ui/core
```

This installs the package, adds Tailwind CSS v4 if needed, imports `sonny-theme.css`, and provides `TonyUI` in your app config.

### Manual

```bash
npm install @tony-ui/core
```

Then in your `app.config.ts`:

```typescript
import { provideZonelessChangeDetection } from '@angular/core';
import { provideTonyUI } from '@tony-ui/core';

export const appConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideTonyUI({ defaultTheme: 'light' }),
  ],
};
```

And import the theme in your global styles:

```css
@import "tailwindcss";
@import "@tony-ui/core/styles/sonny-theme.css";
```

### Requirements

- Angular >= 21.0.0
- Angular CDK >= 21.0.0
- Tailwind CSS v4

## Components (60+)

### Layout & Navigation
| Component | Description |
|-----------|-------------|
| **Accordion** | Expandable sections, single/multi mode |
| **Breadcrumb** | Navigation trail with dynamic segments |
| **Navbar** | Responsive navigation bar with variants |
| **Tabs** | Tabbed content with triggers and panels |
| **Steps** | Step-by-step progress indicator |
| **Pagination** | Page navigation with sibling/boundary counts |
| **Divider** | Horizontal/vertical content separator |

### Data Display
| Component | Description |
|-----------|-------------|
| **Table** | Default/striped/bordered, 3 densities, sticky header |
| **Data Table** | Full-featured: sorting, filtering, pagination, row selection, expansion, column visibility, custom cell templates, bulk actions, loading skeleton, JSON export |
| **Card** | Content containers â€” 4 variants, selectable |
| **Badge** | Status labels â€” 6 variants, 3 sizes |
| **Avatar** | User images with fallback initials |
| **Avatar Group** | Stacked avatars with overflow counter, fallback initials |
| **Stat** | Statistic display with label/value/change |
| **Timeline** | Chronological event display |
| **List** | Styled list items |
| **Kbd** | Keyboard shortcut display |
| **Status** | Status indicator dots |
| **Indicator** | Positioned badge indicators |
| **Diff** | Side-by-side content comparison |

### Form Controls
| Component | Description |
|-----------|-------------|
| **Input** | Text input â€” default/error/success variants |
| **Textarea** | Multi-line text input |
| **Select** | Dropdown selection with search |
| **Combobox** | Searchable dropdown with keyboard navigation |
| **Checkbox** | Signal-based with two-way binding |
| **Radio** | Signal-based radio groups |
| **Switch** | Toggle switches with two-way binding |
| **Slider** | Range input with min/max/step, drag support |
| **Toggle** | Pressed state buttons for toolbars |
| **Rating** | Star rating with half-star support |
| **File Input** | File upload with drag & drop |
| **Fieldset** | Grouped form fields with legend |
| **Calendar** | Date grid with single/range selection, hover preview |
| **Date Picker** | Single date with calendar dropdown, clearable, min/max |
| **Date Range Picker** | Date range with dual calendar, preset ranges, responsive |
| **Color Picker** | Visual color selector with saturation panel, hue slider, HEX/RGB/HSL, presets, favorites, EyeDropper API |
| **Number Input** | Numeric stepper with +/- buttons, min/max/step, ArrowUp/Down |
| **OTP Input** | One-time password input with auto-focus, paste, mask, separator, status feedback |
| **Tag Input** | Tag/chip creator with Enter/comma, validation, maxTags, Backspace remove |
| **Validator** | Form validation message display |

### Feedback & Overlays
| Component | Description |
|-----------|-------------|
| **Alert** | Callout messages â€” 5 variants, dismissible |
| **Toast** | Notifications â€” 4 variants, positioned, with actions |
| **Modal / Dialog** | Dialog overlays using Angular CDK |
| **Sheet** | Slide-out panels from any side |
| **Drawer** | Bottom/side drawer panels |
| **Tooltip** | Hover/focus tooltips |
| **Dropdown Menu** | Context menus with items, separators, labels |
| **Command Palette** | Searchable command menu with groups, keyboard nav, service-based |
| **Popover** | Floating panel with trigger, positioning, click-outside, escape |

### Visual
| Component | Description |
|-----------|-------------|
| **Button** | 6 variants, 4 sizes, loading state, link mode |
| **Button Group** | Grouped actions, horizontal/vertical |
| **Loader** | Spinner, dots, and bars variants |
| **Skeleton** | Loading placeholders â€” line/circular/rounded |
| **Progress** | Linear progress bar |
| **Radial Progress** | Circular progress indicator |
| **Carousel** | Image/content slider |
| **Chat Bubble** | Message bubbles for chat UI |
| **Dock** | macOS-style dock with hover scaling |
| **FAB** | Floating action button |
| **Link** | Styled anchor with variants |

## Usage

```typescript
import { TonButtonDirective, TonCardDirective } from '@tony-ui/core';

@Component({
  imports: [TonButtonDirective, TonCardDirective],
  template: `
    <div tonCard padding="md">
      <h3>My Card</h3>
      <button tonBtn variant="default">Click me</button>
      <button tonBtn variant="outline">Cancel</button>
    </div>
  `,
})
export class MyComponent {}
```

## Theming

Three built-in themes: **light**, **dark**, **corporate**. Toggle at runtime:

```typescript
import { ThemeService } from '@tony-ui/core';

themeService = inject(ThemeService);
themeService.setTheme('dark');
```

CSS custom properties:

```css
--ton-background, --ton-foreground,
--ton-primary, --ton-primary-foreground,
--ton-secondary, --ton-secondary-foreground,
--ton-accent, --ton-accent-foreground,
--ton-muted, --ton-muted-foreground,
--ton-destructive, --ton-destructive-foreground,
--ton-border, --ton-ring, --ton-radius
```

## Links

- [Documentation](https://coci-dev.github.io/tony-ui/)
- [Live Demo](https://coci-dev.github.io/tony-ui-demo/)
- [GitHub](https://github.com/coci-dev/tony-ui)
- [npm](https://www.npmjs.com/package/@tony-ui/core)
- [Issues](https://github.com/coci-dev/tony-ui/issues)

## License

MIT
