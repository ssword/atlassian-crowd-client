export default class Group {
  constructor(groupname, description = '', active = true, attributes) {
    this.groupname = groupname;
    this.description = description;
    this.active = active;
    this.attributes = (attributes) ? attributes.attributes : [];
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

  static fromCrowd({ name, description, active, attributes}) {
    return new Group(name, description, active);
  }
}
