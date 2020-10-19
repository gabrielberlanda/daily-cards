import { CardListItem, CardType } from "./common/common-card-model";
import { NotesCardDefinition } from "./notes/Notes"
import { TodoCardDefinition } from './todo/Todo'
import { TomatoTimerCardDefinition } from './tomato-timer/TomatoTimer'

export const dicCardTypeToCardListItem: Record<CardType, CardListItem> = {
  [CardType.TODO]           : TodoCardDefinition,
  [CardType.NOTES]          : NotesCardDefinition,
  [CardType.TOMATO_TIMER]   : TomatoTimerCardDefinition
}

const cardList: CardListItem[] = Object.values(dicCardTypeToCardListItem);

export default cardList;