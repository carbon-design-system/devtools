# @carbon/devtools-demo-site

A static webpage with basic UI elements that can be used for testing and demoing
Carbon devtools.

https://carbon-design-system.github.io/devtools/

## [Random page generator](https://carbon-design-system.github.io/devtools/)

[Visit the demo site](https://carbon-design-system.github.io/devtools/) to
generate a random page built with Carbon for IBM.com components. Each refresh
will generate a new page with dummy content.

### [Scroll animation configurations](https://carbon-design-system.github.io/devtools?card=true&cardDelay=0&cardRepeat=false&copy=true&copyRepeat=false&cta=true&ctaDelay=0&ctaRepeat=false&full-bleed=true&heading=true&headingRepeat=false&mediaWithCaption=true&mediaWithCaptionRepeat=false&pictogram=true&pictogramRepeat=false&singleType=slide-up)

There is also an additional option to add random or fixed scroll animations
across the random page generator. These animations can be configured below, or
you can
[click here](https://carbon-design-system.github.io/devtools?card=true&cardDelay=0&cardRepeat=false&copy=true&copyRepeat=false&cta=true&ctaDelay=0&ctaRepeat=false&full-bleed=true&heading=true&headingRepeat=false&mediaWithCaption=true&mediaWithCaptionRepeat=false&pictogram=true&pictogramRepeat=false&singleType=slide-up)
to it in action.

| name          | type      | description                                                                                                                                                       |
| :------------ | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fixed`       | `boolean` | `true` will fix whatever state you're in, and copy that over to the next page you click on. `false` will randomly generate new animations on each page you visit. |
| `contentType` | `string`  | `grouped` will randomly add scroll animation to larger chunks of content. `individual` will do individual components. `all` will mix and match the above.         |
| `singleType`  | `string`  | `singleType` adds a single type of scroll animation direction. If not set it will randomize the direction across different components.                            |

#### By selector

In addition to the above configurations, you can call out individual
selector/elements/components on the page and add an animation type, delay, or
decide to repeat or not. Â

```
selector=true (whether it animates or not)
selectorType=slide-down (what animation type to use)
selectorDelay=.1 (how long it takes to animate)
selectorRepeat=false (whether it repeats the animation every time it comes into view)
```

###### Here is a list of available selectors

- heading
- copy
- media
- caption
- cta
- card
- contentBlock
- contentGroup
- contentItem
- cardGroup
- mediaWithCaption
- pictogramItem
- pictogram

###### Example in use

```
https://carbon-design-system.github.io/devtools?card=true&cardDelay=0&cardRepeat=false&copy=true&copyRepeat=false&cta=true&ctaDelay=0&ctaRepeat=false&full-bleed=true&heading=true&headingRepeat=false&mediaWithCaption=true&mediaWithCaptionRepeat=false&pictogram=true&pictogramRepeat=false&singleType=slide-up
```
