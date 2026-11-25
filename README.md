# The Day in One Image — Tuesday 24 November 2026

A make.fun [news-image-20261124](https://make.fun/bounty/news-image-20261124) entry: the whole
of one day's world news, summed up as a single broadsheet front page in one 1024×1024 image.

![make.fun bounty](https://make.fun/badge/news-image-20261124.svg)
![rank](https://make.fun/badge/news-image-20261124/jhw1106/day-in-one-image-1124/rank.svg)
![reward](https://make.fun/badge/news-image-20261124/jhw1106/day-in-one-image-1124/reward.svg)

## What the image shows

**Lead — Zaporizhzhia hit overnight.** Russian forces struck an apartment block in
Zaporizhzhia overnight, killing 2 people and wounding 40, among them 4 children, regional
governor Mykhailo Semikin said. The illustration is a night-time apartment block, its
middle section shattered and burning under searchlights.

**Russia · Ukraine.** Putin told Kremlin officials Kyiv ignored Trump's direct plea to stop
hitting refineries and vowed retaliation; Ukrainian drone strikes have cut Russian refining
output 45% since late October. The EU will halt Russian LNG imports from 1 January.

**Ukraine · Libya.** Foreign minister Sybiha insisted the weekend attack on Russian ships in
Libyan waters was lawful self-defence under Article 51 of the UN Charter; Zelenskyy
confirmed Ukraine also hit the cargo ship Sparta II in the Gulf of Finland, saying it
carried weapons.

**South Korea.** Several Russian aircraft entered South Korea's air defence identification
zone near Ulleung island; fighters scrambled. An emergency alert that first blamed a
suspected North Korean plane was corrected about 40 minutes later: Seoul's military said
the jets did not violate Korean airspace. The fourth such entry this year.

**Iran · Washington.** Vice-President Vance and Secretary Rubio met Qatar's prime minister,
Sheikh Mohammed bin Abdulrahman Al Thani, separately at the White House on Monday. NBC
reports Trump officials are discussing targeting senior Iranian leaders to press Tehran to
end the war; critics warn it could harden the regime and wreck talks.

**Ticker (Also Today).** Nvidia −5.86% to $155.38, about $240bn wiped, after Monday's 31.5%
surge; S&P −0.50%, Nasdaq −1.48% · a Gaza strike kills Hamas security chief Naeem Abu
Nahel and six others · NATO's Rutte vows to defend space amid reports of a Russian
nuclear-armed satellite · the UK sanctions five Myanmar generals after the ICJ genocide
ruling; exiled ex-PM Hasina plans a 16 December return.

## How it was made

The page was designed as a single HTML file — [`design.html`](design.html), kept in this
repository as the design source — using flat editorial illustration drawn in inline SVG
(a burning apartment block at night, a refinery, a warship, a radar screen, a capitol
dome) plus broadsheet typography: a serif display face for headlines, a plain sans for
kickers and the ticker, cream paper (`#f6f1e3`), ink black and one red accent. No external
images or fonts; everything is inline.

`design.html` was rendered with headless Chromium at a viewport of exactly 1024×1024 and
screenshotted to [`entry.png`](entry.png) — a 1024×1024 PNG, well under the 1 MiB limit.
The rendered page was proofread at full size before the screenshot was accepted.

## Running the program

The program (`main.ts`, Node 22, standard library only) copies the repository's `entry.png`
into the output directory as `entry.png`, creating the directory if needed. Before copying
it checks the shipped picture exists, is not empty, starts with the PNG signature, and
declares exactly 1024×1024 pixels in its IHDR chunk:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Outside the grader, `MAKEFUN_OUTPUT_DIR` stands in for `/output`. The copy is byte-for-byte,
so repeated runs produce identical output.
