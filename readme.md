Orbit
Real people. Right now. Right here.
Orbit is a real-time, location-based social discovery app for the people physically near you — at campuses, cafés, bars, and events. Not people you might meet someday, not people you crossed paths with hours ago. People near you, right now, who opted in to be found.
Think Bumble's intentionality meets Find My Friends' immediacy — but ephemeral, privacy-first, and built for the moment, not the profile.

Why Orbit is different
Most location-based social apps fall into one of two buckets:
Retrospective proximity (e.g. Happn) — shows you people you already crossed paths with, sometimes hours later, with no live presence.
Slow-burn presence (e.g. Mayb) — real-time, but built around 24-hour match windows, which loses the "act now" urgency of actually being somewhere together.
Orbit sits in the gap neither fills: live, ephemeral, dual-mode presence.


Happn
Mayb
theliveapp
Orbit
Real-time (not historical)
❌
✅
✅
✅
1v1 discovery
✅
✅
❌
✅
Venue-level group presence (Hubs)
❌
❌
✅
✅
Sub-5-min ephemeral requests
❌
❌ (24h)
❌
✅
Exact GPS never leaves device
❌
❌
❌
✅
Mutual-like instant chat bypass
❌
❌
❌
✅

Privacy isn't a settings-page footnote here — it's the headline. Your exact GPS never leaves your device. Only fuzzed coordinates (~20m grid) or neighborhood-level data (~500m grid) are ever published to Firestore.

Core concepts
Radar (1v1 discovery)
See nearby users on a live map within a ~5km listen radius (geohash 5-char prefix query, 7-char precision stored). Send a time-boxed Approach Request — a 5-minute fuse that either gets accepted, opening real-time chat, or silently expires. No awkward rejections, no lingering unanswered requests.
Hubs (venue group chat)
Join the shared chat for a specific venue — a bar, café, or event — and see who's actually there via live presence tracking, without needing to approach anyone 1:1.
Mutual Spark
Like someone (♡). If they like you back, skip the fuse entirely — instant chat, no waiting.
Safety & control
Ghost mode — instantly stop broadcasting location
Neighborhood mode — show ~500m area instead of precise-ish grid
Panic button (⚡) — instant ghost + leave all active Hubs
Block (bidirectional) and Report
Age gate — 18+ only

Tech stack (current: single-file web app)
Auth: Firebase Anonymous Auth — instant, no signup
Database: Firestore real-time sync
Map: Leaflet.js, dark-mode inverted tiles
Client: Vanilla JS (ES modules via Firebase CDN)
Styling: Tailwind CDN (light use) + custom CSS, glass-morphism UI
Hosting: Static HTML over HTTPS
Firestore collections
locations
profiles
requests
requests/{id}/messages
likes
blocks
reports
hubs/{id}/presence
hubs/{id}/messages

Privacy & geo model
Exact GPS never leaves the device
Published coordinates: ~20m grid (fuzzed) or ~500m grid (neighborhood mode)
Geohash: 7-char precision stored, 5-char prefix queried (~5km listen radius)
Location sync throttled to every 10s, dropped after 2 minutes of staleness

Feature checklist
[x] Anonymous auth + profile setup (name, photo URL, 2 prompts)
[x] Live location sync (10s throttle, 2-min staleness drop)
[x] Radar mode + Hub mode
[x] 5-minute fuse approach requests
[x] Real-time 1v1 chat + hub group chat
[x] Typing indicators (both sides)
[x] Ghost mode, Neighborhood mode, Panic button
[x] Block (bidirectional), Report, Age gate (18+)
[x] Distance in meters (haversine), "here X min" timer
[x] Mutual spark (instant chat, no fuse)
[x] Icebreaker prompt on chat open
[x] Haptic + sound on incoming approach
[x] Regulars tracking ("seen here 3x this week")
[x] Glass-morphism UI, micro-interactions, message animations

Known issues
Blocking (fix ready, not yet deployed to Firebase console):
No likes collection rule → likes silently fail
requests create rule only allows status: "pending" → spark requests fail
requests update rule only allows receiver → sender can't write typing state
Not yet fixed:
Demo peers (p1, p2, p3) still render alongside real users
profileCache is unbounded — no eviction policy
Firestore listeners aren't fully cleaned up on tab close
m.getElement() null risk at 2 call sites
Service worker is broken — currently unregistered on boot
Priority note: the demo-peer and Firestore rules issues should be fixed before any new feature work — a first-time user seeing fake profiles next to real ones undermines the "real people, right now" premise the whole product is built on.

Roadmap: React Native port (Expo)
Currently lives as a single Databricks notebook cell (~60KB) — functional but not sustainable. Actively porting to a proper Expo/React Native app.
Project structure
orbit-app/
├── App.js                          # Entry point (age gate + auth + navigation)
├── app.json                        # Expo configuration
├── package.json
├── src/
│   ├── config/
│   │   └── firebase.js             # Firebase init + exports
│   ├── utils/
│   │   ├── theme.js                # Colors, fonts, shared styles, constants
│   │   └── geo.js                  # Geohash, haversine, fuzzing, formatters
│   ├── hooks/
│   │   ├── useAuth.js              # Anonymous Firebase auth
│   │   ├── useLocation.js          # GPS tracking + Firestore publish
│   │   ├── useNearby.js            # Live nearby user listener
│   │   ├── useRequests.js          # Approach request send/receive/watch
│   │   ├── useBlocks.js            # Block + report
│   │   └── useLikes.js             # Mutual spark system
│   ├── screens/
│   │   ├── MapScreen.js            # Main map view (orchestrator)
│   │   └── ProfileSetupScreen.js   # Profile creation/editing
│   └── components/
│       ├── TopBar.js               # Brand + action buttons (panic, ghost, area, me)
│       ├── ModeSwitch.js           # Radar/Hub toggle pills
│       ├── ChatSheet.js            # 1v1 real-time chat
│       ├── ProfileSheet.js         # User profile viewer + actions
│       ├── HubSheet.js             # Venue group chat
│       ├── IncomingToast.js        # Incoming request notification
│       ├── IntentPicker.js         # "Here to..." selector
│       └── AvatarMarker.js         # Custom map marker
└── assets/
    ├── fonts/                      # Space Grotesk + Inter
    ├── icon.png
    └── splash.png

Migration map: web → native
Web (original)
React Native (this)
Leaflet.js
react-native-maps (Google)
DOM manipulation
React state + hooks
CSS custom properties
StyleSheet + COLORS constants
localStorage
AsyncStorage
navigator.vibrate()
expo-haptics
navigator.geolocation
expo-location
Firebase Web SDK
Firebase JS SDK (unchanged)
Bottom sheet (CSS)
@gorhom/bottom-sheet
AudioContext
expo-av

Setup
npx create-expo-app orbit-app --template blank
# copy source files into the directory structure above
npx expo install   # installs all dependencies from package.json
# add Google Maps API keys to app.json
# add fonts to assets/fonts/
npx expo start


Positioning, one line
Happn shows you people you already missed. Orbit shows you who's near you right now — without ever knowing your exact location.

Disclaimer
Orbit involves real-time location sharing and in-person meetups between strangers. Users must be 18+. Standard safety practices apply: never share personal information before meeting, meet in public places, use in-app chat before meeting in person, and report suspicious behavior immediately.


