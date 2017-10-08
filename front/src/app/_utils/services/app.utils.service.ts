import { Injectable } from '@angular/core'

@Injectable()
export class AppUtilsService {

    // Permet l'affichage de l'ISNI sous la forme 0000 0000 0000 0000
    public formatIsni(isni: string) {
        if (!isni) return null
        else return isni.match(/.{1,4}/g).join(' ')
    }

    // Permet d'extraire le NNB de l'ark : ark:/12148/cb43651440j -> 43651440
    public arkToNNB(ark: string) {
        if (!ark) return null
        else {
            const res = ark.match(/^ark:\/\d+\/\w+(\d{8})\w+$/)
            return (res && res.length > 1) ? res[1] : null
        }
    }

    public getColorNames() {
        return [
            'INDIANRED'
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