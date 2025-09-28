# Countdown Flip Timer

Plugin JavaScript professionnel de compte à rebours avec animation flip clock.

## Caractéristiques

- **JavaScript pur** - Aucune dépendance externe
- **Animation flip** - Transitions fluides et réalistes
- **4 styles** - Flip, Slide, Metal, Crystal
- **Responsive** - Compatible mobile et desktop
- **Personnalisable** - Configuration complète
- **2 thèmes** - Noir et blanc
- **Effets de réflexion** - Opacité et flou ajustables

## Installation

1. Copiez les fichiers dans votre projet :
   - `countdown.js`
   - `countdown.css`
   - `index.html` (exemple)

2. Incluez dans votre HTML :

```html
<link rel="stylesheet" href="countdown.css">
<script src="countdown.js"></script>

<div id="countdown"></div>

<script>
const timer = new CountdownFlipTimer('#countdown', {
    timeText: '2024/12/31 23:59:59'
});
timer.start();
</script>
```

## Configuration

```javascript
const timer = new CountdownFlipTimer('#countdown', {
    timeText: '2024/12/31 23:59:59',  // Date cible
    timeZone: 0,                      // Décalage GMT
    style: 'Flip',                    // Flip, Slide, Metal, Crystal
    color: 'black',                   // black ou white
    width: 0,                         // Largeur (0 = auto)
    textGroupSpace: 15,               // Espace entre groupes
    textSpace: 0,                     // Espace entre chiffres
    reflection: true,                 // Effet réflexion
    reflectionOpacity: 10,            // Opacité (0-100)
    reflectionBlur: 0,                // Flou (0-10)
    dayTextNumber: 2,                 // Chiffres pour jours
    displayDay: true,                 // Afficher jours
    displayHour: true,                // Afficher heures
    displayMinute: true,              // Afficher minutes
    displaySecond: true,              // Afficher secondes
    displayLabel: true,               // Afficher étiquettes
    onFinish: function() {            // Callback de fin
        alert('Terminé !');
    }
});
```

## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `timeText` | String | Demain | Format 'YYYY/MM/DD HH:MM:SS' |
| `timeZone` | Number | 0 | Décalage GMT (-12 à +12) |
| `style` | String | 'Flip' | Style : Flip, Slide, Metal, Crystal |
| `color` | String | 'black' | Couleur : black ou white |
| `width` | Number | 0 | Largeur fixe (0 = auto) |
| `textGroupSpace` | Number | 15 | Espace entre groupes |
| `textSpace` | Number | 0 | Espace entre chiffres |
| `reflection` | Boolean | true | Activer réflexion |
| `reflectionOpacity` | Number | 10 | Opacité réflexion (0-100) |
| `reflectionBlur` | Number | 0 | Flou réflexion (0-10) |
| `dayTextNumber` | Number | 2 | Nombre de chiffres jours |
| `displayDay` | Boolean | true | Afficher jours |
| `displayHour` | Boolean | true | Afficher heures |
| `displayMinute` | Boolean | true | Afficher minutes |
| `displaySecond` | Boolean | true | Afficher secondes |
| `displayLabel` | Boolean | true | Afficher étiquettes |
| `onFinish` | Function | null | Callback de fin |

## Méthodes

```javascript
timer.start();     // Démarrer
timer.stop();      // Arrêter
timer.create();    // Créer
timer.destroy();   // Détruire
```

## Styles

- **Flip** : Animation classique de retournement
- **Slide** : Animation de glissement
- **Metal** : Aspect métallique
- **Crystal** : Effet transparent

## Compatibilité

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobiles iOS/Android

## Responsive

S'adapte automatiquement aux différentes tailles d'écran.

## Exemples

### Basique
```javascript
const timer = new CountdownFlipTimer('#countdown', {
    timeText: '2024/12/31 23:59:59'
});
timer.start();
```

### Personnalisé
```javascript
const timer = new CountdownFlipTimer('#countdown', {
    timeText: '2024/12/25 00:00:00',
    style: 'Metal',
    color: 'white',
    reflection: false,
    onFinish: function() {
        alert('Joyeux Noël !');
    }
});
timer.start();
```

## Licence

MIT License - Libre d'utilisation commerciale.

---

**Plugin professionnel prêt à l'emploi**
