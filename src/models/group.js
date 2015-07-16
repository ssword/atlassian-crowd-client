export default class Group {
  constructor(groupname, description, active = true) {
    this.groupname = groupname;
    this.description = description;
    this.active = active;
  }

  toCrowd() {
    let obj = {
      type: 'GROUP',
      name: this.groupname,
      description: this.description,
      active: this.active
    };
    return obj;
  }

  static fromCrowd({ name, description, active }) {
    return new Group(name, description, active);
  }
}
