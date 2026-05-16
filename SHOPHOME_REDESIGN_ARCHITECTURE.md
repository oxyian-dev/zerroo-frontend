# ShopHome.js Elite Redesign Architecture

## Executive Summary

This document provides a comprehensive, implementation-ready architecture for redesigning [`ShopHome.js`](src/shop/ShopHome.js:1) with the elite luxury design system from [`sample_code.html`](sample_code.html:1). The redesign maintains all existing functionality while elevating the visual experience to match premium luxury standards.

---

## 1. Design System Foundation

### 1.1 Color Palette

```javascript
// Theme extension for theme.js
const eliteColors = {
  elite: {
    bg: '#020202',           // Main background
    bgSoft: '#090909',       // Soft background
    bgCard: '#101010',       // Card background
    
    // 7-stop gold gradient system
    gold1: '#fff3cf',        // Lightest gold
    gold2: '#f5dc97',        // Light gold
    gold3: '#ddb45d',        // Medium gold
    gold4: '#b47c2a',        // Rich gold
    gold5: '#6e4514',        // Deep gold
    
    text: '#ffffff',         // Primary text
    muted: '#b7b7b7',        // Muted text
    line: 'rgba(255,255,255,.08)', // Divider lines
    
    // Gold gradient (7-stop)
    goldGradient: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
  }
}
```

### 1.2 Typography System

```javascript
// Montserrat font weights: 300, 400, 500, 600, 700, 800, 900
const eliteTypography = {
  // Elite Label - Uppercase section labels
  eliteLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.45em',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#efcb77',
    marginBottom: '28px',
  },
  
  // Elite Heading - Main hero headings
  eliteHeading: {
    fontSize: 'clamp(3.2rem, 7vw, 7rem)',
    lineHeight: 0.95,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.05em',
  },
  
  // Elite Heading Medium - Section headings
  eliteHeadingMedium: {
    fontSize: 'clamp(2.4rem, 5vw, 5rem)',
    lineHeight: 1,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '-0.04em',
  },
  
  // Elite Paragraph - Body text
  eliteParagraph: {
    color: 'rgba(255,255,255,.68)',
    lineHeight: 2.1,
    fontSize: '1.05rem',
  },
}
```

### 1.3 Spacing System

```javascript
const eliteSpacing = {
  sectionVertical: '190px',      // Vertical section padding
  sectionVerticalMobile: '80px', // Mobile section padding
  containerHorizontal: '80px',   // Container horizontal padding
  containerHorizontalMobile: '24px', // Mobile container padding
  cardPadding: '60px',           // Card internal padding
  cardPaddingMobile: '32px',     // Mobile card padding
}
```

### 1.4 Effects & Shadows

```javascript
const eliteEffects = {
  // Glassmorphism
  glassmorphism: {
    background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
    border: '1px solid rgba(255,255,255,.08)',
    backdropFilter: 'blur(10px)',
  },
  
  // Card hover lift
  cardHover: {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.2)',
    boxShadow: '0 25px 60px rgba(0,0,0,.45)',
    transition: '0.45s ease',
  },
  
  // Gold button shadow
  goldButtonShadow: '0 15px 35px rgba(221,180,93,.15)',
  goldButtonHoverShadow: '0 20px 50px rgba(221,180,93,.22)',
}
```

---

## 2. Component Architecture

### 2.1 Component Hierarchy

