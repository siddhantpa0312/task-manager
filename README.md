# Project 10: My Task Manager

Custom Task Manager for ISM 3232 Module 10, built with Next.js App Router, React, and Tailwind CSS.

## Setup Instructions

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open:
   - [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run test` - run spec-based unit tests
- `npm run test:watch` - run tests in watch mode

## Design Decisions

- Direction: dark productivity theme with high contrast and compact controls.
- Palette: slate background with cyan accent for primary actions.
- Typography and spacing: larger heading hierarchy and card-style grouping for quick scanning.
- Layout change: segmented filter control + stats/action panel instead of a plain top button row.

## AI Usage Log
- Asked AI for test-case ideas mapped to each required feature; adapted them into component tests.
- Asked AI to review comment quality for why-focused explanations, then rewrote comments in my own words.

## Notes

- Component files include header comments and key logic comments that explain why each pattern is used.
- If you see a hydration mismatch mentioning extra attributes on `<html>` (for example `data-processed-*`), test in Incognito or with extensions disabled first. Some browser extensions mutate the DOM before React hydrates and can trigger this warning even when app code is correct.
