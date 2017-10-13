import { Injectable } from '@angular/core'

@Injectable()
export class AppUtilsService {

  public getThemeNames() {

    return [
      {
        value: 'undefined',
        label: ''
      },
      {
        color: '#F44336',
        label: 'Red'
      },
      {
        color: '#9C27B0',
        label: 'Purple'
      },
      {
        color: '#673AB7',
        label: 'Deep Purple'
      },
      {
        color: '#3F51B5',
        label: 'Indigo'
      },
      {
        color: '#2196F3',
        label: 'Blue'
      },
      {
        color: '#03A9F4',
        label: 'Light Blue'
      },
      {
        color: '#00BCD4',
        label: 'Cyan'
      },
      {
        color: '#009688',
        label: 'Teal'
      },
      {
        color: '#4CAF50',
        label: 'Green'
      },
      {
        color: '#8BC34A',
        label: 'Light Green'
      },
      {
        color: '#CDDC39',
        label: 'Lime'
      },
      {
        color: '#FFEB3B',
        label: 'Yellow'
      },
      {
        color: '#FFC107',
        label: 'Amber'
      },
      {
        color: '#FF9800',
        label: 'Orange'
      },
      {
        color: '#FF5722',
        label: 'Deep Orange'
      },
      {
        color: '#9E9E9E',
        label: 'Grey'
      },
      {
        color: '#607D8B',
        label: 'Blue Grey'
      }
    ]
  }

  public getColorNames() {
    return [
      ''
      , 'INDIANRED'
      , 'LIGHTCORAL'
      , 'SALMON'
      , 'DARKSALMON'
      , 'LIGHTSALMON'
      , 'CRIMSON'
      , 'RED'
      , 'FIREBRICK'
      , 'DARKRED'
      , 'PINK'
      , 'LIGHTPINK'
      , 'HOTPINK'
      , 'DEEPPINK'
      , 'MEDIUMVIOLETRED'
      , 'PALEVIOLETRED'
      , 'LIGHTSALMON'
      , 'CORAL'
      , 'TOMATO'
      , 'ORANGERED'
      , 'DARKORANGE'
      , 'ORANGE'
      , 'GOLD'
      , 'YELLOW'
      , 'LIGHTYELLOW'
      , 'LEMONCHIFFON'
      , 'LIGHTGOLDENRODYELLOW'
      , 'PAPAYAWHIP'
      , 'MOCCASIN'
      , 'PEACHPUFF'
      , 'PALEGOLDENROD'
      , 'KHAKI'
      , 'DARKKHAKI'
      , 'LAVENDER'
      , 'THISTLE'
      , 'PLUM'
      , 'VIOLET'
      , 'ORCHID'
      , 'FUCHSIA'
      , 'MAGENTA'
      , 'MEDIUMORCHID'
      , 'MEDIUMPURPLE'
      , 'REBECCAPURPLE'
      , 'BLUEVIOLET'
      , 'DARKVIOLET'
      , 'DARKORCHID'
      , 'DARKMAGENTA'
      , 'PURPLE'
      , 'INDIGO'
      , 'SLATEBLUE'
      , 'DARKSLATEBLUE'
      , 'MEDIUMSLATEBLUE'
      , 'GREENYELLOW'
      , 'CHARTREUSE'
      , 'LAWNGREEN'
      , 'LIME'
      , 'LIMEGREEN'
      , 'PALEGREEN'
      , 'LIGHTGREEN'
      , 'MEDIUMSPRINGGREEN'
      , 'SPRINGGREEN'
      , 'MEDIUMSEAGREEN'
      , 'SEAGREEN'
      , 'FORESTGREEN'
      , 'GREEN'
      , 'DARKGREEN'
      , 'YELLOWGREEN'
      , 'OLIVEDRAB'
      , 'OLIVE'
      , 'DARKOLIVEGREEN'
      , 'MEDIUMAQUAMARINE'
      , 'DARKSEAGREEN'
      , 'LIGHTSEAGREEN'
      , 'DARKCYAN'
      , 'TEAL'
      , 'AQUA'
      , 'CYAN'
      , 'LIGHTCYAN'
      , 'PALETURQUOISE'
      , 'AQUAMARINE'
      , 'TURQUOISE'
      , 'MEDIUMTURQUOISE'
      , 'DARKTURQUOISE'
      , 'CADETBLUE'
      , 'STEELBLUE'
      , 'LIGHTSTEELBLUE'
      , 'POWDERBLUE'
      , 'LIGHTBLUE'
      , 'SKYBLUE'
      , 'LIGHTSKYBLUE'
      , 'DEEPSKYBLUE'
      , 'DODGERBLUE'
      , 'CORNFLOWERBLUE'
      , 'MEDIUMSLATEBLUE'
      , 'ROYALBLUE'
      , 'BLUE'
      , 'MEDIUMBLUE'
      , 'DARKBLUE'
      , 'NAVY'
      , 'MIDNIGHTBLUE'
      , 'CORNSILK'
      , 'BLANCHEDALMOND'
      , 'BISQUE'
      , 'NAVAJOWHITE'
      , 'WHEAT'
      , 'BURLYWOOD'
      , 'TAN'
      , 'ROSYBROWN'
      , 'SANDYBROWN'
      , 'GOLDENROD'
      , 'DARKGOLDENROD'
      , 'PERU'
      , 'CHOCOLATE'
      , 'SADDLEBROWN'
      , 'SIENNA'
      , 'BROWN'
      , 'MAROON'
      , 'GAINSBORO'
      , 'LIGHTGRAY'
      , 'SILVER'
      , 'DARKGRAY'
      , 'GRAY'
      , 'DIMGRAY'
      , 'LIGHTSLATEGRAY'
      , 'SLATEGRAY'
      , 'DARKSLATEGRAY'
      , 'BLACK'
    ]
  }
}
