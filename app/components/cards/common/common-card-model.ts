enum CardType {
  TODO,
  NOTES,
  TOMATO_TIMER
}

type CardListItem = {
  name: string;
  iconName: string;
  type: CardType;
  description?: string;
  component: React.ReactNode;
  componentSettings?: React.ReactNode;
}

export {
  CardType,
  CardListItem
}