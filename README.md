# SECAS Story Map

[https://secassoutheast.org/story-map](https://secassoutheast.org/story-map)

This interactive story map highlights several conservation projects that fall under the Southeast Conservation Adaptation Strategy (SECAS).

## Technical architecture

This project uses [Svelte](https://svelte.dev/) for the user interface, which is
built as a static web application where web assets are built in advance in a
dedicated build step.

This uses [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) for the map
engine.

## Content architecture

Each project is organized into a dedicated folder within `src/projects`. Within
each project folder, there are 2 required files:

- `project.md`: project [markdown](https://www.markdownguide.org/) file
- `banner.jpg`: project photo that is 900 px wide and less than 640 px tall

Each project requires ONE of two optional approaches for providing boundary information:

- `boundary.geojson`: project boundary polygon(s) in GeoJSON geometry format
- list of `boundary_ids` and bounding box in markdown frontmatter (described below)

The name of the project's folder is used to create a unique identifier for the
project. The name must be URL friendly.

### Project markdown file

The project markdown file is composed of 2 parts: frontmatter with project metadata
and the body of the markdown document, which is used as the project's description.

The frontmatter is composed of the following sections:

```markdown
---
title: '<project title, in quotes>'
latitude: <project representative point latitude>
longitude: <project representative point longitude>
boundary_ids: <optional: array of boundary IDs in quoted array, e.g., ["AL", "NC", "secas"] >
bounds: <optional: array of bounds in [xmin, ymin, xmax, ymax] order>
date: <project date>
location: '<location description used for internal data tracking, in quotes>'
photo_caption: '<photo caption text, in quotes; see format below>'
photo_url: '<optional: photo URL, in quotes>'
---
```

The photo caption follows this general convention, and must include the words
"Photo: " preceding the text that will be linked by `photo_url`:

```
"<text description of photo>. Photo: <photo source name or copyright holder and any notes about license / use with permission>."
```

If the project boundary is based on one or more boundaries in the tileset, those
can be referenced directly by providing those Ids in a list. For example:

```markdown
boundary_ids: ["AL", "MS"]
```

In this case, omit the `boundary.json` file.

When providing a list of `boundary_ids`, the `bounds` entry is required in the
frontmatter in order for the map to zoom to the extent of that project.

NOTE: this is intended for projects that are the full extent of states or
pre-tiled boundaries; it is not intended to represent projects that have smaller
boundaries _within_ those states.

Available boundary IDs in the tileset include:

- `secas`: the outer SECAS analysis boundary
- states by 2-letter abbreviation, e.g., `NC`
- other boundaries specifically added to the tileset, e.g., `military`

### Project photo

The banner photo should be resized before committing to the repository, with a
width of 900 px. After resizing, use [tinyjpg](https://tinyjpg.com/) to shrink
the JPG file further before adding to the repository; this will reduce the file
size by 10-15%.

### Project boundary (OPTIONAL)

This file can be omitted if using `boundary_ids` to refer to one or more features
in the tileset. Steps for creating the boundary tileset are described in
[analysis/prep/README.md](analysis/prep/README.md).

The project boundary polygon(s) should be simplified to the degree possible
using [mapshaper](https://mapshaper.org/). Use mapshaper to specify the
coordinate precision of 5 decimal places on output
(enter `precision=0.00001 geojson-type=GeometryCollection` in
the options input field):

It should then be exported to GeoJSON geometry format (for a single geometry):

```json
{
    "type": "Polygon",
    "coordinates": [...]
}
```

The `GeometryCollection` exported by mapshaper is also file.

If necessary, the boundary can be drawn by hand using [geojson.io](https://geojson.io/),
and then manually copy the `geometry` element.

## Development environment

### NodeJS

This project requires the NodeJS version specified in `.nvmrc`. For convenience,
NodeJS can be managed using [nvm](https://github.com/nvm-sh/nvm). Install `nvm`
and then run:

```bash
nvm install
nvm use
```

To activate that version of NodeJS each time you open this project, use

```bash
nvm use
```

### Python / Tippecanoe

Python and [tippecanoe](https://github.com/felt/tippecanoe) are used for
processing GIS data into map tiles in [PMTiles](https://docs.protomaps.com/pmtiles/)
format so they can be used directly in frontend without requiring a tile server.

It is only necessary to do this if the SECAS boundary or state boundaries change.

Install [uv](https://github.com/astral-sh/uv). Then set up a new virtual
environment:

```bash
uv venv .venv --python=3.12
```

Activate it for your shell, e.g., Fish:

```bash
source .venv/bin/activate.fish
```

Then install the dependencies specified in `pyproject.toml` (and frozen in `uv.lock`):

```bash
uv sync --frozen
```

See [analysis/prep/README.md](./analysis/prep/README.md) for more information.

### Environment variables

Create `.env.development` file with the following entry:

```bash
PUBLIC_MAPBOX_TOKEN=<mapbox token>
```

In a production environment, this also needs the following entries:

```bash
PUBLIC_SENTRY_DSN=<sentry DSN created for project at https://sentry.io>
PUBLIC_GOOGLE_ANALYTICS_ID=<google analytics ID>
```

## Credits

This project was originally created by U.S. Fish and Wildlife Service staff:

- [Roy Hewitt](https://github.com/rhewitt22)
- [Hilary Morris](https://github.com/HLCMorris)

This project was completely rebuilt using Svelte in 2025 by
[Astute Spruce, LLC](https://astutespruce.com/) under a cooperative agreement
from U.S. Fish and Wildlife Service.

## License

See [LICENSE](./LICENSE).
