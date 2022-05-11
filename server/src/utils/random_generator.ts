import { uniqueNamesGenerator, Config, adjectives, colors, animals, NumberDictionary } from 'unique-names-generator';

const numberDictionary = NumberDictionary.generate({ min: 1000, max: 9999 });
const customConfig: Config = {
    dictionaries: [adjectives, colors, numberDictionary],
    separator: '_',
    length: 2,
    style: 'capital'
};

export function getRandomUsername(): string {
    const userName: string = uniqueNamesGenerator(customConfig);
    return userName;
}

export function getRandomRoomName(): string {
    const roomName: string = uniqueNamesGenerator({
        dictionaries: [numberDictionary],
        length: 1,
        separator: '',
    });
    return roomName;
}