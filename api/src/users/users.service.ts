import { Injectable } from '@nestjs/common';

export type Visit = {
  date: number;
  id: number;
};

export type User = {
  id: number;
  email: string;
  password: string;
  visits: Visit[];
};

@Injectable()
export class UsersService {
  public static visitIdCounter = 0;

  private readonly users: User[] = [
    {
      id: 1,
      email: 'cezarmocanu@gymbug.com',
      password: 'cc9b1e06',
      visits: [],
    },
    {
      id: 2,
      email: 'alexandramocanu@gymbug.com',
      password: 'a9056a10',
      visits: [],
    },
    {
      id: 3,
      email: 'andreeamereu@gymbug.com',
      password: '0f44e6fe',
      visits: [],
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async updateVisit(user: User): Promise<User> {
    const u = this.users.find(({ id }) => id === user.id);
    u.visits.push({
      date: new Date().getTime(),
      id: UsersService.visitIdCounter++,
    });
    return u;
  }
}
