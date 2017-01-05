// Initialize your app
var myApp = new Framework7({
    modalTitle: 'Cyber Challenge',
    pushState : true,
    material : true,
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    domCache: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});


var wrongLogin = false; // false at the beginning
var loggedIn = localStorage.loggedIn; // loggedIn connected to localStorage
var emailOf = localStorage.emailOf;


        $('#loginForm').on('submit', function (e) {

          e.preventDefault();
          var data = $("#loginForm").serialize();
           myApp.showIndicator(); // show Loading Spinne
          $.ajax({
            type: 'post',
            url: 'http://192.168.43.64/cyberChallengeCon/getdata.php',
            data: data,
            dataType: 'json',
            success: function (res) {
                
              if(res[0]===1){
                   myApp.hideIndicator(); // hide Spinner
              localStorage.loggedIn = 'true';
              localStorage.emailOf = res[1];
              
              window.location.href = res[2];
              //mainView.router.loadPage('protected.html'); // ...load protected.html
            }
            else{
                wrongLogin = true;
            }
            }
          });

        });





// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}