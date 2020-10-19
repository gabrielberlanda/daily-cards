import React, { memo, useCallback, useEffect, useState } from 'react';
import { PrimaryButton, Text } from '@fluentui/react';
import RGL, { WidthProvider } from "react-grid-layout";
import firebase from './../firebase'
import BaseCard from '../components/BaseCard';
import { useBoolean } from '@uifabric/react-hooks';
import AddCardPanel from '../components/AddCardPanel';
import { ipcRenderer } from 'electron'
import { CardType } from '../components/cards/common/common-card-model';
import { useFirebaseLayout } from '../context/FirebaseLayoutContext';

const ReactGridLayout = WidthProvider(RGL);

type Props = {
  className?: string;
  cols?:number;
  rowHeight?: number;
};

type LayoutItem = RGL.Layout & { type: CardType };

const firebaseLayoutRef = firebase.database().ref('/layout')

const CardDashboard: React.FC<Props> = memo((props) => {
  const [ isOpen, { setTrue: openPanel, setFalse: dismissPanel } ] = useBoolean(false);
  const {  addCard, getLayout, removeCardItem, updateLayout  } = useFirebaseLayout();
  const items = getLayout() || [];

  useEffect(() => {

    ipcRenderer.on('msg:add-card', () => {
      openPanel();
    })

  }, [])

  const renderItem = useCallback((element: LayoutItem) => {
    console.log("ELEEMENT", element)
    return (
      <div  key={element.i}>
        <BaseCard id={element.i} type={element.type}  removeCard={removeCardHandler}>
        </BaseCard>
      </div>
    )
  }, [items]);

  const createItem = useCallback((card: { id: string, type: CardType} ) => {
    addCard(card.type);
  }, [addCard]);

  const removeCardHandler = useCallback((cardId) => {
    removeCardItem(cardId);
  }, [removeCardItem])

  const onLayoutchange = useCallback((layoutItems: RGL.Layout[]) => {
    updateLayout(layoutItems)
  }, [updateLayout])

  return (
    <>
      <Text title={"Works"} block variant={"xLarge"}>Card Dashboard Works!</Text>
      <PrimaryButton onClick={openPanel}>
        Adicionar Card
      </PrimaryButton>

      <AddCardPanel 
        isOpen={isOpen}
        addCard={createItem}
        dismissPanel={dismissPanel}
      />

      <ReactGridLayout
        layout={items}
        onLayoutChange={onLayoutchange}
        {...props}
      >
        { items.map(renderItem) }
      </ReactGridLayout>
    </>
  )
})

CardDashboard.defaultProps = {
  // className: 'layout',
  rowHeight: 100,
  cols: 12,

}

export default CardDashboard;