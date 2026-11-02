# Egutegie

A personal calendar with a Basque interface (western Bizkaian). Month, week, day and agenda views, custom event types, rolling cycles, read-only layers from other apps, email reminders and calendar export. Single page on Firebase, built for one user.

## Contents

- [Features](#features)
- [How it is built](#how-it-is-built)
- [Rolling cycles](#rolling-cycles)
- [Running your own copy](#running-your-own-copy)
- [Security](#security)

## Features

- Month, week, day and agenda views, with custom event types.
- Rolling cycles, such as a workout rotation or a shift pattern, projected into the future.
- Read-only layers that show data from two sibling apps, [Ascension System](https://github.com/josu-bayer/ascension-system) and [Sutelagun](https://github.com/josu-bayer/sutelagun), and from a Google Calendar.
- Email reminders and a daily digest sent from a small Google Apps Script. The script is not part of this repository.
- Export to `.ics`.
- Offline use with sync on reconnect.

## How it is built

- A single `index.html` of vanilla JavaScript. No framework, no build step.
- Firebase Cloud Firestore and Hosting on the free plan.
- The other apps are read through the Firestore REST interface, so the layers need no extra backend.
- A network-first service worker, a web manifest and icons.

## Rolling cycles

A cycle is an ordered list of day types and a cursor that says where today falls in it. Future days are projected from the cursor, so the calendar can show what is due without anything having been logged yet.

## Running your own copy

This repository ships with placeholder settings, so it needs your own project.

1. Create a Firebase project and enable Cloud Firestore.
2. Replace the `YOUR_...` values in the `firebaseConfig` object in `index.html`.
3. For the app layers, set the project ids and the user id in the adapter blocks, or switch the layers off in the settings.
4. Run `firebase use --add`, then `firebase deploy`.

## Security

`firestore.rules` allows access without sign-in, as in the original single-user deployment. It is not suitable for a public address with real data. Add Firebase Authentication and owner-only rules first.

## Licence

MIT. See [LICENSE](LICENSE).
