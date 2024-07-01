import { faker } from '@faker-js/faker';
import { Enums } from '../types/enums';

const generateCandidate = () => {
    const Events = Object.values(Enums.Event);
    const Status = Object.values(Enums.CandidateStatus);
    const CandidateTypes = Object.values(Enums.CandidateType);
    const AcademicYears = Object.values(Enums.AcademicYear);
    const Preferences = [
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
        acceptance_status: Status[Math.floor(Math.random() * Status.length)],
        evaluation: {
            notes: {
                commitment: {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                teamwork: {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                'time management': {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                'communication skills': {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                flexibility: {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                ethics: {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                leadership: {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                'stress management': {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                'problem solving': {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
                'eager to learn': {
                    note: faker.lorem.sentence(),
                    rating: Math.floor(Math.random() * 6),
                },
            },
        },
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
