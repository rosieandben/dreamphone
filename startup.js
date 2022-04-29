import { AnswerAbout, Location, Sport, Food, Clothes, boys } from './models.js';

const startupBoys = JSON.parse(JSON.stringify(boys));

export const runStartup = () => {
    const admirer = chooseAdmirer(startupBoys);
    allocateVideosAndAnswers(startupBoys, admirer);
}

const chooseAdmirer = (startupBoys) => {
    const randomIndex = Math.floor(Math.random() * startupBoys.length);
    startupBoys[randomIndex].gameAttributes.isAdmirer = true;
    return startupBoys[randomIndex];
}

const shuffleCollection = (collection) => {
    return collection.sort(() => Math.random() - 0.5);
}

const generateAnswers = (answerType, admirerAnswer) => {
    const answers = [];
    for (const type of Object.keys(answerType)) {
        if (type != admirerAnswer) {
            answers.push(type);
        }
    }
    return answers;
}

const allocateVideosAndAnswers = (startupBoys, admirer) => {
    // TODO: Having to manually maintain list of videos (can use fs locally to parse folders) because fs won't run in browser
    const locationVideos = shuffleCollection(
        ['resources/video/Location/Lindsey.mp4']
    );
    const sportVideos = shuffleCollection(
        ['resources/video/Sport/Lindsey.mp4']
    );
    const foodVideos = shuffleCollection(
        ['resources/video/Food/Lindsey.mp4']
    );
    const clothesVideos = shuffleCollection(
        []
    );
    const notTellingVideos = shuffleCollection(
        ['resources/video/NotTelling/Lindsey.mp4']
    );

    const locationAnswers = shuffleCollection(
        generateAnswers(Location, admirer.location)
    );
    const sportAnswers = shuffleCollection(
        generateAnswers(Sport, admirer.sport
    ));
    const foodAnswers = shuffleCollection(
        generateAnswers(Food, admirer.food)
    );
    const clothesAnswers = shuffleCollection(
        generateAnswers(Clothes, admirer.clothes)
    );

    for (const boy of startupBoys) {
        switch (boy.answerAbout) {
            case AnswerAbout.Location:
                const locationAnswer = locationAnswers.pop();
                if (locationAnswer) {
                    boy.gameAttributes.allocatedVideo = locationVideos.pop();
                    boy.gameAttributes.answerToReveal = `He's not at the <b>${locationAnswer.toUpperCase()}</b>`;
                } else {
                    // TODO: may end up with the same person 'not telling' as giving another answer
                    boy.gameAttributes.allocatedVideo = notTellingVideos.pop();
                }
                break;

            case AnswerAbout.Sport:
                const sportAnswer = sportAnswers.pop();
                if (sportAnswer) {
                    boy.gameAttributes.allocatedVideo = sportVideos.pop();
                    boy.gameAttributes.answerToReveal = `But not <b>${sportAnswer.toUpperCase()}</b>`;
                } else {
                    // TODO: may end up with the same person 'not telling' as giving another answer
                    boy.gameAttributes.allocatedVideo = notTellingVideos.pop();
                }
                break;

            case AnswerAbout.Food:
                const foodAnswer = foodAnswers.pop();
                if (foodAnswer) {
                    boy.gameAttributes.allocatedVideo = foodVideos.pop();
                    boy.gameAttributes.answerToReveal = `Except <b>${foodAnswer.toUpperCase()}</b>`;
                } else {
                    // TODO: may end up with the same person 'not telling' as giving another answer
                    boy.gameAttributes.allocatedVideo = notTellingVideos.pop();
                }
                break;

            case AnswerAbout.Clothes:
                const clothesAnswer = clothesAnswers.pop();
                if (clothesAnswer) {
                    boy.gameAttributes.allocatedVideo = clothesVideos.pop();
                    boy.gameAttributes.answerToReveal = `He's not wearing <b>${clothesAnswer.toUpperCase()}</b>`;
                } else {
                    // TODO: may end up with the same person 'not telling' as giving another answer
                    boy.gameAttributes.allocatedVideo = notTellingVideos.pop();
                }
                break;
        }
    }
}

export { startupBoys }