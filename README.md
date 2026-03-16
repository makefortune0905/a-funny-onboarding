# Coze Onboarding Demo

This is an extracted demo of the Coze Onboarding Flow (Logo Click Flow).
It includes the username input step and the "mini UI" carousel for new features.

## Project Structure

- `src/components/OnboardingFlow.tsx`: The main component containing the onboarding logic and slide rendering.
- `src/constants.ts`: Configuration for the onboarding slides content.
- `src/App.tsx`: Entry point that renders the sidebar and triggers the onboarding flow.
- `src/index.css`: Global styles (Tailwind CSS v4).

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## For Designers

You can modify the styles in:
- `src/index.css`: For global colors and theme variables.
- `src/components/OnboardingFlow.tsx`: For layout and specific component styles (using Tailwind classes).
- `src/constants.ts`: To change the text content of the slides.
