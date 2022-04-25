const AnswerAbout = {
    Location: 'Location',
    Sport: 'Sport',
    Food: 'Food',
    Clothes: 'Clothes'
}

const Sport = {
    Football: 'Football',
    Skateboarding: 'Skateboarding',
    Volleyball: 'Volleyball',
    Surfing: 'Surfing',
    Basketball: 'Basketball',
    Tennis: 'Tennis'
}

const Food = {
    Biscuits: 'Biscuits',
    IceCream: 'Ice cream',
    HotDogs: 'Hot dogs',
    Pizza: 'Pizza',
    Sweets: 'Sweets',
    Popcorn: 'Popcorn'
}

const Location = {
    Mall: 'Mall',
    SnackShop: 'Snack Shop',
    Movies: 'Movies',
    Park: 'Park',
    Beach: 'Beach',
    Gym: 'Gym'
}

const Clothes = {
    Jeans: 'Jeans',
    Tie: 'Tie',
    Jacket: 'Jacket',
    Glasses: 'Glasses',
    Hat: 'Hat',
    Yellow: 'Yellow'
}

export const boys = [
    {
        name: 'Dave',
        number: '555-1111',
        answerAbout: AnswerAbout.Location,
        location: Location.Mall,
        sport: null,
        food: Food.Biscuits,
        clothes: Clothes.Jeans
    },
    {
        name: 'George',
        number: '555-1233',
        answerAbout: AnswerAbout.Location,
        location: Location.Mall,
        sport: null,
        food: Food.IceCream,
        clothes: Clothes.Tie
    },
    {
        name: 'Chris',
        number: '555-4566',
        answerAbout: AnswerAbout.Location,
        location: Location.Mall,
        sport: null,
        food: Food.IceCream,
        clothes: Clothes.Jacket
    },
    {
        name: 'Alan',
        number: '555-7899',
        answerAbout: AnswerAbout.Location,
        location: Location.Mall,
        sport: null,
        food: Food.Biscuits,
        clothes: Clothes.Tie
    },
    {
        name: 'James',
        number: '555-1233',
        answerAbout: AnswerAbout.Location,
        location: Location.SnackShop,
        sport: null,
        food: Food.HotDogs,
        clothes: Clothes.Jacket
    },
    {
        name: 'Phil',
        number: '555-3333',
        answerAbout: AnswerAbout.Location,
        location: Location.SnackShop,
        sport: null,
        food: Food.Pizza,
        clothes: Clothes.Glasses
    },
    {
        name: 'Bruce',
        number: '555-3699',
        answerAbout: AnswerAbout.Sport,
        location: Location.SnackShop,
        sport: null,
        food: Food.Pizza,
        clothes: Clothes.Tie
    },
    {
        name: 'Andy',
        number: '555-1477',
        answerAbout: AnswerAbout.Sport,
        location: Location.SnackShop,
        sport: null,
        food: Food.HotDogs,
        clothes: Clothes.Jeans
    },
    {
        name: 'Ben',
        number: '555-9877',
        answerAbout: AnswerAbout.Sport,
        location: Location.Movies,
        sport: null,
        food: Food.Sweets,
        clothes: Clothes.Tie
    },
    {
        name: 'Gary', 
        number: '555-3211',
        answerAbout: AnswerAbout.Sport,
        location: Location.Movies,
        sport: null,
        food: Food.Popcorn,
        clothes: Clothes.Jeans
    },
    {
        name: 'Dan',
        number: '555-7777',
        answerAbout: AnswerAbout.Sport,
        location: Location.Movies,
        sport: null,
        food: Food.Sweets,
        clothes: Clothes.Jeans
    },
    {
        name: 'Henry',
        number: '555-6544',
        answerAbout: AnswerAbout.Sport,
        location: Location.Movies,
        sport: null,
        food: Food.Popcorn,
        clothes: Clothes.Jacket
    },
    {
        name: 'Mark',
        number: '555-8522',
        answerAbout: AnswerAbout.Food,
        location: Location.Park,
        sport: Sport.Football,
        food: null,
        clothes: Clothes.Hat
    },
    {
        name: 'Jason',
        number: '555-7411',
        answerAbout: AnswerAbout.Food,
        location: Location.Park,
        sport: Sport.Football,
        food: null,
        clothes: Clothes.Glasses
    },
    {
        name: 'Steve',
        number: '555-9999',
        answerAbout: AnswerAbout.Food,
        location: Location.Park,
        sport: Sport.Skateboarding,
        food: null,
        clothes: Clothes.Jacket
    },
    {
        name: 'John',
        number: '555-9633',
        answerAbout: AnswerAbout.Food,
        location: Location.Park,
        sport: Sport.Skateboarding,
        food: null,
        clothes: Clothes.Yellow        
    },
    {
        name: 'Paul',
        number: '555-5515',
        answerAbout: AnswerAbout.Food,
        location: Location.Beach,
        sport: Sport.Volleyball,
        food: null,
        clothes: Clothes.Yellow
    },
    {
        name: 'Tony',
        number: '555-2442',
        answerAbout: AnswerAbout.Food,
        location: Location.Beach,
        sport: Sport.Volleyball,
        food: null,
        clothes: Clothes.Hat
    },
    {
        name: 'Richard',
        number: '555-3535',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Beach,
        sport: Sport.Surfing,
        food: null,
        clothes: Clothes.Yellow
    },
    {
        name: 'Mike',
        number:	'555-2226',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Beach,
        sport: Sport.Surfing,
        food: null,
        clothes: Clothes.Hat
    },
    {
        name: 'Scott',
        number: '555-5599',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Gym,
        sport: Sport.Basketball,
        food: null,
        clothes: Clothes.Yellow
    },
    {
        name: 'Bob',
        number: '555-4884',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Gym,
        sport: Sport.Basketball,
        food: null,
        clothes: Clothes.Glasses
    },
    {
        name: 'Charlie',
        number: '555-6668',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Gym,
        sport: Sport.Tennis,
        food: null,
        clothes: Clothes.Hat
    },
    {
        name: 'Matt',
        number: '555-7557',
        answerAbout: AnswerAbout.Clothes,
        location: Location.Gym,
        sport: Sport.Tennis,
        food: null,
        clothes: Clothes.Glasses
    }
]