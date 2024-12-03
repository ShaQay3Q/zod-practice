import { z } from "zod";

enum BodyParts {
	head = "Head",
	hand = "Hand",
	shoulder = "Shoulder",
	leg = "Leg",
	eye = "Eye",
	ass = "Ass",
}

const UserSchema = z.object({
	username: z.string().min(3, { message: "at least 3 charachter" }).max(20),
	age: z.number().gt(18), // age > 18
	randomNumber: z.number().default(Math.random()),
	birthday: z.string().date({ message: "Invalid date string!" }),
	isProgrammer: z.boolean().default(false),
	email: z.string().email({ message: "Invalid email address" }),
	address: z.string().optional(),
	numberOfSibilings: z.number().nullable(),
	hobby: z
		.enum(["Programming", "Sleeping", "Eating", "Books"])
		.default("Programming"),
	bodyParts: z.nativeEnum(BodyParts),
});

// automatically infered (estentaj) the type for us based on the schema
type User = z.infer<typeof UserSchema>;

const user = {
	username: "Luci",
	age: 24,
	birthday: "2000-03-19",
	isProgrammer: true,
	email: "sha@email.con",
	numberOfSibilings: null,
	bodyParts: BodyParts.ass,
};

try {
	// check if the user matches the schema
	// const myUser = UserSchema.safeParse(user);
	const myUser = UserSchema.safeParse(user).success;
	const myOtherUser = UserSchema.parse(user);
	console.log(myUser);
	console.log(myOtherUser);
} catch (e) {
	console.log(e);
}