```
ShopHome (Main Container)
├── HeroSection
│   ├── HeroBackground (gradient overlay)
│   ├── HeroContent
│   │   ├── EliteLabel
│   │   ├── EliteHeading
│   │   ├── EliteParagraph
│   │   └── CTAButtons (gold gradient buttons)
│   └── HeroImage (positioned absolutely)
│
├── CategorySection
│   ├── CategoryGrid
│   │   └── CategoryCard[] (glassmorphism cards)
│   └── SubcategoryExpansion (animated expand/collapse)
│
├── TeamSection
│   ├── SectionLabel
│   ├── TeamGrid
│   │   └── TeamMemberCard[]
│   │       ├── MemberImage (with gold border)
│   │       ├── MemberName (elite typography)
│   │       ├── MemberTitle
│   │       └── LinkedInButton (gold hover)
│   └── OurStoryCard (glassmorphism)
│
├── VisionMissionSection
│   ├── VisionCard (glassmorphism with gold accent)
│   └── MissionCard (glassmorphism with gold accent)
│
├── FeaturedProductsSection
│   ├── SectionHeading (gold gradient text)
│   └── ProductCarousel
│       └── ProductCard[] (hover lift effect)
│
├── OpportunitySection
│   ├── OpportunityGrid
│   │   └── OpportunityCard[]
│   │       ├── IconContainer (gold border)
│   │       └── CardContent
│   └── OpportunityImage
│
├── EmpowermentBanner (full-width gold gradient)
│
└── WhyChooseSection
    ├── SectionHeading
    └── FeatureGrid
        └── FeatureCard[]
            ├── FeatureIcon (alternating layout)
            └── FeatureContent
```

### 2.2 New Reusable Components

Create these new components in `src/shop/components/elite/`:

1. **EliteContainer.js** - Custom container with elite spacing
2. **EliteCard.js** - Glassmorphism card with hover effects
3. **EliteButton.js** - Gold gradient button with lift animation
4. **EliteHeading.js** - Typography component with gold gradient option
5. **EliteLabel.js** - Uppercase label with gold color
6. **GoldGradientText.js** - Text with gold gradient clip

---

## 3. Section-by-Section Specifications

### 3.1 Hero Section

**Layout:**
- Full viewport height with gradient overlay
- Two-column grid on desktop (content left, image right)
- Single column on mobile (stacked)
- Absolute positioned background image at bottom

**Styling:**
```javascript
{
  background: 'linear-gradient(180deg, #A4574F 0%, #C37256 100%)',
  minHeight: { md: 'calc(100vh - 101px)', xs: '70vh' },
  maxHeight: { md: 'calc(100vh - 50px)', xs: '50vh' },
  position: 'relative',
  overflow: 'hidden',
  paddingTop: { md: '80px', xs: '60px' },
  paddingBottom: { md: '100px', xs: '80px' },
}
```

**Content Structure:**
- Elite label: "ZERROO FASHION REVOLUTION"
- Elite heading: "Where Fashion Meets Opportunity" (clamp sizing)
- Elite paragraph: Subtitle text with 68% opacity
- CTA buttons: Gold gradient primary, outline secondary
- Background image: Positioned absolute at bottom, full width

**Responsive Behavior:**
- Desktop: 2-column grid with 120px gap
- Tablet: Single column, reduced spacing
- Mobile: Stacked layout, smaller typography

---

### 3.2 Category Section

**Layout:**
- Grid layout: 3 columns desktop, 2 columns mobile
- Glassmorphism cards with hover lift
- Expandable subcategory section below

**Card Styling:**
```javascript
{
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.45s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.2)',
    boxShadow: '0 25px 60px rgba(0,0,0,.45)',
  }
}
```

**Interaction:**
- Click to expand subcategories
- Smooth height animation (0.4s ease)
- Gold accent on active category
- Subcategories appear in grid below

**Subcategory Expansion:**
```javascript
{
  maxHeight: activeCategoryId ? '2000px' : '0',
  opacity: activeCategoryId ? 1 : 0,
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  marginTop: activeCategoryId ? '60px' : '0',
}
```

---

### 3.3 Team Section

**Layout:**
- 3-column grid on desktop
- Single column on mobile
- Centered "Our Story" card below team members

**Team Card Styling:**
```javascript
{
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  padding: { md: '40px', xs: '24px' },
  borderRadius: '8px',
  transition: 'all 0.45s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.2)',
  }
}
```

**Image Treatment:**
- Gold gradient border (2px)
- Subtle drop shadow
- Border radius: 8px
- Aspect ratio: 1:1

**LinkedIn Button:**
```javascript
{
  color: '#ddb45d',
  transition: '0.3s ease',
  '&:hover': {
    color: '#f5dc97',
    transform: 'scale(1.1)',
  }
}
```

---

### 3.4 Vision/Mission Section

**Layout:**
- 2-column grid (equal width)
- Single column on mobile
- Cards with equal height

