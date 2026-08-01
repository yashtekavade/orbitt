# Orbit

Real people. Right now. Right here.

**Live demo:** https://orbit-mvp-7e75b.web.app/

Orbit is a real-time, location-based social discovery app for people physically near you at campuses, cafes, bars, and events. Not people you might meet someday, and not people you crossed paths with hours ago. People near you, right now, who opted in to be found.

Think Bumble's intentionality meets Find My Friends' immediacy, but ephemeral, privacy-first, and built for the moment, not the profile.

## Why Orbit is different

Most location-based social apps fall into one of two buckets:

- Retrospective proximity, like Happn, shows people you already crossed paths with, sometimes hours later, with no live presence.
- Slow-burn presence, like Mayb, is real-time but built around 24-hour match windows, which loses the act-now urgency of actually being somewhere together.

Orbit sits in the gap neither fills: live, ephemeral, dual-mode presence.

| Feature | Happn | Mayb | theliveapp | Orbit |
| --- | --- | --- | --- | --- |
| Real-time, not historical | No | Yes | Yes | Yes |
| 1v1 discovery | Yes | Yes | No | Yes |
| Venue-level group presence (Hubs) | No | No | Yes | Yes |
| Sub-5-minute ephemeral requests | No | No (24h) | No | Yes |
| Exact GPS never leaves device | No | No | No | Yes |
| Mutual-like instant chat bypass | No | No | No | Yes |

Privacy is not a settings-page footnote here. It's the headline. Your exact GPS never leaves your device. Only fuzzed coordinates (about a 20m grid) or neighborhood-level data (about a 500m grid) are ever published to Firestore.

## Core Concepts

### Radar (1v1 discovery)

See nearby users on a live map within a ~5km listen radius, using a geohash 5-character prefix query with 7-character precision stored. Send a time-boxed Approach Request, a 5-minute fuse that either gets accepted, opening real-time chat, or silently expires. No awkward rejections, no lingering unanswered requests.

### Hubs (venue group chat)

Join the shared chat for a specific venue, like a bar, cafe, or event, and see who is actually there via live presence tracking without needing to approach anyone 1:1.

### Mutual Spark

Like someone. If they like you back, skip the fuse entirely and open instant chat with no waiting.

### Safety and control

- Ghost mode: instantly stop broadcasting location.
- Neighborhood mode: show a ~500m area instead of a more precise grid.
- Panic button: instant ghost plus leave all active Hubs.
- Block: bidirectional.
- Report.
- Age gate: 18+ only.

## Tech Stack

Current app shape: single-file web app.

- Auth: Firebase Anonymous Auth, instant and no signup.
- Database: Firestore real-time sync.
- Map: Leaflet.js with dark-mode inverted tiles.
- Client: Vanilla JS with ES modules via the Firebase CDN.
- Styling: Tailwind CDN for light use plus custom CSS and glass-morphism UI.
- Hosting: static HTML over HTTPS.

### Firestore collections

- locations
- profiles
- requests
- requests/{id}/messages
- likes
- blocks
- reports
- hubs/{id}/presence
- hubs/{id}/messages

## Privacy and Geo Model

- Exact GPS never leaves the device.
- Published coordinates are fuzzed to about a 20m grid, or about a 500m grid in neighborhood mode.
- Geohash uses 7-character precision stored and a 5-character prefix queried, which gives an approximately 5km listen radius.
- Location sync is throttled to every 10 seconds and dropped after 2 minutes of staleness.

## Feature Checklist

- [x] Anonymous auth plus profile setup with name, photo URL, and 2 prompts
- [x] Live location sync with 10-second throttle and 2-minute staleness drop
- [x] Radar mode and Hub mode
- [x] 5-minute fuse approach requests
- [x] Real-time 1v1 chat and hub group chat
- [x] Typing indicators on both sides
- [x] Ghost mode, Neighborhood mode, and Panic button
- [x] Block, Report, and Age gate (18+)
- [x] Distance in meters using haversine, plus a here X min timer
- [x] Mutual spark with instant chat and no fuse
- [x] Icebreaker prompt on chat open
- [x] Haptic and sound on incoming approach
- [x] Regulars tracking, such as seen here 3x this week
- [x] Glass-morphism UI, micro-interactions, and message animations

## Known Issues

### Blocking issues ready to fix, not yet deployed to Firebase console

- No likes collection rule, so likes silently fail.
- requests create rule only allows status: "pending", so spark requests fail.
- requests update rule only allows receiver writes, so sender typing state fails.

### Not yet fixed

- Demo peers p1, p2, and p3 still render alongside real users.
- profileCache is unbounded and has no eviction policy.
- Firestore listeners are not fully cleaned up on tab close.
- m.getElement() has a null risk at 2 call sites.
- Service worker is broken and currently unregistered on boot.

Priority note: the demo-peer and Firestore rules issues should be fixed before any new feature work. A first-time user seeing fake profiles next to real ones undermines the real people, right now premise the product is built on.

## Roadmap: React Native Port (Expo)

The app currently lives as a single Databricks notebook cell of about 60KB. It is functional but not sustainable, and is actively being ported to a proper Expo/React Native app.

### Project Structure

```text
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
│       ├── IntentPicker.js         # Here to... selector
│       └── AvatarMarker.js         # Custom map marker
└── assets/
    ├── fonts/                      # Space Grotesk + Inter
    ├── icon.png
    └── splash.png
```

### Migration Map: Web to Native

| Web (original) | React Native (this) |
| --- | --- |
| Leaflet.js | react-native-maps (Google) |
| DOM manipulation | React state and hooks |
| CSS custom properties | StyleSheet plus COLORS constants |
| localStorage | AsyncStorage |
| navigator.vibrate() | expo-haptics |
| navigator.geolocation | expo-location |
| Firebase Web SDK | Firebase JS SDK, unchanged |
| Bottom sheet (CSS) | @gorhom/bottom-sheet |
| AudioContext | expo-av |

## Setup

```bash
npx create-expo-app orbit-app --template blank
# copy source files into the directory structure above
npx expo install
# add Google Maps API keys to app.json
# add fonts to assets/fonts/
npx expo start
```

## Positioning

Happn shows you people you already missed. Orbit shows you who's near you right now without ever knowing your exact location.

## Disclaimer

Orbit involves real-time location sharing and in-person meetups between strangers. Users must be 18+. Standard safety practices apply: never share personal information before meeting, meet in public places, use in-app chat before meeting in person, and report suspicious behavior immediately.


