import { z } from "zod";

const UserSchema = z.object({
	username: z.string(),
	age: z.number(),
	birthday: z.string().date({ message: "Invalid date string!" }),
	isProgrammer: z.boolean(),
	email: z.string().email({ message: "Invalid email address" }),
});

// automatically infered (estentaj) the type for us based on the schema
type User = z.infer<typeof UserSchema>;

const user: User = {
	username: "Luci",
	age: 24,
	birthday: "2000-03-19",
	isProgrammer: true,
	email: "sha@email.con",
};

try {
	// check if the user matches the schema
	// const myUser = UserSchema.safeParse(user);
	const myUser = UserSchema.safeParse(user).success;
	console.log(myUser);
} catch (e) {
	console.log(e);
}
