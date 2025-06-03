import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { type FC, type MouseEvent, useCallback, useState } from 'react';
import type { RouteMenu } from '../../hooks/routes/types';
import MenuDrawItem from './MenuDrawerItem';

export interface SubMenuDrawerItemProps extends RouteMenu {
  isActive: (path: string) => boolean;
  onClick: (path: string) => void;
}

const SubMenuDrawerItem: FC<SubMenuDrawerItemProps> = ({
  name,
  isActive,
  path,
  icon,
  children,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleMenuExpanded = useCallback((e?: MouseEvent) => {
    e?.stopPropagation();
    setIsExpanded((d) => !d)
  }, []);


  return (
    <>
      <MenuDrawItem
        expandedIcon={
          !isExpanded ?
            (<ExpandMoreRounded />) :
            (<ExpandLessRounded />)
        }
        icon={icon}
        isActive={isActive(path)}
        key={name}
        onClick={handleMenuExpanded}
        text={name}
      />
      {
        isExpanded && children?.map((ch, i) => (
          <MenuDrawItem
            key={ch.name}
            isActive={isActive(ch.path)}
            onClick={() => onClick(ch.path)}
            text={ch.name}
          />
        ))
      }
    </>
  );
};

export default SubMenuDrawerItem;