**Card Styling:**
```javascript
{
  background: 'linear-gradient(180deg, #EC2A7A 0%, #861854 100%)',
  padding: { md: '80px', xs: '40px' },
  borderRadius: '8px',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  
  // Gold glow effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(221,180,93,.16), transparent 70%)',
  }
}
```

---

### 3.5 Featured Products Section

**Background:**
```javascript
{
  background: 'linear-gradient(180deg, #EC2A7A 0%, #861854 100%)',
  padding: { md: '120px 0', xs: '60px 0' },
}
```

**Product Card:**
```javascript
{
  minWidth: '300px',
  background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
  border: '1px solid rgba(255,255,255,.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.45s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.2)',
    boxShadow: '0 25px 60px rgba(0,0,0,.45)',
  }
}
```

---

### 3.6 Opportunity Section

**Section Heading:**
```javascript
{
  fontSize: 'clamp(2.4rem, 5vw, 5rem)',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '-0.04em',
  background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
  marginBottom: { md: '60px', xs: '40px' },
}
```

---

### 3.7 Empowerment Banner

**Styling:**
```javascript
{
  background: 'linear-gradient(90deg, #E62977 0%, #53112B 100%)',
  padding: { md: '120px 0', xs: '60px 0' },
  
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
    fontWeight: 800,
    color: 'white',
    textAlign: 'center',
    lineHeight: 1.4,
    maxWidth: '1200px',
    margin: '0 auto',
  }
}
```

---

### 3.8 Why Choose Section

**Feature Card:**
```javascript
{
  display: 'grid',
  gridTemplateColumns: { md: '1fr 2fr', xs: '1fr' },
  gap: { md: '40px', xs: '24px' },
  alignItems: 'center',
  
  // Alternating layout on desktop
  '&:nth-of-type(even)': {
    gridTemplateColumns: { md: '2fr 1fr', xs: '1fr' },
    '& .icon': { order: { md: 2, xs: 1 } },
    '& .content': { order: { md: 1, xs: 2 } },
  }
}
```

---

## 4. Responsive Breakpoints

### 4.1 Breakpoint System

```javascript
const breakpoints = {
  xs: 0,      // Mobile
  sm: 600,    // Small tablet
  md: 960,    // Tablet
  lg: 1280,   // Desktop
  xl: 1920,   // Large desktop
}
```

### 4.2 Responsive Patterns

**Container Padding:**
- Desktop (md+): 80px horizontal
- Mobile (xs-sm): 24px horizontal

**Section Spacing:**
- Desktop (md+): 190px vertical
- Mobile (xs-sm): 80px vertical

**Grid Columns:**
- Categories: 3 cols (md+), 2 cols (xs-sm)
- Team: 3 cols (md+), 1 col (xs-sm)
- Vision/Mission: 2 cols (md+), 1 col (xs-sm)
- Opportunity: 2 cols (md+), 1 col (xs-sm)
- Why Choose: 2 cols (md+), 1 col (xs-sm)

**Typography Scaling:**
- Use clamp() for fluid typography
- Elite heading: clamp(3.2rem, 7vw, 7rem)
- Elite heading medium: clamp(2.4rem, 5vw, 5rem)
- Section headings: clamp(1.8rem, 4vw, 3.5rem)

---

## 5. Animation & Interaction Patterns

### 5.1 Hover Animations

**Card Lift Effect:**
```javascript
{
  transition: 'all 0.45s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(221,180,93,.2)',
    boxShadow: '0 25px 60px rgba(0,0,0,.45)',
  }
}
```

**Button Hover:**
```javascript
{
  transition: '0.4s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 50px rgba(221,180,93,.22)',
  }
}
```

### 5.2 Expand/Collapse Animation

**Subcategory Expansion:**
```javascript
{
  maxHeight: isExpanded ? '2000px' : '0',
  opacity: isExpanded ? 1 : 0,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  marginTop: isExpanded ? '60px' : '0',
}
```

---

## 6. Material-UI Component Mapping

### 6.1 Core Components

