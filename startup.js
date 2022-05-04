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

const getVideoFileFromPath = (path) => {
    const lastSlashIndex = path.lastIndexOf('/');
    return path.substr(lastSlashIndex + 1)
}

const setVideo = (video, boy) => {
    const videoFile = getVideoFileFromPath(video);
    boy.gameAttributes.correctAnswerVideo = `resources/video/CorrectAnswer/${videoFile}`;
    boy.gameAttributes.incorrectAnswerVideo = `resources/video/IncorrectAnswer/${videoFile}`;
    boy.gameAttributes.allocatedVideo = video;
}

const setVideosAndAnswers = (answers, videos, boy, answerPhrase) => {
    const answer = answers.pop();
    if (answer) {
        const video = videos.pop();
        if (video) {
            setVideo(video, boy);
        }
        boy.gameAttributes.answerToReveal = `${answerPhrase} <b>${answer.toUpperCase()}</b>`;
    } else {
        // remove a normal answer video from the collection
        const normalVideo = videos.pop();
        if (normalVideo) {
            const videoFile = getVideoFileFromPath(normalVideo);
            // use that person's video from the not telling collection
            const notTellingVideo = `resources/video/NotTelling/${videoFile}`;
            if (notTellingVideo) {
                setVideo(notTellingVideo, boy);
            }
        }
        boy.gameAttributes.answerToReveal = `<b>Gotcha!</b>`;
    }
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
        ['resources/video/Clothes/Lindsey.mp4']
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

    startupBoys = shuffleCollection(startupBoys);
    for (const boy of startupBoys) {
        switch (boy.answerAbout) {
            case AnswerAbout.Location:
                setVideosAndAnswers(locationAnswers, locationVideos, boy, "He's not at the");
                break;

            case AnswerAbout.Sport:
                setVideosAndAnswers(sportAnswers, sportVideos, boy, 'But not');
                break;

            case AnswerAbout.Food:
                setVideosAndAnswers(foodAnswers, foodVideos, boy, 'Except');
                break;

            case AnswerAbout.Clothes:
                setVideosAndAnswers(clothesAnswers, clothesVideos, boy, "He's not wearing");
                break;
        }
    }
}

export { startupBoys }