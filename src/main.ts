import { z } from "zod";

const UserSchema = z.object({
	username: z.string(),
	// id: z.union([z.string(), z.number()]),
	id: z.string().or(z.number()), //usefull when we work with arrays
	// coords: z.tuple([z.string(), z.coerce.date()]).rest(z.number()),
	// coords: z.tuple([z.string(), z.date()]).rest(z.number()),
});

// automatically infered (estentaj) the type for us based on the schema
type User = z.infer<typeof UserSchema>;

const user = {
	username: "Luci",
	// coords: ["51.340199", "1930-12-25T23:42:03.000Z"],
	// coords: ["51.340199", new Date("1900-02-02"), 43],
	id: 2,
};

try {
	// check if the user matches the schema
	// const myUser = UserSchema.safeParse(user);
	const myUser = UserSchema.safeParse(user).success;
	// const myOtherUser = UserSchema.parse(user);
	console.log(myUser);
	// console.log(myOtherUser);

	console.log(UserSchema.partial().parse(user)); // partial() just like TS method, makes fileds optional
} catch (e) {
	console.log(e);
}
