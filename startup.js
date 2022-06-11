import { AnswerAbout, Location, Sport, Food, Clothes, boys } from './models.js';

export const startupBoys = JSON.parse(JSON.stringify(boys));

export const runStartup = () => {
    const admirer = chooseAdmirer(startupBoys);
    allocateVideosAndAnswers(startupBoys, admirer);
    return admirer;
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
    for (const type of Object.values(answerType)) {
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
        return video ? getVideoFileFromPath(video) : null;
    } else {
        // remove a normal answer video from the collection
        const normalVideo = videos.pop();
        let videoFile = null;
        if (normalVideo) {
            videoFile = getVideoFileFromPath(normalVideo)
            // use that person's video from the not telling collection
            const notTellingVideo = `resources/video/NotTelling/${videoFile}`;
            if (notTellingVideo) {
                setVideo(notTellingVideo, boy);
            }
        }
        boy.gameAttributes.answerToReveal = `<b>Gotcha!</b>`;
        return videoFile;
    }
}

const constructVideoPaths = (answerAboutOption) => {
    const videoFiles = ['Alex', 'Amy', 'Ben', 'Beth', 'Chloe', 'Chrystal', 'Dad', 'Gemma', 'George', 'Georgia', 'Hannah', 'Jesse', 'Julio', 'Katy',
     'Kelvin', 'Kelly', 'Lindsey', 'Liz', 'Lesley', 'Megan', 'Mum', 'Rosie', 'Simon', 'Sophie', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
     '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];

    const filePaths = [];
    for (const file of videoFiles) {
        filePaths.push(`resources/video/${answerAboutOption}/${file}.mp4`);
    }
    return filePaths;
}

const removeVideoFromCollection = (videos, answerAbout, videoToRemove) => {
    const index = videos.indexOf(`resources/video/${answerAbout}/${videoToRemove}`);
    videos.splice(index, 1);
}

const allocateVideosAndAnswers = (startupBoys, admirer) => {
    const locationVideos = shuffleCollection(
        constructVideoPaths(AnswerAbout.Location)
    );
    const sportVideos = shuffleCollection(
        constructVideoPaths(AnswerAbout.Sport)
    );
    const foodVideos = shuffleCollection(
        constructVideoPaths(AnswerAbout.Food)
    );
    const clothesVideos = shuffleCollection(
        constructVideoPaths(AnswerAbout.Clothes)
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
                const locationVideoToRemove = setVideosAndAnswers(locationAnswers, locationVideos, boy, "He's not at the");
                if (!locationVideoToRemove) {
                    break;
                }
                for (const answerAbout of Object.keys(AnswerAbout)) {
                    switch (answerAbout) {
                        case AnswerAbout.Sport:
                            removeVideoFromCollection(sportVideos, answerAbout, locationVideoToRemove);
                            break;

                        case AnswerAbout.Food:
                            removeVideoFromCollection(foodVideos, answerAbout, locationVideoToRemove);
                            break;

                        case AnswerAbout.Clothes:
                            removeVideoFromCollection(clothesVideos, answerAbout, locationVideoToRemove);
                            break;
                    }
                }
                break;

            case AnswerAbout.Sport:
                const sportVideoToRemove = setVideosAndAnswers(sportAnswers, sportVideos, boy, 'But not');
                if (!sportVideoToRemove) {
                    break;
                }
                for (const answerAbout of Object.keys(AnswerAbout)) {
                    switch (answerAbout) {
                        case AnswerAbout.Location:
                            removeVideoFromCollection(locationVideos, answerAbout, sportVideoToRemove);
                            break;

                        case AnswerAbout.Food:
                            removeVideoFromCollection(foodVideos, answerAbout, sportVideoToRemove);
                            break;

                        case AnswerAbout.Clothes:
                            removeVideoFromCollection(clothesVideos, answerAbout, sportVideoToRemove);
                            break;
                    }
                }            
                break;

            case AnswerAbout.Food:
                const foodVideoToRemove = setVideosAndAnswers(foodAnswers, foodVideos, boy, 'Except');
                if (!foodVideoToRemove) {
                    break;
                }
                for (const answerAbout of Object.keys(AnswerAbout)) {
                    switch (answerAbout) {
                        case AnswerAbout.Location:
                            removeVideoFromCollection(locationVideos, answerAbout, foodVideoToRemove);
                            break;

                        case AnswerAbout.Sport:
                            removeVideoFromCollection(sportVideos, answerAbout, foodVideoToRemove);
                            break;

                        case AnswerAbout.Clothes:
                            removeVideoFromCollection(clothesVideos, answerAbout, foodVideoToRemove);
                            break;
                    }
                }     
                break;

            case AnswerAbout.Clothes:
                const clothesVideoToRemove = setVideosAndAnswers(clothesAnswers, clothesVideos, boy, "He's not wearing");
                if (!clothesVideoToRemove) {
                    break;
                }                
                for (const answerAbout of Object.keys(AnswerAbout)) {
                    switch (answerAbout) {
                        case AnswerAbout.Location:
                            removeVideoFromCollection(locationVideos, answerAbout, clothesVideoToRemove);
                            break;

                        case AnswerAbout.Sport:
                            removeVideoFromCollection(sportVideos, answerAbout, clothesVideoToRemove);
                            break;

                        case AnswerAbout.Food:
                            removeVideoFromCollection(foodVideos, answerAbout, clothesVideoToRemove);
                            break;
                    }
                }                
                break;
        }
    }
}