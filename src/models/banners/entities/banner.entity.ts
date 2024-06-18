import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity('banners')
export class Banner {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 200, name: 'image' })
    image!: string;

    @Column({ type: 'varchar', length: 200, name: 'redirect_url' })
    redirectUrl!: string;

    @Column({ type: 'tinyint', nullable: false, default: 1 })
    status!: number;

    @Column({ type: 'tinyint', nullable: false })
    type!: number;

    @Column({ type: 'tinyint', nullable: false })
    version!: number;
}
