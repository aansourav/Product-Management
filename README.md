# Product Management App

A modern, full-featured product management application built with Next.js 15, React 19, Redux Toolkit, and Tailwind CSS.

## 🚀 Live Demo

**Live URL:** [Add your deployment URL here]  
**GitHub Repository:** [Add your repository URL here]

## ✨ Features

### Core Functionality

- ✅ **Authentication** - Email-based JWT authentication with session persistence
- ✅ **Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Real-time Search** - Debounced search functionality for instant results
- ✅ **Pagination** - Efficient client-side pagination
- ✅ **Category Filtering** - Filter products by category
- ✅ **Image Management** - Support for multiple product images (1-5 per product)
- ✅ **Cache Management** - Intelligent data caching with auto-invalidation

### UI/UX Excellence

- 🎨 **Modern Design** - Clean, professional interface with consistent styling
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Framer Motion for delightful micro-interactions
- 🔄 **Loading States** - Skeleton screens and loading indicators
- ⚠️ **Error Handling** - Comprehensive error states with user-friendly messages
- 🎯 **Form Validation** - Real-time validation with inline error messages
- 🎭 **Confirmation Dialogs** - Safe delete operations with confirmation
- 🍞 **Toast Notifications** - User feedback for all actions

## 🛠️ Tech Stack

- **Framework:** Next.js 15.2.4 (App Router)
- **UI Library:** React 19
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4.1.14
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Forms:** Formik + Yup
- **Type Safety:** TypeScript
- **Analytics:** Vercel Analytics

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or yarn or pnpm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [your-repository-url]
cd product-management-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.bitechx.com
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login

Enter your email address to authenticate and access the dashboard.

## 📁 Project Structure

```
product-management-app/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard pages
│   │   ├── products/           # Product CRUD pages
│   │   │   ├── [slug]/        # Dynamic product routes
│   │   │   │   ├── edit/      # Edit product page
│   │   │   │   └── page.tsx   # Product details page
│   │   │   ├── new/           # Create product page
│   │   │   └── layout.tsx     # Products layout
│   │   ├── page.tsx           # Products list page
│   │   └── layout.tsx         # Dashboard layout
│   ├── login/                  # Login page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/                 # React components
│   ├── auth/                  # Authentication components
│   ├── dashboard/             # Dashboard components
│   ├── products/              # Product-related components
│   ├── ui/                    # Reusable UI components
│   └── common/                # Common components
├── lib/                       # Utilities and configuration
│   ├── api/                   # API client
│   ├── store/                 # Redux store
│   │   └── slices/           # Redux slices
│   ├── types/                # TypeScript types
│   ├── providers/            # React providers
│   └── utils.ts              # Utility functions
├── hooks/                     # Custom React hooks
└── public/                    # Static assets
```

## 🎯 Key Features Explained

### Authentication System

- JWT-based authentication
- Secure token storage in Redux + localStorage
- Automatic session restoration
- Protected routes with AuthGuard
- Logout functionality

### Product Management

**List View:**

- Grid layout with responsive columns
- Search by product name (debounced, 400ms)
- Filter by category
- Pagination controls
- Delete with confirmation

**Create/Edit:**

- Single form component for both operations
- Comprehensive validation:
  - Name: 3-100 characters, required
  - Description: 10-1000 characters, required
  - Price: Positive number, min $0.01, max $999,999.99
  - Category: Required selection
  - Images: 1-5 images required
- Real-time inline validation
- Image URL validation

**Details View:**

- Full product information
- Image gallery with thumbnails
- Category badge
- Formatted price (USD)
- Created/Updated dates
- Quick actions (Edit, Delete)

### State Management

**Redux Slices:**

- `auth-slice` - Authentication state
- `products-slice` - Products CRUD operations
- `categories-slice` - Categories management

**Caching Strategy:**

- Products: 5-minute cache
- Categories: 10-minute cache
- Auto-invalidation on create/update/delete

### API Integration

**Endpoints Used:**

- `POST /auth` - Authentication
- `GET /products` - Fetch products with pagination
- `GET /products/search?searchedText=...` - Search products
- `GET /products/:slug` - Get product by slug
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /categories` - Fetch categories

## 🎨 Design System

### Color Palette

Using OKLCH color space for consistent, perceptually uniform colors:

- Primary: Dark neutral (oklch(0.25 0 0))
- Secondary: Light neutral (oklch(0.96 0 0))
- Destructive: Red-orange (oklch(0.55 0.22 25))
- Muted: Light gray (oklch(0.96 0 0))

### Typography

- Font: Geist Sans & Geist Mono
- Clear hierarchy with semantic headings
- Readable body text with balanced line height

### Spacing

- Consistent spacing scale
- Mobile-first responsive design
- Proper touch targets for mobile

## 🧪 Form Validation Rules

### Product Form Validations:

| Field           | Validation Rules                                               |
| --------------- | -------------------------------------------------------------- |
| **Name**        | Required, 3-100 chars, trimmed                                 |
| **Description** | Required, 10-1000 chars, trimmed                               |
| **Price**       | Required, positive, min $0.01, max $999,999.99, 2 decimals max |
| **Category**    | Required, valid category ID                                    |
| **Images**      | Required, 1-5 images, valid URLs                               |

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (2 columns)
- **Tablet:** 640px - 1024px (adaptive layout)
- **Desktop:** > 1024px (3-4 columns)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
# Or using Vercel CLI
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project

```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ Data caching for reduced API calls
- ✅ Debounced search to minimize requests
- ✅ Skeleton screens for better perceived performance
- ✅ Lazy loading of components
- ✅ Optimized bundle size

## 🔐 Security Features

- JWT token authentication
- Secure token storage
- Protected API routes
- Client-side route protection
- Input validation and sanitization

## 🐛 Known Issues / Future Improvements

- [ ] Add server-side pagination for better performance at scale
- [ ] Implement file upload for product images
- [ ] Add advanced filtering (price range, sorting)
- [ ] Add unit and E2E tests
- [ ] Implement dark mode toggle
- [ ] Add accessibility improvements (WCAG 2.1 AA)
- [ ] Add analytics dashboard
- [ ] Implement bulk operations

## 📄 License

This project is part of a job application assignment.

## 👤 Author

**Your Name**

- Email: [Your email used in job application]
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Vercel](https://vercel.com/) for hosting and analytics

---

**Built with ❤️ using Next.js**
