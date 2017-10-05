export default class Attributes {
  constructor(attributePairs) {
    this.attributes = attributePairs;
  }

  toCrowd(stringify = JSON.stringify) {
    // Crowd stores attribute values in an array, which is quite limited. We use only one
    // value per attribute, this value may be of any type since we store it as JSON.
    let attributesArr = [];
    for (var key in this.attributes) {
      if (this.attributes.hasOwnProperty(key)) {
        let value = stringify(this.attributes[key]);
        if (typeof value !== 'string') {
          throw new Error(`Attribute value for ${key} should be a string. Check your stringify function.`);
        } else if (value.length > 255) {
          throw new Error(`Attribute ${key} is too large. Values can be no larger than 255 characters.`);
        } else {
          attributesArr.push({
            name: key,
            values: [value]
          });
        }
      }
    }
    return attributesArr;
  }

  static fromCrowd(attributesArr, parse = JSON.parse) {
    let attributePairs = {};
    attributesArr.forEach(attribute => {
      attributePairs[attribute.name] = parse(attribute.values[0]);
    });
    return new Attributes(attributePairs);
  }
}
