import { Alert, type AlertProps } from 'antd';
import type { FC } from 'react';
import Marquee from 'react-fast-marquee';
import type { NotificationsProps } from './types';

const Notifications: FC<NotificationsProps> = (props) => {
  const { notifications = [] } = props;

  return (
    notifications.map((i) => (
      <Alert
        key={i.id}
        title={i.title}
        description={
          <Marquee>{i.message}</Marquee>
        }
        closable
        styles={{
          title: {
            fontWeight: 'bold',
            color: 'AccentColor'
          },
          description: {
            // color: 'AccentColor'
          }
        }}
        style={{ borderRadius: 0 }}
        type={(i?.severity_color ?? 'info') as AlertProps['type']}
        banner
      />
    ))
  );
};

export default Notifications;