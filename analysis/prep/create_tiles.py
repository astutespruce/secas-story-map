from pathlib import Path
import subprocess

import geopandas as gp

data_dir = Path("data")
tmp_dir = Path("/tmp")
out_dir = Path("static")

MINZOOM = 0
MAXZOOM = 8
SECAS_STATES = [
    "AL",
    "AR",
    "FL",
    "GA",
    "KY",
    "LA",
    "MS",
    "MO",
    "MS",
    "NC",
    "OK",
    "PR",
    "SC",
    "TN",
    "TX",
    "VA",
    "VI",
    "WV",
]

tilesets = []

### Create tiles for SECAS boundary
df = gp.read_file(
    data_dir / "boundaries/se_boundary.fgb", columns=["geometry"], engine="pyogrio"
).to_crs("EPSG:4326")

infilename = tmp_dir / "se_boundary.fgb"
df.to_file(infilename)
outfilename = tmp_dir / "boundary.mbtiles"
tilesets.append(outfilename)
ret = subprocess.run(
    ["tippecanoe", "-f", "-pg"]
    + ["-l", "boundary"]
    + ["-Z", str(MINZOOM), "-z", str(MAXZOOM)]
    + ["-o", f"{str(outfilename)}", str(infilename)]
)
ret.check_returncode()

### Create tiles for SECAS states
df = gp.read_file(
    data_dir / "boundaries/states.fgb", columns=["id", "geometry"]
).to_crs("EPSG:4326")
df = df.loc[df.id.isin(SECAS_STATES)]

infilename = tmp_dir / "states.fgb"
df.to_file(infilename)
outfilename = tmp_dir / "states.mbtiles"
tilesets.append(outfilename)
ret = subprocess.run(
    ["tippecanoe", "-f", "-pg", "--hilbert"]
    + ["-l", "states"]
    + ["-Z", str(MINZOOM), "-z", str(MAXZOOM)]
    + ["-o", f"{str(outfilename)}", str(infilename)]
)
ret.check_returncode()


### Join tiles
outfilename = out_dir / "tiles.pmtiles"
ret = subprocess.run(
    ["tile-join", "-f", "-pg", "-o", f"{str(outfilename)}"] + [str(t) for t in tilesets]
)
ret.check_returncode()
