import React, { useCallback } from 'react'
import { DefaultEffects, IconButton, IIconProps,  Stack, Text } from '@fluentui/react'
import { CardType } from './cards/common/common-card-model'
import { dicCardTypeToCardListItem } from './cards/cardList'

type BaseCardProps = {
    id: string,
    type: CardType,
    removeCard: (id: string) => void
}

const cancelIconProps: IIconProps = {
    iconName: 'Cancel'
};

const settingsIconProps: IIconProps = {
    iconName: 'Settings'
}

const BaseCard: React.FC<BaseCardProps> = ({ id, removeCard, type }) => {

    const onRemoveCard = useCallback(() => {
        removeCard && removeCard(id)
    }, [id, removeCard])

    const renderCardComponent = useCallback(() => {
        const cardListItem = dicCardTypeToCardListItem[type];
        
        if(!cardListItem) return null;

        const { component: Component } = cardListItem;
        
        return Component();     
        
    }, [id, type])

    return (
        <div style={containerStyle}>
            <Stack horizontal horizontalAlign={"start"} padding={"4px 8px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.133) 0px 1.6px 0.6px 0px' }} verticalAlign={"center"}>
                <Stack.Item styles={{ root: { flex: 1 }}}>
                    <Text>Element {id}</Text>
                </Stack.Item>
                <Stack.Item>
                    <IconButton
                        iconProps={settingsIconProps}
                        title={"Configurações"}
                    />
                    <IconButton
                        iconProps={cancelIconProps}
                        onClick={onRemoveCard}
                        title={"Remover"}
                    />
                </Stack.Item>
            </Stack>
            { renderCardComponent() }
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    boxShadow: DefaultEffects.elevation8,
    height: '100%',
    width: '100%'
}

BaseCard.defaultProps = {

}

export default BaseCard;