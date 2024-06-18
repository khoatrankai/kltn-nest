import { Exclude, Expose } from "class-transformer";
import { CvProject } from "../entities/cv-project.entity";

export class CvProjectSerialization extends CvProject {
    constructor(cvProject: CvProject) {
        super();
        Object.assign(this, cvProject);
    }
 
    @Exclude({ toPlainOnly: true })
    override moreCvProject!: any[];

    @Expose()
    get moreCvProjects() {
        if (this.moreCvProject.length === 0) return [];
        return this.moreCvProject.map(cvExtra => {
            return {
                name: cvExtra.name,
                time: cvExtra.time,
                link: cvExtra.link,
                participant: cvExtra.participant,
                position: cvExtra.position,
                functionality: cvExtra.functionality,
                technology: cvExtra.technology,
                index: cvExtra.index,
                padIndex: cvExtra.padIndex,
            };
        });
    }
}