import React, { useState } from 'react'
import { DefaultButton, Panel, PanelType, PrimaryButton, Stack, Text, TextField } from '@fluentui/react'
import { v4 } from 'uuid';
import AvailableCardList from './AvailableCardList';
import { CardListItem } from './cards/common/common-card-model';

type AddCardPanelProps = {
    isOpen: boolean;
    dismissPanel: () => void;
    addCard: (cardConfig: any) => void
}

const buttonStyles = { root: { marginRight: 8 } };

const AddCardPanel: React.FC<AddCardPanelProps> = ({ isOpen, dismissPanel, addCard }) => {

  const [filter, setFilter] = useState("")
  const [selectedCard, setSelectedCard] = useState<CardListItem | undefined>();
  
  const onAddCard = React.useCallback(() => {
    addCard({
      id: v4(),
      type: selectedCard?.type,
    });
    dismissPanel();
  }, [addCard, selectedCard])

  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={onAddCard} disabled={!selectedCard} styles={buttonStyles}>
          Adicionar
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancelar</DefaultButton>
      </div>
    ),
    [dismissPanel, onAddCard, selectedCard],
  );

  const onRenderHeader = React.useCallback(() => (
    <Stack horizontal={false} gap={8} padding={"0 24px 24px 24px"} horizontalAlign={"start"} verticalAlign={"center"} style={{ flex: 1 }}>
      <Stack.Item>
        <Text variant={"xLarge"}>Adicionar card</Text>
      </Stack.Item>
      <Stack.Item>
        <Text variant={"medium"}>Selecione o tipo de card desejado</Text>
      </Stack.Item>
      <Stack.Item styles={{ root: { width: '100%' }}}>
        <TextField
          placeholder={"Busque por nome/descrição"}
          width={"100%"}
          onChange={(_, value) => setFilter(value || "")}
        />
      </Stack.Item>
    </Stack>
  ), [])

  return (
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.medium}
        headerText="Adicionar Card"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        onRenderHeader={onRenderHeader}
        isFooterAtBottom={true}
      >
        <AvailableCardList 
          filter={filter} 
          selectedItem={selectedCard}
          setSelectedItem={setSelectedCard}  
        />
      </Panel>
  )
}

AddCardPanel.defaultProps = {
    isOpen: false,
    dismissPanel: () => {}
}

export default AddCardPanel;