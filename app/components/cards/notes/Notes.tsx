import React from 'react'
import { CardListItem, CardType } from './../common/common-card-model';

type NotesProps = {}

const Notes: React.FC<NotesProps> = () => {
  return (
    <div>
      Notes Works!
    </div>
  )
}

export const NotesCardDefinition: CardListItem = {
  name: 'Anotações',
  iconName: 'QuickNoteSolid',
  component: Notes,
  type: CardType.NOTES,
  description: 'Mantenha todas suas anotações em um único lugar!'
}

export default Notes;