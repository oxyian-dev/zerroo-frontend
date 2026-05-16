# Victory World Shop - Design System Specifications

## Overview
This document defines the comprehensive design system for the Victory World e-commerce platform, ensuring consistency, professionalism, and elite aesthetics across all components.

---

## 1. Color Palette

### Primary Colors
- **Gold Gradient**: `linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)`
- **Primary Gold**: `#efcb77`
- **Gold Hover**: `#f5dc97`
- **Gold Dark**: `#ddb45d`

### Background Colors
- **Primary Background**: `#020202`
- **Secondary Background**: `#050505`
- **Tertiary Background**: `#0a0a0a`
- **Card Background**: `linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))`

### Text Colors
- **Primary Text**: `white` / `rgba(255,255,255,1)`
- **Secondary Text**: `rgba(255,255,255,.82)`
- **Tertiary Text**: `rgba(255,255,255,.68)`
- **Muted Text**: `rgba(255,255,255,.62)`
- **Disabled Text**: `rgba(255,255,255,.4)`

### Border Colors
- **Primary Border**: `rgba(255,255,255,.08)`
- **Secondary Border**: `rgba(255,255,255,.1)`
- **Gold Border**: `rgba(221,180,93,.2)`
- **Gold Border Hover**: `rgba(221,180,93,.3)`

### Accent Colors
- **Error**: `#ff6b6b`
- **Success**: `#51cf66`
- **Warning**: `#ffa94d`
- **Info**: `#4dabf7`

---

## 2. Typography System

### Font Families
- **Primary**: System fonts stack (default MUI)
- **Headings**: Inherit with specific weights

### Font Sizes (Responsive)
```javascript
// Desktop (md and up)
h1: 'clamp(3.5rem, 7vw, 7rem)'      // 56-112px
h2: 'clamp(2.8rem, 5vw, 5rem)'      // 44.8-80px
h3: 'clamp(2rem, 4vw, 3.5rem)'      // 32-56px
h4: '2.5rem'                         // 40px
h5: '1.5rem'                         // 24px
subtitle1: '1.05rem'                 // 16.8px
body1: '1rem'                        // 16px
caption: '0.78rem'                   // 12.48px

// Mobile (xs)
h1: 'clamp(2.5rem, 10vw, 3.5rem)'   // 40-56px
h2: 'clamp(2rem, 8vw, 2.8rem)'      // 32-44.8px
h3: 'clamp(1.5rem, 6vw, 2rem)'      // 24-32px
h4: '1.8rem'                         // 28.8px
h5: '1.2rem'                         // 19.2px
subtitle1: '1rem'                    // 16px
body1: '0.95rem'                     // 15.2px
caption: '0.7rem'                    // 11.2px
```

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 600
- **Bold**: 700
- **Extra Bold**: 800
- **Black**: 900

### Line Heights
- **Tight**: 0.95 - 1.1 (for large headings)
- **Normal**: 1.2 - 1.4 (for subheadings)
- **Relaxed**: 1.8 - 2.1 (for body text)

### Letter Spacing
- **Ultra Wide**: `0.45em` (labels, small caps)
- **Wide**: `0.22em` (buttons, CTAs)
- **Medium**: `0.16em` - `0.2em` (navigation)
- **Tight**: `-0.05em` to `-0.02em` (large headings)

---

## 3. Spacing System (8px Base)

### Base Unit: 8px

### Spacing Scale
```javascript
0: 0px
0.5: 4px
1: 8px
1.5: 12px
2: 16px
2.5: 20px
3: 24px
4: 32px
5: 40px
6: 48px
7: 56px
8: 64px
10: 80px
12: 96px
14: 112px
16: 128px
20: 160px
24: 192px
```

