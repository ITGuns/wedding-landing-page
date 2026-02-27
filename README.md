# First Light Studios - 3D Landing Page

This is a premium, 3D-animated landing page for First Light Studios, built with React, Three.js (React Three Fiber), and Tailwind CSS.

## Getting Started

1.  **Install Dependencies** (if not already done):
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Customization

### Assets
Place your unexpected assets in the `public/` directory:
-   `public/intro.mp4`: The main hero video loop.
-   `public/logo.png`: The studio logo.
-   Add more images/videos as needed.

### Content
-   Update text and links in `src/App.tsx`.
-   Modify 3D scenes in `src/components/3d/HeroCanvas.tsx`.
-   Adjust colors and fonts in `tailwind.config.js`.

### Technologies Used
-   **Vite**: Fast build tool.
-   **React**: UI library.
-   **React Three Fiber (R3F)**: 3D rendering.
-   **Framer Motion**: high-performance animations.
-   **Tailwind CSS**: Utility-first styling.
-   **Lucide React**: Icons.
