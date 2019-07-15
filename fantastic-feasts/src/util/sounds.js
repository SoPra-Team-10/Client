/*
This module contains all sound effects that are used throughout the application
*/

const hover = require("../sounds/hover.mp3");
const cheerLong = require("../sounds/cheer-long.mp3");
const cheerLong2 = require("../sounds/cheer-long2.mp3");
const cheerShort = require("../sounds/cheer-short.mp3");
const goblin = require("../sounds/goblin.mp3");
const goblin2 = require("../sounds/goblin2.mp3");
const goblin3 = require("../sounds/goblin3.mp3");
const hit = require("../sounds/hit.mp3");
const hit2 = require("../sounds/hit2.mp3");
const hit3 = require("../sounds/hit3.mp3");
const hit4 = require("../sounds/hit4.mp3");
const hurt = require("../sounds/hurt.mp3");
const magical = require("../sounds/magical.mp3");
const matchStart = require("../sounds/match-start.mp3");
const matchStart2 = require("../sounds/match-start2.mp3");
const click = require("../sounds/mouse-click.mp3");
const niffler = require("../sounds/niffler.mp3");
const pooPooMommy = require("../sounds/poo-poo-mommy.mp3");
const referee = require("../sounds/referee.mp3");
const toggle = require("../sounds/switch.mp3");
const toggle2 = require("../sounds/switch2.mp3");
const troll = require("../sounds/troll.mp3");
const troll2 = require("../sounds/troll2.mp3");
const wombatDisgusting = require("../sounds/wombat-disgusting.mp3");
const wombat = require("../sounds/wombat.mp3");
const backgroundMusic = require("../sounds/quidditch_long.mp3");
const broom = require("../sounds/broom.mp3");

const broomSound = () => {
  // console.log("Hi");
  const audio = new Audio(broom);
  audio.play();
};

const hoverSound = () => {
  // console.log("Hi");
  const audio = new Audio(hover);
  audio.play();
};
const clickSound = () => {
  const audio = new Audio(click);
  audio.play();
};

const cheerLongSound = () => {
  const audio = new Audio(cheerLong);
  audio.play();
};

const cheerLongSound2 = () => {
  const audio = new Audio(cheerLong2);
  audio.play();
};

const cheerShortSound = () => {
  const audio = new Audio(cheerShort);
  audio.play();
};
const goblinSound = () => {
  const audio = new Audio(goblin);
  audio.play();
};
const goblinSound2 = () => {
  const audio = new Audio(goblin2);
  audio.play();
};
const goblinSound3 = () => {
  const audio = new Audio(goblin3);
  audio.play();
};
const hitSound = () => {
  const audio = new Audio(hit);
  audio.play();
};
const hitSound2 = () => {
  const audio = new Audio(hit2);
  audio.play();
};
const hitSound3 = () => {
  const audio = new Audio(hit3);
  audio.play();
};
const hitSound4 = () => {
  const audio = new Audio(hit4);
  audio.play();
};
const hurtSound = () => {
  const audio = new Audio(hurt);
  audio.play();
};
const magicalSound = () => {
  const audio = new Audio(magical);
  audio.play();
};
const matchStartSound = () => {
  const audio = new Audio(matchStart);
  audio.play();
};
const matchStartSound2 = () => {
  const audio = new Audio(matchStart2);
  audio.play();
};
const nifflerSound = () => {
  const audio = new Audio(niffler);
  audio.play();
};
const pooPooMommySound = () => {
  const audio = new Audio(pooPooMommy);
  audio.play();
};
const refereeSound = () => {
  const audio = new Audio(referee);
  audio.play();
};
const toggleSound = () => {
  const audio = new Audio(toggle);
  audio.play();
};
const toggleSound2 = () => {
  const audio = new Audio(toggle2);
  audio.play();
};
const trollSound = () => {
  const audio = new Audio(troll);
  audio.play();
};
const trollSound2 = () => {
  const audio = new Audio(troll2);
  audio.play();
};
const wombatDisgustingSound = () => {
  const audio = new Audio(wombatDisgusting);
  audio.play();
};
const wombatSound = () => {
  const audio = new Audio(wombat);
  audio.play();
};

export {
  broomSound,
  hoverSound,
  clickSound,
  cheerLongSound,
  cheerLongSound2,
  cheerShortSound,
  goblinSound,
  goblinSound2,
  goblinSound3,
  hitSound,
  hitSound2,
  hitSound3,
  hitSound4,
  hurtSound,
  magicalSound,
  matchStartSound,
  matchStartSound2,
  nifflerSound,
  pooPooMommySound,
  refereeSound,
  toggleSound,
  toggleSound2,
  trollSound,
  trollSound2,
  wombatDisgustingSound,
  wombatSound,
  backgroundMusic
};
