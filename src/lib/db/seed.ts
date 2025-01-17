import { reset, seed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";
import { hashSync } from "@node-rs/argon2"; 

async function main() {

  const passwords = ["secret"].map((p) => hashSync(p));
  await reset(db, schema);
  await seed(db, {
    users: schema.users,
    products: schema.products,
  }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        passwordHash: f.valuesFromArray({
          values: passwords,
        }),
        phone: f.phoneNumber({
          template: "#### ####",
        }),
      },
    },
    products: {
      columns: {
        price: f.number({
          minValue: 4,
          maxValue: 250,
        }),
      },
    },
  }));
}

void main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => {
    console.log("Database seeded");
  });
