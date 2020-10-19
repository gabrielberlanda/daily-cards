import React, { useCallback, useContext, useEffect, useState } from 'react'
import RGL from "react-grid-layout"
import { CardType } from '../components/cards/common/common-card-model'
import firebase from './../firebase'
import { useConst } from '@uifabric/react-hooks'
import { v4 } from 'uuid';

type CardItemLayout = RGL.Layout & {
  type: CardType
};

interface FirebaseLayoutContextConsumer {
  layout: CardItemLayout[];
}

const firebaseLayoutRef = firebase.database().ref('/layout');

const FirebaseLayoutContext = React.createContext<FirebaseLayoutContextConsumer>({ layout: [] });

const useFirebaseLayout = () => {
  const { layout } = useContext(FirebaseLayoutContext);

  const addCard = useCallback((type: CardType) => {
    
    const newItem: CardItemLayout = {
      i: v4(),
      type,
      x: (layout.length * 2) % 12,
      y: Number.MAX_VALUE, // puts it at the bottom
      w: 2,
      h: 2
    }

    const layoutItems = [
      ...layout,
      newItem
    ]

    const parsedLayout = JSON.parse(JSON.stringify(layoutItems));
    firebaseLayoutRef.set(parsedLayout);

  }, [layout])

  const updateLayout = useCallback((currentLayout: RGL.Layout[]) => {
    const cardItemLayouts: CardItemLayout[] = currentLayout.map(e => {
      return {
        ...e,
        type: layout.find(x => e.i == x.i)!.type
      }
    })

    const parsedLayout = JSON.parse(JSON.stringify(cardItemLayouts));
    firebaseLayoutRef.set(parsedLayout);
  }, [layout])

  const removeCardItem = useCallback((cardItemId: string) => {
    const newLayout = layout.filter(e => e.i !== cardItemId);

    const parsedLayout = JSON.parse(JSON.stringify(newLayout));
    console.log("Remove", { newLayout, parsedLayout })
    firebaseLayoutRef.set(parsedLayout);
  }, [layout])

  const getLayout = useCallback(() => {
    return layout;
  }, [layout]);

  return {
    addCard,
    updateLayout,
    removeCardItem,
    getLayout
  }
}



const FirebaseLayoutContextProvider: React.FC = ({ children }) => {
  
  const [layout, setLayout] = useState<CardItemLayout[]>([]);

  useEffect(() => {
    var onLayoutRef = firebaseLayoutRef.on('value', (snap) => {
      const items = snap.val();
      console.log("FIREBASE ON VALUE", items)
      setLayout(items || [])
    })

    return () => {
      firebaseLayoutRef.off('value', onLayoutRef)
    }
  }, [])

  return (
    <FirebaseLayoutContext.Provider value={{
      layout,
    }}>
      { children }
    </FirebaseLayoutContext.Provider>
  )
}

export {
  FirebaseLayoutContextProvider,
  useFirebaseLayout
}

export default FirebaseLayoutContext;