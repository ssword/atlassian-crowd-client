export default class Attributes {
  constructor(attributePairs) {
    this.attributes = attributePairs;
  }

  toCrowd() {
    // Crowd stores attribute values in an array, which is quite limited. We use only one
    // value per attribute, this value may be of any type since we store it as JSON.
    let attributesArr = [];
    for (var key in this.attributes) {
      if (this.attributes.hasOwnProperty(key)) {
        let value = this.attributes[key];
        attributesArr.push({
          name: key,
          values: [JSON.stringify(value)]
        });
      }
    }
    return attributesArr;
  }

  static fromCrowd(attributesArr) {
    let attributePairs = {};
    attributesArr.forEach((attribute) => {
      attributePairs[attribute.name] = JSON.parse(attribute.values[0]);
    });
    return new Attributes(attributePairs);
  }
}
