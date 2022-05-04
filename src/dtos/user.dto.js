class UserDTO {
	constructor({
		email,
		name,
		isAdmin = false,
		image,
		password,
		address,
		age,
		phone,
	}) {
		this.email = email;
		this.name = name;
		this.isAdmin = isAdmin;
		this.image = image;
		this.password = password;
		this.address = address;
		this.age = age;
		this.phone = phone;
	}
}

export default UserDTO;
