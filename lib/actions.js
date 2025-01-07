"use server";

import { revalidatePath } from "next/cache";
import { createMeal } from "./meals";
import { redirect } from "next/navigation";

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    formData.get("title") === "" ||
    formData.get("summary") === "" ||
    formData.get("instructions") === "" ||
    !formData.get("image") ||
    formData.get("image").size === 0 ||
    formData.get("name") === "" ||
    formData.get("email") === ""
  ) {
    return {
      nesage: "Please fill in all fields",
    };
  }

  await createMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
