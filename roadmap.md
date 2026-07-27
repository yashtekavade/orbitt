Orbit — Roadmap (0 → 100)
A living checklist. We tick items line by line and amend as new ideas land. Last updated: current session.

What Orbit is (the one-liner)
A live map for meeting people who are physically near you right now — at campuses, cafes, tea/cigarette-break spots, bars, clubs. Intent is open (friends, coffee, dating — the two people decide), signalled per session. Two modes: Radar (1v1 discovery) and Hubs (place-based group chat).
Standout feature: presence at hotspots. Not "match with someone across the city" — "see who's open, here, now."

✅ DONE — the working MVP (~45/100)
[x] Anonymous auth (Firebase) — instant, no signup wall
[x] Live location sync (geohash + fuzzed coords, stale-drop)
[x] Safety-first location model (exact GPS never leaves device)
[x] The 5-minute fuse (create → ping → accept / silent-expire), cross-device
[x] Real-time 1v1 chat (accept → straight into conversation)
[x] Ghost mode (stop broadcasting)
[x] Feature A: "set my area" / neighbourhood mode (coarse, honest location)
[x] Deployed to live HTTPS URL (works on real phones)
[x] Security rules locked down (write only your own data) + verified
[x] Profiles: name, photo URL, 2 prompts
[x] Per-session intent (Friends / Coffee / Dating / Open) on the broadcast
[x] Real profiles shown on dot-tap
[x] HTML-escaping on user text (basic injection safety)

🔜 NEXT — make it real-feeling (→ ~60/100)
Safe to build and test with a friend or two. Not strangers yet.
[ ] Redeploy with profiles + add profiles/ security rule (immediate)
[ ] Profile polish: validate/handle broken photo URLs gracefully
[ ] Hub mode made real (right now Hubs are simulated): real venue pins, real "here now" counts, real per-venue chat rooms
[ ] Distance/proximity filtering: only load nearby users via geohash-prefix query (also protects free-tier quota)
[ ] PWA install: manifest + service worker → "Add to Home Screen" (needed for the QR-code launch plan)
[ ] Empty-state / onboarding copy so a first user isn't staring at a blank map

🚧 THE GATE — "safe to share with strangers"
Do not send the link to anyone you don't personally trust until everything in this section is done. Open-intent + real-time location means mismatched expectations can become real-world harm. This is non-negotiable.
[ ] Block — make another user disappear from your map + chats, permanently
[ ] Report — flag a user/message, with the report stored for review
[ ] Rate-limit approach requests (stop one person spamming)
[ ] Basic chat safeguards (length caps, escaping ✅ done, profanity/again-flagging TBD)
[ ] Minimum-age gate + clear safety guidance shown on first run
[ ] "How to stay safe meeting someone" screen (meet in public, tell a friend, etc.)
[ ] Fast "go invisible" / panic-hide that's one tap from anywhere

🌍 AFTER THE GATE — the real test (→ ~75/100)
[ ] One-hotspot launch: ONE bar or campus spot, ONE evening, ~20 real people. Not "Pune" — one place, one night.
[ ] QR codes at that one spot
[ ] Watch the one metric that matters: do people actually send approach requests?
[ ] Collect feedback from those first real users
[ ] Decide based on data: does the core mechanic work before building more?

🏗️ SURVIVE USERS (→ ~85/100)
Only worth doing once the one-hotspot test says people want this.
[ ] Real photo uploads (Firebase Storage + resize + rules)
[ ] Move off Firestore free tier OR aggressive throttling (real density blows past 50k reads/day fast)
[ ] TTL / auto-cleanup of stale requests & location docs
[ ] Push notifications (approach received, while app closed) — a proximity app nobody gets notified by is dead
[ ] Robust error handling: GPS denied, offline, mid-chat disconnect
[ ] Account recovery / phone-number upgrade path (so a ban sticks, so accounts survive)

🚀 SCALE (→ 100/100)
[ ] Expand hotspot-by-hotspot (never "a city" — always the next single spot)
[ ] Moderation tooling / review queue for reports
[ ] Analytics on what makes a hotspot "light up" vs stay dead
[ ] Retention loops (why does someone open it a second night?)
[ ] Only now: think about a second city

💡 IDEA PARKING LOT
New ideas land here first, then get slotted into the roadmap.
Activity counts ("12 active in Bandra today") as an honest alternative to fake density
Free-text status line as an optional 2nd intent field (needs moderation)
"Notify me when someone's around" signal for quiet maps
(add as we go…)

🧭 GUIDING PRINCIPLES (don't lose these)
Honest presence only — never fake dots / fake density. Real users, honestly shown.
The gate is sacred — no strangers before block/report.
Prove cheap before building expensive — validate the mechanic before the polish.
Hyper-local always — density comes from shrinking the arena, not faking the crowd.
Test-as-you-go — every change ends at something testable on two devices.

