import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const sql = require("better-sqlite3");
const db = sql("meals.db");

export function getMeals() {
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function createMeal(meal) {
  meal.slug = slugify(meal.title);
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const filepath = `./public/images/${fileName}`;
  const stream = fs.createWriteStream(filepath);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals
        (slug, title, image, summary, instructions, creator, creator_email)
       VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `
  ).run(meal);
}
