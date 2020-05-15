
export default function (app) {
    app.addRouteListener([
        'profile.files',
        'groups.files',
        'courses.files'
    ], (params, name) => {
        
        // Fix breadcrumbs
        app.addReadyListener('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files').then(navToggleAndCrumbs => {
            var wrapper = document.getElementById('wrapper');

            // Remove class name
            navToggleAndCrumbs.classList.remove('ic-app-nav-toggle-and-crumbs--files');

            // Move breadcrumbs back to original location
            wrapper.insertBefore(navToggleAndCrumbs, wrapper.firstChild);
        });
        
        if (name === 'profile.files') {
            var application = document.getElementById('application');
            var profileLink = document.getElementById('global_nav_profile_link');
            var dashboardLink = document.getElementById('global_nav_dashboard_link');
            var profileListItem = profileLink.parentNode;
            var dashboardListItem = dashboardLink.parentNode;
            
            // Fix for current active page in main navigation selection
            (new MutationObserver(() => {
                // Determine if dashboard link is selected
                if (!dashboardListItem.classList.contains('ic-app-header__menu-list-item--active')) return;
                
                // Change selected item back to profile link 
                dashboardListItem.classList.remove('ic-app-header__menu-list-item--active');
                dashboardListItem.removeAttribute('aria-current');
                profileListItem.classList.add('ic-app-header__menu-list-item--active');
                profileListItem.setAttribute('aria-current', 'page');
                
            })).observe(dashboardListItem, {
                attributes: true,
                attributeFilter: ['aria-current'],
                attributeOldValue: true
            });
            
            // Hack to get navigation links:
            // 1. Click on the profile link to render the profile navigation tray
            profileLink.click();
            
            // 2. Wait for the navigation tray to render
            app.addReadyListener('#nav-tray-portal').then(navigationTray => {
                // 3. Hide the navigation tray
                navigationTray.hidden = true;
                
                // 4. Wait for the links to render
                app.addReadyListener(navigationTray, '.tray-with-space-for-global-nav ul > li > a').then(element => {
                    var links = element.parentNode.parentNode.querySelectorAll('a');
                    
                    // 5. Close and unhide the navigation tray
                    profileLink.click();
                    navigationTray.hidden = false;
                    
                    // Insert the markup for the left side menu
                    document.getElementById('not_right_side').insertAdjacentHTML('beforebegin', `
                        <div id="left-side" class="ic-app-course-menu list-view">
                            <nav role="navigation" aria-label="Menu Accountnavigatie">
                                <ul id="section-tabs">
                                </ul>
                            </nav>
                        </div>
                    `);
                    
                    let sectionTabs = document.getElementById('section-tabs');
                    
                    // Loop over each link and generate menu item
                    links.forEach(link => {
                        var listItem = document.createElement('li');
                        var anchor = document.createElement('a');
                        
                        listItem.className = 'section';
                        anchor.href = link.getAttribute('href');
                        anchor.title = link.textContent;
                        anchor.tabIndex = 0;
                        anchor.textContent = link.textContent;
                        
                        // Select the current active page
                        if (link.href === window.location.href) {
                            anchor.classList.add('files', 'active');
                            anchor.setAttribute('aria-current', 'page');
                        }
                        
                        listItem.appendChild(anchor);
                        sectionTabs.appendChild(listItem);
                    });
                });
            });
        }
        
    });
}
