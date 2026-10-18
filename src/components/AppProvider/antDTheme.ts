import type { ConfigProviderProps } from "antd";

const DEFAULTS = {
  colorPrimary: '#187cc2',
}


const antDTheme: ConfigProviderProps['theme'] = {
  token:{
    // fontSize: 16,
    // containerMax: 1200,
    colorPrimary: DEFAULTS.colorPrimary,
    colorPrimaryText: 'white',
  },
  components: {
    Layout: {
      footerBg: DEFAULTS.colorPrimary,
      colorText: 'red',
    }
  }

};

export default antDTheme;