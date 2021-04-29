class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.duration = duration;
    this.ingredients = ingredients;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }

  colorForComplexity() {
    if (this.complexity == "simple") {
      return "green";
    } else if (this.complexity === "hard") {
      return "orange";
    } else {
      return "red";
    }
  }

  colorForAffordability() {
    if (this.affordability == "affordable") {
      return "green";
    } else if (this.affordability === "pricey") {
      return "orange";
    } else {
      return "red";
    }
  }

  colorForDuration() {
    if (this.duration <= 30) {
      return "green";
    } else if (this.duration <= 60) {
      return "orange";
    } else {
      return "red";
    }
  }
}

export default Meal;