- **Box** → Container, layout wrapper
- **Container** → Elite container with custom max-width (1440px)
- **Grid** → Layout system for multi-column layouts
- **Card** → Glassmorphism cards with hover effects
- **Typography** → All text elements with elite variants
- **Button** → CTA buttons (gold gradient, outline)
- **IconButton** → LinkedIn buttons, icon actions
- **Stack** → Horizontal/vertical spacing
- **CardActionArea** → Clickable cards
- **CardMedia** → Product images, team photos
- **CardContent** → Card text content

### 6.2 Custom Theme Extensions

Add to [`theme.js`](src/themes/theme.js:1):

```javascript
components: {
  MuiTypography: {
    variants: [
      {
        props: { variant: 'eliteLabel' },
        style: {
          textTransform: 'uppercase',
          letterSpacing: '0.45em',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#efcb77',
        }
      },
      {
        props: { variant: 'eliteHeading' },
        style: {
          fontSize: 'clamp(3.2rem, 7vw, 7rem)',
          lineHeight: 0.95,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.05em',
        }
      },
      {
        props: { variant: 'eliteHeadingMedium' },
        style: {
          fontSize: 'clamp(2.4rem, 5vw, 5rem)',
          lineHeight: 1,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
        }
      },
      {
        props: { variant: 'eliteParagraph' },
        style: {
          color: 'rgba(255,255,255,.68)',
          lineHeight: 2.1,
          fontSize: '1.05rem',
        }
      }
    ]
  }
}
```

---

## 7. Integration Points for Existing Functionality

### 7.1 API Calls (Preserve Exactly)

**Categories API:**
```javascript
fetcher('/api/ui/nav/categories')
  .then(r => r.json())
  .then(({ categories }) => {
    setCategories(categories)
  })
```

**Cart Count API:**
```javascript
if (isLoggedIn()) {
  fetcher('/api/carts/count')
    .then(r => r.json())
    .then(({ count }) => {
      setLayout({ ...layout, cart_count: count })
    })
}
```

**Featured Products API:**
```javascript
fetcher('/api/ui/featured')
  .then(r => r.json())
  .then(({ featured }) => {
    // Deduplicate logic
    setFeatured(finalListing)
  })
```

### 7.2 State Management (Preserve)

```javascript
const [layout, setLayout] = useState({ title: '', back: '' })
const [categories, setCategories] = useState([])
const [dropdown, setDropdown] = useState({})
const [activeCategoryId, setActiveCategoryId] = useState(null)
const [featured, setFeatured] = useState([])
```

### 7.3 Event Handlers (Preserve)

```javascript
const handleParentClick = (id) => {
  setActiveCategoryId((prevId) => (prevId === id ? null : id));
};
```

### 7.4 Authentication Logic (Preserve)

```javascript
// Check login status
if (isLoggedIn()) {
  // Fetch from API
} else {
  // Get from localStorage
}

// Conditional rendering
{isLoggedIn() ? "Goto Dashboard" : "Login"}
to={isLoggedIn() ? (isOrgUser() ? "/admin" : "/dashboard") : "/login"}
```

### 7.5 Routing (Preserve)

```javascript
// Category links
to={`/c/${id}/${href(category)}`}

// Product links
to={`/p/${id}/${href(category)}/${href(title)}`}

// External links
href="https://surveyheart.com/form/..."
href="https://top-earners.zerroo.in/"
```

---

## 8. Implementation Strategy

### 8.1 Phase 1: Theme Extension

1. Update [`theme.js`](src/themes/theme.js:1) with elite color palette and typography variants
2. Update [`global.css`](src/global.css:1) with gold gradient utilities
3. Add custom component overrides

### 8.2 Phase 2: Create Reusable Components

Create in `src/shop/components/elite/`:
1. EliteContainer.js
2. EliteCard.js
3. EliteButton.js
4. EliteHeading.js
5. GoldGradientText.js

### 8.3 Phase 3: Redesign Sections

Redesign each section sequentially:
1. Hero Section
2. Category Section
3. Team Section
4. Vision/Mission Section
5. Featured Products Section
6. Opportunity Section
7. Empowerment Banner
8. Why Choose Section

### 8.4 Phase 4: Testing & Refinement

1. Responsive testing (all breakpoints)
2. Performance testing (API calls, animations)
3. Cross-browser testing
4. Accessibility testing

---

## 9. File Structure

