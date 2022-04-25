import { AnswerAbout, boys } from './models.js';

export const runSetup = () => {
    const admirer = chooseAdmirer();
    allocateVideos();
    generateAnswers();
}

const chooseAdmirer = () => {
    const randomIndex = Math.floor(Math.random() * boys.length);
    boys[randomIndex].gameAttributes.isAdmirer = true;
    return boys[randomIndex];
}

const allocateVideos = () => {
    for (const boy of boys) {
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