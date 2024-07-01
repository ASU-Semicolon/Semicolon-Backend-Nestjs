import { faker } from '@faker-js/faker';
import { Enums } from '../types/enums';

const generateCandidate = () => {
    let Events = Object.values(Enums.Event);
    let CandidateTypes = Object.values(Enums.CandidateType);
    let AcademicYears = Object.values(Enums.AcademicYear);
    let Preferences = [
        'Frontend',
        'Backend',
        'Embedded',
        'DevOps',
        'Data Science',
    ];

    return {
        name: faker.person.fullName(),
        college: `${faker.company.name()} College`,
        event: Events[Math.floor(Math.random() * Events.length)],
        email: faker.internet.email(),
        phone: `011${faker.string.numeric(8)}`,
        first_preference:
            Preferences[Math.floor(Math.random() * Preferences.length)],
        first_preference_reason: faker.lorem.sentence(),
        second_preference:
            Preferences[Math.floor(Math.random() * Preferences.length)],
        second_preference_reason: faker.lorem.sentence(),
        previous_experience: faker.lorem.sentence(),
        academic_year:
            AcademicYears[Math.floor(Math.random() * AcademicYears.length)],
        type: CandidateTypes[Math.floor(Math.random() * CandidateTypes.length)],
    };
};

const populate = async () => {
    for (let i = 0; i < 1000; i++) {
        try {
            let response = await fetch(
                `http://localhost:${process.env.PORT}/api/candidates`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(generateCandidate()),
                },
            );
            console.log('Candidate added successfully!');
        } catch (error) {
            console.error(error);
        }
    }
};

populate();
