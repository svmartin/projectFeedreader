/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('contain URL keys and values are NOT empty', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http');
            });
        })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('contain name keys ane values are NOT empty', function () {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {
        let body = document.getElementsByTagName('body')[0];
        let hideMenuLink = document.querySelector('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should have class "menu-hidden" on pageload', function () {
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should change visibility when menu icon is clicked', function () {
            hideMenuLink.click();
            expect(body.classList.contains('menu-hidden')).toEqual(false);

            hideMenuLink.click();
            expect(body.classList.contains('menu-hidden')).toEqual(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // Callbacks should be used to ensure feeds load before being tested.
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has at least 1 .entry element WITHIN .feed container', function (done) {
            let feedContainer = document.querySelector('.feed');
            let allEntries = feedContainer.querySelectorAll('.entry');

            expect(allEntries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let currentFeed;
        let nextFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * loadfeed(0) is the first entry
         * loadfeed(1) is the second entry
         * URL should be unique for each feed
         * Let's test to see if current URL is NOT
         * the same as next URL
         */
        beforeEach(function (done) {
            currentFeed = document.querySelector('.entry').innerHTML;
            loadFeed(1, function () {
                done();
            });
        });

        it('changes content when a new feed is loaded', function (done) {
            nextFeed = document.querySelector('.entry').innerHTML;
            expect(currentFeed)
                .not.toBe(nextFeed);
            done();
        });
    });
}());
