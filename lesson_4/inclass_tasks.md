1) Перейти с HomePage на страницу солнцезащитных очков, нажать Add to Cart и пройти до 
шага 3.
```
Analytics 

Flag: please send the event when you move forward from step 3 to step 4 coating

name: PDPInteraction

eventAction: Sun Lens Funnel - Step 4: Coating

eventCategory: PDP - D

eventLabel: {{{Super Hydrophobic/Anti Fog} - {Add/Remove}}/}

```
2) На станице контактных линз проверить что фактическое число совпадает с 36.
3) Находясь на HomePage. Евент должен выстрелить при 20% видимости футера.
```
   {
   "event": "GeneralNonInteraction",
   "eventAction": "20% Visible",
   "eventCategory": "Footer - D",
   "eventLabel": "",
   }
```