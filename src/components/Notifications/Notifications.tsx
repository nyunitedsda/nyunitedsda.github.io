import { Alert, type AlertProps, theme } from 'antd';
import { type FC, useMemo } from 'react';
import Marquee from 'react-fast-marquee';
import type { NotificationsProps } from './types';

const Notifications: FC<NotificationsProps> = (props) => {
  const { notifications = [] } = props;
  const { token } = theme.useToken();

  const colors: Record<string, string> = useMemo(() => ({
    "info": token.colorInfo,
    "error": token.colorError,
    "warning": token.colorWarning,
    "success": token.colorSuccess,
    "primary": token.colorPrimary,
    "secondary": token.colorFillSecondary,
  }), [token]);

  return (
    notifications.map((i) => (
      <Alert
        key={i.id}
        title={i.title}
        description={
          <Marquee>{i.message }</Marquee>

        }
        closable
        styles={{
          title: {
            fontWeight: 'bold',
            color: colors[`${i.severity_color}` ] 
          },
        }}
        style={{ borderRadius: 0 }}
        type={(i?.severity_color ?? 'info') as AlertProps['type']}
        banner
      />
    ))
  );
};

export default Notifications;