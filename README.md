# rc-ii

<!-- Get Your Badge Here -->
<!-- https://github.com/barakchamo/rc-badges -->
<!-- href is from rc scout: https://www.recurse.com/settings/scout -->
<!-- rc scout is an internal tool that helps rc log and track metrics on how users found your project / link + link to recurse.com -->
<!-- https://github.com/recursecenter/wiki/wiki/RC-Scout -->
<!--
The only two events Scout logs are script loads and link clicks, both on a per-token basis. For each event, the user data we record is limited to:

IP address
referrer, if any
Scout token, if one is present in the query string
user agent
RC unique ID, if the user is a Recurser and logged in to recurse.com
With this info, we can also tie your links to browsing sessions on recurse.com, and know with some certainty if a person you referred eventually submits an RC application.

Scout doesn't set tracking cookies or parse any of your site's content.
 -->
 <!-- or just click: https://www.recurse.com -->

<a href="https://www.recurse.com/?t=52b00143745a218ef86c10cc5dc24f55" title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>

Second Stint @ RC. Projects, Notes + Blog

## Setup

I'm doing a half batch (6-weeks) at [Recurse Center](http://www.recurse.com). This will be my second time participating in a batch at RC. My first batch was W2 2016.

At this point in my career, I was in the process of transitioning from a non-techincal project manager to getting my first real job as a software engineer.

I've worked as a programmer since '17.

### Project Goals

_what I want to do_

- [diagram](https://excalidraw.com/#json=UWEFTKtf-X-ZwK_Vyw2sY,7h5j45wiICrAEhtdCSkltQ)
- get better at typescript
- make things that move
- make things in 3d
- make things for visonOS
- [learn + use javascript features that I don't normally touch](#learn--use-javascript-features-that-i-dont-normally-touch)
- Basic rust proficiency

- Pair Programming - everyday
- Going to unfamiliar places where I'm not comfortable, for growth.
- have fun

### Project Non-Goals

_what I don't want to do_

- read the news
- watch the news
- browser social media
- think about where I'm at and if I should be doing something else or progressing at a faster rate
- work on someone else's project for "career advancement"
- trick myself into thinking I'm doing what I want to do, but in reality I'm yak shaving.
- Spend 40+ hour at the physical space.
- Take things too seriously

### Fun Things

_focus on what brings you joy_

- [host a website at home](https://github.com/iffybooks/host-a-website-at-home)

### learn + use javascript features that I don't normally touch

## Project

#### [Atul ascii art](./typescript/atul-vite-art/)

<img width="1006" alt="atul_comm" src="https://github.com/benschac/rc-ii/assets/2502947/790f33e1-8466-4e25-b98e-46ec53aec8c5">

use p5.js to make ascii art of atul's pfp. characters are generated using [atul's commits at comm](https://github.com/CommE2E/comm/commits?author=atulsmadhugiri)

- Steps:
  - get all commits from atul's comm repo `git log --pretty=format:'%H,%ai,%an' | grep -i 'atul' | awk -F, '{print $1","}' | sort -t, -k2 > commits.csv`
  - get atul's image and reduce quality / size to 100 x 100 pixels.
  - render every commit character in the commit.csv file as a string for each pixel in the image.
  - take the average of each pixel rgb value and map it to a color. either white or blue.




Write an end state (many different possibilities) that I want from rc
