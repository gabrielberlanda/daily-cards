import React, { useCallback, useEffect } from 'react'

import { FocusZone, FocusZoneDirection, getFocusStyle, getTheme, Icon, ITheme, List, mergeStyleSets } from '@fluentui/react'
import { useConst } from '@uifabric/react-hooks';
import { CardListItem } from './cards/common/common-card-model';
import cardList from './cards/cardList';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    { cursor: 'pointer' },
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  selectedItemCell: [
    {
      background: palette.themeLighterAlt,
      cursor: 'pointer'
    },
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.themeLighter },
      },
    },
  ],
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIcon: {
    alignSelf: 'center',
    flexShrink: 0,
    fontSize: fonts.xxLarge.fontSize,
    color: palette.neutralTertiary
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});


type AvailableCardListProps = {
  filter?: string;  
  selectedItem?: CardListItem,
  setSelectedItem: React.Dispatch<React.SetStateAction<CardListItem | undefined>>
}

type AvailableCardListItem = CardListItem & { selected?: boolean }
 
export const AvailableCardList: React.FC<AvailableCardListProps> = ({ filter, selectedItem, setSelectedItem }) => {

  const originalItems = useConst(() => cardList);
  const [items, setItems] = React.useState<AvailableCardListItem[]>(originalItems);

  useEffect(() => {
    
    const filterToLower = filter?.toLowerCase() || "";
    const isFiltered = (item: AvailableCardListItem) => item.name.toLowerCase().indexOf(filterToLower) > -1 || (item.description && item.description.toLowerCase().indexOf(filterToLower) > -1)
    
    const filteredItems = originalItems
      .filter(isFiltered)
      .map(item => ({
        ...item,
        selected: item.type == selectedItem?.type
      }));
    
    setItems(filteredItems);

  }, [ filter, selectedItem ])


  const onRenderCardItemCell = useCallback((item?: AvailableCardListItem): JSX.Element => {

    return (
      <div className={item?.selected ? classNames.selectedItemCell : classNames.itemCell } onClick={() => setSelectedItem(item)} data-is-focusable={true}>
        <Icon iconName={item?.iconName} className={classNames.itemIcon} />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item?.name}</div>
          <div>{item?.description}</div>
        </div>
        <Icon className={classNames.chevron} iconName={'ChevronRight'} />
      </div>
    );

  }, [selectedItem, setSelectedItem]);

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <List items={items}  onRenderCell={onRenderCardItemCell} />
    </FocusZone>
  );
};


export default AvailableCardList;