import { AnswerAbout, Location, Sport, Food, Clothes, boys } from './models.js';

export const startupBoys = JSON.parse(JSON.stringify(boys));

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
    const videoFiles = ['Alex.mp4', 'Amy.mp4', 'Ben.mp4', 'Beth.mp4', 'Chloe.mp4', 'Chrystal.mp4', 'Dad.mp4', 'Gemma.mp4', 'George.mp4', 'Georgia.mp4', 'Hannah.mp4', 'Jesse.mp4', 'Julio.mp4', 'Katy.mp4',
     'Kelvin.mp4', 'Kelly.mp4', 'Lindsey.mp4', 'Liz.mp4', 'Lesley.mp4', 'Megan.mp4', 'Mum.mp4', 'Rosie.mp4', 'Sophie.mp4', '1.MOV', '2.mp4', '3.mp4', '4.mp4', '5.mp4', '6.mp4', '7.mp4', '8.mp4',
     '9.mp4', '10.mp4', '11.mp4', '12.mp4', '13.mp4', '14.mp4', '15.mp4'];

    const filePaths = [];
    for (const file of videoFiles) {
        filePaths.push(`resources/video/${answerAboutOption}/${file}`);
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