### Component Spacing
- **Section Padding (Desktop)**: `py: '190px'` (152px)
- **Section Padding (Mobile)**: `py: '100px'` (80px)
- **Container Padding (Desktop)**: `px: '80px'`
- **Container Padding (Mobile)**: `px: '24px'`
- **Card Padding (Desktop)**: `p: '60px'` - `p: '72px'`
- **Card Padding (Mobile)**: `p: '40px'` - `p: '48px'`
- **Grid Spacing (Desktop)**: `spacing: 4` (32px)
- **Grid Spacing (Mobile)**: `spacing: 3` (24px)

---

## 4. Layout & Grid System

### Container
- **Max Width**: `1440px`
- **Padding**: Desktop `80px`, Mobile `24px`

### Grid Breakpoints (MUI Default)
- **xs**: 0px (mobile)
- **sm**: 600px (tablet)
- **md**: 900px (small desktop)
- **lg**: 1200px (desktop)
- **xl**: 1536px (large desktop)

### Common Grid Patterns
```javascript
// Two Column
<Grid container spacing={4}>
  <Grid item xs={12} md={6}>...</Grid>
  <Grid item xs={12} md={6}>...</Grid>
</Grid>

// Three Column
<Grid container spacing={4}>
  <Grid item xs={12} md={4}>...</Grid>
  <Grid item xs={12} md={4}>...</Grid>
  <Grid item xs={12} md={4}>...</Grid>
</Grid>

// Sidebar Layout
<Grid container spacing={4}>
  <Grid item xs={12} md={3}>...</Grid>  // Sidebar
  <Grid item xs={12} md={9}>...</Grid>  // Main
</Grid>

// Product Grid
<Grid container spacing={{ md: 4, xs: 3 }}>
  <Grid item xs={6} md={3}>...</Grid>  // 4 columns desktop, 2 mobile
</Grid>
```

---

## 5. Component Specifications

### Buttons

#### Primary Button (Gold)
```javascript
sx={{
  background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
  color: '#000',
  padding: { md: '18px 42px', xs: '16px 36px' },
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  fontSize: { md: '0.78rem', xs: '0.72rem' },
  fontWeight: 700,
  boxShadow: '0 15px 35px rgba(221,180,93,.15)',
  transition: 'all 0.4s ease',
  borderRadius: 0,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 50px rgba(221,180,93,.22)'
  }
}}
```

#### Secondary Button (Outline)
```javascript
sx={{
  border: '1px solid rgba(255,255,255,.15)',
  color: 'white',
  padding: { md: '18px 42px', xs: '16px 36px' },
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontSize: { md: '0.78rem', xs: '0.72rem' },
  fontWeight: 600,
  transition: 'all 0.35s ease',
  borderRadius: 0,
  '&:hover': {
    borderColor: '#ddb45d',
    color: '#ddb45d',
    background: 'transparent'
  }
}}
```

### Cards

#### Product Card
```javascript
sx={{
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '4px',
  overflow: 'hidden',
  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    borderColor: 'rgba(221,180,93,.3)',
    boxShadow: '0 30px 70px rgba(0,0,0,.5)'
  }
}}
```

#### Feature Card
```javascript
sx={{
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  minHeight: { md: '400px', xs: '340px' },
  p: { md: '60px', xs: '40px' },
  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  borderRadius: '2px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(221,180,93,.16), transparent 70%)',
    transition: 'all 0.45s ease'
  },
  '&:hover': {
    transform: 'translateY(-12px)',
    borderColor: 'rgba(221,180,93,.3)',
    boxShadow: '0 30px 70px rgba(0,0,0,.5)'
  }
}}
```

### Navigation

#### Header (Fixed)
```javascript
sx={{
  height: '110px',
  borderBottom: '1px solid rgba(255,255,255,.08)',
  background: 'rgba(0,0,0,.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)'
}}
```

#### Mobile Header
```javascript
sx={{
  borderBottom: '1px solid rgba(255,255,255,.08)',
  background: 'rgba(0,0,0,.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)'
}}
```

---

## 6. Animation & Transitions

