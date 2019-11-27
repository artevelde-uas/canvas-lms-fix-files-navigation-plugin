
export default function (app) {
    app.addRouteListener([
        'profile.files',
        'groups.files',
        'courses.files'
    ], (params, name) => {
        // Fix breadcrumbs
        Promise.all([
            app.addReadyListener('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files'),
            app.addReadyListener('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files + .ic-app-crumbs')
        ]).then(([navToggleAndCrumbs, crumbs]) => {
            var wrapper = document.getElementById('wrapper');
            var courseMenuToggle = document.getElementById('courseMenuToggle');

            // Remove class name
            navToggleAndCrumbs.classList.remove('ic-app-nav-toggle-and-crumbs--files');
            
            // Move elements back to original location
            wrapper.insertBefore(navToggleAndCrumbs, wrapper.firstChild);
            navToggleAndCrumbs.insertBefore(crumbs, courseMenuToggle.nextSibling);
        });
        
        // Fix for missing left menu
        if (name === 'profile.files') {
            var profileLink = document.getElementById('global_nav_profile_link');
            
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
                    
                    document.getElementById('not_right_side').insertAdjacentHTML('beforebegin', `
                        <div id="left-side" class="ic-app-course-menu list-view">
                            <nav role="navigation" aria-label="Menu Accountnavigatie">
                                <ul id="section-tabs">
                                </ul>
                            </nav>
                        </div>
                    `);
                    
                    let sectionTabs = document.getElementById('section-tabs');
                    
                    links.forEach(link => {
                        var listItem = document.createElement('li');
                        var anchor = document.createElement('a');
                        
                        listItem.className = 'section';
                        anchor.href = link.getAttribute('href');
                        anchor.title = link.textContent;
                        anchor.tabIndex = 0;
                        anchor.textContent = link.textContent;
                        
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
