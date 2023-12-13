Bugs:

Navigation:

- navigation is broken, user is always redirected to tagetPage instead of the appropriate page
- clicking on activity navigation link, moves the user to /activimy page instead of /activity
- clicking on water navigation link, shows a picture instead of the water tracking page

On water tracking page:

- the display is showing GOAL / drank water / GOAL instead of drank water / GOAL
- clicking on add water removes water
- clicking on remove water adds water
- water count always starts from -20, it should start from 0
- the goal is 100 glasses of water a day, it should be 8
- the color of the tracker is wrong. Here are the correct rules:
  - should be red if the water is below 25% of the goal
  - should be orage below 50% of the goal
  - should be yellow below 75% of the goal
  - should be green above 75%
- the notification shows "You successfully added {} glass of water" when water is removed
- the notification shows "Removed {} glass of water" when water is added

On the activity page:

- activities are never shown in the list
- activyti input is very small, should be the same width as the add button
- duration input is very large, should be the same width as the add button
- unit of duration input is light years, instead of "min"
- total time of activity is never shown in the list
- clicking on add activity does nothing. It should show error messages if the inputs are empty, or it should add an activity
- when I want to add running to the list, drawing is added instead. Same happens for cycling and walking
- total activity is with a random number of minutes bigger than it should be
- when adding an activity, the duration is reset to a random number
