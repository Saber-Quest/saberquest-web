import CraftingRarities from "./CraftRarities";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import { AllowedRecipes } from "@lib/types";

export default function SingleItem({
  recipe,
  index,
  handleCraft,
}: {
  recipe: AllowedRecipes;
  index: number;
  handleCraft: (recipe: AllowedRecipes) => void;
}) {
  return (
    <>
      <tbody>
        <tr
          key={index}
          className={index % 2 === 0 ? "bg-[#0000003d]" : undefined}
        >
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.input1.rarity === 1
                  ? 1
                  : recipe.input1.rarity === 2
                  ? 2
                  : recipe.input1.rarity === 3
                  ? 3
                  : recipe.input1.rarity === 4
                  ? 4
                  : 5
              }
              name={`${recipe.input1.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.input2.rarity === 1
                  ? 1
                  : recipe.input2.rarity === 2
                  ? 2
                  : recipe.input2.rarity === 3
                  ? 3
                  : recipe.input2.rarity === 4
                  ? 4
                  : 5
              }
              name={`${recipe.input2.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.output.rarity === 1
                  ? 1
                  : recipe.output.rarity === 2
                  ? 2
                  : recipe.output.rarity === 3
                  ? 3
                  : recipe.output.rarity === 4
                  ? 4
                  : 5
              }
              name={`${recipe.output.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            {recipe.canCraft}x
          </td>
          <td className="relative py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
            <div
              onClick={() => handleCraft(recipe)}
              className="text-[#ffd15269] hover:text-sqyellow transition-colors duration-200 hover:cursor-pointer"
            >
              Craft!
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
