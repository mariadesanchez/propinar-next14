import bcryptjs from 'bcryptjs';




interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin'|'user'
}





interface SeedData {
  users: SeedUser[];

}




export const initialData: SeedData = {

  users: [
    {
      email: 'lucky@google.com',
      name: 'Lucky Sanchez',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'lola@google.com',
      name: 'Lola Sanchez',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ],


  
  
};