### Standard Transitions
- **Fast**: `0.3s ease`
- **Medium**: `0.35s ease` - `0.4s ease`
- **Slow**: `0.45s ease` - `0.6s ease`
- **Cubic Bezier**: `cubic-bezier(0.4, 0, 0.2, 1)`

### Hover Effects
```javascript
// Card Lift
'&:hover': {
  transform: 'translateY(-12px)',
  boxShadow: '0 30px 70px rgba(0,0,0,.5)'
}

// Button Lift
'&:hover': {
  transform: 'translateY(-5px)',
  boxShadow: '0 20px 50px rgba(221,180,93,.22)'
}

// Image Scale
'&:hover img': {
  transform: 'scale(1.05)',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
}
```

---

## 7. Shadows & Elevation

### Shadow Scale
```javascript
// Subtle
boxShadow: '0 2px 8px rgba(0,0,0,.32)'

// Medium
boxShadow: '0 15px 35px rgba(221,180,93,.15)'

// Strong
boxShadow: '0 20px 50px rgba(221,180,93,.22)'

// Extra Strong
boxShadow: '0 30px 70px rgba(0,0,0,.5)'

// Glow
boxShadow: '0 0 20px rgba(221,180,93,.5)'
```

---

## 8. Responsive Breakpoint Strategy

### Mobile First Approach
Always define mobile styles first, then override for larger screens:

```javascript
sx={{
  fontSize: '1rem',           // Mobile default
  md: { fontSize: '1.05rem' } // Desktop override
}}
```

### Common Responsive Patterns
```javascript
// Padding
py: { md: '190px', xs: '100px' }
px: { md: '80px', xs: '24px' }

// Spacing
spacing: { md: 4, xs: 3 }

// Grid
xs={12} md={6}  // Full width mobile, half desktop

// Typography
fontSize: { md: '1.05rem', xs: '1rem' }
```

---

## 9. Accessibility Guidelines

### Color Contrast
- Ensure minimum 4.5:1 contrast ratio for normal text
- Ensure minimum 3:1 contrast ratio for large text (18pt+)
- Gold on black: ✓ Passes WCAG AA
- White on black: ✓ Passes WCAG AAA

### Focus States
```javascript
'&:focus-visible': {
  outline: '2px solid #efcb77',
  outlineOffset: '2px'
}
```

### Interactive Elements
- Minimum touch target: 44x44px (mobile)
- Minimum click target: 24x24px (desktop)
- Clear hover states for all interactive elements

---

## 10. Image Guidelines

### Aspect Ratios
- **Hero Images**: 16:9 or 21:9
- **Product Images**: 1:1 (square)
- **Feature Images**: 4:3 or 16:9
- **Logo**: Maintain original aspect ratio

### Optimization
- Use WebP format when possible
- Implement lazy loading
- Provide responsive image sizes
- Maximum file size: 200KB for hero, 100KB for products

---

## 11. Loading States

### Skeleton Loaders
```javascript
<Skeleton 
  variant="rectangular" 
  width="100%" 
  height="250px"
  sx={{ 
    bgcolor: 'rgba(255,255,255,.1)',
    borderRadius: '4px'
  }}
/>
```

### Spinner
```javascript
<CircularProgress 
  sx={{ 
    color: '#efcb77' 
  }} 
/>
```

---

## 12. Form Elements

### Text Fields
```javascript
<TextField
  fullWidth
  sx={{
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255,255,255,.15)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255,255,255,.3)'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#efcb77'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,.68)'
    }
  }}
/>
```

---

## Implementation Checklist

- [ ] Apply consistent spacing system (8px base)
- [ ] Implement responsive typography scale
- [ ] Use standardized color palette
- [ ] Apply consistent hover effects
- [ ] Ensure proper contrast ratios
- [ ] Implement loading states
- [ ] Add focus states for accessibility
- [ ] Optimize images
- [ ] Test across all breakpoints
- [ ] Validate with design system

---

**Last Updated**: 2026-05-16
**Version**: 1.0.0