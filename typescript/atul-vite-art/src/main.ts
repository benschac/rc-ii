import "./style.css";
import p5 from "p5";

// new p5(sketch);
const sketch = (p: p5) => {
  const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
  let atul: p5.Image;
  let atulCommCommits: string[];
  let commitStr: string;

  p.preload = () => {
    atul = p.loadImage("atul-100.png");
    atulCommCommits = p.loadStrings("commits.csv");
  };

  p.setup = () => {
    p.createCanvas(1000, 1000);
    commitStr = atulCommCommits.join("").split(",").join("");
  };

  p.draw = () => {
    const w = p.width / atul.width;
    const h = p.height / atul.height;
    atul.loadPixels();
    p.background("#72A1EF");
    for (let j = 0; j < atul.height; j++) {
      for (let i = 0; i < atul.width; i++) {
        const pixelIndex = (i + j * atul.width) * 4;
        const r = atul.pixels[pixelIndex + 0];
        const g = atul.pixels[pixelIndex + 1];
        const b = atul.pixels[pixelIndex + 2];
        const a = atul.pixels[pixelIndex + 3];
        const avg = (r + g + b) / 3;
        p.noStroke();
        p.fill(255);
        // p.setAlpha(0);
        const len = density.length;
        const charIndex = p.floor(p.map(avg, 0, 255, len, 0));
        p.textSize(w);
        // p.text;
        p.textAlign(p.CENTER, p.CENTER);
        // if avg is 7 or less then change opacity to 0.1
        // and make text style bold
        // if (avg < 7) {
        // p.fill("rgba(255, 255, 255, 0.1)");
        // } else {
        p.textStyle(p.BOLD);
        p.fill(255, 255, 255, p.map(avg, 105, 255, 0, 255));
        // }
        // p.fill(255, 255, 255, p.map(avg, 0, 255, 0, 255));
        p.text(commitStr[i + j * atul.width], i * w + w * 0.5, j * h + h * 0.5);

        // p.setAlpha(p.map(avg, 0, 255, 0, 255));
      }
    }
  };
};

new p5(sketch);

/**
 * 1. load all commits from csv file to a pixel
 * 2. use opacity to show pixel density rather than a character
 *
 */
