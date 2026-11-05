import { type ConfigProviderProps, theme } from "antd";

const DEFAULTS = {
  colorPrimary: '#187cc2',
}


const antDTheme: ConfigProviderProps['theme'] = {
  algorithm: [theme.darkAlgorithm, theme.defaultAlgorithm],
  components: {
    Layout: {
      footerBg: DEFAULTS.colorPrimary,
      colorText: 'red',
    },
    Carousel: {
      arrowSize: 24,
      dotHeight: 4,
      
    }
  },
  token: {
    colorPrimary: DEFAULTS.colorPrimary,
    colorPrimaryText: 'white',
  },
};

export default antDTheme;