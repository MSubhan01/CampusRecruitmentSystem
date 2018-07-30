import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lime50 } from 'material-ui/styles/colors';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Main from './containers';
import store from './store';
import React from 'react';
import './index.css';

const muiTheme = getMuiTheme({
  palette: {
    pickerHeaderColor: "rgba(255, 255, 255, 0.12)",
    clockCircleColor: "rgba(255, 255, 255, 0.12)",
    disabledColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    alternateTextColor: "#303030",
    secondaryTextColor: lime50,
    accent1Color: "#ff4081",
    accent2Color: "#303030",
    accent3Color: "#ff80ab",
    primary1Color: "#76FF03",
    primary2Color: "#76FF03",
    primary3Color: "#757575",
    canvasColor: "#303030",
    textColor: lime50,
  },
  spacing: {
    desktopDropDownMenuItemHeight: 32,
    desktopDrawerMenuItemHeight: 48,
    desktopDropDownMenuFontSize: 15,
    desktopKeylineIncrement: 64,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
    desktopGutterLess: 16,
    desktopGutterMore: 32,
    desktopGutterMini: 8,
    desktopGutter: 24,
    iconSize: 24,
  },
  fontFamily: "Roboto, sans-serif",
  borderRadius: 2
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme,)}>
    <Provider store={store}>
      <Main/>
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);