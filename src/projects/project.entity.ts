import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { Tenant } from 'src/tenant/tenant.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tenant, tenant => tenant.projects, { nullable: false })
  tenant: Tenant;


  @Column()
  tenantId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.ownedProjects, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
