# Development environment and technical details

## Technical architecture

This project uses [Svelte](https://svelte.dev/) for the user interface, which is
built as a static web application where web assets are built in advance in a
dedicated build step.

This uses [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) for the map
engine.

## Local development environment

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

## Production environment

The website is hosted using Github. It uses Github actions to run the build step
to transform the Svelte application into static web assets (HTML / CSS /
Javascript / etc) that are then hosted by Github.

To configure the production environment:

- Enable actions: Go to `https://github.com/<organization>/<repository>/settings/actions` and choose "Allow all actions and reusable workflows" at the top
- Enable build from Github actions: Go to `https://github.com/<organization>/<repository>/settings/pages` and choose "Github Actions" in the dropdown for Source under "Build and deployment"
- Edit or enable github pages environment and source branches for build: Go to `https://github.com/<organization>/<repository>/settings/environments` and select the `github-pages` environment if it exists, or create a new environment with that name. Then in the "Deployment branches and tags" section, use the "Add deployment branch or tag rule" button to add `master` and any other branches that are allowed to publish changes to the website
- Set repository secrets: Go to `https://github.com/<organization>/<repository>/settings/secrets/actions` and add the following entries and their values in the "Repository secrets" section:
-   - `PUBLIC_MAPBOX_TOKEN`
-   - `PUBLIC_SENTRY_DSN`
-   - `PUBLIC_GOOGLE_ANALYTICS_ID`

- Set website deploy path: Go to `https://github.com/<organization>/<repository>/settings/variables/actions` and add the following entry in the "Repository variables" section:
-   - `DEPLOY_PATH`: `/story-map`

Github is configured to deploy from the `master` branch. This setting is controlled
in `.github/workflows/build.yml`.

After pushing changes to the `master` branch, you can watch the Actions workflows
at `https://github.com/<organization>/<repository>/actions` to determine if the
build is in progress, succeeded, or failed.
