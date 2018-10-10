import Chance from 'chance';

const nameGetter = new Chance();

export const getAName = () => nameGetter.first();
