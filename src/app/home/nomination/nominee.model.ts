export class Nominee{
  public name: string;
  public description: string;
  public votesNumber: number;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.votesNumber = 0;
  }
}
