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
    return;
  }
}

const animals: Animal[] = [
  new Cat('land', 'miau'),
  new Bird(),
  new Fish(),
];

animals.forEach(function (animal) {
  console.log(animal.info());
  console.log(animal.say());
});
