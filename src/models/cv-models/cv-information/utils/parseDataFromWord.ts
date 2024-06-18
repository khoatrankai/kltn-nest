export function parseCommonInformation(text: string) {
    const commonInfoRegex = /Email:\s*([\w.-]+@[^\s]+)/i;
    const nameRegex = /Tên:\s*(.*?)\s*\n/;
    const phoneNumberRegex = /Số điện thoại:\s*(.*?)\s*\n/;
    const linkRegex = /Link cá nhân:\s*(.*?)\s*\n/;
    const addressRegex = /Địa chỉ:\s*(.*?)\s*\n/;
    const objectiveRegex = /Mục tiêu:\s*(.*?)\s*\n/;

    const emailMatch = text.match(commonInfoRegex);
    const nameMatch = text.match(nameRegex);
    const phoneNumberMatch = text.match(phoneNumberRegex);
    const linkMatch = text.match(linkRegex);
    const addressMatch = text.match(addressRegex);
    const objectiveMatch = text.match(objectiveRegex);

    const commonInfoData = {
        email: emailMatch ? emailMatch[1].trim() : null,
        name: nameMatch ? nameMatch[1].trim() : null,
        phone: phoneNumberMatch ? phoneNumberMatch[1].trim() : null,
        link: linkMatch ? linkMatch[1].trim() : null,
        address: addressMatch ? addressMatch[1].trim() : null,
        intent: objectiveMatch ? objectiveMatch[1].trim() : null
    };

    const values = Object.values(commonInfoData);
    if (values.every(value => value === null)) {
        return {};
    } else {
        return commonInfoData;
    }
}


export function parseProjects(text: string) {
    const projectRegex = new RegExp('(\\d+)\\)\\s*Dự án\\s*\\d+:\\s*[\n\r](?:\\s*Tên dự án:\\s*(.*?)\\s*[\n\r])?(?:\\s*Thời gian:\\s*(.*?)\\s*[\n\r])?(?:\\s*Link:\\s*(.*?)\\s*[\n\r])?(?:\\s*Số lượng người tham gia:\\s*(.*?)\\s*[\n\r])?(?:\\s*Vị trí:\\s*(.*?)\\s*[\n\r])?(?:\\s*Chức năng:\\s*(.*?)\\s*[\n\r])?(?:\\s*Công nghệ sử dụng:\\s*(.*?)\\s*[\n\r])?(?=\\s*\\n\\s*\\d+\\)\\s*Dự án|$)', 'gs');
    const projects = [];
    let match;

    while ((match = projectRegex.exec(text)) !== null) {
        const name = match[2] ? match[2].trim() : null;
        const time = match[3] ? match[3].trim() : null;
        const link = match[4] ? match[4].trim() : null;
        const participants = match[5] ? match[5].trim() : null;
        const position = match[6] ? match[6].trim() : null;
        const functionality = match[7] ? match[7].trim() : null;
        const technology = match[8] ? match[8].trim() : null;

        if (name !== null || time !== null || link !== null || participants !== null || position !== null || functionality !== null || technology !== null) {
            const projectData = {
                name: name,
                time: time,
                link: link,
                participant: participants,
                position: position,
                functionality: functionality,
                technology: technology,
                padIndex: 1
            };
            projects.push(projectData);
        }
    }

    return projects;
}

export function parseSkills(text: string) {
    const skillRegex = new RegExp('(\\d+)\\)\\s*Kỹ năng\\s*\\d+:\\s*[\n\r](?:\\s*Tên kỹ năng:\\s*(.*?)\\s*[\n\r])?(?:\\s*Mô tả:\\s*(.*?)(?=\\s*\\n\\s*\\d+\\)\\s*Kỹ năng|$))?', 'gs');
    const skills = [];
    let match;

    while ((match = skillRegex.exec(text)) !== null) {
        const name = match[2] ? match[2].trim() : null;
        const description = match[3] ? match[3].trim() : null;

        if (name !== null || description !== null) {
            const skillData = {
                company: name,
                description: description,
                position: null,
                time: null,
                padIndex: 1
            };
            skills.push(skillData);
        }
    }

    return skills;
}


export function parseExperience(text: string) {
    const experienceRegex = new RegExp('(\\d+)\\)\\s*Kinh nghiệm\\s*\\d+:\\s*[\n\r](?:\\s*Vị trí:\\s*(.*?)\\s*[\n\r])?(?:\\s*Công ty:\\s*(.*?)\\s*[\n\r])?(?:\\s*Thời gian:\\s*(.*?)\\s*[\n\r])?(?:\\s*Mô tả:\\s*(.*?)(?=\\s*\\n\\s*\\d+\\)\\s*Kinh nghiệm|$))?', 'gs');
    const experiences = [];
    let match;

    while ((match = experienceRegex.exec(text)) !== null) {
        const position = match[2] ? match[2].trim() : null;
        const company = match[3] ? match[3].trim() : null;
        const time = match[4] ? match[4].trim() : null;
        const description = match[5] ? match[5].trim() : null;

        if (position !== null || company !== null || time !== null || description !== null) {
            const experienceData = {
                position: position,
                company: company,
                time: time,
                description: description,
                padIndex: 1
            };
            experiences.push(experienceData);
        }
    }

    return experiences;
}


export function parseEducation(text: string) {
    const educationRegex = new RegExp('(\\d+)\\)\\s*Học vấn\\s*\\d+:\\s*\\n(?:\\s*Chuyên ngành:\\s*(.*?)\\s*\\n)?(?:\\s*Trường:\\s*(.*?)\\s*\\n)?(?:\\s*Thời gian:\\s*(.*?)\\s*\\n)?(?:\\s*Mô tả:\\s*(.*?)(?=\\s*(?:\\d+|$)))?', 'gs');
    const educations = [];
    let match;

    while ((match = educationRegex.exec(text)) !== null) {
        const position = match[2] ? match[2].trim() : null;
        const company = match[3] ? match[3].trim() : null;
        const time = match[4] ? match[4].trim() : null;
        const description = match[5] ? match[5].trim() : null;

        if (position !== null || company !== null || time !== null || description !== null) {
            const educationData = {
                position: position,
                company: company,
                time: time,
                description: description,
                padIndex: 1
            };
            educations.push(educationData);
        }
    }

    return educations;
}

