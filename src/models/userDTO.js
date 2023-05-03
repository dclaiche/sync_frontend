class UserDTO {
    constructor(id, email, phone, creator_status) {
      this.id = id;
      this.email = email;
      this.phone = phone;
      this.creator_status = creator_status;
    }

    get_user_list() {
        const instance = [this.id, this.email, this.phone, this.creator_status];
        return instance;
    }
  }
  
export default UserDTO;