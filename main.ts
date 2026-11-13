// A working news-image-01 entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The image is a newspaper front page for Friday 13 November 2026:
// a masthead plus four captioned photographs summing up the day's world news — tankers hit in the Strait of
// Hormuz and Iran's radar claim, Nvidia CEO Jensen Huang's resignation, Europe joining the Ukraine peace talks,
// and the worldwide Microsoft 365 outage. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024
// pixels; this file is a JPEG (302,306 bytes, 1024x1024) in a file named entry.png, which the rules allow
// ("told apart by its first bytes; the name stays entry.png either way").
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
