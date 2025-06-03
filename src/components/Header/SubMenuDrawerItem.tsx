import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { type FC, type MouseEvent, useCallback, useState } from 'react';
import MenuDrawItem from './MenuDrawerItem';
import type { SubMenuDrawerItemProps } from './types';

const SubMenuDrawerItem: FC<SubMenuDrawerItemProps> = ({
  name,
  isActiveChild,
  isActiveParent,
  icon,
  children,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActiveParent);

  const handleMenuExpanded = useCallback((e?: MouseEvent) => {
    e?.stopPropagation();
    setIsExpanded((d) => !d)
  }, []);


  return (
    <>
      <MenuDrawItem
        aria-expanded={isExpanded}
        aria-controls={`${name}-submenu`}
        expandedIcon={
          !isExpanded ?
            <ExpandMoreRounded /> :
            <ExpandLessRounded />
        }
        icon={icon}
        isActive={isActiveParent}
        key={name}
        onClick={handleMenuExpanded}
        text={name}
      />
      {
        isExpanded && (
          <div id={`${name}-submenu`} role="group">
            {
              children?.map((ch) => (
                <MenuDrawItem
                  key={ch.name}
                  isActive={isActiveChild(ch.path)}
                  onClick={() => onClick(ch.path)}
                  text={ch.name}
                />
              ))
            }
          </div>
        )
      }
    </>
  );
};

export default SubMenuDrawerItem;