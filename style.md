/* light */
@theme light {
  /* Backgrounds */
  --color-surface: oklch(0.98 0 0); /* White background for light theme */
  --color-muted-light-gray: oklch(
    0.95 0.01 250
  ); /* Subtle light gray background */

  /* Text */
  --color-text: oklch(0.18 0 0); /* Primary text: black */
  --color-subtle-text-gray: oklch(
    0.45 0 0
  ); /* Subtle/secondary text: medium gray */

  /* Primary Brand */
  --color-primary-emerald: oklch(
    0.72 0.18 164
  ); /* Emerald green for primary brand color */
  --color-primary-hover-emerald: oklch(
    0.62 0.15 164
  ); /* Slightly darker emerald for hover */

  /* Status Colors */
  --color-success-green: oklch(0.7 0.15 140); /* Success state: green */
  --color-error-red: oklch(0.7 0.2 27); /* Error state: red */
  --color-warning-yellow: oklch(0.88 0.2 85); /* Warning state: yellow */
  --color-info-blue: oklch(0.75 0.18 235); /* Info state: blue */
}

/* dark */
@theme dark {
  /* Backgrounds */
  --color-surface: oklch(0.15 0 0); /* Near black background for dark theme */
  --color-muted-dark-gray: oklch(
    0.25 0.01 250
  ); /* Muted/dark gray background */

  /* Text */
  --color-text: oklch(0.98 0 0); /* White text */
  --color-subtle-text-light-gray: oklch(0.7 0 0); /* Subtle light gray text */

  /* Primary Brand */
  --color-primary-emerald: oklch(
    0.82 0.15 164
  ); /* Slightly brighter emerald on dark background */
  --color-primary-hover-emerald: oklch(
    0.9 0.1 164
  ); /* Hover state for dark theme */

  /* Status Colors */
  --color-success-green: oklch(
    0.85 0.14 140
  ); /* Brighter green for dark background */
  --color-error-red: oklch(0.88 0.18 27); /* Brighter red */
  --color-warning-yellow: oklch(0.9 0.18 85); /* Bright warning yellow */
  --color-info-blue: oklch(0.88 0.15 235); /* Brighter blue */
}