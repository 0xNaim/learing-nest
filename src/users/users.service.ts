import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bobbrown@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charliedavis@example.com',
      role: 'ADMIN',
    },
    {
      id: 6,
      name: 'Emily White',
      email: 'emilywhite@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'Frank Harris',
      email: 'frankharris@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Grace Clark',
      email: 'graceclark@example.com',
      role: 'ADMIN',
    },
    {
      id: 9,
      name: 'Henry Lewis',
      email: 'henrylewis@example.com',
      role: 'INTERN',
    },
    {
      id: 10,
      name: 'Ivy Walker',
      email: 'ivywalker@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found');

      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(data: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...data };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