```
src/
├── shop/
│   ├── ShopHome.js (main file to redesign)
│   └── components/
│       └── elite/
│           ├── EliteContainer.js
│           ├── EliteCard.js
│           ├── EliteButton.js
│           ├── EliteHeading.js
│           └── GoldGradientText.js
├── themes/
│   └── theme.js (extend with elite design system)
└── global.css (add elite utilities)
```

---

## 10. Code Examples

### 10.1 Elite Container Component

```javascript
// src/shop/components/elite/EliteContainer.js
import { Container } from '@mui/material';

const EliteContainer = ({ children, ...props }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1440px',
        px: { md: '80px', xs: '24px' },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default EliteContainer;
```

### 10.2 Elite Card Component

```javascript
// src/shop/components/elite/EliteCard.js
import { Card } from '@mui/material';

const EliteCard = ({ children, hover = true, ...props }) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))',
        border: '1px solid rgba(255,255,255,.08)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        transition: 'all 0.45s ease',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: 'rgba(221,180,93,.2)',
            boxShadow: '0 25px 60px rgba(0,0,0,.45)',
          }
        }),
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default EliteCard;
```

### 10.3 Gold Gradient Text Component

```javascript
// src/shop/components/elite/GoldGradientText.js
import { Typography } from '@mui/material';

const GoldGradientText = ({ children, variant = 'h1', ...props }) => {
  return (
    <Typography
      variant={variant}
      sx={{
        background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default GoldGradientText;
```

### 10.4 Elite Button Component

```javascript
// src/shop/components/elite/EliteButton.js
import { Button } from '@mui/material';

const EliteButton = ({ children, variant = 'gold', ...props }) => {
  const goldStyle = {
    background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
    color: '#000',
    padding: '18px 42px',
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
    fontSize: '0.78rem',
    fontWeight: 700,
    boxShadow: '0 15px 35px rgba(221,180,93,.15)',
    transition: '0.4s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 50px rgba(221,180,93,.22)',
      background: 'linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)',
    }
  };

  return (
    <Button
      sx={variant === 'gold' ? goldStyle : props.sx}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EliteButton;
```

---

## 11. Success Metrics

**Visual Quality:**
- ✓ Matches sample_code.html design system
- ✓ Consistent spacing throughout
- ✓ Smooth animations (60fps)
- ✓ Professional luxury aesthetic

**Functionality:**
- ✓ All API calls working
- ✓ Category expand/collapse working
- ✓ Product carousel scrolling
- ✓ Authentication logic intact
- ✓ All links functional

**Performance:**
- ✓ Lighthouse score 90+
- ✓ First Contentful Paint < 1.5s
- ✓ Time to Interactive < 3s

**Responsive:**
- ✓ Works on all breakpoints
- ✓ Touch-friendly on mobile
- ✓ Readable typography at all sizes

---

## 12. Next Steps

1. **Review this architecture plan** with stakeholders
2. **Get approval** for the design direction
3. **Switch to Code mode** to implement the redesign
4. **Follow the implementation strategy** (Phase 1-4)
5. **Test thoroughly** at each phase
6. **Deploy** after final approval

---

## Appendix: Quick Reference

### Color Variables
```css
--elite-bg: #020202
--elite-gold-gradient: linear-gradient(135deg, #fff7dc 0%, #f9e7b4 12%, #efcb77 26%, #d69d45 45%, #9f6720 58%, #f2d38d 78%, #fff4d0 100%)
```

### Typography Classes
- `eliteLabel` - 0.78rem / 700 / uppercase / 0.45em spacing
- `eliteHeading` - clamp(3.2rem, 7vw, 7rem) / 900 / uppercase
- `eliteHeadingMedium` - clamp(2.4rem, 5vw, 5rem) / 800 / uppercase
- `eliteParagraph` - 1.05rem / 2.1 line-height / 68% opacity

### Spacing Scale
- Section vertical: 190px (desktop), 80px (mobile)
- Container horizontal: 80px (desktop), 24px (mobile)
- Card padding: 60px (desktop), 32px (mobile)

### Animation Timings
- Card hover: 0.45s ease
- Button hover: 0.4s ease
- Expand/collapse: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Icon scale: 0.3s ease