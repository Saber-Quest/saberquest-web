import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import rateLimit from "@lib/api/ratelimit";
import { InventoryItem, Item, ItemRecipes, AllowedRecipes } from "@lib/types";

const ratelimit: any = 5;
const limiter = rateLimit({
  interval: 10 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "POST") {
        const { id }: { id: string } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Missing ID" });
        }

        let inventory: InventoryItem[] = [];
        let recipes: ItemRecipes[] = [];
        let knownItems: Item[] = [];

        await axios
          .get(`${process.env.API_URL}/users/${id}/items`)
          .then((response) => {
            inventory = response.data;
          })
          .catch(() => {
            return res
              .status(400)
              .json({ error: "Could not fetch user-inventory from database." });
          });

        await axios
          .get(`${process.env.API_URL}/items/recipes`)
          .then((response) => {
            recipes = response.data;
          })
          .catch(() => {
            return res.status(400).json({
              error: "Could not fetch recipe-table from the database.",
            });
          });

        await axios
          .get(`${process.env.API_URL}/items`)
          .then((response) => {
            knownItems = response.data;
          })
          .catch(() => {
            return res.status(400).json({
              error: "Could not fetch items-table from the database.",
            });
          });

        const transformedRecipes: ItemRecipes[] = recipes.map((recipe) => {
          const input1 = knownItems.find(
            (item) => item.id === recipe.input1.id,
          );
          const input2 = knownItems.find(
            (item) => item.id === recipe.input2.id,
          );
          const output = knownItems.find(
            (item) => item.id === recipe.output.id,
          );

          return {
            input1: {
              id: input1?.id!,
              name: input1?.name!,
              rarity: input1?.rarity!,
              image: input1?.image!,
            },
            input2: {
              id: input2?.id!,
              name: input2?.name!,
              rarity: input2?.rarity!,
              image: input2?.image!,
            },
            output: {
              id: output?.id!,
              name: output?.name!,
              rarity: output?.rarity!,
              image: output?.image!,
            },
          };
        });

        let allowedRecipes: AllowedRecipes[] = [];

        for (const transformedRecipe of transformedRecipes) {
          const { input1, input2 } = transformedRecipe;

          const item1 = inventory.find((item) => item.id === input1.id);
          const item2 = inventory.find((item) => item.id === input2.id);

          if (item1 && item2) {
            let canCraft: number = 0;
            if (item1.id === item2.id) {
              canCraft = Math.floor(item1.amount / 2);
            } else {
              canCraft = Math.min(item1.amount, item2.amount);
            }

            const recipeWithCanCraft: AllowedRecipes = {
              input1: {
                id: item1.id || item2.id,
                name:
                  transformedRecipe.input1.name ||
                  transformedRecipe.input2.name ||
                  "",
                image:
                  transformedRecipe.input1.image ||
                  transformedRecipe.input2.image ||
                  "",
                rarity:
                  transformedRecipe.input1.rarity ||
                  transformedRecipe.input2.rarity ||
                  1,
              },
              input2: {
                id: item2.id || item1.id,
                name:
                  transformedRecipe.input2.name ||
                  transformedRecipe.input1.name ||
                  "",
                image:
                  transformedRecipe.input2.image ||
                  transformedRecipe.input1.image ||
                  "",
                rarity:
                  transformedRecipe.input2.rarity ||
                  transformedRecipe.input1.rarity ||
                  1,
              },
              output: {
                id: transformedRecipe.output.id,
                name: transformedRecipe.output.name || "",
                image: transformedRecipe.output.image || "",
                rarity: transformedRecipe.output.rarity || 1,
              },
              canCraft,
            };

            allowedRecipes.push(recipeWithCanCraft);
          }
        }

        allowedRecipes = allowedRecipes.filter(
          (recipe) => recipe.canCraft >= 1,
        );

        return res.status(200).json({ allowedRecipes });
      } else {
        return res.status(400).json({ error: "Invalid request method" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something bad happened" });
    }
  } catch (error) {
    return res.status(429).json({ error: "Rate limit exceeded.\n Slow down!" });
  }
}
