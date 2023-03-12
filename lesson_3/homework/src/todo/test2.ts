/*
    Remove all `any` type
*/

type Animal = {
  moving: string;
  voice?: string;
  info: object;
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
const animal = new Cat('land', 'miau').info();
