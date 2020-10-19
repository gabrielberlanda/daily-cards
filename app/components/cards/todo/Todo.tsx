import React from 'react'
import { CardListItem, CardType } from './../common/common-card-model';

type TodoProps = {}

const Todo: React.FC<TodoProps> = () => {
  return (
    <div>
      Todo Works!
    </div>
  )
}

export const TodoCardDefinition: CardListItem = {
  name: 'To Do!',
  iconName: 'EventToDoLogo',
  component: Todo,
  type: CardType.TODO,
  description: 'Just do it =p'
}

export default Todo;