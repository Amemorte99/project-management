import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';
import { Comment } from '../comments/comment.entity';
import { Tenant } from '../tenant/tenant.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  // Task title
  @Column()
  title: string;

  // Task description, optional
  @Column('text', { nullable: true })
  description?: string;

  // Task status, default 'TODO'
  @Column({ default: 'TODO' })
  status: string;

  // Task priority, default 0
  @Column({ default: 0 })
  priority: number;

  // Relation to the Project
  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  // Relation to the User assigned to the task (optional)
  @ManyToOne(() => User, user => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  // Relation to the User who created the task
  @ManyToOne(() => User, user => user.createdTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  // Relation to the Task's comments
  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  // Relation to Tenant for multi-tenant isolation
  @ManyToOne(() => Tenant, tenant => tenant.tasks, { nullable: false })
  tenant: Tenant;

  // Creation timestamp
  @CreateDateColumn()
  createdAt: Date;

  // Update timestamp
  @UpdateDateColumn()
  updatedAt: Date;
}
