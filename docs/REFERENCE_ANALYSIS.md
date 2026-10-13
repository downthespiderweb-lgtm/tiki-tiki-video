# Reference Video — Visual Analysis & How It Was Adapted

**Reference:** "The Café Menu" (YouTube `rV50wqPQgFo`), the downloaded file provided with the task
(`videoplayback_2.mp4`, 39.8 s, 640×360, 30 fps, AAC audio).

**How it was analyzed:** frames were extracted with ffmpeg at 1 fps (contact sheet), full-resolution
stills at key moments (0:01, 0:08, 0:09.5, 0:12, 0:33) and 8 fps strips across two transitions
(0:03.6–0:04.8 and 0:14.4–0:15.6). The reference's audio was **not** reused; only its loudness was
measured. No café branding, wording, menu items or exact compositions were copied.

## What the reference does

| Element | Observation |
|---|---|
| Sequence | Brand title (full-bleed interior photo) → "Welcome to Our Café" split screen → Hot Beverages → Cold Beverages → Breakfast → Lunch & Main Dishes → Pastries & Snacks → Special Combos → "Thank You" closing over a full-bleed photo |
| Palette | Warm cream/ivory panels, near-black charcoal panels, muted amber/gold accents and thin gold rules, warm wood/greenery in the photography |
| Typography | Script first word + roman serif second word ("*Hot* Beverages", "*Special* Combos"); small spaced caps taglines separated by dots ("RICH FLAVORS · PERFECTLY BREWED"); serif menu items with dotted leaders to the price and italic descriptions underneath |
| Layout | Horizontal cream/charcoal splits with an amber band under each heading; photography in rounded "squircle" frames with a thin cream border; large curved arc boundaries between photo and panel; combo cards with rounded tops and dark pill price badges; icon row with tiny caps labels |
| Motion | A large translucent circular mask sweeps across between sections; panels and photos cross-fade; gentle image scaling |
| Weakness | Long dense menu lists in small type — not suitable for a visual sales pitch |

## How Tiki Tiki adapts it (original work)

| Reference trait | Tiki Tiki adaptation |
|---|---|
| Cream / charcoal / gold | Cream paper texture, charcoal & **deep forest green** slate panels, **restrained gold** for rules, edges and accents only |
| Café warmth | Tropical coastal identity: warm teak wood, palms and monstera greenery, ocean blue and a restrained sunset |
| Script + serif headings | Great Vibes script (short words only: "Our", "Signature", "Sweet") + Playfair Display serif; Inter for labels, figures and prices |
| Amber tagline band | Used sparingly (2–4 words) on appetizers, seafood, grill, desserts, cocktails and the team impact line |
| Dotted-leader menu rows | Used for the seafood and grill mains only — 5 large, readable lines with the active item highlighted as it is narrated |
| Squircle photo frames | Every food/drink visual sits in a rounded frame with a thin ivory border and soft shadow |
| Curved arc boundaries | `ArcPanel` component: curved (or diagonal) cream / forest / charcoal panels with a gold edge line that draws on |
| Combo cards with pill prices | Dessert arch cards with dark pill prices |
| Circular mask sweeps | Custom transitions: large circle reveal for each new topic, sweeping curve (huge-radius circle) within topics, diagonal wipe into the strategy/cost slides — all gold-edged, 20 frames, eased |
| Dense lists | Replaced with large imagery, one item highlighted at a time, animated charts, and narration carrying the detail |

Full-bleed opening and closing scenes use an original illustrated dusk view of the venue (string
lights, thatched tiki bar, ocean, palms) with a slow cinematic zoom, mirroring the reference's
full-bleed photographic bookends.
