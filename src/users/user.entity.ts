import { Project } from 'src/projects/project.entity';
import { Comment } from '../comments/comment.entity'; 
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Tenant } from 'src/tenant/tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to tenant (multi-tenant)
  @ManyToOne(() => Tenant, tenant => tenant.users, { nullable: false })
  tenant: Tenant;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Project, project => project.owner)
  ownedProjects: Project[];

  @OneToMany(() => Task, task => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}
