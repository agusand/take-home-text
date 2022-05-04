class UserDTO {
	constructor({
		email,
		name,
		isAdmin = false,
		image,
		password,
	}) {
		this.email = email;
		this.name = name;
		this.isAdmin = isAdmin;
		this.image = image;
		this.password = password;
	}
}

export default UserDTO;
