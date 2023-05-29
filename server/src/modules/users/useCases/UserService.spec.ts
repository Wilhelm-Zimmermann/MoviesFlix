import "reflect-metadata";
import { UsersRepositoryInMem } from "../repositories/implementations/UsersRepositoryInMem";
import { UserService } from "./UserService";
import { AppError } from "../../../shared/errors/AppError";
import { randomUUID } from "crypto";

let userService: UserService;
let usersRepository: UsersRepositoryInMem;

describe("User Service", () => {
	beforeEach(() => {
		usersRepository = new UsersRepositoryInMem();
		userService = new UserService(usersRepository);
	});

	describe("Create User", () => {
		it("should be able to create an user", async () => {
			const userToCreate = await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
	
			expect(userToCreate).toHaveProperty("email");
		});
	
		it("should not be able to create an user with same email", async () => {
			await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			await expect(userService.createUser(
				{
					name: "josephJoestasssr",
					email: "josephjoestar@gmail.com",
					password: "asdklfjlsadfsadfsafsadsd",
					profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
				}
			)).rejects.toEqual(new AppError("This email is already in use", 409));
		});
	});

	describe("Login User", () => {
		it("should be able to login an user with correct credentials", async () => {
			await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			const userLogin = await userService.login(
				{
					email: "josephjoestar@gmail.com",
					password: "asdklfjlsd",
				});
			expect(userLogin).toHaveProperty("token");
		});
	
		it("should not be able to login an user with incorect email", async () => {
			await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			await expect(userService.login(
				{
					email: "batman@gmail.com",
					password: "asdklfjlsd",
				})).rejects.toEqual(new AppError("Email/Password might be wrong"));
		});
	
		it("should not be able to login an user with incorect password", async () => {
			await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			await expect(userService.login(
				{
					email: "josephjoestar@gmail.com",
					password: "asdklfjlsdasdf",
				})).rejects.toEqual(new AppError("Email/Password might be wrong"));
		});
	});

	describe("Get User Profile", () => {
		it("should be able to get a user profile", async () => {
			const user = await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			const userProfile = await userService.getUserProfile(user.id);
	
			expect(userProfile.id).toEqual(user.id);
		});
	
		it("should not be able to get user profile if user does not exists", async () => {
			const user = {
				id: randomUUID()
			};
			
			await expect(
				userService.getUserProfile(user.id)
			).rejects.toEqual(new AppError("User not found", 404));
	
		});
	});

	describe("Upload Photo", () => {
		it("should be able to upload a photo for user profile", async () => {
			const user = await userService.createUser({
				name: "josephJoestar",
				email: "josephjoestar@gmail.com",
				password: "asdklfjlsd",
				profileImageUrl: "http://github.com/Wilhelm-Zimmermann.png"
			});
			
			const userUpdated = await userService.uploadUserPhoto(user.id, "image.jpg");
	
			expect(userUpdated.profileImageUrl).toEqual("image.jpg");
		});
	
		it("should not be able to upload a photo for user profile if user does not exists", async () => {
			const user = {
				id: randomUUID()
			};
			
			await expect(
				userService.uploadUserPhoto(user.id, "image.jpg")
			).rejects.toEqual(new AppError("User not found", 404));
	
		});
	});
});