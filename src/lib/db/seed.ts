// path to a file with schema you want to reset
import { hashSync } from "@node-rs/argon2";
import { db } from ".";
import * as schema from "./schema";
import { reset, seed } from "drizzle-seed";

async function main() {
  const passwords = ["secret"].map((p) => hashSync(p));

  await reset(db, schema);
  console.log("Resetting schema");
  await seed(db, {
    users: schema.users,
  }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        passwordHash: f.valuesFromArray({
          values: passwords,
        }),
        role: f.valuesFromArray({
          values: ["resident", "admin"],
        }),
        phone: f.phoneNumber(),
      },
    },
  }));
}

void main()
  .catch(console.error)
  .then(() => {
    console.log("Done");
  });
