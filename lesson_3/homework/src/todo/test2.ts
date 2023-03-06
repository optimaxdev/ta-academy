/*
    Remove all `any` type
*/

type Animal = {
  moving: string;
  voice?: string;
  info: () => string;
  say: () => string | void;
};

class Cat implements Animal {
  constructor(
    public moving: string,
    public voice: string
  ) {}

  info(): string {
    return `This animal: moving in the ${this.moving}, say: ${this.voice}.`;
  }
  say(): string {
    return this.voice;
  }
}

class Bird implements Animal {
  moving = 'air';
  voice = 'piu';

  info(): string {
    return `This animal: moving in the ${this.moving}`;
  }
  say(): string {
    return this.voice;
  }
}

class Fish implements Animal {
  moving = 'water';

  info(): string {
    return `This animal: moving in the ${this.moving}.`;
  }
  say(): void {
    console.log(
      "I want to tell you something, but I'm just a fish"
    );
  }
}

const cat = new Cat('land', 'miau');
const bird = new Bird();
const fish = new Fish();

// cat
const informationAboutCat: string = cat.info();
console.log(informationAboutCat);
const whatTheCatSay: string = cat.say();
console.log(whatTheCatSay);

// bird
const informationAboutBird: string = bird.info();
console.log(informationAboutBird);
const whatTheBirdSay: string = bird.say();
console.log(whatTheBirdSay);

// fish
const informationAboutFish: string = fish.info();
console.log(informationAboutFish);
fish.say();