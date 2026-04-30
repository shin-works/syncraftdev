# TimeSense Voice Pack Publishing

## Public path

Voice packs are served from:

- `https://syncraft.dev/timesense/voices/manifest.json`
- `https://syncraft.dev/timesense/voices/<lang>/core_v<version>.zip`

Local public directory:

- `/Users/user/dev/syncraftdev/public/timesense/voices/`

## Current pack

- `es/core_v1.zip`

## Build source

Voice pack zips are built from the app project with:

```bash
cd /Users/user/dev/timesense_ios
scripts/build_voice_pack.sh es 1
```

Default Spanish source directory:

- `/Users/user/dev/material/timesense_sound_es`

Default build output:

- `/tmp/timesense_voice_packs/es/core_v1.zip`

The build script prints the exact `size` and `sha256` values to copy into `manifest.json`.

## Publish flow

1. Build the pack from the app project.
2. Copy the generated zip into `public/timesense/voices/<lang>/`.
3. Update `public/timesense/voices/manifest.json`.
4. Commit and deploy `syncraftdev`.

## Notes

- Keep zip filenames versioned, for example `core_v1.zip`, `core_v2.zip`.
- Update `manifest.json` whenever any pack version changes.
- Keep `manifest.json` URLs aligned with the deployed domain.
- Bundled iOS notification `.caf` files are managed in the app project, not here.
