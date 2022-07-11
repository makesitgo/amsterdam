# Amsterdam Billiards

The backend is comprised of two Atlas App Service apps along with a Google Sheets in order to properly find and persist all Amsterdam Billiards league data.

## League Site Backend

Located in the `./backend_site` directory, this app is primarily responsible for site authentication and data access controls.

The dashboard can be found here: https://realm.mongodb.com/groups/62c6554daebca033900e9ced/apps/62cb88c1a69a2cdf178fffee/dashboard

Not much needs to be noted here other than if you want to add more control around authentication, this is the backend to do so.

## Data Scraper Backend

Located in the `./backend_scraper` directory, this app is primarily responsible for enabling the Google Sheet to save match data.

The dashboard can be found here: https://realm.mongodb.com/groups/62c6554daebca033900e9ced/apps/62c6599cebb532e9b55b2333/dashboard

The associated Google Sheets can be found here: https://docs.google.com/spreadsheets/d/1zdGRmvXd49d13TyfQJpnVdnLI49mfTMeyghy2wzlKxk

(The proper Google Sheet was inspired from this: https://docs.google.com/spreadsheets/d/1QnrH048TQGq54-WzxsZJj4VSBcXgqkcGBfQ3nwQlCJ8)

### Running the Scraper

To run the scraper, make sure to go to the `scraper` worksheet of the Google Sheet. Clear any data present first and then run the `Find TODO` command.

At this point, you should have a list of teams on the right-hand side which are missing match data.  Use the respective URL to go to the league page, select the match data (starting with the top-left corner of team name data in Week 1 and going all the way down to the bottom-right corner of totals data) and copy/paste it into the cell `$A$5` (which should be marked as the spot to paste below this line).

Then run `Parse Data` and follow the prompts from there.  You'll have chances to avoid persisting data if you notice anything wrong.

#### Missing Seasons

The scraper will need to have knowledge of the season and its teams, divisions, schedule etc.  To do so, you'll need to use the `/admin` page on the webapp.

#### Missing Players

Sometimes the scraper needs new player data in order to proceed.  The `Parse Data` command will fail if this occurs and let you know which players need to be added.

To do so, go to the `players` worksheet and add the missing player's name to the appropriate column while also filling in and applying a new unique `xref` value.  Click the `Save Players` command and you can then try re-running the scraper.
