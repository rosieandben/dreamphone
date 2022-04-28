import { AnswerAbout, boys } from './models.js';
import fs from 'fs';

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

const shuffleCollection = (collection) => {
    return collection.sort(() => Math.random() - 0.5);
}

const allocateVideos = (startupBoys) => {
    const locationVideos = shuffleCollection(fs.readdirSync('./resources/video/Location'));
    const sportVideos = shuffleCollection(fs.readdirSync('./resources/video/Sport'));
    const foodVideos = shuffleCollection(fs.readdirSync('./resources/video/Food'));
    const clothesVideos = shuffleCollection(fs.readdirSync('./resources/video/Clothes'));

    for (const boy of startupBoys) {
        switch (boy.answerAbout) {
            case AnswerAbout.Location:
                boy.gameAttributes.allocatedVideo = locationVideos.pop();
                break;

            case AnswerAbout.Sport:
                boy.gameAttributes.allocatedVideo = sportVideos.pop();
                break;

            case AnswerAbout.Food:
                boy.gameAttributes.allocatedVideo = foodVideos.pop();
                break;

            case AnswerAbout.Clothes:
                boy.gameAttributes.allocatedVideo = clothesVideos.pop();
                break;
        }
    }
}

const generateAnswers = (admirer) => {

}