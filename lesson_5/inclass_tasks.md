1) Перейти с HomePage на страницу солнцезащитных очков, нажать Select lenses и пройти до 
шага 4.  (Перенесено на домашнее заданее - повышенной сложности)
```
{
  name: PDPInteraction
  eventAction: Sun Lens Funnel - Step 4: Coating
  eventCategory: PDP - D
  eventLabel: {{{Super Hydrophobic} - {Add/Remove}}/}
}
```
2) На станице контактных линз проверить что фактическое число совпадает с 36. 
 `lesson_4/tests/contacts.test.ts`

3) Находясь на HomePage. Евент должен выстрелить при 20% видимости футера.
`lesson_4/tests/scrollFooterEvent.test.ts`
```
   {
   "event": "GeneralNonInteraction",
   "eventAction": "20% Visible",
   "eventCategory": "Footer - D",
   "eventLabel": "",
   }
```