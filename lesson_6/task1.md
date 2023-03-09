# Test Case: 
 - Open cart page
 ![Cart Page](/images/test_case_6/step1.png)

 - Click `Add Cart Item` button
 ![Add Cart Item Click](/images/test_case_6/step2.png)
  - Check for event `FormInteraction - Open`
```
{
	name: "FormInteraction"
	value: "Open"
}
```


 - Fill all required fields & press `Создать`
 ![Add Cart Item Click](/images/test_case_6/step3.png)
 - Check for event `FormInteraction - Close`
```
{
	name: "FormInteraction"
	value: "Close"
}
```
 - Click `Add Cart Item` button
 ![Add Cart Item Click](/images/test_case_6/step4.png)
  - Check for event `FormInteraction - Open`
```
{
	name: "FormInteraction"
	value: "Open"
}
```
 - Click `❌` button
 ![Add Cart Item Click](/images/test_case_6/step5.png)
 - Check for event `FormInteraction - Close`
```
{
	name: "FormInteraction"
	value: "Close"
}
```