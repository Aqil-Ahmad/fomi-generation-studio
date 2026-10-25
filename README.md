# Fomi Generation Studio

The Fomi home page: describe an image or video, generate it, and start from ready-made templates. It follows the current fomi.art layout, with the hero collage, the prompt bar and the template gallery, and adds a working generation flow on top of a mocked API.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Stack

- Next.js 16 (App Router) with React 19 and the React Compiler, JavaScript only
- Tailwind CSS v4; colours are CSS variables so light and dark themes share one set of utilities
- CSS Modules for the hero collage, template cards, header progress and carousel sizing, where plain CSS reads better than long class lists
- `next-themes` for the theme switch without a flash, `motion` for menu and toast transitions, `lucide-react` for icons
- Poppins through `next/font/google`

## How it's organised

```
src/
  app/                  the page, global styles and the mock API
    api/generate/       starts a job
    api/jobs/[jobId]/   reports job progress and results
  components/
    layout/             header, footer, mobile nav, theme toggle
    home/               hero collage and video cards
    create/             prompt bar, results, placeholders and the viewer
    templates/          template gallery, cards and carousel
    ui/                 Button, IconButton, Segmented, Menu, Tooltip, Toast, Kbd
  hooks/                generation jobs, scroll progress
  lib/                  options, media lookup, job simulation, API client
  data/                 media catalogue, hero layout, templates
public/media/           images, videos and posters
```

The page is a server component. Only the parts with state or browser APIs are client components: the prompt bar, results, carousels, video cards and theme toggle.

## Generation flow

1. The prompt bar keeps the text in its own state, so typing doesn't re-render the results.
2. Generate (or Cmd/Ctrl+Enter) posts the prompt and settings to `/api/generate` and gets a job id back.
3. The client polls `/api/jobs/[jobId]` every 500 ms. Placeholders show progress, and results fade in one at a time as the job returns them.
4. Finished creations and favourites are saved in local storage, so they're still there after a reload.

Each result can be favourited, downloaded, have its prompt copied, or be reused in the prompt bar. Clicking a result opens a viewer; arrow keys move between results and Esc closes it.

The URL can preset the bar: `?mode=video` switches to video, and `?template=relight` fills in a template's prompt. That's how the nav icons and template cards link into the bar.

## Mock API

| Method | Route | Returns |
| --- | --- | --- |
| POST | `/api/generate` | `{ jobId }` after validating prompt, mode, count, ratio and model |
| GET | `/api/jobs/[jobId]` | `{ status, progress, results }` where status is `queued`, `running`, `done` or `failed` |

**Stateless jobs.** Serverless instances don't share memory, so the job id is base64 JSON holding the request and its start time. The jobs route works out progress from the elapsed time and picks results from the media catalogue using a seed, so the same id always gives the same answer.

**Error state.** Add `?fail=generate` to the page URL and the next job fails part way, showing the error with Try again.

## Screen sizes

- **Phones:** the header keeps the logo, theme toggle and Try now; the main nav moves to a bottom bar. The hero collage becomes a swipeable row so the prompt bar stays close. The prompt bar wraps its controls and pins above the bottom bar. Results show in two columns.
- **Tablets:** the icon nav returns to the header. The collage stays a swipeable row, with larger cards.
- **1024 px and up:** the floating collage from the live site, placed in proportion to its layout. Results show four per row.
- **Large screens:** content is capped at 1680 px so lines and the prompt bar don't stretch.

## Accessibility

- Skip link, landmarks and a single `h1`
- Every control is a real button or link with a visible focus ring; icon buttons have labels and tooltips
- Selected states use `aria-pressed`; menus support arrow keys, Home, End and Esc
- Result actions show on hover and keyboard focus, and stay visible on touch screens
- Generation progress and errors are announced in a polite live region
- The viewer is a native `dialog`, so focus is trapped and returns afterwards
- Motion is reduced or removed with `prefers-reduced-motion`; hero video only autoplays when motion is allowed, and pauses off screen

Filled buttons use a deeper terracotta (`#b05f49`) than the live site's salmon so white text passes AA. The lighter salmon stays for selected chips, which use dark text.

## Lighthouse

Run against `npm run start`:

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 99 | 100 | 100 | 100 |
| Mobile | 86 | 100 | 100 | 100 |

CLS is 0 on both. Mobile LCP is about 4.2 s on Lighthouse's throttled profile; the largest element is the first hero card.

## Media

- Images from Unsplash: the anime figure by Jiří Navrátil, the pixel portrait by Vadim Bogulov, and four Unsplash+ photos (Mount Fuji, painted hills, river maze, clay character). The Unsplash+ files are previews and need an Unsplash+ licence before any public use.
- Videos from Pexels.
- Images were converted to WebP with tiny blur placeholders. Videos were cut to 6–8 seconds at 720p without audio, about 2 MB each, with WebP posters.

## Branches

- `main` is production
- `dev` collects finished features
- Each feature is built on its own branch and merged into `dev` through a pull request
