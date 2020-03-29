export default class Constants {
  constructor(constants) {
    this.constants = constants;
  }

  get(constant) {
    if (!this.constants[constant]) {
      console.log('constant', constant);
      console.log('sonstantS', this.constants);
      throw new Error("You didn't specify a valid constant. " + constant + '\n' + Object.keys(this.constants));
    }
    return constant;
  }
}
