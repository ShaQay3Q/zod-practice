import { z } from "zod";

enum BodyParts {
	head = "Head",
	hand = "Hand",
	shoulder = "Shoulder",
	leg = "Leg",
	eye = "Eye",
	ass = "Ass",
}

const UserSchema = z
	.object({
		username: z.string().min(3, { message: "at least 3 charachter" }).max(20),
		age: z.number().gt(18), // age > 18
		randomNumber: z.number().default(Math.random()),
		birthday: z.date({ message: "Invalid date string!" }),
		isProgrammer: z.boolean().default(false),
		email: z.string().email({ message: "Invalid email address" }),
		address: z.string().optional(),
		numberOfSibilings: z.number().nullable(),
		hobby: z
			.enum(["Programming", "Sleeping", "Eating", "Books"])
			.default("Programming"),
		bodyParts: z.nativeEnum(BodyParts),
		firends: z.array(z.string()).nonempty(),
		// });
	})
	// .partial(); // Makes every filed optionsl
	// .pick({ username: true }); // only selects one filed; username
	// .omit({ age: true }); // omits certain fileds: age
	// .extend({ name: z.string() }); // add an extra filed; name
	.merge(z.object({ name: z.string(), isHome: z.boolean() })) // meres with another Schema
	// .strict(); // allows no additional keys
	.passthrough(); // pass other extra keys that have been added to the user

// automatically infered (estentaj) the type for us based on the schema
type User = z.infer<typeof UserSchema>;

const user = {
	username: "Luci",
	// age: 24,
	// birthday: "2000-03-19",
	// isProgrammer: true,
	// email: "sha@email.con",
	// numberOfSibilings: null,
	// bodyParts: BodyParts.ass,
	isHot: true, // added key - worked with passthrough()
	// friends: ["Sha", "Lean"],
	friends: [],
};

try {
	// check if the user matches the schema
	// const myUser = UserSchema.safeParse(user);
	const myUser = UserSchema.safeParse(user).success;
	console.log(UserSchema.shape.bodyParts);
	UserSchema.shape.firends.element; // returns type of the array
	// const myOtherUser = UserSchema.parse(user);
	console.log(myUser);
	// console.log(myOtherUser);

	console.log(UserSchema.partial().parse(user)); // partial() just like TS method, makes fileds optional
} catch (e) {
	console.log(e);
}
