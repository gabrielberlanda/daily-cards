import React from 'react'
import { CardListItem, CardType } from './../common/common-card-model';

type TomatoTimerProps = {}

const TomatoTimer: React.FC<TomatoTimerProps> = () => {
  return (
    <div>
      TomatoTimer Works!
    </div>
  )
}

export const TomatoTimerCardDefinition: CardListItem = {
  name: 'Tomato timer',
  iconName: 'Timer',
  component: TomatoTimer,
  type: CardType.TOMATO_TIMER,
  description: 'Tomate é mt ruim kkkk'
}

export default TomatoTimer;