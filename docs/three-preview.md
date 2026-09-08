> Archived design experiment. Removed from the current website on 8 September 2026.

# Classic and 3D picnic views

Classic remains the default. Its PicnicBasket component and original image assets are unchanged.
The 3D view is a lazy-loaded, isolated component in src/components/three; it uses procedural
Three.js geometry for the basket, wicker strands, handle, pedestal, and nine stylized fruit models.
It is an exploratory sculpted style, not a photorealistic scan of the existing basket.

The two tabs share the current in-memory cart, quantities, personalization and checkout.
Selecting a tab does not clear the order. Reloading retains the app's existing reset behavior.
Both previews represent up to 12 items while totals use the full order.

Drag or use the rotation buttons; automatic rotation is opt-in. Wheel zoom is disabled so
normal page scrolling continues. Camera height is limited to useful viewing angles. Reduced
motion disables the fruit arrival animation. Offscreen and hidden-page rendering is skipped.
Renderer resolution is capped at 1.7x; geometries, materials, controls and the WebGL context
are disposed when leaving the tab. A WebGL failure presents a return-to-Classic button.

Validation: production build, desktop/mobile screenshots at 320/390/768/1440 widths,
30-item mixed basket, unchanged totals across repeated tab switching, drag and button
rotation, auto-rotation/reset, keyboard tab navigation, basket drawer, and simulated
WebGL context loss with Classic recovery. No physical-device GPU benchmarking performed.
The lazy 3D chunk adds approximately 142 KB gzipped when first opened.

Pre-change source and package files: .design-backup/pre-three/

References:
- https://threejs.org/docs/pages/WebGLRenderer.html
- https://threejs.org/docs/pages/OrbitControls.html
