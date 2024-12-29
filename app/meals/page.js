import Link from "next/link";
import React from "react";

function Meals() {
  return (
    <main>
      <h1>Meals</h1>
      <p>
        <Link href={".."}>Back</Link>
      </p>
      <p>
        <Link href={"/meals/share"}>Share</Link>
      </p>
      <p>
        <Link href={"/meals/meal-1"}>First Meal</Link>
      </p>
    </main>
  );
}

export default Meals;
