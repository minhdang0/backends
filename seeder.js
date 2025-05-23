require("module-alias/register");
const db = require("@/configs/db");
const { faker } = require("@faker-js/faker");

async function run() {
  try {
    console.log("Starting users seeder...");

    // Prepare bulk insert
    const records = 50; // Number of users to create
    let values = [];
    let placeholders = [];

    for (let i = 0; i < records; i++) {
      // Generate random user data
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      // Generate a unique username (lowercase with no spaces)
      const username = faker.internet
        .username({ firstName, lastName })
        .toLowerCase();

      // Generate unique email
      const email = faker.internet.email({ firstName, lastName }).toLowerCase();

      // Generate password (hashed in a real scenario)
      const password =
        "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // password = 'password'

      // Generate random birthday (18-80 years old)
      const dob = faker.date.birthdate({
        min: 18,
        max: 80,
        mode: "age",
      });

      // Generate avatar URL (30% chance of having an avatar)
      const avatar = Math.random() > 0.7 ? faker.image.avatar() : null;

      // Random gender matching the enum values
      const genders = ["male", "female", "other"];
      const gender = faker.helpers.arrayElement(genders);

      // Generate bio (70% chance of having a bio)
      const bio =
        Math.random() > 0.3
          ? faker.lorem.sentences({ min: 1, max: 3 }).substring(0, 255)
          : null;

      // Generate intro (50% chance of having an intro)
      const intro =
        Math.random() > 0.5 ? faker.lorem.paragraphs({ min: 1, max: 3 }) : null;

      // Set is_active (95% chance of being active)
      const is_active = Math.random() > 0.05 ? 1 : 0;

      // Random blocked status (5% chance of being blocked)
      const blocked_at =
        Math.random() > 0.95
          ? formatDate(faker.date.recent({ days: 30 }))
          : null;

      // Set created and updated dates
      const createdAt = faker.date.between({
        from: "2022-01-01T00:00:00.000Z",
        to: "2025-05-13T00:00:00.000Z",
      });

      // Updated date is either same as created or later
      const updatedAt =
        Math.random() > 0.7
          ? faker.date.between({
              from: createdAt,
              to: "2025-05-13T00:00:00.000Z",
            })
          : createdAt;

      // Add to values array
      values.push(
        firstName,
        lastName,
        username,
        email,
        password,
        formatDate(dob, true), // Date only format
        bio,
        intro,
        gender,
        avatar,
        is_active,
        blocked_at,
        formatDate(createdAt),
        formatDate(updatedAt)
      );

      // Add placeholder for prepared statement
      placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    }

    // Execute bulk insert
    const query = `
      INSERT INTO users (
        first_name, last_name, username, email, password, 
        dob, bio, intro, gender, avatar, 
        is_active, blocked_at, created_at, updated_at
      ) 
      VALUES ${placeholders.join(", ")}
    `;

    const result = await db.query(query, values);
    console.log(`Successfully seeded ${result.affectedRows} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Close database connection if needed
    process.exit(0);
  }
}

// Helper function to format date for MySQL
function formatDate(date, dateOnly = false) {
  if (!date) return null;

  if (dateOnly) {
    return date.toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 19).replace("T", " ");
}

run();
