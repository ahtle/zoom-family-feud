import { PrismaClient } from '@prisma/client';
let questions = require('./questions.json');

const prisma = new PrismaClient();

async function main() {
    for (let question of questions) {
        const q = await prisma.question.create({
            data: {
                name: question.name
            }
        });
        
        for (let answer of question.answers) {
            await prisma.answer.create({
                data: {
                    name: answer.name,
                    points: answer.points,
                    questionId: q.id
                }
            })
        }
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})