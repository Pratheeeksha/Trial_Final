import ticket_tagger from './functions/ticket_tagger';

export const functionFactory = {
  // Add your functions here
  ticket_tagger,

} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
