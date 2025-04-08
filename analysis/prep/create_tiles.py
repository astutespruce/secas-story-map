from pathlib import Path
import subprocess

import geopandas as gp

data_dir = Path("data")
tmp_dir = Path("/tmp")
out_dir = Path("static")

minzoom = 0
maxzoom = 8

# reproject to WGS84
df = gp.read_file(
    data_dir / "boundaries/se_boundary.fgb", columns=["geometry"], engine="pyogrio"
).to_crs("EPSG:4326")

infilename = tmp_dir / "se_boundary.fgb"
df.to_file(infilename)

outfilename = out_dir / "tiles.pmtiles"
ret = subprocess.run(
    ["tippecanoe", "-f", "-pg", "--hilbert", "-ai", "--drop-smallest-as-needed"]
    + ["-l", "boundary"]
    + ["-Z", str(minzoom), "-z", str(maxzoom)]
    + ["-o", f"{str(outfilename)}", str(infilename)]
)
ret.check_returncode()
