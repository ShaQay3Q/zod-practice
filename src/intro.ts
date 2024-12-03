import { z } from "zod";

type MyUser = {
	username: string;
};

const MyUserSchema = z.object({
	username: z.string(),
});

const myUser: MyUser = { username: "Shaghayegh" };

//! OR
const UserSchema = z.object({
	username: z.string(),
});

// automatically infered (estentaj) the type for us based on the schema
type User = z.infer<typeof UserSchema>;

// check if the user matches the schema
// This method validates the myUser object against the UserSchema
// If the object matches the schema, it returns the validated object.
// If validation fails, it throws an error
console.log(MyUserSchema.parse(myUser));

const userOne = { username: "Shaghayegh" };

// try {
const userTwo = { username: 1 };
// console.log(UserSchema.parse(userTwo));
console.log(UserSchema.safeParse(userTwo)); // console.log and object with "success: false"
console.log(UserSchema.safeParse(userOne)); // safePars => allows some true/false validation, if we need it
// } catch (e) {
// 	console.log(e);
// }
