export class User {


  private _id:number;
  private _name:string;
  private _email:string;
  private _hashedPassword:string;
  private _admin:boolean;


  constructor() {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get hashedPassword(): string {
    return this._hashedPassword;
  }

  set hashedPassword(value: string) {
    this._hashedPassword = value;
  }

  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }
}
