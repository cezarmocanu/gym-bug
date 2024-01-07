# Docs

### Initial setup

To be able to connect to the api, in the poject folder, create a new file called .env.
In this file add the following line.

```
VITE_API_KEY=key #here the key will be provided in a private channel, please do not share it
```

### Api:

Check the documentation and make sure the API is called in the app the same way it's described in the documentation of the API
https://api-ninjas.com/api/nutrition

---

---

# Bugs:

### Navigation:

- calories button does not appear in navigation bar

### Water tracking page:

0. screen now requires a circle progress similar to the one in calories view. This will show how much water the user drank of of target water

### Activity tracking page:

0. screen now requires a circle progress similar to the one in calories view. This will show how many minutes did the user exercise. This will also implement a minimum 30 minutes per day of sport as target.

### Calories tracking page:

0. Food tracking circle is aligned to the right. Should be aligned in the center

1. The food library should have the same width as the logged items card

2. Search item button seems to be stuck loading

3. Search item does show any results.
   How to reproduce:
   Go to calories tracking page > go to the search on the right > try to type pizza or any other food

> Actual result:
> There is no food found for 'pizza'

> Expected Result:
> There should be an item called pizza shown in the list, on the first position

2. In notifications, lists and circle tracker calories are displayed with decimals. Calories should
   be displayed as integers.

3. Calories circle is always stuck at 75 percent no matter what foods are logged

4. Logged foods cannot be removed

5. Remove notification does not show calories or name of the removed item

6. Logged items time should only have hour:minute:second. Instead they have too much information

7. Searching for an item does not show the loading indicator instead of the search button while loading

8. In the logged items circle, the target is indicated in joules instead of kcal

9. The notificaiton of adding an item is displayed with an error icon

10. All the dates of the logged items are wrong and from the past. The dates should indicate when the food item was logged

11. In logged foods, instead of the name of the food [Object object] is shown

12. Logging a food from library does not work

13. There is always an extra item in the logged item list

14. Removing an item has a sucess icon

15. Adding an item notificaiton never dissapears. It should disapper afte 2 seconds

16. Hovering over the circle shows "Joules logged today" instead of "Calories logged today"

17. If there are no foods in the library, an empty indicator with the text "No recent searches" shoudl be shown

18. Logging an item does not show the name of the item.

19. Food names in lists are all lower case. They should have the first letter capitalized. Example: "Pizza" instead of "pizza"

20. Circle colors should start from green, go trough yellow at 50% and all the way up to red. Instead they are shown incorrectly.

### Other:

- No bugs
