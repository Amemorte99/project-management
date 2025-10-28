import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // One tenant can have many users
  @OneToMany(() => User, user => user.tenant)
  users: User[];

  // One tenant can have many projects
  @OneToMany(() => Project, project => project.tenant)
  projects: Project[];

  // One tenant can have many tasks
  @OneToMany(() => Task, task => task.tenant)
  tasks: Task[];
}
