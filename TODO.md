# TODO

Make stuff user-specific?
Improve types - have one type for API response (matches schema) and one for the data stored as a result of this (e.g. Image).
Consistency - choose "root" or "app" and use everywhere?
Split sagas down by state slice, maybe even more to "store" folder.
Generate unique user ID for each user (for uploads, favourites and votes display, but still show all images for all users).
Improve service - add params consistently.
Handle 400 etc errors. e.g. if addFavourite returns 400 (e.g. incorrect data passed) it doesn't remove. BE CAREFUL - YOU GET A 400 WHEN SUBMITTING A DUPLICATE. Maybe don't bother then, I think I'm only seeing it because I've configured it wrong.
Clear error when navigating away from upload page
Add eslint
