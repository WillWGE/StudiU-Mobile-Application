import * as React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    roundness: 20,
    colors:{
        ...DefaultTheme.colors,
        primary: '#000000',
        secondary: '#f1c40f',
        button:'#00D287',
        white:'#FFFFFF'
    }

}


export default theme;