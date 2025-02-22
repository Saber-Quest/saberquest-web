import { ItemRarity as iR } from "@lib/enums/ItemRarity";

export default function Rarities({ rarity }: { rarity: iR }) {
  return (
    <>
      {rarity === 1 && <CommonRarity />}
      {rarity === 2 && <UncommonRarity />}
      {rarity === 3 && <RareRarity />}
      {rarity === 4 && <EpicRarity />}
      {rarity === 5 && <LegendaryRarity />}
    </>
  );
}

function CommonRarity() {
  return (
    <>
      <div className="outerPill common">
        <div className="innerPill common" />
        <span className="pillText">Common</span>
      </div>
    </>
  );
}

function UncommonRarity() {
  return (
    <>
      <div className="outerPill uncommon">
        <div className="innerPill uncommon" />
        <span className="pillText">Uncommon</span>
      </div>
    </>
  );
}

function RareRarity() {
  return (
    <>
      <div className="outerPill rare">
        <div className="innerPill rare" />
        <span className="pillText">Rare</span>
      </div>
    </>
  );
}

function EpicRarity() {
  return (
    <>
      <div className="outerPill epic">
        <div className="innerPill epic" />
        <span className="pillText">Epic</span>
      </div>
    </>
  );
}

function LegendaryRarity() {
  return (
    <>
      <div className="outerPill legendary">
        <div className="innerPill legendary" />
        <span className="pillText">Legendary</span>
      </div>
    </>
  );
}
