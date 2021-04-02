//sobreescrever tipos de arquivo
import 'styled-components';

//incluindo isso dentro do styled-components reescrevendo o theme que o react já tem
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;

      white: string;
      black: string;
      gray: string;

      success: string;
      info: string;
      warning: string;
    };
  }
}
