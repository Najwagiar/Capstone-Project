
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Location } from '../../locations/entities/location.entity.js';

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationId: number;

  @ManyToOne(() => Location, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column({ length: 30 })
  riskLevel: string;

  @Column({ type: 'float', nullable: true })
  probability: number;

  @Column({ length: 100 })
  modelName: string;

  @Column({ type: 'text', nullable: true })
  resultSummary: string;

  @Column({ type: 'datetime', nullable: true })
  predictionDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
