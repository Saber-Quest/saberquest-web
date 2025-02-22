export interface ItemRecipes {
  input1: Item;
  input2: Item;
  output: Item;
}

export interface AllowedRecipes {
  input1: Item;
  input2: Item;
  output: Item;
  canCraft: number;
}

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: number;
}
