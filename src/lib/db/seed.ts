import { reset, seed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

async function main() {
  await reset(db, schema);
  await seed(db, {
    users: schema.users,
    products: schema.products,
  }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
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
