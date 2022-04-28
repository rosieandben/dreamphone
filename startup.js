import { AnswerAbout, boys } from './models.js';

export const runStartup = () => {
    const startupBoys = JSON.parse(JSON.stringify(boys));
    const admirer = chooseAdmirer(startupBoys);
    allocateVideos(startupBoys);
    generateAnswers(admirer);
}

const chooseAdmirer = (startupBoys) => {
    const randomIndex = Math.floor(Math.random() * startupBoys.length);
    startupBoys[randomIndex].gameAttributes.isAdmirer = true;
    return startupBoys[randomIndex];
}

const allocateVideos = (startupBoys) => {
    for (const boy of startupBoys) {
        switch (boy.answerAbout) {
            case AnswerAbout.Location:
                break;

            case AnswerAbout.Sport:
                break;

            case AnswerAbout.Food:
                break;

            case AnswerAbout.Clothes:
                break;
        }
    }
}

const generateAnswers = (admirer) => {

}